# dPanda.ng — MASTER PROMPT (standing rules)

Read this file in full before every task. If a build instruction conflicts with this file, this file wins. If something is unclear, stop and ask. Do not guess.

**Version note:** this version replaces the earlier one. The visual reference changed. The earlier reference video is no longer used. The single visual reference is now the **EasyA Challenges page screenshot** (`1793995975571_image.png`).

---

## 1. Mission

Build **dPanda.ng**, a gift card and crypto exchange website for the Nigerian market.

What a visitor does:
1. Lands on a premium dark 3D-style page.
2. Spins a 3D carousel of gift cards and coins, and picks one.
3. Enters an amount and sees exactly how many naira they get.
4. Taps **Trade**, which opens a pre-filled WhatsApp chat with the exchanger.

What the owner does:
1. Opens a hidden admin dashboard.
2. Changes any rate by hand when the market moves.
3. The public site shows the new rate within seconds, with no redeploy.

The site runs on **Vercel** and is connected to the domain **dpanda.ng**. The functions (rates, calculator, WhatsApp link, admin) already work in the current build. **This revision is about the interface.** Rebuild the UI to match the reference. Keep the working logic.

---

## 2. Source of truth (never contradict these)

### 2.1 Uploaded files
| File | Use it for |
|---|---|
| `1793995975571_image.png` (**the UI reference**, EasyA Challenges page) | Layout, spacing, type scale, card styling, 3D carousel, floating 3D objects, light-beam section, footer. Reproduce it exactly, recoloured for dPanda. |
| `dPanda_ng_Post_design.png` (Flyer 1) | dPanda green palette, yellow accent, panda-with-phone pose, the three services, contact details |
| `dPanda_ng_Nov_Post_design.png` (Flyer 2) | 3D coin and gift card render style, panda-in-chair pose, "Trade Without Limits", footer contact bar |
| `dPanda_Cap_print_green.png` | The logo (panda head mark). Vectorise it. Never redraw it by eye. |
| `/assets/3d/*` (separated from `Panda_Mascot_Crypto_Asset_Sheet.png`) | **The approved panda poses, coins, gift cards and glow ring.** Use these files exactly as supplied. See section 4. |

### 2.2 What the UI reference contains (measured at its 1199 px width; values for a 1440 px viewport in brackets)
The reference is a dark, centred, single-column page with five parts. Reproduce every one.

**A. Header.** A slim bar. Logo at the far left. At the right: four text links (about 12 px [14 px]) in white, with the active link in the accent colour, then a small white rectangular button with black text and a 4 px radius. The content column is narrow: about 68 % of the viewport width [≈ 980 px].

**B. Intro block (centred).**
- A small eyebrow tag above the heading: tiny uppercase text (about 10 px [12 px]) in the accent green, on a translucent dark-green rounded rectangle (4 px radius, not a full pill).
- Heading, two lines, centred, medium weight (500), about 40 px [48 px], line-height 1.05, tight tracking.
- Paragraph, four short lines, centred, about 13 px [15 px], 60 % white, line-height 1.5, max width ≈ 360 px [430 px].
- Two store-style buttons side by side: black fill, 1 px light outline, 6 px radius, about 90 × 30 px [108 × 36 px], logo on the left, two lines of text.

**C. 3D carousel (the centrepiece).**
- Three cards visible. The centre card is flat, in front, full opacity. The two side cards sit on an **arc** (a wheel with its centre below the cards): each rotates about 8 to 10° away from the centre (left card counter-clockwise, right card clockwise), sits about 40 px lower, is scaled to about 0.9, faded to about 35 % opacity, and slightly blurred. Cards further out are hidden.
- Centre card: about 238 × 230 px [286 × 276 px], 24 px radius, background 4 % white with a 1 px border at 6 % white. A **rounded-square icon tile** (about 62 px [75 px], 18 px radius, brand-coloured) overlaps the card's top edge by about 40 %. Below it: the title (about 28 px [34 px], medium weight, centred), a tiny subtitle (about 8 px [10 px], 50 % white), then a row with an overlapping avatar stack and a dark pill with a count. At the bottom, a green button (4 px radius, dark text, about 85 × 32 px [100 × 38 px]).
- Side cards show the same content, dimmed.
- Two round arrow buttons (36 px, 1 px white outline, arrow icon) at the far left and far right edges of the page, vertically centred on the carousel.
- **Do not reproduce** the avatar stack or the small green dot before the count. Avatars would be fake social proof. The dot is a glowing dot, which is banned. See section 6.

