// client/src/screens/ProductsScreen.js
// Browse page: header, filter pills + sort, responsive grid of ProductCard.
// Reads `?category=...` from the URL so the landing CategoryGrid can deep-link.

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, SimpleGrid, Stack, Flex, Text, Spinner } from '@chakra-ui/react';
import { getProducts } from '../redux/actions/productActions';
import Reveal from '../components/shared/Reveal';
import Eyebrow from '../components/shared/Eyebrow';
import { Heading } from '@chakra-ui/react';
import ProductCard from '../components/products/ProductCard';
import FilterPills from '../components/products/FilterPills';
import SortSelect from '../components/products/SortSelect';

const matchesCategory = (product, key) => {
  if (key === 'all') return true;
  const cat = (product.category || '').toLowerCase();
  return cat.includes(key.slice(0, key.length - 1)) || cat.includes(key); // 'greens' ↔ 'green'
};

const sortBy = (key) => (a, b) => {
  switch (key) {
    case 'price-asc':  return Number(a.price) - Number(b.price);
    case 'price-desc': return Number(b.price) - Number(a.price);
    case 'rating':     return Number(b.rating) - Number(a.rating);
    case 'newest':     return (b.productIsNew ? 1 : 0) - (a.productIsNew ? 1 : 0);
    case 'featured':
    default:           return 0;
  }
};

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';
  const [active, setActive]   = useState(urlCategory);
  const [sortKey, setSortKey] = useState('featured');

  useEffect(() => { dispatch(getProducts()); }, [dispatch]);
  useEffect(() => { setActive(urlCategory); }, [urlCategory]);

  const handleCategoryChange = (key) => {
    setActive(key);
    if (key === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', key);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const visible = useMemo(() => {
    return [...(products || [])]
      .filter((p) => matchesCategory(p, active))
      .sort(sortBy(sortKey));
  }, [products, active, sortKey]);

  return (
    <Box as='main' bg='cream'>
      <Container py={{ base: '40px', lg: '56px' }}>
        <Reveal>
          <Eyebrow>The Full Line</Eyebrow>
          <Heading as='h1' variant='display' mt='8px'>Every bottle, all at once.</Heading>
          <Text fontFamily='body' fontSize='md' color='muted' mt='10px' maxW='480px'>
            Cold-pressed juices, organized by color. Filter by what you're craving, sort by what suits you.
          </Text>
        </Reveal>
      </Container>

      <Box borderBottom='1px solid' borderColor='line'>
        <Container py='12px'>
          <Flex
            justify='space-between'
            align={{ base: 'flex-start', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
            gap='12px'
          >
            <FilterPills active={active} onChange={handleCategoryChange} />
            <Flex align='center' gap='16px'>
              <Text fontFamily='mono' fontSize='xs' color='muted'>
                {visible.length} {visible.length === 1 ? 'bottle' : 'bottles'}
              </Text>
              <SortSelect value={sortKey} onChange={setSortKey} />
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container py={{ base: '32px', lg: '56px' }}>
        {loading && <Stack align='center' py='40px'><Spinner color='accent.green' /></Stack>}
        {error && <Text fontFamily='body' color='status.error'>Couldn't load products.</Text>}
        {!loading && !error && visible.length === 0 && (
          <Stack align='center' py='40px' spacing='6px'>
            <Text fontFamily='heading' fontSize='xl'>Nothing in this color today.</Text>
            <Text fontFamily='body' fontSize='sm' color='muted'>Try another category — or come back next Tuesday.</Text>
          </Stack>
        )}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing='20px 16px'>
          {visible.map((p) => <ProductCard key={p._id} product={p} />)}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ProductsScreen;
