import Link from 'next/link';
import { BlochSphere } from '@/components/learn/BlochSphere';
import { Misconception } from '@/components/learn/Misconception';
import { DepthToggle } from '@/components/learn/DepthToggle';
import { InterferenceVisualizer } from '@/components/learn/InterferenceVisualizer';
import { EntanglementExplorer } from '@/components/learn/EntanglementExplorer';
import { CircuitBuilder } from '@/components/learn/CircuitBuilder';
import { GroverTrace } from '@/components/learn/GroverTrace';
import { Giscus } from '@/components/Giscus';

export const metadata = {
  title: 'Learn · Quantum Computing for Newcomers and Physicists',
  description: 'A layered-depth primer on quantum computing — surface explanation for the curious, expandable toggles for math, code, and citations. 16 concepts from qubits to fault tolerance.',
};

const TOC = [
  { id: 'misconceptions', label: 'What you\'ve heard that\'s wrong' },
  { id: 'qubit', label: 'The qubit' },
  { id: 'superposition', label: 'Superposition' },
  { id: 'measurement', label: 'Measurement' },
  { id: 'bloch', label: 'The Bloch sphere' },
  { id: 'gates', label: 'Quantum gates' },
  { id: 'circuits', label: 'Circuits' },
  { id: 'entanglement', label: 'Entanglement' },
  { id: 'interference', label: 'Interference' },
  { id: 'no-cloning', label: 'No-cloning' },
  { id: 'algorithms', label: 'Algorithms' },
  { id: 'simulation', label: 'Quantum simulation' },
  { id: 'decoherence', label: 'Decoherence &amp; noise' },
  { id: 'error-correction', label: 'Error correction' },
  { id: 'ftqc', label: 'Fault-tolerant QC' },
  { id: 'where-now', label: 'Where we are in 2026' },
];

