// Ported /companies page — design vocabulary applied.
// DROP-IN for src/app/companies/page.tsx
//
// Preserved (assumes existing repo conventions, same as /brief and /darpa-qbi):
//   - getAllCompanies() / getCompany() / type Company from '@/lib/data/companies'
//     If the repo currently exposes only LISTED / PRIVATE arrays, add:
//        export const getAllCompanies = () => [...LISTED, ...PRIVATE];
//     in @/lib/data/companies and you're done.
//   - formatUsd / formatPct from '@/lib/utils'
//   - Tailwind tokens (text-accent-data, text-accent-down, text-accent-warn,
//     text-accent-quantum, bg-bg-surface, border-border, font-display, eyebrow utility)
//
// Visual layer matches /brief and /darpa-qbi:
//   - Masthead crest (Vol III · Sector Directory · Companies)
//   - Wordmark with italic accent: "The quantum cohort"
//   - Italic positioning subtitle
//   - Italic pull quote with border-l-2 border-accent-data/40 pl-5
//   - SectionHead helper (eyebrow + italic accent word + border-b border-text-primary/90)
//   - KPI tiles, ranked rows with serif drop figures (01..N), score density bars
//   - font-display tabular-nums for big numbers
//   - Filterable via URL search params (?ownership=, ?modality=, ?sort=) — no client JS

import Link from 'next/link';
import { getAllCompanies, type CompanyListing as Company } from '@/lib/data/companies';
import { fetchQuantumQuotes } from '@/lib/pipeline/quotes';
import { formatUsd, formatPct } from '@/lib/utils';

export const metadata = {
  alternates: { canonical: '/companies' },
  title: 'Companies · The Quantum Ledger',
  description:
    'The sector directory. Every public ticker and material private actor in the quantum economy, ranked by the Ledger Score and filterable by modality, ownership, and region.',
};

export const revalidate = 3600;

type Ownership = 'all' | 'listed' | 'private';
type SortKey = 'score' | 'cap' | 'd1' | 'name';
type SearchParams = {
  ownership?: Ownership;
  modality?: string;
  sort?: SortKey;
};

const MODALITIES: { key: string; label: string; match: (m: string) => boolean }[] = [
  { key: 'all', label: 'All modalities', match: () => true },
  { key: 'superconducting', label: 'Superconducting', match: (m) => /super/i.test(m) },
  { key: 'trapped-ion', label: 'Trapped ion', match: (m) => /ion/i.test(m) },
  { key: 'neutral-atom', label: 'Neutral atom', match: (m) => /neutral|atom|rydberg/i.test(m) },
  { key: 'photonic', label: 'Photonic', match: (m) => /photon/i.test(m) },
  { key: 'spin', label: 'Silicon spin', match: (m) => /spin|cmos|silicon|donor|t-cent/i.test(m) },
  { key: 'annealing', label: 'Annealing', match: (m) => /anneal/i.test(m) },
  { key: 'topological', label: 'Topological', match: (m) => /topo|majorana/i.test(m) },
  { key: 'software', label: 'Software & QEC', match: (m) => /software|qec|stack|compiler/i.test(m) },
];

