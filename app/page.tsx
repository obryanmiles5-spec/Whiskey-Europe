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
  description:
    'Curated European boutique for rare single malts, Japanese Mizunara, Balvenie Tun series, Karuizawa ghost distillery casks, Macallan Sherry Oak & Red Collection, Port Ellen vintage casks, antique Bourbons, and fine Cognacs. 100% bonded authenticity guaranteed with insured delivery across 27 EU countries.',
  keywords: [
    'whiskey europe',
    'rare single malts europe',
    'buy scotch whisky europe',
    'islay peated whisky',
    'sherry cask scotch',
    'japanese whisky europe',
    'balvenie 17 25 30 40 50',
    'karuizawa single cask whisky',
    'macallan 25 30 sherry oak',
    'pappy van winkle europe',
    'port ellen 1979 1982 1983',
    'bourbon allocations europe',
    'distillery origin map europe',
    'rare bottle allocations',
  ],
  alternates: {
    canonical: 'https://whiskeyeurope.org',
  },
  openGraph: {
    title: 'Whiskey Europe | Rare Single Malts & European Cellars',
    description:
      'Curated European boutique for rare single malts, aged whiskies, Japanese allocations, distillery map, regional shipping, and Cask Club rewards.',
    url: 'https://whiskeyeurope.org',
    siteName: 'Whiskey Europe',
    type: 'website',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/d/12Xn18KSHqyNIDRTEwZmH3-eIaT5LESZ6',
        width: 1200,
        height: 630,
        alt: 'Whiskey Europe Rare Bottle Allocations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whiskey Europe | Rare Single Malts & European Cellars',
    description:
      'Curated European boutique for rare single malts, aged whiskies, Japanese allocations, and antique Bourbons.',
    images: ['https://lh3.googleusercontent.com/d/12Xn18KSHqyNIDRTEwZmH3-eIaT5LESZ6'],
  },
};

export default function HomePage() {
  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': 'LiquorStore',
    name: 'Whiskey Europe',
    legalName: 'Whiskey Europe B.V.',
    url: 'https://whiskeyeurope.org',
    logo: 'https://whiskeyeurope.org/icon.png',
    image: 'https://lh3.googleusercontent.com/d/12Xn18KSHqyNIDRTEwZmH3-eIaT5LESZ6',
    email: 'contact@whiskeyeurope.org',
    telephone: '+31-10-890-4422',
    description:
      'Curated European boutique for rare single malts, aged whiskies, Japanese Mizunara, Balvenie, Macallan, Port Ellen, Bourbon allocations, and rare Cognacs.',
    currenciesAccepted: 'EUR, GBP, USD, CHF, JPY',
    paymentAccepted: 'Credit Card, SEPA Bank Transfer, Apple Pay, Klarna',
    areaServed: 'European Union',
    hasMap: 'https://whiskeyeurope.org/#distillery-map',
    priceRange: '€€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Willemskade 22, Port of Rotterdam Bonded Zone',
      addressLocality: 'Rotterdam',
      postalCode: '3016 DK',
      addressCountry: 'NL',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are all rare whisky bottles 100% authentic and verified?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every vintage and single cask allocation on Whiskey Europe is stored in bonded climate-controlled facilities in Rotterdam, verified with anti-counterfeit seals and origin provenance documentation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you ship rare whiskies and bourbons across all European Union countries?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide fully insured, temperature-stabilized express shipping across all 27 EU member states, including Germany, France, Italy, Spain, Netherlands, Belgium, Austria, Sweden, and Denmark with all duties and VAT pre-cleared.',
        },
      },
      {
        '@type': 'Question',
        name: 'What rare allocations are available in the bonded vault?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our vault features Balvenie DCS Compendium, Macallan 25/30/50 Sherry Oak, Karuizawa ghost distillery casks, Yamazaki 50 & Mizunara, Port Ellen Single Casks, Pappy Van Winkle 15/20/23, and Hennessy Paradis.',
        },
      },
    ],
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
