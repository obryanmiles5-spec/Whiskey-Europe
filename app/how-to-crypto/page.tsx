import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import CheckoutModal from '@/components/CheckoutModal';
import QuickViewModal from '@/components/QuickViewModal';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { CartProvider } from '@/lib/cart-context';
import HowToCryptoClient from './HowToCryptoClient';

export const metadata: Metadata = {
  title: 'How to Pay with Crypto | Bitcoin & Digital Currency Guide | Whiskey Europe',
  description:
    'Step-by-step guide to purchasing rare whiskies with Bitcoin (BTC SegWit), Ethereum, and digital assets. Secure, private, and instant bonded cellar checkout across Europe.',
  keywords: [
    'buy whiskey with crypto',
    'buy scotch with bitcoin',
    'whiskey europe crypto payment',
    'rare spirits bitcoin checkout',
    'how to pay crypto whiskey',
    'btc whiskey store europe',
  ],
  alternates: {
    canonical: 'https://whiskeyeurope.org/how-to-crypto',
  },
  openGraph: {
    title: 'How to Pay with Crypto | Whiskey Europe',
    description:
      'Step-by-step guide to purchasing rare whiskies with Bitcoin and digital assets with zero bank delays and bonus Cask Club points.',
    url: 'https://whiskeyeurope.org/how-to-crypto',
    siteName: 'Whiskey Europe',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Pay with Crypto | Whiskey Europe',
    description:
      'Step-by-step guide to purchasing rare whiskies with Bitcoin and digital assets across Europe.',
  },
};

export default function HowToCryptoPage() {
  const breadcrumbSchema = {
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
        name: 'How to Crypto',
        item: 'https://whiskeyeurope.org/how-to-crypto',
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Pay with Cryptocurrency at Whiskey Europe',
    description:
      'A complete guide for purchasing rare spirits and single malt scotch with Bitcoin and cryptocurrency.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Select Bottles & Proceed to Checkout',
        text: 'Select your rare whiskey allocations and proceed to checkout.',
      },
      {
        '@type': 'HowToStep',
        name: 'Choose Crypto Payment',
        text: 'Select Crypto (BTC, ETH, USDT) as your preferred checkout method.',
      },
      {
        '@type': 'HowToStep',
        name: 'Send Crypto from Your Wallet',
        text: 'Transfer the exact amount to the verified Whiskey Europe Bitcoin address.',
      },
      {
        '@type': 'HowToStep',
        name: 'Submit Proof of Payment',
        text: 'Provide your TX hash or screenshot to contact@whiskeyeurope.org for priority packaging.',
      },
    ],
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="min-h-screen bg-[#0f0d0b] text-[#f5f0ea] flex flex-col justify-between selection:bg-amber-600 selection:text-black">
        <div>
          <Header />
          <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
            <HowToCryptoClient />
          </main>
        </div>

        <Footer />
        <CartDrawer />
        <SearchOverlay />
        <CheckoutModal />
        <QuickViewModal />
        <AgeVerificationModal />
      </div>
    </CartProvider>
  );
}
