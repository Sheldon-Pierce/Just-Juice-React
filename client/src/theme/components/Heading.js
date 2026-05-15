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
