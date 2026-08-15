'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function Hero() {
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const HERO_IMAGE_URL = 'https://lh3.googleusercontent.com/d/1kRjtiHpP7MbwhkWzx2S69nE4G_WtH63Y';

  return (
    <section className="relative w-full h-[70vh] min-h-[480px] max-h-[750px] overflow-hidden bg-[#0f0d0b] border-b border-[#241d17]">
      {/* Background Hero Cover Image */}
      <Image
        src={HERO_IMAGE_URL}
        alt="Whiskey Europe Hero Cover"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
        referrerPolicy="no-referrer"
      />

      {/* Subtle overlay to ensure the shop button pops cleanly */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

      {/* Centered Overlay with ONLY the Shop Button */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <Link
          href="/shop"
          onClick={(e) => {
            const el = document.getElementById('collection');
            if (el && window.location.pathname === '/') {
              e.preventDefault();
              handleScrollToSection('collection');
            }
          }}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-extrabold text-lg sm:text-xl px-9 py-4 sm:py-4.5 rounded-full shadow-2xl shadow-black/80 hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 uppercase tracking-wider cursor-pointer border border-amber-300/40"
        >
          <ShoppingBag className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
          <span>Shop Collection</span>
          <ArrowRight className="w-6 h-6 text-black group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
