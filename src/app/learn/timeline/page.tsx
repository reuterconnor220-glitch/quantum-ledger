import Link from 'next/link';

export const metadata = {
  title: 'Quantum 5, 10, 15 Years Out · How It Affects Your Life',
  description: 'Concrete, honest predictions for what quantum computing will mean for your medicine, money, encryption, energy, and economy in 2031, 2036, and 2041 — upside and downside risks at each horizon.',
};

interface Horizon {
  year: number;
  yearsOut: number;
  title: string;
  oneLiner: string;
  technicalState: string;
  upsides: { icon: string; topic: string; description: string }[];
  downsides: { icon: string; topic: string; description: string }[];
  dailyLife: string;
  watchSignals: string[];
}

const HORIZONS: Horizon[] = [
  {
    year: 2031,
    yearsOut: 5,
    title: '5 years out · 2031',
    oneLiner:
      'Late-NISQ to early-utility transition. First documented commercial quantum advantage in chemistry. Quantum sensors widely deployed in defense. PQC migration well underway.',
    technicalState:
      '100-logical-qubit demonstrations routine. Best systems at ~1,000 physical qubits with 99.99% 2Q fidelity. First useful chemistry simulations — small molecules, catalyst optimization. RSA still safe but federal mandates accelerating. Fault tolerance demonstrated at small scale; useful FTQC still 3–5 years away.',
    upsides: [
      {
        icon: '💊',
        topic: 'Drug discovery accelerated',
        description:
          'A few major pharma companies announce drug candidates whose early-stage simulations were quantum-accelerated. AstraZeneca + IonQ, Roche + Quantinuum, BMS + IBM all have programs in clinical trials.',
      },
      {
        icon: '🔋',
        topic: 'Better batteries hit the market',
        description:
          'Quantum-discovered cathode materials begin appearing in commercial Li-ion and solid-state batteries. EV charging times drop ~20%, costs follow. Grid-storage chemistry gets meaningful boost.',
      },
      {
        icon: '🛰️',
        topic: 'GPS-denied navigation goes mainstream',
        description:
          'Quantum sensors deployed across naval and aerial defense platforms. Civilian aviation adopts quantum-inertial nav as GPS backup. Atomic-clock-based timing replaces some GPS dependencies.',
      },
      {
        icon: '💰',
        topic: 'Wall Street gets a real quantum advantage',
        description:
          'Multiple banks publish papers with documented commercial advantage on derivatives pricing and portfolio optimization (following HSBC\'s 2025 bond paper). Goldman, JPM, Morgan Stanley each have production quantum pipelines.',
      },
    ],
    downsides: [
      {
        icon: '⚠️',
        topic: 'Harvest-now-decrypt-later payoff begins',
        description:
          'If early FTQC arrives faster than expected, adversaries decrypt 2020–2024 stockpiles of encrypted intelligence. Likely smaller-scale incidents at first — embarrassing leaks rather than catastrophic ones.',
      },
      {
        icon: '📉',
        topic: 'Quantum capital bubble compresses',
        description:
          'Public pure-plays that don\'t produce real revenue lose 50–80% of valuation. Most retail-favorite quantum stocks see significant write-downs. Capital rotates toward 2–3 surviving leaders.',
      },
      {
        icon: '🤖',
        topic: 'Quantum-AI hype continues unproductively',
        description:
          'Companies attach "quantum" to AI marketing without demonstrated advantage. Consumer products bearing "quantum-enhanced AI" labels mostly aren\'t.',
      },
    ],
    dailyLife:
      'Mostly invisible. You\'ll get a few emails from your bank/government about post-quantum migration. Some of your medicines will have been accelerated through quantum-aided design pipelines. Your phone\'s encryption is already quantum-safe (Apple did this in 2024). Your cloud bills include a "quantum compute" line item if you\'re in pharma, materials, or finance.',
    watchSignals: [
      'First public earnings call where a public company attributes >$50M revenue to quantum-computing-driven product',
      'A drug candidate enters Phase 2 trials with documented quantum-aided discovery in the FDA filing',
      'First nation-state cyber incident publicly attributed to quantum decryption',
      'Stage C DARPA QBI survivors announced (Q4 2026 → Stage C completes 2028–2030)',
    ],
  },
  {
    year: 2036,
    yearsOut: 10,
    title: '10 years out · 2036',
    oneLiner:
      'First useful FTQC machines online. Cryptographic Y2K moment. New medicines and batteries from quantum-discovered chemistry are commonplace. Industries reshaping.',
    technicalState:
      'First fault-tolerant quantum computers (1,000+ physical, 100+ logical) running real algorithms in production. Multiple vendors operating utility-scale systems. RSA-2048 broken at scale by leading nations; PQC migration mandatory for any system with classified or financial data. Cryptographically relevant quantum computers concentrated in 3–5 sovereign/hyperscaler operators.',
    upsides: [
      {
        icon: '🏥',
        topic: 'Medicine transformed at the discovery stage',
        description:
          'Pharma R&D timelines compressed ~30%. Rare-disease research becomes economically viable. Personalized medicine drug-target matching uses quantum simulation as default. Multiple Nobel-grade results in computational chemistry.',
      },
      {
        icon: '🌱',
        topic: 'Climate progress accelerates',
        description:
          'Quantum-designed catalysts for carbon capture deployed at commercial scale. New fertilizer chemistry (post-Haber-Bosch nitrogen fixation) potentially demonstrated — would save 1-2% of global energy. Industrial chemistry energy efficiency up 5–10%.',
      },
      {
        icon: '⚡',
        topic: 'Energy abundance from better materials',
        description:
          'Possibly room-temperature superconductors discovered (the biggest "if" — but quantum simulation is the most likely path). Transform power grid, MRI scanners, magnetic levitation. Battery costs drop 50%+, enabling cheap grid storage and EV cost parity.',
      },
      {
        icon: '🧠',
        topic: 'AI augmented by quantum kernels',
        description:
          'Selective hybrid AI-quantum pipelines for materials/drug discovery/finance reach broad industrial use. Not "quantum AI replacing humans" — but quantum subroutines accelerating classical ML where it matters.',
      },
    ],
    downsides: [
      {
        icon: '🔓',
        topic: 'Cryptographic instability period',
        description:
          'Any organization that didn\'t migrate to PQC by 2032 faces decryption of historical data. Several major incidents likely. Financial markets briefly destabilize until trust in quantum-safe systems stabilizes (~2034–2036).',
      },
      {
        icon: '💸',
        topic: 'Capital write-offs across the sector',
        description:
          'Of the 30+ quantum companies that received venture or public funding in the 2020s, perhaps 5–8 survive as standalone entities. Roughly $10–15B in cumulative capital deployed in losers will be written off.',
      },
      {
        icon: '🏢',
        topic: 'Compute concentration intensifies',
        description:
          'Useful FTQC capacity concentrated in 3–5 companies (IBM, Google, AWS, Microsoft + 1–2 sovereigns). Academic and small-business access becomes more expensive and gated. Compute power becomes a meaningful geopolitical lever.',
      },
      {
        icon: '🌍',
        topic: 'Geopolitical realignment',
        description:
          'Nations with quantum capability vs without form a clear new tier. Export controls, sanctions, and intelligence asymmetries reshape alliances. AUKUS-style quantum sharing agreements become standard.',
      },
    ],
    dailyLife:
      'Deeper transformation begins. Your medicines work better and arrive faster. Your EV charges in 10 minutes and costs less than a gas car. Your government, bank, employer, and email provider all use PQC by default. AI assistants become noticeably better at scientific and engineering tasks. You hear "quantum" in news cycles weekly — sometimes for breakthroughs, sometimes for cyber incidents. Quantum-secured comms become a marketed feature for sensitive sectors (healthcare, legal, defense contractors).',
    watchSignals: [
      'First publicly-attributed RSA-decryption attack (single nation-state, single target — symbolic)',
      'First quantum-discovered drug approved by FDA',
      'First commercially-deployed room-temperature superconductor (if it happens)',
      'Major M&A consolidation across the quantum vendor landscape',
      'Quantum-network pilots: first multi-city quantum-secured comm fabric',
    ],
  },
  {
    year: 2041,
    yearsOut: 15,
    title: '15 years out · 2041',
    oneLiner:
      'Mature FTQC at multiple providers. Quantum networks emerging. Climate, medicine, and energy meaningfully reshaped. Quantum has become infrastructure.',
    technicalState:
      'Multiple providers operating ~10,000+ logical qubit machines. Quantum-network pilots between major data centers. Routine industrial use across chemistry, materials, finance, logistics, and certain ML domains. Several Nobel-grade physics results from quantum simulation. PQC migration considered complete; classical RSA fully sunset.',
    upsides: [
      {
        icon: '🌡️',
        topic: 'Meaningful climate progress',
        description:
          'Quantum-designed carbon-capture catalysts at industrial deployment. Possibly the first solid evidence of materials-driven climate intervention working at scale. Industrial fertilizer chemistry transformed; agriculture more efficient.',
      },
      {
        icon: '🧬',
        topic: 'Longer, healthier lives',
        description:
          'Diseases that resisted treatment for decades have viable therapies. Cancer survival rates significantly improved through quantum-designed targeted therapies. Aging research benefits from precise molecular simulation of cellular processes.',
      },
      {
        icon: '🚀',
        topic: 'Energy abundance + cheap matter',
        description:
          'Fusion-reactor wall materials, perhaps fusion itself, benefits from quantum simulation. Battery and storage costs continue dropping. New materials enable lighter aerospace, denser computing, more efficient solar.',
      },
      {
        icon: '🧮',
        topic: 'Compute power keeps reshaping economy',
        description:
          'Combined with mature AI, quantum-accelerated classical compute reshapes finance, design, engineering, science. New industries emerge around quantum sensing (medical imaging, navigation, geological survey).',
      },
      {
        icon: '🔬',
        topic: 'Fundamental physics breakthroughs',
        description:
          'Several major unsolved physics questions answered via quantum simulation: high-Tc superconductivity mechanism, certain QCD problems, exotic matter phases. Quantum gravity simulations begin in earnest.',
      },
    ],
    downsides: [
      {
        icon: '⚔️',
        topic: 'Concentrated technological power',
        description:
          'A handful of organizations effectively control the world\'s most powerful computational resources. Combined with mature AI, this raises governance questions about market power and democratic accountability comparable to early-20th-century industrial concentration debates.',
      },
      {
        icon: '🎯',
        topic: 'Powerful AI agents augmented by quantum',
        description:
          'Late-2030s AI agents using quantum subroutines for optimization and scientific discovery become extraordinarily capable. Alignment and governance questions intensify. The distinction between quantum-AI and pure AI matters less than the combined capability.',
      },
      {
        icon: '🕵️',
        topic: 'Mature quantum cyber capabilities',
        description:
          'State-level quantum decryption capabilities mature. Whoever has more, has structurally more intelligence on adversaries. Cyber-physical attacks on infrastructure (where quantum-broken encryption is the entry point) become a normal-but-rare occurrence.',
      },
      {
        icon: '👨‍💼',
        topic: 'Disruption of professional knowledge work',
        description:
          'Combined AI + quantum capabilities meaningfully reduce demand for human labor in computational chemistry, financial modeling, materials engineering, certain medical specialties. Transition pains in highly-trained workforce.',
      },
    ],
    dailyLife:
      'Quantum has become invisible infrastructure — like cloud computing, but more concentrated. You notice when something works dramatically better than it used to: medicines, batteries, materials in your house. You don\'t notice the quantum compute that runs in the background. Your encryption, your government records, your financial transactions are all post-quantum-secured. Your AI assistant is dramatically more useful for scientific and technical tasks. Your work life may have shifted significantly if you\'re in any field touching computational science. The world is more abundant in some ways (medicine, energy, materials) and more concentrated in others (computational power, intelligence capabilities).',
    watchSignals: [
      'First publicly-claimed quantum-AI agent solving previously unsolved scientific problem',
      'First multi-continent quantum-secured government communication network',
      'Climate metrics showing measurable improvement attributed to quantum-discovered carbon capture',
      'Geopolitical events shaped by quantum-cyber asymmetries',
      'New economic regulations addressing concentration of computational power',
    ],
  },
];

