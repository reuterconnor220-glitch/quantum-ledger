// Homepage — design vocabulary applied, polished editorial composition.
// DROP-IN for src/app/page.tsx
//
// Wirings (per spec):
//   - fetchLatestBrief()             from '@/lib/data/live'
//   - sectorAverageScore()           from '@/lib/data/ledger-score'
//   - getAllCompanies()              from '@/lib/data/companies'
//   - ESSAYS                         from '@/lib/data/essays'
//
// The Ledger Score on the page comes from sectorAverageScore(), not a hardcoded
// constant. We accept either a plain number return or {value, delta, label}.
// Brief / cohort calls are wrapped so a transient outage degrades gracefully.

import Link from 'next/link';
import { fetchLatestBrief } from '@/lib/data/live';
import { sectorAverageScore } from '@/lib/data/ledger-score';
import { getAllCompanies } from '@/lib/data/companies';
import { fetchQuantumQuotes } from '@/lib/pipeline/quotes';
import { ESSAYS } from '@/lib/data/essays';
import { formatUsd, formatPct, formatDate } from '@/lib/utils';

export const metadata = {
  title: 'The Quantum Ledger — A daily reading of the quantum economy',
  description:
    'A daily brief, sector directory, working primer, and policy tracker for the quantum economy. Signal over hype, since Issue 001.',
};

export const revalidate = 600;
export const dynamic = 'force-dynamic';

interface EssayLike {
  slug: string;
  title: string;
  subtitle?: string;
  kicker?: string;
  abstract?: string;
  publishedAt?: string;
  readTime?: string | number;
  author?: string;
}

