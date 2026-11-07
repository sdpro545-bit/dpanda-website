# dPanda.ng — BUILD PROMPT (UI rebuild to the new reference, hero to admin)

Prerequisite: read `dpanda_MASTER_PROMPT.md` and `AGENTS.md` first. Their rules apply to every line below.

**Status of the project.** The functions already work: rates, calculator, WhatsApp link, hidden admin. **The interface is wrong.** The earlier reference video could not be read, so the UI did not match. The single visual reference is now **`1793995975571_image.png`**.

**Your job in this revision**
1. Keep and re-use the working data layer, APIs, calculator logic and admin. Do not rewrite them. Phases 2, 3 (logic) and 7 stay as they are.
2. Replace the whole public UI so it matches the reference (Master Prompt section 2.2) in dPanda green.
3. Generate the 3D images and build the animations that the reference needs.
4. Prove the match with screenshot comparisons.

Work phase by phase. Finish and verify each phase before the next. Report after each phase.

---

## 1. Product summary

A rate-checking and trade-routing website. No user accounts, no payments, no uploads on the site. The site shows rates and sends the visitor to WhatsApp to trade.

**Services (from Flyer 1):** Crypto Exchange, Gift Cards, Locked Wallet Funds.

**Rates come from two sources**
| Rate type | Source |
|---|---|
| Gift card rates (₦ per unit of card currency) | **Set manually** by the owner in the admin dashboard |
| Crypto coin prices in USD | Live market API, cached 30 s |
| Crypto payout rate (₦ per $1 of crypto value) | **Set manually** by the owner in the admin dashboard, with a reference NGN/USD shown beside it for guidance |

Why: gift card rates are negotiated by hand and cannot be pulled from a feed. Only coin prices are live.

---

## 2. Site map

| Route | Purpose |
|---|---|
| `/` | Home, built to the reference: header, intro block, **3D carousel calculator**, beam section with floating 3D objects, footer |
| `/gift-cards` | Full gift card rate table and full calculator |
| `/crypto` | Live coin prices and naira payout calculator |
| `/locked-wallet-funds` | Service explainer (owner supplies the text) |
| `/how-it-works` | 4-step trade flow |
| `/faq` | Accordion FAQ |
| `/contact` | WhatsApp, Instagram, X, domain |
| `/terms`, `/privacy` | Legal text (owner supplies, scaffold only) |
| `/not-found` | Branded 404 with the panda |
| `/{ADMIN_SLUG}` | Hidden admin (unchanged) |

Header (matches reference A): logo left. Links: **Gift Cards · Crypto · How it works · Contact**. The active link is `--green-400`. Right: small white rectangular button **Trade** (opens WhatsApp).

---

## 3. Phase 0 — Reference analysis and asset generation

### 3.1 Reference analysis (before any code)
Open `1793995975571_image.png`. Write `REFERENCE_ANALYSIS.md` containing:
- A measured table for each of the five parts (A to E in Master Prompt 2.2) at 1199 px, scaled to 1440 px: positions, sizes, gaps, radii, font sizes and weights, opacities, colours (sampled).
- The exact arc geometry of the carousel: x-offset, y-offset, rotation, scale, opacity and blur for the centre, near-side and hidden positions.
- The 3D transform values you estimate for the tilted rate card (rotateX, rotateZ, perspective) and for each floating object.
- A list of everything that is **inferred** (all motion, all hover and focus states, mobile layout).
- Elements you will **not** reproduce, with the reason (avatar stack, green dot, human photo, third-party logos).

### 3.2 Style recipe for all generated 3D assets
Use this recipe in every image prompt so the set looks like one family. Save it to `/design/asset-prompts.md`.

> *Soft 3D render, studio lighting, isometric three-quarter view. A thick rounded-square slab with a deep bevel, dark translucent glass body (near-black green), glossy top face, a thin mint-green rim light along the lower edge, a soft contact shadow. A flat luminous mint-green icon is inset on the top face, lit from within, with no outer glow. Matte, clean, premium. No text, no logo, no watermark, no people. Flat pure white background.*

