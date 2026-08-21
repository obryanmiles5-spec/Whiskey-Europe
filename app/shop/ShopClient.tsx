'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { WHISKEY_COLLECTION, Whiskey, JAPANESE_BRANDS, JapaneseBrand } from '@/lib/whiskeys';
import { useCart } from '@/lib/cart-context';
import { Star, Eye, ShoppingBag, SlidersHorizontal, ArrowUpDown, Wine, RotateCcw, CheckCircle2, Sparkles, ShieldCheck, Globe, Award, Sparkle, Flame } from 'lucide-react';

const SHOP_CATEGORIES = [
  'All',
  'Japanese',
  'Balvenie',
  'Hennessy',
  'Macallan',
  'Old and Rare',
  'Port Ellen',
  'Bourbon',
  "Ballantine's",
];

function getMatchedCategory(param: string | null): string {
  if (!param) return 'All';
  const clean = param.toLowerCase().trim();
  if (clean === 'all') return 'All';
  if (clean.includes('japan') || clean === 'japanese') return 'Japanese';
  if (clean.includes('balvenie')) return 'Balvenie';
  if (clean.includes('hennessy')) return 'Hennessy';
  if (clean.includes('macallan')) return 'Macallan';
  if (clean.includes('port ellen') || clean.includes('port hellen') || clean.includes('ellen') || clean.includes('hellen')) return 'Port Ellen';
  if (clean.includes('bourbon') || clean.includes('rye')) return 'Bourbon';
  if (clean.includes('ballantine')) return "Ballantine's";
  if (clean.includes('old') || clean.includes('rare')) return 'Old and Rare';
  
  const direct = SHOP_CATEGORIES.find((c) => c.toLowerCase() === clean);
  return direct || 'All';
}

