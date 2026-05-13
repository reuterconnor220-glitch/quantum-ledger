// /glossary page — masthead-applied design vocabulary.
// DROP-IN for src/app/glossary/page.tsx
//
// A working glossary of the vocabulary the Brief uses. Grouped by initial
// letter, anchor-linked, with editorial translations rather than textbook
// definitions.

import Link from 'next/link';

export const metadata = {
  title: 'Glossary · The Quantum Ledger',
  description:
    'A working glossary of quantum vocabulary, with the editorial translations the Brief uses. Curated for sector readers, not physicists.',
};

export const revalidate = 86400;

interface Entry {
  term: string;
  short: string;
  body: string;
  seeAlso?: string[];
  tag?: 'Hardware' | 'Algorithms' | 'Error Correction' | 'Cryptography' | 'Markets' | 'Policy';
}

const ENTRIES: Entry[] = [
  { term: 'AQ — Algorithmic Qubits', short: 'IonQ\u2019s composite hardware benchmark.', body: 'A hardware benchmark introduced by IonQ that combines qubit count and 2Q fidelity into a single figure of merit. AQ N means the system can run a particular reference circuit on N qubits before noise dominates. Useful as a within-vendor trend; not directly comparable across modalities.', tag: 'Hardware', seeAlso: ['Two-qubit fidelity', 'Quantum volume'] },
  { term: 'Bell pair', short: 'The canonical entangled two-qubit state.', body: 'The simplest non-trivial entangled state. Built from a Hadamard on one qubit followed by a CNOT controlled by the first. Bell-pair generation is the unit operation that turns a quantum circuit into a quantum computation rather than a parallel classical one.', tag: 'Algorithms', seeAlso: ['Entanglement', 'CNOT'] },
  { term: 'CNOT (controlled-NOT)', short: 'The canonical entangling gate.', body: 'A two-qubit gate that flips the target qubit if and only if the control qubit is in the |1\u27e9 state. CNOTs are the entangling gate of the gate-model universal set; native two-qubit gate sets vary by modality (Mølmer\u2013Sørensen on ions, cross-resonance on superconducting), but everything reduces to CNOTs in compiled circuits.', tag: 'Algorithms' },
  { term: 'Coherence time', short: 'How long quantum information survives.', body: 'The characteristic time over which a qubit retains its quantum state before decohering into classical noise. Two numbers usually reported: T₁ (energy relaxation) and T₂ (dephasing). Coherence time × gate speed sets the effective "depth budget" of any quantum circuit before error correction.', tag: 'Hardware' },
  { term: 'DARPA QBI', short: 'The most credible independent technical benchmark.', body: "DARPA's Quantum Benchmarking Initiative. A multi-stage program in which DARPA funds a small ceiling per performer in exchange for the right to independently verify and validate their utility-scale roadmap. Stage B advancement has become the unofficial Series-D-equivalent due-diligence stamp in the cohort.", tag: 'Policy', seeAlso: ['IV&V', 'US2QC'] },
  { term: 'Decoherence', short: 'Why the machine is hard.', body: 'The process by which a qubit\u2019s phase information leaks into the environment, reducing a quantum state to a classical probability distribution. Every component of a quantum stack — cryogenics, shielding, gate calibration, control electronics — is fundamentally engineered against decoherence.', tag: 'Hardware' },
  { term: 'Entanglement', short: 'A multi-qubit correlation with no classical analogue.', body: 'A quantum state of two or more qubits that cannot be written as the product of the individual qubits\u2019 states. Entanglement is the resource every quantum algorithm consumes. It does not transmit signals; it lets many qubits participate in a single computation.', tag: 'Algorithms' },
  { term: 'Fault tolerance (FTQC)', short: 'Running a useful computation despite imperfect parts.', body: 'A regime in which the quantum machine, encoded with error correction, can run computations of arbitrary length without the noise dominating the result. The 2033 DARPA milestone is for "utility-scale" fault tolerance — fault tolerance on a circuit a classical computer cannot match at any cost.', tag: 'Error Correction', seeAlso: ['Logical qubit', 'Surface code'] },
  { term: 'Fidelity (two-qubit)', short: 'How well a coupled rotation lands where you aim.', body: 'A number between 0 and 1 (usually quoted as a percentage) describing how closely an executed gate matches the ideal one. Two-qubit fidelity is the binding constraint on most architectures; 99.9% is the conventional surface-code threshold, 99.99% is the current state of the art.', tag: 'Hardware' },
  { term: 'Grover search', short: 'A quadratic quantum speedup for unstructured search.', body: 'A quantum algorithm that finds a marked item in an unstructured database in roughly √N queries. Quadratic, not exponential — and dependent on a quantum oracle that recognizes the answer. Useful in narrow benchmark settings; less load-bearing in practice than press releases suggest.', tag: 'Algorithms' },
  { term: 'Hadamard gate', short: 'Puts a qubit into superposition.', body: 'A single-qubit gate that maps |0\u27e9 to (|0\u27e9 + |1\u27e9)/\u221a2. The most common entry point into superposition; the first gate in almost every introductory quantum circuit.', tag: 'Algorithms' },
  { term: 'IV&V — Independent Verification & Validation', short: 'A non-vendor evaluates the vendor\u2019s claims.', body: "DARPA's mechanism for adjudicating QBI performer claims. A separate technical team, independent of the performer and not financially exposed to it, evaluates the roadmap and runs the benchmark. The strongest evaluation framework the field has produced.", tag: 'Policy' },
  { term: 'Logical qubit', short: 'A reliable qubit built from many physical qubits.', body: 'A qubit constructed from a redundant code on many physical qubits, error-corrected to a target logical error rate. Quotation of "N logical qubits at error rate p" is the honest reporting unit for fault-tolerant claims; physical-qubit counts alone are not.', tag: 'Error Correction', seeAlso: ['Surface code', 'Fault tolerance (FTQC)'] },
  { term: 'Mølmer–Sørensen (MS) gate', short: 'The native two-qubit gate on trapped ions.', body: "A two-qubit gate on ion-based systems that uses laser pulses to couple the ions' shared motional mode. The fastest path to high-fidelity entangling operations on the trapped-ion platform; the gate behind Quantinuum's and IonQ's headline fidelity numbers.", tag: 'Hardware' },
  { term: 'NIST PQC', short: 'The post-quantum cryptography standards.', body: 'Standards finalized by NIST for cryptographic primitives believed to resist attacks by future quantum computers. The current core is FIPS 203 (ML-KEM, lattice KEM), FIPS 204 (ML-DSA, lattice signature), FIPS 205 (SLH-DSA, hash-based signature), with HQC selected as a code-based KEM hedge in March 2025.', tag: 'Cryptography' },
  { term: 'Neutral atom', short: 'A modality that traps individual atoms with lasers.', body: 'A quantum computing modality in which individual neutral atoms (typically alkalis or alkaline earths) are trapped in optical tweezers and addressed with lasers. Highly parallelisable, geometrically reconfigurable. QuEra, Atom Computing, Pasqal, and Infleqtion are the most-watched names.', tag: 'Hardware' },
  { term: 'P/Rev — Price/Revenue multiple', short: 'How the market prices pre-profit names.', body: 'Equity price divided by trailing-twelve-month revenue. The default valuation lens for pre-profit pure-plays in the quantum cohort. Quantinuum\u2019s S-1 implied 7\u201311\u00d7 is the new structural anchor for the cohort.', tag: 'Markets' },
  { term: 'Photonic (modality)', short: 'A modality that computes with photons.', body: 'A quantum computing modality in which information is encoded in photonic modes (typically dual-rail qubits or GKP-encoded states). Naturally networkable, less mature than superconducting or trapped-ion. PsiQuantum, Xanadu, and Photonic Inc. are the most-funded photonic names.', tag: 'Hardware' },
  { term: 'Quantum advantage', short: 'A computation that classical cannot match.', body: 'The point at which a quantum computer performs a useful computation classical systems cannot reproduce at any reasonable cost. Distinct from "quantum supremacy," which described a contrived benchmark. Quantum advantage on a workload anyone pays for is a 2028\u20132033 milestone, not a today milestone.', tag: 'Algorithms' },
  { term: 'Quantum volume', short: 'IBM\u2019s composite hardware benchmark.', body: 'A figure of merit introduced by IBM that combines qubit count, connectivity, and gate fidelity. Reported as a logarithm. Useful as an apples-to-apples within-platform progress measure; not directly comparable to AQ.', tag: 'Hardware', seeAlso: ['AQ — Algorithmic Qubits'] },
  { term: 'Shor\u2019s algorithm', short: 'Why post-quantum cryptography exists.', body: 'A quantum algorithm that factors integers in polynomial time. The motivation for the entire NIST PQC program. Running Shor at cryptographically relevant scale (RSA-2048) requires roughly 20M physical qubits at current overheads — far beyond the next decade\u2019s hardware roadmap.', tag: 'Cryptography' },
  { term: 'Surface code', short: 'The canonical error-correcting code.', body: 'A topological error-correcting code arranged on a 2D lattice. The default error-correcting code for surface-codable hardware (superconducting, neutral atom, ion). Logical-qubit overhead is large (thousands of physical qubits per logical qubit at threshold).', tag: 'Error Correction' },
  { term: 'Superconducting', short: 'The most-funded modality.', body: 'A quantum computing modality in which qubits are nonlinear superconducting circuits (typically transmons) operated at millikelvin temperatures. The most engineering-mature platform; IBM, Google, Rigetti, IQM are the most-watched names.', tag: 'Hardware' },
  { term: 'Trapped ion', short: 'The cleanest-fidelity modality.', body: 'A quantum computing modality in which individual ions are confined in electromagnetic traps and addressed with lasers. The cleanest 2Q fidelity floors in the cohort; Quantinuum, IonQ, Oxford Ionics are the most-funded names.', tag: 'Hardware' },
  { term: 'US2QC', short: 'DARPA\u2019s Stage C-equivalent program.', body: 'DARPA\u2019s Underexplored Systems for Utility-Scale Quantum Computing program. Microsoft and PsiQuantum advanced from US2QC into the QBI program\u2019s final design-validate phase. Effectively the Stage C-equivalent track that pre-dates QBI Stage C decisions.', tag: 'Policy' },
];

