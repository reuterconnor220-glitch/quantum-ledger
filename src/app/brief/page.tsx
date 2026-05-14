// New /brief page — adapted to Quantum Ledger's Next.js + Tailwind stack.
// DROP-IN replacement for src/app/brief/page.tsx
//
// What's preserved from the current file:
//   - All data fetching (fetchLatestBrief, fetchRecentNews, fetchQuantumQuotes)
//   - ArticleLd structured data
//   - Giscus comments
//   - Live quote fallback logic
//   - revalidate + dynamic export config
//
// What's new (visual only):
//   - Masthead with crest (Vol/Issue/edition/date)
//   - Wavefunction signature visualization (custom SVG)
//   - Stacked hero: ψ-space sidebar + interference canvas + live stats
//   - Ranked story cards with serif drop figures + sentiment dots
//   - Improved market summary cards with proper hierarchy
//   - Editorial body with drop cap on the lede
//
// Drop instructions:
//   1. Replace src/app/brief/page.tsx with this file
//   2. Confirm @/lib/data/live, @/lib/pipeline/quotes, @/lib/utils, @/components/SentimentChip,
//      @/components/JsonLd, @/components/Giscus still exist (they do per your repo)
//   3. npm run dev → verify
//   4. Commit + push

import Link from 'next/link';
import { fetchLatestBrief, fetchRecentNews } from '@/lib/data/live';
import { fetchQuantumQuotes, pickLeadersAndLaggards } from '@/lib/pipeline/quotes';
import { sectorAverageScore, SECTOR_SCORE_DELTA, sectorMood } from '@/lib/data/ledger-score';
import { formatDate, formatPct, formatUsd } from '@/lib/utils';
import { SentimentChip } from '@/components/SentimentChip';
import { ArticleLd } from '@/components/JsonLd';
import { Giscus } from '@/components/Giscus';
import { VolatilityHistory } from '@/components/brief/VolatilityHistory';
import { CatalystCalendar } from '@/components/brief/CatalystCalendar';

export const metadata = {
  title: "Daily Brief · Today's Quantum Computing Intelligence",
  description:
    "Today's daily brief — the most important quantum computing stories, market summary, sector sentiment, and editorial analysis. Updated every weekday at 6am MT.",
};

export const revalidate = 600;
export const dynamic = 'force-dynamic';

