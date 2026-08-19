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
  title: 'Boutique Bottle Shop | Rare Single Malts & European Whiskies',
  description: 'Explore our full boutique catalog of rare single malts, aged Scotches, Irish pot still whiskies, and Nordic craft allocations with EU-wide insured delivery.',
};

export default function ShopPage() {
  return (
    <CartProvider>
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

