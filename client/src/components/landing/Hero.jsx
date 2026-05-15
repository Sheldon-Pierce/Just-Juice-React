// client/src/components/landing/Hero.jsx
// First-fold hero. Split layout: copy left, large 4:5 photo right.
// On mobile, photo stacks below copy.

import { Box, Container, Stack, Heading, Text, Button, Image, AspectRatio } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Reveal from '../shared/Reveal';
import Eyebrow from '../shared/Eyebrow';

const Hero = () => (
  <Box as='section' py={{ base: '40px', lg: '96px' }}>
    <Container>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: '32px', lg: '48px' }}
        align='center'
      >
        <Box flex='1.1'>
          <Reveal>
            <Eyebrow>Cold-Pressed · Small Batch</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading as='h1' variant='display' mt='12px'>
              Pressed for{' '}
              <Text as='em' fontStyle='italic'>you.</Text>
            </Heading>
          </Reveal>
          <Reveal delay={0.16}>
            <Text fontFamily='body' fontSize='md' color='muted' mt='18px' maxW='420px' lineHeight='normal'>
              Six ingredients. No shortcuts. Made fresh on Tuesdays and delivered cold to your door by Thursday.
            </Text>
          </Reveal>
          <Reveal delay={0.24}>
            <Stack direction='row' spacing='10px' mt='24px'>
              <Button as={RouterLink} to='/products' variant='primary' size='lg'>
                Shop the line →
              </Button>
              <Button as={RouterLink} to='/#process' variant='ghost' size='lg'>
                Our process
              </Button>
            </Stack>
          </Reveal>
        </Box>
        <Box flex='0.9' w='100%'>
          <Reveal delay={0.12}>
            <AspectRatio ratio={4 / 5} borderRadius='md' overflow='hidden'>
              <Image
                src='/images/juicelounge.jpg'
                alt='A glass of fresh cold-pressed juice'
                objectFit='cover'
              />
            </AspectRatio>
          </Reveal>
        </Box>
      </Stack>
    </Container>
  </Box>
);

export default Hero;
