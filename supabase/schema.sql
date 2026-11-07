-- dPanda.ng — Supabase Database Schema
-- Source of truth: dpanda_BUILD_PROMPT.md Section 6.1

-- Extensions
create extension if not exists "pgcrypto";

-- 1. Gift Cards Table
create table if not exists gift_cards (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  logo_path text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2. Gift Card Rates Table
create table if not exists gift_card_rates (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references gift_cards(id) on delete cascade,
  variant text not null,
  currency char(3) not null,
  min_amount numeric(12,2) not null,
  max_amount numeric(12,2),
  rate_ngn numeric(12,2) not null,
  note text,
  is_active boolean not null default true,
  is_seed boolean not null default false,
  updated_at timestamptz not null default now()
);

-- 3. Crypto Assets Table
create table if not exists crypto_assets (
  symbol text primary key,
  name text not null,
  coingecko_id text not null,
  ngn_per_usd numeric(12,2) not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  is_seed boolean not null default false,
  updated_at timestamptz not null default now()
);

-- 4. Site Settings Table
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- 5. Rate History Table
create table if not exists rate_history (
  id bigint generated always as identity primary key,
  table_name text not null,
  row_id text not null,
  old_value numeric(12,2),
  new_value numeric(12,2),
  changed_at timestamptz not null default now()
);

-- 6. Audit Log Table
create table if not exists audit_log (
  id bigint generated always as identity primary key,
  action text not null,
  details jsonb,
  ip text,
  created_at timestamptz not null default now()
);

-- 7. Login Attempts (Rate Limiting) Table
create table if not exists login_attempts (
  id bigint generated always as identity primary key,
  ip text not null,
  attempted_at timestamptz not null default now()
);

-- Row Level Security: enabled on every table with NO public policies
alter table gift_cards enable row level security;
alter table gift_card_rates enable row level security;
alter table crypto_assets enable row level security;
alter table site_settings enable row level security;
alter table rate_history enable row level security;
alter table audit_log enable row level security;
alter table login_attempts enable row level security;

-- Rate History Trigger Functions
create or replace function log_gift_card_rate_change()
returns trigger as $$
begin
  if (old.rate_ngn is distinct from new.rate_ngn) then
    insert into rate_history (table_name, row_id, old_value, new_value, changed_at)
    values ('gift_card_rates', new.id::text, old.rate_ngn, new.rate_ngn, now());
  end if;
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger tr_gift_card_rate_change
before update on gift_card_rates
for each row execute function log_gift_card_rate_change();

create or replace function log_crypto_rate_change()
returns trigger as $$
begin
  if (old.ngn_per_usd is distinct from new.ngn_per_usd) then
    insert into rate_history (table_name, row_id, old_value, new_value, changed_at)
    values ('crypto_assets', new.symbol, old.ngn_per_usd, new.ngn_per_usd, now());
  end if;
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger tr_crypto_rate_change
before update on crypto_assets
for each row execute function log_crypto_rate_change();
