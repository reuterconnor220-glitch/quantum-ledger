/**
 * Multi-track roadmaps: sensing, communications/networking, PQC migration government timelines.
 * Synthesized from May 2026 research agent (deep-dive on all 3 lines).
 */

export interface MultiTrackRoadmap {
  slug: string;
  vendor: string;
  modality: string;
  credibilityScore: number;
  credibilityNotes: string;
  milestones: { year: number | string; label: string; status: 'shipped' | 'announced' | 'aspirational' }[];
  gatingChallenge: string;
  definitionOfSuccess: string;
  partners?: string;
}

// SENSING ROADMAPS
export const SENSING_ROADMAPS: MultiTrackRoadmap[] = [
  {
    slug: 'q-ctrl',
    vendor: 'Q-CTRL',
    modality: 'Software-augmented gravimetry + magnetometry',
    credibilityScore: 9,
    credibilityNotes: 'Multiple validated field demos on defense platforms; A$38M DARPA RoQS award is one of the largest quantum-sensing contracts globally.',
    milestones: [
      { year: 2024, label: 'Ironstone Opal airborne — 111× INS accuracy in GPS-denied trials', status: 'shipped' },
      { year: 2025, label: 'DARPA RoQS Phase 1 award, A$38M / US$24.4M (30 months)', status: 'shipped' },
      { year: 2025, label: 'MV Sycamore RAN sea trials — 144 hours continuous data', status: 'shipped' },
      { year: '2027-28', label: 'RoQS Phase 2 — operational platform integration', status: 'aspirational' },
    ],
    gatingChallenge: 'Translating AI-software ruggedization across third-party sensor hardware partners without performance regression in real EM/vibration environments.',
    definitionOfSuccess: 'Quantum-INS becomes a line-replaceable unit on AUKUS submarine, helicopter, and ground platforms.',
    partners: 'Lockheed Martin (RoQS sub), Royal Australian Navy, DARPA, UK MoD',
  },
  {
    slug: 'infleqtion',
    vendor: 'Infleqtion',
    modality: 'Strontium/rubidium optical clocks (Tiqker) + cold-atom inertial',
    credibilityScore: 8.5,
    credibilityNotes: 'World-first submarine optical clock; only public-equity pure-play quantum sensing + computing dual-track.',
    milestones: [
      { year: 2024, label: 'Tiqker commercial launch', status: 'shipped' },
      { year: 2025, label: 'World-first quantum optical clock on Royal Navy XV Excalibur autonomous submarine', status: 'shipped' },
      { year: 2025, label: 'Sqale 100-qubit neutral-atom system delivered to UK NQCC', status: 'shipped' },
      { year: 2026, label: 'SPAC merger with CCCX closed → NYSE listing as INFQ', status: 'shipped' },
      { year: '2027-28', label: 'Tiqker volume production for AUKUS PNT', status: 'aspirational' },
    ],
    gatingChallenge: 'Cost reduction and SWaP for submarine-deployable form factor at fleet scale.',
    definitionOfSuccess: 'Tiqker becomes the default clock for Royal Navy / USN GPS-denied PNT.',
    partners: 'Royal Navy, MSubs, NQCC, US DoD',
  },
  {
    slug: 'sbquantum',
    vendor: 'SBQuantum',
    modality: 'NV-diamond magnetometry (vector + scalar)',
    credibilityScore: 8,
    credibilityNotes: 'Space-validated; technology de-risked through NGA peer-reviewed MagQuest competition.',
    milestones: [
      { year: 2025, label: 'NGA MagQuest Phase 4a — $1.55M prize + qualification', status: 'shipped' },
      { year: 2026, label: 'Falcon 9 Transporter-16 launch via Spire CubeSat (March 30)', status: 'shipped' },
      { year: 2026, label: 'On-orbit data collection complete; NOAA/NASA Goddard evaluation', status: 'announced' },
      { year: 2030, label: 'Operational NGA acquisition target for World Magnetic Model', status: 'aspirational' },
    ],
    gatingChallenge: 'Demonstrating NV-diamond sensitivity equivalent to legacy fluxgate/scalar combos in space radiation.',
    definitionOfSuccess: 'Selected as primary data-collection sensor for WMM 2030.',
    partners: 'Spire Global, NGA, NOAA NCEI, NASA Goddard',
  },
  {
    slug: 'vector-atomic',
    vendor: 'Vector Atomic',
    modality: 'Iodine optical clock (rackmount)',
    credibilityScore: 8.5,
    credibilityNotes: 'First commercial rackmount optical clock; already shipping revenue product.',
    milestones: [
      { year: 2023, label: 'Evergreen-30 product launch announced', status: 'shipped' },
      { year: 2024, label: 'First customer deliveries', status: 'shipped' },
      { year: '2024-25', label: 'DoD timing / GNSS-resilience deployments expand', status: 'shipped' },
      { year: '2026-27', label: 'Next-generation reduced-SWaP variant', status: 'aspirational' },
    ],
    gatingChallenge: 'Defending price/performance vs chip-scale microwave clocks and Infleqtion/Muquans optical entries.',
    definitionOfSuccess: 'Default optical clock for hardened data center, radar coherence, and GNSS-resilience.',
    partners: 'US Navy, data center operators, undisclosed DoD',
  },
  {
    slug: 'aosense',
    vendor: 'AOSense',
    modality: 'Cold-atom interferometric inertial sensors + gravimeters',
    credibilityScore: 8,
    credibilityNotes: 'Boeing 2024 GPS-free flight test was the seminal cold-atom INS validation.',
    milestones: [
      { year: 2024, label: 'Boeing 6-axis quantum IMU GPS-free flight test', status: 'shipped' },
      { year: 2025, label: 'Named QuINS subcontractor under Lockheed Martin', status: 'shipped' },
      { year: '2025-28', label: 'DARPA Transformational Quantum Systems milestones', status: 'announced' },
      { year: '2027+', label: 'USGS + oil-and-gas gravimetry deployments', status: 'aspirational' },
    ],
    gatingChallenge: 'Sensor-head miniaturization without losing bias-stability advantage vs FOG/RLG.',
    definitionOfSuccess: 'Cold-atom IMU qualified for crewed aircraft and surface combatants.',
    partners: 'Boeing, Lockheed Martin, USGS, oil-and-gas majors',
  },
  {
    slug: 'cerca-magnetics',
    vendor: 'Cerca Magnetics',
    modality: 'OPM-MEG (helmet form factor) for brain imaging',
    credibilityScore: 7.5,
    credibilityNotes: 'Clinical and military pilots underway; clear regulatory pathway. £3.8M Series A April 2026.',
    milestones: [
      { year: 2024, label: 'Oxford OHBA install', status: 'shipped' },
      { year: 2026, label: 'Mobile MEG for blast-exposure (UK MoD) operational', status: 'shipped' },
      { year: 2026, label: '€4.3M Series A led by Guinness Ventures', status: 'shipped' },
      { year: '2027-29', label: 'UK/US clinical approval pathway (epilepsy, MS, Parkinson\'s, dementia)', status: 'aspirational' },
    ],
    gatingChallenge: 'FDA / MHRA clearance for routine diagnostic use.',
    definitionOfSuccess: 'OPM-MEG displaces SQUID-MEG in new clinical installations.',
    partners: 'UK MoD (DSTL), Epilepsy Institute (£14M consortium), Oxford OHBA',
  },
  {
    slug: 'quspin',
    vendor: 'QuSpin',
    modality: 'OPM sensor modules (components)',
    credibilityScore: 9,
    credibilityNotes: 'De-facto standard component supplier to the OPM-MEG industry.',
    milestones: [
      { year: 2024, label: 'QZFM Gen-3 launch — <4 fT/√Hz, 30% smaller', status: 'shipped' },
      { year: '2025-26', label: 'Neuro-1 integrated system launch', status: 'shipped' },
      { year: 2026, label: '>500 sensors deployed at 40+ clinical sites globally', status: 'shipped' },
    ],
    gatingChallenge: 'Component commoditization if Cerca/FieldLine in-source.',
    definitionOfSuccess: '"Intel Inside" of OPM-MEG — embedded in every major helmet system.',
    partners: 'Cerca, FieldLine, SickKids, Princeton, Boys Town, University of Zurich',
  },
  {
    slug: 'exail',
    vendor: 'Exail (formerly Muquans / iXblue)',
    modality: 'Cold-atom absolute gravimetry, atomic clocks, frequency transfer',
    credibilityScore: 8.5,
    credibilityNotes: 'Only commercial-industrial absolute quantum gravimeter on market; multi-year customer deployments.',
    milestones: [
      { year: '2022-24', label: 'Mt. Etna year-long field campaign — volcanology', status: 'shipped' },
      { year: '2024-26', label: 'Underground mapping commercial expansion', status: 'shipped' },
      { year: '2027+', label: 'European sovereign sensing positioning', status: 'aspirational' },
    ],
    gatingChallenge: 'Defending the absolute-gravity commercial moat against AOSense and Q-CTRL.',
    definitionOfSuccess: 'AQG becomes the reference instrument for geodesy, volcanology, and resource exploration.',
    partners: 'INGV (Italy), European geological surveys, DGA (France), CNES',
  },
];

