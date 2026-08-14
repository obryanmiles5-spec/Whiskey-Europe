'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Eye, Star, Flame, Shield, Award, CheckCircle2 } from 'lucide-react';
import { WHISKEY_COLLECTION, Whiskey } from '@/lib/whiskeys';
import { useCart } from '@/lib/cart-context';

type FilterTab = 'All' | 'Rare Allocations' | 'Islay Peated' | 'Sherry Cask' | 'Irish & European' | 'Under €200';

export default function FeaturedProducts() {
  const { addToCart, setQuickViewWhiskey } = useCart();
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const displayedWhiskeys = WHISKEY_COLLECTION.filter((whiskey) => {
    if (activeTab === 'Rare Allocations') return whiskey.isRare;
    if (activeTab === 'Islay Peated') return whiskey.region === 'Islay' || whiskey.flavorProfile.peatedSmoky >= 5;
    if (activeTab === 'Sherry Cask') return whiskey.caskType.toLowerCase().includes('sherry');
    if (activeTab === 'Irish & European') return whiskey.country !== 'Scotland';
    if (activeTab === 'Under €200') return whiskey.price <= 200;
    return true;
  }).slice(0, 4);

  const handleAddToCart = (whiskey: Whiskey) => {
    addToCart(whiskey, 1);
    setAddedAnimationId(whiskey.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1500);
  };

  return (
    <section className="py-16 bg-[#0f0d0b] border-b border-[#241d17]" id="collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1612] border border-amber-900/50 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>EXCLUSIVELY CURATED FOR EUROPE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f8f3ed]">
            Featured Single Malts & Rare Bottlings
          </h2>
          <p className="text-sm sm:text-base text-[#b0a090] font-light">
            Every bottle is stored in temperature-controlled bonded facilities, dispatched in custom insulated timber packaging with full EU transit insurance.
          </p>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-10 border-b border-[#241d17]">
          {(['All', 'Rare Allocations', 'Islay Peated', 'Sherry Cask', 'Irish & European', 'Under €200'] as FilterTab[]).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'bg-amber-600 text-black font-bold shadow-md shadow-amber-900/30'
                    : 'bg-[#171310] text-[#c2b2a3] hover:text-amber-400 hover:bg-[#221c17] border border-[#2b221a]'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedWhiskeys.map((whiskey) => (
            <div
              key={whiskey.id}
              className="bg-[#14100c] border border-[#29221b] hover:border-amber-600/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group relative"
            >
              {/* Top Image Container */}
              <div className="relative h-64 sm:h-72 w-full bg-[#18130f] overflow-hidden">
                <Image
                  src={whiskey.image}
                  alt={whiskey.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100c] via-transparent to-transparent opacity-90" />

                {/* Badge overlay */}
                {whiskey.badge && (
                  <div className="absolute top-3 left-3 bg-amber-500/90 text-black font-bold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded shadow-md backdrop-blur-sm">
                    {whiskey.badge}
                  </div>
                )}

                {/* Quick View Button */}
                <button
                  onClick={() => setQuickViewWhiskey(whiskey)}
                  className="absolute top-3 right-3 bg-[#0f0d0b]/80 hover:bg-amber-600 text-white hover:text-black p-2 rounded-full shadow-md backdrop-blur-sm transition-all opacity-90 hover:opacity-100"
                  title="Quick View Tasting Notes"
                  aria-label={`Quick View ${whiskey.name}`}
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Region & Origin Tag */}
                <div className="absolute bottom-3 left-3 text-[11px] text-amber-400 font-mono flex items-center gap-1.5 bg-[#0f0d0b]/90 px-2.5 py-1 rounded border border-amber-900/30">
                  <span>{whiskey.region}, {whiskey.country}</span>
                  <span>•</span>
                  <span>{whiskey.age} Yrs</span>
                  <span>•</span>
                  <span>{whiskey.abv}% ABV</span>
                </div>
              </div>

              {/* Product Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  {/* Rating & Reviews */}
                  <div className="flex items-center justify-between text-xs text-[#a39382]">
                    <span className="text-amber-500 font-medium">{whiskey.distillery}</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{whiskey.rating}</span>
                      <span className="text-[#786c60]">({whiskey.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setQuickViewWhiskey(whiskey)}
                    className="font-serif font-bold text-lg text-[#f8f3ed] group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-2"
                  >
                    {whiskey.name}
                  </h3>

                  {/* Cask Type */}
                  <p className="text-xs text-[#a8998a] font-light line-clamp-1 italic">
                    Cask: {whiskey.caskType}
                  </p>

                  {/* Quick Tasting Notes Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="bg-[#1e1914] text-[#c4b6a7] text-[10px] px-2 py-0.5 rounded border border-[#332920]">
                      Nose: {whiskey.tastingNotes.nose.split(',')[0]}
                    </span>
                    <span className="bg-[#1e1914] text-[#c4b6a7] text-[10px] px-2 py-0.5 rounded border border-[#332920]">
                      Finish: {whiskey.tastingNotes.finish.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Price & Add to Cart Footer */}
                <div className="pt-3 border-t border-[#261f18] flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-xl font-bold text-amber-400">
                        €{whiskey.price.toFixed(2)}
                      </span>
                      {whiskey.originalPrice && (
                        <span className="text-xs text-[#786c60] line-through">
                          €{whiskey.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8c7e70]">Incl. EU VAT & Duties</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(whiskey)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md font-semibold text-xs transition-all cursor-pointer ${
                      addedAnimationId === whiskey.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 hover:bg-amber-500 text-black shadow-md hover:shadow-amber-900/40'
                    }`}
                  >
                    {addedAnimationId === whiskey.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
