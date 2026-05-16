// client/src/components/productDetail/ProductGallery.jsx
// Vertical thumb strip + large main image with cross-fade swap.
// On mobile, thumbs flow horizontally below the main image.

import { useState } from 'react';
import { Box, AspectRatio, Image, Stack, HStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionImage = motion(Image);

const ProductGallery = ({ product }) => {
  // The schema has a single image; synthesize 4 thumbnails until multi-image support exists.
  const images = [product.image, product.image, product.image, product.image];
  const [active, setActive] = useState(0);

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing='12px'
      align='stretch'
    >
      {/* Thumbs */}
      <HStack
        as={Stack}
        direction={{ base: 'row', md: 'column' }}
        spacing='10px'
        w={{ base: '100%', md: '80px' }}
        order={{ base: 2, md: 1 }}
      >
        {images.map((src, i) => (
          <Box
            key={i}
            cursor='pointer'
            onClick={() => setActive(i)}
            aspectRatio='1'
            w={{ base: '64px', md: '80px' }}
            borderRadius='sm'
            overflow='hidden'
            border='1px solid'
            borderColor={i === active ? 'accent.green' : 'line'}
            bg='paper'
            transition='border-color 0.2s ease-out'
          >
            <Image src={src} alt={`${product.name} thumbnail ${i + 1}`} objectFit='cover' w='100%' h='100%' />
          </Box>
        ))}
      </HStack>

      {/* Main */}
      <Box flex='1' order={{ base: 1, md: 2 }}>
        <AspectRatio ratio={3 / 4} bg='paper' border='1px solid' borderColor='line' borderRadius='md' overflow='hidden' position='relative'>
          <AnimatePresence mode='wait'>
            <MotionImage
              key={active}
              src={images[active]}
              alt={product.name}
              objectFit='cover'
              w='100%' h='100%'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </AspectRatio>
      </Box>
    </Stack>
  );
};

export default ProductGallery;
