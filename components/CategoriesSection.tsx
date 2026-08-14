'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Sparkles, Flame, Wine, ShieldAlert, Award, Globe, Compass } from 'lucide-react';

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  count: string;
  image: string;
  icon: React.ReactNode;
  tag: string;
}

const CATEGORIES: Category[] = [
  {
    id: 'Japanese',
    title: 'Japanese Whiskies',
    subtitle: 'Yamazaki, Hibiki & Mizunara Oak Casks',
    count: '3 Allocations',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800',
    icon: <Globe className="w-4 h-4 text-amber-400" />,
    tag: 'Suntory & Nikka'
  },
  {
    id: 'Balvenie',
    title: 'Balvenie Casks',
    subtitle: 'PortWood & Caribbean Rum Finishes',
    count: '2 Bottlings',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    icon: <Wine className="w-4 h-4 text-amber-500" />,
    tag: 'Speyside Craft'
  },
  {
    id: 'Hennessy',
    title: 'Hennessy Cognac',
    subtitle: 'XO Extra Old & Paradis Reserve',
    count: '2 Prestige Editions',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    icon: <Award className="w-4 h-4 text-amber-300" />,
    tag: 'French Heritage'
  },
  {
    id: 'Macallan',
    title: 'The Macallan',
    subtitle: 'Sherry Oak 18 Year & Rare Cask Releases',
    count: '2 Allocations',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=800',
    icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    tag: 'Sherry Oak Icon'
  },
  {
    id: 'Old and Rare',
    title: 'Old and Rare',
    subtitle: 'Bowmore 25 & Brora 1977 Ghost Vintage',
    count: '2 Rare Allocations',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800',
    icon: <Sparkles className="w-4 h-4 text-orange-400" />,
    tag: 'Collector Choice'
  },
  {
    id: 'Port Ellen',
    title: 'Port Ellen',
    subtitle: 'Lost Distillery Islay Single Casks 39-40 Yrs',
    count: '2 Ghost Casks',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    icon: <Compass className="w-4 h-4 text-red-400" />,
    tag: 'Ghost Distillery'
  },
  {
    id: 'Bourbon',
    title: 'Bourbon & Rye',
    subtitle: 'Pappy Van Winkle 15, Blanton’s & WhistlePig',
    count: '3 Reserve Bottlings',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800',
    icon: <Flame className="w-4 h-4 text-amber-500" />,
    tag: 'Kentucky & Vermont'
  }
];

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-[#13100d] border-b border-[#261f18]" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <span>EXPLORE BY CATEGORY</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5f0ea]">
              Curated Cellar Categories
            </h2>
          </div>
          <p className="text-sm text-[#a39382] max-w-md">
            Hand-selected allocations categorized by iconic heritage houses, Japanese rare malts, ghost distilleries, and small-batch bourbons.
          </p>
        </div>

        {/* Categories Grid / Mobile Horizontal Scroll */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.id)}`}
              className="group relative min-w-[260px] sm:min-w-0 h-[240px] rounded-xl overflow-hidden bg-[#1a1511] border border-[#2e261f] hover:border-amber-600/70 cursor-pointer shadow-lg transition-all duration-300 transform hover:-translate-y-1 shrink-0 sm:shrink block"
            >
              {/* Image Background */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-75"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-[#0f0d0b]/60 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0f0d0b]/80 border border-amber-900/40 text-[11px] font-semibold text-amber-400 backdrop-blur-sm">
                  {cat.icon}
                  <span>{cat.tag}</span>
                </span>
                <span className="text-[11px] font-mono text-[#c4b6a7] bg-[#0f0d0b]/80 px-2 py-0.5 rounded">
                  {cat.count}
                </span>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#f8f3ed] group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>{cat.title}</span>
                  <ChevronRight className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </h3>
                <p className="text-xs text-[#a8998a] font-light line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
