import Link from 'next/link';

export const metadata = {
  title: 'Use Cases · The Seven Lines of Quantum Technology',
  description: '"Quantum" is shorthand for seven distinct technology lines — computing, sensing, communications, post-quantum cryptography, simulation, metrology, materials. Different physics, vendors, customers, revenue, and timelines.',
};

interface Line {
  slug: string;
  name: string;
  oneLiner: string;
  status: 'shipping' | 'pilot' | 'research';
  statusLabel: string;
  revenueTier: '$100M+' | '$10M-100M' | '<$10M' | 'pre-revenue';
  marketSize2026: string;
  marketForecast: string;
  iconColor: string;
  useCases: { title: string; description: string }[];
  topVendors: string[];
  vendors: string;
  timeline: string;
  honestAssessment: string;
  keyDebate: string;
  sources: { label: string; url: string }[];
}

const LINES: Line[] = [
  {
    slug: 'computing',
    name: 'Quantum Computing',
    oneLiner: 'Machines that exploit superposition, entanglement, and interference of qubits to perform calculations intractable for classical hardware.',
    status: 'pilot',
    statusLabel: 'Pilot → early commercial',
    revenueTier: '$100M+',
    marketSize2026: '$1.5–2.5B',
    marketForecast: '$43–71B by 2035 (McKinsey)',
    iconColor: 'bg-accent-quantum',
    useCases: [
      { title: 'Chemistry & materials simulation', description: 'Pharma lead screening, catalyst design, battery electrolyte modeling. Native problem fit — closest to commercial advantage.' },
      { title: 'Combinatorial optimization', description: 'Logistics, portfolio construction, network routing. D-Wave bookings +471% QoQ on annealing workloads.' },
      { title: 'Finance — Monte Carlo & risk', description: 'JPMorgan demonstrated 100× runtime reduction in option pricing on a 127-qubit chip; HSBC commercial advantage paper (Nov 2025).' },
      { title: 'Quantum machine learning', description: 'Kernel methods, generative models. Promising but unproven advantage on real-world benchmarks.' },
      { title: 'Cryptanalysis (Shor)', description: 'Eventually breaks RSA/ECC. Requires ~thousands of logical qubits — 2030+ horizon.' },
    ],
    topVendors: ['IonQ ($187M TTM)', 'Quantinuum ($31M, pending IPO)', 'D-Wave ($25M)', 'Rigetti ($7M)', 'IBM Quantum', 'Google Quantum AI', 'PsiQuantum', 'Quera', 'Pasqal', 'Atom Computing'],
    vendors: '32 tracked companies on the /companies page',
    timeline: 'Narrow advantage 2026–2028 in chemistry & optimization. Broad commercial utility 2028–2032. FTQC cryptanalytic scale 2030s.',
    honestAssessment: 'Real revenue ($300M–500M industry-wide in pure hardware/services) but public valuations imply 2030s outcomes. The valuation gap is the central tension in the sector.',
    keyDebate: 'Who survives the 2027–2029 valuation reset? IonQ, Quantinuum, and an IBM-affiliated structure are the most defensible answers today.',
    sources: [
      { label: 'McKinsey QC Monitor 2026', url: 'https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/mckinsey-quantum-technology-monitor-2026-a-commercial-tipping-point' },
      { label: 'IBM Hardware Roadmap', url: 'https://www.ibm.com/quantum/hardware' },
    ],
  },
  {
    slug: 'sensing',
    name: 'Quantum Sensing',
    oneLiner: 'Devices using quantum states of atoms, ions, electrons, or NV defects in diamond to measure magnetic, gravitational, inertial, and rotational fields at precision far beyond classical sensors.',
    status: 'shipping',
    statusLabel: 'Shipping at scale today',
    revenueTier: '$10M-100M',
    marketSize2026: '$0.86–1.1B',
    marketForecast: '$7–10B by 2035',
    iconColor: 'bg-accent-data',
    useCases: [
      { title: 'GPS-denied PNT (defense)', description: 'Atom interferometers + optical clocks bound inertial drift when GPS is jammed/spoofed. Pentagon issued $2.7B in PNT-related contracts since 2024. Q-CTRL won A$38M DARPA RoQS.' },
      { title: 'Underwater navigation', description: 'Infleqtion Tiqker optical clock deployed on Royal Navy Excalibur autonomous submarine (2025) — first quantum optical clock at sea.' },
      { title: 'Medical imaging (OPM-MEG, MCG)', description: 'Cerca Magnetics: 19 OPM-MEG systems shipped to 12 countries; £3.8M Series A April 2026; clinical approval for epilepsy, MS, Parkinson\'s, dementia.' },
      { title: 'Anti-submarine warfare', description: 'Quantum magnetometers detect submarine hull magnetic signatures at sensitivities 100B× below a compass. China demonstrated drone-mounted CPT magnetometers in 2025.' },
      { title: 'Gravimetry — resources & infrastructure', description: 'Exail/Muquans absolute quantum gravimeters at 10⁻⁸ m/s² precision; deployed for volcanic monitoring on Etna, geothermal exploration, oil/gas reservoir monitoring.' },
    ],
    topVendors: ['Q-CTRL (~$170M raised)', 'Infleqtion (NYSE: INFQ, $29M FY25)', 'Vector Atomic', 'AOSense', 'Exail/Muquans', 'SBQuantum', 'Cerca Magnetics', 'Quantum Brilliance', 'Bosch Quantum Sensing'],
    vendors: 'Defense primes (Lockheed, Northrop, BAE, Thales) also building in-house',
    timeline: 'Defense PNT in operational fleets 2027–2030. Clinical OPM-MEG reimbursement 2027–2029. Mineral/oil gravimetry expansion 2026–2028. Standoff bio/chem detection: research-stage.',
    honestAssessment: 'The only quantum line with material recurring revenue today. Atomic clocks, gravimeters, OPM-MEG are real product sales. Real, growing 14–23% CAGR — but the TAM is bounded by defense and specialty industrial markets, not transformative-scale like computing.',
    keyDebate: 'Will civilian markets (medical imaging, civilian PNT) scale enough to make sensing competitive with computing for sector revenue, or stay defense-anchored?',
    sources: [
      { label: 'CSIS — Quantum Sensing and Future Warfare', url: 'https://www.csis.org/analysis/quantum-sensing-and-future-warfare-five-essential-reforms-stay-competitive' },
      { label: 'DARPA RoQS program', url: 'https://www.darpa.mil/research/programs/roqs-robust-quantum-sensors' },
    ],
  },
  {
    slug: 'communications',
    name: 'Quantum Communications',
    oneLiner: 'Single photons or entangled photon pairs distributing cryptographic keys (QKD) or establishing entanglement between distant nodes for physics-secured comms and distributed computing.',
    status: 'pilot',
    statusLabel: 'Pilot — at scale in China',
    revenueTier: '$10M-100M',
    marketSize2026: '$0.6B',
    marketForecast: '$2.6B by 2030 (32% CAGR)',
    iconColor: 'bg-accent-warn',
    useCases: [
      { title: 'Government & military secure comms', description: 'China\'s national QCN (12,000 km, 145 nodes, 80 cities, integrated with Jinan-1 satellite). EuroQCI, South Korea, Singapore, France.' },
      { title: 'Inter-data-center key distribution', description: 'Toshiba/NEC/NICT demonstrated multiplexed QKD over IOWN all-photonics architecture (July 2025).' },
      { title: 'Financial bank-to-bank links', description: 'Settlement-corridor QKD live in Switzerland, Singapore, Tokyo, London.' },
      { title: 'Satellite QKD', description: 'Micius legacy, Jinan-1, planned LEO constellations (QuantumCTek, SpeQtral, Arqit).' },
      { title: 'Distributed quantum computing', description: 'NYU/Qunnect/Cisco demonstrated multi-point entangled signal linking across deployed NYC telecom fiber (April 2026). DARPA QuANET reached 0.7 ms / 6.8 Mbps in real-time optimization tests.' },
    ],
    topVendors: ['Toshiba (mature)', 'ID Quantique (now IonQ subsidiary, $250M acq)', 'QuantumCTek (China leader)', 'QuintessenceLabs', 'KETS Quantum', 'Qunnect', 'Aliro', 'Arqit'],
    vendors: 'Bifurcated US vs China markets',
    timeline: 'Carrier-grade QKD already operational in China, EU, Asia gov nets. Useful entanglement distribution over telecom fiber at scale: 5–10 years out. Quantum internet pilots in 5–10 cities by 2032.',
    honestAssessment: 'Real revenue exists, but outside China and select gov/financial nets, commercial QKD revenue is small. The NSA explicitly does NOT recommend QKD for National Security Systems — CNSA 2.0 mandates PQC algorithms only. This US-China policy split is the central strategic question.',
    keyDebate: 'PQC vs QKD: substitutes or complements? NSA says alternatives. China and parts of Europe invest in both. Western investors must take a view.',
    sources: [
      { label: 'PostQuantum.com — China QKD Networks', url: 'https://postquantum.com/quantum-networks/china-quantum-networking-qkd/' },
      { label: 'DARPA QuANET', url: 'https://www.darpa.mil/research/programs/quantum-augmented-network' },
    ],
  },
  {
    slug: 'pqc',
    name: 'Post-Quantum Cryptography',
    oneLiner: 'Classical mathematical algorithms (lattice-based, hash-based, code-based) designed to resist attack by future quantum computers. PQC is software on classical hardware — categorically different from quantum communications.',
    status: 'shipping',
    statusLabel: 'Mandated migration in progress',
    revenueTier: '$100M+',
    marketSize2026: '~$1B',
    marketForecast: '$40B+ cumulative migration spend through 2035',
    iconColor: 'bg-accent-down',
    useCases: [
      { title: 'Federal & military system migration', description: 'NSM-10, CNSA 2.0 (Jan 2027 NSS deadline), UK NCSC, BSI Germany, ANSSI France. SandboxAQ holds 5-year DoD migration contract.' },
      { title: 'Consumer messaging', description: 'Apple PQ3 (iOS 17.4+) — first Level 3 secure messaging. Signal PQXDH (Level 2). Billions of messages now post-quantum.' },
      { title: 'Internet TLS', description: 'Cloudflare runs largest production PQC deployment — >50% of human traffic uses ML-KEM hybrid TLS by default. AWS KMS, Microsoft SymCrypt, Google Chrome.' },
      { title: 'Financial transaction security', description: 'SWIFT, Visa, Mastercard, major banks running crypto-agility inventories and pilots. FIPS 140-2 sunset Sept 21, 2026 forces HSM re-validation wave.' },
      { title: 'Healthcare records & IoT', description: 'Long-life data and embedded devices are highest-priority migration targets given harvest-now-decrypt-later threat.' },
    ],
    topVendors: ['SandboxAQ ($950M raised, Alphabet spinoff)', 'PQShield ($63M, IP licensed into silicon)', 'IBM Quantum Safe', 'AWS', 'Microsoft', 'Cisco', 'Entrust', 'Thales', 'DigiCert', 'Crypto4A', 'ID Quantique', 'QuSecure'],
    vendors: 'Both pure-plays and hyperscalers',
    timeline: 'NIST FIPS 203/204/205 finalized Aug 2024. NSA CNSA 2.0 deadline Jan 2027. NIST IR 8547 deprecation by 2030, removal by 2035. Apple PQ3 + Cloudflare hybrid TLS already live.',
    honestAssessment: 'PQC is the most certain, largest near-term revenue line in "quantum." The migration is mandated, the standards are set, and deployment is underway at hyperscaler scale. It is also the line most loosely connected to actual quantum hardware.',
    keyDebate: 'Will the long tail of legacy systems (industrial control, embedded devices, satellites with 20+ year service lives) get migrated by the 2035 deadline, or do we live with cryptographic-instability events?',
    sources: [
      { label: 'NIST PQC Project', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography' },
      { label: 'Apple iMessage PQ3', url: 'https://security.apple.com/blog/imessage-pq3/' },
    ],
  },
  {
    slug: 'simulation',
    name: 'Quantum Simulation',
    oneLiner: 'Specialized programmable quantum hardware (most commonly neutral-atom Rydberg arrays or trapped ions in analog mode) configured to emulate another quantum system\'s Hamiltonian — solving the problem quantum mechanics was best suited for.',
    status: 'pilot',
    statusLabel: 'Scientific advantage today; commercial 2026–2029',
    revenueTier: '<$10M',
    marketSize2026: '~$50M',
    marketForecast: 'Bundled into computing market by 2030',
    iconColor: 'bg-violet-500',
    useCases: [
      { title: 'Condensed matter physics', description: 'Frustrated magnetism, spin liquids, lattice gauge theories, high-Tc superconductivity simulation.' },
      { title: 'Materials discovery', description: 'Magnetic and catalytic materials, novel battery chemistries — direct emulation of crystal Hamiltonians.' },
      { title: 'Quantum chemistry', description: 'Molecular ground states for pharma and catalysis at scales beyond classical exact methods.' },
      { title: 'High-energy physics', description: 'Lattice QCD analog simulation. Sign-problem regimes inaccessible to classical Monte Carlo.' },
      { title: 'Optimization on Rydberg', description: 'QAOA-style graph problems mapped directly to Rydberg-blockade geometries (Pasqal, QuEra).' },
    ],
    topVendors: ['QuEra (Aquila on AWS Braket; AIST Japan)', 'Pasqal (1,000Q in 2024, 10K target 2026; Orion in Germany/France/Italy)', 'Atom Computing (Microsoft-partnered)', 'Google (March 2026 neutral-atom Boulder program)'],
    vendors: 'Customers: national labs, academic HPC centers, pharma/chemicals/finance pilots',
    timeline: 'Scientific advantage demonstrated already. Commercial-grade materials discovery 2026–2029. Blurs with computing — most simulation vendors also pursuing gate-based FTQC.',
    honestAssessment: 'The most academically defensible "quantum advantage" candidate because the physics matches the problem. Revenue is tens of millions across the segment — small, but the path to scientific impact is shorter than for general computing.',
    keyDebate: 'Should simulation be marketed as a distinct line, or as the highest-confidence near-term application of quantum computing?',
    sources: [
      { label: 'Pasqal 2025 Roadmap', url: 'https://www.pasqal.com/newsroom/pasqal-releases-2025-roadmap/' },
      { label: 'QuEra Neutral Atom Platform', url: 'https://www.quera.com/neutral-atom-platform' },
    ],
  },
  {
    slug: 'metrology',
    name: 'Quantum Metrology',
    oneLiner: 'Precision measurement of physical quantities (time, frequency, length, fundamental constants) at the quantum limit, with optical atomic clocks as the flagship technology.',
    status: 'shipping',
    statusLabel: 'Shipping; narrow but real',
    revenueTier: '<$10M',
    marketSize2026: 'Narrow niche',
    marketForecast: 'Bundled within sensing',
    iconColor: 'bg-blue-500',
    useCases: [
      { title: 'GNSS resilience & assured PNT', description: 'On-platform optical clocks bound inertial drift when GPS is denied — orders of magnitude better than crystal oscillators.' },
      { title: 'Data-center sync & 5G/6G timing', description: 'Femtosecond synchronization for distributed compute, coherent radar, time-sensitive networking.' },
      { title: 'Coherent radar & EW', description: 'Phase stability across long apertures and bistatic radar networks.' },
      { title: 'Tests of fundamental physics', description: 'Variation of fundamental constants, dark matter searches, geodesy at cm scale, gravitational waves beyond LIGO.' },
      { title: 'Time/frequency distribution', description: 'Backbone of NIST, USNO, PTB national time services. Optical clocks redefine the SI second imminently.' },
    ],
    topVendors: ['Vector Atomic (Evergreen-30 rackmount)', 'Infleqtion (Tiqker DoD contract 2025)', 'Oscilloquartz', 'Microchip (CSAC heritage)', 'Muquans/Exail', 'NPL/Teledyne'],
    vendors: 'National labs + defense primes + telecom carriers',
    timeline: 'Optical clocks already 100× better than cesium fountains per decade. Briefcase-sized commercial units shipping now. Will redefine SI second within years.',
    honestAssessment: 'The quietest revenue producer in quantum — a real, growing defense/telecom market with narrow customer concentration. Mostly a high-margin specialty business, not a transformative-TAM story.',
    keyDebate: 'Whether optical-clock economics break consumer/automotive scale, or stay a defense-anchored specialty.',
    sources: [
      { label: 'IEEE Spectrum — Briefcase Optical Clocks', url: 'https://spectrum.ieee.org/optical-atomic-clocks' },
      { label: 'Infleqtion Tiqker', url: 'https://infleqtion.com/tiqker/' },
    ],
  },
  {
    slug: 'materials',
    name: 'Quantum Materials & Foundational Research',
    oneLiner: 'Not a product line per se — the upstream R&D substrate enabling every other line. Topological materials, superconductors, 2D materials, NV centers, photonic chips.',
    status: 'research',
    statusLabel: 'Pre-revenue · option value',
    revenueTier: 'pre-revenue',
    marketSize2026: 'R&D budgets',
    marketForecast: 'Dominated by national programs',
    iconColor: 'bg-text-muted',
    useCases: [
      { title: 'Topological qubits', description: 'Microsoft Majorana 1 (Feb 2025) — claimed but contested. If validated, would compress FTQC timeline by years.' },
      { title: 'High-Tc superconductors', description: 'The Fermi-Hubbard problem; quantum simulation may explain mechanism before classical discovery.' },
      { title: 'NV-diamond magnetometers', description: 'Element Six supply chain; enables SBQuantum and others. Better films → better sensors.' },
      { title: 'Photonic integrated circuits', description: 'PsiQuantum (GlobalFoundries Fab 8), Xanadu — chip-scale photonics enabling room-temp quantum systems.' },
      { title: 'Spin-photon interfaces', description: 'Photonic Inc. T-centers in silicon — required for distributed quantum computing.' },
    ],
    topVendors: ['Microsoft (Majorana program — contested)', 'Element Six (NV diamond)', 'IBM Research', 'Google Research', 'CNRS, RIKEN, USTC'],
    vendors: 'National lab dominated — US NQI, EU Quantum Flagship, China 15FYP',
    timeline: 'Pre-revenue. Option value: a topological breakthrough or new room-temperature superconductor would re-rate the entire stack.',
    honestAssessment: 'This is upstream R&D, not a revenue category. Investors should track it for option value. The Microsoft Majorana bet is a multi-billion-dollar speculation that, if validated, would compress every fault-tolerance timeline by years. As of May 2026, Nature\'s editorial team concluded the Microsoft paper "does not represent evidence" for the topological qubit claim.',
    keyDebate: 'Microsoft Majorana — real breakthrough or expensive misdirection? The next 24 months should provide independent replication or refutation.',
    sources: [
      { label: 'Microsoft Majorana 1', url: 'https://azure.microsoft.com/en-us/blog/quantum/2025/02/19/microsoft-unveils-majorana-1-the-worlds-first-quantum-processor-powered-by-topological-qubits/' },
      { label: 'Nature — Topological qubit claim lacks evidence', url: 'https://www.nature.com/articles/d41586-025-00829-2' },
    ],
  },
];

const STATUS_COLOR = {
  shipping: 'bg-accent-data/15 text-accent-data border-accent-data/40',
  pilot: 'bg-accent-warn/15 text-accent-warn border-accent-warn/40',
  research: 'bg-text-muted/15 text-text-muted border-text-muted/40',
};

export const revalidate = 86400;

export default function UseCasesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
          <p className="eyebrow mb-3">The seven lines</p>
          <h1 className="font-display text-display-1 font-medium tracking-tight max-w-4xl">
            &quot;Quantum&quot; is seven different technologies.
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-3xl">
            The word covers at least seven distinct lines, each with its own physics, vendors, customers,
            revenue profile, and timeline. Quantum computing dominates headlines and capital flows, but
            it is neither the largest revenue-generating line today nor the closest to broad commercial
            deployment. This page maps the full landscape.
          </p>
        </div>
      </section>

      {/* Summary table */}
      <section className="border-b border-border bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
          <p className="eyebrow mb-4">At a glance · all seven lines</p>
          <div className="card overflow-x-auto">
            <table className="ql-table min-w-[900px]">
              <thead>
                <tr>
                  <th className="pl-5">Line</th>
                  <th>Status</th>
                  <th>2026 Revenue Tier</th>
                  <th>2026 Market</th>
                  <th>2035 Forecast</th>
                  <th className="pr-5">Honest Read</th>
                </tr>
              </thead>
              <tbody>
                {LINES.map((l) => (
                  <tr key={l.slug}>
                    <td className="pl-5">
                      <a href={`#${l.slug}`} className="block group">
                        <div className="font-sans text-text-primary font-medium group-hover:text-accent-quantum flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${l.iconColor}`} />
                          {l.name}
                        </div>
                      </a>
                    </td>
                    <td>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm border ${STATUS_COLOR[l.status]}`}>
                        {l.statusLabel}
                      </span>
                    </td>
                    <td className="text-text-primary font-mono">{l.revenueTier}</td>
                    <td className="text-text-secondary text-xs">{l.marketSize2026}</td>
                    <td className="text-text-secondary text-xs">{l.marketForecast}</td>
                    <td className="text-text-secondary text-xs pr-5 font-sans max-w-[280px]">
                      <span className="italic">{l.keyDebate.slice(0, 110)}…</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Per-line deep dives */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        {LINES.map((l, i) => (
          <article key={l.slug} id={l.slug} className="mb-20 scroll-mt-20">
            <header className="mb-5">
              <div className="flex items-center gap-3 mb-3">
                <span className={`flex-shrink-0 w-4 h-4 rounded-full ${l.iconColor}`} />
                <p className="text-xs font-mono uppercase tracking-wider text-text-muted">Line {i + 1} of 7</p>
                <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm border ${STATUS_COLOR[l.status]}`}>
                  {l.statusLabel}
                </span>
              </div>
              <h2 className="font-display text-4xl font-medium tracking-tight">{l.name}</h2>
              <p className="mt-4 text-lg text-text-primary leading-relaxed italic border-l-2 border-accent-quantum/40 pl-5">
                {l.oneLiner}
              </p>
            </header>

            {/* Market stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden mb-6">
              <Stat label="Revenue tier (2026)" value={l.revenueTier} />
              <Stat label="Market 2026" value={l.marketSize2026} />
              <Stat label="2035 forecast" value={l.marketForecast} />
              <Stat label="Maturity" value={l.statusLabel} />
            </div>

            {/* Top use cases */}
            <div className="mb-6">
              <p className="eyebrow mb-3">Top use cases</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {l.useCases.map((uc, idx) => (
                  <div key={idx} className="card p-4">
                    <p className="font-medium text-text-primary text-sm leading-tight">{uc.title}</p>
                    <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendors */}
            <div className="mb-6">
              <p className="eyebrow mb-3">Leading vendors</p>
              <div className="card p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {l.topVendors.map((v, vi) => (
                    <span key={vi} className="text-xs font-mono px-2 py-1 bg-bg-elevated rounded-sm text-text-secondary">
                      {v}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-text-muted italic mt-2">{l.vendors}</p>
              </div>
            </div>

            {/* Bottom rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="card p-4">
                <p className="eyebrow mb-2">Timeline</p>
                <p className="text-sm text-text-secondary leading-relaxed">{l.timeline}</p>
              </div>
              <div className="card p-4 border-l-2 border-l-accent-warn">
                <p className="eyebrow text-accent-warn mb-2">Honest assessment</p>
                <p className="text-sm text-text-secondary leading-relaxed">{l.honestAssessment}</p>
              </div>
            </div>

            <div className="card p-4 border-l-2 border-l-accent-quantum mb-6">
              <p className="eyebrow text-accent-quantum mb-2">Key debate to follow</p>
              <p className="text-sm text-text-primary leading-relaxed">{l.keyDebate}</p>
            </div>

            {/* Sources */}
            <div className="flex flex-wrap gap-3 text-xs">
              {l.sources.map((s, si) => (
                <a key={si} href={s.url} target="_blank" rel="noreferrer" className="text-accent-quantum hover:underline font-mono">
                  {s.label} ↗
                </a>
              ))}
            </div>

            {i < LINES.length - 1 && <hr className="mt-12 border-border" />}
          </article>
        ))}
      </section>

      {/* Cross-cutting */}
      <section className="border-t border-border bg-bg-surface/30">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
          <p className="eyebrow mb-2">Cross-cutting</p>
          <h2 className="font-display text-3xl tracking-tight mb-6">
            How the seven lines interact
          </h2>
          <ul className="space-y-4 text-text-secondary leading-relaxed">
            <li>
              <strong className="text-text-primary">Atomic clocks feed both sensing and networking.</strong>{' '}
              Time-distribution precision underwrites coherent radar, inter-DC sync, and entanglement-distribution
              timing for the quantum internet.
            </li>
            <li>
              <strong className="text-text-primary">Quantum networking enables distributed quantum computing.</strong>{' '}
              A million-qubit machine is more plausible as networked clusters than as a single monolithic chip — this
              is why hyperscalers fund both.
            </li>
            <li>
              <strong className="text-text-primary">Materials are the bottleneck for computing AND sensing.</strong>{' '}
              Better NV-diamond films improve magnetometers and quantum memory simultaneously; topological materials
              would change qubit overhead by orders of magnitude.
            </li>
            <li>
              <strong className="text-text-primary">PQC and QKD are partial substitutes, not stack-mates.</strong>{' '}
              NSA treats them as alternatives; China and parts of Europe treat them as complements. Investor positioning
              must take a view.
            </li>
            <li>
              <strong className="text-text-primary">Sensing revenue funds the computing thesis at defense primes.</strong>{' '}
              Lockheed, Northrop, BAE, Thales, Leonardo build quantum sensing into existing defense platforms now and use
              those programs to keep optionality on quantum computing.
            </li>
          </ul>

          <h3 className="font-display text-2xl tracking-tight mt-10 mb-4">
            Which lines are actually profitable today?
          </h3>
          <div className="card overflow-x-auto">
            <table className="ql-table min-w-[600px]">
              <thead>
                <tr>
                  <th className="pl-5">Line</th>
                  <th className="pr-5">2026 commercial status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="pl-5">PQC</td><td className="pr-5 text-text-secondary text-xs">Real revenue, hyperscaler deployment, mandated migration. SandboxAQ profitable at unit level on enterprise/gov contracts.</td></tr>
                <tr><td className="pl-5">Quantum sensing</td><td className="pr-5 text-text-secondary text-xs">Real product revenue across defense PNT, medical OPM-MEG, resource gravimetry. Sub-$1B but growing 14–23% CAGR.</td></tr>
                <tr><td className="pl-5">Quantum metrology</td><td className="pr-5 text-text-secondary text-xs">Real revenue, narrow customer base. Optical clocks now shipping commercially.</td></tr>
                <tr><td className="pl-5">Quantum computing</td><td className="pr-5 text-text-secondary text-xs">Real revenue ($300M–500M industry) but valuations imply 2030s outcomes.</td></tr>
                <tr><td className="pl-5">Quantum simulation</td><td className="pr-5 text-text-secondary text-xs">Tens of millions in revenue; mostly national labs and academic HPC.</td></tr>
                <tr><td className="pl-5">Quantum communications</td><td className="pr-5 text-text-secondary text-xs">Real revenue in China + select gov nets. NSA-driven headwind in US market.</td></tr>
                <tr><td className="pl-5">Quantum materials</td><td className="pr-5 text-text-secondary text-xs">Pre-revenue; pure R&D bet with option value.</td></tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-sm text-text-secondary leading-relaxed">
            The honest investor takeaway: <strong className="text-text-primary">PQC and sensing are the predictable
            commercial stories</strong>. Computing has the transformative-TAM upside but the public valuations imply
            outcomes that haven&apos;t arrived. Communications is dominated by China and the US-NSA-PQC debate.
            Metrology is a quiet, high-margin specialty. Simulation blurs with computing. Materials is option-value.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link href="/companies" className="card card-hover p-4 block">
              <p className="eyebrow mb-1">Companies</p>
              <p className="text-text-primary font-medium">32 quantum companies tracked</p>
            </Link>
            <Link href="/today" className="card card-hover p-4 block">
              <p className="eyebrow mb-1">Today</p>
              <p className="text-text-primary font-medium">What&apos;s deployed right now</p>
            </Link>
            <Link href="/future" className="card card-hover p-4 block">
              <p className="eyebrow mb-1">Future</p>
              <p className="text-text-primary font-medium">1, 3, 5, 10 year horizons</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-surface p-3">
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">{label}</p>
      <p className="mt-1 font-mono text-text-primary text-sm">{value}</p>
    </div>
  );
}
