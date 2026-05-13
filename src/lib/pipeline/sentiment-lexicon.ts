/**
 * Deterministic lexicon-based sentiment + tagging for the daily pipeline.
 * Used when ANTHROPIC_API_KEY is unset. Lower quality than Claude but free,
 * deterministic, and never rate-limited.
 */

import { COMPANIES } from '@/lib/data/companies';

const POSITIVE = new Set([
  'breakthrough', 'achievement', 'record', 'first', 'milestone', 'launch',
  'success', 'achieved', 'surpass', 'leading', 'advance', 'win', 'wins',
  'closes', 'raises', 'raised', 'beat', 'beats', 'rally', 'surge', 'surges',
  'expand', 'partnership', 'acquisition', 'acquire', 'acquires', 'growth',
  'strong', 'robust', 'progress', 'demonstrate', 'demonstrates', 'unveiled',
  'fastest', 'highest', 'best', 'innovative', 'unveil', 'commercial',
  'breakthrough', 'profitable', 'beats', 'outperform', 'select', 'selected',
  'approved', 'qualifies', 'advance', 'advances', 'breakthrough', 'wins',
]);

const NEGATIVE = new Set([
  'fail', 'fails', 'failure', 'miss', 'misses', 'missed', 'delay', 'delays',
  'delayed', 'slip', 'slips', 'cut', 'cuts', 'lawsuit', 'fraud', 'investigation',
  'declined', 'decline', 'fell', 'drop', 'drops', 'plunge', 'plunges', 'crash',
  'concern', 'concerns', 'concerned', 'warn', 'warns', 'warning', 'risk', 'risks',
  'loss', 'losses', 'losing', 'slow', 'slowing', 'slowdown', 'controversy',
  'contested', 'disputed', 'retract', 'retracted', 'restated', 'overhang',
  'bearish', 'short', 'shorted', 'recall', 'breach', 'leak', 'exposed', 'fired',
  'resign', 'resigns', 'resigned', 'bankruptcy', 'distress', 'distressed',
]);

const TOPIC_KEYWORDS: Record<string, string[]> = {
  earnings: ['earnings', 'q1', 'q2', 'q3', 'q4', 'revenue', 'profit', 'loss', 'eps', 'quarterly', 'guidance'],
  funding: ['raise', 'raises', 'raised', 'series a', 'series b', 'series c', 'series d', 'series e', 'seed', 'funding round', 'closes', 'million', 'billion'],
  ipo: ['ipo', 'spac', 's-1', 'listing', 'public', 'nasdaq', 'nyse', 'roadshow', 'goes public'],
  milestone: ['milestone', 'first', 'record', 'breakthrough', 'achieved', 'demonstrated', 'unveil', 'launch'],
  partnership: ['partnership', 'partner', 'partners', 'collaboration', 'mou', 'agreement', 'integrates'],
  gov_contract: ['darpa', 'doe', 'afrl', 'nqcc', 'eu', 'pentagon', 'defense', 'contract award', 'sovereign'],
  policy: ['policy', 'regulation', 'export', 'sanctions', 'five-year', 'congressional', 'eo ', 'executive order', 'rule'],
  technical: ['paper', 'arxiv', 'nature', 'science', 'qubit', 'fidelity', 'coherence', 'algorithm', 'physics'],
  error_correction: ['error correction', 'qec', 'logical qubit', 'surface code', 'fault-tolerant', 'ftqc', 'threshold'],
};

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

export interface LexiconScore {
  relevance: number;
  sentiment: number;
  sentiment_confidence: number;
  valuation_impact: 'bullish' | 'bearish' | 'neutral' | 'mixed';
  materiality: number;
  company_tags: string[];
  topic_tags: string[];
  summary: string;
}

const QUANTUM_TERMS = [
  'quantum', 'qubit', 'qubits', 'superconducting', 'trapped ion', 'photonic',
  'neutral atom', 'topological', 'shor', 'grover', 'qec', 'fault-tolerant',
  'cryogenic', 'qpu', 'quantum computing', 'quantum advantage', 'quantum supremacy',
  'post-quantum', 'pqc',
];

export function scoreLexicon(title: string, body: string): LexiconScore {
  const text = `${title} ${body}`;
  const lower = text.toLowerCase();
  const ts = tokens(text);

  // RELEVANCE — count quantum terms
  let qHits = 0;
  for (const term of QUANTUM_TERMS) {
    if (lower.includes(term)) qHits++;
  }
  const relevance = Math.min(1, qHits / 5);

  // SENTIMENT — pos vs neg word count
  let pos = 0, neg = 0;
  for (const t of ts) {
    if (POSITIVE.has(t)) pos++;
    if (NEGATIVE.has(t)) neg++;
  }
  const total = pos + neg;
  const sentiment = total === 0 ? 0 : Math.max(-1, Math.min(1, (pos - neg) / Math.max(total, 3)));
  const sentiment_confidence = total === 0 ? 0.3 : Math.min(1, total / 8);

  // VALUATION IMPACT
  let valuation_impact: LexiconScore['valuation_impact'] = 'neutral';
  if (sentiment > 0.3) valuation_impact = 'bullish';
  else if (sentiment < -0.3) valuation_impact = 'bearish';
  else if (pos > 0 && neg > 0) valuation_impact = 'mixed';

  // MATERIALITY — based on keyword presence
  let materiality = 2;
  if (lower.includes('ipo') || lower.includes('s-1') || lower.includes('spac')) materiality = 5;
  else if (lower.includes('earnings') || lower.includes('quarterly') || lower.includes('guidance')) materiality = 4;
  else if (lower.includes('record') || lower.includes('first') || lower.includes('breakthrough')) materiality = 4;
  else if (lower.includes('partnership') || lower.includes('contract') || lower.includes('award')) materiality = 3;
  else if (qHits >= 3) materiality = 3;

  // COMPANY TAGS — match by name / ticker / slug substring
  const company_tags = COMPANIES.filter((c) => {
    const candidates = [c.name.toLowerCase(), c.slug, c.ticker?.toLowerCase()].filter(Boolean) as string[];
    return candidates.some((cand) => {
      // require word boundary match to avoid 'ibm' inside 'symbiosis' etc
      const re = new RegExp(`\\b${cand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return re.test(text);
    });
  }).map((c) => c.slug);

  // TOPIC TAGS
  const topic_tags: string[] = [];
  for (const [topic, kws] of Object.entries(TOPIC_KEYWORDS)) {
    if (kws.some((k) => lower.includes(k))) topic_tags.push(topic);
  }

  // SUMMARY — first 2 sentences of body (or title if body short)
  const sentences = body
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.length > 20);
  const summary = sentences.length >= 2 ? sentences.slice(0, 2).join(' ') : (sentences[0] || title);

  return {
    relevance,
    sentiment,
    sentiment_confidence,
    valuation_impact,
    materiality,
    company_tags,
    topic_tags,
    summary: summary.slice(0, 500),
  };
}
