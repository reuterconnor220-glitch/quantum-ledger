import Link from 'next/link';
import { FUTURE_EVENTS, FORECAST_GRID, REVENUE_MIX, HORIZONS } from '@/lib/data/future';
import { TimelineChart } from '@/components/future/TimelineChart';
import { ForecastChart, MixChart } from '@/components/future/ForecastChart';

export const metadata = {
  title: 'The Quantum Future · 1, 3, 5, and 10 Years Out',
  description: '58 specific events with probability scores. Anchored vendor roadmaps, government deadlines, forecast trajectories. Four horizons — 2027, 2029, 2031, 2036 — with upside scenarios, downside risks, and how this affects your daily life. Defensible, citation-backed, visual.',
};

export const revalidate = 86400;

const KEY_EVENT_IDS_BY_YEAR_BLOCK = {
  '2026-27': FUTURE_EVENTS.filter((e) => e.year <= 2027),
  '2028-30': FUTURE_EVENTS.filter((e) => e.year >= 2028 && e.year <= 2030),
  '2031-33': FUTURE_EVENTS.filter((e) => e.year >= 2031 && e.year <= 2033),
  '2034-36': FUTURE_EVENTS.filter((e) => e.year >= 2034 && e.year <= 2036),
};

const CATEGORY_COLOR: Record<string, string> = {
  tech: 'bg-violet-500/15 text-violet-300',
  commercial: 'bg-accent-data/15 text-accent-data',
  government: 'bg-accent-warn/15 text-accent-warn',
  market: 'bg-blue-500/15 text-blue-300',
  crypto: 'bg-accent-down/15 text-accent-down',
  science: 'bg-purple-400/15 text-purple-300',
  industry: 'bg-pink-500/15 text-pink-300',
};

