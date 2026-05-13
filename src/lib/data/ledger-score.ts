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
