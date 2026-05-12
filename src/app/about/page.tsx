export const metadata = { title: 'About Quantum Ledger' };

export default function AboutPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
        <h1 className="font-display text-5xl font-medium tracking-tight mb-6">About</h1>
        <div className="prose-editorial">
          <p>
            Quantum Ledger is an independent intelligence resource for the quantum computing sector.
            We track every public pure-play, every meaningful private contender, every government
            funding event, and every technical milestone — with a sentiment-scored daily news desk
            and an honest revenue landscape.
          </p>

          <h2>Why we exist</h2>
          <p>
            The existing quantum coverage market has a clear gap. The Quantum Insider and Quantum
            Computing Report both sell advisory and marketing services to the companies they cover.
            Hyperion publishes annual PDFs at enterprise pricing. PitchBook gives raw deal data
            without interpretation. Scott Aaronson&apos;s blog is independent but irregular and not
            structured for navigation.
          </p>
          <p>
            None of them produce sell-side-quality financial coverage of public quantum companies.
            None offer a layered-depth primer that scales from curious newcomer to physicist. None
            run an opinionated daily desk that scores stories on materiality and valuation impact.
            We aim to be all three — and to do it with zero advisory, banking, or PR-services
            conflicts.
          </p>

          <h2>Editorial principles</h2>
          <ul>
            <li><strong>Independence first.</strong> No advisory services. No marketing services. No banking. No PR retainers. Subscriber-funded.</li>
            <li><strong>Source everything.</strong> SEC filings, primary press releases, peer-reviewed papers, government program pages.</li>
            <li><strong>Flag uncertainty.</strong> When numbers are triangulated rather than filed, we say so. When a technical claim is contested (e.g., Microsoft Majorana), we say so.</li>
            <li><strong>No &quot;parallel universes&quot; or &quot;trying every answer at once&quot;.</strong> The primer holds the line on accurate framing.</li>
            <li><strong>Acknowledge tradeoffs.</strong> Every bull case has a bear case on the same page. Every forecast comes with its assumptions.</li>
          </ul>

          <h2>What you can expect</h2>
          <ul>
            <li>A daily brief at 6am Mountain Time, weekdays.</li>
            <li>16 tracked companies with quarterly financial refresh and live news.</li>
            <li>A continually-updated revenue landscape and government contract tracker.</li>
            <li>A layered-depth primer that&apos;s never finished — concepts deepen as the field moves.</li>
            <li>Special trackers for active catalysts (currently: Quantinuum IPO).</li>
          </ul>

          <h2>Not investment advice</h2>
          <p>
            Nothing on Quantum Ledger is investment advice. We do not make buy/sell recommendations.
            Verify every figure against primary sources before acting on it. Past performance does not
            predict future performance. Quantum is high-risk; size your positions accordingly.
          </p>
        </div>
      </div>
    </div>
  );
}
