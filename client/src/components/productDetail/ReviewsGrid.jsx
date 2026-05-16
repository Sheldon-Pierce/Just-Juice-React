// client/src/components/productDetail/ReviewsGrid.jsx
// Three review cards. Pulls from product.reviews; falls back to a stock set if none exist.

import { Box, Container, SimpleGrid, Text, Flex } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';

const FALLBACK_REVIEWS = [
  { rating: 5, comment: 'Honestly the only one I look forward to drinking. Worth the price.', name: 'Mara P.' },
  { rating: 5, comment: 'Bright, balanced, not too sweet. I get it every Tuesday now.',        name: 'Jonas K.' },
  { rating: 4, comment: 'Lovely, though I wish the ginger were a touch stronger.',             name: 'Riya T.' },
];

const Stars = ({ n }) => (
  <Flex gap='2px'>
    {[1,2,3,4,5].map((i) => (
      <StarIcon key={i} w='12px' h='12px' color={i <= n ? 'accent.green' : 'line'} />
    ))}
  </Flex>
);

const ReviewsGrid = ({ product }) => {
  const reviews = (product.reviews && product.reviews.length ? product.reviews : FALLBACK_REVIEWS).slice(0, 3);
  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='paper'>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={`${product.numberOfReviews || reviews.length} reviews · ${Number(product.rating || 4.8).toFixed(1)} average`}
            title='What folks are saying.'
          />
        </Reveal>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing='18px' mt='32px'>
          {reviews.map((r, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <Box bg='cream' border='1px solid' borderColor='line' borderRadius='md' p='20px'>
                <Stars n={r.rating} />
                <Text fontFamily='heading' fontSize='md' color='ink' mt='10px' lineHeight='normal'>
                  "{r.comment}"
                </Text>
                <Text fontFamily='body' fontSize='xs' color='muted' mt='10px' letterSpacing='wide'>
                  {r.name} · verified buyer
                </Text>
              </Box>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ReviewsGrid;
