// Ported /news firehose page — design vocabulary applied.
// DROP-IN for src/app/news/page.tsx
//
// Preserved:
//   - fetchRecentNews(80) from '@/lib/data/live'
//   - SentimentChip + formatDate from existing helpers
//
// Visual layer matches /brief, /darpa-qbi, /companies, /learn, /today:
//   - Masthead crest (Vol III · The Wire · News)
//   - Wordmark "The *firehose*" with italic accent
//   - Italic positioning subtitle
//   - Italic pull-quote lede (border-l-2 border-accent-data/40 pl-5)
//   - KPI strip (volume / sentiment / topics / refresh)
//   - SectionHead helper with border-b border-text-primary/90
//   - Filter chips driven by URL search params (?topic=, ?sentiment=) — server-rendered
//   - Stories rendered as ranked rows with serif drop figures + sentiment chip

import Link from 'next/link';
import { fetchRecentNews } from '@/lib/data/live';
import { formatDate, cleanNewsTitle, displaySummary } from '@/lib/utils';
import { SentimentChip } from '@/components/SentimentChip';

export const metadata = {
  alternates: { canonical: '/news' },
  title: 'News · The Quantum Ledger firehose',
  description:
    'Every story we tracked in the last 72 hours, ranked by signal. Filter by topic and sentiment; click through to source.',
};

export const revalidate = 300;
export const dynamic = 'force-dynamic';

type Sentiment = 'bullish' | 'neutral' | 'bearish' | 'mixed';
type SearchParams = {
  topic?: string;
  sentiment?: Sentiment | 'all';
};

const TOPICS: { key: string; label: string; match: (s: string) => boolean }[] = [
  { key: 'all', label: 'All topics', match: () => true },
  { key: 'science', label: 'Science', match: (s) => /science|research|preprint/i.test(s) },
  { key: 'markets', label: 'Markets', match: (s) => /market|earning|price|trade/i.test(s) },
  { key: 'policy', label: 'Policy', match: (s) => /policy|darpa|nist|government|sovereign|export/i.test(s) },
  { key: 'capital', label: 'Capital', match: (s) => /capital|raise|series|round|ipo|acquir/i.test(s) },
  { key: 'product', label: 'Product', match: (s) => /product|launch|release|ship|benchmark|update/i.test(s) },
  { key: 'talent', label: 'Talent', match: (s) => /talent|hire|appoint|ceo|cto|leaves|joins/i.test(s) },
];

