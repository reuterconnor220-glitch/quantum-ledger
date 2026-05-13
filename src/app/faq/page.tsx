import Link from 'next/link';
import { FAQLd } from '@/components/JsonLd';

export const metadata = {
  title: 'FAQ · Quantum Computing Questions, Honestly Answered',
  description: 'Honest answers to the most common questions about quantum computing — when will it be useful, will it break encryption, do I need to worry, what are the real applications.',
};

// FAQ content used both for rendering and JSON-LD structured data (AI citation surface)
const FAQS = [
  {
    question: 'What is quantum computing in plain language?',
    answer:
      'A quantum computer is a specialist coprocessor — like a GPU, but built on the rules of quantum mechanics rather than classical electronics. It is not faster at everything. It is dramatically faster at a small set of problems: factoring large numbers, simulating molecules, certain kinds of search and optimization. You will never own one personally; you will call them from the cloud the same way you call a GPU today.',
  },
  {
    question: 'When will quantum computers actually be useful?',
    answer:
      'For chemistry and materials simulation: 2028–2032 is the credible window for first commercial advantage. For optimization: parts already work today on D-Wave annealers. For machine learning: highly speculative — no demonstrated quantum advantage on real ML benchmarks exists. For breaking RSA at scale: 2030+ and uncertain. Anyone promising "universal fault-tolerance by 2030" is selling a roadmap, not a product.',
  },
  {
    question: 'Will quantum computers break all encryption?',
    answer:
      'Eventually, yes — RSA and elliptic-curve cryptography (the math behind most internet security) fall to Shor\'s algorithm. But you need millions of physical qubits or thousands of logical ones, which puts this firmly in the 2030+ window. NIST already standardized post-quantum cryptography (PQC) replacements in August 2024 — ML-KEM, ML-DSA, SLH-DSA. Apple iMessage and Cloudflare have already deployed them. Symmetric crypto (AES-256) survives quantum largely intact.',
  },
  {
    question: 'What is "harvest now, decrypt later"?',
    answer:
      'Adversaries — state and non-state — are actively collecting encrypted traffic today, with the expectation of decrypting it once a cryptographically-relevant quantum computer exists. Anything you encrypt with RSA or ECC today and that needs to remain secret for 10+ years is at risk. This is the most urgent quantum-related security threat and the main driver behind federal PQC migration mandates.',
  },
  {
    question: 'What\'s the difference between physical and logical qubits?',
    answer:
      'Physical qubits are the raw, noisy qubits inside a device. Logical qubits are error-corrected qubits encoded across many physical qubits — usually hundreds to thousands of physical qubits per logical qubit. Logical qubits are orders of magnitude more reliable, and they\'re the unit you need for useful computing. When you read "Google Willow has 105 qubits" that means physical. The 2024–2025 milestone of "first below-threshold logical qubit" was a much smaller machine doing something much more impressive.',
  },
  {
    question: 'Which company is winning?',
    answer:
      'It depends on the metric. IBM leads on installed base and ecosystem (the most credible roadmap). Google leads on quantum error correction physics (Willow). Quantinuum leads on fidelity and logical qubits (Helios at 48 logical, 99.99% SPAM). IonQ leads on public-market commercial revenue ($187M TTM). PsiQuantum has the biggest sovereign-funded bet but no intermediate machine to show. The leaders cluster, no single winner is decided.',
  },
  {
    question: 'How do I invest in quantum?',
    answer:
      'Public pure-plays: IONQ, RGTI, QBTS, QUBT, ARQQ, XNDU, INFQ. Plus diversified parents IBM, GOOGL, MSFT, HON (Honeywell owns ~54% of Quantinuum pre-IPO). Caveat: combined market cap of public pure-plays is ~$40B against ~$200M combined revenue — these are growth-and-narrative investments, not earnings investments. IonQ alone accounts for >85% of pure-play revenue. Quantinuum\'s pending IPO under ticker QNT is the most-watched 2026 event.',
  },
  {
    question: 'Will quantum computers replace classical computers?',
    answer:
      'No. They\'re complements, not replacements — same way GPUs complement CPUs without replacing them. Quantum computers only outperform classical for problems with specific mathematical structure (factoring, quantum simulation, certain searches). Your laptop, the cloud, and the world\'s data centers stay overwhelmingly classical.',
  },
  {
    question: 'What about quantum AI?',
    answer:
      'Mostly hype, today. There are real but narrow theoretical quantum machine learning results. No demonstrated quantum advantage on real-world ML benchmarks exists. The honest near-term story is: classical AI orchestrating quantum subroutines for specific kernels (chemistry, optimization), not "quantum AI takes over the world." Be highly skeptical of marketing that combines the words "AI" and "quantum" without specifics.',
  },
  {
    question: 'What is DARPA QBI?',
    answer:
      'DARPA\'s Quantum Benchmarking Initiative is the most credible independent technical audit in the quantum industry. Eleven companies advanced to Stage B in November 2025 (Atom Computing, Diraq, IBM, IonQ, Nord Quantique, Photonic Inc., Quantinuum, Quantum Motion, QuEra, Silicon Quantum Computing, Xanadu) plus two in the parallel US2QC final phase (PsiQuantum, Microsoft). Stage C advancement decisions in Q4 2026 are the single most important industry catalyst this year.',
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      <FAQLd items={FAQS} />
      <header className="mb-10">
        <p className="eyebrow mb-2">FAQ</p>
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
          Common questions, honestly answered
        </h1>
        <p className="mt-4 text-text-secondary leading-relaxed">
          Ten questions almost everyone asks about quantum computing. Answers calibrated to what we
          actually know in May 2026, with timelines that hold up under scrutiny.
        </p>
      </header>

      <div className="space-y-6">
        {FAQS.map((f, i) => (
          <article key={i} className="card p-6">
            <h2 className="font-display text-xl tracking-tight text-text-primary mb-2">
              {f.question}
            </h2>
            <p className="text-text-secondary leading-relaxed">{f.answer}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-text-secondary">
        Want more depth? Read{' '}
        <Link href="/learn" className="text-accent-quantum hover:underline">
          the primer
        </Link>
        , see{' '}
        <Link href="/learn/applications" className="text-accent-quantum hover:underline">
          where quantum will matter
        </Link>
        , or read{' '}
        <Link href="/learn/risks" className="text-accent-quantum hover:underline">
          the risks
        </Link>
        .
      </p>
    </div>
  );
}
