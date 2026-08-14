'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, X, Star, ShoppingBag, Eye, Filter } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { WHISKEY_COLLECTION, Whiskey } from '@/lib/whiskeys';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, addToCart, setQuickViewWhiskey } = useCart();
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  if (!isSearchOpen) return null;

  const filtered = WHISKEY_COLLECTION.filter((w) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      w.name.toLowerCase().includes(q) ||
      w.distillery.toLowerCase().includes(q) ||
      w.region.toLowerCase().includes(q) ||
      w.caskType.toLowerCase().includes(q) ||
      w.tastingNotes.nose.toLowerCase().includes(q) ||
      w.tastingNotes.palate.toLowerCase().includes(q);

    const matchesRegion = selectedRegion === 'All' || w.region === selectedRegion;
    const matchesType = selectedType === 'All' || w.type === selectedType;

    return matchesQuery && matchesRegion && matchesType;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-8 animate-fadeIn">
      <div className="max-w-5xl mx-auto bg-[#14100c] border border-[#2e261f] rounded-2xl p-6 sm:p-8 shadow-2xl relative text-[#f5f0ea] my-8">
        
        {/* Header Search Input */}
        <div className="flex items-center justify-between border-b border-[#29221b] pb-4 mb-6">
          <div className="flex items-center gap-3 flex-1 mr-4">
            <Search className="w-6 h-6 text-amber-500" />
            <input
              type="text"
              autoFocus
              placeholder="Search by bottle name, distillery, Islay, Sherry cask, age statement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-lg sm:text-xl text-[#f5f0ea] placeholder-[#6e6256] focus:outline-none"
            />
          </div>

          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-[#8c7e70] hover:text-amber-400 rounded-full hover:bg-[#1f1914]"
            aria-label="Close Search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Quick Controls */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#a39382] mb-6 pb-4 border-b border-[#241d17]">
          <span className="flex items-center gap-1 font-semibold text-amber-400">
            <Filter className="w-3.5 h-3.5" /> Filter Results:
          </span>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-[#100d0a] border border-[#332920] rounded px-3 py-1.5 text-[#f5f0ea] focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Regions</option>
            <option value="Islay">Islay (Scotland)</option>
            <option value="Speyside">Speyside (Scotland)</option>
            <option value="County Cork">County Cork (Ireland)</option>
            <option value="County Antrim">County Antrim (Ireland)</option>
            <option value="Gävleborg">Sweden (Nordic Craft)</option>
            <option value="Brittany">Brittany (France)</option>
            <option value="Bavaria">Bavaria (Germany)</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#100d0a] border border-[#332920] rounded px-3 py-1.5 text-[#f5f0ea] focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Spirits Types</option>
            <option value="Single Malt">Single Malt</option>
            <option value="Rare Allocation">Rare Allocation</option>
            <option value="Irish Pot Still">Irish Pot Still</option>
            <option value="European Craft">European Craft</option>
            <option value="Cask Strength">Cask Strength</option>
          </select>

          <span className="ml-auto font-mono text-[#8c7e70]">
            Found {filtered.length} Bottles
          </span>
        </div>

        {/* Search Results Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <Search className="w-12 h-12 text-[#6e6256] mx-auto" />
            <h3 className="font-serif font-bold text-lg text-[#f5f0ea]">No Bottlings Found</h3>
            <p className="text-xs text-[#a39382]">
              Try searching for &quot;Bowmore&quot;, &quot;Macallan&quot;, &quot;Sherry&quot;, &quot;Peated&quot;, or &quot;Ireland&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
            {filtered.map((w) => (
              <div
                key={w.id}
                className="bg-[#18130f] border border-[#2b221a] hover:border-amber-600/60 p-3 rounded-xl flex gap-3 relative group transition-all"
              >
                <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-[#100d0a] shrink-0">
                  <Image
                    src={w.image}
                    alt={w.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-amber-400 font-mono">
                      {w.region} • {w.age} Yrs
                    </span>
                    <h4
                      onClick={() => {
                        setIsSearchOpen(false);
                        setQuickViewWhiskey(w);
                      }}
                      className="font-serif font-bold text-sm text-[#f8f3ed] group-hover:text-amber-400 cursor-pointer line-clamp-1"
                    >
                      {w.name}
                    </h4>
                    <p className="text-[11px] text-[#8c7e70] truncate">{w.distillery}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-serif font-bold text-amber-400 text-sm">
                      €{w.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(w, 1);
                        setIsSearchOpen(false);
                      }}
                      className="bg-amber-600 hover:bg-amber-500 text-black font-bold text-[11px] px-2.5 py-1 rounded"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