function impactToSentiment(impact?: number | string | null): Sentiment {
  if (typeof impact === 'string') {
    const v = impact.toLowerCase();
    if (v === 'bullish' || v === 'bull' || v === 'positive' || v.startsWith('pos')) return 'bullish';
    if (v === 'bearish' || v === 'bear' || v === 'negative' || v.startsWith('neg')) return 'bearish';
    if (v === 'mixed') return 'mixed';
    return 'neutral';
  }
  if (typeof impact === 'number') {
    if (impact > 0.15) return 'bullish';
    if (impact < -0.15) return 'bearish';
  }
  return 'neutral';
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const sp = searchParams ?? {};
  const topicKey = sp.topic ?? 'all';
  const sentimentKey = sp.sentiment ?? 'all';

  const recent = (await fetchRecentNews(80)) ?? [];
  const topic = TOPICS.find((t) => t.key === topicKey) ?? TOPICS[0];

  const rows = recent.filter((n: any) => {
    const haystack = `${n.title ?? ''} ${n.tag ?? ''} ${n.source ?? ''}`;
    if (!topic.match(haystack)) return false;
    if (sentimentKey !== 'all') {
      if (impactToSentiment(n.valuationImpact) !== sentimentKey) return false;
    }
    return true;
  });

  const totalVolume = recent.length;
  const avgSentiment =
    recent.length === 0
      ? 0
      : recent
          .map((n: any) => {
            if (typeof n.sentimentScore === 'number') return n.sentimentScore;
            const s = impactToSentiment(n.valuationImpact);
            return s === 'bullish' ? 1 : s === 'bearish' ? -1 : 0;
          })
          .reduce((s: number, v: number) => s + v, 0) / recent.length;
  const topicsCovered = new Set(recent.map((n: any) => (n.source ?? '').toString())).size;

  const url = (next: Partial<SearchParams>) => {
    const p = new URLSearchParams();
    const t = next.topic ?? topicKey;
    const s = next.sentiment ?? sentimentKey;
    if (t !== 'all') p.set('topic', t);
    if (s !== 'all') p.set('sentiment', s);
    const q = p.toString();
    return q ? `/news?${q}` : '/news';
  };

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      {/* ─────────── Masthead crest ─────────── */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">
              The Wire
            </span>
            <span className="text-text-muted/60">·</span>
            <span>News</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            {recent.length} stories tracked · last 72 hours
          </div>
          <div className="text-right leading-relaxed">
            Boulder · Colorado
            <br />
            refreshes every 5 min
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.94] tracking-[-0.025em] text-[clamp(40px,7vw,88px)] text-balance">
          The{' '}
          <em className="not-italic font-normal text-accent-data italic">firehose</em>
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[58ch]">
          Every story we tracked in the last 72 hours, ranked by signal. The Brief is
          our curated read of the wire; this is the wire itself.
        </p>
      </header>

      {/* ─────────── Italic-thesis lede + KPIs ─────────── */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
        <div>
          <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
            <p className="font-display italic text-[22px] leading-snug tracking-tight text-text-primary">
              Volume is not signal. Filter by{' '}
              <span className="text-accent-data not-italic font-medium">topic</span>{' '}
              and read the wire on the axis that matters to you.
            </p>
            <p className="mt-3 font-display italic text-sm text-text-muted">
              — how the Ledger reads the news
            </p>
          </div>
          <div className="mt-7 space-y-4 text-text-secondary leading-[1.65] text-[15px] max-w-[64ch]">
            <p>
              The wire is exhaustive on purpose. Press releases, earnings transcripts,
              preprints, regulatory filings, conference abstracts — we ingest everything
              within the sector envelope and tag it. The Brief picks ten stories a day;
              this page shows the rest. The point is not to read every item — it is to
              know that nothing was missed.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="grid grid-cols-2 gap-px bg-border rounded-md overflow-hidden">
            <Kpi label="Stories · 72h" value={String(totalVolume)} tone="data" />
            <Kpi label="Showing" value={String(rows.length)} />
            <Kpi
              label="Avg sentiment"
              value={
                avgSentiment > 0
                  ? `+${avgSentiment.toFixed(2)}`
                  : avgSentiment.toFixed(2)
              }
              tone={avgSentiment >= 0 ? 'data' : 'down'}
            />
            <Kpi label="Sources" value={String(topicsCovered)} tone="quantum" />
          </div>
          <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.06em] text-text-muted leading-relaxed">
            Ingested from RSS, regulator wires &amp; vendor disclosures.
          </p>
        </aside>
      </section>

      {/* ─────────── Filter rail ─────────── */}
      <section className="mt-14 grid gap-4">
        <FilterRow label="Topic">
          {TOPICS.map((t) => (
            <Chip key={t.key} href={url({ topic: t.key })} active={topicKey === t.key}>
              {t.label}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Sentiment">
          {(['all', 'bullish', 'neutral', 'bearish', 'mixed'] as const).map((s) => (
            <Chip
              key={s}
              href={url({ sentiment: s })}
              active={sentimentKey === s}
            >
              {s === 'all' ? 'All' : s[0].toUpperCase() + s.slice(1)}
            </Chip>
          ))}
        </FilterRow>
      </section>

      {/* ─────────── The wire ─────────── */}
      <section className="mt-12">
        <SectionHead
          eyebrow={`The wire · ${rows.length} matching · ${topic.label}`}
          title="Ranked by"
          accentWord="signal"
        />
        <ol className="grid">
          {rows.length === 0 ? (
            <li className="py-16 text-center font-display italic text-text-muted">
              No stories match that filter. Widen the topic or reset the sentiment.
            </li>
          ) : (
            rows.map((n: any, i: number) => (
              <li key={n.id ?? i}>
                <a
                  href={n.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="grid grid-cols-[56px_minmax(0,1fr)] gap-6 py-5 border-t border-border first:border-t-text-primary hover:bg-bg-surface/50 transition-colors -mx-4 px-4 group"
                >
                  <span
                    className={
                      'font-display tabular-nums leading-none ' +
                      (i === 0
                        ? 'text-[44px] text-text-primary'
                        : 'text-[28px] text-text-muted')
                    }
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
                      <span className="uppercase font-semibold text-text-secondary">
                        {(n.source ?? '').toString().replace('_', ' ')}
                      </span>
                      <span className="text-text-muted/60">·</span>
                      <span>{formatDate(n.publishedAt)}</span>
                      {n.tag && (
                        <>
                          <span className="text-text-muted/60">·</span>
                          <span className="text-accent-data/80">{n.tag}</span>
                        </>
                      )}
                      <SentimentChip
                        valuationImpact={n.valuationImpact}
                        className="ml-auto"
                      />
                    </div>
                    <p
                      className={
                        'font-display tracking-tight leading-snug text-balance group-hover:text-accent-data transition-colors ' +
                        (i === 0
                          ? 'text-[24px] text-text-primary'
                          : 'text-[17px] text-text-primary')
                      }
                    >
                      {cleanNewsTitle(n.title)}
                    </p>
                    {displaySummary(n.title, n.summary) && (
                      <p className="mt-1.5 text-[13px] text-text-secondary leading-snug max-w-[64ch]">
                        {displaySummary(n.title, n.summary)}
                      </p>
                    )}
                  </div>
                </a>
              </li>
            ))
          )}
        </ol>
      </section>

      {/* ─────────── Foot ─────────── */}
      <section className="mt-16 pt-10 border-t border-border grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
        <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
          <p className="font-display italic text-[20px] leading-snug tracking-tight text-text-primary">
            If you want the editorial cut, read the{' '}
            <Link href="/brief" className="text-accent-data not-italic font-medium hover:underline">
              Brief
            </Link>
            . The Wire is for completeness; the Brief is for argument.
          </p>
        </div>
        <div className="text-sm text-text-secondary leading-[1.65] max-w-[44ch]">
          <p className="eyebrow mb-2">Related</p>
          <ul className="grid gap-1.5">
            <li>
              <Link href="/brief" className="text-accent-data hover:underline">Today's brief ›</Link>
            </li>
            <li>
              <Link href="/archive" className="text-accent-data hover:underline">Archive ›</Link>
            </li>
            <li>
              <Link href="/papers" className="text-accent-data hover:underline">Papers we read ›</Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* helpers */

function SectionHead({ eyebrow, title, accentWord }: { eyebrow: string; title: string; accentWord: string }) {
  return (
    <div className="mb-6 pb-3 border-b border-text-primary/90">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h2 className="font-display font-normal text-3xl tracking-tight text-balance">
        {title} <em className="not-italic font-normal italic text-accent-data">{accentWord}</em>
      </h2>
    </div>
  );
}

function Kpi({ label, value, tone }: { label: string; value: string; tone?: 'data' | 'warn' | 'down' | 'quantum' }) {
  return (
    <div className="bg-bg-surface p-4">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono">{label}</p>
      <p
        className={
          'mt-1.5 font-display tabular-nums text-[26px] leading-none tracking-tight ' +
          (tone === 'data' ? 'text-accent-data' : tone === 'warn' ? 'text-accent-warn' : tone === 'down' ? 'text-accent-down' : tone === 'quantum' ? 'text-accent-quantum' : 'text-text-primary')
        }
      >
        {value}
      </p>
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
      <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-text-muted w-[80px]">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={
        'text-[11px] font-mono uppercase tracking-[0.08em] px-2.5 py-1 rounded-full border transition-colors ' +
        (active
          ? 'border-accent-data text-accent-data bg-accent-data/8'
          : 'border-border text-text-secondary hover:text-text-primary hover:border-text-muted')
      }
    >
      {children}
    </Link>
  );
}
