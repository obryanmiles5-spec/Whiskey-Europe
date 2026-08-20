import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { CartProvider } from '@/lib/cart-context';
import { ShieldCheck, Scale, AlertCircle, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Whiskey Europe',
  description: 'Terms of Service, sale contracts, buyer age requirements, and European alcohol distribution compliance.',
};

export default function TermsPage() {
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
                <Scale className="w-3.5 h-3.5" />
                <span>LEGAL TERMS OF SALE</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f8f3ed]">
                Terms & Conditions of Service
              </h1>
              <p className="text-xs text-[#8c7e70]">
                Last updated: August 2026 • Governing Law: European Union Single Market & Trade Directives
              </p>
            </div>

            <div className="bg-[#14100c] border border-[#28211a] rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-[#b8a898] leading-relaxed font-light">
              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  1. Age Verification & Legal Drinking Age (18+)
                </h2>
                <p>
                  You must be at least 18 years of age (or the legal drinking age in your country of residence) to purchase alcoholic beverages from Whiskey Europe (whiskeyeurope.org). By placing an order, you warrant that you meet this statutory age requirement. Our couriers are legally mandated to request photo ID upon delivery.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed]">
                  2. Orders, Invoicing & Contract Formation
                </h2>
                <p>
                  An electronic confirmation email constitutes acceptance of your offer to purchase. All prices are listed in Euros (€) and include applicable European Value Added Tax (VAT) and duty clearances where indicated. Whiskey Europe reserves the right to cancel orders in case of pricing errors or sudden stock unavailability of vintage allocations.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed]">
                  3. Product Authenticity & Provenance Guarantee
                </h2>
                <p>
                  Every bottle of rare single malt Scotch, Japanese whisky, Irish whiskey, or French cognac offered in our boutique has been examined for seal integrity, ullage level, label condition, and authentic distillery provenance.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed]">
                  4. Payment Methods & Security
                </h2>
                <p>
                  We accept secure credit/debit card transactions, SEPA bank transfers, crypto assets, PayPal, and European direct wire payments. All payment gateways are processed with 256-bit SSL encryption.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed]">
                  5. Contact & Inquiries
                </h2>
                <p>
                  For any legal inquiries or wholesale account verification, please contact our compliance department via the contact portal or at <span className="text-amber-400 font-mono">contact@whiskeyeurope.org</span>.
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
