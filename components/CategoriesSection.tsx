'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Sparkles, Flame, Wine, Award, Globe, Compass } from 'lucide-react';

import { WHISKEY_COLLECTION } from '@/lib/whiskeys';

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  icon: React.ReactNode;
  tag: string;
}

const CATEGORIES: Category[] = [
  {
    id: 'Japanese',
    title: 'Japanese Whiskies',
    subtitle: 'Chichibu, Hakushu, Hibiki, Karuizawa & Yamazaki',
    image: 'https://lh3.googleusercontent.com/d/1V-8ZnKh63DPMGjXoPO89b_SVFg9CH_Vy',
    icon: <Globe className="w-4 h-4 text-amber-400" />,
    tag: '5 Iconic Houses'
  },
  {
    id: 'Balvenie',
    title: 'Balvenie Casks',
    subtitle: 'PortWood & Caribbean Rum Finishes',
    image: 'https://lh3.googleusercontent.com/d/11ImUr9gk2vSnFBSdH_vYFaSLQbEIW_eU',
    icon: <Wine className="w-4 h-4 text-amber-500" />,
    tag: 'Speyside Craft'
  },
  {
    id: 'Macallan',
    title: 'The Macallan',
    subtitle: 'Sherry Oak 18 Year & Rare Cask Releases',
    image: 'https://lh3.googleusercontent.com/d/1xMKFTuCZRwv5rJw6HptO8BcZJOy11w5M',
    icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    tag: 'Sherry Oak Icon'
  },
  {
    id: 'Hennessy',
    title: 'Hennessy Cognac',
    subtitle: 'XO Extra Old & Paradis Reserve',
    image: 'https://lh3.googleusercontent.com/d/1tl5HxBwhTBOAJE-nRkJ2fi111JJjfZz9',
    icon: <Award className="w-4 h-4 text-amber-300" />,
    tag: 'French Heritage'
  },
  {
    id: 'Old and Rare',
    title: 'Old and Rare',
    subtitle: 'Clés des Ducs 1930, Hermitage 1890 & Hine 250',
    image: 'https://lh3.googleusercontent.com/d/1delgvRWGGz32J-mr8kvjikZTXb0kacHq',
    icon: <Sparkles className="w-4 h-4 text-orange-400" />,
    tag: 'Collector Choice'
  },
  {
    id: 'Port Ellen',
    title: 'Port Ellen',
    subtitle: 'Lost Distillery Islay Single Casks 39-40 Yrs',
    image: 'https://lh3.googleusercontent.com/d/1THlfo9EWbT8mA4eAlIfhsINT-T5USH4y',
    icon: <Compass className="w-4 h-4 text-red-400" />,
    tag: 'Ghost Distillery'
  },
  {
    id: 'Bourbon',
    title: 'Bourbon & Rye',
    subtitle: 'Pappy Van Winkle 15, Blanton’s & WhistlePig',
    image: 'https://lh3.googleusercontent.com/d/12Xn18KSHqyNIDRTEwZmH3-eIaT5LESZ6',
    icon: <Flame className="w-4 h-4 text-amber-500" />,
    tag: 'Kentucky & Vermont'
  },
  {
    id: "Ballantine's",
    title: "Ballantine's Heritage",
    subtitle: '30 Year Old Masterpiece & 21 Year Old Reserve',
    image: 'https://lh3.googleusercontent.com/d/1VR7swVn2F86xZnIk7q6dyiyRAzDhMpkU',
    icon: <Award className="w-4 h-4 text-amber-400" />,
    tag: 'Blended Masterpiece'
  }
];

export default function CategoriesSection() {
  const getCategoryCount = (catId: string) => {
    const count = WHISKEY_COLLECTION.filter((w) => {
      if (catId === 'Japanese') return w.category === 'Japanese' || w.country === 'Japan';
      if (catId === 'Balvenie') return w.category === 'Balvenie' || w.distillery.toLowerCase().includes('balvenie');
      if (catId === 'Hennessy') return w.category === 'Hennessy' || w.distillery.toLowerCase().includes('hennessy');
      if (catId === 'Macallan') return w.category === 'Macallan' || w.distillery.toLowerCase().includes('macallan');
      if (catId === 'Old and Rare') return w.category === 'Old and Rare';
      if (catId === 'Port Ellen') return w.category === 'Port Ellen' || w.distillery.toLowerCase().includes('port ellen');
      if (catId === 'Bourbon') return w.category === 'Bourbon' || w.type.toLowerCase().includes('bourbon');
      if (catId === "Ballantine's") return w.category === 'Ballantines' || w.category === "Ballantine's" || w.distillery.toLowerCase().includes('ballantine');
      return false;
    }).length;
    return `${count} Products`;
  };
  return (
    <section className="py-16 bg-[#13100d] border-b border-[#261f18]" id="categories">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
        
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
            Hand-selected allocations categorized by Japanese rare bottlings, Speyside single malts, ghost distilleries, and small-batch bourbons.
          </p>
        </div>

        {/* Categories Grid - 8 Curated Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.id)}`}
              className="group relative h-[250px] rounded-xl overflow-hidden bg-[#1a1511] border border-[#2e261f] hover:border-amber-600/70 cursor-pointer shadow-lg transition-all duration-300 transform hover:-translate-y-1 block"
            >
              {/* Image Background */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-75"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-[#0f0d0b]/60 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0f0d0b]/80 border border-amber-900/40 text-[11px] font-semibold text-amber-400 backdrop-blur-sm">
                  {cat.icon}
                  <span>{cat.tag}</span>
                </span>
                <span className="text-[11px] font-mono text-[#c4b6a7] bg-[#0f0d0b]/80 px-2 py-0.5 rounded">
                  {getCategoryCount(cat.id)}
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
