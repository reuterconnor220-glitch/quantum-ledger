/**
 * The Ledger Score — Quantum Ledger's signature scoring framework.
 *
 * Four dimensions, each 0–100, weighted into a composite 0–100 score.
 * Methodology is published; every input has a source; updates monthly.
 *
 * Dimensions:
 *   - Tech (30%)              : best published gate fidelity, logical qubits, coherence ratio
 *   - Capital (20%)           : runway, recent valuation momentum, market access
 *   - Commercial (30%)        : TTM revenue, growth, customer base, concentration risk
 *   - Government validation (20%): DARPA QBI stage, US2QC, NATO/EU programs, major contracts
 *
 * Scoring uses inputs cited inline. Where a public figure isn't disclosed, the entry uses
 * the most credible third-party estimate and flags the assumption.
 */

export interface ScoreBreakdown {
  tech: number;
  capital: number;
  commercial: number;
  government: number;
  total: number;
}

export interface LedgerScoreEntry {
  slug: string;
  name: string;
  ticker?: string;
  isPublic: boolean;
  scores: ScoreBreakdown;
  /** Headline takeaway in one sentence */
  thesis: string;
  /** Key drivers per dimension */
  drivers: {
    tech: string;
    capital: string;
    commercial: string;
    government: string;
  };
  /** Direction of travel since last update */
  trend: 'up' | 'down' | 'flat';
  /** Standout positive */
  bull: string;
  /** Standout risk */
  bear: string;
}

export const SCORE_WEIGHTS = {
  tech: 0.30,
  capital: 0.20,
  commercial: 0.30,
  government: 0.20,
};

export function computeTotal(b: Omit<ScoreBreakdown, 'total'>): number {
  return Math.round(
    b.tech * SCORE_WEIGHTS.tech +
    b.capital * SCORE_WEIGHTS.capital +
    b.commercial * SCORE_WEIGHTS.commercial +
    b.government * SCORE_WEIGHTS.government
  );
}

function entry(
  slug: string,
  name: string,
  ticker: string | undefined,
  isPublic: boolean,
  scores: Omit<ScoreBreakdown, 'total'>,
  thesis: string,
  drivers: LedgerScoreEntry['drivers'],
  trend: LedgerScoreEntry['trend'],
  bull: string,
  bear: string,
): LedgerScoreEntry {
  return {
    slug,
    name,
    ticker,
    isPublic,
    scores: { ...scores, total: computeTotal(scores) },
    thesis,
    drivers,
    trend,
    bull,
    bear,
  };
}

/**
 * Initial scores — May 2026 publication.
 * Inputs cited in /methodology page. Reviewed monthly.
 */
