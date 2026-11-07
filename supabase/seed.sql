-- dPanda.ng — Seed Data
-- Source of Truth: dpanda_BUILD_PROMPT.md Section 6.1 & 6.3
-- All seeded rates are marked is_seed = true with placeholder rates for the owner to update.

-- 1. Insert 12 Initial Gift Cards
insert into gift_cards (id, slug, name, logo_path, sort_order, is_active) values
  ('11111111-1111-1111-1111-111111111101', 'amazon', 'Amazon', '/assets/3d/card-amazon.webp', 1, true),
  ('11111111-1111-1111-1111-111111111102', 'itunes', 'Apple / iTunes', '/assets/3d/card-generic-blue.webp', 2, true),
  ('11111111-1111-1111-1111-111111111103', 'steam', 'Steam', null, 3, true),
  ('11111111-1111-1111-1111-111111111104', 'googleplay', 'Google Play', null, 4, true),
  ('11111111-1111-1111-1111-111111111105', 'razer', 'Razer Gold', null, 5, true),
  ('11111111-1111-1111-1111-111111111106', 'xbox', 'Xbox', null, 6, true),
  ('11111111-1111-1111-1111-111111111107', 'playstation', 'PlayStation', null, 7, true),
  ('11111111-1111-1111-1111-111111111108', 'walmart', 'Walmart', null, 8, true),
  ('11111111-1111-1111-1111-111111111109', 'ebay', 'eBay', null, 9, true),
  ('11111111-1111-1111-1111-111111111110', 'sephora', 'Sephora', null, 10, true),
  ('11111111-1111-1111-1111-111111111111', 'nike', 'Nike', null, 11, true),
  ('11111111-1111-1111-1111-111111111112', 'vanilla', 'Visa / Vanilla', null, 12, true)
on conflict (slug) do nothing;

-- 2. Insert Gift Card Variants & Rates (Marked is_seed = true)
insert into gift_card_rates (card_id, variant, currency, min_amount, max_amount, rate_ngn, note, is_active, is_seed) values
  ('11111111-1111-1111-1111-111111111101', 'US e-code', 'USD', 25.00, 1000.00, 1420.00, 'Fast redemption', true, true),
  ('11111111-1111-1111-1111-111111111101', 'US physical', 'USD', 50.00, 1000.00, 1450.00, 'Receipt required', true, true),
  ('11111111-1111-1111-1111-111111111101', 'UK e-code', 'GBP', 25.00, 500.00, 1780.00, 'UK Amazon code', true, true),
  ('11111111-1111-1111-1111-111111111102', 'US e-code', 'USD', 25.00, 1000.00, 1380.00, 'Apple Gift Card US', true, true),
  ('11111111-1111-1111-1111-111111111102', 'US physical', 'USD', 50.00, 500.00, 1410.00, 'Cash receipt required', true, true),
  ('11111111-1111-1111-1111-111111111103', 'Global Wallet', 'USD', 20.00, 500.00, 1390.00, 'Steam Wallet Code', true, true),
  ('11111111-1111-1111-1111-111111111104', 'US e-code', 'USD', 25.00, 500.00, 1350.00, 'Google Play Store', true, true),
  ('11111111-1111-1111-1111-111111111105', 'Global PIN', 'USD', 25.00, 1000.00, 1430.00, 'Instant verification', true, true),
  ('11111111-1111-1111-1111-111111111106', 'US Digital', 'USD', 25.00, 500.00, 1320.00, 'Xbox Live Gift Card', true, true),
  ('11111111-1111-1111-1111-111111111107', 'US PSN', 'USD', 25.00, 500.00, 1320.00, 'PlayStation Network', true, true),
  ('11111111-1111-1111-1111-111111111108', 'US Visa/Mastercard', 'USD', 100.00, 1000.00, 1400.00, 'Front & back picture', true, true),
  ('11111111-1111-1111-1111-111111111109', 'US e-code', 'USD', 50.00, 500.00, 1360.00, 'eBay Gift Card', true, true),
  ('11111111-1111-1111-1111-111111111110', 'US physical', 'USD', 50.00, 500.00, 1410.00, 'Store receipt', true, true),
  ('11111111-1111-1111-1111-111111111111', 'US e-code', 'USD', 50.00, 500.00, 1380.00, 'Nike Digital Gift Card', true, true),
  ('11111111-1111-1111-1111-111111111112', 'US 4034/4941', 'USD', 100.00, 1000.00, 1390.00, 'Vanilla Visa 4034', true, true)
on conflict do nothing;

-- 3. Insert Crypto Assets (Marked is_seed = true)
insert into crypto_assets (symbol, name, coingecko_id, ngn_per_usd, sort_order, is_active, is_seed) values
  ('BTC', 'Bitcoin', 'bitcoin', 1650.00, 1, true, true),
  ('USDT', 'Tether', 'tether', 1660.00, 2, true, true),
  ('ETH', 'Ethereum', 'ethereum', 1645.00, 3, true, true),
  ('SOL', 'Solana', 'solana', 1640.00, 4, true, true)
on conflict (symbol) do nothing;

-- 4. Initial Site Settings
insert into site_settings (key, value) values
  ('whatsapp_number_intl', '"2347052367655"'::jsonb),
  ('banner', '{"enabled": false, "text": ""}'::jsonb),
  ('maintenance_mode', 'false'::jsonb),
  ('rates_paused', 'false'::jsonb),
  ('reference_ngn_usd', '1665.00'::jsonb)
on conflict (key) do nothing;
