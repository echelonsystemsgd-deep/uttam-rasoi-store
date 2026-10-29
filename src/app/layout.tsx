import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '../context/StoreContext';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Navbar } from '../components/Navbar';
import { SlideCart } from '../components/SlideCart';
import { CheckoutModal } from '../components/CheckoutModal';
import { ProductQuickViewModal } from '../components/ProductQuickViewModal';
import { RecipeModal } from '../components/RecipeModal';
import { PincodeModal } from '../components/PincodeModal';
import { PolicyModal } from '../components/PolicyModal';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { ToastNotification } from '../components/ToastNotification';
import { SITE_CONFIG } from '../config/site';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: 'Uttam Rasoi by Neelam | Ghar Ka Swad, Modern Kitchen | Stone-Ground Spices',
  description: '100% Pure, Stone-Ground Indian Spices, Pre-Seasoned Cast Iron Cookware & Aesthetic Storage curated by YouTube creator Neelam Saurabh Sharma. FSSAI Certified.',
  keywords: ['Indian Spices', 'Uttam Rasoi', 'Neelam Sharma', 'Stone Ground Masala', 'Garam Masala', 'Cast Iron Kadhai', 'Degi Mirch', 'FSSAI certified'],
  authors: [{ name: 'Neelam Saurabh Sharma' }],
  openGraph: {
    title: 'Uttam Rasoi by Neelam | Authentic Artisan Indian Kitchen',
    description: '100% Stone-Ground, Chemical-Free Spices & Handcrafted Cookware. Curated with Homemaker’s Love.',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: 'Uttam Rasoi by Neelam — Stone-Ground Indian Spices & Kitchen Essentials',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uttam Rasoi by Neelam | Stone-Ground Artisan Spices',
    description: '100% Stone-Ground, Chemical-Free Spices & Cookware curated with Homemaker’s Love.',
    images: [SITE_CONFIG.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: '#C85A32',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Brand',
      '@id': `${SITE_CONFIG.url}/#brand`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/logo.png`,
      description: SITE_CONFIG.tagline,
      founder: {
        '@type': 'Person',
        name: 'Neelam Saurabh Sharma',
      },
      sameAs: [
        SITE_CONFIG.social.youtube,
        SITE_CONFIG.social.instagram,
        SITE_CONFIG.social.facebook,
      ],
    },
    {
      '@type': 'Store',
      '@id': `${SITE_CONFIG.url}/#store`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.whatsappDisplay,
      email: SITE_CONFIG.supportEmail,
      priceRange: '₹129 - ₹1,499',
      currenciesAccepted: 'INR',
      paymentAccepted: 'UPI, Cash on Delivery, Credit Card, Debit Card, NetBanking',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New Delhi',
        addressRegion: 'Delhi NCR',
        postalCode: '110001',
        addressCountry: 'IN',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '428',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="bg-cream-50 text-charcoal-900 font-sans antialiased selection:bg-terracotta-100 selection:text-terracotta-700 min-h-screen flex flex-col">
        <StoreProvider>
          <ToastNotification />
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Global Interactive Overlays */}
          <SlideCart />
          <CheckoutModal />
          <ProductQuickViewModal />
          <RecipeModal />
          <PincodeModal />
          <PolicyModal />
          <FloatingWhatsApp />
          <MobileBottomNav />
        </StoreProvider>
      </body>
    </html>
  );
}
