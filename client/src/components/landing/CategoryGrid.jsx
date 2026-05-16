// client/src/components/landing/CategoryGrid.jsx
// Four colored gradient tiles that link to the filtered products list.

import { Box, Container, SimpleGrid, AspectRatio, Heading, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';

const CATEGORIES = [
  { key: 'greens',  label: 'Greens',  gradient: 'linear-gradient(180deg,#a3b58a,#3f5d2c)', count: '2 bottles' },
  { key: 'reds',    label: 'Reds',    gradient: 'linear-gradient(180deg,#fda4af,#9f1239)', count: '2 bottles' },
  { key: 'citrus',  label: 'Citrus',  gradient: 'linear-gradient(180deg,#fcd34d,#b45309)', count: '2 bottles' },
  { key: 'berries', label: 'Berries', gradient: 'linear-gradient(180deg,#c4b5fd,#5b21b6)', count: '2 bottles' },
];

const CategoryGrid = () => (
  <Box as='section' py={{ base: '56px', lg: '96px' }} bg='paper'>
    <Container>
      <Reveal>
        <SectionHeading eyebrow='Find your color' title='Shop by category.' />
      </Reveal>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing='14px' mt='32px'>
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.key} delay={0.06 * i}>
            <LinkBox
              borderRadius='md'
              overflow='hidden'
              transition='transform 0.25s ease-out'
              _hover={{ transform: 'translateY(-2px)' }}
            >
              <AspectRatio ratio={1}>
                <Box bgImage={c.gradient} p='16px' color='cream' display='flex' flexDir='column' justifyContent='space-between'>
                  <Box />
                  <Box>
                    <Heading
                      as='h3'
                      fontFamily='heading'
                      fontWeight='medium'
                      fontSize='2xl'
                      color='cream'
                    >
                      <LinkOverlay as={RouterLink} to={`/products?category=${c.key}`}>
                        {c.label}
                      </LinkOverlay>
                    </Heading>
                    <Text fontFamily='mono' fontSize='xs' opacity={0.85} mt='2px'>
                      {c.count}
                    </Text>
                  </Box>
                </Box>
              </AspectRatio>
            </LinkBox>
          </Reveal>
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

export default CategoryGrid;
