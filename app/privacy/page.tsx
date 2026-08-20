import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { CartProvider } from '@/lib/cart-context';
import { Lock, Shield, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Whiskey Europe',
  description: 'GDPR compliance, personal data protection, cookies management, and customer confidentiality.',
};

export default function PrivacyPage() {
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
                <Lock className="w-3.5 h-3.5" />
                <span>GDPR & DATA PRIVACY</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f8f3ed]">
                Privacy & Data Protection Policy
              </h1>
              <p className="text-xs text-[#8c7e70]">
                Compliant with General Data Protection Regulation (EU) 2016/679 (GDPR)
              </p>
            </div>

            <div className="bg-[#14100c] border border-[#28211a] rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-[#b8a898] leading-relaxed font-light">
              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-500" />
                  1. Information We Collect
                </h2>
                <p>
                  Whiskey Europe collects essential customer information required for age verification, delivery routing across the 27 EU member states, and transactional billing. This includes your name, shipping address, contact email, phone number, and age affirmation timestamp.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed]">
                  2. Purpose of Data Processing
                </h2>
                <p>
                  Your personal data is strictly used to fulfill purchased bottle orders, provide bonded courier tracking updates, process payments, and dispatch opt-in newsletters regarding exclusive single cask allocations. We never sell or lease customer information to third parties.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif font-bold text-lg text-[#f8f3ed]">
                  3. Your Rights Under GDPR
                </h2>
                <p>
                  As an EU resident, you have the right to access, rectify, export, or request the deletion of your personal data at any time. To exercise your rights, email our Data Protection Officer at <span className="text-amber-400 font-mono">privacy@whiskeyeurope.org</span>.
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
