// client/src/components/landing/NewsletterSignup.jsx
// Quiet single-line newsletter signup. Visual-only — no backend wired.

import { useState } from 'react';
import { Box, Container, Heading, Text, Input, Button, HStack, useToast } from '@chakra-ui/react';
import Reveal from '../shared/Reveal';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    console.log('[Newsletter] would subscribe:', email);
    toast({ description: 'Thanks — you're on the list.', status: 'success', isClosable: true });
    setEmail('');
  };

  return (
    <Box as='section' py={{ base: '56px', lg: '96px' }} bg='cream' textAlign='center'>
      <Container>
        <Reveal>
          <Heading as='h3' variant='sub'>Get the next press list.</Heading>
          <Text fontFamily='body' fontSize='sm' color='muted' mt='8px'>
            Tuesdays, one email. Never spam.
          </Text>
          <Box as='form' onSubmit={handleSubmit} mt='20px' display='inline-block'>
            <HStack
              spacing='6px'
              p='6px 6px 6px 16px'
              borderRadius='full'
              border='1px solid'
              borderColor='line'
              bg='paper'
            >
              <Input
                variant='unstyled'
                placeholder='hello@yours.com'
                fontFamily='body'
                fontSize='sm'
                width='220px'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type='submit' variant='primary' size='sm'>Join</Button>
            </HStack>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
};

export default NewsletterSignup;
