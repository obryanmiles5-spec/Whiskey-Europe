import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import CheckoutModal from '@/components/CheckoutModal';
import { CartProvider } from '@/lib/cart-context';
import { Search, Compass, ShoppingBag, ArrowRight, BookOpen, Wine, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page & Allocation Not Found | Whiskey Europe',
  description:
    'The requested bottle allocation or page could not be found in our bonded cellars. Search our collection of rare single malts, Japanese whiskies, and collector spirits.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const popularCategories = [
    { name: 'Japanese Whiskies', href: '/shop?category=Japanese' },
    { name: 'Balvenie Casks', href: '/shop?category=Balvenie' },
    { name: 'The Macallan', href: '/shop?category=Macallan' },
    { name: 'Hennessy Cognac', href: '/shop?category=Hennessy' },
    { name: 'Bourbon & Rye', href: '/shop?category=Bourbon' },
    { name: 'Port Ellen Ghost Casks', href: '/shop?category=Port%20Ellen' },
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white">
        <div>
          <Header />

          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-10">
            {/* 404 Hero Emblem */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white text-xs font-mono font-black uppercase tracking-widest border-2 border-black shadow-md">
                <Wine className="w-4 h-4 text-white" />
                <span>ERROR 404 • CELLAR ALLOCATION UNLOCATED</span>
              </div>

              <h1 className="font-serif font-black text-5xl sm:text-7xl text-black tracking-tight leading-none">
                404
              </h1>

              <h2 className="font-serif font-black text-2xl sm:text-3xl text-black">
                This Bottle or Page Is Not In Our Cellar
              </h2>

              <p className="text-sm sm:text-base text-zinc-700 max-w-lg mx-auto font-medium leading-relaxed">
                The allocation URL you entered may have moved, expired, or been reserved. Use our search tool or browse our authenticated bonded catalog below.
              </p>
            </div>

            {/* Quick Search Redirect Box */}
            <form action="/shop" method="GET" className="max-w-md mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  name="q"
                  placeholder="Search 165+ rare single malts, bourbon..."
                  className="w-full bg-zinc-50 border-2 border-black rounded-full px-5 py-3 text-sm text-black placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
                />
                <Search className="w-4 h-4 text-zinc-500 absolute right-4 top-3.5" />
              </div>
              <button
                type="submit"
                className="bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full border-2 border-black transition-all cursor-pointer shadow-md hover:shadow-black/20"
              >
                Search
              </button>
            </form>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2.5 bg-black hover:bg-zinc-800 text-white font-black text-sm px-8 py-4 rounded-full shadow-xl transition-all uppercase tracking-wider border-2 border-black w-full sm:w-auto"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Shop All Bottles</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <Link
                href="/rare-whiskey-index"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-black font-extrabold text-sm px-7 py-4 rounded-full border-2 border-black transition-all w-full sm:w-auto shadow-sm"
              >
                <Compass className="w-4 h-4 text-black" />
                <span>Rare Spirits Index</span>
              </Link>

              <Link
                href="/how-to-crypto"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-black font-extrabold text-sm px-7 py-4 rounded-full border-2 border-black transition-all w-full sm:w-auto shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-black" />
                <span>How to Pay with Crypto</span>
              </Link>
            </div>

            {/* Curated Category Shortcuts */}
            <div className="pt-8 border-t-2 border-zinc-200 space-y-4">
              <span className="text-xs font-mono font-black uppercase tracking-wider text-zinc-500 block">
                Popular European Bonded Categories
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {popularCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="px-4 py-2 bg-zinc-50 hover:bg-black hover:text-white text-black font-bold text-xs rounded-full border-2 border-black transition-all shadow-xs"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cellar Vault Authenticity Guarantee */}
            <div className="p-4 bg-zinc-50 border-2 border-black rounded-2xl max-w-xl mx-auto flex items-center justify-center gap-3 text-xs text-black font-semibold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <ShieldCheck className="w-5 h-5 text-black shrink-0" />
              <span>All bottles certified 100% authentic and dispatched from bonded Rotterdam cellars.</span>
            </div>
          </main>
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
