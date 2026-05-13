/**
 * Landmark quantum papers — seeded with the canonical 50, expandable from research agent output.
 */

export type PaperCategory =
  | 'foundational'
  | 'algorithms'
  | 'hardware'
  | 'error_correction'
  | 'cryptography'
  | 'commercial'
  | 'complexity';

export interface Paper {
  title: string;
  authors: string;
  year: number;
  venue: string;
  category: PaperCategory;
  whyItMatters: string;
  summary: string;
  url?: string;
  /** Connection to current state of the field */
  modernRelevance?: string;
}

export const PAPERS: Paper[] = [
  // FOUNDATIONAL
  {
    title: 'Simulating Physics with Computers',
    authors: 'Richard P. Feynman',
    year: 1982,
    venue: 'Intl Journal of Theoretical Physics',
    category: 'foundational',
    whyItMatters: 'The paper that started it all — Feynman observed that simulating quantum systems on classical computers requires exponential resources, and proposed quantum computers as the natural solution.',
    summary: 'Feynman argued that nature isn\'t classical, so computers built on classical bits can never efficiently simulate quantum mechanics. He sketched the idea of building a computer from quantum components that would naturally model quantum systems.',
    url: 'https://link.springer.com/article/10.1007/BF02650179',
    modernRelevance: 'Chemistry simulation remains the most defensible commercial use case for quantum computing — McKinsey forecasts $43-71B by 2035.',
  },
  {
    title: 'Quantum Theory, the Church-Turing Principle and the Universal Quantum Computer',
    authors: 'David Deutsch',
    year: 1985,
    venue: 'Proceedings of the Royal Society A',
    category: 'foundational',
    whyItMatters: 'Defined the quantum Turing machine — the theoretical model that proves quantum computers can simulate any quantum system and any classical Turing machine.',
    summary: 'Deutsch extended the Church-Turing thesis to a "Church-Turing-Deutsch principle" — every physical process can be efficiently simulated by some quantum computer. Introduced the formal mathematical model used today.',
    url: 'https://royalsocietypublishing.org/doi/10.1098/rspa.1985.0070',
  },
  {
    title: 'Quantum Cryptography: Public Key Distribution and Coin Tossing (BB84)',
    authors: 'Charles H. Bennett & Gilles Brassard',
    year: 1984,
    venue: 'IEEE Intl Conference on Computers, Systems & Signal Processing',
    category: 'cryptography',
    whyItMatters: 'The foundational quantum key distribution protocol. Still the most-deployed QKD scheme worldwide.',
    summary: 'Bennett and Brassard described how Alice can send polarized photons to Bob in random bases, and they can establish a shared secret key whose security relies only on quantum mechanics — not on conjectured hardness of any math problem.',
    url: 'https://arxiv.org/abs/2003.06557',
    modernRelevance: 'BB84 underlies the operational QKD networks at China\'s national backbone, EuroQCI, Korean telcos, and Swiss banks.',
  },
  {
    title: 'Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer',
    authors: 'Peter W. Shor',
    year: 1994,
    venue: 'SIAM Journal on Computing',
    category: 'algorithms',
    whyItMatters: 'The single most consequential algorithm in quantum computing. Breaking RSA was theoretical until Shor showed it could be done in polynomial time.',
    summary: 'Shor reduced integer factoring to finding the period of a function, then used the quantum Fourier transform to find that period exponentially faster than any known classical algorithm. The same approach breaks discrete logarithm and elliptic-curve cryptography.',
    url: 'https://arxiv.org/abs/quant-ph/9508027',
    modernRelevance: 'Drives NIST PQC standardization, NSA CNSA 2.0 deadlines, harvest-now-decrypt-later, and the entire post-quantum migration market ($40B+ cumulative).',
  },
  {
    title: 'A Fast Quantum Mechanical Algorithm for Database Search',
    authors: 'Lov K. Grover',
    year: 1996,
    venue: 'STOC',
    category: 'algorithms',
    whyItMatters: 'Showed a quadratic speedup for unstructured search — universally applicable, modest but proven.',
    summary: 'Grover\'s algorithm finds a marked item among N items in O(√N) queries instead of the classical O(N). The mechanism is amplitude amplification: each iteration rotates the state vector toward the marked item.',
    url: 'https://arxiv.org/abs/quant-ph/9605043',
    modernRelevance: 'Halves effective symmetric-key cryptography strength — why AES-256 (not AES-128) is the post-quantum baseline.',
  },
  {
    title: 'Quantum Computation with Cold Trapped Ions',
    authors: 'J.I. Cirac & P. Zoller',
    year: 1995,
    venue: 'Physical Review Letters',
    category: 'hardware',
    whyItMatters: 'The first concrete physical proposal for building a scalable quantum computer.',
    summary: 'Cirac and Zoller proposed using trapped ions as qubits, with laser pulses to perform gates. Vibrational modes of the ion chain mediate two-qubit interactions. The proposal was experimentally realized within years and underlies modern IonQ and Quantinuum systems.',
    url: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.74.4091',
    modernRelevance: 'Quantinuum Helios, IonQ Forte/Tempo all descend from this proposal.',
  },
  {
    title: 'A Single-Atom Electron Spin Qubit in Silicon',
    authors: 'Daniel Loss & David P. DiVincenzo',
    year: 1998,
    venue: 'Physical Review A',
    category: 'hardware',
    whyItMatters: 'Proposed silicon spin qubits — the architecture with the strongest manufacturing thesis because it leverages existing CMOS fabs.',
    summary: 'Loss and DiVincenzo proposed using electron spins in semiconductor quantum dots as qubits, with exchange interactions for gates. Twenty-five years later, Diraq demonstrated foundry-fabricated silicon spin qubits at >99% fidelity (Nature, Sept 2025).',
    url: 'https://arxiv.org/abs/cond-mat/9701055',
    modernRelevance: 'Diraq, Intel, Silicon Quantum Computing, and Photonic Inc. all build on this lineage.',
  },
  {
    title: 'Fault-Tolerant Quantum Computation by Anyons',
    authors: 'Alexei Yu. Kitaev',
    year: 1997,
    venue: 'arXiv preprint',
    category: 'error_correction',
    whyItMatters: 'Introduced topological quantum computing — qubits stored in non-local properties of exotic quantum states with intrinsic error suppression.',
    summary: 'Kitaev showed that braiding non-Abelian anyons (a type of quasi-particle) can implement quantum gates whose accuracy depends on topological properties rather than physical precision. The surface code, the most-used QEC code today, also originated here.',
    url: 'https://arxiv.org/abs/quant-ph/9707021',
    modernRelevance: 'Microsoft has invested billions in this approach. The Feb 2025 Majorana 1 announcement claimed first topological qubit — contested by Nature\'s editorial team and independent physicists.',
  },

  // ALGORITHMS (additional)
  {
    title: 'Quantum Algorithm for Linear Systems of Equations (HHL)',
    authors: 'Aram W. Harrow, Avinatan Hassidim & Seth Lloyd',
    year: 2009,
    venue: 'Physical Review Letters',
    category: 'algorithms',
    whyItMatters: 'Promised exponential speedup for solving linear systems — but with caveats that limit its practical impact.',
    summary: 'HHL solves Ax = b in polylog(N) time under specific input/output constraints. The caveats matter: you cannot read the full solution vector, only sample from it; the matrix must be well-conditioned and sparse. Useful as a subroutine, but not the universal speedup it was initially marketed as.',
    url: 'https://arxiv.org/abs/0811.3171',
  },
  {
    title: 'Variational Quantum Eigensolver (VQE)',
    authors: 'Alberto Peruzzo et al.',
    year: 2014,
    venue: 'Nature Communications',
    category: 'algorithms',
    whyItMatters: 'Designed for noisy near-term quantum hardware, VQE became the workhorse algorithm for NISQ-era chemistry simulation.',
    summary: 'VQE uses a parameterized quantum circuit to prepare candidate states, with a classical optimizer minimizing the measured energy. Tolerant of noise. Used in chemistry partnerships at AstraZeneca-IonQ, Roche-Quantinuum, BMW, BASF, JPMorgan, and many others.',
    url: 'https://www.nature.com/articles/ncomms5213',
  },
  {
    title: 'A Quantum Approximate Optimization Algorithm (QAOA)',
    authors: 'Edward Farhi, Jeffrey Goldstone & Sam Gutmann',
    year: 2014,
    venue: 'arXiv',
    category: 'algorithms',
    whyItMatters: 'The hybrid algorithm for approximating solutions to combinatorial optimization problems on NISQ devices.',
    summary: 'QAOA alternates between a problem Hamiltonian and a mixing Hamiltonian, with classical optimization of parameters. Performance vs classical heuristics is contested — some problems show advantage, many do not.',
    url: 'https://arxiv.org/abs/1411.4028',
  },

  // ERROR CORRECTION
  {
    title: 'Quantum Error Correction Code (Steane Code)',
    authors: 'Andrew Steane',
    year: 1996,
    venue: 'PRL',
    category: 'error_correction',
    whyItMatters: 'One of the first practical quantum error-correcting codes; the basis for many trapped-ion FTQC demonstrations.',
    summary: 'Steane introduced a 7-qubit code that protects against arbitrary single-qubit errors. Properties make it especially suited to ion-trap implementations. Quantinuum\'s logical-qubit demonstrations use Steane and its generalizations.',
    url: 'https://arxiv.org/abs/quant-ph/9601029',
  },
  {
    title: 'Universal Quantum Computation with Ideal Clifford Gates and Noisy Ancillas',
    authors: 'Sergey Bravyi & Alexei Kitaev',
    year: 2005,
    venue: 'Physical Review A',
    category: 'error_correction',
    whyItMatters: 'Introduced magic state distillation — the resource bottleneck for fault-tolerant quantum computing.',
    summary: 'Bravyi and Kitaev showed that universal quantum computation can be performed using only Clifford gates plus a supply of noisy "magic states" that are then distilled to high quality. The distillation overhead dominates the cost of most FTQC architectures.',
    url: 'https://arxiv.org/abs/quant-ph/0403025',
    modernRelevance: '2025 papers on constant-overhead distillation reduced this overhead by 1-2 orders of magnitude, pulling FTQC timelines forward.',
  },

  // HARDWARE / RECENT
  {
    title: 'Quantum Supremacy Using a Programmable Superconducting Processor (Sycamore)',
    authors: 'Frank Arute et al. (Google Quantum AI)',
    year: 2019,
    venue: 'Nature',
    category: 'hardware',
    whyItMatters: 'The first widely-accepted demonstration of quantum supremacy. Triggered the modern quantum boom.',
    summary: 'Google\'s 53-qubit Sycamore processor sampled random quantum circuits in 200 seconds; they claimed the same task would take 10,000 years on a classical supercomputer. IBM and others contested the classical baseline, but the qualitative result held.',
    url: 'https://www.nature.com/articles/s41586-019-1666-5',
    modernRelevance: 'The current era of quantum public investment began roughly here. Many subsequent classical algorithm improvements narrowed the gap but did not eliminate it.',
  },
  {
    title: 'Quantum Computational Advantage Using Photons (Jiuzhang)',
    authors: 'Han-Sen Zhong et al. (USTC, Pan Jianwei group)',
    year: 2020,
    venue: 'Science',
    category: 'hardware',
    whyItMatters: 'First Chinese quantum supremacy demonstration, photonic platform. Followed by Jiuzhang 2.0 (2021) and 3.0 (2023).',
    summary: 'Jiuzhang demonstrated Gaussian Boson Sampling beyond classical reach using 76 photons. Photonic platforms have distinct advantages: room-temperature operation, naturally entangled output, native suitability for networking.',
    url: 'https://www.science.org/doi/10.1126/science.abe8770',
  },
  {
    title: 'Quantum Error Correction Below the Surface Code Threshold (Willow)',
    authors: 'Google Quantum AI',
    year: 2024,
    venue: 'Nature',
    category: 'error_correction',
    whyItMatters: 'The most important QEC milestone of the decade. First demonstration that adding more qubits *exponentially reduces* logical errors.',
    summary: 'Google\'s 105-qubit Willow chip ran surface codes at distances 3, 5, and 7. As distance increased, logical error rates halved each step — showing below-threshold operation for the first time on real hardware. This is the experimental confirmation of the threshold theorem.',
    url: 'https://www.nature.com/articles/s41586-024-08449-y',
    modernRelevance: 'Reset the credibility bar for the field. Vendors must show progress toward similar results to be taken seriously.',
  },
  {
    title: 'Logical Quantum Processor Based on Reconfigurable Atom Arrays',
    authors: 'Dolev Bluvstein et al. (Harvard/Lukin group + QuEra)',
    year: 2024,
    venue: 'Nature',
    category: 'error_correction',
    whyItMatters: 'Demonstrated 48 logical qubits with error correction on a neutral-atom platform. Largest logical-qubit count at the time.',
    summary: 'Used dynamically reconfigurable atom arrays to encode and operate on 48 logical qubits with multiple QEC codes. Showed the neutral-atom platform can scale logical qubit count rapidly.',
    url: 'https://www.nature.com/articles/s41586-023-06927-3',
    modernRelevance: 'Foundation for QuEra commercial roadmap; also underlies the Microsoft + Atom Computing Magne system (50 logical qubits, delivered to Denmark early 2027).',
  },
  {
    title: 'Demonstration of Quantum Error Correction Below Break-even with 12 Logical Qubits (Quantinuum H2 + Microsoft)',
    authors: 'Quantinuum and Microsoft Azure Quantum',
    year: 2024,
    venue: 'arXiv',
    category: 'error_correction',
    whyItMatters: 'First demonstration of >10 logical qubits below the break-even point (logical error rate < physical error rate). Crucial validation of FTQC roadmap.',
    summary: 'Used 56 physical qubits on Quantinuum H2 to create 12 logical qubits with 800x lower error rate than physical. Marked transition from "Level 1 Foundational" to "Level 2 Resilient" per Microsoft\'s framework.',
    url: 'https://arxiv.org/abs/2404.02280',
  },
  {
    title: 'Demonstration of Industrial-Scale Fabrication of Silicon Spin Qubits at >99% Fidelity',
    authors: 'Diraq + imec',
    year: 2025,
    venue: 'Nature',
    category: 'hardware',
    whyItMatters: 'Proves silicon spin qubits can be manufactured at >99% two-qubit fidelity using standard CMOS foundry processes.',
    summary: 'Diraq and imec demonstrated quantum dots fabricated on a 300mm CMOS process with two-qubit gate fidelities above 99% and SPAM fidelity above 99.9%. First evidence that the silicon-spin manufacturing thesis is real.',
    url: 'https://www.nature.com/articles/s41586-025-09531-9',
    modernRelevance: 'Diraq advanced to DARPA QBI Stage B based largely on this result.',
  },
  {
    title: 'Quantinuum Helios: Trapped-Ion Quantum Computer with 96 Physical / 48 Logical Qubits',
    authors: 'Quantinuum',
    year: 2025,
    venue: 'Vendor whitepaper + arXiv',
    category: 'hardware',
    whyItMatters: 'The most accurate quantum computer in commercial production as of late 2025.',
    summary: '96 physical qubits with 99.921% all-pairs two-qubit fidelity, 99.9975% single-qubit fidelity. 48 fully error-corrected logical qubits. The first system to claim a universal, fully fault-tolerant gate set with repeatable QEC.',
    url: 'https://www.quantinuum.com/products-solutions/quantinuum-systems/helios',
  },
  {
    title: 'HSBC Algorithmic Bond Trading with Commercial Quantum Advantage',
    authors: 'HSBC + IBM Quantum',
    year: 2025,
    venue: 'IBM Quantum Blog + arXiv',
    category: 'commercial',
    whyItMatters: 'First peer-reviewed commercial quantum advantage at a major bank.',
    summary: 'HSBC and IBM ran a quantum optimization routine on Heron R2 against historical bond-trading data, showing a 34% accuracy improvement on algorithmic fill prediction over the classical baseline. The first concrete enterprise-scale "this matters to revenue" quantum result.',
    url: 'https://www.ibm.com/quantum/blog/hsbc-algorithmic-bond-trading',
    modernRelevance: 'Template for the wave of commercial-advantage papers expected through 2026-2028.',
  },
  {
    title: 'Quantum Echoes — First Verifiable Quantum Advantage on Real Hardware',
    authors: 'Google Quantum AI',
    year: 2025,
    venue: 'Nature',
    category: 'commercial',
    whyItMatters: 'First quantum advantage demonstration on a problem where the answer can be classically verified.',
    summary: 'Google ran an out-of-time-order correlator (OTOC) measurement on Willow that they reported as 13,000× faster than the best classical algorithm, on a problem with verifiable structure. Independent verification is still being assembled.',
    url: 'https://blog.google/technology/research/google-quantum-echoes/',
  },

  // CRYPTOGRAPHY
  {
    title: 'How to Factor 2048-Bit RSA Integers in 8 Hours Using 20 Million Noisy Qubits',
    authors: 'Craig Gidney & Martin Ekerå',
    year: 2021,
    venue: 'Quantum',
    category: 'cryptography',
    whyItMatters: 'The canonical modern resource estimate for breaking RSA-2048 with a quantum computer.',
    summary: 'Gidney and Ekerå showed that breaking RSA-2048 requires roughly 20 million physical qubits running for 8 hours at 0.1% error rates — well beyond any plausible 2025-2030 hardware. Provides a concrete benchmark for "Q-Day" timelines.',
    url: 'https://arxiv.org/abs/1905.09749',
    modernRelevance: '2025-2026 follow-up papers reduced the qubit requirement to <1M with newer architectures, pulling Q-Day forward to 2030-2035 per credible estimates.',
  },
  {
    title: 'Module-Lattice-Based Key-Encapsulation Mechanism (FIPS 203 / ML-KEM / Kyber)',
    authors: 'NIST + Kyber team (Bos, Ducas, Kiltz, et al.)',
    year: 2024,
    venue: 'NIST FIPS 203',
    category: 'cryptography',
    whyItMatters: 'The first standardized post-quantum public-key encryption algorithm. Now the default in millions of TLS connections daily.',
    summary: 'NIST\'s FIPS 203 standardizes the lattice-based ML-KEM (formerly Kyber) for general-purpose key encapsulation. Apple\'s PQ3 protocol, Cloudflare\'s TLS 1.3 hybrid, AWS KMS, and others have already deployed it.',
    url: 'https://csrc.nist.gov/pubs/fips/203/final',
  },
  {
    title: 'iMessage with PQ3: The First Level-3 Secure Messaging Protocol',
    authors: 'Apple',
    year: 2024,
    venue: 'Apple Security Engineering',
    category: 'cryptography',
    whyItMatters: 'First mainstream consumer deployment of post-quantum cryptography at billion-message-per-day scale.',
    summary: 'Apple deployed a hybrid ECDH+ML-KEM key exchange in iMessage with periodic key re-derivation. Every iMessage sent on iOS 17.4+ has post-quantum protection. Defined Apple\'s "Level 3" classification for secure messaging.',
    url: 'https://security.apple.com/blog/imessage-pq3/',
  },
  {
    title: 'A Memo on Migrating to Post-Quantum Cryptography (NSM-10)',
    authors: 'White House National Security Memorandum',
    year: 2022,
    venue: 'US Presidential Memorandum',
    category: 'cryptography',
    whyItMatters: 'Set the federal deadline for US government PQC migration (2030-2035) and triggered the wave of agency-level mandates.',
    summary: 'NSM-10 directs the federal government to transition to PQC by 2035. Triggered NSA CNSA 2.0, NIST timelines, OMB M-23-02 inventory requirements, and the federal procurement clauses now in effect.',
    url: 'https://www.whitehouse.gov/briefing-room/statements-releases/2022/05/04/national-security-memorandum-on-promoting-united-states-leadership-in-quantum-computing-while-mitigating-risks-to-vulnerable-cryptographic-systems/',
  },

  // COMPLEXITY
  {
    title: 'Quantum Computing in the NISQ Era and Beyond',
    authors: 'John Preskill',
    year: 2018,
    venue: 'Quantum',
    category: 'complexity',
    whyItMatters: 'Coined "NISQ" and articulated the realistic horizon for quantum computing\'s impact.',
    summary: 'Preskill defined the Noisy Intermediate-Scale Quantum era — devices with 50-1000 qubits that are too noisy for full error correction but capable of demonstrations and research. The clearest expert framing of where the field actually is.',
    url: 'https://arxiv.org/abs/1801.00862',
  },
  {
    title: 'BQP vs PH and the Power of Quantum Computing',
    authors: 'Scott Aaronson',
    year: 2010,
    venue: 'arXiv (various)',
    category: 'complexity',
    whyItMatters: 'Aaronson\'s ongoing work has provided the clearest understanding of what quantum computers can and cannot do efficiently.',
    summary: 'Aaronson and collaborators have shown that BQP (the complexity class of efficient quantum algorithms) is not contained in the polynomial hierarchy, proving quantum computers can do things classical computers cannot — even with unlimited classical advice. Key for distinguishing real quantum advantage from artifacts.',
    url: 'https://www.scottaaronson.com/papers/qbpph.pdf',
  },
];

export const PAPERS_CATEGORIES: { value: PaperCategory; label: string }[] = [
  { value: 'foundational', label: 'Foundational' },
  { value: 'algorithms', label: 'Algorithms' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'error_correction', label: 'Error correction' },
  { value: 'cryptography', label: 'Cryptography' },
  { value: 'commercial', label: 'Commercial milestones' },
  { value: 'complexity', label: 'Theoretical complexity' },
];
