import Link from 'next/link';
import { fetchLatestBrief, fetchRecentNews } from '@/lib/data/live';
import { formatDate, formatPct, formatUsd } from '@/lib/utils';
import { SentimentChip } from '@/components/SentimentChip';
import { ArticleLd } from '@/components/JsonLd';
import { Giscus } from '@/components/Giscus';

export const metadata = {
  title: 'Daily Brief · Today\'s Quantum Computing Intelligence',
  description: 'Today\'s daily brief — the most important quantum computing stories, market summary, sector sentiment, and editorial analysis. Updated every weekday at 6am MT.',
};

export const revalidate = 600;
export const dynamic = 'force-dynamic';

export default async function BriefPage() {
  const [b, recentNews] = await Promise.all([fetchLatestBrief(), fetchRecentNews(30)]);
  const topStories = b.topStoryIds
    .map((id) => recentNews.find((n) => n.id === id))
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
      <ArticleLd
        headline={b.headline}
        description={b.oneLineSummary}
        url={(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantum-ledger-vert.vercel.app') + '/brief'}
        datePublished={b.briefDate}
      />
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="qdot-live" />
          <span className="eyebrow">Daily Brief · {formatDate(b.briefDate, { style: 'long' })}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.1]">
          {b.headline}
        </h1>
        <p className="mt-5 text-lg text-text-secondary leading-relaxed border-l-2 border-accent-quantum pl-5">
          {b.oneLineSummary}
        </p>
      </header>

      {/* Market summary */}
      <section className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
        <Stat label="Sector Mkt Cap" value={formatUsd(b.marketSummary.sectorMcapUsd)} />
        <Stat
          label="Day"
          value={formatPct(b.marketSummary.dayChangePct, { signed: true })}
          positive={b.marketSummary.dayChangePct > 0}
        />
        <Stat
          label="Top Mover"
          value={`${b.marketSummary.leaders[0]?.ticker} ${formatPct(b.marketSummary.leaders[0]?.pct ?? 0, { signed: true })}`}
        />
        <Stat
          label="Sentiment"
          value={b.sectorSentiment > 0 ? `+${b.sectorSentiment.toFixed(2)}` : b.sectorSentiment.toFixed(2)}
          positive={b.sectorSentiment > 0}
        />
      </section>

      {/* Leaders / laggards */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="card p-5">
          <p className="eyebrow mb-3">Leaders</p>
          <ul className="space-y-2 font-mono text-sm">
            {b.marketSummary.leaders.map((l) => (
              <li key={l.ticker} className="flex justify-between">
                <span>{l.ticker}</span>
                <span className="text-accent-data">{formatPct(l.pct, { signed: true })}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <p className="eyebrow mb-3">Laggards</p>
          <ul className="space-y-2 font-mono text-sm">
            {b.marketSummary.laggards.map((l) => (
              <li key={l.ticker} className="flex justify-between">
                <span>{l.ticker}</span>
                <span className="text-accent-down">{formatPct(l.pct, { signed: true })}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Body */}
      <article className="mb-12 text-text-primary leading-relaxed text-[17px] space-y-4">
        {b.bodyMd.split('\n\n').map((para, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
        ))}
      </article>

      {/* Top stories */}
      <section>
        <p className="eyebrow mb-4">Top stories cited</p>
        <ul className="space-y-2">
          {topStories.map((n) => n && (
            <li key={n.id}>
              <a href={n.sourceUrl} target="_blank" rel="noreferrer" className="card card-hover block p-4">
                <div className="flex items-center gap-2 text-xs text-text-muted font-mono mb-1">
                  <span className="uppercase">{n.source.replace('_', ' ')}</span>
                  <span>·</span>
                  <span>{formatDate(n.publishedAt)}</span>
                  <SentimentChip valuationImpact={n.valuationImpact} className="ml-auto" />
                </div>
                <p className="text-text-primary leading-snug">{n.title}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 text-xs text-text-muted">
        The brief is updated daily by an automated cron at 6am MT, blending RSS-aggregated news with
        market moves. <Link href="/methodology" className="text-accent-quantum hover:underline">Methodology</Link>.
      </p>

      <Giscus />
    </div>
  );
}

function Stat({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="bg-bg-surface p-4">
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">{label}</p>
      <p className={`mt-1 font-mono text-base ${positive === false ? 'text-accent-down' : positive === true ? 'text-accent-data' : 'text-text-primary'}`}>
        {value}
      </p>
    </div>
  );
}
