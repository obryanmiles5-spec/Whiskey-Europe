import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { CartProvider } from '@/lib/cart-context';
import { Cookie, ShieldAlert, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Whiskey Europe',
  description:
    'Cookie usage, session preferences, cart persistence, and consent management under EU ePrivacy Directive and GDPR.',
  alternates: {
    canonical: 'https://whiskeyeurope.org/cookies',
  },
  openGraph: {
    title: 'Cookie Policy | Whiskey Europe',
    description:
      'Cookie usage, session preferences, cart persistence, and consent management under EU ePrivacy Directive and GDPR.',
    url: 'https://whiskeyeurope.org/cookies',
    siteName: 'Whiskey Europe',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy | Whiskey Europe',
    description:
      'Cookie usage, session preferences, cart persistence, and consent management under EU ePrivacy Directive and GDPR.',
  },
};

export default function CookiesPage() {
  const cookiesBreadcrumbs = {
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
        name: 'Cookie Policy',
        item: 'https://whiskeyeurope.org/cookies',
      },
    ],
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cookiesBreadcrumbs) }}
      />
      <div className="min-h-screen bg-[#0f0d0b] text-[#f5f0ea] flex flex-col justify-between">
        <div>
          <Header />

          <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors bg-[#18130f] px-3.5 py-2 rounded-lg border border-[#2b221a]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1612] border border-amber-900/50 text-amber-400 text-xs font-mono">
                <Cookie className="w-3.5 h-3.5" />
                <span>COOKIE & CONSENT DIRECTIVE</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f8f3ed]">
                Cookie & Storage Policy
              </h1>
              <p className="text-xs text-[#8c7e70]">
                EU ePrivacy Directive & GDPR Cookie Management
              </p>
            </div>

            <div className="bg-[#14100c] border border-[#28211a] rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-[#b8a898] leading-relaxed font-light">
              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed]">
                  1. Essential Session & Cart Cookies
                </h2>
                <p>
                  Whiskey Europe uses essential client storage and session cookies to maintain your shopping cart items, age verification affirmations (18+), and currency preferences across browser visits. These technical cookies are strictly necessary for the operation of the boutique.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed]">
                  2. Performance & Analytics Cookies
                </h2>
                <p>
                  We utilize anonymous performance telemetry to measure page speed, cart checkout reliability, and search term discovery, allowing us to continuously improve our cellar collection browsing experience.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed]">
                  3. Managing Your Cookie Preferences
                </h2>
                <p>
                  You can modify your browser settings at any time to reject non-essential cookies or clear existing browser storage. Note that disabling essential cookies may impact shopping cart persistence.
                </p>
              </section>
            </div>
          </main>
        </div>

        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <SearchOverlay />
        <AgeVerificationModal />
      </div>
    </CartProvider>
  );
}
