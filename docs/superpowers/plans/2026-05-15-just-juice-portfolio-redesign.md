# Just Juice Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Just-Juice React client's visual language across Landing, Products listing, and Product detail screens into a minimalist, editorial portfolio piece, while lightly cleaning up the rest of the app for visual consistency.

**Architecture:** A custom Chakra UI v2 theme (cream + botanical green, Fraunces + Inter, generous spacing, restrained motion) is built first as the foundation. Reusable shared primitives (`Reveal`, `Eyebrow`, `SectionHeading`) layer on top. Each of the three showcase screens is rebuilt as a thin screen file that composes focused section components living in `components/landing/`, `components/products/`, and `components/productDetail/`. Other screens (cart, checkout, auth, profile, orders, admin) inherit the new theme and get spot-fix passes — they are not restructured.

**Tech Stack:** React 18, Chakra UI v2.5, Framer Motion 10 (already installed), `@fontsource/fraunces`, `@fontsource/inter`, Redux Toolkit, React Router v6, Node 24 LTS.

**Reference spec:** [`docs/superpowers/specs/2026-05-15-just-juice-portfolio-redesign-design.md`](../specs/2026-05-15-just-juice-portfolio-redesign-design.md)

**Note on TDD:** This is a visual-design plan. Automated tests are out of scope per the spec (§8). "Verify" steps below are concrete, manual checks against acceptance criteria. Each task ends with a dev-server check at a specific URL with specific visual properties to confirm before committing.

**Conventions:**
- All paths are relative to repo root (`Just-Juice-React/`).
- Dev server: from repo root, `npm run app` runs both client (`localhost:3000`) and server (`localhost:5000`). To run just the client, `cd client && npm start`.
- Always commit at the end of a task — one task, one commit.
- Each new component file uses `.jsx` (per the spec); existing `.js` files keep their extension when modified in place.

---

## File Structure Summary

**New files:**
```
client/.nvmrc
client/src/theme/index.js
client/src/theme/colors.js
client/src/theme/typography.js
client/src/theme/spacing.js
client/src/theme/styles.js
client/src/theme/components/Button.js
client/src/theme/components/Heading.js
client/src/theme/components/Container.js
client/src/components/shared/Reveal.jsx
client/src/components/shared/Eyebrow.jsx
client/src/components/shared/SectionHeading.jsx
client/src/components/shared/StickyBuyBox.jsx
client/src/components/landing/Hero.jsx
client/src/components/landing/FeaturedProducts.jsx
client/src/components/landing/ProcessStrip.jsx
client/src/components/landing/EditorialBand.jsx
client/src/components/landing/CategoryGrid.jsx
client/src/components/landing/NewsletterSignup.jsx
client/src/components/products/ProductCard.jsx
client/src/components/products/FilterPills.jsx
client/src/components/products/SortSelect.jsx
client/src/components/productDetail/ProductGallery.jsx
client/src/components/productDetail/BuyBox.jsx
client/src/components/productDetail/IngredientGrid.jsx
client/src/components/productDetail/NutritionViz.jsx
client/src/components/productDetail/StoryStrip.jsx
client/src/components/productDetail/ReviewsGrid.jsx
client/src/components/productDetail/RelatedProducts.jsx
client/src/data/productMockData.js
```

**Files rewritten:**
```
client/src/App.js                        ← inject custom theme; force light color mode
client/src/index.css                     ← font imports, global base
client/src/components/Navbar.js          ← rewritten (no dark mode, new theme tokens)
client/src/components/Footer.js          ← rewritten
client/src/screens/LandingScreen.js      ← rewritten — composes landing/ components
client/src/screens/ProductsScreen.js     ← rewritten
client/src/screens/ProductScreen.js      ← rewritten
client/src/components/ProductCard.js     ← deleted (replaced by products/ProductCard.jsx)
```

**Files touched (light cleanup only):**
```
client/src/screens/CartScreen.js
client/src/screens/CheckoutScreen.js
client/src/screens/LoginScreen.js
client/src/screens/RegistrationScreen.js
client/src/screens/ProfileScreen.js
client/src/screens/YourOrdersScreen.js
client/src/screens/OrderSuccessScreen.js
client/src/screens/AdminConsoleScreen.js
client/src/components/CartItem.js
client/src/components/CartOrderSummary.js
client/src/components/CheckoutItem.js
client/src/components/CheckoutOrderSummary.js
client/src/components/Productstab.js
client/src/components/ProductTableItem.js
client/src/components/UsersTab.js
client/src/components/AddNewProduct.js
client/src/components/PasswordTextField.js
client/src/components/TextField.js
client/src/components/ShippingInformation.js
client/src/components/ComfirmRemovalAlert.js
client/src/components/PaymentSuccessModal.js
client/src/components/PaymentErrorModal.js
client/src/components/PayPalButton.js
```

**Package.json edits:**
```
package.json                             ← engines + node version note
client/package.json                      ← engines, add fontsources, remove "axois" typo
```

---

## Task 0: Preflight — Node version, dependency hygiene, font install

**Files:**
- Create: `client/.nvmrc`
- Modify: `package.json` (root)
- Modify: `client/package.json`

- [ ] **Step 1: Pin Node 24 LTS via `.nvmrc`**

Create `client/.nvmrc`:

```
24
```

- [ ] **Step 2: Add `engines` to both `package.json` files**

In **root `package.json`**, find the existing `{ ... }` object and add an `"engines"` key at the top level:

```json
"engines": {
  "node": ">=24.0.0"
}
```

In **`client/package.json`**, after the `"private": true` line, add:

```json
"engines": {
  "node": ">=24.0.0"
},
```

- [ ] **Step 3: Remove the bogus `axois` dep and add font packages**

In `client/package.json`, delete this line entirely:

```json
"axois": "^0.0.1-security",
```

And add these two lines into `"dependencies"` (alphabetized):

```json
"@fontsource/fraunces": "^5.0.0",
"@fontsource/inter": "^5.0.0",
```

- [ ] **Step 4: Activate the right Node and reinstall**

Run from repo root:

```bash
nvm install     # picks up .nvmrc — installs Node 24 if missing
nvm use         # switches the shell to Node 24
node -v         # expect: v24.x.x
cd client && rm -rf node_modules package-lock.json && npm install
cd .. && rm -rf node_modules package-lock.json && npm install
```

Expected: both installs complete with 0 errors. `framer-motion@^10.0.1` and `@chakra-ui/react@^2.5.1` resolve cleanly. `@fontsource/fraunces` and `@fontsource/inter` appear in `client/node_modules/@fontsource/`.

- [ ] **Step 5: Smoke-test the dev server**

```bash
npm run app
```

Open `http://localhost:3000`. Expected: the current (un-redesigned) site loads with no console errors. Stop the dev server with Ctrl-C once confirmed.

- [ ] **Step 6: Commit**

```bash
git add client/.nvmrc package.json client/package.json client/package-lock.json package-lock.json
git commit -m "chore: pin Node 24 LTS, add Fraunces/Inter, remove axois typo"
```

---

## Task 1: Theme — color tokens

**Files:**
- Create: `client/src/theme/colors.js`

- [ ] **Step 1: Write `colors.js`**

```js
// client/src/theme/colors.js
// Brand palette for the portfolio redesign.
// All UI colors should resolve through these tokens — no hex literals in components.

const colors = {
  cream: '#FAF8F4',
  paper: '#FFFFFF',
  ink: '#111111',
  muted: '#5C5C58',
  line: '#E8E4DC',
  accent: {
    green: '#1F3A2E',
    greenHover: '#2A4D3D',
    greenSoft: '#E6EBE8',
  },
  // Status colors kept simple — used only in toasts and badges.
  status: {
    success: '#1F3A2E',
    error: '#7A1F1F',
    info: '#1A1A1A',
  },
  // Chakra aliases — let theme tokens map to Chakra's expected scale.
  brand: {
    50:  '#E6EBE8',
    100: '#C6D2CB',
    500: '#1F3A2E',
    600: '#1A2F26',
    700: '#15251F',
  },
};

export default colors;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/theme/colors.js
git commit -m "feat(theme): add brand color tokens"
```

---

## Task 2: Theme — typography tokens and font imports

**Files:**
- Create: `client/src/theme/typography.js`

- [ ] **Step 1: Write `typography.js`**

```js
// client/src/theme/typography.js
// Type system: Fraunces for display (serif), Inter for body and UI (sans).

const typography = {
  fonts: {
    heading: `'Fraunces', 'Cormorant Garamond', Georgia, serif`,
    body:    `'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif`,
    mono:    `ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace`,
  },
  fontSizes: {
    xs:   '11px',
    sm:   '12px',
    md:   '14px',
    lg:   '16px',
    xl:   '20px',
    '2xl': '28px',
    '3xl': '40px',
    '4xl': '64px',
  },
  fontWeights: {
    normal:   400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },
  lineHeights: {
    none:    1,
    tight:   1.05,
    snug:    1.2,
    normal:  1.6,
    relaxed: 1.75,
  },
  letterSpacings: {
    tighter: '-0.02em',
    tight:   '-0.015em',
    normal:  '0',
    wide:    '0.04em',
    wider:   '0.14em',
    widest:  '0.18em',
  },
};

export default typography;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/theme/typography.js
git commit -m "feat(theme): add typography tokens"
```

---

## Task 3: Theme — spacing, radii, global styles

**Files:**
- Create: `client/src/theme/spacing.js`
- Create: `client/src/theme/styles.js`

- [ ] **Step 1: Write `spacing.js`**

```js
// client/src/theme/spacing.js
// 8px base scale. Chakra's default mostly aligns; overrides exist for our largest section gaps.