// COMMUNICATIONS ROADMAPS
export const COMMS_ROADMAPS: MultiTrackRoadmap[] = [
  {
    slug: 'id-quantique',
    vendor: 'ID Quantique (IonQ subsidiary)',
    modality: 'Fiber QKD (BB84, COW), QRNG, satellite-QKD ground stations',
    credibilityScore: 9,
    credibilityNotes: 'Largest deployed QKD installed base globally; now backed by IonQ public-market financing.',
    milestones: [
      { year: 2017, label: 'Korean 800km QKD network with SK Telecom', status: 'shipped' },
      { year: 2025, label: 'Acquisition by IonQ closed — ~$250M, ~300 patents transferred', status: 'shipped' },
      { year: '2026+', label: 'Integration with IonQ networking and Cisco/Atom distributed compute', status: 'announced' },
    ],
    gatingChallenge: 'Western market headwind from NSA position; growth depends on Korean, Swiss, EU sovereign deployments.',
    definitionOfSuccess: 'QKD becomes the standard for sovereign and bank-to-bank settlement nets.',
    partners: 'SK Telecom, Korean MoD, Swiss banks, ~60-country footprint',
  },
  {
    slug: 'toshiba',
    vendor: 'Toshiba',
    modality: 'Fiber QKD, Twin-Field QKD, MDI-QKD',
    credibilityScore: 9.5,
    credibilityNotes: 'Long-distance and high-rate QKD records; industrial manufacturing depth.',
    milestones: [
      { year: 2021, label: '600+ km TF-QKD record (dual-band stabilization)', status: 'shipped' },
      { year: '2023-25', label: 'Multiplexed QKD over standard telecom dark fiber deployments', status: 'shipped' },
      { year: '2025-26', label: 'Gigabit-class lab key-rate demonstrations', status: 'announced' },
      { year: '2027+', label: 'Quantum-repeater R&D', status: 'aspirational' },
    ],
    gatingChallenge: 'Translating record-holding lab results into scalable manufacturing.',
    definitionOfSuccess: 'Default QKD vendor for European and Japanese telecom and finance.',
    partners: 'BT, Japanese telcos, financial institutions, EuroQCI consortia',
  },
  {
    slug: 'china-national-qkd',
    vendor: 'China National QKD Backbone',
    modality: 'Fiber + satellite QKD (Micius retired, Jinan-1 operational)',
    credibilityScore: 9.5,
    credibilityNotes: 'Largest deployed quantum network on Earth; state-sovereign program with multi-decade continuity.',
    milestones: [
      { year: 2016, label: 'Micius launch', status: 'shipped' },
      { year: 2017, label: 'Beijing-Shanghai 2,000km trunk operational', status: 'shipped' },
      { year: 2022, label: '4,600km integrated space-ground network', status: 'shipped' },
      { year: 2025, label: 'Jinan-1 microsatellite multi-ground-station demo; 12,900km China-South Africa link', status: 'shipped' },
      { year: 2026, label: '~12,000km / 145 nodes / 80 cities / 17 provinces operational', status: 'shipped' },
      { year: '2026-30', label: 'Continued buildout under 15th Five-Year Plan', status: 'aspirational' },
    ],
    gatingChallenge: 'Closed ecosystem — no Western interoperability path.',
    definitionOfSuccess: 'National-scale quantum-secured comms backbone covering all critical infrastructure.',
    partners: 'PLA, Chinese state banks, State Grid',
  },
  {
    slug: 'euroqci',
    vendor: 'EU EuroQCI',
    modality: 'National terrestrial QKD networks (26 Member States) + Eagle-1 LEO satellite',
    credibilityScore: 8,
    credibilityNotes: 'Funded under Digital Europe + Horizon; NOSTRADAMUS certification path at JRC Ispra.',
    milestones: [
      { year: '2023-25', label: 'Phase 1: national networks, industrial building blocks', status: 'shipped' },
      { year: 2026, label: 'SEEWQCI cross-border launch (Feb); NOSTRADAMUS operational at JRC Ispra', status: 'shipped' },
      { year: 2026, label: 'Eagle-1 satellite launch (target late 2026)', status: 'aspirational' },
      { year: '2030+', label: 'Integrated EU operational capability', status: 'aspirational' },
    ],
    gatingChallenge: '27 Member State coordination; cross-border interoperability.',
    definitionOfSuccess: 'Pan-European quantum-secured government and critical-infrastructure backbone.',
    partners: 'EU Member States, EU institutions, defense and diplomatic comms',
  },
  {
    slug: 'darpa-quanet',
    vendor: 'DARPA QuANET',
    modality: 'Quantum-augmented metropolitan networks — classical-quantum interoperability',
    credibilityScore: 8,
    credibilityNotes: 'Three-phase 60-month program with demonstrated first-year hackathon milestone.',
    milestones: [
      { year: 2024, label: 'Program start; USC ISI ($18M), Leidos ($8.57M) awards', status: 'shipped' },
      { year: 2025, label: 'First functioning quantum-augmented network at 10-month hackathon', status: 'shipped' },
      { year: '2028-29', label: 'Field-deployable hybrid network architecture (end of 5-yr program)', status: 'aspirational' },
    ],
    gatingChallenge: 'Achieving 0.7ms / 6.8 Mbps real-time at scale beyond demo conditions.',
    definitionOfSuccess: 'Deployable architecture for DoD; downstream to commercial telcos.',
    partners: 'USC ISI, Leidos, downstream commercial telcos',
  },
  {
    slug: 'cisco-atom',
    vendor: 'Cisco + Atom Computing (March 2026 MOU)',
    modality: 'Linking neutral-atom QPUs via Cisco networking + compiler',
    credibilityScore: 7.5,
    credibilityNotes: 'MOU rather than binding contract; Cisco networking incumbency + Atom roadmap is credible.',
    milestones: [
      { year: 2026, label: 'MOU signed March 25', status: 'shipped' },
      { year: '2026-27', label: 'Joint evaluation; compiler integration; QPU-to-network interface spec', status: 'announced' },
      { year: '2028+', label: 'Demonstrated multi-QPU distributed workload', status: 'aspirational' },
    ],
    gatingChallenge: 'Photonic interconnect fidelity between trapped-atom systems.',
    definitionOfSuccess: 'Standardized distributed-quantum-computing fabric over standard telecom.',
    partners: 'Cisco, Atom Computing, eventually enterprise/HPC operators',
  },
];

