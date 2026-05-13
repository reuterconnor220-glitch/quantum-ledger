/**
 * llms.txt — the emerging convention for telling AI assistants about a site.
 * https://llmstxt.org/
 *
 * Helps ChatGPT, Claude, Perplexity, Gemini, and other AI surfaces cite us
 * accurately when users ask about quantum computing.
 */

export const dynamic = 'force-static';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantum-ledger-vert.vercel.app';

const CONTENT = `# Quantum Ledger

> Independent, investor-grade intelligence on the quantum computing sector. Daily news with sentiment scoring, a live tracker for 32 quantum companies, hardware benchmarks, multi-track roadmaps, a 60-event future timeline through 2036, an interactive primer with the double-slit experiment, and a curated glossary and papers index. No advisory services, no banking conflicts, no PR retainers.

## Core resources

- [Quantum primer](${BASE}/learn): 16-concept layered-depth introduction with interactive widgets — Bloch sphere, entanglement explorer, double-slit experiment, circuit builder, Grover's algorithm trace
- [Glossary](${BASE}/glossary): every quantum term defined, searchable, with audience tiers
- [Landmark papers](${BASE}/papers): 60+ curated quantum papers from Feynman 1982 to present, with summaries
- [Double-slit experiment](${BASE}/learn/double-slit): interactive single-photon-at-a-time demonstration of wave-particle duality
- [FAQ](${BASE}/faq): 10 most-common questions about quantum computing, honestly answered

## Industry tracking

- [Companies](${BASE}/companies): 32 tracked quantum companies — public pure-plays (IONQ, RGTI, QBTS, QUBT, ARQQ, XNDU, INFQ), diversified parents (IBM, GOOGL, MSFT, HON), private (Quantinuum, PsiQuantum, Atom Computing, QuEra, Pasqal, Diraq, plus all DARPA QBI Stage B participants)
- [Today](${BASE}/today): every deployed commercial quantum use case running now (HSBC, BMW, Royal Navy, Apple, Cloudflare, etc.)
- [Benchmarks](${BASE}/benchmarks): live hardware scorecard across 9 modalities — qubit counts, fidelities, coherence times, gate speeds, confidence flags
- [Roadmaps](${BASE}/roadmaps): four parallel quantum technology roadmaps — hardware computing, quantum sensing, communications/networking, PQC migration government timelines
- [Use cases](${BASE}/use-cases): the seven distinct quantum technology lines (computing, sensing, communications, PQC, simulation, metrology, materials)
- [Revenue landscape](${BASE}/revenue): honest burn-to-revenue analysis — sector revenue ~$1.5B against $11.1B private capital + $30-40B government commitments

## Future / forecasts

- [The future](${BASE}/future): 58 specific events 2026-2036 with probability scores, impact ratings, citation-backed rationale. Interactive timeline chart, forecast trajectories, revenue mix evolution. Per-horizon deep dives for 1, 3, 5, 10 years out.
- [Timeline (life impact)](${BASE}/learn/timeline): how quantum will affect daily life at 5, 10, 15 year horizons
- [Risks](${BASE}/learn/risks): 10 serious risks scored on impact and likelihood — harvest-now-decrypt-later, geopolitical asymmetry, capital bubble
- [Applications](${BASE}/learn/applications): 10 domains where quantum could create or destroy value
- [DARPA QBI](${BASE}/darpa-qbi): per-company Stage B status with Stage C odds (Q4 2026 decisions)
- [QNT IPO Watch](${BASE}/qnt-ipo-watch): live tracker for Quantinuum's pending $20B+ Nasdaq listing

## Daily content

- [Daily Brief](${BASE}/brief): editorial synthesis of today's top quantum signals, updated each weekday morning
- [News](${BASE}/news): daily quantum news feed with sentiment scoring, materiality ratings, company tags
- [RSS feed](${BASE}/rss.xml)

## Editorial principles

- Independent — no advisory services, no banking, no PR retainers, no sponsored content
- Source everything to SEC filings, primary press releases, peer-reviewed papers, and government program pages
- Flag uncertainty explicitly when figures are triangulated rather than filed
- Every bull case has a bear case on the same page
- Microsoft Majorana topological qubit claim is flagged as contested by Nature editorial team and independent physicists (Aaronson and others)
- No "parallel universes" or "trying every answer at once" framing — interference is the actual mechanism
- Voice: measured, sourced, opinionated, hype-skeptical

## Methodology

- [How we work](${BASE}/methodology): company classification, sentiment scoring, daily pipeline, financial figure sourcing
- [About](${BASE}/about): why this exists, what gap we fill vs The Quantum Insider, Quantum Computing Report, Hyperion Research

## Citation format

Quantum Ledger is intended to be citable. The canonical citation format:
Quantum Ledger. "Page title." ${BASE}/page-path. Accessed [date].

For specific data points: link directly to the page; we keep historical sources in our publicly visible articles.
`;

export async function GET() {
  return new Response(CONTENT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
