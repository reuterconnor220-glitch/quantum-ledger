'use client';

import { useState, useMemo } from 'react';

type ResourceType = 'book' | 'interactive' | 'video' | 'podcast' | 'blog' | 'course' | 'newsletter';
type Audience = 'newbie' | 'intermediate' | 'advanced';
type Cost = 'free' | 'paid';

interface Resource {
  id: string;
  title: string;
  author: string;
  type: ResourceType;
  audience: Audience;
  cost: Cost;
  url: string;
  description: string;
  whyItsGreat: string;
  pickOfTheList?: boolean;
}

const RESOURCES: Resource[] = [
  // INTERACTIVE / ONLINE
  {
    id: 'quantum-country',
    title: 'Quantum Country',
    author: 'Andy Matuschak & Michael Nielsen',
    type: 'interactive',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://quantum.country',
    description: 'A free, interactive online book that teaches you quantum computing using embedded spaced-repetition flashcards — the questions resurface days and weeks later to lock the concepts in.',
    whyItsGreat: 'The single best learning experience in the field. The spaced-repetition pedagogy means you actually remember what you read. Nielsen co-wrote the canonical Nielsen & Chuang textbook; Matuschak invented the learning model.',
    pickOfTheList: true,
  },
  {
    id: 'qiskit-textbook',
    title: 'Qiskit Textbook',
    author: 'IBM',
    type: 'interactive',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://qiskit.org/learn',
    description: 'IBM\'s free, comprehensive, code-first textbook. Every chapter has runnable Jupyter notebooks against real IBM Quantum hardware.',
    whyItsGreat: 'You can run Shor\'s algorithm on a real quantum computer for free, within the textbook. No setup. Covers basics through QEC.',
  },
  {
    id: 'quirk',
    title: 'Quirk Circuit Simulator',
    author: 'Craig Gidney',
    type: 'interactive',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://algassert.com/quirk',
    description: 'Drag-and-drop quantum circuit builder — see qubit states, probabilities, and entanglement update in real time as you compose circuits.',
    whyItsGreat: 'The best playground for building intuition. Up to ~10 qubits. Lets you see why H + CNOT creates entanglement and why interference matters.',
    pickOfTheList: true,
  },
  {
    id: 'microsoft-katas',
    title: 'Microsoft Quantum Katas',
    author: 'Microsoft',
    type: 'interactive',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://github.com/microsoft/QuantumKatas',
    description: 'Free hands-on coding exercises in Q# with automated tests. Progressively harder problems from "what is a qubit" through Grover, Shor, and QEC.',
    whyItsGreat: 'Test-driven learning. The exercises fail until you implement them correctly. Programming-mindset learners love it.',
  },
  {
    id: 'pennylane',
    title: 'PennyLane Demos',
    author: 'Xanadu',
    type: 'interactive',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://pennylane.ai/qml',
    description: 'Hundreds of runnable demos covering quantum machine learning, chemistry, optimization, and quantum hardware integration.',
    whyItsGreat: 'Modern, well-maintained. Hardware-agnostic Python library. Strong ML focus.',
  },

  // BOOKS — NEWBIE
  {
    id: 'q-is-for-quantum',
    title: 'Q is for Quantum',
    author: 'Terry Rudolph',
    type: 'book',
    audience: 'newbie',
    cost: 'paid',
    url: 'https://www.amazon.com/Q-Quantum-Terry-Rudolph/dp/0999063502',
    description: 'A genuinely accessible intro using a "PETE box" toy model — no math beyond addition. Rudolph is a PsiQuantum co-founder and grandson of Erwin Schrödinger.',
    whyItsGreat: 'The easiest on-ramp to quantum computing. Twelve-year-olds can follow it. Builds genuine intuition without dumbing anything down.',
    pickOfTheList: true,
  },
  {
    id: 'qc-for-everyone',
    title: 'Quantum Computing for Everyone',
    author: 'Chris Bernhardt',
    type: 'book',
    audience: 'newbie',
    cost: 'paid',
    url: 'https://mitpress.mit.edu/9780262539531/quantum-computing-for-everyone/',
    description: 'Mathematically rigorous but kept to high-school-algebra level. Builds qubits, gates, entanglement, and algorithms from first principles.',
    whyItsGreat: 'The sweet spot for self-taught learners who want real math without graduate prerequisites. Bernhardt is a working mathematician — clean exposition.',
  },
  {
    id: 'quantum-supremacy',
    title: 'Quantum Supremacy',
    author: 'Michio Kaku',
    type: 'book',
    audience: 'newbie',
    cost: 'paid',
    url: 'https://www.amazon.com/Quantum-Supremacy-Computing-Revolution-Everything/dp/0385548362',
    description: 'Popular science overview from a physics communicator. Light on technical depth, strong on the "what could happen" framing.',
    whyItsGreat: 'A good airport-bookstore read for someone curious about why quantum matters. Skip if you want actual technical content.',
  },

  // BOOKS — INTERMEDIATE
  {
    id: 'qc-applied',
    title: 'Quantum Computing: An Applied Approach',
    author: 'Jack D. Hidary',
    type: 'book',
    audience: 'intermediate',
    cost: 'paid',
    url: 'https://link.springer.com/book/10.1007/978-3-030-83274-2',
    description: 'Practical, code-heavy textbook by a SandboxAQ executive. Covers quantum computing, ML applications, and chemistry implementations.',
    whyItsGreat: 'The most up-to-date applied textbook. Strong on near-term commercial use cases.',
  },
  {
    id: 'programming-quantum',
    title: 'Programming Quantum Computers',
    author: 'Johnston, Harrigan & Gimeno-Segovia',
    type: 'book',
    audience: 'intermediate',
    cost: 'paid',
    url: 'https://www.oreilly.com/library/view/programming-quantum-computers/9781492039679/',
    description: 'O\'Reilly book taking a programmer\'s approach to quantum — circuits, primitives, and algorithms with hands-on code.',
    whyItsGreat: 'Bridges classical programming intuition to quantum primitives. Good for engineers transitioning into the field.',
  },
  {
    id: 'qc-since-democritus',
    title: 'Quantum Computing Since Democritus',
    author: 'Scott Aaronson',
    type: 'book',
    audience: 'intermediate',
    cost: 'paid',
    url: 'https://www.amazon.com/Quantum-Computing-since-Democritus-Aaronson/dp/0521199565',
    description: 'A lecture-series-turned-book covering complexity theory, quantum mechanics, computability, and the philosophical implications. Famously witty.',
    whyItsGreat: 'No one else writes about quantum like Aaronson — rigorous, opinionated, and laugh-out-loud funny. The intellectual home of skeptical quantum computing.',
    pickOfTheList: true,
  },
  {
    id: 'dancing-with-qubits',
    title: 'Dancing with Qubits',
    author: 'Robert S. Sutor',
    type: 'book',
    audience: 'intermediate',
    cost: 'paid',
    url: 'https://www.packtpub.com/product/dancing-with-qubits/9781838827366',
    description: 'Comprehensive intro by a former IBM Quantum VP. Strong on linear algebra foundations.',
    whyItsGreat: 'Self-contained — assumes only algebra and builds up to advanced topics. Good companion to Qiskit textbook.',
  },

  // BOOKS — ADVANCED
  {
    id: 'mike-and-ike',
    title: 'Quantum Computation and Quantum Information ("Mike & Ike")',
    author: 'Michael Nielsen & Isaac Chuang',
    type: 'book',
    audience: 'advanced',
    cost: 'paid',
    url: 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE',
    description: 'The canonical graduate-level textbook for quantum information science. The definitive reference.',
    whyItsGreat: 'If you\'re serious about quantum computing as a discipline, you eventually own this book. Every working researcher has read it.',
    pickOfTheList: true,
  },
  {
    id: 'wilde-qit',
    title: 'Quantum Information Theory',
    author: 'Mark Wilde',
    type: 'book',
    audience: 'advanced',
    cost: 'paid',
    url: 'https://www.cambridge.org/core/books/quantum-information-theory/3E9F11A9F8E29D7F0F75A0F0E33B6C57',
    description: 'Rigorous treatment of quantum Shannon theory — channel capacities, error correction, quantum cryptography.',
    whyItsGreat: 'The reference for information-theoretic foundations. Beautifully written.',
  },

  // VIDEOS
  {
    id: '3b1b',
    title: '3Blue1Brown · Quantum Computing series',
    author: 'Grant Sanderson',
    type: 'video',
    audience: 'newbie',
    cost: 'free',
    url: 'https://www.youtube.com/@3blue1brown',
    description: 'Visual mathematical intuition for quantum mechanics and quantum computing. The "manim" animations are field-defining.',
    whyItsGreat: 'Sanderson is the best visual math educator on YouTube. His quantum content explains complex amplitudes and interference geometrically — the way they actually work in your head once you understand them.',
    pickOfTheList: true,
  },
  {
    id: 'veritasium-quantum',
    title: 'Veritasium · Future Computers Will Be Radically Different',
    author: 'Derek Muller',
    type: 'video',
    audience: 'newbie',
    cost: 'free',
    url: 'https://www.youtube.com/watch?v=jHoEjvuPoB8',
    description: 'A 22-minute tour of quantum computing — what qubits are, why they\'re hard, what they could do. Plus Veritasium\'s 2024 Willow video.',
    whyItsGreat: 'Best visual production values in popular quantum content. Tens of millions of views. The video that hooked many people into the field.',
  },
  {
    id: 'looking-glass',
    title: 'Looking Glass Universe',
    author: 'Mithuna Yoganathan',
    type: 'video',
    audience: 'newbie',
    cost: 'free',
    url: 'https://www.youtube.com/@LookingGlassUniverse',
    description: 'Cambridge quantum physicist explaining quantum mechanics and computing with careful, accessible animations. Strong on conceptual foundations.',
    whyItsGreat: 'Mithuna takes the time to actually explain *why*, not just *what*. Best for learners who get frustrated by hand-waving.',
  },
  {
    id: 'morello-unsw',
    title: 'Andrea Morello · UNSW Quantum Engineering Lectures',
    author: 'UNSW Sydney',
    type: 'video',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://www.youtube.com/playlist?list=PL_K5dvU0CmZpoxOO45VPYP7Y09Ksvew4o',
    description: 'University-quality lecture series on quantum computing engineering. Spans qubits, gates, decoherence, error correction, and hardware.',
    whyItsGreat: 'Real undergraduate-level rigor with engineering focus. Morello leads the silicon spin-qubit group at UNSW (key Diraq/SQC roots).',
  },
  {
    id: 'pbs-spacetime',
    title: 'PBS Space Time · Quantum episodes',
    author: 'Matt O\'Dowd',
    type: 'video',
    audience: 'newbie',
    cost: 'free',
    url: 'https://www.youtube.com/@pbsspacetime',
    description: 'Astrophysics-flavored explainers covering quantum mechanics, computing, and information theory.',
    whyItsGreat: 'Connects quantum computing to fundamental physics — quantum gravity, holographic principle, black hole information.',
  },
  {
    id: 'ibm-quantum-yt',
    title: 'IBM Quantum YouTube',
    author: 'IBM',
    type: 'video',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://www.youtube.com/@qiskit',
    description: 'Official channel with technical talks, tutorials, IBM Quantum Summit recordings, and research deep-dives.',
    whyItsGreat: 'First-party source for IBM\'s roadmap updates and technical announcements. Quality of guests is high.',
  },
  {
    id: 'sabine',
    title: 'Sabine Hossenfelder · Science without the gobbledygook',
    author: 'Sabine Hossenfelder',
    type: 'video',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://www.youtube.com/@SabineHossenfelder',
    description: 'Theoretical physicist with a famously critical eye. Frequent quantum computing reality checks.',
    whyItsGreat: 'Antidote to hype. When she calls a quantum result overblown, listen. When she gets excited, double-listen.',
  },

  // PODCASTS
  {
    id: 'mindscape',
    title: 'Sean Carroll\'s Mindscape',
    author: 'Sean Carroll',
    type: 'podcast',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://www.preposterousuniverse.com/podcast/',
    description: 'Caltech physicist hosting deep-dive interviews. Many quantum episodes including Scott Aaronson, John Preskill, Michelle Simmons, Robert Schoelkopf.',
    whyItsGreat: 'Carroll asks the right questions and lets guests breathe. Best long-form interviews in physics.',
    pickOfTheList: true,
  },
  {
    id: 'lex-quantum',
    title: 'Lex Fridman Podcast · Quantum episodes',
    author: 'Lex Fridman',
    type: 'podcast',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://lexfridman.com/podcast/',
    description: 'Multi-hour interviews with Scott Aaronson, Stephen Wolfram, John Preskill, and other quantum-adjacent thinkers.',
    whyItsGreat: 'Lex\'s long format gives quantum experts time to actually explain. Aaronson appearances are particularly good.',
  },
  {
    id: 'quantum-insider-pod',
    title: 'The Quantum Insider Podcast',
    author: 'The Quantum Insider',
    type: 'podcast',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://thequantuminsider.com/podcasts/',
    description: 'Industry-focused interviews with quantum company CEOs, investors, and researchers. Weekly cadence.',
    whyItsGreat: 'Best industry-side coverage. Less rigorous than physics podcasts but useful for the commercial landscape.',
  },
  {
    id: 'entangled-things',
    title: 'Entangled Things',
    author: 'Joe Murphy & Patrick Hayden',
    type: 'podcast',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://www.entangledthings.com/',
    description: 'Quantum computing podcast covering technology, business, and policy. Strong on enterprise applications.',
    whyItsGreat: 'Practitioner perspective — both hosts work in the industry. Good for business-side learners.',
  },
  {
    id: 'curious-cases',
    title: 'BBC Curious Cases · Quantum episodes',
    author: 'Hannah Fry & Adam Rutherford',
    type: 'podcast',
    audience: 'newbie',
    cost: 'free',
    url: 'https://www.bbc.co.uk/programmes/b07dmsk6',
    description: 'BBC science podcast with occasional quantum episodes. Accessible, well-produced.',
    whyItsGreat: 'Fry is one of the best science communicators alive. Episodes are short, well-edited, no jargon.',
  },

  // BLOGS
  {
    id: 'aaronson',
    title: 'Shtetl-Optimized',
    author: 'Scott Aaronson',
    type: 'blog',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://scottaaronson.blog',
    description: 'The conscience of quantum computing. Rigorous, opinionated, hype-skeptical. The blog every quantum researcher reads.',
    whyItsGreat: 'When Aaronson takes a position on a quantum claim, the field listens. The intellectual home of skeptical quantum computing.',
    pickOfTheList: true,
  },
  {
    id: 'quanta',
    title: 'Quanta Magazine',
    author: 'Simons Foundation',
    type: 'blog',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://www.quantamagazine.org/tag/quantum-computing/',
    description: 'The best science journalism on the planet. Pulitzer-winning physics explainers, including regular quantum computing coverage.',
    whyItsGreat: 'Free, beautifully edited, deeply researched. Treats quantum computing as physics first and product second.',
  },
  {
    id: 'ibm-blog',
    title: 'IBM Quantum Blog',
    author: 'IBM',
    type: 'blog',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://www.ibm.com/quantum/blog',
    description: 'Roadmap updates, research-paper companions, and technical posts from IBM\'s quantum research division.',
    whyItsGreat: 'First-party source for IBM\'s direction. Read alongside Aaronson for balance.',
  },
  {
    id: 'google-quantum',
    title: 'Google Quantum AI Blog',
    author: 'Google',
    type: 'blog',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://research.google/teams/applied-science/quantum/',
    description: 'Research blog from Google Quantum AI — Willow, Quantum Echoes, and the latest QEC results.',
    whyItsGreat: 'Where the most consequential QEC results have appeared first.',
  },
  {
    id: 'preskill',
    title: 'John Preskill\'s Caltech site',
    author: 'John Preskill',
    type: 'blog',
    audience: 'advanced',
    cost: 'free',
    url: 'http://theory.caltech.edu/~preskill/',
    description: 'The lecture notes and writings of Caltech\'s John Preskill — the man who coined "quantum supremacy" and "NISQ."',
    whyItsGreat: 'Preskill\'s arXiv:1907.00118 ("Quantum Computing in the NISQ Era") is the single clearest expert framing of where the field is.',
  },
  {
    id: 'quantum-insider-blog',
    title: 'The Quantum Insider',
    author: 'TQI',
    type: 'blog',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://thequantuminsider.com',
    description: 'The most prolific daily desk in the industry. Company news, funding rounds, technical milestones.',
    whyItsGreat: 'Comprehensive industry coverage. Signal-to-noise is variable but the volume is unmatched.',
  },

  // COURSES
  {
    id: 'qiskit-summer',
    title: 'Qiskit Global Summer School',
    author: 'IBM',
    type: 'course',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://learning.quantum.ibm.com/',
    description: 'Annual free two-week intensive on quantum computing — recorded lectures with hands-on labs.',
    whyItsGreat: 'Free, taught by working IBM researchers, runs hands-on quantum experiments on real hardware. Best free credentialing path.',
    pickOfTheList: true,
  },
  {
    id: 'mit-371',
    title: 'MIT 8.371 — Quantum Information Science',
    author: 'MIT OCW',
    type: 'course',
    audience: 'advanced',
    cost: 'free',
    url: 'https://ocw.mit.edu/courses/8-371x-quantum-information-science-iii-spring-2018/',
    description: 'Full graduate course materials including lecture notes, problem sets, and recorded lectures.',
    whyItsGreat: 'Genuine graduate-level rigor for free. The math is unforgiving but the content is canonical.',
  },
  {
    id: 'delft-qc',
    title: 'edX · The Building Blocks of a Quantum Computer (Delft)',
    author: 'TU Delft',
    type: 'course',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://www.edx.org/learn/quantum-computing',
    description: 'Hardware-focused course series from TU Delft (one of Europe\'s top quantum-engineering programs).',
    whyItsGreat: 'Strongest free hardware-engineering material online. Covers superconducting, spin, and topological systems.',
  },
  {
    id: 'brilliant',
    title: 'Brilliant.org · Quantum Computing',
    author: 'Brilliant.org',
    type: 'course',
    audience: 'newbie',
    cost: 'paid',
    url: 'https://brilliant.org/courses/quantum-computing/',
    description: 'Interactive lessons with built-in problem-solving. Bite-size and visual.',
    whyItsGreat: 'Lower bar than university courses; gamified; mobile-friendly. Good warmup before Qiskit Summer School.',
  },

  // NEWSLETTERS
  {
    id: 'tqi-newsletter',
    title: 'The Quantum Insider Daily',
    author: 'TQI',
    type: 'newsletter',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://thequantuminsider.com/newsletter/',
    description: 'Daily email digest of quantum industry news.',
    whyItsGreat: 'High volume, broad coverage. Read this for industry, read Quantum Ledger for analysis.',
  },
  {
    id: 'qcr-newsletter',
    title: 'Quantum Computing Report (Doug Finke)',
    author: 'Quantum Computing Report',
    type: 'newsletter',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://quantumcomputingreport.com/',
    description: 'Weekly digest from Doug Finke — one of the longest-running independent voices in the industry (since 2015).',
    whyItsGreat: 'Strong technical scorecards; institutional memory.',
  },
  {
    id: 'qwd-substack',
    title: 'Quantum World Detangled',
    author: 'Global Quantum Intelligence',
    type: 'newsletter',
    audience: 'intermediate',
    cost: 'free',
    url: 'https://quantumcomputing.substack.com/',
    description: 'GQI\'s flagship Substack. Analyst-style commentary on technical and market developments.',
    whyItsGreat: 'The closest thing to a respected quantum-sector analyst voice. 15K+ subscribers.',
  },
];

