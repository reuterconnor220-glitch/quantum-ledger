import Link from 'next/link';
import {
  USE_CASE_LINES,
  HORIZON_LABEL,
  HORIZON_TONE,
  type UseCase,
} from '@/lib/data/use-cases';

export const metadata = {
  title: 'Use Cases · How quantum could change your daily life · Quantum Ledger',
  description:
    'A reader\'s guide to where quantum technologies stop being physics and start showing up in your hospital, your bank statement, your car nav system, and the power lines outside your window.',
};

export const revalidate = 86400;

export default function UseCasesPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      {/* Masthead */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">
              The Reader Guide
            </span>
            <span className="text-text-muted/60">·</span>
            <span>Use cases</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            Seven lines · sourced, dated, labeled honestly
          </div>
          <div className="text-right leading-relaxed">
            New York · Zürich
            <br />
            updated 2026-05-14
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.94] tracking-[-0.025em] text-[clamp(36px,6vw,76px)] text-balance">
          How could quantum actually change{' '}
          <em className="not-italic font-normal text-accent-data italic">your daily life</em>?
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[64ch]">
          A reader guide to where quantum technologies stop being physics and start showing up in
          your hospital, your bank statement, your car nav system, and the power lines outside.
        </p>
      </header>

      {/* Standard intro */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 items-start">
        <div>
          <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
            <p className="font-display italic text-[22px] leading-snug tracking-tight text-text-primary">
              Quantum has been &quot;10 years away&quot; for 40 years. We would rather tell you fewer
              things you can{' '}
              <span className="text-accent-data not-italic font-medium">trust</span> than more things
              you cannot.
            </p>
            <p className="mt-3 font-display italic text-sm text-text-muted">— the standard for this page</p>
          </div>

          <div className="mt-7 space-y-4 text-text-secondary leading-[1.65] text-[15px] max-w-[64ch]">
            <p>
              Every claim below is dated, sourced, and labeled by honesty: <strong className="text-accent-data">near-term (1–3 yrs)</strong>,{' '}
              <strong className="text-accent-quantum">mid-term (5–10 yrs)</strong>,{' '}
              <strong className="text-accent-warn">long-term (10–20 yrs)</strong>, or{' '}
              <strong className="text-accent-down">speculative (&gt;20 yrs or unsolved physics)</strong>.
            </p>
            <p>
              Each use case has a one-line headline for skimmers, a concrete scenario for the
              curious, then tech / timeline / honest-read / sources for anyone reading deeper. The
              technologies do not blur together. Each of the seven lines has its own physics, its
              own incumbents, its own honest read.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="card p-5 border border-border bg-bg-surface rounded-sm">
            <p className="eyebrow mb-3">If you remember three things</p>
            <ol className="space-y-3 text-sm text-text-secondary leading-snug">
              <li>
                <span className="font-mono text-accent-data text-xs">01</span>{' '}
                <strong className="text-text-primary">Sensing is closer than computing.</strong>{' '}
                Quantum sensors are already in clinics, mines, and military test programs.
              </li>
              <li>
                <span className="font-mono text-accent-data text-xs">02</span>{' '}
                <strong className="text-text-primary">PQC is the one line that touches you personally on a hard deadline.</strong>{' '}
                The rest of the timeline is genuinely uncertain.
              </li>
              <li>
                <span className="font-mono text-accent-data text-xs">03</span>{' '}
                <strong className="text-text-primary">&quot;Quantum&quot; is not one thing.</strong>{' '}
                Each of the seven lines has its own physics, its own incumbents, its own honest read.
              </li>
            </ol>
          </div>

          <nav className="mt-4 card p-5 border border-border bg-bg-surface rounded-sm">
            <p className="eyebrow mb-3">Jump to a line</p>
            <ul className="space-y-1.5 text-sm">
              {USE_CASE_LINES.map((line) => (
                <li key={line.slug}>
                  <a href={`#${line.slug}`} className="text-text-secondary hover:text-accent-data transition-colors">
                    → {line.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </section>

      {/* Lines */}
      <section className="mt-16 space-y-20">
        {USE_CASE_LINES.map((line, lineIdx) => (
          <section key={line.slug} id={line.slug} className="scroll-mt-20">
            <div className="mb-7 pb-3 border-b border-text-primary/90">
              <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
                Line {String(lineIdx + 1).padStart(2, '0')} of 07
              </p>
              <h2 className="font-display font-normal text-3xl md:text-4xl tracking-tight text-balance">
                {line.title.split(' ').slice(0, -1).join(' ')}{' '}
                <em className="not-italic font-normal italic text-accent-data">
                  {line.title.split(' ').slice(-1)}
                </em>
              </h2>
              <p className="mt-3 font-display italic text-lg text-text-secondary leading-snug max-w-[62ch]">
                {line.intro}
              </p>
            </div>

            <ol className="grid">
              {line.cases.map((c, i) => (
                <li key={i}>
                  <UseCaseCard useCase={c} index={i + 1} />
                </li>
              ))}
            </ol>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
              <FootCard label="If this works fully">{line.ifThisWorks}</FootCard>
              <FootCard label="Who is working on this">{line.whosWorkingOnThis}</FootCard>
              <FootCard label="Most likely first breakthrough">
                {line.firstCommercialBreakthrough}
              </FootCard>
            </div>
          </section>
        ))}
      </section>

      {/* Final reading guide */}
      <section className="mt-20 pt-10 border-t border-border max-w-3xl">
        <p className="eyebrow mb-3">How this page is maintained</p>
        <p className="text-sm text-text-secondary leading-relaxed">
          Every claim above is dated and source-cited. Where a claim is contested in the field, it
          is labeled aspirational. Where a claim is well-grounded, it is labeled plausible. The page
          is rewritten when material sources change. For deeper company-level coverage see{' '}
          <Link href="/companies" className="text-accent-data hover:underline">/companies</Link>; for
          forecast-band timelines see{' '}
          <Link href="/future" className="text-accent-data hover:underline">/future</Link>; for the
          PQC migration specifically see{' '}
          <Link href="/pqc-migration" className="text-accent-data hover:underline">/pqc-migration</Link>.
        </p>
      </section>
    </div>
  );
}

function UseCaseCard({ useCase, index }: { useCase: UseCase; index: number }) {
  return (
    <details className="group not-prose border-t border-border first:border-t-text-primary py-5 -mx-4 px-4 transition-colors hover:bg-bg-surface/30 [&[open]]:bg-bg-surface/40">
      <summary className="cursor-pointer grid grid-cols-[56px_minmax(0,1fr)_auto] gap-6 items-baseline list-none">
        <span className="font-display tabular-nums leading-none text-[36px] text-text-muted">
          {String(index).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.08em] font-mono mb-2">
            <span
              className={
                'px-2 py-0.5 rounded-full border ' +
                HORIZON_TONE[useCase.horizon]
              }
            >
              {HORIZON_LABEL[useCase.horizon]}
            </span>
          </div>
          <p className="font-display tracking-tight leading-snug text-[20px] text-text-primary text-balance group-open:text-accent-data transition-colors">
            {useCase.headline}
          </p>
        </div>
        <span className="text-text-muted group-open:text-accent-data text-sm font-mono group-open:rotate-180 transition-transform">
          ▾
        </span>
      </summary>

      <div className="mt-5 ml-[56px] pl-6 border-l border-border-muted space-y-4 text-[15px] leading-[1.65] text-text-secondary max-w-[68ch]">
        <p className="text-text-primary">{useCase.scenario}</p>
        <DetailRow label="The technology" body={useCase.tech} />
        <DetailRow label="Realistic timeline" body={useCase.timeline} />
        <DetailRow label="The honest read" body={useCase.honestRead} accent />
        {useCase.sources.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-2">
              Sources
            </p>
            <ul className="grid gap-1 text-sm">
              {useCase.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent-data hover:underline"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </details>
  );
}

function DetailRow({ label, body, accent }: { label: string; body: string; accent?: boolean }) {
  return (
    <div>
      <p
        className={
          'text-[10px] uppercase tracking-[0.08em] font-mono mb-1 ' +
          (accent ? 'text-accent-data' : 'text-text-muted')
        }
      >
        {label}
      </p>
      <p className={accent ? 'text-text-primary' : 'text-text-secondary'}>{body}</p>
    </div>
  );
}

function FootCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-bg-surface p-5">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-2">{label}</p>
      <p className="text-sm text-text-secondary leading-relaxed">{children}</p>
    </div>
  );
}
