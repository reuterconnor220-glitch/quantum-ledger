import Link from 'next/link';
import { getCompany } from '@/lib/data/companies';
import { fetchRecentNews } from '@/lib/data/live';
import { SentimentChip, MaterialityBadge } from '@/components/SentimentChip';
import { formatDate, timeAgo } from '@/lib/utils';

export const metadata = {
  title: 'News · Quantum Computing Daily Signal',
  description: 'Daily quantum computing news with sentiment scoring, materiality ratings, and valuation impact tagging across the public and private sector.',
};

export const revalidate = 600;
export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const news = await fetchRecentNews(80);
  const SOURCES = Array.from(new Set(news.map((n) => n.source)));
  const TOPICS = Array.from(new Set(news.flatMap((n) => n.topicTags)));

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow mb-2">Newsdesk · raw feed</p>
        <h1 className="font-display text-display-2 font-medium tracking-tight">Daily quantum signal</h1>
        <p className="mt-4 text-text-secondary leading-relaxed">
          Every quantum-relevant story from <span className="font-mono text-accent-quantum">{SOURCES.length}</span> sources,
          scored on relevance (0–1), sentiment (-1 to +1), valuation impact, and materiality (1–5).
          Pipeline runs daily at 06:00 MT. We discard anything below 0.4 relevance.
        </p>
        <p className="mt-4 text-xs font-mono uppercase tracking-wider text-text-muted">
          Full firehose, sortable and filterable. For the day&apos;s synthesized narrative,{' '}
          <Link href="/brief" className="text-accent-quantum hover:underline">read the Brief →</Link>
        </p>
      </div>

      {/* Filter strip (visual) */}
      <div className="mb-8 space-y-3">
        <div>
          <p className="eyebrow mb-2">Topic</p>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <button
                key={t}
                className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider border border-border rounded-sm text-text-secondary hover:text-text-primary hover:bg-bg-surface"
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-2">Sentiment</p>
          <div className="flex flex-wrap gap-2">
            <button className="chip chip-bull">Bullish</button>
            <button className="chip chip-bear">Bearish</button>
            <button className="chip chip-mixed">Mixed</button>
            <button className="chip chip-neutral">Neutral</button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <ul className="space-y-3">
        {news.map((n) => (
          <li key={n.id}>
            <a href={n.sourceUrl} target="_blank" rel="noreferrer" className="card card-hover block p-5">
              <div className="flex items-center gap-2 text-xs text-text-muted font-mono mb-2 flex-wrap">
                <span className="uppercase tracking-wider">{n.source.replace('_', ' ')}</span>
                <span>·</span>
                <span>{formatDate(n.publishedAt)}</span>
                <span>·</span>
                <span>{timeAgo(n.publishedAt)}</span>
                <span className="ml-auto flex items-center gap-2">
                  <MaterialityBadge level={n.materiality} />
                  <SentimentChip valuationImpact={n.valuationImpact} />
                </span>
              </div>
              <h2 className="text-text-primary font-medium leading-snug text-lg">{n.title}</h2>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{n.summary}</p>
              {n.companyTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {n.companyTags.map((slug) => {
                    const c = getCompany(slug);
                    if (!c) return null;
                    return (
                      <span
                        key={slug}
                        className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-bg-elevated rounded-xs text-text-secondary"
                      >
                        {c.ticker ?? c.pendingTicker ?? c.name}
                      </span>
                    );
                  })}
                </div>
              )}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-xs text-text-muted max-w-2xl leading-relaxed">
        Sources include Quantum Insider, Quantum Computing Report, Phys.org, arXiv quant-ph, Finnhub
        ticker-tagged news, Google News RSS, and direct vendor newsrooms. Sentiment scoring via Claude
        Haiku with cached prompts. See{' '}
        <Link href="/methodology" className="text-accent-quantum hover:underline">
          methodology
        </Link>
        .
      </p>
    </div>
  );
}
