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
    <footer className="bg-black border-t-2 border-black text-zinc-400 text-xs pt-16 pb-12" id="contact">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 space-y-12">
        
        {/* Top Newsletter Banner */}
        <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-white font-mono text-[11px] font-black uppercase tracking-wider block">
              EXCLUSIVE ALLOCATION ALERTS &amp; €15 VOUCHER
            </span>
            <h3 className="font-serif font-black text-xl sm:text-2xl text-white">
              Join the Whiskey Europe Club
            </h3>
            <p className="text-xs text-zinc-400 font-medium">
              Get early access to limited distillery cask drops and sommelier tasting invitations.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Enter your email (e.g. user@domain.com)"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full sm:w-72 bg-black border border-zinc-700 rounded-lg px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white shadow-xs"
              />
              <Mail className="w-4 h-4 text-zinc-400 absolute right-3 top-3.5" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white hover:bg-zinc-200 text-black font-black text-xs px-6 py-3 rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 uppercase tracking-wider border border-white"
            >
              <span>{isSubmitting ? 'Joining...' : 'Get €15 Voucher'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {newsletterStatus && (
          <p className="text-center text-xs text-black font-mono font-bold bg-white p-3 rounded-lg border-2 border-white animate-fadeIn">
            {newsletterStatus}
          </p>
        )}

        {/* Global Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <BrandLogo size="lg" variant="dark" />
            </Link>

            <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-sm">
              Europe’s premier online boutique dedicated to rare single malts, collectible cask allocations, and artisanal European craft whiskies. Bonded climate-controlled delivery across all 27 EU member states.
            </p>

            <p className="text-xs text-zinc-500 font-semibold leading-relaxed max-w-sm">
              © 2026 Whiskey Europe (whiskeyeurope.org). All rights reserved. Please drink responsibly.
            </p>
          </div>

          {/* Col 2: Collections Sitemap */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-sm text-white uppercase tracking-wider">
              Rare Collections
            </h4>
            <ul className="space-y-2 text-zinc-400 font-medium">
              <li><Link href="/rare-whiskey-index" className="hover:text-white transition-colors font-bold text-white flex items-center gap-1">★ Rare Whiskey &amp; Spirits Index</Link></li>
              <li><Link href="/shop?category=Ballantine%27s" className="hover:text-white transition-colors">Ballantine&apos;s Heritage 21-40Y</Link></li>
              <li><Link href="/shop?category=Balvenie" className="hover:text-white transition-colors">Balvenie Cask Allocations</Link></li>
              <li><Link href="/shop?category=Bourbon" className="hover:text-white transition-colors">Bourbon &amp; Rye Allocations</Link></li>
              <li><Link href="/shop?category=Hennessy" className="hover:text-white transition-colors">Hennessy Cognac Allocations</Link></li>
            </ul>
          </div>

          {/* Col 3: Editorial & Blog */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-sm text-white uppercase tracking-wider">
              Journal &amp; Guides
            </h4>
            <ul className="space-y-2 text-zinc-400 font-medium">
              <li><Link href="/blog" className="hover:text-white font-bold text-white transition-colors flex items-center gap-1">All Journal Articles</Link></li>
              <li><Link href="/blog/guide-to-investing-in-rare-islay-malts-2026" className="hover:text-white transition-colors">Whisky Investing Guide</Link></li>
              <li><Link href="/blog/decoding-tasting-notes-peat-sherry-and-oak" className="hover:text-white transition-colors">Tasting Masterclasses</Link></li>
              <li><Link href="/blog/uncorking-continental-europe-nordic-and-french-whiskies" className="hover:text-white transition-colors">Distillery Spotlights</Link></li>
              <li><Link href="/blog/understanding-eu-alcohol-import-regulations-and-shipping" className="hover:text-white transition-colors">EU Tax &amp; Regulations</Link></li>
              <li><Link href="/#distillery-map" className="hover:text-white transition-colors">Terroir &amp; Distillery Map</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-sm text-white uppercase tracking-wider">
              Legal &amp; Policies
            </h4>
            <ul className="space-y-2 text-zinc-400 font-medium">
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy &amp; GDPR Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">EU Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns &amp; Refunds</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li className="pt-1 text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Strict 18+ Age Required</li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
}