export default async function BriefPage() {
  const [b, recentNews, liveQuotes] = await Promise.all([
    fetchLatestBrief(),
    fetchRecentNews(30),
    fetchQuantumQuotes(),
  ]);

  const topStories = b.topStoryIds
    .map((id) => recentNews.find((n) => n.id === id))
    .filter(Boolean);

  const live = pickLeadersAndLaggards(liveQuotes);
  const leaders = live.leaders.length > 0
    ? live.leaders.map((q) => ({ ticker: q.ticker, pct: q.pct }))
    : b.marketSummary.leaders;
  const laggards = live.laggards.length > 0
    ? live.laggards.map((q) => ({ ticker: q.ticker, pct: q.pct }))
    : b.marketSummary.laggards;
  const dayChangePct = liveQuotes.length > 0
    ? liveQuotes.reduce((s, q) => s + q.pct, 0) / liveQuotes.length
    : b.marketSummary.dayChangePct;

  // Derive a friendly date for the masthead crest
  const dateObj = new Date(b.briefDate);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const dateLong = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const issueNo = computeIssueNumber(b.briefDate);

  // Live sector score derived from LEDGER_SCORES — replaces the hardcoded placeholder.
  const sectorScore = sectorAverageScore();
  const sectorMoodLabel = sectorMood(sectorScore);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
      <ArticleLd
        headline={b.headline}
        description={b.oneLineSummary}
        url={
          (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantum-ledger-vert.vercel.app') + '/brief'
        }
        datePublished={b.briefDate}
      />

      {/* ────────── Masthead ────────── */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display text-[22px] tracking-tight text-text-primary normal-case">No. {issueNo}</span>
            <span className="text-text-muted/60">·</span>
            <span>Morning Brief</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            {dayName}, {dateLong}
          </div>
          <div className="text-right leading-relaxed">
            New York · Zürich
            <br />
            6 min read
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.92] tracking-[-0.025em] text-[clamp(46px,8vw,112px)]">
          The Quantum <em className="not-italic font-normal text-accent-data">Ledger</em>
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[50ch]">
          A daily reading of the quantum economy. Signal over hype, since Issue 001.
        </p>
      </header>

      {/* ────────── Today, in ψ-space ────────── */}
      <section className="mt-9 py-7 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)_220px] gap-8 border-y border-border items-center">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-2">
            <span className="qdot-live" />
            <span>
              Uplink · <LocalClock />
            </span>
          </div>
          <h2 className="font-display italic text-2xl tracking-tight text-text-primary mb-1.5">Today, in ψ-space</h2>
          <p className="font-display italic text-sm text-text-muted leading-snug max-w-[28ch]">
            Five wave packets — today's loudest stories — superposed. Amplitude scaled by the
            Ledger Score; phase shifted by sentiment.
          </p>
        </div>

        <div className="h-[160px] -mx-1">
          <Wavefunction
            sentiment={b.sectorSentiment}
            n={Math.min(5, topStories.length || 5)}
          />
        </div>

        <div className="md:border-l md:border-border md:pl-6 grid gap-2.5">
          <StatLine k="Sector cap" v={formatUsd(b.marketSummary.sectorMcapUsd)} />
          <StatLine
            k="Δ session"
            v={formatPct(dayChangePct, { signed: true })}
            tone={dayChangePct >= 0 ? 'up' : 'down'}
          />
          <StatLine
            k="Sentiment"
            v={b.sectorSentiment > 0 ? `+${b.sectorSentiment.toFixed(2)}` : b.sectorSentiment.toFixed(2)}
            tone={b.sectorSentiment >= 0 ? 'up' : 'down'}
          />
          <StatLine k="Stories" v={String(topStories.length || recentNews.length)} />
        </div>
      </section>

      {/* ────────── Editorial body ────────── */}
      <section className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-12">
        <article>
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.06em] text-text-muted font-mono mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-accent-data text-accent-data rounded-full font-semibold tracking-[0.08em]">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-data"
                style={{ boxShadow: '0 0 6px currentColor' }}
              />
              Today's Brief
            </span>
            <span>Issue {issueNo}</span>
            <span className="text-text-muted/60">·</span>
            <span>{topStories.length || recentNews.length} stories tracked</span>
            <span className="text-text-muted/60">·</span>
            <span>
              Sector cap <span className="tabular-nums">{formatUsd(b.marketSummary.sectorMcapUsd)}</span>{' '}
              <span className={dayChangePct >= 0 ? 'text-accent-data' : 'text-accent-down'}>
                {formatPct(dayChangePct, { signed: true })}
              </span>
            </span>
          </div>

          <h2 className="font-display font-normal leading-[1.04] tracking-[-0.022em] text-[clamp(34px,5vw,56px)] mb-4 text-balance">
            {b.headline}
          </h2>
          <p className="font-display italic text-xl leading-snug text-text-secondary mb-6 max-w-[56ch]">
            {b.oneLineSummary}
          </p>

          <div className="flex flex-wrap items-center gap-3 py-2.5 my-7 border-y border-border text-[11px] uppercase tracking-[0.04em] text-text-muted font-mono">
            <span className="text-text-secondary font-medium">The Ledger Desk</span>
            <span className="text-text-muted/60">·</span>
            <span>Published</span>
            <span className="text-text-muted/60">·</span>
            <span>Updated continuously</span>
            <span className="text-text-muted/60">·</span>
            <span>6 min read</span>
          </div>

          <EditorialBody markdown={b.bodyMd} />

          {/* Top stories */}
          <div className="mt-12">
            <p className="eyebrow mb-4">The ten · ranked</p>
            <ol className="grid gap-1">
              {topStories.map((n, i) =>
                n ? (
                  <li key={n.id} className="group">
                    <a
                      href={n.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="grid grid-cols-[56px_minmax(0,1fr)] gap-6 py-5 border-t border-border first:border-t-text-primary hover:bg-bg-surface/40 transition-colors -mx-4 px-4"
                    >
                      <span
                        className={
                          'font-display tabular-nums leading-none ' +
                          (i === 0 ? 'text-[64px] text-text-primary' : 'text-[44px] text-text-muted')
                        }
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
                          <span className="uppercase font-semibold text-text-secondary">
                            {n.source.replace('_', ' ')}
                          </span>
                          <span className="text-text-muted/60">·</span>
                          <span>{formatDate(n.publishedAt)}</span>
                          <SentimentChip valuationImpact={n.valuationImpact} className="ml-auto" />
                        </div>
                        <p
                          className={
                            'font-display tracking-tight leading-snug text-balance ' +
                            (i === 0 ? 'text-[26px] text-text-primary' : 'text-[19px] text-text-primary')
                          }
                        >
                          {n.title}
                        </p>
                      </div>
                    </a>
                  </li>
                ) : null,
              )}
            </ol>
          </div>
        </article>

        {/* ────────── Aside (right rail) ────────── */}
        <aside className="space-y-7 lg:sticky lg:top-20 lg:self-start">
          <div className="card p-5 border-accent-data/40 bg-gradient-to-b from-accent-data/5 to-transparent relative overflow-hidden">
            <div className="flex items-center justify-between mb-2 text-[11px] uppercase tracking-[0.08em] font-mono">
              <span className="text-text-secondary font-semibold">The Ledger Score</span>
              <Link href="/ledger-score" className="text-text-muted hover:text-accent-data">
                Methodology ›
              </Link>
            </div>
            <div className="grid grid-cols-[auto_1fr] items-end gap-4 mb-1">
              <div className="font-display text-[96px] leading-[0.86] tracking-[-0.045em] tabular-nums">
                {sectorScore}
              </div>
              <div className="text-right pb-1.5 font-mono">
                <div className={SECTOR_SCORE_DELTA >= 0 ? "text-accent-data font-semibold text-xs tracking-[0.02em]" : "text-accent-down font-semibold text-xs tracking-[0.02em]"}>
                  {SECTOR_SCORE_DELTA >= 0 ? '▲' : '▼'} {SECTOR_SCORE_DELTA >= 0 ? '+' : ''}{SECTOR_SCORE_DELTA} vs T-1
                </div>
                <div className="text-[10px] text-text-muted">/ 0 to 100</div>
              </div>
            </div>
            <div className="font-display italic text-lg text-text-secondary mb-3">&ldquo;{sectorMoodLabel}&rdquo;</div>
            <ScoreDensity value={sectorScore} />
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="eyebrow">Leaders &amp; laggards</p>
              <span className="text-[10px] font-mono text-text-muted">live · 1 min</span>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2 font-mono text-sm">
              {leaders.length === 0 && laggards.length === 0 ? (
                <span className="col-span-2 text-text-muted text-xs">Awaiting market data.</span>
              ) : (
                <>
                  {leaders.slice(0, 4).map((l) => (
                    <div key={l.ticker} className="flex justify-between">
                      <span>{l.ticker}</span>
                      <span className="text-accent-data">{formatPct(l.pct, { signed: true })}</span>
                    </div>
                  ))}
                  {laggards.slice(0, 4).map((l) => (
                    <div key={l.ticker} className="flex justify-between">
                      <span>{l.ticker}</span>
                      <span className="text-accent-down">{formatPct(l.pct, { signed: true })}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <VolatilityHistory />
          <CatalystCalendar />
        </aside>
      </section>

      <p className="mt-16 max-w-3xl text-xs text-text-muted">
        The brief is updated daily by an automated cron at 6am MT, blending RSS-aggregated news with
        market moves.{' '}
        <Link href="/methodology" className="text-accent-data hover:underline">
          Methodology
        </Link>
        . Past editions live in{' '}
        <Link href="/archive" className="text-accent-data hover:underline">
          the archive
        </Link>
        .
      </p>

      <Giscus />
    </div>
  );
}

/* ────────────────────────────── helpers ────────────────────────────── */

function StatLine({ k, v, tone }: { k: string; v: string; tone?: 'up' | 'down' }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
      <span className="text-[10px] uppercase tracking-[0.06em] text-text-muted font-mono">{k}</span>
      <span
        className={
          'font-display text-xl tracking-tight tabular-nums ' +
          (tone === 'up' ? 'text-accent-data' : tone === 'down' ? 'text-accent-down' : 'text-text-primary')
        }
      >
        {v}
      </span>
    </div>
  );
}

function LocalClock() {
  // Server-rendered — fixed timestamp string is fine here; client could replace if you add 'use client'.
  const now = new Date();
  const t = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  return <>{t} EDT</>;
}

function EditorialBody({ markdown }: { markdown: string }) {
  const paras = markdown.split('\n\n');
  return (
    <div className="space-y-5 text-text-primary text-[19px] leading-[1.6]">
      {paras.map((p, i) => {
        const html = p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        if (i === 0) {
          // Lede: drop cap on the first letter
          const match = html.match(/^([^\s<]+)([\s\S]*)$/);
          if (match) {
            return (
              <p key={i} className="font-display">
                <span className="float-left font-display font-medium text-[68px] leading-[0.85] pr-3 pt-1.5">
                  {match[1][0]}
                </span>
                <span dangerouslySetInnerHTML={{ __html: match[1].slice(1) + match[2] }} />
              </p>
            );
          }
        }
        return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}

function computeIssueNumber(briefDate: string) {
  const launch = new Date('2024-01-01').getTime();
  const d = new Date(briefDate).getTime();
  // Roughly count market days since launch — for display only.
  const days = Math.max(1, Math.floor((d - launch) / (1000 * 60 * 60 * 24)));
  const weekdays = Math.floor(days * (5 / 7));
  return weekdays;
}

/* ────────────────────────────── Wavefunction signature ────────────────────────────── */

function Wavefunction({ sentiment = 0, n = 5 }: { sentiment?: number; n?: number }) {
  const W = 920;
  const H = 160;
  // Amplitude scales with sentiment, range [0.5, 1.0]
  const amp = 0.5 + Math.min(1, Math.max(0, (sentiment + 1) / 2)) * 0.5;

  // Build n gaussian wave packets at evenly spaced centers
  const packets = Array.from({ length: n }, (_, i) => ({
    x: ((i + 0.5) * W) / n,
    sigma: 90 - 0.6 * 40,
    k: 0.06 + 0.6 * 0.08,
    phase: i * 0.7,
  }));

  // sample 240 points
  const pts: [number, number][] = [];
  const N = 240;
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * W;
    let psi = 0;
    for (const p of packets) {
      const dx = x - p.x;
      const g = Math.exp(-(dx * dx) / (2 * p.sigma * p.sigma));
      psi += 30 * amp * g * Math.cos(p.k * dx + p.phase);
    }
    pts.push([x, H / 2 - psi]);
  }
  const d = 'M ' + pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(2)).join(' L ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full text-accent-data">
      <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="currentColor" strokeWidth="0.5" opacity="0.18" />
      {packets.map((p, i) => (
        <g key={i}>
          <line
            x1={p.x}
            y1={0}
            x2={p.x}
            y2={H}
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 4"
            opacity="0.16"
          />
          <circle cx={p.x} cy={H / 2} r="2.5" fill="currentColor" />
        </g>
      ))}
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        style={{ filter: 'drop-shadow(0 0 6px currentColor)' }}
      />
      <defs>
        <linearGradient id="ql-brief-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0B0D10" stopOpacity="1" />
          <stop offset="6%" stopColor="#0B0D10" stopOpacity="0" />
          <stop offset="94%" stopColor="#0B0D10" stopOpacity="0" />
          <stop offset="100%" stopColor="#0B0D10" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#ql-brief-fade)" />
    </svg>
  );
}

/* ────────────────────────────── Score density curve ────────────────────────────── */

function ScoreDensity({ value = 62 }: { value?: number }) {
  const W = 280;
  const H = 64;
  const sigma = 8;
  const peakY = H - 8;
  const baseY = H - 6;
  const pts: [number, number][] = [];
  for (let i = 0; i <= 80; i++) {
    const x = (i / 80) * 100;
    const y = Math.exp(-((x - value) ** 2) / (2 * sigma * sigma));
    pts.push([(x / 100) * W, baseY - y * (H - 16)]);
  }
  const d = 'M ' + pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(2)).join(' L ');
  const areaD = `M 0,${H} L ` + pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(2)).join(' L ') + ` L ${W},${H} Z`;
  return (
    <div className="mt-2">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-16 text-text-secondary">
        <defs>
          <linearGradient id="ql-density-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D9C0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00D9C0" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map((t) => (
          <line key={t} x1={(t / 100) * W} y1={baseY} x2={(t / 100) * W} y2={baseY + 4} stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        ))}
        <line x1={0} y1={baseY} x2={W} y2={baseY} stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <path d={areaD} fill="url(#ql-density-fill)" />
        <path
          d={d}
          fill="none"
          stroke="#00D9C0"
          strokeWidth="1.4"
          style={{ filter: 'drop-shadow(0 0 4px rgba(0, 217, 192, 0.5))' }}
        />
        <circle cx={(value / 100) * W} cy={peakY - (H - 16)} r="2.5" fill="#00D9C0" />
        <line x1={(value / 100) * W} y1={baseY} x2={(value / 100) * W} y2={6} stroke="#00D9C0" strokeWidth="1" />
      </svg>
      <div className="mt-1 flex justify-between text-[9px] text-text-muted font-mono tracking-wider">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  );
}
