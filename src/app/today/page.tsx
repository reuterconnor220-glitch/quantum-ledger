// Ported /today "Deployments" page — design vocabulary applied.
// DROP-IN for src/app/today/page.tsx
//
// Preserved exactly from the original:
//   - The categorical data structure (DEPLOYMENTS array, grouped by sector)
//   - All customer / vendor / year fields
//
// Visual layer matches /brief, /darpa-qbi, /companies, /companies/[slug], /learn:
//   - Masthead crest (Vol III · Sector Coverage · Deployments)
//   - Wordmark "The real *deployments*" with italic accent
//   - Italic positioning subtitle
//   - Italic pull-quote lede (border-l-2 border-accent-data/40 pl-5)
//   - KPI tiles (deployments / vendors / sectors / oldest)
//   - SectionHead per sector (eyebrow + italic accent + border-b border-text-primary/90)
//   - Ranked cards with serif drop figures
//   - Status chips (Production / Pilot / Research) in the established teal/yellow/purple palette
//   - URL-driven filter chips (?sector=, ?status=) — stays server-rendered like the rest

import Link from 'next/link';

export const metadata = {
  title: 'Deployments · The Quantum Ledger',
  description:
    'A curated registry of paying-customer quantum deployments. Real workloads, real vendors, real dollars — grouped by sector and tagged by maturity.',
};

export const revalidate = 86400;

type Status = 'Production' | 'Pilot' | 'Research';

interface Deployment {
  customer: string;
  vendor: string; // canonical vendor / platform
  sector: string;
  workload: string; // one-line description
  since: string; // year started
  status: Status;
  region?: string;
}

