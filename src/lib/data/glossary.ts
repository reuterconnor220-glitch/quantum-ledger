/**
 * Quantum glossary — seeded with high-value terms, will be expanded by the research agent.
 * 80 terms covering foundational physics, gates, algorithms, hardware, error correction,
 * performance metrics, networking, sensing, and policy/programs.
 */

export type GlossaryAudience = 'newbie' | 'intermediate' | 'advanced';

export type GlossaryCategory =
  | 'physics'
  | 'gates'
  | 'algorithms'
  | 'hardware'
  | 'error_correction'
  | 'metrics'
  | 'networking'
  | 'sensing'
  | 'crypto'
  | 'programs'
  | 'concepts';

export interface GlossaryTerm {
  term: string;
  aliases?: string[];
  category: GlossaryCategory;
  audience: GlossaryAudience;
  short: string;          // one-sentence definition
  long: string;           // 2-3 sentence intermediate explanation
  whyItMatters?: string;
  related?: string[];     // term slugs
}

function slug(t: string): string {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const RAW: GlossaryTerm[] = [
  // ======== FOUNDATIONAL PHYSICS ========
  {
    term: 'Qubit',
    aliases: ['quantum bit'],
    category: 'physics',
    audience: 'newbie',
    short: 'The quantum version of a bit — instead of being 0 or 1, it can be any blend of both at once.',
    long: 'A qubit is a two-level quantum system whose state is described by a point on the surface of a sphere (the Bloch sphere). Unlike a classical bit which is either 0 or 1, a qubit can be in any superposition. When you measure it, you get 0 or 1 with probabilities determined by where the state vector points.',
    whyItMatters: 'Qubits are the fundamental unit of quantum computing. Every quantum algorithm is a sequence of operations on a register of qubits.',
    related: ['Superposition', 'Measurement', 'Bloch sphere'],
  },
  {
    term: 'Superposition',
    category: 'physics',
    audience: 'newbie',
    short: 'A quantum state that is a combination of multiple basis states at once.',
    long: 'Superposition is the linear combination of basis states with complex amplitudes. It is not "both 0 and 1 at the same time" in any classical sense — it is a single quantum state whose amplitudes on |0⟩ and |1⟩ can be complex numbers, allowing for the interference effects that give quantum computing its power.',
    related: ['Qubit', 'Interference', 'Amplitude', 'Wave function'],
  },
  {
    term: 'Entanglement',
    category: 'physics',
    audience: 'newbie',
    short: 'When two or more qubits share a joint state that cannot be written as a product of individual states.',
    long: 'Entanglement is a uniquely quantum correlation. Measure one entangled qubit and you instantaneously know the state of the others, no matter how far apart they are. Crucially, the no-communication theorem prevents using this for faster-than-light signaling — you need a classical channel to interpret the correlations.',
    whyItMatters: 'Entanglement is a key resource for quantum algorithms, quantum teleportation, quantum key distribution, and quantum error correction. The Bell state (|00⟩+|11⟩)/√2 is the canonical example.',
    related: ['Bell state', 'CHSH inequality', 'Quantum teleportation', 'No-communication theorem'],
  },
  {
    term: 'Measurement',
    category: 'physics',
    audience: 'newbie',
    short: 'The process of reading out a quantum state, which destroys the superposition.',
    long: 'Measurement projects a quantum state onto a basis (usually the computational basis |0⟩, |1⟩). The probability of each outcome is the squared magnitude of the corresponding amplitude — the Born rule. After measurement the qubit is in a definite state and the superposition is gone, which is why measurement is sometimes called "wave function collapse."',
    related: ['Born rule', 'Wave function', 'Superposition', 'Decoherence'],
  },
  {
    term: 'Bloch sphere',
    category: 'physics',
    audience: 'intermediate',
    short: 'A geometric representation of a single-qubit state as a point on a unit sphere.',
    long: 'The north pole is |0⟩, the south pole is |1⟩, the equator is the family of equal-superposition states, and longitude encodes phase. Quantum gates correspond to rotations of the Bloch sphere — Pauli-X is a 180° rotation around the x-axis, Hadamard rotates by 180° around (x+z)/√2, and so on.',
    related: ['Qubit', 'Pauli gates', 'Hadamard gate'],
  },
  {
    term: 'Wave-particle duality',
    category: 'physics',
    audience: 'newbie',
    short: 'Quantum objects (photons, electrons, even atoms) sometimes behave like waves and sometimes like particles.',
    long: 'The double-slit experiment is the canonical demonstration: send single photons through two slits and they build up an interference pattern over time, behaving like waves. But each individual hit is a single point — particle-like. The mathematical resolution: quantum objects are described by wave functions whose squared amplitude gives probabilities for particle-like outcomes.',
    related: ['Double-slit experiment', 'Wave function', 'Interference'],
  },
  {
    term: 'Double-slit experiment',
    category: 'physics',
    audience: 'newbie',
    short: 'Fire single photons through two slits; they build up an interference pattern. The single most famous experiment in quantum mechanics.',
    long: 'When you fire light through two slits, you get a wave interference pattern on the screen behind. Even if you fire single photons one at a time, the pattern still emerges from random-looking hits. But the moment you measure which slit each photon takes, the interference vanishes — measurement physically changes the experiment.',
    whyItMatters: 'Feynman called this "the only mystery" in quantum mechanics. Every quantum algorithm exploits the same kind of interference between possible computational paths.',
    related: ['Wave-particle duality', 'Interference', 'Measurement'],
  },
  {
    term: 'Interference',
    category: 'physics',
    audience: 'newbie',
    short: 'When two probability amplitudes add — they can reinforce (constructive) or cancel (destructive).',
    long: 'Classical probabilities are always positive and can only add. Quantum amplitudes are complex numbers, so they can cancel. Every quantum algorithm is fundamentally an interference engine: the circuit is designed so paths leading to wrong answers cancel and paths leading to right answers reinforce.',
    related: ['Amplitude', 'Superposition', 'Algorithms'],
  },
  {
    term: 'Decoherence',
    category: 'physics',
    audience: 'intermediate',
    short: 'The process by which a qubit loses its quantum properties through interaction with the environment.',
    long: 'Decoherence is the central engineering problem of quantum computing. Two timescales matter: T1 (relaxation, the qubit falls from |1⟩ to |0⟩) and T2 (dephasing, the relative phase between |0⟩ and |1⟩ randomizes). T2 is usually shorter and binds your circuit depth.',
    related: ['T1', 'T2', 'Coherence time'],
  },
  {
    term: 'Bell state',
    category: 'physics',
    audience: 'intermediate',
    short: 'Maximally entangled two-qubit states. The textbook example is (|00⟩ + |11⟩)/√2.',
    long: 'There are four Bell states, all maximally entangled. Created by applying a Hadamard to one qubit and then a CNOT between them. Measuring one Bell-state qubit instantly determines the other — perfect correlation that survives no matter how far apart you take them.',
    related: ['Entanglement', 'CNOT', 'Hadamard gate'],
  },
  {
    term: 'No-cloning theorem',
    category: 'physics',
    audience: 'intermediate',
    short: 'You cannot make an exact copy of an arbitrary unknown qubit.',
    long: 'A direct consequence of the linearity of quantum mechanics. The theorem has profound implications: it enables provably secure quantum key distribution (an eavesdropper cannot copy keys without disturbing them), but it makes quantum error correction much harder than classical (you cannot simply make redundant copies).',
    related: ['Quantum key distribution', 'Quantum error correction'],
  },
  {
    term: 'Wave function',
    aliases: ['state vector'],
    category: 'physics',
    audience: 'intermediate',
    short: 'The mathematical object that fully describes a quantum system\'s state.',
    long: 'For a single qubit, the wave function is |ψ⟩ = α|0⟩ + β|1⟩ where α and β are complex amplitudes satisfying |α|² + |β|² = 1. For n qubits, the wave function lives in a 2^n-dimensional complex Hilbert space — this exponential scaling is the resource quantum computing tries to harness.',
    related: ['Hilbert space', 'Amplitude', 'Born rule'],
  },
  {
    term: 'Born rule',
    category: 'physics',
    audience: 'advanced',
    short: 'The probability of measuring a quantum state in a particular outcome is the squared magnitude of the corresponding amplitude.',
    long: 'P(outcome i) = |⟨i|ψ⟩|² for a state |ψ⟩ measured in a basis containing |i⟩. The Born rule is the bridge between the deterministic wave-function evolution (the Schrödinger equation) and the probabilistic outcomes we observe.',
    related: ['Measurement', 'Wave function'],
  },
  {
    term: 'Hilbert space',
    category: 'physics',
    audience: 'advanced',
    short: 'The mathematical space in which quantum states live. For n qubits, it has 2^n complex dimensions.',
    long: 'A complete inner-product vector space over the complex numbers. The exponential dimension scaling (2^n for n qubits) is why classical simulation of large quantum systems is intractable — you would need 2^300 complex numbers to write down the state of 300 qubits.',
    related: ['Wave function', 'Tensor product'],
  },
  {
    term: 'Amplitude',
    aliases: ['probability amplitude'],
    category: 'physics',
    audience: 'intermediate',
    short: 'A complex number whose squared magnitude gives a probability.',
    long: 'In quantum mechanics, you compute probabilities by adding amplitudes (with complex weights), then taking the squared magnitude. Because amplitudes can be negative or complex, they can cancel — this is interference and it has no classical analog.',
    related: ['Interference', 'Born rule', 'Wave function'],
  },

  // ======== GATES & CIRCUITS ========
  {
    term: 'Quantum gate',
    category: 'gates',
    audience: 'newbie',
    short: 'A reversible operation that changes the state of qubits.',
    long: 'Quantum gates are unitary matrices (norm-preserving, reversible). Single-qubit gates rotate the Bloch sphere; multi-qubit gates can create entanglement. A small "universal" set like {Hadamard, T, CNOT} can approximate any quantum operation.',
    related: ['Hadamard gate', 'CNOT', 'Pauli gates', 'Universal gate set'],
  },
  {
    term: 'Hadamard gate',
    aliases: ['H gate'],
    category: 'gates',
    audience: 'intermediate',
    short: 'The canonical superposition-generating gate. H|0⟩ = (|0⟩+|1⟩)/√2.',
    long: 'Hadamard takes a definite state and puts it into equal superposition. Applied to multiple qubits at once it creates the uniform superposition over all basis states — the first step of nearly every quantum algorithm.',
    related: ['Superposition', 'Quantum gate'],
  },
  {
    term: 'CNOT',
    aliases: ['controlled-NOT'],
    category: 'gates',
    audience: 'intermediate',
    short: 'Two-qubit gate that flips the second (target) qubit if the first (control) qubit is |1⟩.',
    long: 'The simplest entangling gate. Combined with single-qubit rotations it forms a universal gate set. Applied after a Hadamard, it creates the Bell state — the canonical demonstration of entanglement.',
    related: ['Entanglement', 'Bell state', 'Quantum gate'],
  },
  {
    term: 'Pauli gates',
    aliases: ['X gate', 'Y gate', 'Z gate'],
    category: 'gates',
    audience: 'intermediate',
    short: 'Three fundamental single-qubit gates: X (bit flip), Z (phase flip), Y (both).',
    long: 'X is the quantum NOT — it flips |0⟩ to |1⟩ and vice versa. Z leaves |0⟩ alone but flips the sign of |1⟩ (a "phase flip"). Y is the product of X and Z. All three correspond to 180° rotations on the Bloch sphere.',
    related: ['Quantum gate', 'Bloch sphere'],
  },
  {
    term: 'T gate',
    category: 'gates',
    audience: 'advanced',
    short: 'A single-qubit phase gate that adds e^(iπ/4) to the |1⟩ component. The "hard" gate in fault-tolerant computing.',
    long: 'T gates are necessary for universal quantum computation but cannot be implemented transversally in most error-correcting codes. They require magic state distillation — an expensive process that often dominates the resource cost of fault-tolerant quantum computers.',
    related: ['Magic state distillation', 'Clifford+T set'],
  },
  {
    term: 'Quantum circuit',
    category: 'gates',
    audience: 'newbie',
    short: 'A sequence of quantum gates applied to a register of qubits, drawn left-to-right.',
    long: 'Each horizontal wire is one qubit; gate boxes sit on wires and represent operations applied in time order. Circuit depth (longest path) determines how many gate-times you need; circuit width is qubit count. Most useful quantum algorithms need moderate depth and tens-to-hundreds of qubits.',
    related: ['Quantum gate', 'Depth', 'Width'],
  },

  // ======== ALGORITHMS ========
  {
    term: "Shor's algorithm",
    category: 'algorithms',
    audience: 'newbie',
    short: 'Quantum algorithm that factors large integers in polynomial time — the original "quantum breaks RSA" result.',
    long: 'Peter Shor\'s 1994 algorithm reduces factoring to finding the period of a function, then uses the quantum Fourier transform to find that period exponentially faster than any known classical algorithm. Breaking RSA-2048 requires roughly thousands of logical qubits — current credible estimates put a working CRQC at 2030+.',
    whyItMatters: 'Shor\'s algorithm is why NIST standardized post-quantum cryptography in 2024 and why harvest-now-decrypt-later is a serious threat today.',
    related: ['Quantum Fourier transform', 'Post-quantum cryptography', 'Harvest-now-decrypt-later'],
  },
  {
    term: "Grover's algorithm",
    category: 'algorithms',
    audience: 'newbie',
    short: 'Quadratic speedup for unstructured search: find a needle in N items in √N steps.',
    long: 'Grover\'s 1996 algorithm uses amplitude amplification to rotate the state vector toward the marked item with each iteration. The optimal number of iterations is ~π/(4·√N). Grover provides a universal but modest speedup — for cryptography it means symmetric key lengths effectively halve, which is why AES-256 (not AES-128) is the post-quantum baseline.',
    related: ['Amplitude amplification', 'AES'],
  },
  {
    term: 'Quantum Fourier transform',
    aliases: ['QFT'],
    category: 'algorithms',
    audience: 'advanced',
    short: 'The quantum analog of the discrete Fourier transform, running in O(n²) gate time vs O(n·2^n) classically.',
    long: 'The QFT transforms amplitudes between the computational basis and the frequency basis. It is the key subroutine in Shor\'s algorithm and quantum phase estimation. Despite its name, the QFT does not directly speed up classical Fourier transforms because you can only sample the output, not read it directly.',
    related: ["Shor's algorithm", 'Quantum phase estimation'],
  },
  {
    term: 'Variational Quantum Eigensolver',
    aliases: ['VQE'],
    category: 'algorithms',
    audience: 'intermediate',
    short: 'Hybrid classical-quantum algorithm for finding the lowest energy state of a molecule or material.',
    long: 'VQE uses a parameterized quantum circuit to prepare candidate states; a classical optimizer tunes the parameters to minimize the measured energy. Designed for NISQ-era hardware (relatively shallow circuits, noise-tolerant). Used in chemistry and materials simulation pilots at AstraZeneca, Roche, BMW, BASF, and others.',
    related: ['Quantum simulation', 'NISQ'],
  },
  {
    term: 'QAOA',
    aliases: ['Quantum Approximate Optimization Algorithm'],
    category: 'algorithms',
    audience: 'intermediate',
    short: 'Variational algorithm for approximate solutions to combinatorial optimization problems.',
    long: 'QAOA alternates between a problem Hamiltonian and a mixing Hamiltonian, with classical optimization of the alternation depth and angles. Performance is contested — many problems show no advantage over classical heuristics. Most actively studied for graph problems and portfolio optimization.',
    related: ['Variational Quantum Eigensolver', 'Combinatorial optimization'],
  },
  {
    term: 'Magic state distillation',
    category: 'algorithms',
    audience: 'advanced',
    short: 'The process for producing the high-quality magic states needed to perform non-Clifford gates in fault-tolerant quantum computing.',
    long: 'Most quantum error-correcting codes support Clifford gates transversally (cheaply) but require magic state distillation to implement T gates. Distillation consumes many low-quality magic states to produce few high-quality ones, and historically dominated the resource cost of FTQC. 2025 results on constant-overhead distillation reduced the cost by 1-2 orders of magnitude.',
    related: ['T gate', 'Fault-tolerant quantum computing', 'Clifford+T set'],
  },

  // ======== HARDWARE ========
  {
    term: 'Superconducting qubit',
    aliases: ['transmon'],
    category: 'hardware',
    audience: 'intermediate',
    short: 'Qubit made from a Josephson junction in a microwave resonator, operating at millikelvin temperatures.',
    long: 'The dominant modality by qubit count and ecosystem maturity. IBM, Google, Rigetti, and IQM use superconducting qubits. Gates are fast (~10-100 ns) but coherence is short (~100-300 µs). Requires dilution refrigerators to operate.',
    related: ['Josephson junction', 'Dilution refrigerator', 'Cryostat'],
  },
  {
    term: 'Trapped ion',
    category: 'hardware',
    audience: 'intermediate',
    short: 'Qubit encoded in the electronic states of individual atomic ions held in electromagnetic traps.',
    long: 'Used by IonQ, Quantinuum, and Oxford Ionics. Features the highest gate fidelities in the industry (99.99%+ on best systems) and long coherence times (seconds). Gates are slow (~microseconds to milliseconds) but precise. All-to-all connectivity within a single trap.',
    related: ['Paul trap', 'Quantinuum', 'IonQ'],
  },
  {
    term: 'Neutral atom',
    category: 'hardware',
    audience: 'intermediate',
    short: 'Qubit encoded in atomic states (typically rubidium, cesium, or strontium) held in optical tweezers.',
    long: 'Used by Atom Computing, QuEra, Pasqal, and Infleqtion. Atoms are reconfigurable via the tweezers — connectivity is flexible. Strong coherence (seconds), moderate gate speeds, and rapid scaling: Pasqal hit 1,000 qubits in 2024 and Atom Computing demonstrated arrays of 1,180 atoms.',
    related: ['Optical tweezer', 'Rydberg atom'],
  },
  {
    term: 'Photonic qubit',
    category: 'hardware',
    audience: 'intermediate',
    short: 'Qubit encoded in properties of individual photons (polarization, path, or time bin).',
    long: 'Used by PsiQuantum (silicon photonics, GlobalFoundries-fabricated), Xanadu (continuous-variable), and Quandela. Operates at near-room-temperature (no dilution refrigerator), and naturally suited to quantum networking. Probabilistic gates require massive resource overhead — a trade-off PsiQuantum is betting on with their utility-scale architecture.',
    related: ['PsiQuantum', 'Xanadu', 'Quantum networking'],
  },
  {
    term: 'Topological qubit',
    aliases: ['Majorana zero mode'],
    category: 'hardware',
    audience: 'advanced',
    short: 'Hypothetical qubit encoded in non-Abelian anyons that would have intrinsic hardware-level error suppression.',
    long: 'Microsoft has invested billions in this approach. The Feb 2025 Majorana 1 announcement claimed first topological-qubit operation, but Nature\'s editorial team noted the evidence "does not represent evidence" for the underlying claim, and independent physicists (Scott Aaronson, multiple lab heads) have publicly disputed it. Validation status: contested.',
    whyItMatters: 'If real, topological qubits dramatically reduce the overhead for fault-tolerant computing. If not, Microsoft\'s parallel Atom Computing partnership is the operational hedge.',
    related: ['Microsoft Majorana', 'Fault-tolerant quantum computing'],
  },
  {
    term: 'Silicon spin qubit',
    category: 'hardware',
    audience: 'advanced',
    short: 'Qubit encoded in the spin of an electron or nucleus in silicon — the modality with the strongest manufacturing thesis.',
    long: 'Used by Diraq, Intel, Silicon Quantum Computing, and Photonic Inc. The appeal: silicon spin qubits can be fabricated in standard CMOS foundries, leveraging the trillion-dollar semiconductor industry. Diraq demonstrated foundry-compatible spin qubits at >99% two-qubit fidelity in Nature (Sept 2025).',
    related: ['Diraq', 'CMOS'],
  },
  {
    term: 'Dilution refrigerator',
    category: 'hardware',
    audience: 'intermediate',
    short: 'Cryogenic device that cools superconducting qubits to ~10 millikelvin (colder than deep space).',
    long: 'Required for superconducting, silicon spin, and some neutral-atom approaches. Manufactured by Bluefors (Finland/US), Oxford Instruments (UK), and Janis. Helium-3 supply chain is a critical chokepoint — current global production is partially supplied by US weapon decommissioning and a recent lunar-mining commitment (Interlune).',
    related: ['Superconducting qubit', 'Helium-3'],
  },
  {
    term: 'Josephson junction',
    category: 'hardware',
    audience: 'advanced',
    short: 'The basic building block of a superconducting qubit — two superconductors separated by an insulating layer.',
    long: 'A Josephson junction supports a supercurrent that depends nonlinearly on the phase difference across the junction. This nonlinearity creates the anharmonicity needed to isolate two specific energy levels as a qubit.',
    related: ['Superconducting qubit'],
  },

  // ======== ERROR CORRECTION ========
  {
    term: 'Quantum error correction',
    aliases: ['QEC'],
    category: 'error_correction',
    audience: 'intermediate',
    short: 'Encoding one "logical" qubit across many physical qubits so errors can be detected and corrected without destroying the encoded information.',
    long: 'QEC is fundamentally harder than classical error correction because of the no-cloning theorem — you cannot just make redundant copies. The trick is syndrome measurements that reveal information about errors without measuring the encoded state itself. Common codes include the surface code (most-used), Steane code, color codes, and modern qLDPC codes.',
    related: ['Logical qubit', 'Physical qubit', 'Surface code', 'Syndrome measurement', 'Threshold theorem'],
  },
  {
    term: 'Logical qubit',
    category: 'error_correction',
    audience: 'newbie',
    short: 'An error-corrected qubit encoded across many physical qubits, with dramatically lower error rates.',
    long: 'A logical qubit might use 100-1,000 physical qubits depending on the code and the target error rate. The whole point: logical error rates can be orders of magnitude lower than physical, making long computations possible. "Useful quantum computing" generally requires hundreds to thousands of logical qubits.',
    related: ['Physical qubit', 'Quantum error correction', 'Fault-tolerant quantum computing'],
  },
  {
    term: 'Physical qubit',
    category: 'error_correction',
    audience: 'newbie',
    short: 'The raw, noisy qubits in the device — what you actually build.',
    long: 'Physical qubits have error rates of ~10⁻³ to 10⁻⁴ today (99.9% to 99.99% gate fidelity). For useful computing they must be combined via QEC into logical qubits. The ratio is the "physical-to-logical overhead" and is the central engineering challenge of FTQC.',
    related: ['Logical qubit', 'Quantum error correction'],
  },
  {
    term: 'Surface code',
    category: 'error_correction',
    audience: 'advanced',
    short: 'The most-used quantum error-correcting code, based on a 2D lattice of qubits.',
    long: 'Pioneered by Kitaev, Bravyi, and others. Tolerates a relatively high physical error rate (~1%) which makes it attractive for hardware. Google\'s 2024 Willow demonstration was the first to show below-threshold operation: increasing code distance from 3 to 5 to 7 cut errors approximately in half each step.',
    related: ['Quantum error correction', 'Threshold theorem', 'Google Willow'],
  },
  {
    term: 'qLDPC codes',
    aliases: ['quantum low-density parity-check codes'],
    category: 'error_correction',
    audience: 'advanced',
    short: 'A class of quantum codes that promise much lower physical-to-logical overhead than surface codes.',
    long: 'qLDPC codes have constant-rate properties — you can encode many logical qubits in fewer physical qubits than surface codes require. IBM\'s 2029 Starling roadmap depends on qLDPC codes implemented via "c-couplers" between modules.',
    related: ['Surface code', 'Quantum error correction'],
  },
  {
    term: 'Threshold theorem',
    category: 'error_correction',
    audience: 'advanced',
    short: 'If physical gate error rates are below a certain threshold (~1% for surface code), arbitrarily long quantum computations become possible at polylogarithmic overhead.',
    long: 'The theorem (Aharonov-Ben-Or, 1996) is the theoretical foundation of fault-tolerant quantum computing. Below the threshold, the cost of computing scales polylogarithmically with the target error rate; above it, errors compound and useful computing is impossible. Modern systems are crossing this threshold for the first time.',
    related: ['Quantum error correction', 'Fault-tolerant quantum computing'],
  },
  {
    term: 'Fault-tolerant quantum computing',
    aliases: ['FTQC'],
    category: 'error_correction',
    audience: 'intermediate',
    short: 'Quantum computing that can run arbitrarily long algorithms with errors controlled, by combining error correction with fault-tolerant gate constructions.',
    long: 'FTQC requires (1) physical error rates below threshold, (2) fault-tolerant gate constructions so errors don\'t cascade, and (3) magic state distillation for non-Clifford gates. The realistic horizon for useful FTQC is 2028-2032 per most credible roadmaps. Aggressive vendor claims of "FTQC by 2030" should be discounted 12-24 months.',
    related: ['Quantum error correction', 'Magic state distillation', 'Logical qubit'],
  },
  {
    term: 'NISQ',
    aliases: ['Noisy Intermediate-Scale Quantum'],
    category: 'error_correction',
    audience: 'intermediate',
    short: 'The current era of quantum computing — devices with 50-1000 qubits that are too noisy for full error correction.',
    long: 'Term coined by John Preskill in 2018. NISQ devices can demonstrate quantum advantage on contrived problems and provide research utility, but cannot run useful fault-tolerant algorithms. The transition out of the NISQ era is happening now — early-2026 logical-qubit demonstrations mark the first crossings into the FTQC era.',
    related: ['Quantum advantage', 'Fault-tolerant quantum computing'],
  },
  {
    term: 'Quantum supremacy',
    category: 'error_correction',
    audience: 'intermediate',
    short: 'When a quantum computer performs a calculation classical computers cannot, even if the task isn\'t useful.',
    long: 'Coined by John Preskill. Google claimed quantum supremacy with Sycamore in 2019 (random circuit sampling). USTC followed with Jiuzhang. These are benchmark demonstrations, not useful computations — the term has largely been retired in favor of "quantum advantage" and "quantum utility."',
    related: ['Quantum advantage', 'Quantum utility'],
  },
  {
    term: 'Quantum advantage',
    category: 'error_correction',
    audience: 'intermediate',
    short: 'When a quantum computer outperforms classical for a problem someone cares about.',
    long: 'Stronger than "supremacy" because the task must matter. Google\'s October 2025 "Quantum Echoes" paper claimed the first verifiable quantum advantage; IBM and others are pursuing analogous results. HSBC\'s November 2025 paper on bond-trading optimization was the first peer-reviewed commercial-domain advantage at a major bank.',
    related: ['Quantum supremacy', 'Quantum utility'],
  },

  // ======== METRICS ========
  {
    term: 'T1',
    aliases: ['relaxation time'],
    category: 'metrics',
    audience: 'intermediate',
    short: 'How long a qubit stays in its excited state |1⟩ before decaying to |0⟩.',
    long: 'T1 measures energy relaxation. Typical superconducting qubits have T1 of 100-300 µs; trapped ions have effectively infinite T1 for the qubit transitions used. Modern Willow chips report ~100 µs T1.',
    related: ['T2', 'Coherence time', 'Decoherence'],
  },
  {
    term: 'T2',
    aliases: ['dephasing time', 'coherence time'],
    category: 'metrics',
    audience: 'intermediate',
    short: 'How long a qubit\'s phase coherence is preserved — usually the binding constraint on circuit depth.',
    long: 'T2 measures dephasing (loss of quantum phase information). Always ≤ 2·T1. The number of operations you can run before noise wins is approximately gate-time ÷ T2. Trapped ions reach seconds; superconducting hits ~100-200 µs; neutral atoms can exceed 1 second with dynamical decoupling.',
    related: ['T1', 'Decoherence', 'Coherence time'],
  },
  {
    term: 'Gate fidelity',
    category: 'metrics',
    audience: 'newbie',
    short: 'How accurately a quantum gate performs the intended operation. The single most important hardware metric.',
    long: 'At 99% two-qubit gate fidelity you can run ~100 gates before random noise dominates. At 99.99% you can run ~10,000. The threshold for fault-tolerant computing is roughly 99.9%; the threshold for low-overhead FTQC is ~99.99%. Quantinuum Helios is industry-leading at 99.921% on all pairs.',
    related: ['SPAM fidelity', 'Quantum error correction'],
  },
  {
    term: 'SPAM fidelity',
    aliases: ['State Preparation and Measurement'],
    category: 'metrics',
    audience: 'intermediate',
    short: 'The combined accuracy of preparing the initial state and reading out the final measurement.',
    long: 'SPAM errors compound with gate errors but are often the largest single contributor to total error in shallow circuits. Quantinuum Helios achieves 99.8% SPAM; trapped-ion systems generally lead.',
    related: ['Gate fidelity', 'Measurement'],
  },
  {
    term: 'Quantum volume',
    aliases: ['QV'],
    category: 'metrics',
    audience: 'advanced',
    short: 'A composite metric for quantum computer performance: 2^n where n is the largest random circuit that can be run with passing fidelity.',
    long: 'Introduced by IBM in 2017. QV combines qubit count, fidelity, and connectivity into a single number. Quantinuum H2 reached QV 2^25 (~33 million). IBM has since deprecated QV in favor of "layer fidelity"; Google never adopted QV. Useful for comparison only within similar architectures.',
    related: ['CLOPS', 'Algorithmic qubits'],
  },
  {
    term: 'CLOPS',
    aliases: ['Circuit Layer Operations Per Second'],
    category: 'metrics',
    audience: 'advanced',
    short: 'IBM\'s throughput metric for quantum processors.',
    long: 'Measures how many quantum circuit layers can be executed per second, including the classical overhead of submission, compilation, and result handling. IBM Heron R2 reports 330,000 CLOPS. Measures speed only, not accuracy — a 0%-fidelity computer can have high CLOPS.',
    related: ['Quantum volume', 'Layer fidelity'],
  },
  {
    term: 'Algorithmic qubits',
    aliases: ['#AQ'],
    category: 'metrics',
    audience: 'advanced',
    short: 'IonQ\'s quality metric — the largest algorithm size from the QED-C benchmark suite that runs with passing accuracy.',
    long: '#AQ 64 means IonQ Tempo can successfully run all 64-qubit-scale algorithms from the QED-C application benchmarks. Combines fidelity, connectivity, and error mitigation into one application-oriented number. Less vendor-neutral than QV but more useful for "what can I actually run."',
    related: ['Quantum volume'],
  },

  // ======== NETWORKING / SENSING ========
  {
    term: 'Quantum key distribution',
    aliases: ['QKD'],
    category: 'networking',
    audience: 'intermediate',
    short: 'A protocol that uses quantum physics to distribute cryptographic keys with provable security.',
    long: 'BB84 (Bennett-Brassard 1984) is the canonical protocol. QKD relies on the no-cloning theorem: an eavesdropper cannot copy quantum states without disturbing them. Deployed in China\'s national 12,000 km backbone, EuroQCI, and Korean/Swiss bank networks. NSA does not recommend QKD for US National Security Systems — they mandate post-quantum cryptography instead.',
    related: ['BB84', 'No-cloning theorem', 'Post-quantum cryptography'],
  },
  {
    term: 'BB84',
    category: 'networking',
    audience: 'intermediate',
    short: 'The first quantum key distribution protocol, proposed by Bennett and Brassard in 1984.',
    long: 'Alice sends single photons polarized in random bases; Bob measures in random bases; they publicly compare bases (but not values) and keep the matching ones as a shared secret key. Any eavesdropper introduces detectable errors. Most deployed QKD systems use BB84 or a close variant.',
    related: ['Quantum key distribution', 'No-cloning theorem'],
  },
  {
    term: 'Post-quantum cryptography',
    aliases: ['PQC'],
    category: 'crypto',
    audience: 'newbie',
    short: 'Classical cryptographic algorithms designed to resist attack by quantum computers.',
    long: 'PQC runs on classical hardware but uses mathematical problems (lattice, hash-based, code-based) that quantum computers do not efficiently solve. NIST standardized the first three PQC algorithms (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA) in August 2024. Apple iMessage, Cloudflare TLS, and AWS KMS already use them.',
    related: ['ML-KEM', 'ML-DSA', 'Harvest-now-decrypt-later'],
  },
  {
    term: 'ML-KEM',
    aliases: ['Kyber', 'FIPS 203'],
    category: 'crypto',
    audience: 'advanced',
    short: 'NIST\'s standardized key-encapsulation algorithm for the post-quantum era — based on the Module Learning With Errors problem.',
    long: 'Replaces RSA and Diffie-Hellman key exchange. Standardized as FIPS 203 in August 2024. Performance is excellent — comparable to or faster than RSA. Deployed at Cloudflare, Apple, AWS, Microsoft, and Google.',
    related: ['Post-quantum cryptography', 'Lattice cryptography'],
  },
  {
    term: 'Harvest-now-decrypt-later',
    aliases: ['HNDL'],
    category: 'crypto',
    audience: 'newbie',
    short: 'Adversaries collecting encrypted data now in expectation of decrypting it later with a quantum computer.',
    long: 'The most immediate quantum security threat. Anything you encrypt with RSA or ECC today that needs to remain secret for 10+ years is at risk. Drives the urgency of PQC migration. NSA and Federal Reserve papers explicitly cite HNDL as the operational threat motivating CNSA 2.0 deadlines.',
    related: ['Post-quantum cryptography', 'CNSA 2.0', 'Q-Day'],
  },
  {
    term: 'Q-Day',
    aliases: ['Y2Q'],
    category: 'crypto',
    audience: 'intermediate',
    short: 'The hypothetical day a cryptographically relevant quantum computer (CRQC) is announced.',
    long: 'Expert surveys (Global Risk Institute) place the median Q-Day at roughly 2032-2035, with significant probability mass earlier. The first publicly-attributed RSA-2048 break may come from a state actor and may be announced years after it actually happened, complicating "Q-Day" as a single event.',
    related: ['Cryptographically relevant quantum computer', 'Harvest-now-decrypt-later'],
  },
  {
    term: 'Cryptographically relevant quantum computer',
    aliases: ['CRQC'],
    category: 'crypto',
    audience: 'advanced',
    short: 'A quantum computer capable of running Shor\'s algorithm on real-world cryptographic key sizes.',
    long: 'Breaking RSA-2048 requires roughly thousands of error-corrected logical qubits, or ~20 million high-quality physical qubits per Gidney-Ekerå. No CRQC exists today. Credible estimates: 2030-2035 for the first government-scale CRQC; consumer-scale impact later.',
    related: ['Q-Day', "Shor's algorithm"],
  },
  {
    term: 'Quantum sensing',
    category: 'sensing',
    audience: 'newbie',
    short: 'Using quantum effects to measure physical quantities (magnetic field, gravity, time, position) at sensitivity beyond classical limits.',
    long: 'Includes atomic clocks (optical and microwave), gravimeters, magnetometers (OPM, NV-diamond), and inertial sensors. The most commercially mature quantum line — already deployed in defense PNT, medical brain imaging, and resource exploration. Sub-$1B market today, growing 14-23% CAGR.',
    related: ['Atomic clock', 'OPM', 'NV-diamond'],
  },
  {
    term: 'NV-center',
    aliases: ['nitrogen-vacancy diamond'],
    category: 'sensing',
    audience: 'intermediate',
    short: 'A defect in diamond — a nitrogen atom adjacent to a vacancy — that acts as a room-temperature quantum sensor or qubit.',
    long: 'NV centers are the basis of room-temperature magnetometers (SBQuantum, Bosch) and Quantum Brilliance\'s room-temperature quantum computer prototypes. Highly sensitive to magnetic fields, useful for navigation magnetometry and biomedical imaging.',
    related: ['Quantum sensing', 'Quantum Brilliance'],
  },
  {
    term: 'Optical clock',
    category: 'sensing',
    audience: 'intermediate',
    short: 'A clock using laser transitions in atoms — 100× more precise per decade than cesium fountain clocks.',
    long: 'Vector Atomic, Infleqtion, and Muquans/Exail produce commercial rackmount optical clocks. Expected to redefine the SI second within a few years. Deployed in defense PNT, telecom timing, and time-distribution networks. Royal Navy demonstrated the first quantum optical clock on a submarine in 2025.',
    related: ['Quantum sensing', 'PNT'],
  },

  // ======== PROGRAMS ========
  {
    term: 'DARPA QBI',
    aliases: ['Quantum Benchmarking Initiative'],
    category: 'programs',
    audience: 'intermediate',
    short: 'The most credible independent technical audit in quantum computing — DARPA assesses whether a vendor can deliver useful quantum computing by 2033.',
    long: '11 companies advanced to Stage B in November 2025 (Atom Computing, Diraq, IBM, IonQ, Nord Quantique, Photonic Inc., Quantinuum, Quantum Motion, QuEra, Silicon Quantum Computing, Xanadu). Stage C selections in Q4 2026 are the single most important industry catalyst this year. PsiQuantum and Microsoft continue in the parallel US2QC final phase.',
    related: ['DARPA US2QC'],
  },
  {
    term: 'NSA CNSA 2.0',
    aliases: ['Commercial National Security Algorithm Suite 2.0'],
    category: 'programs',
    audience: 'intermediate',
    short: 'NSA\'s mandated post-quantum algorithm suite for National Security Systems.',
    long: 'Requires new NSS acquisitions to be CNSA 2.0 compliant by January 1, 2027. All deployed NSS software/firmware must use CNSA 2.0 signatures by 2030. Withhold of FedRAMP and ATO authority is the enforcement mechanism.',
    related: ['Post-quantum cryptography', 'NSM-10'],
  },
  {
    term: 'NIST PQC',
    category: 'programs',
    audience: 'intermediate',
    short: 'NIST\'s decade-long post-quantum cryptography standardization process.',
    long: 'NIST evaluated 82 submissions starting in 2017, finalizing FIPS 203 (ML-KEM), 204 (ML-DSA), and 205 (SLH-DSA) in August 2024. HQC selected as a fifth algorithm in March 2025 for diversification against lattice cryptanalysis risk. Additional non-lattice signature schemes under evaluation through 2027-2028.',
    related: ['Post-quantum cryptography', 'ML-KEM'],
  },
  {
    term: 'AUKUS Pillar 2',
    category: 'programs',
    audience: 'intermediate',
    short: 'The trilateral US-UK-Australia framework for sharing advanced military technologies, including quantum.',
    long: 'AUKUS Quantum Arrangement (AQuA) is the quantum-specific sub-program. Includes joint development of GPS-denied PNT (Royal Navy submarine optical clock, Q-CTRL Ironstone Opal). ITAR exemptions for certified AUKUS entities operational by mid-decade.',
    related: ['Quantum sensing', 'PNT'],
  },
];

export const GLOSSARY: GlossaryTerm[] = RAW.map((t) => ({ ...t }));

export function termSlug(term: string): string {
  return slug(term);
}

export const GLOSSARY_CATEGORIES: { value: GlossaryCategory; label: string }[] = [
  { value: 'physics', label: 'Foundational physics' },
  { value: 'gates', label: 'Gates & circuits' },
  { value: 'algorithms', label: 'Algorithms' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'error_correction', label: 'Error correction' },
  { value: 'metrics', label: 'Performance metrics' },
  { value: 'networking', label: 'Networking' },
  { value: 'sensing', label: 'Sensing' },
  { value: 'crypto', label: 'Cryptography' },
  { value: 'programs', label: 'Programs' },
  { value: 'concepts', label: 'Concepts' },
];