### 3.3 Assets: supplied versus to generate

**Supplied (already in `/public/assets/3d/`, approved, do not regenerate):**
`panda-thumbs-up`, `panda-side`, `panda-back`, `panda-seated-phone`, `panda-bust`, `coin-btc`, `coin-btc-dark`, `coin-usdt`, `coin-eth`, `card-amazon`, `card-itunes`, `glow-ring` (WebP and PNG). Details and display-size limits are in Master Prompt section 4.1.

**To generate** (use the style recipe in 3.2 and the workflow in Master Prompt 4.4). Save to `/public/assets/3d/` as WebP (quality 90) and PNG, transparent background, display size × 2.

| File | Content | Used in |
|---|---|---|
| `tile-clock` | Large slab tile with a round luminous clock icon (reference D, left). Tilted about 20° toward the viewer. | Beam section |
| `tile-chat` | Same slab, luminous chat-bubble icon with a speech-bubble tail, no brand mark (reference D, right, replaces the play icon) | Beam section |
| `tile-check` | Smaller slab, check icon, dim | Intro block, top right |
| `shape-diamond-1`, `-2`, `-3` | Large translucent rounded squares, rotated 45°, frosted glass, very low contrast | Background layers |
| `shape-pixel-cluster` | A small cluster of dark rounded squares in a stair pattern | Top left |
| `tile-generic` | Neutral rounded-square slab with an empty face, base for any carousel icon tile | Carousel |
| `coin-sol` | Solana coin matching the four supplied coins (see Master Prompt 4.2) | Carousel, floating |
| `beam-haze` | Dark stage with soft vertical light beams fanning up from the bottom centre, mint green, low contrast, 2400 × 1200 | Beam section backdrop |
| `particle` | A 16 × 16 soft round sprite for the ambient particles | Beam section |

Brand files in `/public/assets/brand/`:
```
logo-mark.svg       Panda head, vectorised from dPanda_Cap_print_green.png
logo-wordmark.svg   "dPanda" wordmark, as in the flyers
og-image.png        1200×630, built from panda-thumbs-up and the logo
```

### 3.4 Rules for this phase
- Follow Master Prompt section 4 fully.
- Create `ASSETS_REPORT.md` listing every file, its size, whether it was supplied or generated, and the halo check result on dark and light backgrounds.
- Put a contact sheet of the generated tiles on a dark background next to the supplied coins and cards. **Stop and ask the owner to approve the generated tile style** before Phase 4. The panda and the supplied coins and cards are already approved.

---

## 4. Approved copy deck (the owner edits it later in `content/site.ts`)

**Intro block (reference B)**
- Eyebrow tag: `TODAY'S RATES`
- H1: `Trade without limits`
- Paragraph: `See today's naira rate for your gift card or crypto. Pick a card, enter the amount, then trade on WhatsApp.`
- Button 1 (store-button style, with the WhatsApp icon): two lines, small `Trade on` and large `WhatsApp`
- Button 2 (store-button style, with the Instagram icon): two lines, small `Follow us on` and large `Instagram`
- Footnote under buttons: none.

**Carousel (reference C)**
- Segmented switch above the carousel (one allowed addition, not in the reference): `Gift cards | Crypto`
- Centre card contents, top to bottom:
  1. Icon tile (brand or coin)
  2. Title: card or coin name, for example `Amazon`
  3. Subtitle: `{n} types` for gift cards, or the coin ticker for crypto
  4. Variant selector: small segmented control (for example `E-code | Physical`)
  5. Amount field with currency symbol, label `Amount`
  6. Result row: label `You get`, value `₦{payout}` in `--yellow-400`, odometer animated
  7. Rate line: `₦{rate} per {symbol}1 · set at {hh:mm}`
  8. Green button: `Trade on WhatsApp`
