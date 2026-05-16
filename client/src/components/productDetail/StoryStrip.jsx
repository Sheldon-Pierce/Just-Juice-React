// client/src/components/productDetail/StoryStrip.jsx
// Same pattern as landing's EditorialBand but scoped to this product (story from mock data).

import { Box, Container, Heading, Text } from '@chakra-ui/react';
import Reveal from '../shared/Reveal';
import { getMockData } from '../../data/productMockData';

const StoryStrip = ({ product }) => {
  const { story } = getMockData(product);
  return (
    <Box
      as='section'
      minH='200px'
      bgImage='linear-gradient(135deg, rgba(31,58,46,0.95), rgba(31,58,46,0.75))'
      color='cream'
      display='flex'
      alignItems='center'
    >
      <Container py='56px'>
        <Reveal>
          <Box maxW='560px'>
            <Text
              fontFamily='body' fontSize='xs' fontWeight='semibold'
              letterSpacing='widest' textTransform='uppercase' color='whiteAlpha.800'
            >
              Why this one is different
            </Text>
            <Heading
              as='h2'
              fontFamily='heading'
              fontStyle='italic'
              fontWeight='normal'
              fontSize={{ base: '24px', md: '28px' }}
              lineHeight='snug'
              mt='8px'
              color='cream'
            >
              {story}
            </Heading>
            <Text fontFamily='body' fontSize='sm' opacity={0.85} mt='10px'>
              — From our tasting notes
            </Text>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
};

export default StoryStrip;
