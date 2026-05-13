/**
 * The /future page data layer. 60+ specific events from synthesized research
 * (5 parallel agents, May 2026). Every event has a probability score, category,
 * confidence rationale, and source citation.
 */

export type EventCategory =
  | 'tech'         // technical milestone
  | 'commercial'   // commercial deployment
  | 'government'   // government / policy
  | 'market'       // capital markets / IPO
  | 'crypto'       // cryptography
  | 'science'      // scientific result
  | 'industry';    // industry/sector impact

export interface FutureEvent {
  id: number;
  year: number;
  quarter?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  title: string;
  category: EventCategory;
  probability: number;     // 0-100
  impact: number;          // 1-10
  confidence: 'high' | 'medium' | 'low';
  rationale: string;
  sourceUrl?: string;
}

export const FUTURE_EVENTS: FutureEvent[] = [
  // 2026
  { id: 1, year: 2026, quarter: 'Q2', title: 'Quantinuum public S-1 filed (QNT)', category: 'market', probability: 98, impact: 9, confidence: 'high', rationale: 'Filed publicly May 8, 2026', sourceUrl: 'https://thequantuminsider.com/2026/05/08/honeywell-announces-quantinuums-filing-of-registration-statement-for-ipo/' },
  { id: 2, year: 2026, quarter: 'Q3', title: 'Quantinuum IPO prices at $20B+ valuation', category: 'market', probability: 65, impact: 9, confidence: 'medium', rationale: 'Target reported; market-condition dependent', sourceUrl: 'https://thenextweb.com/news/quantinuum-ipo-quantum-computing-honeywell' },
  { id: 3, year: 2026, quarter: 'Q3', title: 'IonQ–SkyWater acquisition closes', category: 'market', probability: 85, impact: 7, confidence: 'high', rationale: 'Shareholder vote cleared May 2026', sourceUrl: 'https://www.ionq.com/news/ionq-to-acquire-skywater-technology-creating-the-only-vertically-integrated-full-stack-quantum-platform-company' },
  { id: 4, year: 2026, quarter: 'Q3', title: 'FIPS 140-2 sunset — federal HSM re-validation wave', category: 'crypto', probability: 99, impact: 6, confidence: 'high', rationale: 'NIST CMVP — September 21, 2026', sourceUrl: 'https://csrc.nist.gov/projects/cryptographic-module-validation-program' },
  { id: 5, year: 2026, quarter: 'Q4', title: 'DARPA QBI Stage C selections (industry catalyst)', category: 'government', probability: 90, impact: 8, confidence: 'high', rationale: 'Stage B 11-team cohort kicked off Nov 2025', sourceUrl: 'https://www.darpa.mil/research/programs/quantum-benchmarking-initiative/stage-b-selection' },
  { id: 6, year: 2026, quarter: 'Q4', title: 'IBM Nighthawk full GA — 7,500 2Q gates across 3 modules', category: 'tech', probability: 75, impact: 7, confidence: 'medium', rationale: 'On 2026 IBM roadmap', sourceUrl: 'https://www.ibm.com/roadmaps/quantum/2026/' },
  { id: 7, year: 2026, quarter: 'Q4', title: 'IBM Kookaburra — first qLDPC modular processor', category: 'tech', probability: 80, impact: 7, confidence: 'high', rationale: 'Public 2026 commit, intermediate Loon already shipped', sourceUrl: 'https://www.ibm.com/quantum/blog/large-scale-ftqc' },
  { id: 8, year: 2026, quarter: 'Q4', title: 'Pasqal SPAC close → second neutral-atom public pure-play', category: 'market', probability: 80, impact: 5, confidence: 'high', rationale: 'SPAC announced Mar 2026', sourceUrl: 'https://www.pasqal.com/newsroom/pasqal-a-global-leader-in-neutral-atom-quantum-computing-to-go-public-via-business-combination-with-bleichroeder-acquisition-corp-ii/' },
  { id: 9, year: 2026, quarter: 'Q4', title: 'IBM Krishna predicts first real-world quantum advantage', category: 'commercial', probability: 50, impact: 8, confidence: 'medium', rationale: 'CEO statement; HSBC paper is bullish signal', sourceUrl: 'https://thequantuminsider.com/2026/04/30/ibms-krishna-predicts-first-real-world-quantum-advantage-in-2026/' },
  { id: 10, year: 2026, quarter: 'Q4', title: 'Global quantum private VC reaches $5.5B annually', category: 'market', probability: 60, impact: 5, confidence: 'medium', rationale: '$4.9B 2025 + 12% trajectory', sourceUrl: 'https://thequantuminsider.com/2026/04/14/global-quantum-computing-market-to-double-by-2028-reaching-3-billion-in-revenue-qed-c-state-of-the-global-quantum-industry-2026-report-finds/' },
  // 2027
  { id: 11, year: 2027, quarter: 'Q1', title: 'Atom + Microsoft Magne delivered — 50 logical qubits to Denmark', category: 'tech', probability: 80, impact: 8, confidence: 'high', rationale: 'First commercial Level-2 quantum computer', sourceUrl: 'https://quantumcomputingreport.com/denmarks-qunorth-to-acquire-50-logical-qubit-magne-quantum-computer-from-atom-computing-and-microsoft/' },
  { id: 12, year: 2027, quarter: 'Q1', title: 'NSA CNSA 2.0 hard mandate — new NSS acquisitions PQC-only', category: 'crypto', probability: 95, impact: 8, confidence: 'high', rationale: 'NSA CNSA 2.0 explicit deadline', sourceUrl: 'https://postquantum.com/security-pqc/us-pqc-regulatory-framework-2026/' },
  { id: 13, year: 2027, quarter: 'Q2', title: 'IBM Cockatoo — first multi-module entanglement (l-couplers)', category: 'tech', probability: 70, impact: 7, confidence: 'medium', rationale: 'On 2029 Starling roadmap', sourceUrl: 'https://www.ibm.com/quantum/blog/large-scale-ftqc' },
  { id: 14, year: 2027, quarter: 'Q2', title: 'IBM Quantum Summit Nov 2026 announcements drop', category: 'commercial', probability: 99, impact: 5, confidence: 'high', rationale: 'Annual event; major venue', sourceUrl: 'https://www.ibm.com/quantum' },
  { id: 15, year: 2027, quarter: 'Q3', title: 'Quantinuum Sol — first 2D grid trapped-ion architecture', category: 'tech', probability: 65, impact: 7, confidence: 'medium', rationale: 'Sol → Apollo → Lumos roadmap public', sourceUrl: 'https://www.quantinuum.com/products-solutions/quantinuum-systems/helios' },
  { id: 16, year: 2027, quarter: 'Q3', title: 'IQM 300-qubit Radiance delivered to VTT Finland', category: 'tech', probability: 80, impact: 5, confidence: 'high', rationale: 'Government-anchored delivery contract', sourceUrl: 'https://meetiqm.com/press-releases/iqm-to-deliver-world-leading-300-qubit-quantum-computer-to-finland/' },
  { id: 17, year: 2027, quarter: 'Q4', title: 'Second pure-play quantum IPO (likely Atom or IQM)', category: 'market', probability: 50, impact: 6, confidence: 'medium', rationale: 'Comp set established by Quantinuum', sourceUrl: 'https://thequantuminsider.com/2026/04/14/global-quantum-computing-market-to-double-by-2028-reaching-3-billion-in-revenue-qed-c-state-of-the-global-quantum-industry-2026-report-finds/' },
  { id: 18, year: 2027, quarter: 'Q4', title: 'Global quantum industry revenue passes $2.5B', category: 'market', probability: 80, impact: 5, confidence: 'high', rationale: 'QED-C trajectory from $1.9B 2025', sourceUrl: 'https://quantumconsortium.org/publication/2026-state-of-the-global-quantum-industry-report/' },
  // 2028
  { id: 19, year: 2028, quarter: 'Q1', title: 'IonQ 10,000 physical qubits on single chip (Oxford Ionics)', category: 'tech', probability: 35, impact: 8, confidence: 'low', rationale: 'Aggressive vendor 2027 claim slipping right', sourceUrl: 'https://www.ionq.com/roadmap' },
  { id: 20, year: 2028, quarter: 'Q2', title: 'First quantum-aided drug enters Phase I trials', category: 'industry', probability: 35, impact: 7, confidence: 'low', rationale: 'AstraZeneca/Roche/BMS pipelines, attribution uncertain', sourceUrl: 'https://www.fiercebiotech.com/biotech/can-it-actually-deliver-why-big-pharma-has-entered-quantum-realm' },
  { id: 21, year: 2028, quarter: 'Q2', title: 'Quantum computing market doubles to $3B (QED-C)', category: 'market', probability: 75, impact: 6, confidence: 'medium', rationale: 'QED-C 30% CAGR projection', sourceUrl: 'https://thequantuminsider.com/2026/04/14/global-quantum-computing-market-to-double-by-2028-reaching-3-billion-in-revenue-qed-c-state-of-the-global-quantum-industry-2026-report-finds/' },
  { id: 22, year: 2028, quarter: 'Q2', title: 'Pasqal Centaurus — early FTQC, 10,000 physical qubits', category: 'tech', probability: 40, impact: 7, confidence: 'low', rationale: '2025 roadmap; previously slipped', sourceUrl: 'https://www.pasqal.com/wp-content/uploads/2025/10/Pasqal-Roadmap-2025.pdf' },
  { id: 23, year: 2028, quarter: 'Q3', title: 'DOE first-generation FTQC user facility delivered', category: 'government', probability: 55, impact: 7, confidence: 'medium', rationale: 'DOE public commitment', sourceUrl: 'https://www.energy.gov/articles/energy-department-announces-625-million-advance-next-phase-national-quantum-information' },
  { id: 24, year: 2028, quarter: 'Q4', title: 'First quantum pure-play public-market consolidation/M&A', category: 'market', probability: 60, impact: 6, confidence: 'medium', rationale: '4+ years post-SPAC wave', sourceUrl: 'https://247wallst.com/investing/2026/04/24/quantum-computing-stocks-ionq-rgti-qbts-soar-72/' },
  { id: 25, year: 2028, quarter: 'Q4', title: 'China Origin Quantum STAR Market IPO', category: 'market', probability: 55, impact: 5, confidence: 'medium', rationale: 'IPO counseling filed Sep 2025', sourceUrl: 'https://english.ckgsb.edu.cn/knowledge/article/china-quantum-computing-strategy/' },
  { id: 26, year: 2028, quarter: 'Q4', title: 'First commercial quantum-designed EV cathode in OEM testing', category: 'industry', probability: 65, impact: 6, confidence: 'medium', rationale: 'VW/Hyundai/Mercedes pilots maturing', sourceUrl: 'https://research.ibm.com/projects/accelerated-discovery-of-battery-materials' },
  // 2029
  { id: 27, year: 2029, quarter: 'Q1', title: 'NIST PQC quantum-vulnerable algorithm deprecation begins', category: 'crypto', probability: 95, impact: 8, confidence: 'high', rationale: 'NIST IR 8547 schedule', sourceUrl: 'https://nvlpubs.nist.gov/nistpubs/ir/2024/NIST.IR.8547.ipd.pdf' },
  { id: 28, year: 2029, quarter: 'Q2', title: 'IBM Starling — 200 logical qubits, 100M gate operations', category: 'tech', probability: 55, impact: 9, confidence: 'medium', rationale: 'IBM 2029 roadmap; modular path de-risked', sourceUrl: 'https://www.ibm.com/roadmaps/quantum/2029/' },
  { id: 29, year: 2029, quarter: 'Q3', title: 'Google useful error-corrected quantum computer', category: 'tech', probability: 50, impact: 9, confidence: 'medium', rationale: 'Sundar Pichai 2021 commitment', sourceUrl: 'https://quantumai.google/roadmap' },
  { id: 30, year: 2029, quarter: 'Q3', title: 'Cloudflare hits "full PQC" — internet handshake majority', category: 'crypto', probability: 85, impact: 7, confidence: 'high', rationale: 'Cloudflare public target', sourceUrl: 'https://blog.cloudflare.com/post-quantum-roadmap/' },
  { id: 31, year: 2029, quarter: 'Q3', title: 'Quantinuum Apollo demonstrated (aggressive de-risked claim)', category: 'tech', probability: 35, impact: 9, confidence: 'low', rationale: 'Pulled forward from 2030', sourceUrl: 'https://www.quantinuum.com/press-releases/quantinuum-unveils-accelerated-roadmap-to-achieve-universal-fault-tolerant-quantum-computing-by-2030' },
  { id: 32, year: 2029, quarter: 'Q4', title: 'Executive Order 14144 TLS 1.3+ hybrid PQC mandate active', category: 'crypto', probability: 92, impact: 7, confidence: 'high', rationale: 'EO 14144 explicit Jan 2030', sourceUrl: 'https://postquantum.com/security-pqc/us-pqc-regulatory-framework-2026/' },
  // 2030
  { id: 33, year: 2030, quarter: 'Q1', title: 'NIST: quantum-vulnerable algorithms formally deprecated', category: 'crypto', probability: 95, impact: 9, confidence: 'high', rationale: 'NIST IR 8547', sourceUrl: 'https://nvlpubs.nist.gov/nistpubs/ir/2024/NIST.IR.8547.ipd.pdf' },
  { id: 34, year: 2030, quarter: 'Q2', title: 'Quantinuum Apollo — universal FTQC (original 2030 schedule)', category: 'tech', probability: 40, impact: 9, confidence: 'low', rationale: 'Most aggressive vendor claim on table', sourceUrl: 'https://www.quantinuum.com/press-releases/quantinuum-unveils-accelerated-roadmap-to-achieve-universal-fault-tolerant-quantum-computing-by-2030' },
  { id: 35, year: 2030, quarter: 'Q2', title: 'BCG NISQ era closes; broad quantum advantage phase begins', category: 'industry', probability: 60, impact: 8, confidence: 'medium', rationale: 'BCG three-phase framework', sourceUrl: 'https://www.bcg.com/publications/2024/long-term-forecast-for-quantum-computing-still-looks-bright' },
  { id: 36, year: 2030, quarter: 'Q3', title: 'First publicly-attributed Q-Day RSA-2048 attack', category: 'crypto', probability: 20, impact: 10, confidence: 'low', rationale: 'GRI expert survey: ~28-49% 10-yr likelihood', sourceUrl: 'https://postquantum.com/q-day/q-day-y2q-rsa-broken-2030/' },
  { id: 37, year: 2030, quarter: 'Q4', title: 'Quantum technology global revenue ~$15B', category: 'market', probability: 60, impact: 6, confidence: 'medium', rationale: 'McKinsey 2035 $97B back-cast', sourceUrl: 'https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/mckinsey-quantum-technology-monitor-2026-a-commercial-tipping-point' },
  // 2031
  { id: 38, year: 2031, quarter: 'Q1', title: 'NIST: 112-bit-strength algorithms deprecated for federal', category: 'crypto', probability: 95, impact: 7, confidence: 'high', rationale: 'NIST IR 8547', sourceUrl: 'https://nvlpubs.nist.gov/nistpubs/ir/2024/NIST.IR.8547.ipd.pdf' },
  { id: 39, year: 2031, quarter: 'Q2', title: 'First major drug approval citing quantum-computed lineage', category: 'industry', probability: 35, impact: 8, confidence: 'low', rationale: '7-10 yr discovery-to-approval from 2024 quantum work', sourceUrl: 'https://www.nature.com/articles/s44386-025-00033-2' },
  { id: 40, year: 2031, quarter: 'Q4', title: 'Quantum sensing market reaches $2B+', category: 'market', probability: 70, impact: 5, confidence: 'medium', rationale: 'Mordor 12.7% CAGR; McKinsey $7-10B by 2035', sourceUrl: 'https://www.mordorintelligence.com/industry-reports/quantum-sensors-market' },
  // 2032
  { id: 41, year: 2032, quarter: 'Q1', title: 'First publicly-attributed ECC-256 break (retro/offline)', category: 'crypto', probability: 35, impact: 10, confidence: 'low', rationale: 'Expert assessment converges on ~2032', sourceUrl: 'https://thequantuminsider.com/2026/03/31/q-day-just-got-closer-three-papers-in-three-months-are-rewriting-the-quantum-threat-timeline/' },
  { id: 42, year: 2032, quarter: 'Q2', title: '15% of pharma R&D pipelines incorporate quantum', category: 'industry', probability: 50, impact: 7, confidence: 'medium', rationale: 'Big Pharma partnership trajectory', sourceUrl: 'https://www.fiercebiotech.com/biotech/can-it-actually-deliver-why-big-pharma-has-entered-quantum-realm' },
  { id: 43, year: 2032, quarter: 'Q3', title: 'Public quantum pure-play count consolidates to ~6 surviving', category: 'market', probability: 55, impact: 7, confidence: 'medium', rationale: 'Typical deep-tech post-IPO consolidation', sourceUrl: 'https://www.fool.com/investing/2026/04/24/quantum-computing-stocks-ionq-rgti-qbts-soar-72/' },
  { id: 44, year: 2032, quarter: 'Q4', title: 'Quantum networking commercial deployment in 10+ metros', category: 'commercial', probability: 50, impact: 6, confidence: 'medium', rationale: 'McKinsey QComm 22-25% CAGR', sourceUrl: 'https://memq.tech/mckinseys-quantum-technology-monitor-distilled-the-rise-of-quantum-networking-3/' },
  // 2033
  { id: 45, year: 2033, quarter: 'Q1', title: 'DARPA-validated utility-scale quantum computer (or null verdict)', category: 'government', probability: 55, impact: 9, confidence: 'medium', rationale: 'DARPA QBI 2033 deadline', sourceUrl: 'https://www.rdworldonline.com/darpas-quantum-benchmarking-push-can-a-useful-quantum-computer-exist-by-2033/' },
  { id: 46, year: 2033, quarter: 'Q2', title: 'Expert-survey Q-Day 10-yr likelihood crosses 50%', category: 'crypto', probability: 80, impact: 8, confidence: 'high', rationale: 'GRI threat survey trajectory', sourceUrl: 'https://postquantum.com/security-pqc/quantum-threat-timeline-report-2025/' },
  { id: 47, year: 2033, quarter: 'Q3', title: 'Revenue mix: commercial cloud overtakes government', category: 'market', probability: 60, impact: 7, confidence: 'medium', rationale: 'BCG broad-advantage phase', sourceUrl: 'https://www.bcg.com/publications/2024/long-term-forecast-for-quantum-computing-still-looks-bright' },
  { id: 48, year: 2033, quarter: 'Q3', title: 'IBM Blue Jay — 2,000 logical qubits / 1B gates (roadmap target)', category: 'tech', probability: 40, impact: 9, confidence: 'low', rationale: 'IBM 2033 roadmap; ambitious', sourceUrl: 'https://www.ibm.com/roadmaps/quantum/' },
  { id: 49, year: 2033, quarter: 'Q4', title: 'PsiQuantum million-qubit milestone (delayed from 2027)', category: 'tech', probability: 30, impact: 10, confidence: 'low', rationale: 'Original 2027 target slipped', sourceUrl: 'https://www.psiquantum.com/technology' },
  // 2034-2036
  { id: 50, year: 2034, quarter: 'Q2', title: 'Global quantum revenue $35-50B band', category: 'market', probability: 55, impact: 7, confidence: 'medium', rationale: 'McKinsey back-cast to 2035 $97B', sourceUrl: 'https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/mckinsey-quantum-technology-monitor-2026-a-commercial-tipping-point' },
  { id: 51, year: 2034, quarter: 'Q3', title: 'US-China quantum export control regime hardens', category: 'government', probability: 65, impact: 6, confidence: 'medium', rationale: 'USCC trajectory', sourceUrl: 'https://www.uscc.gov/research/vying-quantum-supremacy-us-china-competition-quantum-technologies' },
  { id: 52, year: 2035, quarter: 'Q1', title: 'NIST: 128-bit-strength algorithms disallowed (federal)', category: 'crypto', probability: 95, impact: 9, confidence: 'high', rationale: 'NIST IR 8547', sourceUrl: 'https://nvlpubs.nist.gov/nistpubs/ir/2024/NIST.IR.8547.ipd.pdf' },
  { id: 53, year: 2035, quarter: 'Q1', title: 'NSM-10 federal PQC migration deadline', category: 'crypto', probability: 90, impact: 9, confidence: 'high', rationale: 'NSM-10 explicit', sourceUrl: 'https://postquantum.com/security-pqc/us-pqc-regulatory-framework-2026/' },
  { id: 54, year: 2035, quarter: 'Q3', title: 'McKinsey 2035: QC $28-72B, QComm $11-15B, QSense $7-10B', category: 'market', probability: 75, impact: 7, confidence: 'high', rationale: 'McKinsey 2026 Monitor explicit', sourceUrl: 'https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/mckinsey-quantum-technology-monitor-2026-a-commercial-tipping-point' },
  { id: 55, year: 2035, quarter: 'Q4', title: 'First Nobel-grade result from quantum simulation', category: 'science', probability: 55, impact: 8, confidence: 'medium', rationale: 'Cuprate superconductivity / FeMoco candidates', sourceUrl: 'https://www.nature.com/articles/s41534-025-01091-0' },
  { id: 56, year: 2036, quarter: 'Q2', title: 'Quantum becomes line-item in F500 IT budgets (50%+)', category: 'industry', probability: 40, impact: 7, confidence: 'low', rationale: 'BCG broad-advantage maturation', sourceUrl: 'https://www.bcg.com/publications/2024/long-term-forecast-for-quantum-computing-still-looks-bright' },
  { id: 57, year: 2036, quarter: 'Q3', title: 'First quantum-enabled materials product reaches consumer market', category: 'industry', probability: 35, impact: 6, confidence: 'low', rationale: 'Battery/catalyst lineage from 2028-30 work', sourceUrl: 'https://www.pharmasalmanac.com/articles/quantum-computing-will-transform-drug-discovery-development-manufacturing-and-supply-chain-management' },
  { id: 58, year: 2036, quarter: 'Q4', title: 'Total quantum tech revenue passes $120B', category: 'market', probability: 55, impact: 8, confidence: 'medium', rationale: 'Toward McKinsey 2040 $198B', sourceUrl: 'https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/mckinsey-quantum-technology-monitor-2026-a-commercial-tipping-point' },
];

