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
        <div className="relative h-[380px] sm:h-[500px] w-full bg-gradient-to-b from-[#1c1611] to-[#120e0b] border border-[#2e241b] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-4">
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
              <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Wine className="w-10 h-10" />
              </div>
              <span className="font-serif font-bold text-amber-200 text-lg uppercase tracking-wider">
                {whiskey.distillery}
              </span>
              <p className="text-xs text-[#a39382] font-mono">
                {whiskey.age > 0 ? `${whiskey.age} Year Old` : 'Prestige Release'} • {whiskey.volumeMl}ml
              </p>
            </div>
          )}

          {/* Badge overlays */}
          {whiskey.badge && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-amber-700 text-black font-extrabold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-lg backdrop-blur-sm">
              {whiskey.badge}
            </div>
          )}

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="bg-[#0f0d0b]/80 hover:bg-amber-600 text-[#d6c7b8] hover:text-black p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all cursor-pointer border border-[#30261e]"
              title="Share Bottle Link"
              aria-label="Share Bottle Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {copiedLink && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-xs font-mono px-3 py-1.5 rounded-full shadow-lg">
              Link Copied to Clipboard!
            </div>
          )}
        </div>

        {/* Security & Authenticity Trust Bar */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#16110d] border border-[#2c2219] p-3 rounded-xl flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-[#f5efe8]">100% Authentic</p>
              <p className="text-[9px] text-[#8e8072]">Bonded Origin Verified</p>
            </div>
          </div>
          <div className="bg-[#16110d] border border-[#2c2219] p-3 rounded-xl flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-[#f5efe8]">Insured Transit</p>
              <p className="text-[9px] text-[#8e8072]">27 EU States Covered</p>
            </div>
          </div>
          <div className="bg-[#16110d] border border-[#2c2219] p-3 rounded-xl flex items-center gap-2.5">
            <RotateCcw className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-[#f5efe8]">14-Day Returns</p>
              <p className="text-[9px] text-[#8e8072]">Cellar Seal Guaranteed</p>
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
              <span className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold">
                {whiskey.distillery} • {whiskey.region}
              </span>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold">{whiskey.rating}</span>
                <span className="text-[#786c60]">({whiskey.reviewsCount} collector reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#f8f3ed] leading-tight">
              {whiskey.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#b5a697] font-mono">
              {whiskey.caskType} • {whiskey.abv}% ABV • {whiskey.volumeMl}ml
            </p>
          </div>

          {/* Pricing Block */}
          <div className="p-4 bg-[#18130f] border border-[#2e241b] rounded-2xl flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-400">
                  €{whiskey.price.toFixed(2)}
                </span>
                {whiskey.originalPrice && (
                  <span className="text-sm sm:text-base text-[#7c6f62] line-through font-mono">
                    €{whiskey.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#8e8072] mt-0.5">
                Includes EU Spirits Excise Duty, VAT &amp; Customs Cleared
              </p>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                In Stock (Bonded Vault)
              </span>
            </div>
          </div>

          {/* Interactive Quantity & Cart Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-[#18130f] border border-[#33281e] rounded-xl p-1 text-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg hover:bg-[#251d16] text-[#c2b2a3] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-mono font-bold text-amber-400">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(12, q + 1))}
                  className="w-9 h-9 rounded-lg hover:bg-[#251d16] text-[#c2b2a3] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-lg ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black'
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
              className="w-full bg-[#201812] hover:bg-[#2c221a] text-amber-300 font-bold py-3 px-6 rounded-xl border border-amber-900/60 hover:border-amber-500/60 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Lock className="w-4 h-4 text-amber-500" />
              <span>Instant Encrypted Checkout</span>
            </button>
          </div>

          {/* Sommelier Tasting Notes Panel */}
          <div className="bg-[#15100c] border border-[#2b2118] rounded-xl p-4 sm:p-5 space-y-3">
            <h3 className="font-serif font-bold text-sm text-amber-200 uppercase tracking-wider flex items-center gap-2">
              <Wine className="w-4 h-4 text-amber-500" />
              <span>Official Sommelier Tasting Notes</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex gap-2">
                <span className="font-mono text-amber-400 font-bold w-14 shrink-0">Nose:</span>
                <p className="text-[#d1c2b4] leading-relaxed">{whiskey.tastingNotes.nose}</p>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-amber-400 font-bold w-14 shrink-0">Palate:</span>
                <p className="text-[#d1c2b4] leading-relaxed">{whiskey.tastingNotes.palate}</p>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-amber-400 font-bold w-14 shrink-0">Finish:</span>
                <p className="text-[#d1c2b4] leading-relaxed">{whiskey.tastingNotes.finish}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sommelier Pairing & Cellar Note */}
        <div className="p-3.5 bg-[#120e0b] border border-[#241a13] rounded-xl flex items-center gap-3 text-xs text-[#9d8d7e]">
          <Award className="w-5 h-5 text-amber-500 shrink-0" />
          <p>
            <strong className="text-amber-200">Cellar Master Recommendation:</strong> Serve neat in a Glencairn glass at 18–20°C. Allow 1 minute of breathing per year of aging.
          </p>
        </div>
      </div>
    </div>
  );
}