// ─────────── Existing categorical data — preserved verbatim ───────────
// (Grouped by sector via the SECTORS map below; order within a sector
//  is by status weight then year ascending.)
const DEPLOYMENTS: Deployment[] = [
  // Finance
  {
    customer: 'JPMorgan Chase',
    vendor: 'IBM + IonQ',
    sector: 'Finance',
    workload:
      'Portfolio optimization and option-pricing research on superconducting and trapped-ion hardware; multi-year multi-vendor commitment.',
    since: '2021',
    status: 'Production',
    region: 'USA · NY',
  },
  {
    customer: 'Goldman Sachs',
    vendor: 'IonQ · QC Ware',
    sector: 'Finance',
    workload:
      'Quantum-accelerated Monte Carlo risk simulation; preprint demonstrated quadratic speedup on credit-risk workloads.',
    since: '2020',
    status: 'Pilot',
    region: 'USA · NY',
  },
  {
    customer: 'HSBC',
    vendor: 'Quantinuum',
    sector: 'Finance',
    workload:
      'Fraud-detection prototype built on H-series trapped-ion processors; expanded into FX pricing models in 2024.',
    since: '2023',
    status: 'Pilot',
    region: 'UK · London',
  },
  {
    customer: 'BBVA',
    vendor: 'Multiverse Computing',
    sector: 'Finance',
    workload:
      'Tensor-network-driven portfolio rebalancing; one of the earliest paying European banking pilots.',
    since: '2019',
    status: 'Pilot',
    region: 'ESP · Bilbao',
  },

  // Pharma & life sciences
  {
    customer: 'Roche',
    vendor: 'Quantinuum (InQuanto)',
    sector: 'Pharma & Life Sciences',
    workload:
      'Molecular-dynamics simulations on hybrid quantum-classical stack; renewed for a third year in 2025.',
    since: '2023',
    status: 'Production',
    region: 'CHE · Basel',
  },
  {
    customer: 'Pfizer',
    vendor: 'IBM · IonQ',
    sector: 'Pharma & Life Sciences',
    workload:
      'Protein-folding research with multi-vendor hybrid stack; published 2024 preprint on conformational sampling.',
    since: '2021',
    status: 'Pilot',
    region: 'USA · NY',
  },
  {
    customer: 'Cleveland Clinic',
    vendor: 'IBM',
    sector: 'Pharma & Life Sciences',
    workload:
      'On-premise IBM Quantum System One — first dedicated healthcare quantum installation.',
    since: '2023',
    status: 'Production',
    region: 'USA · OH',
  },
  {
    customer: 'Boehringer Ingelheim',
    vendor: 'Google Quantum AI',
    sector: 'Pharma & Life Sciences',
    workload:
      'Molecular-simulation research partnership; renewed and expanded into materials chemistry in 2024.',
    since: '2021',
    status: 'Research',
    region: 'DEU · Ingelheim',
  },

  // Automotive
  {
    customer: 'BMW Group',
    vendor: 'Pasqal',
    sector: 'Automotive',
    workload:
      'Neutral-atom simulation of battery-cathode materials; pilot moved to a second production lane in early 2026.',
    since: '2024',
    status: 'Pilot',
    region: 'DEU · Munich',
  },
  {
    customer: 'Mercedes-Benz',
    vendor: 'PsiQuantum',
    sector: 'Automotive',
    workload:
      'Battery-cell chemistry simulation; multi-year framework agreement signed alongside PsiQuantum Series E.',
    since: '2023',
    status: 'Research',
    region: 'DEU · Stuttgart',
  },
  {
    customer: 'Volkswagen Group',
    vendor: 'D-Wave',
    sector: 'Automotive',
    workload:
      'Traffic-flow optimization deployed in pilot cities; oldest continuous annealing program in the cohort.',
    since: '2017',
    status: 'Production',
    region: 'DEU · Wolfsburg',
  },

  // Aerospace & defense
  {
    customer: 'Airbus',
    vendor: 'QuEra',
    sector: 'Aerospace & Defense',
    workload:
      'Neutral-atom flight-loading optimization; extends earlier Airbus Quantum Challenge prize workloads into production tooling.',
    since: '2024',
    status: 'Pilot',
    region: 'FRA · Toulouse',
  },
  {
    customer: 'Boeing',
    vendor: 'IonQ',
    sector: 'Aerospace & Defense',
    workload:
      'Composite-material simulation on trapped-ion systems; co-authored a 2024 paper on vibration-mode estimation.',
    since: '2022',
    status: 'Research',
    region: 'USA · WA',
  },
  {
    customer: 'Lockheed Martin',
    vendor: 'D-Wave',
    sector: 'Aerospace & Defense',
    workload:
      'Software-verification workloads on annealers — the earliest commercial quantum customer of record.',
    since: '2011',
    status: 'Production',
    region: 'USA · MD',
  },
  {
    customer: 'BAE Systems',
    vendor: 'Riverlane',
    sector: 'Aerospace & Defense',
    workload:
      'Real-time decoder integration for fault-tolerant stack research; UK NCQC participant.',
    since: '2024',
    status: 'Research',
    region: 'UK · Farnborough',
  },

  // Energy
  {
    customer: 'ExxonMobil',
    vendor: 'IBM',
    sector: 'Energy',
    workload:
      'Catalyst-discovery simulations on superconducting hardware; oldest continuously-renewed IBM Quantum Network partnership in the energy sector.',
    since: '2019',
    status: 'Production',
    region: 'USA · TX',
  },
  {
    customer: 'TotalEnergies',
    vendor: 'Pasqal',
    sector: 'Energy',
    workload:
      'CO₂-capture material modelling on neutral-atom processors; expanded into hydrogen-carrier research in 2025.',
    since: '2023',
    status: 'Pilot',
    region: 'FRA · Paris',
  },
  {
    customer: 'Equinor',
    vendor: 'IBM',
    sector: 'Energy',
    workload:
      'Seismic-imaging research on IBM Quantum Network — early subsurface-modelling proof of concept.',
    since: '2022',
    status: 'Research',
    region: 'NOR · Stavanger',
  },

  // Government & research
  {
    customer: 'DARPA',
    vendor: 'QBI cohort (11)',
    sector: 'Government & Research',
    workload:
      'Quantum Benchmarking Initiative — sovereign technical audit of utility-scale roadmaps across 11 Stage B performers, ceiling $15M each.',
    since: '2023',
    status: 'Production',
    region: 'USA · VA',
  },
  {
    customer: 'NASA Ames',
    vendor: 'D-Wave',
    sector: 'Government & Research',
    workload:
      'Mission-trajectory optimization on annealers; one of the longest-running US government quantum installations.',
    since: '2017',
    status: 'Production',
    region: 'USA · CA',
  },
  {
    customer: 'CERN openlab',
    vendor: 'IBM · IonQ',
    sector: 'Government & Research',
    workload:
      'High-energy-physics workload encoding research; co-published on quantum amplitude estimation for collision simulations.',
    since: '2021',
    status: 'Research',
    region: 'CHE · Geneva',
  },
  {
    customer: 'UK NQCC',
    vendor: 'Quantum Motion · Oxford Quantum Circuits',
    sector: 'Government & Research',
    workload:
      'On-premise full-stack silicon-CMOS quantum computer (Sep 2025) — industry-first sovereign install.',
    since: '2025',
    status: 'Production',
    region: 'UK · Harwell',
  },
];

// Sector display order — preserved from the original page
const SECTORS = [
  'Finance',
  'Pharma & Life Sciences',
  'Automotive',
  'Aerospace & Defense',
  'Energy',
  'Government & Research',
];

const STATUS_COLOR: Record<Status, string> = {
  Production: 'border-accent-data text-accent-data bg-accent-data/8',
  Pilot: 'border-accent-warn/70 text-accent-warn bg-accent-warn/5',
  Research: 'border-accent-quantum/70 text-accent-quantum bg-accent-quantum/8',
};

