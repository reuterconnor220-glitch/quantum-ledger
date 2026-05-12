import Link from 'next/link';
import { TODAYS_BRIEF } from '@/lib/data/brief';
import { COMPANIES, publicCompanies } from '@/lib/data/companies';
import { getRecentNews } from '@/lib/data/news';
import { recentEvents } from '@/lib/data/events';
import { SentimentChip, MaterialityBadge } from '@/components/SentimentChip';
import { Sparkline, generateSparkData } from '@/components/Sparkline';
import { formatDate, formatPct, formatUsd, timeAgo } from '@/lib/utils';
import { TECHNOLOGY_LABEL } from '@/lib/types';

export const revalidate = 3600;

export default function Home() {
  const brief = TODAYS_BRIEF;
  const news = getRecentNews(6);
  const tracker = publicCompanies()
    .filter((c) => c.marketCapUsd && c.purity === 'pure_play')
    .sort((a, b) => (b.marketCapUsd ?? 0) - (a.marketCapUsd ?? 0));
  const events = recentEvents(5);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-subtle-grid bg-grid-32 opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="qdot-live" />
            <span className="eyebrow">Brief · {formatDate(brief.briefDate, { style: 'long' })}</span>
          </div>
          <h1 className="font-display text-display-1 font-medium tracking-tight max-w-4xl">
            {brief.headline}
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl leading-relaxed">
            {brief.oneLineSummary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/brief"
              className="bg-accent-quantum text-white px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-accent-quantum/90"
            >
              Read today&apos;s brief
            </Link>
            <Link
              href="/learn"
              className="border border-border bg-bg-surface text-text-primary px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-bg-elevated"
            >
              Start with the primer
            </Link>
          </div>

          {/* Sector KPI strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
            <KPI
              label="Sector Mkt Cap"
              value={formatUsd(brief.marketSummary.sectorMcapUsd)}
              delta={formatPct(brief.marketSummary.dayChangePct, { signed: true })}
              positive={brief.marketSummary.dayChangePct > 0}
            />
            <KPI
              label="Sector Sentiment"
              value={brief.sectorSentiment.toFixed(2)}
              delta={brief.sectorSentiment > 0 ? 'Bullish' : 'Bearish'}
              positive={brief.sectorSentiment > 0}
            />
            <KPI
              label="Top Mover"
              value={brief.marketSummary.leaders[0]?.ticker ?? '—'}
              delta={formatPct(brief.marketSummary.leaders[0]?.pct ?? 0, { signed: true })}
              positive
            />
            <KPI
              label="Tracked Cos."
              value={COMPANIES.length.toString()}
              delta={`${publicCompanies().length} public`}
              positive
            />
          </div>
        </div>
      </section>

      {/* Tracker */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="eyebrow mb-1">Live Tracker</p>
              <h2 className="font-display text-3xl tracking-tight">Public quantum pure-plays</h2>
            </div>
            <Link
              href="/companies"
              className="text-sm text-accent-quantum hover:text-accent-quantum/80 font-mono"
            >
              All companies →
            </Link>
          </div>
          <div className="card overflow-x-auto">
            <table className="ql-table min-w-[720px]">
              <thead>
                <tr>
                  <th className="pl-4">Company</th>
                  <th>Approach</th>
                  <th className="num">Mkt Cap</th>
                  <th className="num">Rev TTM</th>
                  <th className="num">YoY</th>
                  <th>Cash</th>
                  <th>30d</th>
                  <th className="pr-4 text-right">Thesis</th>
                </tr>
              </thead>
              <tbody>
                {tracker.map((c, i) => (
                  <tr key={c.slug}>
                    <td className="pl-4">
                      <Link href={`/companies/${c.slug}`} className="block group">
                        <div className="font-sans text-text-primary font-medium group-hover:text-accent-quantum">
                          {c.name}
                        </div>
                        <div className="text-xs text-text-muted">{c.ticker}</div>
                      </Link>
                    </td>
                    <td className="text-text-secondary text-xs">{TECHNOLOGY_LABEL[c.technologyApproach]}</td>
                    <td className="num">{formatUsd(c.marketCapUsd)}</td>
                    <td className="num">{formatUsd(c.revenueTtmUsd)}</td>
                    <td className={`num ${(c.revenueYoyGrowth ?? 0) >= 0 ? 'text-accent-data' : 'text-accent-down'}`}>
                      {c.revenueYoyGrowth !== undefined ? formatPct(c.revenueYoyGrowth, { signed: true }) : '—'}
                    </td>
                    <td className="num">{formatUsd(c.cashUsd)}</td>
                    <td>
                      <Sparkline data={generateSparkData(i + 1)} positive={(c.revenueYoyGrowth ?? 0) >= 0} />
                    </td>
                    <td className="pr-4 text-right">
                      <Link href={`/companies/${c.slug}`} className="text-xs text-accent-quantum hover:text-accent-quantum/80">
                        Open →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* News + Events grid */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="eyebrow mb-1">Newsdesk</p>
                <h2 className="font-display text-2xl tracking-tight">Today&apos;s signal</h2>
              </div>
              <Link href="/news" className="text-sm text-accent-quantum hover:text-accent-quantum/80 font-mono">
                All news →
              </Link>
            </div>
            <ul className="space-y-3">
              {news.map((n) => (
                <li key={n.id}>
                  <Link href={n.sourceUrl} target="_blank" className="card card-hover block p-5">
                    <div className="flex items-center gap-2 text-xs text-text-muted font-mono mb-2">
                      <span className="uppercase">{n.source.replace('_', ' ')}</span>
                      <span>·</span>
                      <span>{timeAgo(n.publishedAt)}</span>
                      <span className="ml-auto flex items-center gap-2">
                        <MaterialityBadge level={n.materiality} />
                        <SentimentChip valuationImpact={n.valuationImpact} />
                      </span>
                    </div>
                    <h3 className="text-text-primary font-medium leading-snug">{n.title}</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-2">{n.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Catalyst calendar</p>
            <ul className="space-y-1">
              {events.map((e) => (
                <li key={e.id} className="border-l-2 border-accent-quantum/40 pl-4 py-2">
                  <p className="text-xs font-mono text-text-muted">{formatDate(e.eventDate)}</p>
                  <p className="text-sm text-text-primary leading-snug mt-0.5">{e.title}</p>
                  {e.description && (
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">{e.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Editorial CTAs */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          <CTACard
            href="/qnt-ipo-watch"
            eyebrow="IPO Watch"
            title="Quantinuum (QNT) — $20B+ pricing event"
            body="S-1 filed May 8. We track pricing range, roadshow signals, and how the price tag drags every public pure-play comp."
          />
          <CTACard
            href="/revenue"
            eyebrow="Reality Check"
            title="Where quantum revenue actually comes from"
            body="$1.0–1.5B annual sector revenue vs $11.1B private capital + $30–40B government commitments. The honest burn-to-revenue gauge."
          />
          <CTACard
            href="/learn"
            eyebrow="Primer"
            title="Quantum computing — for newcomers and physicists, on one page"
            body="16 concepts from qubit to fault tolerance. Surface-level for the curious, expandable depth toggles for the math, code, and citations."
          />
        </div>
      </section>
    </div>
  );
}

function KPI({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}) {
  return (
    <div className="bg-bg-surface p-5">
      <p className="eyebrow mb-2">{label}</p>
      <p className="font-mono text-2xl text-text-primary">{value}</p>
      <p className={`mt-1 text-xs font-mono ${positive ? 'text-accent-data' : 'text-accent-down'}`}>{delta}</p>
    </div>
  );
}

function CTACard({
  href,
  eyebrow,
  title,
  body,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Link href={href} className="card card-hover block p-6">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h3 className="font-display text-xl tracking-tight mb-2 text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{body}</p>
      <span className="mt-4 inline-block text-accent-quantum text-xs font-mono">Open →</span>
    </Link>
  );
}
