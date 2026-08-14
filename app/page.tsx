import React from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import TrustpilotReviews from '@/components/TrustpilotReviews';
import BlogSection from '@/components/BlogSection';
import DistilleryMapSection from '@/components/DistilleryMapSection';
import CaskClubSection from '@/components/CaskClubSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import CheckoutModal from '@/components/CheckoutModal';
import { CartProvider } from '@/lib/cart-context';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Whiskey Europe | Rare Single Malts, Aged Whiskies & European Cellars',
  description: 'Curated European online boutique for rare single malts, aged whiskies, distillery origin map, sommelier tasting notes, regional shipping across 27 EU member states, and Cask Club rewards.',
  keywords: [
    'whiskey europe',
    'rare single malts europe',
    'buy scotch whisky europe',
    'islay peated whisky',
    'sherry cask scotch',
    'irish single pot still',
    'distillery origin map europe',
    'rare bottle allocations',
  ],
  openGraph: {
    title: 'Whiskey Europe | Rare Single Malts & European Cellars',
    description: 'European boutique for rare single malts, aged whiskies, distillery map, regional shipping, and Cask Club rewards.',
    url: 'https://whiskeyeurope.org',
    siteName: 'Whiskey Europe',
    type: 'website',
  },
};

export default function HomePage() {
  // JSON-LD Structured Data for Organization, Store, and Products
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LiquorStore',
    name: 'Whiskey Europe',
    url: 'https://whiskeyeurope.org',
    logo: 'https://whiskeyeurope.org/logo.png',
    email: 'contact@whiskeyeurope.org',
    description: 'Curated European boutique for rare single malts, aged whiskies, distillery map, regional shipping, and Cask Club rewards.',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Credit Card, SEPA, Apple Pay, Klarna',
    areaServed: 'European Union',
    hasMap: 'https://whiskeyeurope.org/#distillery-map',
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#0f0d0b] text-[#f5f0ea] flex flex-col justify-between selection:bg-amber-600 selection:text-black">
        {/* 1. Top Header Announcement Bar */}
        <AnnouncementBar />

        {/* 2. Sticky Header Menu */}
        <Header />

        {/* 3. Hero Section */}
        <Hero />

        {/* 4. Categories Section */}
        <CategoriesSection />

        {/* 5. Featured Products Grid */}
        <FeaturedProducts />

        {/* Interactive Distillery Origin Map */}
        <DistilleryMapSection />

        {/* 6. Trustpilot Reviews Section */}
        <TrustpilotReviews />

        {/* Cask Club Loyalty Rewards Program */}
        <CaskClubSection />

        {/* 7. Blog Posts Preview (Exactly 4 Cards) */}
        <BlogSection />

        {/* 8. Global Footer */}
        <Footer />

        {/* Dynamic Modals & Drawers */}
        <CartDrawer />
        <QuickViewModal />
        <SearchOverlay />
        <AgeVerificationModal />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
