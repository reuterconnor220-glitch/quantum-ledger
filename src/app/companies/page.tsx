import Link from 'next/link';
import { COMPANIES } from '@/lib/data/companies';
import { CompaniesTable } from './CompaniesTable';

export const metadata = {
  title: 'Companies — Quantum Computing Tracker',
  description: '32 tracked quantum companies — US public, international public, pending IPOs/SPACs, and private. Live filterable by listing, technology, and type.',
};

export const revalidate = 3600;

export default function CompaniesPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
      {/* Header */}
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow mb-2">Tracker</p>
        <h1 className="font-display text-display-2 font-medium tracking-tight">Quantum companies</h1>
        <p className="mt-4 text-text-secondary leading-relaxed">
          {COMPANIES.length} tracked entities — US public pure-plays, international listings, pending
          IPOs/SPACs, and meaningful privates including all 11 DARPA QBI Stage B participants. Every entry
          is independently classified and updated as filings, funding rounds, and technical milestones land.
        </p>
      </div>

      <CompaniesTable companies={COMPANIES} />

      <p className="mt-6 text-xs text-text-muted leading-relaxed max-w-3xl">
        Figures sourced from SEC filings, press releases, and reputable financial press as of the most
        recent reporting period. Daily price moves auto-update via the daily pipeline; financial snapshots
        refresh quarterly. See{' '}
        <Link href="/methodology" className="text-accent-quantum hover:underline">
          methodology
        </Link>
        .
      </p>
    </div>
  );
}
