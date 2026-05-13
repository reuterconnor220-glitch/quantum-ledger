/**
 * DARPA Quantum Benchmarking Initiative (QBI) tracker dataset.
 * All entries source-cited where possible. Items marked "unverified" need confirmation.
 *
 * Sources collected via /trend-researcher pass on 2026-05-13. See darpa-qbi page for full citations.
 */

export type QbiStage = 'stage_a_only' | 'stage_b' | 'stage_c_us2qc' | 'eliminated' | 'acquired_into_stage_b';

export type QbiTech =
  | 'superconducting'
  | 'trapped_ion'
  | 'neutral_atom'
  | 'silicon_spin'
  | 'photonic'
  | 'topological'
  | 'cat_qubit'
  | 'bosonic';

export interface QbiParticipant {
  name: string;
  hq: string;
  /** Linked slug into our existing /companies dir, if a profile exists */
  companySlug?: string;
  /** Ticker if public */
  ticker?: string;
  tech: QbiTech;
  /** Current stage in QBI/US2QC pipeline */
  stage: QbiStage;
  /** Notes on stage progression or elimination */
  note?: string;
  /** Brief signal interpretation for investors */
  signal?: string;
  /** Source URL */
  source?: string;
}

export const QBI_PROGRAM = {
  launched: 'July 2024',
  managingDirector: 'Micah Stoutimore',
  managingDirectorSince: 'early 2026',
  previousPM: 'Joe Altepeter',
  office: 'DARPA Microsystems Technology Office (MTO)',
  utilityScaleTarget: 2033,
  fundingPerStage: {
    stageA: 'Up to ~$1M (typically under $1M)',
    stageB: 'Up to $15M',
    stageC: 'Not publicly disclosed',
  },
  primarySources: [
    {
      title: 'DARPA QBI program page',
      url: 'https://www.darpa.mil/research/programs/quantum-benchmarking-initiative',
    },
    {
      title: 'DARPA Stage B selection (Nov 2025)',
      url: 'https://www.darpa.mil/research/programs/quantum-benchmarking-initiative/stage-b-selection',
    },
    {
      title: 'DARPA: QBI expands quest (March 2026)',
      url: 'https://www.darpa.mil/news/2026/qbi-stage-a-qbit',
    },
  ],
} as const;

