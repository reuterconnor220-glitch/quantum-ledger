import Link from 'next/link';
import { BENCHMARKS } from '@/lib/data/benchmarks';
import { getCompany } from '@/lib/data/companies';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Benchmark Scorecard · Live Qubit Counts, Fidelities, Coherence Times',
  description: 'Live quantum hardware benchmark scorecard for every meaningful player — physical and logical qubit counts, gate fidelities, coherence times, gate speeds. Updated as vendors publish.',
};

export const revalidate = 86400;

const MODALITY_LABEL: Record<string, string> = {
  superconducting: 'Superconducting',
  trapped_ion: 'Trapped Ion',
  photonic: 'Photonic',
  neutral_atom: 'Neutral Atom',
  topological: 'Topological',
  silicon_spin: 'Silicon Spin',
  annealing: 'Annealing',
  nv_center: 'NV-Center',
  bosonic: 'Bosonic',
};

function fmtFid(f?: number) {
  if (f === undefined) return '—';
  return `${(f * 100).toFixed(2)}%`;
}

function fmtCoherence(us?: number) {
  if (us === undefined) return '—';
  if (us >= 1e6) return `${(us / 1e6).toFixed(1)}s`;
  if (us >= 1e3) return `${(us / 1e3).toFixed(0)}ms`;
  return `${us.toFixed(0)}µs`;
}

function fmtGate(ns?: number) {
  if (ns === undefined) return '—';
  if (ns >= 1e6) return `${(ns / 1e6).toFixed(0)}ms`;
  if (ns >= 1e3) return `${(ns / 1e3).toFixed(0)}µs`;
  return `${ns}ns`;
}

function fmtNum(n?: number) {
  if (n === undefined) return '—';
  return n.toLocaleString();
}

