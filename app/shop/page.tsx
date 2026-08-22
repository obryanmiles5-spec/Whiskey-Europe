import React, { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import CheckoutModal from '@/components/CheckoutModal';
import ShopClient from './ShopClient';
import { CartProvider } from '@/lib/cart-context';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boutique Bottle Shop | Rare Single Malts, Bourbon & Japanese Whiskies',
  description:
    'Explore our European bonded cellar catalog: Balvenie DCS Compendium, Macallan Sherry Oak, Yamazaki 18/25/50, Karuizawa ghost casks, Port Ellen, Blanton\'s, Pappy Van Winkle, and Weller with 100% authenticity guarantee and insured EU delivery.',
  keywords: [
    'buy rare whisky europe',
    'buy allocated bourbon europe',
    'buy yamazaki 18 europe',
    'buy blanton\'s single barrel europe',
    'buy pappy van winkle europe',
    'buy macallan 25 sherry oak',
    'buy karuizawa single cask',
    'buy weller bourbon europe',
    'bonded cellar shop rotterdam',
  ],
  alternates: {
    canonical: 'https://whiskeyeurope.org/shop',
  },
  openGraph: {
    title: 'Boutique Bottle Shop | Whiskey Europe',
    description:
      'Explore certified authentic rare single malts, aged Scotches, Bourbons, and Japanese whiskies stored in bonded cellars in Rotterdam.',
    url: 'https://whiskeyeurope.org/shop',
    siteName: 'Whiskey Europe',
    type: 'website',
  },
};

export default function ShopPage() {
  const shopBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://whiskeyeurope.org',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Boutique Bottle Shop',
        item: 'https://whiskeyeurope.org/shop',
      },
    ],
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopBreadcrumbs) }}
      />
      <div className="min-h-screen bg-[#0f0d0b] text-[#f5f0ea] flex flex-col justify-between selection:bg-amber-600 selection:text-black">
        <div>
          <Header />
          <Suspense fallback={
            <div className="min-h-[50vh] flex items-center justify-center text-amber-400">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="font-mono text-xs uppercase tracking-widest text-[#a39382]">Opening Bonded Cellar...</p>
              </div>
            </div>
          }>
            <ShopClient />
          </Suspense>
        </div>
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <SearchOverlay />
        <AgeVerificationModal />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
