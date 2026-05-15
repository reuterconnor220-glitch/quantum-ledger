import Link from 'next/link';
import { fetchBriefArchive } from '@/lib/data/live';
import { formatDate } from '@/lib/utils';

export const metadata = {
  alternates: { canonical: '/archive' },
  title: 'The Archive · Every past brief',
  description:
    'Every past edition of the Quantum Ledger daily brief. Searchable record of sector intelligence since Issue 001.',
};

export const revalidate = 600;
export const dynamic = 'force-dynamic';

function issueNumber(date: string) {
  const launch = new Date('2026-05-13').getTime();
  const d = new Date(date).getTime();
  const days = Math.max(0, Math.floor((d - launch) / (1000 * 60 * 60 * 24)));
  return days + 1;
}

export default async function ArchivePage() {
  const briefs = await fetchBriefArchive(120);

  // Group by year-month for the section headers
  const groups: Record<string, typeof briefs> = {};
  for (const b of briefs) {
    const month = new Date(b.briefDate).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    (groups[month] ??= []).push(b);
  }
  const orderedMonths = Object.keys(groups);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      {/* Masthead */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">
              The Archive
            </span>
            <span className="text-text-muted/60">·</span>
            <span>Every past brief</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            {briefs.length} editions on file
          </div>
          <div className="text-right leading-relaxed">
            Boulder · Colorado
            <br />
            updated daily 06:00 ET
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.94] tracking-[-0.025em] text-[clamp(40px,7vw,88px)] text-balance">
          The <em className="not-italic font-normal text-accent-data italic">Archive</em>
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[58ch]">
          The record. Every brief we have published, oldest hidden, newest on top.
        </p>
      </header>

      {/* Pull-quote */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
        <div>
          <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
            <p className="font-display italic text-[22px] leading-snug tracking-tight text-text-primary">
              A daily publication is only worth its{' '}
              <span className="text-accent-data not-italic font-medium">archive</span>.
              What we wrote in December last year is the standard we are held to in May this year.
            </p>
            <p className="mt-3 font-display italic text-sm text-text-muted">
              — the standard
            </p>
          </div>
          <div className="mt-7 space-y-4 text-text-secondary leading-[1.65] text-[15px] max-w-[64ch]">
            <p>
              The brief is generated daily at 12:00 UTC (06:00 MT / 08:00 ET) by an automated
              pipeline that ingests roughly 50–120 quantum-relevant stories from 9 sources,
              filters by relevance, scores sentiment and materiality, and synthesizes a top-of-day
              read. The record is permanent. Every previous edition lives below.
            </p>
            <p>
              For methodology see{' '}
              <Link href="/methodology" className="text-accent-data hover:underline">
                /methodology
              </Link>
              . For today&apos;s brief see{' '}
              <Link href="/brief" className="text-accent-data hover:underline">
                /brief
              </Link>
              .
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="grid grid-cols-2 gap-px bg-border rounded-md overflow-hidden">
            <Kpi label="Editions" value={String(briefs.length)} tone="data" />
            <Kpi label="Months covered" value={String(orderedMonths.length)} />
            <Kpi label="Cadence" value="Daily" />
            <Kpi label="Generated" value="06:00 MT" />
          </div>
          <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.06em] text-text-muted leading-relaxed">
            Newer editions display the full body inline. Older editions remain available at their
            dated permalinks.
          </p>
        </aside>
      </section>

      {/* Archive list */}
      <section className="mt-14">
        {orderedMonths.map((month) => (
          <div key={month} className="mb-14">
            <div className="mb-5 pb-3 border-b border-text-primary/90">
              <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
                {month} · {groups[month].length} {groups[month].length === 1 ? 'edition' : 'editions'}
              </p>
              <h2 className="font-display font-normal text-3xl tracking-tight">
                {month.split(' ')[0]}{' '}
                <em className="not-italic font-normal italic text-accent-data">
                  {month.split(' ')[1]}
                </em>
              </h2>
            </div>
            <ol className="grid">
              {groups[month].map((b, i) => (
                <li key={b.briefDate}>
                  <Link
                    href={`/archive/${b.briefDate}`}
                    className="grid grid-cols-[56px_minmax(0,1fr)_auto] gap-6 py-5 border-t border-border first:border-t-text-primary hover:bg-bg-surface/40 transition-colors -mx-4 px-4 group"
                  >
                    <span
                      className={
                        'font-display tabular-nums leading-none ' +
                        (i === 0 ? 'text-[52px] text-text-primary' : 'text-[36px] text-text-muted')
                      }
                    >
                      {String(new Date(b.briefDate).getDate()).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
                        <span className="text-text-secondary">
                          No. {issueNumber(b.briefDate)}
                        </span>
                        <span className="text-text-muted/60">·</span>
                        <span>{formatDate(b.briefDate, { style: 'long' })}</span>
                        {b.sectorSentiment !== 0 && (
                          <>
                            <span className="text-text-muted/60">·</span>
                            <span
                              className={
                                b.sectorSentiment > 0
                                  ? 'text-accent-data'
                                  : 'text-accent-down'
                              }
                            >
                              sentiment {b.sectorSentiment > 0 ? '+' : ''}
                              {b.sectorSentiment.toFixed(2)}
                            </span>
                          </>
                        )}
                      </div>
                      <p
                        className={
                          'font-display tracking-tight leading-snug text-balance group-hover:text-accent-data transition-colors ' +
                          (i === 0 ? 'text-[24px] text-text-primary' : 'text-[18px] text-text-primary')
                        }
                      >
                        {b.headline}
                      </p>
                      {b.oneLineSummary && (
                        <p className="mt-1.5 font-display italic text-[14px] text-text-secondary leading-snug max-w-[64ch]">
                          {b.oneLineSummary}
                        </p>
                      )}
                    </div>
                    <span
                      className="text-text-muted group-hover:text-accent-data transition-colors self-center font-mono text-sm"
                      aria-hidden
                    >
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}

function Kpi({ label, value, tone }: { label: string; value: string; tone?: 'data' }) {
  return (
    <div className="bg-bg-surface p-4">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono">{label}</p>
      <p
        className={
          'mt-1.5 font-display tabular-nums text-[26px] leading-none tracking-tight ' +
          (tone === 'data' ? 'text-accent-data' : 'text-text-primary')
        }
      >
        {value}
      </p>
    </div>
  );
}
