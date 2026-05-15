/**
 * One-shot: re-run the updated lexicon classifier over recent news_articles
 * and update valuation_impact + sentiment_score for any rows where the new
 * classification disagrees with the stored value.
 *
 * Usage: npx tsx scripts/reclassify-sentiment.ts [--days=14] [--dry]
 */

import { createClient } from '@supabase/supabase-js';
import { scoreLexicon } from '../src/lib/pipeline/sentiment-lexicon';
import * as fs from 'node:fs';
import * as path from 'node:path';

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (!m) continue;
    const [, k, v] = m;
    if (!process.env[k]) process.env[k] = v.replace(/^"|"$/g, '');
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry');
const daysArg = process.argv.find((a) => a.startsWith('--days='));
const days = daysArg ? parseInt(daysArg.split('=')[1], 10) : 14;

const sb = createClient(url, key);

async function main() {
  console.log(`Reclassifying news_articles published in last ${days} days${dryRun ? ' [DRY RUN]' : ''}`);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await sb
    .from('news_articles')
    .select('id, title, summary, valuation_impact, sentiment_score')
    .gte('published_at', since)
    .order('published_at', { ascending: false });
  if (error) {
    console.error('Fetch failed', error);
    process.exit(1);
  }
  if (!data || data.length === 0) {
    console.log('No rows to reclassify.');
    return;
  }
  console.log(`Fetched ${data.length} rows.`);

  let changed = 0;
  let updated = 0;
  const counts = { bullish: 0, bearish: 0, neutral: 0, mixed: 0 };
  for (const row of data) {
    const newScore = scoreLexicon(row.title ?? '', row.summary ?? '');
    counts[newScore.valuation_impact]++;
    const oldImpact = row.valuation_impact;
    if (oldImpact === newScore.valuation_impact && Math.abs(Number(row.sentiment_score) - newScore.sentiment) < 0.01) {
      continue;
    }
    changed++;
    console.log(
      `${row.id.slice(0, 8)} ${oldImpact} → ${newScore.valuation_impact} (${newScore.sentiment.toFixed(2)}) :: ${row.title.slice(0, 80)}`,
    );
    if (dryRun) continue;
    const { error: upErr } = await sb
      .from('news_articles')
      .update({
        valuation_impact: newScore.valuation_impact,
        sentiment_score: newScore.sentiment,
      })
      .eq('id', row.id);
    if (upErr) {
      console.error(`  ! update failed`, upErr.message);
    } else {
      updated++;
    }
  }
  console.log(`\nProposed changes: ${changed} of ${data.length}`);
  console.log(`Applied updates: ${updated}`);
  console.log(`New distribution: bullish=${counts.bullish} bearish=${counts.bearish} mixed=${counts.mixed} neutral=${counts.neutral}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
