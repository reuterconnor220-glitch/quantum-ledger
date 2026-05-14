// Ported /darpa-qbi page — design vocabulary applied.
// DROP-IN replacement for src/app/darpa-qbi/page.tsx
//
// Preserved exactly from the original:
//   - All data constants (STAGE_B, US2QC, ODDS_COLOR)
//   - getCompany import + Link wiring per QBI card
//   - formatUsd import
//   - revalidate = 86400 export
//   - metadata block (verbatim)
//
// Visual layer rewritten with the Quantum Ledger design vocabulary:
//   - Masthead crest (Vol III · DARPA QBI Tracker · dateline + attribution)
//   - Wordmark: "DARPA Quantum Benchmarking Initiative" with italic accent on "Benchmarking"
//   - Italic positioning subtitle, separated by hairline rule
//   - Italic-thesis pull quote with border-l-2 border-accent-data/40
//   - Eyebrow + big italic-serif section heads with border-b border-text-primary/90
//   - KPIs as big font-display tabular-nums
//   - Ranked cohort cards with serif drop figures (01..11) and signal-dot odds chip
//   - Timeline as a vertical phase rail with annotated future + past states

import Link from 'next/link';
import { getCompany } from '@/lib/data/companies';
import { formatUsd } from '@/lib/utils';

export const metadata = {
  title: 'DARPA QBI Tracker · The Most Credible Independent Quantum Benchmark',
  description:
    'Live tracker for DARPA Quantum Benchmarking Initiative Stage B. Eleven companies advanced November 2025; PsiQuantum and Microsoft in parallel US2QC track. Stage C decisions expected Q4 2026.',
};

interface QbiCompany {
  slug: string;
  name: string;
  modality: string;
  status: 'Stage B' | 'US2QC Final';
  benchmark: string;
  recent: string;
  concerns: string;
  stageCOdds:
    | 'High'
    | 'Above-average'
    | 'Plausible'
    | 'Moderate'
    | 'Lower-middle'
    | 'Binary'
    | 'Highly uncertain';
  fundingDisclosed?: string;
}

