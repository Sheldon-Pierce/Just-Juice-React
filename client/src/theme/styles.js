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
