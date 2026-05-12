import { RISKS } from '@/lib/data/risks';
import Link from 'next/link';

export const metadata = {
  title: 'Risks · The Dangers & Tradeoffs of Quantum Computing',
  description: 'Ten serious risks of quantum computing — harvest-now-decrypt-later, geopolitical asymmetry, capital misallocation, hyperscaler centralization. Honest impact-vs-likelihood assessment.',
};

const CATEGORY_COLOR: Record<string, string> = {
  security: 'bg-red-500/15 text-red-700 border-red-500/30',
  geopolitical: 'bg-amber-500/15 text-amber-700 border-amber-500/30',
  financial: 'bg-yellow-500/15 text-yellow-700 border-yellow-500/30',
  societal: 'bg-blue-500/15 text-blue-700 border-blue-500/30',
  technical: 'bg-violet-500/15 text-violet-700 border-violet-500/30',
};

const CATEGORY_LABEL: Record<string, string> = {
  security: 'Security',
  geopolitical: 'Geopolitical',
  financial: 'Financial',
  societal: 'Societal',
  technical: 'Technical',
};

export const revalidate = 86400;

export default function RisksPage() {
  // Sort by impact * likelihood descending
  const sorted = [...RISKS].sort((a, b) => (b.impact * b.likelihood) - (a.impact * a.likelihood));

  return (
    <div className="editorial min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <header className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-quantum font-mono mb-3">Risks</p>
          <h1 className="font-display text-5xl font-medium tracking-tight leading-tight">
            The other side · risks &amp; tradeoffs
          </h1>
          <p className="mt-5 text-lg text-editorial-ink/75 leading-relaxed">
            Quantum computing is not unambiguously good. It enables drug discovery <em>and</em> breaks the
            cryptography protecting your bank account. It creates intelligence asymmetries between nations.
            It risks a hype-driven capital bubble. Below: ten serious risks scored on impact and likelihood.
          </p>
          <p className="mt-3 text-sm text-editorial-ink/60 leading-relaxed">
            See also: <Link href="/learn/applications" className="text-accent-quantum hover:underline">the applications page</Link> {' '}
            for the upside of these same technologies.
          </p>
        </header>

        {/* Impact × Likelihood matrix */}
        <section className="mb-14">
          <h2 className="font-display text-2xl tracking-tight mb-4">Impact × likelihood matrix</h2>
          <p className="text-sm text-editorial-ink/70 mb-6 max-w-3xl">
            Each cell shows the number of identified risks at that impact/likelihood combination. Bigger
            numbers + darker color = more risks at that severity. Detailed risks ordered by combined
            score below.
          </p>
          <RiskMatrix />
        </section>

        {/* Risks ordered */}
        <section>
          <h2 className="font-display text-2xl tracking-tight mb-6">Risks · sorted by severity</h2>
          <div className="space-y-5">
            {sorted.map((r, idx) => (
              <article key={r.slug} className="bg-white border border-editorial-ink/10 rounded-md p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="font-mono text-xs text-editorial-ink/50">#{idx + 1}</span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm border ${CATEGORY_COLOR[r.category]}`}>
                        {CATEGORY_LABEL[r.category]}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-editorial-ink/50">
                        {r.timeline}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-medium tracking-tight">{r.title}</h3>
                  </div>
                  <div className="flex gap-4">
                    <Score label="Impact" value={r.impact} colorClass="bg-red-500" />
                    <Score label="Likelihood" value={r.likelihood} colorClass="bg-amber-500" />
                  </div>
                </div>

                <p className="text-[15px] leading-relaxed text-editorial-ink/85 mb-4">{r.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono mb-1">Who bears it</p>
                    <p className="text-sm text-editorial-ink/80 leading-relaxed">{r.whoBears}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono mb-1">Watch signal</p>
                    <p className="text-sm text-editorial-ink/80 leading-relaxed">{r.watchSignal}</p>
                  </div>
                </div>

                <div className="border-t border-editorial-ink/5 pt-4">
                  <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-mono mb-2">Mitigations</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    {r.mitigations.map((m, i) => (
                      <li key={i} className="text-editorial-ink/80 leading-relaxed">· {m}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <hr className="my-12 border-editorial-ink/15" />

        <section className="prose-editorial">
          <h2>The honest framing</h2>
          <p>
            Two risks stand out: <strong>harvest-now-decrypt-later</strong> (already happening, the most
            certain near-term threat) and <strong>geopolitical asymmetry</strong> (lower likelihood but
            highest impact if it materializes). Everything else is secondary.
          </p>
          <p>
            For individuals and companies, the practical takeaway is simple: <strong>migrate to
            post-quantum cryptography now</strong>. NIST standardized ML-KEM, ML-DSA, and SLH-DSA in
            August 2024. Every secret you encrypt today with RSA or ECC that needs to remain secret in
            2032 should be re-encrypted with post-quantum algorithms before then. Cloudflare took 52% of
            human web traffic to hybrid ML-KEM by December 2025. Apple deployed PQ3 across iMessage.
            This is real, mainstream, and overdue.
          </p>
          <p>
            For investors, the honest framing is that this sector is in a real research-funded boom that
            could either deliver transformative value by 2030+ or burn $50B+ of cumulative capital with
            modest returns. Position accordingly.
          </p>
        </section>
      </div>
    </div>
  );
}

function Score({ label, value, colorClass }: { label: string; value: number; colorClass: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono mb-1">{label}</p>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`w-2 h-5 rounded-xs ${n <= value ? colorClass : 'bg-editorial-ink/10'}`}
          />
        ))}
      </div>
      <p className="text-xs font-mono text-editorial-ink/70 mt-1">{value}/5</p>
    </div>
  );
}

function RiskMatrix() {
  // Build a 5x5 grid of risk counts
  const grid: Record<string, typeof RISKS> = {};
  for (let i = 1; i <= 5; i++) {
    for (let l = 1; l <= 5; l++) {
      grid[`${i}-${l}`] = [];
    }
  }
  RISKS.forEach((r) => {
    const key = `${r.impact}-${r.likelihood}`;
    grid[key].push(r);
  });

  return (
    <div className="bg-white border border-editorial-ink/10 rounded-md p-6 overflow-x-auto">
      <div className="min-w-[500px]">
        <div className="flex">
          <div className="w-20 flex-shrink-0" />
          <div className="flex-1 text-center text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono pb-2">
            ← Likelihood →
          </div>
        </div>
        <div className="flex">
          <div className="w-20 flex-shrink-0 flex items-center justify-center">
            <div className="text-[10px] uppercase tracking-wider text-editorial-ink/50 font-mono -rotate-90 whitespace-nowrap">
              ← Impact →
            </div>
          </div>
          <div className="flex-1">
            {/* Headers row */}
            <div className="grid grid-cols-5 gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((l) => (
                <div key={l} className="text-center text-xs font-mono text-editorial-ink/40">
                  {l}
                </div>
              ))}
            </div>
            {/* Grid rows — impact 5 at top */}
            {[5, 4, 3, 2, 1].map((i) => (
              <div key={i} className="grid grid-cols-5 gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((l) => {
                  const cell = grid[`${i}-${l}`];
                  const intensity = Math.min(1, cell.length * 0.45);
                  return (
                    <div
                      key={l}
                      className="aspect-square rounded-sm border border-editorial-ink/5 flex items-center justify-center relative group"
                      style={{
                        backgroundColor: cell.length
                          ? `rgba(${i >= 4 ? '239,68,68' : i >= 3 ? '245,158,11' : '59,130,246'}, ${intensity})`
                          : 'rgba(0,0,0,0.02)',
                      }}
                    >
                      {cell.length > 0 && (
                        <>
                          <span className="font-mono text-sm font-medium text-editorial-ink/90">
                            {cell.length}
                          </span>
                          <div className="absolute z-20 hidden group-hover:block bottom-full mb-1 left-1/2 -translate-x-1/2 bg-editorial-ink text-editorial-cream text-xs rounded-sm px-2 py-1.5 whitespace-nowrap shadow-lg">
                            {cell.map((r) => r.title).join(' · ')}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-editorial-ink/50 font-mono mt-3 text-center">
          Hover cells to see specific risks
        </p>
      </div>
    </div>
  );
}
