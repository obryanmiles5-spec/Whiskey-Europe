'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Star, ShoppingBag, ShieldCheck, MapPin, Award, CheckCircle2, Wine } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function QuickViewModal() {
  const { quickViewWhiskey, setQuickViewWhiskey, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState('');
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!quickViewWhiskey) return null;

  const handleAdd = () => {
    addToCart(quickViewWhiskey, quantity, engravingText);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewWhiskey(null);
    }, 1200);
  };

  const fp = quickViewWhiskey.flavorProfile;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#14100c] border border-[#2e261f] rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative text-[#f5f0ea] my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewWhiskey(null)}
          className="absolute top-4 right-4 text-[#8c7e70] hover:text-amber-400 p-2 rounded-full hover:bg-[#1f1914] z-10"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Bottle Image */}
          <div className="md:col-span-5 relative h-72 md:h-96 w-full rounded-xl overflow-hidden bg-[#18130f] border border-[#261f18]">
            {quickViewWhiskey.image && !imgError ? (
              <Image
                src={quickViewWhiskey.image}
                alt={quickViewWhiskey.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#1e1813] via-[#14100d] to-[#0a0806] p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-500">
                  <Wine className="w-8 h-8" />
                </div>
                <span className="font-serif font-bold text-amber-200/90 text-base tracking-wider uppercase">
                  {quickViewWhiskey.distillery}
                </span>
                <span className="text-xs text-[#a39382] font-mono mt-1">
                  {quickViewWhiskey.age > 0 ? `${quickViewWhiskey.age} Year Old Single Malt` : 'Speyside Malt'}
                </span>
              </div>
            )}
            {quickViewWhiskey.badge && (
              <span className="absolute top-3 left-3 bg-amber-500 text-black font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow">
                {quickViewWhiskey.badge}
              </span>
            )}
          </div>

          {/* Bottle Specs & Tasting Breakdown */}
          <div className="md:col-span-7 space-y-4">
            
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-500 font-mono mb-1">
                <span>{quickViewWhiskey.distillery}</span>
                <span>•</span>
                <span>{quickViewWhiskey.region}, {quickViewWhiskey.country}</span>
              </div>
              <h2 className="font-serif font-bold text-2xl text-[#f8f3ed]">
                {quickViewWhiskey.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-amber-400 mt-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold">{quickViewWhiskey.rating}</span>
                <span className="text-[#8c7e70]">({quickViewWhiskey.reviewsCount} EU Sommelier Reviews)</span>
              </div>
            </div>

            <div className="text-2xl font-serif font-bold text-amber-400">
              €{quickViewWhiskey.price.toFixed(2)}{' '}
              <span className="text-xs font-sans text-[#8c7e70]">({quickViewWhiskey.volumeMl}ml • {quickViewWhiskey.abv}% ABV)</span>
            </div>

            <p className="text-xs text-[#b8a99a] leading-relaxed font-light">
              {quickViewWhiskey.description}
            </p>

            {/* Tasting Notes Box */}
            <div className="bg-[#18130f] p-3.5 rounded-xl border border-[#2b221a] space-y-2 text-xs">
              <h4 className="font-bold text-amber-400 font-serif">Sommelier Tasting Notes</h4>
              <div>
                <strong className="text-[#f5f0ea]">Nose:</strong> <span className="text-[#b0a090]">{quickViewWhiskey.tastingNotes.nose}</span>
              </div>
              <div>
                <strong className="text-[#f5f0ea]">Palate:</strong> <span className="text-[#b0a090]">{quickViewWhiskey.tastingNotes.palate}</span>
              </div>
              <div>
                <strong className="text-[#f5f0ea]">Finish:</strong> <span className="text-[#b0a090]">{quickViewWhiskey.tastingNotes.finish}</span>
              </div>
            </div>

            {/* Flavor Profile Sliders */}
            <div className="space-y-2 text-xs pt-1">
              <h4 className="font-bold text-[#f5f0ea]">Sensory Flavor Wheel Profile</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-[#a39382]">
                <div>
                  <div className="flex justify-between">
                    <span>Peat & Smoke</span>
                    <span className="text-amber-400 font-bold">{fp.peatedSmoky}/10</span>
                  </div>
                  <div className="w-full bg-[#100d0a] h-1.5 rounded-full overflow-hidden border border-[#29221b]">
                    <div className="bg-amber-600 h-full" style={{ width: `${fp.peatedSmoky * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Sherry Sweetness</span>
                    <span className="text-amber-400 font-bold">{fp.sherrySweet}/10</span>
                  </div>
                  <div className="w-full bg-[#100d0a] h-1.5 rounded-full overflow-hidden border border-[#29221b]">
                    <div className="bg-amber-600 h-full" style={{ width: `${fp.sherrySweet * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Fruit & Floral</span>
                    <span className="text-amber-400 font-bold">{fp.fruityFloral}/10</span>
                  </div>
                  <div className="w-full bg-[#100d0a] h-1.5 rounded-full overflow-hidden border border-[#29221b]">
                    <div className="bg-amber-600 h-full" style={{ width: `${fp.fruityFloral * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Oak & Spice</span>
                    <span className="text-amber-400 font-bold">{fp.oakSpicy}/10</span>
                  </div>
                  <div className="w-full bg-[#100d0a] h-1.5 rounded-full overflow-hidden border border-[#29221b]">
                    <div className="bg-amber-600 h-full" style={{ width: `${fp.oakSpicy * 10}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Laser Engraving Input */}
            <div className="pt-2">
              <label className="block text-xs text-[#a39382] mb-1 font-semibold">
                Optional Laser Engraving on Wooden Box (Free for Cask Club Members)
              </label>
              <input
                type="text"
                placeholder="e.g. 'To Alexander, Happy 50th Birthday'"
                value={engravingText}
                maxLength={35}
                onChange={(e) => setEngravingText(e.target.value)}
                className="w-full bg-[#100d0a] border border-[#332920] rounded p-2 text-xs text-[#f5f0ea] focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Add to Cart Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-[#261f18]">
              <div className="flex items-center border border-[#332920] rounded bg-[#100d0a]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-xs text-[#a39382] hover:text-amber-400"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-xs text-[#a39382] hover:text-amber-400"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md font-bold text-xs transition-all cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 hover:bg-amber-500 text-black shadow-lg'
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (€{(quickViewWhiskey.price * quantity).toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
