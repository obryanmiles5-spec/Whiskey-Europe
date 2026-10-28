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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="max-w-md w-full bg-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-6 relative text-black">
        
        {/* Logo Emblem */}
        <div className="w-16 h-16 rounded-full bg-black p-0.5 shadow-xl mx-auto flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-black border-2 border-black">
            <Wine className="w-8 h-8" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono text-white tracking-widest uppercase bg-black px-3 py-1 rounded-full font-bold">
            EU ALCOHOL COMPLIANCE DIRECTIVE
          </span>
          <h2 className="font-serif text-3xl font-black text-black pt-1">
            Welcome to Whiskey Europe
          </h2>
          <p className="text-xs text-zinc-600 leading-relaxed font-medium">
            You must be of legal drinking age in your country of residence to enter our European bonded cellars.
          </p>
        </div>

        {underageError ? (
          <div className="p-4 bg-zinc-100 border-2 border-black rounded-xl text-black text-xs space-y-2">
            <AlertCircle className="w-6 h-6 text-black mx-auto" />
            <p className="font-black uppercase tracking-wider">Access Denied</p>
            <p className="font-medium">You must be at least 18 years old to view or purchase alcoholic spirits on whiskeyeurope.org.</p>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <button
              onClick={verifyAge}
              className="w-full bg-black hover:bg-zinc-800 text-white font-black text-xs sm:text-sm py-3.5 rounded-full shadow-lg cursor-pointer transition-transform transform hover:-translate-y-0.5 uppercase tracking-wider border-2 border-black"
            >
              I am 18 Years of Age or Older
            </button>

            <button
              onClick={handleUnderageClick}
              className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black font-bold text-xs py-3 rounded-full border border-zinc-300 cursor-pointer uppercase tracking-wider"
            >
              I am Under 18
            </button>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 pt-2 border-t border-zinc-200 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-black" />
          <span>Verified EU Bonded Spirits Store • domain: whiskeyeurope.org</span>
        </div>

      </div>
    </div>
  );
}
