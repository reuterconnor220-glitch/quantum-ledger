import Link from 'next/link';
import { BellTest } from '@/components/learn/BellTest';

export const metadata = {
  title: 'Bell Test · The Experiment That Proved Quantum Is Nonlocal',
  description: 'How the CHSH inequality and the Bell test experimentally ruled out local hidden-variable theories. Earned the 2022 Nobel Prize in physics — explained with an interactive widget.',
};

export default function BellTestPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-quantum font-mono mb-3">
            The second great quantum experiment
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight leading-tight">
            The Bell test.
          </h1>
          <p className="mt-6 text-xl text-editorial-ink/75 leading-relaxed max-w-[60ch]">
            The double-slit experiment is famous because it&apos;s weird. The Bell test is consequential
            because it&apos;s the formal proof that quantum mechanics cannot be replaced by any theory of
            pre-existing hidden properties. The 2022 Nobel Prize was awarded for finally confirming
            this experimentally without loopholes.
          </p>
        </header>

        <article className="prose-editorial">
          <h2>The question being asked</h2>
          <p>
            When you measure an entangled pair of particles, you find their outcomes are correlated.
            Why? Two possibilities:
          </p>
          <ol>
            <li>
              <strong>Local hidden variables</strong> — each particle leaves the source carrying a
              hidden &quot;cheat sheet&quot; that determines what answer it will give to any
              measurement question, just like a deck of cards split into two piles. Boring, classical,
              intuitive.
            </li>
            <li>
              <strong>Quantum nonlocality</strong> — the particles share an entangled state that has
              no definite answers until measured, and measuring one <em>instantly</em> determines what
              the other will produce. Weird, but what quantum mechanics says.
            </li>
          </ol>
          <p>
            In 1964, John Bell showed these two pictures make <em>different statistical predictions</em>{' '}
            for a particular measurement protocol. You can test which is true experimentally.
          </p>

          <h2>The CHSH inequality</h2>
          <p>
            The clearest form is by Clauser-Horne-Shimony-Holt (CHSH). Alice picks one of two
            measurement angles, a or a&apos;. Bob picks b or b&apos;. Each gets an outcome of +1 or
            −1. Run this many times and compute the correlation E(setting_A, setting_B) — the average
            product of their outcomes.
          </p>
          <p>
            Now combine four of these into one number:
          </p>
          <p style={{ textAlign: 'center', fontFamily: 'ui-monospace', margin: '1.2em 0' }}>
            S = E(a, b) − E(a, b&apos;) + E(a&apos;, b) + E(a&apos;, b&apos;)
          </p>
          <p>
            Bell&apos;s result: <strong>any local hidden-variable theory must give |S| ≤ 2</strong>.
            No matter how clever the hidden cheat sheet, you can&apos;t exceed it.
          </p>
          <p>
            Quantum mechanics, on an entangled singlet state and the right angle choices, predicts{' '}
            <strong>|S| up to 2√2 ≈ 2.828</strong> — the Tsirelson bound. The gap from 2 to 2√2 is the
            empirical fingerprint of quantum reality.
          </p>

          <h2>Try it yourself</h2>
          <p>
            Hit Start stream below. The widget creates entangled pairs and routes them to Alice and Bob,
            who randomly choose between angle pairs (a / a&apos;) and (b / b&apos;). Watch S climb
            past 2 and approach 2.828 as the trial count grows. Then slide the angles around — for most
            settings, S stays inside the classical box.
          </p>

          <BellTest />

          <h2>Why this is the most consequential experiment in modern physics</h2>
          <p>
            Bell&apos;s theorem doesn&apos;t just say &quot;quantum mechanics is right.&quot; It says{' '}
            <strong>any future theory that replaces quantum mechanics must also be nonlocal</strong>.
            Einstein&apos;s &quot;spooky action at a distance&quot; isn&apos;t an artifact of incomplete
            theory; it&apos;s a property of the universe.
          </p>
          <p>
            Specifically: there is no way to explain entangled measurement outcomes using only what the
            particles carry with them when they leave the source. Information about Alice&apos;s
            measurement somehow affects Bob&apos;s outcome despite no signal having time to travel
            between them — this has been verified at distances up to 1,200 km (China&apos;s Micius
            satellite, 2017).
          </p>

          <h2>The 2022 Nobel Prize</h2>
          <p>
            John Clauser, Alain Aspect, and Anton Zeilinger won the 2022 Nobel Prize for closing the
            various &quot;loopholes&quot; in earlier Bell tests:
          </p>
          <ul>
            <li>
              <strong>Clauser (1972)</strong> — first experimental test. Showed violation but with
              detection-efficiency and locality loopholes still open.
            </li>
            <li>
              <strong>Aspect (1982)</strong> — switched the measurement angles <em>after</em> the
              photons were already in flight. Closed the locality loophole if you assume the switches
              were truly random.
            </li>
            <li>
              <strong>Hensen et al. (2015), Giustina (2015), Shalm (2015)</strong> — &quot;loophole-free&quot;
              Bell tests. Closed both detection and locality loopholes simultaneously, using entangled
              electrons in nitrogen-vacancy diamond centers and entangled photons. The verdict: |S| {'>'}{' '}
              2, no escape.
            </li>
            <li>
              <strong>Zeilinger</strong> — built the experimental quantum-teleportation and entanglement-distribution
              toolkit that underpins quantum networking today.
            </li>
          </ul>
          <p>
            By 2022 the conclusion was unambiguous: local hidden-variable theories are dead. The
            universe really is nonlocal.
          </p>

          <h2>Why investors should care</h2>
          <p>
            Three direct commercial implications:
          </p>
          <ul>
            <li>
              <strong>Quantum key distribution (QKD) — BB84 and E91</strong> use the impossibility of
              undetected eavesdropping that Bell&apos;s theorem implies. Every commercial QKD product
              ultimately depends on Bell nonlocality.
            </li>
            <li>
              <strong>Device-independent QKD</strong> goes one step further — security is guaranteed
              <em> by</em> Bell-inequality violation, without trusting the hardware. This is the long-term
              direction for satellite QKD (Micius, EuroQCI).
            </li>
            <li>
              <strong>Quantum networking</strong> uses entanglement distribution as its core protocol.
              The viability of a quantum internet (DOE testbeds, EuroQCI) rests on the same physics that
              Aspect and Zeilinger validated.
            </li>
          </ul>

          <hr />

          <p>
            Now you&apos;ve seen the two big quantum experiments. For the rest of the toolkit, head to{' '}
            <Link href="/learn">the primer</Link>. For the next interactive demo:{' '}
            <Link href="/learn/double-slit">double-slit</Link>. Or jump to{' '}
            <Link href="/papers">landmark papers</Link> to read the originals.
          </p>
        </article>
      </div>
    </div>
  );
}
