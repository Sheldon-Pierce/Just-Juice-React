// client/src/components/Footer.js
// Four-column footer, ink background, cream text. Stacks to 2-col on tablet, 1-col on phone.

import { Box, Container, SimpleGrid, Stack, Text, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const COLUMNS = [
  {
    heading: 'Shop',
    items: [
      ['All juices',   '/products'],
      ['Greens',       '/products?category=greens'],
      ['Reds',         '/products?category=reds'],
      ['Citrus',       '/products?category=citrus'],
    ],
  },
  {
    heading: 'Brand',
    items: [
      ['Our process',  '/#process'],
      ['Sourcing',     '/#sourcing'],
      ['Press',        '/#press'],
    ],
  },
  {
    heading: 'Support',
    items: [
      ['Account',      '/profile'],
      ['Orders',       '/your-orders'],
      ['Contact',      '/#contact'],
    ],
  },
];

const ColumnHeading = ({ children }) => (
  <Heading
    as='h5'
    fontFamily='body'
    fontSize='xs'
    fontWeight='semibold'
    letterSpacing='wider'
    textTransform='uppercase'
    color='whiteAlpha.700'
    mb='10px'
  >
    {children}
  </Heading>
);

export const Footer = () => (
  <Box as='footer' bg='ink' color='cream'>
    <Container py={{ base: '40px', md: '56px' }}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing='28px' gridTemplateColumns={{ md: '1.5fr 1fr 1fr 1fr' }}>
        <Box>
          <Text fontFamily='heading' fontSize='xl' letterSpacing='tight'>Just Juice</Text>
          <Text fontFamily='body' fontSize='sm' color='whiteAlpha.700' mt='8px' maxW='240px'>
            Cold-pressed, locally sourced, delivered fresh.
          </Text>
        </Box>
        {COLUMNS.map((col) => (
          <Box key={col.heading}>
            <ColumnHeading>{col.heading}</ColumnHeading>
            <Stack as='ul' spacing='6px' listStyleType='none' fontFamily='body' fontSize='sm'>
              {col.items.map(([label, to]) => (
                <li key={label}>
                  <Link as={RouterLink} to={to} color='cream' _hover={{ color: 'whiteAlpha.700', textDecoration: 'none' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
      <Text fontFamily='body' fontSize='xs' color='whiteAlpha.500' mt='40px'>
        © {new Date().getFullYear()} Just Juice · Made cold, pressed slow.
      </Text>
    </Container>
  </Box>
);

export default Footer;
