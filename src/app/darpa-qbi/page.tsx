import Link from 'next/link';
import { getCompany } from '@/lib/data/companies';
import { formatUsd } from '@/lib/utils';

export const metadata = {
  title: 'DARPA QBI Tracker · The Most Credible Independent Quantum Benchmark',
  description: 'Live tracker for DARPA Quantum Benchmarking Initiative Stage B. Eleven companies advanced November 2025; PsiQuantum and Microsoft in parallel US2QC track. Stage C decisions expected Q4 2026.',
};

interface QbiCompany {
  slug: string;
  name: string;
  modality: string;
  status: 'Stage B' | 'US2QC Final';
  benchmark: string;
  recent: string;
  concerns: string;
  stageCOdds: 'High' | 'Above-average' | 'Plausible' | 'Moderate' | 'Lower-middle' | 'Binary' | 'Highly uncertain';
  fundingDisclosed?: string;
}

const STAGE_B: QbiCompany[] = [
  {
    slug: 'ibm',
    name: 'IBM',
    modality: 'Superconducting (modular)',
    status: 'Stage B',
    benchmark: 'Modularity at scale + realism of the 2029 fault-tolerance roadmap',
    recent: 'Gambetta framed Stage B advancement as "firm validation"; most detailed public roadmap in the industry',
    concerns: 'Least dependent on DARPA capital — Stage B is reputational, not financial. 2029 FTQC date leaves thin margin for modular interconnect losses.',
    stageCOdds: 'High',
  },
  {
    slug: 'quantinuum',
    name: 'Quantinuum',
    modality: 'Trapped Ion (QCCD)',
    status: 'Stage B',
    benchmark: 'Validate Lumos utility-scale design + Apollo 2029 FTQC milestone',
    recent: 'Helios deployed Nov 2025 with record physical and logical fidelities; high-Tc materials simulations',
    concerns: 'QCCD ion-shuttling speed is a known scaling bottleneck; Apollo 2029 aggressive given current zone counts',
    stageCOdds: 'High',
  },
  {
    slug: 'quera',
    name: 'QuEra Computing',
    modality: 'Neutral Atom (Rydberg)',
    status: 'Stage B',
    benchmark: 'Multi-thousand-atom continuous operation + algorithmic fault tolerance',
    recent: 'Algorithmic FT breakthrough; below-threshold 4-round circuits (2.14× below threshold) with Harvard',
    concerns: 'Atom loading rates and reconfiguration speed at multi-thousand scale; commercial revenue still nascent vs IonQ/Quantinuum',
    stageCOdds: 'High',
    fundingDisclosed: 'Up to $15M',
  },
  {
    slug: 'atom-computing',
    name: 'Atom Computing',
    modality: 'Neutral Atom (Yb)',
    status: 'Stage B',
    benchmark: 'Scaling from ~1,000 phys / ~50 logical to >10,000 phys / >100 logical',
    recent: 'Jan 2025 on-premise Microsoft system delivered 24 logical qubits; NVIDIA NVQLink integration',
    concerns: 'Reliance on Microsoft\'s logical-qubit stack creates correlated exposure to Majorana strategy; mid-circuit measurement / atom-loss replenishment unproven at scale',
    stageCOdds: 'Above-average',
  },
  {
    slug: 'ionq',
    name: 'IonQ',
    modality: 'Trapped Ion (chip-based + photonic)',
    status: 'Stage B',
    benchmark: 'Path to 2M physical / 80K logical qubits by 2030',
    recent: '99.99% 2Q fidelity (world record); AQ 64 milestone on Tempo three months early; $130M FY25 revenue',
    concerns: 'The 2M-qubit / 2030 number is the most aggressive in the cohort. Narrative-to-engineering gap is the widest.',
    stageCOdds: 'Moderate',
  },
  {
    slug: 'xanadu',
    name: 'Xanadu',
    modality: 'Photonic (GKP)',
    status: 'Stage B',
    benchmark: 'GKP fidelity, loss budget, Aurora-to-FTQC scaling plan',
    recent: 'Aurora end-to-end (12Q across 35 chips, 13km fiber); 60% optical-loss reduction in 2025; HyperLight TFLN partnership',
    concerns: 'Loss-per-component is the dominant blocker. 2029 FTQC commitment is aggressive even for photonics.',
    stageCOdds: 'Moderate',
    fundingDisclosed: 'Up to $15M',
  },
  {
    slug: 'photonic-inc',
    name: 'Photonic Inc.',
    modality: 'Silicon T-centre spin-photon',
    status: 'Stage B',
    benchmark: 'Remote entanglement fidelity between T-centre modules for distributed surface codes',
    recent: 'Three-qubit register on silicon photonic chip (Nature Nano Jan 2026); $200M+ round at $2-2.7B valuation',
    concerns: 'T-centre emission yields and remote-entanglement rates are the dominant scaling questions',
    stageCOdds: 'Moderate',
  },
  {
    slug: 'diraq',
    name: 'Diraq',
    modality: 'Silicon CMOS spin',
    status: 'Stage B',
    benchmark: 'Foundry-fabricated devices clearing >99% 2Q fidelity consistently across many devices',
    recent: 'Cryogenic electronics integrated with qubits (Jun 2025); foundry-fab spin qubits >99% fidelity (Sep 2025 Nature)',
    concerns: 'Longest-duration roadmap in the cohort — qubit count today is tens, proof point is industrial repeatability',
    stageCOdds: 'Plausible',
  },
  {
    slug: 'quantum-motion',
    name: 'Quantum Motion',
    modality: 'Silicon MOS spin',
    status: 'Stage B',
    benchmark: 'Tile repeatability and yield on foundry process',
    recent: 'Sep 2025 delivered industry-first full-stack silicon-CMOS quantum computer to UK NQCC; $160M Series C closing May 2026',
    concerns: 'Same long-cycle risk as Diraq; current qubit count is small',
    stageCOdds: 'Plausible',
  },
  {
    slug: 'silicon-quantum-computing',
    name: 'Silicon Quantum Computing',
    modality: 'Precision atom donor',
    status: 'Stage B',
    benchmark: 'Demonstrating precision-placement scaling without degrading per-qubit fidelity',
    recent: 'Dec 2025 study showed silicon-based processor scales without fidelity loss; record-setting processor announced early 2026',
    concerns: 'Most boutique manufacturing — STM atom placement not yet a foundry process; near-term qubit counts very small',
    stageCOdds: 'Lower-middle',
  },
  {
    slug: 'nord-quantique',
    name: 'Nord Quantique',
    modality: 'Multi-mode bosonic',
    status: 'Stage B',
    benchmark: 'Bosonic redundancy genuinely substituting for surface-code overhead at scale',
    recent: 'Continued bosonic error-correction results through 2025; expanded Sherbrooke facility',
    concerns: 'The 1:1 ratio claim is the most aggressive theoretical claim in the cohort. IV&V will scrutinize hidden overhead.',
    stageCOdds: 'Binary',
    fundingDisclosed: '$5M initial + up to $15M total',
  },
];

