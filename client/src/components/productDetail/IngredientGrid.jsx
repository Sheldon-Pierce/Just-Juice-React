// client/src/components/productDetail/IngredientGrid.jsx
// Six circles with category-tinted gradients, name + percentage. Pulls from mock data.

import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';
import { getMockData } from '../../data/productMockData';

const IngredientGrid = ({ product }) => {
  const { ingredients } = getMockData(product);

  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='paper'>
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Six things, that's it." title="What's actually inside." />
        </Reveal>
        <SimpleGrid columns={{ base: 3, md: 6 }} spacing='18px' mt='32px'>
          {ingredients.map((ing, i) => (
            <Reveal key={ing.name} delay={0.05 * i}>
              <Box textAlign='center'>
                <Box
                  w='64px'
                  h='64px'
                  borderRadius='full'
                  bgImage={ing.swatch}
                  mx='auto'
                  mb='10px'
                />
                <Text fontFamily='heading' fontSize='md' color='ink'>{ing.name}</Text>
                <Text fontFamily='mono' fontSize='xs' color='muted' mt='2px'>{ing.percentage}%</Text>
              </Box>
            </Reveal>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default IngredientGrid;
