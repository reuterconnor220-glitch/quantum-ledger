import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COMPANIES, getCompany } from '@/lib/data/companies';
import { getNewsForCompany } from '@/lib/data/news';
import { TECHNOLOGY_LABEL } from '@/lib/types';
import { formatDate, formatPct, formatUsd, timeAgo } from '@/lib/utils';
import { SentimentChip, MaterialityBadge } from '@/components/SentimentChip';
import { Sparkline, generateSparkData } from '@/components/Sparkline';

export async function generateStaticParams() {
  return COMPANIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCompany(slug);
  if (!c) return {};
  return {
    title: `${c.name} (${c.ticker ?? c.pendingTicker ?? 'Private'}) — Quantum Ledger`,
    description: c.oneLineThesis,
  };
}

export const revalidate = 3600;

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCompany(slug);
  if (!c) notFound();

  const news = getNewsForCompany(slug);
  const valuation = c.marketCapUsd ?? c.latestRoundValuationUsd;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-bg-surface/30">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <Link href="/companies" className="text-xs font-mono text-text-muted hover:text-text-primary">
            ← All companies
          </Link>
          <div className="mt-6 flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight">{c.name}</h1>
                {c.ticker && (
                  <span className="font-mono text-text-muted text-lg">{c.ticker}</span>
                )}
                {c.pendingTicker && (
                  <span className="font-mono text-accent-warn text-sm px-2 py-0.5 bg-accent-warn/15 rounded-sm uppercase tracking-wider">
                    Pending {c.pendingTicker}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-text-secondary font-mono">
                {TECHNOLOGY_LABEL[c.technologyApproach]} · {c.hqCity ?? '—'}{c.hqCountry ? `, ${c.hqCountry}` : ''}
                {c.foundedYear ? ` · Founded ${c.foundedYear}` : ''}
              </p>
            </div>
            {c.website && (
              <a
                href={c.website}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-accent-quantum font-mono hover:text-accent-quantum/80"
              >
                {c.website.replace('https://', '')} →
              </a>
            )}
          </div>

          <p className="mt-6 text-lg text-text-primary leading-relaxed max-w-3xl border-l-2 border-accent-quantum pl-5 italic">
            {c.oneLineThesis}
          </p>
        </div>
      </section>

      {/* KPI strip */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border">
            <Stat label={c.isPublic ? 'Market Cap' : 'Last Valuation'} value={formatUsd(valuation)} />
            <Stat label="Revenue TTM" value={formatUsd(c.revenueTtmUsd)} />
            <Stat label="YoY Growth" value={c.revenueYoyGrowth !== undefined ? formatPct(c.revenueYoyGrowth, { signed: true }) : '—'} positive={(c.revenueYoyGrowth ?? 0) >= 0} />
            <Stat label="Cash" value={formatUsd(c.cashUsd)} />
            <Stat label="Runway" value={c.runwayQuarters ? `${(c.runwayQuarters / 4).toFixed(1)}y` : '—'} />
            <Stat label="Gross Margin" value={c.grossMargin !== undefined ? formatPct(c.grossMargin) : '—'} />
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          {/* Stock chart placeholder */}
          {c.isPublic && (
            <section>
              <p className="eyebrow mb-3">Price · 30d</p>
              <div className="card p-5">
                <Sparkline
                  data={generateSparkData(c.slug.length + 11, 60)}
                  positive={(c.revenueYoyGrowth ?? 0) >= 0}
                  height={120}
                  width={1000}
                />
                <p className="mt-3 text-xs text-text-muted font-mono">
                  Live chart wires in after Supabase deployment. Daily pipeline pulls close prices via yfinance.
                </p>
              </div>
            </section>
          )}

          {/* Bull / Bear */}
          <section>
            <p className="eyebrow mb-3">Position</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-5 border-l-2 border-l-accent-data">
                <h3 className="font-display text-lg tracking-tight mb-3 text-accent-data">Bull case</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{c.bullCase}</p>
              </div>
              <div className="card p-5 border-l-2 border-l-accent-down">
                <h3 className="font-display text-lg tracking-tight mb-3 text-accent-down">Bear case</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{c.bearCase}</p>
              </div>
            </div>
          </section>

          {/* News for this company */}
          {news.length > 0 && (
            <section>
              <div className="flex items-end justify-between mb-3">
                <p className="eyebrow">News tracker</p>
                <Link href={`/news?company=${c.slug}`} className="text-xs text-accent-quantum font-mono hover:text-accent-quantum/80">
                  All news →
                </Link>
              </div>
              <ul className="space-y-2">
                {news.map((n) => (
                  <li key={n.id}>
                    <a href={n.sourceUrl} target="_blank" rel="noreferrer" className="card card-hover block p-4">
                      <div className="flex items-center gap-2 text-xs text-text-muted font-mono mb-1.5">
                        <span className="uppercase">{n.source.replace('_', ' ')}</span>
                        <span>·</span>
                        <span>{timeAgo(n.publishedAt)}</span>
                        <span className="ml-auto flex items-center gap-2">
                          <MaterialityBadge level={n.materiality} />
                          <SentimentChip valuationImpact={n.valuationImpact} />
                        </span>
                      </div>
                      <p className="text-text-primary leading-snug">{n.title}</p>
                      <p className="mt-1.5 text-sm text-text-secondary leading-relaxed line-clamp-2">{n.summary}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="card p-5">
            <p className="eyebrow mb-3">Profile</p>
            <dl className="space-y-3 text-sm">
              <Row label="Technology" value={TECHNOLOGY_LABEL[c.technologyApproach]} />
              <Row label="HQ" value={`${c.hqCity ?? '—'}${c.hqCountry ? `, ${c.hqCountry}` : ''}`} />
              {c.foundedYear && <Row label="Founded" value={c.foundedYear.toString()} />}
              {c.ipoDate && <Row label="IPO" value={formatDate(c.ipoDate)} />}
              {c.listingExchange && <Row label="Exchange" value={c.listingExchange} />}
              {c.ceo && <Row label="CEO" value={c.ceo} />}
              <Row label="Status" value={c.isPublic ? 'Public' : 'Private'} />
            </dl>
          </div>

          {!c.isPublic && (
            <div className="card p-5">
              <p className="eyebrow mb-3">Capital</p>
              <dl className="space-y-3 text-sm">
                {c.totalRaisedUsd !== undefined && (
                  <Row label="Total raised" value={formatUsd(c.totalRaisedUsd)} mono />
                )}
                {c.latestRoundSizeUsd !== undefined && (
                  <Row label="Latest round" value={formatUsd(c.latestRoundSizeUsd)} mono />
                )}
                {c.latestRoundValuationUsd !== undefined && (
                  <Row label="Valuation" value={formatUsd(c.latestRoundValuationUsd)} mono />
                )}
                {c.latestRoundDate && <Row label="Closed" value={formatDate(c.latestRoundDate)} />}
                {c.latestRoundLead && <Row label="Lead" value={c.latestRoundLead} />}
              </dl>
            </div>
          )}

          <div className="text-xs text-text-muted leading-relaxed">
            Last verified {formatDate(c.asOfDate, { style: 'long' })}. Sourced from public filings and press
            releases. Methodology disclosed on{' '}
            <Link href="/methodology" className="text-accent-quantum hover:underline">
              this page
            </Link>
            .
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="bg-bg p-4">
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">{label}</p>
      <p className={`mt-1 font-mono text-base ${positive === false ? 'text-accent-down' : positive === true ? 'text-accent-data' : 'text-text-primary'}`}>
        {value}
      </p>
    </div>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-text-muted">{label}</dt>
      <dd className={mono ? 'font-mono text-text-primary' : 'text-text-primary'}>{value}</dd>
    </div>
  );
}
