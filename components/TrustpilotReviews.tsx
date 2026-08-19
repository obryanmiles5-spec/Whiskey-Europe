'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle, Award } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  country: string;
  flag: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  boughtBottle: string;
}

const REVIEWS: Review[] = [
  {
    id: 'r-1',
    author: 'Hans-Peter Weber',
    country: 'Germany',
    flag: '🇩🇪',
    rating: 5,
    date: '3 days ago',
    title: 'Flawless Munich delivery & verified vintage Bowmore!',
    comment: 'Ordered the 25yo Bowmore Oloroso Cask for my 50th birthday. It arrived in Munich within 48 hours in a insulated wood crate with temperature seal. Authentic bottle, perfect seal!',
    boughtBottle: 'Bowmore 25 Year Old Oloroso Cask'
  },
  {
    id: 'r-2',
    author: 'Camille Laurent',
    country: 'France',
    flag: '🇫🇷',
    rating: 5,
    date: '1 week ago',
    title: 'Une sélection exceptionnelle et expédition rapide!',
    comment: 'Finding rare Irish pot still whiskies in Paris can be tough. Whiskey Europe handled all VAT and duty clearance seamlessly. The Redbreast 21 tasting notes were spot on.',
    boughtBottle: 'Redbreast 21 Year Old Single Pot Still'
  },
  {
    id: 'r-3',
    author: 'Sven Lindqvist',
    country: 'Sweden',
    flag: '🇸🇪',
    rating: 5,
    date: '2 weeks ago',
    title: 'Pristine condition for high-end collector bottles',
    comment: 'As a whisky investor in Stockholm, packaging is paramount. Zero label damage, padded wooden casket, and GPS transit tracker. Will order the Slyrs Cask Strength next.',
    boughtBottle: 'The Macallan 18 Year Old Sherry Oak'
  },
  {
    id: 'r-4',
    author: 'Liam O’Connor',
    country: 'Ireland',
    flag: '🇮🇪',
    rating: 5,
    date: '2 weeks ago',
    title: 'First-class Cask Club loyalty benefits',
    comment: 'Redeemed my 1,500 Cask Points for a €25 voucher on the Bushmills Madeira Finish. Fast Dublin dispatch and helpful sommelier support via email!',
    boughtBottle: 'Bushmills 21 Year Old Madeira Cask'
  }
];

export default function TrustpilotReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="py-16 bg-[#120e0b] border-b border-[#261f18]" id="reviews">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
        
        {/* Section Header with TrustScore Badge */}
        <div className="bg-[#18130f] border border-amber-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center shrink-0">
              <Star className="w-8 h-8 text-emerald-400 fill-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold text-white">Trustpilot</span>
                <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 text-xs px-2 py-0.5 rounded font-mono font-bold">
                  EXCELLENT
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-emerald-400 text-sm">★★★★★</div>
                <span className="text-sm font-bold text-[#f5f0ea]">4.98 / 5.0</span>
                <span className="text-xs text-[#8c7e70]">(2,840 Verified EU Connoisseurs)</span>
              </div>
            </div>
          </div>

          {/* Right Trust Stats */}
          <div className="flex items-center gap-6 text-xs text-[#b8a99a] border-t md:border-t-0 md:border-l border-[#2e261f] pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-around">
            <div className="text-center md:text-left">
              <span className="block font-serif text-lg font-bold text-amber-400">27 Countries</span>
              <span>EU Duty Free Transit</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block font-serif text-lg font-bold text-amber-400">100% Insured</span>
              <span>Climate Courier</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block font-serif text-lg font-bold text-amber-400">Age Verified</span>
              <span>Strict 18+ Protocol</span>
            </div>
          </div>

        </div>

        {/* Carousel Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-amber-500 font-mono text-xs uppercase tracking-widest">VERIFIED BUYER FEEDBACK</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f5f0ea]">What European Connoisseurs Say</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevReview}
              className="p-2 rounded-full bg-[#1b1612] hover:bg-amber-600 hover:text-black text-[#c2b2a3] border border-[#2e261f] transition-all"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="p-2 rounded-full bg-[#1b1612] hover:bg-amber-600 hover:text-black text-[#c2b2a3] border border-[#2e261f] transition-all"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={review.id}
              className={`bg-[#171310] border border-[#2b221a] p-5 rounded-xl shadow-lg flex flex-col justify-between space-y-4 transition-all duration-300 ${
                idx === currentIndex ? 'ring-2 ring-amber-500/50 bg-[#1c1713]' : ''
              }`}
            >
              <div className="space-y-3">
                
                {/* Author & Flag Header */}
                <div className="flex items-center justify-between border-b border-[#261f18] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{review.flag}</span>
                    <div>
                      <h4 className="font-semibold text-sm text-[#f5f0ea] flex items-center gap-1">
                        <span>{review.author}</span>
                        <span title="Verified Buyer">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 inline" />
                        </span>
                      </h4>
                      <span className="text-[10px] text-[#8c7e70]">{review.country} • {review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-emerald-400 text-xs">
                  {'★'.repeat(review.rating)}
                </div>

                {/* Review Title & Comment */}
                <h5 className="font-serif font-bold text-sm text-amber-300 line-clamp-1">{review.title}</h5>
                <p className="text-xs text-[#b0a090] leading-relaxed font-light line-clamp-4">
                  “{review.comment}”
                </p>

              </div>

              {/* Bought Bottle Footer */}
              <div className="pt-3 border-t border-[#261f18] text-[11px] text-[#8c7e70] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">Verified Order: <strong className="text-[#c4b6a7]">{review.boughtBottle}</strong></span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