export const revalidate = 86400;

export default function TimelinePage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        <header className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-quantum font-mono mb-3">Time horizons</p>
          <h1 className="font-display text-5xl font-medium tracking-tight leading-tight">
            How quantum will affect your life · 5, 10, and 15 years out
          </h1>
          <p className="mt-5 text-lg text-editorial-ink/75 leading-relaxed">
            Three honest horizons. What technical state quantum will be in, what changes in the world,
            what changes in <em>your</em> life. Upside scenarios at each year, plus the downside risks
            we&apos;d be naive to ignore. Predictions calibrated to what credible analysts (McKinsey,
            BCG, IDC, Aaronson) actually publish — not what vendors promise.
          </p>
          <p className="mt-4 text-sm text-editorial-ink/60 leading-relaxed">
            See also: <Link href="/today" className="text-accent-quantum hover:underline">what&apos;s deployed right now</Link>,
            {' '}<Link href="/learn/applications" className="text-accent-quantum hover:underline">applications by domain</Link>,
            {' '}<Link href="/learn/risks" className="text-accent-quantum hover:underline">the deeper risk picture</Link>.
          </p>
        </header>

        {/* Horizon navigation */}
        <nav className="mb-12 grid grid-cols-3 gap-2 sticky top-16 z-30 bg-editorial-cream py-3 -mx-2 px-2 border-b border-editorial-ink/10">
          {HORIZONS.map((h) => (
            <a
              key={h.year}
              href={`#h${h.year}`}
              className="text-center bg-white border border-editorial-ink/10 hover:border-accent-quantum/40 rounded-md p-3 transition group"
            >
              <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono">
                +{h.yearsOut} years
              </p>
              <p className="font-display text-xl font-medium text-editorial-ink group-hover:text-accent-quantum">
                {h.year}
              </p>
            </a>
          ))}
        </nav>

        {/* Horizons */}
        {HORIZONS.map((h, hi) => (
          <article key={h.year} id={`h${h.year}`} className="mb-20 scroll-mt-40">
            <header className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent-quantum font-mono mb-2">
                {h.yearsOut} years out
              </p>
              <h2 className="font-display text-4xl font-medium tracking-tight mb-4">
                {h.year} · {h.title.split('·')[1]?.trim() ?? ''}
              </h2>
              <p className="text-xl text-editorial-ink/85 leading-relaxed border-l-2 border-accent-quantum/40 pl-5 italic">
                {h.oneLiner}
              </p>
            </header>

            {/* Technical state */}
            <div className="bg-white border border-editorial-ink/10 rounded-md p-5 mb-6">
              <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono mb-2">
                Technical state
              </p>
              <p className="text-[15px] leading-relaxed text-editorial-ink/85">{h.technicalState}</p>
            </div>

            {/* Daily life impact */}
            <div className="bg-accent-quantum/5 border-l-2 border-accent-quantum rounded-r-md p-5 mb-8">
              <p className="text-[10px] uppercase tracking-wider text-accent-quantum font-mono mb-2">
                How this affects your life
              </p>
              <p className="text-[16px] leading-relaxed text-editorial-ink/90">{h.dailyLife}</p>
            </div>

            {/* Upside / Downside columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {/* Upside */}
              <div className="bg-white border border-editorial-ink/10 rounded-md p-5 border-l-2 border-l-emerald-500/60">
                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-mono mb-4">
                  Upside scenarios
                </p>
                <ul className="space-y-4">
                  {h.upsides.map((u, i) => (
                    <li key={i}>
                      <p className="font-display text-base text-editorial-ink leading-tight mb-1">
                        <span className="mr-2">{u.icon}</span>{u.topic}
                      </p>
                      <p className="text-sm text-editorial-ink/70 leading-relaxed">{u.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Downside */}
              <div className="bg-white border border-editorial-ink/10 rounded-md p-5 border-l-2 border-l-red-500/60">
                <p className="text-[10px] uppercase tracking-[0.2em] text-red-700 font-mono mb-4">
                  Downside risks
                </p>
                <ul className="space-y-4">
                  {h.downsides.map((d, i) => (
                    <li key={i}>
                      <p className="font-display text-base text-editorial-ink leading-tight mb-1">
                        <span className="mr-2">{d.icon}</span>{d.topic}
                      </p>
                      <p className="text-sm text-editorial-ink/70 leading-relaxed">{d.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Watch signals */}
            <div className="bg-white border border-editorial-ink/10 rounded-md p-5">
              <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono mb-3">
                Signals that confirm we&apos;re on track
              </p>
              <ul className="space-y-2 text-sm">
                {h.watchSignals.map((s, i) => (
                  <li key={i} className="text-editorial-ink/75 leading-relaxed">
                    <span className="text-accent-quantum mr-2">→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {hi < HORIZONS.length - 1 && <hr className="my-12 border-editorial-ink/15" />}
          </article>
        ))}

        {/* Closing */}
        <section className="prose-editorial">
          <h2>The honest synthesis</h2>
          <p>
            Five-year predictions in any technology are notoriously unreliable. Fifteen-year predictions
            are almost guaranteed wrong in detail and useful in shape. Use these horizons as <em>scenario
            planning</em>, not forecasts. The shape of the change — quantum becoming infrastructure,
            chemistry and materials being the first major beneficiaries, cryptography being the urgent
            risk, computational concentration being the biggest second-order concern — is more reliable
            than any individual date.
          </p>
          <p>
            The single most useful question to ask: <strong>what would I do if I knew this was coming?</strong>
          </p>
          <ul>
            <li><strong>If you handle long-lived secrets</strong> — start your PQC migration today (most are years late already).</li>
            <li><strong>If you run a pharma, chemicals, or materials company</strong> — establish a quantum partnership now; the leaders will be a 5-year head start ahead.</li>
            <li><strong>If you invest</strong> — assume 80%+ of current quantum public-market valuations are not justified by 2030 fundamentals, but that 2–3 winners will be enormous.</li>
            <li><strong>If you\&apos;re a student</strong> — quantum information science is one of the most leveraged fields you could enter for the next 30 years.</li>
            <li><strong>If you\&apos;re a policymaker</strong> — PQC migration mandates, export controls, and concentration regulation are the three near-term levers that matter.</li>
            <li><strong>For everyone else</strong> — you\&apos;ll mostly notice quantum through second-order effects: better medicine, cheaper batteries, more capable AI. The technology will be invisible infrastructure by 2036.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