export default async function HomePage() {
  // ─── Data fetches, each independently safe ───
  const [briefRaw, scoreRaw, quotes] = await Promise.all([
    safe(() => fetchLatestBrief()),
    safe(() => sectorAverageScore()),
    safe(() => fetchQuantumQuotes()),
  ]);
  // The redesign expects optional issueNumber + readTime fields the typed
  // DailyBrief doesn't expose; treat as any with defensive optional reads.
  const brief = briefRaw as (typeof briefRaw & { issueNumber?: number; readTime?: string }) | null;

  // Inject live ticker movement into the cohort so the Top Movers section is populated
  const quoteByTicker = new Map<string, number>();
  for (const q of quotes ?? []) quoteByTicker.set(q.ticker.toUpperCase(), q.pct * 100);

  const all = getAllCompanies().map((c) =>
    c.sym && quoteByTicker.has(c.sym.toUpperCase())
      ? { ...c, chgD: quoteByTicker.get(c.sym.toUpperCase()) }
      : c,
  );
  const essays = ((ESSAYS as EssayLike[]) ?? []).slice();

  // Normalize the score return — supports number OR {value, delta?, label?}
  const score = normalizeScore(scoreRaw);

  // Cohort numbers
  const universe = all.length;
  const listedCount = all.filter((c) => c.listed).length;
  const privateCount = universe - listedCount;
  const combinedCap = all.reduce((s, c) => s + (c.cap ?? 0), 0);
  const topMovers = all
    .filter((c) => c.listed && typeof c.chgD === 'number')
    .slice()
    .sort((a, b) => Math.abs((b.chgD ?? 0)) - Math.abs((a.chgD ?? 0)))
    .slice(0, 5);

  // Essays — newest 3
  const recentEssays = essays
    .slice()
    .sort((a, b) => parseTs(b.publishedAt) - parseTs(a.publishedAt))
    .slice(0, 3);

  const today = new Date();
  const dateLong = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
      {/* ─────────── Masthead crest + wordmark ─────────── */}
      <header className="pt-10 pb-8 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">
              A daily reading of the quantum economy
            </span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            {dateLong}
          </div>
          <div className="text-right leading-relaxed">
            New York · Zürich
            <br />
            signal over hype, since Issue 001
          </div>
        </div>

        <h1 className="mt-8 font-display font-medium leading-[0.84] tracking-[-0.035em] text-[clamp(64px,13vw,200px)] text-balance">
          The Quantum{' '}
          <em className="not-italic font-normal text-accent-data italic">Ledger</em>
        </h1>
        <p className="mt-4 font-display italic text-text-muted text-lg sm:text-xl max-w-[60ch]">
          A daily brief, a working primer, a curated cohort directory, and the
          policy and capital trackers the sector reads before coffee.
        </p>
      </header>

      {/* ─────────── Today's lead story + Score panel ─────────── */}
      <section className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] gap-x-12 gap-y-10 items-start">
        {/* Lead — today's brief */}
        <article className="border-r-0 lg:border-r lg:border-border lg:pr-12">
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.06em] text-text-muted font-mono mb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-accent-data text-accent-data rounded-full font-semibold tracking-[0.08em]">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-data"
                style={{ boxShadow: '0 0 6px currentColor' }}
              />
              Today's brief
            </span>
            {brief?.issueNumber != null && <span>Issue {brief.issueNumber}</span>}
            <span className="text-text-muted/60">·</span>
            <span>updated 06:00 ET</span>
            {brief?.readTime && (
              <>
                <span className="text-text-muted/60">·</span>
                <span>{brief.readTime}</span>
              </>
            )}
          </div>

          <h2 className="font-display font-normal leading-[0.98] tracking-[-0.022em] text-[clamp(32px,5vw,68px)] text-balance">
            {brief?.headline ??
              "A measurement breakthrough rewrites the error budget — even as the listed cohort sells into Quantinuum's S-1."}
          </h2>

          <p className="mt-5 font-display italic text-text-secondary text-[22px] sm:text-2xl leading-snug max-w-[62ch]">
            {brief?.oneLineSummary ??
              'A working day for the science section, a heavy day for the trading desk, and a quiet day for the policy rail.'}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.06em] text-text-muted font-mono py-3 border-y border-border">
            <span className="text-text-secondary font-medium">The Ledger Desk</span>
            <span className="text-text-muted/60">·</span>
            <span>{brief?.briefDate ? formatDate(brief.briefDate) : dateLong}</span>
            <span className="text-text-muted/60">·</span>
            <span>updated continuously</span>
          </div>

          <Link
            href="/brief"
            className="mt-6 inline-flex items-center gap-2 font-display text-[20px] tracking-tight text-accent-data hover:underline group"
          >
            <span>Read today's brief</span>
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              ›
            </span>
          </Link>
        </article>

        {/* Score panel */}
        <aside className="grid gap-4 lg:sticky lg:top-20 lg:self-start">
          <div className="bg-bg-surface border border-border rounded-sm p-6 relative overflow-hidden">
            <div className="flex items-baseline justify-between mb-3">
              <p className="eyebrow">The Ledger Score</p>
              <Link
                href="/ledger-score"
                className="text-[10px] font-mono text-text-muted hover:text-accent-data tracking-wider"
              >
                methodology ›
              </Link>
            </div>

            <div className="flex items-end gap-4">
              <div className="font-display tabular-nums text-[112px] leading-[0.84] tracking-[-0.045em] text-text-primary">
                {score.value}
              </div>
              <div className="pb-2 font-mono">
                {score.delta != null && (
                  <div
                    className={
                      'text-sm tabular-nums ' +
                      (score.delta >= 0 ? 'text-accent-data' : 'text-accent-down')
                    }
                  >
                    {score.delta >= 0 ? '▲' : '▼'} {Math.abs(score.delta)} vs T-1
                  </div>
                )}
                <div className="text-[10px] text-text-muted">/ 0 to 100</div>
              </div>
            </div>

            <p className="mt-3 font-display italic text-text-secondary text-base">
              {score.label ?? defaultLabel(score.value)}
            </p>

            <div className="mt-4 pt-4 border-t border-border">
              <ScoreScale value={score.value} />
            </div>
          </div>

          {/* Movers */}
          {topMovers.length > 0 && (
            <div className="bg-bg-surface border border-border rounded-sm p-5">
              <div className="flex items-baseline justify-between mb-3">
                <p className="eyebrow">Movers · today</p>
                <Link
                  href="/companies"
                  className="text-[10px] font-mono text-text-muted hover:text-accent-data tracking-wider"
                >
                  full cohort ›
                </Link>
              </div>
              <ul className="grid grid-cols-1 gap-y-2 font-mono text-sm">
                {topMovers.map((m) => (
                  <li key={m.sym}>
                    <Link
                      href={m.slug ? `/companies/${m.slug}` : '/companies'}
                      className="grid grid-cols-[56px_minmax(0,1fr)_64px] gap-2 items-baseline hover:text-accent-data"
                    >
                      <span className="text-text-primary">{m.sym}</span>
                      <span className="font-display italic text-[13px] text-text-secondary truncate">
                        {m.name}
                      </span>
                      <span
                        className={
                          'text-right tabular-nums ' +
                          ((m.chgD ?? 0) >= 0
                            ? 'text-accent-data'
                            : 'text-accent-down')
                        }
                      >
                        {formatPct((m.chgD ?? 0) / 100, { signed: true })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>

      {/* ─────────── From the desks · essays ─────────── */}
      {recentEssays.length > 0 && (
        <section className="mt-20">
          <SectionHead
            eyebrow={`From the desks · ${essays.length} on file`}
            title="Recent"
            accentWord="essays"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
            {recentEssays.map((e, i) => (
              <Link
                key={e.slug}
                href={`/essays/${e.slug}`}
                className="bg-bg-surface p-6 hover:bg-bg-elevated transition-colors group flex flex-col gap-3"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display tabular-nums text-[20px] leading-none text-text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-text-muted">
                    {e.kicker ?? 'Essay'}
                  </span>
                </div>
                <h3 className="font-display text-[22px] tracking-tight text-text-primary leading-snug text-balance group-hover:text-accent-data transition-colors">
                  {splitForAccent(e.title, accentFor(e.title)).head}{' '}
                  <em className="not-italic font-normal italic text-accent-data">
                    {splitForAccent(e.title, accentFor(e.title)).accent}
                  </em>
                </h3>
                {e.subtitle && (
                  <p className="font-display italic text-[14px] text-text-secondary leading-snug max-w-[40ch]">
                    {e.subtitle}
                  </p>
                )}
                <div className="mt-auto pt-3 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.08em] text-text-muted">
                  {e.publishedAt && <span>{formatDate(e.publishedAt)}</span>}
                  {e.readTime && (
                    <>
                      <span className="text-text-muted/60">·</span>
                      <span>
                        {typeof e.readTime === 'number'
                          ? `${e.readTime} min read`
                          : e.readTime}
                      </span>
                    </>
                  )}
                  {e.author && (
                    <>
                      <span className="text-text-muted/60">·</span>
                      <span>{e.author}</span>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─────────── Cohort snapshot KPIs ─────────── */}
      <section className="mt-20">
        <SectionHead
          eyebrow={`The cohort · ${universe} names tracked`}
          title="A snapshot of the"
          accentWord="quantum economy"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
          <BigKpi label="Universe" value={String(universe)} sub="Listed + material private" />
          <BigKpi
            label="Listed / Private"
            value={`${listedCount} / ${privateCount}`}
            sub="By ownership status"
          />
          <BigKpi
            label="Combined cap"
            value={formatUsd(combinedCap * 1e6)}
            tone="data"
            sub="Public + post-money proxies"
          />
          <BigKpi
            label="Ledger Score"
            value={String(score.value)}
            tone={score.value >= 60 ? 'data' : score.value >= 45 ? 'warn' : 'down'}
            sub={score.label ?? defaultLabel(score.value)}
          />
        </div>
        <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.06em] text-text-muted leading-relaxed">
          Combined cap weighted by market cap for public names, last-round
          post-money for private. The Ledger Score above is the sector average.
        </p>
      </section>

      {/* ─────────── Featured rooms ─────────── */}
      <section className="mt-20">
        <SectionHead
          eyebrow="The Ledger · all rooms"
          title="Where to"
          accentWord="go next"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
          {ROOMS.map((r, i) => (
            <Link
              key={r.href}
              href={r.href}
              className="bg-bg-surface p-6 hover:bg-bg-elevated transition-colors group flex flex-col gap-3"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display tabular-nums text-[20px] leading-none text-text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-text-muted">
                  {r.tag}
                </span>
              </div>
              <h3 className="font-display text-[24px] tracking-tight text-text-primary leading-tight group-hover:text-accent-data transition-colors">
                {r.head}{' '}
                <em className="not-italic font-normal italic text-accent-data">
                  {r.accent}
                </em>
              </h3>
              <p className="font-display italic text-[15px] text-text-secondary leading-snug max-w-[36ch] mt-auto">
                {r.note}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────── Editorial close ─────────── */}
      <section className="mt-24 pt-12 border-t border-text-primary/90 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
        <div className="border-l-2 border-accent-data/40 pl-5 max-w-[62ch]">
          <p className="font-display italic text-[clamp(22px,2.6vw,30px)] leading-snug tracking-tight text-text-primary">
            The cohort is small, the news cycle is loud, and the numbers won't be
            honest for another five years. We write{' '}
            <span className="text-accent-data not-italic font-medium">
              one page a day
            </span>{' '}
            against that asymmetry.
          </p>
          <p className="mt-3 font-display italic text-sm text-text-muted">
            — The Ledger Desk
          </p>
        </div>
        <div className="text-sm text-text-secondary leading-[1.65] max-w-[44ch]">
          <p className="eyebrow mb-2">Start with</p>
          <ul className="grid gap-1.5">
            <li>
              <Link href="/brief" className="text-accent-data hover:underline">
                Today's brief ›
              </Link>
            </li>
            <li>
              <Link href="/learn" className="text-accent-data hover:underline">
                Primer · five working concepts ›
              </Link>
            </li>
            <li>
              <Link
                href="/companies"
                className="text-accent-data hover:underline"
              >
                The cohort directory ›
              </Link>
            </li>
            <li>
              <Link
                href="/ledger-score/methodology"
                className="text-accent-data hover:underline"
              >
                Score methodology ›
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────── helpers ────────────────────────────── */

const ROOMS: { href: string; tag: string; head: string; accent: string; note: string }[] = [
  { href: '/brief', tag: 'Daily · 06:00 ET', head: 'Today\u2019s', accent: 'brief', note: 'The ten stories we read, ranked. The headline you should have heard about by noon.' },
  { href: '/news', tag: 'Live wire', head: 'The', accent: 'firehose', note: 'Every story in the last 72 hours. Filter by topic and sentiment.' },
  { href: '/companies', tag: 'Cohort · 34 names', head: 'The', accent: 'directory', note: 'A screener for the listed and material private quantum economy, ranked by Ledger Score.' },
  { href: '/learn', tag: 'Primer · 5 chapters', head: 'How to', accent: 'read quantum', note: 'Five interactive widgets, five working frames. The shortest path to fluency.' },
  { href: '/darpa-qbi', tag: 'Tracker · Q4 2026', head: 'DARPA', accent: 'QBI', note: 'The most credible independent benchmark in the field. Live tracker for Stage B and Stage C.' },
  { href: '/qnt-ipo-watch', tag: 'Capital', head: 'Quantinuum', accent: 'IPO watch', note: 'The most consequential listing the sector has seen. Filing, pricing, lockup, comps.' },
  { href: '/today', tag: 'Coverage', head: 'The real', accent: 'deployments', note: 'A curated registry of paying-customer quantum workloads, by sector.' },
  { href: '/pqc-migration', tag: 'Policy', head: 'Post-quantum', accent: 'migration', note: 'NIST standards, vendor readiness, and the sectors most exposed to the refresh cycle.' },
  { href: '/future', tag: 'Outlook', head: 'What the Ledger', accent: 'expects', note: 'One, three, five, and ten-year horizons with forecast bands and regime breaks.' },
];

function SectionHead({
  eyebrow,
  title,
  accentWord,
}: {
  eyebrow: string;
  title: string;
  accentWord: string;
}) {
  return (
    <div className="mb-6 pb-3 border-b border-text-primary/90">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h2 className="font-display font-normal text-[clamp(24px,3vw,36px)] tracking-tight text-balance">
        {title}{' '}
        <em className="not-italic font-normal italic text-accent-data">
          {accentWord}
        </em>
      </h2>
    </div>
  );
}

function BigKpi({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: 'data' | 'warn' | 'down' | 'quantum';
}) {
  return (
    <div className="bg-bg-surface p-5">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono">
        {label}
      </p>
      <p
        className={
          'mt-2 font-display tabular-nums text-[clamp(28px,3.4vw,40px)] leading-none tracking-tight ' +
          (tone === 'data'
            ? 'text-accent-data'
            : tone === 'warn'
              ? 'text-accent-warn'
              : tone === 'down'
                ? 'text-accent-down'
                : tone === 'quantum'
                  ? 'text-accent-quantum'
                  : 'text-text-primary')
        }
      >
        {value}
      </p>
      {sub && (
        <p className="mt-2 font-display italic text-[13px] text-text-muted leading-snug">
          {sub}
        </p>
      )}
    </div>
  );
}

function ScoreScale({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="relative h-[6px] bg-border rounded-full overflow-hidden">
        <div
          className={
            'absolute inset-y-0 left-0 ' +
            (v >= 70
              ? 'bg-accent-data'
              : v >= 55
                ? 'bg-accent-data/70'
                : v >= 40
                  ? 'bg-accent-warn/80'
                  : 'bg-accent-down/80')
          }
          style={{ width: `${v}%` }}
        />
        <div
          className="absolute inset-y-0 w-px bg-text-muted/40"
          style={{ left: '60%' }}
          aria-hidden
        />
      </div>
      <div className="mt-2 flex justify-between text-[9px] font-mono uppercase tracking-[0.1em] text-text-muted">
        <span>0</span>
        <span>60 · threshold</span>
        <span>100</span>
      </div>
    </div>
  );
}

function normalizeScore(raw: any): { value: number; delta?: number | null; label?: string | null } {
  if (raw == null) return { value: 62 };
  if (typeof raw === 'number') return { value: raw };
  if (typeof raw === 'object') {
    return {
      value: typeof raw.value === 'number' ? raw.value : typeof raw.score === 'number' ? raw.score : 62,
      delta: typeof raw.delta === 'number' ? raw.delta : null,
      label: typeof raw.label === 'string' ? raw.label : null,
    };
  }
  return { value: 62 };
}

function defaultLabel(v: number) {
  if (v >= 80) return 'High conviction';
  if (v >= 70) return 'Constructive';
  if (v >= 55) return 'Cautiously constructive';
  if (v >= 40) return 'Watchlist';
  return 'Sceptical';
}

function parseTs(s?: string) {
  if (!s) return 0;
  const t = Date.parse(s);
  return isNaN(t) ? 0 : t;
}

// Split an essay title into a head and an italic-accent tail. We accent the
// last 1–2 words by default; falls back to the whole title if it is short.
function splitForAccent(title: string, accent: string): { head: string; accent: string } {
  if (!accent || !title.toLowerCase().endsWith(accent.toLowerCase())) {
    const words = title.split(/\s+/);
    if (words.length <= 2) return { head: '', accent: title };
    const tail = words.slice(-2).join(' ');
    return { head: words.slice(0, -2).join(' '), accent: tail };
  }
  const head = title.slice(0, title.length - accent.length).trimEnd();
  return { head, accent };
}

function accentFor(title: string): string {
  // Heuristic — accent the last 1–2 meaningful words. The user can override by
  // adding a `accent` field to ESSAYS entries later.
  const words = title.split(/\s+/);
  if (words.length <= 2) return title;
  return words.slice(-2).join(' ');
}

async function safe<T>(fn: () => Promise<T> | T): Promise<T | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}
