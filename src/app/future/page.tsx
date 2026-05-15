// Ported /future page — design vocabulary applied.
// DROP-IN for src/app/future/page.tsx
//
// Preserved:
//   - Forecast data from '@/lib/data/commercial' (FORECAST array of {y, v, expand?})
//     If your repo exposes this differently, replace the import line.
//
// Visual layer matches /brief, /darpa-qbi, /companies, /learn, /today, /news:
//   - Masthead crest (Vol III · Outlook · Future)
//   - Wordmark "What the *Ledger* expects" with italic accent
//   - Italic positioning subtitle
//   - Italic pull-quote lede
//   - KPI strip (horizons + sector cap target)
//   - Four time-horizon sections: 1y, 3y, 5y, 10y
//   - SVG forecast band chart (server-rendered, no client JS)
//   - SectionHead per horizon, ranked bullets

import Link from 'next/link';
import { FORECAST } from '@/lib/data/commercial';
import { formatUsd } from '@/lib/utils';
import { RevenueLandscape, type ForecastEntry } from '@/components/future/RevenueLandscape';

export const metadata = {
  title: 'Future · The Ledger outlook',
  description:
    'How the Ledger reads the next decade — 1, 3, 5, and 10-year horizons with revenue bands, regime breaks, and the catalysts that move them.',
};

export const revalidate = 86400;


const HORIZONS: {
  key: string;
  label: string;
  year: number;
  thesis: string;
  bullets: string[];
}[] = [
  {
    key: '1y',
    label: 'One year out',
    year: 2027,
    thesis:
      'A sentiment reset. Sector revenue still doubles — the listed cohort still trades on roadmaps, not numbers.',
    bullets: [
      'DARPA QBI Stage C decisions (Q4 2026) reshape the cap table by Q2',
      'Quantinuum IPO prices and trades; sets the comp for the next two pure-play listings',
      'First production logical-qubit workloads outside the IBM/Quantinuum customer set',
      'EU sovereign procurement starts spending against the 2024 budget cycle',
    ],
  },
  {
    key: '3y',
    label: 'Three years out',
    year: 2029,
    thesis:
      'The roadmap-versus-execution gap closes. Names that promised utility-scale FTQC by 2029 either deliver or are repriced.',
    bullets: [
      'IBM, Quantinuum, and Xanadu hit (or visibly miss) their 2029 fault-tolerance milestones',
      'PsiQuantum first utility computer brought online at IQMP — independent IV&V on every claim',
      'PQC migration peaks: FedRAMP & NIS2 deadlines force a global crypto refresh, drives a hardware cycle',
      'First chemistry pilots clear pharma\u2019s threshold for in-house decision support',
    ],
  },
  {
    key: '5y',
    label: 'Five years out',
    year: 2031,
    thesis:
      'The sector splits. Two or three names own utility-scale; the long tail consolidates into application software and sovereign hardware niches.',
    bullets: [
      'First commercial fault-tolerant systems cross ~1,000 logical qubits at useful fidelity',
      'Quantum simulation revenue overtakes hardware-access revenue as the largest segment',
      'Modality convergence: one or two architectures cover most enterprise workloads; the rest are R&D',
      'Independent error-correction stack vendors (Riverlane class) emerge as a discrete category',
    ],
  },
  {
    key: '10y',
    label: 'Ten years out',
    year: 2036,
    thesis:
      'The DARPA 2033 utility-scale verification has either succeeded or not, and that single fact dominates everything else.',
    bullets: [
      'If 2033 was met: quantum becomes an enterprise compute primitive, like GPU acceleration in 2018',
      'If 2033 slipped: revenue plateaus at the simulation + sensing + PQC floor (~$30B / yr)',
      'Cryptographically relevant Shor remains the most-watched and most-unlikely threshold',
      'Sovereign demand exceeds private demand for the first time since 2025',
    ],
  },
];