const US2QC: QbiCompany[] = [
  {
    slug: 'psiquantum',
    name: 'PsiQuantum',
    modality: 'Silicon Photonics (Omega chipset)',
    status: 'US2QC Final',
    benchmark: 'Build a real million-qubit-scale fault-tolerant utility computer',
    recent: '$1B Series E (Sep 2025); Omega manufacturable chipset; broke ground at IQMP',
    concerns: 'Capital intensity vs timeline; component-loss budgets at million-qubit scale remain the central physics question',
    stageCOdds: 'High',
  },
  {
    slug: 'microsoft',
    name: 'Microsoft',
    modality: 'Topological (Majorana 1)',
    status: 'US2QC Final',
    benchmark: 'Demonstrating actual topological qubit operation at system scale',
    recent: 'Feb 2025 Majorana 1 announcement (8 topological qubits) — peer reviewers and Nature editorial team publicly disputed claim',
    concerns: '2018 underlying Nature paper retracted. Microsoft\'s parallel Atom Computing partnership functions as effective hedge. IV&V is the most rigorous test the topological claim will face.',
    stageCOdds: 'Highly uncertain',
  },
];

const ODDS_COLOR: Record<QbiCompany['stageCOdds'], string> = {
  'High': 'bg-accent-data/15 text-accent-data',
  'Above-average': 'bg-accent-data/10 text-accent-data',
  'Plausible': 'bg-accent-warn/10 text-accent-warn',
  'Moderate': 'bg-accent-warn/10 text-accent-warn',
  'Binary': 'bg-accent-quantum/15 text-accent-quantum',
  'Lower-middle': 'bg-accent-down/10 text-accent-down',
  'Highly uncertain': 'bg-accent-down/15 text-accent-down',
};

