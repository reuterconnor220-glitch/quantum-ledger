import Link from 'next/link';
import { LEDGER_SCORES, SCORE_PUBLISH_DATE, NEXT_REVIEW_DATE, SCORE_WEIGHTS, scoreColor, scoreBg } from '@/lib/data/ledger-score';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'The Ledger Score · Quantum Sector Scoring Framework · Quantum Ledger',
  description:
    "Quantum Ledger's signature scoring framework. Every meaningful quantum company scored across tech, capital, commercial traction, and government validation. Published methodology, updated monthly.",
};

export const revalidate = 86400;

export default function LedgerScorePage() {
  const sorted = [...LEDGER_SCORES].sort((a, b) => b.scores.total - a.scores.total);
  const publicNames = sorted.filter((e) => e.isPublic);
  const privateNames = sorted.filter((e) => !e.isPublic);

  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="qdot-live" />
            <span className="eyebrow">The Ledger Score · v1.0 · published {SCORE_PUBLISH_DATE}</span>
          </div>
          <h1 className="font-display text-display-1 font-medium tracking-tight max-w-4xl">
            One number per company.
          </h1>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-3xl">
            The Ledger Score is Quantum Ledger&apos;s standing assessment of every meaningful quantum
            company. Each entity is scored 0–100 across four dimensions — technology, capital,
            commercial traction, and government validation — then weighted into a single composite.
            Methodology is published. Inputs are sourced. The score updates monthly so changes —
            DARPA Stage C decisions, earnings prints, new fidelity records — actually move it.
          </p>
          <p className="mt-5 text-xs font-mono uppercase tracking-wider text-text-muted max-w-3xl">
            Next review: {NEXT_REVIEW_DATE} · Read the <Link href="/ledger-score/methodology" className="text-accent-quantum hover:underline">full methodology →</Link>
          </p>
        </div>
      </section>

      {/* Weights strip */}
      <section className="border-b border-border bg-bg-elevated/40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
          <p className="eyebrow mb-3">Composite weighting</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Weight label="Technology" value={SCORE_WEIGHTS.tech} description="Best published fidelity, logical qubits demonstrated, architecture credibility." />
            <Weight label="Capital" value={SCORE_WEIGHTS.capital} description="Balance sheet, runway, valuation momentum, market access." />
            <Weight label="Commercial" value={SCORE_WEIGHTS.commercial} description="TTM revenue, growth, customer mix, concentration risk." />
            <Weight label="Government validation" value={SCORE_WEIGHTS.government} description="DARPA QBI stage, US2QC, NATO/EU programs, named contracts." />
          </div>
        </div>
      </section>

      {/* Ranking — public names */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <header className="mb-6">
          <p className="eyebrow mb-2">Public-market ranking · May 2026</p>
          <h2 className="font-display text-3xl tracking-tight">The composite, public names.</h2>
        </header>
        <RankingTable entries={publicNames} />
      </section>

      {/* Ranking — private */}
      <section className="border-y border-border bg-bg-elevated/40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <header className="mb-6">
            <p className="eyebrow mb-2">Private-market ranking · May 2026</p>
            <h2 className="font-display text-3xl tracking-tight">The composite, private names.</h2>
            <p className="mt-2 text-sm text-text-secondary max-w-3xl">
              Private-market scoring is less precise than public because financial inputs are
              partial. Where balance-sheet and revenue data are unavailable, the score uses the
              most credible third-party estimate; assumptions are flagged inline.
            </p>
          </header>
          <RankingTable entries={privateNames} />
        </div>
      </section>

      {/* Full breakdown cards */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <header className="mb-6">
          <p className="eyebrow mb-2">Per-company breakdown</p>
          <h2 className="font-display text-3xl tracking-tight">Where each score comes from.</h2>
          <p className="mt-2 text-sm text-text-secondary max-w-3xl">
            Each card shows the four-dimension breakdown, the driver behind each, plus the bull
            and bear in one line each. Companies link to their full profile for the deeper read.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sorted.map((e) => (
            <CompanyBreakdown key={e.slug} entry={e} />
          ))}
        </div>
      </section>

      {/* Footer notes */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="card p-5">
              <p className="eyebrow mb-2">How to read the score</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Treat it as a structured opinion, not a recommendation. A higher score means more
                positive signals across the four dimensions today; it says nothing about whether
                a stock is priced correctly. Use it as a starting point, then read the per-company
                profile and the source citations.
              </p>
            </div>
            <div className="card p-5">
              <p className="eyebrow mb-2">Update cadence</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Scores are refreshed monthly. Out-of-cycle updates occur when material events
                land: DARPA stage announcements, earnings prints, S-1 filings, major
                technical results. Every change is logged in the methodology page.
              </p>
            </div>
            <div className="card p-5">
              <p className="eyebrow mb-2">Methodology + sources</p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Every input is sourced. The four scoring rubrics are published in full at{' '}
                <Link href="/ledger-score/methodology" className="text-accent-quantum hover:underline">/ledger-score/methodology</Link>.
                Disagree with a score? The methodology page explains the framework so the
                disagreement is structured rather than vibes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Weight({ label, value, description }: { label: string; value: number; description: string }) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-sm text-text-primary font-semibold">{label}</span>
        <span className="font-mono text-xs text-accent-quantum">{Math.round(value * 100)}%</span>
      </div>
      <p className="text-xs text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function RankingTable({ entries }: { entries: typeof LEDGER_SCORES }) {
  return (
    <div className="card overflow-x-auto">
      <table className="ql-table min-w-[720px] w-full">
        <thead>
          <tr>
            <th className="pl-5">#</th>
            <th>Company</th>
            <th>Ticker</th>
            <th className="num">Tech</th>
            <th className="num">Capital</th>
            <th className="num">Comm.</th>
            <th className="num">Gov.</th>
            <th className="num text-text-primary">Total</th>
            <th className="pr-5">Trend</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={e.slug}>
              <td className="pl-5 text-text-muted font-mono">{i + 1}</td>
              <td>
                <Link href={`/companies/${e.slug}`} className="text-text-primary hover:text-accent-quantum">
                  {e.name}
                </Link>
              </td>
              <td className="font-mono text-xs text-text-muted">{e.ticker ?? '—'}</td>
              <td className={`num font-mono ${scoreColor(e.scores.tech)}`}>{e.scores.tech}</td>
              <td className={`num font-mono ${scoreColor(e.scores.capital)}`}>{e.scores.capital}</td>
              <td className={`num font-mono ${scoreColor(e.scores.commercial)}`}>{e.scores.commercial}</td>
              <td className={`num font-mono ${scoreColor(e.scores.government)}`}>{e.scores.government}</td>
              <td className={`num font-mono text-lg font-semibold ${scoreColor(e.scores.total)}`}>{e.scores.total}</td>
              <td className="pr-5">
                <TrendChip trend={e.trend} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TrendChip({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'up') return <span className="text-accent-data text-xs">↑</span>;
  if (trend === 'down') return <span className="text-accent-down text-xs">↓</span>;
  return <span className="text-text-muted text-xs">—</span>;
}

function CompanyBreakdown({ entry }: { entry: (typeof LEDGER_SCORES)[number] }) {
  return (
    <article className="card p-5">
      <header className="mb-3 flex items-start justify-between gap-2 flex-wrap">
        <div>
          <h3 className="font-display text-xl leading-tight">
            <Link href={`/companies/${entry.slug}`} className="hover:text-accent-quantum">
              {entry.name}
            </Link>
          </h3>
          <p className="text-xs font-mono text-text-muted mt-0.5">
            {entry.ticker ?? 'Private'} · {entry.isPublic ? 'public' : 'private'}
          </p>
        </div>
        <div className="text-right">
          <p className={`font-display text-4xl font-medium ${scoreColor(entry.scores.total)}`}>
            {entry.scores.total}
          </p>
          <TrendChip trend={entry.trend} />
        </div>
      </header>

      <p className="text-sm text-text-primary italic leading-relaxed mb-4 border-l-2 border-accent-quantum/40 pl-3">
        {entry.thesis}
      </p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <Dimension label="Technology" score={entry.scores.tech} driver={entry.drivers.tech} />
        <Dimension label="Capital" score={entry.scores.capital} driver={entry.drivers.capital} />
        <Dimension label="Commercial" score={entry.scores.commercial} driver={entry.drivers.commercial} />
        <Dimension label="Government" score={entry.scores.government} driver={entry.drivers.government} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-accent-data mb-1">Bull</p>
          <p className="text-text-secondary leading-relaxed">{entry.bull}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-accent-down mb-1">Bear</p>
          <p className="text-text-secondary leading-relaxed">{entry.bear}</p>
        </div>
      </div>
    </article>
  );
}

function Dimension({ label, score, driver }: { label: string; score: number; driver: string }) {
  return (
    <div className={`p-2 rounded-sm ${scoreBg(score)}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] uppercase tracking-wider font-mono text-text-muted">{label}</span>
        <span className={`font-mono font-semibold ${scoreColor(score)}`}>{score}</span>
      </div>
      <div className="h-1 bg-bg/40 rounded-xs overflow-hidden">
        <div className={`h-full ${scoreColor(score).replace('text-', 'bg-')}`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-[11px] text-text-secondary leading-snug mt-1.5">{driver}</p>
    </div>
  );
}
