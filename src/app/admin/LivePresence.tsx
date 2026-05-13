'use client';

import { Fragment, useEffect, useState } from 'react';

interface Session {
  session_id: string;
  path: string;
  country: string | null;
  device: string | null;
  referrer: string | null;
  first_seen: string;
  last_seen: string;
}

function secondsAgo(iso: string): number {
  return Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
}

function formatDuration(s: string, l: string): string {
  const ms = new Date(l).getTime() - new Date(s).getTime();
  const m = Math.round(ms / 60000);
  if (m < 1) return '< 1m';
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

export function LivePresence() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, force] = useState(0);

  async function poll() {
    try {
      const res = await fetch('/api/admin/live-sessions', { cache: 'no-store' });
      const json = await res.json();
      if (json.ok) {
        setSessions(json.sessions);
        setError(null);
      } else {
        setError(json.error ?? 'failed');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    poll();
    const interval = setInterval(poll, 10_000);
    // Re-render every second so "Xs ago" timestamps update smoothly
    const tick = setInterval(() => force((n) => n + 1), 1000);
    return () => {
      clearInterval(interval);
      clearInterval(tick);
    };
  }, []);

  // Group by path
  const byPath: Record<string, Session[]> = {};
  for (const s of sessions) {
    (byPath[s.path] ??= []).push(s);
  }
  const paths = Object.entries(byPath).sort((a, b) => b[1].length - a[1].length);

  return (
    <section className="mb-8">
      <div className="flex items-end justify-between mb-3 flex-wrap gap-3">
        <div>
          <p className="eyebrow">Active on site right now</p>
          <p className="text-xs text-text-muted font-mono mt-0.5">
            Active = heartbeat within last 90 seconds. Auto-refreshes every 10s.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${sessions.length > 0 ? 'bg-accent-data animate-pulse' : 'bg-text-muted/50'}`} />
          <span className="font-mono text-3xl font-medium text-text-primary">{sessions.length}</span>
          <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
            {sessions.length === 1 ? 'session' : 'sessions'}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="card p-5 text-text-muted text-sm">Loading…</div>
      ) : error ? (
        <div className="card p-5 text-accent-down text-sm">Error: {error}</div>
      ) : sessions.length === 0 ? (
        <div className="card p-5 text-text-muted text-sm">
          No active sessions in the last 90 seconds. Open the homepage in another tab to test —
          your own session will appear here within ~30 seconds.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="ql-table min-w-[640px]">
            <thead>
              <tr>
                <th className="pl-5">Page</th>
                <th className="num">Active</th>
                <th>Device</th>
                <th>Country</th>
                <th>Last ping</th>
                <th className="pr-5">On page for</th>
              </tr>
            </thead>
            <tbody>
              {paths.map(([path, ss]) => (
                <Fragment key={path}>
                  <tr className="border-t border-border-muted bg-bg-elevated/40">
                    <td className="pl-5 font-mono text-sm text-text-primary">{path}</td>
                    <td className="num text-text-primary font-semibold">{ss.length}</td>
                    <td colSpan={4} />
                  </tr>
                  {ss.map((s) => (
                    <tr key={s.session_id}>
                      <td className="pl-5 text-text-muted font-mono text-xs">
                        ↳ {s.session_id.slice(0, 8)}…
                      </td>
                      <td className="num text-text-muted">·</td>
                      <td className="text-text-secondary text-xs">{s.device ?? '—'}</td>
                      <td className="text-text-secondary text-xs">{s.country ?? '—'}</td>
                      <td className="text-text-secondary text-xs font-mono">{secondsAgo(s.last_seen)}s ago</td>
                      <td className="pr-5 text-text-secondary text-xs font-mono">{formatDuration(s.first_seen, s.last_seen)}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
