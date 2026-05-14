// Ported /companies/[slug] per-company profile — design vocabulary applied.
// DROP-IN for src/app/companies/[slug]/page.tsx
//
// Preserved (existing repo helpers):
//   - getCompany(slug) + getAllCompanies() / type Company from '@/lib/data/companies'
//   - LEDGER_SCORES from '@/lib/data/ledger-score'
//   - getNewsForCompany(slug) from '@/lib/data/news'
//   - formatUsd, formatPct, formatDate from '@/lib/utils'
//   - SentimentChip + ArticleLd as used on /brief
//
// Visual layer matches /brief, /darpa-qbi, /companies:
//   - Masthead crest (Vol III · Cohort Profile · {ticker | name})
//     dateline carries ticker · HQ · founded · isPublic chip
//   - Wordmark: "<Name> <italic accent>" — accent word derived from modality
//   - Italic positioning subtitle under wordmark
//   - oneLineThesis as italic pull quote (border-l-2 border-accent-data/40 pl-5)
//   - Bull · Bear as dual-column with mirrored eyebrow + italic-serif body
//   - KPI strip: marketCap / revenueTTM / YoYGrowth / cash / latestRoundValuation
//   - Ledger Score section: big tabular figure + 4-dimension breakdown bars
//   - Recent news: ranked cards with serif drop figures + sentiment chip
//   - Primary sources / related at the foot

import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCompanyProfile,
  getAllCompanies,
  type CompanyProfile as Company,
} from '@/lib/data/companies';
import { LEDGER_SCORES } from '@/lib/data/ledger-score';
import { getNewsForCompany } from '@/lib/data/news';
import { formatUsd, formatPct, formatDate } from '@/lib/utils';
import { SentimentChip } from '@/components/SentimentChip';
import { ArticleLd } from '@/components/JsonLd';

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllCompanies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const c = getCompanyProfile(params.slug);
  if (!c) return { title: 'Company · The Quantum Ledger' };
  return {
    title: `${c.name} · ${c.modality ?? 'Quantum'} · The Quantum Ledger`,
    description:
      c.oneLineThesis ??
      `Analyst profile for ${c.name} — ledger score, bull/bear, KPIs, recent news.`,
  };
}

interface LedgerEntry {
  slug: string;
  score: number;
  delta?: number;
  label?: string;
  dimensions?: { key: string; label: string; value: number; weight?: number }[];
}

