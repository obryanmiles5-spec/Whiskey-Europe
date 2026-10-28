'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Award, Sparkles, CheckCircle2, Ticket, Shield } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CaskClubSection() {
  const { caskPoints, redeemPoints, appliedCoupon } = useCart();
  const [redeemedMsg, setRedeemedMsg] = useState('');

  const COVER_IMAGE = 'https://lh3.googleusercontent.com/d/14NFBkkTb5e6C7rPhJ3ixJDsJxVPU5Jyr';

  const handleRedeem = (pts: number) => {
    if (caskPoints >= pts) {
      redeemPoints(pts);
      setRedeemedMsg(`Successfully redeemed ${pts} points! Voucher applied to your cart drawer.`);
      setTimeout(() => setRedeemedMsg(''), 4000);
    } else {
      setRedeemedMsg(`You need ${pts - caskPoints} more points to unlock this reward.`);
      setTimeout(() => setRedeemedMsg(''), 4000);
    }
  };

  const getTier = (points: number) => {
    if (points >= 2000) return { name: 'Master Distiller Tier', color: 'text-white', bg: 'bg-black border-black' };
    if (points >= 500) return { name: 'Amber Cask Tier', color: 'text-white', bg: 'bg-zinc-900 border-zinc-900' };
    return { name: 'Copper Cask Tier', color: 'text-black', bg: 'bg-zinc-200 border-zinc-300' };
  };

  const currentTier = getTier(caskPoints);

  return (
    <section className="py-16 bg-zinc-50 border-b border-black/10 relative overflow-hidden" id="cask-club">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 space-y-8">
        
        {/* Prominent High-Visibility Hero Cover Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] rounded-2xl overflow-hidden border-2 border-black shadow-2xl">
          <Image
            src={COVER_IMAGE}
            alt="The Cask & Club Loyalty Program Cover"
            fill
            priority
            unoptimized
            className="object-cover object-center"
            sizes="100vw"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />

          {/* Banner Overlaid Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider shadow-md font-bold">
                <Award className="w-4 h-4 text-black" />
                <span>EXCLUSIVELY FOR CONNOISSEURS</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
                The Cask &amp; Club Loyalty Program
              </h2>
              <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed max-w-xl">
                Earn 10 Cask Points for every €1 spent on rare single malts. Unlock private distillery allocations, early cask drop access, and instant reward vouchers across Europe.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-black/90 border-2 border-white rounded-xl px-5 py-3.5 backdrop-blur-md text-right shadow-2xl">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block font-mono font-bold">Your Balance</span>
                <span className="text-2xl sm:text-3xl font-serif font-black text-white flex items-center justify-end gap-1.5">
                  {caskPoints} PTS
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loyalty Program Grid: Tiers & Vouchers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Current Status & Member Privileges */}
          <div className="lg:col-span-6 bg-white border-2 border-black rounded-2xl p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div>
                  <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Current Membership Tier</span>
                  <h3 className="text-xl font-serif font-black text-black flex items-center gap-2 mt-0.5">
                    <Shield className="w-5 h-5 text-black" />
                    <span>{currentTier.name}</span>
                  </h3>
                </div>
                <span className={`text-xs font-black px-3 py-1 rounded-full border ${currentTier.bg} ${currentTier.color} uppercase tracking-wider`}>
                  Active Tier
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-zinc-600 font-bold">
                  <span>Tier Threshold: Master Distiller (2,000 PTS)</span>
                  <span className="font-mono font-black text-black">{Math.min(100, Math.round((caskPoints / 2000) * 100))}%</span>
                </div>
                <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden border border-zinc-300">
                  <div
                    className="bg-black h-full transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((caskPoints / 2000) * 100))}%` }}
                  />
                </div>
              </div>

              {redeemedMsg && (
                <p className="text-xs text-black font-bold bg-zinc-100 p-3 rounded-lg border-2 border-black text-center animate-fadeIn">
                  {redeemedMsg}
                </p>
              )}
            </div>

            {/* Member Benefits List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-black font-black">Exclusive Tier Privileges</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-black font-semibold">
                <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  <span>Early Access to Rare Casks</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  <span>Free Bottle Engraving</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  <span>Sommelier Tasting Invites</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  <span>Annual Birthday Vouchers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reward Vouchers Redemption */}
          <div className="lg:col-span-6 bg-white border-2 border-black rounded-2xl p-6 sm:p-8 space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <h3 className="font-serif font-black text-xl text-black flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-black" />
                  <span>Redeem Loyalty Vouchers</span>
                </h3>
                <span className="text-xs font-mono text-zinc-500 font-bold">Instant Cart Deduction</span>
              </div>

              <div className="space-y-3 pt-4">
                
                {/* Reward Option 1 */}
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-300 hover:border-black transition-colors flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-black text-sm text-black">€15 Off Any Order</h4>
                    <p className="text-xs text-zinc-600 font-medium">Costs 500 Cask Points</p>
                  </div>
                  <button
                    onClick={() => handleRedeem(500)}
                    disabled={caskPoints < 500}
                    className="px-4 py-2.5 rounded-lg bg-black hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-500 text-white font-black text-xs transition-all cursor-pointer shadow-xs border border-black uppercase tracking-wider"
                  >
                    Redeem (500 PTS)
                  </button>
                </div>

                {/* Reward Option 2 */}
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-300 hover:border-black transition-colors flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-black text-sm text-black">15% Off Member Discount</h4>
                    <p className="text-xs text-zinc-600 font-medium">Costs 1,000 Cask Points</p>
                  </div>
                  <button
                    onClick={() => handleRedeem(1000)}
                    disabled={caskPoints < 1000}
                    className="px-4 py-2.5 rounded-lg bg-black hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-500 text-white font-black text-xs transition-all cursor-pointer shadow-xs border border-black uppercase tracking-wider"
                  >
                    Redeem (1,000 PTS)
                  </button>
                </div>

                {/* Reward Option 3 */}
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-300 hover:border-black transition-colors flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-black text-sm text-black">Free Insured EU Express Shipping</h4>
                    <p className="text-xs text-zinc-600 font-medium">Costs 1,500 Cask Points</p>
                  </div>
                  <button
                    onClick={() => handleRedeem(1500)}
                    disabled={caskPoints < 1500}
                    className="px-4 py-2.5 rounded-lg bg-black hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-500 text-white font-black text-xs transition-all cursor-pointer shadow-xs border border-black uppercase tracking-wider"
                  >
                    Redeem (1,500 PTS)
                  </button>
                </div>

              </div>
            </div>

            {appliedCoupon && (
              <div className="pt-3 text-xs text-black font-mono font-bold text-center bg-zinc-100 p-2.5 rounded-lg border-2 border-black">
                Active Cart Voucher: <strong>{appliedCoupon}</strong>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