export default function FuturePage() {
  const forecast = (FORECAST as ForecastEntry[]) ?? [];
  const target2030 = forecast.find((f) => f.y === 2030)?.v;
  const target2034 = forecast.find((f) => f.y === 2034)?.v;
  const horizonLabel = (h: number) => `${h}y`;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      {/* Masthead */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">Outlook</span>
            <span className="text-text-muted/60">·</span>
            <span>Future</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            One · three · five · ten-year horizons
          </div>
          <div className="text-right leading-relaxed">
            Boulder · Colorado
            <br />
            revised quarterly
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.94] tracking-[-0.025em] text-[clamp(40px,7vw,88px)] text-balance">
          What the{' '}
          <em className="not-italic font-normal text-accent-data italic">Ledger</em>{' '}
          expects
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[58ch]">
          A four-horizon read on the quantum economy. Numbers are revisable; the
          shape of the regime breaks is not.
        </p>
      </header>

      {/* Lede + KPIs */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
        <div>
          <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
            <p className="font-display italic text-[22px] leading-snug tracking-tight text-text-primary">
              Forecasts are most useful where the curve{' '}
              <span className="text-accent-data not-italic font-medium">bends</span>.
              We mark the bends; the levels follow.
            </p>
            <p className="mt-3 font-display italic text-sm text-text-muted">
              — the editorial premise of this page
            </p>
          </div>
          <div className="mt-7 space-y-4 text-text-secondary leading-[1.65] text-[15px] max-w-[64ch]">
            <p>
              The curve below is the Ledger's central estimate of sector revenue,
              annotated where we expect regime breaks: chemistry pilots → production
              (2028), PQC migration peak (2030), logical-qubit utility threshold
              (2032). Each break is a thesis, not a prediction; the absolute levels
              follow once the break either holds or doesn't.
            </p>
            <p>
              Below the chart we read the next ten years through four horizons. Each
              section names the call we make and the catalysts we'll be watching to
              update it.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="grid grid-cols-2 gap-px bg-border rounded-md overflow-hidden">
            <Kpi label="Horizons" value="4" />
            <Kpi label="Regime breaks" value="3" tone="quantum" />
            <Kpi
              label="2030 target"
              value={target2030 != null ? `$${target2030.toFixed(1)}B` : '—'}
              tone="data"
            />
            <Kpi
              label="2034 target"
              value={target2034 != null ? `$${target2034.toFixed(1)}B` : '—'}
              tone="data"
            />
          </div>
          <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.06em] text-text-muted leading-relaxed">
            Central estimate. Forecast bands span ±35% to a 10-year horizon.
          </p>
        </aside>
      </section>

      {/* Earnings tracker bridge — flow from "what reported this quarter" to "where the curve goes" */}
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-stretch">
        <Link
          href="/earnings"
          className="group bg-bg-surface border border-border rounded-md p-6 hover:border-accent-data transition-colors"
        >
          <p className="text-[10px] uppercase tracking-[0.15em] text-accent-data font-mono mb-2">
            Quarterly · The Earnings Desk
          </p>
          <p className="font-display text-[22px] leading-tight tracking-tight text-text-primary mb-2 group-hover:text-accent-data transition-colors">
            What the public cohort actually reported this quarter ›
          </p>
          <p className="text-[13px] text-text-secondary leading-snug">
            Every quantum-exposed public earnings call distilled in 48 hours — headline metrics,
            what changed, and the read-through. The numbers underneath the forecast below.
          </p>
        </Link>
        <div className="bg-bg-surface border border-border rounded-md p-6">
          <p className="text-[10px] uppercase tracking-[0.15em] text-accent-data font-mono mb-2">
            The bridge
          </p>
          <p className="font-display italic text-[18px] leading-snug text-text-primary mb-2">
            Quarterly prints anchor the near term; the forecast below extends the same series
            out to <em className="text-accent-data not-italic font-semibold">2036</em> with three
            regime breaks that re-rate the entire curve.
          </p>
          <p className="text-[12px] text-text-secondary leading-snug">
            Read the calls. Then read the chart.
          </p>
        </div>
      </section>

      {/* Forecast chart — refactored for legibility */}
      <div className="mt-12">
        <RevenueLandscape forecast={forecast} />
      </div>

      {/* Horizons */}
      {HORIZONS.map((h) => (
        <section key={h.key} id={h.key} className="mt-16 scroll-mt-20">
          <SectionHead
            eyebrow={`${horizonLabel(h.year - 2026)} · ${h.year}`}
            title={h.label.split(' ')[0] + ' year'}
            accentWord={h.year.toString()}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-10 items-start">
            <div className="border-l-2 border-accent-data/40 pl-5 max-w-[58ch]">
              <p className="font-display italic text-[20px] leading-snug tracking-tight text-text-primary">
                {h.thesis}
              </p>
              <p className="mt-3 font-display italic text-sm text-text-muted">
                — {h.label.toLowerCase()}, the call we make
              </p>
            </div>
            <ol className="grid">
              {h.bullets.map((b, i) => (
                <li key={i}>
                  <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 py-4 border-t border-border first:border-t-text-primary">
                    <span className="font-display tabular-nums text-[22px] leading-none text-text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-display text-[16px] leading-snug text-text-primary tracking-tight">
                      {b}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      {/* Foot */}
      <section className="mt-16 pt-10 border-t border-border grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
        <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
          <p className="font-display italic text-[20px] leading-snug tracking-tight text-text-primary">
            A horizon is not a target. It is a frame we use to reread the same
            cohort with{' '}
            <span className="text-accent-data not-italic font-medium">different time constants</span>.
          </p>
        </div>
        <div className="text-sm text-text-secondary leading-[1.65] max-w-[44ch]">
          <p className="eyebrow mb-2">Related</p>
          <ul className="grid gap-1.5">
            <li><Link href="/companies" className="text-accent-data hover:underline">The cohort directory ›</Link></li>
            <li><Link href="/today" className="text-accent-data hover:underline">Deployments ›</Link></li>
            <li><Link href="/pqc-migration" className="text-accent-data hover:underline">PQC migration ›</Link></li>
            <li><Link href="/darpa-qbi" className="text-accent-data hover:underline">DARPA QBI tracker ›</Link></li>
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
          'mt-1.5 font-display tabular-nums text-[24px] leading-none tracking-tight ' +
          (tone === 'data' ? 'text-accent-data' : tone === 'warn' ? 'text-accent-warn' : tone === 'down' ? 'text-accent-down' : tone === 'quantum' ? 'text-accent-quantum' : 'text-text-primary')
        }
      >
        {value}
      </p>
    </div>
  );
}
