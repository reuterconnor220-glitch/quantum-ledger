import Link from 'next/link';
import { COMPANIES, publicCompanies } from '@/lib/data/companies';
import { recentEvents } from '@/lib/data/events';
import { fetchLatestBrief, fetchRecentNews } from '@/lib/data/live';
import { fetchQuantumQuotes, pickLeadersAndLaggards } from '@/lib/pipeline/quotes';
import {
  LEDGER_SCORES,
  sectorAverageScore,
  SECTOR_SCORE_DELTA,
  sectorMood,
  scoreColor,
} from '@/lib/data/ledger-score';
import { ESSAYS } from '@/lib/data/essays';
import { SentimentChip, MaterialityBadge } from '@/components/SentimentChip';
import { Sparkline, generateSparkData } from '@/components/Sparkline';
import { formatDate, formatPct, formatUsd, timeAgo } from '@/lib/utils';
import { TECHNOLOGY_LABEL } from '@/lib/types';

export const revalidate = 600;
export const dynamic = 'force-dynamic';

export default async function Home() {
  const [brief, news, liveQuotes] = await Promise.all([
    fetchLatestBrief(),
    fetchRecentNews(6),
    fetchQuantumQuotes(),
  ]);
  const tracker = publicCompanies()
    .filter((c) => c.marketCapUsd && c.purity === 'pure_play')
    .sort((a, b) => (b.marketCapUsd ?? 0) - (a.marketCapUsd ?? 0));
  const events = recentEvents(5);

  // Sector composite
  const sectorScore = sectorAverageScore();
  const sectorMoodLabel = sectorMood(sectorScore);
  const live = pickLeadersAndLaggards(liveQuotes);
  const liveDelta = liveQuotes.length > 0
    ? liveQuotes.reduce((s, q) => s + q.pct, 0) / liveQuotes.length
    : brief.marketSummary.dayChangePct;

  // Top scored companies
  const topScored = [...LEDGER_SCORES]
    .sort((a, b) => b.scores.total - a.scores.total)
    .slice(0, 5);

  // Latest essay
  const latestEssay = ESSAYS[0];

  // Date crest values
  const dateObj = new Date(brief.briefDate);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const dateLong = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const issueNo = computeIssueNumber(brief.briefDate);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
      {/* ────────── Masthead ────────── */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display text-[22px] tracking-tight text-text-primary normal-case">No. {issueNo}</span>
            <span className="text-text-muted/60">·</span>
            <span>Daily Edition</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            {dayName}, {dateLong}
          </div>
          <div className="text-right leading-relaxed">
            Independent · Investor-grade
            <br />
            By Connor Reuter
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.92] tracking-[-0.025em] text-[clamp(46px,8vw,112px)]">
          The Quantum <em className="not-italic font-normal text-accent-data">Ledger</em>
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[60ch]">
          A daily reading of the quantum economy. Signal over hype, since Issue 001.
        </p>
      </header>

      {/* ────────── Today's state — split hero ────────── */}
      <section className="mt-9 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 py-7 border-b border-border">
        {/* Left: Brief headline */}
        <Link href="/brief" className="group block">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-3">
            <span className="qdot-live" />
            <span>Today's Brief · {formatDate(brief.briefDate, { style: 'long' })}</span>
            <span className="ml-auto text-accent-data opacity-0 group-hover:opacity-100 transition-opacity">
              Read in full ›
            </span>
          </div>
          <h2 className="font-display font-normal leading-[1.04] tracking-[-0.022em] text-[clamp(28px,4vw,46px)] mb-3 text-balance text-text-primary group-hover:text-accent-data transition-colors">
            {brief.headline}
          </h2>
          <p className="font-display italic text-lg text-text-secondary leading-snug max-w-[60ch]">
            {brief.oneLineSummary}
          </p>
        </Link>

        {/* Right: Ledger Score panel */}
        <Link
          href="/ledger-score"
          className="card p-5 border-accent-data/40 bg-gradient-to-b from-accent-data/5 to-transparent block group hover:border-accent-data/70 transition-colors"
        >
          <div className="flex items-center justify-between mb-2 text-[11px] uppercase tracking-[0.08em] font-mono">
            <span className="text-text-secondary font-semibold">The Ledger Score</span>
            <span className="text-text-muted group-hover:text-accent-data">See all ›</span>
          </div>
          <div className="grid grid-cols-[auto_1fr] items-end gap-4 mb-2">
            <div className={`font-display text-[92px] leading-[0.86] tracking-[-0.045em] tabular-nums ${scoreColor(sectorScore)}`}>
              {sectorScore}
            </div>
            <div className="text-right pb-1.5 font-mono">
              <div className={SECTOR_SCORE_DELTA >= 0 ? "text-accent-data font-semibold text-xs tracking-[0.02em]" : "text-accent-down font-semibold text-xs tracking-[0.02em]"}>
                {SECTOR_SCORE_DELTA >= 0 ? '▲' : '▼'} {SECTOR_SCORE_DELTA >= 0 ? '+' : ''}{SECTOR_SCORE_DELTA} vs T-1
              </div>
              <div className="text-[10px] text-text-muted">Sector composite</div>
            </div>
          </div>
          <div className="font-display italic text-base text-text-secondary mb-3">
            &ldquo;{sectorMoodLabel}&rdquo;
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-3 pt-3 border-t border-border-muted">
            {topScored.slice(0, 4).map((c) => (
              <div key={c.slug} className="flex items-baseline justify-between text-xs font-mono">
                <span className="text-text-secondary truncate pr-2">{c.name}</span>
                <span className={`font-semibold ${scoreColor(c.scores.total)}`}>{c.scores.total}</span>
              </div>
            ))}
          </div>
        </Link>
      </section>

      {/* ────────── Today, in numbers ────────── */}
      <section className="py-6 grid grid-cols-2 md:grid-cols-5 gap-px bg-border rounded-md overflow-hidden mt-7">
        <Stat label="Sector Mkt Cap" value={formatUsd(brief.marketSummary.sectorMcapUsd)} delta={formatPct(liveDelta, { signed: true })} positive={liveDelta > 0} />
        <Stat
          label="Top Mover"
          value={live.leaders[0]?.ticker ?? brief.marketSummary.leaders[0]?.ticker ?? '—'}
          delta={formatPct(live.leaders[0]?.pct ?? brief.marketSummary.leaders[0]?.pct ?? 0, { signed: true })}
          positive
        />
        <Stat
          label="Worst Mover"
          value={live.laggards[0]?.ticker ?? brief.marketSummary.laggards[0]?.ticker ?? '—'}
          delta={formatPct(live.laggards[0]?.pct ?? brief.marketSummary.laggards[0]?.pct ?? 0, { signed: true })}
          positive={false}
        />
        <Stat label="Sector Sentiment" value={brief.sectorSentiment.toFixed(2)} delta={brief.sectorSentiment > 0 ? 'Bullish' : 'Bearish'} positive={brief.sectorSentiment > 0} />
        <Stat label="Tracked Cos." value={COMPANIES.length.toString()} delta={`${publicCompanies().length} public`} positive />
      </section>

      {/* ────────── CTA strip ────────── */}
      <section className="mt-9 flex flex-wrap gap-3">
        <Link
          href="/brief"
          className="bg-accent-quantum text-white px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-accent-quantum/90"
        >
          Read today&apos;s brief
        </Link>
        <Link
          href="/ledger-score"
          className="border border-accent-data/60 bg-accent-data/10 text-accent-data px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-accent-data/20"
        >
          See the Ledger Score →
        </Link>
        <Link
          href="/essays/how-to-think-about-quantum"
          className="border border-border bg-bg-surface text-text-primary px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-bg-elevated"
        >
          Read the framework
        </Link>
        <Link
          href="/earnings"
          className="border border-border bg-bg-surface text-text-primary px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-bg-elevated"
        >
          Earnings tracker
        </Link>
        <Link
          href="/pqc-migration"
          className="border border-border bg-bg-surface text-text-primary px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-bg-elevated"
        >
          PQC migration
        </Link>
      </section>

      {/* ────────── Live Tracker ────────── */}
      <section className="mt-14">
        <div className="flex items-end justify-between mb-5 pb-3 border-b border-text-primary/90">
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
              Live Tracker · public quantum pure-plays
            </p>
            <h2 className="font-display font-normal text-3xl tracking-tight">The desk</h2>
          </div>
          <Link href="/companies" className="text-sm text-accent-data hover:underline font-mono">
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
                <th className="pr-4 text-right">Open</th>
              </tr>
            </thead>
            <tbody>
              {tracker.map((c, i) => (
                <tr key={c.slug}>
                  <td className="pl-4">
                    <Link href={`/companies/${c.slug}`} className="block group">
                      <div className="font-sans text-text-primary font-medium group-hover:text-accent-data">
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
                    <Link href={`/companies/${c.slug}`} className="text-xs text-accent-data hover:underline">
                      Open →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ────────── Editorial section: signed essay teaser ────────── */}
      {latestEssay && (
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,2fr)] gap-12 py-10 border-y border-border">
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-3">
              From the Editor · The framework
            </p>
            <p className="font-display italic text-sm text-text-muted leading-snug mb-4">
              Every page on the site defends one analytical framework. This is it.
            </p>
            <div className="text-xs font-mono text-text-secondary">
              {latestEssay.author}
              <br />
              {latestEssay.publishDate} · {latestEssay.readMinutes} min read
            </div>
          </div>
          <Link href={`/essays/${latestEssay.slug}`} className="group block">
            <h3 className="font-display font-normal text-[clamp(26px,3.5vw,42px)] tracking-[-0.022em] leading-[1.05] text-balance text-text-primary group-hover:text-accent-data transition-colors mb-3">
              {latestEssay.title}.
            </h3>
            <p className="font-display italic text-lg text-text-secondary leading-snug max-w-[58ch] mb-4">
              {latestEssay.subtitle}
            </p>
            <span className="text-accent-data text-xs font-mono group-hover:underline">
              Read the framework →
            </span>
          </Link>
        </section>
      )}

      {/* ────────── News + Events ────────── */}
      <section className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-end justify-between mb-5 pb-3 border-b border-text-primary/90">
            <div>
              <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
                Newsdesk · The signal
              </p>
              <h2 className="font-display font-normal text-3xl tracking-tight">Today, ranked</h2>
            </div>
            <Link href="/news" className="text-sm text-accent-data hover:underline font-mono">
              All news →
            </Link>
          </div>
          <ol className="grid gap-1">
            {news.map((n, i) => (
              <li key={n.id} className="group">
                <a
                  href={n.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="grid grid-cols-[56px_minmax(0,1fr)] gap-6 py-4 border-t border-border first:border-t-0 hover:bg-bg-surface/40 transition-colors -mx-4 px-4"
                >
                  <span
                    className={
                      'font-display tabular-nums leading-none ' +
                      (i === 0 ? 'text-[48px] text-text-primary' : 'text-[36px] text-text-muted')
                    }
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
                      <span className="uppercase font-semibold text-text-secondary">
                        {n.source.replace('_', ' ')}
                      </span>
                      <span className="text-text-muted/60">·</span>
                      <span>{timeAgo(n.publishedAt)}</span>
                      <span className="ml-auto flex items-center gap-1.5">
                        <MaterialityBadge level={n.materiality} />
                        <SentimentChip valuationImpact={n.valuationImpact} />
                      </span>
                    </div>
                    <p
                      className={
                        'font-display tracking-tight leading-snug text-balance ' +
                        (i === 0 ? 'text-[22px] text-text-primary group-hover:text-accent-data transition-colors' : 'text-[17px] text-text-primary group-hover:text-accent-data transition-colors')
                      }
                    >
                      {n.title}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="mb-5 pb-3 border-b border-text-primary/90">
            <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
              Calendar
            </p>
            <h2 className="font-display font-normal text-2xl tracking-tight">Catalysts ahead</h2>
          </div>
          <ul className="space-y-1">
            {events.map((e) => (
              <li key={e.id} className="border-l-2 border-accent-data/40 pl-4 py-2.5">
                <p className="text-[11px] font-mono text-text-muted tracking-wider uppercase">
                  {formatDate(e.eventDate)}
                </p>
                <p className="font-display text-base text-text-primary leading-snug mt-1 text-balance">{e.title}</p>
                {e.description && (
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">{e.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ────────── Pillar destinations ────────── */}
      <section className="mt-16">
        <div className="mb-5 pb-3 border-b border-text-primary/90">
          <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
            Departments
          </p>
          <h2 className="font-display font-normal text-3xl tracking-tight">Where to start.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <PillarCard
            href="/today"
            eyebrow="Already real"
            title="Quantum running in production today"
            body="Apple, Cloudflare, HSBC, BMW, the Royal Navy. Every verified commercial deployment — quantum isn't future tense for these customers."
          />
          <PillarCard
            href="/darpa-qbi"
            eyebrow="The benchmark"
            title="DARPA's verdict on every quantum approach"
            body="Stage A → Stage B → Stage C. The 20 companies DARPA's IV&V team has scored. The cleanest non-commercial signal in the sector."
          />
          <PillarCard
            href="/qnt-ipo-watch"
            eyebrow="Active catalyst"
            title="Quantinuum IPO watch"
            body="S-1 filed at $15–20B against $30.9M revenue. Pricing event in June reshapes every public comp. Risk factors, peer table, valuation history."
          />
          <PillarCard
            href="/pqc-migration"
            eyebrow="Already revenue"
            title="Post-quantum cryptography migration"
            body="Apple PQ3, Cloudflare's 52% PQ-TLS, NIST FIPS 203/204/205, CNSA 2.0. Who has shipped, who has committed, who is silent."
          />
          <PillarCard
            href="/earnings"
            eyebrow="Quarterly cycle"
            title="Earnings transcript tracker"
            body="Every public quantum-exposed call distilled within 48 hours. Headline metrics, named quotes, what changed, sector read-through."
          />
          <PillarCard
            href="/learn"
            eyebrow="Primer"
            title="Quantum computing, for the curious and the physicist"
            body="16 concepts from qubit to fault tolerance. Interactive widgets — double-slit, Bell test, BB84, circuit builder, Grover trace."
          />
        </div>
      </section>

      <p className="mt-16 max-w-3xl text-xs text-text-muted">
        Independent. Investor-grade. By Connor Reuter. The Ledger Score updates on the 13th of each month;
        the brief updates daily at 6am MT.{' '}
        <Link href="/about" className="text-accent-data hover:underline">
          About →
        </Link>
      </p>
    </div>
  );
}

/* ────────────────────────────── helpers ────────────────────────────── */

function computeIssueNumber(briefDate: string) {
  const launch = new Date('2024-01-01').getTime();
  const d = new Date(briefDate).getTime();
  const days = Math.max(1, Math.floor((d - launch) / (1000 * 60 * 60 * 24)));
  const weekdays = Math.floor(days * (5 / 7));
  return weekdays;
}

function Stat({
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
    <div className="bg-bg-surface p-4">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-2">{label}</p>
      <p className="font-display text-2xl text-text-primary tracking-tight tabular-nums">{value}</p>
      <p className={`mt-1 text-xs font-mono ${positive ? 'text-accent-data' : 'text-accent-down'}`}>{delta}</p>
    </div>
  );
}

function PillarCard({
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
    <Link href={href} className="card card-hover block p-6 group">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-3">
        {eyebrow}
      </p>
      <h3 className="font-display font-normal text-xl tracking-tight mb-2 text-text-primary group-hover:text-accent-data transition-colors text-balance leading-snug">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed">{body}</p>
      <span className="mt-4 inline-block text-accent-data text-xs font-mono">Open →</span>
    </Link>
  );
}
