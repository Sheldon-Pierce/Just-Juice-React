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
