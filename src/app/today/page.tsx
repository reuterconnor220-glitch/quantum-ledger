import Link from 'next/link';

export const metadata = {
  title: 'Quantum Today · Where Real Commercial Revenue Is Happening Now',
  description: 'Every deployed, paying-customer quantum computing use case happening right now. HSBC, BMW, AstraZeneca, the Royal Navy, Apple, Cloudflare — quantum is not the future. Parts of it are already revenue.',
};

interface Deployment {
  vendor: string;
  vendorSlug?: string;
  customer: string;
  useCase: string;
  status: 'deployed' | 'announced' | 'pilot';
  dealSize?: string;
  whyExciting: string;
  source?: string;
}

const DEPLOYMENTS: { category: string; oneLiner: string; iconColor: string; items: Deployment[] }[] = [
  {
    category: 'Finance',
    oneLiner: 'Banks running real money through quantum pipelines',
    iconColor: 'bg-yellow-500/70',
    items: [
      {
        vendor: 'IBM Quantum',
        vendorSlug: 'ibm',
        customer: 'HSBC',
        useCase: 'Bond trading optimization with quantum advantage',
        status: 'deployed',
        whyExciting:
          'HSBC published a peer-reviewed paper in November 2025 showing 34% accuracy improvement on bond pricing using IBM Heron — the first documented commercial quantum advantage at a major bank.',
        source: 'https://newsroom.ibm.com/2025-11-12-ibm-delivers-new-quantum-processors',
      },
      {
        vendor: 'IBM Quantum',
        vendorSlug: 'ibm',
        customer: 'JPMorgan Chase',
        useCase: 'Derivative pricing + credit risk modeling',
        status: 'deployed',
        whyExciting:
          'JPMorgan has been running production-grade quantum experiments on IBM hardware since 2020. Multiple peer-reviewed papers on option pricing and portfolio optimization. They host their own quantum research team.',
      },
      {
        vendor: 'D-Wave',
        vendorSlug: 'dwave',
        customer: 'NatWest Group',
        useCase: 'Liquid asset portfolio optimization',
        status: 'deployed',
        whyExciting:
          'NatWest uses D-Wave to optimize high-quality liquid asset (HQLA) portfolios in production, reportedly 300x faster than classical methods on certain workloads.',
      },
      {
        vendor: 'D-Wave',
        vendorSlug: 'dwave',
        customer: 'Mastercard',
        useCase: 'Cross-border payment fraud detection',
        status: 'deployed',
        whyExciting:
          'Mastercard signed a multi-year deal with D-Wave to use quantum-hybrid optimization on their fraud-detection graph. Real money, real anomalies, real production environment.',
      },
      {
        vendor: 'Quantinuum',
        vendorSlug: 'quantinuum',
        customer: 'BMO + Scotiabank',
        useCase: 'Collateralized loan optimization',
        status: 'deployed',
        whyExciting:
          'Two of Canada\'s largest banks use Quantinuum\'s InQuanto and TKET for collateralized loan optimization and portfolio Monte Carlo speedup.',
      },
    ],
  },
  {
    category: 'Drug discovery & pharma',
    oneLiner: 'Quantum simulating the molecules that become tomorrow\'s drugs',
    iconColor: 'bg-emerald-500/70',
    items: [
      {
        vendor: 'IonQ',
        vendorSlug: 'ionq',
        customer: 'AstraZeneca',
        useCase: 'Reaction simulation for early drug discovery',
        status: 'deployed',
        whyExciting:
          'AstraZeneca + IonQ + AWS + NVIDIA jointly published a 20× speedup on a chemistry simulation key to drug discovery in 2025. The pipeline runs in AstraZeneca\'s production cloud environment.',
      },
      {
        vendor: 'Quantinuum',
        vendorSlug: 'quantinuum',
        customer: 'Roche',
        useCase: 'Alzheimer\'s drug binding-site discovery',
        status: 'deployed',
        whyExciting:
          'Roche is running quantum-accelerated simulations on Quantinuum Helios via InQuanto to model how candidate molecules bind to amyloid plaques — one of the hardest unsolved problems in Alzheimer\'s research.',
      },
      {
        vendor: 'Quantinuum',
        vendorSlug: 'quantinuum',
        customer: 'Roche + Cambridge',
        useCase: 'GenQAI for biopharma',
        status: 'announced',
        whyExciting:
          'Quantinuum\'s Helios launch (Nov 2025) introduced "Generative Quantum AI" — hybrid models combining classical generative AI with quantum kernels. Pharma is the first announced customer use case.',
      },
      {
        vendor: 'IBM Quantum',
        vendorSlug: 'ibm',
        customer: 'Cleveland Clinic',
        useCase: 'Cancer drug discovery + protein folding',
        status: 'deployed',
        whyExciting:
          'IBM installed an on-premise quantum computer at Cleveland Clinic — the first health-care-dedicated quantum system in the world. Running cancer therapeutic discovery and genomics workloads.',
      },
    ],
  },
  {
    category: 'Materials & chemistry',
    oneLiner: 'Designing molecules that classical computers can\'t simulate',
    iconColor: 'bg-amber-500/70',
    items: [
      {
        vendor: 'Quantinuum',
        vendorSlug: 'quantinuum',
        customer: 'BMW Group',
        useCase: 'EV battery chemistry + catalyst design',
        status: 'deployed',
        whyExciting:
          'Multi-year partnership extended in May 2026. BMW uses Helios (today) → Sol (2027) → Apollo (2029) for industrial chemistry simulation. Outputs feed directly into next-gen battery cathode designs.',
      },
      {
        vendor: 'Pasqal',
        vendorSlug: 'pasqal',
        customer: 'BASF',
        useCase: 'Carbon-capture catalyst design',
        status: 'deployed',
        whyExciting:
          'BASF and Pasqal jointly developed a quantum workflow for CO₂-to-fuel catalyst design. If it scales, this is climate-change-relevant chemistry — currently among the most expensive simulations classically.',
      },
      {
        vendor: 'Quantinuum',
        vendorSlug: 'quantinuum',
        customer: 'JSR Corporation',
        useCase: 'Semiconductor lithography materials',
        status: 'deployed',
        whyExciting:
          'JSR (the world\'s largest semiconductor photoresist supplier) uses Quantinuum for material design of EUV photoresists — directly enabling next-gen chip fabrication.',
      },
      {
        vendor: 'IonQ',
        vendorSlug: 'ionq',
        customer: 'Hyundai Motor',
        useCase: 'Lithium-ion battery cathodes',
        status: 'deployed',
        whyExciting:
          'Hyundai\'s industrial-AI division integrates IonQ for battery cathode chemistry simulation. Stated goal: better batteries with shorter charging time.',
      },
    ],
  },
  {
    category: 'Defense & national security',
    oneLiner: 'Quantum already deployed by militaries today',
    iconColor: 'bg-slate-500/70',
    items: [
      {
        vendor: 'Q-CTRL',
        vendorSlug: 'q-ctrl',
        customer: 'Royal Australian Navy',
        useCase: 'GPS-denied maritime navigation',
        status: 'deployed',
        whyExciting:
          'Q-CTRL\'s Ironstone Opal demonstrated 111x better positioning than classical INS during real Navy flight trials in GPS-denied conditions. Operationally deployed. Defense procurement contracts: A$38M from DARPA RoQS.',
      },
      {
        vendor: 'Infleqtion',
        vendorSlug: 'infleqtion',
        customer: 'UK Royal Navy',
        useCase: 'Underwater submarine optical clock',
        status: 'deployed',
        whyExciting:
          'October 2025: world\'s first quantum optical clock deployed on autonomous underwater submarine. Enables submarine navigation without GPS surfacing — a strategically transformative capability.',
      },
      {
        vendor: 'IonQ',
        vendorSlug: 'ionq',
        customer: 'US Air Force Research Lab',
        useCase: 'Quantum networking + ground-to-drone optical links',
        status: 'deployed',
        dealSize: '$75M+',
        whyExciting:
          'AFRL has placed $54.5M (2024) + $21.1M (2025) in IonQ for quantum networking work — largest disclosed US quantum defense contracts. Ground-to-drone laser links are operational.',
      },
      {
        vendor: 'SBQuantum',
        customer: 'Canadian DND + NGA',
        useCase: 'Sub-surface diamond magnetometers',
        status: 'deployed',
        whyExciting:
          'NV-diamond magnetometers deployed in defense pilots; SBQuantum sensor launched to space (March 2026) to refine the World Magnetic Model for the National Geospatial-Intelligence Agency.',
      },
    ],
  },
  {
    category: 'Internet security · already protecting you',
    oneLiner: 'Post-quantum cryptography is already running in production',
    iconColor: 'bg-red-500/70',
    items: [
      {
        customer: 'Apple iMessage',
        vendor: 'Apple PQ3',
        useCase: 'Quantum-safe end-to-end encryption',
        status: 'deployed',
        whyExciting:
          'Live since iOS 17.4 (Feb 2024). Every iMessage you send is now protected by hybrid NIST-standardized post-quantum cryptography. Billions of messages per day.',
      },
      {
        customer: 'Cloudflare TLS',
        vendor: 'Cloudflare PQC',
        useCase: 'Hybrid ML-KEM in TLS 1.3 across the internet',
        status: 'deployed',
        whyExciting:
          '52% of human web traffic to Cloudflare-protected sites uses hybrid post-quantum TLS as of December 2025. Half the visible internet is already quantum-safe at the transport layer.',
      },
      {
        customer: 'AWS KMS',
        vendor: 'AWS',
        useCase: 'PQ-safe key management',
        status: 'deployed',
        whyExciting:
          'AWS Key Management Service supports hybrid post-quantum key encapsulation for any AWS service. Enterprise crypto migration runs through this primitive.',
      },
      {
        vendor: 'SandboxAQ',
        vendorSlug: 'sandboxaq',
        customer: 'US Department of Defense',
        useCase: 'AQtive Guard PQ crypto-discovery',
        status: 'deployed',
        dealSize: '5-year contract',
        whyExciting:
          'DoD 5-year contract for cryptographic-asset discovery — the first step of PQ migration mandated by NSM-10. SandboxAQ also services Vodafone, SoftBank, and Mount Sinai.',
      },
    ],
  },
  {
    category: 'Logistics & operations',
    oneLiner: 'Real cargo, real factories, real airports',
    iconColor: 'bg-blue-500/70',
    items: [
      {
        vendor: 'D-Wave',
        vendorSlug: 'dwave',
        customer: 'Volkswagen Group',
        useCase: 'Lisbon city traffic + factory robot scheduling',
        status: 'deployed',
        whyExciting:
          'Volkswagen ran a quantum traffic-routing trial on Lisbon\'s urban bus fleet, plus production-line robot scheduling at multiple factories. Real cars, real factories.',
      },
      {
        vendor: 'Pasqal',
        vendorSlug: 'pasqal',
        customer: 'CMA CGM',
        useCase: 'Maritime shipping container optimization',
        status: 'deployed',
        whyExciting:
          'CMA CGM (third-largest container shipping company in the world) uses Pasqal\'s neutral-atom system for container loading and route optimization across global routes.',
      },
      {
        vendor: 'D-Wave',
        vendorSlug: 'dwave',
        customer: 'Pattern Insurance',
        useCase: 'Insurance underwriting risk graphs',
        status: 'deployed',
        whyExciting:
          'Pattern uses D-Wave Advantage2 for combinatorial risk-graph optimization in real-time insurance underwriting. Sub-second pricing decisions.',
      },
      {
        vendor: 'D-Wave',
        vendorSlug: 'dwave',
        customer: 'Florida Atlantic University',
        useCase: 'On-prem Advantage2 quantum computer',
        status: 'deployed',
        dealSize: '$20M',
        whyExciting:
          'FAU acquired their own Advantage2 system in 2026 — the first US university to own (not rent) a full annealing quantum computer. Workloads: combinatorial optimization, ocean modeling.',
      },
    ],
  },
  {
    category: 'Cloud quantum · paying customers today',
    oneLiner: 'Anyone with a credit card can rent quantum time right now',
    iconColor: 'bg-violet-500/70',
    items: [
      {
        customer: '350+ enterprise customers',
        vendor: 'IBM Quantum Platform',
        vendorSlug: 'ibm',
        useCase: 'Pay-as-you-go quantum + Premium subscriptions',
        status: 'deployed',
        whyExciting:
          'IBM Quantum Network has 350+ partners including Boeing, Mitsubishi Chemical, Daimler, Bosch, ExxonMobil, Goldman Sachs. Real subscription revenue at $1M+/year tier.',
      },
      {
        customer: 'AWS Braket customers',
        vendor: 'AWS Braket',
        useCase: 'Multi-vendor quantum cloud (IonQ, Rigetti, QuEra, IQM, Pasqal)',
        status: 'deployed',
        whyExciting:
          'AWS Braket gives one credit card access to 6+ different quantum hardware vendors. Pricing: $0.30/task + per-shot fees. Real revenue, real workloads, hourly metered.',
      },
      {
        customer: 'Azure Quantum customers',
        vendor: 'Microsoft Azure Quantum',
        vendorSlug: 'microsoft',
        useCase: 'IonQ, Quantinuum, Rigetti, Pasqal access',
        status: 'deployed',
        whyExciting:
          'Microsoft\'s aggregator approach gives enterprise customers quantum via Azure Enterprise Agreements. Frictionless procurement for big companies that already buy Azure.',
      },
    ],
  },
];

