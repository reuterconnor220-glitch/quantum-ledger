/**
 * Live quote fetcher used at server-render time by /brief and other pages
 * that need leaders/laggards without depending on the daily cron's storage.
 *
 * Strategy:
 *  1) Finnhub (if FINNHUB_API_KEY is set) — reliable from Vercel, free tier is 60 req/min
 *  2) Stooq CSV (no key needed) — secondary fallback
 *  3) Most recent row in Supabase stock_prices — historical fallback
 */

import { createClient } from '@/lib/supabase/server';

export interface Quote {
  ticker: string;
  pct: number;        // fractional, e.g. 0.034 = +3.4%
  price: number;
  asOf: string;       // ISO date
}

export const QUANTUM_TICKERS = [
  'IONQ', 'RGTI', 'QBTS', 'QUBT', 'ARQQ', 'IBM', 'HON', 'GOOGL', 'MSFT', 'INFQ',
] as const;

async function tryFinnhub(ticker: string): Promise<Quote | null> {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return null;
  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${key}`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const q: any = await res.json();
    if (typeof q?.c !== 'number' || q.c <= 0) return null;
    return {
      ticker,
      price: q.c,
      pct: typeof q.dp === 'number' ? q.dp / 100 : 0,
      asOf: new Date().toISOString().slice(0, 10),
    };
  } catch {
    return null;
  }
}

async function tryStooq(ticker: string): Promise<Quote | null> {
  // Stooq uses ".us" suffix for US tickers; no key required, returns CSV
  try {
    const symbol = ticker.toLowerCase() + (ticker.toLowerCase().endsWith('.us') ? '' : '.us');
    const url = `https://stooq.com/q/l/?s=${symbol}&f=sd2t2ohlcvn&h&e=csv`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const text = await res.text();
    const lines = text.trim().split('\n');
    if (lines.length < 2) return null;
    const fields = lines[1].split(',');
    // Format: Symbol,Date,Time,Open,High,Low,Close,Volume,Name
    const date = fields[1];
    const open = parseFloat(fields[3]);
    const close = parseFloat(fields[6]);
    if (!isFinite(open) || !isFinite(close) || close <= 0 || open <= 0) return null;
    return {
      ticker,
      price: close,
      pct: (close - open) / open,
      asOf: date,
    };
  } catch {
    return null;
  }
}

async function trySupabaseFallback(): Promise<Quote[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const sb = await createClient();
    const { data } = await sb
      .from('stock_prices')
      .select('ticker, trade_date, close, pct_change')
      .in('ticker', QUANTUM_TICKERS as unknown as string[])
      .order('trade_date', { ascending: false })
      .limit(60);
    if (!data) return [];
    // Take the most recent row per ticker
    const seen = new Set<string>();
    const out: Quote[] = [];
    for (const row of data as any[]) {
      if (seen.has(row.ticker)) continue;
      if (typeof row.pct_change !== 'number') continue;
      seen.add(row.ticker);
      out.push({
        ticker: row.ticker,
        price: row.close ?? 0,
        pct: row.pct_change,
        asOf: row.trade_date,
      });
    }
    return out;
  } catch {
    return [];
  }
}

/**
 * Fetch live quotes for the standard quantum ticker set. Tries Finnhub first
 * (parallel), falls back to Stooq for any tickers that failed, then falls back
 * to the most recent Supabase row for any still missing.
 */
export async function fetchQuantumQuotes(): Promise<Quote[]> {
  // Try Finnhub for all tickers in parallel
  const finnhubResults = await Promise.all(QUANTUM_TICKERS.map(tryFinnhub));
  const found = new Map<string, Quote>();
  finnhubResults.forEach((q) => { if (q) found.set(q.ticker, q); });

  // For tickers still missing, try Stooq
  const missing = QUANTUM_TICKERS.filter((t) => !found.has(t));
  if (missing.length > 0) {
    const stooqResults = await Promise.all(missing.map(tryStooq));
    stooqResults.forEach((q) => { if (q) found.set(q.ticker, q); });
  }

  // For still-missing tickers, fall back to Supabase
  if (found.size < QUANTUM_TICKERS.length) {
    const sbQuotes = await trySupabaseFallback();
    sbQuotes.forEach((q) => { if (!found.has(q.ticker)) found.set(q.ticker, q); });
  }

  return Array.from(found.values());
}

export function pickLeadersAndLaggards(quotes: Quote[], n = 3): { leaders: Quote[]; laggards: Quote[] } {
  const sorted = quotes
    .filter((q) => isFinite(q.pct))
    .sort((a, b) => b.pct - a.pct);
  return {
    leaders: sorted.slice(0, n),
    laggards: sorted.slice(-n).reverse(),
  };
}
