/**
 * RSS + REST sources for the daily news pipeline.
 * Free / low-cost stack: total ~$8-15/mo at 100 articles/day.
 */

export const RSS_SOURCES = [
  { name: 'quantum_insider', url: 'https://thequantuminsider.com/feed/' },
  { name: 'quantum_computing_report', url: 'https://quantumcomputingreport.com/feed/' },
  { name: 'phys_org_quantum', url: 'https://phys.org/rss-feed/physics-news/quantum-physics/' },
  { name: 'ieee_spectrum_quantum', url: 'https://spectrum.ieee.org/topic/quantum-computing/feed/' },
  { name: 'mit_tr_quantum', url: 'https://www.technologyreview.com/topic/computing/quantum-computing/feed' },
  { name: 'ibm_quantum_blog', url: 'https://www.ibm.com/quantum/blog/rss' },
  { name: 'google_research_blog', url: 'https://research.google/blog/rss/' },
] as const;

export const ARXIV_QUERY = 'http://export.arxiv.org/api/query?search_query=cat:quant-ph&sortBy=submittedDate&sortOrder=descending&max_results=30';

export const GOOGLE_NEWS_RSS = (q: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;

export const QUANTUM_NEWS_QUERIES = [
  '"quantum computing" OR "qubit"',
  'IonQ OR Rigetti OR D-Wave OR Quantinuum',
  'PsiQuantum OR "Atom Computing" OR QuEra OR Pasqal',
  '"quantum error correction" OR "logical qubit"',
  'DARPA quantum OR DOE quantum',
];

export const FINNHUB_TICKERS = ['IONQ', 'RGTI', 'QBTS', 'QUBT', 'ARQQ', 'XNDU', 'IBM', 'HON', 'MSFT', 'GOOGL'] as const;
