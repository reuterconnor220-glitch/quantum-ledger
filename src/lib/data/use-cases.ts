/**
 * Use-case data for /use-cases — rewritten 2026-05-14 from a source-cited
 * agent pass. Each line covers near-term (1–3 yrs), mid-term (5–10 yrs),
 * long-term (10–20 yrs), and speculative (>20 yrs / unsolved) horizons.
 *
 * Every claim has a source URL. Aspirational vs plausible is explicit.
 */

export type Horizon = 'near' | 'mid' | 'long' | 'speculative';

export const HORIZON_LABEL: Record<Horizon, string> = {
  near: 'Near-term · 1–3 years',
  mid: 'Mid-term · 5–10 years',
  long: 'Long-term · 10–20 years',
  speculative: 'Speculative · >20 years or unsolved',
};

export const HORIZON_TONE: Record<Horizon, string> = {
  near: 'border-accent-data/60 text-accent-data bg-accent-data/8',
  mid: 'border-accent-quantum/60 text-accent-quantum bg-accent-quantum/8',
  long: 'border-accent-warn/60 text-accent-warn bg-accent-warn/8',
  speculative: 'border-accent-down/40 text-accent-down/80 bg-accent-down/5',
};

export interface UseCase {
  horizon: Horizon;
  headline: string;
  scenario: string;
  tech: string;
  timeline: string;
  honestRead: string;
  sources: { label: string; url: string }[];
}

export interface UseCaseLine {
  slug: string;
  title: string;
  accent: string;
  intro: string;
  cases: UseCase[];
  ifThisWorks: string;
  whosWorkingOnThis: string;
  firstCommercialBreakthrough: string;
}

