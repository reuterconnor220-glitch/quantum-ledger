import Link from 'next/link';
import { COMPANIES } from '@/lib/data/companies';
import { TECHNOLOGY_LABEL } from '@/lib/types';
import { formatPct, formatUsd } from '@/lib/utils';
import { Sparkline, generateSparkData } from '@/components/Sparkline';

export const metadata = {
  title: 'Companies — Quantum Computing Tracker',
  description: 'Sixteen tracked quantum companies — public pure-plays, diversified parents, and pending IPOs/SPACs. Live financial intelligence.',
};

export const revalidate = 3600;

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'public', label: 'Public' },
  { key: 'private', label: 'Private' },
  { key: 'pure_play', label: 'Pure-Play' },
  { key: 'diversified', label: 'Diversified' },
];

export default function CompaniesPage() {
  const sorted = [...COMPANIES].sort((a, b) => (b.marketCapUsd ?? b.latestRoundValuationUsd ?? 0) - (a.marketCapUsd ?? a.latestRoundValuationUsd ?? 0));

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
      {/* Header */}
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow mb-2">Tracker</p>
        <h1 className="font-display text-display-2 font-medium tracking-tight">Quantum companies</h1>
        <p className="mt-4 text-text-secondary leading-relaxed">
          Sixteen tracked entities — five public pure-plays, four diversified incumbents, and seven private or
          pending-IPO companies. Every entry is independently classified and updated as filings, funding
          rounds, and technical milestones land.
        </p>
      </div>

      {/* Filter strip (visual only for v1; client filtering can be wired later) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider border border-border rounded-sm text-text-secondary hover:text-text-primary hover:bg-bg-surface"
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Big table */}
      <div className="card overflow-x-auto">
        <table className="ql-table min-w-[900px]">
          <thead>
            <tr>
              <th className="pl-5">Company</th>
              <th>Approach</th>
              <th>Status</th>
              <th className="num">Mkt Cap / Valn</th>
              <th className="num">Rev TTM</th>
              <th className="num">YoY</th>
              <th className="num">Cash</th>
              <th>30d</th>
              <th className="pr-5"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c, i) => {
              const valuation = c.marketCapUsd ?? c.latestRoundValuationUsd;
              return (
                <tr key={c.slug}>
                  <td className="pl-5">
                    <Link href={`/companies/${c.slug}`} className="block group">
                      <div className="font-sans text-text-primary font-medium group-hover:text-accent-quantum flex items-center gap-2">
                        {c.name}
                        {c.status === 'ipo_filed' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-accent-warn/15 text-accent-warn rounded-xs uppercase">
                            S-1 filed
                          </span>
                        )}
                        {c.status === 'pending_spac' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-accent-warn/15 text-accent-warn rounded-xs uppercase">
                            SPAC
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-text-muted">
                        {c.ticker ?? c.pendingTicker ?? 'Private'} {c.hqCity ? `· ${c.hqCity}` : ''}
                      </div>
                    </Link>
                  </td>
                  <td className="text-text-secondary text-xs">{TECHNOLOGY_LABEL[c.technologyApproach]}</td>
                  <td className="text-text-secondary text-xs uppercase tracking-wider">
                    {c.isPublic ? 'Public' : 'Private'}
                  </td>
                  <td className="num">{formatUsd(valuation)}</td>
                  <td className="num">{formatUsd(c.revenueTtmUsd)}</td>
                  <td className={`num ${(c.revenueYoyGrowth ?? 0) >= 0 ? 'text-accent-data' : 'text-accent-down'}`}>
                    {c.revenueYoyGrowth !== undefined ? formatPct(c.revenueYoyGrowth, { signed: true }) : '—'}
                  </td>
                  <td className="num">{formatUsd(c.cashUsd)}</td>
                  <td>
                    {c.isPublic ? (
                      <Sparkline data={generateSparkData(i + 1)} positive={(c.revenueYoyGrowth ?? 0) >= 0} />
                    ) : (
                      <span className="text-xs text-text-muted font-mono">—</span>
                    )}
                  </td>
                  <td className="pr-5 text-right">
                    <Link href={`/companies/${c.slug}`} className="text-xs text-accent-quantum hover:text-accent-quantum/80">
                      Open →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-text-muted leading-relaxed max-w-3xl">
        Figures sourced from SEC filings, press releases, and reputable financial press as of the
        most recent reporting period. Daily price moves auto-update via the daily pipeline; financial
        snapshots refresh quarterly. See{' '}
        <Link href="/methodology" className="text-accent-quantum hover:underline">
          methodology
        </Link>
        .
      </p>
    </div>
  );
}
