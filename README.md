# Quantum Ledger

**quantumledger.com** — investor-grade independent intelligence on the quantum computing sector.

## What this is

Built as a "world-class leading resource" filling the gap left by existing quantum trackers (The Quantum Insider, Quantum Computing Report) which sell advisory services to the companies they cover. Three pillars:

1. **Layered-depth education** — `/learn`. Sixteen concepts with newbie/intermediate/advanced toggles, interactive Bloch sphere, ten common misconceptions debunked.
2. **Daily news desk** — `/news` + `/brief`. Sentiment-scored, materiality-rated, company-tagged daily feed; Claude-generated daily brief at 6am MT.
3. **Company + revenue tracker** — `/companies` + `/revenue`. Sixteen tracked entities (public pure-plays, diversified parents, pending IPOs/SPACs) with bull/bear cases, financials, and honest burn-to-revenue math.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind**
- **Supabase** (Postgres + pgvector for news dedupe)
- **Vercel** hosting + **Vercel Cron** for daily pipeline
- **Claude Haiku 4.5** for sentiment scoring and brief generation
- **yfinance** for daily stock prices (free)
- **Resend** for newsletter
- **MDX** for long-form (`/learn`, `/methodology`)
- **Three.js / React-Three-Fiber** ready for v1.1 Bloch upgrade

## Local dev

```bash
npm install
cp .env.example .env.local
# fill in Supabase + Anthropic + Resend keys
npm run dev
```

Pages render off `src/lib/data/*` seed files at first. After deploying Supabase, switch the pages to read from the database (they're already shaped correctly).

## Deploy in ~30 min

### 1. Register the domain
Register `quantumledger.com` at Namecheap or Cloudflare Registrar.

### 2. Create Supabase project
- Go to https://supabase.com → New project (free tier).
- Open SQL Editor and paste `supabase/migrations/0001_init.sql`. Run it.
- Copy URL, anon key, service role key.

### 3. Create Vercel project
- Push this repo to GitHub.
- Import in Vercel.
- Paste env vars from `.env.example`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ANTHROPIC_API_KEY`
  - `CRON_SECRET` (generate `openssl rand -hex 32`)
  - `RESEND_API_KEY` + `RESEND_AUDIENCE_ID` (create Resend audience first)
  - `NEXT_PUBLIC_SITE_URL=https://quantumledger.com`
- Connect custom domain.

### 4. Seed the database
After Supabase is provisioned, run:
```bash
npm run seed
```
This inserts the 16 companies, 17 seed news articles, 16 events, and today's brief into Supabase.

### 5. Verify cron
Vercel Cron jobs in `vercel.json`:
- `0 12 * * *` UTC = 06:00 MT — runs the full daily pipeline (news + prices + brief).
- `0 14,18,21 * * 1-5` UTC — intraday price refresh on weekdays.

You can manually trigger the pipeline with:
```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://quantumledger.com/api/cron/daily-pipeline
```

## Daily pipeline cost

| Line item | Monthly |
|---|---|
| Supabase Free | $0 |
| Vercel Hobby | $0 |
| Claude Haiku (100 articles/day, prompts cached) | $2–3 |
| yfinance / RSS feeds / arXiv | $0 |
| Resend (3K free emails/mo) | $0 |
| Domain + Cloudflare DNS | $1 |
| **Total** | **$3–4/mo** |

Upgrade paths: Supabase Pro ($25) if DB exceeds 500MB or you want PITR; Vercel Pro ($20) if traffic spikes.

## Editorial principles (enforced in code + content)

- No advisory services. No banking. No PR retainers.
- Source everything to primary filings, press releases, or peer-reviewed papers.
- Flag uncertainty when figures are triangulated.
- Every bull case has a bear case on the same page.
- No "parallel universes" or "trying every answer at once" — `/learn` holds the line on accurate framing.
- Numbers always use tabular monospace (JetBrains Mono) — Bloomberg cue.
- No AI-generic aesthetic: no purple-pink gradients, no glassmorphism, no "✨ AI" badges, no floating particles.

## Roadmap (v1.1+)

- Three.js 3D Bloch sphere with drag-to-rotate (currently 2D SVG)
- Drag-and-drop circuit builder (Quirk-style)
- Grover geometric trace widget
- Spaced-repetition prompts in `/learn` (Quantum Country pattern)
- Paid tier ($/month) for sell-side-quality financial models
- Live benchmark scorecard (Wikipedia-style, version-controlled)

## License

All rights reserved. Editorial and data unique to Quantum Ledger.
Public quantum tickers and company information sourced from SEC filings,
press releases, and reputable financial press.
