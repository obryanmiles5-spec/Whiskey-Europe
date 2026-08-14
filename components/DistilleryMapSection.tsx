'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DISTILLERIES, Distillery } from '@/lib/distilleries';
import { MapPin, Compass, Calendar, Droplets, Award, ArrowRight, Wine, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function DistilleryMapSection() {
  const [selectedDistillery, setSelectedDistillery] = useState<Distillery>(DISTILLERIES[0]);
  const { setSearchQuery, setIsSearchOpen } = useCart();

  const handleFilterBottles = (distName: string) => {
    setSearchQuery(distName);
    setIsSearchOpen(true);
  };

  return (
    <section className="py-16 bg-[#110e0b] border-b border-[#241d17]" id="distillery-map">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1612] border border-amber-900/50 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>TERROIR & ORIGINS MAP</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f8f3ed]">
            Interactive European Distillery Map
          </h2>
          <p className="text-sm text-[#b0a090] font-light">
            Explore famous malt origins across Scotland, Ireland, Sweden, France, and Germany. Click any distillery pin to discover its history, water sources, and signature bottlings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Visual Map Column */}
          <div className="lg:col-span-7 bg-[#17130f] border border-[#2b221a] rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            
            {/* Map Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#282018] text-xs text-[#a39382]">
              <span className="flex items-center gap-1.5 text-amber-400 font-mono font-semibold">
                <MapPin className="w-4 h-4" /> Europe & British Isles Terroir
              </span>
              <span>8 Featured Distilleries</span>
            </div>

            {/* SVG Europe Map Container with Custom Pins */}
            <div className="relative w-full h-[360px] sm:h-[440px] bg-[#0d0b09] rounded-xl border border-[#231d17] p-4 flex items-center justify-center overflow-hidden">
              
              {/* Subtle Stylized Map Background SVG */}
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full opacity-30 text-[#3b3127]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {/* Europe Landmass outlines simplified */}
                <path d="M 220 180 Q 240 140 280 150 T 320 190 T 300 250 T 230 220 Z" fill="#1c1611" /> {/* UK & Scotland */}
                <path d="M 170 200 Q 190 190 200 220 T 180 250 Z" fill="#1c1611" /> {/* Ireland */}
                <path d="M 330 100 Q 380 70 420 110 T 390 180 T 320 140 Z" fill="#1c1611" /> {/* Scandinavia */}
                <path d="M 280 280 Q 320 270 380 290 T 420 380 T 320 400 T 260 320 Z" fill="#1c1611" /> {/* France/Germany */}
                <path d="M 380 380 Q 400 420 420 450 T 390 470 Z" fill="#1c1611" /> {/* Italy */}
              </svg>

              {/* Pins Layer */}
              <div className="absolute inset-0 pointer-events-auto">
                {DISTILLERIES.map((dist) => {
                  const isSelected = selectedDistillery.id === dist.id;
                  
                  // Map coordinates normalization relative to viewBox
                  // lat range ~47 to 61 -> y range ~500 to 80
                  // lng range ~-8 to 18 -> x range ~150 to 650
                  const mapY = Math.max(10, Math.min(90, ((61 - dist.lat) / (61 - 47)) * 75 + 10));
                  const mapX = Math.max(10, Math.min(90, ((dist.lng + 9) / (18 + 9)) * 75 + 10));

                  return (
                    <button
                      key={dist.id}
                      onClick={() => setSelectedDistillery(dist)}
                      style={{ top: `${mapY}%`, left: `${mapX}%` }}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group cursor-pointer ${
                        isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-110'
                      }`}
                      aria-label={`View ${dist.name}`}
                    >
                      <div className="relative flex flex-col items-center">
                        
                        {/* Pulse Ring if selected */}
                        {isSelected && (
                          <span className="absolute -inset-2 rounded-full bg-amber-500/30 animate-ping pointer-events-none" />
                        )}

                        {/* Pin Marker */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xl border-2 transition-colors ${
                            isSelected
                              ? 'bg-amber-500 border-white text-black'
                              : 'bg-[#1b1612] border-amber-600/80 text-amber-400 group-hover:bg-amber-600 group-hover:text-black'
                          }`}
                        >
                          <Wine className="w-3.5 h-3.5" />
                        </div>

                        {/* Pin Label */}
                        <span
                          className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap transition-colors ${
                            isSelected
                              ? 'bg-amber-500 text-black'
                              : 'bg-[#0f0d0b]/90 text-[#d1c5b8] border border-[#2e261f] group-hover:text-amber-400'
                          }`}
                        >
                          {dist.name.split(' ')[0]}
                        </span>

                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Quick List Selector */}
            <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-[#231d17]">
              {DISTILLERIES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDistillery(d)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedDistillery.id === d.id
                      ? 'bg-amber-600 text-black font-bold'
                      : 'bg-[#1b1612] text-[#a39382] hover:text-amber-400 border border-[#29221b]'
                  }`}
                >
                  {d.name} ({d.country})
                </button>
              ))}
            </div>

          </div>

          {/* Distillery Detail Information Panel */}
          <div className="lg:col-span-5 bg-[#17130f] border border-[#2b221a] rounded-2xl p-6 shadow-2xl space-y-6">
            
            <div className="relative h-48 w-full rounded-xl overflow-hidden bg-[#120f0c]">
              <Image
                src={selectedDistillery.image}
                alt={selectedDistillery.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17130f] via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {selectedDistillery.region}, {selectedDistillery.country}
                </span>
                <span className="bg-[#0f0d0b]/90 text-amber-400 text-xs font-mono px-2 py-0.5 rounded border border-amber-900/40">
                  Est. {selectedDistillery.founded}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-bold text-2xl text-[#f8f3ed]">
                {selectedDistillery.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#b8a99a] leading-relaxed font-light">
                {selectedDistillery.description}
              </p>
            </div>

            {/* Spec Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#120e0b] p-3 rounded-lg border border-[#261f18] space-y-1">
                <span className="text-[#8c7e70] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" /> Founded Year
                </span>
                <span className="font-bold text-[#f5f0ea]">{selectedDistillery.founded}</span>
              </div>

              <div className="bg-[#120e0b] p-3 rounded-lg border border-[#261f18] space-y-1">
                <span className="text-[#8c7e70] flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-amber-500" /> Water Source
                </span>
                <span className="font-bold text-[#f5f0ea]">{selectedDistillery.waterSource}</span>
              </div>

              <div className="bg-[#120e0b] p-3 rounded-lg border border-[#261f18] space-y-1 col-span-2">
                <span className="text-[#8c7e70] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" /> Master Distiller / Signature Bottling
                </span>
                <span className="font-bold text-amber-400">
                  {selectedDistillery.masterDistiller} • {selectedDistillery.signatureBottle}
                </span>
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={() => handleFilterBottles(selectedDistillery.name.split(' ')[0])}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold text-sm py-3 px-4 rounded-lg shadow-lg transition-all cursor-pointer"
            >
              <span>View Bottlings from {selectedDistillery.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