export default function BenchmarksPage() {
  const byModality = BENCHMARKS.reduce<Record<string, typeof BENCHMARKS>>((acc, b) => {
    if (!acc[b.modality]) acc[b.modality] = [];
    acc[b.modality].push(b);
    return acc;
  }, {});

  const modalityOrder = ['superconducting', 'trapped_ion', 'neutral_atom', 'photonic', 'silicon_spin', 'topological', 'annealing', 'bosonic', 'nv_center'];

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow mb-2">Benchmarks</p>
        <h1 className="font-display text-display-2 font-medium tracking-tight">Live hardware scorecard</h1>
        <p className="mt-4 text-text-secondary leading-relaxed">
          The first <em>continuously-updated</em> public quantum benchmark scorecard. Every meaningful system,
          every dimension that matters — physical qubits, logical qubits, two-qubit gate fidelity, coherence,
          gate speed, connectivity. Numbers sourced directly from peer-reviewed papers, vendor spec sheets,
          and primary press releases.
        </p>
        <p className="mt-4 text-text-secondary leading-relaxed text-sm">
          <span className="inline-flex items-center gap-1.5 mr-3"><span className="qdot bg-accent-data" /> Verified</span>
          <span className="inline-flex items-center gap-1.5 mr-3"><span className="qdot bg-accent-warn" /> Provisional</span>
          <span className="inline-flex items-center gap-1.5"><span className="qdot bg-accent-down" /> Disputed</span>
        </p>
      </header>

      {/* Caveats */}
      <details className="mb-10 border-l-2 border-accent-quantum/40 pl-5 py-1">
        <summary className="cursor-pointer text-xs uppercase tracking-wider text-accent-quantum font-mono font-medium">
          How to read this scorecard
        </summary>
        <div className="mt-3 text-sm text-text-secondary leading-relaxed space-y-2 max-w-3xl">
          <p>
            <strong>Qubit counts</strong> alone are meaningless without fidelity context. A 1,000-qubit machine
            at 99% gate fidelity does less than a 100-qubit machine at 99.99%.
          </p>
          <p>
            <strong>Logical qubits</strong> are not interchangeable — Google&apos;s distance-7 surface-code qubit,
            Quantinuum&apos;s Steane-code qubit, and Quantinuum&apos;s Iceberg-detected qubit are three different
            things with error rates differing by orders of magnitude.
          </p>
          <p>
            <strong>"Best pair" vs "median" 2Q fidelity</strong> — vendors selectively publish hero numbers. We
            note the basis. Always prefer median across the chip.
          </p>
          <p>
            <strong>Microsoft Majorana 1</strong> is flagged disputed: peer reviewers, including <em>Nature</em>
            &apos;s own editorial team, have publicly questioned whether the topological qubit claim is supported
            by the evidence. The underlying 2018 paper was retracted.
          </p>
        </div>
      </details>

      {modalityOrder.map((mod) => {
        const rows = byModality[mod];
        if (!rows || !rows.length) return null;
        return (
          <section key={mod} className="mb-14">
            <h2 className="font-display text-2xl tracking-tight mb-4">{MODALITY_LABEL[mod]}</h2>
            <div className="card overflow-x-auto">
              <table className="ql-table min-w-[1100px]">
                <thead>
                  <tr>
                    <th className="pl-5">System</th>
                    <th className="num">Physical</th>
                    <th className="num">Logical</th>
                    <th className="num">2Q Fid.</th>
                    <th className="num">1Q Fid.</th>
                    <th className="num">SPAM</th>
                    <th className="num">T1</th>
                    <th className="num">T2</th>
                    <th className="num">Gate</th>
                    <th>Connectivity</th>
                    <th className="pr-5">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((b) => {
                    const c = getCompany(b.companySlug);
                    const confDot = b.confidence === 'verified' ? 'bg-accent-data' : b.confidence === 'provisional' ? 'bg-accent-warn' : 'bg-accent-down';
                    return (
                      <tr key={b.systemName}>
                        <td className="pl-5">
                          <div className="flex items-center gap-2">
                            <span className={`qdot ${confDot}`} />
                            <Link
                              href={c ? `/companies/${c.slug}` : '#'}
                              className="font-sans text-text-primary hover:text-accent-quantum font-medium"
                            >
                              {b.systemName}
                            </Link>
                          </div>
                          {b.notes && <div className="text-xs text-text-muted mt-1 font-sans">{b.notes}</div>}
                        </td>
                        <td className="num">{fmtNum(b.physicalQubits)}</td>
                        <td className="num">
                          {b.logicalQubits !== undefined ? (
                            <span title={b.logicalCodeType}>{b.logicalQubits}</span>
                          ) : '—'}
                        </td>
                        <td className="num">
                          {fmtFid(b.twoQFidelity)}
                          {b.twoQFidelityBasis && (
                            <span className="text-xs text-text-muted ml-1">
                              {b.twoQFidelityBasis === 'best_pair' ? '(best)' : '(med)'}
                            </span>
                          )}
                        </td>
                        <td className="num">{fmtFid(b.singleQFidelity)}</td>
                        <td className="num">{fmtFid(b.spamFidelity)}</td>
                        <td className="num">{fmtCoherence(b.t1Us)}</td>
                        <td className="num">{fmtCoherence(b.t2Us)}</td>
                        <td className="num">{fmtGate(b.gateTimeNs)}</td>
                        <td className="text-text-secondary text-xs font-sans">{b.connectivity ?? '—'}</td>
                        <td className="pr-5 text-xs">
                          {b.sourceUrl ? (
                            <a href={b.sourceUrl} target="_blank" rel="noreferrer" className="text-accent-quantum hover:underline">
                              link
                            </a>
                          ) : (
                            <span className="text-text-muted">{formatDate(b.lastVerifiedDate)}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      {/* Rankings */}
      <section className="mt-16">
        <h2 className="font-display text-2xl tracking-tight mb-6">Rankings by dimension</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Ranking
            title="Highest 2Q Gate Fidelity"
            entries={[...BENCHMARKS]
              .filter((b) => b.twoQFidelity !== undefined && b.confidence !== 'disputed')
              .sort((a, b) => (b.twoQFidelity! - a.twoQFidelity!))
              .slice(0, 6)
              .map((b) => ({ label: b.systemName, value: fmtFid(b.twoQFidelity) }))}
          />
          <Ranking
            title="Highest Physical Qubit Count"
            entries={[...BENCHMARKS]
              .filter((b) => b.physicalQubits !== undefined && b.modality !== 'annealing')
              .sort((a, b) => (b.physicalQubits! - a.physicalQubits!))
              .slice(0, 6)
              .map((b) => ({ label: b.systemName, value: fmtNum(b.physicalQubits) }))}
          />
          <Ranking
            title="Most Logical Qubits"
            entries={[...BENCHMARKS]
              .filter((b) => b.logicalQubits !== undefined)
              .sort((a, b) => (b.logicalQubits! - a.logicalQubits!))
              .slice(0, 6)
              .map((b) => ({ label: b.systemName, value: b.logicalQubits!.toString() }))}
          />
          <Ranking
            title="Longest Coherence (T2)"
            entries={[...BENCHMARKS]
              .filter((b) => b.t2Us !== undefined)
              .sort((a, b) => (b.t2Us! - a.t2Us!))
              .slice(0, 6)
              .map((b) => ({ label: b.systemName, value: fmtCoherence(b.t2Us) }))}
          />
          <Ranking
            title="Fastest Gates"
            entries={[...BENCHMARKS]
              .filter((b) => b.gateTimeNs !== undefined)
              .sort((a, b) => (a.gateTimeNs! - b.gateTimeNs!))
              .slice(0, 6)
              .map((b) => ({ label: b.systemName, value: fmtGate(b.gateTimeNs) }))}
          />
          <Ranking
            title="Throughput (CLOPS)"
            entries={[...BENCHMARKS]
              .filter((b) => b.clops !== undefined)
              .sort((a, b) => (b.clops! - a.clops!))
              .map((b) => ({ label: b.systemName, value: fmtNum(b.clops) }))}
          />
        </div>
      </section>

      <p className="mt-12 text-xs text-text-muted leading-relaxed max-w-3xl">
        Source citations link directly to peer-reviewed papers and primary vendor disclosures.
        See <Link href="/methodology" className="text-accent-quantum hover:underline">methodology</Link> for
        confidence-flag definitions and the contested-numbers explainer.
      </p>
    </div>
  );
}

function Ranking({ title, entries }: { title: string; entries: { label: string; value: string }[] }) {
  return (
    <div className="card p-5">
      <p className="eyebrow mb-3">{title}</p>
      <ol className="space-y-2 text-sm">
        {entries.map((e, i) => (
          <li key={i} className="flex justify-between gap-2">
            <span className="text-text-secondary truncate" title={e.label}>
              {i + 1}. {e.label}
            </span>
            <span className="font-mono text-text-primary tabular-nums">{e.value}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
