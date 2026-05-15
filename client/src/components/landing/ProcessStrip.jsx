// client/src/components/landing/ProcessStrip.jsx
// Three numbered steps: Source / Press / Deliver. Italic Fraunces numerals.

import { Box, Container, SimpleGrid, Heading, Text } from '@chakra-ui/react';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';

const STEPS = [
  { num: '01.', title: 'Source',  body: 'Organic produce from regional farms, picked the morning of the press.' },
  { num: '02.', title: 'Press',   body: 'Hydraulic cold-press in small batches. No heat, no pulp shortcuts.' },
  { num: '03.', title: 'Deliver', body: 'Glass bottles, refrigerated truck, at your door within 36 hours.' },
];

const ProcessStrip = () => (
  <Box as='section' id='process' py={{ base: '56px', lg: '96px' }} bg='cream'>
    <Container>
      <Reveal>
        <SectionHeading eyebrow='How we press' title='Three steps. No additives.' />
      </Reveal>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: '32px', md: '24px' }} mt='32px'>
        {STEPS.map((s, i) => (
          <Reveal key={s.num} delay={0.08 * (i + 1)}>
            <Box>
              <Heading
                as='span'
                fontFamily='heading'
                fontStyle='italic'
                fontSize='3xl'
                color='accent.green'
                fontWeight='normal'
              >
                {s.num}
              </Heading>
              <Heading as='h3' variant='sub' mt='6px'>{s.title}</Heading>
              <Text fontFamily='body' fontSize='sm' color='muted' mt='6px' lineHeight='normal'>
                {s.body}
              </Text>
            </Box>
          </Reveal>
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

export default ProcessStrip;