export const revalidate = 86400;

export default function DarpaQbiPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow mb-2">Government Tracker</p>
        <h1 className="font-display text-display-2 font-medium tracking-tight">DARPA QBI · Stage B</h1>
        <p className="mt-4 text-text-secondary leading-relaxed">
          DARPA&apos;s Quantum Benchmarking Initiative is the only program in which a sovereign technical buyer
          with no equity exposure spends a year auditing each performer&apos;s R&amp;D plan, risk register, and
          prototype burn-down against a single, unambiguous test: <em>can this approach deliver an industrially
          useful quantum computer by 2033?</em>
        </p>
        <p className="mt-3 text-text-secondary leading-relaxed">
          On November 6, 2025, DARPA announced that <span className="font-mono text-accent-quantum">11 of 18</span>{' '}
          Stage A performers advanced to <strong>Stage B</strong>, a 12-month engineering audit with funding up
          to $15M per team. In parallel, PsiQuantum and Microsoft continue in the related <strong>US2QC</strong>{' '}
          final phase. Stage C advancement decisions expected Q4 2026 — the single most important catalyst for
          the sector this year.
        </p>
      </header>

      <section className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
        <Kpi label="Stage B advancers" value="11" />
        <Kpi label="US2QC final phase" value="2" />
        <Kpi label="Stage B ceiling / team" value={formatUsd(15e6)} />
        <Kpi label="Stage C decisions" value="Q4 2026" />
      </section>

      <section className="mb-12">
        <h2 className="font-display text-2xl tracking-tight mb-4">Why this matters for capital markets</h2>
        <div className="space-y-3 text-text-secondary leading-relaxed text-sm max-w-3xl">
          <p>
            QBI is the first quantum benchmark with no commercial conflict of interest — DARPA isn&apos;t selling
            qubits or raising venture capital. Public-market quantum names referenced QBI advancement in Q4
            2025 / Q1 2026 investor communications.
          </p>
          <p>
            Stage B selection has become an unofficial <em>Series-D-equivalent due-diligence stamp</em>: a single
            credible signal that DARPA&apos;s technical team judged a company&apos;s roadmap plausible. The next
            gate — Stage C in late 2026 — will cut further. The list of who is <em>not</em> on this roster
            (Google, Rigetti, HPE were Stage A participants and were not announced in the initial Stage B cohort)
            is just as load-bearing as the list of who is.
          </p>
        </div>
      </section>

      {/* Stage B grid */}
      <section className="mb-14">
        <h2 className="font-display text-2xl tracking-tight mb-4">Stage B performers · 11 of 18 advanced</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STAGE_B.map((q) => (
            <QbiCard key={q.slug} q={q} />
          ))}
        </div>
      </section>

      {/* US2QC */}
      <section className="mb-14">
        <h2 className="font-display text-2xl tracking-tight mb-4">US2QC · Final phase (Stage C-equivalent)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {US2QC.map((q) => (
            <QbiCard key={q.slug} q={q} />
          ))}
        </div>
      </section>

      {/* Eliminations & acquisitions — the differential signal */}
      <section className="mb-14">
        <h2 className="font-display text-2xl tracking-tight mb-4">Stage A only · the differential signal</h2>
        <p className="text-text-secondary leading-relaxed text-sm max-w-3xl mb-5">
          The most decision-relevant section of the tracker. Six Stage A names did not appear on
          the November 2025 Stage B roster. Two of those were absorbed into Stage B advancers in
          the months around the announcement — the cleanest M&amp;A signal QBI has produced.
          DARPA has stated the program is not a winnowing competition; companies may be added in
          future rounds, but the Stage B cut still functions as the first real differential signal.
        </p>

        <h3 className="font-display text-lg tracking-tight mb-3">Eliminated · stand-alone</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <EliminationCard
            name="Rigetti Computing"
            ticker="RGTI"
            modality="Superconducting"
            note="Public pure-play, Stage A only. Cleanest negative differential signal in the program. No 8-K tying stock-price guidance to QBI non-advancement has been identified."
          />
          <EliminationCard
            name="Alice & Bob"
            modality="Cat qubit (bias-noise)"
            note="Stage A only. Did not advance despite Nord Quantique (also bosonic) making the Stage B cut."
          />
          <EliminationCard
            name="Hewlett Packard Enterprise"
            ticker="HPE"
            modality="Superconducting / hybrid HPC"
            note="Stage A only. Immaterial to HPE's enterprise mix."
          />
        </div>

        <h3 className="font-display text-lg tracking-tight mb-3">Acquired into a Stage B participant</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <EliminationCard
            name="Atlantic Quantum"
            modality="Fluxonium superconducting"
            note="Acquired by Google Quantum AI (October 2025). Team folded into Google's QBI participation."
          />
          <EliminationCard
            name="Oxford Ionics"
            modality="Trapped ion"
            note="Acquired by IonQ (~September 2025, ~$1.075B). Team folded into IonQ's QBI line."
          />
        </div>

        <h3 className="font-display text-lg tracking-tight mb-3">Joined Stage A late · Stage B status unclear</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <EliminationCard
            name="Google Quantum AI"
            ticker="GOOGL"
            modality="Superconducting"
            note="Added to Stage A in September 2025 — too late for the November Stage B cut. Acquired Atlantic Quantum a month later. May be considered in a future Stage B round."
          />
        </div>
      </section>

      {/* 2026 program updates */}
      <section className="mb-14">
        <h2 className="font-display text-2xl tracking-tight mb-4">2026 program updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-5">
            <p className="eyebrow mb-2">Leadership transition</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Micah Stoutimore</strong> replaced founding program manager
              Joe Altepeter in early 2026, driven by DARPA&apos;s mandatory PM tenure limits.
              No change in stated technical criteria.
            </p>
          </div>
          <div className="card p-5">
            <p className="eyebrow mb-2">New QBIT Stage A solicitation</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">DARPA-PA-26-02-02</strong>, opened March 9, 2026. Open
              only to organizations that have not previously received QBI funding. Abstract deadline
              July 31, 2026. Signals widening aperture rather than narrowing.
            </p>
          </div>
          <div className="card p-5">
            <p className="eyebrow mb-2">DARPA directional shift</p>
            <p className="text-sm text-text-secondary leading-relaxed italic border-l-2 border-accent-quantum/40 pl-3">
              &quot;It now seems likely that someone will build a utility-scale quantum computer
              by 2033, but it remains unclear exactly which team or teams might get across that
              finish line.&quot;
            </p>
            <p className="text-[10px] font-mono text-text-muted mt-2">— DARPA, March 2026</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl tracking-tight mb-4">Timeline · Stage B → Stage C → 2033</h2>
        <ol className="relative border-l-2 border-border ml-3 space-y-5">
          <Step date="Feb 2023" label="DARPA announces US2QC collaborations with Atom Computing, Microsoft, PsiQuantum" status="past" />
          <Step date="Jul 2024" label="QBI program launched as successor / expansion to original Quantum Benchmarking program" status="past" />
          <Step date="Feb 2025" label="Microsoft + PsiQuantum advance to US2QC Validation & Co-Design (Stage C equivalent)" status="past" />
          <Step date="Apr 2025" label="Stage A announced (~18 performers, up to ~$1M each)" status="past" />
          <Step date="Sep 2025" label="Google Quantum AI added to Stage A; IonQ acquires Oxford Ionics (~$1.075B)" status="past" />
          <Step date="Oct 2025" label="Google acquires Atlantic Quantum team" status="past" />
          <Step date="Nov 6 2025" label="Stage B — 11 advance, up to $15M / team" status="past" />
          <Step date="Early 2026" label="Stoutimore replaces Altepeter as QBI program manager" status="past" />
          <Step date="Mar 2026" label="New QBIT Stage A solicitation (DARPA-PA-26-02-02) opens for organizations not previously funded" status="past" />
          <Step date="Q3 2026" label="Stage B mid-term reviews" status="next" />
          <Step date="Q4 2026" label="Stage C advancement decisions" status="upcoming" />
          <Step date="2027–2029" label="Stage C — Build, Verify, Validate (independent IV&V)" status="upcoming" />
          <Step date="2033" label="Utility-scale verification deadline" status="upcoming" />
        </ol>
      </section>

      <section className="mt-12">
        <p className="eyebrow mb-3">Primary sources</p>
        <ul className="space-y-1.5 text-sm">
          <li>
            <a href="https://www.darpa.mil/research/programs/quantum-benchmarking-initiative" target="_blank" rel="noreferrer" className="text-accent-quantum hover:underline">DARPA QBI program page ↗</a>
          </li>
          <li>
            <a href="https://www.darpa.mil/research/programs/quantum-benchmarking-initiative/stage-b-selection" target="_blank" rel="noreferrer" className="text-accent-quantum hover:underline">DARPA Stage B selection (Nov 2025) ↗</a>
          </li>
          <li>
            <a href="https://www.darpa.mil/news/2026/qbi-stage-a-qbit" target="_blank" rel="noreferrer" className="text-accent-quantum hover:underline">DARPA: QBI expands quest (Mar 2026) ↗</a>
          </li>
          <li>
            <a href="https://www.darpa.mil/news/2025/quantum-computing-approaches" target="_blank" rel="noreferrer" className="text-accent-quantum hover:underline">DARPA: Two utility-scale approaches (Feb 2025) ↗</a>
          </li>
        </ul>
        <p className="text-xs text-text-muted mt-5 max-w-3xl">
          For full sector context, see <Link href="/companies" className="text-accent-quantum hover:underline">/companies</Link>,{' '}
          <Link href="/qnt-ipo-watch" className="text-accent-quantum hover:underline">/qnt-ipo-watch</Link>, and{' '}
          <Link href="/roadmaps" className="text-accent-quantum hover:underline">/roadmaps</Link>.
        </p>
      </section>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-surface p-4">
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">{label}</p>
      <p className="mt-1 font-mono text-xl text-text-primary">{value}</p>
    </div>
  );
}

