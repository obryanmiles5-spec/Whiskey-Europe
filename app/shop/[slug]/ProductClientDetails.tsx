'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Whiskey } from '@/lib/whiskeys';
import { useCart } from '@/lib/cart-context';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Star, 
  Wine, 
  Shield, 
  Truck, 
  Flame, 
  Award, 
  Heart, 
  Share2, 
  Sparkles,
  Minus,
  Plus,
  Lock,
  RotateCcw
} from 'lucide-react';

interface ProductClientDetailsProps {
  whiskey: Whiskey;
}

export default function ProductClientDetails({ whiskey }: ProductClientDetailsProps) {
  const { addToCart, setIsCartOpen, setIsCheckoutOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart(whiskey, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    addToCart(whiskey, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${whiskey.name} | Whiskey Europe`,
          text: `Explore ${whiskey.name} from ${whiskey.distillery} on Whiskey Europe.`,
          url: window.location.href,
        });
      } catch {
        // Fallback to clipboard
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Left Column: Image & Authenticity Guarantee Badges */}
      <div className="lg:col-span-6 space-y-4">
        <div className="relative h-[380px] sm:h-[500px] w-full bg-zinc-50 border-2 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-4">
          {whiskey.image && !imageError ? (
            <Image
              src={whiskey.image}
              alt={whiskey.name}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center p-4 sm:p-6"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-white shadow-md">
                <Wine className="w-10 h-10" />
              </div>
              <span className="font-serif font-black text-black text-lg uppercase tracking-wider">
                {whiskey.distillery}
              </span>
              <p className="text-xs text-zinc-600 font-mono font-bold">
                {whiskey.age > 0 ? `${whiskey.age} Year Old` : 'Prestige Release'} • {whiskey.volumeMl}ml
              </p>
            </div>
          )}

          {/* Badge overlays */}
          {whiskey.badge && (
            <div className="absolute top-4 left-4 bg-black text-white font-black text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-md border border-black">
              {whiskey.badge}
            </div>
          )}

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="bg-white hover:bg-zinc-100 text-black p-2.5 rounded-full shadow-md transition-all cursor-pointer border-2 border-black"
              title="Share Bottle Link"
              aria-label="Share Bottle Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {copiedLink && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-mono font-bold px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white">
              Link Copied to Clipboard!
            </div>
          )}
        </div>

        {/* Security & Authenticity Trust Bar */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border-2 border-black p-3 rounded-xl flex items-center gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Shield className="w-5 h-5 text-black shrink-0" />
            <div>
              <p className="text-[11px] font-black text-black">100% Authentic</p>
              <p className="text-[9px] text-zinc-600 font-semibold">Bonded Verified</p>
            </div>
          </div>
          <div className="bg-white border-2 border-black p-3 rounded-xl flex items-center gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Truck className="w-5 h-5 text-black shrink-0" />
            <div>
              <p className="text-[11px] font-black text-black">Insured Transit</p>
              <p className="text-[9px] text-zinc-600 font-semibold">27 EU States</p>
            </div>
          </div>
          <div className="bg-white border-2 border-black p-3 rounded-xl flex items-center gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <RotateCcw className="w-5 h-5 text-black shrink-0" />
            <div>
              <p className="text-[11px] font-black text-black">14-Day Returns</p>
              <p className="text-[9px] text-zinc-600 font-semibold">Seal Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Product Meta, Pricing, Purchase CTAs, Tasting Notes */}
      <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header Info */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest font-black">
                {whiskey.distillery} • {whiskey.region}
              </span>
              <div className="flex items-center gap-1.5 text-black text-xs">
                <Star className="w-4 h-4 fill-black text-black" />
                <span className="font-black">{whiskey.rating}</span>
                <span className="text-zinc-600 font-medium">({whiskey.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-black text-black leading-tight">
              {whiskey.name}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-700 font-mono font-bold">
              {whiskey.caskType} • {whiskey.abv}% ABV • {whiskey.volumeMl}ml
            </p>
          </div>

          {/* Pricing Block */}
          <div className="p-4 bg-zinc-50 border-2 border-black rounded-2xl flex items-center justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-black text-black">
                  €{whiskey.price.toFixed(2)}
                </span>
                {whiskey.originalPrice && (
                  <span className="text-sm sm:text-base text-zinc-500 line-through font-mono">
                    €{whiskey.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-600 mt-0.5 font-medium">
                Includes EU Spirits Excise Duty, VAT &amp; Customs Cleared
              </p>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-black bg-white border-2 border-black px-3 py-1 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                In Stock (Bonded Vault)
              </span>
            </div>
          </div>

          {/* Interactive Quantity & Cart Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white border-2 border-black rounded-xl p-1 text-sm shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg hover:bg-zinc-100 text-black flex items-center justify-center transition-colors cursor-pointer font-black"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-mono font-black text-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(12, q + 1))}
                  className="w-9 h-9 rounded-lg hover:bg-zinc-100 text-black flex items-center justify-center transition-colors cursor-pointer font-black"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-black text-sm uppercase tracking-wider transition-all cursor-pointer border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 ${
                  addedAnimation
                    ? 'bg-emerald-700 text-white border-black'
                    : 'bg-black hover:bg-zinc-800 text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart (€{(whiskey.price * quantity).toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-white hover:bg-zinc-100 text-black font-black py-3.5 px-6 rounded-xl border-2 border-black transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Lock className="w-4 h-4 text-black" />
              <span>Instant Encrypted Checkout</span>
            </button>
          </div>

          {/* Sommelier Tasting Notes Panel */}
          <div className="bg-zinc-50 border-2 border-black rounded-xl p-4 sm:p-5 space-y-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-serif font-black text-sm text-black uppercase tracking-wider flex items-center gap-2">
              <Wine className="w-4 h-4 text-black" />
              <span>Official Sommelier Tasting Notes</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex gap-2">
                <span className="font-mono text-black font-black w-14 shrink-0 uppercase">Nose:</span>
                <p className="text-zinc-800 font-medium leading-relaxed">{whiskey.tastingNotes.nose}</p>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-black font-black w-14 shrink-0 uppercase">Palate:</span>
                <p className="text-zinc-800 font-medium leading-relaxed">{whiskey.tastingNotes.palate}</p>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-black font-black w-14 shrink-0 uppercase">Finish:</span>
                <p className="text-zinc-800 font-medium leading-relaxed">{whiskey.tastingNotes.finish}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sommelier Pairing & Cellar Note */}
        <div className="p-3.5 bg-white border-2 border-black rounded-xl flex items-center gap-3 text-xs text-black font-medium shadow-xs">
          <Award className="w-5 h-5 text-black shrink-0" />
          <p>
            <strong className="font-black">Cellar Master Recommendation:</strong> Serve neat in a Glencairn glass at 18–20°C. Allow 1 minute of breathing per year of aging.
          </p>
        </div>
      </div>
    </div>
  );
}