export const revalidate = 86400;

export default function TodayPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="qdot-live" />
            <span className="eyebrow">Live deployments · paying customers · May 2026</span>
          </div>
          <h1 className="font-display text-display-1 font-medium tracking-tight max-w-4xl">
            Quantum isn&apos;t the future. Parts of it are already revenue.
          </h1>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-3xl">
            Apple sends every iMessage with quantum-safe cryptography. Cloudflare protects half the
            internet with it. HSBC traded bonds with a documented quantum advantage in November 2025.
            BMW optimizes batteries with Quantinuum. The Royal Navy navigates with Q-CTRL. Below: every
            real, deployed, paying-customer quantum use case we can verify, today.
          </p>
          <p className="mt-5 text-xs font-mono uppercase tracking-wider text-text-muted max-w-3xl">
            A curated directory of <em>who is paying for quantum, what they&apos;re doing with it, and why it matters</em>.
            Not a news feed — for that see <Link href="/brief" className="text-accent-quantum hover:underline">/brief</Link> and{' '}
            <Link href="/news" className="text-accent-quantum hover:underline">/news</Link>.
          </p>
        </div>
      </section>

      {/* The big numbers */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
            <Stat label="2025 sector revenue" value="$1.0–1.5B" sub="real revenue, not pledges" />
            <Stat label="IonQ FY26 guidance" value="$260–270M" sub="raised in Q1" />
            <Stat label="Web traffic on PQ-TLS" value="52%" sub="Cloudflare, Dec 2025" />
            <Stat label="Enterprise quantum customers" value="350+" sub="IBM Quantum Network" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        {DEPLOYMENTS.map((cat) => (
          <div key={cat.category} className="mb-14">
            <div className="flex items-center gap-3 mb-2">
              <span className={`flex-shrink-0 w-3 h-3 rounded-full ${cat.iconColor}`} />
              <h2 className="font-display text-3xl tracking-tight">{cat.category}</h2>
            </div>
            <p className="text-text-secondary text-lg mb-6 ml-6">{cat.oneLiner}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
              {cat.items.map((d, i) => (
                <article key={i} className="card p-5 hover:border-accent-quantum/40 transition">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                    <div>
                      <p className="font-mono text-xs text-text-muted uppercase tracking-wider">
                        {d.vendor}
                      </p>
                      <h3 className="font-display text-xl tracking-tight text-text-primary mt-0.5">
                        {d.customer}
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-sm whitespace-nowrap ${
                        d.status === 'deployed'
                          ? 'bg-accent-data/15 text-accent-data'
                          : d.status === 'pilot'
                            ? 'bg-accent-warn/15 text-accent-warn'
                            : 'bg-accent-quantum/15 text-accent-quantum'
                      }`}
                    >
                      {d.status}
                    </span>
                  </div>

                  <p className="text-sm font-mono text-text-secondary mb-3 italic">{d.useCase}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{d.whyExciting}</p>

                  <div className="mt-4 pt-3 border-t border-border-muted flex items-center justify-between gap-2 text-xs flex-wrap">
                    {d.dealSize && (
                      <span className="font-mono text-accent-quantum">{d.dealSize}</span>
                    )}
                    {d.vendorSlug && (
                      <Link
                        href={`/companies/${d.vendorSlug}`}
                        className="text-accent-quantum hover:underline font-mono"
                      >
                        {d.vendor} →
                      </Link>
                    )}
                    {d.source && (
                      <a
                        href={d.source}
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-muted hover:text-accent-quantum font-mono"
                      >
                        source ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Closing */}
      <section className="border-t border-border bg-bg-surface/30">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14">
          <h2 className="font-display text-3xl tracking-tight mb-4">
            The honest framing
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Most of these are <em>pilots</em> and <em>research collaborations</em>, not core production
              workflows yet. Total industry revenue is ~$1B against $11B+ in cumulative private capital.
              But the velocity is real and accelerating — the HSBC commercial-advantage paper (Nov 2025),
              the Apple/Cloudflare PQC rollouts, and the defense sensing deployments are not promises.
              They are operating systems.
            </p>
            <p>
              The credible bet is that the curve bends sharply between 2027 and 2030 as logical-qubit
              counts cross the 50→500 range and chemistry simulations enter therapeutic relevance.
              Today is the leading edge. Five years from now will be different. Read{' '}
              <Link href="/learn/timeline" className="text-accent-quantum hover:underline">
                the time-horizon view
              </Link>{' '}
              to understand what 5, 10, and 15 years out look like.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link href="/companies" className="card card-hover p-4 block">
              <p className="eyebrow mb-1">Tracker</p>
              <p className="text-text-primary font-medium">All 32 quantum companies</p>
            </Link>
            <Link href="/revenue" className="card card-hover p-4 block">
              <p className="eyebrow mb-1">Reality check</p>
              <p className="text-text-primary font-medium">Sector revenue breakdown</p>
            </Link>
            <Link href="/learn/timeline" className="card card-hover p-4 block">
              <p className="eyebrow mb-1">Horizon</p>
              <p className="text-text-primary font-medium">5, 10, 15 years out</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-bg-surface p-5">
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono mb-2">{label}</p>
      <p className="font-mono text-2xl text-text-primary">{value}</p>
      <p className="mt-1 text-xs text-text-muted">{sub}</p>
    </div>
  );
}
