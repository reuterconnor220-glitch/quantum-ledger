import Link from 'next/link';
import {
  LEDGER_SCORES,
  SCORE_PUBLISH_DATE,
  NEXT_REVIEW_DATE,
  SCORE_WEIGHTS,
  sectorAverageScore,
  SECTOR_SCORE_DELTA,
  sectorMood,
  scoreColor,
  scoreBg,
} from '@/lib/data/ledger-score';

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
  const sectorScore = sectorAverageScore();
  const moodLabel = sectorMood(sectorScore);
  const topThree = sorted.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
      {/* ────────── Masthead ────────── */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Edition v1.0</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display text-[22px] tracking-tight text-text-primary normal-case">Published {SCORE_PUBLISH_DATE}</span>
            <span className="text-text-muted/60">·</span>
            <span>Monthly refresh</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            Next review: {NEXT_REVIEW_DATE}
          </div>
          <div className="text-right leading-relaxed">
            <Link href="/ledger-score/methodology" className="text-accent-data hover:underline">
              Methodology ›
            </Link>
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.92] tracking-[-0.025em] text-[clamp(46px,8vw,112px)]">
          The Ledger <em className="not-italic font-normal text-accent-data">Score</em>.
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[60ch]">
          One number per company. The standing assessment of every meaningful quantum business.
        </p>
      </header>

      {/* ────────── Composite hero ────────── */}
      <section className="mt-9 py-7 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 border-b border-border">
        {/* Left: explanation */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-3">
            How the framework works
          </p>
          <p className="font-display italic text-xl text-text-secondary leading-snug mb-5 max-w-[60ch]">
            Every entity is scored 0–100 across four dimensions — technology, capital, commercial
            traction, and government validation — then weighted into a single composite. Methodology
            is published. Every input is sourced. The score updates monthly so material events —
            DARPA Stage C decisions, earnings prints, new fidelity records — actually move it.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <Weight label="Technology" value={SCORE_WEIGHTS.tech} />
            <Weight label="Capital" value={SCORE_WEIGHTS.capital} />
            <Weight label="Commercial" value={SCORE_WEIGHTS.commercial} />
            <Weight label="Government" value={SCORE_WEIGHTS.government} />
          </div>
        </div>

        {/* Right: sector composite panel */}
        <div className="card p-5 border-accent-data/40 bg-gradient-to-b from-accent-data/5 to-transparent">
          <div className="flex items-center justify-between mb-2 text-[11px] uppercase tracking-[0.08em] font-mono">
            <span className="text-text-secondary font-semibold">Sector composite</span>
            <span className="text-text-muted">{LEDGER_SCORES.length} firms</span>
          </div>
          <div className="grid grid-cols-[auto_1fr] items-end gap-4 mb-2">
            <div className={`font-display text-[92px] leading-[0.86] tracking-[-0.045em] tabular-nums ${scoreColor(sectorScore)}`}>
              {sectorScore}
            </div>
            <div className="text-right pb-1.5 font-mono">
              <div className={SECTOR_SCORE_DELTA >= 0 ? "text-accent-data font-semibold text-xs tracking-[0.02em]" : "text-accent-down font-semibold text-xs tracking-[0.02em]"}>
                {SECTOR_SCORE_DELTA >= 0 ? '▲' : '▼'} {SECTOR_SCORE_DELTA >= 0 ? '+' : ''}{SECTOR_SCORE_DELTA} vs T-1
              </div>
              <div className="text-[10px] text-text-muted">/ 0 to 100</div>
            </div>
          </div>
          <div className="font-display italic text-base text-text-secondary mb-4">&ldquo;{moodLabel}&rdquo;</div>
          <div className="pt-3 border-t border-border-muted">
            <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-2">Top three this issue</p>
            {topThree.map((e, i) => (
              <div key={e.slug} className="flex items-baseline justify-between text-sm py-1">
                <span className="font-display text-text-primary truncate pr-2">
                  <span className="text-text-muted font-mono text-xs tabular-nums mr-2">{String(i + 1).padStart(2, '0')}</span>
                  {e.name}
                </span>
                <span className={`font-mono font-semibold ${scoreColor(e.scores.total)}`}>{e.scores.total}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Public ranking ────────── */}
      <section className="mt-14">
        <div className="flex items-end justify-between mb-5 pb-3 border-b border-text-primary/90 flex-wrap gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
              Public-market ranking · {SCORE_PUBLISH_DATE}
            </p>
            <h2 className="font-display font-normal text-3xl tracking-tight">The composite, public names.</h2>
          </div>
          <p className="font-display italic text-sm text-text-muted">
            {publicNames.length} public-market entries
          </p>
        </div>
        <RankingTable entries={publicNames} startIndex={0} />
      </section>

      {/* ────────── Private ranking ────────── */}
      <section className="mt-14">
        <div className="flex items-end justify-between mb-5 pb-3 border-b border-text-primary/90 flex-wrap gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
              Private-market ranking · {SCORE_PUBLISH_DATE}
            </p>
            <h2 className="font-display font-normal text-3xl tracking-tight">The composite, private names.</h2>
          </div>
          <p className="font-display italic text-sm text-text-muted">
            {privateNames.length} private entries
          </p>
        </div>
        <p className="text-sm text-text-secondary max-w-3xl mb-5">
          Private-market scoring is less precise than public because financial inputs are partial.
          Where balance-sheet and revenue data are unavailable, the score uses the most credible
          third-party estimate; assumptions are flagged inline.
        </p>
        <RankingTable entries={privateNames} startIndex={0} />
      </section>

      {/* ────────── Per-company breakdown ────────── */}
      <section className="mt-16">
        <div className="mb-5 pb-3 border-b border-text-primary/90">
          <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
            Per-company breakdown
          </p>
          <h2 className="font-display font-normal text-3xl tracking-tight">Where each score comes from.</h2>
        </div>
        <p className="font-display italic text-base text-text-secondary leading-snug max-w-[60ch] mb-7">
          Each card shows the four-dimension breakdown, the driver behind each score, plus the
          bull and bear case in one line each.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sorted.map((e) => (
            <CompanyBreakdown key={e.slug} entry={e} />
          ))}
        </div>
      </section>

      {/* ────────── Reading the score ────────── */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
        <FooterNote eyebrow="How to read the score">
          Treat it as a structured opinion, not a recommendation. A higher score means more positive
          signals across the four dimensions today; it says nothing about whether a stock is priced
          correctly. Use it as a starting point, then read the per-company profile and source
          citations.
        </FooterNote>
        <FooterNote eyebrow="Update cadence">
          Scores are refreshed on the 13th of each month. Out-of-cycle updates occur when material
          events land: DARPA stage announcements, earnings prints, S-1 filings, major technical
          results. Every change is logged in the methodology page.
        </FooterNote>
        <FooterNote eyebrow="Methodology + sources">
          Every input is sourced. The four scoring rubrics are published in full at{' '}
          <Link href="/ledger-score/methodology" className="text-accent-data hover:underline">
            /ledger-score/methodology
          </Link>
          . Disagree with a score? The methodology page explains the framework so the disagreement
          is structured rather than vibes.
        </FooterNote>
      </section>
    </div>
  );
}

/* ────────────────────────────── helpers ────────────────────────────── */

function Weight({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-l-2 border-accent-data/40 pl-3">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono">{label}</p>
      <p className="font-display text-xl text-text-primary tracking-tight mt-0.5">
        {Math.round(value * 100)}<span className="text-text-muted text-sm">%</span>
      </p>
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

function RankingTable({ entries, startIndex }: { entries: typeof LEDGER_SCORES; startIndex: number }) {
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
              <td className="pl-5 text-text-muted font-mono tabular-nums">{String(startIndex + i + 1).padStart(2, '0')}</td>
              <td>
                <Link href={`/companies/${e.slug}`} className="text-text-primary hover:text-accent-data">
                  {e.name}
                </Link>
              </td>
              <td className="font-mono text-xs text-text-muted">{e.ticker ?? '—'}</td>
              <td className={`num font-mono ${scoreColor(e.scores.tech)}`}>{e.scores.tech}</td>
              <td className={`num font-mono ${scoreColor(e.scores.capital)}`}>{e.scores.capital}</td>
              <td className={`num font-mono ${scoreColor(e.scores.commercial)}`}>{e.scores.commercial}</td>
              <td className={`num font-mono ${scoreColor(e.scores.government)}`}>{e.scores.government}</td>
              <td className={`num font-display text-2xl font-medium tabular-nums ${scoreColor(e.scores.total)}`}>{e.scores.total}</td>
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
  if (trend === 'up') return <span className="text-accent-data text-sm">↑</span>;
  if (trend === 'down') return <span className="text-accent-down text-sm">↓</span>;
  return <span className="text-text-muted text-sm">—</span>;
}

function CompanyBreakdown({ entry }: { entry: (typeof LEDGER_SCORES)[number] }) {
  return (
    <article className="card p-5">
      <header className="mb-3 flex items-start justify-between gap-2 flex-wrap">
        <div>
          <h3 className="font-display text-2xl leading-tight tracking-tight">
            <Link href={`/companies/${entry.slug}`} className="hover:text-accent-data">
              {entry.name}
            </Link>
          </h3>
          <p className="text-xs font-mono text-text-muted mt-0.5">
            {entry.ticker ?? 'Private'} · {entry.isPublic ? 'public' : 'private'}
          </p>
        </div>
        <div className="text-right">
          <p className={`font-display text-5xl font-medium tabular-nums tracking-tight ${scoreColor(entry.scores.total)}`}>
            {entry.scores.total}
          </p>
          <TrendChip trend={entry.trend} />
        </div>
      </header>

      <p className="font-display italic text-sm text-text-primary leading-relaxed mb-4 border-l-2 border-accent-data/40 pl-3">
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
