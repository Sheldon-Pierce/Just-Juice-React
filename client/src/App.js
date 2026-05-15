import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingScreen } from './screens/LandingScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminConsoleScreen from './screens/AdminConsoleScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import YourOrdersScreen from './screens/YourOrdersScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<LandingScreen />} />
            <Route path='/products' element={<ProductsScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/registration' element={<RegistrationScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/checkout' element={<CheckoutScreen />} />
            <Route path='/your-orders' element={<YourOrdersScreen />} />
            <Route path='/admin-console' element={<AdminConsoleScreen />} />
            <Route path='/order-success' element={<OrderSuccessScreen />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
