import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { createAdminClient } from '@/lib/supabase/server';
import { RSS_SOURCES, GOOGLE_NEWS_RSS, QUANTUM_NEWS_QUERIES, FINNHUB_TICKERS } from '@/lib/pipeline/sources';
import { scoreArticle } from '@/lib/pipeline/score';
import { generateBrief } from '@/lib/pipeline/brief';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const parser = new Parser({ timeout: 15000 });

function urlHash(url: string) {
  return crypto.createHash('sha256').update(url).digest('hex');
}

async function pullRss(url: string, source: string) {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items ?? []).slice(0, 20).map((item) => ({
      source,
      source_url: item.link ?? '',
      url_hash: urlHash(item.link ?? ''),
      title: item.title ?? '',
      author: item.creator ?? item.author ?? null,
      published_at: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
      raw_body: item.contentSnippet ?? item.content ?? '',
    }));
  } catch (err) {
    console.error(`RSS fetch failed for ${source}:`, err);
    return [];
  }
}

export async function GET(request: Request) {
  // Verify cron secret (Vercel sends Authorization: Bearer <CRON_SECRET>)
  const auth = request.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const started = new Date().toISOString();

  // Log start
  const { data: runRow } = await supabase
    .from('pipeline_runs')
    .insert({ run_type: 'daily_news', status: 'running' })
    .select()
    .single();

  let processed = 0;
  let kept = 0;
  const errors: string[] = [];

  try {
    // 1) Pull all RSS sources in parallel
    const rssResults = await Promise.all([
      ...RSS_SOURCES.map((s) => pullRss(s.url, s.name)),
      ...QUANTUM_NEWS_QUERIES.map((q) => pullRss(GOOGLE_NEWS_RSS(q), 'google_news')),
    ]);
    const allItems = rssResults.flat();

    // 2) Dedupe by URL hash
    const seen = new Set<string>();
    const unique = allItems.filter((i) => {
      if (!i.source_url || seen.has(i.url_hash)) return false;
      seen.add(i.url_hash);
      return true;
    });

    // 3) Check which are already in DB
    const hashes = unique.map((i) => i.url_hash);
    const { data: existing } = await supabase
      .from('news_articles')
      .select('url_hash')
      .in('url_hash', hashes);
    const existingHashes = new Set((existing ?? []).map((e) => e.url_hash));
    const fresh = unique.filter((i) => !existingHashes.has(i.url_hash));

    processed = fresh.length;

    // 4) Score in batches (avoid rate limits)
    for (const item of fresh.slice(0, 60)) {
      try {
        const score = await scoreArticle(item.title, item.source, item.raw_body);
        if (score.relevance < 0.4) continue;

        await supabase.from('news_articles').insert({
          ...item,
          summary: score.summary,
          sentiment_score: score.sentiment,
          sentiment_confidence: score.sentiment_confidence,
          relevance_score: score.relevance,
          valuation_impact: score.valuation_impact,
          materiality: score.materiality,
          company_tags: score.company_tags,
          topic_tags: score.topic_tags,
        });
        kept++;
      } catch (err) {
        errors.push(`scoring failed for "${item.title}": ${err}`);
      }
    }

    // 5) Pull stock prices
    for (const ticker of FINNHUB_TICKERS) {
      try {
        const quote = await yahooFinance.quote(ticker);
        const today = new Date().toISOString().slice(0, 10);
        await supabase.from('stock_prices').upsert({
          ticker,
          trade_date: today,
          close: quote.regularMarketPrice,
          volume: quote.regularMarketVolume,
          pct_change: quote.regularMarketChangePercent ? quote.regularMarketChangePercent / 100 : null,
        });
      } catch (err) {
        errors.push(`price fetch failed for ${ticker}: ${err}`);
      }
    }

    // 6) Generate daily brief from today's top stories
    const today = new Date().toISOString().slice(0, 10);
    const { data: topStories } = await supabase
      .from('news_articles')
      .select('*')
      .gte('published_at', new Date(Date.now() - 24 * 3600 * 1000).toISOString())
      .order('materiality', { ascending: false })
      .order('relevance_score', { ascending: false })
      .limit(15);

    if (topStories && topStories.length > 0) {
      const { data: prices } = await supabase
        .from('stock_prices')
        .select('*')
        .eq('trade_date', today);

      const sorted = (prices ?? [])
        .filter((p) => p.pct_change !== null)
        .sort((a, b) => (b.pct_change ?? 0) - (a.pct_change ?? 0));
      const leaders = sorted.slice(0, 3).map((p) => ({ ticker: p.ticker, pct: p.pct_change }));
      const laggards = sorted.slice(-3).reverse().map((p) => ({ ticker: p.ticker, pct: p.pct_change }));

      const brief = await generateBrief({
        date: today,
        topStories: topStories.map((s) => ({
          id: s.id,
          source: s.source,
          sourceUrl: s.source_url,
          title: s.title,
          publishedAt: s.published_at,
          summary: s.summary,
          sentimentScore: s.sentiment_score,
          relevanceScore: s.relevance_score,
          valuationImpact: s.valuation_impact,
          materiality: s.materiality,
          companyTags: s.company_tags,
          topicTags: s.topic_tags,
        })),
        marketSummary: {
          sectorMcapUsd: 41e9,
          dayChangePct: leaders[0]?.pct ?? 0,
          leaders,
          laggards,
        },
      });

      await supabase.from('daily_briefs').upsert({
        brief_date: today,
        headline: brief.headline,
        one_line_summary: brief.one_line_summary,
        body_md: brief.body_md,
        top_story_ids: brief.top_story_ids,
        sector_sentiment: brief.sector_sentiment,
        market_summary: { sectorMcapUsd: 41e9, dayChangePct: leaders[0]?.pct ?? 0, leaders, laggards },
        word_count: brief.body_md.split(/\s+/).length,
      });
    }

    // 7) Revalidate
    revalidatePath('/');
    revalidatePath('/brief');
    revalidatePath('/news');
    revalidatePath('/companies');

    // 8) Mark run complete
    if (runRow) {
      await supabase
        .from('pipeline_runs')
        .update({
          status: 'success',
          completed_at: new Date().toISOString(),
          articles_processed: processed,
          articles_kept: kept,
          errors_count: errors.length,
          error_log: errors.length ? errors.join('\n') : null,
          duration_ms: Date.now() - new Date(started).getTime(),
        })
        .eq('id', runRow.id);
    }

    return NextResponse.json({ ok: true, processed, kept, errors: errors.length });
  } catch (err) {
    if (runRow) {
      await supabase
        .from('pipeline_runs')
        .update({
          status: 'failed',
          completed_at: new Date().toISOString(),
          error_log: String(err),
        })
        .eq('id', runRow.id);
    }
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
