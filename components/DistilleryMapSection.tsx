'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DISTILLERIES, Distillery } from '@/lib/distilleries';
import { MapPin, Compass, Calendar, Droplets, Award, ArrowRight, Wine } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function DistilleryMapSection() {
  const [selectedDistillery, setSelectedDistillery] = useState<Distillery>(DISTILLERIES[0]);
  const { setSearchQuery, setIsSearchOpen } = useCart();

  const handleFilterBottles = (distName: string) => {
    setSearchQuery(distName);
    setIsSearchOpen(true);
  };

  return (
    <section className="py-16 bg-zinc-50 border-b border-black/10" id="distillery-map">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-xs font-mono uppercase tracking-widest font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>TERROIR & ORIGINS MAP</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-black">
            Interactive European Distillery Map
          </h2>
          <p className="text-sm text-zinc-600 font-medium">
            Explore famous malt origins across Scotland, Ireland, Sweden, France, and Germany. Click any distillery pin to discover its history, water sources, and signature bottlings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Visual Map Column */}
          <div className="lg:col-span-7 bg-white border-2 border-black rounded-2xl p-4 sm:p-6 shadow-md relative overflow-hidden">
            
            {/* Map Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200 text-xs text-zinc-600">
              <span className="flex items-center gap-1.5 text-black font-mono font-bold">
                <MapPin className="w-4 h-4" /> Europe & British Isles Terroir
              </span>
              <span className="font-bold text-black">8 Featured Distilleries</span>
            </div>

            {/* Visual Europe Map Container */}
            <div className="relative w-full h-[380px] sm:h-[480px] bg-zinc-100 rounded-xl border-2 border-black shadow-inner flex items-center justify-center overflow-hidden">
              
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

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Pins Layer */}
              <div className="absolute inset-0 pointer-events-auto z-10">
                {DISTILLERIES.map((dist) => {
                  const isSelected = selectedDistillery.id === dist.id;
                  
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
                        
                        {isSelected && (
                          <span className="absolute -inset-2 rounded-full bg-black/40 animate-ping pointer-events-none" />
                        )}

                        {/* Pin Marker */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xl border-2 transition-all ${
                            isSelected
                              ? 'bg-black border-white text-white scale-110 ring-2 ring-black'
                              : 'bg-white border-black text-black group-hover:bg-black group-hover:text-white group-hover:border-white shadow-black/40'
                          }`}
                        >
                          <Wine className="w-3.5 h-3.5" />
                        </div>

                        {/* Pin Label */}
                        <span
                          className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap transition-colors backdrop-blur-md ${
                            isSelected
                              ? 'bg-black text-white border border-white'
                              : 'bg-white/95 text-black border border-black group-hover:bg-black group-hover:text-white'
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
            <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-zinc-200">
              {DISTILLERIES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDistillery(d)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedDistillery.id === d.id
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-700 hover:text-black hover:bg-zinc-200 border border-zinc-300'
                  }`}
                >
                  {d.name} ({d.country})
                </button>
              ))}
            </div>

          </div>

          {/* Distillery Detail Information Panel */}
          <div className="lg:col-span-5 bg-white border-2 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
            
            <div className="relative h-48 w-full rounded-xl overflow-hidden bg-zinc-100 border border-zinc-300">
              <Image
                src={selectedDistillery.image}
                alt={selectedDistillery.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="bg-white text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded border border-black shadow-xs">
                  {selectedDistillery.region}, {selectedDistillery.country}
                </span>
                <span className="bg-black text-white text-xs font-mono font-bold px-2 py-0.5 rounded border border-white/30">
                  Est. {selectedDistillery.founded}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-black text-2xl text-black">
                {selectedDistillery.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                {selectedDistillery.description}
              </p>
            </div>

            {/* Spec Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-300 space-y-1">
                <span className="text-zinc-600 flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-black" /> Founded Year
                </span>
                <span className="font-black text-black">{selectedDistillery.founded}</span>
              </div>

              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-300 space-y-1">
                <span className="text-zinc-600 flex items-center gap-1 font-semibold">
                  <Droplets className="w-3.5 h-3.5 text-black" /> Water Source
                </span>
                <span className="font-black text-black">{selectedDistillery.waterSource}</span>
              </div>

              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-300 space-y-1 col-span-2">
                <span className="text-zinc-600 flex items-center gap-1 font-semibold">
                  <Award className="w-3.5 h-3.5 text-black" /> Master Distiller / Signature Bottling
                </span>
                <span className="font-black text-black">
                  {selectedDistillery.masterDistiller} • {selectedDistillery.signatureBottle}
                </span>
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={() => handleFilterBottles(selectedDistillery.name.split(' ')[0])}
              className="w-full inline-flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-md transition-all cursor-pointer uppercase tracking-wider border border-black"
            >
              <span>View Bottlings from {selectedDistillery.name}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
