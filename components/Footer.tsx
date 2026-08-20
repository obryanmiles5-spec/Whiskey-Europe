'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send } from 'lucide-react';
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
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs pt-16 pb-12" id="contact">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 space-y-12">
        
        {/* Top Zoho Newsletter Banner */}
        <div className="bg-gradient-to-r from-amber-50/90 via-white to-amber-50/60 border border-amber-200 rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-amber-700 font-mono text-[11px] font-bold uppercase tracking-wider">
              EXCLUSIVE ALLOCATION ALERTS & €15 VOUCHER
            </span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              Join the Whiskey Europe Club
            </h3>
            <p className="text-xs text-slate-600">
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
                className="w-full sm:w-72 bg-white border border-slate-300 rounded-lg px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600 shadow-xs"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs px-6 py-3 rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              <span>{isSubmitting ? 'Joining...' : 'Get €15 Voucher'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {newsletterStatus && (
          <p className="text-center text-xs text-amber-900 font-mono font-semibold bg-amber-50 p-3 rounded-lg border border-amber-300 animate-fadeIn">
            {newsletterStatus}
          </p>
        )}

        {/* Global Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <BrandLogo size="lg" variant="light" />
            </Link>

            <p className="text-xs text-slate-600 font-light leading-relaxed max-w-sm">
              Europe’s premier online boutique dedicated to rare single malts, collectible cask allocations, and artisanal European craft whiskies. Bonded climate-controlled delivery across all 27 EU member states.
            </p>

            <p className="text-xs text-slate-500 font-light leading-relaxed max-w-sm">
              © 2026 Whiskey Europe (whiskeyeurope.org). All rights reserved. Please drink responsibly.
            </p>
          </div>

          {/* Col 2: Collections Sitemap */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-slate-900 uppercase tracking-wider">
              Rare Collections
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/shop?category=Ballantine%27s" className="hover:text-amber-700 transition-colors font-medium">Ballantine&apos;s Heritage 21-40Y</Link></li>
              <li><Link href="/shop?category=Balvenie" className="hover:text-amber-700 transition-colors">Balvenie Cask Allocations</Link></li>
              <li><Link href="/shop?category=Scottish%20Whiskey" className="hover:text-amber-700 transition-colors">Scottish Single Malts</Link></li>
              <li><Link href="/shop?category=Japanese" className="hover:text-amber-700 transition-colors">Japanese Mizunara Whiskies</Link></li>
              <li><Link href="/shop?category=Macallan" className="hover:text-amber-700 transition-colors">The Macallan Sherry Oak</Link></li>
              <li><Link href="/shop?category=Old%20and%20Rare" className="hover:text-amber-700 transition-colors">Old & Rare Vintage Casks</Link></li>
              <li><Link href="/shop?category=Port%20Ellen" className="hover:text-amber-700 transition-colors">Port Ellen Historic Releases</Link></li>
            </ul>
          </div>

          {/* Col 3: Editorial & Blog */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-slate-900 uppercase tracking-wider">
              Journal & Guides
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/blog" className="hover:text-amber-700 font-medium text-amber-900 transition-colors flex items-center gap-1">All Journal Articles</Link></li>
              <li><Link href="/blog/guide-to-investing-in-rare-islay-malts-2026" className="hover:text-amber-700 transition-colors">Whisky Investing Guide</Link></li>
              <li><Link href="/blog/decoding-tasting-notes-peat-sherry-and-oak" className="hover:text-amber-700 transition-colors">Tasting Masterclasses</Link></li>
              <li><Link href="/blog/uncorking-continental-europe-nordic-and-french-whiskies" className="hover:text-amber-700 transition-colors">Distillery Spotlights</Link></li>
              <li><Link href="/blog/understanding-eu-alcohol-import-regulations-and-shipping" className="hover:text-amber-700 transition-colors">EU Tax & Regulations</Link></li>
              <li><Link href="/#distillery-map" className="hover:text-amber-700 transition-colors">Terroir & Distillery Map</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-slate-900 uppercase tracking-wider">
              Legal & Policies
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link href="/terms" className="hover:text-amber-700 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-700 transition-colors">Privacy & GDPR Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-amber-700 transition-colors">EU Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-amber-700 transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/cookies" className="hover:text-amber-700 transition-colors">Cookie Policy</Link></li>
              <li className="pt-1 text-[11px] text-slate-500 font-medium">Strict 18+ Age Required</li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
}
