// client/src/components/landing/EditorialBand.jsx
// Full-bleed band with deep-green tint and an italic pull-quote over landing.jpg.

import { Box, Container, Heading, Text } from '@chakra-ui/react';
import Reveal from '../shared/Reveal';

const EditorialBand = () => (
  <Box
    as='section'
    minH={{ base: '280px', md: '360px' }}
    bgImage='linear-gradient(135deg, rgba(31,58,46,0.85), rgba(31,58,46,0.65)), url(/images/landing.jpg)'
    bgSize='cover'
    bgPosition='center'
    color='cream'
    display='flex'
    alignItems='center'
  >
    <Container>
      <Reveal>
        <Box maxW='560px'>
          <Heading
            as='h2'
            fontFamily='heading'
            fontStyle='italic'
            fontWeight='normal'
            fontSize={{ base: '26px', md: '32px' }}
            lineHeight='snug'
            color='cream'
          >
            "The juice is alive, so we treat it like it is."
          </Heading>
          <Text fontFamily='body' fontSize='sm' opacity={0.85} mt='10px'>
            — Note from the press room
          </Text>
        </Box>
      </Reveal>
    </Container>
  </Box>
);

export default EditorialBand;