- Side cards show: icon tile, name, subtitle, and the rate line only.
- Footnote under the carousel: `Rates change with the market. The rate is final only when we confirm it on WhatsApp.`

**Beam section (reference D)**
- H2: `Your rate, then one tap to trade`
- Subtitle: `Your card, your amount and your naira payout go into the WhatsApp message for you.`
- Button 1: `Trade on WhatsApp` (store-button style)
- Button 2: `Follow @dPanda.ng` (store-button style)
- Tilted rate card:
  - Profile tile: `panda-bust` on a CSS rounded-square slab
  - Label (replaces "Rank"): `Today's rate`
  - Large figure (replaces "104 / 20,206"): live `₦{rate}` for the featured card, with `per $1` in small text
  - Progress bar: fills with the 30-second price-refresh countdown
  - Chip 1 (replaces "56 XP"): `Set {hh:mm}`
  - Chip 2 (replaces "2d"): `Paid in ₦`
- Disc (replaces "32% COMPLETE"): ring shows the refresh countdown, text `{n}s to next price`
- Left tile: clock, with the caption `Rate time`
- Right tile: chat, with the caption `WhatsApp`

**Footer (reference E)**
- Logo (large), social icons: Instagram, X, WhatsApp
- Bottom left: `© {current year} dPanda.ng. All rights reserved.`
- Bottom right: `Terms`, `Privacy`, `07052367655`
- No claims of registration, licence or insurance.

**Locked Wallet Funds:** `{owner to supply}`. Do not write it yourself.

**How it works** (4 steps)
1. `Choose your card or coin.`
2. `Enter the amount and read your naira payout.`
3. `Tap Trade. WhatsApp opens with your details filled in.`
4. `Confirm the final rate with us, send the card or coin, get paid in naira.`

**FAQ** questions only (owner supplies answers): How is my payout calculated? · Why does the rate change? · How long does a trade take? · Which cards do you accept? · What happens after I tap Trade?

---

## 5. Phase 1 — Design system rebuild

1. Update `styles/tokens.css` to the Master Prompt section 3 values. Remove tokens and components from the old design.
2. Fonts: Plus Jakarta Sans (500, 600) and Inter (400, 500) via `next/font`.
3. Build (or rebuild) these primitives and show them on a `/styleguide` page (noindex, deleted before launch):
   - `Button` variants: `solid-green` (reference green button), `solid-white` (header button), `store` (outlined black, two-line, icon left), `round-outline` (carousel arrows)
   - `Eyebrow` (reference B tag)
   - `GlassCard` (4 % fill, 1 px border, 24 px radius)
   - `IconTile` (rounded square, 18 px radius, takes a brand image or coin image)
   - `Carousel3D` (arc layout, keyboard, swipe, wheel, aria-roledescription="carousel")
   - `FloatingLayer` (positions and animates the translucent shapes with parallax)
   - `BeamBackdrop` (beam image, haze, particle canvas with the 40-particle cap)
   - `Tilt3D` (wrapper that applies `perspective`, `rotateX`, `rotateZ` for the rate card and tiles)
   - `ProgressRing`, `ProgressBar` (take a 0 to 1 value, animate smoothly)
   - `OdometerNumber`, `RevealText`, `Noise`
4. `SmoothScrollProvider` with GSAP, ScrollTrigger and Lenis. Respect reduced motion.
5. Header and footer exactly as reference A and E, including the curved notch at the top left of the footer (build it with an SVG mask or a CSS radial-gradient mask, not an image).

**Check:** the styleguide matches the reference swatches and sizes at 390, 768 and 1440 px.

---

## 6. Phase 2 — Data layer and APIs

