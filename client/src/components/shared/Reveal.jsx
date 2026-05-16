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
