import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { FINNHUB_TICKERS } from '@/lib/pipeline/sources';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  const auth = request.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const today = new Date().toISOString().slice(0, 10);
  const errors: string[] = [];

  for (const ticker of FINNHUB_TICKERS) {
    try {
      const quote = await yahooFinance.quote(ticker);
      await supabase.from('stock_prices').upsert({
        ticker,
        trade_date: today,
        close: quote.regularMarketPrice,
        volume: quote.regularMarketVolume,
        pct_change: quote.regularMarketChangePercent ? quote.regularMarketChangePercent / 100 : null,
      });
    } catch (err) {
      errors.push(`${ticker}: ${err}`);
    }
  }

  return NextResponse.json({ ok: true, errors: errors.length, errorDetail: errors });
}