### 6.1 Supabase schema
```sql
create table gift_cards (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,            -- 'amazon', 'itunes'
  name text not null,
  logo_path text,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table gift_card_rates (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references gift_cards(id) on delete cascade,
  variant text not null,                -- 'US e-code', 'US physical', 'UK e-code'
  currency char(3) not null,            -- 'USD','GBP','EUR','CAD','AUD'
  min_amount numeric(12,2) not null,
  max_amount numeric(12,2),             -- null = no upper limit
  rate_ngn numeric(12,2) not null,      -- naira per 1 unit of currency
  note text,                            -- shown to the visitor, e.g. 'Receipt required'
  is_active boolean not null default true,
  is_seed boolean not null default false,
  updated_at timestamptz not null default now()
);

create table crypto_assets (
  symbol text primary key,              -- 'BTC','USDT','ETH','SOL'
  name text not null,
  coingecko_id text not null,
  ngn_per_usd numeric(12,2) not null,   -- owner-set payout rate for this coin
  sort_order int not null default 0,
  is_active boolean not null default true,
  is_seed boolean not null default false,
  updated_at timestamptz not null default now()
);

create table site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
-- keys: whatsapp_number_intl, banner (text + enabled), maintenance_mode,
--       rates_paused (bool), reference_ngn_usd (cached FX, optional)

create table rate_history (
  id bigint generated always as identity primary key,
  table_name text not null,
  row_id text not null,
  old_value numeric(12,2),
  new_value numeric(12,2),
  changed_at timestamptz not null default now()
);

create table audit_log (
  id bigint generated always as identity primary key,
  action text not null,
  details jsonb,
  ip text,
  created_at timestamptz not null default now()
);

create table login_attempts (
  ip text not null,
  attempted_at timestamptz not null default now()
);
```
- Enable RLS on every table with **no** public policies. Only the server's service-role key reads and writes.
- Add triggers that copy a changed `rate_ngn` or `ngn_per_usd` into `rate_history`.
- Seed file `supabase/seed.sql`: the 12 gift cards in 6.3, their variants, the four coins. All seeded rates set `is_seed = true` with obviously placeholder numbers.

### 6.2 API routes (all `GET` public, read-only)
| Route | Returns | Cache |
|---|---|---|
| `/api/rates/giftcards` | Active cards, variants, rates, `updated_at` | `s-maxage=10, stale-while-revalidate=30` |
| `/api/rates/crypto` | Active coins: USD price, 24 h change, `ngn_per_usd`, `updated_at` | `s-maxage=30` |
| `/api/settings/public` | Banner, rates_paused, WhatsApp number | `s-maxage=10` |
| `/api/quote` (`POST`) | Server-side quote for `{cardSlug, variant, amount}`, returns payout and rate used | no-store |

- Crypto prices: fetch CoinGecko server-side with a 30 s revalidate. Fallback to a second public source if the first fails. If both fail, return the last good value with `stale: true` and show `Price delayed` in the UI.
- The **quote is always recomputed on the server** from the database. The client's displayed payout is a preview only.
- Quote maths: find the active rate whose `[min_amount, max_amount]` contains the amount. `payout = floor(amount × rate_ngn)`. If none matches, return a clear message such as `Minimum for this card is $25`.
- When `rates_paused` is true, quotes return `Rates are being updated. Message us on WhatsApp.` and the Trade button becomes a plain `Message us` link.

### 6.3 Seed gift cards
Amazon, iTunes / Apple, Google Play, Steam, Razer Gold, Xbox, PlayStation, Walmart, eBay, Sephora, Nike, Visa / Vanilla.
The owner edits, adds and removes cards in the admin. Do not hard-code this list anywhere except the seed file.

### 6.4 Live updates
- Client uses SWR. Gift card rates refetch every 15 s, crypto every 30 s, pause when the tab is hidden, refetch on focus.
- When a value changes, the number rolls (odometer) and the "Rate set at hh:mm" label updates. No glowing, no flashing.
- Optional upgrade (build it if time allows): Supabase Realtime broadcast from the admin save action so open tabs update immediately.
- After an admin save, call `revalidateTag('rates')` so the CDN cache refreshes instantly.

**Check:** change a rate directly in Supabase, confirm the public API and page reflect it within 15 s without redeploying.

