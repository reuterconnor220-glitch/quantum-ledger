import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { COMPANIES } from '@/lib/data/companies';

const SCORE_SCHEMA = z.object({
  relevance: z.number().min(0).max(1),
  sentiment: z.number().min(-1).max(1),
  sentiment_confidence: z.number().min(0).max(1),
  valuation_impact: z.enum(['bullish', 'bearish', 'neutral', 'mixed']),
  materiality: z.number().int().min(1).max(5),
  company_tags: z.array(z.string()),
  topic_tags: z.array(z.enum([
    'error_correction',
    'funding',
    'earnings',
    'milestone',
    'policy',
    'partnership',
    'gov_contract',
    'ipo',
    'technical',
  ])),
  summary: z.string().min(20).max(600),
});

export type ArticleScore = z.infer<typeof SCORE_SCHEMA>;

const COMPANY_ROSTER = COMPANIES
  .map((c) => `- ${c.slug}: ${c.name}${c.ticker ? ` (${c.ticker})` : ''} — ${c.technologyApproach}`)
  .join('\n');

const SYSTEM_PROMPT = `You are an analyst scoring quantum computing news articles for an investor-grade intelligence site. Score every article on:

1. relevance (0-1): how directly does it relate to quantum computing? <0.4 = drop. PQ-crypto counts at 0.5-0.7. Pure adjacencies (general HPC, AI without quantum) get <0.4.
2. sentiment (-1 to +1): tone for the sector/named companies.
3. sentiment_confidence (0-1): your confidence in the sentiment call.
4. valuation_impact: bullish | bearish | neutral | mixed — how this should move the named tickers.
5. materiality (1-5): 1 = trivial, 2 = update, 3 = meaningful, 4 = significant catalyst, 5 = earnings/IPO/major milestone.
6. company_tags: array of company SLUGS (lowercase, hyphenated) from the roster below.
7. topic_tags: array from the closed list.
8. summary: 2-3 sentences capturing the why-it-matters. Plain prose. No "in conclusion." No bullet points.

COMPANY ROSTER:
${COMPANY_ROSTER}

Return strict JSON only. No prose around the JSON.`;

export async function scoreArticle(
  title: string,
  source: string,
  body: string,
  client?: Anthropic
): Promise<ArticleScore> {
  const anthropic =
    client ?? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const truncated = body.slice(0, 3000);

  const msg = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      } as never,
    ],
    messages: [
      {
        role: 'user',
        content: `Source: ${source}\nTitle: ${title}\n\n${truncated}`,
      },
    ],
  });

  const text = msg.content
    .filter((c): c is Anthropic.TextBlock => c.type === 'text')
    .map((c) => c.text)
    .join('\n')
    .trim();

  // Be tolerant of leading code fences
  const cleaned = text
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();

  const parsed = JSON.parse(cleaned);
  return SCORE_SCHEMA.parse(parsed);
}
