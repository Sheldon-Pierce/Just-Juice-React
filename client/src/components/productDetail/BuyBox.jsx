// client/src/components/productDetail/BuyBox.jsx
// Right column of the hero: name, rating, description, price, qty stepper, add-to-cart.
// Sticky-follows the user on desktop until the next section. CSS sticky is enough.

import { useState } from 'react';
import { Box, Text, Heading, Flex, Stack, Button, IconButton, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { StarIcon } from '@chakra-ui/icons';
import { addCartItem } from '../../redux/actions/cartActions';
import Eyebrow from '../shared/Eyebrow';
import { getMockData } from '../../data/productMockData';

const Stars = ({ rating }) => {
  const filled = Math.round(rating || 0);
  return (
    <Flex align='center' gap='2px' color='accent.green'>
      {[1,2,3,4,5].map((n) => (
        <StarIcon key={n} w='14px' h='14px' color={n <= filled ? 'accent.green' : 'line'} />
      ))}
    </Flex>
  );
};

const BuyBox = ({ product }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((s) => s.cart);
  const toast = useToast();
  const [qty, setQty] = useState(1);
  const mock = getMockData(product);
  const soldOut = product.stock <= 0;

  const addToCart = () => {
    if (cart.some((c) => c.id === product._id)) {
      toast({ description: 'Already in your cart.', status: 'info', isClosable: true });
      return;
    }
    dispatch(addCartItem(product._id, qty));
    toast({ description: 'Added.', status: 'success', isClosable: true });
  };

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);

  return (
    <Box
      position={{ base: 'static', lg: 'sticky' }}
      top={{ lg: '88px' }}
      alignSelf='start'
    >
      <Eyebrow>{product.category}</Eyebrow>
      <Heading as='h1' variant='display' mt='6px'>{product.name}</Heading>

      <Flex align='center' gap='8px' mt='14px' fontFamily='body' fontSize='sm' color='muted'>
        <Stars rating={product.rating} />
        <Text>{Number(product.rating || 0).toFixed(1)}</Text>
        <Text>·</Text>
        <Text>{product.numberOfReviews} reviews</Text>
      </Flex>

      <Text fontFamily='body' fontSize='md' color='ink' mt='22px' maxW='380px' lineHeight='normal'>
        {product.description || mock.subtitle}
      </Text>

      <Flex align='baseline' gap='16px' mt='26px'>
        <Text fontFamily='heading' fontSize='3xl' color='ink'>${Number(product.price).toFixed(2)}</Text>
        <Text fontFamily='mono' fontSize='xs' color='muted'>
          {mock.volume} · {mock.nutrition.calories.value} kcal
        </Text>
      </Flex>

      <Flex align='center' gap='10px' mt='20px'>
        <Flex
          align='center'
          gap='12px'
          border='1px solid'
          borderColor='line'
          borderRadius='full'
          p='4px 6px'
          bg='paper'
        >
          <IconButton aria-label='Decrease quantity' variant='link' size='sm' onClick={dec} icon={<Box>−</Box>} />
          <Text fontFamily='mono' fontSize='sm' minW='14px' textAlign='center'>{qty}</Text>
          <IconButton aria-label='Increase quantity' variant='link' size='sm' onClick={inc} icon={<Box>+</Box>} />
        </Flex>
        <Button variant='primary' size='lg' onClick={addToCart} isDisabled={soldOut}>
          {soldOut ? 'Sold out' : 'Add to cart →'}
        </Button>
      </Flex>

      <Flex align='center' gap='6px' mt='14px' fontFamily='body' fontSize='xs' color='accent.green'>
        <Box w='6px' h='6px' borderRadius='full' bg={soldOut ? 'muted' : 'accent.green'} />
        <Text>{soldOut ? 'Out of stock' : 'In stock · Ships Thursday'}</Text>
      </Flex>
    </Box>
  );
};

export default BuyBox;