export default function ShopClient() {
  const { addToCart, setQuickViewWhiskey } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categories = SHOP_CATEGORIES;

  const categoryParam = searchParams.get('category');
  const brandParam = searchParams.get('brand');

  const selectedCategory = useMemo(() => getMatchedCategory(categoryParam), [categoryParam]);
  const selectedBrand = useMemo(() => brandParam || 'All', [brandParam]);

  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [minAge, setMinAge] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'age'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedBottleId, setAddedBottleId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleCategoryChange = (cat: string) => {
    const newUrl = cat === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(cat)}`;
    router.replace(newUrl, { scroll: false });
  };

  const handleBrandChange = (brand: string) => {
    const newUrl = brand === 'All'
      ? '/shop?category=Japanese'
      : `/shop?category=Japanese&brand=${encodeURIComponent(brand)}`;
    router.replace(newUrl, { scroll: false });
  };

  const regions = [
    'All',
    'Speyside',
    'Highlands',
    'Islay',
    'Saitama / Japan',
    'Yamanashi / Japan',
    'Osaka / Japan',
    'Nagano / Japan',
    'Cognac',
    'Kentucky',
    'County Cork',
  ];

  const getCategoryProductCount = (cat: string) => {
    if (cat === 'All') return WHISKEY_COLLECTION.length;
    return WHISKEY_COLLECTION.filter((w) => {
      if (cat === 'Balvenie') return w.category === 'Balvenie' || w.distillery.toLowerCase().includes('balvenie') || w.name.toLowerCase().includes('balvenie');
      if (cat === 'Japanese') return w.category === 'Japanese' || w.country === 'Japan' || w.name.toLowerCase().includes('japanese');
      if (cat === 'Hennessy') return w.category === 'Hennessy' || w.distillery.toLowerCase().includes('hennessy');
      if (cat === 'Macallan') return w.category === 'Macallan' || w.distillery.toLowerCase().includes('macallan');
      if (cat === 'Old and Rare') return w.category === 'Old and Rare';
      if (cat === 'Port Ellen') return w.category === 'Port Ellen' || w.distillery.toLowerCase().includes('port ellen');
      if (cat === 'Bourbon') return w.category === 'Bourbon' || w.type.toLowerCase().includes('bourbon');
      if (cat === "Ballantine's") return w.category === 'Ballantines' || w.category === "Ballantine's" || w.distillery.toLowerCase().includes('ballantine');
      return false;
    }).length;
  };

  const getJapaneseBrandCount = (brandName: string) => {
    if (brandName === 'All') {
      return WHISKEY_COLLECTION.filter((w) => w.category === 'Japanese' || w.country === 'Japan').length;
    }
    return WHISKEY_COLLECTION.filter((w) => {
      const isJapanese = w.category === 'Japanese' || w.country === 'Japan';
      const matchesBrand = w.brand?.toLowerCase() === brandName.toLowerCase() ||
        w.name.toLowerCase().includes(brandName.toLowerCase()) ||
        w.distillery.toLowerCase().includes(brandName.toLowerCase());
      return isJapanese && matchesBrand;
    }).length;
  };

  const filteredBottles = WHISKEY_COLLECTION.filter((w) => {
    let matchesCategory = false;
    if (selectedCategory === 'All') {
      matchesCategory = true;
    } else if (selectedCategory === 'Japanese') {
      matchesCategory = w.category === 'Japanese' || w.country === 'Japan' || w.name.toLowerCase().includes('japanese') || w.type.toLowerCase().includes('japanese');
      if (matchesCategory && selectedBrand !== 'All') {
        const brandMatch = (w.brand && w.brand.toLowerCase() === selectedBrand.toLowerCase()) ||
          w.name.toLowerCase().includes(selectedBrand.toLowerCase()) ||
          w.distillery.toLowerCase().includes(selectedBrand.toLowerCase());
        matchesCategory = Boolean(brandMatch);
      }
    } else if (selectedCategory === 'Balvenie' || selectedCategory === 'Balvenie Casks') {
      matchesCategory = w.category === 'Balvenie' || w.distillery.toLowerCase().includes('balvenie') || w.name.toLowerCase().includes('balvenie');
    } else if (selectedCategory === 'Hennessy') {
      matchesCategory = w.category === 'Hennessy' || w.distillery.toLowerCase().includes('hennessy') || w.name.toLowerCase().includes('hennessy');
    } else if (selectedCategory === 'Macallan') {
      matchesCategory = w.category === 'Macallan' || w.distillery.toLowerCase().includes('macallan') || w.name.toLowerCase().includes('macallan');
    } else if (selectedCategory === 'Old and Rare') {
      matchesCategory = w.category === 'Old and Rare';
    } else if (selectedCategory === 'Port Ellen') {
      matchesCategory = w.category === 'Port Ellen' || w.distillery.toLowerCase().includes('port ellen') || w.name.toLowerCase().includes('port ellen');
    } else if (selectedCategory === 'Bourbon') {
      matchesCategory = w.category === 'Bourbon' || w.type.toLowerCase().includes('bourbon') || w.country === 'United States';
    } else if (selectedCategory === "Ballantine's" || selectedCategory === "Ballantines") {
      matchesCategory = w.category === 'Ballantines' || w.category === "Ballantine's" || w.distillery.toLowerCase().includes('ballantine') || w.name.toLowerCase().includes('ballantine');
    }

    const matchesRegion =
      selectedRegion === 'All' ||
      w.region.toLowerCase().includes(selectedRegion.toLowerCase().split(' ')[0]);

    const matchesPrice = maxPrice >= 100000 ? true : w.price <= maxPrice;
    const matchesAge = w.age >= minAge;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      w.name.toLowerCase().includes(q) ||
      (w.brand && w.brand.toLowerCase().includes(q)) ||
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

  const handleAddToCart = (bottle: Whiskey, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(bottle, 1);
    setAddedBottleId(bottle.id);
    setTimeout(() => {
      setAddedBottleId(null);
    }, 1200);
  };

  const activeJapaneseBrandInfo = JAPANESE_BRANDS.find((b) => b.id.toLowerCase() === selectedBrand.toLowerCase());

  const getCategoryHeaderTitle = () => {
    if (selectedCategory === 'Japanese') {
      if (selectedBrand === 'Chichibu') return "Chichibu Ichiro's Malt Japanese Whiskies";
      if (selectedBrand === 'Hakushu') return 'Hakushu Mountain Forest Single Malts';
      if (selectedBrand === 'Hibiki') return 'Hibiki Blended Decanters & Mizunara Casks';
      if (selectedBrand === 'Karuizawa') return 'Karuizawa Lost Ghost Distillery Single Casks';
      if (selectedBrand === 'Yamazaki') return 'Yamazaki Pioneer Japanese Single Malts';
      return 'Japanese Rare Mizunara & Master Distilleries';
    }
    if (selectedCategory === 'All') return 'Full Cellar Collection';
    if (selectedCategory === 'Hennessy') return 'Hennessy Cognac Allocations';
    if (selectedCategory === 'Balvenie') return 'The Balvenie Cask Collection';
    if (selectedCategory === 'Macallan') return 'The Macallan Sherry Oak & Rare Casks';
    if (selectedCategory === 'Old and Rare') return 'Old & Rare Vintage Allocations';
    if (selectedCategory === 'Port Ellen') return 'Port Ellen Ghost Distillery Single Casks';
    if (selectedCategory === 'Bourbon') return 'Small-Batch Bourbon & Rye Allocations';
    if (selectedCategory === "Ballantine's") return "Ballantine's Heritage Aged Releases";
    return `${selectedCategory} Collection`;
  };

  return (
    <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#2a1f17] to-[#1c1510] border border-amber-800/50 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
            BONDED CELLAR ALLOCATIONS
          </span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#f8f3ed] tracking-tight">
          {getCategoryHeaderTitle()}
        </h1>
        <p className="text-xs sm:text-sm text-[#bcaea0] leading-relaxed font-light">
          Sommelier-verified bottles, single cask allocations, and collectible rare releases. Fully insured, temperature-controlled transit across all 27 EU member states.
        </p>

        {/* Selected Category Pill Notice */}
        {selectedCategory !== 'All' && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-xs text-amber-300/90 bg-amber-950/60 border border-amber-700/50 px-3 py-1 rounded-full font-mono">
              Filtered: <strong className="text-amber-300">{selectedCategory}</strong> ({filteredBottles.length} bottles)
            </span>
            <button
              onClick={() => handleCategoryChange('All')}
              className="text-xs text-[#a39382] hover:text-amber-400 underline underline-offset-4 transition-colors cursor-pointer"
            >
              View All Categories
            </button>
          </div>
        )}
      </div>

      {/* Filter & Search Bar Toolbar */}
      <div className="bg-gradient-to-b from-[#1c1611] to-[#14100d] border border-[#362b21] p-4 sm:p-6 rounded-2xl shadow-2xl space-y-5">
        
        {/* Category Switcher Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#a39382] font-mono px-1">
            <span>SELECT CATEGORY</span>
            <span>{categories.length - 1} Special Collections</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full no-scrollbar pb-1">
            {categories.map((cat) => {
              const count = getCategoryProductCount(cat);
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black border-amber-400 shadow-lg shadow-amber-950/40 font-bold scale-[1.02]'
                      : 'bg-[#18130f] text-[#c4b5a6] hover:text-[#f8f3ed] hover:bg-[#231b15] border-[#31271e]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isSelected ? 'bg-black/25 text-black font-bold' : 'bg-[#100d0a] text-[#8c7d6e]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* JAPANESE BRANDS SUB-NAVIGATION (Active when Japanese category is selected) */}
        {selectedCategory === 'Japanese' && (
          <div className="pt-4 border-t border-[#2d231b] space-y-3">
            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold tracking-wider uppercase text-[11px]">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>JAPANESE WHISKY BRANDS & HOUSES</span>
              </div>
              <span className="text-[10px] text-[#918171] font-mono">5 Master Brands</span>
            </div>

            {/* Brand Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full no-scrollbar pb-1">
              {/* All Japanese Brands Pill */}
              <button
                onClick={() => handleBrandChange('All')}
                className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                  selectedBrand === 'All'
                    ? 'bg-amber-500 text-black border-amber-300 font-bold shadow-md shadow-amber-950/40'
                    : 'bg-[#120f0c] text-[#bdae9f] hover:text-[#f8f3ed] hover:bg-[#1f1813] border-[#2e241c]'
                }`}
              >
                <span>All Japanese Brands</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  selectedBrand === 'All' ? 'bg-black/20 text-black font-bold' : 'bg-[#0b0907] text-[#857667]'
                }`}>
                  {getJapaneseBrandCount('All')}
                </span>
              </button>

              {/* 5 Distinct Japanese Brands */}
              {JAPANESE_BRANDS.map((brand) => {
                const count = getJapaneseBrandCount(brand.id);
                const isBrandSelected = selectedBrand.toLowerCase() === brand.id.toLowerCase();
                return (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandChange(brand.id)}
                    className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                      isBrandSelected
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black border-amber-300 font-bold shadow-md shadow-amber-950/40 scale-[1.02]'
                        : 'bg-[#120f0c] text-[#bdae9f] hover:text-[#f8f3ed] hover:bg-[#1f1813] border-[#2e241c]'
                    }`}
                  >
                    <span>{brand.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isBrandSelected ? 'bg-black/20 text-black font-bold' : 'bg-[#0b0907] text-[#857667]'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Brand Spotlight Info Banner */}
            {activeJapaneseBrandInfo ? (
              <div className="bg-gradient-to-r from-[#211913] via-[#1a140f] to-[#120e0b] border border-amber-800/40 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-amber-300 text-sm">{activeJapaneseBrandInfo.name}</span>
                    <span className="text-[10px] text-amber-500/90 font-mono bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/40">
                      Est. {activeJapaneseBrandInfo.established} • {activeJapaneseBrandInfo.region}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#baa998] font-light">
                    {activeJapaneseBrandInfo.subtitle} — {activeJapaneseBrandInfo.specialty}
                  </p>
                </div>
                <button
                  onClick={() => handleBrandChange('All')}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-mono underline underline-offset-2 shrink-0 cursor-pointer"
                >
                  View All 5 Brands ({getJapaneseBrandCount('All')})
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-[11px]">
                {JAPANESE_BRANDS.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => handleBrandChange(b.id)}
                    className="p-2.5 rounded-lg bg-[#140f0c] border border-[#2a2017] hover:border-amber-600/60 transition-all cursor-pointer group"
                  >
                    <div className="font-bold text-[#f5efe8] group-hover:text-amber-400 flex items-center justify-between">
                      <span>{b.name}</span>
                      <span className="text-[10px] text-amber-500 font-mono">{getJapaneseBrandCount(b.id)}</span>
                    </div>
                    <div className="text-[10px] text-[#8a7a6b] line-clamp-1 mt-0.5 font-light">
                      {b.region.split(',')[0]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search & Reset Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2a2118]">
          <div className="w-full sm:flex-1 relative">
            <input
              type="text"
              placeholder="Search distillery, age, cask finish, tasting notes (e.g., Hennessy, Balvenie, Sherry, Mizunara)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#100d0a] border border-[#3b2f24] focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-[#f5f0ea] placeholder-[#786b5e] focus:outline-none transition-colors"
            />
          </div>

          {(selectedCategory !== 'All' || selectedRegion !== 'All' || maxPrice < 100000 || minAge > 0 || searchQuery || sortBy !== 'featured' || selectedBrand !== 'All') && (
            <button
              onClick={() => {
                handleCategoryChange('All');
                setSelectedRegion('All');
                setMaxPrice(100000);
                setMinAge(0);
                setSearchQuery('');
                setSortBy('featured');
              }}
              className="px-4 py-2.5 bg-[#231a14] hover:bg-[#2f231b] border border-amber-800/40 text-amber-400 text-xs rounded-xl flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              title="Reset All Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Detailed Filters & Sort Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#261e16] text-xs text-[#a39382]">
          
          {/* Region Select */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-[#f5f0ea] uppercase tracking-wider font-mono">Origin Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-[#100d0a] border border-[#3b2f24] rounded-xl p-2.5 text-[#f5f0ea] focus:outline-none focus:border-amber-500"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r === 'All' ? 'All European & World Terroirs' : r}</option>
              ))}
            </select>
          </div>

          {/* Min Age Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="font-semibold text-[#f5f0ea] uppercase tracking-wider font-mono">Minimum Aging</span>
              <span className="text-amber-400 font-mono font-bold">{minAge > 0 ? `${minAge}+ Years` : 'Any Statement'}</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={minAge}
              onChange={(e) => setMinAge(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer bg-[#100d0a]"
            />
          </div>

          {/* Max Price Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="font-semibold text-[#f5f0ea] uppercase tracking-wider font-mono">Max Allocation (€)</span>
              <span className="text-amber-400 font-mono font-bold">
                {maxPrice >= 100000 ? '€100,000+ (Uncapped)' : `€${maxPrice.toLocaleString()}`}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={100000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer bg-[#100d0a]"
            />
          </div>

          {/* Sort By */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-[#f5f0ea] flex items-center gap-1 uppercase tracking-wider font-mono">
              <ArrowUpDown className="w-3 h-3 text-amber-500" /> Sort Bottles
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-[#100d0a] border border-[#3b2f24] rounded-xl p-2.5 text-[#f5f0ea] focus:outline-none focus:border-amber-500"
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

      {/* Results Summary Bar */}
      <div className="flex items-center justify-between text-xs text-[#a39382] px-2 font-mono">
        <span>Showing {filteredBottles.length} of {WHISKEY_COLLECTION.length} Cellar Allocations</span>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-500" />
          <span className="text-[#8c7d6e] hidden sm:inline">100% Bonded Authenticity Guaranteed</span>
        </div>
      </div>

      {/* Products Grid - 4 per row */}
      {filteredBottles.length === 0 ? (
        <div className="text-center py-20 bg-[#16110d] border border-[#2e241b] rounded-2xl space-y-4 shadow-xl">
          <SlidersHorizontal className="w-12 h-12 text-amber-600/60 mx-auto" />
          <h3 className="font-serif font-bold text-xl text-[#f8f3ed]">No bottles match your specific criteria</h3>
          <p className="text-xs text-[#a39382] max-w-md mx-auto leading-relaxed">
            Try adjusting your search terms, price threshold, or region filters to explore other rare allocations.
          </p>
          <button
            onClick={() => {
              handleCategoryChange('All');
              setSelectedRegion('All');
              setMaxPrice(100000);
              setMinAge(0);
              setSearchQuery('');
              setSortBy('featured');
            }}
            className="mt-4 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            Show All Allocations
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredBottles.map((whiskey) => {
            const isAdded = addedBottleId === whiskey.id;

            return (
              <div
                key={whiskey.id}
                className="bg-gradient-to-b from-[#1c1611] to-[#140f0c] border border-[#31271e] hover:border-amber-500/70 rounded-2xl p-4 flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/30 relative"
              >
                {/* Badge */}
                {whiskey.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-600 to-amber-700 text-black font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-lg">
                    {whiskey.badge}
                  </span>
                )}

                {/* Bottle Image with Quick View Hover Overlay */}
                <div className="relative h-64 w-full rounded-xl overflow-hidden bg-[#100d0a] mb-4 group-hover:scale-[1.02] transition-transform border border-[#281f18]">
                  {whiskey.image && !imageErrors[whiskey.id] ? (
                    <Image
                      src={whiskey.image}
                      alt={whiskey.name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-center"
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

                  {/* Quick View Button */}
                  <button
                    onClick={() => setQuickViewWhiskey(whiskey)}
                    className="absolute inset-x-4 bottom-4 bg-[#0f0d0b]/90 hover:bg-amber-600 hover:text-black text-[#f5f0ea] font-bold text-xs py-2.5 rounded-xl border border-[#3d3126] flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-xl cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Quick View Tasting Notes</span>
                  </button>
                </div>

                {/* Content Specs */}
                <div className="space-y-2.5 flex-1 flex flex-col justify-between">
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
                      <span className="text-[10px] text-[#8c7e70]">({whiskey.reviewsCount} Verified Reviews)</span>
                    </div>

                    {/* Key Specs */}
                    <p className="text-[11px] text-[#a89a8c] mt-2 line-clamp-2 font-light leading-relaxed">
                      {whiskey.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-[#281f18] mt-3 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-xl font-bold text-amber-400">
                          €{whiskey.price.toFixed(2)}
                        </span>
                        {whiskey.originalPrice && (
                          <span className="text-xs text-[#786b5e] line-through font-mono">
                            €{whiskey.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#8c7e70] font-mono">
                        {whiskey.volumeMl}ml • {whiskey.abv}% ABV
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(whiskey, e)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Added to Cellar Cart</span>
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