export const USE_CASE_LINES: UseCaseLine[] = [
  {
    slug: 'computing',
    title: 'Quantum computing',
    accent: 'computing',
    intro:
      'The headline-grabber. Real machines exist, but most are noisy, small, and a long way from outrunning a laptop on anything you would pay for. The interesting question is which problem breaks first.',
    cases: [
      {
        horizon: 'near',
        headline: 'A drug that hits the market in 2032 had its first interesting molecule shortlisted by a quantum-classical hybrid in 2026.',
        scenario:
          "You will not personally notice this — but the cancer drug your aunt takes in 2032 may trace back to a 2024 Nature Biotechnology paper in which a quantum-classical pipeline generated 15 candidate KRAS inhibitors, two of which became hit compounds in the wet lab. Pharma R&D doesn't change overnight; it changes one shortlist at a time.",
        tech: 'Variational quantum eigensolvers and quantum-classical sampling on ~100-qubit superconducting and trapped-ion machines, used as one stage in a much larger AI/HPC pipeline.',
        timeline: 'Already happening at proof-of-concept scale; meaningful pipeline contribution by ~2028–2030 per IBM Jerry Chow.',
        honestRead:
          'Plausible: faster hit-finding for hard targets. Aspirational: "designed-by-quantum" blockbuster drugs before 2032.',
        sources: [
          { label: 'KRAS inhibitors paper · Nature Biotech', url: 'https://www.nature.com/articles/s41587-024-02526-3' },
          { label: 'Hybrid quantum pipeline · Scientific Reports', url: 'https://www.nature.com/articles/s41598-024-67897-8' },
          { label: 'WEF · Quantum in drug development', url: 'https://www.weforum.org/stories/2025/01/quantum-computing-drug-development/' },
        ],
      },
      {
        horizon: 'near',
        headline: "Your bank's margin call algorithm gets a quiet 2–5% accuracy bump.",
        scenario:
          "Wall Street's quantum work in 2026 is unglamorous — better Monte Carlo for derivative pricing, hybrid solvers for small portfolio-optimization problems, credit risk simulations. JPMorgan runs a 50-person team and has put portfolio-optimization results on Quantinuum hardware. Goldman Sachs has retreated, deciding the hardware isn't there yet. That divergence tells you everything.",
        tech: 'Hybrid HHL-style linear-systems solvers, quantum amplitude estimation for Monte Carlo, QAOA on small portfolios.',
        timeline: 'Demonstrations now. Production-grade quantum advantage in finance: not before 2028, probably later.',
        honestRead:
          'Plausible: incremental improvements in specific Monte Carlo workloads. Aspirational: anyone claiming today that quantum is "transforming finance" in 2026. The Goldman retreat is the honest read.',
        sources: [
          { label: 'JPMorgan · Quantum linear systems for portfolio optimization', url: 'https://www.jpmorganchase.com/about/technology/blog/quantum-linear-systems-for-portfolio-optimization' },
          { label: "Wall Street's Quantum Divide · Bloomberg", url: 'https://www.bloomberg.com/news/features/2026-04-26/wall-street-s-quantum-computing-divide-goldman-retreats-jpmorgan-invests' },
          { label: '15+ global banks · Quantum Insider', url: 'https://thequantuminsider.com/2026/03/27/15-plus-global-banks-probing-the-wonderful-world-of-quantum-technologies/' },
        ],
      },
      {
        horizon: 'mid',
        headline: 'The 2032 Mercedes EQS gets 15% more range from a cathode chemistry classical computers could not accurately simulate.',
        scenario:
          'You plug in a 2032 EV and it tells you 500 miles of range instead of 350. Inside, the cathode is a lithium-sulfur or solid-state chemistry whose electron behavior was modeled on a fault-tolerant quantum computer — work IBM and Mercedes-Benz (then Daimler) started in 2020 and is still maturing.',
        tech: 'Fault-tolerant quantum simulation of correlated-electron systems in cathode candidates and electrolyte interfaces.',
        timeline: 'Useful quantum simulation of full battery chemistries plausibly 2030–2035; commercial product downstream of that.',
        honestRead:
          'Plausible: quantum simulation contributes to materials shortlists that humans then test. Aspirational: "quantum-designed batteries" in the dealership before 2030.',
        sources: [
          { label: 'IBM + Daimler Li-S batteries', url: 'https://www.ibm.com/quantum/blog/next-gen-lithium-sulfur-batteries' },
          { label: 'IBM · Accelerated Discovery of Battery Materials', url: 'https://research.ibm.com/projects/accelerated-discovery-of-battery-materials' },
        ],
      },
      {
        horizon: 'long',
        headline: 'Sometime between 2030 and 2035, a sufficiently large quantum computer breaks the RSA encryption that secured your 2018 mortgage documents.',
        scenario:
          "You won't see Q-Day on TV. But harvest-now-decrypt-later is real today — adversaries are storing encrypted traffic against the day Shor's algorithm runs at scale. NIST's transition plan already deprecates RSA-2048 by 2030 and disallows it by 2035 specifically because the agency thinks the window is closing.",
        tech:
          "Shor's algorithm on a fault-tolerant quantum computer. Google's 2025 estimate: under 1 million noisy qubits, under a week of runtime. A 2025 Sydney preprint using LDPC codes puts the bar under 100,000 physical qubits.",
        timeline:
          'Million-qubit machines are on Microsoft and IBM roadmaps for ~2030. Whether they work as advertised is the open question. A credible Q-Day window: 2030–2035, with significant probability of slippage to 2035–2040.',
        honestRead:
          'Plausible: PQC migration is already mandatory for federal systems. Aspirational/scaremongering: any specific dated prediction of Q-Day. The honest framing is risk management, not prophecy.',
        sources: [
          { label: 'Google lowers quantum bar to crack RSA · Quantum Insider', url: 'https://thequantuminsider.com/2025/05/24/google-researcher-lowers-quantum-bar-to-crack-rsa-encryption/' },
          { label: 'NIST IR 8547 · PQC Transition', url: 'https://csrc.nist.gov/pubs/ir/8547/ipd' },
        ],
      },
      {
        horizon: 'speculative',
        headline: 'The model behind your 2035 assistant was trained partially on a quantum processor.',
        scenario:
          'A 2026 Caltech/Google/MIT paper showed quantum systems performing core ML primitives with 4–6 orders of magnitude less memory than classical equivalents, on under 60 logical qubits. If that generalizes, training certain models becomes a quantum problem.',
        tech: 'Quantum kernel methods, quantum-informed ML for chaotic dynamical systems.',
        timeline: 'Practical quantum-accelerated training: speculative. The 2026 results are simulations and proofs, not production.',
        honestRead:
          'Genuinely exciting research; near-zero chance of changing your ChatGPT bill this decade.',
        sources: [
          { label: 'Exponential quantum advantage in ML · Quantum Insider', url: 'https://thequantuminsider.com/2026/04/10/study-finds-exponential-quantum-advantage-in-machine-learning-tasks/' },
          { label: 'Quantum-informed ML for chaos · Science Advances', url: 'https://www.science.org/doi/10.1126/sciadv.aec5049' },
        ],
      },
    ],
    ifThisWorks:
      'Materials and drugs we cannot today design because the underlying physics is intractable become routine. Encryption is rebuilt from scratch. Logistics, finance, and AI all gain a tail-end accelerator for the hardest problems. None of this displaces classical computing — it adds a co-processor for problems where electrons matter.',
    whosWorkingOnThis: 'IBM Quantum, Google Quantum AI, Quantinuum, IonQ, PsiQuantum, plus DOE national labs (Argonne, Oak Ridge).',
    firstCommercialBreakthrough:
      'Quantum-assisted molecular simulation contributing to a pharma or specialty-chemicals shortlist that produces a marketed product. Not flashy, but real revenue by ~2030.',
  },
  {
    slug: 'sensing',
    title: 'Quantum sensing',
    accent: 'sensing',
    intro:
      'The under-hyped quadrant. Quantum sensors are smaller, cheaper, and closer to commercial than computers — and several products are already in customer hands.',
    cases: [
      {
        horizon: 'near',
        headline: 'Your pediatric neurologist runs a 20-minute MEG scan on a child wearing what looks like a bike helmet, while the child plays.',
        scenario:
          "Conventional MEG requires the patient to sit motionless inside a multi-ton cryogenic helmet. New optically pumped magnetometer (OPM) MEG systems work at room temperature, fit in a helmet, and tolerate movement — meaning, for the first time, you can image an infant's brain or a child mid-task. UK-based Cerca Magnetics has sold 19 systems across 12 countries and is moving through clinical approval.",
        tech: 'Optically pumped magnetometers — alkali atom vapor cells that detect femtotesla magnetic fields from neural currents, no cryogenics needed.',
        timeline: 'Research-clinical deployment now; full clinical reimbursement in the US/UK probably 2027–2029.',
        honestRead:
          'Plausible: OPM-MEG becomes standard for pediatric epilepsy, concussion, and dementia research. Aspirational: replacing MRI. It complements, not replaces.',
        sources: [
          { label: 'Cerca Magnetics Series A · Quantum Insider', url: 'https://thequantuminsider.com/2026/04/21/cerca-magnetics-secures-38m-series-a-funding-scale-quantum-brain-scanner/' },
          { label: 'OPM-MEG functional neuroimaging · ScienceDirect', url: 'https://www.sciencedirect.com/science/article/pii/S0166223622001023' },
        ],
      },
      {
        horizon: 'near',
        headline: 'The construction crew before your new home gets built scans the soil with a quantum gravimeter and finds a sinkhole no shovel would have caught.',
        scenario:
          'Birmingham University demonstrated a field-deployable quantum gravimeter that maps subsurface voids, tunnels, and pipes from the surface — turning "we will find out when we dig" into a quantitative pre-construction survey. By 2025, more than 65% of government-funded geological surveys in developed countries integrate quantum gravimetry.',
        tech: 'Cold-atom gravimeters using atom interferometry to measure local gravitational acceleration at parts-per-billion precision.',
        timeline: 'Already commercial in survey-grade form (Muquans/iXblue, AOSense, Nomad Atomics). Broad construction-industry adoption 2026–2029.',
        honestRead:
          'Plausible: routine use for tunneling, dam inspection, oil & gas. Aspirational: handheld gravimeters at every construction site. The sensors still need stable platforms.',
        sources: [
          { label: 'Quantum sensing for gravity cartography · Nature', url: 'https://www.nature.com/articles/s41586-021-04315-3' },
        ],
      },
      {
        horizon: 'mid',
        headline: 'The 2034 cargo ship that took your Amazon package across the Pacific navigated with no GPS at all — and arrived within meters of plan.',
        scenario:
          'GPS jamming and spoofing are now routine in Eastern Europe and the Middle East. In 2024, Boeing and AOSense flew the first crewed-aircraft quantum inertial navigation test, achieving four hours of GPS-free flight. The X-37B military spaceplane is testing quantum inertial nav on orbit. Quantum sensors drift ~10× less than classical inertial systems.',
        tech: 'Cold-atom interferometric accelerometers and gyroscopes — atoms cooled near absolute zero, used as wave-like inertial references.',
        timeline: 'Military deployment 2028–2032. Commercial maritime/aviation 2032–2038. Consumer phones: probably never.',
        honestRead:
          'Plausible: GPS-denied military and shipping nav within a decade. Aspirational: handheld quantum nav.',
        sources: [
          { label: 'Quantum nav could solve GPS jamming · MIT Tech Review', url: 'https://www.technologyreview.com/2025/12/16/1129887/quantum-navigation-militarys-gps-jamming-problem/' },
          { label: "Quantum alternative to GPS on X-37B · The Conversation", url: 'https://theconversation.com/quantum-alternative-to-gps-navigation-will-be-tested-on-us-military-spaceplane-262967' },
        ],
      },
      {
        horizon: 'mid',
        headline: 'AUKUS planners rethink the $300B submarine deal because Chinese drones can now detect what was supposed to be undetectable.',
        scenario:
          'Chinese researchers at CASC tested drone-mounted SQUID magnetometers and quantum gradiometers reportedly 10× more sensitive than current anti-submarine sensors. Sea trials and peer-reviewed publications suggest 3–7 years to initial operational capability.',
        tech: 'Superconducting Quantum Interference Devices (SQUIDs), NV-center diamond magnetometers, gravity-gradient sensing of submarine mass.',
        timeline: 'Initial operational capability 2029–2033. Strategic impact uncertain.',
        honestRead:
          'Plausible: detection ranges improve materially. Aspirational/scaremongering: submarines become "obsolete." Ocean noise and decoys complicate this enormously.',
        sources: [
          { label: 'China tests drone quantum sensor · Quantum Insider', url: 'https://thequantuminsider.com/2025/04/27/china-tests-drone-mounted-quantum-sensor-that-could-reshape-submarine-detection/' },
        ],
      },
    ],
    ifThisWorks:
      'Cheap, deployable quantum sensors find every underground pipe before you dig, navigate every ship through any jamming, image the heart and brain non-invasively at any clinic, and turn satellite gravity data into real-time aquifer and ice-sheet monitoring. The sensing revolution is the quietest and most certain of the seven lines.',
    whosWorkingOnThis: 'Cerca Magnetics, QuSpin, MAG4Health, AOSense, Nomad Atomics, Muquans/iXblue, Q-CTRL, Honeywell, Infleqtion.',
    firstCommercialBreakthrough: 'OPM-MEG for pediatric epilepsy and concussion — clinical reimbursement is the bottleneck, not the physics.',
  },
  {
    slug: 'communications',
    title: 'Quantum communications',
    accent: 'communications',
    intro: 'Real, deployed, and over-marketed. QKD works today. Whether you will ever care is the question.',
    cases: [
      {
        horizon: 'near',
        headline: 'A €500K transfer between two European bank offices today is already secured by QKD links you have never heard of.',
        scenario:
          'Toshiba field-deployed a QKD network for an EU banking group in 2024. Chinese banks use QKD for inter-branch traffic. ID Quantique (acquired by IonQ in 2025) has commercial deployments across financial and government networks. The market was $1.8B in 2024 and is projected to ~$5.3B by 2032.',
        tech: 'BB84 / decoy-state QKD over dedicated fiber, with trusted-node relays.',
        timeline: 'Commercial now for high-security niches. Mainstream adoption probably never — PQC is cheaper.',
        honestRead:
          'Plausible: QKD persists for sovereign and ultra-high-value links. Aspirational: QKD displacing TLS. The NSA explicitly does not recommend QKD for national security systems, preferring PQC.',
        sources: [
          { label: 'NSA on QKD vs PQC', url: 'https://www.nsa.gov/Cybersecurity/Quantum-Key-Distribution-QKD-and-Quantum-Cryptography-QC/' },
          { label: '25 quantum-safe crypto companies · Quantum Insider', url: 'https://thequantuminsider.com/2026/03/25/25-companies-building-the-quantum-cryptography-communications-markets/' },
        ],
      },
      {
        horizon: 'mid',
        headline: 'Pfizer rents quantum compute from IBM, AWS, and a Chinese provider — and none of them can see Pfizer molecule.',
        scenario:
          "Blind quantum computing protocols let a client delegate a computation to an untrusted quantum server such that the server never learns the inputs, computation, or outputs. As cloud quantum services proliferate, blind protocols become the privacy answer for proprietary chemistry, finance, and defense workloads.",
        tech: 'Measurement-based blind quantum computation with cluster states; recently generalized to higher-dimensional qudits.',
        timeline: 'First commercial deployment ~2030, contingent on cloud-accessible fault-tolerant quantum computers.',
        honestRead:
          'Plausible: privacy-preserving quantum cloud becomes standard. Aspirational: every cloud workload uses it — too much overhead.',
        sources: [
          { label: 'Blind quantum computing with qudits · Phys Rev A', url: 'https://journals.aps.org/pra/abstract/10.1103/1p5p-zywx' },
        ],
      },
      {
        horizon: 'long',
        headline: 'Around 2035, a network of quantum computers in Chicago, Berkeley, and Oak Ridge runs as one machine because entanglement links them.',
        scenario:
          "The DOE's 2020 Quantum Internet Blueprint targets a prototype nationwide quantum network by ~2030, connecting national labs as a backbone. Practical applications follow: distributed quantum computing, entanglement-based clock synchronization, and one-shot quantum-secure multi-party protocols.",
        tech: 'Quantum repeaters, satellite-to-ground entanglement distribution (China Micius did this in 2017), entangled-photon sources, quantum memories.',
        timeline: 'Prototype regional networks now; nationwide DOE prototype ~2030; commercial-grade quantum internet 2035+.',
        honestRead:
          'Plausible: research-grade quantum internet by 2030 is real, well-funded, and on track. Aspirational: consumer quantum internet ever.',
        sources: [
          { label: 'DOE Quantum Internet Blueprint report', url: 'https://www.osti.gov/servlets/purl/1638794/' },
          { label: 'DOE Explains · Quantum Networks', url: 'https://www.energy.gov/science/doe-explainsquantum-networks' },
        ],
      },
    ],
    ifThisWorks:
      'Distributed quantum sensors give you a continent-scale telescope. Distributed quantum computers stitch together fault-tolerant capacity no single device could hold. Blind protocols make data sovereignty a solved problem for the highest-value workloads. None of this is your home Wi-Fi.',
    whosWorkingOnThis: 'Toshiba, ID Quantique (IonQ), QuantumXchange, Aliro, Qunnect, Q-NEXT (Argonne-led DOE center).',
    firstCommercialBreakthrough: 'Inter-data-center QKD for hyperscalers and sovereign clouds — niche but real revenue.',
  },
  {
    slug: 'pqc',
    title: 'Post-Quantum Cryptography (PQC)',
    accent: 'PQC',
    intro:
      'The only line on this list where you, personally, are guaranteed to be affected within a decade — because every secure web connection in the world has to change.',
    cases: [
      {
        horizon: 'near',
        headline: 'Chrome and Cloudflare already negotiate a post-quantum-secured TLS handshake on a meaningful share of connections.',
        scenario:
          'As of 2024–2025, Google Chrome, Cloudflare, Apple, and Signal have rolled out hybrid PQC (typically X25519 + ML-KEM/Kyber). When you log into your bank in 2026, there is a good chance the key exchange is already quantum-resistant. You will never see this.',
        tech: 'NIST-standardized ML-KEM (FIPS 203), ML-DSA (FIPS 204), SLH-DSA (FIPS 205) — finalized August 2024.',
        timeline: 'Standards final; deployment already underway. Federal deprecation of RSA/ECC by 2030, full disallowance by 2035.',
        honestRead:
          'Plausible: by 2028, most major websites are PQC-protected. Aspirational: every legacy system gets migrated on time. The long tail — embedded devices, IoT, industrial control — will be a mess.',
        sources: [
          { label: 'NIST IR 8547 · PQC Transition', url: 'https://csrc.nist.gov/pubs/ir/8547/ipd' },
          { label: 'NIST PQC project page', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography' },
        ],
      },
      {
        horizon: 'near',
        headline: 'The NSA CNSA 2.0 framework requires all new national-security systems to use quantum-safe algorithms starting January 2027.',
        scenario:
          'If you sell software to the US federal government — VPN, code signing, firmware update infrastructure, identity systems — your 2027 RFP requires PQC. This is the largest, fastest mandated cryptographic migration in history. Estimated total industry spend: ~$15B.',
        tech: 'Hybrid signature schemes for code signing (SLH-DSA / ML-DSA), Kyber-based KEMs for transport.',
        timeline: 'New NSS systems 2027; application migration 2030; infrastructure 2035.',
        honestRead:
          'Plausible: federal systems hit 2027 mostly on schedule. Aspirational: every vendor in the supply chain ready by then. Expect 2027–2030 to be ugly.',
        sources: [
          { label: 'UK NCSC PQC migration timelines', url: 'https://www.ncsc.gov.uk/guidance/pqc-migration-timelines' },
        ],
      },
      {
        horizon: 'mid',
        headline: 'Your 2032 mortgage is signed with an ML-DSA or SLH-DSA digital signature.',
        scenario:
          'PDF signing, DocuSign-style flows, code signing for Windows/Apple/Linux updates, certificate authorities, root CA chains — all migrate to PQC by ~2030–2032. You will not notice. That is the goal.',
        tech: 'Stateless hash-based signatures (SLH-DSA) for code signing where signature size is tolerable; ML-DSA for general document signing.',
        timeline: 'Critical infrastructure migration 2027–2030; long-tail 2030–2035.',
        honestRead:
          'Plausible: mainstream signing migrates on time. Aspirational: the entire ecosystem of legacy embedded devices migrates ever — many will just be replaced.',
        sources: [
          { label: 'PQShield · NIST PQC timelines', url: 'https://pqshield.com/nist-recommends-timelines-for-transitioning-cryptographic-algorithms/' },
        ],
      },
    ],
    ifThisWorks:
      'The transition succeeds quietly. By the time a million-qubit quantum computer exists, almost nothing of value is protected by RSA or ECC. The harvest-now-decrypt-later risk is real for documents you encrypted before the migration — anything sensitive sent over HTTPS in 2024 may be readable in 2035.',
    whosWorkingOnThis: 'NIST, NSA, AWS, Google, Microsoft, Cloudflare, PQShield, ISARA, Cryptosense, SandboxAQ, Quantinuum.',
    firstCommercialBreakthrough: 'TLS / VPN PQC migration is already revenue-positive for security vendors; the next wave is HSM and code-signing migration.',
  },
  {
    slug: 'simulation',
    title: 'Quantum simulation',
    accent: 'simulation',
    intro: 'The line most likely to deliver economic value first — because chemistry is, fundamentally, a quantum problem.',
    cases: [
      {
        horizon: 'mid',
        headline: 'The Haber-Bosch process — which consumes ~1.5% of global energy — gets a quantum-designed catalyst that works at room temperature.',
        scenario:
          'Today, ammonia for fertilizer is produced at 400–500°C and 200 atm, burning enormous amounts of natural gas. Nitrogenase enzymes do the same reaction at room temperature using the FeMoco cofactor, but its mechanism is beyond classical chemistry. IBM-affiliated researchers proposed FeMoco as a flagship quantum simulation target nearly a decade ago. A January 2026 paper by Garnet Chan challenges some of the earlier framing — the problem is harder than the marketing suggested, but the goal remains valid.',
        tech: 'Fault-tolerant quantum simulation of strongly correlated transition-metal active sites.',
        timeline: 'Quantum-relevant chemistry insights plausibly 2030–2035; deployed industrial catalyst 2035–2045.',
        honestRead:
          'Plausible: quantum simulation contributes to incremental catalyst improvements. Aspirational: room-temperature ammonia synthesis before 2040.',
        sources: [
          { label: 'Reaction mechanisms on quantum computers · PNAS', url: 'https://www.pnas.org/doi/10.1073/pnas.1619152114' },
          { label: 'Garnet Chan · Quantum chemistry classical limits', url: 'https://www.newquantumera.com/podcast/quantum-chemistrys-classical-limits-with-garnet-chan/' },
        ],
      },
      {
        horizon: 'mid',
        headline: 'The 2034 direct-air-capture plant in West Texas costs $50/ton instead of $400/ton because its sorbent was quantum-designed.',
        scenario:
          'Direct air capture today is bottlenecked by sorbent cost and the energy needed to release captured CO2. Quantum simulation of metal-organic frameworks (MOFs) and amine-functionalized sorbents could shortlist materials with the right binding energy. This is a long bet — but DAC economics are so bad that even a modest improvement matters.',
        tech: 'Quantum simulation of CO2-binding active sites and MOF pores.',
        timeline: 'Quantum contribution to MOF design 2028–2032; commercial DAC impact 2032–2040.',
        honestRead:
          'Plausible: quantum is one tool among many. Aspirational: quantum "solves" carbon capture.',
        sources: [
          { label: 'Quantum sensing for energy · Nature Reviews', url: 'https://www.nature.com/articles/s44359-025-00112-7' },
        ],
      },
      {
        horizon: 'long',
        headline: "A 2040 Alzheimer's therapeutic targets a specific allosteric site on tau protein that quantum simulation identified.",
        scenario:
          'AlphaFold solved structure prediction. The next bottleneck is dynamics — how proteins move, where the cryptic binding sites are, and how small molecules interact. Quantum simulation of QM/MM regions around active sites is plausibly part of the next-decade drug discovery stack.',
        tech: 'QM/MM hybrid simulation with quantum-mechanical treatment of the active site; quantum sampling for conformational ensembles.',
        timeline: 'Quantum-assisted lead optimization in pharma pipelines 2030+. Marketed drug attributable to quantum: 2035–2045.',
        honestRead:
          'Plausible: incremental contribution. Aspirational: quantum makes drug discovery 10× faster.',
        sources: [
          { label: 'Quantum ML in drug discovery · Chemical Reviews', url: 'https://pubs.acs.org/doi/10.1021/acs.chemrev.4c00678' },
        ],
      },
    ],
    ifThisWorks:
      'Chemistry stops being a wet-lab science of trial and error and becomes a design discipline. Fertilizer is decarbonized. Industrial catalysts cut energy use across the economy. Drugs are designed against targets that today are "undruggable." This is the most economically consequential line — and also the most patient.',
    whosWorkingOnThis: 'IBM Quantum, Google Quantum AI, Quantinuum, PsiQuantum, Pasqal, QC Ware, Phasecraft, plus pharma/chemicals partners.',
    firstCommercialBreakthrough:
      'Quantum-assisted catalyst design for a specialty chemical with ~$1B/year revenue and a hard electron-correlation problem. Less dramatic than the fertilizer story; more likely to actually ship.',
  },
  {
    slug: 'metrology',
    title: 'Quantum metrology & atomic clocks',
    accent: 'metrology',
    intro: 'The line that already runs your life — you just don\'t think about it. Every GPS satellite carries an atomic clock; every 5G handshake depends on synchronized timing.',
    cases: [
      {
        horizon: 'near',
        headline: 'Your 2027 cell tower has a chip-scale atomic clock that keeps the network running when GPS goes dark.',
        scenario:
          'Cell networks use GPS for precision timing. When GPS is jammed (now routine in conflict zones), networks degrade. Chip-scale atomic clocks (CSACs) give base stations enough holdover to ride out hours-to-days of GPS outage. Microchip, Vescent, Vector Atomic, and Safran ship CSACs today.',
        tech: 'Rubidium and cesium chip-scale atomic clocks; emerging optical lattice clocks for higher precision.',
        timeline: 'CSACs deployed now. Optical clocks in telecom/finance 2028–2032.',
        honestRead:
          'Plausible: timing resilience becomes a security requirement. Aspirational: revolutionary new applications. The value is in not failing, which is rarely a headline.',
        sources: [
          { label: 'NIST · Second of the Future', url: 'https://www.nist.gov/si-redefinition/second-future' },
        ],
      },
      {
        horizon: 'mid',
        headline: 'Around 2030, the international community votes to redefine the SI second using optical clocks — making timekeeping ~100× more precise overnight.',
        scenario:
          'The second has been defined by cesium since 1967. Optical clocks (strontium, ytterbium, aluminum-ion) are now ~100× more accurate. CGPM is expected to vote on redefinition around 2030. The downstream effects: better GPS, better geodesy, better synchronized financial trading, and — eventually — relativistic geodesy that detects centimeter-scale elevation changes from clock rate differences.',
        tech: 'Optical lattice clocks reaching fractional frequency uncertainties of 10^-18 or better.',
        timeline: 'Redefinition vote ~2030. Practical applications in geodesy 2030–2040.',
        honestRead:
          'Plausible: redefinition on schedule. Aspirational: consumer optical clocks. They are still bulky and lab-grade.',
        sources: [
          { label: 'NPL · Better-than-atomic optical clock', url: 'https://www.electronicsweekly.com/news/design/npl-adds-better-than-atomic-optical-clock-to-international-time-reference-2023-08/' },
        ],
      },
      {
        horizon: 'long',
        headline: 'A 2038 network of optical clocks across California detects pre-earthquake gravity-potential shifts hours before the fault slips.',
        scenario:
          'General relativity says clocks tick slower in deeper gravitational wells. Optical clocks precise enough to detect 1 cm of altitude change can, in principle, detect the mass redistribution that precedes major earthquakes. Whether this is practically useful is a research question — but the physics is real.',
        tech: 'Networked optical clocks at 10^-19 precision; relativistic geodesy.',
        timeline: 'Research demonstrations now; operational early-warning use 2035+.',
        honestRead:
          'Plausible: clocks become tools for geophysics. Aspirational: reliable earthquake prediction. Earthquakes have resisted every prediction method tried; clocks may help, not solve.',
        sources: [
          { label: 'Optical clocks · ScienceDaily', url: 'https://www.sciencedaily.com/releases/2016/05/160525111230.htm' },
        ],
      },
    ],
    ifThisWorks:
      'GPS becomes a fallback rather than a single point of failure. The financial system runs on clocks accurate enough that latency arbitrage measures real physics, not infrastructure noise. Geodesy and seismology gain a new dimension. Most users will only notice when something does not break.',
    whosWorkingOnThis: 'NIST, JILA, PTB (Germany), NPL (UK), Vector Atomic, Microchip, Vescent, Infleqtion, Q-CTRL, DARPA Robust Quantum Sensors program.',
    firstCommercialBreakthrough: 'Optical-clock modules for sovereign timing in financial exchanges and telecom backhaul.',
  },
  {
    slug: 'materials',
    title: 'Quantum materials',
    accent: 'materials',
    intro: 'The line where the hype-to-evidence ratio has been worst — and the payoff, if it ever happens, the largest.',
    cases: [
      {
        horizon: 'near',
        headline: 'The 2028 perovskite-silicon tandem solar panel on your garage hits 30%+ efficiency.',
        scenario:
          'Single-junction silicon caps at ~33.7% theoretical, ~26% commercial. Perovskite-silicon tandems exceeded 35% in lab cells (LONGi, 2025). Production-scale tandem panels at 28–32% are plausible by 2028–2030. Your electricity bill drops; rooftop installations need fewer panels for the same output.',
        tech: 'Tandem solar cells with engineered bandgaps; perovskite chemistry stabilization made tractable partly through better materials simulation.',
        timeline: 'Commercial tandem panels 2027–2029. Whether quantum simulation materially contributed: arguable.',
        honestRead:
          'Plausible: tandem panels at 28–32% in your local solar installer catalog by 2030. Aspirational: 40% commercial panels this decade.',
        sources: [
          { label: 'Perovskite-silicon tandem hits 34% in 2026 · PatSnap', url: 'https://www.patsnap.com/resources/blog/articles/perovskite-silicon-tandem-solar-cells-hit-34-in-2026/' },
        ],
      },
      {
        horizon: 'mid',
        headline: 'Microsoft (or a competitor) sells fault-tolerant quantum compute powered by topological qubits on Azure by ~2032.',
        scenario:
          'Microsoft unveiled Majorana 1 in February 2025 — eight topological qubits on a chip designed to scale to one million. Caveats: Nature editorial board explicitly noted the paper does not claim to demonstrate Majorana zero modes. Microsoft is in DARPA US2QC targeting a fault-tolerant prototype "in years, not decades."',
        tech: 'Indium arsenide / aluminum nanowires hosting Majorana zero modes; topological protection against decoherence.',
        timeline: 'Working topological qubit (independently verified): 2027–2030, optimistically. Useful compute: 2030–2035.',
        honestRead:
          'Plausible: topological qubits join the qubit-modality menu. Aspirational/scaremongering: any specific Microsoft timeline. The physics is genuinely contested.',
        sources: [
          { label: 'Microsoft unveils Majorana 1 · Azure', url: 'https://azure.microsoft.com/en-us/blog/quantum/2025/02/19/microsoft-unveils-majorana-1-the-worlds-first-quantum-processor-powered-by-topological-qubits/' },
          { label: 'Experts weigh in on topological qubit · Physics World', url: 'https://physicsworld.com/a/experts-weigh-in-on-microsofts-topological-qubit-claim/' },
        ],
      },
      {
        horizon: 'speculative',
        headline: 'A 2045 transmission grid loses zero electricity from generator to socket.',
        scenario:
          'The dream. LK-99 (2023) was disproven within weeks. As of April 2026, no material has met all five community validation criteria for a room-temperature ambient-pressure superconductor. Hydrogen-rich hydrides reach >550K critical temperatures but require 100–200+ GPa pressures — useless for grids. A February 2025 SLAC/Stanford result stabilized a nickelate superconductor at room pressure (still cold) — a real, underreported step forward.',
        tech: 'Hydrogen hydrides, cuprates, nickelates, twisted bilayer graphene, hypothetical engineered materials.',
        timeline: 'Honest answer — unknown. Could be 10 years, could be never.',
        honestRead:
          'Plausible: continued progress in unconventional superconductors. Aspirational: any specific dated prediction of a room-temperature ambient-pressure superconductor. Treat this as a moonshot.',
        sources: [
          { label: 'LK-99 status · Wikipedia', url: 'https://en.wikipedia.org/wiki/LK-99' },
          { label: 'Room-temperature superconductor 2026 · PatSnap', url: 'https://www.patsnap.com/resources/blog/articles/room-temperature-superconductor-research-2026-landscape/' },
        ],
      },
    ],
    ifThisWorks:
      'Lossless transmission means renewables in the desert power coastal cities economically. Topological qubits make fault-tolerant quantum computing routine. Batteries enable electrification of heavy transport. Solar panels cover less roof for the same kilowatt-hours. The materials line is the line where, if even one of these breaks through, the others matter less.',
    whosWorkingOnThis: 'Microsoft (topological qubits), QuantumScape (solid-state batteries), LONGi / Oxford PV (tandem PV), SLAC / Stanford / Argonne (unconventional superconductors).',
    firstCommercialBreakthrough: 'Perovskite-silicon tandem solar panels at production scale.',
  },
];