---

---

## 7. Phase 3 — Calculator (the core feature)

**UI change in this revision:** the logic below is unchanged and already works. The **card picker and the calculator now live inside the centre card of the 3D carousel** on `/` (Phase 4, section 8.4). On `/gift-cards` and `/crypto` the same calculator logic appears in a wider layout. Re-use the existing hooks and API calls. Only the presentation changes.


### 7.1 Gift card calculator behaviour
1. **Card** picker: on `/` the carousel is the picker. On `/gift-cards`, a searchable grid of active cards with logo chips (a bottom sheet on mobile).
2. **Type** picker: variants for the chosen card (e-code, physical, region). Shows the rate note, for example `Receipt required`.
3. **Amount** field: numeric keypad on mobile (`inputmode="decimal"`). Currency symbol follows the variant. Quick chips: 25, 50, 100, 200, 500.
4. **Rate row:** `₦{rate} per {symbol}1`.
5. **You get:** large number in `--yellow-400`, odometer animated, with `₦` prefix and thousands separators.
6. **Trade this on WhatsApp** button. Disabled until a valid quote exists.
7. States to design and build: loading skeleton, no card selected, amount below minimum, above maximum, rates paused, network error with retry, card inactive.
8. Debounce quote requests by 250 ms. Cancel stale requests.

### 7.2 Crypto calculator
- Coin picker (BTC, USDT, ETH, SOL), amount input in coin units **or** USD (toggle).
- Shows coin price in USD (live), the owner's ₦ per $1 rate, and the payout: `floor(coinAmount × usdPrice × ngn_per_usd)`.
- Same states and the same WhatsApp button.

### 7.3 Display rules
- Always show `Rate set at {time, Africa/Lagos}` under the result.
- Always show the global rate disclaimer from section 4.
- Never show a payout without a rate and a timestamp.

### 7.4 WhatsApp deep link
Open `https://wa.me/2347052367655?text={encodeURIComponent(message)}` in a new tab (`rel="noopener"`).
Message template:
```
Hello dPanda, I want to trade.

Card: Amazon (US e-code)
Amount: $100
Rate: ₦{rate} per $1
Estimated payout: ₦{payout}
Rate seen at: {hh:mm, dd MMM}
```
For crypto, replace the card lines with `Coin`, `Amount`, `Price (USD)`, `Rate`, `Estimated payout`.
Read the number from `site_settings.whatsapp_number_intl` so the owner can change it in the admin.
Also write a `/api/track` stub only if the owner asks for analytics. Do not log personal data.

**Check:** with the seeded Amazon rate, $100 gives `floor(100 × rate)`. Opening the WhatsApp link shows the exact message above.

---

---

## 8. Phase 4 — Home page (match the reference exactly)

Build `/` as one column in the order A → B → C → D → E. Use the measurements from `REFERENCE_ANALYSIS.md`. At 1440 px the content column is about 980 px wide and the carousel arrows sit near the page edges (about 5.7 % from each side).

### 8.1 Page background
- Vertical gradient `--bg-top` → `--bg-mid` → `--bg-bottom`, plus the noise overlay.
- `FloatingLayer` behind everything: 5 to 7 translucent rounded squares (`shape-diamond-*`) at the positions in the reference (top-left, upper-right, left of the carousel, right of the beam section), plus the pixel cluster top left and `tile-check` top right at low opacity. All drift and parallax per Master Prompt section 5, item 4.

### 8.2 Header (reference A)
Sticky, transparent over the gradient, blurs and gains a 1 px bottom border after 40 px of scroll.

### 8.3 Intro block (reference B)
Eyebrow, H1, paragraph, two store-style buttons, using the copy deck. Spacing from the reference. Reveal animation per Master Prompt section 5, item 1.

### 8.4 Carousel calculator (reference C), the centrepiece
**Layout.** Follow the arc geometry in `REFERENCE_ANALYSIS.md`. Starting values:

