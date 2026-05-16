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