const STAGE_B: QbiCompany[] = [
  {
    slug: 'ibm',
    name: 'IBM',
    modality: 'Superconducting (modular)',
    status: 'Stage B',
    benchmark: 'Modularity at scale + realism of the 2029 fault-tolerance roadmap',
    recent:
      'Gambetta framed Stage B advancement as "firm validation"; most detailed public roadmap in the industry',
    concerns:
      'Least dependent on DARPA capital — Stage B is reputational, not financial. 2029 FTQC date leaves thin margin for modular interconnect losses.',
    stageCOdds: 'High',
  },
  {
    slug: 'quantinuum',
    name: 'Quantinuum',
    modality: 'Trapped Ion (QCCD)',
    status: 'Stage B',
    benchmark: 'Validate Lumos utility-scale design + Apollo 2029 FTQC milestone',
    recent:
      'Helios deployed Nov 2025 with record physical and logical fidelities; high-Tc materials simulations',
    concerns:
      'QCCD ion-shuttling speed is a known scaling bottleneck; Apollo 2029 aggressive given current zone counts',
    stageCOdds: 'High',
  },
  {
    slug: 'quera',
    name: 'QuEra Computing',
    modality: 'Neutral Atom (Rydberg)',
    status: 'Stage B',
    benchmark: 'Multi-thousand-atom continuous operation + algorithmic fault tolerance',
    recent:
      'Algorithmic FT breakthrough; below-threshold 4-round circuits (2.14× below threshold) with Harvard',
    concerns:
      'Atom loading rates and reconfiguration speed at multi-thousand scale; commercial revenue still nascent vs IonQ/Quantinuum',
    stageCOdds: 'High',
    fundingDisclosed: 'Up to $15M',
  },
  {
    slug: 'atom-computing',
    name: 'Atom Computing',
    modality: 'Neutral Atom (Yb)',
    status: 'Stage B',
    benchmark: 'Scaling from ~1,000 phys / ~50 logical to >10,000 phys / >100 logical',
    recent:
      'Jan 2025 on-premise Microsoft system delivered 24 logical qubits; NVIDIA NVQLink integration',
    concerns:
      "Reliance on Microsoft's logical-qubit stack creates correlated exposure to Majorana strategy; mid-circuit measurement / atom-loss replenishment unproven at scale",
    stageCOdds: 'Above-average',
  },
  {
    slug: 'ionq',
    name: 'IonQ',
    modality: 'Trapped Ion (chip-based + photonic)',
    status: 'Stage B',
    benchmark: 'Path to 2M physical / 80K logical qubits by 2030',
    recent:
      '99.99% 2Q fidelity (world record); AQ 64 milestone on Tempo three months early; $130M FY25 revenue',
    concerns:
      'The 2M-qubit / 2030 number is the most aggressive in the cohort. Narrative-to-engineering gap is the widest.',
    stageCOdds: 'Moderate',
  },
  {
    slug: 'xanadu',
    name: 'Xanadu',
    modality: 'Photonic (GKP)',
    status: 'Stage B',
    benchmark: 'GKP fidelity, loss budget, Aurora-to-FTQC scaling plan',
    recent:
      'Aurora end-to-end (12Q across 35 chips, 13km fiber); 60% optical-loss reduction in 2025; HyperLight TFLN partnership',
    concerns:
      'Loss-per-component is the dominant blocker. 2029 FTQC commitment is aggressive even for photonics.',
    stageCOdds: 'Moderate',
    fundingDisclosed: 'Up to $15M',
  },
  {
    slug: 'photonic-inc',
    name: 'Photonic Inc.',
    modality: 'Silicon T-centre spin-photon',
    status: 'Stage B',
    benchmark: 'Remote entanglement fidelity between T-centre modules for distributed surface codes',
    recent:
      'Three-qubit register on silicon photonic chip (Nature Nano Jan 2026); $200M+ round at $2-2.7B valuation',
    concerns: 'T-centre emission yields and remote-entanglement rates are the dominant scaling questions',
    stageCOdds: 'Moderate',
  },
  {
    slug: 'diraq',
    name: 'Diraq',
    modality: 'Silicon CMOS spin',
    status: 'Stage B',
    benchmark: 'Foundry-fabricated devices clearing >99% 2Q fidelity consistently across many devices',
    recent:
      'Cryogenic electronics integrated with qubits (Jun 2025); foundry-fab spin qubits >99% fidelity (Sep 2025 Nature)',
    concerns:
      'Longest-duration roadmap in the cohort — qubit count today is tens, proof point is industrial repeatability',
    stageCOdds: 'Plausible',
  },
  {
    slug: 'quantum-motion',
    name: 'Quantum Motion',
    modality: 'Silicon MOS spin',
    status: 'Stage B',
    benchmark: 'Tile repeatability and yield on foundry process',
    recent:
      'Sep 2025 delivered industry-first full-stack silicon-CMOS quantum computer to UK NQCC; $160M Series C closing May 2026',
    concerns: 'Same long-cycle risk as Diraq; current qubit count is small',
    stageCOdds: 'Plausible',
  },
  {
    slug: 'silicon-quantum-computing',
    name: 'Silicon Quantum Computing',
    modality: 'Precision atom donor',
    status: 'Stage B',
    benchmark: 'Demonstrating precision-placement scaling without degrading per-qubit fidelity',
    recent:
      'Dec 2025 study showed silicon-based processor scales without fidelity loss; record-setting processor announced early 2026',
    concerns:
      'Most boutique manufacturing — STM atom placement not yet a foundry process; near-term qubit counts very small',
    stageCOdds: 'Lower-middle',
  },
  {
    slug: 'nord-quantique',
    name: 'Nord Quantique',
    modality: 'Multi-mode bosonic',
    status: 'Stage B',
    benchmark: 'Bosonic redundancy genuinely substituting for surface-code overhead at scale',
    recent: 'Continued bosonic error-correction results through 2025; expanded Sherbrooke facility',
    concerns:
      'The 1:1 ratio claim is the most aggressive theoretical claim in the cohort. IV&V will scrutinize hidden overhead.',
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
    concerns:
      'Capital intensity vs timeline; component-loss budgets at million-qubit scale remain the central physics question',
    stageCOdds: 'High',
  },
  {
    slug: 'microsoft',
    name: 'Microsoft',
    modality: 'Topological (Majorana 1)',
    status: 'US2QC Final',
    benchmark: 'Demonstrating actual topological qubit operation at system scale',
    recent:
      'Feb 2025 Majorana 1 announcement (8 topological qubits) — peer reviewers and Nature editorial team publicly disputed claim',
    concerns:
      "2018 underlying Nature paper retracted. Microsoft's parallel Atom Computing partnership functions as effective hedge. IV&V is the most rigorous test the topological claim will face.",
    stageCOdds: 'Highly uncertain',
  },
];

