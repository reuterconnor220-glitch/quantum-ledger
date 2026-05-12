export interface Risk {
  slug: string;
  title: string;
  category: 'security' | 'geopolitical' | 'financial' | 'societal' | 'technical';
  impact: 1 | 2 | 3 | 4 | 5;       // 1=minor, 5=catastrophic
  likelihood: 1 | 2 | 3 | 4 | 5;   // 1=unlikely, 5=already happening
  timeline: string;
  description: string;
  whoBears: string;
  mitigations: string[];
  watchSignal: string;
}

export const RISKS: Risk[] = [
  {
    slug: 'harvest-now-decrypt-later',
    title: 'Harvest-now-decrypt-later (HNDL)',
    category: 'security',
    impact: 4,
    likelihood: 5,
    timeline: 'Already happening',
    description:
      'Adversaries — state and non-state — are actively collecting encrypted traffic and stored data today, with the expectation of decrypting it once cryptographically relevant quantum computers exist. Anything you encrypt with RSA or ECC today and that needs to remain secret for 10+ years is at risk. The threat is real and ongoing, not theoretical.',
    whoBears:
      'Anyone with long-lived secrets: governments (intelligence, defense), critical infrastructure, banks, healthcare records, IP-heavy companies, individual high-value targets.',
    mitigations: [
      'Migrate to NIST PQC algorithms (ML-KEM, ML-DSA, SLH-DSA) finalized August 2024',
      'Hybrid TLS — classical + PQ key exchange in transit',
      'Crypto-agility: design systems to swap algorithms cheaply',
      'Inventory cryptographic assets (CISA + OMB M-23-02 requirements)',
    ],
    watchSignal: 'CISA quarterly product-category updates (post EO 14306). FIPS 140-2 sunset Sept 21, 2026 forces a wave of re-validations.',
  },
  {
    slug: 'geopolitical-asymmetry',
    title: 'First-mover intelligence asymmetry',
    category: 'geopolitical',
    impact: 5,
    likelihood: 3,
    timeline: '2030–2035',
    description:
      'The first nation or coalition to achieve cryptographically relevant quantum computing gains an enormous, hard-to-counter intelligence advantage. They can decrypt years of stockpiled adversary communications while their own remain protected (if they\'ve migrated to PQC). This creates a stability-altering imbalance — analogous to the early-1940s atomic asymmetry, but in cyberspace.',
    whoBears: 'Every government, every critical infrastructure operator, every multinational corporation.',
    mitigations: [
      'International cooperation on PQC migration timelines',
      'Allied quantum R&D pooling (AUKUS Pillar 2, EU Quantum Flagship)',
      'Export controls on quantum components (already active — China sanctions, rare earth restrictions)',
      'Cryptographic resilience — assume your adversary is 5 years ahead',
    ],
    watchSignal: 'Watch DARPA QBI Stage C decisions (Q4 2026); China\'s 15th Five-Year Plan progress; major sovereign quantum facility openings.',
  },
  {
    slug: 'capital-bubble',
    title: 'Capital misallocation & hype bubble',
    category: 'financial',
    impact: 3,
    likelihood: 4,
    timeline: '2025–2028 risk window',
    description:
      'The sector raised $11.1B in cumulative private capital plus $30-40B in government commitments against ~$1.0-1.5B of annual revenue. Public pure-plays trade at multiples that imply near-term commercial utility that may not arrive. If a credible logical-qubit timeline slips into the 2030s, capital markets lose patience. Most companies in the current cohort end up at zero or acquired for IP.',
    whoBears: 'Retail investors in quantum stocks. Public-market pure-plays with weak fundamentals. Smaller private companies dependent on the next round.',
    mitigations: [
      'Track Stage advancement (DARPA QBI) as a credibility filter independent of revenue narratives',
      'Watch the burn-to-revenue ratio — anything >10× requires patience capital',
      'Diversify across modalities — no single approach has won',
      'Read 10-Q filings rather than press releases',
    ],
    watchSignal: 'Quantinuum IPO pricing (the comp anchor). Xanadu post-listing share-overhang dynamics. Stage C survivors vs eliminations Q4 2026.',
  },
  {
    slug: 'hyperscaler-centralization',
    title: 'Hyperscaler & sovereign centralization',
    category: 'societal',
    impact: 3,
    likelihood: 4,
    timeline: '2027–2032',
    description:
      'A small number of organizations — IBM, Google, AWS, Azure, NVIDIA, plus sovereign programs in US/China/EU — will likely control the bulk of useful quantum capacity. Access becomes gated. Academic researchers may be priced out. Small businesses pay a premium. The "cloud" era of compute power concentration repeats with starker dynamics because the capital requirements are 100× higher.',
    whoBears: 'Academic researchers, small businesses, developing economies, open-source community.',
    mitigations: [
      'Free academic access programs (IBM Quantum Network has 350+ institutions)',
      'Open-source quantum software stacks (Qiskit, Cirq, PennyLane)',
      'Public infrastructure investments (UK NQCC, EU EuroHPC)',
      'Regulatory antitrust attention before lock-in',
    ],
    watchSignal: 'Pricing models from major quantum cloud platforms as they scale; export control regimes; academic access policies.',
  },
  {
    slug: 'verification-problem',
    title: 'Verification problem',
    category: 'technical',
    impact: 2,
    likelihood: 4,
    timeline: 'Already present',
    description:
      'When a quantum computer outputs an answer, how do you check it without another quantum computer? Some quantum problems (factoring, certain optimizations) are checkable classically — you can verify factors by multiplying them. But many quantum-advantage tasks (random circuit sampling, certain simulations) are not classically checkable at scale. This creates an audit and trust gap for high-stakes applications.',
    whoBears: 'Regulators, auditors, anyone relying on quantum outputs for high-stakes decisions (medical, financial, defense).',
    mitigations: [
      'Choose verifiable algorithms where possible',
      'Hybrid classical-quantum validation (run partial classical bounds)',
      'Cross-vendor reproducibility — same problem, different hardware',
      'DARPA QBI and similar programs explicitly evaluate verifiability',
    ],
    watchSignal: 'NIST standards for quantum output verification; first regulatory framework treating quantum outputs (FDA, SEC, etc.).',
  },
  {
    slug: 'quackery',
    title: 'Quantum misinformation & quackery',
    category: 'societal',
    impact: 2,
    likelihood: 5,
    timeline: 'Already widespread',
    description:
      'The word "quantum" has been hijacked by wellness, healing, and supplement marketing since long before any quantum computer existed. As real quantum computing becomes mainstream, the misinformation tax grows: false claims about quantum healing, quantum jewelry, quantum supplements, quantum financial astrology. Worse, real quantum-computing results get distorted in popular media — "quantum supremacy" gets reported as "quantum AI will replace humans."',
    whoBears: 'The general public, science journalism integrity, scientifically literate buyers.',
    mitigations: [
      'Insist on credentialed sources for quantum claims',
      'Apply scientific skepticism to "quantum" marketing language',
      'Promote good science journalism (Quanta Magazine, IEEE Spectrum, Quantum Country)',
      'FTC enforcement on deceptive quantum claims',
    ],
    watchSignal: 'Major news cycle distortions of quantum results; FTC actions on quantum-branded products.',
  },
  {
    slug: 'dual-use-export',
    title: 'Dual-use technology & export controls',
    category: 'geopolitical',
    impact: 3,
    likelihood: 5,
    timeline: 'Already happening',
    description:
      'Quantum hardware is increasingly subject to export controls. The US and allies restrict sales of high-performance dilution refrigerators, control electronics, and specialty optics. China responds with rare-earth export restrictions. The global quantum research community fragments along geopolitical lines, slowing overall progress and creating supply chain vulnerabilities.',
    whoBears: 'Researchers needing international collaboration, supply-chain-exposed companies, allied programs depending on Chinese rare earths.',
    mitigations: [
      'Diversify supply chains (heavy rare earths, dilution fridges, lasers)',
      'Allied-only research consortiums',
      'Domestic rare-earth refining (Mountain Pass, Lynas)',
      'Strategic stockpiling of key materials',
    ],
    watchSignal: 'New BIS export-control rules on quantum equipment; Chinese rare-earth licensing actions; allied trade agreement updates.',
  },
  {
    slug: 'defense-acceleration',
    title: 'Defense acceleration & arms race',
    category: 'geopolitical',
    impact: 4,
    likelihood: 3,
    timeline: '2026–2032',
    description:
      'Quantum sensing for stealth detection, quantum-AI adversarial training, quantum-secured comms networks all have offensive applications. As capabilities mature, the major powers face arms-race dynamics: defensive postures become offensive postures, and a "Cuban missile crisis" analog around critical-infrastructure-grade quantum decryption is plausible.',
    whoBears: 'Global stability, critical infrastructure operators, civilian populations in geopolitical hot zones.',
    mitigations: [
      'Transparency about non-offensive use cases',
      'Track-2 diplomatic channels between major quantum powers',
      'Cryptographic agreements analogous to arms control',
      'Civilian-led standardization bodies (NIST, ETSI, ISO)',
    ],
    watchSignal: 'Major defense procurement announcements; public quantum-sensor field trials; cyber incidents attributed to quantum capabilities.',
  },
  {
    slug: 'job-displacement',
    title: 'Cryptography workforce displacement',
    category: 'societal',
    impact: 2,
    likelihood: 4,
    timeline: '2026–2032',
    description:
      'The cryptography workforce — security engineers, cryptographers, compliance specialists — faces a one-time, decade-long retraining requirement. Old RSA/ECC expertise becomes obsolete; new lattice-based, hash-based, and code-based crypto becomes the standard. While this also *creates* jobs in PQC migration, the transition is uneven and painful for those who don\'t reskill.',
    whoBears: 'Security professionals, IT teams, compliance specialists, cryptography academics whose specialties become legacy.',
    mitigations: [
      'Investment in retraining and certification programs',
      'University curriculum updates (already in progress at major CS departments)',
      'PQC migration creates net new employment',
      'Industry/government partnership on workforce development (CISA, NICE)',
    ],
    watchSignal: 'Job posting trends for "PQC engineer"; NICE workforce framework updates; major university curriculum announcements.',
  },
  {
    slug: 'industry-disruption',
    title: 'Industry-level disruption',
    category: 'societal',
    impact: 3,
    likelihood: 3,
    timeline: '2030–2040',
    description:
      'Pharma, chemicals, materials, and financial services face quantum-driven disruption. Big incumbents may be displaced by quantum-native players if they don\'t adapt; conversely, incumbents with quantum partnerships (AstraZeneca + IonQ, BMW + Quantinuum) consolidate their advantages. Smaller players without quantum access face commoditization. The pattern resembles cloud-era disruption but with larger capital barriers.',
    whoBears: 'Mid-tier players in pharma, materials, chemicals, finance who lack scale to invest. Eventually, consumers who face concentrated supplier power.',
    mitigations: [
      'Cloud-based quantum access for mid-tier R&D teams',
      'Industry consortia (QED-C, Q-NEXT) democratize access',
      'Antitrust attention to vertical integration in quantum',
      'Open algorithms and benchmarks reduce information asymmetry',
    ],
    watchSignal: 'M&A activity between quantum companies and traditional incumbents; mid-tier R&D budget shifts; first quantum-discovered commercial drug or material.',
  },
];