function bucket(term: string) {
  const c = term.replace(/^a\u2014/i, '').replace(/^[^a-zA-Z]+/, '').toUpperCase().charAt(0);
  return /[A-Z]/.test(c) ? c : '#';
}

export default function GlossaryPage() {
  const sorted = [...ENTRIES].sort((a, b) => a.term.localeCompare(b.term));
  const groups: Record<string, Entry[]> = {};
  for (const e of sorted) {
    const k = bucket(e.term);
    (groups[k] ??= []).push(e);
  }
  const letters = Object.keys(groups).sort();

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">Reference</span>
            <span className="text-text-muted/60">·</span>
            <span>Glossary</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            {ENTRIES.length} terms · curated for sector readers
          </div>
          <div className="text-right leading-relaxed">
            New York · Zürich
            <br />
            revised as we add to the lexicon
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.94] tracking-[-0.025em] text-[clamp(40px,7vw,88px)] text-balance">
          A working{' '}
          <em className="not-italic font-normal text-accent-data italic">glossary</em>
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[58ch]">
          Quantum vocabulary with the editorial translation the Brief uses. We do
          not aim for textbook completeness; we aim for working fluency.
        </p>
      </header>

      {/* A-to-Z rail */}
      <section className="mt-10 sticky top-0 z-10 bg-bg/95 backdrop-blur-sm py-3 border-b border-border">
        <div className="flex flex-wrap gap-1.5">
          {letters.map((L) => (
            <a
              key={L}
              href={`#letter-${L}`}
              className="text-[12px] font-mono uppercase tracking-[0.08em] px-2.5 py-1 rounded-full border border-border text-text-secondary hover:text-accent-data hover:border-accent-data transition-colors"
            >
              {L}
            </a>
          ))}
        </div>
      </section>

      {/* Letter sections */}
      {letters.map((L) => (
        <section key={L} id={`letter-${L}`} className="mt-12 scroll-mt-20">
          <div className="mb-6 pb-3 border-b border-text-primary/90 flex items-baseline gap-5">
            <span className="font-display tabular-nums text-[64px] leading-none tracking-[-0.04em] text-text-muted">{L}</span>
            <div>
              <p className="eyebrow mb-1.5">Letter · {L}</p>
              <p className="font-display italic text-text-secondary text-[15px]">{groups[L].length} entries</p>
            </div>
          </div>

          <dl className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border rounded-md overflow-hidden">
            {groups[L].map((e) => (
              <div key={e.term} className="bg-bg-surface p-5">
                <dt className="flex items-baseline justify-between gap-3 mb-2">
                  <span className="font-display text-[20px] tracking-tight text-text-primary leading-tight">{e.term}</span>
                  {e.tag && (
                    <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-text-muted whitespace-nowrap">
                      {e.tag}
                    </span>
                  )}
                </dt>
                <dd>
                  <p className="font-display italic text-[15px] leading-snug text-text-secondary mb-2">{e.short}</p>
                  <p className="text-[13px] text-text-secondary leading-[1.6]">{e.body}</p>
                  {e.seeAlso && e.seeAlso.length > 0 && (
                    <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.08em] text-text-muted">
                      See also:{' '}
                      {e.seeAlso.map((s, i) => (
                        <span key={s}>
                          <span className="text-text-secondary normal-case font-normal not-italic">{s}</span>
                          {i < e.seeAlso!.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      {/* Foot */}
      <section className="mt-16 pt-10 border-t border-border grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
        <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
          <p className="font-display italic text-[20px] leading-snug tracking-tight text-text-primary">
            A glossary is a{' '}
            <span className="text-accent-data not-italic font-medium">translation</span>{' '}
            project. We update it whenever the cohort’s reading list moves the
            meaning of a term.
          </p>
        </div>
        <div className="text-sm text-text-secondary leading-[1.65] max-w-[44ch]">
          <p className="eyebrow mb-2">Related</p>
          <ul className="grid gap-1.5">
            <li><Link href="/learn" className="text-accent-data hover:underline">Primer ›</Link></li>
            <li><Link href="/papers" className="text-accent-data hover:underline">Papers we read ›</Link></li>
            <li><Link href="/ledger-score/methodology" className="text-accent-data hover:underline">Score methodology ›</Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