const ODDS_COLOR: Record<QbiCompany['stageCOdds'], string> = {
  High: 'border-accent-data text-accent-data bg-accent-data/8',
  'Above-average': 'border-accent-data/70 text-accent-data bg-accent-data/5',
  Plausible: 'border-accent-warn/70 text-accent-warn bg-accent-warn/5',
  Moderate: 'border-accent-warn/70 text-accent-warn bg-accent-warn/5',
  Binary: 'border-accent-quantum/70 text-accent-quantum bg-accent-quantum/8',
  'Lower-middle': 'border-accent-down/70 text-accent-down bg-accent-down/5',
  'Highly uncertain': 'border-accent-down text-accent-down bg-accent-down/8',
};

export const revalidate = 86400;

export default function DarpaQbiPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      {/* ─────────── Masthead crest ─────────── */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">
              Government Tracker
            </span>
            <span className="text-text-muted/60">·</span>
            <span>DARPA QBI</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            Stage B advancers · Stage C decisions Q4 2026
          </div>
          <div className="text-right leading-relaxed">
            Boulder · Colorado
            <br />
            10 min read
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.94] tracking-[-0.025em] text-[clamp(40px,7vw,88px)] text-balance">
          DARPA Quantum <em className="not-italic font-normal text-accent-data italic">Benchmarking</em>{' '}
          Initiative
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[52ch]">
          The only program in which a sovereign technical buyer with no equity exposure spends a year
          auditing each performer's R&amp;D plan against a single, unambiguous test.
        </p>
      </header>

      {/* ─────────── Italic-thesis lede ─────────── */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
        <div>
          <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
            <p className="font-display italic text-[22px] leading-snug tracking-tight text-text-primary">
              Can this approach deliver an industrially useful quantum computer by{' '}
              <span className="text-accent-data not-italic font-medium">2033</span>?
            </p>
            <p className="mt-3 font-display italic text-sm text-text-muted">
              — the single question DARPA's Quantum Benchmarking Initiative is built around
            </p>
          </div>

          <div className="mt-7 space-y-4 text-text-secondary leading-[1.65] text-[15px] max-w-[64ch]">
            <p>
              On November 6, 2025, DARPA announced that{' '}
              <span className="font-mono text-accent-data">11 of 18</span> Stage A performers advanced to{' '}
              <strong className="text-text-primary">Stage B</strong> — a 12-month engineering audit with
              funding up to <span className="font-mono text-text-primary">$15M</span> per team. In parallel,{' '}
              <strong className="text-text-primary">PsiQuantum</strong> and{' '}
              <strong className="text-text-primary">Microsoft</strong> continue in the related US2QC final
              phase.
            </p>
            <p>
              Stage B selection has become an unofficial{' '}
              <em className="font-display">Series-D-equivalent due-diligence stamp</em>: a single credible
              signal that DARPA's technical team judged a company's roadmap plausible. The list of who is{' '}
              <em className="font-display">not</em> on this roster — Google, Rigetti, HPE were Stage A
              participants and did not advance — is just as load-bearing as the list of who is. Stage C
              advancement decisions, expected Q4 2026, are the single most important catalyst for the sector
              this year.
            </p>
          </div>
        </div>

        {/* KPI tiles — right rail */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="grid grid-cols-2 gap-px bg-border rounded-md overflow-hidden">
            <Kpi label="Stage B advancers" value="11" tone="data" />
            <Kpi label="US2QC final" value="2" tone="data" />
            <Kpi label="Ceiling / team" value={formatUsd(15e6)} />
            <Kpi label="Stage C decisions" value="Q4 '26" tone="warn" />
          </div>
          <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.06em] text-text-muted leading-relaxed">
            DARPA spends a year auditing each performer's R&amp;D plan against IV&amp;V — independent
            verification &amp; validation.
          </p>
        </aside>
      </section>

      {/* ─────────── Stage B cohort ─────────── */}
      <section className="mt-16">
        <SectionHead
          eyebrow="The cohort · 11 of 18 advanced"
          title="Stage B"
          accentWord="performers"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border rounded-md overflow-hidden">
          {STAGE_B.map((q, i) => (
            <QbiCard key={q.slug} q={q} index={i + 1} />
          ))}
        </div>
      </section>

      {/* ─────────── US2QC ─────────── */}
      <section className="mt-16">
        <SectionHead
          eyebrow="The final phase · Stage C-equivalent"
          title="US2QC"
          accentWord="track"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border rounded-md overflow-hidden">
          {US2QC.map((q, i) => (
            <QbiCard key={q.slug} q={q} index={STAGE_B.length + i + 1} />
          ))}
        </div>
      </section>

      {/* ─────────── Stage A only / differential signal ─────────── */}
      <section className="mt-16">
        <SectionHead
          eyebrow="The differential signal"
          title="Stage A"
          accentWord="only"
        />
        <p className="text-text-secondary leading-[1.65] text-[15px] max-w-[68ch] mb-7">
          The most decision-relevant section of the tracker. Six Stage A names did not appear on the November
          2025 Stage B roster. Two were absorbed into Stage B advancers in the months around the announcement
          — the cleanest M&amp;A signal QBI has produced. DARPA has stated the program is not a winnowing
          competition; companies may be added in future rounds, but the Stage B cut still functions as the
          first real differential signal.
        </p>

        <h3 className="eyebrow mt-7 mb-3">Eliminated · stand-alone</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-md overflow-hidden mb-7">
          <EliminationCard
            name="Rigetti Computing"
            ticker="RGTI"
            modality="Superconducting"
            note="Public pure-play, Stage A only. Cleanest negative differential signal in the program. No 8-K tying stock-price guidance to QBI non-advancement has been identified."
            tone="down"
          />
          <EliminationCard
            name="Alice & Bob"
            modality="Cat qubit (bias-noise)"
            note="Stage A only. Did not advance despite Nord Quantique (also bosonic) making the Stage B cut."
            tone="down"
          />
          <EliminationCard
            name="Hewlett Packard Enterprise"
            ticker="HPE"
            modality="Superconducting / hybrid HPC"
            note="Stage A only. Immaterial to HPE's enterprise mix."
            tone="down"
          />
        </div>

        <h3 className="eyebrow mt-7 mb-3">Acquired into a Stage B participant</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-md overflow-hidden mb-7">
          <EliminationCard
            name="Atlantic Quantum"
            modality="Fluxonium superconducting"
            note="Acquired by Google Quantum AI (October 2025). Team folded into Google's QBI participation."
            tone="quantum"
          />
          <EliminationCard
            name="Oxford Ionics"
            modality="Trapped ion"
            note="Acquired by IonQ (~September 2025, ~$1.075B). Team folded into IonQ's QBI line."
            tone="quantum"
          />
        </div>

        <h3 className="eyebrow mt-7 mb-3">Joined Stage A late · Stage B status unclear</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
          <EliminationCard
            name="Google Quantum AI"
            ticker="GOOGL"
            modality="Superconducting"
            note="Added to Stage A in September 2025 — too late for the November Stage B cut. Acquired Atlantic Quantum a month later. May be considered in a future Stage B round."
            tone="warn"
          />
        </div>
      </section>

      {/* ─────────── 2026 program updates ─────────── */}
      <section className="mt-16">
        <SectionHead
          eyebrow="What changed this year"
          title="2026 program"
          accentWord="updates"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
          <UpdateCard label="Leadership transition">
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Micah Stoutimore</strong> replaced founding program
              manager Joe Altepeter in early 2026, driven by DARPA's mandatory PM tenure limits. No change in
              stated technical criteria.
            </p>
          </UpdateCard>
          <UpdateCard label="New Stage A solicitation">
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">DARPA-PA-26-02-02</strong>, opened March 9, 2026. Open
              only to organizations that have not previously received QBI funding. Abstract deadline July 31,
              2026. Signals widening aperture rather than narrowing.
            </p>
          </UpdateCard>
          <UpdateCard label="Directional shift">
            <p className="font-display italic text-[15px] leading-snug text-text-primary border-l-2 border-accent-data/40 pl-3">
              "It now seems likely that someone will build a utility-scale quantum computer by 2033, but it
              remains unclear exactly which team or teams might get across that finish line."
            </p>
            <p className="text-[10px] font-mono text-text-muted mt-2 tracking-wider">— DARPA, March 2026</p>
          </UpdateCard>
        </div>
      </section>

      {/* ─────────── Timeline ─────────── */}
      <section className="mt-16">
        <SectionHead
          eyebrow="The rail · past · next · 2033"
          title="Stage B → Stage C →"
          accentWord="2033"
        />
        <ol className="relative pl-8 space-y-5 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-px before:bg-border">
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

      {/* ─────────── Sources / related ─────────── */}
      <section className="mt-16 pt-10 border-t border-border">
        <p className="eyebrow mb-4">Primary sources</p>
        <ul className="grid gap-1.5 text-sm font-mono text-text-secondary mb-7">
          <li>
            <a
              href="https://www.darpa.mil/research/programs/quantum-benchmarking-initiative"
              target="_blank"
              rel="noreferrer"
              className="text-accent-data hover:underline"
            >
              DARPA QBI program page ↗
            </a>
          </li>
          <li>
            <a
              href="https://www.darpa.mil/research/programs/quantum-benchmarking-initiative/stage-b-selection"
              target="_blank"
              rel="noreferrer"
              className="text-accent-data hover:underline"
            >
              DARPA Stage B selection (Nov 2025) ↗
            </a>
          </li>
          <li>
            <a
              href="https://www.darpa.mil/news/2026/qbi-stage-a-qbit"
              target="_blank"
              rel="noreferrer"
              className="text-accent-data hover:underline"
            >
              DARPA: QBI expands quest (Mar 2026) ↗
            </a>
          </li>
          <li>
            <a
              href="https://www.darpa.mil/news/2025/quantum-computing-approaches"
              target="_blank"
              rel="noreferrer"
              className="text-accent-data hover:underline"
            >
              DARPA: Two utility-scale approaches (Feb 2025) ↗
            </a>
          </li>
        </ul>
        <p className="text-xs text-text-muted max-w-3xl">
          For full sector context, see{' '}
          <Link href="/companies" className="text-accent-data hover:underline">
            /companies
          </Link>
          ,{' '}
          <Link href="/qnt-ipo-watch" className="text-accent-data hover:underline">
            /qnt-ipo-watch
          </Link>
          , and{' '}
          <Link href="/roadmaps" className="text-accent-data hover:underline">
            /roadmaps
          </Link>
          .
        </p>
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
  tone?: 'data' | 'warn';
}) {
  return (
    <div className="bg-bg-surface p-4">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono">{label}</p>
      <p
        className={
          'mt-1.5 font-display tabular-nums text-[26px] leading-none tracking-tight ' +
          (tone === 'data' ? 'text-accent-data' : tone === 'warn' ? 'text-accent-warn' : 'text-text-primary')
        }
      >
        {value}
      </p>
    </div>
  );
}