// Quantitative forecast grid for visualizations
export interface ForecastYear {
  year: number;
  revenueMedian: number;       // $B
  revenueLow: number;
  revenueHigh: number;
  leadingLogical: number;      // demonstrated logical qubits at the frontier
  leadingPhysical: number;     // physical qubits at the frontier
  bestFidelity: number;        // 0..1
  cumPrivateCapital: number;   // $B cumulative
  cumGovtSpend: number;        // $B cumulative
  survivingPureplays: number;
  pharmaQuantumPct: number;    // 0..1, % of pharma R&D incorporating quantum
  drugApprovals: number;       // cumulative quantum-lineage approvals
}

export const FORECAST_GRID: ForecastYear[] = [
  { year: 2026, revenueMedian: 2.2, revenueLow: 1.9, revenueHigh: 2.6, leadingLogical: 50, leadingPhysical: 1225, bestFidelity: 0.9995, cumPrivateCapital: 30, cumGovtSpend: 60, survivingPureplays: 3, pharmaQuantumPct: 0.04, drugApprovals: 0 },
  { year: 2027, revenueMedian: 2.7, revenueLow: 2.3, revenueHigh: 3.2, leadingLogical: 100, leadingPhysical: 2000, bestFidelity: 0.9996, cumPrivateCapital: 36, cumGovtSpend: 65, survivingPureplays: 4, pharmaQuantumPct: 0.06, drugApprovals: 0 },
  { year: 2028, revenueMedian: 3.3, revenueLow: 2.8, revenueHigh: 4.0, leadingLogical: 250, leadingPhysical: 5000, bestFidelity: 0.9997, cumPrivateCapital: 42, cumGovtSpend: 70, survivingPureplays: 5, pharmaQuantumPct: 0.09, drugApprovals: 0 },
  { year: 2029, revenueMedian: 4.5, revenueLow: 3.5, revenueHigh: 6.0, leadingLogical: 200, leadingPhysical: 10000, bestFidelity: 0.9998, cumPrivateCapital: 49, cumGovtSpend: 75, survivingPureplays: 6, pharmaQuantumPct: 0.12, drugApprovals: 0 },
  { year: 2030, revenueMedian: 7.0, revenueLow: 5.0, revenueHigh: 10.0, leadingLogical: 500, leadingPhysical: 25000, bestFidelity: 0.99985, cumPrivateCapital: 56, cumGovtSpend: 82, survivingPureplays: 6, pharmaQuantumPct: 0.16, drugApprovals: 1 },
  { year: 2031, revenueMedian: 11.0, revenueLow: 7.0, revenueHigh: 16.0, leadingLogical: 1000, leadingPhysical: 50000, bestFidelity: 0.9999, cumPrivateCapital: 64, cumGovtSpend: 90, survivingPureplays: 6, pharmaQuantumPct: 0.20, drugApprovals: 1 },
  { year: 2032, revenueMedian: 17.0, revenueLow: 10.0, revenueHigh: 25.0, leadingLogical: 2000, leadingPhysical: 100000, bestFidelity: 0.99992, cumPrivateCapital: 72, cumGovtSpend: 98, survivingPureplays: 6, pharmaQuantumPct: 0.25, drugApprovals: 2 },
  { year: 2033, revenueMedian: 28.0, revenueLow: 16.0, revenueHigh: 42.0, leadingLogical: 5000, leadingPhysical: 300000, bestFidelity: 0.99995, cumPrivateCapital: 81, cumGovtSpend: 107, survivingPureplays: 6, pharmaQuantumPct: 0.30, drugApprovals: 3 },
  { year: 2034, revenueMedian: 45.0, revenueLow: 25.0, revenueHigh: 65.0, leadingLogical: 15000, leadingPhysical: 700000, bestFidelity: 0.99996, cumPrivateCapital: 90, cumGovtSpend: 116, survivingPureplays: 6, pharmaQuantumPct: 0.36, drugApprovals: 5 },
  { year: 2035, revenueMedian: 70.0, revenueLow: 46.0, revenueHigh: 97.0, leadingLogical: 50000, leadingPhysical: 1500000, bestFidelity: 0.99997, cumPrivateCapital: 100, cumGovtSpend: 125, survivingPureplays: 5, pharmaQuantumPct: 0.42, drugApprovals: 7 },
  { year: 2036, revenueMedian: 92.0, revenueLow: 60.0, revenueHigh: 130.0, leadingLogical: 100000, leadingPhysical: 3000000, bestFidelity: 0.99998, cumPrivateCapital: 110, cumGovtSpend: 135, survivingPureplays: 5, pharmaQuantumPct: 0.48, drugApprovals: 10 },
];