export default function LearnPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <p className="text-[10px] uppercase tracking-[0.2em] text-editorial-ink/60 mb-3 font-mono">Contents</p>
            <ul className="space-y-1.5 text-sm">
              {TOC.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-editorial-ink/70 hover:text-accent-quantum block py-0.5">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-editorial-ink/10">
              <Link href="/" className="text-xs font-mono text-editorial-ink/60 hover:text-accent-quantum">
                ← Back to home
              </Link>
            </div>
          </div>
        </aside>

        {/* Article */}
        <article className="prose-editorial">
          {/* Hero */}
          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-quantum font-mono mb-4">
              Start here
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight leading-[1.05]">
              What is quantum computing? Why does it matter?
            </h1>
            <p className="mt-6 text-xl text-editorial-ink/75 leading-relaxed max-w-[60ch]">
              In one sentence: a fundamentally new kind of computer that isn&apos;t faster at everything —
              but is dramatically faster at a small, important set of problems that classical computers
              can&apos;t solve.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono text-editorial-ink/60">
              <span>~15 min surface read</span>
              <span>·</span>
              <span>~3 hr with all toggles expanded</span>
              <span>·</span>
              <span>Last updated May 2026</span>
            </div>
          </header>

          {/* High-level intro for total newbies */}
          <section className="not-prose mb-12">
            <div className="bg-white border border-editorial-ink/10 rounded-md p-6 md:p-8 mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent-quantum font-mono mb-3">
                The 60-second mental model
              </p>
              <p className="text-[17px] leading-[1.7] text-editorial-ink/85 mb-4">
                Your laptop has a <strong>CPU</strong> for general tasks. It may have a <strong>GPU</strong> for
                graphics and AI. Both are <em>classical</em> computers — they crunch through ones and zeros.
              </p>
              <p className="text-[17px] leading-[1.7] text-editorial-ink/85 mb-4">
                A <strong>QPU</strong> (Quantum Processing Unit) is a third kind of co-processor. Instead of
                bits, it uses <em>qubits</em>: physical objects (atoms, photons, superconducting circuits)
                that exploit the weird rules of quantum mechanics. You won&apos;t put one in your laptop. You
                also won&apos;t need to — quantum computers are specialists. You&apos;ll call them from the
                cloud, the same way you call a GPU, for very specific problems where they win.
              </p>
              <p className="text-[17px] leading-[1.7] text-editorial-ink/85">
                Those problems happen to include some of the most economically important ones we have:
                designing new drugs, simulating new materials, breaking certain kinds of encryption, and
                optimizing complex systems. That&apos;s why $11+ billion of private capital and $30–40 billion
                of government money have flowed into this space — and why every major tech company has a
                quantum division.
              </p>
            </div>

            {/* The CPU/GPU/QPU card comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <ComputeKindCard
                title="CPU"
                subtitle="Classical general-purpose"
                bullets={['Everything your computer does', 'Sequential, versatile', 'Used since the 1950s']}
                color="text-blue-700 bg-blue-500/10"
              />
              <ComputeKindCard
                title="GPU"
                subtitle="Classical specialist"
                bullets={['Graphics + AI training', 'Massively parallel', 'Coprocessor — you call it']}
                color="text-emerald-700 bg-emerald-500/10"
              />
              <ComputeKindCard
                title="QPU"
                subtitle="Quantum specialist"
                bullets={['Chemistry, cryptography, optimization', 'Different rules entirely', 'Coprocessor — you call it']}
                color="text-violet-700 bg-violet-500/10 ring-1 ring-violet-500/30"
                highlight
              />
            </div>

            {/* The "if I only ask 5 questions" panel */}
            <details className="bg-white border border-editorial-ink/10 rounded-md p-6 group">
              <summary className="cursor-pointer text-sm font-mono uppercase tracking-wider text-accent-quantum font-medium select-none flex justify-between items-center">
                <span>Five questions everyone asks · click to expand</span>
                <span className="text-editorial-ink/40 group-open:rotate-180 transition">⌄</span>
              </summary>
              <div className="mt-5 space-y-5">
                <QA
                  q="Will quantum break encryption?"
                  a="Yes, eventually — RSA and ECC (the math behind most internet security) fall to Shor's algorithm. But you need millions of physical qubits or thousands of logical ones. That&apos;s a 2030+ problem. NIST already standardized post-quantum replacements in 2024 (ML-KEM, ML-DSA). Apple and Cloudflare have already deployed them."
                />
                <QA
                  q="When will quantum computers be useful?"
                  a="For chemistry and materials simulation: 2028–2032 is the credible window. For optimization: parts of it work today on D-Wave annealers. For machine learning: highly speculative. For breaking RSA at scale: 2030+. Anyone promising 'universal fault-tolerance by 2030' is selling a roadmap, not a product."
                />
                <QA
                  q="Do I need a quantum computer in my office?"
                  a="No. You'll never own one personally and most companies won't either. Like GPUs in the cloud era, you'll rent compute through AWS Braket, Azure Quantum, IBM Quantum Platform, or IonQ Cloud for specific jobs."
                />
                <QA
                  q="Will quantum replace classical computing?"
                  a="No. They&apos;re complements. Quantum computers are specialists — they only outperform classical for problems with specific mathematical structure (factoring, simulating quantum systems, certain searches). Your laptop and the world&apos;s data centers stay classical."
                />
                <QA
                  q="What about AI plus quantum?"
                  a="Mostly hype today. There are real but narrow theoretical results. No demonstrated quantum advantage on real-world ML benchmarks exists. The honest near-term story is: classical AI orchestrating quantum subroutines (chemistry, optimization), not 'quantum AI takes over.'"
                />
              </div>
            </details>
          </section>

          {/* Navigation cards to sub-pages */}
          <nav className="not-prose mb-14">
            <p className="text-[10px] uppercase tracking-[0.2em] text-editorial-ink/50 font-mono mb-3">
              Five companion pages
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <SubPageCard
                href="/today"
                eyebrow="Already real"
                title="What\&apos;s deployed right now"
                body="Apple, Cloudflare, HSBC, BMW, the Royal Navy — quantum already runs in production for paying customers. Every verified deployment."
              />
              <SubPageCard
                href="/learn/timeline"
                eyebrow="The horizon"
                title="5, 10, 15 years out — and your life"
                body="Concrete upside scenarios + downside risks at each year. How quantum will affect your medicine, money, encryption, energy."
              />
              <SubPageCard
                href="/learn/applications"
                eyebrow="Applications"
                title="How quantum changes the world"
                body="Ten domains by domain — drug discovery, climate, materials, cryptography, finance, sensing. Honest timelines, bull and bear."
              />
              <SubPageCard
                href="/learn/risks"
                eyebrow="Risks"
                title="The dangers &amp; tradeoffs"
                body="Ten serious risks scored on impact and likelihood. Harvest-now-decrypt-later, geopolitical asymmetry, capital bubble, more."
              />
              <SubPageCard
                href="/learn/resources"
                eyebrow="Go deeper"
                title="Best books, videos, podcasts"
                body="Forty hand-picked resources from newbie to research-physicist. Searchable, filterable, free where possible."
              />
              <SubPageCard
                href="/faq"
                eyebrow="Quick answers"
                title="Ten common questions, honestly answered"
                body="When useful? Will it break encryption? Will quantum AI take over? The non-hype answers."
              />
            </div>
          </nav>

          <hr className="border-editorial-ink/15 my-12" />

          <p className="text-[10px] uppercase tracking-[0.2em] text-accent-quantum font-mono mb-3">
            The primer · sixteen concepts
          </p>
          <h2 className="font-display text-3xl tracking-tight mb-3 mt-0">
            Now, the actual physics — for the curious investor and the physicist
          </h2>
          <p className="text-editorial-ink/75 leading-relaxed text-[17px]">
            Sixteen concepts from <em>what is a qubit</em> through <em>fault-tolerant computing</em>.
            Surface text reads in 15 minutes. Every concept has expandable toggles for the math,
            the code, and the citations.
          </p>

          {/* Section 0 — Misconceptions */}
          <section id="misconceptions">
            <h2>What you&apos;ve heard that&apos;s wrong</h2>
            <p>
              Before we start, ten things journalists, vendors, and LinkedIn posters get wrong about
              quantum computing. If you only read this section, you&apos;ll already understand the field
              better than 99% of people who claim to.
            </p>

            <Misconception
              myth="Qubits are 0 and 1 at the same time."
              reality="Closer to: a qubit is a vector pointing somewhere on a sphere; |0⟩ and |1⟩ are just two specific points on that sphere. The 'both at once' phrasing strips out interference — the actual source of quantum's power."
            />
            <Misconception
              myth="Quantum computers try every possibility in parallel."
              reality="No. They explore a superposition, but only one answer comes out at measurement. The art of quantum algorithms is engineering interference so the right answer is the one that comes out — wrong answers cancel, right answers reinforce."
            />
            <Misconception
              myth="Quantum will break all encryption tomorrow."
              reality="Symmetric crypto (AES-256) is fine — Grover only halves effective key length. RSA/ECC are vulnerable to Shor, but require millions of physical qubits. NIST already standardized post-quantum algorithms (ML-KEM, ML-DSA) in 2024. The timeline is more like 2030+, not 'tomorrow.'"
            />
            <Misconception
              myth="Quantum is faster at everything."
              reality="It's faster at a small set of structured problems: factoring (Shor), some search (Grover, quadratic), and quantum simulation (chemistry, materials). For spreadsheets, databases, web traffic, and most ML training, quantum offers no advantage."
            />
            <Misconception
              myth="Quantum supremacy means useful quantum computing has arrived."
              reality="Supremacy and advantage demonstrations (Google 2019, USTC, Google Willow 2024, Quantum Echoes 2025) solve contrived problems chosen to favor quantum. Useful commercial advantage is a separate, unmet milestone — most analysts target 2028–2032."
            />
            <Misconception
              myth="More qubits = better."
              reality="Qubit count without fidelity is meaningless. A 1,000-qubit machine at 99% gate fidelity can do less than a 100-qubit machine at 99.99%. The headline race for qubit count is one of the most misleading metrics in the field."
            />
            <Misconception
              myth="Quantum computers will replace classical computers."
              reality="They're co-processors, like GPUs. You'll call them from classical code for specific kernels (chemistry, optimization, factoring). Your laptop is not going to be quantum."
            />
            <Misconception
              myth="Entanglement enables faster-than-light communication."
              reality="The no-communication theorem forbids this. Quantum correlations don't transmit information. You need a classical channel to interpret the result."
            />
            <Misconception
              myth="D-Wave is a universal quantum computer."
              reality="D-Wave builds quantum annealers — a different (and more limited) model than gate-based QC. Useful for some optimization problems, but cannot run Shor's algorithm. Comparing D-Wave qubits to IBM qubits is comparing apples to bicycles."
            />
            <Misconception
              myth="AI plus quantum will revolutionize everything together."
              reality="Quantum machine learning has real but narrow theoretical results and almost no demonstrated practical advantage yet. Be highly skeptical of 'AI × quantum' marketing — it's almost always hype layered on hype."
            />
          </section>

          {/* Section 1 — The Qubit */}
          <section id="qubit">
            <h2>The qubit</h2>
            <p>
              A qubit is the quantum version of a bit. A classical bit is either 0 or 1. A qubit can be 0,
              or 1, or a blend of both — but &quot;both at once&quot; is misleading. It&apos;s really a wave-like
              superposition that, when measured, collapses to either 0 or 1 with probabilities determined
              by how the wave is shaped.
            </p>

            <p>
              The cleanest mental picture is geometric: every possible state of a single qubit corresponds
              to a point on the surface of a sphere — the Bloch sphere. The north pole is |0⟩, the south
              pole is |1⟩, and every other point is some superposition with a specific direction and phase.
            </p>

            <BlochSphere />

            <DepthToggle level="intermediate">
              <p>
                Formally, a single-qubit state is <code className="bg-editorial-ink/5 px-1 rounded-xs">|ψ⟩ = α|0⟩ + β|1⟩</code> with the
                normalization constraint <code className="bg-editorial-ink/5 px-1 rounded-xs">|α|² + |β|² = 1</code>. The amplitudes α and β are
                <em> complex numbers</em> — they can be negative, or even imaginary. That phase information is
                what separates quantum from classical probability. In a classical probabilistic system,
                a coin flip has real-valued probabilities that always add positively. In a quantum system,
                amplitudes can interfere destructively — they can cancel out.
              </p>
            </DepthToggle>

            <DepthToggle level="advanced">
              <p>
                The state space of a qubit is <code className="bg-editorial-ink/5 px-1 rounded-xs">ℂ²</code>. For
                <em>n</em> qubits the joint Hilbert space is the tensor product, dimension 2ⁿ — this exponential
                scaling is the resource that quantum computing tries to harness. Mixed states (statistical
                mixtures) are represented by density matrices <code className="bg-editorial-ink/5 px-1 rounded-xs">ρ = Σᵢ pᵢ|ψᵢ⟩⟨ψᵢ|</code> and
                live in the interior of the Bloch ball rather than on the surface.
              </p>
              <p>
                Physical realizations include superconducting Josephson junctions (IBM, Google, Rigetti),
                trapped atomic ions (IonQ, Quantinuum), photons (PsiQuantum, Xanadu), neutral atoms in
                optical tweezers (Atom Computing, QuEra, Pasqal), gate-defined silicon spin qubits (Diraq,
                Intel, SQC), and Majorana zero modes (Microsoft, contested). See Nielsen &amp; Chuang Ch. 1
                for the canonical treatment.
              </p>
            </DepthToggle>
          </section>

          {/* Section 2 — Superposition */}
          <section id="superposition">
            <h2>Superposition</h2>
            <p>
              Superposition is the property that a qubit can be in any linear combination of |0⟩ and |1⟩.
              The qubit isn&apos;t &quot;in both states at once&quot; in any classical mixing sense. It&apos;s in
              <em> one</em> quantum state — a state that happens to have non-zero amplitude on both |0⟩
              and |1⟩. When measured, it picks one of those two outcomes, with probability equal to the
              squared magnitude of the amplitude.
            </p>
            <p>
              The interesting part is what you can do with the state <em>before</em> measurement. Quantum
              gates can rotate and combine superpositions in ways that have no classical analog. This is
              where quantum algorithms get their power.
            </p>

            <DepthToggle level="math">
              <p>
                The Hadamard gate is the canonical superposition generator:
              </p>
              <pre className="bg-editorial-ink/5 p-3 rounded-sm overflow-x-auto text-xs font-mono">
{`H|0⟩ = (|0⟩ + |1⟩) / √2 = |+⟩
H|1⟩ = (|0⟩ − |1⟩) / √2 = |−⟩`}
              </pre>
              <p>
                Note: |+⟩ and |−⟩ are different states, even though both yield 50/50 measurement outcomes
                in the computational basis. That difference is <em>phase</em>, and it&apos;s the source of
                interference.
              </p>
            </DepthToggle>
          </section>

          {/* Section 3 — Measurement */}
          <section id="measurement">
            <h2>Measurement</h2>
            <p>
              Measuring a qubit is the moment quantum becomes classical. Before measurement, the state is a
              superposition. After measurement, you have a single bit — 0 or 1 — and the superposition is
              gone. The probability of each outcome is the squared magnitude of its amplitude. This is the
              Born rule, and it is one of the strangest and best-tested predictions in physics.
            </p>
            <p>
              Measurement is destructive. You cannot &quot;peek&quot; without collapsing the state. This is
              what makes quantum error correction so much harder than classical: you can&apos;t look at a
              qubit to see if it has errored without destroying the information you were trying to protect.
              You have to detect errors <em>indirectly</em>, through clever measurement of error <em>syndromes</em> that
              leave the encoded information undisturbed.
            </p>
          </section>

          {/* Section 4 — Bloch */}
          <section id="bloch">
            <h2>The Bloch sphere</h2>
            <p>
              The Bloch sphere is the geometric picture of a single-qubit state. North pole is |0⟩, south
              pole is |1⟩, the equator is the family of equal-superposition states, and the longitude
              around the equator encodes phase. Quantum gates correspond to rotations on this sphere —
              an X gate is a 180° rotation around the x-axis, an H gate is a 180° rotation around the
              (x+z)/√2 axis, and a Z gate is a 180° rotation around the z-axis.
            </p>
            <p>
              The Bloch picture only works for single qubits. Two-qubit states need a 4D complex space
              and don&apos;t fit on any sphere — when the qubits are entangled, neither one has a well-defined
              point on its own Bloch sphere. This is the geometric face of entanglement.
            </p>
          </section>

          {/* Section 5 — Gates */}
          <section id="gates">
            <h2>Quantum gates</h2>
            <p>
              Gates are operations that change qubit states. The rules are simple: every gate must be
              <em> reversible</em> (no information is destroyed) and <em>unitary</em> (probabilities still
              add up to 1 after the gate). A small universal set — typically {`{H, T, CNOT}`} — can
              approximate any quantum operation to arbitrary precision. The CNOT (controlled-NOT) is the
              two-qubit gate that creates entanglement.
            </p>

            <DepthToggle level="advanced">
              <p>
                The Solovay-Kitaev theorem guarantees that any unitary can be approximated by a sequence
                of {`{H, T}`} gates with polylog overhead in the precision. The hardest gate in any
                fault-tolerant scheme is the T gate, because it requires &quot;magic state distillation&quot;
                — and most of the resource overhead in a fault-tolerant quantum computer is in those
                distillation factories.
              </p>
            </DepthToggle>
          </section>

          {/* Section 6 — Circuits */}
          <section id="circuits">
            <h2>Quantum circuits</h2>
            <p>
              A quantum circuit is a sequence of gates applied to a register of qubits, drawn as horizontal
              lines (qubits) with gate boxes on them, read left to right. The <em>depth</em> of a circuit
              is the longest path from input to output — fewer gates means less time for noise to creep
              in. The <em>width</em> is the number of qubits. Useful quantum algorithms typically need
              moderate width (hundreds of qubits) and surprisingly small depth.
            </p>
            <p>
              <strong>Try building one.</strong> Click a gate in the palette, then click a slot in the
              circuit. Run shots to see the actual measurement outcomes. The faded purple bar is theory;
              the teal overlay is your measured results.
            </p>
            <CircuitBuilder />
          </section>

          {/* Section 7 — Entanglement */}
          <section id="entanglement">
            <h2>Entanglement</h2>
            <p>
              Entanglement is when two or more qubits share a joint state that can&apos;t be written as a
              product of individual qubit states. The textbook example is the Bell state{' '}
              <code className="bg-editorial-ink/5 px-1 rounded-xs">(|00⟩ + |11⟩) / √2</code> — measure one
              qubit, and the other gives the same answer, every time, no matter how far apart they are.
            </p>
            <p>
              This sounds spooky. But entanglement does <em>not</em> let you transmit information faster
              than light — the no-communication theorem says so. What it does enable is teleportation
              of quantum states (using a classical channel), superdense coding, and — most importantly
              for quantum computing — a kind of structural correlation that quantum algorithms can use
              as a resource for interference.
            </p>
            <p>
              <strong>Build a Bell state yourself.</strong> Apply H to Q1, then CNOT. Watch both Bloch
              spheres &quot;shrink&quot; — neither qubit has a defined direction on its own. Measure
              200 times and notice you only ever get 00 or 11 (never 01 or 10). That&apos;s entanglement
              made visible.
            </p>
            <EntanglementExplorer />
          </section>

          {/* Section 8 — Interference */}
          <section id="interference">
            <h2>Interference</h2>
            <p>
              This is the section everyone skips and shouldn&apos;t. Quantum amplitudes can cancel out —
              two paths to the same answer with opposite-sign amplitudes will destructively interfere
              and disappear. Two paths with same-sign amplitudes will constructively interfere and
              amplify.
            </p>
            <p>
              Every quantum algorithm is fundamentally an interference engine: the circuit is designed so
              that paths leading to the <em>wrong</em> answer cancel, and paths leading to the
              <em> right</em> answer reinforce. That&apos;s the actual mechanism. Not parallelism. Not
              &quot;many universes.&quot; Just structured interference.
            </p>
            <p>
              <strong>See it for yourself.</strong> Below, two paths each contribute an amplitude (a 2D
              vector). The detector sees their sum. Drag the slider to change one path&apos;s phase and
              watch the probability oscillate between 0% (destructive) and 100% (constructive). This
              cancellation is impossible for classical probabilities — they can&apos;t be negative.
            </p>
            <InterferenceVisualizer />
          </section>

          {/* Section 9 — No-cloning (condensed) */}
          <section id="no-cloning">
            <h2>No-cloning theorem</h2>
            <p>
              No quantum operation can produce a perfect copy of an arbitrary unknown qubit. This is a
              direct consequence of the linearity of quantum mechanics. It has profound implications:
              it&apos;s why quantum key distribution can be provably secure (an eavesdropper can&apos;t
              copy the key without disturbing it), and it&apos;s why quantum error correction is so much
              harder than classical (you can&apos;t just make redundant copies).
            </p>
          </section>

          {/* Section 10 — Algorithms */}
          <section id="algorithms">
            <h2>Algorithms</h2>
            <p>
              <strong>Deutsch-Jozsa and Bernstein-Vazirani</strong> are the first toy problems that
              cleanly showed quantum could beat classical — one query versus exponentially many. Useless
              in practice, but pedagogically perfect.
            </p>
            <p>
              <strong>Grover&apos;s algorithm</strong> gives a quadratic speedup for unstructured search:
              find a needle in N items in √N steps. Modest but universal. Cuts effective AES key length
              in half, which is why we&apos;ll move to AES-256 long-term but don&apos;t panic.
            </p>
            <p>
              <strong>Watch Grover work.</strong> Pick how many items to search and how many Grover
              iterations to run. Each iteration rotates the state vector by 2θ in a 2D subspace, pulling
              amplitude from &quot;unmarked&quot; toward &quot;marked.&quot; The purple curve is quantum;
              the gray dashed line is classical. They cross at the √N point.
            </p>
            <GroverTrace />
            <p>
              <strong>Shor&apos;s algorithm</strong> is the famous one: exponential-time factoring on a
              quantum computer. The reason &quot;quantum breaks RSA.&quot; But the requirement is sobering
              — Gidney &amp; Ekerå (2021) estimate roughly 20 million noisy qubits, or a few thousand
              <em> logical</em> qubits, to break RSA-2048. We&apos;re not close. NIST already standardized
              post-quantum replacements (ML-KEM, ML-DSA) in 2024.
            </p>
          </section>

          {/* Section 11 — Simulation */}
          <section id="simulation">
            <h2>Quantum simulation</h2>
            <p>
              The most likely first useful application of quantum computing. Feynman&apos;s original 1982
              motivation: simulating quantum systems on classical computers takes exponential resources,
              but quantum computers naturally represent quantum states. Targets include catalyst design,
              battery chemistry, high-temperature superconductors, drug binding, materials discovery.
              McKinsey expects this to be the largest source of practical quantum value through 2035.
            </p>
            <DepthToggle level="advanced">
              <p>
                The standard techniques are Trotter-Suzuki decomposition for Hamiltonian dynamics,
                qubitization for more efficient simulation, the variational quantum eigensolver (VQE)
                for ground-state energies on NISQ hardware, and quantum phase estimation (QPE) for
                fault-tolerant precise spectra. Real-world adoption hinges on logical-qubit counts
                in the hundreds and error rates below ~10⁻⁷.
              </p>
            </DepthToggle>
          </section>

          {/* Section 12 — Decoherence */}
          <section id="decoherence">
            <h2>Decoherence and noise</h2>
            <p>
              Qubits are fragile. A trapped ion will hold a state for seconds; a superconducting qubit
              for hundreds of microseconds; a photonic qubit for as long as the photon survives in fiber.
              Heat, stray electromagnetic fields, and uncontrolled coupling to the environment all
              degrade quantum information. The two big channels are <em>T1</em> (energy relaxation —
              the qubit falls from |1⟩ to |0⟩) and <em>T2</em> (dephasing — the relative phase between
              |0⟩ and |1⟩ randomizes). Current state-of-the-art gate fidelities are 99.5–99.9% for two
              qubit gates, with Quantinuum and Oxford Ionics edging toward 99.99%.
            </p>
          </section>

          {/* Section 13 — Error correction */}
          <section id="error-correction">
            <h2>Quantum error correction</h2>
            <p>
              You can&apos;t directly copy a qubit (no-cloning), so error correction has to be cleverer
              than the classical version. Quantum error correction (QEC) <em>encodes</em> one logical
              qubit across many physical qubits, then uses syndrome measurements — measurements that
              reveal information about errors without disturbing the encoded state — to detect and
              correct flips.
            </p>
            <p>
              The threshold theorem says: if physical error rates fall below ~1% (a soft threshold that
              depends on the code), arbitrarily long computations become possible with polylogarithmic
              overhead. Google&apos;s Willow chip (December 2024) was the first to demonstrate
              <em> below-threshold</em> QEC on a real device: increasing the code distance from 3 to 5 to
              7 cut the error rate roughly in half each step. That was the most important QEC milestone
              of the decade.
            </p>
          </section>

          {/* Section 14 — FTQC */}
          <section id="ftqc">
            <h2>Fault-tolerant quantum computing</h2>
            <p>
              Fault-tolerant quantum computing (FTQC) is QEC combined with fault-tolerant gate
              constructions, so that errors don&apos;t cascade through the circuit. The current frontier
              is demonstrating <em>logical</em> qubits with lower error rates than the underlying physical
              qubits. Quantinuum + Microsoft demonstrated 12 logical qubits in 2025; Helios (November
              2025) hit 48 logical qubits at 99.99% SPAM fidelity. PsiQuantum is building utility-scale
              FTQC hardware in Brisbane and Chicago.
            </p>
            <p>
              The cryptographically relevant horizon — running Shor at scale — is generally placed at
              2030–2035 by credible analysts. Quantinuum publicly targets &quot;universal fault-tolerant
              by 2030&quot;; IBM&apos;s Starling roadmap targets 200 logical qubits and 100M operations
              by 2029. Treat aggressive timelines with skepticism, but the trajectory is real.
            </p>
          </section>

          {/* Section 15 — Where we are */}
          <section id="where-now">
            <h2>Where we are in 2026</h2>
            <p>
              The field is in a <em>late-NISQ to early-utility</em> transition. Lab-scale logical-qubit
              demonstrations (10–48 logical qubits) are now routine across multiple modalities. Full
              fault tolerance with 100+ logical qubits and millions of operations is still a late-2020s
              to early-2030s horizon. Credible &quot;quantum advantage&quot; claims (Google Willow, Quantum
              Echoes, Quantinuum on materials) exist but are not yet broadly replicated and not yet
              commercially useful.
            </p>
            <p>
              The sector raised <strong>$11.1B in cumulative private capital</strong> against{' '}
              <strong>~$1.0–1.5B of annual revenue</strong>. ~70-80% of that revenue is government
              contracts and one-off hardware sales. The next 24 months will be decided by technical
              milestones (logical qubits, gate fidelities, DARPA QBI Stage C selections) and capital
              markets reception (Quantinuum&apos;s IPO is the pricing event of 2026).
            </p>
            <p>
              For a complete picture of every public and private company, see{' '}
              <Link href="/companies" className="text-accent-quantum underline">
                the company tracker
              </Link>
              . For where revenue actually comes from, see{' '}
              <Link href="/revenue" className="text-accent-quantum underline">
                the revenue landscape
              </Link>
              .
            </p>

            <hr className="my-12 border-editorial-ink/15" />

            <h3 className="font-display">Further reading</h3>
            <ul className="text-[15px] leading-relaxed">
              <li>
                <strong>Quantum Country</strong> — Andy Matuschak &amp; Michael Nielsen. The best
                spaced-repetition primer on quantum mechanics that exists.
              </li>
              <li>
                <strong>Qiskit Textbook</strong> — IBM&apos;s comprehensive code-first introduction.
              </li>
              <li>
                <strong>Scott Aaronson&apos;s blog, &quot;Shtetl-Optimized&quot;</strong> — the
                conscience of the field. If a result sounds too good, check whether Aaronson believes it.
              </li>
              <li>
                <strong>Nielsen &amp; Chuang, &quot;Mike &amp; Ike&quot;</strong> — the canonical
                graduate textbook.
              </li>
              <li>
                <strong>John Preskill, arXiv:1907.00118</strong> — &quot;Quantum Computing in the
                NISQ Era and Beyond.&quot; The clearest expert framing of where the field actually is.
              </li>
            </ul>
          </section>

          <Giscus />
        </article>
      </div>
    </div>
  );
}

