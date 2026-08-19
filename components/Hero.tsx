'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Compass, Truck, Star } from 'lucide-react';

export default function Hero() {
  const HERO_IMAGE_URL = 'https://lh3.googleusercontent.com/d/1kRjtiHpP7MbwhkWzx2S69nE4G_WtH63Y';

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-[#0d0a08] border-b border-[#281f18]">
      {/* Background Hero Cover Image */}
      <Image
        src={HERO_IMAGE_URL}
        alt="Whiskey Europe Cellar Cover"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center scale-105"
        referrerPolicy="no-referrer"
      />

      {/* Luxury Multilayer Ambient Vignette & Warm Tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-[#0f0d0b]/70 to-[#0f0d0b]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0d0b]/80 via-transparent to-[#0f0d0b]/80 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Centered Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-7">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1510]/90 border border-amber-500/40 backdrop-blur-md shadow-lg shadow-black/50">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
            BONDED CELLARS • PRESTIGE ALLOCATIONS
          </span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-[#fbf7f2] tracking-tight leading-[1.15] drop-shadow-2xl max-w-4xl mx-auto">
          Rare Single Malts, Aged Whiskies &amp; Prestige European Cellars
        </h1>

        {/* Subheading / Value Proposition */}
        <p className="text-sm sm:text-base text-[#cfc1b2] font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
          Curated allocations of rare cask strength single malts, aged Japanese whiskies, and prestige Hennessy cognacs. Delivered in insured, climate-controlled packaging across all 27 EU member states.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/shop"
            id="hero-shop-collection-btn"
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold text-base sm:text-lg px-8 py-4 rounded-full shadow-2xl shadow-amber-950/60 hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-0.5 uppercase tracking-wider cursor-pointer border border-amber-300/50 w-full sm:w-auto"
          >
            <ShoppingBag className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
            <span>Shop Collection</span>
            <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#categories"
            id="hero-explore-categories-btn"
            className="inline-flex items-center justify-center gap-2 bg-[#1c1510]/80 hover:bg-[#281f18] text-[#f5f0ea] hover:text-amber-300 font-semibold text-sm px-6 py-4 rounded-full border border-[#3d3126] hover:border-amber-600/50 backdrop-blur-md transition-all duration-300 cursor-pointer w-full sm:w-auto"
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span>Explore by Category</span>
          </a>
        </div>

        {/* Key Trust Highlights Strip */}
        <div className="pt-6 border-t border-amber-950/40 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs text-[#b8a99a]">
          <div className="flex items-center justify-center gap-2 bg-[#140f0c]/80 border border-[#2b221a] py-2 px-3 rounded-lg backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-mono text-[11px]">100% Bonded Authenticity</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-[#140f0c]/80 border border-[#2b221a] py-2 px-3 rounded-lg backdrop-blur-sm">
            <Truck className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-mono text-[11px]">Insured 27 EU States Transit</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-[#140f0c]/80 border border-[#2b221a] py-2 px-3 rounded-lg backdrop-blur-sm">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <span className="font-mono text-[11px]">4.98/5 Trustpilot Rating</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-[#140f0c]/80 border border-[#2b221a] py-2 px-3 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-mono text-[11px]">Private Cask Allocations</span>
          </div>
        </div>

      </div>
    </section>
  );
}