export default function FuturePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-subtle-grid bg-grid-32 opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
          <p className="eyebrow mb-3">The Future</p>
          <h1 className="font-display text-display-1 font-medium tracking-tight max-w-4xl">
            The next ten years in quantum, mapped.
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-3xl">
            Sixty specific events. Four horizons (1, 3, 5, 10 years). Each event probability-scored,
            impact-weighted, source-citable. Forecasts cross-checked against McKinsey, BCG, QED-C,
            and vendor roadmaps. Predictions calibrated to slip the way quantum roadmaps historically
            slip — 12-24 months on aggressive vendor claims, on-schedule for regulatory milestones.
          </p>
          <p className="mt-4 text-sm text-text-muted leading-relaxed max-w-3xl">
            This is not science fiction. The five-year window (2026-2031) is the period in which the
            field&apos;s central claim — that fault-tolerant quantum computing becomes useful —
            gets adjudicated. The next ten years matter more than the last fifty.
          </p>
        </div>
      </section>

      {/* Interactive timeline */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="mb-4">
          <p className="eyebrow mb-1">Master timeline</p>
          <h2 className="font-display text-3xl tracking-tight">
            Every event, on one chart
          </h2>
          <p className="mt-2 text-text-secondary text-sm max-w-3xl">
            Filter by category. Hover for details. Bubble size = expected impact. Bubble opacity =
            probability — faded bubbles are less likely. The teal vertical line marks today.
          </p>
        </div>
        <TimelineChart events={FUTURE_EVENTS} />
      </section>

      {/* Forecast charts */}
      <section className="border-t border-border bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
          <div className="mb-4">
            <p className="eyebrow mb-1">Quantitative forecasts</p>
            <h2 className="font-display text-3xl tracking-tight">
              Sector revenue + how the money flows
            </h2>
            <p className="mt-2 text-text-secondary text-sm max-w-3xl">
              Median revenue synthesis with confidence band. Below: revenue mix shifts from
              government-funded research toward commercial cloud — the inflection happens around
              2030 (BCG&apos;s NISQ-to-advantage phase boundary).
            </p>
          </div>
          <div className="space-y-5">
            <ForecastChart grid={FORECAST_GRID} />
            <MixChart data={REVENUE_MIX} />
          </div>
        </div>
      </section>

      {/* Four horizons */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
          <div className="mb-8">
            <p className="eyebrow mb-1">Per-horizon deep dive</p>
            <h2 className="font-display text-3xl tracking-tight">
              What 1, 3, 5, and 10 years actually means
            </h2>
            <p className="mt-2 text-text-secondary text-sm max-w-3xl">
              For each horizon: the technical state, upside scenarios, downside risks, how your daily
              life changes, what will <em>not</em> happen, and the watch signals to confirm we&apos;re
              on track.
            </p>
          </div>

          {/* Horizon nav */}
          <nav className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-2 sticky top-16 z-30 bg-bg py-3 -mx-2 px-2 border-b border-border-muted">
            {HORIZONS.map((h) => (
              <a
                key={h.yearsOut}
                href={`#h${h.yearsOut}`}
                className="text-center bg-bg-surface border border-border hover:border-accent-quantum/40 rounded-md p-3 transition group"
              >
                <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">
                  +{h.yearsOut} year{h.yearsOut > 1 ? 's' : ''}
                </p>
                <p className="font-display text-xl font-medium text-text-primary group-hover:text-accent-quantum">
                  {h.yearLabel.split('→')[1]?.trim() ?? ''}
                </p>
              </a>
            ))}
          </nav>

          {/* Horizons */}
          {HORIZONS.map((h, hi) => (
            <article key={h.yearsOut} id={`h${h.yearsOut}`} className="mb-20 scroll-mt-40">
              <header className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent-quantum font-mono mb-2">
                  +{h.yearsOut} year{h.yearsOut > 1 ? 's' : ''} · {h.yearLabel}
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-4">
                  {h.yearsOut === 1 && 'Next 12 months'}
                  {h.yearsOut === 3 && 'Three years out'}
                  {h.yearsOut === 5 && 'Five years — the inflection'}
                  {h.yearsOut === 10 && 'Ten years — quantum becomes infrastructure'}
                </h3>
                <p className="text-lg text-text-primary leading-relaxed border-l-2 border-accent-quantum pl-5 italic">
                  {h.oneLiner}
                </p>
              </header>

              {/* Daily life impact */}
              <div className="bg-accent-quantum/10 border-l-2 border-accent-quantum rounded-r-md p-5 mb-8">
                <p className="text-[10px] uppercase tracking-wider text-accent-quantum font-mono mb-2">
                  How this affects your life
                </p>
                <p className="text-[16px] leading-relaxed text-text-primary">{h.dailyLife}</p>
              </div>

              {/* Upside / Downside */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
                <div className="card p-5 border-l-2 border-l-accent-data">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent-data font-mono mb-4">
                    Upside scenarios
                  </p>
                  <ul className="space-y-4">
                    {h.upsides.map((u, i) => (
                      <li key={i}>
                        <p className="font-display text-base text-text-primary leading-tight mb-1">
                          <span className="mr-2">{u.icon}</span>
                          {u.topic}
                        </p>
                        <p className="text-sm text-text-secondary leading-relaxed">{u.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card p-5 border-l-2 border-l-accent-down">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent-down font-mono mb-4">
                    Downside risks
                  </p>
                  <ul className="space-y-4">
                    {h.downsides.map((d, i) => (
                      <li key={i}>
                        <p className="font-display text-base text-text-primary leading-tight mb-1">
                          <span className="mr-2">{d.icon}</span>
                          {d.topic}
                        </p>
                        <p className="text-sm text-text-secondary leading-relaxed">{d.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Won't happen */}
              <div className="card p-5 mb-5">
                <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono mb-3">
                  What probably <em>won&apos;t</em> happen in this window
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {h.willNotHappen.map((w, i) => (
                    <li key={i} className="text-text-secondary leading-relaxed">
                      <span className="text-text-muted mr-2">×</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Watch signals */}
              <div className="card p-5 mb-5">
                <p className="text-[10px] uppercase tracking-wider text-accent-data font-mono mb-3">
                  Watch signals · confirm we&apos;re on track
                </p>
                <ul className="space-y-2 text-sm">
                  {h.watchSignals.map((s, i) => (
                    <li key={i} className="text-text-secondary leading-relaxed">
                      <span className="text-accent-data mr-2">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Anchored milestones from master timeline */}
              <details className="card p-5 group">
                <summary className="cursor-pointer text-xs uppercase tracking-wider text-accent-quantum font-mono font-medium select-none flex justify-between items-center">
                  <span>{h.keyMilestones.length} anchored milestones · click to expand</span>
                  <span className="text-text-muted group-open:rotate-180 transition">⌄</span>
                </summary>
                <ul className="mt-4 space-y-3">
                  {h.keyMilestones.map((id) => {
                    const event = FUTURE_EVENTS.find((e) => e.id === id);
                    if (!event) return null;
                    return (
                      <li key={id} className="flex items-start gap-3 text-sm">
                        <span className="font-mono text-xs text-text-muted whitespace-nowrap w-20 flex-shrink-0 pt-0.5">
                          {event.year}{event.quarter && ` ${event.quarter}`}
                        </span>
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-xs ${CATEGORY_COLOR[event.category]} whitespace-nowrap mt-0.5`}>
                          {event.category}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-text-primary leading-tight">
                            {event.title}
                          </p>
                          <p className="text-xs text-text-muted mt-0.5 italic">{event.rationale}</p>
                        </div>
                        <span className="font-mono text-xs text-text-muted whitespace-nowrap pt-0.5">
                          {event.probability}%
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </details>

              {hi < HORIZONS.length - 1 && <hr className="my-12 border-border" />}
            </article>
          ))}
        </div>
      </section>

      {/* Synthesis */}
      <section className="border-t border-border bg-bg-surface/30">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
          <p className="eyebrow mb-1">Synthesis</p>
          <h2 className="font-display text-3xl tracking-tight mb-6">
            The honest read across all horizons
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              The decade ahead splits into <strong className="text-text-primary">three phases</strong>:
              an <strong className="text-text-primary">IPO super-cycle (2026-2027)</strong> dominated
              by Quantinuum&apos;s listing and DARPA QBI Stage C; a{' '}
              <strong className="text-text-primary">logical-qubit credibility era (2028-2030)</strong>{' '}
              when IBM Starling, Google&apos;s million-qubit target, PsiQuantum&apos;s facilities, and
              Quantinuum Apollo must convert vendor roadmaps into delivered hardware; and a{' '}
              <strong className="text-text-primary">cryptographic reckoning &amp; commercial inversion (2031-2036)</strong>{' '}
              when NIST PQC deadlines hit, Q-Day probabilities cross 50%, and quantum revenue mix
              inverts from government to commercial.
            </p>
            <p>
              Three independent forecasters (McKinsey, BCG, QED-C) converge on a 2028 quantum-computing
              revenue band of roughly $2.5-3.5B but diverge sharply on 2035 ($28B-$72B for computing
              alone per McKinsey vs. $90-170B total provider market by 2040 per BCG). That spread is
              the most honest answer to &quot;how big does this get?&quot;
            </p>
            <p>
              The single most useful question to ask: <strong className="text-text-primary">
              what would I do if I knew this was coming?</strong>
            </p>
            <ul className="space-y-2 mt-4">
              <li>
                <strong className="text-text-primary">If you handle long-lived secrets:</strong> start
                your PQC migration today. Most enterprises are already years late.
              </li>
              <li>
                <strong className="text-text-primary">If you run a pharma, chemicals, or materials company:</strong> establish a quantum partnership now. The 2030 leaders will be 5 years ahead of laggards.
              </li>
              <li>
                <strong className="text-text-primary">If you invest in quantum:</strong> assume 80%+ of
                current public-market valuations are not justified by 2030 fundamentals — but that
                2-3 winners will be enormous. Diversified exposure with explicit milestone gates is
                the only defensible posture at current multiples.
              </li>
              <li>
                <strong className="text-text-primary">If you&apos;re a student:</strong> quantum
                information science is one of the most leveraged fields you could enter for the next
                three decades. The talent gap (30:1 demand:supply by 2030) means premium compensation
                for credentialed quantum engineers persists.
              </li>
              <li>
                <strong className="text-text-primary">If you&apos;re a policymaker:</strong> PQC
                migration mandates, export controls, and compute-concentration regulation are the
                three near-term levers that matter most.
              </li>
              <li>
                <strong className="text-text-primary">For everyone else:</strong> you&apos;ll mostly
                notice quantum through second-order effects — better medicine, cheaper batteries,
                more capable AI. By 2036 it will be invisible infrastructure.
              </li>
            </ul>
            <p className="mt-6 text-sm text-text-muted">
              <strong>One last note on humility.</strong> Every forecast above is opinion under
              uncertainty. The 2030+ predictions are probability-weighted vendor claims that
              historically slip 18-36 months. The defensibility comes from triangulating vendor
              roadmaps against independent forecasters and regulatory schedules that exist
              independent of technical execution.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link href="/today" className="card card-hover p-4 block">
              <p className="eyebrow mb-1">Reality check</p>
              <p className="text-text-primary font-medium">What&apos;s deployed today</p>
            </Link>
            <Link href="/learn/risks" className="card card-hover p-4 block">
              <p className="eyebrow mb-1">Risks</p>
              <p className="text-text-primary font-medium">The other side of these forecasts</p>
            </Link>
            <Link href="/companies" className="card card-hover p-4 block">
              <p className="eyebrow mb-1">Tracker</p>
              <p className="text-text-primary font-medium">All 32 quantum companies</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
