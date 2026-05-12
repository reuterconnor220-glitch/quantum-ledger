import Anthropic from '@anthropic-ai/sdk';
import type { NewsArticle } from '@/lib/types';
import { COMPANIES } from '@/lib/data/companies';

const COMPANY_ROSTER = COMPANIES
  .map((c) => `- ${c.slug}: ${c.name}${c.ticker ? ` (${c.ticker})` : ''}`)
  .join('\n');

const SYSTEM_PROMPT = `You are the editorial voice of Quantum Ledger, an investor-grade independent intelligence site on quantum computing. Write today's daily brief based on the top stories and market moves provided.

Voice: measured, sourced, opinionated. Bloomberg + Stratechery for the sentence rhythm; Aaronson + IEEE Spectrum for the rigor. No hype, no "to the moon." Acknowledge uncertainty. Acknowledge bear cases.

Hard rules:
- No phrases like "in conclusion," "moving forward," "exciting times."
- No em-dashes used as conjunctions.
- No "as we approach a tipping point" language.
- Numbers always come with sources (filing, press release, prior brief).
- If a claim is contested, say so.

Output JSON with this shape:
{
  "headline": "punchy ~10-word headline",
  "one_line_summary": "single sentence that frames the day",
  "body_md": "3-5 paragraphs of markdown, **bold** for emphasis, ~250-400 words total",
  "sector_sentiment": <number from -1 to 1>,
  "top_story_ids": [<article ids in order of importance, max 5>]
}

COMPANY ROSTER (use slugs in narrative if useful, never in headline):
${COMPANY_ROSTER}`;

interface BriefInput {
  date: string;
  topStories: NewsArticle[];
  marketSummary: {
    sectorMcapUsd: number;
    dayChangePct: number;
    leaders: { ticker: string; pct: number }[];
    laggards: { ticker: string; pct: number }[];
  };
}

export async function generateBrief(
  input: BriefInput,
  client?: Anthropic
) {
  const anthropic =
    client ?? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const userContent = `Today: ${input.date}

Market summary:
- Sector mkt cap: $${(input.marketSummary.sectorMcapUsd / 1e9).toFixed(1)}B (${(input.marketSummary.dayChangePct * 100).toFixed(2)}% today)
- Leaders: ${input.marketSummary.leaders.map((l) => `${l.ticker} ${(l.pct * 100).toFixed(1)}%`).join(', ')}
- Laggards: ${input.marketSummary.laggards.map((l) => `${l.ticker} ${(l.pct * 100).toFixed(1)}%`).join(', ')}

Top stories (with materiality and sentiment):
${input.topStories
  .map(
    (n) =>
      `[${n.id}] (M${n.materiality}, s=${n.sentimentScore.toFixed(2)}, ${n.valuationImpact}) ${n.title}
  ${n.summary}`
  )
  .join('\n\n')}`;

  const msg = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1500,
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } } as never],
    messages: [{ role: 'user', content: userContent }],
  });

  const text = msg.content
    .filter((c): c is Anthropic.TextBlock => c.type === 'text')
    .map((c) => c.text)
    .join('\n')
    .trim();

  const cleaned = text.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  return JSON.parse(cleaned) as {
    headline: string;
    one_line_summary: string;
    body_md: string;
    sector_sentiment: number;
    top_story_ids: string[];
  };
}
