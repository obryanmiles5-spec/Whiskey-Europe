'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { Wine, ShieldCheck, AlertCircle } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function AgeVerificationModal() {
  const { isAgeVerified, verifyAge } = useCart();
  const [underageError, setUnderageError] = useState(false);
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isMounted || isAgeVerified) return null;

  const handleUnderageClick = () => {
    setUnderageError(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0a0806]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
      <div className="max-w-md w-full bg-[#14100c] border border-amber-900/60 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-6 relative text-[#f5f0ea]">
        
        {/* Logo Emblem */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-950 p-0.5 shadow-xl mx-auto flex items-center justify-center">
          <div className="w-full h-full bg-[#0f0d0b] rounded-full flex items-center justify-center text-amber-500">
            <Wine className="w-8 h-8" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono text-amber-400 tracking-widest uppercase bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            EU ALCOHOL COMPLIANCE DIRECTIVE
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#f8f3ed]">
            Welcome to Whiskey Europe
          </h2>
          <p className="text-xs text-[#b8a99a] leading-relaxed font-light">
            You must be of legal drinking age in your country of residence to enter our European bonded cellars.
          </p>
        </div>

        {underageError ? (
          <div className="p-4 bg-red-950/80 border border-red-800 rounded-xl text-red-200 text-xs space-y-2">
            <AlertCircle className="w-6 h-6 text-red-400 mx-auto" />
            <p className="font-bold">Access Denied</p>
            <p>You must be at least 18 years old to view or purchase alcoholic spirits on whiskeyeurope.org.</p>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <button
              onClick={verifyAge}
              className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold text-sm py-3.5 rounded-lg shadow-xl cursor-pointer transition-transform transform hover:-translate-y-0.5"
            >
              I am 18 Years of Age or Older
            </button>

            <button
              onClick={handleUnderageClick}
              className="w-full bg-[#1b1612] hover:bg-[#261f1a] text-[#8c7e70] hover:text-[#c4b6a7] font-semibold text-xs py-3 rounded-lg border border-[#2b221a] cursor-pointer"
            >
              I am Under 18
            </button>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#786c60] pt-2 border-t border-[#261f18]">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          <span>Verified EU Bonded Spirits Store • domain: whiskeyeurope.org</span>
        </div>

      </div>
    </div>
  );
}
