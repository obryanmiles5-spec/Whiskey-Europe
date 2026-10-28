'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  variant?: 'dark' | 'light';
}

export default function BrandLogo({ size = 'md', showSubtitle = true, className = '', variant = 'light' }: BrandLogoProps) {
  const sizeClasses = {
    sm: { icon: 'w-8 h-8', title: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', title: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', title: 'text-2xl sm:text-3xl', sub: 'text-xs' },
  };

  const currentSize = sizeClasses[size];
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Luxury Royal European Crest Emblem */}
      <div className={`relative ${currentSize.icon} shrink-0 group`}>
        {/* Glow backdrop */}
        <div className="absolute -inset-0.5 bg-black rounded-full opacity-10 group-hover:opacity-20 transition duration-300" />
        
        {/* SVG Crest */}
        <svg
          viewBox="0 0 100 100"
          className="relative w-full h-full rounded-full shadow-md bg-black"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <radialGradient id="ringBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
          </defs>

          {/* Outer Ring */}
          <circle cx="50" cy="50" r="47" stroke="#ffffff" strokeWidth="2.5" fill="url(#ringBg)" />
          <circle cx="50" cy="50" r="42" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" fill="none" />

          {/* European Stars Ring (12 Stars) */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const cx = 50 + 38 * Math.cos(angle);
            const cy = 50 + 38 * Math.sin(angle);
            return (
              <polygon
                key={i}
                points={`${cx},${cy - 1.8} ${cx + 0.6},${cy - 0.5} ${cx + 1.8},${cy - 0.5} ${cx + 0.8},${cy + 0.3} ${cx + 1.2},${cy + 1.5} ${cx},${cy + 0.7} ${cx - 1.2},${cy + 1.5} ${cx - 0.8},${cy + 0.3} ${cx - 1.8},${cy - 0.5} ${cx - 0.6},${cy - 0.5}`}
                fill="#ffffff"
                opacity="0.9"
              />
            );
          })}

          {/* European Crown at top */}
          <path
            d="M 35 32 L 40 40 L 50 28 L 60 40 L 65 32 L 62 45 L 38 45 Z"
            fill="url(#goldGrad)"
          />
          <circle cx="35" cy="30" r="1.5" fill="#ffffff" />
          <circle cx="50" cy="26" r="2" fill="#ffffff" />
          <circle cx="65" cy="30" r="1.5" fill="#ffffff" />

          {/* Whiskey Cask Emblem / Pot Still Center */}
          <path
            d="M 38 48 C 36 58 36 68 38 74 L 62 74 C 64 68 64 58 62 48 Z"
            fill="#18181b"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          {/* Cask Hoops */}
          <line x1="37" y1="55" x2="63" y2="55" stroke="#f59e0b" strokeWidth="1.2" />
          <line x1="37.5" y1="67" x2="62.5" y2="67" stroke="#f59e0b" strokeWidth="1.2" />
          
          {/* Wheat / Laurel Sprigs flanking cask */}
          <path d="M 28 65 Q 26 50 34 42" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          <path d="M 72 65 Q 74 50 66 42" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* Monogram "W E" */}
          <text
            x="50"
            y="64"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10"
            fontWeight="bold"
            fontFamily="serif"
            letterSpacing="1"
          >
            W E
          </text>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className={`font-serif font-black tracking-widest uppercase flex items-center gap-1.5 ${isLight ? 'text-black' : 'text-white'} ${currentSize.title}`}>
          <span>WHISKEY</span>
          <span className={`${isLight ? 'bg-black text-white px-1.5 py-0.5 rounded text-[11px] font-sans font-bold tracking-wider' : 'bg-white text-black px-1.5 py-0.5 rounded text-[11px] font-sans font-bold tracking-wider'}`}>
            EUROPE
          </span>
        </div>

        {showSubtitle && (
          <span className={`tracking-[0.2em] ${isLight ? 'text-zinc-600 font-semibold' : 'text-zinc-400 font-semibold'} uppercase font-mono mt-0.5 ${currentSize.sub}`}>
            Premier Bonded House • Est. 1892
          </span>
        )}
      </div>
    </div>
  );
}
