import {
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
  Box,
  useColorModeValue,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdLocalDrink } from 'react-icons/md';
// import { Logo } from './Logo'

export const Footer = () => (
  <Box w='100%' bg={useColorModeValue('gray.100', 'gray.900')}>
    <Container
      as='footer'
      role='contentinfo'
      py={{ base: '12', md: '16' }}
      maxW='7xl'
    >
      <Stack spacing={{ base: '4', md: '5' }}>
        <Stack justify='space-between' direction='row' align='center'>
          <Flex alignItems={'center'}>
            <Icon as={MdLocalDrink} h={6} w={6} color='orange.400' />
            <Text fontSize={'2xl'} fontWeight='extrabold'>
              Just Juice
            </Text>
          </Flex>
          <ButtonGroup variant='ghost'>
            <IconButton
              as='a'
              href='#'
              aria-label='LinkedIn'
              icon={<FaLinkedin fontSize='1.25rem' />}
            />
            <IconButton
              as='a'
              href='#'
              aria-label='GitHub'
              icon={<FaGithub fontSize='1.25rem' />}
            />
            <IconButton
              as='a'
              href='#'
              aria-label='Twitter'
              icon={<FaTwitter fontSize='1.25rem' />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize='sm' color='subtle'>
          &copy; {new Date().getFullYear()} Just Juice, Inc. All rights
          reserved.
        </Text>
      </Stack>
    </Container>
  </Box>
);
