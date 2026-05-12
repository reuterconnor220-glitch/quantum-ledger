import type { DailyBrief } from '@/lib/types';

export const TODAYS_BRIEF: DailyBrief = {
  briefDate: '2026-05-12',
  headline: 'Quantinuum S-1 Hits Tape; D-Wave Bookings Surge but Revenue Headline Will Spook Retail',
  oneLineSummary:
    'The Quantinuum IPO at $20B+ resets every pure-play comp; D-Wave Q1 prints the lumpiest revenue line of the sector against a 1,994% bookings surge.',
  bodyMd: `**The week's two stories are running in opposite directions.**

Quantinuum's S-1 (May 8) puts a $20B+ valuation against $30.9M of 2025 revenue. That is 650× sales — a multiple that either drags every public pure-play upward or, if it prices badly, becomes the ceiling everyone else trades against. Honeywell shareholders get partial liquidity and a special dividend; IonQ holders should expect their multiple compressed against a higher-fidelity competitor with the brand name and Microsoft Azure distribution.

D-Wave's Q1 report (May 12) is the trickiest read of the quarter. The headline — revenue down 81% YoY to $2.9M — looks ugly until you remember Q1 2025 included a one-time $15M Advantage system sale. The meaningful number underneath: bookings of $33.4M, +1,994% YoY, with RPO of $42.4M. QCaaS subscription revenue grew 2,015%. This is a company finally generating recurring revenue, but the GAAP print will be the only thing retail sees.

IonQ continues to separate. Q1 revenue of $64.7M was up 755% YoY; guidance raised to $260-270M for FY26. The SkyWater deal closes Q2/Q3 and makes IonQ the only US-soil vertically integrated quantum-plus-chip-fab company. Bear case: the $805M GAAP net income was a $1.1B non-cash warrant mark, and operating burn remains ~$150M per quarter.

Xanadu (XNDU) is still digesting the 67% premarket drop on May 4 from the 294M resale share filing. That dynamic is the warning shot for Pasqal's SPAC and Quantinuum's IPO — newly-public quantum names need to manage float carefully or retail flows turn against them.

On the technology side, China announced the first dual-core neutral-atom quantum computer May 8 — incremental but tightens the gap with Atom Computing, QuEra, and Pasqal. DARPA QBI Stage B (Nov 2025) remains the field's most credible independent benchmark; all eleven advancing companies are on our tracker.

**What to watch this week:** Quantinuum IPO pricing range and roadshow signal. Pasqal SPAC vote timing. Any IBM Heron R2 customer-advantage disclosures following the HSBC paper.`,
  topStoryIds: [
    'n-2026-05-08-quantinuum-s1',
    'n-2026-05-06-ionq-q1',
    'n-2026-05-12-dwave-q1',
    'n-2026-05-04-xanadu-resale',
  ],
  marketSummary: {
    sectorMcapUsd: 41e9,
    dayChangePct: 0.018,
    leaders: [
      { ticker: 'IONQ', pct: 0.067 },
      { ticker: 'QBTS', pct: 0.041 },
      { ticker: 'RGTI', pct: 0.018 },
    ],
    laggards: [
      { ticker: 'XNDU', pct: -0.052 },
      { ticker: 'ARQQ', pct: -0.021 },
      { ticker: 'QUBT', pct: -0.014 },
    ],
  },
  sectorSentiment: 0.42,
};
