export interface Application {
  slug: string;
  domain: string;
  oneLiner: string;
  whyItMatters: string;
  whatChanges: string;
  timeline: string;
  qubitsNeeded: string;
  earlyWins: string[];
  realPlayers: string[];
  bullCase: string;
  realismCheck: string;
  iconColor: string;
}

export const APPLICATIONS: Application[] = [
  {
    slug: 'drug-discovery',
    domain: 'Drug discovery & medicine',
    oneLiner: 'Simulate how molecules bind to proteins at quantum-mechanical accuracy — pre-screen drug candidates in silico before any wet lab.',
    whyItMatters:
      'Pharma companies spend an average of $2.6B to bring one drug to market and 90% of candidates fail. Most of that failure happens because classical computers cannot accurately predict how a drug molecule interacts with the target protein. Quantum computers naturally represent the quantum states underlying chemistry — that\'s the entire reason Richard Feynman proposed building one in 1982.',
    whatChanges:
      'Drug candidates get screened against targets virtually, with accuracy that classical molecular dynamics can\'t match. Antibody design accelerates. Personalized medicine becomes computationally tractable. Rare-disease research becomes economically viable because cost-per-candidate plummets.',
    timeline:
      'Useful quantum simulation of small molecules: 2028–2030. Drug-receptor binding at therapeutic scale: 2030–2033. Wide pharma adoption: post-2033.',
    qubitsNeeded: '100–1,000 logical qubits with <10⁻⁷ logical error rate.',
    earlyWins: [
      'FeMoco active-site simulation (nitrogenase — also unlocks fertilizer)',
      'ATP synthase ground-state energy',
      'Cytochrome P450 drug metabolism predictions',
      'Antibody-antigen binding affinities',
    ],
    realPlayers: [
      'AstraZeneca + IonQ',
      'Boehringer-Ingelheim + Google Quantum AI',
      'Pfizer + AWS Braket',
      'Cleveland Clinic + IBM Quantum',
      'Roche + Cambridge Quantum (Quantinuum) on InQuanto',
    ],
    bullCase:
      'McKinsey expects pharmaceuticals to be the single largest commercial quantum revenue category through 2035. The economics work because pharma already spends $200B/yr on R&D — a 5% acceleration is $10B in annual value.',
    realismCheck:
      'AlphaFold solved protein structure prediction with classical AI; quantum needs to leapfrog that bar, not just match it. Most "quantum advantage" claims in drug discovery so far are on tiny molecules with <100 atoms. The leap to therapeutic relevance is large.',
    iconColor: 'bg-emerald-500/70',
  },
  {
    slug: 'materials-science',
    domain: 'Materials science',
    oneLiner: 'Design new superconductors, batteries, catalysts, and aerospace alloys by simulating electrons and lattices accurately for the first time.',
    whyItMatters:
      'The Haber-Bosch process for nitrogen fixation (industrial fertilizer) consumes 1–2% of global energy. Nitrogenase, a bacterial enzyme, does the same chemistry at room temperature — we simply do not understand how. The active site (FeMoco) has 100+ correlated electrons, well beyond classical simulation. Quantum computing could solve this and revolutionize agriculture.',
    whatChanges:
      'Higher-temperature superconductors (which would transform the power grid). Solid-state batteries with 3-5× current density. Catalysts for cheaper hydrogen production. Carbon-capture materials that work at industrial scale. Lighter, stronger aerospace alloys.',
    timeline:
      'Useful materials simulation: 2028–2032. First commercially-designed quantum-discovered material: 2030–2035.',
    qubitsNeeded: '100–500 logical qubits.',
    earlyWins: [
      'FeMoco / nitrogenase active site (fertilizer revolution)',
      'Cuprate superconductors',
      'Battery cathode materials (Li-S, Na-ion)',
      'Catalysts for green hydrogen',
    ],
    realPlayers: [
      'BASF + Pasqal',
      'Mitsubishi Chemical + Quantinuum',
      'BMW + Quantinuum (battery chemistry)',
      'JSR + IonQ (semiconductor materials)',
    ],
    bullCase:
      'McKinsey estimates materials/chemistry will produce $43-71B of quantum-driven value by 2035. Industrial chemistry alone is a $5 trillion industry where even single-digit efficiency gains compound enormously.',
    realismCheck:
      'Most "first useful quantum chemistry" claims to date have been benchmarkable against classical methods within hours on a laptop. Genuinely quantum-hard chemistry (multi-reference, strongly correlated electrons) is the threshold to clear.',
    iconColor: 'bg-amber-500/70',
  },
  {
    slug: 'climate-energy',
    domain: 'Climate & clean energy',
    oneLiner: 'Better catalysts for carbon capture, more efficient solar cells, faster path to fusion materials, optimized grids.',
    whyItMatters:
      'Climate change is fundamentally a chemistry and physics problem at scale: we need better catalysts, better photovoltaic materials, better batteries, better grid optimization. Each of those is computationally bound today.',
    whatChanges:
      'CO₂-to-fuel catalysts at industrial cost. Perovskite solar cells at higher efficiency. Fusion-reactor wall materials that survive plasma. Grid optimization that handles intermittent renewables better. Direct-air-capture chemistry orders of magnitude cheaper.',
    timeline:
      'Catalyst design wins: 2028–2032. Grid optimization (already partial via D-Wave annealing): incremental from now. Fusion-relevant simulations: 2030+.',
    qubitsNeeded: '100–500 logical qubits for chemistry; classical-quantum hybrid for optimization (today).',
    earlyWins: [
      'CO₂ reduction catalyst design',
      'Perovskite stability optimization',
      'Grid load balancing with renewables',
      'Tokamak plasma simulation (partial)',
    ],
    realPlayers: [
      'BP + IonQ (energy optimization)',
      'ExxonMobil + IBM Quantum',
      'Volkswagen + D-Wave (traffic / battery)',
      'JPMorgan + Quantinuum (renewable financing models)',
    ],
    bullCase:
      'Climate solutions are the highest-stakes near-term application. If quantum accelerates carbon capture by even 10x, the impact dwarfs every other use case combined.',
    realismCheck:
      'Most "quantum + climate" announcements today are pilot programs with little commercial deployment. Real grid optimization works today on annealers, but the big chemistry wins are still 5+ years out.',
    iconColor: 'bg-green-500/70',
  },
  {
    slug: 'cryptography',
    domain: 'Cryptography & security',
    oneLiner: 'Shor\'s algorithm breaks RSA/ECC. NIST has already standardized post-quantum replacements. The race is who migrates first.',
    whyItMatters:
      'Essentially every secure connection on the internet — HTTPS, SSH, bank wires, government communications — relies on factoring or elliptic-curve discrete-log problems that quantum computers can solve in polynomial time. The transition to post-quantum cryptography (PQC) is the largest cryptographic migration in history.',
    whatChanges:
      'RSA-2048 and ECC-256 become obsolete. NIST-standardized ML-KEM, ML-DSA, SLH-DSA become the new defaults. Hardware (HSMs, TPMs) must be replaced. Symmetric crypto (AES) survives but with longer keys. New "quantum-safe" products emerge across networking and identity.',
    timeline:
      'NIST PQC standards finalized August 2024. Federal deadline: 2030–2035 (varies). Practical RSA-breaking quantum computer: 2030+ (uncertain).',
    qubitsNeeded: 'Breaking RSA-2048 requires ~20M noisy qubits or ~thousands of logical qubits (Gidney/Ekerå 2021).',
    earlyWins: [
      'NIST PQC migration in federal systems (NSM-10, 2022 mandate)',
      'Quantum Key Distribution for sovereign comms (limited scope)',
      'Cryptographic-discovery inventories (SandboxAQ AQtive Guard etc.)',
      'Apple iMessage PQ3, Cloudflare PQC TLS — already live',
    ],
    realPlayers: [
      'NIST (algorithm standards)',
      'Cloudflare, Apple, Google, AWS, Microsoft (deployment)',
      'SandboxAQ, PQShield, Arqit, ID Quantique (vendors)',
      'NSA CNSA 2.0 mandate',
    ],
    bullCase:
      'PQC is the rare cybersecurity category with a hard federal deadline and a non-discretionary buyer. Total migration spend likely exceeds $40B globally over a decade.',
    realismCheck:
      'Most spend goes to incumbents (Entrust, Thales, IBM, hyperscalers) — pure-play startups capture a thin slice. QKD remains niche; NSA explicitly does not recommend it for national security systems.',
    iconColor: 'bg-red-500/70',
  },
  {
    slug: 'optimization',
    domain: 'Logistics & optimization',
    oneLiner: 'Quadratic speedups on hard combinatorial problems — airline routing, supply chain, portfolio construction.',
    whyItMatters:
      'Many of the most economically important problems in business — routing, scheduling, resource allocation, portfolio optimization — are NP-hard combinatorial problems. Even modest speedups translate to billions in saved operations.',
    whatChanges:
      'Airlines route fleets more efficiently. Supply chains rebalance in real time. Financial portfolios get rebalanced with constraints classical heuristics miss. Traffic systems optimize at city scale.',
    timeline:
      'Annealing-based wins: today (D-Wave). Gate-based combinatorial advantage: 2027–2030. Provable exponential speedup: unclear (classical algorithms keep improving).',
    qubitsNeeded: 'Varies wildly — annealers operate today on 5,000+ qubits; gate-based optimization needs 100+ logical.',
    earlyWins: [
      'Volkswagen traffic routing in Lisbon (D-Wave, deployed)',
      'NatWest portfolio optimization (D-Wave)',
      'Mastercard fraud network analysis (D-Wave)',
      'BMW factory robot scheduling',
    ],
    realPlayers: [
      'D-Wave Quantum (annealer)',
      'Volkswagen, BMW, ExxonMobil, NatWest, Mastercard customers',
      'JPMorgan, Goldman, Wells Fargo (gate-based pilots)',
    ],
    bullCase:
      'Optimization is the only quantum domain with real, deployed commercial value today. As annealer scale grows, more use cases tip from "classical wins" to "quantum wins."',
    realismCheck:
      'The "quantum advantage in optimization" story has cried wolf for a decade. Classical solvers (Gurobi, CPLEX) keep getting better. Most "quantum-only-solvable" problems turn out to be solvable classically with enough engineering.',
    iconColor: 'bg-blue-500/70',
  },
  {
    slug: 'machine-learning',
    domain: 'Quantum machine learning',
    oneLiner: 'Quantum kernel methods, quantum neural networks, hybrid classical-quantum training. Most speculative domain.',
    whyItMatters:
      'If quantum machine learning works, it could accelerate AI training, enable new model architectures, and handle data that\'s naturally quantum (chemistry, materials). If it doesn\'t — which is the consensus view today — quantum + AI will mean classical AI orchestrating quantum subroutines.',
    whatChanges:
      'Quantum kernels for SVM-like classifiers. Quantum-enhanced sampling for generative models. Quantum reservoir computing. Most realistically: classical AI doing the heavy lifting with quantum coprocessor calls for specific kernels (chemistry, optimization sub-problems).',
    timeline:
      'Limited commercial QML: 2027–2030. Genuine quantum advantage on real ML benchmarks: highly uncertain.',
    qubitsNeeded: '100+ logical qubits for credible demonstrations.',
    earlyWins: [
      'Quantum-enhanced generative models (limited demos)',
      'Quantum kernel methods on small datasets',
      'NVIDIA Ising — open quantum AI models for QPU calibration (Apr 2026)',
      'Hybrid quantum-classical training pipelines',
    ],
    realPlayers: [
      'NVIDIA (CUDA-Q, NVQLink, Ising)',
      'Google, IBM, Quantinuum research arms',
      'Xanadu PennyLane (open-source library)',
      'SandboxAQ (quantum-inspired ML)',
    ],
    bullCase:
      'If QML works even narrowly on chemistry or financial data, the combined quantum+AI market is the largest in tech. Even a small QML coprocessor add-on to NVIDIA stacks could be massive.',
    realismCheck:
      'No demonstrated quantum advantage on a real-world ML benchmark exists today. The theoretical case is contested. Be skeptical of "quantum AI" marketing — it\'s almost always hype layered on hype.',
    iconColor: 'bg-violet-500/70',
  },
  {
    slug: 'finance',
    domain: 'Finance & risk',
    oneLiner: 'Monte Carlo speedups on derivative pricing, faster risk calculations, portfolio optimization.',
    whyItMatters:
      'Financial models — option pricing, value-at-risk, credit risk — are dominated by Monte Carlo simulations. Quantum amplitude estimation provides a quadratic speedup on Monte Carlo, which translates to dramatically faster overnight risk calculations or finer-grained intraday models.',
    whatChanges:
      'Banks run risk calculations in seconds rather than overnight. Derivative pricing becomes more accurate. Fraud detection patterns surface that classical algorithms miss. Real-time portfolio rebalancing under constraints.',
    timeline:
      'Production financial quantum use: 2028–2032.',
    qubitsNeeded: '100–500 logical qubits for meaningful Monte Carlo speedups.',
    earlyWins: [
      'JPMorgan + IBM credit risk modeling',
      'Goldman Sachs derivative pricing pilots',
      'HSBC commercial advantage paper (34% accuracy lift on optimization, Nov 2025)',
      'Wells Fargo + Quantinuum portfolio work',
    ],
    realPlayers: [
      'JPMorgan, Goldman, HSBC, Wells Fargo, BNY Mellon',
      'Quantinuum InQuanto',
      'IBM Quantum Network financial members',
    ],
    bullCase:
      'Wall Street is the most willing-to-pay customer base in technology. Even modest speedups on Monte Carlo justify large procurement contracts.',
    realismCheck:
      'Most financial Monte Carlo workloads parallelize trivially on GPUs. The quadratic speedup from quantum needs to outpace the constant-factor advantage of massive classical compute farms. The math is closer than vendors imply.',
    iconColor: 'bg-yellow-500/70',
  },
  {
    slug: 'sensing-navigation',
    domain: 'Sensing & navigation',
    oneLiner: 'GPS-free navigation, ultra-precise atomic clocks, ambient-condition brain imaging. Already deployed in defense.',
    whyItMatters:
      'Quantum sensors exploit superposition and entanglement to measure magnetic fields, gravity, rotation, and time at sensitivities 10-1000× better than classical instruments. Unlike quantum computing, much of this is already deployed in defense pilots today.',
    whatChanges:
      'Submarines and aircraft navigate without GPS. Brain MEG scanners that fit on a helmet replace $3M cryogenic suites. Mineral and oil exploration via sub-surface gravity sensing. Cardiac MCG diagnostics in ambulances.',
    timeline:
      'Defense PNT (positioning, navigation, timing): deploying now. Medical OPM-MEG: commercial by 2027. Civilian PNT backup: 2028+.',
    qubitsNeeded: 'Different physics — sensing uses single-atom or single-spin systems, not qubit arrays.',
    earlyWins: [
      'Q-CTRL Ironstone Opal — 111× better positioning than INS in GPS-denied trials',
      'Infleqtion + Royal Navy underwater optical clock',
      'SBQuantum NV-diamond magnetometers in defense',
      'Cerca Magnetics OPM-MEG nearing regulatory filing',
    ],
    realPlayers: [
      'Q-CTRL, Infleqtion, SBQuantum, Vector Atomic, AOSense',
      'Quantum Brilliance (room-temp NV-diamond)',
      'DARPA RoQS program, AUKUS Pillar 2',
    ],
    bullCase:
      'Quantum sensing has real product-market fit *today* in defense PNT. GPS denial in Ukraine, Red Sea, and Indo-Pacific is a forcing function. Medical imaging upside is 10× displacement story.',
    realismCheck:
      'TAMs remain small ($0.5–2B near-term) and dominated by lumpy government contracts. Many "quantum" sensors compete with mature classical alternatives (MEMS gyros, GPS+INS fusion, cesium clocks) that keep getting better and cheaper.',
    iconColor: 'bg-teal-500/70',
  },
  {
    slug: 'fundamental-science',
    domain: 'Fundamental science',
    oneLiner: 'Simulate quantum chromodynamics, condensed-matter exotica, possibly quantum gravity. The Feynman use case.',
    whyItMatters:
      'Feynman\'s 1982 motivation: simulating quantum systems on classical computers takes exponential resources, but quantum computers naturally represent quantum states. High-energy physics, condensed matter, cosmology, and quantum gravity all benefit.',
    whatChanges:
      'Lattice QCD calculations done with quantum computers. High-temperature superconductor mechanisms understood. Topological phases of matter mapped. Black hole information paradox studied via quantum simulation. Cosmology and inflation models tested.',
    timeline:
      'Modest physics simulations: today (annealing + small NISQ). Frontier physics: 2030+.',
    qubitsNeeded: 'Variable — meaningful condensed-matter physics needs 50–200 logical qubits.',
    earlyWins: [
      'Lattice gauge theory simulations (small scale)',
      'Ising model phase transitions',
      'Topological invariants in 2D materials',
      'Hubbard model strongly-correlated electrons',
    ],
    realPlayers: [
      'CERN + IBM Quantum (HEP)',
      'Fermilab quantum group',
      'Various university physics departments via IBM/AWS/Azure',
    ],
    bullCase:
      'Fundamental science discoveries enabled by quantum computers will reshape physics curricula. Nobel-grade results in 2030s. The original Feynman use case is also the most physically defensible.',
    realismCheck:
      'Doesn\'t generate revenue. But generates the validation results that legitimize the whole field. Watch the peer-reviewed physics papers, not the press releases.',
    iconColor: 'bg-indigo-500/70',
  },
  {
    slug: 'national-security',
    domain: 'National security & defense',
    oneLiner: 'Codebreaking. Stealth detection via quantum radar. Secure communications via QKD. Quantum-AI hybrid intelligence systems.',
    whyItMatters:
      'Whoever achieves cryptographically relevant quantum computing first gains an enormous intelligence advantage — they can read previously-secured adversary communications while their own are protected. This drives the largest single source of quantum R&D funding globally.',
    whatChanges:
      'Adversaries\' encrypted intelligence backlog becomes readable. Quantum sensing reveals submarines and stealth aircraft. Quantum-secured government links become the standard. Cyber capabilities asymmetric.',
    timeline:
      'Most classified. Public-track: PQC migration mandates by 2030. Quantum-enabled SIGINT: timeline opaque.',
    qubitsNeeded: 'Same as cryptography — thousands of logical qubits for Shor at RSA scale.',
    earlyWins: [
      'DARPA Quantum Benchmarking Initiative ($1B+ ambition)',
      'DOE National QIS Centers ($625M renewal Nov 2025)',
      'AFRL contracts to IonQ, Q-CTRL, Atom Computing',
      'AUKUS Pillar 2 quantum technologies',
    ],
    realPlayers: [
      'DARPA, DOE, NSA, AFRL, NRO (US)',
      'GCHQ + UK NQCC',
      'China national quantum program (15th Five-Year Plan)',
      'NATO quantum initiatives',
    ],
    bullCase:
      'National security is the largest single source of quantum revenue today (~40-50% of sector). Government funding will continue through 2035 regardless of commercial outcomes.',
    realismCheck:
      'The geopolitical implications are sobering. First-mover advantage in cryptographically-relevant quantum computing creates real, hard-to-counter intelligence asymmetry — which is part of why the US, China, and EU treat this as a strategic priority.',
    iconColor: 'bg-slate-500/70',
  },
];
