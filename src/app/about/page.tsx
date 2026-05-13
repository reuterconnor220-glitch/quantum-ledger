import Link from 'next/link';

export const metadata = {
  title: 'About Quantum Ledger',
  description: 'Independent investor-grade intelligence for the quantum sector. Run by Connor Reuter (Caruso Ventures).',
};

export default function AboutPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-accent-quantum font-mono mb-3">
          About
        </p>
        <h1 className="font-display text-5xl font-medium tracking-tight mb-6">
          Quantum Ledger.
        </h1>
        <div className="prose-editorial">
          <p>
            Quantum Ledger is the investor-grade intelligence layer for the quantum sector. It
            exists to do what the rest of the quantum coverage market doesn&apos;t: published
            scoring, distilled earnings calls, opinionated framework essays, and continuously
            updated trackers for the program decisions that actually move valuations.
          </p>
          <p>
            The site is run by <strong>Connor Reuter</strong>, an investor at Caruso Ventures (a
            Single Family Office based in Boulder, CO). It is independent — no advisory services,
            no banking retainers, no PR fees from the companies covered. The methodology is
            published, the inputs are sourced, and the framework can be disagreed with productively.
          </p>

          <h2>Why this site exists</h2>
          <p>
            The Quantum Insider does breadth. Quantum Computing Report does technical depth at the
            analyst level. Pitchbook does private-company data behind a paywall. Nobody does a
            published, opinionated, financially-literate synthesis with a transparent scoring
            framework that updates monthly. I built Quantum Ledger because that was the resource I
            wanted and couldn&apos;t find.
          </p>
          <p>
            The framework that organizes everything is laid out in{' '}
            <Link href="/essays/how-to-think-about-quantum">the founding essay</Link>. Every page
            on the site is meant to defend or extend it.
          </p>

          <h2>Editorial principles</h2>
          <ul>
            <li>
              <strong>Independence first.</strong> No advisory services. No marketing services. No
              banking. No PR retainers from companies covered.
            </li>
            <li>
              <strong>Source everything.</strong> SEC filings, primary press releases, peer-reviewed
              papers, government program pages.
            </li>
            <li>
              <strong>Flag uncertainty.</strong> When numbers are triangulated rather than filed, we
              say so. When a technical claim is contested (e.g., Microsoft Majorana), we say so.
              Where the methodology has limitations, we publish them.
            </li>
            <li>
              <strong>Take positions.</strong> Where the data supports a view, the view is on the
              page. The <Link href="/ledger-score">Ledger Score</Link> is opinion by construction.
              The methodology page is the defense.
            </li>
            <li>
              <strong>Acknowledge tradeoffs.</strong> Every bull case has a bear case on the same
              page. Every forecast comes with its assumptions.
            </li>
          </ul>

          <h2>What you can expect</h2>
          <ul>
            <li>
              <strong>The Ledger Score</strong> refreshed on the 13th of each month — composite
              0–100 ranking of every meaningful quantum company across tech, capital, commercial,
              and government validation.
            </li>
            <li>
              <strong>A daily brief</strong> at 6am Mountain Time, weekdays. Synthesized narrative,
              not a press-release feed.
            </li>
            <li>
              <strong>An earnings tracker</strong> with quarterly distillations of every public
              quantum-exposed company within 48 hours of the call.
            </li>
            <li>
              <strong>Trackers for the program decisions that move valuations</strong> —{' '}
              <Link href="/darpa-qbi">DARPA QBI</Link>,{' '}
              <Link href="/qnt-ipo-watch">Quantinuum IPO</Link>,{' '}
              <Link href="/pqc-migration">PQC migration</Link>.
            </li>
            <li>
              <strong>One signed essay per month</strong> on a framework, deep dive, or specific
              cycle. <Link href="/essays">See all essays →</Link>
            </li>
            <li>
              <strong>A primer and interactive widgets</strong> for anyone learning the field — the{' '}
              <Link href="/learn/double-slit">double-slit</Link>,{' '}
              <Link href="/learn/bell-test">Bell test</Link>, and{' '}
              <Link href="/learn/bb84">BB84 QKD</Link> demos.
            </li>
          </ul>

          <h2>Connor Reuter</h2>
          <p>
            I lead quantum research at Caruso Ventures, a Single Family Office. The portfolio
            includes both direct quantum positions and broader deep-tech exposure. I write under
            my own name because anonymous analyst sites become slower; signed analyst sites
            compound credibility faster. The site is the vehicle. The framework is the contribution.
          </p>
          <p>
            Reach me at <code className="bg-editorial-ink/5 px-1 rounded-xs">connor@carusoventures.com</code>.
            I read every email; I will not always reply. Disagreements about scoring are
            specifically welcome — the methodology improves when it is pressure-tested.
          </p>

          <h2>Not investment advice</h2>
          <p>
            Nothing on Quantum Ledger is investment advice. The Ledger Score is a structured
            analytical opinion published for transparency, not a recommendation. Verify every
            figure against primary sources before acting on it. Past performance does not predict
            future performance. Quantum is high-risk; size your positions accordingly.
          </p>
        </div>
      </div>
    </div>
  );
}