function QbiCard({ q, index }: { q: QbiCompany; index: number }) {
  const c = getCompany(q.slug);
  return (
    <article className="bg-bg-surface p-5 lg:p-6 relative">
      <header className="grid grid-cols-[40px_minmax(0,1fr)_auto] gap-4 items-start mb-3">
        <span className="font-display tabular-nums text-[36px] leading-none text-text-muted">
          {String(index).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-[22px] tracking-tight leading-tight text-text-primary">
            <Link
              href={c ? `/companies/${c.slug}` : '#'}
              className="hover:text-accent-data transition-colors"
            >
              {q.name}
            </Link>
          </h3>
          <p className="text-[11px] text-text-muted font-mono tracking-wider mt-1 uppercase">
            {q.modality}
          </p>
        </div>
        <span
          className={
            'text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1 rounded-full border whitespace-nowrap ' +
            ODDS_COLOR[q.stageCOdds]
          }
        >
          {q.stageCOdds}
        </span>
      </header>
      <dl className="space-y-2.5 text-[13px] mt-4 pl-[56px]">
        <Field label="Benchmark" value={q.benchmark} />
        <Field label="Recent" value={q.recent} />
        <Field label="Concerns" value={q.concerns} />
        {q.fundingDisclosed && <Field label="Funding" value={q.fundingDisclosed} mono />}
      </dl>
    </article>
  );
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <span className="text-[9px] text-text-muted uppercase tracking-[0.1em] font-mono mr-2">
        {label}
      </span>
      <span
        className={
          mono
            ? 'font-mono text-text-primary tabular-nums'
            : 'text-text-secondary leading-[1.55]'
        }
      >
        {value}
      </span>
    </div>
  );
}

