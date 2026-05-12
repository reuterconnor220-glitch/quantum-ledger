/**
 * Seed script — populates Supabase with companies, news, events, and today's brief.
 * Run after migrations are applied: `npm run seed`
 */

import { createClient } from '@supabase/supabase-js';
import { COMPANIES } from '../src/lib/data/companies';
import { SEED_NEWS } from '../src/lib/data/news';
import { EVENTS } from '../src/lib/data/events';
import { TODAYS_BRIEF } from '../src/lib/data/brief';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.');
  process.exit(1);
}
const supabase = createClient(url, key);

async function main() {
  console.log('Seeding companies…');
  for (const c of COMPANIES) {
    const { data: comp, error } = await supabase
      .from('companies')
      .upsert(
        {
          slug: c.slug,
          ticker: c.ticker,
          name: c.name,
          legal_name: c.legalName,
          hq_city: c.hqCity,
          hq_country: c.hqCountry,
          founded_year: c.foundedYear,
          ipo_date: c.ipoDate,
          listing_exchange: c.listingExchange,
          technology_approach: c.technologyApproach,
          purity: c.purity,
          one_line_thesis: c.oneLineThesis,
          bull_case: c.bullCase,
          bear_case: c.bearCase,
          website: c.website,
          ceo: c.ceo,
          status: c.status ?? 'active',
          pending_ticker: c.pendingTicker,
          is_public: c.isPublic,
        },
        { onConflict: 'slug' }
      )
      .select()
      .single();

    if (error || !comp) {
      console.error(`  ✗ ${c.slug}:`, error?.message);
      continue;
    }

    await supabase.from('company_financials').upsert(
      {
        company_id: comp.id,
        as_of_date: c.asOfDate,
        market_cap_usd: c.marketCapUsd,
        revenue_ttm_usd: c.revenueTtmUsd,
        revenue_latest_quarter_usd: c.revenueLatestQuarterUsd,
        revenue_yoy_growth: c.revenueYoyGrowth,
        gross_margin: c.grossMargin,
        cash_usd: c.cashUsd,
        runway_quarters: c.runwayQuarters,
        total_raised_usd: c.totalRaisedUsd,
        latest_round_size_usd: c.latestRoundSizeUsd,
        latest_round_valuation_usd: c.latestRoundValuationUsd,
        latest_round_date: c.latestRoundDate,
        latest_round_lead: c.latestRoundLead,
        source: 'manual',
      },
      { onConflict: 'company_id,as_of_date' }
    );
    console.log(`  ✓ ${c.slug}`);
  }

  console.log('\nSeeding news articles…');
  for (const n of SEED_NEWS) {
    const { error } = await supabase.from('news_articles').upsert(
      {
        source: n.source,
        source_url: n.sourceUrl,
        url_hash: n.id,
        title: n.title,
        author: n.author,
        published_at: n.publishedAt,
        summary: n.summary,
        sentiment_score: n.sentimentScore,
        relevance_score: n.relevanceScore,
        valuation_impact: n.valuationImpact,
        materiality: n.materiality,
        company_tags: n.companyTags,
        topic_tags: n.topicTags,
      },
      { onConflict: 'source_url' }
    );
    if (error) console.error(`  ✗ ${n.title.slice(0, 60)}:`, error.message);
    else console.log(`  ✓ ${n.title.slice(0, 60)}…`);
  }

  console.log('\nSeeding events…');
  for (const e of EVENTS) {
    const { error } = await supabase.from('events').insert({
      event_date: e.eventDate,
      event_type: e.eventType,
      title: e.title,
      description: e.description,
      amount_usd: e.amountUsd,
      source_url: e.sourceUrl,
    });
    if (error) console.error(`  ✗ ${e.title.slice(0, 50)}:`, error.message);
  }

  console.log('\nSeeding today\'s brief…');
  await supabase.from('daily_briefs').upsert({
    brief_date: TODAYS_BRIEF.briefDate,
    headline: TODAYS_BRIEF.headline,
    one_line_summary: TODAYS_BRIEF.oneLineSummary,
    body_md: TODAYS_BRIEF.bodyMd,
    market_summary: TODAYS_BRIEF.marketSummary,
    sector_sentiment: TODAYS_BRIEF.sectorSentiment,
    word_count: TODAYS_BRIEF.bodyMd.split(/\s+/).length,
  });
  console.log('  ✓ done');
  console.log('\n✓ Seed complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