const TYPE_LABEL: Record<ResourceType, string> = {
  book: 'Book',
  interactive: 'Interactive',
  video: 'Video',
  podcast: 'Podcast',
  blog: 'Blog',
  course: 'Course',
  newsletter: 'Newsletter',
};

const TYPE_COLOR: Record<ResourceType, string> = {
  book: 'bg-amber-500/15 text-amber-700',
  interactive: 'bg-violet-500/15 text-violet-700',
  video: 'bg-red-500/15 text-red-700',
  podcast: 'bg-emerald-500/15 text-emerald-700',
  blog: 'bg-blue-500/15 text-blue-700',
  course: 'bg-indigo-500/15 text-indigo-700',
  newsletter: 'bg-pink-500/15 text-pink-700',
};

export function ResourcesGrid() {
  const [type, setType] = useState<'all' | ResourceType>('all');
  const [audience, setAudience] = useState<'all' | Audience>('all');
  const [cost, setCost] = useState<'all' | Cost>('all');
  const [search, setSearch] = useState('');
  const [picksOnly, setPicksOnly] = useState(false);

  const filtered = useMemo(() => {
    return RESOURCES.filter((r) => {
      if (type !== 'all' && r.type !== type) return false;
      if (audience !== 'all' && r.audience !== audience) return false;
      if (cost !== 'all' && r.cost !== cost) return false;
      if (picksOnly && !r.pickOfTheList) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.author.toLowerCase().includes(q) &&
          !r.description.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [type, audience, cost, search, picksOnly]);

  const typeCount = (t: ResourceType) => RESOURCES.filter((r) => r.type === t).length;

  return (
    <div className="not-prose">
      {/* Filters */}
      <div className="mb-8 bg-white border border-editorial-ink/10 rounded-md p-4 sticky top-16 z-30 shadow-sm">
        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, author, or topic…"
            className="w-full bg-editorial-cream border border-editorial-ink/15 rounded-sm px-3 py-2 text-sm text-editorial-ink placeholder-editorial-ink/40 focus:outline-none focus:border-accent-quantum"
          />
        </div>

        {/* Picks toggle + counts */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <button
            onClick={() => setPicksOnly((v) => !v)}
            className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-sm transition ${
              picksOnly
                ? 'bg-accent-quantum text-white'
                : 'bg-editorial-ink/5 text-editorial-ink/70 hover:bg-editorial-ink/10'
            }`}
          >
            ★ Picks only
          </button>
          <div className="text-xs font-mono text-editorial-ink/60">
            Showing {filtered.length} of {RESOURCES.length}
          </div>
        </div>

        {/* Type filter */}
        <div className="mb-2">
          <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono mb-1.5">Type</p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={type === 'all'} onClick={() => setType('all')} label={`All · ${RESOURCES.length}`} />
            {(Object.keys(TYPE_LABEL) as ResourceType[]).map((t) => (
              <Chip key={t} active={type === t} onClick={() => setType(t)} label={`${TYPE_LABEL[t]} · ${typeCount(t)}`} />
            ))}
          </div>
        </div>

        {/* Audience filter */}
        <div className="mb-2">
          <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono mb-1.5">Audience</p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={audience === 'all'} onClick={() => setAudience('all')} label="All" />
            <Chip active={audience === 'newbie'} onClick={() => setAudience('newbie')} label="Newbie" />
            <Chip active={audience === 'intermediate'} onClick={() => setAudience('intermediate')} label="Intermediate" />
            <Chip active={audience === 'advanced'} onClick={() => setAudience('advanced')} label="Advanced" />
          </div>
        </div>

        {/* Cost filter */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono mb-1.5">Cost</p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={cost === 'all'} onClick={() => setCost('all')} label="All" />
            <Chip active={cost === 'free'} onClick={() => setCost('free')} label="Free" />
            <Chip active={cost === 'paid'} onClick={() => setCost('paid')} label="Paid" />
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-editorial-ink/50">
          <p>No resources match your filters.</p>
          <button
            onClick={() => {
              setType('all');
              setAudience('all');
              setCost('all');
              setSearch('');
              setPicksOnly(false);
            }}
            className="mt-3 text-sm text-accent-quantum hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="block bg-white border border-editorial-ink/10 hover:border-accent-quantum/40 hover:shadow-md transition rounded-md p-5 group"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex gap-1.5 flex-wrap">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-xs ${TYPE_COLOR[r.type]}`}>
                    {TYPE_LABEL[r.type]}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-editorial-ink/5 text-editorial-ink/60">
                    {r.audience}
                  </span>
                  {r.cost === 'free' && (
                    <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-emerald-500/15 text-emerald-700">
                      Free
                    </span>
                  )}
                </div>
                {r.pickOfTheList && (
                  <span className="text-accent-quantum text-sm" title="Pick of the list">★</span>
                )}
              </div>
              <h3 className="font-display text-lg leading-tight text-editorial-ink mb-1 group-hover:text-accent-quantum">
                {r.title}
              </h3>
              <p className="text-xs text-editorial-ink/60 font-mono mb-2">{r.author}</p>
              <p className="text-sm text-editorial-ink/75 leading-relaxed mb-2">{r.description}</p>
              <p className="text-xs text-editorial-ink/60 leading-relaxed italic border-t border-editorial-ink/5 pt-2 mt-2">
                <span className="not-italic font-mono text-[10px] uppercase tracking-wider text-accent-quantum mr-1">
                  Why:
                </span>
                {r.whyItsGreat}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-sm font-mono transition ${
        active
          ? 'bg-editorial-ink text-editorial-cream'
          : 'bg-editorial-ink/5 text-editorial-ink/70 hover:bg-editorial-ink/10'
      }`}
    >
      {label}
    </button>
  );
}
