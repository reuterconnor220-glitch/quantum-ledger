/**
 * Hybrid live-data accessors. Tries Supabase first; falls back to seed.
 * Used by pages that should reflect daily-cron updates.
 */

import { createClient } from '@/lib/supabase/server';
import { SEED_NEWS } from './news';
import { TODAYS_BRIEF } from './brief';
import type { NewsArticle, DailyBrief, ValuationImpact } from '@/lib/types';

function rowToArticle(r: any): NewsArticle {
  return {
    id: r.id,
    source: r.source,
    sourceUrl: r.source_url,
    title: r.title,
    author: r.author ?? undefined,
    publishedAt: r.published_at,
    summary: r.summary ?? '',
    sentimentScore: r.sentiment_score ?? 0,
    relevanceScore: r.relevance_score ?? 0,
    valuationImpact: (r.valuation_impact as ValuationImpact) ?? 'neutral',
    materiality: (r.materiality as 1 | 2 | 3 | 4 | 5) ?? 2,
    companyTags: r.company_tags ?? [],
    topicTags: r.topic_tags ?? [],
  };
}

function rowToBrief(r: any): DailyBrief {
  return {
    briefDate: r.brief_date,
    headline: r.headline,
    oneLineSummary: r.one_line_summary,
    bodyMd: r.body_md,
    topStoryIds: r.top_story_ids ?? [],
    marketSummary: r.market_summary ?? {
      sectorMcapUsd: 41e9,
      dayChangePct: 0,
      leaders: [],
      laggards: [],
    },
    sectorSentiment: r.sector_sentiment ?? 0,
  };
}

/** Fetch articles by explicit IDs, regardless of recency window. Order matches the input IDs. */
export async function fetchNewsByIds(ids: string[]): Promise<NewsArticle[]> {
  if (ids.length === 0) return [];
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return SEED_NEWS.filter((n) => ids.includes(n.id));
  }
  try {
    const sb = await createClient();
    const { data, error } = await sb
      .from('news_articles')
      .select('*')
      .in('id', ids);
    if (error || !data) return [];
    const byId = new Map<string, NewsArticle>();
    for (const r of data) byId.set(r.id, rowToArticle(r));
    return ids.map((id) => byId.get(id)).filter((n): n is NewsArticle => Boolean(n));
  } catch {
    return [];
  }
}

export async function fetchRecentNews(limit = 50): Promise<NewsArticle[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return SEED_NEWS.slice(0, limit);
  try {
    const sb = await createClient();
    const { data, error } = await sb
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit);
    if (error || !data || data.length === 0) return SEED_NEWS.slice(0, limit);
    return data.map(rowToArticle);
  } catch {
    return SEED_NEWS.slice(0, limit);
  }
}

/** Returns the most recent N briefs (most recent first) for the archive page. */
export async function fetchBriefArchive(limit = 60): Promise<DailyBrief[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [TODAYS_BRIEF];
  try {
    const sb = await createClient();
    const { data, error } = await sb
      .from('daily_briefs')
      .select('*')
      .order('brief_date', { ascending: false })
      .limit(limit);
    if (error || !data) return [TODAYS_BRIEF];
    return data.map(rowToBrief);
  } catch {
    return [TODAYS_BRIEF];
  }
}

/** Returns a single brief by date (YYYY-MM-DD), or null if not found. */
export async function fetchBriefByDate(date: string): Promise<DailyBrief | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const sb = await createClient();
    const { data, error } = await sb
      .from('daily_briefs')
      .select('*')
      .eq('brief_date', date)
      .single();
    if (error || !data) return null;
    return rowToBrief(data);
  } catch {
    return null;
  }
}

export async function fetchLatestBrief(): Promise<DailyBrief> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return TODAYS_BRIEF;
  try {
    const sb = await createClient();
    const { data, error } = await sb
      .from('daily_briefs')
      .select('*')
      .order('brief_date', { ascending: false })
      .limit(1)
      .single();
    if (error || !data) return TODAYS_BRIEF;
    return rowToBrief(data);
  } catch {
    return TODAYS_BRIEF;
  }
}

export async function fetchNewsForCompany(slug: string, limit = 10): Promise<NewsArticle[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return SEED_NEWS.filter((n) => n.companyTags.includes(slug)).slice(0, limit);
  }
  try {
    const sb = await createClient();
    const { data, error } = await sb
      .from('news_articles')
      .select('*')
      .contains('company_tags', [slug])
      .order('published_at', { ascending: false })
      .limit(limit);
    if (error || !data || data.length === 0) {
      return SEED_NEWS.filter((n) => n.companyTags.includes(slug)).slice(0, limit);
    }
    return data.map(rowToArticle);
  } catch {
    return SEED_NEWS.filter((n) => n.companyTags.includes(slug)).slice(0, limit);
  }
}

export async function fetchLastPipelineRun(): Promise<{
  status: string;
  startedAt: string;
  durationMs?: number;
  articlesProcessed?: number;
  articlesKept?: number;
  errorsCount?: number;
} | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const sb = await createClient();
    const { data } = await sb
      .from('pipeline_runs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(1)
      .single();
    if (!data) return null;
    return {
      status: data.status,
      startedAt: data.started_at,
      durationMs: data.duration_ms,
      articlesProcessed: data.articles_processed,
      articlesKept: data.articles_kept,
      errorsCount: data.errors_count,
    };
  } catch {
    return null;
  }
}
