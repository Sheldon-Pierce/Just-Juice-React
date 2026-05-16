// client/src/components/productDetail/RelatedProducts.jsx
// Four other products, excluding the current one. Lighter card variant — no quick-add.

import { Box, Container, SimpleGrid, AspectRatio, Image, Flex, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';

const RelatedProducts = ({ currentId }) => {
  const { products } = useSelector((s) => s.products);
  const others = (products || []).filter((p) => p._id !== currentId).slice(0, 4);

  if (!others.length) return null;

  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='cream'>
      <Container>
        <Reveal>
          <SectionHeading eyebrow='Pairs nicely with' title='Try these next.' />
        </Reveal>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing='16px' mt='32px'>
          {others.map((p, i) => (
            <Reveal key={p._id} delay={0.04 * i}>
              <LinkBox>
                <AspectRatio ratio={3 / 4} bg='paper' border='1px solid' borderColor='line' borderRadius='sm' overflow='hidden'>
                  <Image src={p.image} alt={p.name} objectFit='cover' />
                </AspectRatio>
                <Flex justify='space-between' align='baseline' mt='10px' fontFamily='body' fontSize='sm'>
                  <Text fontFamily='heading' fontSize='md' color='ink'>
                    <LinkOverlay as={RouterLink} to={`/product/${p._id}`}>{p.name}</LinkOverlay>
                  </Text>
                  <Text fontFamily='mono' color='muted'>${Number(p.price).toFixed(2)}</Text>
                </Flex>
              </LinkBox>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default RelatedProducts;
