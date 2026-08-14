'use client';

import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Tag, ChevronLeft, ChevronRight, Award } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    icon: <Truck className="w-4 h-4 text-amber-500" />,
    text: 'FREE Express Insured Shipping across Europe on orders over €150',
    highlight: 'Code: FREESHIP'
  },
  {
    icon: <Tag className="w-4 h-4 text-amber-500" />,
    text: 'Save 10% on Rare Allocation Bottles this month',
    highlight: 'Use Code: EUWHISKEY10'
  },
  {
    icon: <Award className="w-4 h-4 text-amber-500" />,
    text: 'Cask Club Loyalty: Earn 10 points per €1 spent on all single malts',
    highlight: 'Join Free'
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-amber-500" />,
    text: 'Strict 18+ EU Age Verification & Bonded Climate-Controlled Delivery',
    highlight: '100% Authentic'
  }
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="bg-[#171411] border-b border-[#2e261f] text-xs py-2 px-4 text-[#d1c5b8] relative z-40 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="text-[#8c7e70] hover:text-amber-500 transition-colors p-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center justify-center gap-2 text-center transition-all duration-300">
          {current.icon}
          <span>{current.text}</span>
          <span className="bg-amber-950/80 text-amber-400 border border-amber-800/50 px-2 py-0.5 rounded font-mono text-[11px] font-semibold hidden sm:inline-block ml-1">
            {current.highlight}
          </span>
        </div>

        <button 
          onClick={handleNext}
          aria-label="Next announcement"
          className="text-[#8c7e70] hover:text-amber-500 transition-colors p-1"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
