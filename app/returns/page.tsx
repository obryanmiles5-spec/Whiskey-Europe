import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { CartProvider } from '@/lib/cart-context';
import { RefreshCcw, CheckCircle2, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns & Refund Policy | Whiskey Europe',
  description:
    '14-day statutory return rights, bottle condition requirements, and rapid refund processing compliant with EU consumer protection regulations.',
  alternates: {
    canonical: 'https://whiskeyeurope.org/returns',
  },
  openGraph: {
    title: 'Returns & Refund Policy | Whiskey Europe',
    description:
      '14-day statutory return rights, bottle condition requirements, and rapid refund processing compliant with EU consumer protection regulations.',
    url: 'https://whiskeyeurope.org/returns',
    siteName: 'Whiskey Europe',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Returns & Refund Policy | Whiskey Europe',
    description:
      '14-day statutory return rights, bottle condition requirements, and rapid refund processing.',
  },
};

export default function ReturnsPage() {
  const returnsBreadcrumbs = {
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
        name: 'Returns & Refund Policy',
        item: 'https://whiskeyeurope.org/returns',
      },
    ],
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(returnsBreadcrumbs) }}
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
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>RETURNS & REFUND GUARANTEE</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f8f3ed]">
                Returns & Refund Policy
              </h1>
              <p className="text-xs text-[#8c7e70]">
                EU Consumer Rights Directive 2011/83/EU compliant 14-day cooling-off period
              </p>
            </div>

            <div className="bg-[#14100c] border border-[#28211a] rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-[#b8a898] leading-relaxed font-light">
              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  1. 14-Day Return Window
                </h2>
                <p>
                  You have the right to withdraw from your purchase within 14 calendar days of receiving your shipment without specifying a reason. To initiate a return, contact <span className="text-amber-400 font-mono">contact@whiskeyeurope.org</span> with your order number.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed]">
                  2. Bottle Condition Requirements
                </h2>
                <p>
                  Due to health, safety, and excise tax regulations, returned bottles must remain completely unopened, with original distillery wax/foil seals unbroken, tax stamps intact, and all original presentation boxes or wooden cases in pristine condition.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed]">
                  3. Rapid Refund Processing
                </h2>
                <p>
                  Once our cellar inspection team verifies the intact seals and bottle condition, refunds are processed within 2–4 business days directly to your original payment method (Credit Card, Bank Transfer, or PayPal).
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
