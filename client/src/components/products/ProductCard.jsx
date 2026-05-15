// client/src/components/products/ProductCard.jsx
// Used on landing (FeaturedProducts) and products listing. Hover reveals an Add-to-cart pill
// from the bottom of the image. Sold-out cards dim and disable the pill.

import { Box, AspectRatio, Image, Text, Flex, Badge, Button, useToast, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../redux/actions/cartActions';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { cart } = useSelector((state) => state.cart);
  const soldOut = product.stock <= 0;

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (cart.some((c) => c.id === product._id)) {
      toast({ description: 'Already in your cart.', status: 'info', isClosable: true });
      return;
    }
    dispatch(addCartItem(product._id, 1));
    toast({ description: 'Added.', status: 'success', isClosable: true });
  };

  return (
    <LinkBox
      role='group'
      opacity={soldOut ? 0.55 : 1}
      transition='opacity 0.2s ease-out'
    >
      <Box position='relative'>
        <AspectRatio ratio={3 / 4} bg='paper' border='1px solid' borderColor='line' borderRadius='sm' overflow='hidden'>
          <Image src={product.image} alt={product.name} objectFit='cover' />
        </AspectRatio>

        {/* Badge */}
        {soldOut ? (
          <Badge
            position='absolute' top='10px' left='10px'
            bg='ink' color='cream' textTransform='uppercase'
            fontFamily='body' fontSize='9px' letterSpacing='wider'
            fontWeight='semibold' px='8px' py='3px' borderRadius='full'
          >Sold out</Badge>
        ) : product.productIsNew ? (
          <Badge
            position='absolute' top='10px' left='10px'
            bg='cream' color='accent.green' border='1px solid' borderColor='line'
            textTransform='uppercase' fontFamily='body' fontSize='9px' letterSpacing='wider'
            fontWeight='semibold' px='8px' py='3px' borderRadius='full'
          >New</Badge>
        ) : null}

        {/* Hover quick-add */}
        {!soldOut && (
          <Box
            position='absolute' bottom='10px' left='10px' right='10px'
            opacity={0} transform='translateY(4px)'
            _groupHover={{ opacity: 1, transform: 'translateY(0)' }}
            transition='opacity 0.25s ease-out, transform 0.25s ease-out'
          >
            <Button variant='primary' size='sm' w='100%' onClick={addToCart}>
              Add to cart
            </Button>
          </Box>
        )}
      </Box>

      <Flex justify='space-between' align='baseline' mt='12px' fontFamily='body'>
        <Box>
          <Text fontSize='xs' letterSpacing='wider' textTransform='uppercase' color='muted'>
            {product.category}
          </Text>
          <Text fontFamily='heading' fontSize='lg' color='ink' mt='2px' fontWeight='medium' lineHeight='snug'>
            <LinkOverlay as={RouterLink} to={`/product/${product._id}`}>
              {product.name}
            </LinkOverlay>
          </Text>
        </Box>
        <Box textAlign='right'>
          <Text fontFamily='mono' fontSize='sm' color='ink'>${Number(product.price).toFixed(2)}</Text>
          <Text fontFamily='mono' fontSize='xs' color='muted' mt='2px'>16 oz</Text>
        </Box>
      </Flex>
    </LinkBox>
  );
};

export default ProductCard;
