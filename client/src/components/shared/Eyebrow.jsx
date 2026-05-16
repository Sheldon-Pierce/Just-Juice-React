// client/src/components/shared/Eyebrow.jsx
// Uppercase tracked label that appears above section titles.

import { Heading } from '@chakra-ui/react';

const Eyebrow = ({ children, color, ...rest }) => (
  <Heading as='span' variant='eyebrow' color={color || 'accent.green'} {...rest}>
    {children}
  </Heading>
);

export default Eyebrow;
