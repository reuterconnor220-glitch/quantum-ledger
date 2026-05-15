import Link from 'next/link';

export const metadata = {
  alternates: { canonical: '/essays/cohort-sold-off-clean-reporting' },
  title: 'The cohort sold off on a clean reporting cycle. Here is why.',
  description:
    "Q1 2026 was the strongest collective reporting season the public quantum pure-plays have ever delivered. Every name closed lower. This is not noise. The multiple compression cycle is beginning. By Connor Reuter, Quantum Ledger.",
  openGraph: {
    title: 'The cohort sold off on a clean reporting cycle. Here is why.',
    description: 'When clean prints stop lifting the cohort, valuation is the problem.',
  },
};

export default function EssayPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-data font-mono mb-3">
            Essay · 10 min read · 2026-05-15
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight leading-tight">
            The cohort sold off on a clean reporting cycle. Here is why.
          </h1>
          <p className="mt-6 text-xl text-editorial-ink/75 leading-relaxed max-w-[60ch]">
            Q1 2026 was the strongest collective reporting season the public quantum
            pure-plays have ever delivered. Every name closed lower. This is not noise. It is
            the beginning of multiple compression in a cohort whose valuations have been
            priced for execution that hasn&apos;t happened.
          </p>
          <p className="mt-6 text-sm text-editorial-ink/60 font-mono">By Connor Reuter</p>
        </header>

        {/* ──────────────── Stance bar ──────────────── */}
        <aside className="not-prose mb-12 border-l-4 border-accent-data bg-editorial-ink/[0.04] pl-6 pr-5 py-5 rounded-r-md">
          <p className="text-[10px] uppercase tracking-[0.18em] text-accent-data font-mono mb-3 font-semibold">
            The Ledger View
          </p>
          <p className="font-display text-[20px] leading-snug text-editorial-ink mb-5">
            The public quantum pure-plays are no longer compensated for bookings growth. The
            multiples on QBTS, RGTI, IONQ, and ARQQ have priced in a perfect-execution case
            that this Q1 cycle did not exceed. Multiple compression is the base case for the
            next twelve months. The trade is not buy-on-weakness.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-editorial-ink/15">
            <div>
              <p className="text-[9px] uppercase tracking-[0.15em] text-editorial-ink/60 font-mono mb-1">
                Confidence
              </p>
              <p className="font-display text-base text-editorial-ink">Medium</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.15em] text-editorial-ink/60 font-mono mb-1">
                Horizon
              </p>
              <p className="font-display text-base text-editorial-ink">12 months</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.15em] text-editorial-ink/60 font-mono mb-1">
                What changes our mind
              </p>
              <p className="text-sm leading-snug text-editorial-ink/85">
                Quantinuum prices above $16B and the aftermarket holds; or any name prints
                sequential gross-margin expansion in Q2.
              </p>
            </div>
          </div>
        </aside>

        <article className="prose-editorial">
          <h2>What actually printed</h2>
          <p>
            The Q1 2026 reports landed on May 12 and ran through the end of the week. Taken on
            their own, the headline numbers are the strongest collective performance the
            public quantum pure-plays have delivered.
          </p>
          <p>
            D-Wave reported $33.4 million in Q1 bookings, up nearly two thousand percent
            year-over-year, alongside an announced acquisition of Quantum Circuits Inc. that
            marks the company&apos;s first formal step into gate-model error correction.
            Rigetti delivered its 108-qubit Ankaa-3 system to general availability and won a
            £100 million commitment from the United Kingdom to deploy a 1,000+ qubit system on
            British soil by 2028. IonQ reported Q1 revenue of $64.7 million (+755 percent
            year-over-year) and raised FY26 guidance to $260-270 million. Quantum Computing
            Inc. reported revenue growth of roughly 9,000 percent year-over-year, dominated by
            post-acquisition consolidation rather than organic growth, while operating losses
            widened.
          </p>
          <p>
            On the private side, Photonic Inc. closed a $200 million round at a $2 billion
            valuation. Nord Quantique closed a Fidelity-led round at a $1.4 billion mark.
            Both are clean private markups that landed inside the same reporting window.
          </p>
          <p>
            By any read, this is a constructive quarter for the sector. Bookings are
            accelerating. Government wins are concrete. Private capital is still flowing into
            late-stage names at premium marks. The public-market response was to sell every
            pure-play on the tape, with QBTS leading the decline at -8.9 percent in our
            <Link href="/brief">May 14 snapshot</Link>.
          </p>
          <p>
            That is the question that defines the rest of 2026 for these names. Why did a
            collectively constructive cycle clear nobody?
          </p>

          <h2>Bookings growth is no longer a positive surprise</h2>
          <p>
            The simplest framing is that the multiples themselves are the problem. IonQ trades
            at roughly 150 times trailing sales. Rigetti is closer to 700 times. D-Wave at
            300 times. Quantum Computing Inc., on the post-consolidation revenue base, at
            roughly 890 times. These are not multiples that survive Q1 beats. They are
            multiples that price perfect execution against a future revenue ramp that
            hasn&apos;t happened yet.
          </p>
          <p>
            At those multiples, a 755 percent revenue print is the base case. A 2,000 percent
            bookings print is the base case. A new sovereign customer is the base case. The
            print can match those expectations and the multiple still has to come down, because
            the discount rate on a multi-year compounding revenue series is mechanically high
            when the cohort trades at three-digit price-to-sales. Time alone is the headwind.
          </p>
          <p>
            What would move the multiples up is what isn&apos;t in the prints: gross margin
            expansion, operating leverage, capital return, or a credible path to GAAP
            profitability. None of these are in any 2026 pure-play guide. The cohort is
            running the playbook the multiples already priced. The only way to grow into the
            multiples is to exceed them. The Q1 cycle didn&apos;t.
          </p>

          <h2>The buy-side rotation is real</h2>
          <p>
            The second framing is structural. Over the last six months, public-market quantum
            capital has been migrating out of pure-plays and into quantum optionality plays
            inside large-cap incumbents. IBM, Microsoft, Google, Honeywell-Quantinuum (post
            spin), and even Nvidia are now treated by the buy side as legitimate quantum
            exposure with the added comfort of a real balance sheet.
          </p>
          <p>
            The reason this matters is that the marginal dollar of quantum exposure is moving.
            When an institutional allocator wants quantum in the book today, the analytically
            defensible position is no longer a 1 percent position in IONQ. It is a 4 percent
            position in MSFT with a thesis that includes Azure Quantum and the topological
            qubit roadmap. The diversification is identical at the basket level, the duration
            is shorter, the volatility is lower, and the optionality on a working quantum
            machine is preserved. The mathematical case for owning a pure-play has been
            getting weaker for two years. The Q1 prints did nothing to reverse that.
          </p>
          <p>
            This is a durable trade because it&apos;s rational. The pure-play premium needed
            to compensate the holder for the binary architecture risk has compressed because
            the incumbents are no longer behind on the architecture. IBM&apos;s qLDPC
            demonstration with Bravyi et al. was the moment the buy side stopped thinking of
            large-caps as quantum laggards. Microsoft&apos;s topological qubit announcement
            (whatever its eventual outcome) was the moment they stopped underwriting the
            pure-plays&apos; near-monopoly on the narrative. The pure-plays haven&apos;t
            recovered from either.
          </p>

          <h2>The private mark spread</h2>
          <p>
            The most interesting datum in the Q1 cycle is the spread between private marks and
            public marks. Photonic Inc. printed a 2 billion mark in private. Nord Quantique
            printed 1.4 billion. The closest public comp for either of these is somewhere in
            the Rigetti-to-Atom range, where the public market is paying meaningfully less per
            unit of forward revenue or per unit of physical qubit. That spread is the new
            arbitrage in the sector.
          </p>
          <p>
            Mathematically the spread cannot last. Either the private marks come down or the
            public marks rerate up. Our view is that the private marks come down first. The
            late-stage growth funds that are still deploying into quantum at premium marks
            are doing so against an LP universe that benchmarks them quarterly. The first
            secondary trade that prints below the most recent mark sets the new floor.
          </p>
          <p>
            We are already seeing the first signs of this in adjacent sectors. AI
            infrastructure names that closed at fifty-times-forward revenue in 2024 are
            secondary-trading at thirty-times in 2026. Quantum is on the same curve, with a
            twelve to eighteen month lag. The names whose latest primary mark is most
            disconnected from the public comps are the first ones at risk.
          </p>

          <h2>Implications for LP-fund exposure</h2>
          <p>
            For Caruso Ventures and for our peers in family-office quantum exposure, this is
            the implication that matters. We are moving our private quantum positions to a
            quarterly mark-to-public methodology for internal reporting. The methodology is
            simple: for each private quantum holding, identify the two closest public comps,
            apply the median price-to-sales multiple to the holding&apos;s forward revenue,
            and use that as the marking input alongside the lead investor&apos;s most recent
            primary round.
          </p>
          <p>
            This is conservative. It probably understates the value of architectures that the
            public market hasn&apos;t yet figured out how to comp (photonic, neutral atom). It
            probably overstates the discount for architectures that the public market has
            penalized too aggressively (silicon-spin in particular). But it captures the
            direction of the spread, and it gets internal reporting ahead of the eventual
            external repricing.
          </p>
          <p>
            For LPs reading this who have quantum exposure through growth funds or secondaries,
            our recommendation is to ask your managers to publish a similar methodology. Any
            manager whose marks haven&apos;t moved in the last two quarters has a question to
            answer.
          </p>

          <h2>What the prints do mean</h2>
          <p>
            Nothing in this thesis says the underlying businesses are bad. D-Wave&apos;s
            bookings growth is a genuine operational milestone and signals customer pull in
            optimization use cases. Rigetti&apos;s 108-qubit GA and the UK win are the
            strongest external validations the company has ever received. IonQ&apos;s revenue
            ramp is real and the customer base diversification is the cleanest in the public
            cohort. These businesses are executing. They are simply executing against
            valuations that priced this execution two years ago.
          </p>
          <p>
            The right way to hold quantum exposure for the next eighteen months, in our view,
            is mostly through private positions with realistic carrying values and through
            incumbent optionality on the public side. The pure-play names are the worst risk-
            adjusted instrument in the trade today. They are the right instrument for traders
            playing the IPO catalyst calendar around Quantinuum and for binary believers in
            specific architectures. They are the wrong instrument for institutional exposure.
          </p>

          <h2>The counterargument</h2>
          <p>
            The case against this thesis has three serious forms.
          </p>
          <p>
            <strong>One.</strong> The Quantinuum IPO will lift everyone. If the book prices
            above $16 billion and the aftermarket holds, the comp basis for every other
            pure-play resets up. This is real and we hold it as the primary thing that
            invalidates the thesis. It is conditional on a specific IPO outcome that
            hasn&apos;t happened. If it happens, we revisit.
          </p>
          <p>
            <strong>Two.</strong> The cohort always sells the print and rallies later. There
            is some historical support for this. The 2023 and 2024 prints in IONQ specifically
            tended to sell off into the close and rally into the next earnings. The 2025-2026
            prints have not followed the pattern. The difference is that expectations have
            risen faster than execution, and the rally-into-next-earnings setup requires
            expectations to have room to rise. They no longer do.
          </p>
          <p>
            <strong>Three.</strong> Rate-cycle dynamics are dominant and quantum is just along
            for the ride. Partially true. Quantum is among the highest-duration equity buckets
            in the public market. Any tightening of the discount-rate environment will compress
            multiples faster than fundamentals. But the cohort has underperformed the long-
            duration tech basket for two quarters running, which suggests something cohort-
            specific is also happening. The rate cycle accelerated the move; it didn&apos;t
            originate it.
          </p>

          <h2>What we&apos;re watching</h2>
          <p>
            The Quantinuum IPO is the primary catalyst. Pricing above $16 billion with a clean
            aftermarket invalidates the multiple-compression base case for the sector. Pricing
            below $14 billion confirms it. Anything between is ambiguous and the secondary
            tape over the following month becomes the read.
          </p>
          <p>
            The Q2 reporting cycle is the second test. We are looking for sequential margin
            expansion at IonQ specifically, given the operating leverage embedded in the
            $260-270 million FY26 guide. We are looking for whether D-Wave&apos;s +2,000
            percent bookings convert to a similarly-magnitude revenue recognition print in Q2
            or whether the booking-to-revenue gap reveals customer concentration that the
            market hasn&apos;t fully priced.
          </p>
          <p>
            The third test is the private mark cycle. If Photonic Inc. or Nord Quantique
            print follow-on rounds in the next two quarters at higher marks, the private
            faith is real and the public-private spread is sustainable for another beat. If
            either trades in secondary below the recent primary mark, the rerate starts.
          </p>

          <h2>Disclosure</h2>
          <p>
            Connor Reuter runs Quantum Ledger. He is an investor at Caruso Ventures, a Single
            Family Office. As of publication, Caruso Ventures has no direct equity positions
            in IonQ, D-Wave, Rigetti, Quantum Computing Inc., or Arqit. Caruso Ventures has
            indirect exposure to private quantum names through growth-stage fund commitments
            including PsiQuantum and several Stage A QBI vendors. Views expressed are the
            author&apos;s and do not constitute investment advice.
          </p>

          <hr />

          <p>
            <em>
              The Ledger publishes one signed essay each week, plus the daily brief at six in
              the morning Mountain. For the live cohort view referenced above, see the{' '}
              <Link href="/companies">company directory</Link>; the{' '}
              <Link href="/qnt-ipo-watch">QNT IPO Watch</Link> tracks the Quantinuum pricing
              process referenced as the primary catalyst; the{' '}
              <Link href="/ledger-score">Ledger Score</Link> is the underlying scoring
              framework that supports the rankings used in this essay.
            </em>
          </p>
        </article>
      </div>
    </div>
  );
}