export default async function CompanyProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const c = getCompanyProfile(params.slug);
  if (!c) notFound();

  // Adapt LEDGER_SCORES (which has scores.{tech,capital,commercial,government,total})
  // into the flat LedgerEntry shape the page renders against.
  const raw = LEDGER_SCORES.find((e) => e.slug === params.slug);
  const ledger: LedgerEntry | undefined = raw
    ? {
        slug: raw.slug,
        score: raw.scores.total,
        label: raw.thesis,
        dimensions: [
          { key: 'tech', label: 'Technology', value: raw.scores.tech, weight: 30 },
          { key: 'capital', label: 'Capital', value: raw.scores.capital, weight: 20 },
          { key: 'commercial', label: 'Commercial', value: raw.scores.commercial, weight: 30 },
          { key: 'government', label: 'Government', value: raw.scores.government, weight: 20 },
        ],
      }
    : undefined;
  const news = (await getNewsForCompany(params.slug)) ?? [];

  const accentWord = pickAccentWord(c.modality ?? '');
  const isPublic = !!c.isPublic || !!c.listed;
  const ticker = c.ticker ?? c.sym ?? null;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      <ArticleLd
        headline={`${c.name} · Analyst profile`}
        description={c.oneLineThesis ?? `${c.name} on The Quantum Ledger`}
        url={
          (process.env.NEXT_PUBLIC_SITE_URL ??
            'https://quantum-ledger-vert.vercel.app') +
          '/companies/' +
          params.slug
        }
        datePublished={c.profileUpdatedAt ?? new Date().toISOString()}
      />

      {/* ─────────── Masthead crest ─────────── */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">
              Cohort Profile
            </span>
            <span className="text-text-muted/60">·</span>
            <span>{ticker ?? shortName(c.name)}</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap font-mono">
            {ticker && (
              <>
                <span className="text-text-primary">
                  {c.exchange ?? (isPublic ? 'LISTED' : 'PRIVATE')}: {ticker}
                </span>
                <span className="text-text-muted/60">·</span>
              </>
            )}
            {c.hq && (
              <>
                <span>{c.hq}</span>
                <span className="text-text-muted/60">·</span>
              </>
            )}
            {c.founded && (
              <>
                <span>Founded {c.founded}</span>
                <span className="text-text-muted/60">·</span>
              </>
            )}
            <span
              className={
                'px-2 py-px rounded-full border text-[9px] tracking-[0.1em] ' +
                (isPublic
                  ? 'border-accent-data text-accent-data bg-accent-data/8'
                  : 'border-accent-quantum text-accent-quantum bg-accent-quantum/8')
              }
            >
              {isPublic ? 'Public' : c.stage ?? 'Private'}
            </span>
          </div>

          <div className="text-right leading-relaxed">
            Boulder · Colorado
            <br />
            Analyst note · {c.modality ?? '—'}
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.94] tracking-[-0.025em] text-[clamp(40px,7vw,88px)] text-balance">
          {c.name}{' '}
          <em className="not-italic font-normal text-accent-data italic">
            {accentWord}
          </em>
        </h1>
        {c.positioning ?? c.focus ? (
          <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[58ch]">
            {c.positioning ?? c.focus}
          </p>
        ) : null}
      </header>

      {/* ─────────── Hero: thesis pull-quote + KPI strip ─────────── */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
        <div>
          {c.oneLineThesis && (
            <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
              <p className="font-display italic text-[22px] leading-snug tracking-tight text-text-primary">
                {c.oneLineThesis}
              </p>
              <p className="mt-3 font-display italic text-sm text-text-muted">
                — Ledger Desk · analyst thesis
              </p>
            </div>
          )}

          {/* Bull · Bear */}
          {(c.bullCase || c.bearCase) && (
            <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-md overflow-hidden">
              <BullBearCard side="bull" body={c.bullCase} />
              <BullBearCard side="bear" body={c.bearCase} />
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start grid gap-2.5">
          <Kpi
            label="Market cap"
            value={c.marketCapUsd != null ? formatUsd(c.marketCapUsd) : 'n/a'}
            tone="data"
          />
          <Kpi
            label="Revenue · TTM"
            value={c.revenueTtmUsd != null ? formatUsd(c.revenueTtmUsd) : '—'}
          />
          <Kpi
            label="YoY growth"
            value={
              c.revenueYoyGrowth != null
                ? formatPct(c.revenueYoyGrowth, { signed: true })
                : '—'
            }
            tone={
              c.revenueYoyGrowth != null && c.revenueYoyGrowth < 0
                ? 'down'
                : 'data'
            }
          />
          <Kpi
            label="Cash &amp; equivalents"
            value={c.cashUsd != null ? formatUsd(c.cashUsd) : '—'}
          />
          {!isPublic && (
            <Kpi
              label="Last round · post"
              value={
                c.latestRoundValuationUsd != null
                  ? formatUsd(c.latestRoundValuationUsd)
                  : '—'
              }
              tone="quantum"
            />
          )}
          {isPublic && c.runwayQuarters != null && (
            <Kpi
              label="Runway"
              value={`${c.runwayQuarters.toFixed(1)} Q`}
              tone={c.runwayQuarters < 4 ? 'warn' : undefined}
            />
          )}
        </aside>
      </section>

      {/* ─────────── Ledger Score ─────────── */}
      {ledger && (
        <section className="mt-16">
          <SectionHead
            eyebrow={`Ledger Score · ${c.name}`}
            title="The Ledger reads"
            accentWord={
              ledger.label?.toLowerCase() ??
              (ledger.score >= 70
                ? 'constructive'
                : ledger.score >= 55
                  ? 'cautious'
                  : 'sceptical')
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-10 items-start">
            <div>
              <div className="font-display tabular-nums text-[120px] leading-[0.86] tracking-[-0.045em] text-text-primary">
                {ledger.score}
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-text-muted">
                  / 100
                </span>
                {typeof ledger.delta === 'number' && (
                  <span
                    className={
                      'font-mono text-sm tabular-nums ' +
                      (ledger.delta >= 0
                        ? 'text-accent-data'
                        : 'text-accent-down')
                    }
                  >
                    {ledger.delta >= 0 ? '▲' : '▼'} {Math.abs(ledger.delta)} vs
                    T-30
                  </span>
                )}
              </div>
              <p className="mt-4 font-display italic text-lg text-text-secondary max-w-[28ch] leading-snug">
                {ledger.label ?? scoreLabel(ledger.score)}
              </p>
            </div>

            <div className="grid gap-3.5">
              {(ledger.dimensions ?? defaultDimensions(ledger.score)).map(
                (d) => (
                  <DimensionRow key={d.key ?? d.label} dim={d} />
                ),
              )}
              <p className="text-[10px] font-mono uppercase tracking-[0.06em] text-text-muted mt-2 leading-relaxed">
                Components are independently scored and weighted. See{' '}
                <Link
                  href="/ledger-score"
                  className="text-accent-data hover:underline"
                >
                  methodology
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─────────── Recent news ─────────── */}
      {news.length > 0 && (
        <section className="mt-16">
          <SectionHead
            eyebrow={`Recent · ${news.length} stories tracked`}
            title="What we're"
            accentWord="watching"
          />
          <ol className="grid">
            {news.slice(0, 8).map((n: any, i: number) => (
              <li key={n.id ?? i}>
                <a
                  href={n.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="grid grid-cols-[56px_minmax(0,1fr)] gap-6 py-5 border-t border-border first:border-t-text-primary hover:bg-bg-surface/40 transition-colors -mx-4 px-4 group"
                >
                  <span
                    className={
                      'font-display tabular-nums leading-none ' +
                      (i === 0
                        ? 'text-[52px] text-text-primary'
                        : 'text-[36px] text-text-muted')
                    }
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
                      <span className="uppercase font-semibold text-text-secondary">
                        {(n.source ?? '').replace('_', ' ')}
                      </span>
                      <span className="text-text-muted/60">·</span>
                      <span>{formatDate(n.publishedAt)}</span>
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
                      {n.title}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ─────────── Foot / related ─────────── */}
      <section className="mt-16 pt-10 border-t border-border grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 items-start">
        <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
          <p className="font-display italic text-[20px] leading-snug tracking-tight text-text-primary">
            A profile is a snapshot of an argument, not a verdict. The Ledger
            updates the score nightly; the{' '}
            <span className="text-accent-data not-italic font-medium">
              thesis
            </span>{' '}
            we revisit only when the facts change.
          </p>
          <p className="mt-3 font-display italic text-sm text-text-muted">
            — analyst-note conventions
          </p>
        </div>

        <div className="text-sm text-text-secondary leading-[1.65] max-w-[44ch]">
          <p className="eyebrow mb-2">Related</p>
          <ul className="grid gap-1.5">
            <li>
              <Link
                href="/companies"
                className="text-accent-data hover:underline"
              >
                Back to the cohort ›
              </Link>
            </li>
            <li>
              <Link
                href="/darpa-qbi"
                className="text-accent-data hover:underline"
              >
                DARPA QBI tracker ›
              </Link>
            </li>
            <li>
              <Link
                href="/ledger-score"
                className="text-accent-data hover:underline"
              >
                Score methodology ›
              </Link>
            </li>
            <li>
              <Link
                href="/earnings"
                className="text-accent-data hover:underline"
              >
                Earnings calendar ›
              </Link>
            </li>
          </ul>
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
        <em className="not-italic font-normal italic text-accent-data">
          {accentWord}
        </em>
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
  tone?: 'data' | 'warn' | 'down' | 'quantum';
}) {
  return (
    <div className="bg-bg-surface p-4 border border-border rounded-sm">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono">
        {label}
      </p>
      <p
        className={
          'mt-1.5 font-display tabular-nums text-[28px] leading-none tracking-tight ' +
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
    </div>
  );
}

function BullBearCard({
  side,
  body,
}: {
  side: 'bull' | 'bear';
  body?: string;
}) {
  if (!body) {
    return (
      <div className="bg-bg-surface p-6">
        <p className="eyebrow mb-3">
          {side === 'bull' ? 'Bull case' : 'Bear case'}
        </p>
        <p className="font-display italic text-text-muted text-[15px] leading-snug">
          —
        </p>
      </div>
    );
  }
  const accent = side === 'bull' ? 'accent-data' : 'accent-down';
  const glyph = side === 'bull' ? '▲' : '▼';
  return (
    <div className="bg-bg-surface p-6 relative">
      <span
        className={`absolute left-0 top-0 bottom-0 w-[2px] bg-${accent}/60`}
      />
      <div className="flex items-baseline justify-between mb-3">
        <p className="eyebrow">
          {side === 'bull' ? 'Bull case' : 'Bear case'}
        </p>
        <span
          className={`font-mono text-[11px] tabular-nums tracking-[0.08em] text-${accent}`}
        >
          {glyph} {side === 'bull' ? 'upside' : 'downside'}
        </span>
      </div>
      <p className="font-display text-[18px] leading-snug text-text-primary tracking-tight">
        {body}
      </p>
    </div>
  );
}

function DimensionRow({
  dim,
}: {
  dim: { key?: string; label: string; value: number; weight?: number };
}) {
  const v = Math.max(0, Math.min(100, dim.value));
  const tone =
    v >= 70
      ? 'bg-accent-data'
      : v >= 55
        ? 'bg-accent-data/70'
        : v >= 40
          ? 'bg-accent-warn/80'
          : 'bg-accent-down/80';
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_60px_minmax(0,1.4fr)] items-center gap-4">
      <p className="font-display text-[16px] tracking-tight text-text-primary">
        {dim.label}
      </p>
      <p className="font-display tabular-nums text-[20px] leading-none tracking-tight text-text-primary text-right">
        {dim.value}
      </p>
      <div className="relative h-[6px] bg-border rounded-full overflow-hidden">
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
    </div>
  );
}

/* ────────────────────────────── pure helpers ────────────────────────────── */

function pickAccentWord(modality: string): string {
  // First significant word from modality string — italicized in the wordmark.
  // "Superconducting (modular)" → "Superconducting"
  // "Trapped Ion (QCCD)" → "Trapped"
  // "Silicon T-centre spin-photon" → "Silicon"
  // "Photonic (GKP)" → "Photonic"
  // Falls back to a generic word if modality is empty.
  if (!modality) return 'quantum';
  const m = modality.match(/[A-Za-z][A-Za-z-]+/);
  return m ? m[0] : 'quantum';
}

function shortName(name: string) {
  return name.split(/[\s,]+/)[0];
}

function scoreLabel(s: number) {
  if (s >= 80) return 'High conviction';
  if (s >= 70) return 'Constructive';
  if (s >= 55) return 'Cautiously constructive';
  if (s >= 40) return 'Watchlist';
  return 'Sceptical';
}

function defaultDimensions(score: number) {
  // Fallback when the ledger entry has no `dimensions` array — gives the page
  // a coherent shape until structured per-dimension data is wired up.
  const jitter = (n: number) =>
    Math.max(0, Math.min(100, Math.round(score + n)));
  return [
    { key: 'capital', label: 'Capital flows', value: jitter(+6) },
    { key: 'tech', label: 'Technical milestones', value: jitter(+10) },
    { key: 'sentiment', label: 'Market sentiment', value: jitter(-8) },
    { key: 'policy', label: 'Policy / sovereign', value: jitter(+2) },
  ];
}
