export function BenchmarksGlossary() {
  const items = [
    {
      term: 'Physical qubits',
      def: 'The raw, noisy qubits in the device. More is generally better, but fidelity matters more than count.',
    },
    {
      term: 'Logical qubits',
      def: 'Error-corrected qubits encoded across many physical qubits. Each costs 100–1000× physical qubits to build, but is orders of magnitude more reliable. The right number to compare for "useful computing."',
    },
    {
      term: '2Q gate fidelity',
      def: 'Probability that a two-qubit gate executes correctly. The single most important metric. At 99%, you can run ~100 gates before random noise dominates. At 99.99%, ~10,000 gates. The FTQC threshold is ~99.9%.',
    },
    {
      term: 'SPAM fidelity',
      def: 'State Preparation And Measurement. Every shot starts with a small probability of being wrong before any computation. SPAM compounds with gate errors.',
    },
    {
      term: 'T1 / T2',
      def: 'Coherence times. T1 = how long the qubit stays in its energy state (relaxation). T2 = how long the quantum phase stays coherent. T2 is usually the binding constraint. Gate time ÷ T2 = how many ops you can run before decoherence ruins your computation.',
    },
    {
      term: 'Gate time',
      def: 'How long a typical gate takes. Faster is better. Superconducting: ~20–100ns. Trapped ion: ~10–300µs (1000× slower but much higher fidelity).',
    },
    {
      term: 'Connectivity',
      def: 'Which qubits can directly interact. All-to-all (trapped ion) needs no SWAP overhead. Heavy-hex / square (superconducting) need extra SWAPs to move information around.',
    },
    {
      term: 'Quantum Volume / CLOPS / #AQ',
      def: 'Composite throughput metrics. IBM has deprecated QV in favor of layer fidelity. CLOPS = circuit layer operations per second (speed only, not quality). IonQ\'s #AQ measures algorithmic qubits via QED-C benchmarks.',
    },
    {
      term: 'Confidence flag',
      def: 'Verified = peer-reviewed paper or vendor spec sheet. Provisional = single-source vendor claim, not independently replicated. Disputed = contested by independent analysis (e.g., Microsoft Majorana 1).',
    },
  ];

  return (
    <details className="card p-5 my-6 group">
      <summary className="cursor-pointer text-sm font-mono uppercase tracking-wider text-accent-quantum font-medium select-none flex justify-between items-center">
        <span>Glossary · what each metric actually means</span>
        <span className="text-text-muted group-open:rotate-180 transition">⌄</span>
      </summary>
      <dl className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
        {items.map((i) => (
          <div key={i.term}>
            <dt className="font-mono text-accent-quantum text-xs uppercase tracking-wider mb-1">{i.term}</dt>
            <dd className="text-text-secondary leading-relaxed">{i.def}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