function QbiCard({ q }: { q: QbiCompany }) {
  const c = getCompany(q.slug);
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="font-sans text-text-primary font-medium leading-snug">
            <Link href={c ? `/companies/${c.slug}` : '#'} className="hover:text-accent-quantum">
              {q.name}
            </Link>
          </h3>
          <p className="text-xs text-text-muted font-mono mt-0.5">{q.modality}</p>
        </div>
        <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-sm whitespace-nowrap ${ODDS_COLOR[q.stageCOdds]}`}>
          {q.stageCOdds}
        </span>
      </div>
      <dl className="mt-3 space-y-2 text-sm">
        <Field label="Benchmark" value={q.benchmark} />
        <Field label="Recent" value={q.recent} />
        <Field label="Concerns" value={q.concerns} />
        {q.fundingDisclosed && <Field label="Funding" value={q.fundingDisclosed} mono />}
      </dl>
    </div>
  );
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="text-xs">
      <span className="text-text-muted uppercase tracking-wider font-mono">{label}: </span>
      <span className={mono ? 'font-mono text-text-primary' : 'text-text-secondary leading-relaxed'}>
        {value}
      </span>
    </div>
  );
}

function EliminationCard({ name, ticker, modality, note }: { name: string; ticker?: string; modality: string; note: string }) {
  return (
    <article className="card p-4">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-display text-base leading-tight text-text-primary">{name}</h3>
        {ticker && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted whitespace-nowrap">
            {ticker}
          </span>
        )}
      </div>
      <p className="text-[10px] font-mono text-text-muted mb-2">{modality}</p>
      <p className="text-xs text-text-secondary leading-relaxed">{note}</p>
    </article>
  );
}

function Step({ date, label, status }: { date: string; label: string; status: 'past' | 'next' | 'upcoming' }) {
  return (
    <li className="ml-6">
      <span
        className={`absolute -left-[10px] mt-1 w-4 h-4 rounded-full border-2 border-bg ${
          status === 'next'
            ? 'bg-accent-quantum animate-pulse-dot'
            : status === 'past'
              ? 'bg-text-muted'
              : 'bg-bg-elevated'
        }`}
      />
      <span className="font-mono text-xs text-text-muted">{date}</span>
      <p className={`mt-0.5 ${status === 'upcoming' ? 'text-text-muted' : 'text-text-primary'}`}>{label}</p>
    </li>
  );
}