export interface RevenueMix {
  year: number;
  government: number;
  commercialCloud: number;
  hardware: number;
  pqc: number;
  sensing: number;
  consulting: number;
}

export const REVENUE_MIX: RevenueMix[] = [
  { year: 2026, government: 45, commercialCloud: 18, hardware: 12, pqc: 8, sensing: 9, consulting: 8 },
  { year: 2027, government: 42, commercialCloud: 21, hardware: 12, pqc: 10, sensing: 9, consulting: 6 },
  { year: 2028, government: 38, commercialCloud: 25, hardware: 13, pqc: 12, sensing: 9, consulting: 3 },
  { year: 2029, government: 34, commercialCloud: 28, hardware: 14, pqc: 14, sensing: 8, consulting: 2 },
  { year: 2030, government: 30, commercialCloud: 32, hardware: 15, pqc: 15, sensing: 7, consulting: 1 },
  { year: 2031, government: 26, commercialCloud: 35, hardware: 15, pqc: 17, sensing: 6, consulting: 1 },
  { year: 2032, government: 23, commercialCloud: 38, hardware: 15, pqc: 18, sensing: 5, consulting: 1 },
  { year: 2033, government: 20, commercialCloud: 41, hardware: 15, pqc: 18, sensing: 5, consulting: 1 },
  { year: 2034, government: 18, commercialCloud: 43, hardware: 16, pqc: 17, sensing: 5, consulting: 1 },
  { year: 2035, government: 16, commercialCloud: 45, hardware: 17, pqc: 16, sensing: 5, consulting: 1 },
  { year: 2036, government: 15, commercialCloud: 47, hardware: 17, pqc: 15, sensing: 5, consulting: 1 },
];

