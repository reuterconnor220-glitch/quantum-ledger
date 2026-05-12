'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Company } from '@/lib/types';
import { TECHNOLOGY_LABEL } from '@/lib/types';
import { formatPct, formatUsd } from '@/lib/utils';
import { Sparkline, generateSparkData } from '@/components/Sparkline';

type ListingFilter = 'all' | 'public_us' | 'public_intl' | 'private' | 'pending_ipo';
type PurityFilter = 'all' | 'pure_play' | 'diversified' | 'software_layer' | 'sensing_adjacent' | 'encryption_adjacent';
type TechFilter = 'all' | string;
type SortKey = 'valuation' | 'revenue' | 'yoy' | 'cash' | 'name';

function isUS(country?: string): boolean {
  if (!country) return false;
  const c = country.toUpperCase();
  return c.startsWith('USA') || c === 'US' || c.includes('USA/') || c.includes('/USA');
}

export function CompaniesTable({ companies }: { companies: Company[] }) {
  const [listing, setListing] = useState<ListingFilter>('all');
  const [purity, setPurity] = useState<PurityFilter>('all');
  const [tech, setTech] = useState<TechFilter>('all');
  const [sort, setSort] = useState<SortKey>('valuation');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = [...companies];

    // Listing filter
    if (listing === 'public_us') {
      list = list.filter((c) => c.isPublic && isUS(c.hqCountry));
    } else if (listing === 'public_intl') {
      list = list.filter((c) => c.isPublic && !isUS(c.hqCountry));
    } else if (listing === 'private') {
      list = list.filter((c) => !c.isPublic && c.status !== 'ipo_filed' && c.status !== 'pending_spac');
    } else if (listing === 'pending_ipo') {
      list = list.filter((c) => !c.isPublic && (c.status === 'ipo_filed' || c.status === 'pending_spac'));
    }

    // Purity filter
    if (purity !== 'all') {
      list = list.filter((c) => c.purity === purity);
    }

    // Tech filter
    if (tech !== 'all') {
      list = list.filter((c) => c.technologyApproach === tech);
    }

    // Search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.ticker?.toLowerCase().includes(q) ||
          c.oneLineThesis.toLowerCase().includes(q) ||
          c.hqCountry?.toLowerCase().includes(q) ||
          c.hqCity?.toLowerCase().includes(q)
      );
    }

    // Sort
    list.sort((a, b) => {
      switch (sort) {
        case 'valuation':
          return ((b.marketCapUsd ?? b.latestRoundValuationUsd ?? 0) -
            (a.marketCapUsd ?? a.latestRoundValuationUsd ?? 0));
        case 'revenue':
          return (b.revenueTtmUsd ?? 0) - (a.revenueTtmUsd ?? 0);
        case 'yoy':
          return (b.revenueYoyGrowth ?? -Infinity) - (a.revenueYoyGrowth ?? -Infinity);
        case 'cash':
          return (b.cashUsd ?? 0) - (a.cashUsd ?? 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return list;
  }, [companies, listing, purity, tech, sort, search]);

  // Aggregate stats
  const totalPublicUS = companies.filter((c) => c.isPublic && isUS(c.hqCountry)).length;
  const totalPublicIntl = companies.filter((c) => c.isPublic && !isUS(c.hqCountry)).length;
  const totalPrivate = companies.filter((c) => !c.isPublic && c.status !== 'ipo_filed' && c.status !== 'pending_spac').length;
  const totalPending = companies.filter((c) => !c.isPublic && (c.status === 'ipo_filed' || c.status === 'pending_spac')).length;

  const techCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    companies.forEach((c) => {
      counts[c.technologyApproach] = (counts[c.technologyApproach] ?? 0) + 1;
    });
    return counts;
  }, [companies]);

  return (
    <div>
      {/* Filter bar */}
      <div className="card p-4 mb-6 space-y-3">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company, ticker, country, thesis…"
          className="w-full bg-bg-elevated border border-border rounded-sm px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-quantum"
        />

        {/* Listing */}
        <div>
          <p className="eyebrow mb-2">Listing</p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={listing === 'all'} onClick={() => setListing('all')} label={`All · ${companies.length}`} />
            <Chip active={listing === 'public_us'} onClick={() => setListing('public_us')} label={`US public · ${totalPublicUS}`} />
            <Chip active={listing === 'public_intl'} onClick={() => setListing('public_intl')} label={`International public · ${totalPublicIntl}`} />
            <Chip active={listing === 'pending_ipo'} onClick={() => setListing('pending_ipo')} label={`Pending IPO/SPAC · ${totalPending}`} />
            <Chip active={listing === 'private'} onClick={() => setListing('private')} label={`Private · ${totalPrivate}`} />
          </div>
        </div>

        {/* Tech approach */}
        <div>
          <p className="eyebrow mb-2">Technology</p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={tech === 'all'} onClick={() => setTech('all')} label={`All · ${companies.length}`} />
            {(Object.keys(TECHNOLOGY_LABEL) as Array<keyof typeof TECHNOLOGY_LABEL>)
              .filter((t) => techCounts[t])
              .sort((a, b) => (techCounts[b] ?? 0) - (techCounts[a] ?? 0))
              .map((t) => (
                <Chip
                  key={t}
                  active={tech === t}
                  onClick={() => setTech(t)}
                  label={`${TECHNOLOGY_LABEL[t]} · ${techCounts[t] ?? 0}`}
                />
              ))}
          </div>
        </div>

        {/* Purity */}
        <div>
          <p className="eyebrow mb-2">Type</p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={purity === 'all'} onClick={() => setPurity('all')} label="All" />
            <Chip active={purity === 'pure_play'} onClick={() => setPurity('pure_play')} label="Pure-play" />
            <Chip active={purity === 'diversified'} onClick={() => setPurity('diversified')} label="Diversified" />
            <Chip active={purity === 'software_layer'} onClick={() => setPurity('software_layer')} label="Software" />
            <Chip active={purity === 'sensing_adjacent'} onClick={() => setPurity('sensing_adjacent')} label="Sensing" />
          </div>
        </div>

        {/* Sort + count */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-border-muted">
          <div className="flex items-center gap-2">
            <span className="eyebrow">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-bg-elevated border border-border rounded-sm px-2 py-1 text-xs font-mono text-text-primary"
            >
              <option value="valuation">Valuation / Mkt Cap</option>
              <option value="revenue">Revenue TTM</option>
              <option value="yoy">YoY Growth</option>
              <option value="cash">Cash</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>
          <div className="text-xs font-mono text-text-muted">
            Showing {filtered.length} of {companies.length}
            {(listing !== 'all' || purity !== 'all' || tech !== 'all' || search) && (
              <button
                onClick={() => {
                  setListing('all');
                  setPurity('all');
                  setTech('all');
                  setSearch('');
                }}
                className="ml-3 text-accent-quantum hover:underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center text-text-muted">
          No companies match your filters.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="ql-table min-w-[900px]">
            <thead>
              <tr>
                <th className="pl-5">Company</th>
                <th>Approach</th>
                <th>HQ</th>
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
              {filtered.map((c, i) => {
                const valuation = c.marketCapUsd ?? c.latestRoundValuationUsd;
                return (
                  <tr key={c.slug}>
                    <td className="pl-5">
                      <Link href={`/companies/${c.slug}`} className="block group">
                        <div className="font-sans text-text-primary font-medium group-hover:text-accent-quantum flex items-center gap-2 flex-wrap">
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
                          {c.ticker ?? c.pendingTicker ?? 'Private'}
                        </div>
                      </Link>
                    </td>
                    <td className="text-text-secondary text-xs">{TECHNOLOGY_LABEL[c.technologyApproach]}</td>
                    <td className="text-text-secondary text-xs">
                      <span className="font-mono">{c.hqCountry ?? '—'}</span>
                      {c.hqCity && <div className="text-text-muted text-[10px]">{c.hqCity}</div>}
                    </td>
                    <td className="text-text-secondary text-xs uppercase tracking-wider">
                      {c.isPublic ? (isUS(c.hqCountry) ? 'US Public' : 'Intl Public') : 'Private'}
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
      )}
    </div>
  );
}

function Chip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider border rounded-sm transition ${
        active
          ? 'bg-accent-quantum text-white border-accent-quantum'
          : 'border-border text-text-secondary hover:text-text-primary hover:bg-bg-surface'
      }`}
    >
      {label}
    </button>
  );
}
