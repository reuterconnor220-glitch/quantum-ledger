import Link from 'next/link';

export const metadata = {
  title: 'How to Think About Quantum Computing as an Investor · Quantum Ledger',
  description:
    "A framework for evaluating quantum companies — separating physics from financials, distinguishing utility from supremacy, and understanding what DARPA QBI actually tells you. By Connor Reuter, Quantum Ledger.",
  openGraph: {
    title: 'How to Think About Quantum Computing as an Investor',
    description: 'A framework for evaluating quantum companies that survives the hype.',
  },
};

export default function EssayPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-quantum font-mono mb-3">
            Essay · 14 min read · 2026-05-13
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight leading-tight">
            How to think about quantum computing as an investor.
          </h1>
          <p className="mt-6 text-xl text-editorial-ink/75 leading-relaxed max-w-[60ch]">
            A framework for separating physics from financials, distinguishing utility from
            supremacy, and using DARPA&apos;s scoring to discount the marketing budgets of the rest.
            The piece I wish existed when I started looking at this sector.
          </p>
          <p className="mt-6 text-sm text-editorial-ink/60 font-mono">By Connor Reuter</p>
        </header>

        <article className="prose-editorial">
          <h2>The problem with reading about quantum</h2>
          <p>
            If you ask a venture capitalist what quantum computing is in 2026, you get one of two
            answers. The first is breathless: a generational technology that will break encryption,
            cure cancer, and produce trillion-dollar companies inside a decade. The second is
            dismissive: a science project that has been a decade away from useful for twenty years
            and will probably stay that way. Both are wrong in approximately the same ways, and
            the gap between them is where money actually gets made or lost.
          </p>
          <p>
            The problem is that the two camps are reading different inputs. The bulls are reading
            press releases and stock charts. The bears are reading academic critiques of specific
            advantage claims. Neither is reading the thing that matters most:{' '}
            <strong>the small set of variables that actually determine which of these companies
              becomes a real business</strong>. That set is short, it is mostly knowable, and it is
            mostly ignored.
          </p>
          <p>
            This essay is the framework I use to evaluate every quantum company. It has four
            layers. Skim it once and you have a vocabulary that survives the next press cycle.
            Read it twice and you can tell a real quantum business from a marketing budget with a
            cryostat in the lobby.
          </p>

          <h2>Layer one: separate the four products in a single field</h2>
          <p>
            &quot;Quantum&quot; in 2026 is four different commercial categories with four different
            time horizons. Conflating them is the single biggest analytical mistake in the public
            discourse.
          </p>

          <h3>1. Quantum-safe cryptography (PQC). Already revenue.</h3>
          <p>
            NIST standardized ML-KEM, ML-DSA, and SLH-DSA in August 2024. Apple, Cloudflare, Google,
            Mozilla, and AWS have already migrated meaningful portions of their TLS handshakes to
            hybrid post-quantum schemes. As of late 2025, roughly 52% of inbound TLS traffic to
            Cloudflare uses a post-quantum hybrid handshake — the largest deployment of new
            cryptography to consumers in two decades. McKinsey&apos;s mid case puts cumulative PQC
            services spend at $40-50B through 2035.
          </p>
          <p>
            None of this requires a working quantum computer. The driver is{' '}
            <em>harvest-now-decrypt-later</em> — adversaries are presumed to be capturing encrypted
            traffic today and betting on future quantum computers to decrypt it. Any data with a
            secrecy lifetime longer than the time to a cryptographically-relevant quantum computer
            is exposed. PQC is the only quantum category where the customer doesn&apos;t need to
            believe in quantum computers to buy. <Link href="/pqc-migration">The migration tracker</Link>{' '}
            shows what is shipped, what is committed, and — the more interesting list — who is silent.
          </p>

          <h3>2. Quantum sensing and PNT. Near revenue.</h3>
          <p>
            Atomic clocks, optically-pumped magnetometers, quantum gravimeters, and atom-interferometer
            inertial sensors are commercial products today. Royal Navy submarines use a Q-CTRL
            quantum clock. Cerca Magnetics ships optically-pumped magnetometers for MEG brain
            imaging. Quantum gravimeter prototypes are deployed in oil &amp; gas surveys and UK
            civil engineering. The combined market is probably $1-2B annually today, with defense
            (AUKUS Pillar 2) and healthcare (MEG) as the two scaling verticals. The technology
            risk is much lower than quantum computing because each product is a single-purpose
            device, not a general-purpose computer.
          </p>

          <h3>3. Quantum networking and QKD. Niche revenue, growing.</h3>
          <p>
            Quantum key distribution is operational on China&apos;s national backbone, in EuroQCI
            pilot links, between Swiss banks, and across Korean telco networks. The market is
            small ($1-2B annually) but it is one of the few categories where actual quantum
            hardware (single-photon sources, detectors, polarization analyzers) generates real
            recurring revenue. The NSA explicitly prefers PQC over QKD for U.S. national-security
            systems, citing engineering challenges (dedicated fiber, distance limits, authenticated
            classical channel requirements). For non-NSS contexts and defense-in-depth postures,
            QKD remains viable. The long-term direction is device-independent QKD certified by
            Bell-inequality violation — the same physics our <Link href="/learn/bell-test">Bell
              test demo</Link> illustrates.
          </p>

          <h3>4. Quantum computing (the gate model). Pre-revenue at scale.</h3>
          <p>
            This is the category every quantum stock and venture round is about. The category
            where Quantinuum just filed its S-1 at $20B against $30.9M of trailing revenue. The
            category where IBM, Google, Microsoft, and PsiQuantum are competing for FTQC
            leadership. And — being honest — the category where 95% of the marketing budget is
            spent.
          </p>
          <p>
            The point of separating these four products is that each requires a different
            valuation lens. PQC vendors trade on services revenue and customer migration
            timelines. Sensing companies trade on hardware unit economics and defense procurement
            cycles. QKD vendors trade on government infrastructure spend. Gate-model quantum
            computing trades on a 2029-2033 fault-tolerance milestone discount rate. A portfolio
            that doesn&apos;t separate them is mispricing every name in the basket.
          </p>

          <h2>Layer two: read the only benchmark that matters</h2>
          <p>
            Inside the gate-model category, every company will tell you about its qubit count, its
            gate fidelity, its quantum volume, its algorithmic qubits, its connectivity, its
            roadmap. Most of this is real, most of it is hype, and exactly one number summarizes
            the real signal:{' '}
            <strong>has any independent technical body looked at the architecture and said yes?</strong>
          </p>
          <p>
            DARPA&apos;s Quantum Benchmarking Initiative is the single most useful filter the
            public has on this category. The program runs an IV&amp;V team described by its
            founder as &quot;almost certainly the world&apos;s best quantum computing test and
            evaluation team.&quot; That team has now scored ~20 companies, advanced 11 to Stage B,
            and selected two — Microsoft and PsiQuantum — for the deeper US2QC final phase. They
            have no equity exposure and no commercial conflict. Their answer is the closest thing
            to truth available outside an NDA.
          </p>
          <p>
            Stage A advancement is a $1M technical exam. Stage B advancement is $15M and a
            12-month engineering audit. US2QC final phase is the architectural blessing. Each step
            up is a real signal. <strong>Each step down is a real signal too</strong> — Rigetti
            participated in Stage A and did not advance to Stage B. The market still trades
            Rigetti at ~890× sales. The gap between those two facts is the kind of inefficiency
            this sector produces, and the kind of inefficiency you can underwrite against.
          </p>
          <p>
            <Link href="/darpa-qbi">The DARPA QBI tracker</Link> reads the program continuously. The
            short version: if a company is not in QBI Stage B or US2QC final, treat their
            roadmap as marketing until proven otherwise. If they are, the roadmap is at least
            credible enough that a non-conflicted government technical team thinks it can work.
          </p>

          <h2>Layer three: the four-dimensional read</h2>
          <p>
            Once you have separated the four products and indexed against DARPA validation, the
            remaining work is portfolio construction. The framework I publish in{' '}
            <Link href="/ledger-score">the Ledger Score</Link> scores every meaningful company on
            four dimensions, each 0–100.
          </p>
          <p>
            <strong>Technology (30% weight).</strong> Best published 2-qubit gate fidelity, number
            of logical qubits demonstrated, and architecture credibility. Quantinuum currently
            scores 92 on this dimension — 99.921% fidelity on Helios, 48 logical qubits live, the
            most credible Apollo 2029 fault-tolerance commitment. Rigetti scores 52. The 40-point
            gap is the structural read.
          </p>
          <p>
            <strong>Capital (20% weight).</strong> Runway, valuation momentum, market access. This
            is where mega-cap parents (Google, Microsoft, IBM) get full marks regardless of unit
            economics, and where Rigetti — for all its strategic weakness — gets credit for
            $590M of cash. Capital is the dimension that buys time. In a sector where time-to-FTQC
            is the binary variable, having time is non-trivial.
          </p>
          <p>
            <strong>Commercial (30% weight).</strong> TTM revenue, growth, customer mix,
            concentration risk. This is where the public cohort sorts. IonQ at $130M, growing
            200%+, with diverse customers, scores 82. Quantinuum at $30.9M with 60% RIKEN
            concentration scores 64 — strong revenue, structural concentration penalty. Rigetti
            at $7M with declining revenue scores 18. The commercial score is the dimension that
            most often diverges from stock price, and the divergence is usually the trade.
          </p>
          <p>
            <strong>Government validation (20% weight).</strong> DARPA QBI stage, US2QC, allied
            programs, named contracts. PsiQuantum and Microsoft score 95 and 92 here — US2QC
            final phase is the deepest validation available. Rigetti at 25 reflects Stage A
            elimination. This dimension is the closest thing to an outside opinion the sector
            produces.
          </p>
          <p>
            The composite score is opinionated by construction. The point of publishing the
            methodology is so you can disagree with the weights, see the inputs, and reach your
            own number. <Link href="/ledger-score/methodology">The methodology page</Link>{' '}
            documents every rubric.
          </p>

          <h2>Layer four: the five questions that survive every cycle</h2>
          <p>
            When a quantum announcement crosses the wire — a new chip, a new round, an IPO filing,
            a benchmark result — there are five questions that strip the news down to the part
            that actually moves the model.
          </p>
          <ol>
            <li>
              <strong>Which of the four product categories does this affect?</strong> A photonic
              chip announcement affects FTQC and possibly networking; it does not affect PQC.
              A NIST standard affects PQC; it does not affect FTQC roadmaps. Match the news to
              the category before pricing it in.
            </li>
            <li>
              <strong>Does it move the DARPA validation signal?</strong> If the news is not in or
              adjacent to QBI / US2QC / NIST / DOE QIS programs, it is marketing until proven
              otherwise. If it is, weight it heavily.
            </li>
            <li>
              <strong>Which Ledger Score dimension does it change, and by how much?</strong> A new
              gate-fidelity record affects technology, possibly capital (valuation step-up). It
              does not affect commercial. A new customer affects commercial, possibly capital. A
              new round affects capital. Map the news to the dimension before assuming systemic
              impact.
            </li>
            <li>
              <strong>What is the read-through for the other names?</strong> Most quantum news
              affects the cohort directionally. A negative quarter from Rigetti is positive for
              IonQ and Quantinuum because it reduces the available capital pool to a structurally
              weaker peer. A positive Stage C advance for PsiQuantum is positive for the
              FTQC-2029 cohort thesis broadly. The read-through is where most of the trade lives.
            </li>
            <li>
              <strong>What is the calendar implication?</strong> Has the news pulled forward a
              milestone (Apollo 2029, Starling 2029, Stage C decisions Q4 2026), pushed it
              back, or revealed a new milestone? Quantum stocks discount future dates aggressively
              — a six-month pull-forward is a meaningful multiple expansion event.
            </li>
          </ol>
          <p>
            Run any quantum announcement through those five questions and the part of the news
            that matters survives. The rest is press-release texture.
          </p>

          <h2>Where the framework leads in 2026</h2>
          <p>
            Apply the framework to the current cohort and a few conclusions emerge.
          </p>
          <p>
            <strong>The IPO matters.</strong> Quantinuum&apos;s S-1 pricing in June 2026 is the
            single most consequential pricing event for the entire public cohort. A $20B price
            either drags IonQ, D-Wave, Rigetti, and the rest up by re-rating the comp set, or
            becomes the ceiling everyone trades against. The Ledger Score composite suggests QNT
            should price between IonQ&apos;s implied multiple and Rigetti&apos;s — somewhere
            around $12-18B. <Link href="/qnt-ipo-watch">The IPO watch</Link> tracks pricing
            updates daily.
          </p>
          <p>
            <strong>The Q4 2026 DARPA decision is the next discrete event.</strong> Stage C
            advancement from QBI Stage B will further consolidate the credibility hierarchy.
            Companies that advance gain Ledger Score points (and probably valuation step-ups);
            companies that do not, lose ground. The market is currently not pricing this discretely.
          </p>
          <p>
            <strong>The 2029 FTQC convergence is the long-cycle bet.</strong> IBM, Quantinuum, and
            Xanadu have all publicly targeted 2029 fault-tolerance milestones. Three independent
            architectures converging on the same year is the most credible long-term signal in
            the sector. The bear case is none of them hit. The bull case is two of three do, in
            which case the public cohort is meaningfully under-priced today. The Ledger Score
            framework lets you bet on the convergence without picking the winner.
          </p>
          <p>
            <strong>The misclassification trades are still open.</strong> The market continues to
            price Rigetti and Arqit as quantum-computing exposure when they are, respectively, a
            sub-scale gate-model vendor and a quantum-safe cryptography services company. Both
            trade at multiples that reflect category confusion. The Ledger Score is structured
            specifically to surface these misclassifications.
          </p>

          <h2>Why this site exists</h2>
          <p>
            The Quantum Insider does breadth. Quantum Computing Report does technical depth. Pitchbook
            does private-company data behind a paywall. Nobody does a published, opinionated,
            financially-literate synthesis with a transparent scoring framework. I built Quantum
            Ledger because that was the resource I wanted and couldn&apos;t find.
          </p>
          <p>
            Every page on the site is meant to defend the framework above. The{' '}
            <Link href="/ledger-score">Ledger Score</Link> ranks every company. The{' '}
            <Link href="/earnings">earnings tracker</Link> updates the commercial score every
            quarter. The <Link href="/darpa-qbi">QBI tracker</Link> updates the government score
            after every stage announcement. The <Link href="/qnt-ipo-watch">IPO watch</Link>{' '}
            tracks the swing event. The <Link href="/pqc-migration">PQC migration tracker</Link>{' '}
            covers the first-product category. The <Link href="/companies">companies</Link>{' '}
            section is the per-name due diligence. The <Link href="/learn">primer</Link> and{' '}
            <Link href="/glossary">glossary</Link> are the vocabulary.
          </p>
          <p>
            If the framework holds up to a year of news, the site becomes useful. If it doesn&apos;t,
            I update it publicly. The methodology page is the contract. Disagree productively,
            disagree often, push back on the weights. The site improves when the framework is
            pressure-tested.
          </p>

          <hr />

          <p>
            <em>Connor Reuter runs Quantum Ledger. He is an investor at Caruso Ventures, a Single
              Family Office, and writes about quantum sector intelligence for a living. Comments
              and disagreements welcome at the address on the <Link href="/about">about page</Link>.</em>
          </p>
        </article>
      </div>
    </div>
  );
}
