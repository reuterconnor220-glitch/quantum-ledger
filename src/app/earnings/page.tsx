import Link from 'next/link';
import { EARNINGS_CALLS, UPCOMING_EARNINGS } from '@/lib/data/earnings';

export const metadata = {
  title: 'Quantum Earnings Tracker · Distilled Quarterly Calls',
  description:
    'Every public quantum-exposed earnings call distilled within 48 hours. Headline metrics, key quotes, what changed, and the read-through for the rest of the sector.',
};

export const revalidate = 86400;

export default function EarningsPage() {
  const sorted = [...EARNINGS_CALLS].sort(
    (a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime()
  );
  const tickersTracked = Array.from(new Set(EARNINGS_CALLS.map((c) => c.ticker)));
  const latestDate = sorted[0]?.reportDate ?? '';
  const nextUp = UPCOMING_EARNINGS[0];

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
      {/* ────────── Masthead ────────── */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>The Quarterly</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display text-[22px] tracking-tight text-text-primary normal-case">Q1 2026 Season</span>
            <span className="text-text-muted/60">·</span>
            <span>Distilled within 48h</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            Next print: {nextUp?.ticker} {nextUp?.quarter} · {nextUp?.expectedDate}
          </div>
          <div className="text-right leading-relaxed">
            {tickersTracked.length} tickers tracked
            <br />
            <Link href="/ledger-score" className="text-accent-data hover:underline normal-case">Feeds the Ledger Score ›</Link>
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.92] tracking-[-0.025em] text-[clamp(46px,8vw,112px)]">
          The Earnings <em className="not-italic font-normal text-accent-data">Desk</em>.
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[60ch]">
          Every public quantum-exposed earnings call, read in full and distilled to what changed.
        </p>
      </header>

      {/* ────────── Hero summary ────────── */}
      <section className="mt-9 py-7 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 border-b border-border">
        <div>
          <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-3">Why this exists</p>
          <p className="font-display italic text-xl text-text-secondary leading-snug mb-5 max-w-[60ch]">
            Every quarter, six public companies with material quantum exposure report. The
            transcripts run thousands of words each. Almost no equity analyst covers this beat with
            quantum-specific context. So we read them all — and distill each call within 48 hours
            into the part that actually moves the model.
          </p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-[60ch]">
            Each entry below: headline metric, key quotes from named speakers, what changed in our
            read of the company, and — most importantly — the sector read-through for the rest of
            the cohort. The wedge nobody else is filling for quantum.
          </p>
        </div>

        <div className="card p-5">
          <p className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-mono font-semibold mb-3">
            Coming up
          </p>
          <ul className="divide-y divide-border-muted">
            {UPCOMING_EARNINGS.map((u) => (
              <li key={u.ticker} className="py-2 flex items-center justify-between gap-2">
                <span className="font-mono text-sm text-accent-data font-semibold">{u.ticker}</span>
                <span className="text-xs text-text-secondary">{u.quarter}</span>
                <span className="font-mono text-xs text-text-muted tabular-nums">{u.expectedDate}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ────────── Distilled calls ────────── */}
      <section className="mt-14">
        <div className="mb-5 pb-3 border-b border-text-primary/90 flex items-end justify-between flex-wrap gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
              Most recent distillations · latest {latestDate}
            </p>
            <h2 className="font-display font-normal text-3xl tracking-tight">Q1 2026 reads.</h2>
          </div>
          <p className="font-display italic text-sm text-text-muted">
            {sorted.length} calls distilled this season
          </p>
        </div>

        <ol className="grid gap-1">
          {sorted.map((call, i) => (
            <li key={`${call.ticker}-${call.quarter}-${i}`}>
              <CallCard call={call} index={i + 1} />
            </li>
          ))}
        </ol>
      </section>

      {/* ────────── Methodology ────────── */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
        <FooterNote eyebrow="How these are produced">
          Within 48 hours of each call, the transcript is read in full and key figures cross-checked
          against the 10-Q or 8-K. Headline metrics, named quotes, what-changed, and the sector
          read-through are published as one entry. We don&apos;t paraphrase numbers; we cite them.
        </FooterNote>
        <FooterNote eyebrow="Feeds the Ledger Score">
          Each call updates the relevant company&apos;s commercial subscore (revenue, growth,
          customer concentration) and where material, the capital subscore (cash, guidance). The
          monthly{' '}
          <Link href="/ledger-score" className="text-accent-data hover:underline">composite refresh</Link> incorporates these.
        </FooterNote>
        <FooterNote eyebrow="What we don't do">
          We don&apos;t price target, we don&apos;t rate (buy/hold/sell), and we don&apos;t front-run
          earnings with predictions. The distillation is descriptive after the fact. The opinion is
          in the read-through column, and you can disagree productively.
        </FooterNote>
      </section>
    </div>
  );
}

function CallCard({ call, index }: { call: (typeof EARNINGS_CALLS)[number]; index: number }) {
  return (
    <article className="grid grid-cols-[56px_minmax(0,1fr)] gap-6 py-7 border-t border-border first:border-t-0 -mx-4 px-4">
      <span className="font-display tabular-nums leading-none text-[44px] text-text-muted">
        {String(index).padStart(2, '0')}
      </span>

      <div className="min-w-0">
        <header className="mb-3">
          <div className="flex items-center gap-2 mb-1.5 text-[10px] uppercase tracking-[0.08em] font-mono">
            <span className="text-accent-data font-semibold">{call.ticker}</span>
            <span className="text-text-muted/60">·</span>
            <span className="text-text-secondary">{call.company}</span>
            <span className="text-text-muted/60">·</span>
            <span className="text-text-muted">{call.quarter}</span>
            <span className="ml-auto font-mono text-[10px] text-text-muted whitespace-nowrap">
              {call.reportDate}
            </span>
          </div>
          <h3 className="font-display font-normal text-[clamp(20px,2.4vw,28px)] tracking-tight text-text-primary leading-snug text-balance">
            {call.headline}
          </h3>
        </header>

        {/* Headline metrics — newspaper data strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden mb-4">
          {call.revenue && <Metric label="Revenue" value={call.revenue.value} sub={call.revenue.yoy} note={call.revenue.note} />}
          {call.netLoss && <Metric label="Net loss" value={call.netLoss.value} note={call.netLoss.note} />}
          {call.cash && <Metric label="Cash" value={call.cash.value} note={call.cash.note} />}
          {call.guidance && <Metric label="Guidance" value={call.guidance} fullWidth />}
        </div>

        <p className="font-display italic text-base text-text-primary leading-relaxed mb-4 border-l-2 border-accent-data/40 pl-3">
          {call.takeaway}
        </p>

        {/* Quotes */}
        {call.quotes && call.quotes.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-2">From the call</p>
            <div className="space-y-3">
              {call.quotes.map((q, i) => (
                <blockquote key={i}>
                  <p className="font-display text-base text-text-primary italic leading-snug">
                    &ldquo;{q.quote.replace(/^"/, '').replace(/"$/, '')}&rdquo;
                  </p>
                  <p className="text-[11px] font-mono text-text-muted mt-1 uppercase tracking-wider">— {q.speaker}</p>
                </blockquote>
              ))}
            </div>
          </div>
        )}

        {/* What changed + read-through */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm pt-3 border-t border-border-muted">
          {call.whatChanged && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent-quantum mb-1.5">
                What changed in our read
              </p>
              <p className="text-text-secondary leading-relaxed">{call.whatChanged}</p>
            </div>
          )}
          {call.readthrough && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent-data mb-1.5">
                Sector read-through
              </p>
              <p className="text-text-secondary leading-relaxed">{call.readthrough}</p>
            </div>
          )}
        </div>

        {call.sourceUrl && (
          <a href={call.sourceUrl} target="_blank" rel="noreferrer" className="inline-block mt-3 text-[10px] font-mono text-accent-data hover:underline uppercase tracking-wider">
            Investor relations ↗
          </a>
        )}
      </div>
    </article>
  );
}

function Metric({ label, value, sub, note, fullWidth }: { label: string; value: string; sub?: string; note?: string; fullWidth?: boolean }) {
  return (
    <div className={`bg-bg-surface p-3 ${fullWidth ? 'md:col-span-4' : ''}`}>
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono">{label}</p>
      <p className="mt-1 font-display text-lg text-text-primary tracking-tight tabular-nums leading-snug">{value}</p>
      {sub && <p className="text-[10px] font-mono text-accent-data mt-0.5">{sub}</p>}
      {note && <p className="text-[10px] text-text-muted mt-0.5">{note}</p>}
    </div>
  );
}

function FooterNote({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-2">{eyebrow}</p>
      <p className="text-sm text-text-secondary leading-relaxed">{children}</p>
    </div>
  );
}
