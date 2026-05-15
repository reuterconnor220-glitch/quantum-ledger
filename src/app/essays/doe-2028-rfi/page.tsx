import Link from 'next/link';

export const metadata = {
  alternates: { canonical: '/essays/doe-2028-rfi' },
  title: 'The DOE 2028 RFI is the most important quantum document of 2026',
  description:
    "The Department of Energy's May 15 RFI for a fault-tolerant quantum computer at a national laboratory by 2028 effectively credentials a two-vendor field. The roadmaps that don't make the cut lose the federal-procurement narrative that has been supporting their valuations. By Connor Reuter, Quantum Ledger.",
  openGraph: {
    title: 'The DOE 2028 RFI is the most important quantum document of 2026',
    description: 'A procurement spec disguised as an open inquiry.',
  },
};

export default function EssayPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-data font-mono mb-3">
            Essay · 11 min read · 2026-05-15
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight leading-tight">
            The DOE 2028 RFI is the most important quantum document of 2026.
          </h1>
          <p className="mt-6 text-xl text-editorial-ink/75 leading-relaxed max-w-[60ch]">
            An RFI is not a contract. It is something more durable: a procurement spec that
            credentials a narrow field. Two vendors. Maybe three. The roadmaps that don&apos;t
            make the cut are losing the federal procurement narrative that has been supporting
            their valuations.
          </p>
          <p className="mt-6 text-sm text-editorial-ink/60 font-mono">By Connor Reuter</p>
        </header>

        {/* ──────────────── Stance bar ──────────────── */}
        <aside className="not-prose mb-12 border-l-4 border-accent-data bg-editorial-ink/[0.04] pl-6 pr-5 py-5 rounded-r-md">
          <p className="text-[10px] uppercase tracking-[0.18em] text-accent-data font-mono mb-3 font-semibold">
            The Ledger View
          </p>
          <p className="font-display text-[20px] leading-snug text-editorial-ink mb-5">
            The DOE&apos;s 2028 fault-tolerant timeline credentials a two-vendor field — IBM
            Starling and Quantinuum Apollo — with PsiQuantum the only credible third. Other
            roadmaps now have to either move forward publicly or accept being out of the 2028
            trade.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-editorial-ink/15">
            <div>
              <p className="text-[9px] uppercase tracking-[0.15em] text-editorial-ink/60 font-mono mb-1">
                Confidence
              </p>
              <p className="font-display text-base text-editorial-ink">Medium-High</p>
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
                A fourth vendor publicly accepted by DOE for the 2028 timeline, or DOE
                materially relaxing the date.
              </p>
            </div>
          </div>
        </aside>

        <article className="prose-editorial">
          <h2>The document, in plain English</h2>
          <p>
            On May 15, 2026, the Department of Energy&apos;s Office of Science issued a formal
            Request for Information seeking vendors capable of delivering a scientifically
            useful fault-tolerant quantum computer to a national laboratory by 2028. The RFI
            asks respondents to describe the architecture, error-correction approach,
            performance benchmarks, deployment timeline, and operational support model for a
            system that would be integrated into the national lab compute environment alongside
            classical HPC.
          </p>
          <p>
            That is the entire document, more or less. There is no money attached. There is no
            commitment from DOE to issue a solicitation. There is no preferred vendor named. By
            the formal standards of federal procurement, the RFI is the lowest-stakes thing the
            government can publish.
          </p>
          <p>
            It is also, in my view, the most important quantum document of 2026.
          </p>

          <h2>Why an RFI is more durable than a press release</h2>
          <p>
            The reason this matters is that an RFI is not a press release. It is a federal
            procurement document. RFIs precede solicitations by twelve to eighteen months. They
            are written by procurement officers and program managers who have been told —
            usually by the program office, sometimes by Congress, occasionally by both — that a
            program is coming and that the agency needs to start identifying which vendors can
            credibly respond.
          </p>
          <p>
            When a federal agency writes the phrase &quot;fault-tolerant&quot; into an RFI with
            a specific year attached, it is doing two things simultaneously. It is signaling to
            the field that a procurement is coming on roughly that timeline. And it is
            beginning the process of writing the comp spec that the eventual solicitation will
            use to score bids.
          </p>
          <p>
            The vendors who answer this RFI seriously will be the vendors whose architectures
            shape the eventual spec. The vendors whose architectures shape the spec will be the
            vendors who win. This is how federal procurement has worked for sixty years across
            every major capability acquisition, from radar to nuclear submarines to the F-35.
            The quantum sector has not had a document like this until last Thursday.
          </p>

          <h2>The 2028 filter</h2>
          <p>
            The single most analytically useful thing the RFI does is publish a date. &quot;A
            fault-tolerant quantum computer at a national laboratory by 2028&quot; is a binary
            filter applied to every public roadmap in the sector. Two years of design,
            fabrication, validation, and deployment. The fault-tolerance requirement implies
            error correction at scale, which implies hundreds of logical qubits operating
            below threshold, which implies the kind of physical-qubit counts and gate-fidelity
            floors that only a handful of vendors can plausibly hit on this timeline.
          </p>
          <p>
            Working through the public roadmaps:
          </p>
          <p>
            <strong>IBM Starling</strong> targets 200 logical qubits by 2029. That is a year
            late for the DOE date, but the architecture and the fabrication base are mature
            enough that an accelerated 2028 demonstration is credible. IBM also has the
            customer side of this trade already running through Cleveland Clinic, RIKEN, and
            multiple national-lab partnerships. Of any vendor in the field, IBM has the most
            developed deployment muscle. They are the favorite to respond credibly.
          </p>
          <p>
            <strong>Quantinuum Apollo</strong> targets fault tolerance at a similar 2029
            vintage. The QCCD trapped-ion architecture has the highest gate fidelities in the
            industry today (99.99 percent claimed on best systems). Quantinuum&apos;s integration
            with Honeywell&apos;s manufacturing apparatus is the closest thing the quantum sector
            has to a defense-prime supply chain, and the upcoming IPO will give them the
            balance sheet to pull the date forward. They are the second favorite.
          </p>
          <p>
            <strong>PsiQuantum</strong> targets utility-scale photonics at the Illinois Quantum
            and Microelectronics Park (IQMP) on a 2028-2029 timeline, with the Chicago site
            already under construction. Photonic architecture is the most ambitious bet on the
            board: if it works, the qubit count scales fast; if it doesn&apos;t, the timeline
            slips a decade. They are the only credible third response, and the only respondent
            whose architecture matches the DOE date precisely.
          </p>
          <p>
            Working down from there, the math gets harder. <strong>Atom Computing</strong> and{' '}
            <strong>QuEra</strong> have the most aggressive neutral-atom roadmaps in the public
            field, but neither has demonstrated the error-correction stack at scale required
            for a 2028 fault-tolerant system. <strong>IonQ Tempo</strong> is targeted at 2027
            but is not fault-tolerant; the 10,000-physical-qubit single-chip narrative is a
            2027-2028 aspiration that has slipped before. <strong>Atom, Pasqal, Diraq,
            Photonic Inc., Nord Quantique</strong>, and the Stage A QBI cohort are mostly
            2029-2030 stories. <strong>D-Wave</strong> and <strong>Rigetti</strong> are not in
            this race; the annealer and the superconducting-NISQ architectures respectively
            cannot be repackaged as fault-tolerant systems on a two-year horizon.
          </p>
          <p>
            That leaves three names with a credible 2028 response, six names with a credible
            2029-2030 response that would have to argue for date relief, and the rest of the
            field looking for a different procurement vehicle.
          </p>

          <h2>The procurement spec, written in advance</h2>
          <p>
            DOE RFIs that name a date and a technology this specifically are usually written
            against a target architecture. The language in the May 15 RFI — fault-tolerant
            operation at scale, integration with national lab classical compute, scientifically
            useful applications in chemistry and materials — maps cleanly to the published IBM
            Starling and Quantinuum Apollo roadmaps. Not coincidentally. RFI language is shaped
            by months of pre-procurement conversations with the most likely respondents, and
            both IBM and Quantinuum have been in serious engagement with the national lab
            system for years.
          </p>
          <p>
            The implication is that the RFI is, functionally, the comp spec for a
            Starling-versus-Apollo bake-off. PsiQuantum is the wild card. Other respondents are
            invited to participate, but the architectural reference points are written against
            the favorites. This is not a value judgment about the DOE process. It is how
            federal acquisition works when the program office has already done its homework.
          </p>

          <h2>What this means for the cohort</h2>
          <p>
            The valuation consequence is mostly subtractive. The federal procurement narrative
            has been a meaningful component of the multiple every public quantum name carries.
            QBTS, IONQ, RGTI, and ARQQ all reference government adjacency in their investor
            materials. The Stage A QBI vendors (Anyon, Nord Quantique, Diraq, Quantum
            Brilliance, Photonic Inc., Quobly, Silicon Quantum Computing, Quantum Source, IBM
            and Quantinuum themselves, and a handful of others) trade in part on the
            expectation that the DARPA process is a leading indicator of subsequent agency
            procurement.
          </p>
          <p>
            The DOE RFI rewrites that expectation. It says: the next major federal procurement
            for a working machine, on a published timeline, will be fought between two or three
            architectures. The rest of the field is welcome to compete on a longer horizon, in
            a different category, or in a different country. Every other narrative — sovereign
            demand, R&amp;D contracts, government test beds — still applies. But the
            single-largest piece of federal procurement signal in the sector now points to two
            vendors and one wild card.
          </p>
          <p>
            That is not necessarily bearish for the rest of the field. It is, however, a
            tightening of the bull case that the multiple compression in QBTS, RGTI, and
            similar names already reflects. The DOE date does not create the multiple
            compression. It validates it.
          </p>

          <h2>The IBM case</h2>
          <p>
            IBM is the position with the most upside from the RFI and the least share-price
            consequence from the outcome. Quantum is immaterial to IBM&apos;s stock — the
            segment is sub-one-percent of revenue, the R&amp;D budget is sub-three-percent of
            total. A DOE contract at one to two billion dollars across a five-year period is
            interesting margin but irrelevant to the parent-company multiple.
          </p>
          <p>
            What it would matter for is the credibility of the Starling roadmap, which has
            implications for the commercial customer pipeline. Cleveland Clinic, RIKEN, U
            Tokyo, the named-account pipeline through the IBM Quantum Platform — these
            customers buy the roadmap as much as they buy the current hardware. A DOE contract
            stamps the roadmap with federal validation in a way no other customer can. That
            tightens the funnel for the next tier of enterprise wins.
          </p>
          <p>
            Our view: IBM is the favorite to win at least one of the two slots if DOE awards
            multiple respondents (which RFIs of this scale often do). We hold the IBM weighting
            unchanged. The asymmetry is real but the public stock isn&apos;t the right
            instrument.
          </p>

          <h2>The Quantinuum case</h2>
          <p>
            Quantinuum is the position with the most direct share-price exposure to the RFI
            outcome. The IPO has not priced yet but the book is being built against a thesis
            that includes federal procurement upside. If Apollo is named or implied as a
            preferred respondent, the IPO prices higher. If Apollo is sidelined for IBM or
            PsiQuantum, the IPO prices lower.
          </p>
          <p>
            The QCCD architecture has the highest fidelity floors in the public field, which is
            a genuine technical advantage for the fault-tolerance regime that DOE has
            described. The Honeywell manufacturing base, the U.S.-domestic supply chain for
            ion-trap chips, and the Defense Trusted Foundry adjacency through Honeywell are
            specific reasons DOE would prefer Quantinuum to a non-US competitor in a final
            head-to-head. These are the structural advantages a procurement officer values.
          </p>
          <p>
            The risk is fidelity-claim verification. The 99.99 percent two-qubit number is
            subject to scope conditions that DOE will press on, and an independent IV&amp;V
            against the DOE&apos;s definition of fault tolerance is the test the IPO book has
            not yet priced. Our view: Quantinuum is the most exposed name to a positive or
            negative resolution of the RFI process. If the IPO comes at fourteen billion or
            below, that is the level at which the asymmetric upside compensates for the
            verification risk.
          </p>

          <h2>The PsiQuantum case</h2>
          <p>
            PsiQuantum is the only privately-held name in the credible-respondent group. The
            company has been the most public about a 2028 timeline for a long time, and the
            Illinois site is the most concrete piece of national-scale quantum infrastructure
            under construction in the United States.
          </p>
          <p>
            What makes PsiQuantum the wild card rather than a co-favorite is the photonic
            architecture itself. The error-correction overhead is high, the cryogenic
            single-photon detector requirements are demanding, and the cumulative system
            complexity is higher than competing modalities. If the architecture works at the
            scale PsiQuantum has promised, it is the only one that crosses the
            million-physical-qubit threshold this decade. If it doesn&apos;t, the company is in
            an extremely difficult position because the architecture cannot easily be repackaged.
          </p>
          <p>
            For private-market investors, the PsiQuantum thesis after this RFI is the same as
            before: high-conviction, binary, and on a timeline that the DOE has now publicly
            shortened. The position size should reflect the binary nature. Our view is that
            anyone holding PsiQuantum exposure through secondary or growth-fund vehicles
            should expect the carrying values to move materially in either direction over the
            next eighteen months based on the IQMP commissioning progress.
          </p>

          <h2>Who loses</h2>
          <p>
            The most exposed names are the public Stage A QBI vendors whose valuations have
            included a federal-procurement option that this RFI just priced out. We would
            include in this group most of the Stage A field that does not have an obvious 2028
            response. The specific public names — Atom Computing, QuEra (assumed listed by
            2027), Diraq, Nord Quantique, Quantum Brilliance — are not bad businesses. They are
            simply not in the 2028 trade.
          </p>
          <p>
            The Stage A names that retain a federal procurement narrative are the ones with
            sovereign-adjacency arguments outside the DOE process: IQM (German and Finnish
            sovereign demand, EU programs), Riverlane (error-correction software for any
            respondent), and the U.S. national-lab in-house programs (Sandia, Oak Ridge).
            These are real businesses with real customers. They are simply not in the 2028
            trade either.
          </p>

          <h2>The counterargument</h2>
          <p>
            The case against this thesis has three forms.
          </p>
          <p>
            <strong>One.</strong> &quot;It&apos;s just an RFI. No contract attached. Don&apos;t
            overweight it.&quot; This reads federal procurement the way a retail investor reads
            a 10-K: only the numbers matter. But federal acquisition is shaped at the RFI
            stage. By the time a solicitation drops, the comp spec is locked. The vendors
            who shape the RFI win the solicitation. Treating the RFI as procedural noise is
            the most common analytical mistake outside-the-Beltway investors make.
          </p>
          <p>
            <strong>Two.</strong> &quot;DOE will widen the field to include emerging
            architectures.&quot; This is possible — DOE has done so before — but the 2028
            timeline doesn&apos;t allow it. Architectures not at TRL 5 by mid-2027 cannot
            credibly respond to a solicitation that requires deployment in early 2028. The
            timeline pre-filters the field whether or not DOE wants it to.
          </p>
          <p>
            <strong>Three.</strong> &quot;Multiple parallel programs reduce the importance of
            any one.&quot; True directionally — DARPA QBI, AFRL Quantum Networks, DOE Quantum
            Networks, and several agency-specific programs are all running. We agree that the
            DOE RFI is one signal in a constellation. We disagree that it is fungible with the
            others. The DOE RFI is the first program to combine a published 2028 fault-tolerance
            target with a national-lab deployment site. Nothing in the constellation has the
            same specificity.
          </p>

          <h2>What we&apos;re watching</h2>
          <p>
            The conversion test is whether this RFI converts to a solicitation by Q4 2027.
            Twelve to eighteen months from May 2026 puts the solicitation drop window at
            May 2027 through November 2027. Earlier is faster than the federal-procurement
            mode; later is more typical. A solicitation drop before Q3 2027 is a strong signal
            that DOE is moving aggressively. No solicitation by mid-2028 would invalidate the
            thesis.
          </p>
          <p>
            We are also watching for: which vendors publicly confirm they intend to respond
            (signals confidence), the IBM Quantum Summit November 2026 roadmap update, the
            Quantinuum IPO pricing and aftermarket trading (proxy for market faith in the 2028
            narrative), the IQMP Phase 1 commissioning milestones, and any agency-adjacent
            RFI or RFP that references a comparable spec.
          </p>

          <h2>Disclosure</h2>
          <p>
            Connor Reuter runs Quantum Ledger. He is an investor at Caruso Ventures, a Single
            Family Office. As of publication, Caruso Ventures has no direct equity positions in
            IBM, IonQ, D-Wave, Rigetti, Quantum Computing Inc., or Arqit. Caruso Ventures has
            indirect exposure to private quantum names through growth-stage fund commitments
            that include PsiQuantum and several Stage A QBI vendors. Views expressed are the
            author&apos;s and do not constitute investment advice.
          </p>

          <hr />

          <p>
            <em>
              The Ledger publishes one signed essay each week, plus the daily brief at six in
              the morning Mountain. To follow these calls over time, the{' '}
              <Link href="/archive">archive</Link> retains the full update history; the{' '}
              <Link href="/ledger-score">Ledger Score</Link> is the underlying scoring
              framework; the <Link href="/darpa-qbi">DARPA QBI tracker</Link> is the closest
              comparable to what a DOE solicitation will look like when it drops.
            </em>
          </p>
        </article>
      </div>
    </div>
  );
}
