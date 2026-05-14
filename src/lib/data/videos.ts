/**
 * Curated YouTube video recommendations per Learn topic.
 *
 * Selection bar: must be from a credible educator (3Blue1Brown, Veritasium,
 * Looking Glass Universe, MinutePhysics, Royal Institution, PBS Space Time,
 * IBM Qiskit, Microsoft Research, etc.) and pedagogically sound.
 *
 * Each topic surfaces 2-3 picks with the "if you only watch one" tagged.
 */

export type LearnTopic =
  | 'qubit'
  | 'entanglement'
  | 'circuits'
  | 'grover'
  | 'interference'
  | 'double-slit'
  | 'bell-test'
  | 'bb84';

export interface Video {
  title: string;
  channel: string;
  url: string;
  lengthMin: number;
  pitch: string;
  definitive?: boolean;
  ifYouOnlyWatchOne?: boolean;
}

export const VIDEOS: Record<LearnTopic, Video[]> = {
  qubit: [
    {
      title: 'Some light quantum mechanics (with MinutePhysics)',
      channel: '3Blue1Brown',
      url: 'https://www.youtube.com/watch?v=MzRCDLre1b4',
      lengthMin: 22,
      pitch: "Grant Sanderson builds qubit state vectors from polarized light — the cleanest intuition for why a qubit lives on a sphere rather than a line.",
      ifYouOnlyWatchOne: true,
    },
    {
      title: 'Bloch Sphere · Visualizing Qubits and Spin',
      channel: 'Professor M does Science',
      url: 'https://www.youtube.com/watch?v=AYGHS9hXgyw',
      lengthMin: 15,
      pitch: 'A Cambridge physicist walks through the geometry rigorously — best second watch after the 3B1B intuition lands.',
    },
    {
      title: 'Quantum Spin — The Bloch Sphere',
      channel: 'ZAP Physics',
      url: 'https://www.youtube.com/watch?v=10qvMocHFZg',
      lengthMin: 12,
      pitch: 'Connects spin-1/2 to the Bloch sphere directly — the cleanest physical picture of what a qubit actually is in hardware.',
    },
  ],

  entanglement: [
    {
      title: "Bell's Theorem · The Quantum Venn Diagram Paradox",
      channel: 'MinutePhysics (with 3Blue1Brown)',
      url: 'https://www.youtube.com/watch?v=zcqZHYo7ONs',
      lengthMin: 10,
      pitch: 'The single most-recommended entanglement explainer on the internet. Uses polarizer filters to show why no local hidden-variable theory can reproduce quantum correlations.',
      definitive: true,
      ifYouOnlyWatchOne: true,
    },
    {
      title: 'Quantum Entanglement & Spooky Action at a Distance',
      channel: 'Veritasium',
      url: 'https://www.youtube.com/watch?v=ZuvK-od647c',
      lengthMin: 7,
      pitch: "Derek Muller's tightest explanation of why entanglement is weird without overclaiming faster-than-light communication.",
    },
    {
      title: 'There Is Something Faster Than Light',
      channel: 'Veritasium',
      url: 'https://www.youtube.com/watch?v=WMl0Pl75pnM',
      lengthMin: 22,
      pitch: "Handles the 'but you can't actually send information' point that almost every other video bungles.",
    },
  ],

  circuits: [
    {
      title: 'Quantum Computing for Computer Scientists',
      channel: 'Microsoft Research',
      url: 'https://www.youtube.com/watch?v=F_Riqjdh2oM',
      lengthMin: 88,
      pitch: 'Andrew Helwer\'s lecture — the de facto reference for engineers learning circuits. Hadamard, CNOT, Bell state construction, measurement, all from a CS-first perspective. Long but worth every minute.',
      ifYouOnlyWatchOne: true,
    },
    {
      title: 'Coding with Qiskit — Quantum Circuits and Hello World',
      channel: 'Qiskit (IBM)',
      url: 'https://www.youtube.com/watch?v=a1NZC5rqQD8',
      lengthMin: 10,
      pitch: 'The shortest path from "what is a gate" to "I built a Bell state on real hardware." Pedagogically tight.',
    },
    {
      title: 'The Map of Quantum Computing',
      channel: 'Domain of Science',
      url: 'https://www.youtube.com/watch?v=-UlxHPIEVqA',
      lengthMin: 33,
      pitch: "Dominic Walliman's visual taxonomy of where gates fit in the bigger landscape — best 'I want to see the whole picture' video.",
    },
  ],

  grover: [
    {
      title: "Grover's Algorithm · Coding with Qiskit",
      channel: 'Qiskit (IBM)',
      url: 'https://www.youtube.com/watch?v=0RPFWZj7Jm0',
      lengthMin: 13,
      pitch: 'Combines the algorithm explanation with actual code on a real backend — best for the "show me, don\'t just tell me" learner.',
      ifYouOnlyWatchOne: true,
    },
    {
      title: "Grover's Algorithm",
      channel: 'QuTech Academy',
      url: 'https://www.youtube.com/watch?v=IT-O-KSWlaE',
      lengthMin: 14,
      pitch: 'A formal academic treatment from the TU Delft quantum group — useful when you want the math properly stated, not just hand-waved.',
    },
  ],

  interference: [
    {
      title: "Feynman's Infinite Quantum Paths",
      channel: 'PBS Space Time',
      url: 'https://www.youtube.com/watch?v=AwK6t_tFqsM',
      lengthMin: 14,
      pitch: 'Matt O\'Dowd makes the case that interference — not superposition — is the actual quantum resource, via the path-integral picture. This is the conceptual unlock that makes everything downstream click.',
      definitive: true,
      ifYouOnlyWatchOne: true,
    },
    {
      title: 'Some light quantum mechanics (with MinutePhysics)',
      channel: '3Blue1Brown',
      url: 'https://www.youtube.com/watch?v=MzRCDLre1b4',
      lengthMin: 22,
      pitch: 'Sanderson builds complex amplitudes from rotating arrows — best intuition for phase that exists on YouTube.',
    },
    {
      title: 'How Decoherence Splits the Quantum Multiverse',
      channel: 'PBS Space Time',
      url: 'https://www.youtube.com/watch?v=t8YE0_S0c-w',
      lengthMin: 15,
      pitch: 'Explains what destroys interference — the cleanest way to understand what interference actually was in the first place.',
    },
  ],

  'double-slit': [
    {
      title: 'Double Slit Experiment explained',
      channel: 'The Royal Institution (Jim Al-Khalili)',
      url: 'https://www.youtube.com/watch?v=A9tKncAdlHQ',
      lengthMin: 8,
      pitch: 'A physicist who has taught this concept for 30 years, distilled. No gimmicks, no quantum-mysticism overreach, just the experiment and its implications.',
      ifYouOnlyWatchOne: true,
    },
    {
      title: 'The Original Double Slit Experiment',
      channel: 'Veritasium',
      url: 'https://www.youtube.com/watch?v=Iuv6hY6zsd0',
      lengthMin: 7,
      pitch: 'Derek Muller actually performs the experiment with a laser. Seeing the fringes form in real time is pedagogically irreplaceable.',
    },
    {
      title: 'Single Photon Interference',
      channel: 'Physics Demonstrations',
      url: 'https://www.youtube.com/watch?v=GzbKb59my3U',
      lengthMin: 6,
      pitch: 'Shows the experiment at the one-photon-at-a-time limit — the moment that breaks classical intuition for most learners.',
    },
  ],

  'bell-test': [
    {
      title: "Bell's Theorem · The Quantum Venn Diagram Paradox",
      channel: 'MinutePhysics',
      url: 'https://www.youtube.com/watch?v=zcqZHYo7ONs',
      lengthMin: 10,
      pitch: 'The clearest derivation of why local hidden variables fail, accessible to anyone who can count. The video physicists send their non-physicist friends.',
      definitive: true,
      ifYouOnlyWatchOne: true,
    },
    {
      title: "Bell's Inequality · The weirdest theorem in the world | Nobel 2022",
      channel: 'Looking Glass Universe',
      url: 'https://www.youtube.com/watch?v=9OM0jSTeeBg',
      lengthMin: 17,
      pitch: 'Released around the 2022 Nobel — connects the theorem directly to the Aspect / Clauser / Zeilinger experiments that won it.',
    },
    {
      title: 'Is Quantum Mechanics True? Bell\'s theorem explained',
      channel: 'Looking Glass Universe',
      url: 'https://www.youtube.com/watch?v=z-s3q9wlLag',
      lengthMin: 12,
      pitch: 'Mithuna Yoganathan (Cambridge PhD) handles the philosophy of locality and realism with unusual care.',
    },
  ],

  bb84: [
    {
      title: 'Quantum Key Distribution, BB84 — simply explained',
      channel: 'Quantum Flagship',
      url: 'https://www.youtube.com/watch?v=8hNQyTdNil4',
      lengthMin: 6,
      pitch: 'From the EU Quantum Flagship — short, accurate, walks the photon-by-photon protocol with the polarization bases drawn clearly. Best concise primer.',
      ifYouOnlyWatchOne: true,
    },
    {
      title: 'How Quantum Key Distribution Works (BB84 & E91)',
      channel: 'Improbable Matter',
      url: 'https://www.youtube.com/watch?v=V3WzH2up7Os',
      lengthMin: 12,
      pitch: 'Covers BB84 alongside E91 (the entanglement-based protocol) — the right comparison for where QKD is actually heading.',
    },
    {
      title: 'The BB84 Quantum Key Exchange Protocol Explained',
      channel: 'Chalk Talk',
      url: 'https://www.youtube.com/watch?v=IE5952ExMK8',
      lengthMin: 10,
      pitch: 'Strongest treatment of QBER (quantum bit error rate) and eavesdropper detection — the part most BB84 videos skip.',
    },
  ],
};