function ComputeKindCard({
  title,
  subtitle,
  bullets,
  color,
  highlight = false,
}: {
  title: string;
  subtitle: string;
  bullets: string[];
  color: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-md p-5 ${color} ${highlight ? '' : 'border border-editorial-ink/10 bg-white'}`}>
      <p className="font-display text-2xl tracking-tight">{title}</p>
      <p className="text-xs uppercase tracking-wider font-mono mt-1 opacity-70">{subtitle}</p>
      <ul className="mt-3 space-y-1 text-sm text-editorial-ink/80">
        {bullets.map((b, i) => (
          <li key={i}>· {b}</li>
        ))}
      </ul>
    </div>
  );
}

function SubPageCard({
  href,
  eyebrow,
  title,
  body,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <a
      href={href}
      className="block bg-white border border-editorial-ink/10 hover:border-accent-quantum/50 hover:shadow-md transition rounded-md p-5 group"
    >
      <p className="text-[10px] uppercase tracking-wider text-accent-quantum font-mono mb-2">{eyebrow}</p>
      <h3 className="font-display text-lg tracking-tight text-editorial-ink mb-2 group-hover:text-accent-quantum">
        {title}
      </h3>
      <p className="text-sm text-editorial-ink/70 leading-relaxed">{body}</p>
      <span className="mt-3 inline-block text-xs font-mono text-accent-quantum">Open →</span>
    </a>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <p className="font-display text-lg text-editorial-ink mb-1">{q}</p>
      <p className="text-[15px] leading-relaxed text-editorial-ink/80">{a}</p>
    </div>
  );
}
