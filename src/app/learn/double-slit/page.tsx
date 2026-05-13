import Link from 'next/link';
import { DoubleSlit } from '@/components/learn/DoubleSlit';

export const metadata = {
  title: 'The Double-Slit Experiment · Interactive · Quantum Ledger',
  description: 'The single most famous experiment in physics — explained as an interactive widget. Watch single photons build up an interference pattern, then watch it collapse the moment you observe which slit they pass through.',
};

export default function DoubleSlitPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-quantum font-mono mb-3">
            The experiment
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight leading-tight">
            The double-slit experiment.
          </h1>
          <p className="mt-6 text-xl text-editorial-ink/75 leading-relaxed max-w-[60ch]">
            Richard Feynman called it &quot;the only mystery&quot; in quantum mechanics. He said you
            could understand all the strange behavior of quantum particles by understanding this one
            experiment. Here it is, interactive, with single photons you can fire one at a time.
          </p>
        </header>

        <article className="prose-editorial">
          <h2>What you&apos;re about to see</h2>
          <p>
            Fire light at a wall with two narrow slits cut in it. Put a screen behind the wall.
            What do you see on the screen?
          </p>
          <p>
            Classical intuition says: two bright lines, one for each slit. The light goes
            through one or the other and lands behind. Simple.
          </p>
          <p>
            What actually happens is so strange that physicists are still arguing about what it
            means, a hundred years after the first measurements.
          </p>

          <DoubleSlit />

          <h2>What you should notice</h2>
          <p>
            Hit <strong>&quot;Two slits&quot;</strong> and click <strong>Stream</strong>. Each
            individual dot lands in an apparently random spot. But run a few hundred and a pattern
            emerges: bands of bright stripes alternating with dark gaps. That&apos;s an{' '}
            <em>interference pattern</em> — the kind of thing you see when two water waves overlap,
            with crests adding to crests and crests canceling troughs.
          </p>
          <p>
            <strong>This is the first weird thing.</strong> You&apos;re firing single photons, one
            at a time. Each one is a particle — when it hits the detector it leaves a single dot,
            not a smear. But the <em>statistics</em> of where they land matches a wave interference
            pattern. Each photon is somehow interfering <em>with itself</em>.
          </p>
          <p>
            This rules out a lot of intuitive explanations. The photons aren&apos;t bumping into
            each other — they&apos;re fired one at a time. They aren&apos;t literal water waves —
            each one leaves a single point of impact. They&apos;re something else.
          </p>

          <h2>The second weird thing — measurement</h2>
          <p>
            Now switch to <strong>&quot;Two slits, observed.&quot;</strong> This adds a detector at
            each slit that records which slit each photon passed through. Hit Reset, then Stream
            again.
          </p>
          <p>
            The interference pattern <em>vanishes</em>. You get two bumps, one behind each slit. The
            classical picture. The pattern that &quot;ought&quot; to be there if photons are
            particles.
          </p>
          <p>
            Nothing about the physical setup has changed except whether information about
            which-slit-each-photon-took is recorded somewhere. That information&apos;s mere
            existence — whether or not anyone looks at it — destroys the interference. You can run
            this experiment yourself at home with a laser pointer and razor blades.
          </p>

          <h2>What does this mean?</h2>
          <p>
            There are several interpretations of what&apos;s actually happening, and physicists
            still don&apos;t agree:
          </p>
          <ul>
            <li>
              <strong>Copenhagen interpretation</strong> (the textbook view) — before measurement,
              the photon doesn&apos;t have a definite path. It&apos;s described by a wave function
              that goes through both slits simultaneously. Measurement &quot;collapses&quot; the
              wave function to a single outcome. Asking which slit it &quot;really&quot; went
              through before measurement is a meaningless question.
            </li>
            <li>
              <strong>Many-worlds interpretation</strong> — the photon goes through both slits, and
              the universe splits into branches where it went through each. Branches interfere when
              they recombine on the detector. When you measure, your branch entangles with a
              specific photon-path branch and you stop seeing the other one.
            </li>
            <li>
              <strong>Pilot wave / Bohmian mechanics</strong> — the photon really does take one
              path, but it&apos;s guided by a &quot;pilot wave&quot; that goes through both slits.
              Measurement disrupts the pilot wave. Less popular today but logically consistent.
            </li>
          </ul>
          <p>
            All three predict the same experimental results. The disagreement is purely about
            interpretation — what&apos;s &quot;really&quot; happening before you measure.
          </p>

          <h2>Why this is the foundation of quantum computing</h2>
          <p>
            Quantum computing exploits exactly this property: that quantum particles can be in
            <em> superposition</em> — taking multiple paths at once, or being in multiple states at
            once — and that those parallel possibilities can interfere constructively or
            destructively. Every quantum algorithm is, fundamentally, an interference engine: the
            circuit is designed so that paths leading to wrong answers cancel out and paths leading
            to right answers reinforce.
          </p>
          <p>
            A qubit in superposition is doing the double-slit experiment, but with abstract logical
            states instead of physical paths. The wave-function math is identical. The Bloch sphere
            is just a clean way to draw what would otherwise look like an interference diagram.
          </p>

          <h2>Things you can verify</h2>
          <ul>
            <li>
              <strong>Single-photon interference is real.</strong> Done first in 1909 (Taylor) with
              dim light, and definitively with single photons in 1989 (Tonomura).
            </li>
            <li>
              <strong>Molecules do it too.</strong> Anton Zeilinger&apos;s group showed buckyball
              (C₆₀) and even larger molecules (up to 2,000-atom proteins) producing interference
              patterns. Quantum behavior is not limited to small particles — it&apos;s a property
              of how nature works.
            </li>
            <li>
              <strong>The &quot;delayed choice&quot; version is even weirder.</strong> John
              Wheeler proposed measuring which slit <em>after</em> the photon has already passed
              through. Done experimentally — the result still depends on the measurement choice,
              even though that choice was made after the photon allegedly &quot;committed&quot; to
              a path.
            </li>
          </ul>

          <hr />

          <h2>Want to go deeper?</h2>
          <p>
            Now that you&apos;ve seen the double-slit pattern, the rest of quantum mechanics has
            a place to live in your head. The two best next steps:
          </p>
          <ul>
            <li>
              <Link href="/learn">The primer</Link> — 16 concepts from qubits to fault-tolerant
              computing. Includes the interactive Bloch sphere, entanglement explorer, circuit
              builder, Grover&apos;s algorithm walkthrough.
            </li>
            <li>
              <Link href="/glossary">The glossary</Link> — every quantum term defined.
            </li>
            <li>
              <Link href="/learn/resources">Best books, videos, podcasts</Link> — including Quantum
              Country by Andy Matuschak &amp; Michael Nielsen, the gold-standard interactive book
              on this topic.
            </li>
          </ul>
        </article>
      </div>
    </div>
  );
}