| Position | translateX | translateY | rotateZ | scale | opacity | blur |
|---|---|---|---|---|---|---|
| centre | 0 | 0 | 0° | 1 | 1 | 0 |
| ±1 | ±282 px | +40 px | ∓9° | 0.9 | 0.35 | 1 px |
| ±2 and beyond | ±520 px | +90 px | ∓16° | 0.8 | 0 | 2 px |

Use `perspective: 1200px` on the stage. Interpolate all values with a single progress variable, so every card moves along the arc together in 0.7 s.

**Behaviour.**
- The centre card **is the calculator** from Phase 3. Changing the centred card changes the selected card or coin. Clicking a side card moves it to the centre.
- Only the centre card is interactive (inputs, variant switch, Trade button). Side cards have `aria-hidden="true"` and `inert`.
- The `Gift cards | Crypto` switch swaps the data set and re-runs the arc transition.
- Cards come from `/api/rates/giftcards` and `/api/rates/crypto`. Only active cards appear. The list is not hard-coded.
- Arrows, keyboard (left/right), swipe, drag and wheel all rotate. Loop infinitely. Announce the new centre card to screen readers with `aria-live="polite"`.
- States: loading skeleton card, rates paused (centre card shows the message and a `Message us` link button), card inactive, network error with retry.
- Do **not** add an avatar stack or a status dot. The slot they occupy in the reference holds the variant selector and the rate line.

**Mobile (< 768 px).** One full-width centre card, with the side cards peeking 24 px at each edge at 0.9 scale and 0.35 opacity. Arrows move below the carousel. Swipe is the primary control. Inputs use `inputmode="decimal"`.

### 8.5 Beam section (reference D)
- Section height about 760 px [at 1440], with the H2, subtitle and two store-style buttons at the top, centred.
- `BeamBackdrop` fills the stage below them: `beam-haze` image, a slow breathing opacity, and the particle canvas (≤ 40 particles, 1 to 3 px, 15 to 50 % opacity, drifting up).
- Floating 3D objects at the reference positions:
  - `tile-clock` on the left, with the caption `Rate time` and the current time in Lagos beside or on it.
  - `tile-chat` on the right, linked to WhatsApp (the whole tile is a link, with a visible focus ring).
  - **Tilted rate card** at the bottom centre, built as HTML/CSS inside `Tilt3D` (`perspective: 1400px`, `rotateX(55deg) rotateZ(-12deg)`). Contents per the copy deck, live data from `/api/rates/giftcards`: the featured card is the first active card by `sort_order`. The profile tile at its top-left corner uses `panda-bust` inside a rounded-square slab built in CSS (18 px radius, dark glass body, mint rim light), overlapping the card edge as the photo tile does in the reference.
  - **Disc** at the upper right: a round glass disc, tilted, containing the `ProgressRing` and the text `{n}s to next price`. The countdown follows the real SWR refresh interval. It is never a fake percentage.
- Floating objects rise into view on scroll and then float (Master Prompt section 5, item 6).

### 8.6 Footer (reference E)
Notch corner, large logo, social icons, copyright with the current year, legal links. No decorative effects.

### 8.7 Check (required)
1. Take screenshots of the reference and of your build at 1199 px and 1440 px width, full page.
2. Produce a side-by-side image of each of the five parts (A to E) and save them to `/design/compare/`.
3. In the report list every difference you can see and say whether it is intentional (colour swap, banned element, added switch) or a defect to fix. Fix all defects before you report.
4. Record the carousel at 60 fps for 5 s and confirm there is no layout shift and no dropped frames in the performance panel.

---

## 9. Phase 5 — Inner pages (same design system as the home page)

