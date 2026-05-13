import type { Benchmark } from '@/lib/data/benchmarks';
import { getCompany } from '@/lib/data/companies';
import Link from 'next/link';

/**
 * Distance-to-fault-tolerance tracker.
 * For each system, we score how far it is from "useful fault-tolerant quantum computing"
 * along two axes:
 *   1. Logical qubits demonstrated vs ~100 needed
 *   2. 2Q gate fidelity vs ~99.99% threshold
 * Display as a journey: Physical → Logical demo → Break-even → 100 logical
 */

interface Milestone {
  label: string;
  reached: boolean;
  notes?: string;
}

function ftqcMilestones(b: Benchmark): Milestone[] {
  return [
    {
      label: 'Working system',
      reached: !!(b.physicalQubits && b.physicalQubits > 0),
      notes: b.physicalQubits ? `${b.physicalQubits} physical qubits` : undefined,
    },
    {
      label: '99.9% 2Q fidelity',
      reached: !!(b.twoQFidelity && b.twoQFidelity >= 0.999),
      notes: b.twoQFidelity ? `${(b.twoQFidelity * 100).toFixed(2)}%` : undefined,
    },
    {
      label: 'Logical qubit demo',
      reached: !!(b.logicalQubits && b.logicalQubits >= 1),
      notes: b.logicalQubits ? `${b.logicalQubits} logical demo'd` : undefined,
    },
    {
      label: 'Break-even QEC',
      reached: !!(
        b.logicalQubits &&
        b.logicalQubits >= 1 &&
        b.logicalCodeType &&
        (b.logicalCodeType.toLowerCase().includes('below') ||
          b.logicalCodeType.toLowerCase().includes('break') ||
          b.logicalCodeType.toLowerCase().includes('steane') ||
          b.logicalCodeType.toLowerCase().includes('ft'))
      ),
      notes: b.logicalCodeType,
    },
    {
      label: '~100 logical qubits',
      reached: !!(b.logicalQubits && b.logicalQubits >= 100),
    },
    {
      label: 'Cryptographically useful',
      reached: false,
      notes: 'requires ~thousands of logical qubits',
    },
  ];
}

function ftqcScore(b: Benchmark): number {
  const ms = ftqcMilestones(b);
  return ms.filter((m) => m.reached).length;
}

export function FtqcTracker({ benchmarks }: { benchmarks: Benchmark[] }) {
  // Filter to most-mature systems with at least some logical qubit progress OR very high fidelity
  const candidates = benchmarks
    .filter((b) => b.confidence !== 'disputed')
    .filter((b) => (b.logicalQubits ?? 0) >= 1 || (b.twoQFidelity ?? 0) >= 0.999)
    .sort((a, b) => ftqcScore(b) - ftqcScore(a) || (b.logicalQubits ?? 0) - (a.logicalQubits ?? 0))
    .slice(0, 8);

  return (
    <div className="card p-5">
      <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-3xl">
        The journey from a working quantum system to one that actually breaks RSA or runs full
        chemistry calculations. Each gate below must be cleared. No system has cleared all six —
        but the leaders have cleared four.
      </p>

      <div className="space-y-4">
        {candidates.map((b) => {
          const milestones = ftqcMilestones(b);
          const score = milestones.filter((m) => m.reached).length;
          const company = getCompany(b.companySlug);
          return (
            <div key={b.systemName} className="border-t border-border-muted pt-4 first:border-t-0 first:pt-0">
              <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                <div>
                  <Link
                    href={company ? `/companies/${company.slug}` : '#'}
                    className="font-sans font-medium text-text-primary hover:text-accent-quantum"
                  >
                    {b.systemName}
                  </Link>
                  <p className="text-xs text-text-muted font-mono mt-0.5">
                    {b.modality.replace('_', ' ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">Progress</p>
                  <p className="font-mono text-lg text-text-primary">
                    {score}<span className="text-text-muted text-sm">/{milestones.length}</span>
                  </p>
                </div>
              </div>

              {/* Milestone track */}
              <ol className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
                {milestones.map((m, i) => (
                  <li key={i} className="relative">
                    <div
                      className={`rounded-sm border p-2 text-center ${
                        m.reached
                          ? 'bg-accent-quantum/15 border-accent-quantum/40'
                          : 'bg-bg border-border border-dashed'
                      }`}
                    >
                      <p
                        className={`text-[10px] uppercase tracking-wider font-mono ${
                          m.reached ? 'text-accent-quantum' : 'text-text-muted'
                        }`}
                      >
                        {m.reached ? '✓' : i + 1}
                      </p>
                      <p className={`text-[11px] mt-0.5 leading-tight ${m.reached ? 'text-text-primary' : 'text-text-muted'}`}>
                        {m.label}
                      </p>
                      {m.notes && (
                        <p className="text-[10px] mt-0.5 text-text-muted font-mono truncate" title={m.notes}>
                          {m.notes}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-text-muted leading-relaxed">
        Even the leading systems (Quantinuum Helios, Atom Computing Phoenix, Google Willow) sit at
        ~4/6. The two remaining gates — 100 logical qubits, then cryptographically useful scale —
        are the difference between today and ~2030. Real fault tolerance is closer than the headlines
        suggest, but still meaningfully out.
      </p>
    </div>
  );
}
