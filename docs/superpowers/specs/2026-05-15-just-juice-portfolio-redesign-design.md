# Just Juice — Portfolio Redesign Design Spec

**Date:** 2026-05-15
**Status:** Approved (design phase) — implementation plan to follow

## 1. Goal

Redesign the existing Just-Juice e-commerce site so it functions as a showcase piece in the owner's portfolio. The redesign prioritizes **design taste and visual polish** over engineering complexity or end-to-end UX flow exploration. Functionality remains intact; the visual language is rebuilt from scratch.

## 2. Scope

### In scope (full visual redesign)
- **Landing page** (`LandingScreen.js`) — showpiece #1
- **Products listing** (`ProductsScreen.js`) — polished connector
- **Product detail** (`ProductScreen.js`) — showpiece #2

### Out of scope (light-touch cleanup only)
- Cart, Checkout, Auth (login/register), Profile, Your Orders, Admin Console — these inherit the new Chakra theme automatically. Spot fixes only: swap remaining orange/red accent colors, replace inline styles with new component variants, fix spacing issues. No structural changes.

### Explicitly removed
- **Dark mode toggle** — the cream + botanical-green palette doesn't translate cleanly to a dark scheme. All `useColorModeValue` calls in rewritten components are removed.

## 3. Design language

### Visual direction: Minimalist · Modern
Apple/Aesop restraint. Lots of whitespace, neutral palette with one accent, product-on-near-white photography, micro-interactions over flourish.

### Palette
| Token | Hex | Role |
|---|---|---|
| `cream` | `#FAF8F4` | Primary background (warm off-white) |
| `paper` | `#FFFFFF` | Card / product surface |
| `ink` | `#111111` | Primary text, footer background |
| `muted` | `#5C5C58` | Secondary text |
| `line` | `#E8E4DC` | Hairline borders, subtle dividers |
| `accent.green` | `#1F3A2E` | CTAs, links, active states, brand mark hover, eyebrow text |

Used sparingly: accent only on CTAs, active states, eyebrow labels, and link hovers.

### Typography
- **Display**: Fraunces (serif, modern). Weight 400 for hero headlines (often italic), 500 for section headings.
- **Body / UI**: Inter (sans). Regular, medium, semibold.
- **Mono**: System monospace stack for prices, volumes, and small numerical metadata.
- **Self-hosted** via `@fontsource/fraunces` and `@fontsource/inter` to avoid Google Fonts requests and FOUT.

Approximate type scale (px, desktop):

| Role | Size | Weight | Family | Notes |
|---|---|---|---|---|
| H1 hero | 64 | 400 | Fraunces | Italic accents OK |
| H2 section | 40 | 400 | Fraunces | |
| H3 sub-section | 28 | 400 | Fraunces | |
| H4 card title | 17–20 | 500 | Fraunces | |
| Eyebrow | 11 | 600 | Inter | uppercase, .18em tracking, accent.green |
| Body | 14 | 400 | Inter | line-height 1.6 |
| Mono | 12 | 400 | Monospace | Prices, volumes, percentages |

Headlines drop ~25% on mobile.

### Spacing
8px base scale. Container max-width 1280px. Section padding 96–128px (desktop) / 56–64px (mobile).

### Motion
- Library: `framer-motion`
- Patterns: fade-up on scroll (IntersectionObserver-based), gallery cross-fade, nutrition bar fill animations, subtle hover scale (≤1.03), sticky buy box on product detail.
- Durations: 300–600ms. Easing: ease-out. **Nothing bounces.** No parallax.

## 4. Page-level designs

### 4.1 Landing page

Seven sections, top to bottom:

1. **Hero** *(showpiece)* — split layout. Left: eyebrow `Cold-Pressed · Small Batch`, big Fraunces headline ("Pressed for *you*."), Inter subhead, two CTAs (primary "Shop the line →", ghost "Our process"). Right: hero photo (`juicelounge.jpg`) in 4:5 aspect.
2. **Featured products** — "The Line" / "Four to start with." Four product cards in a 4-up grid. Each card uses the standard product card pattern (see 4.2).
3. **Our process** — three numbered steps (Source / Press / Deliver) with italic Fraunces numerals.
4. **Editorial moment** — full-bleed deep-green band with pull quote in italic Fraunces. Background image: `landing.jpg`.
5. **Shop by category** — four square gradient tiles (Greens / Reds / Citrus / Berries) linking to filtered product listing.
6. **Newsletter signup** — quiet, single-line, centered. Cream background.
7. **Footer** — see 4.5.

**Motion**: Hero text + photo fade-up on load (staggered 120ms). Sections 2–5 fade-up on viewport entry. Category cards scale to 1.02 on hover.

### 4.2 Products listing

- **Header** — eyebrow `The Full Line`, Fraunces title "Every bottle, all at once.", Inter description.
- **Toolbar** — left: category filter pills (All / Greens / Reds / Citrus / Berries / Roots). Active pill is filled `accent.green` with `cream` text. Right: result count in mono + sort `<select>` styled as a pill.
- **Grid** — 4-up desktop, 2-up tablet, 1-up phone. Generous gap. Cards on cream background.
- **Card** — 3:4 image area on white surface with hairline border, top-left badge ("New" in cream pill with accent.green eyebrow text, or "Sold out" in ink pill with cream text), bottom-half "Add to cart" pill slides up on hover (opacity 0→1, translateY 4px→0, 250ms ease-out). Below image: category eyebrow + Fraunces name on left, mono price + volume on right.
- **Sold-out cards** — image opacity 0.55, info opacity 0.6, hover pill disabled.

### 4.3 Product detail

Six sections:

1. **Gallery + buy box** *(showpiece)*
   - Left: vertical thumbnail strip (80px square) + large 3:4 main image. Active thumb has `accent.green` border. Click-to-swap with cross-fade.
   - Right: category eyebrow → Fraunces product name → star rating + count → Inter description (max 380px width) → Fraunces price + mono volume → qty stepper + primary "Add to cart →" → stock indicator (green dot + text).
   - **Sticky on desktop ≥1024px**: buy box follows scroll until the next section starts.

2. **Ingredients** — eyebrow `Six things, that's it.` + Fraunces title. Six circles in a row (3-up on mobile), each circle a gradient that hints at the ingredient color (kale = green, ginger = warm yellow, etc.). Name in Fraunces 14, percentage in mono.

3. **Nutrition viz** *(showpiece)* — two-column. Left: animated bar chart (6 rows: calories, sugar, vit C, vit A, iron, potassium). Bars fill from 0 → final width when section enters viewport (800ms ease-out). Right: "The full panel" card listing standard nutrition rows.

4. **Story strip** — same pattern as landing's editorial moment, scoped to this product. Deep-green band with pull quote.

5. **Reviews** — eyebrow with review count + average, Fraunces title, three review cards (star row, Fraunces quote, mono attribution).

6. **Related products** — "Pairs nicely with" — four mini product cards (no quick-add, just click-to-navigate).

### 4.4 Navbar

- Sticky, cream background, 1px ink-on-cream hairline below.
- Left: `Just Juice` wordmark in Fraunces 18, links to home.
- Center/right: nav links in Inter 12 (Shop / The Line / Our Process / Cart). Active route has a 1px accent.green underline.
- Cart link shows count (e.g., `Cart (2)`) in Inter 12.
- **Logged in**: cart link followed by user menu button (name + chevron). Dropdown items: Profile / Your Orders / [Admin Console if isAdmin] / Sign out.
- **Logged out**: cart link followed by `Sign in` (ghost) and `Sign up` (primary, hidden on mobile).
- Mobile (<768px): hamburger menu collapses links into a stacked sheet.

