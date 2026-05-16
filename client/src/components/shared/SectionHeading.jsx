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