**D. Light-beam section ("Download the App" in the reference).**
- Centred heading (about 30 px [36 px], medium weight), a two-line subtitle (about 15 px), and the two store buttons.
- Behind and below: a dark stage with **soft vertical light beams fanning up from the bottom centre**, a slow haze, and a sparse field of tiny out-of-focus particles.
- Floating 3D objects around the stage, all tilted in perspective:
  - Left: a large dark glass tile with a bright round icon (a clock) on it.
  - Right: a large tile with a bright play icon.
  - Centre-bottom: a big flat card tilted back about 55° and turned about −12°, showing a profile tile at its top-left corner, a label, a large figure, a thick progress bar and two small rounded chips.
  - Upper right: a round glass disc with a progress ring and text inside ("32% COMPLETE").
  - Faint, large, translucent rounded squares at low opacity scattered in the background, rotated about 45°.

**E. Footer.** A slightly different dark shade, with a curved notch cut into the top-left corner. Large logo at the left. Social icons at the top right. Copyright at the bottom left (about 8 px [10 px]). Terms, Privacy and email at the bottom right.

**Also in the page background (all sections):** faint translucent 3D rounded-square shapes and a pixel-block cluster near the top left, at very low opacity, drifting behind the content.

### 2.3 Note on evidence
The reference is a still image. It shows no motion. All motion rules in section 5 are **inferred**. Label each one as an inference in the build report.

### 2.4 Do not copy
The EasyA name, logo, copy, partner logos (Polkadot, Solana, ImmutableX), app store claims, the purple colour, and the human avatar photo. Reproduce the layout and the 3D style only.

---

## 3. Brand tokens

The reference is navy and purple. dPanda is **forest green and mint**. Swap the colours, keep the structure.

Starting values (eyedrop the flyers and correct them before locking). Store as CSS variables in `styles/tokens.css`. No hard-coded colours elsewhere.

```
--bg-top:     #06351F   /* page top, reference navy → dPanda deep green */
--bg-mid:     #04281A
--bg-bottom:  #021A10   /* near black, behind the beam section */
--footer-bg:  #031A10
--surface:    rgba(255,255,255,0.04)   /* card fill */
--surface-bd: rgba(255,255,255,0.07)   /* card hairline */
--green-700:  #0B6B34
--green-500:  #2DB357   /* hoodie green */
--green-400:  #5CE87A   /* CTA button fill, accent text, active nav link */
--mint-200:   #A0FFD2   /* beams, rim light on 3D tiles */
--mint-50:    #E4FFF1
--yellow-400: #FFD62E   /* payout figures only */
--text:       #FFFFFF
--text-dim:   rgba(255,255,255,0.60)
--text-faint: rgba(255,255,255,0.40)
--beam:       rgba(92,232,122,0.22)    /* light beams */
```
The reference's accent purple (active nav link, bar, beams) becomes `--green-400` and `--mint-200`. The reference's green button becomes `--green-400` with `#04281A` text.

**Typography.** The reference uses a clean grotesque at **medium weight**. It is not bold.
- Headings and UI: **Plus Jakarta Sans**, weights 500 and 600. Letter-spacing −0.02em. Line-height 1.05 on headings.
- Body: **Inter** 400 and 500.
- All numbers use `font-variant-numeric: tabular-nums`.
- Scale (1440 px): H1 48 px, section H2 36 px, card title 34 px, body 15 px, small 12 px, tiny 10 px. Fluid between 360 and 1440 px with `clamp()`. Never go below 12 px for text a visitor must read. The 8 to 10 px sizes in the reference are for decorative labels only, so raise them to 11 px minimum on screen.

**Shape language:** cards 24 px radius, icon tiles 18 px, buttons and tags 4 to 6 px (square-ish, as in the reference), round arrow buttons fully circular. Hairline 1 px borders on every glass surface. Glass: `backdrop-filter: blur(16px)`.

**Texture:** a 2 to 3 % noise overlay over the page. Vertical gradient from `--bg-top` to `--bg-bottom`.

---

## 4. 3D assets: use the supplied files, generate only the rest

### 4.1 Supplied by the owner (approved, ready to use)
The owner's asset sheet has been cut into separate transparent files in `/public/assets/3d/` (WebP and PNG):

