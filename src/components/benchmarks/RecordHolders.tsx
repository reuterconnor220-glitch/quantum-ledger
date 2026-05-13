import type { Benchmark } from '@/lib/data/benchmarks';

interface Record_ {
  label: string;
  description: string;
  value: string;
  systemName: string;
  modality: string;
  highlightColor: string;
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

export function RecordHolders({ benchmarks }: { benchmarks: Benchmark[] }) {
  const undisputed = benchmarks.filter((b) => b.confidence !== 'disputed');

  const records: Record_[] = [];

  // Most physical qubits (excluding annealing — it's a different game)
  const qubitLeader = [...undisputed]
    .filter((b) => b.modality !== 'annealing' && b.physicalQubits)
    .sort((a, b) => (b.physicalQubits ?? 0) - (a.physicalQubits ?? 0))[0];
  if (qubitLeader) {
    records.push({
      label: 'Most physical qubits',
      description: 'gate-based',
      value: qubitLeader.physicalQubits!.toLocaleString(),
      systemName: qubitLeader.systemName,
      modality: qubitLeader.modality,
      highlightColor: 'text-accent-quantum',
    });
  }

  // Best 2Q fidelity
  const fidLeader = [...undisputed]
    .filter((b) => b.twoQFidelity)
    .sort((a, b) => (b.twoQFidelity ?? 0) - (a.twoQFidelity ?? 0))[0];
  if (fidLeader) {
    records.push({
      label: 'Highest 2Q fidelity',
      description: 'two-qubit gate',
      value: `${(fidLeader.twoQFidelity! * 100).toFixed(2)}%`,
      systemName: fidLeader.systemName,
      modality: fidLeader.modality,
      highlightColor: 'text-accent-data',
    });
  }

  // Most logical qubits
  const logLeader = [...undisputed]
    .filter((b) => b.logicalQubits)
    .sort((a, b) => (b.logicalQubits ?? 0) - (a.logicalQubits ?? 0))[0];
  if (logLeader) {
    records.push({
      label: 'Most logical qubits',
      description: 'demonstrated',
      value: logLeader.logicalQubits!.toLocaleString(),
      systemName: logLeader.systemName,
      modality: logLeader.modality,
      highlightColor: 'text-accent-quantum',
    });
  }

  // Longest coherence (T2)
  const cohLeader = [...undisputed]
    .filter((b) => b.t2Us)
    .sort((a, b) => (b.t2Us ?? 0) - (a.t2Us ?? 0))[0];
  if (cohLeader) {
    records.push({
      label: 'Longest coherence',
      description: 'T2 — phase stability',
      value: fmtCoherence(cohLeader.t2Us),
      systemName: cohLeader.systemName,
      modality: cohLeader.modality,
      highlightColor: 'text-accent-data',
    });
  }

  // Fastest gates
  const gateLeader = [...undisputed]
    .filter((b) => b.gateTimeNs)
    .sort((a, b) => (a.gateTimeNs ?? Infinity) - (b.gateTimeNs ?? Infinity))[0];
  if (gateLeader) {
    records.push({
      label: 'Fastest gates',
      description: 'shorter is better',
      value: fmtGate(gateLeader.gateTimeNs),
      systemName: gateLeader.systemName,
      modality: gateLeader.modality,
      highlightColor: 'text-accent-warn',
    });
  }

  // Highest throughput (CLOPS)
  const throughputLeader = [...undisputed]
    .filter((b) => b.clops)
    .sort((a, b) => (b.clops ?? 0) - (a.clops ?? 0))[0];
  if (throughputLeader) {
    records.push({
      label: 'Highest throughput',
      description: 'CLOPS · IBM only',
      value: `${(throughputLeader.clops! / 1000).toFixed(0)}K`,
      systemName: throughputLeader.systemName,
      modality: throughputLeader.modality,
      highlightColor: 'text-accent-warn',
    });
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border rounded-md overflow-hidden">
      {records.map((r) => (
        <div key={r.label} className="bg-bg-surface p-4">
          <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono mb-1">
            {r.label}
          </p>
          <p className={`font-mono text-2xl ${r.highlightColor}`}>{r.value}</p>
          <p className="text-[10px] text-text-muted mt-0.5">{r.description}</p>
          <p className="mt-2 text-xs text-text-secondary leading-tight truncate" title={r.systemName}>
            {r.systemName}
          </p>
        </div>
      ))}
    </div>
  );
}
