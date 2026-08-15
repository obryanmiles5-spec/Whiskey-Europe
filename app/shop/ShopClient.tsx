'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { WHISKEY_COLLECTION, Whiskey } from '@/lib/whiskeys';
import { useCart } from '@/lib/cart-context';
import { Star, Eye, ShoppingBag, Filter, Sparkles, CheckCircle2, SlidersHorizontal, ArrowUpDown, Wine, RotateCcw } from 'lucide-react';

export default function ShopClient() {
  const { addToCart, setQuickViewWhiskey } = useCart();
  const categories = [
    'All',
    'Balvenie',
    'Scottish Whiskey',
    'Japanese',
    'Hennessy',
    'Macallan',
    'Old and Rare',
    'Port Ellen',
    'Bourbon',
    "Ballantine's",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        const matched = categories.find(
          (c) => c.toLowerCase() === catParam.toLowerCase().trim() ||
                 (catParam.toLowerCase().includes('balvenie') && c === 'Balvenie')
        );
        if (matched) return matched;
      }
    }
    return 'Balvenie';
  });

  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(60000);
  const [minAge, setMinAge] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'age'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedBottleId, setAddedBottleId] = useState<string | null>(null);

  const regions = [
    'All',
    'Speyside',
    'Highlands',
    'Islay',
    'Kyoto / Japan',
    'Cognac',
    'Kentucky',
    'County Cork',
  ];

  const getCategoryProductCount = (cat: string) => {
    if (cat === 'All') return WHISKEY_COLLECTION.length;
    return WHISKEY_COLLECTION.filter((w) => {
      if (cat === 'Balvenie') return w.category === 'Balvenie' || w.distillery.toLowerCase().includes('balvenie') || w.name.toLowerCase().includes('balvenie');
      if (cat === 'Japanese') return w.category === 'Japanese' || w.country === 'Japan';
      if (cat === 'Hennessy') return w.category === 'Hennessy' || w.distillery.toLowerCase().includes('hennessy');
      if (cat === 'Macallan') return w.category === 'Macallan' || w.distillery.toLowerCase().includes('macallan');
      if (cat === 'Old and Rare') return w.category === 'Old and Rare' || w.isRare || w.age >= 21;
      if (cat === 'Port Ellen') return w.category === 'Port Ellen' || w.distillery.toLowerCase().includes('port ellen');
      if (cat === 'Bourbon') return w.category === 'Bourbon' || w.type.toLowerCase().includes('bourbon');
      if (cat === "Ballantine's") return w.category === 'Ballantines' || w.category === "Ballantine's" || w.distillery.toLowerCase().includes('ballantine');
      if (cat === 'Scottish Whiskey') return w.category === 'Scottish Whiskey' || w.country === 'Scotland';
      return false;
    }).length;
  };

  const filteredBottles = useMemo(() => {
    return WHISKEY_COLLECTION.filter((w) => {
      let matchesCategory = false;
      if (selectedCategory === 'All') {
        matchesCategory = true;
      } else if (selectedCategory === 'Japanese') {
        matchesCategory = w.category === 'Japanese' || w.country === 'Japan' || w.name.toLowerCase().includes('japanese') || w.type.toLowerCase().includes('japanese');
      } else if (selectedCategory === 'Balvenie' || selectedCategory === 'Balvenie Casks') {
        matchesCategory = w.category === 'Balvenie' || w.distillery.toLowerCase().includes('balvenie') || w.name.toLowerCase().includes('balvenie');
      } else if (selectedCategory === 'Hennessy') {
        matchesCategory = w.category === 'Hennessy' || w.distillery.toLowerCase().includes('hennessy') || w.name.toLowerCase().includes('hennessy');
      } else if (selectedCategory === 'Macallan') {
        matchesCategory = w.category === 'Macallan' || w.distillery.toLowerCase().includes('macallan') || w.name.toLowerCase().includes('macallan');
      } else if (selectedCategory === 'Old and Rare') {
        matchesCategory = w.category === 'Old and Rare' || w.isRare || w.age >= 21;
      } else if (selectedCategory === 'Port Ellen') {
        matchesCategory = w.category === 'Port Ellen' || w.distillery.toLowerCase().includes('port ellen') || w.name.toLowerCase().includes('port ellen');
      } else if (selectedCategory === 'Bourbon') {
        matchesCategory = w.category === 'Bourbon' || w.type.toLowerCase().includes('bourbon') || w.country === 'United States';
      } else if (selectedCategory === "Ballantine's" || selectedCategory === "Ballantines") {
        matchesCategory = w.category === 'Ballantines' || w.distillery.toLowerCase().includes('ballantine') || w.name.toLowerCase().includes('ballantine');
      } else if (selectedCategory === 'Scottish Whiskey' || selectedCategory === 'Scottish') {
        matchesCategory = w.category === 'Scottish Whiskey' || w.country === 'Scotland' || w.type.toLowerCase().includes('scotch') || w.name.toLowerCase().includes('scotch') || w.name.toLowerCase().includes('scottish') || w.category === 'Balvenie';
      }

      const matchesRegion =
        selectedRegion === 'All' ||
        w.region.toLowerCase().includes(selectedRegion.toLowerCase().split(' ')[0]);

      const matchesPrice = w.price <= maxPrice;
      const matchesAge = w.age >= minAge;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.distillery.toLowerCase().includes(q) ||
        w.caskType.toLowerCase().includes(q) ||
        w.tastingNotes.nose.toLowerCase().includes(q) ||
        w.tastingNotes.palate.toLowerCase().includes(q);

      return matchesCategory && matchesRegion && matchesPrice && matchesAge && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'age') return b.age - a.age;
      return 0; // featured default
    });
  }, [selectedCategory, selectedRegion, maxPrice, minAge, sortBy, searchQuery]);

  const handleAddToCart = (bottle: Whiskey, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(bottle, 1);
    setAddedBottleId(bottle.id);
    setTimeout(() => {
      setAddedBottleId(null);
    }, 1200);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-amber-500 font-mono text-xs uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
          EUROPEAN BONDED CELLARS CATALOG
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#f8f3ed]">
          The Whiskey Cellar
        </h1>
        <p className="text-xs sm:text-sm text-[#b8a99a] leading-relaxed font-light">
          Browse our sommelier-verified collection of rare single malts, collectible cask allocations, and artisanal craft whiskies. Climate-controlled delivery across all 27 EU member states.
        </p>
      </div>

      {/* Filter & Search Bar Toolbar */}
      <div className="bg-[#14100c] border border-[#2b221a] p-4 sm:p-6 rounded-2xl shadow-xl space-y-4">
        
        {/* Top Search & Category Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => {
              const count = getCategoryProductCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-amber-600 text-black shadow-md font-bold'
                      : 'bg-[#1a1511] text-[#a39382] hover:text-[#f5f0ea] hover:bg-[#261f18] border border-[#2b221a]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    selectedCategory === cat ? 'bg-black/20 text-black' : 'bg-[#0d0b09] text-[#7a6d5f]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Reset */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="w-full md:w-72 relative">
              <input
                type="text"
                placeholder="Search Balvenie, age, cask, tasting notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d0b09] border border-[#332920] rounded-lg px-3.5 py-2 text-xs text-[#f5f0ea] placeholder-[#6e6256] focus:outline-none focus:border-amber-500"
              />
            </div>
            {(selectedCategory !== 'Balvenie' || selectedRegion !== 'All' || maxPrice < 60000 || minAge > 0 || searchQuery || sortBy !== 'featured') && (
              <button
                onClick={() => {
                  setSelectedCategory('Balvenie');
                  setSelectedRegion('All');
                  setMaxPrice(60000);
                  setMinAge(0);
                  setSearchQuery('');
                  setSortBy('featured');
                }}
                className="px-3 py-2 bg-[#1c1611] hover:bg-[#2a221a] border border-[#382c21] text-amber-400 text-xs rounded-lg flex items-center gap-1 shrink-0 transition-colors"
                title="Reset Filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>

        </div>

        {/* Detailed Filters & Sort Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#231c16] text-xs text-[#a39382]">
          
          {/* Region Select */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-[#f5f0ea]">Origin Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-[#0d0b09] border border-[#332920] rounded-lg p-2 text-[#f5f0ea] focus:outline-none focus:border-amber-500"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r === 'All' ? 'All European Regions' : r}</option>
              ))}
            </select>
          </div>

          {/* Min Age Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="font-semibold text-[#f5f0ea]">Minimum Aging</span>
              <span className="text-amber-400 font-mono font-bold">{minAge > 0 ? `${minAge}+ Years` : 'Any Age'}</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={minAge}
              onChange={(e) => setMinAge(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer bg-[#0d0b09]"
            />
          </div>

          {/* Max Price Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="font-semibold text-[#f5f0ea]">Max Price (€)</span>
              <span className="text-amber-400 font-mono font-bold">
                {maxPrice >= 60000 ? '€60,000+ (All)' : `€${maxPrice.toLocaleString()}`}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={60000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer bg-[#0d0b09]"
            />
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-[#f5f0ea] flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-amber-500" /> Sort Bottles
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-[#0d0b09] border border-[#332920] rounded-lg p-2 text-[#f5f0ea] focus:outline-none focus:border-amber-500"
            >
              <option value="featured">Featured Sommelier Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Sommelier Rating</option>
              <option value="age">Age Statement</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-xs text-[#8c7e70] px-1 font-mono">
        <span>Showing {filteredBottles.length} of {WHISKEY_COLLECTION.length} Cellar Allocations</span>
        {(selectedCategory !== 'All' || selectedRegion !== 'All' || minAge > 0 || maxPrice < 500 || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedRegion('All');
              setMinAge(0);
              setMaxPrice(500);
              setSearchQuery('');
            }}
            className="text-amber-400 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredBottles.length === 0 ? (
        <div className="text-center py-20 bg-[#14100c] border border-[#2b221a] rounded-2xl space-y-4">
          <SlidersHorizontal className="w-12 h-12 text-[#6e6256] mx-auto" />
          <h3 className="font-serif font-bold text-xl text-[#f5f0ea]">The shop is currently empty</h3>
          <p className="text-xs text-[#a39382] max-w-md mx-auto leading-relaxed">
            All products have been cleared from the shop catalog.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBottles.map((whiskey) => {
            const isAdded = addedBottleId === whiskey.id;

            return (
              <div
                key={whiskey.id}
                className="bg-[#14100c] border border-[#282019] hover:border-amber-600/70 rounded-xl p-4 flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/20 relative"
              >
                {/* Badge */}
                {whiskey.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-600 to-amber-700 text-black font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-lg">
                    {whiskey.badge}
                  </span>
                )}

                {/* Bottle Image with Quick View Hover Overlay */}
                <div className="relative h-64 w-full rounded-lg overflow-hidden bg-[#100d0a] mb-4 group-hover:scale-[1.02] transition-transform">
                  {whiskey.image ? (
                    <Image
                      src={whiskey.image}
                      alt={whiskey.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#1e1813] via-[#14100d] to-[#0a0806] p-4 text-center border border-[#2d241c]">
                      <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 text-amber-500">
                        <Wine className="w-7 h-7" />
                      </div>
                      <span className="font-serif font-bold text-amber-200/90 text-sm tracking-wider uppercase">
                        {whiskey.distillery}
                      </span>
                      <span className="text-[11px] text-[#a39382] font-mono mt-1">
                        {whiskey.age > 0 ? `${whiskey.age} Year Old` : 'Speyside Malt'} • {whiskey.volumeMl}ml
                      </span>
                    </div>
                  )}

                  {/* Quick View Button */}
                  <button
                    onClick={() => setQuickViewWhiskey(whiskey)}
                    className="absolute inset-x-4 bottom-4 bg-[#0f0d0b]/90 hover:bg-amber-600 hover:text-black text-[#f5f0ea] font-bold text-xs py-2 rounded-lg border border-[#382d24] flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-xl"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Quick View Notes</span>
                  </button>
                </div>

                {/* Content Specs */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-amber-500 font-mono mb-1">
                      <span>{whiskey.distillery}</span>
                      <span>{whiskey.region}</span>
                    </div>

                    <h3
                      onClick={() => setQuickViewWhiskey(whiskey)}
                      className="font-serif font-bold text-base text-[#f8f3ed] group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {whiskey.name}
                    </h3>

                    {/* Sommelier Rating */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{whiskey.rating}</span>
                      <span className="text-[10px] text-[#8c7e70]">({whiskey.reviewsCount} EU Reviews)</span>
                    </div>

                    {/* Key Specs */}
                    <p className="text-[11px] text-[#a39382] mt-2 line-clamp-2 font-light">
                      {whiskey.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-[#231c16] mt-3 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-xl font-bold text-amber-400">
                        €{whiskey.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-[#8c7e70] font-mono">
                        {whiskey.volumeMl}ml • {whiskey.abv}% ABV
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(whiskey, e)}
                      className={`w-full py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 hover:bg-amber-500 text-black shadow-md'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Added to Cart</span>
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
            );
          })}
        </div>
      )}

    </main>
  );
}