| File | Content | Native size (px) |
|---|---|---|
| `panda-thumbs-up` | Standing, front view, thumbs up | 382 × 587 |
| `panda-side` | Standing, side view | 266 × 584 |
| `panda-back` | Standing, back view | 362 × 589 |
| `panda-seated-phone` | Seated, leaning back, holding a phone | 505 × 569 |
| `panda-bust` | Head and shoulders, cropped from `panda-thumbs-up` | 382 × 300 |
| `coin-btc` | Orange Bitcoin coin | 226 × 215 |
| `coin-btc-dark` | Dark grey Bitcoin coin (depth variant) | 166 × 171 |
| `coin-usdt` | Teal Tether coin | 191 × 191 |
| `coin-eth` | Silver Ethereum coin | 179 × 183 |
| `card-amazon` | Amazon gift card render | 248 × 221 |
| `card-itunes` | iTunes gift card render | 245 × 217 |
| `glow-ring` | Golden swirl of light (Flyer 2 orbit ring), approximate cut-out | 1141 × 419 |

Rules for these files:
- They are the **only** panda, coin and gift card images. **Do not regenerate, redraw, restyle or recolour the panda.** The panda is approved.
- Use `panda-bust` for the profile tile on the tilted rate card (section 8.5 of the Build Prompt).
- Use `panda-seated-phone`, `panda-thumbs-up`, `panda-side` and `panda-back` on inner pages and the 404 page, never as a replacement for the reference layout.
- The files are small. A coin shown larger than its native size looks soft. **Limits:** show coins at no more than 1× native size on standard screens and 0.5× on high-DPI screens. Show the pandas at no more than 400 px tall on desktop. If a design needs a bigger display size, ask the owner for a higher-resolution source. Do not upscale with a filter and call it sharp.
- Check every file on a dark and a light background for halos before use. Report any you find. Do not edit the panda silhouette by hand.
- `glow-ring` is an approximate cut-out from a flattened image, so its soft glow is thinner than in Flyer 2. Use it on inner-page panda scenes only, and compare it with Flyer 2 before use. If it looks wrong, build a ring from a CSS conic gradient mask and tell the owner.

### 4.2 Missing and to be generated
Only these need generating. Use the style recipe and the workflow in 4.4.
- Dark glass slab tiles with a luminous icon: clock, chat, check.
- Faint translucent rounded squares and the pixel cluster for the page background.
- The beam and haze backdrop and the particle sprite.
- `coin-sol`: a Solana coin to match the four supplied coins. Generate it with `coin-btc`, `coin-usdt` and `coin-eth` attached as style references. Reject any candidate whose rim, thickness, lighting or finish differs. If none matches, drop SOL from the launch list and tell the owner.
- Neutral `tile-generic` base for carousel icon tiles.

### 4.3 Brand marks on the carousel
Each carousel card needs an icon tile.
- **Coins** (BTC, USDT, ETH, SOL): the supplied coin renders placed on a rounded-square tile.
- **Amazon and iTunes:** the supplied card renders on a rounded-square tile.
- **Every other gift card brand:** use the official logo file if the owner supplies it. Otherwise render a neutral dark tile with the brand name in text. **Never generate or imitate a third-party logo.** A generated "logo" is a fake logo.
- Do not imply partnership with any brand.
- The logo of dPanda itself is vectorised from `dPanda_Cap_print_green.png`. Never generate or redraw it.

### 4.4 Generation workflow (for the items in 4.2 only)
1. Generate each asset on a **flat, pure white background** (no gradients, no shadows on the floor) so it cuts out cleanly.
2. Remove the background with a proper tool (rembg or equivalent). If the result has holes inside symbols or logos, fill them and check again. Check every edge at 200 % zoom on both a dark and a light background. Fix halos.
3. Export WebP (quality 90) and PNG at 2× the display size.
4. Save the prompt for each asset in `/design/asset-prompts.md`.
5. Reuse one **style recipe** for every generated 3D tile (Build Prompt, Phase 0).
6. If image generation is unavailable, say so, build the tiles with CSS 3D transforms and SVG instead, and list what the owner must supply. Do not leave empty boxes.

### 4.5 Live objects stay as code
The tilted rate card, the progress ring, the refresh countdown and the payout figure show **live data**. Build them as HTML and CSS with 3D transforms (`perspective`, `rotateX`, `rotateZ`), not as images.

---

## 5. Motion rules

Stack: **GSAP + ScrollTrigger + Lenis** for scroll and pins, CSS for hover. No WebGL and no three.js. All motion below is **inferred** from a still image.