export const LEDGER_SCORES: LedgerScoreEntry[] = [
  entry(
    'quantinuum',
    'Quantinuum',
    'QNT',
    false, // S-1 filed but not priced
    { tech: 92, capital: 78, commercial: 64, government: 80 },
    'Highest-fidelity gate-model machine plus a credible Apollo 2029 fault-tolerant target; IPO is the swing factor for the entire cohort.',
    {
      tech: 'Helios (Nov 2025) at 99.921% 2Q fidelity — the highest publicly benchmarked on commercial hardware. 48 logical qubits demonstrated.',
      capital: '$677M cash pre-IPO; $1.5B target raise; $15-20B IPO valuation roughly 2× Sep 2025 private mark.',
      commercial: '$30.9M FY25 revenue (+34% YoY) but 60% concentrated in RIKEN; Q1 2026 dropped 73% YoY on revenue lumpiness.',
      government: 'DARPA QBI Stage B advancer (Nov 2025). National Security Agreement in place. AUKUS-aligned with strong UK/AU footprint.',
    },
    'up',
    'Helios fidelities + Apollo 2029 commitment are the most credible in the cohort; IPO pricing is the swing variable for every quantum stock.',
    '60% RIKEN concentration; Q1 2026 revenue collapse; Up-C TRA pre-empts ~85% of cash tax savings; isotope single-supplier risk.',
  ),
  entry(
    'ionq',
    'IonQ',
    'IONQ',
    true,
    { tech: 80, capital: 88, commercial: 82, government: 70 },
    'Only public quantum pure-play >$100M revenue; AQ 64 hit early; Oxford Ionics acquisition consolidated the trapped-ion field.',
    {
      tech: '99.99% 2Q fidelity claim (subject to verification scope); AQ 64 hit Sept 2025 ahead of plan; Tempo target ~96 AQ. Acquired Oxford Ionics for $1.075B.',
      capital: '~$546M cash; FY25 revenue $130M (+202% YoY); 2026 guide $225–245M. Best balance-sheet position among public pure-plays.',
      commercial: 'Diverse customer base (DoE, AFRL, Hyundai, Airbus, Astrazeneca pilots) — least concentrated revenue in the public cohort.',
      government: 'DARPA QBI Stage B; Air Force Research Lab + DoE Quantum Networks contracts; Oak Ridge installation. Lower than Quantinuum on US2QC.',
    },
    'up',
    'Most diversified public pure-play; only quantum company likely to hit $250M+ revenue in 2026.',
    '2M-qubit / 2030 narrative is the most aggressive in the cohort — execution gap is widest; trading at ~150× P/S.',
  ),
  entry(
    'ibm',
    'IBM Quantum',
    'IBM',
    true,
    { tech: 88, capital: 95, commercial: 86, government: 70 },
    'Most credible commercial FTQC roadmap in the world (Starling 2029, 200 logical qubits via qLDPC); quantum is immaterial to IBM share price.',
    {
      tech: 'Heron 156-qubit chip with industry-leading layer fidelities; demonstrated qLDPC bivariate-bicycle code (12 logical / 288 physical, Bravyi et al. 2024).',
      capital: 'Mega-cap parent ($200B+ market cap); R&D budget effectively uncapped relative to peers.',
      commercial: '350+ enterprise members on IBM Quantum Platform; multi-year subscriptions in the $1M+ tier. Boeing, Mitsubishi Chemical, Daimler, ExxonMobil among named customers.',
      government: 'DARPA QBI Stage B; Cleveland Clinic, U Tokyo, US national-lab partnerships. Lower than Quantinuum on US2QC.',
    },
    'flat',
    'Only credible large-cap with a public 200-logical-qubit roadmap; commercial network effects are real.',
    'Quantum is immaterial to IBM stock; execution risk on Starling 2029 vs Quantinuum Apollo 2029 is the head-to-head to watch.',
  ),
  entry(
    'psiquantum',
    'PsiQuantum',
    undefined,
    false,
    { tech: 76, capital: 92, commercial: 40, government: 95 },
    'Strongest single technical validation in DARPA US2QC; capital-intensive million-qubit photonic bet with the deepest government backing.',
    {
      tech: 'Photonic GKP/measurement-based architecture; Omega manufacturable chipset with GlobalFoundries; component-loss budget is the central physics question.',
      capital: '~$6B valuation post-March 2025 $750M raise; $940M Australia/Queensland commitment; IQMP (Illinois Quantum Microelectronics Park) construction underway.',
      commercial: 'No commercial revenue today — strategy is to skip NISQ entirely and ship FTQC at scale. High execution risk on a long horizon.',
      government: 'US2QC final phase (Stage C equivalent) — the deepest validation any company has received. $22.5M + $10.8M AFRL contracts.',
    },
    'up',
    'Government validation depth + capital base unmatched; if photonic FTQC works at scale, the prize is the entire market.',
    'Zero NISQ revenue means no feedback loop; loss budgets at million-qubit scale remain unsolved; longest payoff horizon in the sector.',
  ),
  entry(
    'rigetti',
    'Rigetti Computing',
    'RGTI',
    true,
    { tech: 52, capital: 80, commercial: 18, government: 25 },
    'Public pure-play with $590M cash and the cleanest negative differential signal in the sector — DARPA QBI Stage A only.',
    {
      tech: 'Ankaa-3 84-qubit chip; 99% 2Q fidelity on best gates. Behind IBM/Google/Quantinuum on layer fidelity and modular architecture.',
      capital: '~$590M cash; $6.3B market cap; ATM offerings have funded the balance sheet. Long runway but narrative-driven valuation.',
      commercial: '$7.1M FY25 revenue (-34% YoY) — only public quantum company with declining revenue. Trades at ~890× P/S.',
      government: 'Stage A only; did not advance to DARPA QBI Stage B in November 2025. AFRL contracts continuing but no Stage C path.',
    },
    'down',
    'Strong balance sheet provides time to execute; meme-stock dynamics keep multiple high relative to fundamentals.',
    '~890× trailing P/S against declining revenue; missed Stage B cut; commercial traction is the worst in the public cohort.',
  ),
  entry(
    'dwave',
    'D-Wave Quantum',
    'QBTS',
    true,
    { tech: 50, capital: 72, commercial: 64, government: 35 },
    'Annealing, not gate-model — fastest revenue growth in the public cohort but distinct from the long-term FTQC bet.',
    {
      tech: 'Advantage2 ~4,400-qubit annealer (NB: annealing qubits, not gate-model). 83% GAAP gross margins — only profitable-on-gross-margin quantum vendor.',
      capital: 'Improving balance sheet from 2025 equity raises; cash position rebuilt to ~$300M+.',
      commercial: '$24.6M FY25 revenue (+179%). Strong vertical play in operations research / logistics / scheduling. NatWest deployed.',
      government: 'Florida Atlantic University acquired its own Advantage2 (~$20M, first US university owned). Lower government program exposure.',
    },
    'up',
    'Only quantum vendor with positive GAAP gross margins; growth rate is the highest among public names.',
    'Annealing roadmap diverges from gate-model FTQC narrative; not a beneficiary of QBI / FTQC milestones in the same way.',
  ),
  entry(
    'atom-computing',
    'Atom Computing',
    undefined,
    false,
    { tech: 78, capital: 70, commercial: 35, government: 75 },
    'Leading neutral-atom path; Microsoft partnership delivered 24 logical qubits in a packaged system.',
    {
      tech: '1,180-atom Phoenix system (largest publicly demonstrated array); 24 logical qubits in Microsoft-packaged on-prem unit (Jan 2025); erasure conversion architecture.',
      capital: 'Series C $60M+ (2025); private valuation undisclosed publicly. Microsoft commercial pull is a partial capital substitute.',
      commercial: 'Pre-revenue commercially; first on-prem delivery (with Microsoft) is the proof point. Mid-circuit measurement still ramping.',
      government: 'DARPA QBI Stage B; prior US2QC pilot relationship. Strong DOE QIS center collaborations.',
    },
    'up',
    'Microsoft logical-qubit packaging is the most credible neutral-atom commercialization path.',
    'Correlated to Microsoft\'s topological strategy — if Majorana 1 fails, the joint roadmap takes collateral damage.',
  ),
  entry(
    'quera',
    'QuEra Computing',
    undefined,
    false,
    { tech: 82, capital: 65, commercial: 30, government: 75 },
    'Algorithmic fault-tolerance breakthrough with Harvard plus Stage B advancement — most cited neutral-atom technical milestones.',
    {
      tech: 'Gemini reconfigurable array; 48-logical-qubit experiment with Harvard (Bluvstein 2023); algorithmic FT demonstrations 2.14× below threshold.',
      capital: '~$230M total funding disclosed; QuEra has remained capital-efficient relative to PsiQuantum.',
      commercial: 'Aquila cloud access via AWS Braket; few named enterprise wins; revenue scale not publicly disclosed.',
      government: 'DARPA QBI Stage B; close DARPA / DOE / Harvard collaborations.',
    },
    'up',
    'Best technical-publication track record in neutral atoms; reconfigurable arrays enable new QEC topologies.',
    'Commercial scale not publicly demonstrated; private valuation likely modest vs peer set.',
  ),
  entry(
    'xanadu',
    'Xanadu',
    'XNDU',
    true,
    { tech: 68, capital: 50, commercial: 18, government: 70 },
    'Sole photonic Stage B advancer outside US2QC; loss budgets at scale remain the central technical question.',
    {
      tech: 'Aurora modular photonic platform (12 squeezed-light chips across 13km fiber); 60% optical loss reduction 2025; HyperLight TFLN partnership.',
      capital: 'Public via 2024 listing; $294M resale-share registration in May 2026 sent stock down 67% premarket — float-management cautionary tale.',
      commercial: 'Strawberry Fields software platform with developer mindshare; commercial revenue scale not disclosed.',
      government: 'DARPA QBI Stage B; deep Canadian government / NRC / DRDC ties.',
    },
    'down',
    'Photonics naturally enables networking and lower-temperature operation; 2029 FTQC commitment matches Quantinuum.',
    'Component-loss budget remains the dominant technical risk; recent float management cratered the stock — repeat risk.',
  ),
  entry(
    'google',
    'Google Quantum AI',
    'GOOGL',
    true,
    { tech: 90, capital: 100, commercial: 45, government: 55 },
    'Most empirically-validated below-threshold QEC demonstration (Willow); commercial monetization deliberately backseated.',
    {
      tech: 'Willow 105-qubit chip demonstrated below-threshold surface-code QEC at d=3/5/7 (2024 Nature). Most important QEC result to date.',
      capital: 'Alphabet parent; effectively uncapped R&D.',
      commercial: 'Quantum AI is research-mode at Google scale; no significant external customer business analogous to IBM Quantum Platform.',
      government: 'DARPA QBI Stage A (added Sept 2025) — too late for Nov 2025 Stage B cut. Acquired Atlantic Quantum October 2025.',
    },
    'up',
    'Willow result is the strongest empirical FTQC scaling proof anyone has published.',
    'Late to DARPA QBI; commercial monetization not part of strategy → less direct competitive pressure on revenue-tracking peers.',
  ),
  entry(
    'microsoft',
    'Microsoft Quantum',
    'MSFT',
    true,
    { tech: 60, capital: 100, commercial: 60, government: 92 },
    'US2QC final phase + Azure Quantum aggregator strategy — topological bet remains scientifically contested.',
    {
      tech: 'Majorana 1 chip announced Feb 2025 (8 topological qubits) — peer reviewers and Nature editorial team publicly disputed claim; underlying 2018 paper retracted. Atom Computing partnership functions as hedge.',
      capital: 'Mega-cap parent.',
      commercial: 'Azure Quantum aggregates IonQ, Quantinuum, Rigetti, Pasqal — distribution rather than direct compute revenue.',
      government: 'US2QC final phase (Stage C equivalent) — joint strongest government validation in the sector.',
    },
    'flat',
    'US2QC final-phase selection gives Microsoft equal validation depth to PsiQuantum despite topological controversy.',
    'Topological qubit operation at system scale remains unproven; if Majorana fails, falls back on Atom Computing partnership.',
  ),
  entry(
    'qubt',
    'Quantum Computing Inc.',
    'QUBT',
    true,
    { tech: 35, capital: 55, commercial: 14, government: 18 },
    'Pivoting to commercial photonic sales; revenue base remains minimal at ~$2.5B market cap.',
    {
      tech: 'Photonic systems for entropy/random-number generation and limited optimization workloads. Modest gate-model contribution.',
      capital: '~$2.5B market cap supported on minimal revenue; equity issuance has funded operations.',
      commercial: 'Q1 2026 revenue $3.7M (+9,364% YoY off near-zero base); commercial photonic chip orders growing but scale unproven.',
      government: 'No DARPA QBI participation. Limited federal contracting.',
    },
    'flat',
    'Pivot to commercial photonic hardware sales is the bull case if margins hold.',
    'Multiple is extreme relative to revenue; no DARPA validation; tech score lags peers materially.',
  ),
  entry(
    'arqq',
    'Arqit Quantum',
    'ARQQ',
    true,
    { tech: 28, capital: 35, commercial: 12, government: 20 },
    'Quantum-safe encryption (PQC layer), not quantum compute — different category than the rest of the cohort.',
    {
      tech: 'Symmetric-key delivery network and PQC enablement; not a quantum hardware company.',
      capital: '~$235M market cap; modest balance sheet.',
      commercial: '~$530K TTM revenue; strong intel-community relationships but limited commercial scale.',
      government: 'UK MoD and US DOD partnerships; not a DARPA QBI program participant.',
    },
    'flat',
    'Pure-play public exposure to the PQC migration narrative; first-mover in encryption-as-a-service for post-quantum era.',
    'Revenue under $1M and not in the QBI evaluation set; misclassified in the public quantum cohort by many investors.',
  ),

  // ===== Pass 2 (May 2026): added based on trend-researcher pass =====

  entry(
    'honeywell',
    'Honeywell',
    'HON',
    true,
    { tech: 86, capital: 100, commercial: 70, government: 80 },
    'Public mega-cap proxy for Quantinuum — ~54% owner ahead of QNT IPO at $15–20B target.',
    {
      tech: 'Inherits Quantinuum trapped-ion stack — Helios 99.921% 2Q fidelity, 48 logical qubits demonstrated.',
      capital: '$140B+ market cap; QNT IPO will mark Honeywell\'s stake (~$8–11B at midpoint).',
      commercial: 'Industrial conglomerate with diversified revenue; quantum is immaterial today but optionality value is large.',
      government: 'Inherits all Quantinuum government wins — DARPA QBI Stage B, US2QC adjacent, UK NQCC.',
    },
    'up',
    'IPO closes June 2026 at $20B+, marks HON stake at ~$11B and re-rates the multiple.',
    'IPO postpones or prices below $15B, compressing the proxy trade; Quantinuum dilution forces mark-down.',
  ),

  entry(
    'pasqal',
    'Pasqal',
    undefined,
    false,
    { tech: 72, capital: 74, commercial: 58, government: 55 },
    'Europe\'s neutral-atom champion with real bookings; SPAC merger announced at ~$2B pre-money.',
    {
      tech: '~100+ atom analog/digital platform; FTQC roadmap published 2025. No headline 2Q fidelity — fidelity disclosure is the weakest part of the tech narrative. Co-founded by Nobel laureate Alain Aspect.',
      capital: 'SPAC with Bleichroeder Acquisition Corp II announced March 2026 at ~$2.0B pre-money; potential $600M+ proceeds. Strategic backers Temasek, Wa\'ed, ARIA.',
      commercial: '~$80M booked and awarded business per SPAC deck; ~100% YoY unaudited revenue growth in 2025. On-prem systems delivered to GENCI, Jülich, Aramco. AWS Braket access.',
      government: 'EU Quantum Flagship participant; France 2030 PROQCIMA finalist; multiple EuroHPC hosting wins. Not in DARPA QBI Stage A or B.',
    },
    'up',
    'SPAC closes H2 2026; neutral atoms emerge as #2 modality behind ions; Pasqal locks in sovereign EU buyer base.',
    'Public listing forces fidelity disclosure that lags ion peers; SPAC trades down post-deSPAC like QUBT.',
  ),

  entry(
    'infleqtion',
    'Infleqtion',
    undefined,
    false,
    { tech: 65, capital: 78, commercial: 60, government: 40 },
    'Only quantum company with a real sensing revenue line funding the compute bet; SPAC merger at $1.8B announced.',
    {
      tech: 'Strontium neutral-atom computing + quantum sensing/PNT + atomic clocks. Roadmap targets logical qubits via dual-species architecture. Headline 2Q fidelity not disclosed publicly.',
      capital: '$100M Series C June 2025 (Glynn, Counterpoint, S32, SAIC). SPAC with Churchill Capital Corp X announced September 2025 at $1.8B valuation, ~$540M expected gross proceeds.',
      commercial: '~$30M revenue 2024; $200M+ customer pipeline disclosed. NVIDIA partner. Sensing/clock business is real revenue today.',
      government: 'Heavy DoD/IC exposure via SAIC investor. DARPA QBI Stage A only — not on Stage B list.',
    },
    'up',
    'Sensing/PNT becomes $100M+ business by 2027 on AUKUS/DoD wins; cleanest unit economics in the sector and optionality on neutral-atom compute.',
    'Two-product complexity dilutes focus; neutral-atom compute falls behind Pasqal/QuEra/Atom; post-SPAC trading punishes lack of fidelity numbers.',
  ),

  entry(
    'q-ctrl',
    'Q-CTRL',
    undefined,
    false,
    { tech: 60, capital: 70, commercial: 62, government: 85 },
    'Hardware-agnostic control software + AUKUS PNT prime; picks-and-shovels for whichever modality wins.',
    {
      tech: 'No qubits — software layer (Fire Opal, Boulder Opal) + quantum-assured navigation (Ironstone Opal). Published 111x positioning accuracy vs high-end INS in GPS-denied flight tests.',
      capital: 'Series B extended to $113M (total Series B $166M); cumulative >$180M. Private. Salesforce Ventures and In-Q-Tel-adjacent backers.',
      commercial: 'Software licensed across IBM, Rigetti, IonQ, Diraq stacks. Sensing customers across allied defense.',
      government: 'AUKUS Pillar 2 anchor — Australian DoD prime for quantum-assured navigation, shared with US/UK. DARPA $24.4M sensor award. UK NQCC partner.',
    },
    'up',
    'GPS-denied navigation becomes a hard DoD requirement; Q-CTRL wins program-of-record across one AUKUS service branch.',
    'Software margins compress as hardware vendors internalize control stacks; PNT contracts stay R&D-shaped not procurement-shaped.',
  ),

  entry(
    'alice-and-bob',
    'Alice & Bob',
    undefined,
    false,
    { tech: 72, capital: 62, commercial: 22, government: 28 },
    'Highest-conviction Western bet on bosonic cat-qubit codes; not advanced to QBI Stage B in November 2025.',
    {
      tech: 'Cat-qubit (bosonic) architecture with bias-noise structure suppressing bit-flips. Boson 4 chip Sept 2025: bit-flip lifetime >1 hour. "Elevator Codes" claim ~15:1 physical-to-logical ratio — best published if it holds at scale.',
      capital: '€104M Series B Jan 2025; additional €130M April 2026; cumulative >€230M. 200+ employees. Bpifrance, Future French Champions backers.',
      commercial: 'Limited disclosed revenue; cloud access via OVHcloud. LANL partnership on materials.',
      government: 'DARPA QBI Stage A — eliminated, did not advance to Stage B Nov 2025. France PROQCIMA finalist. EU Quantum Flagship.',
    },
    'up',
    'Elevator Codes ratio holds at 100+ logical qubits; Alice & Bob skips the 1000:1 overhead trap; France pulls a national-champion exit at $2B+ by 2028.',
    'Cat qubits stay an elegant lab demo; DARPA QBI Stage A elimination reflects roadmap thinness; PROQCIMA dollars run out before commercial advantage.',
  ),

  entry(
    'nord-quantique',
    'Nord Quantique',
    undefined,
    false,
    { tech: 75, capital: 50, commercial: 22, government: 70 },
    'Most capital-efficient bosonic claim in the field (1:1 physical:logical) — Stage B advancer with limited cap table.',
    {
      tech: 'Multi-mode bosonic qubits in superconducting cavities; claims 1:1 physical-to-logical ratio (single-cavity error correction) — most aggressive overhead claim in the sector. 2Q fidelity not yet published at scale.',
      capital: 'Private. Smaller cap table than peers. DARPA QBI Stage B contract worth ~$5M.',
      commercial: 'Pre-revenue or near-zero disclosed.',
      government: 'DARPA QBI Stage B Nov 2025 (confirmed). Canadian National Quantum Strategy beneficiary.',
    },
    'up',
    'Stage B validation forces revaluation; 1:1 ratio survives DARPA scrutiny; Nord becomes cheapest path to 100 logical qubits and an acquisition target.',
    '1:1 ratio is marketing — survives in toy systems, breaks under realistic noise; thin cap table forces down-round or fire-sale before Stage C.',
  ),

  entry(
    'photonic-inc',
    'Photonic Inc.',
    undefined,
    false,
    { tech: 70, capital: 78, commercial: 25, government: 80 },
    'Networked-FTQC contrarian bet with Microsoft alignment as the optionality; Stage B advancer.',
    {
      tech: 'Optically-linked silicon T-centre spin qubits at telecom wavelength; modular "Entanglement First" architecture for networked FTQC. First electrically-injected single-photon source in silicon via T-centres. 2Q fidelity not headlined.',
      capital: '$200M final close at $2B valuation April 2025. BCI lead; Microsoft strategic backer; BDC.',
      commercial: 'Pre-revenue; Microsoft Azure quantum networking partner.',
      government: 'DARPA QBI Stage B Nov 2025; in running for up to $316M total QBI dollars if it reaches Stage C.',
    },
    'up',
    'T-centre modularity becomes the only credible path to million-qubit systems; Microsoft acquires or anchors a strategic round at 3–5x.',
    'T-centre yields stay too low for commercial wafers; Microsoft\'s Majorana win makes Photonic redundant inside Azure portfolio.',
  ),

  entry(
    'diraq',
    'Diraq',
    undefined,
    false,
    { tech: 68, capital: 50, commercial: 18, government: 80 },
    'The thesis bet that scalable quantum runs through a CMOS fab, not a custom one; Stage B with imec partnership.',
    {
      tech: 'Silicon spin qubits in standard 300mm CMOS via imec. Late 2025: >99% 2Q gate fidelity on randomly-selected industrially-fabricated devices — credible industrial-fab milestone.',
      capital: 'A$20M NRFC investment 2025; Main Sequence Ventures, Quantonation backers. Total raised modest vs European silicon-spin peers.',
      commercial: 'Pre-revenue.',
      government: 'DARPA QBI Stage B Nov 2025, leading Australia-UK-US consortium with Riverlane. AUKUS-adjacent. Australian National Quantum Strategy.',
    },
    'up',
    '99% 2Q on a foundry process is a watershed; GlobalFoundries/imec replication makes Diraq the silicon-spin standard.',
    'Silicon spin remains years behind ions/atoms on logical qubits; thin cap table forces dilution; Quobly/Quantum Motion outraise on same physics.',
  ),

  entry(
    'quantum-motion',
    'Quantum Motion',
    undefined,
    false,
    { tech: 65, capital: 80, commercial: 30, government: 80 },
    'UK\'s national silicon-spin champion with the cleanest manufacturing story in the Stage B field; $160M Series C.',
    {
      tech: 'MOS-based silicon spin qubits. September 2025: delivered first full-stack silicon CMOS quantum computer to UK NQCC. GlobalFoundries manufacturing partnership.',
      capital: '$160M Series C May 2026 — largest European silicon-spin round to date. EU Scaleup Europe Fund (first investment), DCVC, Kembara, British Business Bank, Oxford Science Enterprises, Bosch Ventures.',
      commercial: 'NQCC deployment revenue; partnerships across UK QC testbed.',
      government: 'DARPA QBI Stage B Nov 2025. UK NQCC anchor tenant. Innovate UK / DSIT Quantum Missions funded.',
    },
    'up',
    '$160M war chest plus NQCC anchor plus GlobalFoundries puts Quantum Motion ahead of Diraq and Quobly on industrial scaling.',
    'Silicon-spin modality lags fundamentally on logical qubits; $160M burns fast at full-stack scope; "first full-stack" milestone overstates a small-qubit-count system.',
  ),

  entry(
    'sqc',
    'Silicon Quantum Computing (SQC)',
    undefined,
    false,
    { tech: 60, capital: 45, commercial: 15, government: 75 },
    'The atomic-precision donor science bet — Michelle Simmons\'s research moat; Stage B with smaller cap table.',
    {
      tech: 'Atomic-precision donor qubits in silicon via PAQMan process — bottom-up STM-fabricated devices. Distinct from Diraq\'s top-down CMOS approach. Logical-qubit demos not yet at Stage B-rival scale.',
      capital: 'AUD$20M NRFC investment 2025; smaller raised total vs peers. Australian government / UNSW anchor. Founder Michelle Simmons.',
      commercial: 'Pre-revenue.',
      government: 'DARPA QBI Stage B Nov 2025. Australian National Reconstruction Fund anchor. AUKUS-adjacent.',
    },
    'flat',
    'PAQMan donor qubits demonstrate uniquely long coherence; Stage B validates the bottom-up path; SQC becomes a strategic AUKUS asset.',
    'Bottom-up STM doesn\'t scale to manufacturing; donor approach falls 5–10 years behind top-down CMOS; thin cap table forces consolidation.',
  ),

  entry(
    'iqm',
    'IQM',
    undefined,
    false,
    { tech: 70, capital: 86, commercial: 70, government: 55 },
    'Europe\'s on-prem quantum systems vendor — selling boxes today while peers sell roadmaps; SPAC at $1.8B.',
    {
      tech: 'Superconducting transmon platform; on-prem systems deployed at LRZ, VTT, EuroHPC sites. 2Q fidelity not at Google/IBM tier publicly.',
      capital: '$320M Series B Sep 2025 at $1B valuation (Ten Eleven Ventures lead — largest non-US quantum round). SPAC merger Feb 2026 with Real Asset Acquisition Corp at $1.8B — first European quantum on US public markets. Total raised >€600M.',
      commercial: '~$35M unaudited 2025 revenue; 21 systems sold to 13 customers — highest unit count of any pure-play (rivals only D-Wave installed base).',
      government: 'EU Quantum Flagship anchor; multiple EuroHPC hosting contracts (Finland LUMI-Q, Germany, Spain, Poland). Not a DARPA QBI participant.',
    },
    'up',
    'SPAC closes at $1.8B with real revenue and 21-unit installed base; IQM becomes the European Quantinuum analog and rides EuroHPC procurement to $200M revenue by 2027.',
    'On-prem boxes are NISQ-era hardware that obsoletes the moment FTQC arrives; superconducting commoditizes; SPAC trades like Arqit and loses 60% on a 12-month view.',
  ),

  entry(
    'quobly',
    'Quobly',
    undefined,
    false,
    { tech: 58, capital: 40, commercial: 12, government: 55 },
    'France\'s silicon-spin entry leveraging CEA-Leti\'s fab as a moat; PROQCIMA finalist, out-raised by peers.',
    {
      tech: 'Silicon spin qubits on 300mm FD-SOI via CEA-Leti. 15+ years of CEA/CNRS research base, 40+ patent families. Targeting 100-qubit Q100T chip by 2027.',
      capital: '€21M (~$23.7M) financing 2025; Quantonation, Bpifrance backers; France 2030 PROQCIMA participant. Smaller cap table than Quantum Motion / Diraq.',
      commercial: 'Pre-revenue; Inria, TNO collaborations.',
      government: 'PROQCIMA finalist, EU SPINS pilot line participant. Not in DARPA QBI Stage A or B.',
    },
    'flat',
    'PROQCIMA shortlist hands Quobly €100M+ over 5 years; CEA-Leti gives it a manufacturing edge Quantum Motion/Diraq can\'t match in Europe.',
    'Out-raised 8:1 by Quantum Motion on same physics; no DARPA validation; 2027 100-qubit target slips into 2029 and France consolidates around Pasqal + Alice & Bob.',
  ),

  entry(
    'quantum-source',
    'Quantum Source',
    undefined,
    false,
    { tech: 60, capital: 48, commercial: 8, government: 30 },
    'The photonic dark horse with a deterministic-photon-source story that could leapfrog PsiQuantum\'s overhead problem.',
    {
      tech: 'Photonic FTQC platform using ORIGIN engine; deterministic photon source approach intended to avoid PsiQuantum\'s probabilistic-gate overhead. Pre-hardware demo at scale — no published 2Q fidelity.',
      capital: '~$77M cumulative including $50M Series A. Backers Eclipse, Standard Investments, Pitango, Grove, Dell Technologies Capital, 10D. Potential beneficiary of the planned $200M US-Israel quantum/AI fund.',
      commercial: 'Pre-revenue.',
      government: 'Israeli Innovation Authority. Cited as potential JV partner with PsiQuantum in proposed US-Israel fund. No DARPA QBI participation.',
    },
    'flat',
    'ORIGIN engine produces deterministic photons at demo scale; PsiQuantum partners or acquires; Quantum Source becomes the photonic source IP standard.',
    'Photonic FTQC is a 2030+ story regardless; cap table too thin for the capex; Israeli funding stays research-grade not procurement-grade.',
  ),

  entry(
    'riverlane',
    'Riverlane',
    undefined,
    false,
    { tech: 78, capital: 70, commercial: 55, government: 80 },
    'Hardware-agnostic QEC decoder picks-and-shovels — wins regardless of which qubit modality wins.',
    {
      tech: 'Deltaflow QEC stack and Local Clustering Decoder. December 2025 Nature Communications paper claims 1M error-free operations with 4× fewer qubits. Hardware-agnostic across modalities.',
      capital: '$75M Series C 2025, led by Planet First Partners. Cambridge Innovation Capital, Amadeus, UK NSSIF, Altair.',
      commercial: 'First UK commercial QEC deployment at CentreSquare (with OQC) July 2025; Deltaflow 2 installed at Oak Ridge National Lab Sept 2025 — first dedicated real-time QEC system at a US national lab.',
      government: 'DARPA QBI participant via three Stage A projects (with Rigetti, Atlantic Quantum, Diraq) — carries forward into Stage B inside Diraq consortium. UK DSIT Quantum Missions Pilot. NSSIF backed.',
    },
    'up',
    'Decoders become the bottleneck for every FTQC build; Riverlane becomes the Synopsys of quantum and gets acquired by IBM/NVIDIA at 5–10× revenue.',
    'Hardware vendors internalize decoders (IBM already has); QEC standards consolidate around open-source; revenue stays research-grant-shaped.',
  ),

  entry(
    'sandboxaq',
    'SandboxAQ',
    undefined,
    false,
    { tech: 50, capital: 92, commercial: 75, government: 85 },
    'PQC migration + GPS-denied magnetic navigation in one stack — built to monetize quantum\'s threat and adjacencies before any quantum computer matters.',
    {
      tech: 'Not a quantum-computing-hardware company. AI + simulation platform + PQC migration tooling (AQtive Guard) + AQNav GPS-denied magnetic-anomaly navigation with 450+ flight hours across USAF, Airbus Acubed, Boeing.',
      capital: '$450M+ Series E April 2025 at $5.75B valuation; total funding $950M+. Backers Ray Dalio, Horizon Kinetics, BNP Paribas, Google, NVIDIA.',
      commercial: 'Revenue not publicly disclosed but reportedly nine-figure with PQC migration deals; major enterprise customers via mandate-driven sales.',
      government: '5-year DoW (formerly DoD) CIO agreement Dec 2025 for cryptographic discovery and PQC migration. DIU Transition of Quantum Sensing program Nov 2025.',
    },
    'up',
    'NSM-10 PQC migration deadlines drive AQtive Guard into every Fortune 500 / DoD system; AQNav wins a program of record; IPO at $15B+ on real revenue.',
    'PQC migration is a one-time project not recurring; AQNav stays R&D-shaped; $5.75B valuation overpays for what is essentially a consulting business with a quantum wrapper.',
  ),

  entry(
    'multiverse',
    'Multiverse Computing',
    undefined,
    false,
    { tech: 40, capital: 85, commercial: 90, government: 35 },
    'Highest ARR of any "quantum" company — but the quantum link is thin; this is now classical-AI-compression with a quantum badge.',
    {
      tech: 'Tensor-network methods (originally quantum-inspired finance/optimization), pivoted to LLM compression via CompactifAI — compresses LLMs up to 95% while retaining performance. The quantum link is increasingly thin.',
      capital: '€189M / $215M Series B June 2025 at >$500M post-money (5× step-up from $108M Series A March 2024). In talks Feb 2026 for €500M at €1.5B. Backers Bullhound, HP Tech Ventures, Forgepoint, CDP, Santander Climate, Quantonation, Toshiba.',
      commercial: '€100M ARR reported Jan 2026 — by far the highest ARR of any "quantum" company. Driven almost entirely by CompactifAI not quantum.',
      government: 'Spanish PERTE quantum funding; EU Quantum Flagship participant.',
    },
    'up',
    '€1.5B valuation closes; €100M ARR doubles in 2026; Multiverse exits to NVIDIA/HP at $5B+ as the AI cost-compression standard.',
    'CompactifAI faces commoditization from open-source quantization; €1.5B valuation pre-bakes the entire upside; quantum origin becomes a liability not an asset.',
  ),

  entry(
    'classiq',
    'Classiq',
    undefined,
    false,
    { tech: 50, capital: 76, commercial: 50, government: 35 },
    'The compiler/IDE layer for quantum — wins if and only if developer-facing quantum programming becomes a real market.',
    {
      tech: 'High-level quantum algorithm synthesis platform — Qmod language, automatic circuit compilation. Hardware-agnostic. No qubits.',
      capital: '$110M Series C May 2025 led by Entrée Capital (Norwest, NightDragon, Hamilton Lane, Samsung Next, HSBC, Wing) — largest-ever quantum software round. Plus prior $30M from AMD, Qualcomm, IonQ. Total ~$173M.',
      commercial: 'Customers include BMW, Rolls-Royce, Citi, Comcast, Toshiba, SoftBank. Partnerships with NVIDIA, Microsoft, AWS.',
      government: 'Israeli Innovation Authority. No DARPA QBI direct participation.',
    },
    'up',
    'Classiq becomes the Verilog of quantum; enterprise pre-quantum spend ramps; acquired by NVIDIA or Microsoft at 10× revenue.',
    'Quantum hardware vendors push their own SDKs (Qiskit, Cirq, Quantinuum SDK); Classiq\'s neutral-layer pitch erodes; enterprise revenue stays POC-shaped.',
  ),

  entry(
    'zapata',
    'Zapata Quantum',
    undefined,
    false,
    { tech: 35, capital: 35, commercial: 15, government: 25 },
    'A turnaround story that needs at least two more quarters of revenue evidence before it\'s investable.',
    {
      tech: 'Quantum/classical generative AI software (Orquestra platform legacy); no hardware. Currently rebuilding product portfolio after October 2024 collapse.',
      capital: 'Was public (ZPTAQ pre-collapse); recapped private-equity-style. $3M bridge, $10M+ debt-to-equity conversion, $1.25M raise Nov 2025 at 3× step-up, $15M oversubscribed financing April 2026 led by Triatomic Capital. Regained SEC compliance Dec 2025.',
      commercial: 'Customer base hollowed out in the gap year; rebuilding.',
      government: 'Historical DARPA/IARPA grant participant; current status reduced.',
    },
    'flat',
    'Recapped Zapata Quantum monetizes the Orquestra IP into a focused quantum-software niche; Triatomic capital buys 18 months of runway.',
    'Reputational damage from the collapse is unrecoverable with enterprise buyers; Classiq, Multiverse, Riverlane now own the software lanes Zapata pioneered.',
  ),
];

