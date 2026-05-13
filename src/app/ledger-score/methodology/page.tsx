import Link from 'next/link';
import { SCORE_WEIGHTS } from '@/lib/data/ledger-score';

export const metadata = {
  title: 'Ledger Score Methodology · How the Score Is Calculated · Quantum Ledger',
  description:
    'Full published methodology for the Ledger Score. Four dimensions, transparent inputs, sources for every figure, change log. The defense for every score.',
};

export default function MethodologyPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-quantum font-mono mb-3">
            Methodology
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight leading-tight">
            How the Ledger Score is calculated.
          </h1>
          <p className="mt-6 text-xl text-editorial-ink/75 leading-relaxed max-w-[60ch]">
            Every input. Every weight. Every rule. The score is opinionated, but the opinion is
            structured, transparent, and applied identically to every company in the universe.
            Disagree with a score? Disagree with the rubric. That&apos;s the point.
          </p>
        </header>

        <article className="prose-editorial">
          <h2>The four dimensions</h2>
          <p>
            Every meaningful quantum company is scored on four dimensions, each 0–100. The four
            scores are weighted into a composite 0–100 total.
          </p>
          <ul>
            <li>
              <strong>Technology ({Math.round(SCORE_WEIGHTS.tech * 100)}%)</strong> — Is the underlying physics actually working at scale, and is the architecture credible to FTQC?
            </li>
            <li>
              <strong>Capital ({Math.round(SCORE_WEIGHTS.capital * 100)}%)</strong> — Can they fund the next milestone without diluting their option value?
            </li>
            <li>
              <strong>Commercial ({Math.round(SCORE_WEIGHTS.commercial * 100)}%)</strong> — Is revenue real, growing, and diversified — or is it narrative?
            </li>
            <li>
              <strong>Government validation ({Math.round(SCORE_WEIGHTS.government * 100)}%)</strong> — Has the most rigorous independent technical buyer (DARPA, NIST, DOE, equivalents abroad) blessed the approach?
            </li>
          </ul>

          <h2>Weights — why these and not others</h2>
          <p>
            <strong>Tech and Commercial are equal-weight at 30% each.</strong> Quantum is a deep-tech sector where
            engineering progress and revenue are independent signals on different time-scales — overweighting
            either alone produces a distorted ranking. A company can have superb tech and no commercial
            traction (PsiQuantum) or modest tech and growing revenue (D-Wave annealing); both deserve credit
            for what they have, penalty for what they lack.
          </p>
          <p>
            <strong>Government validation gets 20% — large for a non-financial input.</strong> DARPA QBI is the only public
            program with an independent IV&amp;V team auditing every performer&apos;s roadmap. The signal is
            uniquely costly to fake. We weight it heavily but not above commercial reality.
          </p>
          <p>
            <strong>Capital is 20% — high enough to matter, low enough to avoid double-counting valuation.</strong> The score is
            not a valuation; it is a quality assessment. A great company with a depleted balance sheet is still
            a great company — the capital score penalizes runway risk, not stock-price gravity.
          </p>

          <h2>Dimension 1 — Technology score (0–100)</h2>
          <p>The tech score is built from three component subscores that average to the dimension total.</p>
          <ol>
            <li>
              <strong>Best published 2-qubit gate fidelity</strong> (40% of tech). Linear from 99.0% (= 0 points)
              to 99.99% (= 100 points). Below 99% scores zero. Source: company press releases, peer-reviewed
              papers, DARPA disclosures.
            </li>
            <li>
              <strong>Logical qubits demonstrated</strong> (35% of tech). Logarithmic curve: 1 logical qubit = 20
              points, 10 = 60 points, 48+ = 95 points, 100+ = 100 points. Logical here means error-corrected
              with active syndrome extraction, not algorithmic placeholder.
            </li>
            <li>
              <strong>Coherence/gate-time ratio + architecture credibility</strong> (25% of tech). Judgment call
              based on documented coherence times, native connectivity, scaling path to FTQC. Companies with no
              public credible FTQC roadmap score zero on this component regardless of physical qubit count.
            </li>
          </ol>
          <p>
            Annealing platforms (D-Wave) are scored against a different rubric on subscore 2 because logical
            qubits don&apos;t apply. The methodology page is honest about that — annealing tech scores have
            limited cross-comparability to gate-model tech scores. We score them anyway because they exist
            in the same investable universe.
          </p>

          <h2>Dimension 2 — Capital score (0–100)</h2>
          <p>Three component subscores:</p>
          <ol>
            <li>
              <strong>Runway in years</strong> (50% of capital). Cash divided by trailing burn. 4+ years = 100
              points, 1 year = 30 points, &lt;6 months = 0 points. Parent-company-funded units (IBM Quantum, Microsoft
              Quantum, Google Quantum AI) score 100 by default because the parent balance sheet is the runway.
            </li>
            <li>
              <strong>Recent valuation momentum</strong> (30% of capital). Is the company raising at flat, up,
              or down rounds? Up rounds in the trailing 18 months score full points; flat rounds score 50;
              down rounds score 0. Public companies use stock-price-vs-IPO as a proxy.
            </li>
            <li>
              <strong>Market access</strong> (20% of capital). Can the company tap public, private, or
              government capital efficiently? Public companies with at-the-market facilities score full points.
              Privates with deep-pocketed strategic backers score high. Companies without obvious next-funding
              path score low.
            </li>
          </ol>

          <h2>Dimension 3 — Commercial score (0–100)</h2>
          <p>Four components, summed to 100:</p>
          <ol>
            <li>
              <strong>TTM revenue magnitude</strong> (30 points). Logarithmic from $0 (= 0 points) to $200M+
              (= 30 points). Adjusted for accounting category — system sales recognize lumpily, subscription
              revenue gets a small premium for predictability.
            </li>
            <li>
              <strong>Revenue growth YoY</strong> (30 points). Linear from −20% (= 0 points) to +200% (= 30
              points). Declining revenue is penalized; hypergrowth off a tiny base earns the full 30 only when
              the absolute number is also non-trivial.
            </li>
            <li>
              <strong>Named customer base</strong> (30 points). Number and quality of disclosed paying
              customers. Fortune 500 / nation-state customers score higher than university research
              partnerships. Press-release-only relationships score zero.
            </li>
            <li>
              <strong>Concentration penalty</strong> (−10 points). Concentration above 40% of revenue from a
              single customer triggers a flat −10. Above 60%, −20. This is why Quantinuum (RIKEN 60%) loses 10
              points despite strong revenue growth.
            </li>
          </ol>

          <h2>Dimension 4 — Government validation (0–100)</h2>
          <p>Four buckets, additive:</p>
          <ol>
            <li>
              <strong>DARPA QBI / US2QC stage</strong> (50 points). US2QC final (Stage C equivalent) = 50;
              QBI Stage B = 35; QBI Stage A only = 15; QBI Stage A eliminated = 0.
            </li>
            <li>
              <strong>NATO / EU / AUKUS programs</strong> (20 points). EU Quantum Flagship, UK NQCC, Canadian
              NRC, AUKUS Quantum Arrangement, etc.
            </li>
            <li>
              <strong>Major government contracts</strong> (15 points). Named USAF, DOE, NIST, AFRL contracts
              with disclosed values.
            </li>
            <li>
              <strong>Standards body and IV&amp;V participation</strong> (15 points). NIST PQC submission,
              participation in IEEE/ITU quantum standards, ISO/IEC quantum security working groups.
            </li>
          </ol>

          <h2>What the score does NOT include</h2>
          <ul>
            <li>
              <strong>Stock price.</strong> Price is the market&apos;s current valuation of the score. The
              score is the input, not the output. A high-scoring company can be overpriced; a low-scoring
              company can be cheap. Discussion of price vs score belongs in the per-company writeup, not the
              score itself.
            </li>
            <li>
              <strong>Patents.</strong> Patent activity is a noisy signal in deep tech — granted patents lag,
              filings can be defensive, and quality varies wildly. We track patents in the per-company
              profile but do not include in the score.
            </li>
            <li>
              <strong>Hype / press volume.</strong> Press coverage correlates with PR budget, not technical
              quality. Excluded on principle.
            </li>
            <li>
              <strong>Founder pedigree.</strong> Important but covered in the per-company qualitative writeup.
            </li>
          </ul>

          <h2>Update cadence and change logging</h2>
          <p>
            Scores are refreshed on the 13th of each month. Out-of-cycle updates occur when material events
            land that change a subscore by ≥10 points — DARPA stage decisions, earnings prints, S-1 filings,
            major technical demonstrations.
          </p>
          <p>
            Every score change is logged in a changelog at the bottom of each per-company profile. Historical
            scores are preserved so movements are visible. We do not retroactively edit prior scores; if a
            past scoring was wrong, we publish a correction note rather than rewriting history.
          </p>

          <h2>Honest limitations</h2>
          <ul>
            <li>
              <strong>Information asymmetry favors public companies.</strong> Private-company commercial and
              capital subscores rely on the most credible third-party estimates available. We flag every
              assumption inline. Where a number is unknown, we score conservatively rather than guess.
            </li>
            <li>
              <strong>Annealing vs gate-model.</strong> Cross-comparability of tech scores between modalities
              is limited. D-Wave&apos;s annealing tech score is not directly comparable to IonQ&apos;s gate-model
              tech score. The composite is still useful for ranking commercial viability today; it should not
              be read as &quot;X has better physics than Y&quot; across modalities.
            </li>
            <li>
              <strong>Lag on commercial recognition.</strong> Lumpy enterprise system sales make TTM revenue
              noisy quarter-to-quarter. We use trailing 4Q windows where possible to smooth.
            </li>
            <li>
              <strong>The score is opinion, not advice.</strong> The Ledger Score is a structured analytical
              opinion published for transparency. It is not investment advice. Read the per-company profile,
              read the source citations, form your own view.
            </li>
          </ul>

          <hr />

          <p>
            Disagree with a number? Disagree with a weight? Email Connor at the address in the{' '}
            <Link href="/about">about page</Link>. The methodology improves when it&apos;s pressure-tested.
          </p>
          <p>
            Return to the <Link href="/ledger-score">live ranking</Link>.
          </p>
        </article>
      </div>
    </div>
  );
}
