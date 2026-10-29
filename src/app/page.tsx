import { Hero } from '../components/Hero';
import { TrustBadges } from '../components/TrustBadges';
import { ShoppableVlogs } from '../components/ShoppableVlogs';
import { ProductCatalog } from '../components/ProductCatalog';
import { TeestahSpotlight } from '../components/TeestahSpotlight';
import { FoundersStory } from '../components/FoundersStory';
import { CustomerReviews } from '../components/CustomerReviews';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <ShoppableVlogs />
      <ProductCatalog />
      <TeestahSpotlight />
      <FoundersStory />
      <CustomerReviews />
      <Footer />
    </>
  );
}
