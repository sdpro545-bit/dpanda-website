# Reference Analysis — EasyA Challenges Layout (`UI website reference.jpg`)
**Measured for dPanda.ng UI Rebuild**

Date: 2026-11-06  
Reference: `UI website reference.jpg` (measured at 1199 px width, scaled for 1440 px desktop viewport)

---

## 1. Measured Layout & Structural Breakdown

### Part A: Header
- **Position & Dimensions:** Slim sticky bar, height ≈ 64 px [72 px at 1440].
- **Content Column:** Narrow, centered, ≈ 68% viewport width [≈ 980 px at 1440].
- **Left:** Logo mark + wordmark.
- **Right:**
  - 4 text links: `Gift Cards` · `Crypto` · `How it works` · `Contact`.
  - Font size: ≈ 13 px [14 px], medium weight (500), white (80% opacity), active link in accent mint/green (`#5CE87A`).
  - Right CTA Button: Small solid rectangular button with rounded corners (4 px radius), white background, dark `#04281A` bold text, ≈ 110 × 36 px. Label: `Trade`.

### Part B: Intro Block (Hero Centered)
- **Vertical Spacing:** Top padding ≈ 72 px [88 px], bottom gap to carousel ≈ 48 px.
- **Eyebrow Tag:**
  - Centered above heading.
  - Text: `TODAY'S RATES` (11 px [12 px], uppercase, tracking 0.08em, weight 600, color `#5CE87A`).
  - Container: Translucent dark green background (`rgba(92, 232, 122, 0.12)`), 1 px hairline border (`rgba(92, 232, 122, 0.25)`), 6 px border-radius, padding 4 px 12 px.
- **Main Heading (H1):**
  - Text: `Trade without limits` (two lines, centered).
  - Typeface: Plus Jakarta Sans, weight 500 / 600, size ≈ 42 px [48 px at 1440], line-height 1.05, tight letter-spacing (-0.025em). Color: `#FFFFFF`.
- **Paragraph:**
  - Max width: ≈ 380 px [430 px at 1440].
  - Text: `See today's naira rate for your gift card or crypto. Pick a card, enter the amount, then trade on WhatsApp.`
  - Size ≈ 14 px [15 px], line-height 1.5, color `rgba(255, 255, 255, 0.65)`.
- **Store-style Action Buttons:**
  - Two buttons side by side, gap ≈ 12 px.
  - Button 1: WhatsApp icon, two lines: small `Trade on` (10 px, 60% opacity) / bold `WhatsApp` (13 px [14 px]).
  - Button 2: Instagram icon, two lines: small `Follow us on` (10 px, 60% opacity) / bold `Instagram` (13 px [14 px]).
  - Dimensions: ≈ 140 × 44 px, background `rgba(0, 0, 0, 0.6)`, 1 px hairline border `rgba(255, 255, 255, 0.15)`, radius 8 px.

