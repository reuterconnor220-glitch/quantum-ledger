import { APPLICATIONS } from '@/lib/data/applications';
import Link from 'next/link';

export const metadata = {
  title: 'How Quantum Will Change the World · Applications & Opportunities',
  description: 'Ten industries quantum computing could transform — drug discovery, climate, materials, finance, security. Honest timelines, realistic checks, and the players already working on each.',
};

export const revalidate = 86400;

export default function ApplicationsPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-quantum font-mono mb-3">Applications</p>
          <h1 className="font-display text-5xl font-medium tracking-tight leading-tight">
            How quantum computing changes the world
          </h1>
          <p className="mt-5 text-lg text-editorial-ink/75 leading-relaxed max-w-[60ch]">
            Ten industries where useful quantum computing could create — or destroy — enormous value. Each comes
            with an honest timeline, a realism check, and the players already working on it. Drug discovery
            and materials lead. Quantum ML is mostly hype today. Cryptography is the urgent risk.
          </p>
          <p className="mt-3 text-sm text-editorial-ink/60 leading-relaxed">
            See also: <Link href="/learn/risks" className="text-accent-quantum hover:underline">the risks page</Link> {' '}
            for the other side of these forecasts.
          </p>
        </header>

        {/* TOC */}
        <nav className="mb-12 bg-white border border-editorial-ink/10 rounded-md p-5">
          <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono mb-3">Jump to</p>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {APPLICATIONS.map((a) => (
              <li key={a.slug}>
                <a href={`#${a.slug}`} className="text-editorial-ink/70 hover:text-accent-quantum block py-1">
                  → {a.domain}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {APPLICATIONS.map((a) => (
          <article key={a.slug} id={a.slug} className="mb-16 scroll-mt-20">
            <div className="flex items-start gap-3 mb-4">
              <span className={`flex-shrink-0 w-3 h-3 mt-3 rounded-full ${a.iconColor}`} />
              <h2 className="font-display text-3xl font-medium tracking-tight leading-tight">{a.domain}</h2>
            </div>

            <p className="text-lg text-editorial-ink/85 leading-relaxed mb-6 italic border-l-2 border-accent-quantum/30 pl-5">
              {a.oneLiner}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-accent-quantum font-mono mb-1">Why it matters</p>
                <p className="text-[15px] leading-relaxed text-editorial-ink/85">{a.whyItMatters}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-accent-quantum font-mono mb-1">What changes</p>
                <p className="text-[15px] leading-relaxed text-editorial-ink/85">{a.whatChanges}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-accent-quantum font-mono mb-1">Timeline</p>
                <p className="text-[15px] leading-relaxed text-editorial-ink/85">{a.timeline}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-accent-quantum font-mono mb-1">Qubits needed</p>
                <p className="text-[15px] leading-relaxed text-editorial-ink/85 font-mono">{a.qubitsNeeded}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="bg-white border border-editorial-ink/10 rounded-md p-5">
                <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono mb-2">Early wins to watch</p>
                <ul className="space-y-1.5 text-sm">
                  {a.earlyWins.map((w, i) => (
                    <li key={i} className="text-editorial-ink/80">· {w}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-editorial-ink/10 rounded-md p-5">
                <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono mb-2">Already working on it</p>
                <ul className="space-y-1.5 text-sm">
                  {a.realPlayers.map((p, i) => (
                    <li key={i} className="text-editorial-ink/80">· {p}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border-l-2 border-emerald-500/50 pl-4">
                <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-mono mb-1">Bull case</p>
                <p className="text-sm leading-relaxed text-editorial-ink/80">{a.bullCase}</p>
              </div>
              <div className="border-l-2 border-amber-500/50 pl-4">
                <p className="text-[10px] uppercase tracking-wider text-amber-700 font-mono mb-1">Realism check</p>
                <p className="text-sm leading-relaxed text-editorial-ink/80">{a.realismCheck}</p>
              </div>
            </div>
          </article>
        ))}

        <hr className="my-12 border-editorial-ink/15" />

        <section className="prose-editorial">
          <h2>The pattern</h2>
          <p>
            Look across all ten domains and a pattern emerges: <strong>chemistry-flavored problems</strong>{' '}
            (drug discovery, materials, climate, fundamental science) cluster around 2028–2032 as the
            credible first-wave use cases. <strong>Cryptography</strong> is the urgent counter-current —
            you don&apos;t need useful quantum computing to break RSA, you just need <em>some</em> quantum
            computing eventually, and adversaries are collecting today.
          </p>
          <p>
            <strong>Optimization</strong> wins today on annealers but lacks a proven gate-based path to
            asymptotic advantage. <strong>Quantum ML</strong> is mostly hype on real benchmarks. <strong>
            Sensing</strong> is the dark horse — already deployed, real revenue, lower TAM than computing
            but much closer to market.
          </p>
          <p>
            For investors, the highest-conviction near-term thesis is that 2–3 vendors capture 70%+ of
            chemistry-driven quantum revenue by 2035. For policymakers, the urgent thesis is post-quantum
            cryptography migration before the cryptographically-relevant quantum computer arrives. For
            everyone, the realistic thesis is that quantum complements classical computing — same way
            GPUs do today — for a narrow set of structured problems where it actually matters.
          </p>
        </section>
      </div>
    </div>
  );
}
