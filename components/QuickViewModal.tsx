'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Star, ShoppingBag, CheckCircle2, Wine } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border-2 border-black rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative text-black my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewWhiskey(null)}
          className="absolute top-4 right-4 text-black hover:bg-zinc-100 p-2 rounded-full z-10 cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Bottle Image */}
          <div className="md:col-span-5 relative h-72 md:h-96 w-full rounded-xl overflow-hidden bg-zinc-100 border-2 border-black">
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
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-4 text-white">
                  <Wine className="w-8 h-8" />
                </div>
                <span className="font-serif font-black text-black text-base tracking-wider uppercase">
                  {quickViewWhiskey.distillery}
                </span>
                <span className="text-xs text-zinc-600 font-mono mt-1 font-semibold">
                  {quickViewWhiskey.age > 0 ? `${quickViewWhiskey.age} Year Old Single Malt` : 'Speyside Malt'}
                </span>
              </div>
            )}
            {quickViewWhiskey.badge && (
              <span className="absolute top-3 left-3 bg-black text-white font-black text-[10px] uppercase px-2.5 py-1 rounded shadow-md border border-black">
                {quickViewWhiskey.badge}
              </span>
            )}
          </div>

          {/* Bottle Specs & Tasting Breakdown */}
          <div className="md:col-span-7 space-y-4">
            
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono font-bold uppercase mb-1">
                <span>{quickViewWhiskey.distillery}</span>
                <span>•</span>
                <span>{quickViewWhiskey.region}, {quickViewWhiskey.country}</span>
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-black">
                {quickViewWhiskey.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-black mt-1">
                <Star className="w-4 h-4 fill-black text-black" />
                <span className="font-black">{quickViewWhiskey.rating}</span>
                <span className="text-zinc-500 font-medium">({quickViewWhiskey.reviewsCount} EU Sommelier Reviews)</span>
              </div>
            </div>

            <div className="text-2xl font-serif font-black text-black">
              €{quickViewWhiskey.price.toFixed(2)}{' '}
              <span className="text-xs font-sans text-zinc-500 font-medium">({quickViewWhiskey.volumeMl}ml • {quickViewWhiskey.abv}% ABV)</span>
            </div>

            <p className="text-xs text-zinc-700 leading-relaxed font-medium">
              {quickViewWhiskey.description}
            </p>

            {/* Tasting Notes Box */}
            <div className="bg-zinc-50 p-3.5 rounded-xl border-2 border-black space-y-2 text-xs">
              <h4 className="font-black text-black font-serif uppercase tracking-wider">Sommelier Tasting Notes</h4>
              <div>
                <strong className="text-black">Nose:</strong> <span className="text-zinc-700">{quickViewWhiskey.tastingNotes.nose}</span>
              </div>
              <div>
                <strong className="text-black">Palate:</strong> <span className="text-zinc-700">{quickViewWhiskey.tastingNotes.palate}</span>
              </div>
              <div>
                <strong className="text-black">Finish:</strong> <span className="text-zinc-700">{quickViewWhiskey.tastingNotes.finish}</span>
              </div>
            </div>

            {/* Flavor Profile Sliders */}
            <div className="space-y-2 text-xs pt-1">
              <h4 className="font-black text-black uppercase tracking-wider">Sensory Flavor Wheel Profile</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-zinc-700 font-bold">
                <div>
                  <div className="flex justify-between">
                    <span>Peat &amp; Smoke</span>
                    <span className="text-black font-black">{fp.peatedSmoky}/10</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden border border-zinc-300">
                    <div className="bg-black h-full" style={{ width: `${fp.peatedSmoky * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Sherry Sweetness</span>
                    <span className="text-black font-black">{fp.sherrySweet}/10</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden border border-zinc-300">
                    <div className="bg-black h-full" style={{ width: `${fp.sherrySweet * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Fruit &amp; Floral</span>
                    <span className="text-black font-black">{fp.fruityFloral}/10</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden border border-zinc-300">
                    <div className="bg-black h-full" style={{ width: `${fp.fruityFloral * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Oak &amp; Spice</span>
                    <span className="text-black font-black">{fp.oakSpicy}/10</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden border border-zinc-300">
                    <div className="bg-black h-full" style={{ width: `${fp.oakSpicy * 10}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Laser Engraving Input */}
            <div className="pt-2">
              <label className="block text-xs text-zinc-700 mb-1 font-bold">
                Optional Laser Engraving on Wooden Box (Free for Cask Club Members)
              </label>
              <input
                type="text"
                placeholder="e.g. 'To Alexander, Happy 50th Birthday'"
                value={engravingText}
                maxLength={35}
                onChange={(e) => setEngravingText(e.target.value)}
                className="w-full bg-white border-2 border-black rounded p-2 text-xs text-black focus:outline-none"
              />
            </div>

            {/* Add to Cart Actions */}
            <div className="flex items-center gap-3 pt-3 border-t-2 border-black">
              <div className="flex items-center border-2 border-black rounded bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-xs text-black font-bold hover:bg-zinc-100 cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-xs text-black font-bold hover:bg-zinc-100 cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-full font-black text-xs uppercase tracking-wider transition-all cursor-pointer border-2 border-black shadow-md ${
                  added
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-black hover:bg-zinc-800 text-white'
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
