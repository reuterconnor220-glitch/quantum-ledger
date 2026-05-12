-- Quantum Ledger schema v1
-- Run via Supabase SQL editor or `supabase db push`

create extension if not exists "uuid-ossp";
create extension if not exists "vector";
create extension if not exists "pg_trgm";

-- ============================================================
-- COMPANIES
-- ============================================================
create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  ticker text unique,                 -- null for pure-private companies
  name text not null,
  legal_name text,
  hq_city text,
  hq_country text,
  founded_year int,
  ipo_date date,
  listing_exchange text,              -- 'NYSE' | 'NASDAQ' | 'TSX' | 'private'
  technology_approach text check (technology_approach in
    ('superconducting','trapped_ion','photonic','neutral_atom','topological','silicon_spin','nv_center','annealing','diversified','encryption')),
  purity text check (purity in ('pure_play','diversified','government_focused','encryption_adjacent')),
  one_line_thesis text,
  bull_case text,
  bear_case text,
  logo_url text,
  website text,
  ceo text,
  status text default 'active',       -- 'active' | 'ipo_filed' | 'pending_spac' | 'acquired'
  pending_ticker text,                -- e.g. 'QNT' for Quantinuum pre-IPO
  is_public boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists companies_ticker_idx on companies (ticker);
create index if not exists companies_technology_idx on companies (technology_approach);
create index if not exists companies_purity_idx on companies (purity);

-- ============================================================
-- FINANCIALS (point-in-time snapshots)
-- ============================================================
create table if not exists company_financials (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  as_of_date date not null,
  market_cap_usd numeric,
  enterprise_value_usd numeric,
  revenue_ttm_usd numeric,
  revenue_latest_quarter_usd numeric,
  revenue_yoy_growth numeric,         -- 0.755 = +75.5%
  revenue_qoq_growth numeric,
  gross_margin numeric,               -- 0.31 = 31%
  cash_usd numeric,
  burn_rate_quarterly_usd numeric,
  runway_quarters numeric,
  total_raised_usd numeric,           -- for private cos
  latest_round_size_usd numeric,
  latest_round_valuation_usd numeric,
  latest_round_date date,
  latest_round_lead text,
  source text,                        -- 'sec_filing' | 'press_release' | 'pitchbook' | 'manual'
  source_url text,
  notes text,
  created_at timestamptz default now(),
  unique (company_id, as_of_date)
);

create index if not exists financials_company_date_idx on company_financials (company_id, as_of_date desc);

-- ============================================================
-- DAILY STOCK PRICES
-- ============================================================
create table if not exists stock_prices (
  ticker text not null,
  trade_date date not null,
  open numeric,
  high numeric,
  low numeric,
  close numeric,
  volume bigint,
  pct_change numeric,
  primary key (ticker, trade_date)
);

create index if not exists prices_ticker_date_idx on stock_prices (ticker, trade_date desc);

-- ============================================================
-- NEWS ARTICLES
-- ============================================================
create table if not exists news_articles (
  id uuid primary key default gen_random_uuid(),
  source text not null,                -- 'quantum_insider' | 'qcr' | 'arxiv' | 'finnhub' | 'google_news' | 'reuters' | etc.
  source_url text unique not null,
  url_hash text unique,
  title text not null,
  author text,
  published_at timestamptz not null,
  ingested_at timestamptz default now(),
  raw_body text,
  summary text,                        -- Claude 2-sentence summary
  sentiment_score numeric check (sentiment_score between -1 and 1),
  sentiment_confidence numeric check (sentiment_confidence between 0 and 1),
  relevance_score numeric check (relevance_score between 0 and 1),
  valuation_impact text check (valuation_impact in ('bullish','bearish','neutral','mixed')),
  materiality int check (materiality between 1 and 5),   -- 1=trivial, 5=catalyst
  company_tags text[] default '{}',    -- array of company slugs
  topic_tags text[] default '{}',      -- 'error_correction', 'funding', 'earnings', 'milestone', 'policy', 'partnership'
  embedding vector(1536)
);

create index if not exists news_published_idx on news_articles (published_at desc);
create index if not exists news_relevance_idx on news_articles (relevance_score desc);
create index if not exists news_company_tags_gin on news_articles using gin (company_tags);
create index if not exists news_topic_tags_gin on news_articles using gin (topic_tags);

-- ============================================================
-- DAILY BRIEFS
-- ============================================================
create table if not exists daily_briefs (
  brief_date date primary key,
  headline text not null,
  one_line_summary text not null,
  body_md text not null,
  top_story_ids uuid[] default '{}',
  market_summary jsonb,                -- { sector_mcap_usd, day_change_pct, leaders[], laggards[] }
  sector_sentiment numeric,            -- aggregate -1..1
  generated_at timestamptz default now(),
  generated_by text default 'claude-haiku-4.5',
  word_count int
);

-- ============================================================
-- EVENTS (gov contracts, milestones, IPO catalysts)
-- ============================================================
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  event_date date not null,
  event_type text check (event_type in
    ('gov_contract','funding_round','ipo','spac','milestone','partnership','earnings','policy','technical')),
  title text not null,
  description text,
  company_ids uuid[] default '{}',
  amount_usd numeric,
  source_url text,
  created_at timestamptz default now()
);

create index if not exists events_date_idx on events (event_date desc);
create index if not exists events_type_idx on events (event_type);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================
create table if not exists subscribers (
  email text primary key,
  subscribed_at timestamptz default now(),
  source text default 'footer_form',
  verified boolean default false,
  unsubscribed boolean default false
);

-- ============================================================
-- PIPELINE RUN LOG
-- ============================================================
create table if not exists pipeline_runs (
  id uuid primary key default gen_random_uuid(),
  run_type text not null,              -- 'daily_news' | 'daily_prices' | 'brief_gen'
  started_at timestamptz default now(),
  completed_at timestamptz,
  status text default 'running',       -- 'running' | 'success' | 'failed'
  articles_processed int default 0,
  articles_kept int default 0,
  errors_count int default 0,
  error_log text,
  duration_ms int
);

create index if not exists pipeline_runs_started_idx on pipeline_runs (started_at desc);