Shared timing:
- Primary ease: `cubic-bezier(0.22, 1, 0.36, 1)`. Reveals 0.9 to 1.2 s. Hover 0.25 s. Stagger 0.08 to 0.12 s.
- Text reveal: translateY 32 px, blur 10 px, opacity 0 → sharp, line by line.
- Scroll smoothing: Lenis, lerp 0.1.

Required motions:
1. **Page load:** eyebrow, heading, paragraph, buttons reveal in order. Then the carousel rises (translateY 60 px → 0, opacity 0 → 1, 1.0 s).
2. **Carousel rotation:** cards sit on an arc. Moving to the next card animates every card along the arc: position, rotateZ, scale, opacity and blur interpolate together over 0.7 s. Support the arrow buttons, keyboard left/right, swipe and drag on touch, and mouse wheel when the pointer is over the carousel. Loop infinitely. Idle: no autoplay.
3. **Centre card on select:** the icon tile floats 4 px up and down over 5 s. The rate figure uses the odometer roll when it changes.
4. **Background shapes:** each translucent rounded square drifts (±14 px) and rotates (±6°) on its own 9 to 16 s loop. Layers move at different speeds on scroll (parallax, 0.15 to 0.4×).
5. **Beam section:** beams breathe (opacity ±15 %, 8 s loop). Particles drift upward slowly at 3 to 6 px/s. At most 40 particles, each 1 to 3 px, opacity 15 to 50 %. No other glowing elements.
6. **Floating objects:** each object floats (±10 px, 6 to 9 s, different phases). On scroll into view they rise from 80 px below and settle with a small overshoot. Pointer parallax up to ±10 px.
7. **Rate card (tilted):** the progress bar fills as the refresh timer counts down, then resets when new prices arrive. The ring shows the same countdown.
8. **Page transitions:** soft fade and 24 px rise, 450 ms.
9. **Buttons:** arrow nudges 4 px on hover. No scale jumps.

Always:
- Honour `prefers-reduced-motion`: disable parallax, drift, floats and the idle loops. Keep fades, and keep the carousel rotation at 200 ms with no blur.
- Animate only `transform`, `opacity` and (on text reveals) `filter: blur`. Never animate layout properties.
- Hold 60 fps on a mid-range Android phone. If a motion drops frames, reduce it.
- Pause all loops when the tab is hidden and when the element is off screen.

---

## 6. Anti-slop rules (hard bans)

The last build had three faults: a glowing dot, tautology, and ambiguous text. These rules remove them and anything like them.

**Allowed light effects (and only these):** the soft beams and haze in the beam section, the tiny ambient particles inside that section, the lit icon surface on a 3D tile (exactly as in the reference), and the supplied `glow-ring` swirl on inner-page panda scenes.

**Visual bans**
- **No glowing dots.** No pulsing status dots, glowing bullets or glowing decorative orbs. The reference has a small green dot before the builder count: **do not reproduce it.** Flyer 1 has a yellow glowing dot beside the URL pill and the "Confirmed" pill: **do not reproduce those either.** Show status with a text label or an icon.
- No glow or outer shadow on text.
- No emoji. No generic sparkle or "AI" icons.
- No extra gradients beyond the page gradient, the beams and the tile lighting.
- No avatar stacks, no human photos, no stock images.
- No fake 3D (clip-art coins, bevelled icons). Use the generated renders.
- No dead controls. Every button, arrow and link works.

**Content bans**
- **No invented proof.** No fake testimonials, trade counts, "people joined", ratings or awards. Show a number only if it comes from the database or the owner. This is why the reference's avatar stack and "20,100 builders" count are replaced by the live rate.
- No invented rates. Seed rates are marked `SEED`, and the admin warns until the owner replaces them.
- No invented legal or compliance claims (licences, registrations, guarantees, "100% safe").

**Copy bans**
- **No tautology.** Never say the same thing twice in one block.
- **No ambiguity.** Every sentence states one specific, checkable thing: what the visitor does, what they get, or what happens next. If a line can be read two ways, rewrite it.
- Banned words: seamless, unleash, elevate, next-level, revolutionary, cutting-edge, game-changer, world-class, empower, leverage, delve, "in today's fast-paced world", "whether you're a … or a …".
- No exclamation marks or rhetorical questions in headings.
- One idea per sentence. Body sentences stay under 18 words.
- Use the approved copy deck in the Build Prompt. Mark any gap `{owner to supply}`.