export default async function CompaniesPage({ searchParams }: { searchParams?: SearchParams }) {
  const sp = searchParams ?? {};
  const ownership: Ownership = sp.ownership ?? 'all';
  const modalityKey = sp.modality ?? 'all';
  const sort: SortKey = sp.sort ?? 'score';

  // Live quotes — inject day-percent change into matching tickers so the directory shows real movement.
  const quotes = await fetchQuantumQuotes();
  const quoteByTicker = new Map<string, number>();
  for (const q of quotes) quoteByTicker.set(q.ticker.toUpperCase(), q.pct * 100);

  const all = getAllCompanies().map((c) =>
    c.sym && quoteByTicker.has(c.sym.toUpperCase())
      ? { ...c, chgD: quoteByTicker.get(c.sym.toUpperCase()) }
      : c,
  );
  const modality = MODALITIES.find((m) => m.key === modalityKey) ?? MODALITIES[0];

  let rows = all.filter((c) => {
    if (ownership === 'listed' && !c.listed) return false;
    if (ownership === 'private' && c.listed) return false;
    if (!modality.match(c.modality ?? '')) return false;
    return true;
  });

  rows = rows.slice().sort((a, b) => {
    if (sort === 'cap') return (b.cap ?? 0) - (a.cap ?? 0);
    if (sort === 'd1') return (b.chgD ?? 0) - (a.chgD ?? 0);
    if (sort === 'name') return (a.name ?? '').localeCompare(b.name ?? '');
    return (b.score ?? 0) - (a.score ?? 0);
  });

  // Cohort-level numbers for the masthead KPI strip
  const universe = all.length;
  const listedCount = all.filter((c) => c.listed).length;
  const privateCount = universe - listedCount;
  const combinedCap = all.reduce((s, c) => s + (c.cap ?? 0), 0);
  const weightedScore = (() => {
    const w = rows.reduce((s, c) => s + (c.cap ?? 1), 0) || 1;
    const v = rows.reduce((s, c) => s + (c.score ?? 0) * (c.cap ?? 1), 0);
    return Math.round(v / w);
  })();

  const movers = all
    .filter((c) => typeof c.chgD === 'number')
    .slice()
    .sort((a, b) => Math.abs((b.chgD ?? 0)) - Math.abs((a.chgD ?? 0)))
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      {/* ─────────── Masthead crest ─────────── */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">
              Sector Directory
            </span>
            <span className="text-text-muted/60">·</span>
            <span>Companies</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            {universe} names · listed &amp; material private
          </div>
          <div className="text-right leading-relaxed">
            Boulder · Colorado
            <br />
            updated continuously
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.94] tracking-[-0.025em] text-[clamp(40px,7vw,88px)] text-balance">
          The quantum{' '}
          <em className="not-italic font-normal text-accent-data italic">cohort</em>
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[58ch]">
          A screener for the quantum economy — every public ticker and material private actor,
          ranked by the Ledger Score and read against the same set of editorial questions.
        </p>
      </header>

      {/* ─────────── Italic-thesis lede + KPIs ─────────── */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
        <div>
          <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
            <p className="font-display italic text-[22px] leading-snug tracking-tight text-text-primary">
              The most useful screener for a pre-revenue sector is the one that lets you sort by{' '}
              <span className="text-accent-data not-italic font-medium">conviction</span>, not
              market cap.
            </p>
            <p className="mt-3 font-display italic text-sm text-text-muted">
              — the editorial premise of this directory
            </p>
          </div>

          <div className="mt-7 space-y-4 text-text-secondary leading-[1.65] text-[15px] max-w-[64ch]">
            <p>
              The cohort below is the universe the Ledger watches every weekday. It is curated, not
              exhaustive: each name is here because it is either publicly listed, materially funded,
              or carrying a technical claim other operators take seriously. The Ledger Score is a
              composite — capital, technical milestones, sentiment, policy, talent, patents — and is
              not a recommendation. Treat the rankings as a starting point, the per-company profile
              as the actual argument.
            </p>
            <p>
              Filter by{' '}
              <FilterMention value="ownership" current={ownership} />
              ,{' '}
              <FilterMention value="modality" current={modalityKey} />
              , or change the{' '}
              <FilterMention value="sort" current={sort} />. The directory state lives in the URL —
              copy the address bar and you've shared the screen.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="grid grid-cols-2 gap-px bg-border rounded-md overflow-hidden">
            <Kpi label="Universe" value={String(universe)} />
            <Kpi label="Listed / Private" value={`${listedCount} / ${privateCount}`} />
            <Kpi label="Combined cap" value={formatUsd(combinedCap * 1e6)} tone="data" />
            <Kpi
              label="Weighted score"
              value={String(weightedScore)}
              tone={weightedScore >= 60 ? 'data' : weightedScore >= 45 ? 'warn' : 'down'}
            />
          </div>
          <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.06em] text-text-muted leading-relaxed">
            Weighted by market cap across the active filter. Privates use last-round post-money as
            a cap proxy.
          </p>
        </aside>
      </section>

      {/* ─────────── Movers strip ─────────── */}
      {movers.length === 3 && (
        <section className="mt-14">
          <SectionHead
            eyebrow="Most active · today's session"
            title="Where the cohort is"
            accentWord="moving"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
            {movers.map((c) => (
              <MoverCard key={c.sym} c={c} />
            ))}
          </div>
        </section>
      )}

      {/* ─────────── The screener ─────────── */}
      <section className="mt-16">
        <SectionHead
          eyebrow={`The screener · ${rows.length} of ${universe} match`}
          title="Ranked by Ledger"
          accentWord="conviction"
        />

        <FilterRail ownership={ownership} modalityKey={modalityKey} sort={sort} />

        {/* Column legend */}
        <div className="mt-7 hidden md:grid grid-cols-[40px_minmax(0,2.6fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_120px] gap-5 px-4 py-2.5 text-[9px] font-mono uppercase tracking-[0.12em] text-text-muted border-b border-border">
          <span></span>
          <span>Name · ticker</span>
          <span>Modality · HQ</span>
          <span className="text-right">Cap</span>
          <span className="text-right">Δ session</span>
          <span className="text-right">Ledger Score</span>
        </div>

        <ol className="grid">
          {rows.map((c, i) => (
            <CompanyRow key={c.sym ?? c.slug ?? c.name} c={c} index={i + 1} />
          ))}
          {rows.length === 0 && (
            <li className="py-16 text-center font-display italic text-text-muted">
              No company in the cohort matches that filter. Try widening the modality.
            </li>
          )}
        </ol>
      </section>

      {/* ─────────── Footer / methodology ─────────── */}
      <section className="mt-16 pt-10 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 items-start">
          <div className="border-l-2 border-accent-data/40 pl-5 max-w-[64ch]">
            <p className="font-display italic text-[20px] leading-snug tracking-tight text-text-primary">
              A cohort is not an index. We omit names that publish only{' '}
              <span className="text-accent-data not-italic font-medium">aspirational</span>{' '}
              roadmaps; we include names with no revenue if a sovereign technical buyer has audited
              the science.
            </p>
            <p className="mt-3 font-display italic text-sm text-text-muted">
              — directory methodology
            </p>
          </div>

          <div className="text-sm text-text-secondary leading-[1.65] max-w-[44ch]">
            <p className="eyebrow mb-2">Related</p>
            <ul className="grid gap-1.5">
              <li>
                <Link href="/darpa-qbi" className="text-accent-data hover:underline">
                  DARPA QBI tracker ›
                </Link>
              </li>
              <li>
                <Link href="/ledger-score" className="text-accent-data hover:underline">
                  How the Ledger Score is built ›
                </Link>
              </li>
              <li>
                <Link href="/qnt-ipo-watch" className="text-accent-data hover:underline">
                  Quantinuum IPO watch ›
                </Link>
              </li>
              <li>
                <Link href="/earnings" className="text-accent-data hover:underline">
                  Earnings calendar ›
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────── helpers ────────────────────────────── */

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
      <h2 className="font-display font-normal text-3xl tracking-tight text-balance">
        {title}{' '}
        <em className="not-italic font-normal italic text-accent-data">{accentWord}</em>
      </h2>
    </div>
  );
}

