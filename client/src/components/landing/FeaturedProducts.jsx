// client/src/components/landing/FeaturedProducts.jsx
// First four products as a grid. Pulls from the existing Redux products slice.

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, SimpleGrid, Stack } from '@chakra-ui/react';
import { getProducts } from '../../redux/actions/productActions';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';
import ProductCard from '../products/ProductCard';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const featured = (products || []).slice(0, 4);

  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='paper'>
      <Container>
        <Reveal>
          <SectionHeading eyebrow='The Line' title='Four to start with.' />
        </Reveal>
        <Reveal delay={0.08}>
          <Stack mt='24px'>
            {loading && <Box fontFamily='body' color='muted'>Loading…</Box>}
            {error && <Box fontFamily='body' color='status.error'>Couldn't load products.</Box>}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing='20px'>
              {featured.map((p) => <ProductCard key={p._id} product={p} />)}
            </SimpleGrid>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
