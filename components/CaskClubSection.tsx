'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Award, Sparkles, CheckCircle2, Ticket, Shield, Gift, ArrowRight } from 'lucide-react';
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
    if (points >= 2000) return { name: 'Master Distiller Tier', color: 'text-amber-400', bg: 'bg-amber-950/80 border-amber-500' };
    if (points >= 500) return { name: 'Amber Cask Tier', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-700' };
    return { name: 'Copper Cask Tier', color: 'text-orange-400', bg: 'bg-orange-950/50 border-orange-700' };
  };

  const currentTier = getTier(caskPoints);

  return (
    <section className="py-16 bg-[#0c0907] border-b border-[#241d17] relative overflow-hidden" id="cask-club">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 space-y-8">
        
        {/* Prominent High-Visibility Hero Cover Banner */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] rounded-2xl overflow-hidden border-2 border-amber-600/60 shadow-2xl shadow-black/80">
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
          {/* Subtle gradient vignette to keep text ultra-readable while keeping the photo clearly seen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />

          {/* Banner Overlaid Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/90 border border-amber-500/70 text-amber-300 text-xs font-mono uppercase tracking-wider backdrop-blur-md shadow-lg">
                <Award className="w-4 h-4 text-amber-400" />
                <span>EXCLUSIVELY FOR CONNOISSEURS</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
                The Cask & Club Loyalty Program
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed drop-shadow max-w-xl">
                Earn 10 Cask Points for every €1 spent on rare single malts. Unlock private distillery allocations, early cask drop access, and instant reward vouchers across Europe.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-black/80 border border-amber-500/60 rounded-xl px-5 py-3.5 backdrop-blur-md text-right shadow-xl">
                <span className="text-[11px] text-amber-200/90 uppercase tracking-wider block font-mono">Your Balance</span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 flex items-center justify-end gap-1.5">
                  {caskPoints} PTS
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loyalty Program Grid: Tiers & Vouchers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Current Status & Member Privileges */}
          <div className="lg:col-span-6 bg-[#140f0c] border border-amber-900/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#2b221a] pb-4">
                <div>
                  <span className="text-xs text-[#a39382]">Current Membership Tier</span>
                  <h3 className="text-xl font-serif font-bold text-[#f8f3ed] flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    <span>{currentTier.name}</span>
                  </h3>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentTier.bg} ${currentTier.color}`}>
                  Active Tier
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#a89786]">
                  <span>Tier Threshold: Master Distiller (2,000 PTS)</span>
                  <span className="font-mono font-semibold text-amber-400">{Math.min(100, Math.round((caskPoints / 2000) * 100))}%</span>
                </div>
                <div className="w-full bg-[#0d0a08] h-2.5 rounded-full overflow-hidden border border-[#2b221a]">
                  <div
                    className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.round((caskPoints / 2000) * 100))}%` }}
                  />
                </div>
              </div>

              {redeemedMsg && (
                <p className="text-xs text-amber-300 font-semibold bg-amber-950/90 p-3 rounded-lg border border-amber-600 text-center animate-fadeIn">
                  {redeemedMsg}
                </p>
              )}
            </div>

            {/* Member Benefits List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">Exclusive Tier Privileges</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#dcd0c3]">
                <div className="flex items-center gap-2.5 p-2.5 bg-[#1a1410] border border-[#2e241c] rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Early Access to Rare Casks</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-[#1a1410] border border-[#2e241c] rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Free Bottle Engraving</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-[#1a1410] border border-[#2e241c] rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sommelier Tasting Invites</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-[#1a1410] border border-[#2e241c] rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Annual Birthday Vouchers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reward Vouchers Redemption */}
          <div className="lg:col-span-6 bg-[#140f0c] border border-amber-900/50 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#2b221a] pb-4">
                <h3 className="font-serif font-bold text-xl text-[#f8f3ed] flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-amber-400" />
                  <span>Redeem Loyalty Vouchers</span>
                </h3>
                <span className="text-xs font-mono text-amber-400/90">Instant Cart Deduction</span>
              </div>

              <div className="space-y-3 pt-4">
                
                {/* Reward Option 1 */}
                <div className="p-4 rounded-xl bg-[#1a1410] border border-[#2e241c] hover:border-amber-700/50 transition-colors flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-[#f8f3ed]">€15 Off Any Order</h4>
                    <p className="text-xs text-[#9c8e80]">Costs 500 Cask Points</p>
                  </div>
                  <button
                    onClick={() => handleRedeem(500)}
                    disabled={caskPoints < 500}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:from-[#231d17] disabled:to-[#231d17] disabled:text-[#6e6256] text-black font-bold text-xs transition-all cursor-pointer shadow-md"
                  >
                    Redeem (500 PTS)
                  </button>
                </div>

                {/* Reward Option 2 */}
                <div className="p-4 rounded-xl bg-[#1a1410] border border-[#2e241c] hover:border-amber-700/50 transition-colors flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-[#f8f3ed]">15% Off Member Discount</h4>
                    <p className="text-xs text-[#9c8e80]">Costs 1,000 Cask Points</p>
                  </div>
                  <button
                    onClick={() => handleRedeem(1000)}
                    disabled={caskPoints < 1000}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:from-[#231d17] disabled:to-[#231d17] disabled:text-[#6e6256] text-black font-bold text-xs transition-all cursor-pointer shadow-md"
                  >
                    Redeem (1,000 PTS)
                  </button>
                </div>

                {/* Reward Option 3 */}
                <div className="p-4 rounded-xl bg-[#1a1410] border border-[#2e241c] hover:border-amber-700/50 transition-colors flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-[#f8f3ed]">Free Insured EU Express Shipping</h4>
                    <p className="text-xs text-[#9c8e80]">Costs 1,500 Cask Points</p>
                  </div>
                  <button
                    onClick={() => handleRedeem(1500)}
                    disabled={caskPoints < 1500}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:from-[#231d17] disabled:to-[#231d17] disabled:text-[#6e6256] text-black font-bold text-xs transition-all cursor-pointer shadow-md"
                  >
                    Redeem (1,500 PTS)
                  </button>
                </div>

              </div>
            </div>

            {appliedCoupon && (
              <div className="pt-3 text-xs text-emerald-400 font-mono text-center bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/60">
                Active Cart Voucher: <strong>{appliedCoupon}</strong>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