export const QBI_PARTICIPANTS: QbiParticipant[] = [
  // ===== Stage B advancers (11) =====
  {
    name: 'Atom Computing',
    hq: 'US',
    tech: 'neutral_atom',
    stage: 'stage_b',
    note: 'Stage A → Stage B (Nov 2025). Also had prior US2QC pilot relationship.',
    signal: 'Validated as a leading neutral-atom path; private.',
    source: 'https://www.darpa.mil/research/programs/quantum-benchmarking-initiative/stage-b-selection',
  },
  {
    name: 'Diraq',
    hq: 'Australia',
    tech: 'silicon_spin',
    stage: 'stage_b',
    note: 'Stage A → Stage B (Nov 2025). Silicon CMOS spin qubits.',
    signal: 'Only silicon-CMOS Stage B advancer alongside Quantum Motion and SQC — foundry-compatible path is alive.',
  },
  {
    name: 'IBM',
    hq: 'US',
    ticker: 'IBM',
    companySlug: 'ibm',
    tech: 'superconducting',
    stage: 'stage_b',
    note: 'Stage A → Stage B (Nov 2025). Modular superconducting roadmap with qLDPC.',
    signal: 'Mega-cap with material QBI validation; immaterial to share price.',
  },
  {
    name: 'IonQ',
    hq: 'US',
    ticker: 'IONQ',
    companySlug: 'ionq',
    tech: 'trapped_ion',
    stage: 'stage_b',
    note: 'Stage A → Stage B (Nov 2025). Subsequently acquired Oxford Ionics (~$1.075B, Sept 2025).',
    signal: 'Most QBI-validated public pure-play. Acquired a Stage A peer (Oxford Ionics) and folded the team in.',
  },
  {
    name: 'Nord Quantique',
    hq: 'Canada',
    tech: 'bosonic',
    stage: 'stage_b',
    note: 'Stage A → Stage B (Nov 2025). Bosonic superconducting (hardware-efficient QEC).',
    signal: 'Bosonic / hardware-efficient QEC alongside Alice & Bob — Nord advanced where A&B did not.',
  },
  {
    name: 'Photonic Inc.',
    hq: 'Canada',
    tech: 'silicon_spin',
    stage: 'stage_b',
    note: 'Stage A → Stage B (Nov 2025). Optically-linked silicon spin qubits.',
    signal: 'Distinct silicon-spin path with networked architecture; private.',
  },
  {
    name: 'Quantinuum',
    hq: 'US/UK',
    ticker: 'QNT (S-1 filed)',
    companySlug: 'quantinuum',
    tech: 'trapped_ion',
    stage: 'stage_b',
    note: 'Stage A → Stage B (Nov 2025). Trapped-ion QCCD, Helios 2025, Apollo this decade.',
    signal: 'IPO candidate. QBI validation is a tailwind into pricing — Helios + QBI is the bull thesis.',
  },
  {
    name: 'Quantum Motion',
    hq: 'UK',
    tech: 'silicon_spin',
    stage: 'stage_b',
    note: 'Stage A → Stage B (Nov 2025). MOS silicon spin qubits.',
    signal: 'UK foundry-compatible path validated; private.',
  },
  {
    name: 'QuEra Computing',
    hq: 'US',
    companySlug: 'quera',
    tech: 'neutral_atom',
    stage: 'stage_b',
    note: 'Stage A → Stage B (Nov 2025).',
    signal: 'Co-leading neutral-atom path with Atom Computing; private.',
  },
  {
    name: 'Silicon Quantum Computing (SQC)',
    hq: 'Australia',
    tech: 'silicon_spin',
    stage: 'stage_b',
    note: 'Stage A → Stage B (Nov 2025). Precision atom qubits in silicon.',
    signal: 'Third silicon-spin path validated alongside Diraq and Quantum Motion.',
  },
  {
    name: 'Xanadu',
    hq: 'Canada',
    companySlug: 'xanadu',
    tech: 'photonic',
    stage: 'stage_b',
    note: 'Stage A → Stage B (Nov 2025). Photonic Aurora platform.',
    signal: 'Sole photonic Stage B advancer outside US2QC; PsiQuantum sits in US2QC final.',
    source: 'https://www.globenewswire.com/news-release/2025/11/06/3183299/0/en/Xanadu-Advances-to-Stage-B-of-DARPA-s-Quantum-Benchmarking-Initiative-Securing-up-to-15-Million-in-Funding.html',
  },

  // ===== US2QC final / Stage C equivalent =====
  {
    name: 'PsiQuantum',
    hq: 'US/Australia',
    companySlug: 'psiquantum',
    tech: 'photonic',
    stage: 'stage_c_us2qc',
    note: 'US2QC final Validation & Co-Design phase (Feb 2025). $750M raise at ~$6B valuation March 2025.',
    signal: 'Strongest single technical validation in the program. Step-change in valuation coincided with US2QC final-phase selection.',
    source: 'https://www.darpa.mil/news/2025/quantum-computing-approaches',
  },
  {
    name: 'Microsoft',
    hq: 'US',
    ticker: 'MSFT',
    tech: 'topological',
    stage: 'stage_c_us2qc',
    note: 'US2QC final Validation & Co-Design phase (Feb 2025). Topological / Majorana approach.',
    signal: 'Mega-cap validation; immaterial to MSFT share price. Highest-conviction non-superconducting bet from DARPA.',
    source: 'https://www.darpa.mil/news/2025/quantum-computing-approaches',
  },

  // ===== Stage A only — did not advance to Stage B =====
  {
    name: 'Rigetti Computing',
    hq: 'US',
    ticker: 'RGTI',
    companySlug: 'rigetti',
    tech: 'superconducting',
    stage: 'eliminated',
    note: 'Stage A only. Did not advance to Stage B in November 2025.',
    signal: 'Cleanest negative differential signal in the program. Public pure-play; no 8-K tying stock to QBI non-advancement has been identified.',
  },
  {
    name: 'Alice & Bob',
    hq: 'France/US',
    tech: 'cat_qubit',
    stage: 'eliminated',
    note: 'Stage A only. Did not advance to Stage B.',
    signal: 'Cat-qubit bias-noise approach did not make the Stage B cut despite Nord Quantique (also bosonic) advancing.',
  },
  {
    name: 'Hewlett Packard Enterprise (HPE)',
    hq: 'US',
    ticker: 'HPE',
    tech: 'superconducting',
    stage: 'eliminated',
    note: 'Stage A only. Did not advance to Stage B.',
    signal: 'Hybrid HPC framing; immaterial to HPE\'s enterprise mix.',
  },
  {
    name: 'Atlantic Quantum',
    hq: 'US (Boston)',
    tech: 'superconducting',
    stage: 'acquired_into_stage_b',
    note: 'Acquired by Google Quantum AI (October 2025). Team folded into Google\'s QBI participation.',
    signal: 'Cleanest M&A signal QBI has produced — Stage A players being absorbed by Stage B advancers.',
  },
  {
    name: 'Oxford Ionics',
    hq: 'UK',
    tech: 'trapped_ion',
    stage: 'acquired_into_stage_b',
    note: 'Acquired by IonQ (~Sept 2025, ~$1.075B). Team folded into IonQ\'s QBI line.',
    signal: 'Same dynamic as Atlantic Quantum — Stage A player absorbed by Stage B advancer.',
  },
  {
    name: 'Google Quantum AI',
    hq: 'US',
    ticker: 'GOOGL',
    tech: 'superconducting',
    stage: 'stage_a_only',
    note: 'Added late to Stage A (Sept 2025). Stage B status unclear — may be considered in future round.',
    signal: 'Joined too late for Nov 2025 Stage B cut; absorbed Atlantic Quantum a month later.',
    source: 'https://blog.google/technology/research/google-quantum-ai-selected-darpa-qbi/',
  },
];

