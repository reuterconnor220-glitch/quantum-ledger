export const metadata = { title: 'Methodology' };

export default function MethodologyPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
        <h1 className="font-display text-5xl font-medium tracking-tight mb-6">Methodology</h1>
        <div className="prose-editorial">
          <p>
            How we classify companies, score sentiment, generate the daily brief, and verify figures.
          </p>

          <h2>Company classification</h2>
          <p>
            Each company is classified on two axes:
          </p>
          <ul>
            <li>
              <strong>Technology approach:</strong> superconducting, trapped ion, photonic, neutral
              atom, topological, silicon spin, NV-center, annealing, diversified, or PQ encryption.
              Diversification is reserved for companies where quantum is a small fraction of revenue
              (IBM, Microsoft, Google, Honeywell, Intel).
            </li>
            <li>
              <strong>Purity:</strong> pure-play, diversified, government-focused, or
              encryption-adjacent. This determines how we present the company in financial
              comparisons.
            </li>
          </ul>

          <h2>Financial figures</h2>
          <p>
            For public companies we pull from 10-Q/10-K filings, earnings releases, and the most
            recent reporting period. For private companies we rely on disclosed funding rounds
            (Crunchbase, PitchBook, press releases) and management commentary. Where revenue is
            triangulated rather than filed, we flag it. Where Chinese figures are CNY-denominated
            with thin disclosure, we flag it.
          </p>

          <h2>News pipeline</h2>
          <p>
            Every weekday at 6:00 AM Mountain Time, a Vercel cron job pulls from a curated set of
            sources:
          </p>
          <ul>
            <li>RSS — The Quantum Insider, Quantum Computing Report, Phys.org quantum, IEEE Spectrum, MIT Tech Review, Nature Physics</li>
            <li>arXiv — quant-ph category, filtered for new submissions</li>
            <li>Finnhub — ticker-tagged news for our nine public companies</li>
            <li>Google News RSS — broad quantum keyword query as a backstop</li>
            <li>Direct newsroom feeds — IBM Research, Google Quantum AI, Microsoft Azure Quantum</li>
          </ul>
          <p>
            Each article is deduplicated by URL hash and by pgvector embedding similarity (≥0.85
            cosine). Surviving articles are scored by Claude Haiku 4.5 with a cached system prompt
            on four dimensions:
          </p>
          <ul>
            <li>
              <strong>Relevance (0–1):</strong> how directly the story relates to quantum computing.
              Articles below 0.4 are dropped.
            </li>
            <li>
              <strong>Sentiment (-1 to +1):</strong> bullish/bearish tone of the news for the sector
              or named company.
            </li>
            <li>
              <strong>Valuation impact:</strong> bullish, bearish, neutral, or mixed — how the news
              should reasonably move expectations for the named tickers.
            </li>
            <li>
              <strong>Materiality (1–5):</strong> 1 = trivial commentary; 3 = meaningful update; 5 =
              earnings, funding, IPO, or major milestone.
            </li>
          </ul>

          <h2>Daily brief</h2>
          <p>
            The daily brief is composed each morning by Claude Haiku 4.5 from the prior day&apos;s
            highest-relevance, highest-materiality news plus close-price moves across the public
            cohort. It is human-reviewed before publication. The brief is editorial — we take a
            view, we note dissent, and we flag uncertainty.
          </p>

          <h2>Revenue landscape</h2>
          <p>
            Industry revenue figures triangulate McKinsey, BCG, BCC Research, Hyperion, IDC, and
            company filings. Where forecasts disagree by an order of magnitude (and they do), we
            show all of them with their respective assumptions rather than pick a consensus.
          </p>

          <h2>What we don&apos;t do</h2>
          <ul>
            <li>Price targets. We don&apos;t publish them. Use a broker.</li>
            <li>Sponsored content. We do not accept payment for coverage.</li>
            <li>Advisory or consulting work for companies we cover.</li>
            <li>Compete with PitchBook on private cap-table data. We summarize publicly disclosed rounds only.</li>
          </ul>

          <h2>Errata</h2>
          <p>
            Found a wrong number? Email <a href="mailto:errata@quantumledger.report">errata@quantumledger.report</a>{' '}
            with a primary source. We log corrections publicly.
          </p>
        </div>
      </div>
    </div>
  );
}
