// client/src/components/Navbar.js
// Minimalist navbar — cream background, ink links, hairline divider, accent.green
// underline on the active route. No dark mode toggle (removed per spec §2).

import {
  Box, Flex, HStack, Stack, Link, Text, Button,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider,
  IconButton, useDisclosure, useToast,
} from '@chakra-ui/react';
import { Link as RouterLink, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const PRIMARY_LINKS = [
  { label: 'Shop',         to: '/products' },
  { label: 'The Line',     to: '/products' },
  { label: 'Our Process',  to: '/#process'  },
];

const NavLink = ({ to, children }) => (
  <Link
    as={RouterNavLink}
    to={to}
    fontFamily='body'
    fontSize='sm'
    color='ink'
    _hover={{ textDecoration: 'none', color: 'accent.green' }}
    _activeLink={{
      borderBottom: '1px solid',
      borderColor: 'accent.green',
      pb: '2px',
    }}
  >
    {children}
  </Link>
);

const CartLink = () => {
  const { cart } = useSelector((state) => state.cart);
  return (
    <Link as={RouterLink} to='/cart' fontFamily='body' fontSize='sm' color='ink' _hover={{ color: 'accent.green', textDecoration: 'none' }}>
      Cart ({cart.length})
    </Link>
  );
};

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast({ description: 'Signed out.', status: 'success', isClosable: true });
    navigate('/');
  };

  return (
    <Box
      as='nav'
      bg='cream'
      borderBottom='1px solid'
      borderColor='line'
      position='sticky'
      top='0'
      zIndex='sticky'
    >
      <Flex
        maxW='container.xl'
        mx='auto'
        h='64px'
        align='center'
        justify='space-between'
        px={{ base: '20px', md: '28px', lg: '32px' }}
      >
        {/* Left: wordmark + desktop links */}
        <HStack spacing='32px'>
          <Link as={RouterLink} to='/' _hover={{ textDecoration: 'none' }}>
            <Text fontFamily='heading' fontSize='xl' color='ink' letterSpacing='tight'>
              Just Juice
            </Text>
          </Link>
          <HStack as='nav' spacing='24px' display={{ base: 'none', md: 'flex' }}>
            {PRIMARY_LINKS.map((l) => (
              <NavLink key={l.label} to={l.to}>{l.label}</NavLink>
            ))}
          </HStack>
        </HStack>

        {/* Right: cart, account or sign-in/up */}
        <HStack spacing='20px'>
          <Box display={{ base: 'none', md: 'block' }}>
            <CartLink />
          </Box>
          {userInfo ? (
            <Menu>
              <MenuButton
                as={Button}
                variant='link'
                color='ink'
                fontFamily='body'
                fontSize='sm'
                rightIcon={<ChevronDownIcon />}
              >
                {userInfo.name}
              </MenuButton>
              <MenuList bg='paper' borderColor='line' fontFamily='body' fontSize='sm'>
                <MenuItem as={RouterLink} to='/profile'>Profile</MenuItem>
                <MenuItem as={RouterLink} to='/your-orders'>Your Orders</MenuItem>
                {userInfo.isAdmin === 'true' && (
                  <>
                    <MenuDivider borderColor='line' />
                    <MenuItem as={RouterLink} to='/admin-console'>Admin Console</MenuItem>
                  </>
                )}
                <MenuDivider borderColor='line' />
                <MenuItem onClick={handleLogout}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing='12px'>
              <Button as={RouterLink} to='/login' variant='link' size='sm'>Sign in</Button>
              <Button
                as={RouterLink}
                to='/registration'
                variant='primary'
                size='sm'
                display={{ base: 'none', md: 'inline-flex' }}
              >
                Sign up
              </Button>
            </HStack>
          )}
          <IconButton
            aria-label='Toggle menu'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant='link'
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </HStack>
      </Flex>

      {/* Mobile dropdown sheet */}
      {isOpen && (
        <Box pb='16px' display={{ md: 'none' }} px='20px' borderTop='1px solid' borderColor='line'>
          <Stack as='nav' spacing='12px' pt='12px'>
            {PRIMARY_LINKS.map((l) => (
              <NavLink key={l.label} to={l.to}>{l.label}</NavLink>
            ))}
            <CartLink />
            {!userInfo && <NavLink to='/registration'>Sign up</NavLink>}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