export const QBI_TIMELINE: { date: string; event: string; source?: string }[] = [
  { date: '2023-02-01', event: 'DARPA announces US2QC collaborations with Atom Computing, Microsoft, PsiQuantum.' },
  { date: '2024-07', event: 'QBI program launched as successor/expansion to the original Quantum Benchmarking program.' },
  { date: '2025-02-06', event: 'Microsoft + PsiQuantum advance to final US2QC Validation & Co-Design phase (Stage C equivalent).', source: 'https://www.darpa.mil/news/2025/quantum-computing-approaches' },
  { date: '2025-04-03', event: 'DARPA announces initial ~18 Stage A QBI participants.', source: 'https://breakingdefense.com/2025/04/darpa-adds-18-companies-to-spooky-science-quantum-benchmarking-initiative/' },
  { date: '2025-09-09', event: 'Google Quantum AI added to Stage A.', source: 'https://blog.google/technology/research/google-quantum-ai-selected-darpa-qbi/' },
  { date: '2025-09', event: 'IonQ acquires Oxford Ionics (~$1.075B).' },
  { date: '2025-10', event: 'Google acquires Atlantic Quantum team.' },
  { date: '2025-11-06', event: '11 companies advance to Stage B (up to $15M each over ~12 months).', source: 'https://www.darpa.mil/research/programs/quantum-benchmarking-initiative/stage-b-selection' },
  { date: '2026-03-09', event: 'New QBIT Stage A solicitation opens (DARPA-PA-26-02-02) for organizations not previously funded.', source: 'https://www.darpa.mil/news/2026/qbi-stage-a-qbit' },
  { date: '2026-07-31', event: 'Abstract deadline for new QBIT Stage A.' },
  { date: '2026-09-30', event: 'Full proposal deadline new QBIT Stage A.' },
  { date: '2026-10-15', event: 'IV&V topic deadline.' },
  { date: '2026-11-14', event: 'General QBI 2026 deadline.' },
  { date: '~2026-Q4', event: 'Stage B 12-month window completes — expected Stage C selection decisions.' },
  { date: '2033', event: 'DARPA target year for "industrially useful" / utility-scale quantum computer.' },
];

export const QBI_EVAL_CRITERIA = [
  { stage: 'Stage A', criteria: 'Plausibility of a utility-scale concept. Written abstract + day-long oral presentation before US quantum experts.' },
  { stage: 'Stage B', criteria: 'Comprehensive R&D plan with identified technical risks, risk-mitigation prototypes, and a long-term scaling path.' },
  { stage: 'Stage C / US2QC final', criteria: 'Independent IV&V team tests components, subsystems, algorithms, and fault-tolerance demonstrations on real hardware.' },
];

export const QBI_TECHNICAL_BENCHMARKS = [
  'Logical qubit error rates (post-error-correction, not physical)',
  'Number of logical qubits at target performance',
  'Logical-level gate fidelity',
  'Demonstrated error correction at scale',
  'Architecture-level feasibility: cryogenics, control, interconnects, manufacturability',
  'Utility-per-dollar — DARPA pointedly does not use "quantum volume" as a primary metric',
];