const spacing = {
  radii: {
    none: '0',
    sm:   '6px',
    md:   '8px',
    lg:   '12px',
    full: '999px',
  },
  shadows: {
    // Used very sparingly — minimalism doesn't lean on shadows.
    sm: '0 1px 2px rgba(17,17,17,0.04)',
    md: '0 4px 12px rgba(17,17,17,0.06)',
    lg: '0 12px 28px rgba(17,17,17,0.08)',
  },
  sizes: {
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
};

export default spacing;
```

- [ ] **Step 2: Write `styles.js`**

```js
// client/src/theme/styles.js
// Global styles applied via Chakra's `styles.global` config.

const styles = {
  global: {
    'html, body': {
      bg: 'cream',
      color: 'ink',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontFamily: 'body',
      scrollBehavior: 'smooth',
    },
    '*::selection': {
      bg: 'accent.greenSoft',
      color: 'ink',
    },
    a: {
      color: 'ink',
      textDecoration: 'none',
      _hover: { color: 'accent.green' },
    },
    'h1, h2, h3, h4': {
      fontFamily: 'heading',
      color: 'ink',
      letterSpacing: 'tight',
    },
  },
};

export default styles;
```

- [ ] **Step 3: Commit**

```bash
git add client/src/theme/spacing.js client/src/theme/styles.js
git commit -m "feat(theme): add spacing, radii, and global styles"
```

---

## Task 4: Theme — Button component variants

**Files:**
- Create: `client/src/theme/components/Button.js`

- [ ] **Step 1: Write `Button.js`**

```js
// client/src/theme/components/Button.js
// Three variants: primary (green pill), ghost (outline ink), link (underline).

const Button = {
  baseStyle: {
    fontFamily: 'body',
    fontWeight: 'semibold',
    borderRadius: 'full',
    letterSpacing: 'normal',
    _focusVisible: {
      boxShadow: '0 0 0 2px #1F3A2E',
      outline: 'none',
    },
  },
  sizes: {
    sm: { fontSize: 'xs', px: '14px', py: '8px',  h: 'auto', minH: '32px' },
    md: { fontSize: 'sm', px: '20px', py: '10px', h: 'auto', minH: '40px' },
    lg: { fontSize: 'sm', px: '22px', py: '12px', h: 'auto', minH: '46px' },
  },
  variants: {
    primary: {
      bg: 'accent.green',
      color: 'cream',
      _hover: { bg: 'accent.greenHover', _disabled: { bg: 'accent.green' } },
      _active: { bg: 'accent.greenHover' },
      _disabled: { opacity: 0.5, cursor: 'not-allowed' },
    },
    ghost: {
      bg: 'transparent',
      color: 'ink',
      border: '1px solid',
      borderColor: 'ink',
      _hover: { bg: 'ink', color: 'cream' },
      _active: { bg: 'ink', color: 'cream' },
    },
    link: {
      bg: 'transparent',
      color: 'ink',
      borderRadius: 'none',
      px: 0,
      _hover: { color: 'accent.green', textDecoration: 'underline', textUnderlineOffset: '4px' },
    },
  },
  defaultProps: {
    variant: 'primary',
    size: 'md',
  },
};

export default Button;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/theme/components/Button.js
git commit -m "feat(theme): add Button variants"
```

---

## Task 5: Theme — Heading and Container component config

**Files:**
- Create: `client/src/theme/components/Heading.js`
- Create: `client/src/theme/components/Container.js`

- [ ] **Step 1: Write `Heading.js`**

```js
// client/src/theme/components/Heading.js
// Variants map to the type scale defined in the spec (§3 Typography).

const Heading = {
  baseStyle: {
    fontFamily: 'heading',
    color: 'ink',
    letterSpacing: 'tight',
    lineHeight: 'tight',
    fontWeight: 'normal',
  },
  variants: {
    display: {
      fontSize: { base: '44px', md: '56px', lg: '64px' },
      lineHeight: 'tight',
    },
    section: {
      fontSize: { base: '30px', md: '36px', lg: '40px' },
      lineHeight: 'snug',
      fontWeight: 'medium',
    },
    sub: {
      fontSize: { base: '22px', md: '26px', lg: '28px' },
      fontWeight: 'medium',
    },
    eyebrow: {
      fontFamily: 'body',
      fontSize: 'xs',
      fontWeight: 'semibold',
      letterSpacing: 'widest',
      textTransform: 'uppercase',
      color: 'accent.green',
      lineHeight: 'normal',
    },
  },
  defaultProps: {
    variant: 'section',
  },
};

export default Heading;
```

- [ ] **Step 2: Write `Container.js`**

```js
// client/src/theme/components/Container.js
// Single max-width with responsive horizontal padding.

const Container = {
  baseStyle: {
    maxW: 'container.xl',   // 1280px
    px:   { base: '20px', md: '28px', lg: '32px' },
    mx:   'auto',
  },
};

export default Container;
```

- [ ] **Step 3: Commit**

```bash
git add client/src/theme/components/Heading.js client/src/theme/components/Container.js
git commit -m "feat(theme): add Heading variants and Container config"
```

---

## Task 6: Theme — entrypoint + wire up `App.js`, drop dark mode

**Files:**
- Create: `client/src/theme/index.js`
- Modify: `client/src/App.js`
- Modify: `client/src/index.css`

- [ ] **Step 1: Write `theme/index.js`**

```js
// client/src/theme/index.js
// extendTheme wires our tokens into Chakra. Force light mode permanently.

import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';
import styles from './styles';
import Button from './components/Button';
import Heading from './components/Heading';
import Container from './components/Container';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  ...typography,
  ...spacing,
  styles,
  components: {
    Button,
    Heading,
    Container,
  },
});

export default theme;
```

- [ ] **Step 2: Update `index.css` — font imports and base reset**

Replace the entire contents of `client/src/index.css` with:

```css
/* Self-hosted webfonts — see @fontsource packages installed in Task 0. */
@import '@fontsource/fraunces/400.css';
@import '@fontsource/fraunces/400-italic.css';
@import '@fontsource/fraunces/500.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/inter/700.css';

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Chakra global styles will set bg, color, font-family. */
}

code {
  font-family: ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace;
}

