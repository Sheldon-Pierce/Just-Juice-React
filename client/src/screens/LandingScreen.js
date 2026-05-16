// client/src/screens/LandingScreen.js
// Composes the seven landing sections. Each section owns its own padding and Container.

import Hero from '../components/landing/Hero';
import FeaturedProducts from '../components/landing/FeaturedProducts';
import ProcessStrip from '../components/landing/ProcessStrip';
import EditorialBand from '../components/landing/EditorialBand';
import CategoryGrid from '../components/landing/CategoryGrid';
import NewsletterSignup from '../components/landing/NewsletterSignup';

export const LandingScreen = () => (
  <>
    <Hero />
    <FeaturedProducts />
    <ProcessStrip />
    <EditorialBand />
    <CategoryGrid />
    <NewsletterSignup />
  </>
);

export default LandingScreen;
