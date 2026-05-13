import type { Benchmark } from '@/lib/data/benchmarks';

const MODALITY_LABEL: Record<string, string> = {
  superconducting: 'Superconducting',
  trapped_ion: 'Trapped Ion',
  neutral_atom: 'Neutral Atom',
  photonic: 'Photonic',
  silicon_spin: 'Silicon Spin',
  topological: 'Topological',
  annealing: 'Annealing',
  nv_center: 'NV-Center',
  bosonic: 'Bosonic',
};

function fmtFid(f?: number) {
  return f === undefined ? '—' : `${(f * 100).toFixed(2)}%`;
}

function fmtCoherence(us?: number) {
  if (us === undefined) return '—';
  if (us >= 1e6) return `${(us / 1e6).toFixed(1)}s`;
  if (us >= 1e3) return `${(us / 1e3).toFixed(0)}ms`;
  return `${us.toFixed(0)}µs`;
}

/**
 * Per-modality leaderboard — for each modality, show the single best system on each metric.
 * Helps the reader see who the "champion" is for each tech path.
 */
export function ModalityLeaderboard({ benchmarks }: { benchmarks: Benchmark[] }) {
  const undisputed = benchmarks.filter((b) => b.confidence !== 'disputed');
  const byModality = undisputed.reduce<Record<string, Benchmark[]>>((acc, b) => {
    (acc[b.modality] ||= []).push(b);
    return acc;
  }, {});

  const ranking = Object.entries(byModality).map(([m, list]) => {
    const mostQubits = [...list].sort((a, b) => (b.physicalQubits ?? 0) - (a.physicalQubits ?? 0))[0];
    const bestFid = [...list].sort((a, b) => (b.twoQFidelity ?? 0) - (a.twoQFidelity ?? 0))[0];
    const mostLogical = [...list].sort((a, b) => (b.logicalQubits ?? 0) - (a.logicalQubits ?? 0))[0];
    const longestCoh = [...list].sort((a, b) => (b.t2Us ?? 0) - (a.t2Us ?? 0))[0];
    return {
      modality: m,
      mostQubits,
      bestFid,
      mostLogical,
      longestCoh,
    };
  });

  return (
    <div className="card overflow-x-auto">
      <table className="ql-table min-w-[800px]">
        <thead>
          <tr>
            <th className="pl-5">Modality</th>
            <th>Most physical qubits</th>
            <th>Highest 2Q fidelity</th>
            <th>Most logical qubits</th>
            <th className="pr-5">Longest T2 coherence</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((r) => (
            <tr key={r.modality}>
              <td className="pl-5 font-sans text-text-primary font-medium">{MODALITY_LABEL[r.modality]}</td>
              <td className="font-sans text-xs">
                <div className="text-text-primary">{r.mostQubits.physicalQubits?.toLocaleString() ?? '—'}</div>
                <div className="text-text-muted text-[10px] truncate max-w-[200px]" title={r.mostQubits.systemName}>
                  {r.mostQubits.systemName}
                </div>
              </td>
              <td className="font-sans text-xs">
                <div className="text-text-primary">{fmtFid(r.bestFid.twoQFidelity)}</div>
                <div className="text-text-muted text-[10px] truncate max-w-[200px]" title={r.bestFid.systemName}>
                  {r.bestFid.systemName}
                </div>
              </td>
              <td className="font-sans text-xs">
                <div className="text-text-primary">{r.mostLogical.logicalQubits ?? '—'}</div>
                <div className="text-text-muted text-[10px] truncate max-w-[200px]" title={r.mostLogical.systemName}>
                  {r.mostLogical.logicalQubits ? r.mostLogical.systemName : '—'}
                </div>
              </td>
              <td className="pr-5 font-sans text-xs">
                <div className="text-text-primary">{fmtCoherence(r.longestCoh.t2Us)}</div>
                <div className="text-text-muted text-[10px] truncate max-w-[200px]" title={r.longestCoh.systemName}>
                  {r.longestCoh.t2Us ? r.longestCoh.systemName : '—'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
