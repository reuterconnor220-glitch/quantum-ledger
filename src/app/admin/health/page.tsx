import { fetchLastPipelineRun } from '@/lib/data/live';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Pipeline Health · Admin',
  description: 'Daily pipeline observability dashboard.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

async function fetchRunHistory(limit: number) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const sb = await createClient();
    const { data } = await sb
      .from('pipeline_runs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(limit);
    return data ?? [];
  } catch {
    return [];
  }
}

async function fetchCounts() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const sb = await createClient();
    const [articles, prices, briefs, subscribers] = await Promise.all([
      sb.from('news_articles').select('id', { count: 'exact', head: true }),
      sb.from('stock_prices').select('ticker', { count: 'exact', head: true }),
      sb.from('daily_briefs').select('brief_date', { count: 'exact', head: true }),
      sb.from('subscribers').select('email', { count: 'exact', head: true }),
    ]);
    return {
      articles: articles.count ?? 0,
      prices: prices.count ?? 0,
      briefs: briefs.count ?? 0,
      subscribers: subscribers.count ?? 0,
    };
  } catch {
    return null;
  }
}

export default async function HealthPage() {
  const [last, runs, counts] = await Promise.all([
    fetchLastPipelineRun(),
    fetchRunHistory(20),
    fetchCounts(),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
      <header className="mb-10">
        <p className="eyebrow mb-2">Admin · noindex</p>
        <h1 className="font-display text-4xl tracking-tight">Pipeline health</h1>
        <p className="mt-3 text-text-secondary">
          Daily cron runs at 12:00 UTC (06:00 MT). This page is public-readable but blocked from search engines.
        </p>
      </header>

      {/* Counts */}
      {counts && (
        <section className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
          <Kpi label="Articles in DB" value={counts.articles.toLocaleString()} />
          <Kpi label="Price points" value={counts.prices.toLocaleString()} />
          <Kpi label="Daily briefs" value={counts.briefs.toLocaleString()} />
          <Kpi label="Newsletter subs" value={counts.subscribers.toLocaleString()} />
        </section>
      )}

      {/* Last run */}
      <section className="mb-10">
        <p className="eyebrow mb-3">Last pipeline run</p>
        {last ? (
          <div className="card p-5">
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <span
                className={`chip ${
                  last.status === 'success' ? 'chip-bull' : last.status === 'failed' ? 'chip-bear' : 'chip-mixed'
                }`}
              >
                {last.status}
              </span>
              <span className="text-sm text-text-secondary font-mono">
                {formatDate(last.startedAt, { style: 'long' })}
              </span>
              {last.durationMs !== undefined && (
                <span className="text-xs text-text-muted font-mono">
                  {(last.durationMs / 1000).toFixed(1)}s
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <Stat label="Processed" value={last.articlesProcessed?.toLocaleString() ?? '—'} />
              <Stat label="Kept" value={last.articlesKept?.toLocaleString() ?? '—'} />
              <Stat label="Errors" value={last.errorsCount?.toString() ?? '—'} />
            </div>
          </div>
        ) : (
          <div className="card p-5 text-text-muted text-sm">
            No runs yet. The cron hasn&apos;t fired or Supabase isn&apos;t reachable. Once a run completes
            it will appear here.
          </div>
        )}
      </section>

      {/* Run history */}
      <section>
        <p className="eyebrow mb-3">Recent runs</p>
        {runs.length === 0 ? (
          <div className="card p-5 text-text-muted text-sm">No history.</div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="ql-table min-w-[640px]">
              <thead>
                <tr>
                  <th className="pl-5">When</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th className="num">Processed</th>
                  <th className="num">Kept</th>
                  <th className="num">Errors</th>
                  <th className="num pr-5">Duration</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((r: any) => (
                  <tr key={r.id}>
                    <td className="pl-5 text-text-secondary">
                      {new Date(r.started_at).toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`chip ${
                          r.status === 'success' ? 'chip-bull' : r.status === 'failed' ? 'chip-bear' : 'chip-mixed'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="text-text-secondary">{r.run_type}</td>
                    <td className="num">{r.articles_processed?.toLocaleString() ?? '—'}</td>
                    <td className="num">{r.articles_kept?.toLocaleString() ?? '—'}</td>
                    <td className="num">{r.errors_count?.toString() ?? '—'}</td>
                    <td className="num pr-5">
                      {r.duration_ms ? `${(r.duration_ms / 1000).toFixed(1)}s` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10 card p-5">
        <p className="eyebrow mb-3">Manual trigger</p>
        <p className="text-sm text-text-secondary leading-relaxed">
          To trigger the pipeline manually:
        </p>
        <pre className="mt-3 bg-bg p-3 rounded-sm border border-border text-xs overflow-x-auto font-mono text-text-primary">
{`curl -H "Authorization: Bearer $CRON_SECRET" \\
     https://quantum-ledger-vert.vercel.app/api/cron/daily-pipeline`}
        </pre>
        <p className="mt-3 text-xs text-text-muted">
          The pipeline pulls from RSS feeds and yfinance, runs lexicon-based sentiment/tagging,
          deduplicates against existing rows, and writes new articles + a generated daily brief.
          Idempotent — safe to run multiple times.
        </p>
      </section>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-surface p-4">
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">{label}</p>
      <p className="mt-1 font-mono text-xl text-text-primary">{value}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">{label}</p>
      <p className="mt-1 font-mono text-text-primary">{value}</p>
    </div>
  );
}