### Part C: 3D Arc Carousel (The Centrepiece)
- **Overall Stage:** Width 100%, max-width 1100 px, height ≈ 420 px.
- **Arc Geometry:**
  Cards are arranged along a circular arc with the pivot center below the carousel stage:
  - **Center Card (Index 0):**
    - Position: `translateX(0px)`, `translateY(0px)`, `rotateZ(0deg)`.
    - Scale: `1.0`, Opacity: `1.0`, Blur: `0px`, z-index: `30`.
    - Dimensions: Width ≈ 286 px, Height ≈ 320 px, border-radius `24 px`.
    - Surface: `rgba(255, 255, 255, 0.04)` fill, 1 px hairline border `rgba(255, 255, 255, 0.08)`.
    - **Icon Tile:** Overlaps card top edge by 40%. Size 76 × 76 px, 18 px radius, brand-colored glass slab with 3D render (coin or card).
    - **Card Body Elements:**
      - Title: 24 px [28 px], weight 600, centered.
      - Subtitle: 11 px, 50% opacity (e.g. `US e-code · Physical`).
      - Variant Switch: Segmented pill selector.
      - Amount Input: Clean numeric input with currency prefix.
      - Payout Display: `₦{payout}` in high-contrast `--yellow-400` (#FFD62E), tabular-nums.
      - Green Action Button: Solid `--green-400` (#5CE87A), dark green text (#04281A), 6 px radius, label `Trade on WhatsApp`.
  - **Near-Side Cards (Index ±1):**
    - Left Card: `translateX(-282px)`, `translateY(+40px)`, `rotateZ(-9deg)`, Scale: `0.90`, Opacity: `0.35`, Blur: `1px`, z-index: `20`.
    - Right Card: `translateX(+282px)`, `translateY(+40px)`, `rotateZ(+9deg)`, Scale: `0.90`, Opacity: `0.35`, Blur: `1px`, z-index: `20`.
  - **Hidden Outer Cards (Index ±2 and beyond):**
    - `translateX(±520px)`, `translateY(+90px)`, `rotateZ(±16deg)`, Scale: `0.80`, Opacity: `0.0`, Blur: `2px`, z-index: `10`, `pointer-events: none`.
- **Navigation Controls:**
  - Circular arrow buttons at far left and right edges: 38 px diameter, 1 px white border (`rgba(255, 255, 255, 0.2)`), subtle hover brightness, centered vertically on the carousel.

### Part D: Light-Beam Section ("Download the App" Stage)
- **Stage Dimensions:** Height ≈ 740 px [780 px at 1440].
- **Header:**
  - H2: `Your rate, then one tap to trade` (≈ 34 px [38 px], weight 600, centered).
  - Subtitle: `Your card, your amount and your naira payout go into the WhatsApp message for you.` (≈ 15 px, 65% opacity).
  - Store Buttons: Centered pair matching Part B.
- **Backdrop Lighting & Effects:**
  - Soft vertical light beams fanning upward from bottom center in mint-green tint (`rgba(92, 232, 122, 0.22)`).
  - Slow upward-drifting particle field: max 40 particles, 1–3 px diameter, 15–50% opacity, slow drift (3–6 px/s).
- **Floating 3D Objects Around Stage:**
  1. **Left Tile (`tile-clock`):** Dark translucent glass slab tile tilted ≈ 20°, glowing mint clock icon, caption `Rate time`.
  2. **Right Tile (`tile-chat`):** Dark translucent glass slab tile tilted ≈ -18°, glowing mint chat-bubble icon, direct link to WhatsApp.
  3. **Bottom-Center Tilted Rate Card:**
     - Perspective wrapper: `perspective: 1400px`.
     - 3D Transform: `rotateX(55deg) rotateZ(-12deg)`.
     - Profile Tile: `panda-bust` on a 3D glass slab overlapping top-left corner.
     - Label: `Today's rate`.
     - Large figure: `₦{rate}` per $1.
     - Progress bar: 30-second live price countdown.
     - Chips: `Set {hh:mm}`, `Paid in ₦`.
  4. **Upper Right Glass Disc:**
     - Round glass disc tilted in 3D.
     - Progress ring around circumference.
     - Label: `{n}s to next price`.

### Part E: Footer
- **Background & Shape:** Dark background (`--footer-bg: #031A10`), top-left corner features an elegant **curved concave notch cut-out** (radius ≈ 28 px).
- **Left:** Large dPanda logo + wordmark.
- **Top Right:** Social links (Instagram, X, WhatsApp).
- **Bottom Left:** `© 2026 dPanda.ng. All rights reserved.`
- **Bottom Right:** `Terms` · `Privacy` · `07052367655`.

---

## 2. Inferred Specifications & Behavior

| Aspect | Inferred Rule | Rationale / Implementation |
| :--- | :--- | :--- |
| **Carousel Arc Animation** | 0.7s interpolation with `cubic-bezier(0.22, 1, 0.36, 1)` | Creates the natural physical wheel rotation seen in modern 3D UI showcases. |
| **Floating Parallax** | ±10 px floating on a 6–9s slow sinusoidal loop | Recreates floating ambient depth from still reference. |
| **Beam Section Breathing** | Opacity pulses ±12% on 8s loop | Adds subtle organic stage atmosphere without harsh flickering. |
| **Mobile Carousel Layout** | Center card full width (max 340 px), side cards peeking 24 px at edges (0.9 scale, 0.35 opacity) | Ensures 360–390 px screens have finger-friendly touch targets. |

---

## 3. Excluded Elements (Strict Anti-Slop Bans)

1. **Avatar Stack & Builder Counts:** The reference displays an avatar stack and "20,100 builders". Excluded to prevent fake social proof; replaced with real variant chips and live rate metadata.
2. **Glowing Dots:** The reference displays a green dot before the count. Strictly excluded per anti-slop rules.
3. **Third-Party Logos without Official SVG:** Replaced by clean brand typography and official assets.
4. **Human Photos:** Replaced by the official approved 3D `panda-bust` render.