---

## 7. Engineering rules

- **Framework:** Next.js 14+ (App Router), TypeScript strict, Tailwind CSS with the tokens above.
- **Data:** Supabase Postgres, accessed only from server code (route handlers and server actions) using the service-role key. Row Level Security on for every table with no public policies.
- **Hosting:** Vercel. Every setting must work with Vercel's serverless model (no local file writes, no long-lived in-memory state).
- **Validation:** Zod on every API input and every admin form.
- **Money maths:** integers or `decimal` only. Never floating-point for naira. Round payout down to the nearest naira, never up.
- **Time:** store UTC, display in `Africa/Lagos`.
- **Accessibility:** WCAG AA contrast, visible focus rings, full keyboard use, semantic landmarks, labelled form fields, `aria-live="polite"` on the payout result.
- **SEO:** unique title and description per page, Open Graph image, `sitemap.xml`, `robots.txt`, JSON-LD `Organization`. The admin route is excluded everywhere.
- **Performance targets (mobile, Lighthouse):** Performance ≥ 90, Accessibility ≥ 95, LCP ≤ 2.5 s, CLS ≤ 0.05, total JS on the home route ≤ 200 kB gzipped.
- **Images:** WebP/AVIF, explicit width and height, the first-viewport assets preloaded, everything below the fold lazy-loaded.
- **No console errors or warnings** in a production build.
- Keep all editable text in `content/site.ts`, all brand constants (phone, handles, domain) in `config/brand.ts`. No copy or contact detail is hard-coded in components.

Brand constants:
```
WHATSAPP_NUMBER_LOCAL  = 07052367655
WHATSAPP_NUMBER_INTL   = 2347052367655   // wa.me format, no plus sign
INSTAGRAM_AND_X_HANDLE = @dPanda.ng
DOMAIN                 = dpanda.ng
WEBSITE_DISPLAY        = www.dpanda.ng
```
Confirm with the owner whether the X handle is `@dPanda.ng` or `@dPanda_ng` before linking, since X handles cannot contain dots.

---

## 8. Security rules (admin and API)

- The admin dashboard is **hidden**: never linked from any page, never in the sitemap, `noindex, nofollow`, `Disallow` is NOT used in robots.txt (it would advertise the path); use the `X-Robots-Tag: noindex` header and `<meta name="robots">` instead.
- The admin path comes from the env var `ADMIN_SLUG` (a long random string). Any wrong path returns the normal site 404 page, identical in content and status.
- Login: password checked against a **bcrypt hash** stored in `ADMIN_PASSWORD_HASH`. Never store or compare plain text.
- Session: signed JWT (`jose`) in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie, 8 h expiry, rotated on each login.
- Optional but built in: TOTP two-factor (`ADMIN_TOTP_SECRET`). If the secret is set, login requires the 6-digit code.
- Rate-limit login: 5 attempts per 15 minutes per IP, then a 15 minute lockout. Use Upstash Ratelimit or a Supabase table. In-memory limits do not work on serverless.
- Every admin write: re-verify the session on the server, validate with Zod, check `Origin` header, write an audit log row (who, what, old value, new value, time, IP).
- Public API is read-only and returns only what the public page needs. Never expose admin fields, audit data or keys.
- Secrets live only in Vercel env vars. Nothing secret in the repo, `.env.local` is git-ignored, ship a `.env.example` with empty values.
- Security headers: HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and a CSP that allows only the site's own origin plus the exact third-party hosts in use.

---

## 9. Behaviour rules for you (the agent)

1. **Plan, then build.** Before each phase, write a 5 to 10 line plan. After each phase, run the checks for that phase and report results.
2. **Do not assume.** When a decision belongs to the owner (rates, legal wording, service details, handles, missing assets) list it under "Needs owner" and continue with everything else.
3. **No silent shortcuts.** If you skip, mock or stub anything, say so in the phase report.
4. **Verify, never claim.** Say "done" only after you ran the build, ran type-checks, ran lint, and opened the page in a browser at 390 px, 768 px and 1440 px widths.
5. **Match the reference.** When a visual choice is open, compare against the UI reference screenshot and the flyers, not against your own taste.
6. **Small, reviewable commits** per phase, with clear messages.
7. **Final report** must include: what was built, how to run it, env vars needed, the admin URL pattern, the seed rates that must be replaced, open questions.
