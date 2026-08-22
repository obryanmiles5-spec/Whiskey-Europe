'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_SEARCH_KEYWORDS, KeywordEntry } from '@/lib/keyword-registry';
import { WHISKEY_COLLECTION } from '@/lib/whiskeys';
import { 
  Search, 
  Wine, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Filter, 
  Tag, 
  ExternalLink,
  Award,
  Globe2,
  Package,
  Layers
} from 'lucide-react';

const CATEGORIES = [
  'All Categories',
  'Irish & Canadian',
  'Tennessee & American',
  'Bourbon & Allocation',
  'Scotch & International',
  'Japanese & Mizunara',
  'Specialty, Casks & Gear',
] as const;

export default function RareWhiskeyIndexClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  const filteredEntries = useMemo(() => {
    return ALL_SEARCH_KEYWORDS.filter((entry) => {
      const matchesCategory =
        selectedCategory === 'All Categories' || entry.category === selectedCategory;

      const q = searchTerm.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesQuery =
        entry.name.toLowerCase().includes(q) ||
        entry.brand.toLowerCase().includes(q) ||
        entry.origin.toLowerCase().includes(q) ||
        entry.tastingNotes.toLowerCase().includes(q) ||
        entry.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Search & Filter Controls */}
      <div className="bg-[#15100c] border border-[#2b2118] p-5 sm:p-6 rounded-2xl shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by whiskey name, brand (e.g. Jameson, Blanton's, Yamazaki, Weller, Glencairn)..."
              className="w-full bg-[#1e1712] border border-[#382b1f] focus:border-amber-500 rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#f5f0ea] placeholder-[#807264] outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#a89887] hover:text-white px-2 py-1 bg-[#2b2017] rounded-md"
              >
                CLEAR
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#a89887] whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Showing <strong className="text-amber-400">{filteredEntries.length}</strong> index records</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-black font-bold shadow-lg shadow-amber-950/40'
                    : 'bg-[#1e1712] text-[#bfb0a0] hover:text-white hover:bg-[#291f18] border border-[#33271d]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            id={entry.id}
            className="bg-[#140f0c] border border-[#2b2118] hover:border-amber-500/60 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div className="space-y-3">
              {/* Header Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-amber-950/60 text-amber-400 border border-amber-800/40 font-bold">
                  {entry.category}
                </span>

                <span
                  className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-md border font-semibold ${
                    entry.status === 'Vault Exclusive'
                      ? 'bg-purple-950/50 text-purple-300 border-purple-800/40'
                      : entry.status === 'Allocated Release'
                      ? 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                      : entry.status === 'Certified Gear'
                      ? 'bg-blue-950/40 text-blue-300 border-blue-800/40'
                      : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
                  }`}
                >
                  {entry.status}
                </span>
              </div>

              {/* Title & Brand */}
              <div>
                <h3 className="font-serif font-bold text-lg text-[#f8f3ed] group-hover:text-amber-300 transition-colors leading-snug">
                  {entry.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#a39382]">
                  <Globe2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{entry.origin}</span>
                  <span>•</span>
                  <span className="font-mono text-amber-400/90">{entry.abv}</span>
                </div>
              </div>

              {/* Sommelier Tasting & Profile Notes */}
              <div className="bg-[#1c1611] border border-[#30241a] rounded-xl p-3.5 text-xs text-[#d1c2b4] leading-relaxed">
                <strong className="text-amber-200 block mb-1 font-mono uppercase text-[10px] tracking-wider">
                  Sommelier Profile &amp; Provenance:
                </strong>
                {entry.tastingNotes}
              </div>

              {/* Tags Cloud */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] bg-[#1a140f] text-[#8e8072] border border-[#2b2118] px-2 py-0.5 rounded-md hover:text-amber-300 transition-colors"
                  >
                    <Tag className="w-2.5 h-2.5 text-amber-500/70" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Cross-Linking Action */}
            <div className="pt-3 border-t border-[#241a13] flex items-center justify-between">
              <Link
                href={`/shop?q=${encodeURIComponent(entry.searchQuery)}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>View {entry.brand} Allocations in Shop</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={`/contact?inquiry=${encodeURIComponent(entry.name)}`}
                className="text-[11px] font-mono text-[#8a7c6e] hover:text-amber-400 transition-colors"
              >
                Concierge Sourcing
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-16 bg-[#140f0c] border border-[#2b2118] rounded-2xl space-y-3">
          <Wine className="w-12 h-12 text-[#6e6052] mx-auto" />
          <h3 className="font-serif font-bold text-lg text-amber-200">No keyword matches found</h3>
          <p className="text-xs text-[#8c7e70]">
            Try searching for &quot;Jameson&quot;, &quot;Jack Daniel&apos;s&quot;, &quot;Blanton&apos;s&quot;, &quot;Yamazaki&quot;, or &quot;Glencairn&quot;.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All Categories');
            }}
            className="mt-2 bg-amber-600 text-black font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
