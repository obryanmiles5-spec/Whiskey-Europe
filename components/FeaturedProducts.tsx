'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, Star, Flame, Shield, Award, CheckCircle2, Wine, ArrowRight } from 'lucide-react';
import { WHISKEY_COLLECTION, Whiskey } from '@/lib/whiskeys';
import { useCart } from '@/lib/cart-context';

type FilterTab = 'All' | 'Balvenie Casks' | 'Rare Allocations' | 'Sherry Cask' | 'Vintage & Single Cask' | 'Tun Series';

export default function FeaturedProducts() {
  const { addToCart, setQuickViewWhiskey } = useCart();
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const displayedWhiskeys = WHISKEY_COLLECTION.filter((whiskey) => {
    if (activeTab === 'Balvenie Casks') return whiskey.category === 'Balvenie' || whiskey.name.toLowerCase().includes('balvenie');
    if (activeTab === 'Rare Allocations') return whiskey.isRare || whiskey.age >= 30;
    if (activeTab === 'Sherry Cask') return whiskey.caskType.toLowerCase().includes('sherry') || whiskey.name.toLowerCase().includes('sherry');
    if (activeTab === 'Vintage & Single Cask') return whiskey.type.toLowerCase().includes('vintage') || whiskey.type.toLowerCase().includes('single') || whiskey.name.toLowerCase().includes('cask');
    if (activeTab === 'Tun Series') return whiskey.name.toLowerCase().includes('tun');
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
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
        
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
          {(['All', 'Balvenie Casks', 'Rare Allocations', 'Sherry Cask', 'Vintage & Single Cask', 'Tun Series'] as FilterTab[]).map(
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

        {/* Product Cards Grid - Exactly 4 Products */}
        {displayedWhiskeys.length === 0 ? (
          <div className="text-center py-16 bg-[#16110d] border border-[#2e241b] rounded-2xl p-8 space-y-3 max-w-xl mx-auto shadow-xl">
            <p className="font-serif font-bold text-lg text-[#f8f3ed]">No Products Found</p>
            <p className="text-xs text-[#a39382]">
              All items for this filter are currently reserved. Explore all cellar allocations below.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedWhiskeys.map((whiskey) => (
            <div
              key={whiskey.id}
              className="bg-gradient-to-b from-[#1c1611] to-[#140f0c] border border-[#31271e] hover:border-amber-500/70 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group relative"
            >
              {/* Top Image Container */}
              <div className="relative h-64 sm:h-72 w-full bg-[#100d0a] overflow-hidden border-b border-[#281f18]">
                {whiskey.image && !imageErrors[whiskey.id] ? (
                  <Image
                    src={whiskey.image}
                    alt={whiskey.name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={() => setImageErrors((prev) => ({ ...prev, [whiskey.id]: true }))}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#221a14] via-[#17120e] to-[#0d0a08] p-4 text-center border border-[#2d241c]">
                    <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 text-amber-500">
                      <Wine className="w-7 h-7" />
                    </div>
                    <span className="font-serif font-bold text-amber-200/90 text-sm tracking-wider uppercase">
                      {whiskey.distillery}
                    </span>
                    <span className="text-[11px] text-[#a39382] font-mono mt-1">
                      {whiskey.age > 0 ? `${whiskey.age} Year Old` : 'Prestige Release'} • {whiskey.volumeMl}ml
                    </span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Badge overlay */}
                {whiskey.badge && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-amber-700 text-black font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-md backdrop-blur-sm">
                    {whiskey.badge}
                  </div>
                )}

                {/* Quick View Button */}
                <button
                  onClick={() => setQuickViewWhiskey(whiskey)}
                  className="absolute top-3 right-3 bg-[#0f0d0b]/80 hover:bg-amber-600 text-white hover:text-black p-2 rounded-full shadow-md backdrop-blur-sm transition-all opacity-90 hover:opacity-100 cursor-pointer"
                  title="Quick View Tasting Notes"
                  aria-label={`Quick View ${whiskey.name}`}
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Region & Origin Tag */}
                <div className="absolute bottom-3 left-3 text-[11px] text-amber-400 font-mono flex items-center gap-1.5 bg-[#0f0d0b]/90 px-2.5 py-1 rounded-lg border border-amber-900/40">
                  <span>{whiskey.region}</span>
                  <span>•</span>
                  <span>{whiskey.age > 0 ? `${whiskey.age}Y` : 'Rare'}</span>
                  <span>•</span>
                  <span>{whiskey.abv}%</span>
                </div>
              </div>

              {/* Product Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  {/* Rating & Reviews */}
                  <div className="flex items-center justify-between text-xs text-[#a39382]">
                    <span className="text-amber-500 font-mono font-medium">{whiskey.distillery}</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{whiskey.rating}</span>
                      <span className="text-[#786c60]">({whiskey.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setQuickViewWhiskey(whiskey)}
                    className="font-serif font-bold text-base text-[#f8f3ed] group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-2"
                  >
                    {whiskey.name}
                  </h3>

                  {/* Cask Type */}
                  <p className="text-xs text-[#a8998a] font-light line-clamp-1 italic">
                    Cask: {whiskey.caskType}
                  </p>

                  {/* Quick Tasting Notes Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="bg-[#221a14] text-[#c4b6a7] text-[10px] px-2 py-0.5 rounded border border-[#382d23]">
                      Nose: {whiskey.tastingNotes.nose.split(',')[0]}
                    </span>
                    <span className="bg-[#221a14] text-[#c4b6a7] text-[10px] px-2 py-0.5 rounded border border-[#382d23]">
                      Finish: {whiskey.tastingNotes.finish.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Price & Add to Cart Footer */}
                <div className="pt-3 border-t border-[#281f18] flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-xl font-bold text-amber-400">
                        €{whiskey.price.toFixed(2)}
                      </span>
                      {whiskey.originalPrice && (
                        <span className="text-xs text-[#786c60] line-through font-mono">
                          €{whiskey.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8c7e70]">Incl. EU VAT &amp; Duties</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(whiskey)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md ${
                      addedAnimationId === whiskey.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black'
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
      )}

      {/* Shop All Bottles CTA Footer */}
      <div className="mt-12 text-center pt-8 border-t border-[#261f18]">
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-xl hover:shadow-amber-900/30 transition-all transform hover:-translate-y-0.5"
        >
          <ShoppingBag className="w-5 h-5 text-black" />
          <span>Shop Full Cellar Collection</span>
          <ArrowRight className="w-5 h-5 text-black" />
        </Link>
      </div>

      </div>
    </section>
  );
}
