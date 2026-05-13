import Link from 'next/link';
import { EARNINGS_CALLS, UPCOMING_EARNINGS } from '@/lib/data/earnings';

export const metadata = {
  title: 'Quantum Earnings Tracker · Distilled Quarterly Calls · Quantum Ledger',
  description:
    'Every public quantum-exposed earnings call distilled within 48 hours. Headline metrics, key quotes, what changed, and the read-through for the rest of the sector.',
};

export const revalidate = 86400;

export default function EarningsPage() {
  const sorted = [...EARNINGS_CALLS].sort(
    (a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime()
  );
  const tickersTracked = Array.from(new Set(EARNINGS_CALLS.map((c) => c.ticker)));

  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="qdot-live" />
            <span className="eyebrow">Earnings tracker · distilled quarterly calls</span>
          </div>
          <h1 className="font-display text-display-1 font-medium tracking-tight max-w-4xl">
            Every public quantum earnings call, distilled.
          </h1>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-3xl">
            Every quarter, six public companies with material quantum exposure report — IONQ, RGTI,
            QBTS, QUBT, HON, IBM. The transcripts run thousands of words each. This page distills
            every call within 48 hours: headline metric, key quotes, what changed in our read, and
            the read-through for the rest of the sector. Nobody else does this for quantum.
          </p>
          <p className="mt-5 text-xs font-mono uppercase tracking-wider text-text-muted">
            Currently tracking: {tickersTracked.join(' · ')}
          </p>
        </div>
      </section>

      {/* Upcoming earnings */}
      <section className="border-b border-border bg-bg-elevated/40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
          <p className="eyebrow mb-3">Next reports</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {UPCOMING_EARNINGS.map((u) => (
              <div key={u.ticker} className="card p-3">
                <p className="font-mono text-xs text-accent-quantum">{u.ticker}</p>
                <p className="text-xs text-text-secondary mt-0.5">{u.quarter}</p>
                <p className="text-[10px] font-mono text-text-muted mt-0.5">{u.expectedDate}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distilled calls */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <header className="mb-6">
          <p className="eyebrow mb-2">Most recent distillations</p>
          <h2 className="font-display text-3xl tracking-tight">Q1 2026 earnings season.</h2>
        </header>

        <div className="space-y-5">
          {sorted.map((call, i) => (
            <CallCard key={`${call.ticker}-${call.quarter}-${i}`} call={call} />
          ))}
        </div>
      </section>

      {/* Methodology note */}
      <section className="border-t border-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
          <p className="eyebrow mb-3">How these are produced</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Within 48 hours of each call, the transcript is read in full, key figures cross-checked
            against the 10-Q or 8-K, and a distillation is published with named quotes and a
            sector read-through. The objective is to save you 2-3 hours of transcript reading per
            quarter while preserving the most material data — guidance changes, surprise customer
            wins, management tone shifts, and what each call implies for the rest of the cohort.
          </p>
          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
            See <Link href="/ledger-score" className="text-accent-quantum hover:underline">/ledger-score</Link> for
            how each call feeds into the quarterly composite score update.
            See <Link href="/companies" className="text-accent-quantum hover:underline">/companies</Link> for
            the full per-company writeups that the earnings cycle informs.
          </p>
        </div>
      </section>
    </div>
  );
}

function CallCard({ call }: { call: (typeof EARNINGS_CALLS)[number] }) {
  return (
    <article className="card p-5">
      <header className="mb-4 flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-sm font-semibold text-accent-quantum">{call.ticker}</span>
            <span className="text-text-muted text-xs font-mono">·</span>
            <span className="text-text-secondary text-sm">{call.company}</span>
            <span className="text-text-muted text-xs font-mono">·</span>
            <span className="text-text-secondary text-xs font-mono">{call.quarter}</span>
          </div>
          <h3 className="font-display text-xl tracking-tight text-text-primary leading-tight">
            {call.headline}
          </h3>
        </div>
        <p className="text-xs font-mono text-text-muted whitespace-nowrap">{call.reportDate}</p>
      </header>

      {/* Headline metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden mb-4">
        {call.revenue && <Metric label="Revenue" value={call.revenue.value} sub={call.revenue.yoy} note={call.revenue.note} />}
        {call.netLoss && <Metric label="Net loss" value={call.netLoss.value} note={call.netLoss.note} />}
        {call.cash && <Metric label="Cash" value={call.cash.value} note={call.cash.note} />}
        {call.guidance && <Metric label="Guidance" value={call.guidance} fullWidth />}
      </div>

      <p className="text-sm text-text-secondary leading-relaxed mb-4">{call.takeaway}</p>

      {/* Quotes */}
      {call.quotes && call.quotes.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono mb-2">Key quotes</p>
          <div className="space-y-2">
            {call.quotes.map((q, i) => (
              <blockquote key={i} className="border-l-2 border-accent-quantum/40 pl-3">
                <p className="text-sm text-text-primary italic leading-relaxed">{q.quote}</p>
                <p className="text-xs font-mono text-text-muted mt-1">— {q.speaker}</p>
              </blockquote>
            ))}
          </div>
        </div>
      )}

      {/* What changed + read-through */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {call.whatChanged && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent-quantum mb-1">What changed</p>
            <p className="text-text-secondary leading-relaxed">{call.whatChanged}</p>
          </div>
        )}
        {call.readthrough && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent-data mb-1">Sector read-through</p>
            <p className="text-text-secondary leading-relaxed">{call.readthrough}</p>
          </div>
        )}
      </div>

      {call.sourceUrl && (
        <a href={call.sourceUrl} target="_blank" rel="noreferrer" className="inline-block mt-3 text-[10px] font-mono text-accent-quantum hover:underline">
          investor relations ↗
        </a>
      )}
    </article>
  );
}

function Metric({ label, value, sub, note, fullWidth }: { label: string; value: string; sub?: string; note?: string; fullWidth?: boolean }) {
  return (
    <div className={`bg-bg-surface p-3 ${fullWidth ? 'md:col-span-4' : ''}`}>
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">{label}</p>
      <p className="mt-1 font-mono text-sm text-text-primary leading-snug">{value}</p>
      {sub && <p className="text-[10px] font-mono text-accent-data mt-0.5">{sub}</p>}
      {note && <p className="text-[10px] text-text-muted mt-0.5">{note}</p>}
    </div>
  );
}