### 4.5 Footer

- Ink background `#111`, cream text.
- Four columns: Brand (wordmark + tagline) / Shop / Brand / Support.
- Column headings in Inter 10, 0.14em tracking, uppercase, cream-50%.
- Stacks to 2-column on mobile, single column under 480px.

## 5. Architecture

### File layout

```
client/src/
├── theme/                          NEW
│   ├── index.js                    extendTheme() entry
│   ├── colors.js                   palette tokens
│   ├── typography.js               fonts, scale, line-heights
│   ├── spacing.js                  scale + container widths
│   ├── styles.js                   global styles (body bg, font smoothing)
│   └── components/
│       ├── Button.js               primary / ghost / link variants
│       ├── Heading.js              display / section / sub / eyebrow variants
│       ├── Container.js            max-w 1280, responsive padding
│       └── ProductCard.js          card variant tokens (border, radius)
│
├── components/
│   ├── shared/                     NEW
│   │   ├── Eyebrow.jsx
│   │   ├── SectionHeading.jsx      eyebrow + serif title pattern
│   │   ├── Reveal.jsx              Framer Motion fade-up wrapper
│   │   └── StickyBuyBox.jsx
│   ├── landing/                    NEW
│   │   ├── Hero.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── ProcessStrip.jsx
│   │   ├── EditorialBand.jsx
│   │   ├── CategoryGrid.jsx
│   │   └── NewsletterSignup.jsx
│   ├── products/                   NEW
│   │   ├── ProductCard.jsx         replaces components/ProductCard.js
│   │   ├── FilterPills.jsx
│   │   └── SortSelect.jsx
│   ├── productDetail/              NEW
│   │   ├── ProductGallery.jsx
│   │   ├── BuyBox.jsx
│   │   ├── IngredientGrid.jsx
│   │   ├── NutritionViz.jsx
│   │   ├── StoryStrip.jsx
│   │   ├── ReviewsGrid.jsx
│   │   └── RelatedProducts.jsx
│   ├── Navbar.jsx                  REWRITTEN (replaces Navbar.js)
│   └── Footer.jsx                  REWRITTEN
│
├── screens/
│   ├── LandingScreen.js            REWRITTEN — composes landing/ section components
│   ├── ProductsScreen.js           REWRITTEN
│   └── ProductScreen.js            REWRITTEN
│
└── index.css                       UPDATED — font imports, base resets
```

### Dependencies to add
- `framer-motion` — scroll reveals, gallery cross-fade, bar animations, sticky buy box.
- `@fontsource/fraunces` and `@fontsource/inter` — self-hosted webfonts.

