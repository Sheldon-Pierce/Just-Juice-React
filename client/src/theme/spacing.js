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
