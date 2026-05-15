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
