// client/src/screens/ProductScreen.js
// Product detail page: hero (gallery + buy box), ingredients, nutrition, story, reviews, related.

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Container, Stack, Spinner, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { getProduct, getProducts } from '../redux/actions/productActions';
import ProductGallery from '../components/productDetail/ProductGallery';
import BuyBox from '../components/productDetail/BuyBox';
import IngredientGrid from '../components/productDetail/IngredientGrid';
import NutritionViz from '../components/productDetail/NutritionViz';
import StoryStrip from '../components/productDetail/StoryStrip';
import ReviewsGrid from '../components/productDetail/ReviewsGrid';
import RelatedProducts from '../components/productDetail/RelatedProducts';

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((s) => s.product);

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getProducts());
  }, [dispatch, id]);

  if (loading || !product || !product._id) {
    return (
      <Container py='80px'>
        <Stack align='center'><Spinner color='accent.green' /></Stack>
      </Container>
    );
  }
  if (error) {
    return (
      <Container py='80px'>
        <Text fontFamily='body' color='status.error'>Couldn't load product.</Text>
      </Container>
    );
  }

  return (
    <Box as='main'>
      <Container pt='16px'>
        <Breadcrumb fontFamily='body' fontSize='xs' color='muted' separator='/'>
          <BreadcrumbItem><BreadcrumbLink as={RouterLink} to='/products'>Shop</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbItem><BreadcrumbLink as={RouterLink} to={`/products?category=${product.category}`}>{product.category}</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbItem isCurrentPage><Text color='ink'>{product.name}</Text></BreadcrumbItem>
        </Breadcrumb>
      </Container>

      <Container py={{ base: '24px', lg: '32px' }}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '32px', lg: '48px' }} align='start'>
          <Box flex='1.2' w='100%'>
            <ProductGallery product={product} />
          </Box>
          <Box flex='0.8' w='100%'>
            <BuyBox product={product} />
          </Box>
        </Stack>
      </Container>

      <IngredientGrid product={product} />
      <NutritionViz product={product} />
      <StoryStrip product={product} />
      <ReviewsGrid product={product} />
      <RelatedProducts currentId={product._id} />
    </Box>
  );
};

export default ProductScreen;