- **/gift-cards**: full calculator on top, then a rate table (card, variant, rate, note, updated time). Sortable and searchable. Mobile: card list instead of table.
- **/crypto**: full crypto calculator, then price cards with a 24 h sparkline (small inline SVG).
- **/locked-wallet-funds**: hero with `panda-seated-phone`, one factual explainer block supplied by the owner, a 3-step "how we handle it" list supplied by the owner, WhatsApp button. **Do not write claims about how this service works.** Ask the owner for the exact text. Until supplied, show a clear `{owner to supply}` marker in development and block production build if the marker is still present (add a build-time check).
- **/how-it-works**, **/faq**, **/contact**, **/terms**, **/privacy**, **404**.
- Every page: unique `<title>`, description, canonical URL, Open Graph tags, and the page transition from the Master Prompt.

---

---

## 10. Phase 6 — SEO, accessibility, performance

- `sitemap.xml` generated from the routes in section 2 (admin and styleguide excluded). `robots.txt` allows all public routes.
- JSON-LD `Organization` and `WebSite`. No `FinancialService` claim.
- Run Lighthouse on `/`, `/gift-cards`, `/crypto` at mobile throttling. Targets are in the Master Prompt section 7. Fix and re-run until met.
- Keyboard-only walkthrough of the calculator. Screen-reader check of the result announcement.
- Test on a throttled "Slow 4G" profile, since much of the audience is on mobile data in Nigeria. The first view (header, intro block, carousel card) must be usable while the 3D tile images are still loading. Use a blurred low-quality placeholder for each.

---

## 11. Phase 7 — Hidden admin dashboard

Route: `/{ADMIN_SLUG}` (env var, ≥ 24 random characters). Wrong path → the normal 404. Layout is separate from the public site (no public header or footer), same design tokens, simplified glass-card style, no heavy animation.

### 11.1 Auth flow
Login page → password (+ TOTP code if enabled) → session cookie → dashboard. Logout button clears the cookie. Idle timeout 30 min with a re-login prompt. All rules from Master Prompt section 8.

### 11.2 Dashboard screens
1. **Overview**
   - Last change time, number of active cards, number of active coins.
   - Warning banner while any `is_seed = true` rate exists: `Seed rates are still live. Replace them.`
   - Global switch: **Pause all rates** (visitors see the "being updated" message).
   - Last 10 changes from `rate_history`.
2. **Gift card rates**
   - Table: card, variant, currency, min, max, rate (₦), note, active, last updated.
   - Inline edit on the rate cell. Save on Enter. Optimistic UI with rollback on error.
   - Bulk actions: select rows, **raise / lower by ₦X** or **by Y %**, with a preview of every new value before confirming.
   - Add card, add variant, deactivate, delete (with confirm dialog), drag to reorder.
   - Upload a card logo (Supabase Storage, image types only, ≤ 500 kB).
3. **Crypto rates**
   - Per coin: live USD price (read only), editable `₦ per $1`, active toggle.
   - Reference panel: live NGN/USD market figure for guidance only, with a one-click `Copy to field` helper. The owner's number is what the public sees.
4. **Settings**
   - WhatsApp number (validated, stored in international format).
   - Site banner: text, on/off.
   - Maintenance mode.
   - Change password and set up TOTP.
5. **History and audit**
   - Rate history table with filter by card/coin and date range, and a small trend chart.
   - Audit log with action, old value, new value, time (Lagos), IP.
   - **Undo last change** button on each history row (restores that value and logs the undo).

### 11.3 Save behaviour
Every save: server action → verify session → Zod validate → write → `rate_history` via trigger → `audit_log` → `revalidateTag('rates')` → toast `Saved. Live now.` (plain toast, no glow).

### 11.4 Admin QA
- Change a gift card rate, open the public site in another browser, confirm the new payout appears within 15 s.
- Pause rates, confirm the public message.
- Try 6 wrong passwords, confirm the lockout.
- Hit an admin API route without a cookie, confirm 401 with no data.
- Visit `/admin`, `/dashboard`, `/wp-admin`, confirm they return the normal 404.

---

## 12. Phase 8 — Deploy on Vercel with the domain

