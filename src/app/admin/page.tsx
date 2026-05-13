import { createAdminClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { AdminControls } from './AdminControls';

export const metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

async function fetchPipelineRuns() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const sb = createAdminClient();
    const { data } = await sb
      .from('pipeline_runs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(20);
    return data ?? [];
  } catch {
    return [];
  }
}

async function fetchCounts() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const sb = createAdminClient();
    const [articles, prices, briefs, subscribers, views] = await Promise.all([
      sb.from('news_articles').select('id', { count: 'exact', head: true }),
      sb.from('stock_prices').select('ticker', { count: 'exact', head: true }),
      sb.from('daily_briefs').select('brief_date', { count: 'exact', head: true }),
      sb.from('subscribers').select('email', { count: 'exact', head: true }),
      sb.from('page_views').select('id', { count: 'exact', head: true }),
    ]);
    return {
      articles: articles.count ?? 0,
      prices: prices.count ?? 0,
      briefs: briefs.count ?? 0,
      subscribers: subscribers.count ?? 0,
      views: views.count ?? 0,
    };
  } catch {
    return null;
  }
}

async function fetchAnalytics() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const sb = createAdminClient();
    const now = new Date();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
    const dayAgo = new Date(now.getTime() - 24 * 3600 * 1000);

    // Pull last 30 days of views (excluding bots)
    const { data: views } = await sb
      .from('page_views')
      .select('path, referrer, country, device, viewed_at')
      .gte('viewed_at', monthAgo.toISOString())
      .neq('device', 'bot')
      .order('viewed_at', { ascending: false })
      .limit(20000);

    const v = views ?? [];

    // Bucket by day
    const dailyMap: Record<string, number> = {};
    for (let d = new Date(monthAgo); d <= now; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10);
      dailyMap[key] = 0;
    }
    for (const r of v) {
      const day = r.viewed_at.slice(0, 10);
      if (day in dailyMap) dailyMap[day]++;
    }
    const daily = Object.entries(dailyMap).map(([date, count]) => ({ date, count }));

    // Top pages 7d
    const week = v.filter((r) => new Date(r.viewed_at) >= weekAgo);
    const pageMap: Record<string, number> = {};
    for (const r of week) pageMap[r.path] = (pageMap[r.path] ?? 0) + 1;
    const topPages = Object.entries(pageMap)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    // Top referrers 7d
    const refMap: Record<string, number> = {};
    for (const r of week) {
      if (r.referrer) refMap[r.referrer] = (refMap[r.referrer] ?? 0) + 1;
    }
    const topReferrers = Object.entries(refMap)
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    // Countries 30d
    const countryMap: Record<string, number> = {};
    for (const r of v) {
      const c = r.country || 'Unknown';
      countryMap[c] = (countryMap[c] ?? 0) + 1;
    }
    const countries = Object.entries(countryMap)
      .map(([code, count]) => ({ code, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    // Device breakdown 7d
    const deviceMap: Record<string, number> = {};
    for (const r of week) deviceMap[r.device] = (deviceMap[r.device] ?? 0) + 1;

    return {
      total30d: v.length,
      total7d: week.length,
      total24h: v.filter((r) => new Date(r.viewed_at) >= dayAgo).length,
      daily,
      topPages,
      topReferrers,
      countries,
      deviceMap,
    };
  } catch {
    return null;
  }
}

async function fetchSubscribers() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const sb = createAdminClient();
    const { data } = await sb
      .from('subscribers')
      .select('email, subscribed_at, source, verified')
      .order('subscribed_at', { ascending: false })
      .limit(20);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function AdminPage() {
  const [runs, counts, analytics, subs] = await Promise.all([
    fetchPipelineRuns(),
    fetchCounts(),
    fetchAnalytics(),
    fetchSubscribers(),
  ]);

  const last = runs[0];
  const maxDaily = analytics ? Math.max(1, ...analytics.daily.map((d) => d.count)) : 1;

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
      <header className="mb-8 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="eyebrow mb-1">Admin · Quantum Ledger</p>
          <h1 className="font-display text-4xl tracking-tight">Dashboard</h1>
        </div>
        <AdminControls />
      </header>

      {/* DB counts */}
      {counts && (
        <section className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-px bg-border rounded-md overflow-hidden">
          <Kpi label="Articles" value={counts.articles.toLocaleString()} />
          <Kpi label="Briefs" value={counts.briefs.toLocaleString()} />
          <Kpi label="Price points" value={counts.prices.toLocaleString()} />
          <Kpi label="Subscribers" value={counts.subscribers.toLocaleString()} />
          <Kpi label="Page views (total)" value={counts.views.toLocaleString()} />
        </section>
      )}

      {/* Analytics */}
      {analytics && (
        <>
          <section className="mb-8">
            <div className="flex items-end justify-between mb-3">
              <p className="eyebrow">Page views · last 30 days</p>
              <div className="flex gap-4 text-xs font-mono text-text-muted">
                <span>24h: <span className="text-text-primary">{analytics.total24h.toLocaleString()}</span></span>
                <span>7d: <span className="text-text-primary">{analytics.total7d.toLocaleString()}</span></span>
                <span>30d: <span className="text-text-primary">{analytics.total30d.toLocaleString()}</span></span>
              </div>
            </div>
            <div className="card p-4">
              <DailyChart daily={analytics.daily} max={maxDaily} />
              <div className="mt-3 flex gap-3 text-xs font-mono text-text-muted">
                {Object.entries(analytics.deviceMap).map(([d, c]) => (
                  <span key={d}>{d}: <span className="text-text-primary">{c}</span></span>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <DataTable
              title="Top pages · last 7 days"
              rows={analytics.topPages.map((p) => ({ label: p.path, value: p.count }))}
            />
            <DataTable
              title="Top referrers · last 7 days"
              rows={analytics.topReferrers.map((r) => ({ label: r.referrer, value: r.count }))}
              emptyMessage="No external referrers yet — share the URL to start seeing them."
            />
            <DataTable
              title="Countries · last 30 days"
              rows={analytics.countries.map((c) => ({ label: c.code, value: c.count }))}
              emptyMessage="No country data yet."
            />
          </section>
        </>
      )}

      {/* Pipeline status */}
      <section className="mb-8">
        <p className="eyebrow mb-3">Last pipeline run</p>
        {last ? (
          <div className="card p-5 flex items-center gap-4 flex-wrap">
            <span
              className={`chip ${
                last.status === 'success' ? 'chip-bull' : last.status === 'failed' ? 'chip-bear' : 'chip-mixed'
              }`}
            >
              {last.status}
            </span>
            <span className="text-sm text-text-secondary font-mono">{formatDate(last.started_at, { style: 'long' })}</span>
            <span className="text-xs text-text-muted font-mono">
              {last.duration_ms ? `${(last.duration_ms / 1000).toFixed(1)}s · ` : ''}
              {last.articles_kept ?? 0} kept · {last.errors_count ?? 0} errors
            </span>
          </div>
        ) : (
          <div className="card p-5 text-text-muted text-sm">No runs yet — hit the refresh button.</div>
        )}
      </section>

      {/* Recent runs */}
      <section className="mb-8">
        <p className="eyebrow mb-3">Recent pipeline runs</p>
        {runs.length === 0 ? (
          <div className="card p-5 text-text-muted text-sm">None.</div>
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
                    <td className="pl-5 text-text-secondary">{new Date(r.started_at).toLocaleString()}</td>
                    <td>
                      <span className={`chip ${r.status === 'success' ? 'chip-bull' : r.status === 'failed' ? 'chip-bear' : 'chip-mixed'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="text-text-secondary">{r.run_type}</td>
                    <td className="num">{r.articles_processed?.toLocaleString() ?? '—'}</td>
                    <td className="num">{r.articles_kept?.toLocaleString() ?? '—'}</td>
                    <td className="num">{r.errors_count?.toString() ?? '—'}</td>
                    <td className="num pr-5">{r.duration_ms ? `${(r.duration_ms / 1000).toFixed(1)}s` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Newsletter subscribers */}
      {subs.length > 0 && (
        <section className="mb-8">
          <p className="eyebrow mb-3">Recent newsletter subscribers</p>
          <div className="card overflow-x-auto">
            <table className="ql-table min-w-[480px]">
              <thead>
                <tr>
                  <th className="pl-5">Email</th>
                  <th>Source</th>
                  <th className="pr-5">When</th>
                </tr>
              </thead>
              <tbody>
                {subs.map((s: any) => (
                  <tr key={s.email}>
                    <td className="pl-5 font-mono text-xs">{s.email}</td>
                    <td className="text-text-secondary text-xs">{s.source}</td>
                    <td className="pr-5 text-text-secondary text-xs">{new Date(s.subscribed_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <p className="text-xs text-text-muted leading-relaxed">
        Analytics are privacy-friendly: no cookies for visitors, no IP storage, no third-party tracker. Just
        path / referrer / country code / device class / timestamp written to Supabase. Bots filtered from charts.
      </p>
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

function DailyChart({ daily, max }: { daily: { date: string; count: number }[]; max: number }) {
  const W = 1000;
  const H = 120;
  const padL = 30;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const barW = (W - padL - padR) / Math.max(daily.length, 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {/* y axis labels */}
      <text x={padL - 4} y={padT + 8} fill="#6B7280" fontSize="9" fontFamily="ui-monospace" textAnchor="end">{max}</text>
      <text x={padL - 4} y={H - padB + 4} fill="#6B7280" fontSize="9" fontFamily="ui-monospace" textAnchor="end">0</text>
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#2A2F37" />
      {daily.map((d, i) => {
        const h = (d.count / max) * (H - padT - padB);
        const x = padL + i * barW;
        const y = H - padB - h;
        return (
          <g key={d.date}>
            <rect x={x + 1} y={y} width={Math.max(barW - 2, 2)} height={h} fill="#7C5CFF" fillOpacity={d.count > 0 ? 0.7 : 0.2} rx="1">
              <title>{d.date}: {d.count} views</title>
            </rect>
            {i % 5 === 0 && (
              <text x={x + barW / 2} y={H - padB + 12} fill="#6B7280" fontSize="8" fontFamily="ui-monospace" textAnchor="middle">
                {d.date.slice(5)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function DataTable({ title, rows, emptyMessage }: { title: string; rows: { label: string; value: number }[]; emptyMessage?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="card p-4">
      <p className="eyebrow mb-3">{title}</p>
      {rows.length === 0 ? (
        <p className="text-xs text-text-muted">{emptyMessage ?? 'No data yet.'}</p>
      ) : (
        <ul className="space-y-1.5">
          {rows.map((r, i) => (
            <li key={i} className="text-xs font-mono">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-text-secondary truncate" title={r.label}>{r.label}</span>
                <span className="text-text-primary tabular-nums">{r.value}</span>
              </div>
              <div className="h-1 bg-bg rounded-xs overflow-hidden">
                <div className="h-full bg-accent-quantum/60" style={{ width: `${(r.value / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
