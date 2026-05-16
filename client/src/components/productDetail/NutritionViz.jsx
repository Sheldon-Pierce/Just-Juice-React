// client/src/components/productDetail/NutritionViz.jsx
// Animated bar chart left, full nutrition panel right. Bars fill from 0 on viewport entry.

import { useRef } from 'react';
import { Box, Container, Grid, Text, Flex, Heading } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import Reveal from '../shared/Reveal';
import Eyebrow from '../shared/Eyebrow';
import { getMockData } from '../../data/productMockData';

const MotionDiv = motion.div;

const Bar = ({ label, value, max, unit, animate }) => {
  const pct = Math.max(4, Math.min(100, (value / max) * 100));
  return (
    <>
      <Text fontFamily='body' fontSize='sm' color='muted'>{label}</Text>
      <Box h='8px' bg='line' borderRadius='full' overflow='hidden'>
        <MotionDiv
          initial={{ width: 0 }}
          animate={animate ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', background: '#1F3A2E', borderRadius: '999px' }}
        />
      </Box>
      <Text fontFamily='mono' fontSize='sm' color='ink' textAlign='right'>
        {value}{unit}
      </Text>
    </>
  );
};

const NutritionViz = ({ product }) => {
  const { nutrition, panel, volume } = getMockData(product);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='cream' ref={containerRef}>
      <Container>
        <Grid templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }} gap={{ base: '32px', lg: '40px' }} alignItems='start'>
          <Box>
            <Reveal>
              <Eyebrow>Per {volume} bottle</Eyebrow>
              <Heading as='h2' variant='section' mt='8px'>Nutrition, visualized.</Heading>
            </Reveal>
            <Box mt='28px' display='grid' gridTemplateColumns='100px 1fr 60px' gap='10px 16px' alignItems='center'>
              {Object.values(nutrition).map((row) => (
                <Bar
                  key={row.label}
                  label={row.label}
                  value={row.value}
                  max={row.max}
                  unit={row.unit}
                  animate={inView}
                />
              ))}
            </Box>
          </Box>
          <Reveal delay={0.08}>
            <Box bg='paper' border='1px solid' borderColor='line' borderRadius='md' p='22px'>
              <Heading as='h4' fontFamily='heading' fontWeight='normal' fontSize='lg' mb='12px'>
                The full panel
              </Heading>
              <Box as='ul' listStyleType='none' p={0} m={0} fontFamily='body' fontSize='sm' color='ink'>
                {panel.map(([label, value], i) => (
                  <Flex
                    as='li'
                    key={label}
                    justify='space-between'
                    py='4px'
                    borderBottom={i < panel.length - 1 ? '1px dashed' : 'none'}
                    borderColor='line'
                  >
                    <Text>{label}</Text>
                    <Text fontFamily='mono'>{value}</Text>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Reveal>
        </Grid>
      </Container>
    </Box>
  );
};

export default NutritionViz;