1. Push to GitHub. Import the repo into Vercel (framework: Next.js).
2. Create the Supabase project. Run `supabase/schema.sql` and `supabase/seed.sql`.
3. Add environment variables in Vercel (Production and Preview):
```
NEXT_PUBLIC_SITE_URL=https://www.dpanda.ng
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_SLUG=                 # long random string
ADMIN_PASSWORD_HASH=        # bcrypt hash
ADMIN_JWT_SECRET=           # 32+ random bytes
ADMIN_TOTP_SECRET=          # optional
UPSTASH_REDIS_REST_URL=     # for login rate limiting
UPSTASH_REDIS_REST_TOKEN=
COINGECKO_API_KEY=          # optional
```
4. Provide a script `scripts/hash-password.ts` that prints a bcrypt hash, and `scripts/gen-secret.ts` for the slug and JWT secret.
5. Domain: in Vercel → Domains add `dpanda.ng` and `www.dpanda.ng`. Redirect the apex to `www` (or the reverse, owner's choice). Write the exact DNS records the owner must add at their registrar (A record for the apex, CNAME for `www`) and a note that `.ng` registrars can take up to 48 hours to propagate.
6. Confirm HTTPS is active, HSTS is on, and the preview deployments are not indexed (`noindex` on non-production).
7. Smoke test the production URL with the QA list in section 13.

---

---

## 13. Final QA checklist (all must pass)

**Function**
- [ ] Gift card payout equals `floor(amount × rate)` for 10 random amounts.
- [ ] Crypto payout matches the formula for all four coins.
- [ ] A rate edited in the admin shows on the public carousel within 15 s, with no redeploy.
- [ ] The WhatsApp link opens with the exact message template and the right number.
- [ ] Pause-rates works and shows the right message in the carousel and on the rate card.
- [ ] Every rate and price shows a Lagos-time timestamp.
- [ ] The carousel only lists active cards, and a card deactivated in the admin disappears.

**Design**
- [ ] The five parts (A to E) match the reference in the side-by-side images, apart from the listed intentional differences.
- [ ] Carousel arc, opacity and blur match the reference at rest and animate smoothly.
- [ ] Floating objects, beams and particles are present and match the reference mood.
- [ ] No glowing dots, no avatar stacks, no emoji, no fake stats, no third-party logos that were not supplied.
- [ ] No sentence repeats an idea. No banned words from the Master Prompt.
- [ ] Panda and tile renders are the owner-approved assets. The logo is the vectorised original.
- [ ] Correct at 360, 390, 768, 1024, 1440 and 1920 px.

**Quality**
- [ ] Lighthouse mobile targets met on `/`, `/gift-cards`, `/crypto`.
- [ ] Zero console errors in production.
- [ ] Reduced-motion mode works.
- [ ] Keyboard-only use works, including the carousel and the calculator.
- [ ] Admin is hidden, rate-limited, noindex, and absent from the sitemap and robots.

**Final report** (required): the format in `AGENTS.md`, plus the comparison images, the asset report, the admin URL pattern (never print the real slug in the repo), env vars, DNS records, seed rates to replace, missing assets and every open question.

---

## 14. Needs owner (ask before Phase 4 ends)

1. Approval of the generated tile style (clock, chat, check, background shapes). The panda, coins and cards are already approved.
2. Official logo files for each other gift card brand you want on the carousel (Amazon and iTunes renders are supplied). Without them the carousel shows neutral tiles with the brand name in text.
3. Whether you want the panda in the first view of the home page. The reference has no mascot there, so this build puts the panda on the rate card tile, and uses the full poses on inner pages. Say so if you want it larger. The supplied panda files are small (about 380 × 590 px), so a larger hero panda needs a higher-resolution source.
4. The correct X handle (X handles cannot contain a dot).
5. Real starting rates for every card and coin.
6. One factual description and the steps for **Locked Wallet Funds**.
7. FAQ answers, processing times, limits and any fees.
8. Terms and Privacy text.
9. Whether to support currencies other than USD at launch.