### Theme structure
`ChakraProvider` wraps the app with a custom theme via `extendTheme`. The custom theme defines:
- `colors` (cream / paper / ink / muted / line / accent.green plus helper aliases like `brand` → `accent.green`)
- `fonts` (`heading`: Fraunces, `body`: Inter, `mono`: monospace stack)
- `fontSizes`, `lineHeights`, `letterSpacings`
- `space` overrides if needed (Chakra's defaults mostly fit)
- `radii` (sm: 6px, md: 8px, lg: 12px, full: 999px)
- `shadows` — minimal use; subtle elevation only
- `components.Button.variants` — primary (pill, accent.green, cream text), ghost (outline ink, ink text), link (underline-on-hover, ink)
- `components.Heading.variants` — display (Fraunces 64), section (Fraunces 40), sub (Fraunces 28), eyebrow (Inter 11, uppercase, accent.green)
- `components.Container` — max-width 1280, responsive horizontal padding
- `styles.global` — `body { background: cream }`, font smoothing, smooth scroll

### Data model
The current `Product` model may be missing fields the redesign relies on. Verify and add as needed in `server/models/Product.js`:
- `category` (enum: `greens`, `reds`, `citrus`, `berries`, `roots`)
- `volume` (string, e.g., `"16 oz"`)
- `calories` (number)
- `ingredients` (array of `{ name: string, percentage: number }`)
- `nutrition` (object: `sugar_g`, `vitamin_c_pct`, `vitamin_a_pct`, `iron_pct`, `potassium_mg`, `fat_g`, `sodium_mg`, `carbs_g`, `fiber_g`, `protein_g`)

For development and the portfolio demo, mock data may be used inline in the rewritten product detail page if the DB doesn't include these fields. The implementation plan will sequence this: real schema additions if straightforward, mock-then-migrate otherwise.

## 6. Component responsibilities

Each new component has a single, narrow responsibility. Internal Chakra primitives are wrapped; consumers don't pass Chakra props through.

- **`Reveal`** — wraps children in a Framer Motion `motion.div` that fades + translates up when the viewport intersects it once. Props: `delay` (number, default 0), `children`. No other knobs.
- **`Eyebrow`** — renders uppercase tracked Inter 11 text in `accent.green`. Props: `children`.
- **`SectionHeading`** — eyebrow + Fraunces title pair. Props: `eyebrow`, `title`, optional `align` ('left' | 'center', default 'left').
- **`ProductCard`** — image, badge (new / sold-out), category, name, price, volume, hover quick-add. Props: `product` (the existing product object).
- **Landing section components** — each accepts its own minimal data (e.g., `<FeaturedProducts products={products} />`) and renders one section.
- **Product detail section components** — each accepts the product as a prop and renders one section.

## 7. Light-touch cleanup checklist (out-of-scope screens)

For Cart, Checkout, Auth, Profile, Your Orders, Admin Console:
- [ ] No orange/red brand colors remain (replace with `accent.green` or `ink` per the role).
- [ ] All `<Button>` instances use one of the three new variants — no inline `bg`/`color` overrides.
- [ ] All `useColorModeValue` calls removed (dark mode is gone).
- [ ] Headings use `Heading variant="section"` or `"sub"` instead of arbitrary Chakra `size`.
- [ ] No glaring spacing inconsistencies (Chakra's `gap`/`p`/`m` props should mostly work as-is once theme spacing is tightened).
- [ ] Forms (login/register, shipping, etc.) use a consistent input style (rounded full or rounded md — pick one in implementation plan).

## 8. Testing approach

Manual visual QA scoped to portfolio purposes — automated tests are out of scope.

- **Breakpoints**: verify the three redesigned screens at 1440, 1024, 768, and 375 px.
- **Critical paths**: navigate Landing → Products → Product Detail → Add to Cart → Cart. No console errors. No layout shifts on font load.
- **Interactions**: hover quick-add on listing cards, thumbnail swap on detail, bar fill on viewport entry, sticky buy box on desktop scroll, category filter pills on listing.
- **Light-touch screens**: walk through cart, checkout, login, register, profile, orders, admin. Confirm nothing looks like a different website.
- **Accessibility quick check**: keyboard focus visible on all CTAs, alt text on product images, color contrast at AA on text-on-cream and text-on-green.

## 9. Open items for implementation plan

- Decide whether to add real schema fields or mock data for ingredients/nutrition.
- Decide product card hover behavior on touch devices (no hover state — quick-add appears as a permanent "Add" button on touch).
- Decide implementation order: theme-first (then rebuild screens), or screen-first (then refactor theme).
- Decide how to handle the `juicelounge.jpg` / `landing.jpg` images — they may need cropping for the hero (4:5) and editorial band (full-bleed).
- Decide whether the newsletter signup is a real form (wired to a stub endpoint) or visual-only for the portfolio demo.

## 10. Out of scope (explicit)
- Backend API redesign.
- Authentication, payment, or admin functionality changes.
- Performance optimization beyond what comes for free (font-display, tree-shaken Framer Motion).
- Real analytics / SEO.
- Automated tests (unit, e2e, visual regression).
- Internationalization.