// PQC GOVERNMENT TIMELINES
export interface PqcRegulation {
  slug: string;
  jurisdiction: string;
  framework: string;
  status: 'in-effect' | 'phased' | 'upcoming';
  milestones: { year: number | string; label: string; phase?: string }[];
  enforcement: string;
  challenge: string;
}

export const PQC_TIMELINES: PqcRegulation[] = [
  {
    slug: 'us-nist',
    jurisdiction: 'United States',
    framework: 'NIST PQC Standardization',
    status: 'in-effect',
    milestones: [
      { year: 2024, label: 'FIPS 203 (ML-KEM), 204 (ML-DSA), 205 (SLH-DSA) finalized', phase: 'standards live' },
      { year: 2025, label: 'HQC selected as 5th algorithm (code-based KEM)', phase: 'diversification' },
      { year: 2026, label: 'Draft FIPS for HQC; FN-DSA draft pending', phase: 'standards' },
      { year: 2027, label: 'HQC + FN-DSA finalization', phase: 'standards' },
    ],
    enforcement: 'Algorithm authority; downstream regulations cite NIST',
    challenge: 'On-ramp competition for non-lattice signatures continues',
  },
  {
    slug: 'us-nsa-cnsa2',
    jurisdiction: 'United States',
    framework: 'NSA CNSA 2.0 (National Security Systems)',
    status: 'phased',
    milestones: [
      { year: 2022, label: 'NSM-10 directs federal PQC transition', phase: 'policy' },
      { year: 2027, label: 'All new NSS acquisitions must be CNSA 2.0 compliant (HARD DEADLINE)', phase: 'mandate begins' },
      { year: 2030, label: 'All deployed NSS software/firmware must use CNSA 2.0 signatures', phase: 'enforcement' },
      { year: 2031, label: 'Full CNSA 2.0 enforcement across NSS cryptographic implementations', phase: 'enforcement' },
      { year: 2035, label: 'Full migration target for all NSS', phase: 'completion' },
    ],
    enforcement: 'Withholding of FedRAMP, ATO, acquisition authority; NSA is enforcement authority',
    challenge: 'Embedded crypto in legacy weapons platforms with 30+ year service life; supply-chain assurance',
  },
  {
    slug: 'us-cisa',
    jurisdiction: 'United States',
    framework: 'CISA EO 14306 — Product Categories List',
    status: 'in-effect',
    milestones: [
      { year: 2025, label: 'EO 14306 (Jun 6) — amends EO 14144, directs CISA to publish PQC product-categories list', phase: 'policy' },
      { year: 2026, label: 'CISA Product Categories List published Jan 23 (delayed from Dec 2025)', phase: 'mandate begins' },
      { year: '2026+', label: 'Updates to "Widely Available" vs "Transitioning" tiers periodically', phase: 'ongoing' },
    ],
    enforcement: 'Vendors must implement FIPS 203/204/205 to qualify; affects federal procurement',
    challenge: 'Two-tier system creates compliance ambiguity for cross-tier products',
  },
  {
    slug: 'us-fips-140',
    jurisdiction: 'United States',
    framework: 'FIPS 140-2 → 140-3 Transition',
    status: 'upcoming',
    milestones: [
      { year: 2026, label: 'September 21 — all FIPS 140-2 certificates move to Historical', phase: 'HARD DEADLINE' },
      { year: '2026+', label: 'Only FIPS 140-3 validations support new federal acquisitions', phase: 'ongoing' },
    ],
    enforcement: 'Required for federal procurement; affects HSM/library vendors universally',
    challenge: 'Lab queue backlog; module vendors must re-validate against FIPS 140-3 (ISO/IEC 19790)',
  },
  {
    slug: 'eu',
    jurisdiction: 'European Union',
    framework: 'EU Coordinated Implementation Roadmap',
    status: 'phased',
    milestones: [
      { year: 2024, label: 'Commission Recommendation published (April)', phase: 'policy' },
      { year: 2025, label: 'NIS Cooperation Group publishes Part 1 of Roadmap (June)', phase: 'guidance' },
      { year: 2026, label: 'Milestone 1 (Dec 31): cryptographic inventories complete', phase: 'discovery' },
      { year: 2030, label: 'Milestone 2 (Dec 31): PQC transition for all high-risk use cases', phase: 'high-risk migration' },
      { year: 2035, label: 'Milestone 3 (Dec 31): PQC transition for medium-risk use cases', phase: 'broad migration' },
    ],
    enforcement: 'NIS2 Directive (fines up to 2% of global turnover); DORA for financial sector',
    challenge: '27 Member States × fragmented execution; BSI/ANSSI hybrid mandates add complexity',
  },
  {
    slug: 'uk-ncsc',
    jurisdiction: 'United Kingdom',
    framework: 'NCSC Three-Phase Plan',
    status: 'phased',
    milestones: [
      { year: 2028, label: 'Phase 1 (by): Discover cryptographic estate, build migration plan', phase: 'discovery' },
      { year: '2028-31', label: 'Phase 2: Execute high-priority upgrades', phase: 'migration' },
      { year: '2031-35', label: 'Phase 3: Complete migration across systems, services, products', phase: 'completion' },
    ],
    enforcement: 'Voluntary framework — supplier-relationship and procurement leverage via NCSC/CAF/PRA/FCA/Ofcom',
    challenge: 'Voluntary execution depends on board-level prioritization',
  },
  {
    slug: 'canada-cccs',
    jurisdiction: 'Canada',
    framework: 'CCCS ITSM.40.001',
    status: 'phased',
    milestones: [
      { year: 2025, label: 'ITSM.40.001 published (June 23)', phase: 'policy' },
      { year: 2026, label: 'April 1: All new digital-component contracts must include PQC procurement clauses', phase: 'HARD DEADLINE' },
      { year: 2026, label: 'April: Initial departmental migration plans due; annual reporting begins', phase: 'planning' },
      { year: 2031, label: 'High-priority systems complete', phase: 'migration' },
      { year: 2035, label: 'Full GoC migration complete', phase: 'completion' },
    ],
    enforcement: 'Treasury Board procurement authority',
    challenge: 'UNCLASSIFIED through PROTECTED B scope — algorithms must be disabled/isolated/tunnelled, not merely supplemented',
  },
  {
    slug: 'japan',
    jurisdiction: 'Japan',
    framework: 'METI / NISC / CRYPTREC / NCSB',
    status: 'phased',
    milestones: [
      { year: 2025, label: 'METI cyber-industry policy package (Mar); SBOM joint framework (Sep)', phase: 'policy' },
      { year: 2026, label: 'PQShield ML-KEM evaluation for CRYPTREC (Apr); ML-KEM expected on CRYPTREC list', phase: 'standards' },
      { year: 2027, label: 'Formal national PQC roadmap expected from NCO (May)', phase: 'planning' },
      { year: 2035, label: 'Government PQC transition target', phase: 'completion' },
    ],
    enforcement: 'CRYPTREC inclusion drives procurement and regulated-sector adoption',
    challenge: 'No statutory penalty; relies on METI guidance for critical infrastructure',
  },
  {
    slug: 'china',
    jurisdiction: 'China',
    framework: 'ShangMi (SM) Standards',
    status: 'in-effect',
    milestones: [
      { year: '2010s', label: 'SM2 (ECC), SM3 (hash), SM4 (block) standardized — GB/T 32907-2016', phase: 'in force' },
      { year: 2026, label: '15th Five-Year Plan elevates quantum to #1 of seven "future industries"', phase: 'policy' },
      { year: '2026-30', label: 'No public PQC algorithm replacing SM-suite; parallel QKD + research path', phase: 'unclear' },
    ],
    enforcement: 'State Cryptography Administration (SCA); mandates SM-suite for licensed products + critical infrastructure',
    challenge: 'Multinationals must implement SM-suite in China AND NIST PQC in West — crypto-agility mandatory',
  },
];
