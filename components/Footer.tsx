'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, ShieldCheck, MapPin, Truck, HelpCircle, CheckCircle2 } from 'lucide-react';
import { subscribeNewsletterAction } from '@/app/actions/send-email';
import BrandLogo from '@/components/BrandLogo';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubmitting(true);
    try {
      const res = await subscribeNewsletterAction(newsletterEmail);
      if (res.success) {
        setNewsletterStatus(`Success! Welcome voucher sent to ${newsletterEmail}. Code: ${res.voucherCode}`);
        setNewsletterEmail('');
      } else {
        setNewsletterStatus(res.message);
      }
    } catch {
      setNewsletterStatus('Thank you for joining Whiskey Europe! Check your email inbox.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#0b0907] border-t border-[#261f18] text-[#c2b2a3] text-xs pt-16 pb-12" id="contact">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 space-y-12">
        
        {/* Top Zoho Newsletter Banner */}
        <div className="bg-gradient-to-r from-[#17130f] via-[#1c1611] to-[#120e0b] border border-amber-900/50 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-amber-500 font-mono text-[11px] uppercase tracking-wider">
              EXCLUSIVE ALLOCATION ALERTS & €15 VOUCHER
            </span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#f8f3ed]">
              Join the Whiskey Europe Club
            </h3>
            <p className="text-xs text-[#a39382]">
              Get early access to limited distillery cask drops and sommelier tasting invitations.
            </p>
          </div>

          {/* Form sending via Zoho Mail Server Action */}
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Enter your email (e.g. user@domain.com)"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full sm:w-72 bg-[#0d0b09] border border-[#332920] rounded-lg px-4 py-3 text-xs text-[#f5f0ea] placeholder-[#6e6256] focus:outline-none focus:border-amber-500"
              />
              <Mail className="w-4 h-4 text-[#6e6256] absolute right-3 top-3.5" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold text-xs px-6 py-3 rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              <span>{isSubmitting ? 'Joining...' : 'Get €15 Voucher'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {newsletterStatus && (
          <p className="text-center text-xs text-amber-400 font-mono font-semibold bg-amber-950/80 p-3 rounded border border-amber-800/60 animate-fadeIn">
            {newsletterStatus}
          </p>
        )}

        {/* Global Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-[#221b15] pb-12">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <BrandLogo size="lg" />
            </Link>

            <p className="text-xs text-[#9c8e80] font-light leading-relaxed max-w-sm">
              Europe’s premier online boutique dedicated to rare single malts, collectible cask allocations, and artisanal European craft whiskies. Bonded climate-controlled delivery across all 27 EU member states.
            </p>

            <div className="space-y-1.5 text-xs text-[#b0a090]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Domain: <strong className="text-[#f5f0ea]">whiskeyeurope.org</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>Cellar Team: <a href="mailto:contact@whiskeyeurope.org" className="text-amber-400 hover:underline">contact@whiskeyeurope.org</a></span>
              </p>
            </div>
          </div>

          {/* Col 2: Collections Sitemap */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#f5f0ea] uppercase tracking-wider">
              Rare Collections
            </h4>
            <ul className="space-y-2 text-[#a39382]">
              <li><Link href="/shop?category=Balvenie" className="hover:text-amber-400 transition-colors">Balvenie Cask Allocations</Link></li>
              <li><Link href="/shop?category=Scottish%20Whiskey" className="hover:text-amber-400 transition-colors">Scottish Single Malts</Link></li>
              <li><Link href="/shop?category=Japanese" className="hover:text-amber-400 transition-colors">Japanese Mizunara Whiskies</Link></li>
              <li><Link href="/shop?category=Macallan" className="hover:text-amber-400 transition-colors">The Macallan Sherry Oak</Link></li>
              <li><Link href="/shop?category=Old%20and%20Rare" className="hover:text-amber-400 transition-colors">Old & Rare Vintage Casks</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Care & EU Shipping */}
          <div className="space-y-3" id="shipping-faq">
            <h4 className="font-serif font-bold text-sm text-[#f5f0ea] uppercase tracking-wider">
              EU Shipping & Tax
            </h4>
            <ul className="space-y-2 text-[#a39382]">
              <li><a href="#shipping-faq" className="hover:text-amber-400 transition-colors">27 EU Countries Transit</a></li>
              <li><a href="#shipping-faq" className="hover:text-amber-400 transition-colors">Insured Climate Packaging</a></li>
              <li><a href="#shipping-faq" className="hover:text-amber-400 transition-colors">Pre-paid VAT & Duties</a></li>
              <li><a href="#shipping-faq" className="hover:text-amber-400 transition-colors">Authenticity Guarantee</a></li>
              <li><a href="#cask-club" className="hover:text-amber-400 transition-colors">The Cask & Club Rewards</a></li>
            </ul>
          </div>

          {/* Col 4: FAQ Quick Accordion */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#f5f0ea] uppercase tracking-wider">
              Compliance & FAQ
            </h4>
            <div className="space-y-2 text-[11px] text-[#8c7e70]">
              <div className="p-2 bg-[#120e0b] border border-[#231d17] rounded">
                <strong className="text-[#d1c5b8] block">Age Requirement:</strong>
                Strict 18+ age verification required upon entry & courier sign-off.
              </div>
              <div className="p-2 bg-[#120e0b] border border-[#231d17] rounded">
                <strong className="text-[#d1c5b8] block">Bottles Authenticity:</strong>
                All vintage bottles sourced directly from distillery cellars.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Payment Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#786c60]">
          <div>
            © 2026 Whiskey Europe (whiskeyeurope.org). All rights reserved. Please drink responsibly.
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 text-xs font-mono text-[#b3a393]">
            <span className="px-2 py-1 bg-[#18130f] border border-[#2b221a] rounded text-[11px]">Credit Card</span>
            <span className="px-2 py-1 bg-[#18130f] border border-[#2b221a] rounded text-[11px]">Bank Transfer</span>
            <span className="px-2 py-1 bg-[#18130f] border border-[#2b221a] rounded text-[11px]">Crypto</span>
            <span className="px-2 py-1 bg-[#18130f] border border-[#2b221a] rounded text-[11px]">PayPal</span>
            <span className="px-2 py-1 bg-[#18130f] border border-[#2b221a] rounded text-[11px]">Pay ID</span>
            <span className="px-2 py-1 bg-[#18130f] border border-[#2b221a] rounded text-[11px]">Wire Transfer</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
