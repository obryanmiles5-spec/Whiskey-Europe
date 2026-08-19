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
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
        
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

            {/* Visual Europe Map Container with Provided Map Image & Custom Pins */}
            <div className="relative w-full h-[380px] sm:h-[480px] bg-[#0d0b09] rounded-xl border-2 border-amber-600/50 shadow-2xl flex items-center justify-center overflow-hidden">
              
              {/* Provided European Map Image */}
              <Image
                src="https://lh3.googleusercontent.com/d/1knkbCnmvVz52nfDUj81UILYUsrCtCloj"
                alt="Interactive European Distillery Terroir Map"
                fill
                priority
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
                referrerPolicy="no-referrer"
              />

              {/* Light gradient vignette to keep the map image clearly seen while giving depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/50 pointer-events-none" />

              {/* Pins Layer */}
              <div className="absolute inset-0 pointer-events-auto z-10">
                {DISTILLERIES.map((dist) => {
                  const isSelected = selectedDistillery.id === dist.id;
                  
                  // Map coordinates normalization relative to viewBox
                  // lat range ~47 to 61 -> y range ~500 to 80
                  // lng range ~-8 to 18 -> x range ~150 to 650
                  const mapY = Math.max(12, Math.min(88, ((61 - dist.lat) / (61 - 47)) * 72 + 14));
                  const mapX = Math.max(12, Math.min(88, ((dist.lng + 9) / (18 + 9)) * 72 + 14));

                  return (
                    <button
                      key={dist.id}
                      onClick={() => setSelectedDistillery(dist)}
                      style={{ top: `${mapY}%`, left: `${mapX}%` }}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group cursor-pointer ${
                        isSelected ? 'z-30 scale-125' : 'z-20 hover:scale-115'
                      }`}
                      aria-label={`View ${dist.name}`}
                    >
                      <div className="relative flex flex-col items-center">
                        
                        {/* Pulse Ring if selected */}
                        {isSelected && (
                          <span className="absolute -inset-2 rounded-full bg-amber-400/50 animate-ping pointer-events-none" />
                        )}

                        {/* Pin Marker */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xl border-2 transition-all ${
                            isSelected
                              ? 'bg-amber-500 border-white text-black shadow-amber-500/80 scale-110'
                              : 'bg-[#1b1612]/95 border-amber-400/90 text-amber-300 group-hover:bg-amber-500 group-hover:text-black group-hover:border-white shadow-black/80'
                          }`}
                        >
                          <Wine className="w-3.5 h-3.5" />
                        </div>

                        {/* Pin Label */}
                        <span
                          className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap transition-colors backdrop-blur-md ${
                            isSelected
                              ? 'bg-amber-500 text-black border border-amber-300'
                              : 'bg-black/90 text-[#f5ede4] border border-amber-800/80 group-hover:text-amber-300 group-hover:border-amber-500'
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
