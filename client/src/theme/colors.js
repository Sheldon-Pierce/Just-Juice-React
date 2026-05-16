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
