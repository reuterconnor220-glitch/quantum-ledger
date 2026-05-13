import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { createAdminClient } from '@/lib/supabase/server';
import { RSS_SOURCES, GOOGLE_NEWS_RSS, QUANTUM_NEWS_QUERIES, FINNHUB_TICKERS } from '@/lib/pipeline/sources';
import { scoreLexicon } from '@/lib/pipeline/sentiment-lexicon';
import YahooFinance from 'yahoo-finance2';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

const yahooFinance = new YahooFinance();

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const parser = new Parser({ timeout: 15000 });

function urlHash(url: string) {
  return crypto.createHash('sha256').update(url).digest('hex');
}

async function pullRss(url: string, source: string) {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items ?? []).slice(0, 15).map((item) => ({
      source,
      source_url: item.link ?? '',
      url_hash: urlHash(item.link ?? ''),
      title: item.title ?? '',
      author: item.creator ?? item.author ?? null,
      published_at: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
      raw_body: (item.contentSnippet ?? item.content ?? '').slice(0, 4000),
    }));
  } catch (err) {
    console.error(`RSS fetch failed for ${source}:`, err);
    return [];
  }
}

export async function GET(request: Request) {
  // Verify cron secret (Vercel Cron sends Authorization: Bearer <CRON_SECRET>)
  const auth = request.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const startedMs = Date.now();

  // Log start
  const { data: runRow } = await supabase
    .from('pipeline_runs')
    .insert({ run_type: 'daily_news', status: 'running' })
    .select()
    .single();

  let processed = 0;
  let kept = 0;
  let pricesFetched = 0;
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
    const { data: existing } = hashes.length
      ? await supabase.from('news_articles').select('url_hash').in('url_hash', hashes)
      : { data: [] };
    const existingHashes = new Set((existing ?? []).map((e: any) => e.url_hash));
    const fresh = unique.filter((i) => !existingHashes.has(i.url_hash));

    processed = fresh.length;

    // 4) Score deterministically (lexicon-based; Claude can be added later)
    for (const item of fresh.slice(0, 100)) {
      try {
        const score = scoreLexicon(item.title, item.raw_body);
        if (score.relevance < 0.2) continue;

        await supabase.from('news_articles').insert({
          source: item.source,
          source_url: item.source_url,
          url_hash: item.url_hash,
          title: item.title,
          author: item.author,
          published_at: item.published_at,
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
        errors.push(`scoring failed for "${item.title?.slice(0, 60)}": ${err}`);
      }
    }

    // 5) Pull stock prices — prefer Finnhub (works reliably from serverless) when
    //    FINNHUB_API_KEY is set; fall back to yfinance otherwise.
    const finnhubKey = process.env.FINNHUB_API_KEY;
    const today = new Date().toISOString().slice(0, 10);
    for (const ticker of FINNHUB_TICKERS) {
      try {
        if (finnhubKey) {
          const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${finnhubKey}`;
          const res = await fetch(url);
          if (res.ok) {
            const q: any = await res.json();
            // Finnhub: c=current, d=change, dp=change%, h=high, l=low, o=open, pc=prev close
            if (q && typeof q.c === 'number' && q.c > 0) {
              await supabase.from('stock_prices').upsert({
                ticker,
                trade_date: today,
                open: q.o ?? null,
                high: q.h ?? null,
                low: q.l ?? null,
                close: q.c,
                pct_change: typeof q.dp === 'number' ? q.dp / 100 : null,
              });
              pricesFetched++;
              continue;
            }
          }
        }
        // Fallback: yfinance (flaky from Vercel but works locally)
        const quote = await yahooFinance.quote(ticker);
        await supabase.from('stock_prices').upsert({
          ticker,
          trade_date: today,
          close: quote.regularMarketPrice,
          volume: quote.regularMarketVolume ?? null,
          pct_change:
            quote.regularMarketChangePercent !== undefined
              ? quote.regularMarketChangePercent / 100
              : null,
        });
        pricesFetched++;
      } catch {
        // Silent — best-effort enhancement, not core to the daily pipeline
      }
    }

    // 6) Generate a deterministic daily brief
    const { data: topStories } = await supabase
      .from('news_articles')
      .select('id, title, summary, source, source_url, published_at, sentiment_score, relevance_score, valuation_impact, materiality, company_tags, topic_tags')
      .gte('published_at', new Date(Date.now() - 36 * 3600 * 1000).toISOString())
      .order('materiality', { ascending: false })
      .order('relevance_score', { ascending: false })
      .limit(10);

    if (topStories && topStories.length > 0) {
      const top = topStories[0];
      const { data: prices } = await supabase
        .from('stock_prices')
        .select('*')
        .eq('trade_date', today);

      const sortedPrices = (prices ?? [])
        .filter((p: any) => p.pct_change !== null)
        .sort((a: any, b: any) => (b.pct_change ?? 0) - (a.pct_change ?? 0));
      const leaders = sortedPrices.slice(0, 3).map((p: any) => ({ ticker: p.ticker, pct: p.pct_change }));
      const laggards = sortedPrices.slice(-3).reverse().map((p: any) => ({ ticker: p.ticker, pct: p.pct_change }));
      const avgSentiment = topStories.reduce((acc: number, s: any) => acc + (s.sentiment_score ?? 0), 0) / topStories.length;

      const briefBody = [
        `${topStories.length} stories crossed the relevance threshold in the last 36 hours. ` +
          `Aggregate sentiment ${avgSentiment >= 0 ? '+' : ''}${avgSentiment.toFixed(2)}.`,
        '',
        ...topStories.slice(0, 5).map((s: any, i: number) =>
          `**${i + 1}. ${s.title}** ${s.summary}`
        ),
      ].join('\n\n');

      await supabase.from('daily_briefs').upsert({
        brief_date: today,
        headline: top.title.slice(0, 200),
        one_line_summary: `${topStories.length} stories tracked; top: ${top.title.slice(0, 120)}`,
        body_md: briefBody,
        top_story_ids: topStories.slice(0, 5).map((s: any) => s.id),
        sector_sentiment: avgSentiment,
        market_summary: { sectorMcapUsd: 41e9, dayChangePct: leaders[0]?.pct ?? 0, leaders, laggards },
        word_count: briefBody.split(/\s+/).length,
        generated_by: 'deterministic',
      });
    }

    // 7) Revalidate pages so they pick up new content
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
          error_log: errors.length ? errors.slice(0, 10).join('\n') : null,
          duration_ms: Date.now() - startedMs,
        })
        .eq('id', runRow.id);
    }

    return NextResponse.json({
      ok: true,
      processed,
      kept,
      pricesFetched,
      errors: errors.length,
      durationMs: Date.now() - startedMs,
    });
  } catch (err) {
    if (runRow) {
      await supabase
        .from('pipeline_runs')
        .update({
          status: 'failed',
          completed_at: new Date().toISOString(),
          error_log: String(err),
          duration_ms: Date.now() - startedMs,
        })
        .eq('id', runRow.id);
    }
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
