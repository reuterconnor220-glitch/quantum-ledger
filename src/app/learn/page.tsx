// Ported /learn primer page — design vocabulary applied.
// DROP-IN for src/app/learn/page.tsx
//
// Preserved exactly from the original:
//   - All widget imports + call sites:
//       <BlochSphere />
//       <EntanglementExplorer />
//       <CircuitBuilder />
//       <GroverTrace />
//       <InterferenceVisualizer />
//   - Section anchor ids (#qubit, #entanglement, #circuits, #grover, #interference)
//
// Visual layer matches /brief, /darpa-qbi, /companies, /companies/[slug]:
//   - Masthead crest (Vol III · Primer · Learn)
//   - Wordmark "How to read *quantum*" with italic accent
//   - Italic positioning subtitle
//   - Italic pull-quote lede (border-l-2 border-accent-data/40 pl-5)
//   - Editorial body — 19px serif, drop cap on the lede, generous max-width
//   - SectionHead helper (eyebrow + italic accent + border-b border-text-primary/90)
//   - Five primer chapters, each pairing long-form copy with one of the existing widgets
//   - Sticky ToC rail (anchor nav) on the right
//   - font-display tabular-nums for the chapter numerals (I·II·III·IV·V)

import Link from 'next/link';
import { BlochSphere } from '@/components/learn/BlochSphere';
import { EntanglementExplorer } from '@/components/learn/EntanglementExplorer';
import { CircuitBuilder } from '@/components/learn/CircuitBuilder';
import { GroverTrace } from '@/components/learn/GroverTrace';
import { InterferenceVisualizer } from '@/components/learn/InterferenceVisualizer';
import { VideoRecommendations } from '@/components/learn/VideoRecommendations';

export const metadata = {
  title: 'Learn · The Quantum Ledger primer',
  description:
    'A working primer for reading quantum computing as an industry — qubits, entanglement, circuits, Grover, and interference, with interactive widgets you can manipulate.',
};

export const revalidate = 86400;

const CHAPTERS: { num: string; id: string; label: string; sub: string }[] = [
  { num: 'I', id: 'qubit', label: 'The qubit', sub: 'Bloch-sphere geometry' },
  { num: 'II', id: 'entanglement', label: 'Entanglement', sub: 'Correlated states' },
  { num: 'III', id: 'circuits', label: 'Circuits', sub: 'Gates as choreography' },
  { num: 'IV', id: 'grover', label: "Grover's search", sub: 'Amplitude amplification' },
  { num: 'V', id: 'interference', label: 'Interference', sub: 'Why phase is the prize' },
];

