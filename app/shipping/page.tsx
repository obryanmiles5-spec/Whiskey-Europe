import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { CartProvider } from '@/lib/cart-context';
import { Truck, ShieldCheck, Box, Globe, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EU Shipping & Customs Policy | Whiskey Europe',
  description: 'Door-to-door insured climate delivery across all 27 EU member states, duty clearance, and specialized spirits packaging.',
};

export default function ShippingPage() {
  return (
    <CartProvider>
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
                <Truck className="w-3.5 h-3.5" />
                <span>EU LOGISTICS & TRANSIT</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f8f3ed]">
                Shipping, Transit & Customs Policy
              </h1>
              <p className="text-xs text-[#8c7e70]">
                Express climate-controlled courier services across all 27 European Union member states
              </p>
            </div>

            <div className="bg-[#14100c] border border-[#28211a] rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-[#b8a898] leading-relaxed font-light">
              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed] flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-500" />
                  1. Delivery Destinations & Transit Times
                </h2>
                <p>
                  We ship directly from our bonded temperature-regulated distribution hub to all 27 EU member states (including Germany, France, Italy, Spain, Netherlands, Belgium, Sweden, Denmark, Austria, Poland, and Ireland). Standard express transit averages 2–4 business days.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed] flex items-center gap-2">
                  <Box className="w-4 h-4 text-amber-500" />
                  2. Bottle Packaging & Breakage Protection
                </h2>
                <p>
                  Every bottle is packed in custom molded shock-absorbing pulp or inflatable air-cushion chambers, designed to withstand drops and prevent thermal shock. Original presentation tubes, wooden cases, and decanter certificates are packaged securely alongside the bottles.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  3. 100% Transit Insurance
                </h2>
                <p>
                  All shipments are fully insured against loss, theft, and accidental transit damage. In the rare event of bottle breakage, we dispatch an immediate replacement or issue a full refund upon receipt of courier verification photos.
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
