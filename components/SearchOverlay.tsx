'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Filter, Wine } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { WHISKEY_COLLECTION } from '@/lib/whiskeys';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, addToCart } = useCart();
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-4 sm:p-8 animate-fadeIn">
      <div className="max-w-5xl mx-auto bg-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative text-black my-8">
        
        {/* Header Search Input */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
          <div className="flex items-center gap-3 flex-1 mr-4">
            <Search className="w-6 h-6 text-black" />
            <input
              type="text"
              autoFocus
              placeholder="Search by bottle name, distillery, Islay, Sherry cask, age statement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-lg sm:text-xl text-black font-bold placeholder-zinc-400 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-black hover:bg-zinc-100 rounded-full cursor-pointer"
            aria-label="Close Search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Quick Controls */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-700 mb-6 pb-4 border-b border-zinc-200">
          <span className="flex items-center gap-1 font-bold text-black uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" /> Filter Results:
          </span>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-zinc-50 border-2 border-black rounded px-3 py-1.5 text-black font-semibold focus:outline-none"
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
            className="bg-zinc-50 border-2 border-black rounded px-3 py-1.5 text-black font-semibold focus:outline-none"
          >
            <option value="All">All Spirits Types</option>
            <option value="Single Malt">Single Malt</option>
            <option value="Rare Allocation">Rare Allocation</option>
            <option value="Irish Pot Still">Irish Pot Still</option>
            <option value="European Craft">European Craft</option>
            <option value="Cask Strength">Cask Strength</option>
          </select>

          <span className="ml-auto font-mono font-bold text-black">
            Found {filtered.length} Bottles
          </span>
        </div>

        {/* Search Results Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <Search className="w-12 h-12 text-zinc-400 mx-auto" />
            <h3 className="font-serif font-black text-lg text-black">No Bottlings Found</h3>
            <p className="text-xs text-zinc-600 font-medium">
              Try searching for &quot;Bowmore&quot;, &quot;Macallan&quot;, &quot;Sherry&quot;, &quot;Peated&quot;, or &quot;Ireland&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
            {filtered.map((w) => (
              <div
                key={w.id}
                className="bg-white border-2 border-black hover:border-black p-3 rounded-xl flex gap-3 relative group transition-all shadow-xs hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-zinc-100 shrink-0 border border-zinc-300">
                  {w.image ? (
                    <Image
                      src={w.image}
                      alt={w.name}
                      fill
                      unoptimized
                      sizes="80px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-black p-1">
                      <Wine className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-600 font-mono font-bold">
                      {w.region} • {w.age} Yrs
                    </span>
                    <Link
                      href={`/shop/${w.slug || w.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="font-serif font-bold text-sm text-black hover:underline cursor-pointer line-clamp-1 block"
                    >
                      {w.name}
                    </Link>
                    <p className="text-[11px] text-zinc-500 font-medium truncate">{w.distillery}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-serif font-black text-black text-sm">
                      €{w.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(w, 1);
                        setIsSearchOpen(false);
                      }}
                      className="bg-black hover:bg-zinc-800 text-white font-black text-[11px] px-3 py-1 rounded uppercase tracking-wider cursor-pointer border border-black"
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