const STATUS_RANK: Record<Status, number> = {
  Production: 0,
  Pilot: 1,
  Research: 2,
};

type SearchParams = {
  sector?: string;
  status?: 'all' | Status;
};

export default function DeploymentsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const sp = searchParams ?? {};
  const sectorFilter = sp.sector ?? 'all';
  const statusFilter = sp.status ?? 'all';

  const filtered = DEPLOYMENTS.filter((d) => {
    if (sectorFilter !== 'all' && d.sector !== sectorFilter) return false;
    if (statusFilter !== 'all' && d.status !== statusFilter) return false;
    return true;
  });

  const total = DEPLOYMENTS.length;
  const vendors = new Set(
    DEPLOYMENTS.flatMap((d) => d.vendor.split(/[·+]/).map((s) => s.trim())),
  ).size;
  const oldest = DEPLOYMENTS.reduce(
    (acc, d) => (Number(d.since) < Number(acc.since) ? d : acc),
    DEPLOYMENTS[0],
  );

  const grouped: Record<string, Deployment[]> = {};
  for (const d of filtered) {
    (grouped[d.sector] ??= []).push(d);
  }
  for (const k of Object.keys(grouped)) {
    grouped[k].sort((a, b) => {
      const r = STATUS_RANK[a.status] - STATUS_RANK[b.status];
      if (r !== 0) return r;
      return Number(a.since) - Number(b.since);
    });
  }

  const productionCount = DEPLOYMENTS.filter(
    (d) => d.status === 'Production',
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      {/* ─────────── Masthead crest ─────────── */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">
              Sector Coverage
            </span>
            <span className="text-text-muted/60">·</span>
            <span>Deployments</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            Where money actually changed hands
          </div>
          <div className="text-right leading-relaxed">
            Boulder · Colorado
            <br />
            curated · live registry
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.94] tracking-[-0.025em] text-[clamp(40px,7vw,88px)] text-balance">
          The real{' '}
          <em className="not-italic font-normal text-accent-data italic">
            deployments
          </em>
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[58ch]">
          A curated registry of paying-customer quantum workloads. We track who
          bought, what they're running, who they bought from, and how mature the
          program actually is.
        </p>
      </header>

      {/* ─────────── Italic-thesis lede + KPIs ─────────── */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
        <div>
          <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
            <p className="font-display italic text-[22px] leading-snug tracking-tight text-text-primary">
              A logo on a slide is a marketing milestone. A renewed{' '}
              <span className="text-accent-data not-italic font-medium">
                purchase order
              </span>{' '}
              is a deployment.
            </p>
            <p className="mt-3 font-display italic text-sm text-text-muted">
              — the inclusion test for this registry
            </p>
          </div>

          <div className="mt-7 space-y-4 text-text-secondary leading-[1.65] text-[15px] max-w-[64ch]">
            <p>
              Most "quantum customer" lists are press-release composites — every
              Quantum Network member, every workshop attendee, every academic
              co-author. This one is narrower. Each entry below describes a
              specific workload, a specific vendor, and a contract the customer
              has elected to renew at least once. The status chip distinguishes{' '}
              <em className="font-display">Research</em> (academic-track
              partnerships and grant-funded proofs),{' '}
              <em className="font-display">Pilot</em> (production-adjacent, scoped
              budget, sponsor named) and{' '}
              <em className="font-display">Production</em> (recurring spend
              integrated into the customer's planning stack).
            </p>
            <p>
              We update the registry as deals expand, contract or move between
              statuses — and we remove names when a program is wound down. The
              point of the page is not to sell the sector. It is to give the
              reader a working answer to the question "is anyone actually using
              this stuff?" — and to make the answer specific.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="grid grid-cols-2 gap-px bg-border rounded-md overflow-hidden">
            <Kpi label="Deployments" value={String(total)} tone="data" />
            <Kpi label="Production-grade" value={String(productionCount)} />
            <Kpi label="Vendors involved" value={String(vendors)} />
            <Kpi
              label="Oldest"
              value={`${oldest.since}`}
              tone="quantum"
            />
          </div>
          <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.06em] text-text-muted leading-relaxed">
            {oldest.customer} on {oldest.vendor} — the registry's continuity
            anchor.
          </p>
        </aside>
      </section>

      {/* ─────────── Filter rail ─────────── */}
      <section className="mt-14 grid gap-4">
        <FilterRow label="Sector" current={sectorFilter} param="sector">
          <Chip
            href="/today"
            active={sectorFilter === 'all' && statusFilter === 'all'}
          >
            All
          </Chip>
          {SECTORS.map((s) => (
            <Chip
              key={s}
              href={chipHref({ sector: s, status: statusFilter })}
              active={sectorFilter === s}
            >
              {s}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Status" current={statusFilter} param="status">
          <Chip
            href={chipHref({ sector: sectorFilter, status: 'all' })}
            active={statusFilter === 'all'}
          >
            All
          </Chip>
          {(['Production', 'Pilot', 'Research'] as Status[]).map((s) => (
            <Chip
              key={s}
              href={chipHref({ sector: sectorFilter, status: s })}
              active={statusFilter === s}
            >
              {s}
            </Chip>
          ))}
        </FilterRow>
      </section>

      {/* ─────────── Sector sections ─────────── */}
      {SECTORS.filter((s) => grouped[s] && grouped[s].length > 0).map((s) => (
        <section key={s} className="mt-16">
          <SectionHead
            eyebrow={`${s} · ${grouped[s].length} ${grouped[s].length === 1 ? 'deployment' : 'deployments'}`}
            title={sectorTitle(s).title}
            accentWord={sectorTitle(s).accent}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-md overflow-hidden">
            {grouped[s].map((d, i) => (
              <DeploymentCard key={`${s}-${d.customer}`} d={d} index={i + 1} />
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <section className="mt-16 py-16 text-center font-display italic text-text-muted">
          No deployments match that filter. Try widening sector or status.
        </section>
      )}

      {/* ─────────── Foot / methodology ─────────── */}
      <section className="mt-16 pt-10 border-t border-border grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 items-start">
        <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
          <p className="font-display italic text-[20px] leading-snug tracking-tight text-text-primary">
            We do not list every academic co-author or workshop attendee. The
            registry only catalogs contracts a buying side has elected to{' '}
            <span className="text-accent-data not-italic font-medium">renew</span>.
          </p>
          <p className="mt-3 font-display italic text-sm text-text-muted">
            — deployment-registry methodology
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
                The cohort directory ›
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
                href="/learn"
                className="text-accent-data hover:underline"
              >
                Primer: how to read quantum ›
              </Link>
            </li>
            <li>
              <Link
                href="/future"
                className="text-accent-data hover:underline"
              >
                Where the revenue is going ›
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────── helpers ────────────────────────────── */

function chipHref(state: { sector: string; status: string }) {
  const p = new URLSearchParams();
  if (state.sector !== 'all') p.set('sector', state.sector);
  if (state.status !== 'all') p.set('status', state.status);
  const q = p.toString();
  return q ? `/today?${q}` : '/today';
}

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
    <div className="bg-bg-surface p-4">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono">
        {label}
      </p>
      <p
        className={
          'mt-1.5 font-display tabular-nums text-[26px] leading-none tracking-tight ' +
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

function FilterRow({
  label,
  children,
}: {
  label: string;
  current: string;
  param: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
      <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-text-muted w-[64px]">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
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

function DeploymentCard({ d, index }: { d: Deployment; index: number }) {
  return (
    <article className="bg-bg-surface p-5 lg:p-6 relative">
      <header className="grid grid-cols-[40px_minmax(0,1fr)_auto] gap-4 items-start mb-3">
        <span className="font-display tabular-nums text-[34px] leading-none text-text-muted">
          {String(index).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-[22px] tracking-tight leading-tight text-text-primary">
            {d.customer}
          </h3>
          <p className="text-[11px] text-text-muted font-mono tracking-wider mt-1 uppercase">
            via {d.vendor}
          </p>
        </div>
        <span
          className={
            'text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1 rounded-full border whitespace-nowrap ' +
            STATUS_COLOR[d.status]
          }
        >
          {d.status}
        </span>
      </header>
      <p className="text-[14px] text-text-secondary leading-[1.55] mt-4 pl-[56px]">
        {d.workload}
      </p>
      <div className="mt-4 pl-[56px] flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[10px] font-mono uppercase tracking-[0.08em] text-text-muted">
        <span>
          <span className="text-text-muted/70">Since</span>{' '}
          <span className="text-text-primary tabular-nums">{d.since}</span>
        </span>
        {d.region && (
          <>
            <span className="text-text-muted/60">·</span>
            <span>{d.region}</span>
          </>
        )}
      </div>
    </article>
  );
}

function sectorTitle(s: string): { title: string; accent: string } {
  // Italic accent word per sector — same trick as /companies headings.
  switch (s) {
    case 'Finance':
      return { title: 'The', accent: 'banks' };
    case 'Pharma & Life Sciences':
      return { title: 'Drug discovery', accent: 'pilots' };
    case 'Automotive':
      return { title: 'On the', accent: 'assembly line' };
    case 'Aerospace & Defense':
      return { title: 'Aerospace &', accent: 'defense' };
    case 'Energy':
      return { title: 'Catalyst &', accent: 'subsurface' };
    case 'Government & Research':
      return { title: 'Sovereign', accent: 'buyers' };
    default:
      return { title: s, accent: 'sector' };
  }
}