function Kpi({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: 'data' | 'warn' | 'down';
}) {
  return (
    <div className="bg-bg-surface p-4">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono">{label}</p>
      <p
        className={
          'mt-1.5 font-display tabular-nums text-[26px] leading-none tracking-tight ' +
          (tone === 'data'
            ? 'text-accent-data'
            : tone === 'warn'
              ? 'text-accent-warn'
              : tone === 'down'
                ? 'text-accent-down'
                : 'text-text-primary')
        }
      >
        {value}
      </p>
    </div>
  );
}

function FilterMention({
  value,
  current,
}: {
  value: 'ownership' | 'modality' | 'sort';
  current: string;
}) {
  const label =
    value === 'ownership'
      ? 'ownership'
      : value === 'modality'
        ? 'modality'
        : 'sort order';
  return (
    <span className="font-mono text-[12px] text-text-primary px-1.5 py-px border border-border rounded-sm">
      {label}={current}
    </span>
  );
}

function FilterRail({
  ownership,
  modalityKey,
  sort,
}: {
  ownership: Ownership;
  modalityKey: string;
  sort: SortKey;
}) {
  // Build URLs that preserve the other params
  const url = (next: Partial<SearchParams>) => {
    const p = new URLSearchParams();
    const o = next.ownership ?? ownership;
    const m = next.modality ?? modalityKey;
    const s = next.sort ?? sort;
    if (o !== 'all') p.set('ownership', o);
    if (m !== 'all') p.set('modality', m);
    if (s !== 'score') p.set('sort', s);
    const q = p.toString();
    return q ? `/companies?${q}` : '/companies';
  };

  const ownerships: { key: Ownership; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'listed', label: 'Listed' },
    { key: 'private', label: 'Private' },
  ];
  const sorts: { key: SortKey; label: string }[] = [
    { key: 'score', label: 'Ledger Score' },
    { key: 'cap', label: 'Market cap' },
    { key: 'd1', label: 'Δ session' },
    { key: 'name', label: 'A–Z' },
  ];

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-text-muted w-[80px]">
          Ownership
        </span>
        <div className="flex flex-wrap gap-1.5">
          {ownerships.map((o) => (
            <Chip key={o.key} href={url({ ownership: o.key })} active={ownership === o.key}>
              {o.label}
            </Chip>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-text-muted w-[80px]">
          Modality
        </span>
        <div className="flex flex-wrap gap-1.5">
          {MODALITIES.map((m) => (
            <Chip key={m.key} href={url({ modality: m.key })} active={modalityKey === m.key}>
              {m.label}
            </Chip>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-text-muted w-[80px]">
          Sort
        </span>
        <div className="flex flex-wrap gap-1.5">
          {sorts.map((s) => (
            <Chip key={s.key} href={url({ sort: s.key })} active={sort === s.key}>
              {s.label}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
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

function MoverCard({ c }: { c: Company }) {
  const dir = (c.chgD ?? 0) >= 0 ? 'up' : 'down';
  return (
    <Link
      href={c.slug ? `/companies/${c.slug}` : '#'}
      className="bg-bg-surface p-5 hover:bg-bg-elevated transition-colors group"
    >
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <span className="font-display text-[22px] tracking-tight text-text-primary group-hover:text-accent-data transition-colors">
          {c.sym ?? c.name}
        </span>
        <span
          className={
            'font-display tabular-nums text-[22px] tracking-tight ' +
            (dir === 'up' ? 'text-accent-data' : 'text-accent-down')
          }
        >
          {formatPct((c.chgD ?? 0) / 100, { signed: true })}
        </span>
      </div>
      <p className="font-display italic text-[15px] leading-snug text-text-secondary mb-3 max-w-[40ch]">
        {c.focus ?? c.name}
      </p>
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.08em] text-text-muted">
        <span>{c.modality}</span>
        <span>{c.hq}</span>
      </div>
    </Link>
  );
}

function CompanyRow({ c, index }: { c: Company; index: number }) {
  const dir = (c.chgD ?? 0) >= 0 ? 'up' : 'down';
  const score = c.score ?? 0;
  return (
    <li>
      <Link
        href={c.slug ? `/companies/${c.slug}` : '#'}
        className="grid grid-cols-[40px_minmax(0,2.6fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_120px] gap-5 px-4 py-5 border-t border-border first:border-t-text-primary hover:bg-bg-surface/50 transition-colors items-center"
      >
        <span className="font-display tabular-nums text-[28px] leading-none text-text-muted">
          {String(index).padStart(2, '0')}
        </span>

        <div className="min-w-0">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="font-display text-[22px] tracking-tight leading-none text-text-primary">
              {c.name}
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
              {c.sym ?? (c.listed ? '—' : 'PRIVATE')}
            </span>
            {!c.listed && (
              <span className="text-[9px] font-mono uppercase tracking-[0.1em] px-1.5 py-px rounded-sm border border-accent-quantum/60 text-accent-quantum/90">
                {c.stage ?? 'Private'}
              </span>
            )}
          </div>
          {c.focus && (
            <p className="mt-1.5 font-display italic text-[14px] leading-snug text-text-secondary max-w-[60ch]">
              {c.focus}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-[12px] text-text-primary leading-tight">{c.modality}</p>
          <p className="text-[10px] font-mono uppercase tracking-[0.08em] text-text-muted mt-1">
            {c.hq}
          </p>
        </div>

        <div className="text-right font-display tabular-nums text-[18px] tracking-tight text-text-primary">
          {c.cap != null ? formatUsd((c.cap ?? 0) * 1e6) : <span className="text-text-muted italic font-display text-[14px]">n/a</span>}
        </div>

        <div className="text-right font-display tabular-nums text-[18px] tracking-tight">
          {c.chgD != null ? (
            <span className={dir === 'up' ? 'text-accent-data' : 'text-accent-down'}>
              {formatPct((c.chgD ?? 0) / 100, { signed: true })}
            </span>
          ) : (
            <span className="text-text-muted italic font-display text-[14px]">n/a</span>
          )}
          {c.chgY != null && (
            <div className="text-[10px] font-mono text-text-muted tracking-wider mt-1">
              YTD{' '}
              <span className={(c.chgY ?? 0) >= 0 ? 'text-text-secondary' : 'text-text-muted'}>
                {formatPct((c.chgY ?? 0) / 100, { signed: true })}
              </span>
            </div>
          )}
        </div>

        <div className="grid gap-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-display tabular-nums text-[22px] leading-none tracking-tight text-text-primary">
              {score}
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-text-muted">
              /100
            </span>
          </div>
          <ScoreBar value={score} />
        </div>
      </Link>
    </li>
  );
}

function ScoreBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  const tone =
    v >= 70
      ? 'bg-accent-data'
      : v >= 55
        ? 'bg-accent-data/70'
        : v >= 40
          ? 'bg-accent-warn/80'
          : 'bg-accent-down/80';
  return (
    <div className="relative h-[3px] bg-border rounded-full overflow-hidden">
      <div
        className={'absolute inset-y-0 left-0 ' + tone}
        style={{ width: `${v}%` }}
      />
      <div
        className="absolute inset-y-0 w-px bg-text-muted/40"
        style={{ left: '60%' }}
        aria-hidden
      />
    </div>
  );
}