export default function LearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      {/* ─────────── Masthead crest ─────────── */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">
              Primer
            </span>
            <span className="text-text-muted/60">·</span>
            <span>Learn</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            Five chapters · five interactive widgets
          </div>
          <div className="text-right leading-relaxed">
            Boulder · Colorado
            <br />
            22 min read
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.94] tracking-[-0.025em] text-[clamp(40px,7vw,88px)] text-balance">
          How to read{' '}
          <em className="not-italic font-normal text-accent-data italic">quantum</em>
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[58ch]">
          A working primer for the quantum economy. Five concepts, taught by hand:
          spin one, watch the math respond, then read the next earnings note with a
          working intuition for what the numbers describe.
        </p>
      </header>

      {/* ─────────── Italic-thesis lede + ToC rail ─────────── */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-12 items-start">
        <div>
          <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
            <p className="font-display italic text-[22px] leading-snug tracking-tight text-text-primary">
              Quantum is not a faster classical computer. It is a different{' '}
              <span className="text-accent-data not-italic font-medium">grammar</span>{' '}
              for computation — one in which interference, not arithmetic, is the
              operative verb.
            </p>
            <p className="mt-3 font-display italic text-sm text-text-muted">
              — the premise of this primer
            </p>
          </div>

          <div className="mt-7 space-y-5 text-text-primary text-[19px] leading-[1.6] max-w-[64ch]">
            <p className="font-display">
              <span className="float-left font-display font-medium text-[68px] leading-[0.85] pr-3 pt-1.5">
                T
              </span>
              <span>
                he hardest thing about reading the quantum sector is that the press
                release and the physics paper are written in different languages, and
                the analyst note that mediates them is usually written in a third. This
                primer is built around five interactive figures. Each one isolates one
                concept that, once internalized, lets you read the rest of the Ledger
                without translating in your head.
              </span>
            </p>
            <p>
              You don't need linear algebra. You do need to be willing to spin a few
              dials. Every widget below is fully manipulable; the math updates as you
              touch it. Stop and play with each one until the picture is intuitive
              before moving on — these intuitions compound, and skipping ahead leaves
              you back where you started: parsing words.
            </p>
            <p>
              When a chapter ends, you'll find a one-line{' '}
              <em className="font-display">Ledger view</em> — how this concept appears
              in the news flow, which roadmaps depend on it, and which numbers in a
              company profile suddenly make sense.
            </p>
          </div>
        </div>

        {/* Sticky ToC rail */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <p className="eyebrow mb-3">Contents</p>
          <ol className="grid gap-px bg-border rounded-md overflow-hidden">
            {CHAPTERS.map((ch) => (
              <li key={ch.id} className="bg-bg-surface">
                <a
                  href={`#${ch.id}`}
                  className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 px-4 py-3 hover:bg-bg-elevated transition-colors group"
                >
                  <span className="font-display tabular-nums text-[20px] leading-none text-text-muted group-hover:text-accent-data transition-colors">
                    {ch.num}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[15px] tracking-tight text-text-primary leading-tight">
                      {ch.label}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted mt-1">
                      {ch.sub}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.06em] text-text-muted leading-relaxed">
            Each chapter pairs ~5 min of reading with one fully-interactive figure.
          </p>
        </aside>
      </section>

      {/* ─────────── Chapter I · The qubit ─────────── */}
      <Chapter
        num="I"
        id="qubit"
        title="The"
        accent="qubit"
        kicker="Bloch-sphere geometry"
      >
        <p>
          A classical bit is a switch: 0 or 1, settled, locally readable. A qubit is a{' '}
          <em className="font-display">direction in three-dimensional space</em>. The
          physics of a quantum two-level system happens to be exactly this:
          everything the qubit can be is a point on the surface of a unit sphere — the{' '}
          <em className="font-display">Bloch sphere</em>. The north pole is the
          familiar "0" state. The south pole is "1". Every other direction is a
          superposition, and that direction is the entire job description.
        </p>
        <p>
          The intuition that pays off is this: a quantum gate is a{' '}
          <em className="font-display">rotation</em>. Operating on a qubit means
          rotating its arrow on the sphere. The art of quantum engineering — and most
          of what a fidelity number measures — is rotating the arrow{' '}
          <em className="font-display">precisely</em> and{' '}
          <em className="font-display">predictably</em>. A 99.99% two-qubit gate
          fidelity, in this picture, means the executed rotation lands within a tiny
          cone of the intended one.
        </p>
        <p>
          Spin the sphere below. Each control is a rotation axis. When you measure,
          the qubit's arrow collapses to one of the two poles — but the probability
          of which pole is set by where the arrow was pointing first.
        </p>

        <Figure caption="Bloch sphere. The north pole is |0⟩, the south pole is |1⟩; every other point is a superposition. Click the gates to rotate.">
          <BlochSphere />
        </Figure>
        <VideoRecommendations topic="qubit" />

        <LedgerView>
          When IBM, Quantinuum, or IonQ report a "2Q fidelity," they are reporting how
          tightly two coupled rotations land where they aim. Fidelity above 99.9% is
          the threshold that makes error correction tractable; below that, you're
          rotating into noise.
        </LedgerView>
      </Chapter>

      {/* ─────────── Chapter II · Entanglement ─────────── */}
      <Chapter
        num="II"
        id="entanglement"
        title="The thing that makes quantum"
        accent="quantum"
        kicker="Correlated states across qubits"
      >
        <p>
          Take two qubits. Put each in a superposition. Then operate them with a gate
          that{' '}
          <em className="font-display">couples</em> them — typically a controlled-NOT
          or its variants. What you get is a state that{' '}
          <em className="font-display">cannot be written as two separate qubits</em>.
          Their fates are correlated in a way that has no classical analogue.
        </p>
        <p>
          The trap is to read "correlated" as "communicating instantly." Entanglement
          does not transmit signals; you cannot phone your colleague on Mars through
          a Bell pair. What entanglement{' '}
          <em className="font-display">does</em> is allow many qubits to participate
          in a computation as a single coherent object, which is precisely what
          classical computers cannot do.
        </p>
        <p>
          Move the dials. Notice that the joint outcomes are constrained even though
          the local outcomes look random. That constraint is the resource — the
          object every quantum algorithm spends.
        </p>

        <Figure caption="Two qubits in a Bell state. The marginal outcome on each qubit looks random; the joint distribution is fully predictable.">
          <EntanglementExplorer />
        </Figure>
        <VideoRecommendations topic="entanglement" />

        <LedgerView>
          A "logical qubit" — the unit IBM, QuEra, and Quantinuum quote in their
          roadmaps — is built from many entangled physical qubits running an
          error-correcting code. When a roadmap promises "100 logical qubits by
          2029," it is promising that this many-qubit entangled state can be held
          together long enough to compute. That is the whole game.
        </LedgerView>
      </Chapter>

      {/* ─────────── Chapter III · Circuits ─────────── */}
      <Chapter
        num="III"
        id="circuits"
        title="Gates as"
        accent="choreography"
        kicker="Building a quantum program"
      >
        <p>
          A quantum program is a{' '}
          <em className="font-display">circuit</em>: a left-to-right schedule of
          gates applied to specific qubits. There is no goto, no while-loop, no
          branch-on-classical-state — at least, not inside the quantum part of the
          program. Time flows once, gates fire in sequence, and at the end of the
          schedule every qubit is measured.
        </p>
        <p>
          This is much less expressive than a classical instruction set, and that's
          the point. The constraint is{' '}
          <em className="font-display">how</em> quantum machines achieve speedup:
          they apply the same family of operations to an enormous superposition of
          inputs in one pass. The hard work is choreographing the gates so that the
          right answer rings out at the end while the wrong answers cancel.
        </p>
        <p>
          Click a gate, then click a slot to place it. The state vector updates as you build;
          measurement happens at the right edge. Try the canonical recipes first
          (H ➞ CX is a Bell pair); then break them and see what falls apart.
        </p>

        <Figure caption="A simple circuit builder. Click a gate, then click a cell on each qubit's wire and watch the joint state evolve to the right.">
          <CircuitBuilder />
        </Figure>
        <VideoRecommendations topic="circuits" />

        <LedgerView>
          "Circuit depth" — how many sequential gates a machine can run before
          decoherence wins — is the single most useful hardware metric you can hold
          in your head. IBM's Heron, Quantinuum's Helios, and IonQ's Tempo are all
          competing on the same axis: depth ✕ width before error correction is
          required.
        </LedgerView>
      </Chapter>

      {/* ─────────── Chapter IV · Grover ─────────── */}
      <Chapter
        num="IV"
        id="grover"
        title="Grover's"
        accent="search"
        kicker="Amplitude amplification, made geometric"
      >
        <p>
          Grover's algorithm is the textbook example of a quantum speedup, and the
          one most often abused in press releases. It searches an unstructured
          database of <em className="font-display">N</em> items in roughly{' '}
          <em className="font-display">√N</em> steps — quadratic, not exponential.
          The trick is geometric: each step rotates the state vector incrementally
          toward the marked answer.
        </p>
        <p>
          Two things are easy to miss. First, Grover requires that you be able to
          build a quantum circuit — an{' '}
          <em className="font-display">oracle</em> — that recognizes the answer; if
          you can already do that classically with similar cost, you've not saved
          much. Second, Grover{' '}
          <em className="font-display">overshoots</em> if you iterate too many times:
          past the optimum, the state rotates away from the answer again. Quantum
          algorithms are choreographed, not iterated.
        </p>
        <p>
          Step through the trace below. Watch the amplitude of the marked state
          climb, peak, and then — if you keep going — start to fall. The number of
          iterations is part of the algorithm; you don't run it "until it's right."
        </p>

        <Figure caption="Amplitude trace through Grover iterations. The marked state's amplitude grows toward 1, peaks, and then decays — the optimum is roughly π/4 × √N steps.">
          <GroverTrace />
        </Figure>
        <VideoRecommendations topic="grover" />

        <LedgerView>
          When a vendor claims a "1000✕ speedup on Grover," ask: 1000✕ over what
          classical baseline, on what problem instance, and including the cost of
          building the oracle? The √N is real; the practical advantage is almost
          always smaller than the headline.
        </LedgerView>
      </Chapter>

      {/* ─────────── Chapter V · Interference ─────────── */}
      <Chapter
        num="V"
        id="interference"
        title="Why phase is the"
        accent="prize"
        kicker="Interference is the operative verb"
      >
        <p>
          Everything in this primer comes down to one idea:{' '}
          <em className="font-display">interference</em>. Amplitudes — complex
          numbers attached to each possible outcome — add and cancel. A well-built
          quantum algorithm arranges the gates so that, when the dust settles, the
          amplitudes of the correct answers reinforce each other while the
          amplitudes of the wrong answers destructively interfere into nothing.
        </p>
        <p>
          This is also why quantum machines are so demanding. The reason
          decoherence matters, the reason a stray photon in the dilution fridge is
          fatal, the reason a misaligned laser pulse on a trapped ion costs you a
          shot — all of it traces back to{' '}
          <em className="font-display">phase</em>. Lose the relative phases between
          amplitudes and you lose the ability to interfere. Without interference,
          the machine is an expensive random number generator.
        </p>
        <p>
          The figure below superposes two complex amplitudes; rotate the relative
          phase and watch the joint probability oscillate between zero and one. The
          information in a quantum computer lives in those phase relationships, and
          everything else — fidelity, coherence time, error correction — is
          engineering aimed at preserving them.
        </p>

        <Figure caption="Two amplitudes superposed. Rotate the relative phase to see total cancellation, total reinforcement, and everything in between.">
          <InterferenceVisualizer />
        </Figure>
        <VideoRecommendations topic="interference" />

        <LedgerView>
          The phrase "quantum advantage" only means anything when interference is
          load-bearing in the algorithm. If a workload doesn't fundamentally depend
          on cancelling wrong answers, no qubit count will help it. This is why
          chemistry and factoring are exciting and most machine-learning claims are
          not.
        </LedgerView>
      </Chapter>

      {/* ─────────── Closing ─────────── */}
      <section className="mt-20 pt-12 border-t border-text-primary/90 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 items-start">
        <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
          <p className="font-display italic text-[22px] leading-snug tracking-tight text-text-primary">
            Five concepts cover most of what you'll meet in the news flow.
            Everything else — surface codes, magic state distillation, GKP
            encoding — is{' '}
            <span className="text-accent-data not-italic font-medium">
              engineering at scale
            </span>{' '}
            on top of these primitives.
          </p>
          <p className="mt-3 font-display italic text-sm text-text-muted">
            — and that's the whole primer
          </p>
        </div>

        <div className="text-sm text-text-secondary leading-[1.65] max-w-[44ch]">
          <p className="eyebrow mb-2">Where to go next</p>
          <ul className="grid gap-1.5">
            <li>
              <Link href="/brief" className="text-accent-data hover:underline">
                Today's brief — apply the vocabulary ›
              </Link>
            </li>
            <li>
              <Link href="/companies" className="text-accent-data hover:underline">
                The cohort directory ›
              </Link>
            </li>
            <li>
              <Link href="/darpa-qbi" className="text-accent-data hover:underline">
                DARPA QBI tracker ›
              </Link>
            </li>
            <li>
              <Link href="/ledger-score" className="text-accent-data hover:underline">
                How the Ledger Score is built ›
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────── helpers ────────────────────────────── */

function Chapter({
  num,
  id,
  title,
  accent,
  kicker,
  children,
}: {
  num: string;
  id: string;
  title: string;
  accent: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-20 scroll-mt-20">
      <div className="mb-6 pb-3 border-b border-text-primary/90">
        <div className="flex items-baseline gap-4 flex-wrap">
          <span className="font-display tabular-nums text-[44px] leading-none tracking-[-0.02em] text-text-muted">
            {num}
          </span>
          <div className="min-w-0">
            <p className="eyebrow mb-1.5">Chapter {num} · {kicker}</p>
            <h2 className="font-display font-normal text-[clamp(28px,3.6vw,42px)] tracking-tight text-balance leading-[1.05]">
              {title}{' '}
              <em className="not-italic font-normal italic text-accent-data">
                {accent}
              </em>
            </h2>
          </div>
        </div>
      </div>

      <div className="space-y-5 text-text-primary text-[17px] leading-[1.65] max-w-[68ch]">
        {children}
      </div>
    </section>
  );
}

function Figure({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mt-7">
      {children}
      <figcaption className="mt-3 font-display italic text-[14px] leading-snug text-text-muted max-w-[68ch]">
        {caption}
      </figcaption>
    </figure>
  );
}

function LedgerView({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
      <p className="eyebrow mb-2">The Ledger view</p>
      <p className="font-display italic text-[17px] leading-snug tracking-tight text-text-primary">
        {children}
      </p>
    </div>
  );
}
