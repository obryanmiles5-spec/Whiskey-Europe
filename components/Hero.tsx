'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Compass, Truck, Star } from 'lucide-react';

export default function Hero() {
  const HERO_IMAGE_URL = 'https://lh3.googleusercontent.com/d/1kRjtiHpP7MbwhkWzx2S69nE4G_WtH63Y';

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-white border-b-2 border-black">
      {/* Background Hero Cover Image showing Original Color with Vivid Clarity */}
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

      {/* High-Contrast Subtle Backing Vignette to ensure Image Color Pops while Text is Razor Sharp */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

      {/* Centered Content Container with Direct Transparent Text over Hero Image */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-7">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/40 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest font-extrabold">
            BONDED CELLARS • PRESTIGE ALLOCATIONS
          </span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] max-w-4xl mx-auto drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
          Rare Single Malts, Aged Whiskies &amp; Prestige European Cellars
        </h1>

        {/* Subheading / Value Proposition */}
        <p className="text-base sm:text-lg text-zinc-100 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Curated allocations of rare cask strength single malts, aged Japanese whiskies, and prestige Hennessy cognacs. Delivered in insured, climate-controlled packaging across all 27 EU member states.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/shop"
            id="hero-shop-collection-btn"
            className="group inline-flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black font-black text-base px-8 py-4 rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-0.5 uppercase tracking-wider cursor-pointer border-2 border-white w-full sm:w-auto"
          >
            <ShoppingBag className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
            <span>Shop Collection</span>
            <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#categories"
            id="hero-explore-categories-btn"
            className="inline-flex items-center justify-center gap-2 bg-black/50 hover:bg-black/75 text-white font-extrabold text-sm sm:text-base px-7 py-4 rounded-full border-2 border-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer w-full sm:w-auto shadow-xl hover:border-white"
          >
            <Compass className="w-4 h-4 text-white" />
            <span>Explore by Category</span>
          </a>
        </div>

        {/* Key Trust Highlights Strip */}
        <div className="pt-8 border-t border-white/25 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs text-white">
          <div className="flex items-center justify-center gap-2 bg-black/55 backdrop-blur-md border border-white/30 py-2.5 px-3 rounded-xl shadow-lg">
            <ShieldCheck className="w-4 h-4 text-white shrink-0" />
            <span className="font-mono text-[11px] font-bold tracking-wide">100% Bonded Authenticity</span>
          </div>

          <div className="flex items-center justify-center gap-2 bg-black/55 backdrop-blur-md border border-white/30 py-2.5 px-3 rounded-xl shadow-lg">
            <Truck className="w-4 h-4 text-white shrink-0" />
            <span className="font-mono text-[11px] font-bold tracking-wide">Insured 27 EU States Transit</span>
          </div>

          <div className="flex items-center justify-center gap-2 bg-black/55 backdrop-blur-md border border-white/30 py-2.5 px-3 rounded-xl shadow-lg">
            <Star className="w-4 h-4 text-white fill-white shrink-0" />
            <span className="font-mono text-[11px] font-bold tracking-wide">4.98/5 Trustpilot Rating</span>
          </div>

          <div className="flex items-center justify-center gap-2 bg-black/55 backdrop-blur-md border border-white/30 py-2.5 px-3 rounded-xl shadow-lg">
            <Sparkles className="w-4 h-4 text-white shrink-0" />
            <span className="font-mono text-[11px] font-bold tracking-wide">Private Cask Allocations</span>
          </div>
        </div>

      </div>
    </section>
  );
}
