import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchBriefByDate, fetchBriefArchive, fetchRecentNews } from '@/lib/data/live';
import { formatDate, formatPct, formatUsd } from '@/lib/utils';
import { ArticleLd } from '@/components/JsonLd';

export const revalidate = 86400;

export async function generateStaticParams() {
  const all = await fetchBriefArchive(120);
  return all.map((b) => ({ date: b.briefDate }));
}

export async function generateMetadata({ params }: { params: { date: string } }) {
  const b = await fetchBriefByDate(params.date);
  if (!b) return { title: 'Archive · Quantum Ledger' };
  return {
    title: `${b.headline} · Archive · Quantum Ledger`,
    description: b.oneLineSummary,
  };
}

function issueNumber(date: string) {
  const launch = new Date('2024-01-01').getTime();
  const d = new Date(date).getTime();
  const days = Math.max(1, Math.floor((d - launch) / (1000 * 60 * 60 * 24)));
  return Math.floor(days * (5 / 7));
}

export default async function ArchivedBriefPage({ params }: { params: { date: string } }) {
  const b = await fetchBriefByDate(params.date);
  if (!b) notFound();

  const recentNews = await fetchRecentNews(80);
  const topStories = b.topStoryIds.map((id) => recentNews.find((n) => n.id === id)).filter(Boolean);

  const dateObj = new Date(b.briefDate);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const dateLong = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      <ArticleLd
        headline={b.headline}
        description={b.oneLineSummary}
        url={(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantum-ledger-vert.vercel.app') + '/archive/' + b.briefDate}
        datePublished={b.briefDate}
      />

      {/* Masthead */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">
              No. {issueNumber(b.briefDate)}
            </span>
            <span className="text-text-muted/60">·</span>
            <span>Archived edition</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            {dayName}, {dateLong}
          </div>
          <div className="text-right leading-relaxed">
            <Link href="/archive" className="text-accent-data hover:underline normal-case">
              ‹ All editions
            </Link>
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[1.02] tracking-[-0.022em] text-[clamp(34px,5vw,64px)] text-balance">
          {b.headline}
        </h1>
        {b.oneLineSummary && (
          <p className="mt-5 font-display italic text-text-secondary text-xl leading-snug max-w-[60ch]">
            {b.oneLineSummary}
          </p>
        )}
      </header>

      {/* Sector summary strip */}
      {b.marketSummary && (
        <section className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
          <Stat
            label="Sector cap"
            value={formatUsd(b.marketSummary.sectorMcapUsd)}
          />
          <Stat
            label="Δ session"
            value={formatPct(b.marketSummary.dayChangePct, { signed: true })}
            tone={b.marketSummary.dayChangePct >= 0 ? 'data' : 'down'}
          />
          <Stat
            label="Top mover"
            value={
              b.marketSummary.leaders[0]
                ? `${b.marketSummary.leaders[0].ticker} ${formatPct(b.marketSummary.leaders[0].pct, { signed: true })}`
                : '—'
            }
          />
          <Stat
            label="Sentiment"
            value={b.sectorSentiment > 0 ? `+${b.sectorSentiment.toFixed(2)}` : b.sectorSentiment.toFixed(2)}
            tone={b.sectorSentiment >= 0 ? 'data' : 'down'}
          />
        </section>
      )}

      {/* Body */}
      <article className="mt-12 max-w-3xl space-y-5 text-text-primary text-[19px] leading-[1.6]">
        {b.bodyMd.split('\n\n').map((para, i) => (
          <p
            key={i}
            dangerouslySetInnerHTML={{
              __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        ))}
      </article>

      {/* Top stories cited */}
      {topStories.length > 0 && (
        <section className="mt-14">
          <div className="mb-5 pb-3 border-b border-text-primary/90">
            <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
              Cited in this edition
            </p>
            <h2 className="font-display font-normal text-3xl tracking-tight">
              The stories <em className="not-italic font-normal italic text-accent-data">that ran</em>.
            </h2>
          </div>
          <ol className="grid">
            {topStories.map((n, i) =>
              n ? (
                <li key={n.id}>
                  <a
                    href={n.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="grid grid-cols-[48px_minmax(0,1fr)] gap-5 py-4 border-t border-border first:border-t-0 hover:bg-bg-surface/40 transition-colors -mx-4 px-4 group"
                  >
                    <span className="font-display tabular-nums leading-none text-[32px] text-text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1">
                        <span className="uppercase font-semibold text-text-secondary">
                          {n.source.replace('_', ' ')}
                        </span>
                        <span className="text-text-muted/60">·</span>
                        <span>{formatDate(n.publishedAt)}</span>
                      </div>
                      <p className="font-display text-[17px] tracking-tight leading-snug text-text-primary group-hover:text-accent-data transition-colors">
                        {n.title}
                      </p>
                    </div>
                  </a>
                </li>
              ) : null,
            )}
          </ol>
        </section>
      )}

      {/* Footer */}
      <section className="mt-16 pt-10 border-t border-border">
        <p className="text-xs text-text-muted leading-relaxed max-w-3xl">
          Archived edition. Originally published {formatDate(b.briefDate, { style: 'long' })}. For today&apos;s
          brief, see <Link href="/brief" className="text-accent-data hover:underline">/brief</Link>. For the
          full archive, see <Link href="/archive" className="text-accent-data hover:underline">/archive</Link>.
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'data' | 'down' }) {
  return (
    <div className="bg-bg-surface p-4">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono">{label}</p>
      <p
        className={
          'mt-1.5 font-display tabular-nums text-[22px] leading-none tracking-tight ' +
          (tone === 'data' ? 'text-accent-data' : tone === 'down' ? 'text-accent-down' : 'text-text-primary')
        }
      >
        {value}
      </p>
    </div>
  );
}
