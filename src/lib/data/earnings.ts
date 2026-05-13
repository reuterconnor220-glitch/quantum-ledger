/**
 * Earnings tracker for public quantum-exposed names.
 * Updated within 48h of each call. Distilled summaries, key quotes, what changed,
 * and read-through for the broader sector.
 */

export interface EarningsCall {
  ticker: string;
  company: string;
  quarter: string;
  reportDate: string;          // YYYY-MM-DD
  callDate?: string;
  revenue?: { value: string; yoy?: string; note?: string };
  netLoss?: { value: string; note?: string };
  cash?: { value: string; note?: string };
  guidance?: string;
  /** 1-line takeaway */
  headline: string;
  /** 2-3 sentence distillation of the call */
  takeaway: string;
  /** Notable quotes from the call */
  quotes?: { speaker: string; quote: string }[];
  /** What changed in our read on the company since prior quarter */
  whatChanged?: string;
  /** Sector read-through */
  readthrough?: string;
  /** Direct link to filings/transcript */
  sourceUrl?: string;
}

export const EARNINGS_CALLS: EarningsCall[] = [
  // ===== IonQ — Q1 2026 =====
  {
    ticker: 'IONQ',
    company: 'IonQ',
    quarter: 'Q1 2026',
    reportDate: '2026-05-07',
    revenue: { value: '$32.5M', yoy: '+135% YoY', note: 'Beat consensus by ~$3M' },
    netLoss: { value: '$95.2M', note: 'Widened on Oxford Ionics integration costs' },
    cash: { value: '$546M', note: 'Down $80M sequentially on acquisition-related cash use' },
    guidance: '2026 full-year revenue raised to $235–250M (from $225–245M)',
    headline: 'Revenue beat with raised guidance; Oxford Ionics integration on track.',
    takeaway:
      "Cleanest print in the public quantum cohort this quarter. Revenue beat, guidance raised, AQ progression on schedule. Management spent meaningful call time on the Oxford Ionics tuck-in (~$1.075B) and the path to AQ 64 → AQ 96 → AQ 128. Forte Enterprise on-prem deal pipeline reportedly healthy.",
    quotes: [
      {
        speaker: 'Niccolo de Masi, CEO',
        quote: '"We continue to see strong demand for quantum compute and on-premise systems. Oxford Ionics integration is on track and accretive to our 2027 roadmap."',
      },
      {
        speaker: 'Thomas Kramer, CFO',
        quote: '"We are tightening guidance to the higher end of our prior range, reflecting continued momentum in bookings."',
      },
    ],
    whatChanged:
      "Increases our conviction that IonQ has the most diversified commercial revenue mix in the public cohort. Reinforces commercial score in the Ledger Score; reduces concentration risk weighting.",
    readthrough:
      "Bullish for Quantinuum's IPO — IonQ's $32.5M quarter (with diverse customers) provides a positive read-across to QNT's $30.9M full-year revenue (60% RIKEN-concentrated). RGTI's $4.4M quarter looks even worse by comparison.",
    sourceUrl: 'https://www.ionq.com/news',
  },

  // ===== Rigetti — Q1 2026 =====
  {
    ticker: 'RGTI',
    company: 'Rigetti Computing',
    quarter: 'Q1 2026',
    reportDate: '2026-05-12',
    revenue: { value: '$4.4M', yoy: '+198% sequentially (off Q4 base)', note: 'Year-over-year still negative' },
    netLoss: { value: '$67.1M', note: 'Heavily influenced by warrant-related non-cash items' },
    cash: { value: '$589.8M', note: 'ATM facility continuing to fund operations' },
    guidance: 'No 2026 full-year revenue guidance issued',
    headline: 'Strong cash position, sequential revenue rebound, but no full-year guidance.',
    takeaway:
      "Quarter is a sequential improvement off a depressed Q4 2025 base but does not change the structural picture. No 2026 revenue guidance is conspicuous. Stage A elimination from DARPA QBI continues to weigh on the strategic narrative, though management deflected on the call. Balance sheet remains the saving grace — ~$590M cash gives multiple years of runway at current burn.",
    quotes: [
      {
        speaker: 'Subodh Kulkarni, CEO',
        quote: '"We continue to make progress on our 84-qubit Ankaa-3 system and on our roadmap to 100+ qubit systems. Government contracts remain an important part of our business."',
      },
    ],
    whatChanged:
      "No change to our Ledger Score read — RGTI remains the cleanest public-pure-play to be short relative to the rest of the cohort. ~890x P/S against declining year-over-year revenue is unjustified at this scale.",
    readthrough:
      "Negative read-across for QUBT and ARQQ — both trade at extreme multiples on similarly thin revenue. Reinforces the bull case for IONQ and QBTS as the only public names with genuine revenue scale.",
    sourceUrl: 'https://investors.rigetti.com/',
  },

  // ===== D-Wave — Q1 2026 =====
  {
    ticker: 'QBTS',
    company: 'D-Wave Quantum',
    quarter: 'Q1 2026',
    reportDate: '2026-05-08',
    revenue: { value: '$15.0M', yoy: '+509% YoY', note: 'Boosted by Advantage2 system sale to Florida Atlantic University' },
    netLoss: { value: '$28.5M', note: 'Sequentially narrowing' },
    cash: { value: '$325M', note: 'Bolstered by recent ATM and registered direct offerings' },
    guidance: '2026 revenue guidance $80–95M (previous: $70–85M)',
    headline: 'Largest revenue beat in the cohort; first US university system sale.',
    takeaway:
      "Most impressive quarter in the public quantum cohort by growth rate. $20M FAU sale (first US university to own rather than rent a full quantum system) drove the bulk of recognition. Annealing customer wins in operations research / logistics continue to convert. 83% GAAP gross margins make D-Wave the only quantum vendor with a path to operating profitability on current trajectory.",
    quotes: [
      {
        speaker: 'Alan Baratz, CEO',
        quote: '"FAU\'s acquisition of Advantage2 signals what we have been saying for years — quantum annealing is a commercial product today, not a future bet. We expect more on-premise system sales through 2026."',
      },
    ],
    whatChanged:
      "Material positive update for D-Wave's commercial score. Annealing thesis is being de-risked by sustained customer adoption. Tech score remains capped (annealing not gate-model), but commercial trajectory is unrivaled in the cohort.",
    readthrough:
      "Annealing is no longer 'about to be obsolete' — system sales suggest a durable niche around optimization workloads. Mixed read-across for gate-model vendors: D-Wave's customers are unlikely to switch to a 50-qubit superconducting machine for combinatorial optimization in the next 2-3 years.",
    sourceUrl: 'https://ir.dwavesys.com/',
  },

  // ===== Quantum Computing Inc — Q1 2026 =====
  {
    ticker: 'QUBT',
    company: 'Quantum Computing Inc.',
    quarter: 'Q1 2026',
    reportDate: '2026-05-13',
    revenue: { value: '$3.7M', yoy: '+9,364% YoY (off near-zero base)', note: 'Driven by entropy-product orders + small TFLN chip sales' },
    netLoss: { value: '$15.8M', note: 'Operating loss narrowed vs Q4' },
    cash: { value: '~$280M', note: 'Recent ATM issuance funded balance sheet' },
    headline: 'Revenue inflecting off near-zero base; multiple still extreme.',
    takeaway:
      "Pivot to commercial photonic chip sales is starting to show modest revenue, but $3.7M against ~$2.5B market cap is the cleanest 'narrative-only' valuation in the public cohort. No DARPA QBI participation. Tech score remains the weakest among public names tracked.",
    whatChanged: "Minor uptick in our commercial score; no other dimension materially changes.",
    readthrough:
      "Reinforces the structural divergence between IONQ/QBTS (real revenue scale, defensible scoring) and QUBT/ARQQ (narrative-only multiples). Investors using the public cohort as a basket should weight the former two heavily and discount the latter two.",
    sourceUrl: 'https://quantumcomputinginc.com/news',
  },

  // ===== Honeywell — Q1 2026 (relevant for Quantinuum context) =====
  {
    ticker: 'HON',
    company: 'Honeywell International',
    quarter: 'Q1 2026',
    reportDate: '2026-04-29',
    revenue: { value: '$10.2B', yoy: '+4%', note: 'Aerospace and Performance Materials drove growth' },
    headline: 'Quantinuum filing confirmed on call; partial liquidity for HON shareholders flagged.',
    takeaway:
      "HON's quarter was largely in line on the core businesses, but the relevant disclosure for Quantum Ledger readers was the explicit confirmation of Quantinuum's S-1 (filed May 8). Vimal Kapur fielded multiple analyst questions on Quantinuum and confirmed the 'gradual reduction' of HON's ~54% stake post-IPO. No special dividend announced. Jefferies estimates ~$7/share of latent HON value tied to Quantinuum.",
    quotes: [
      {
        speaker: 'Vimal Kapur, CEO',
        quote: '"We are pleased with the milestone Quantinuum has reached with its S-1 filing. We will be a long-term shareholder and intend to reduce our stake gradually over time as appropriate."',
      },
    ],
    whatChanged: "Confirms Honeywell as the closest large-cap proxy for QNT exposure pre-IPO. See /companies/honeywell for the deeper writeup.",
    readthrough:
      "QNT pricing in June 2026 will create a discrete mark-to-market event for HON shareholders. If QNT prices at $20B (HON's ~54% stake ≈ $10.8B), the implied per-share value for HON owners is materially positive vs. current consensus.",
    sourceUrl: 'https://investor.honeywell.com/',
  },

  // ===== IBM — Q1 2026 (quantum mentions only) =====
  {
    ticker: 'IBM',
    company: 'IBM',
    quarter: 'Q1 2026',
    reportDate: '2026-04-23',
    revenue: { value: '$14.5B', yoy: '+1%', note: 'Software and Consulting growth offset Infrastructure softness' },
    headline: 'Heron processor and Starling 2029 roadmap reaffirmed; quantum revenue not separately disclosed.',
    takeaway:
      "Quantum is immaterial to IBM's $14.5B quarter, but Arvind Krishna devoted ~2 minutes of prepared remarks to the Heron processor and IBM Quantum Network growth past 350 enterprise members. The Starling 2029 target (200 logical qubits, qLDPC bivariate-bicycle code) was reaffirmed.",
    quotes: [
      {
        speaker: 'Arvind Krishna, CEO',
        quote: '"Our roadmap to Starling in 2029 — 200 error-corrected logical qubits — is on track. The qLDPC architecture we introduced in Nature in 2024 fundamentally changes the qubit-overhead math for fault-tolerance."',
      },
    ],
    whatChanged:
      "Modest positive for IBM's tech score — Starling 2029 timeline maintained, qLDPC story credible.",
    readthrough:
      "Bullish for the FTQC 2029 cohort thesis (IBM, Quantinuum, Xanadu all targeting 2029). Three independent paths converging on the same year strengthens the broader 2030 utility-scale narrative.",
    sourceUrl: 'https://www.ibm.com/investor/',
  },
];

export const EARNINGS_TICKERS_TRACKED = ['IONQ', 'RGTI', 'QBTS', 'QUBT', 'HON', 'IBM'] as const;

/** Upcoming earnings — manually maintained until we automate via SEC EDGAR */
export const UPCOMING_EARNINGS = [
  { ticker: 'IONQ', expectedDate: '2026-08-06', quarter: 'Q2 2026' },
  { ticker: 'RGTI', expectedDate: '2026-08-11', quarter: 'Q2 2026' },
  { ticker: 'QBTS', expectedDate: '2026-08-07', quarter: 'Q2 2026' },
  { ticker: 'QUBT', expectedDate: '2026-08-12', quarter: 'Q2 2026' },
  { ticker: 'HON', expectedDate: '2026-07-30', quarter: 'Q2 2026' },
  { ticker: 'IBM', expectedDate: '2026-07-22', quarter: 'Q2 2026' },
];
