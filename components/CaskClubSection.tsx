'use client';

import React, { useState } from 'react';
import { Award, Gift, Sparkles, Shield, ChevronRight, CheckCircle2, Ticket } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CaskClubSection() {
  const { caskPoints, earnPoints, redeemPoints, appliedCoupon } = useCart();
  const [redeemedMsg, setRedeemedMsg] = useState('');

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
    if (points >= 2000) return { name: 'Master Distiller Tier', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-600' };
    if (points >= 500) return { name: 'Amber Cask Tier', color: 'text-amber-500', bg: 'bg-amber-950/40 border-amber-800' };
    return { name: 'Copper Cask Tier', color: 'text-orange-400', bg: 'bg-orange-950/30 border-orange-800' };
  };

  const currentTier = getTier(caskPoints);

  return (
    <section className="py-16 bg-[#0e0b09] border-b border-[#241d17]" id="cask-club">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-[#1c1611] via-[#15110d] to-[#0e0b09] border border-amber-900/50 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Info & Status */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#241d16] border border-amber-800/60 text-amber-400 text-xs font-mono uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>EXCLUSIVELY FOR CONNOISSEURS</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f8f3ed]">
                  The Cask & Club Loyalty Program
                </h2>
                <p className="text-sm text-[#c2b2a3] font-light leading-relaxed">
                  Earn 10 Cask Points for every €1 spent on rare single malts. Unlock private distillery allocations, early cask drop access, and instant reward vouchers across Europe.
                </p>
              </div>

              {/* User Points Card */}
              <div className={`p-5 rounded-xl border ${currentTier.bg} space-y-3`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#a39382]">Your Current Balance</span>
                    <div className="text-3xl font-serif font-bold text-amber-400 flex items-center gap-2">
                      <span>{caskPoints} Points</span>
                      <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentTier.bg} ${currentTier.color}`}>
                    {currentTier.name}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#8c7e70]">
                    <span>Next Tier: Master Distiller (2,000 PTS)</span>
                    <span>{Math.min(100, Math.round((caskPoints / 2000) * 100))}%</span>
                  </div>
                  <div className="w-full bg-[#120e0b] h-2 rounded-full overflow-hidden border border-[#2b221a]">
                    <div
                      className="bg-gradient-to-r from-amber-600 to-amber-400 h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round((caskPoints / 2000) * 100))}%` }}
                    />
                  </div>
                </div>

                {redeemedMsg && (
                  <p className="text-xs text-amber-300 font-semibold bg-amber-950/80 p-2 rounded border border-amber-800 text-center animate-fadeIn">
                    {redeemedMsg}
                  </p>
                )}
              </div>

              {/* Member Benefits List */}
              <div className="grid grid-cols-2 gap-3 text-xs text-[#b8a99a]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Early Access to Rare Casks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Free Bottle Engraving</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Sommelier Masterclass Invites</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Birthday Bottle Vouchers</span>
                </div>
              </div>

            </div>

            {/* Right Column: Reward Vouchers Redemption */}
            <div className="lg:col-span-6 bg-[#120e0b] border border-[#2e261f] p-6 rounded-xl space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#f5f0ea] flex items-center gap-2 border-b border-[#241d17] pb-3">
                <Ticket className="w-5 h-5 text-amber-500" />
                <span>Redeem Reward Vouchers</span>
              </h3>

              <div className="space-y-3">
                
                {/* Reward Option 1 */}
                <div className="p-3.5 rounded-lg bg-[#18130f] border border-[#2b221a] flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-[#f5f0ea]">€15 Off Any Order</h4>
                    <p className="text-xs text-[#8c7e70]">Redeem 500 Cask Points</p>
                  </div>
                  <button
                    onClick={() => handleRedeem(500)}
                    disabled={caskPoints < 500}
                    className="px-3.5 py-1.5 rounded bg-amber-600 hover:bg-amber-500 disabled:bg-[#231d17] disabled:text-[#6e6256] text-black font-bold text-xs transition-all cursor-pointer"
                  >
                    Redeem (500 PTS)
                  </button>
                </div>

                {/* Reward Option 2 */}
                <div className="p-3.5 rounded-lg bg-[#18130f] border border-[#2b221a] flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-[#f5f0ea]">15% Off Member Discount Voucher</h4>
                    <p className="text-xs text-[#8c7e70]">Redeem 1,000 Cask Points</p>
                  </div>
                  <button
                    onClick={() => handleRedeem(1000)}
                    disabled={caskPoints < 1000}
                    className="px-3.5 py-1.5 rounded bg-amber-600 hover:bg-amber-500 disabled:bg-[#231d17] disabled:text-[#6e6256] text-black font-bold text-xs transition-all cursor-pointer"
                  >
                    Redeem (1,000 PTS)
                  </button>
                </div>

                {/* Reward Option 3 */}
                <div className="p-3.5 rounded-lg bg-[#18130f] border border-[#2b221a] flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-[#f5f0ea]">Free Insured EU Express Shipping</h4>
                    <p className="text-xs text-[#8c7e70]">Redeem 1,500 Cask Points</p>
                  </div>
                  <button
                    onClick={() => handleRedeem(1500)}
                    disabled={caskPoints < 1500}
                    className="px-3.5 py-1.5 rounded bg-amber-600 hover:bg-amber-500 disabled:bg-[#231d17] disabled:text-[#6e6256] text-black font-bold text-xs transition-all cursor-pointer"
                  >
                    Redeem (1,500 PTS)
                  </button>
                </div>

              </div>

              {appliedCoupon && (
                <div className="pt-2 text-xs text-emerald-400 font-mono text-center">
                  Active Voucher: <strong>{appliedCoupon}</strong>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
