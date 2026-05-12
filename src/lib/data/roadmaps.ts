/**
 * Hardware roadmaps comparison data — every major vendor's stated milestones with credibility scores.
 * Source: 6 parallel research agents, May 2026.
 */

export interface Roadmap {
  companySlug: string;
  vendor: string;
  modality: string;
  credibilityScore: number; // 0-10
  credibilityNotes: string;
  milestones: { year: number | string; label: string; status: 'shipped' | 'announced' | 'aspirational' }[];
  gatingChallenge: string;
  definitionOfSuccess: string;
}

export const ROADMAPS: Roadmap[] = [
  {
    companySlug: 'ibm',
    vendor: 'IBM',
    modality: 'Superconducting',
    credibilityScore: 8.5,
    credibilityNotes: 'Shipped on schedule for five consecutive years; publishes peer-reviewed papers ahead of marketing. The reference standard.',
    milestones: [
      { year: 2024, label: 'Heron R2 (156Q) — shipped', status: 'shipped' },
      { year: 2025, label: 'Loon — qLDPC c-couplers tested', status: 'shipped' },
      { year: 2026, label: 'Nighthawk (120Q square-lattice) → Kookaburra (modular)', status: 'announced' },
      { year: 2027, label: 'Cockatoo — interconnect at scale', status: 'announced' },
      { year: 2029, label: 'Starling — ~200 logical qubits, 100M ops', status: 'announced' },
      { year: 2033, label: 'Blue Jay — 2,000 logical qubits, 1B ops', status: 'aspirational' },
    ],
    gatingChallenge: 'qLDPC code performance at scale; c-coupler yields; classical decoder latency.',
    definitionOfSuccess: '~200 logical qubits with ~10^-8 logical error rate by 2029 — a genuine FTQC machine.',
  },
  {
    companySlug: 'google',
    vendor: 'Google Quantum AI',
    modality: 'Superconducting',
    credibilityScore: 8.0,
    credibilityNotes: 'Best physics in the field. Underpromise on dates, overdeliver on physics. Six-milestone framework is the most rigorous.',
    milestones: [
      { year: 2024, label: 'Willow — sub-threshold logical qubit (Milestone 2 of 6)', status: 'shipped' },
      { year: 2025, label: 'Quantum Echoes — first verifiable advantage claim', status: 'shipped' },
      { year: 2026, label: 'Willow Early Access Program; neutral-atom track expansion', status: 'shipped' },
      { year: 2027, label: 'Long-lived logical qubit (Milestone 3)', status: 'aspirational' },
      { year: '2029-2030', label: 'Million-qubit Shor-class machine', status: 'aspirational' },
    ],
    gatingChallenge: 'Scaling without losing surface-code threshold; cryogenic wiring; classical decoder co-design.',
    definitionOfSuccess: 'Million-qubit machine running Shor-class algorithms by ~2029-2030.',
  },
  {
    companySlug: 'quantinuum',
    vendor: 'Quantinuum',
    modality: 'Trapped Ion (QCCD)',
    credibilityScore: 7.5,
    credibilityNotes: 'Best physics on fidelity; aggressive on 2030 universal FTQC promise. Helios shipped roughly on schedule.',
    milestones: [
      { year: 2025, label: 'Helios — 98 physical / 48 logical at 99.99% SPAM', status: 'shipped' },
      { year: 2027, label: 'Sol — hundreds of physical, 2D grid, 10K-op circuits', status: 'announced' },
      { year: '2029-2030', label: 'Apollo — universal, fully fault-tolerant', status: 'aspirational' },
      { year: 2033, label: 'Lumos — utility-scale machine', status: 'aspirational' },
    ],
    gatingChallenge: 'Ion transport latency at scale; photonic interconnect between trap modules; repetition rate.',
    definitionOfSuccess: 'Universal fully fault-tolerant — strongest claim of any vendor.',
  },
  {
    companySlug: 'ionq',
    vendor: 'IonQ',
    modality: 'Trapped Ion',
    credibilityScore: 5.5,
    credibilityNotes: 'Historically slipped milestones and aggressively redefined metrics. SkyWater deal sound but adds execution risk unrelated to physics.',
    milestones: [
      { year: 2025, label: 'Tempo — 99.99% 2Q fidelity on barium (Oxford Ionics)', status: 'shipped' },
      { year: 2026, label: 'SkyWater acquisition closes; first 256Q chip-based system to Cambridge', status: 'announced' },
      { year: 2027, label: 'Forte Enterprise + photonic interconnect prototypes', status: 'announced' },
      { year: 2030, label: '2M physical / 80K logical qubits (networked)', status: 'aspirational' },
    ],
    gatingChallenge: 'Photonic networking fidelity between traps; Electronic Qubit Control at scale; integrating SkyWater.',
    definitionOfSuccess: 'Networked quantum data centers, not a single monolithic machine.',
  },
  {
    companySlug: 'psiquantum',
    vendor: 'PsiQuantum',
    modality: 'Photonic',
    credibilityScore: 4.0,
    credibilityNotes: 'Boldest bet in the industry. Skip NISQ, go straight to million-qubit FTQC. But no intermediate machine demonstrated. Brisbane delayed.',
    milestones: [
      { year: 2025, label: 'Omega chipset announced; $1B Series E at $7B', status: 'shipped' },
      { year: 2026, label: 'Brisbane building complete (was originally 2027 target)', status: 'announced' },
      { year: '2027-2028', label: 'Chicago + Brisbane hardware install', status: 'aspirational' },
      { year: '2029-2030', label: '1M physical qubits / utility-scale FTQC', status: 'aspirational' },
    ],
    gatingChallenge: 'Identical-photon generation (probabilistic); detector yield; cryo at facility scale; fiber loss budgets.',
    definitionOfSuccess: 'Useful FTQC machine running chemistry/materials. Binary outcome.',
  },
  {
    companySlug: 'atom-computing',
    vendor: 'Atom Computing + Microsoft',
    modality: 'Neutral Atom',
    credibilityScore: 7.0,
    credibilityNotes: 'Nov 2024 demonstration of 24 logical qubits was real, peer-reviewed, reproducible. Microsoft partnership is the most concrete near-term logical-qubit story.',
    milestones: [
      { year: 2024, label: 'Phoenix operational; 24 logical qubits with Microsoft', status: 'shipped' },
      { year: '2026-2027', label: 'Magne delivered to Denmark/Novo Nordisk (50 logical from ~1,200 phys)', status: 'announced' },
      { year: 2028, label: '10,000+ physical / 100+ logical', status: 'aspirational' },
    ],
    gatingChallenge: 'Atom loss during measurement; shuttling speed; vacuum chamber scale-up.',
    definitionOfSuccess: '100+ logical qubits running utility-scale chemistry by ~2028.',
  },
  {
    companySlug: 'quera',
    vendor: 'QuEra Computing',
    modality: 'Neutral Atom',
    credibilityScore: 6.0,
    credibilityNotes: 'Hit 2024 milestone and Harvard 48-logical-qubit demo. 2026 10K/100 target looks aspirational — no 3K-qubit intermediate machine shown.',
    milestones: [
      { year: 2024, label: '256 physical / 10 logical — shipped (Aquila)', status: 'shipped' },
      { year: 2025, label: '3,000 physical / 30 logical with magic state distillation', status: 'announced' },
      { year: 2026, label: '10,000 physical / 100 logical', status: 'aspirational' },
    ],
    gatingChallenge: 'Atom loss, shuttling speed — same as Atom Computing but with weaker industrial backing.',
    definitionOfSuccess: '100 logical qubits enabling deep logical circuits beyond classical simulation.',
  },
  {
    companySlug: 'pasqal',
    vendor: 'Pasqal',
    modality: 'Neutral Atom',
    credibilityScore: 5.5,
    credibilityNotes: 'Honest about 2024 → 2025 slip (10K-by-2026 became 2028). Pivoting to problem-specific machines — commercial pragmatism or lowering the bar.',
    milestones: [
      { year: 2025, label: 'Orion Gamma — 140+ qubits', status: 'shipped' },
      { year: 2026, label: '250-qubit problem-specific machine', status: 'announced' },
      { year: 2027, label: 'Vela — 200+ qubits', status: 'announced' },
      { year: 2028, label: 'Centaurus — 10,000 qubits "early FTQC"', status: 'aspirational' },
      { year: 2029, label: 'Lyra — impactful FTQC', status: 'aspirational' },
    ],
    gatingChallenge: 'Same neutral-atom physics; commercial customer pipeline less mature.',
    definitionOfSuccess: '"Early FTQC" with Centaurus — deliberately fuzzy term.',
  },
  {
    companySlug: 'iqm',
    vendor: 'IQM',
    modality: 'Superconducting',
    credibilityScore: 7.0,
    credibilityNotes: 'Ships on time. Only credible non-US/Chinese superconducting player. Finnish VTT contracts are real revenue with real dates.',
    milestones: [
      { year: 2025, label: 'Resonance Star in production', status: 'shipped' },
      { year: 2026, label: '150-qubit Radiance to VTT Finland', status: 'announced' },
      { year: 2027, label: '300-qubit Radiance (two modules)', status: 'announced' },
      { year: 2030, label: 'Hundreds of logical qubits (Apollo)', status: 'aspirational' },
    ],
    gatingChallenge: 'Scaling beyond 300 qubits with high fidelities; classical control electronics co-development.',
    definitionOfSuccess: 'Hundreds of logical qubits by 2030 — a measured definition.',
  },
  {
    companySlug: 'alice-and-bob',
    vendor: 'Alice & Bob',
    modality: 'Cat Qubit',
    credibilityScore: 6.5,
    credibilityNotes: '1-hour bit-flip lifetime achievement is genuinely impressive. But no end-to-end logical qubit shown. Boson → Graphene leap is huge.',
    milestones: [
      { year: 2024, label: 'Boson chips (single cat qubit, >7-min bit-flip lifetime)', status: 'shipped' },
      { year: 2026, label: 'Helium — first logical qubit below threshold', status: 'announced' },
      { year: 2028, label: 'Lithium — multi-logical-qubit + corrected logical gate', status: 'aspirational' },
      { year: 2030, label: 'Graphene — 100 high-fidelity logical qubits', status: 'aspirational' },
    ],
    gatingChallenge: 'Demonstrating a logical qubit with cat encoding at all; phase-flip overhead unvalidated at scale.',
    definitionOfSuccess: '100 logical qubits by 2030 — same target as Quantinuum at a fraction of the funding.',
  },
  {
    companySlug: 'microsoft',
    vendor: 'Microsoft (Majorana)',
    modality: 'Topological',
    credibilityScore: 2.5,
    credibilityNotes: 'Largest credibility gap in the industry. 2018 underlying Nature paper retracted. 2025 Majorana 1 announcement met with peer skepticism. Hedge with Atom Computing tells you what they internally believe.',
    milestones: [
      { year: 2025, label: 'Majorana 1 — 8-qubit tetron chip (contested)', status: 'shipped' },
      { year: 2027, label: '4x2 tetron array for QED on 2 logical qubits', status: 'aspirational' },
      { year: 2029, label: '27x13 tetron array for QEC', status: 'aspirational' },
      { year: '2027-2029', label: '"Practical quantum computers"', status: 'aspirational' },
    ],
    gatingChallenge: 'Demonstrating an unambiguous Majorana zero mode is itself unsolved.',
    definitionOfSuccess: 'Million-qubit topological machine — either revolutionary or a $1B+ research write-off.',
  },
  {
    companySlug: 'rigetti',
    vendor: 'Rigetti',
    modality: 'Superconducting',
    credibilityScore: 5.0,
    credibilityNotes: 'Badly missed earlier milestones in 2022-2024 but stabilized through 2025. The 108-qubit chiplet is a real product. Roadmap is modest — welcome discipline.',
    milestones: [
      { year: 2026, label: 'Cepheus-1-108Q — 12 chiplets, 99.1% 2Q (target 99.5% later 2026)', status: 'shipped' },
      { year: '2027-2028', label: 'Scaling beyond 1,000 qubits via chiplet architecture', status: 'announced' },
      { year: '2030+', label: 'FTQC path', status: 'aspirational' },
    ],
    gatingChallenge: 'Coherence time; chiplet-to-chiplet coupling.',
    definitionOfSuccess: 'Useful NISQ machine and a path to FTQC by early 2030s — aspirational but not specific.',
  },
  {
    companySlug: 'dwave',
    vendor: 'D-Wave Quantum',
    modality: 'Annealing + Gate (post-QCI)',
    credibilityScore: 5.5,
    credibilityNotes: 'Real annealing business with real revenue. Gate-model bet via QCI acquisition is technically sound but 2026 ship is aggressive.',
    milestones: [
      { year: 2025, label: 'Advantage2 (~4,400 qubits) in production', status: 'shipped' },
      { year: 2026, label: 'Initial gate-model system in market (via QCI)', status: 'announced' },
      { year: 2028, label: '~175-qubit dual-rail system', status: 'aspirational' },
      { year: 2030, label: '1,000-qubit dual-rail / 10 logical qubits', status: 'aspirational' },
      { year: 2032, label: '100 logical qubits — "initial quantum utility"', status: 'aspirational' },
    ],
    gatingChallenge: 'Gate fidelity on dual-rail at scale; market positioning (annealing vs gate).',
    definitionOfSuccess: 'Two-track viability through 2030+.',
  },
  {
    companySlug: 'xanadu',
    vendor: 'Xanadu',
    modality: 'Photonic',
    credibilityScore: 5.0,
    credibilityNotes: 'Aurora was a real achievement but at 12 qubits the leap to 500 logical by 2030 is enormous. 2028 FTQC is more aggressive than IBM\'s.',
    milestones: [
      { year: 2025, label: 'Aurora — 12 qubits, 4 racks, 35 chips, 13km fiber, room-temp', status: 'shipped' },
      { year: 2026, label: 'Listed on Nasdaq/TSX as XNDU', status: 'shipped' },
      { year: 2028, label: 'Fault tolerance', status: 'aspirational' },
      { year: '2029-2030', label: 'Up to 500 logical qubits', status: 'aspirational' },
    ],
    gatingChallenge: 'Photon loss, gate fidelity in measurement-based computing, chip yield.',
    definitionOfSuccess: 'Networked photonic FTQC — same family as PsiQuantum, different encoding (GKP vs dual-rail).',
  },
];