function EliminationCard({
  name,
  ticker,
  modality,
  note,
  tone,
}: {
  name: string;
  ticker?: string;
  modality: string;
  note: string;
  tone: 'down' | 'quantum' | 'warn';
}) {
  const dotClass =
    tone === 'down'
      ? 'bg-accent-down'
      : tone === 'quantum'
        ? 'bg-accent-quantum'
        : 'bg-accent-warn';
  return (
    <article className="bg-bg-surface p-5 relative">
      <span className={`absolute left-0 top-0 bottom-0 w-[2px] ${dotClass} opacity-60`} />
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-display text-[17px] leading-tight text-text-primary tracking-tight">
          {name}
        </h3>
        {ticker && (
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted whitespace-nowrap">
            {ticker}
          </span>
        )}
      </div>
      <p className="text-[10px] font-mono uppercase tracking-[0.08em] text-text-muted mb-2.5">
        {modality}
      </p>
      <p className="text-[13px] text-text-secondary leading-[1.55]">{note}</p>
    </article>
  );
}

function UpdateCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-bg-surface p-5">
      <p className="eyebrow mb-2.5">{label}</p>
      {children}
    </div>
  );
}

function Step({
  date,
  label,
  status,
}: {
  date: string;
  label: string;
  status: 'past' | 'next' | 'upcoming';
}) {
  return (
    <li className="relative">
      <span
        className={
          'absolute -left-[28px] top-1.5 w-4 h-4 rounded-full border-2 border-bg ' +
          (status === 'next'
            ? 'bg-accent-data animate-pulse-dot'
            : status === 'past'
              ? 'bg-text-muted'
              : 'bg-bg-elevated')
        }
        style={status === 'next' ? { boxShadow: '0 0 8px rgba(0, 217, 192, 0.6)' } : undefined}
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">{date}</p>
      <p
        className={
          'mt-0.5 text-[15px] leading-snug ' +
          (status === 'upcoming' ? 'text-text-muted' : 'text-text-primary')
        }
      >
        {label}
      </p>
    </li>
  );
}
