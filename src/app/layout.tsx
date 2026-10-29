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
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { ToastNotification } from '../components/ToastNotification';

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
  title: 'Uttam Rasoi by Neelam | Ghar Ka Swad, Modern Kitchen | Stone-Ground Spices',
  description: '100% Pure, Stone-Ground Indian Spices, Pre-Seasoned Cast Iron Cookware & Aesthetic Storage curated by YouTube creator Neelam Saurabh Sharma. FSSAI Certified.',
  keywords: ['Indian Spices', 'Uttam Rasoi', 'Neelam Sharma', 'Stone Ground Masala', 'Garam Masala', 'Cast Iron Kadhai', 'Degi Mirch', 'FSSAI certified'],
  authors: [{ name: 'Neelam Saurabh Sharma' }],
  openGraph: {
    title: 'Uttam Rasoi by Neelam | Authentic Artisan Indian Kitchen',
    description: '100% Stone-Ground, Chemical-Free Spices & Handcrafted Cookware. Curated with Homemaker’s Love.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#C85A32',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
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
          <FloatingWhatsApp />
          <MobileBottomNav />
        </StoreProvider>
      </body>
    </html>
  );
}