export const SCORE_PUBLISH_DATE = '2026-05-13';
export const NEXT_REVIEW_DATE = '2026-06-13';

/**
 * Composite sector score — average of all current Ledger Score totals.
 * Used by /brief and homepage to surface a single "state of the sector" number.
 */
export function sectorAverageScore(): number {
  const all = LEDGER_SCORES.map((e) => e.scores.total);
  return Math.round(all.reduce((s, n) => s + n, 0) / all.length);
}

/** Last-update delta proxy — for now a stub; real impl will diff against archived snapshot */
export const SECTOR_SCORE_DELTA = 3; // points vs prior month publication

export function sectorMood(score: number): string {
  if (score >= 75) return 'Risk-on';
  if (score >= 60) return 'Cautiously Constructive';
  if (score >= 45) return 'Sober';
  if (score >= 30) return 'Defensive';
  return 'Capitulation';
}

export function scoreColor(score: number): string {
  if (score >= 80) return 'text-accent-data';
  if (score >= 60) return 'text-accent-quantum';
  if (score >= 40) return 'text-accent-warn';
  return 'text-accent-down';
}

export function scoreBg(score: number): string {
  if (score >= 80) return 'bg-accent-data/15';
  if (score >= 60) return 'bg-accent-quantum/15';
  if (score >= 40) return 'bg-accent-warn/15';
  return 'bg-accent-down/15';
}
