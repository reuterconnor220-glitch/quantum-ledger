export type TechnologyApproach =
  | 'superconducting'
  | 'trapped_ion'
  | 'photonic'
  | 'neutral_atom'
  | 'topological'
  | 'silicon_spin'
  | 'nv_center'
  | 'annealing'
  | 'diversified'
  | 'encryption'
  | 'cat_qubit'
  | 'bosonic'
  | 'software'
  | 'controls'
  | 'qec_stack'
  | 'sensing';

export type Purity =
  | 'pure_play'
  | 'diversified'
  | 'government_focused'
  | 'encryption_adjacent'
  | 'software_layer'
  | 'sensing_adjacent';

export type ValuationImpact = 'bullish' | 'bearish' | 'neutral' | 'mixed';

export interface Company {
  slug: string;
  ticker?: string;
  name: string;
  legalName?: string;
  hqCity?: string;
  hqCountry?: string;
  foundedYear?: number;
  ipoDate?: string;
  listingExchange?: string;
  technologyApproach: TechnologyApproach;
  purity: Purity;
  oneLineThesis: string;
  bullCase: string;
  bearCase: string;
  ceo?: string;
  website?: string;
  status?: 'active' | 'ipo_filed' | 'pending_spac' | 'acquired';
  pendingTicker?: string;
  isPublic: boolean;

  // Most recent financial snapshot (denormalized for v1 seed)
  marketCapUsd?: number;
  revenueTtmUsd?: number;
  revenueLatestQuarterUsd?: number;
  revenueYoyGrowth?: number;
  grossMargin?: number;
  cashUsd?: number;
  runwayQuarters?: number;
  totalRaisedUsd?: number;
  latestRoundSizeUsd?: number;
  latestRoundValuationUsd?: number;
  latestRoundDate?: string;
  latestRoundLead?: string;
  asOfDate: string;
}

export interface NewsArticle {
  id: string;
  source: string;
  sourceUrl: string;
  title: string;
  author?: string;
  publishedAt: string;
  summary: string;
  sentimentScore: number;          // -1..1
  relevanceScore: number;          // 0..1
  valuationImpact: ValuationImpact;
  materiality: 1 | 2 | 3 | 4 | 5;
  companyTags: string[];           // company slugs
  topicTags: string[];
}

export interface DailyBrief {
  briefDate: string;
  headline: string;
  oneLineSummary: string;
  bodyMd: string;
  topStoryIds: string[];
  marketSummary: {
    sectorMcapUsd: number;
    dayChangePct: number;
    leaders: { ticker: string; pct: number }[];
    laggards: { ticker: string; pct: number }[];
  };
  sectorSentiment: number;
}

export interface QuantumEvent {
  id: string;
  eventDate: string;
  eventType:
    | 'gov_contract'
    | 'funding_round'
    | 'ipo'
    | 'spac'
    | 'milestone'
    | 'partnership'
    | 'earnings'
    | 'policy'
    | 'technical';
  title: string;
  description: string;
  companySlugs: string[];
  amountUsd?: number;
  sourceUrl?: string;
}

export const TECHNOLOGY_LABEL: Record<TechnologyApproach, string> = {
  superconducting: 'Superconducting',
  trapped_ion: 'Trapped Ion',
  photonic: 'Photonic',
  neutral_atom: 'Neutral Atom',
  topological: 'Topological',
  silicon_spin: 'Silicon Spin',
  nv_center: 'NV-Center',
  annealing: 'Annealing',
  diversified: 'Diversified',
  encryption: 'PQ Encryption',
  cat_qubit: 'Cat Qubit',
  bosonic: 'Bosonic',
  software: 'Software',
  controls: 'Controls',
  qec_stack: 'QEC Stack',
  sensing: 'Sensing',
};