// Per-horizon synthesis (1, 3, 5, 10 years)
export interface HorizonSynthesis {
  yearsOut: 1 | 3 | 5 | 10;
  yearLabel: string;
  oneLiner: string;
  upsides: { icon: string; topic: string; description: string }[];
  downsides: { icon: string; topic: string; description: string }[];
  dailyLife: string;
  keyMilestones: number[]; // event IDs from FUTURE_EVENTS
  willNotHappen: string[];
  watchSignals: string[];
}

export const HORIZONS: HorizonSynthesis[] = [
  {
    yearsOut: 1,
    yearLabel: '2026 → 2027',
    oneLiner:
      'The IPO super-cycle and the Stage C catalyst. Quantinuum prices, DARPA picks, Magne ships — quantum starts trading as a known catalyst calendar, not just thematic narrative.',
    upsides: [
      { icon: '📈', topic: 'Quantinuum (QNT) IPO prices', description: 'First $20B+ public pure-play resets every quantum comp. Honeywell holders get partial liquidity. The sector gets a credible institutional anchor.' },
      { icon: '🎯', topic: 'DARPA QBI Stage C selections (Q4 2026)', description: 'Single most consequential catalyst of the year. 11-team Stage B cohort gets narrowed; survivors get 8-figure follow-on engagements and de facto "anointed vendor" status.' },
      { icon: '🚀', topic: 'Magne ships — first 50-logical-qubit commercial computer', description: 'Atom + Microsoft deliver to Denmark in Q1 2027. The first machine you can buy that crosses the logical-qubit threshold.' },
      { icon: '📰', topic: 'First peer-reviewed commercial quantum advantage', description: 'HSBC bond-trading paper (Nov 2025) is the template. Krishna predicts 2-4 follow-ups in 2026. Each one is a Q-day for the "no commercial value yet" narrative.' },
    ],
    downsides: [
      { icon: '💸', topic: 'Quantinuum IPO break risk', description: 'Pricing 20-30% below $20B target cascades into IONQ/RGTI/QBTS drawdowns of 30-50%. The SPAC pipeline (Pasqal etc.) gets re-priced.' },
      { icon: '⚠️', topic: 'FIPS 140-2 sunset (Sept 21, 2026) exposes compliance gaps', description: 'All FIPS 140-2 certificates move to Historical. Federal contractors and financial-infrastructure vendors hit a re-validation wall; expect at least one high-profile compliance miss.' },
      { icon: '📉', topic: 'A small-cap quantum failure', description: 'ARQQ ($620K H1 revenue against $28.9M cash burn) is the most exposed. At least one quantum-crypto-adjacent small-cap delists or reverse-merges.' },
    ],
    dailyLife:
      "Your phone gets a quiet OS update expanding PQ3 / ML-KEM coverage. You see Quantinuum (QNT) on CNBC during earnings season. You may notice a quantum-secured badge on a banking app. Your encryption is already quantum-safe — you didn't notice. That's the success condition.",
    keyMilestones: [1, 2, 5, 6, 7, 11, 9],
    willNotHappen: [
      'RSA-2048 will not be broken',
      'No quantum-discovered drug will enter Phase 1 trials',
      'No quantum pure-play will reach GAAP profitability',
      'AI × quantum will not reveal a killer app',
      'No general fault-tolerant computer ships',
    ],
    watchSignals: [
      'IBM Quantum Summit November 2026 — the year\'s most consequential roadmap event',
      'Quantinuum IPO roadshow signal vs $20B target',
      'DARPA QBI Stage C survivor list (Q4 2026)',
      'Earnings-quarter prints for IONQ, RGTI, QBTS, QUBT, ARQQ',
    ],
  },
  {
    yearsOut: 3,
    yearLabel: '2026 → 2029',
    oneLiner:
      'The "show me" period. Multiple vendor roadmaps converge on 2029. Either two or three vendors deliver Starling-class systems and the field becomes investable — or roadmaps slip and the sector takes a brutal multiple compression.',
    upsides: [
      { icon: '🧪', topic: 'First useful chemistry at therapeutic scale', description: 'IBM Starling, Quantinuum Apollo, and Atom+MS next-gen all target 100-200 logical qubits by 2029. At least one delivers something pharma can act on.' },
      { icon: '⚓', topic: 'Quantum sensing reaches operational maturity', description: 'AUKUS Pillar 2 PNT, naval / aviation quantum-inertial nav standard-issue on new builds, medical OPM-MEG entering pediatric neurology clinics. The most commercial near-term quantum line.' },
      { icon: '💰', topic: 'PQC migration becomes an $15B+ annual market', description: 'NSA CNSA 2.0 mandate (Jan 2027), NIST IR 8547 deprecation start (Jan 2029), Cloudflare-style full-PQC commitments accelerate.' },
      { icon: '🔬', topic: 'First peer-reviewed quantum advantage in industrial chemistry', description: 'Magic-state distillation overhead reductions in 2025-26 pull FTQC chemistry workloads forward by 12-24 months versus prior consensus.' },
    ],
    downsides: [
      { icon: '🔻', topic: 'A major vendor misses 2027 milestone', description: 'Most likely candidates: PsiQuantum (Brisbane delays already visible), IonQ (aggressive 10K-physical claim), Quantinuum (post-IPO scrutiny). Sector multiple compresses 50-70% on a credible miss.' },
      { icon: '💥', topic: 'Capital write-downs across SPAC cohort', description: '50%+ of 2021-2026 SPAC/IPO cohort delisted, restructured, or acquired by 2031. The bigger risk: reputational drag on the category for institutional LPs.' },
      { icon: '🏔️', topic: 'Helium-3 / dilution-fridge supply shock', description: 'Bluefors-Interlune lunar helium-3 offtake doesn\'t deliver until 2028. Expect 2-3 short, sharp pricing crises ($2K-$15K/L range).' },
      { icon: '🔐', topic: 'HNDL data starts paying off', description: 'First major decryption-driven incident publicly attributed in 2027-2029. Even smaller-scale leaks shift policy from "by 2030" to "this quarter."' },
    ],
    dailyLife:
      'Your iPhone\'s entire networking layer is PQC. Your bank\'s mobile app advertises "quantum-enhanced" features (some real, mostly marketing). You read about a drug whose discovery cited quantum acceleration. You may see your first quantum-secured VPN at work. The word "quantum" enters consumer-product marketing the way "AI" did circa 2023-2024.',
    keyMilestones: [11, 12, 13, 15, 18, 19, 22, 26, 27, 28],
    willNotHappen: [
      'Microsoft Majorana topological qubit will not be commercially relevant',
      'Quantum AI will not have a general killer app',
      'Most quantum pure-plays will not reach GAAP profitability',
      'Universal fault-tolerant computing — what vendors mean by FTQC and what real FTQC means are still different',
    ],
    watchSignals: [
      'Logical-qubit count crossing 100 on a real machine (not extrapolation) — Quantinuum, Atom+MS leading candidates',
      'First revenue-to-valuation compression event >50% drop on a milestone miss',
      'First mandatory enterprise PQC compliance action by a regulator other than NIST',
      'IBM Starling delivery (or delay)',
      'China Origin Quantum STAR Market IPO timing',
    ],
  },
  {
    yearsOut: 5,
    yearLabel: '2026 → 2031',
    oneLiner:
      'The inflection. By May 2031 either FTQC has begun delivering useful chemistry/materials at commercial scale (with consolidation winners visible) — or the timeline has slipped, capital has rationalized brutally, and quantum sensing + PQC migration are the only commercial stories.',
    upsides: [
      { icon: '🏭', topic: 'Multiple vendors operating 100+ logical qubit machines', description: 'IBM Starling (2029), Quantinuum Apollo (2029-2030), Atom+MS next-gen all targeting this scale. Realistic floor: 2-3 vendors operating commercially by 2031.' },
      { icon: '💊', topic: 'Quantum-aided drug in Phase 2/3 trials', description: 'Roche-Quantinuum Alzheimer\'s work, Boehringer-Google, IBM-Cleveland Clinic pipelines all credible. First approval comes later (10-12 year clinical timeline) but enters trial pipeline.' },
      { icon: '🔋', topic: 'First commercial quantum-designed EV cathode in production', description: 'VW/Hyundai/Mercedes/IBM cathode programs deliver quantum-screened candidates at scale by 2029-2030. Energy density rising from 250-300 Wh/kg toward 400-500 Wh/kg.' },
      { icon: '💼', topic: 'Production Monte Carlo speedups in 5+ tier-1 banks', description: 'JPMorgan-IBM 100x runtime reduction is real. Expect HSBC, Goldman, BBVA, Barclays running quantum components in non-mission-critical pricing/risk pipelines.' },
      { icon: '🛡️', topic: 'PQC migration ~75-85% complete in federal/financial', description: 'Sept 2026 FIPS sunset, Jan 2027 CNSA 2.0, 2030 NIST deprecation cascade through enterprise procurement. Federal-equivalent regulations in EU, UK, Japan follow.' },
    ],
    downsides: [
      { icon: '⛓️', topic: 'Cryptographic instability period', description: 'Series of crisis events rather than smooth migration. 2027-2030: FIPS 140-2 cutover, inevitable PQC algorithm vulnerabilities discovered post-deployment, HNDL data starts paying off. Expect 2-4 publicly disclosed quantum-adjacent cryptographic events.' },
      { icon: '🪦', topic: '50%+ of current pure-plays go to zero', description: '$15-25B in equity value written off, concentrated in 2021-2026 SPAC/IPO cohort. Painful but contained relative to AI hardware cohort.' },
      { icon: '🏢', topic: 'Compute concentration intensifies', description: 'Big 3 (IBM/Google/MSFT) plus Quantinuum and IonQ control 70-80% of useful quantum capacity. Sovereign access becomes a national-security framing.' },
      { icon: '🌐', topic: 'China-West quantum stack fully decoupled', description: 'Origin Quantum, USTC, QuantumCTek, SpinQ form a separate stack with separate parts, software, standards. Two parallel ecosystems with limited interoperability.' },
    ],
    dailyLife:
      'Banking, government, email all PQC by default. Some Phase 2/3 drugs have quantum-aided pedigree in press releases. EV cost parity with gas in most segments (quantum cathodes contributing perhaps 10-20% of the cost reduction story). AI assistants noticeably better at scientific/technical tasks (most from classical scaling; quantum contributes in narrow scientific workflows).',
    keyMilestones: [27, 28, 29, 30, 31, 33, 34, 35, 36, 39, 40],
    willNotHappen: [
      'Room-temperature superconductor — possible (10-15%) but not probable',
      'Q-Day at consumer scale — RSA-2048 break by 2031 is ~20% probability',
      'Broad quantum-LLM advantage — only narrow hybrid wins',
      'Quantum-secured consumer-grade communications — stays defense / sensitive-industry niche',
    ],
    watchSignals: [
      'Which 3-5 names survive the 2027-2029 valuation reset and command the post-reset multiple',
      'First state-level publicly-attributed cryptographic decryption event',
      'First quantum-designed material in qualified commercial use',
      'Stage C QBI utility-scale verdict (2033 deadline)',
      'Sector revenue mix: commercial cloud crossing 33% (BCG phase boundary)',
    ],
  },
  {
    yearsOut: 10,
    yearLabel: '2026 → 2036',
    oneLiner:
      'Quantum becomes infrastructure. Multiple providers running 1,000+ logical qubit machines. Mature FTQC where useful, mature PQC migration. Quantum is invisible to consumers but consequential through what it enables — medicine, materials, climate, and at least one Nobel-grade scientific result.',
    upsides: [
      { icon: '🧬', topic: 'Pharma R&D timelines compressed 20-35% in select indications', description: 'Quantum chemistry routine in drug design; rare-disease therapeutics economically viable; personalized cancer therapy via quantum-simulated molecular interactions in oncology and autoimmune disease.' },
      { icon: '🌍', topic: 'Climate progress accelerates', description: 'Quantum-designed catalysts (CO2 reduction, hydrogen) at commercial scale. Possibly first FeMoco-driven post-Haber-Bosch nitrogen-fixation pilots. Battery + solar materials transformed. Measurable basis points of emissions reduction.' },
      { icon: '⚡', topic: 'Energy abundance from materials', description: 'Possibly room-temperature superconductors (10-15% probability). Battery costs drop 50%+, enabling cheap grid storage and EV cost parity. Fusion-reactor wall materials enabled.' },
      { icon: '🏆', topic: 'At least one Nobel-grade quantum-simulation result', description: 'Likeliest candidates: cuprate/pnictide superconductivity mechanism, FeMoco/nitrogenase mechanism, topological-phase characterization with materials implications.' },
      { icon: '🌐', topic: 'Metropolitan quantum networks in 5-10 cities', description: 'Boston, DC, Beijing, Hefei, Delft, Chicago, London — quantum-secured government and financial fabric. First continental quantum-repeater backbones in pilot operation.' },
    ],
    downsides: [
      { icon: '⚔️', topic: 'Concentrated technological power', description: 'A handful of organizations control the world\'s most powerful computational resources. Combined with mature AI, raises governance questions about market power and democratic accountability comparable to early-20th-century industrial concentration.' },
      { icon: '🤖', topic: 'Powerful AI agents augmented by quantum', description: 'Late-2030s AI agents using quantum subroutines for optimization and scientific discovery become extraordinarily capable in narrow domains. Alignment and governance questions intensify.' },
      { icon: '🕵️', topic: 'Mature quantum cyber capabilities', description: 'State-level decryption capabilities mature. At least one — likely 2-3 — publicly-attributed state-level cryptographic decryption events occurred between 2030 and 2036.' },
      { icon: '👨‍💼', topic: 'Job displacement in computational/scientific work', description: 'Hybrid quantum-AI agents displace mid-tier modeling, simulation, and analysis roles in pharma, materials, finance, defense. Transition pains in highly-trained workforce.' },
      { icon: '💸', topic: '$50-100B cumulative sector write-offs', description: 'If many NISQ-era companies fail to deliver fault-tolerant scaling on schedule. Painful but contained relative to AI hardware cohort.' },
    ],
    dailyLife:
      'Quantum has become invisible infrastructure — like cloud computing is today. You notice better medicines, longer lives, cheaper energy, more capable AI. You don\'t notice the quantum compute running in the background. Your encryption, government records, and financial transactions are all post-quantum-secured. Your work life may have shifted significantly if you\'re in any field touching computational science. The world is more abundant in some ways (medicine, energy, materials) and more concentrated in others (computational power, intelligence capabilities). "Compute power concentration" becomes a normal political topic.',
    keyMilestones: [45, 46, 47, 48, 50, 52, 53, 54, 55, 56, 57, 58],
    willNotHappen: [
      'Intercontinental quantum internet (more like 2040+)',
      'Industrial-scale quantum-replaced Haber-Bosch fertilizer (more like 2040+)',
      'Quantum computing replacing classical for general workloads',
      'Single dominant quantum vendor — diversified, regulated industry by then',
    ],
    watchSignals: [
      'First Nobel Prize citing quantum simulation work',
      'First multi-continent quantum-secured government communication network',
      'Climate metrics showing measurable improvement attributed to quantum-discovered carbon capture',
      'Geopolitical events shaped by quantum-cyber asymmetries',
      'New economic regulations addressing concentration of computational power',
    ],
  },
];