/* Ensure the page is at least one viewport tall, so footer settles at the bottom. */
#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}
```

- [ ] **Step 3: Rewrite `App.js` to use the new theme**

Replace the entire contents of `client/src/App.js` with:

```jsx
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingScreen } from './screens/LandingScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminConsoleScreen from './screens/AdminConsoleScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import YourOrdersScreen from './screens/YourOrdersScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<LandingScreen />} />
            <Route path='/products' element={<ProductsScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/registration' element={<RegistrationScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/checkout' element={<CheckoutScreen />} />
            <Route path='/your-orders' element={<YourOrdersScreen />} />
            <Route path='/admin-console' element={<AdminConsoleScreen />} />
            <Route path='/order-success' element={<OrderSuccessScreen />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
```

- [ ] **Step 4: Verify in dev server**

```bash
npm run app
```

Open `http://localhost:3000`. Expected:
- Page body background is warm cream `#FAF8F4` (not pure white).
- Body text renders in Inter (sans, distinctly "modern").
- Any heading elements render in Fraunces (serif). The existing landing "Just Juice" heading should now look like a serif.
- No console errors mentioning theme, font loading, or color mode.

Note: the Navbar still has dark mode toggle remnants — that's expected; we'll fix it in Task 10.

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add client/src/theme/index.js client/src/index.css client/src/App.js
git commit -m "feat(theme): wire custom Chakra theme, drop dark mode, self-host fonts"
```

---

## Task 7: Shared component — `Reveal` (Framer Motion fade-up)

**Files:**
- Create: `client/src/components/shared/Reveal.jsx`

- [ ] **Step 1: Write `Reveal.jsx`**

```jsx
// client/src/components/shared/Reveal.jsx
// Fades children up by 8px on viewport entry. Single-shot (once: true) by design — we want
// the reveal to feel like the page loading in, not a re-trigger on scroll-up.

import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';

const MotionBox = motion(Box);

const Reveal = ({ children, delay = 0, ...rest }) => (
  <MotionBox
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -60px 0px' }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    {...rest}
  >
    {children}
  </MotionBox>
);

export default Reveal;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/shared/Reveal.jsx
git commit -m "feat(shared): add Reveal fade-up wrapper"
```

---

## Task 8: Shared components — `Eyebrow` and `SectionHeading`

**Files:**
- Create: `client/src/components/shared/Eyebrow.jsx`
- Create: `client/src/components/shared/SectionHeading.jsx`

- [ ] **Step 1: Write `Eyebrow.jsx`**

```jsx
// client/src/components/shared/Eyebrow.jsx
// Uppercase tracked label that appears above section titles.

import { Heading } from '@chakra-ui/react';

const Eyebrow = ({ children, color, ...rest }) => (
  <Heading as='span' variant='eyebrow' color={color || 'accent.green'} {...rest}>
    {children}
  </Heading>
);

export default Eyebrow;
```

- [ ] **Step 2: Write `SectionHeading.jsx`**

```jsx
// client/src/components/shared/SectionHeading.jsx
// Eyebrow + Fraunces title pair. Used at the top of nearly every content section.

import { Box, Heading } from '@chakra-ui/react';
import Eyebrow from './Eyebrow';

const SectionHeading = ({
  eyebrow,
  title,
  level = 'section',   // 'display' | 'section' | 'sub'
  align = 'left',
  ...rest
}) => (
  <Box textAlign={align} {...rest}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <Heading as='h2' variant={level} mt={eyebrow ? '8px' : 0}>
      {title}
    </Heading>
  </Box>
);

export default SectionHeading;
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/shared/Eyebrow.jsx client/src/components/shared/SectionHeading.jsx
git commit -m "feat(shared): add Eyebrow and SectionHeading primitives"
```

---

## Task 9: Mock data helper — ingredients, nutrition, volume

**Files:**
- Create: `client/src/data/productMockData.js`

The product schema lacks `ingredients`, `nutrition`, `volume`, and a `subtitle`. Per spec §5 (data model), we mock these client-side. The helper resolves mock fields by the product's `category` so the same juice category gets consistent data.

- [ ] **Step 1: Write `productMockData.js`**

```js
// client/src/data/productMockData.js
// Mock ingredient + nutrition data by category. Looked up at render-time from a product's
// `category` field. Real schema migration can replace this later (spec §9).

const MOCKS_BY_CATEGORY = {
  greens: {
    subtitle: 'Six ingredients. No shortcuts.',
    volume: '16 oz',
    ingredients: [
      { name: 'Kale',        percentage: 32, swatch: 'linear-gradient(180deg,#a3b58a,#3f5d2c)' },
      { name: 'Green Apple', percentage: 26, swatch: 'linear-gradient(180deg,#bbf7d0,#16a34a)' },
      { name: 'Cucumber',    percentage: 22, swatch: 'linear-gradient(180deg,#d9f99d,#65a30d)' },
      { name: 'Ginger',      percentage: 10, swatch: 'linear-gradient(180deg,#fde68a,#b45309)' },
      { name: 'Lemon',       percentage:  7, swatch: 'linear-gradient(180deg,#fef08a,#eab308)' },
      { name: 'Mint',        percentage:  3, swatch: 'linear-gradient(180deg,#86efac,#16a34a)' },
    ],
    nutrition: {
      calories:    { label: 'Calories',    value: 220,   max: 800, unit: '' },
      sugar:       { label: 'Sugar',       value: 24,    max: 40,  unit: 'g' },
      vitaminC:    { label: 'Vitamin C',   value: 182,   max: 200, unit: '%' },
      vitaminA:    { label: 'Vitamin A',   value: 120,   max: 200, unit: '%' },
      iron:        { label: 'Iron',        value: 8,     max: 100, unit: '%' },
      potassium:   { label: 'Potassium',   value: 920,   max: 2000, unit: 'mg' },
    },
    panel: [
      ['Total fat',     '0g'],
      ['Sodium',        '45mg'],
      ['Total carbs',   '52g'],
      ['Dietary fiber', '4g'],
      ['Protein',       '3g'],
    ],
    story: '"Most green juices taste like someone lost a bet. This one tastes like a Tuesday afternoon."',
  },
  reds: {
    subtitle: 'Earthy, root-forward, gently sweet.',
    volume: '16 oz',
    ingredients: [
      { name: 'Beet',        percentage: 34, swatch: 'linear-gradient(180deg,#fda4af,#9f1239)' },
      { name: 'Carrot',      percentage: 24, swatch: 'linear-gradient(180deg,#fdba74,#c2410c)' },
      { name: 'Apple',       percentage: 20, swatch: 'linear-gradient(180deg,#fecaca,#dc2626)' },
      { name: 'Lemon',       percentage: 12, swatch: 'linear-gradient(180deg,#fef08a,#eab308)' },
      { name: 'Ginger',      percentage:  8, swatch: 'linear-gradient(180deg,#fde68a,#b45309)' },
      { name: 'Pomegranate', percentage:  2, swatch: 'linear-gradient(180deg,#fca5a5,#991b1b)' },
    ],
    nutrition: {
      calories:    { label: 'Calories',    value: 240,   max: 800, unit: '' },
      sugar:       { label: 'Sugar',       value: 30,    max: 40,  unit: 'g' },
      vitaminC:    { label: 'Vitamin C',   value: 90,    max: 200, unit: '%' },
      vitaminA:    { label: 'Vitamin A',   value: 180,   max: 200, unit: '%' },
      iron:        { label: 'Iron',        value: 14,    max: 100, unit: '%' },
      potassium:   { label: 'Potassium',   value: 850,   max: 2000, unit: 'mg' },
    },
    panel: [
      ['Total fat',     '0.5g'],
      ['Sodium',        '85mg'],
      ['Total carbs',   '56g'],
      ['Dietary fiber', '5g'],
      ['Protein',       '3g'],
    ],
    story: '"Beets are an acquired taste. We acquired it for you."',
  },
  citrus: {
    subtitle: 'Bright, sharp, made for mornings.',
    volume: '16 oz',
    ingredients: [
      { name: 'Orange',     percentage: 42, swatch: 'linear-gradient(180deg,#fdba74,#ea580c)' },
      { name: 'Grapefruit', percentage: 24, swatch: 'linear-gradient(180deg,#fda4af,#e11d48)' },
      { name: 'Lemon',      percentage: 16, swatch: 'linear-gradient(180deg,#fef08a,#eab308)' },
      { name: 'Apple',      percentage: 12, swatch: 'linear-gradient(180deg,#fecaca,#dc2626)' },
      { name: 'Ginger',     percentage:  4, swatch: 'linear-gradient(180deg,#fde68a,#b45309)' },
      { name: 'Turmeric',   percentage:  2, swatch: 'linear-gradient(180deg,#fde047,#a16207)' },
    ],
    nutrition: {
      calories:    { label: 'Calories',    value: 200,   max: 800, unit: '' },
      sugar:       { label: 'Sugar',       value: 28,    max: 40,  unit: 'g' },
      vitaminC:    { label: 'Vitamin C',   value: 220,   max: 200, unit: '%' },
      vitaminA:    { label: 'Vitamin A',   value: 60,    max: 200, unit: '%' },
      iron:        { label: 'Iron',        value: 4,     max: 100, unit: '%' },
      potassium:   { label: 'Potassium',   value: 580,   max: 2000, unit: 'mg' },
    },
    panel: [
      ['Total fat',     '0g'],
      ['Sodium',        '20mg'],
      ['Total carbs',   '48g'],
      ['Dietary fiber', '2g'],
      ['Protein',       '2g'],
    ],
    story: '"A glass of sunrise, pressed into 16 ounces."',
  },
  berries: {
    subtitle: 'Wild, deep, almost wine-like.',
    volume: '16 oz',
    ingredients: [
      { name: 'Blueberry',   percentage: 32, swatch: 'linear-gradient(180deg,#c4b5fd,#5b21b6)' },
      { name: 'Blackberry',  percentage: 22, swatch: 'linear-gradient(180deg,#a5b4fc,#3730a3)' },
      { name: 'Raspberry',   percentage: 18, swatch: 'linear-gradient(180deg,#fda4af,#9f1239)' },
      { name: 'Apple',       percentage: 16, swatch: 'linear-gradient(180deg,#fecaca,#dc2626)' },
      { name: 'Pomegranate', percentage:  8, swatch: 'linear-gradient(180deg,#fca5a5,#991b1b)' },
      { name: 'Lemon',       percentage:  4, swatch: 'linear-gradient(180deg,#fef08a,#eab308)' },
    ],
    nutrition: {
      calories:    { label: 'Calories',    value: 210,   max: 800, unit: '' },
      sugar:       { label: 'Sugar',       value: 26,    max: 40,  unit: 'g' },
      vitaminC:    { label: 'Vitamin C',   value: 140,   max: 200, unit: '%' },
      vitaminA:    { label: 'Vitamin A',   value: 30,    max: 200, unit: '%' },
      iron:        { label: 'Iron',        value: 10,    max: 100, unit: '%' },
      potassium:   { label: 'Potassium',   value: 620,   max: 2000, unit: 'mg' },
    },
    panel: [
      ['Total fat',     '0.5g'],
      ['Sodium',        '15mg'],
      ['Total carbs',   '50g'],
      ['Dietary fiber', '6g'],
      ['Protein',       '2g'],
    ],
    story: '"Picked at the wild edge of the orchard. Pressed the same morning."',
  },
};

const DEFAULT_MOCK = MOCKS_BY_CATEGORY.greens;

// Normalize the product's category — DB values may be capitalized or contain extra words.
const normalizeCategory = (cat = '') => {
  const lower = cat.toLowerCase();
  if (lower.includes('green')) return 'greens';
  if (lower.includes('red') || lower.includes('beet')) return 'reds';
  if (lower.includes('citrus') || lower.includes('orange')) return 'citrus';
  if (lower.includes('berry') || lower.includes('berries')) return 'berries';
  return 'greens';
};

export const getMockData = (product) => {
  if (!product) return DEFAULT_MOCK;
  const key = normalizeCategory(product.category);
  return MOCKS_BY_CATEGORY[key] || DEFAULT_MOCK;
};

export const CATEGORIES = [
  { key: 'all',     label: 'All' },
  { key: 'greens',  label: 'Greens' },
  { key: 'reds',    label: 'Reds' },
  { key: 'citrus',  label: 'Citrus' },
  { key: 'berries', label: 'Berries' },
];

export default MOCKS_BY_CATEGORY;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/data/productMockData.js
git commit -m "feat(data): add category-based mock for ingredients and nutrition"
```

---

## Task 10: Rewrite Navbar

**Files:**
- Modify (full replacement): `client/src/components/Navbar.js`

- [ ] **Step 1: Replace `Navbar.js`**

Replace the entire contents of `client/src/components/Navbar.js` with:

```jsx
// client/src/components/Navbar.js
// Minimalist navbar — cream background, ink links, hairline divider, accent.green
// underline on the active route. No dark mode toggle (removed per spec §2).

import {
  Box, Flex, HStack, Stack, Link, Text, Button,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider,
  IconButton, useDisclosure, useToast,
} from '@chakra-ui/react';
import { Link as RouterLink, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const PRIMARY_LINKS = [
  { label: 'Shop',         to: '/products' },
  { label: 'The Line',     to: '/products' },
  { label: 'Our Process',  to: '/#process'  },
];

const NavLink = ({ to, children }) => (
  <Link
    as={RouterNavLink}
    to={to}
    fontFamily='body'
    fontSize='sm'
    color='ink'
    _hover={{ textDecoration: 'none', color: 'accent.green' }}
    _activeLink={{
      borderBottom: '1px solid',
      borderColor: 'accent.green',
      pb: '2px',
    }}
  >
    {children}
  </Link>
);

const CartLink = () => {
  const { cart } = useSelector((state) => state.cart);
  return (
    <Link as={RouterLink} to='/cart' fontFamily='body' fontSize='sm' color='ink' _hover={{ color: 'accent.green', textDecoration: 'none' }}>
      Cart ({cart.length})
    </Link>
  );
};

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast({ description: 'Signed out.', status: 'success', isClosable: true });
    navigate('/');
  };

  return (
    <Box
      as='nav'
      bg='cream'
      borderBottom='1px solid'
      borderColor='line'
      position='sticky'
      top='0'
      zIndex='sticky'
    >
      <Flex
        maxW='container.xl'
        mx='auto'
        h='64px'
        align='center'
        justify='space-between'
        px={{ base: '20px', md: '28px', lg: '32px' }}
      >
        {/* Left: wordmark + desktop links */}
        <HStack spacing='32px'>
          <Link as={RouterLink} to='/' _hover={{ textDecoration: 'none' }}>
            <Text fontFamily='heading' fontSize='xl' color='ink' letterSpacing='tight'>
              Just Juice
            </Text>
          </Link>
          <HStack as='nav' spacing='24px' display={{ base: 'none', md: 'flex' }}>
            {PRIMARY_LINKS.map((l) => (
              <NavLink key={l.label} to={l.to}>{l.label}</NavLink>
            ))}
          </HStack>
        </HStack>

        {/* Right: cart, account or sign-in/up */}
        <HStack spacing='20px'>
          <Box display={{ base: 'none', md: 'block' }}>
            <CartLink />
          </Box>
          {userInfo ? (
            <Menu>
              <MenuButton
                as={Button}
                variant='link'
                color='ink'
                fontFamily='body'
                fontSize='sm'
                rightIcon={<ChevronDownIcon />}
              >
                {userInfo.name}
              </MenuButton>
              <MenuList bg='paper' borderColor='line' fontFamily='body' fontSize='sm'>
                <MenuItem as={RouterLink} to='/profile'>Profile</MenuItem>
                <MenuItem as={RouterLink} to='/your-orders'>Your Orders</MenuItem>
                {userInfo.isAdmin === 'true' && (
                  <>
                    <MenuDivider borderColor='line' />
                    <MenuItem as={RouterLink} to='/admin-console'>Admin Console</MenuItem>
                  </>
                )}
                <MenuDivider borderColor='line' />
                <MenuItem onClick={handleLogout}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing='12px'>
              <Button as={RouterLink} to='/login' variant='link' size='sm'>Sign in</Button>
              <Button
                as={RouterLink}
                to='/registration'
                variant='primary'
                size='sm'
                display={{ base: 'none', md: 'inline-flex' }}
              >
                Sign up
              </Button>
            </HStack>
          )}
          <IconButton
            aria-label='Toggle menu'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant='link'
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </HStack>
      </Flex>

      {/* Mobile dropdown sheet */}
      {isOpen && (
        <Box pb='16px' display={{ md: 'none' }} px='20px' borderTop='1px solid' borderColor='line'>
          <Stack as='nav' spacing='12px' pt='12px'>
            {PRIMARY_LINKS.map((l) => (
              <NavLink key={l.label} to={l.to}>{l.label}</NavLink>
            ))}
            <CartLink />
            {!userInfo && <NavLink to='/registration'>Sign up</NavLink>}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
```

- [ ] **Step 2: Verify in dev server**

```bash
npm run app
```

Open `http://localhost:3000`. Expected:
- Navbar is cream-colored with a thin line at the bottom (no dark gray block).
- Wordmark "Just Juice" appears in Fraunces (serif).
- Primary links (Shop, The Line, Our Process) appear in Inter sm.
- No moon/sun icon anywhere; no dark mode toggle.
- Cart count appears next to "Cart" in `Cart (N)` form.
- Resize to <768px: hamburger appears, links collapse into a stacked sheet on toggle.

Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/Navbar.js
git commit -m "feat(navbar): rewrite with minimalist theme, drop dark mode toggle"
```

---

## Task 11: Rewrite Footer

**Files:**
- Modify (full replacement): `client/src/components/Footer.js`

- [ ] **Step 1: Replace `Footer.js`**

Replace the entire contents of `client/src/components/Footer.js` with:

```jsx
// client/src/components/Footer.js
// Four-column footer, ink background, cream text. Stacks to 2-col on tablet, 1-col on phone.

import { Box, Container, SimpleGrid, Stack, Text, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const COLUMNS = [
  {
    heading: 'Shop',
    items: [
      ['All juices',   '/products'],
      ['Greens',       '/products?category=greens'],
      ['Reds',         '/products?category=reds'],
      ['Citrus',       '/products?category=citrus'],
    ],
  },
  {
    heading: 'Brand',
    items: [
      ['Our process',  '/#process'],
      ['Sourcing',     '/#sourcing'],
      ['Press',        '/#press'],
    ],
  },
  {
    heading: 'Support',
    items: [
      ['Account',      '/profile'],
      ['Orders',       '/your-orders'],
      ['Contact',      '/#contact'],
    ],
  },
];

const ColumnHeading = ({ children }) => (
  <Heading
    as='h5'
    fontFamily='body'
    fontSize='xs'
    fontWeight='semibold'
    letterSpacing='wider'
    textTransform='uppercase'
    color='whiteAlpha.700'
    mb='10px'
  >
    {children}
  </Heading>
);

export const Footer = () => (
  <Box as='footer' bg='ink' color='cream'>
    <Container py={{ base: '40px', md: '56px' }}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing='28px' gridTemplateColumns={{ md: '1.5fr 1fr 1fr 1fr' }}>
        <Box>
          <Text fontFamily='heading' fontSize='xl' letterSpacing='tight'>Just Juice</Text>
          <Text fontFamily='body' fontSize='sm' color='whiteAlpha.700' mt='8px' maxW='240px'>
            Cold-pressed, locally sourced, delivered fresh.
          </Text>
        </Box>
        {COLUMNS.map((col) => (
          <Box key={col.heading}>
            <ColumnHeading>{col.heading}</ColumnHeading>
            <Stack as='ul' spacing='6px' listStyleType='none' fontFamily='body' fontSize='sm'>
              {col.items.map(([label, to]) => (
                <li key={label}>
                  <Link as={RouterLink} to={to} color='cream' _hover={{ color: 'whiteAlpha.700', textDecoration: 'none' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
      <Text fontFamily='body' fontSize='xs' color='whiteAlpha.500' mt='40px'>
        © {new Date().getFullYear()} Just Juice · Made cold, pressed slow.
      </Text>
    </Container>
  </Box>
);

export default Footer;
```

- [ ] **Step 2: Verify in dev server**

`npm run app`, scroll to bottom of any page. Expected:
- Ink-black footer with cream wordmark and three columns of cream links.
- Wordmark in Fraunces; column headings in tracked uppercase Inter; links in Inter sm.
- Resize to 768px: still 4 columns. Resize to 480px: collapses to single column.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/Footer.js
git commit -m "feat(footer): rewrite with minimalist theme"
```

---

## Task 12: Landing — Hero section

**Files:**
- Create: `client/src/components/landing/Hero.jsx`

- [ ] **Step 1: Write `Hero.jsx`**

```jsx
// client/src/components/landing/Hero.jsx
// First-fold hero. Split layout: copy left, large 4:5 photo right.
// On mobile, photo stacks below copy.

import { Box, Container, Stack, Heading, Text, Button, Image, AspectRatio } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Reveal from '../shared/Reveal';
import Eyebrow from '../shared/Eyebrow';

const Hero = () => (
  <Box as='section' py={{ base: '40px', lg: '96px' }}>
    <Container>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: '32px', lg: '48px' }}
        align='center'
      >
        <Box flex='1.1'>
          <Reveal>
            <Eyebrow>Cold-Pressed · Small Batch</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading as='h1' variant='display' mt='12px'>
              Pressed for{' '}
              <Text as='em' fontStyle='italic'>you.</Text>
            </Heading>
          </Reveal>
          <Reveal delay={0.16}>
            <Text fontFamily='body' fontSize='md' color='muted' mt='18px' maxW='420px' lineHeight='normal'>
              Six ingredients. No shortcuts. Made fresh on Tuesdays and delivered cold to your door by Thursday.
            </Text>
          </Reveal>
          <Reveal delay={0.24}>
            <Stack direction='row' spacing='10px' mt='24px'>
              <Button as={RouterLink} to='/products' variant='primary' size='lg'>
                Shop the line →
              </Button>
              <Button as={RouterLink} to='/#process' variant='ghost' size='lg'>
                Our process
              </Button>
            </Stack>
          </Reveal>
        </Box>
        <Box flex='0.9' w='100%'>
          <Reveal delay={0.12}>
            <AspectRatio ratio={4 / 5} borderRadius='md' overflow='hidden'>
              <Image
                src='/images/juicelounge.jpg'
                alt='A glass of fresh cold-pressed juice'
                objectFit='cover'
              />
            </AspectRatio>
          </Reveal>
        </Box>
      </Stack>
    </Container>
  </Box>
);

export default Hero;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/landing/Hero.jsx
git commit -m "feat(landing): add Hero section"
```

---

## Task 13: Landing — FeaturedProducts section

**Files:**
- Create: `client/src/components/landing/FeaturedProducts.jsx`

- [ ] **Step 1: Write `FeaturedProducts.jsx`**

The component fetches products via the existing Redux action (`getProducts`), then renders the first four. Uses the rewritten `ProductCard` we'll build in Task 19 — for now, the import points to its eventual location.

```jsx
// client/src/components/landing/FeaturedProducts.jsx
// First four products as a grid. Pulls from the existing Redux products slice.

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, SimpleGrid, Stack } from '@chakra-ui/react';
import { getProducts } from '../../redux/actions/productActions';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';
import ProductCard from '../products/ProductCard';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const featured = (products || []).slice(0, 4);

  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='paper'>
      <Container>
        <Reveal>
          <SectionHeading eyebrow='The Line' title='Four to start with.' />
        </Reveal>
        <Reveal delay={0.08}>
          <Stack mt='24px'>
            {loading && <Box fontFamily='body' color='muted'>Loading…</Box>}
            {error && <Box fontFamily='body' color='status.error'>Couldn't load products.</Box>}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing='20px'>
              {featured.map((p) => <ProductCard key={p._id} product={p} />)}
            </SimpleGrid>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/landing/FeaturedProducts.jsx
git commit -m "feat(landing): add FeaturedProducts section"
```

(`ProductCard` doesn't exist yet — Task 19 creates it. This file will not render successfully until then, which is fine; we don't compose `LandingScreen` until Task 18.)

---

## Task 14: Landing — ProcessStrip section

**Files:**
- Create: `client/src/components/landing/ProcessStrip.jsx`

- [ ] **Step 1: Write `ProcessStrip.jsx`**

```jsx
// client/src/components/landing/ProcessStrip.jsx
// Three numbered steps: Source / Press / Deliver. Italic Fraunces numerals.

import { Box, Container, SimpleGrid, Heading, Text } from '@chakra-ui/react';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';

const STEPS = [
  { num: '01.', title: 'Source',  body: 'Organic produce from regional farms, picked the morning of the press.' },
  { num: '02.', title: 'Press',   body: 'Hydraulic cold-press in small batches. No heat, no pulp shortcuts.' },
  { num: '03.', title: 'Deliver', body: 'Glass bottles, refrigerated truck, at your door within 36 hours.' },
];

const ProcessStrip = () => (
  <Box as='section' id='process' py={{ base: '56px', lg: '96px' }} bg='cream'>
    <Container>
      <Reveal>
        <SectionHeading eyebrow='How we press' title='Three steps. No additives.' />
      </Reveal>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: '32px', md: '24px' }} mt='32px'>
        {STEPS.map((s, i) => (
          <Reveal key={s.num} delay={0.08 * (i + 1)}>
            <Box>
              <Heading
                as='span'
                fontFamily='heading'
                fontStyle='italic'
                fontSize='3xl'
                color='accent.green'
                fontWeight='normal'
              >
                {s.num}
              </Heading>
              <Heading as='h3' variant='sub' mt='6px'>{s.title}</Heading>
              <Text fontFamily='body' fontSize='sm' color='muted' mt='6px' lineHeight='normal'>
                {s.body}
              </Text>
            </Box>
          </Reveal>
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

export default ProcessStrip;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/landing/ProcessStrip.jsx
git commit -m "feat(landing): add ProcessStrip section"
```

---

## Task 15: Landing — EditorialBand

**Files:**
- Create: `client/src/components/landing/EditorialBand.jsx`

- [ ] **Step 1: Write `EditorialBand.jsx`**

```jsx
// client/src/components/landing/EditorialBand.jsx
// Full-bleed band with deep-green tint and an italic pull-quote over landing.jpg.

import { Box, Container, Heading, Text } from '@chakra-ui/react';
import Reveal from '../shared/Reveal';

const EditorialBand = () => (
  <Box
    as='section'
    minH={{ base: '280px', md: '360px' }}
    bgImage='linear-gradient(135deg, rgba(31,58,46,0.85), rgba(31,58,46,0.65)), url(/images/landing.jpg)'
    bgSize='cover'
    bgPosition='center'
    color='cream'
    display='flex'
    alignItems='center'
  >
    <Container>
      <Reveal>
        <Box maxW='560px'>
          <Heading
            as='h2'
            fontFamily='heading'
            fontStyle='italic'
            fontWeight='normal'
            fontSize={{ base: '26px', md: '32px' }}
            lineHeight='snug'
            color='cream'
          >
            "The juice is alive, so we treat it like it is."
          </Heading>
          <Text fontFamily='body' fontSize='sm' opacity={0.85} mt='10px'>
            — Note from the press room
          </Text>
        </Box>
      </Reveal>
    </Container>
  </Box>
);

export default EditorialBand;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/landing/EditorialBand.jsx
git commit -m "feat(landing): add EditorialBand"
```

---

## Task 16: Landing — CategoryGrid

**Files:**
- Create: `client/src/components/landing/CategoryGrid.jsx`

- [ ] **Step 1: Write `CategoryGrid.jsx`**

```jsx
// client/src/components/landing/CategoryGrid.jsx
// Four colored gradient tiles that link to the filtered products list.

import { Box, Container, SimpleGrid, AspectRatio, Heading, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';

const CATEGORIES = [
  { key: 'greens',  label: 'Greens',  gradient: 'linear-gradient(180deg,#a3b58a,#3f5d2c)', count: '2 bottles' },
  { key: 'reds',    label: 'Reds',    gradient: 'linear-gradient(180deg,#fda4af,#9f1239)', count: '2 bottles' },
  { key: 'citrus',  label: 'Citrus',  gradient: 'linear-gradient(180deg,#fcd34d,#b45309)', count: '2 bottles' },
  { key: 'berries', label: 'Berries', gradient: 'linear-gradient(180deg,#c4b5fd,#5b21b6)', count: '2 bottles' },
];

const CategoryGrid = () => (
  <Box as='section' py={{ base: '56px', lg: '96px' }} bg='paper'>
    <Container>
      <Reveal>
        <SectionHeading eyebrow='Find your color' title='Shop by category.' />
      </Reveal>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing='14px' mt='32px'>
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.key} delay={0.06 * i}>
            <LinkBox
              borderRadius='md'
              overflow='hidden'
              transition='transform 0.25s ease-out'
              _hover={{ transform: 'translateY(-2px)' }}
            >
              <AspectRatio ratio={1}>
                <Box bgImage={c.gradient} p='16px' color='cream' display='flex' flexDir='column' justifyContent='space-between'>
                  <Box />
                  <Box>
                    <Heading
                      as='h3'
                      fontFamily='heading'
                      fontWeight='medium'
                      fontSize='2xl'
                      color='cream'
                    >
                      <LinkOverlay as={RouterLink} to={`/products?category=${c.key}`}>
                        {c.label}
                      </LinkOverlay>
                    </Heading>
                    <Text fontFamily='mono' fontSize='xs' opacity={0.85} mt='2px'>
                      {c.count}
                    </Text>
                  </Box>
                </Box>
              </AspectRatio>
            </LinkBox>
          </Reveal>
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

export default CategoryGrid;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/landing/CategoryGrid.jsx
git commit -m "feat(landing): add CategoryGrid"
```

---

## Task 17: Landing — NewsletterSignup

**Files:**
- Create: `client/src/components/landing/NewsletterSignup.jsx`

- [ ] **Step 1: Write `NewsletterSignup.jsx`**

Visual-only form (per spec §9). Submit logs to console and shows a toast.

```jsx
// client/src/components/landing/NewsletterSignup.jsx
// Quiet single-line newsletter signup. Visual-only — no backend wired.

import { useState } from 'react';
import { Box, Container, Heading, Text, Input, Button, HStack, useToast } from '@chakra-ui/react';
import Reveal from '../shared/Reveal';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    console.log('[Newsletter] would subscribe:', email);
    toast({ description: 'Thanks — you’re on the list.', status: 'success', isClosable: true });
    setEmail('');
  };

  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='cream' textAlign='center'>
      <Container>
        <Reveal>
          <Heading as='h3' variant='sub'>Get the next press list.</Heading>
          <Text fontFamily='body' fontSize='sm' color='muted' mt='8px'>
            Tuesdays, one email. Never spam.
          </Text>
          <Box as='form' onSubmit={handleSubmit} mt='20px' display='inline-block'>
            <HStack
              spacing='6px'
              p='6px 6px 6px 16px'
              borderRadius='full'
              border='1px solid'
              borderColor='line'
              bg='paper'
            >
              <Input
                variant='unstyled'
                placeholder='hello@yours.com'
                fontFamily='body'
                fontSize='sm'
                width='220px'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type='submit' variant='primary' size='sm'>Join</Button>
            </HStack>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
};

export default NewsletterSignup;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/landing/NewsletterSignup.jsx
git commit -m "feat(landing): add NewsletterSignup"
```

---

## Task 18: Compose LandingScreen

**Files:**
- Modify (full replacement): `client/src/screens/LandingScreen.js`

- [ ] **Step 1: Replace `LandingScreen.js`**

Replace the entire contents of `client/src/screens/LandingScreen.js` with:

```jsx
// client/src/screens/LandingScreen.js
// Composes the seven landing sections. Each section owns its own padding and Container.

import Hero from '../components/landing/Hero';
import FeaturedProducts from '../components/landing/FeaturedProducts';
import ProcessStrip from '../components/landing/ProcessStrip';
import EditorialBand from '../components/landing/EditorialBand';
import CategoryGrid from '../components/landing/CategoryGrid';
import NewsletterSignup from '../components/landing/NewsletterSignup';

export const LandingScreen = () => (
  <>
    <Hero />
    <FeaturedProducts />
    <ProcessStrip />
    <EditorialBand />
    <CategoryGrid />
    <NewsletterSignup />
  </>
);

export default LandingScreen;
```

- [ ] **Step 2: Verify in dev server** *(landing will still fail to fully render — `ProductCard` doesn't exist yet)*

`npm run app`, open `http://localhost:3000`. Expected:
- Hero, ProcessStrip, EditorialBand, CategoryGrid, NewsletterSignup render correctly.
- FeaturedProducts shows a runtime error or fallback because `ProductCard` import is unresolved.
- Other landing sections look polished, in Fraunces + Inter, cream background, with reveal animations on scroll.

This is expected — the next task creates `ProductCard`. Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add client/src/screens/LandingScreen.js
git commit -m "feat(landing): compose LandingScreen from section components"
```

---

## Task 19: Products listing — ProductCard

**Files:**
- Create: `client/src/components/products/ProductCard.jsx`
- Delete (after Task 21 verification): `client/src/components/ProductCard.js`

- [ ] **Step 1: Write `ProductCard.jsx`**

```jsx
// client/src/components/products/ProductCard.jsx
// Used on landing (FeaturedProducts) and products listing. Hover reveals an Add-to-cart pill
// from the bottom of the image. Sold-out cards dim and disable the pill.

import { Box, AspectRatio, Image, Text, Flex, Badge, Button, useToast, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../redux/actions/cartActions';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { cart } = useSelector((state) => state.cart);
  const soldOut = product.stock <= 0;

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cart.some((c) => c.id === product._id)) {
      toast({ description: 'Already in your cart.', status: 'info', isClosable: true });
      return;
    }
    dispatch(addCartItem(product._id, 1));
    toast({ description: 'Added.', status: 'success', isClosable: true });
  };

  return (
    <LinkBox
      role='group'
      opacity={soldOut ? 0.55 : 1}
      transition='opacity 0.2s ease-out'
    >
      <Box position='relative'>
        <AspectRatio ratio={3 / 4} bg='paper' border='1px solid' borderColor='line' borderRadius='sm' overflow='hidden'>
          <Image src={product.image} alt={product.name} objectFit='cover' />
        </AspectRatio>

        {/* Badge */}
        {soldOut ? (
          <Badge
            position='absolute' top='10px' left='10px'
            bg='ink' color='cream' textTransform='uppercase'
            fontFamily='body' fontSize='9px' letterSpacing='wider'
            fontWeight='semibold' px='8px' py='3px' borderRadius='full'
          >Sold out</Badge>
        ) : product.productIsNew ? (
          <Badge
            position='absolute' top='10px' left='10px'
            bg='cream' color='accent.green' border='1px solid' borderColor='line'
            textTransform='uppercase' fontFamily='body' fontSize='9px' letterSpacing='wider'
            fontWeight='semibold' px='8px' py='3px' borderRadius='full'
          >New</Badge>
        ) : null}

        {/* Hover quick-add */}
        {!soldOut && (
          <Box
            position='absolute' bottom='10px' left='10px' right='10px'
            opacity={0} transform='translateY(4px)'
            _groupHover={{ opacity: 1, transform: 'translateY(0)' }}
            transition='opacity 0.25s ease-out, transform 0.25s ease-out'
          >
            <Button variant='primary' size='sm' w='100%' onClick={addToCart}>
              Add to cart
            </Button>
          </Box>
        )}
      </Box>

      <Flex justify='space-between' align='baseline' mt='12px' fontFamily='body'>
        <Box>
          <Text fontSize='xs' letterSpacing='wider' textTransform='uppercase' color='muted'>
            {product.category}
          </Text>
          <Text fontFamily='heading' fontSize='lg' color='ink' mt='2px' fontWeight='medium' lineHeight='snug'>
            <LinkOverlay as={RouterLink} to={`/product/${product._id}`}>
              {product.name}
            </LinkOverlay>
          </Text>
        </Box>
        <Box textAlign='right'>
          <Text fontFamily='mono' fontSize='sm' color='ink'>${Number(product.price).toFixed(2)}</Text>
          <Text fontFamily='mono' fontSize='xs' color='muted' mt='2px'>16 oz</Text>
        </Box>
      </Flex>
    </LinkBox>
  );
};

export default ProductCard;
```

- [ ] **Step 2: Verify the landing page renders fully**

`npm run app`, reload `http://localhost:3000`. Expected:
- The full landing now renders. Featured Products shows the first four products from the DB as cards.
- Hovering a card reveals a green "Add to cart" pill sliding up; clicking it adds to cart and shows a toast.
- Sold-out products (if any seed has `stock: 0`) appear dimmed with a black "Sold out" pill.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/products/ProductCard.jsx
git commit -m "feat(products): add ProductCard with hover quick-add"
```

---

## Task 20: Products listing — FilterPills and SortSelect

**Files:**
- Create: `client/src/components/products/FilterPills.jsx`
- Create: `client/src/components/products/SortSelect.jsx`

- [ ] **Step 1: Write `FilterPills.jsx`**

```jsx
// client/src/components/products/FilterPills.jsx
// Horizontal pill row for category filtering. Controlled — parent owns active state.

import { HStack, Button } from '@chakra-ui/react';
import { CATEGORIES } from '../../data/productMockData';

const FilterPills = ({ active, onChange }) => (
  <HStack spacing='8px' flexWrap='wrap' rowGap='8px'>
    {CATEGORIES.map((c) => {
      const isActive = active === c.key;
      return (
        <Button
          key={c.key}
          onClick={() => onChange(c.key)}
          variant={isActive ? 'primary' : 'ghost'}
          size='sm'
          borderColor={isActive ? 'accent.green' : 'line'}
          color={isActive ? 'cream' : 'ink'}
          _hover={isActive
            ? { bg: 'accent.greenHover' }
            : { bg: 'cream', borderColor: 'ink' }
          }
          bg={isActive ? 'accent.green' : 'paper'}
        >
          {c.label}
        </Button>
      );
    })}
  </HStack>
);

export default FilterPills;
```

- [ ] **Step 2: Write `SortSelect.jsx`**

```jsx
// client/src/components/products/SortSelect.jsx
// Sort dropdown styled as a pill. Controlled.

import { Select } from '@chakra-ui/react';

export const SORT_OPTIONS = [
  { value: 'featured',   label: 'Sort: Featured' },
  { value: 'newest',     label: 'Newest' },
  { value: 'price-asc',  label: 'Price: low → high' },
  { value: 'price-desc', label: 'Price: high → low' },
  { value: 'rating',     label: 'Best rated' },
];

const SortSelect = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    fontFamily='body'
    fontSize='sm'
    bg='paper'
    borderColor='line'
    borderRadius='full'
    width='auto'
    minW='180px'
    _hover={{ borderColor: 'ink' }}
    _focusVisible={{ borderColor: 'accent.green', boxShadow: '0 0 0 1px #1F3A2E' }}
  >
    {SORT_OPTIONS.map((o) => (
      <option key={o.value} value={o.value}>{o.label}</option>
    ))}
  </Select>
);

export default SortSelect;
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/products/FilterPills.jsx client/src/components/products/SortSelect.jsx
git commit -m "feat(products): add FilterPills and SortSelect"
```

---

## Task 21: Rewrite ProductsScreen

**Files:**
- Modify (full replacement): `client/src/screens/ProductsScreen.js`
- Delete: `client/src/components/ProductCard.js` (legacy)

- [ ] **Step 1: Replace `ProductsScreen.js`**

Replace the entire contents of `client/src/screens/ProductsScreen.js` with:

```jsx
// client/src/screens/ProductsScreen.js
// Browse page: header, filter pills + sort, responsive grid of ProductCard.
// Reads `?category=...` from the URL so the landing CategoryGrid can deep-link.

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, SimpleGrid, Stack, Flex, Text, Spinner } from '@chakra-ui/react';
import { getProducts } from '../redux/actions/productActions';
import Reveal from '../components/shared/Reveal';
import Eyebrow from '../components/shared/Eyebrow';
import { Heading } from '@chakra-ui/react';
import ProductCard from '../components/products/ProductCard';
import FilterPills from '../components/products/FilterPills';
import SortSelect from '../components/products/SortSelect';

const matchesCategory = (product, key) => {
  if (key === 'all') return true;
  const cat = (product.category || '').toLowerCase();
  return cat.includes(key.slice(0, key.length - 1)) || cat.includes(key); // 'greens' ↔ 'green'
};

const sortBy = (key) => (a, b) => {
  switch (key) {
    case 'price-asc':  return Number(a.price) - Number(b.price);
    case 'price-desc': return Number(b.price) - Number(a.price);
    case 'rating':     return Number(b.rating) - Number(a.rating);
    case 'newest':     return (b.productIsNew ? 1 : 0) - (a.productIsNew ? 1 : 0);
    case 'featured':
    default:           return 0;
  }
};

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';
  const [active, setActive]   = useState(urlCategory);
  const [sortKey, setSortKey] = useState('featured');

  useEffect(() => { dispatch(getProducts()); }, [dispatch]);
  useEffect(() => { setActive(urlCategory); }, [urlCategory]);

  const handleCategoryChange = (key) => {
    setActive(key);
    if (key === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', key);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const visible = useMemo(() => {
    return [...(products || [])]
      .filter((p) => matchesCategory(p, active))
      .sort(sortBy(sortKey));
  }, [products, active, sortKey]);

  return (
    <Box as='main' bg='cream'>
      <Container py={{ base: '40px', lg: '56px' }}>
        <Reveal>
          <Eyebrow>The Full Line</Eyebrow>
          <Heading as='h1' variant='display' mt='8px'>Every bottle, all at once.</Heading>
          <Text fontFamily='body' fontSize='md' color='muted' mt='10px' maxW='480px'>
            Cold-pressed juices, organized by color. Filter by what you're craving, sort by what suits you.
          </Text>
        </Reveal>
      </Container>

      <Box borderBottom='1px solid' borderColor='line'>
        <Container py='12px'>
          <Flex
            justify='space-between'
            align={{ base: 'flex-start', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
            gap='12px'
          >
            <FilterPills active={active} onChange={handleCategoryChange} />
            <Flex align='center' gap='16px'>
              <Text fontFamily='mono' fontSize='xs' color='muted'>
                {visible.length} {visible.length === 1 ? 'bottle' : 'bottles'}
              </Text>
              <SortSelect value={sortKey} onChange={setSortKey} />
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container py={{ base: '32px', lg: '56px' }}>
        {loading && <Stack align='center' py='40px'><Spinner color='accent.green' /></Stack>}
        {error && <Text fontFamily='body' color='status.error'>Couldn't load products.</Text>}
        {!loading && !error && visible.length === 0 && (
          <Stack align='center' py='40px' spacing='6px'>
            <Text fontFamily='heading' fontSize='xl'>Nothing in this color today.</Text>
            <Text fontFamily='body' fontSize='sm' color='muted'>Try another category — or come back next Tuesday.</Text>
          </Stack>
        )}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing='20px 16px'>
          {visible.map((p) => <ProductCard key={p._id} product={p} />)}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ProductsScreen;
```

- [ ] **Step 2: Delete the legacy `ProductCard.js`**

```bash
git rm client/src/components/ProductCard.js
```

Then search the codebase for any remaining imports of the old path:

```bash
grep -rn "from '\.\./components/ProductCard'\|from '\./components/ProductCard'" client/src
```

Expected: no results. If any exist, update them to `from '../components/products/ProductCard'` (path adjusted to match the importing file's depth).

- [ ] **Step 3: Verify in dev server**

`npm run app`, open `http://localhost:3000/products`. Expected:
- Page header in Fraunces ("Every bottle, all at once.") with eyebrow above and description below.
- Filter pills row with "All" active (green pill). Result count + sort dropdown on the right.
- Grid of product cards in cream + paper styling, 4-up on desktop. Hover quick-add works.
- Click "Greens" pill → grid filters to greens, URL updates to `/products?category=greens`. Click "All" → URL clears.
- Open `http://localhost:3000/products?category=reds` directly → "Reds" pill is active on load.
- Change sort dropdown → grid reorders.

- [ ] **Step 4: Commit**

```bash
git add client/src/screens/ProductsScreen.js
git commit -m "feat(products): rewrite ProductsScreen with filtering, sort, deep-link"
```

---

## Task 22: Product detail — ProductGallery

**Files:**
- Create: `client/src/components/productDetail/ProductGallery.jsx`

The DB stores a single `image` field on a product. To make a gallery, we synthesize four thumbnails by reusing the same image (production would have multiple URLs).

- [ ] **Step 1: Write `ProductGallery.jsx`**

```jsx
// client/src/components/productDetail/ProductGallery.jsx
// Vertical thumb strip + large main image with cross-fade swap.
// On mobile, thumbs flow horizontally below the main image.

import { useState } from 'react';
import { Box, AspectRatio, Image, Stack, HStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionImage = motion(Image);

const ProductGallery = ({ product }) => {
  // The schema has a single image; synthesize 4 thumbnails until multi-image support exists.
  const images = [product.image, product.image, product.image, product.image];
  const [active, setActive] = useState(0);

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing='12px'
      align='stretch'
    >
      {/* Thumbs */}
      <HStack
        as={Stack}
        direction={{ base: 'row', md: 'column' }}
        spacing='10px'
        w={{ base: '100%', md: '80px' }}
        order={{ base: 2, md: 1 }}
      >
        {images.map((src, i) => (
          <Box
            key={i}
            cursor='pointer'
            onClick={() => setActive(i)}
            aspectRatio='1'
            w={{ base: '64px', md: '80px' }}
            borderRadius='sm'
            overflow='hidden'
            border='1px solid'
            borderColor={i === active ? 'accent.green' : 'line'}
            bg='paper'
            transition='border-color 0.2s ease-out'
          >
            <Image src={src} alt={`${product.name} thumbnail ${i + 1}`} objectFit='cover' w='100%' h='100%' />
          </Box>
        ))}
      </HStack>

      {/* Main */}
      <Box flex='1' order={{ base: 1, md: 2 }}>
        <AspectRatio ratio={3 / 4} bg='paper' border='1px solid' borderColor='line' borderRadius='md' overflow='hidden' position='relative'>
          <AnimatePresence mode='wait'>
            <MotionImage
              key={active}
              src={images[active]}
              alt={product.name}
              objectFit='cover'
              w='100%' h='100%'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </AspectRatio>
      </Box>
    </Stack>
  );
};

export default ProductGallery;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/productDetail/ProductGallery.jsx
git commit -m "feat(productDetail): add ProductGallery with cross-fade swap"
```

---

## Task 23: Product detail — BuyBox (with sticky behavior)

**Files:**
- Create: `client/src/components/productDetail/BuyBox.jsx`

- [ ] **Step 1: Write `BuyBox.jsx`**

```jsx
// client/src/components/productDetail/BuyBox.jsx
// Right column of the hero: name, rating, description, price, qty stepper, add-to-cart.
// Sticky-follows the user on desktop until the next section. CSS sticky is enough.

import { useState } from 'react';
import { Box, Text, Heading, Flex, Stack, Button, IconButton, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { StarIcon } from '@chakra-ui/icons';
import { addCartItem } from '../../redux/actions/cartActions';
import Eyebrow from '../shared/Eyebrow';
import { getMockData } from '../../data/productMockData';

const Stars = ({ rating }) => {
  const filled = Math.round(rating || 0);
  return (
    <Flex align='center' gap='2px' color='accent.green'>
      {[1,2,3,4,5].map((n) => (
        <StarIcon key={n} w='14px' h='14px' color={n <= filled ? 'accent.green' : 'line'} />
      ))}
    </Flex>
  );
};

const BuyBox = ({ product }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((s) => s.cart);
  const toast = useToast();
  const [qty, setQty] = useState(1);
  const mock = getMockData(product);
  const soldOut = product.stock <= 0;

  const addToCart = () => {
    if (cart.some((c) => c.id === product._id)) {
      toast({ description: 'Already in your cart.', status: 'info', isClosable: true });
      return;
    }
    dispatch(addCartItem(product._id, qty));
    toast({ description: 'Added.', status: 'success', isClosable: true });
  };

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);

  return (
    <Box
      position={{ base: 'static', lg: 'sticky' }}
      top={{ lg: '88px' }}
      alignSelf='start'
    >
      <Eyebrow>{product.category}</Eyebrow>
      <Heading as='h1' variant='display' mt='6px'>{product.name}</Heading>

      <Flex align='center' gap='8px' mt='14px' fontFamily='body' fontSize='sm' color='muted'>
        <Stars rating={product.rating} />
        <Text>{Number(product.rating || 0).toFixed(1)}</Text>
        <Text>·</Text>
        <Text>{product.numberOfReviews} reviews</Text>
      </Flex>

      <Text fontFamily='body' fontSize='md' color='ink' mt='22px' maxW='380px' lineHeight='normal'>
        {product.description || mock.subtitle}
      </Text>

      <Flex align='baseline' gap='16px' mt='26px'>
        <Text fontFamily='heading' fontSize='3xl' color='ink'>${Number(product.price).toFixed(2)}</Text>
        <Text fontFamily='mono' fontSize='xs' color='muted'>
          {mock.volume} · {mock.nutrition.calories.value} kcal
        </Text>
      </Flex>

      <Flex align='center' gap='10px' mt='20px'>
        <Flex
          align='center'
          gap='12px'
          border='1px solid'
          borderColor='line'
          borderRadius='full'
          p='4px 6px'
          bg='paper'
        >
          <IconButton aria-label='Decrease quantity' variant='link' size='sm' onClick={dec} icon={<Box>−</Box>} />
          <Text fontFamily='mono' fontSize='sm' minW='14px' textAlign='center'>{qty}</Text>
          <IconButton aria-label='Increase quantity' variant='link' size='sm' onClick={inc} icon={<Box>+</Box>} />
        </Flex>
        <Button variant='primary' size='lg' onClick={addToCart} isDisabled={soldOut}>
          {soldOut ? 'Sold out' : 'Add to cart →'}
        </Button>
      </Flex>

      <Flex align='center' gap='6px' mt='14px' fontFamily='body' fontSize='xs' color='accent.green'>
        <Box w='6px' h='6px' borderRadius='full' bg={soldOut ? 'muted' : 'accent.green'} />
        <Text>{soldOut ? 'Out of stock' : 'In stock · Ships Thursday'}</Text>
      </Flex>
    </Box>
  );
};

export default BuyBox;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/productDetail/BuyBox.jsx
git commit -m "feat(productDetail): add BuyBox with sticky desktop behavior"
```

---

## Task 24: Product detail — IngredientGrid

**Files:**
- Create: `client/src/components/productDetail/IngredientGrid.jsx`

- [ ] **Step 1: Write `IngredientGrid.jsx`**

```jsx
// client/src/components/productDetail/IngredientGrid.jsx
// Six circles with category-tinted gradients, name + percentage. Pulls from mock data.

import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';
import { getMockData } from '../../data/productMockData';

const IngredientGrid = ({ product }) => {
  const { ingredients } = getMockData(product);

  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='paper'>
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Six things, that's it." title="What's actually inside." />
        </Reveal>
        <SimpleGrid columns={{ base: 3, md: 6 }} spacing='18px' mt='32px'>
          {ingredients.map((ing, i) => (
            <Reveal key={ing.name} delay={0.05 * i}>
              <Box textAlign='center'>
                <Box
                  w='64px'
                  h='64px'
                  borderRadius='full'
                  bgImage={ing.swatch}
                  mx='auto'
                  mb='10px'
                />
                <Text fontFamily='heading' fontSize='md' color='ink'>{ing.name}</Text>
                <Text fontFamily='mono' fontSize='xs' color='muted' mt='2px'>{ing.percentage}%</Text>
              </Box>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default IngredientGrid;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/productDetail/IngredientGrid.jsx
git commit -m "feat(productDetail): add IngredientGrid"
```

---

## Task 25: Product detail — NutritionViz

**Files:**
- Create: `client/src/components/productDetail/NutritionViz.jsx`

- [ ] **Step 1: Write `NutritionViz.jsx`**

```jsx
// client/src/components/productDetail/NutritionViz.jsx
// Animated bar chart left, full nutrition panel right. Bars fill from 0 on viewport entry.

import { useRef } from 'react';
import { Box, Container, Grid, Text, Flex, Heading } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import Reveal from '../shared/Reveal';
import Eyebrow from '../shared/Eyebrow';
import { getMockData } from '../../data/productMockData';

const MotionDiv = motion.div;

const Bar = ({ label, value, max, unit, animate }) => {
  const pct = Math.max(4, Math.min(100, (value / max) * 100));
  return (
    <>
      <Text fontFamily='body' fontSize='sm' color='muted'>{label}</Text>
      <Box h='8px' bg='line' borderRadius='full' overflow='hidden'>
        <MotionDiv
          initial={{ width: 0 }}
          animate={animate ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', background: '#1F3A2E', borderRadius: '999px' }}
        />
      </Box>
      <Text fontFamily='mono' fontSize='sm' color='ink' textAlign='right'>
        {value}{unit}
      </Text>
    </>
  );
};

const NutritionViz = ({ product }) => {
  const { nutrition, panel, volume } = getMockData(product);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='cream' ref={containerRef}>
      <Container>
        <Grid templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }} gap={{ base: '32px', lg: '40px' }} alignItems='start'>
          <Box>
            <Reveal>
              <Eyebrow>Per {volume} bottle</Eyebrow>
              <Heading as='h2' variant='section' mt='8px'>Nutrition, visualized.</Heading>
            </Reveal>
            <Box mt='28px' display='grid' gridTemplateColumns='100px 1fr 60px' gap='10px 16px' alignItems='center'>
              {Object.values(nutrition).map((row) => (
                <Bar
                  key={row.label}
                  label={row.label}
                  value={row.value}
                  max={row.max}
                  unit={row.unit}
                  animate={inView}
                />
              ))}
            </Box>
          </Box>
          <Reveal delay={0.08}>
            <Box bg='paper' border='1px solid' borderColor='line' borderRadius='md' p='22px'>
              <Heading as='h4' fontFamily='heading' fontWeight='normal' fontSize='lg' mb='12px'>
                The full panel
              </Heading>
              <Box as='ul' listStyleType='none' p={0} m={0} fontFamily='body' fontSize='sm' color='ink'>
                {panel.map(([label, value], i) => (
                  <Flex
                    as='li'
                    key={label}
                    justify='space-between'
                    py='4px'
                    borderBottom={i < panel.length - 1 ? '1px dashed' : 'none'}
                    borderColor='line'
                  >
                    <Text>{label}</Text>
                    <Text fontFamily='mono'>{value}</Text>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Reveal>
        </Grid>
      </Container>
    </Box>
  );
};

export default NutritionViz;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/productDetail/NutritionViz.jsx
git commit -m "feat(productDetail): add animated NutritionViz"
```

---

## Task 26: Product detail — StoryStrip, ReviewsGrid, RelatedProducts

**Files:**
- Create: `client/src/components/productDetail/StoryStrip.jsx`
- Create: `client/src/components/productDetail/ReviewsGrid.jsx`
- Create: `client/src/components/productDetail/RelatedProducts.jsx`

- [ ] **Step 1: Write `StoryStrip.jsx`**

```jsx
// client/src/components/productDetail/StoryStrip.jsx
// Same pattern as landing's EditorialBand but scoped to this product (story from mock data).

import { Box, Container, Heading, Text } from '@chakra-ui/react';
import Reveal from '../shared/Reveal';
import { getMockData } from '../../data/productMockData';

const StoryStrip = ({ product }) => {
  const { story } = getMockData(product);
  return (
    <Box
      as='section'
      minH='200px'
      bgImage='linear-gradient(135deg, rgba(31,58,46,0.95), rgba(31,58,46,0.75))'
      color='cream'
      display='flex'
      alignItems='center'
    >
      <Container py='56px'>
        <Reveal>
          <Box maxW='560px'>
            <Text
              fontFamily='body' fontSize='xs' fontWeight='semibold'
              letterSpacing='widest' textTransform='uppercase' color='whiteAlpha.800'
            >
              Why this one is different
            </Text>
            <Heading
              as='h2'
              fontFamily='heading'
              fontStyle='italic'
              fontWeight='normal'
              fontSize={{ base: '24px', md: '28px' }}
              lineHeight='snug'
              mt='8px'
              color='cream'
            >
              {story}
            </Heading>
            <Text fontFamily='body' fontSize='sm' opacity={0.85} mt='10px'>
              — From our tasting notes
            </Text>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
};

export default StoryStrip;
```

- [ ] **Step 2: Write `ReviewsGrid.jsx`**

```jsx
// client/src/components/productDetail/ReviewsGrid.jsx
// Three review cards. Pulls from product.reviews; falls back to a stock set if none exist.

import { Box, Container, SimpleGrid, Text, Flex } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';

const FALLBACK_REVIEWS = [
  { rating: 5, comment: 'Honestly the only one I look forward to drinking. Worth the price.', name: 'Mara P.' },
  { rating: 5, comment: 'Bright, balanced, not too sweet. I get it every Tuesday now.',        name: 'Jonas K.' },
  { rating: 4, comment: 'Lovely, though I wish the ginger were a touch stronger.',             name: 'Riya T.' },
];

const Stars = ({ n }) => (
  <Flex gap='2px'>
    {[1,2,3,4,5].map((i) => (
      <StarIcon key={i} w='12px' h='12px' color={i <= n ? 'accent.green' : 'line'} />
    ))}
  </Flex>
);

const ReviewsGrid = ({ product }) => {
  const reviews = (product.reviews && product.reviews.length ? product.reviews : FALLBACK_REVIEWS).slice(0, 3);
  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='paper'>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={`${product.numberOfReviews || reviews.length} reviews · ${Number(product.rating || 4.8).toFixed(1)} average`}
            title='What folks are saying.'
          />
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing='18px' mt='32px'>
          {reviews.map((r, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <Box bg='cream' border='1px solid' borderColor='line' borderRadius='md' p='20px'>
                <Stars n={r.rating} />
                <Text fontFamily='heading' fontSize='md' color='ink' mt='10px' lineHeight='normal'>
                  "{r.comment}"
                </Text>
                <Text fontFamily='body' fontSize='xs' color='muted' mt='10px' letterSpacing='wide'>
                  {r.name} · verified buyer
                </Text>
              </Box>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ReviewsGrid;
```

- [ ] **Step 3: Write `RelatedProducts.jsx`**

```jsx
// client/src/components/productDetail/RelatedProducts.jsx
// Four other products, excluding the current one. Lighter card variant — no quick-add.

import { Box, Container, SimpleGrid, AspectRatio, Image, Flex, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';

const RelatedProducts = ({ currentId }) => {
  const { products } = useSelector((s) => s.products);
  const others = (products || []).filter((p) => p._id !== currentId).slice(0, 4);

  if (!others.length) return null;

  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='cream'>
      <Container>
        <Reveal>
          <SectionHeading eyebrow='Pairs nicely with' title='Try these next.' />
        </Reveal>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing='16px' mt='32px'>
          {others.map((p, i) => (
            <Reveal key={p._id} delay={0.04 * i}>
              <LinkBox>
                <AspectRatio ratio={3 / 4} bg='paper' border='1px solid' borderColor='line' borderRadius='sm' overflow='hidden'>
                  <Image src={p.image} alt={p.name} objectFit='cover' />
                </AspectRatio>
                <Flex justify='space-between' align='baseline' mt='10px' fontFamily='body' fontSize='sm'>
                  <Text fontFamily='heading' fontSize='md' color='ink'>
                    <LinkOverlay as={RouterLink} to={`/product/${p._id}`}>{p.name}</LinkOverlay>
                  </Text>
                  <Text fontFamily='mono' color='muted'>${Number(p.price).toFixed(2)}</Text>
                </Flex>
              </LinkBox>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default RelatedProducts;
```

- [ ] **Step 4: Commit**

```bash
git add client/src/components/productDetail/StoryStrip.jsx client/src/components/productDetail/ReviewsGrid.jsx client/src/components/productDetail/RelatedProducts.jsx
git commit -m "feat(productDetail): add StoryStrip, ReviewsGrid, RelatedProducts"
```

---

## Task 27: Rewrite ProductScreen

**Files:**
- Modify (full replacement): `client/src/screens/ProductScreen.js`

- [ ] **Step 1: Replace `ProductScreen.js`**

Replace the entire contents of `client/src/screens/ProductScreen.js` with:

```jsx
// client/src/screens/ProductScreen.js
// Product detail page: hero (gallery + buy box), ingredients, nutrition, story, reviews, related.

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Container, Stack, Spinner, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { getProduct, getProducts } from '../redux/actions/productActions';
import ProductGallery from '../components/productDetail/ProductGallery';
import BuyBox from '../components/productDetail/BuyBox';
import IngredientGrid from '../components/productDetail/IngredientGrid';
import NutritionViz from '../components/productDetail/NutritionViz';
import StoryStrip from '../components/productDetail/StoryStrip';
import ReviewsGrid from '../components/productDetail/ReviewsGrid';
import RelatedProducts from '../components/productDetail/RelatedProducts';

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((s) => s.product);

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getProducts());
  }, [dispatch, id]);

  if (loading || !product || !product._id) {
    return (
      <Container py='80px'>
        <Stack align='center'><Spinner color='accent.green' /></Stack>
      </Container>
    );
  }
  if (error) {
    return (
      <Container py='80px'>
        <Text fontFamily='body' color='status.error'>Couldn't load product.</Text>
      </Container>
    );
  }

  return (
    <Box as='main'>
      <Container pt='16px'>
        <Breadcrumb fontFamily='body' fontSize='xs' color='muted' separator='/'>
          <BreadcrumbItem><BreadcrumbLink as={RouterLink} to='/products'>Shop</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbItem><BreadcrumbLink as={RouterLink} to={`/products?category=${product.category}`}>{product.category}</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbItem isCurrentPage><Text color='ink'>{product.name}</Text></BreadcrumbItem>
        </Breadcrumb>
      </Container>

      <Container py={{ base: '24px', lg: '32px' }}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '32px', lg: '48px' }} align='start'>
          <Box flex='1.2' w='100%'>
            <ProductGallery product={product} />
          </Box>
          <Box flex='0.8' w='100%'>
            <BuyBox product={product} />
          </Box>
        </Stack>
      </Container>

      <IngredientGrid product={product} />
      <NutritionViz product={product} />
      <StoryStrip product={product} />
      <ReviewsGrid product={product} />
      <RelatedProducts currentId={product._id} />
    </Box>
  );
};

export default ProductScreen;
```

- [ ] **Step 2: Verify in dev server**

`npm run app`, navigate to any product detail (click a card on the listing). Expected:
- Breadcrumb in muted Inter.
- Two-column hero (gallery left, buy box right) on desktop ≥1024px. Stacks on smaller.
- Click a thumbnail → main image cross-fades.
- Scroll down: bars in the Nutrition section animate from 0 to their values on first view.
- Buy box stays fixed in view while scrolling through Ingredients on desktop.
- Story strip is a green band with italic Fraunces pull quote.
- Reviews grid shows 3 cards, fallback content if product has no reviews.
- Related Products shows 4 other juices, excluding the current one.
- Click "Add to cart" — toast confirms, cart count in navbar increments.

- [ ] **Step 3: Commit**

```bash
git add client/src/screens/ProductScreen.js
git commit -m "feat(productDetail): rewrite ProductScreen composing all sections"
```

---

## Task 28: Light-touch cleanup — Cart + Checkout

**Files:**
- Modify: `client/src/screens/CartScreen.js`
- Modify: `client/src/screens/CheckoutScreen.js`
- Modify: `client/src/screens/OrderSuccessScreen.js`
- Modify: `client/src/components/CartItem.js`
- Modify: `client/src/components/CartOrderSummary.js`
- Modify: `client/src/components/CheckoutItem.js`
- Modify: `client/src/components/CheckoutOrderSummary.js`
- Modify: `client/src/components/ShippingInformation.js`
- Modify: `client/src/components/PaymentSuccessModal.js`
- Modify: `client/src/components/PaymentErrorModal.js`
- Modify: `client/src/components/PayPalButton.js`
- Modify: `client/src/components/ComfirmRemovalAlert.js`

These are not redesigned — just brought into visual consistency with the new theme. Follow the checklist below for each file.

- [ ] **Step 1: Cleanup checklist (apply to each file in the list)**

For each file, do all of the following:
1. **Remove every `useColorModeValue(...)` call.** Replace with the light-mode value directly. Example:
   ```jsx
   // before
   bg={useColorModeValue('white', 'gray.800')}
   // after
   bg='paper'
   ```
2. **Replace orange/red brand colors** with theme tokens:
   - `bg='orange.500'` / `bg='orange.400'` / `bg='red.500'` → `bg='accent.green'`
   - `color='orange.500'` / `color='red.500'` → `color='accent.green'`
   - `colorScheme='orange'` / `colorScheme='red'` on buttons → remove and use `variant='primary'`
3. **Replace inline Button styling** with our variants:
   - `<Button bg='...' color='...' ...>` → `<Button variant='primary' ...>` (or `variant='ghost'` for outline ones, `variant='link'` for text-only).
   - Remove `_hover` and `_active` overrides where they restated default behavior.
4. **Headings**: change `<Heading size='lg'>` / etc. to `<Heading variant='sub'>` (most uses) or `<Heading variant='section'>` (for page titles).
5. **Background colors** on page wrappers: replace `bg='gray.100'` / `bg='gray.50'` with `bg='cream'`.
6. **Card / surface backgrounds**: replace `bg='white'` with `bg='paper'` and add `border='1px solid' borderColor='line'` if there isn't already a clear separator.
7. **Remove imports** of `useColorModeValue` once unused.

- [ ] **Step 2: Apply checklist file by file**

Work through the list above. After each file, run `npm run app` and click through to the relevant screen to confirm nothing is broken visually. Common screens to check:
- Cart screen → `/cart` (with items in cart)
- Checkout → from cart, click "Checkout"
- Order success → after a successful order, or temporarily push to `/order-success`

- [ ] **Step 3: Verify in dev server**

End-to-end check: Add 2 items to cart → go to cart → adjust qty → checkout (just inspect, don't pay) → click around. Expected:
- No orange or red anywhere except the existing PayPal SDK button (which is third-party-styled and we leave alone).
- All buttons are green pill or ink ghost.
- All headings are Fraunces.
- No errors mentioning `useColorModeValue` or undefined theme color.

- [ ] **Step 4: Commit**

```bash
git add client/src/screens/CartScreen.js \
        client/src/screens/CheckoutScreen.js \
        client/src/screens/OrderSuccessScreen.js \
        client/src/components/CartItem.js \
        client/src/components/CartOrderSummary.js \
        client/src/components/CheckoutItem.js \
        client/src/components/CheckoutOrderSummary.js \
        client/src/components/ShippingInformation.js \
        client/src/components/PaymentSuccessModal.js \
        client/src/components/PaymentErrorModal.js \
        client/src/components/PayPalButton.js \
        client/src/components/ComfirmRemovalAlert.js
git commit -m "style: light-touch cleanup of cart and checkout flow"
```

---

## Task 29: Light-touch cleanup — Auth, Profile, Orders

**Files:**
- Modify: `client/src/screens/LoginScreen.js`
- Modify: `client/src/screens/RegistrationScreen.js`
- Modify: `client/src/screens/ProfileScreen.js`
- Modify: `client/src/screens/YourOrdersScreen.js`
- Modify: `client/src/components/PasswordTextField.js`
- Modify: `client/src/components/TextField.js`

Apply the same cleanup checklist from Task 28 to each of these files.

- [ ] **Step 1: Apply checklist**

Same six bullet points from Task 28 Step 1.

- [ ] **Step 2: Form-input consistency**

In `TextField.js` and `PasswordTextField.js`, ensure inputs use:
- `borderColor='line'`
- `_hover={{ borderColor: 'ink' }}`
- `_focusVisible={{ borderColor: 'accent.green', boxShadow: '0 0 0 1px #1F3A2E' }}`
- `bg='paper'`
- `fontFamily='body'`

Remove any color-mode-conditional border colors.

- [ ] **Step 3: Verify in dev server**

Visit `/login`, `/registration`, `/profile`, `/your-orders`. Expected:
- Inputs all share a consistent style — cream background, hairline border, green focus ring.
- Login/Register CTAs are green pill buttons.
- No dark backgrounds bleeding through.

- [ ] **Step 4: Commit**

```bash
git add client/src/screens/LoginScreen.js \
        client/src/screens/RegistrationScreen.js \
        client/src/screens/ProfileScreen.js \
        client/src/screens/YourOrdersScreen.js \
        client/src/components/PasswordTextField.js \
        client/src/components/TextField.js
git commit -m "style: light-touch cleanup of auth, profile, orders"
```

---

## Task 30: Light-touch cleanup — Admin Console

**Files:**
- Modify: `client/src/screens/AdminConsoleScreen.js`
- Modify: `client/src/components/Productstab.js`
- Modify: `client/src/components/ProductTableItem.js`
- Modify: `client/src/components/UsersTab.js`
- Modify: `client/src/components/AddNewProduct.js`

- [ ] **Step 1: Apply cleanup checklist**

Same six bullet points from Task 28 Step 1.

- [ ] **Step 2: Tabs styling**

If admin uses Chakra `<Tabs>` with default styling, set `colorScheme` and tab indicator overrides so the active tab matches our `accent.green`:

```jsx
<Tabs variant='line' colorScheme='brand'>
  <TabList borderColor='line'>
    <Tab _selected={{ color: 'accent.green', borderColor: 'accent.green' }}>Products</Tab>
    <Tab _selected={{ color: 'accent.green', borderColor: 'accent.green' }}>Users</Tab>
  </TabList>
  …
</Tabs>
```

(Adapt to whatever component the screen actually uses — keep behavior the same.)

- [ ] **Step 3: Verify in dev server**

Log in as an admin user (or temporarily flip `isAdmin` on a test user). Visit `/admin-console`. Expected:
- Tabs use green underline for active state, no orange.
- Tables / cards inherit theme colors.
- No console errors.

- [ ] **Step 4: Commit**

```bash
git add client/src/screens/AdminConsoleScreen.js \
        client/src/components/Productstab.js \
        client/src/components/ProductTableItem.js \
        client/src/components/UsersTab.js \
        client/src/components/AddNewProduct.js
git commit -m "style: light-touch cleanup of admin console"
```

---

## Task 31: Final QA pass

**Files:** None — verification only.

- [ ] **Step 1: Breakpoint sweep on the three showcase screens**

`npm run app`. For each of `/`, `/products`, and `/product/<some-id>`:
- Open Chrome DevTools → Device Toolbar.
- Step through widths: 1440, 1024, 768, 375.
- Confirm at each width: no horizontal scrollbar, headings don't overflow, images keep aspect ratio, grids reflow as specified.

- [ ] **Step 2: Critical-path walkthrough**

Without DevTools throttling, walk the path:
1. Land on `/`.
2. Scroll through the seven landing sections — confirm fade-up reveals on each.
3. Click a featured product → land on detail.
4. Click a thumb → main image cross-fades.
5. Scroll → nutrition bars fill from zero.
6. Click "Add to cart" → toast appears, cart count increments in navbar.
7. Navigate to `/products` → grid renders.
8. Click "Greens" pill → grid filters, URL updates.
9. Open `/products?category=reds` directly in a new tab → "Reds" is active on load.
10. Click any other-category product → detail page shows that category's mock ingredient/nutrition data.

- [ ] **Step 3: Console + accessibility quick check**

- Open browser DevTools console. Walk through all three screens. **Expected: zero errors, zero warnings.** (Some library warnings may be OK if they predate this work — note any new ones.)
- Tab through the page with the keyboard from the top. Focus indicators should be visible (green ring) on the navbar links, CTAs, filter pills, sort dropdown, qty stepper, and Add to cart.
- Use the macOS Accessibility Inspector (or Lighthouse → Accessibility) to spot-check: alt text on product images, contrast on `muted` text-on-cream (should be AA), contrast on `cream`-on-`accent.green` (should be AAA).

- [ ] **Step 4: Light-touch screens regression sweep**

Without focusing on visuals, click through each light-touch screen to confirm no regression:
- `/cart` (with items)
- `/checkout`
- `/order-success`
- `/login`, `/registration`, `/profile`, `/your-orders`
- `/admin-console` (as admin)

No screen should look like it belongs to a different app. No screen should be broken.

- [ ] **Step 5: Build verification**

```bash
cd client && npm run build
```

Expected: build completes. Note bundle size — the redesign should add ~30–60kB gzipped for the two font families (more if including all 4 weights of Fraunces). Anything significantly larger merits investigation.

- [ ] **Step 6: Commit (only if any fixes were needed during QA)**

If any fixes were needed during the sweep:

```bash
git add <fixed files>
git commit -m "fix: QA pass cleanup"
```

If not, no commit is needed for this task.

---

## Self-review notes

This plan covers:
- **Spec §2 (scope)** — Tasks 12–18 (landing), 19–21 (products), 22–27 (detail), 28–30 (light-touch).
- **Spec §3 (design language)** — Tasks 1–6 (theme), 7–8 (shared).
- **Spec §4 (page designs)** — every section has a corresponding component task.
- **Spec §5 (architecture)** — file tree matches spec exactly.
- **Spec §5 (dependencies)** — Task 0 handles fonts; framer-motion already installed (verified).
- **Spec §6 (component responsibilities)** — each component task scopes the component to a single responsibility.
- **Spec §7 (light-touch checklist)** — Tasks 28–30 apply the checklist file by file.
- **Spec §8 (testing)** — Task 31 covers the manual QA approach.
- **Spec §9 (open items)** — schema/mock: Task 9 (mock-only); touch-hover: covered by `_groupHover` (CSS, not JS — works on desktop only, mobile shows no quick-add; we accept this as users on mobile tap directly into the detail); implementation order: theme-first; image cropping: handled via `objectFit='cover'` + `AspectRatio`; newsletter: visual-only (Task 17).
- **User add-on: Node update** — Task 0 handles this.

Open items intentionally not addressed in this plan (they remain in the spec's §10):
- Backend changes, performance optimization beyond defaults, automated tests, real analytics/SEO, i18n.

---
