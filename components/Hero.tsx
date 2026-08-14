'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Sparkles, MapPin, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Hero() {
  const { setIsCartOpen } = useCart();

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#0f0d0b] overflow-hidden pt-8 pb-16 lg:py-24 border-b border-[#241d17]">
      {/* Background Atmosphere & Decorative Gradients */}
      <div className="absolute inset-0 bg-radial from-amber-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1813] border border-amber-900/50 text-amber-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>EU Bonded Boutique • 27 Member States Direct Delivery</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f8f3ed] leading-[1.15]">
              Curated European Whiskeys & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-600">Rare Single Malts</span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-[#c2b2a3] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Direct allocation from iconic Islay, Speyside, Irish, and European craft distilleries. Express insured climate-controlled shipping with strict age verification compliance across all EU countries.
            </p>

            {/* Key Trust Signals Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#a39382] max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 bg-[#171310] p-2.5 rounded-md border border-[#2b221a]">
                <Shield className="w-4 h-4 text-amber-500 shrink-0" />
                <span>100% Authentic Rare Bottles</span>
              </div>
              <div className="flex items-center gap-2 bg-[#171310] p-2.5 rounded-md border border-[#2b221a]">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Distillery Provenance Verified</span>
              </div>
              <div className="flex items-center gap-2 bg-[#171310] p-2.5 rounded-md border border-[#2b221a] col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Cask Club Rewards Points</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => handleScrollToSection('collection')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold text-base px-7 py-3.5 rounded-md shadow-xl hover:shadow-amber-900/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Explore Rare Allocations</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleScrollToSection('distillery-map')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1b1612] hover:bg-[#261f1a] text-[#f5f0ea] border border-[#3b3026] hover:border-amber-600/60 font-medium text-base px-6 py-3.5 rounded-md transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Interactive Distillery Map</span>
              </button>
            </div>

            {/* Trustpilot & Rating Quick Badge */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-[#8c7e70]">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <span>★★★★★</span>
                <span className="text-[#e6ded5] ml-1">4.98 / 5.0</span>
              </div>
              <span>•</span>
              <span>Over 2,840 verified EU whiskey lovers</span>
            </div>

          </div>

          {/* Right Visual Feature Card / Hero Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Amber Glass Frame */}
              <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-b from-amber-900/40 via-amber-950/20 to-[#171310] border border-amber-800/40 shadow-2xl relative">
                
                {/* Floating Rare Badge */}
                <div className="absolute -top-4 -left-4 z-20 bg-amber-500 text-black font-extrabold text-xs uppercase px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>2026 Cask Allocation</span>
                </div>

                {/* Hero Bottle Image */}
                <div className="relative h-[380px] sm:h-[440px] w-full rounded-xl overflow-hidden bg-[#15110e]">
                  <Image
                    src="https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=1000"
                    alt="Rare European Single Malt Whiskey"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-transparent to-transparent opacity-80" />
                  
                  {/* Overlay Bottle Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#14100c]/90 backdrop-blur-md border border-amber-900/40">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider">Islay • Scotland</span>
                        <h3 className="font-serif font-bold text-lg text-white">Bowmore 25 Year Old Sherry Cask</h3>
                        <p className="text-xs text-[#b8a99a] mt-0.5">43% ABV • First-fill Oloroso Sherry Butt</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-amber-400">€495.00</span>
                        <span className="block text-[10px] text-emerald-400 flex items-center justify-end gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> In Stock (4 Left)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
