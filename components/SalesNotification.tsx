'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { WHISKEY_COLLECTION } from '@/lib/whiskeys';

interface SaleEvent {
  buyerLocation: string;
  flag: string;
  timeAgo: string;
  whiskeySlug: string;
}

const CITIES: { city: string; country: string; flag: string }[] = [
  { city: 'Munich', country: 'Germany', flag: '🇩🇪' },
  { city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { city: 'Paris', country: 'France', flag: '🇫🇷' },
  { city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱' },
  { city: 'Zurich', country: 'Switzerland', flag: '🇨🇭' },
  { city: 'Dublin', country: 'Ireland', flag: '🇮🇪' },
  { city: 'Vienna', country: 'Austria', flag: '🇦🇹' },
  { city: 'Stockholm', country: 'Sweden', flag: '🇸🇪' },
  { city: 'Milan', country: 'Italy', flag: '🇮🇹' },
  { city: 'Madrid', country: 'Spain', flag: '🇪🇸' },
  { city: 'Copenhagen', country: 'Denmark', flag: '🇩🇰' },
  { city: 'Brussels', country: 'Belgium', flag: '🇧🇪' },
  { city: 'Edinburgh', country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { city: 'Luxembourg', country: 'Luxembourg', flag: '🇱🇺' },
  { city: 'Frankfurt', country: 'Germany', flag: '🇩🇪' },
  { city: 'Rotterdam', country: 'Netherlands', flag: '🇳🇱' },
  { city: 'Geneva', country: 'Switzerland', flag: '🇨🇭' },
];

const TIME_AGO_OPTIONS = [
  'Just now',
  '1 min ago',
  '2 mins ago',
  '3 mins ago',
  '4 mins ago',
  '5 mins ago',
  '7 mins ago',
  '9 mins ago',
  '12 mins ago',
];

export default function SalesNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSale, setCurrentSale] = useState<SaleEvent | null>(null);

  // Pick high-demand, standout whiskies for realistic social proof
  const featuredWhiskeys = useMemo(() => {
    return WHISKEY_COLLECTION.filter(
      (w) => w.isFeatured || w.isRare || w.price >= 80
    );
  }, []);

  const getRandomSale = useCallback((): SaleEvent => {
    const randomWhiskey =
      featuredWhiskeys[Math.floor(Math.random() * featuredWhiskeys.length)] ||
      WHISKEY_COLLECTION[0];
    const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
    const randomTime =
      TIME_AGO_OPTIONS[Math.floor(Math.random() * TIME_AGO_OPTIONS.length)];

    return {
      buyerLocation: `${randomCity.city}, ${randomCity.country}`,
      flag: randomCity.flag,
      timeAgo: randomTime,
      whiskeySlug: randomWhiskey.slug,
    };
  }, [featuredWhiskeys]);

  useEffect(() => {
    if (isDismissed) return;

    const initialTimer = setTimeout(() => {
      setCurrentSale(getRandomSale());
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed, getRandomSale]);

  useEffect(() => {
    if (isDismissed) return;

    let intervalTimer: NodeJS.Timeout;

    if (isVisible && !isPaused) {
      intervalTimer = setTimeout(() => {
        setIsVisible(false);
      }, 6500);
    } else if (!isVisible && !isDismissed) {
      intervalTimer = setTimeout(() => {
        setCurrentSale(getRandomSale());
        setIsVisible(true);
      }, 10000);
    }

    return () => clearTimeout(intervalTimer);
  }, [isVisible, isPaused, isDismissed, getRandomSale]);

  const currentWhiskey = useMemo(() => {
    if (!currentSale) return null;
    return (
      WHISKEY_COLLECTION.find((w) => w.slug === currentSale.whiskeySlug) ||
      WHISKEY_COLLECTION[0]
    );
  }, [currentSale]);

  if (!currentWhiskey || isDismissed) {
    return null;
  }

  return (
    <div
      id="sales-notification-container"
      className="fixed bottom-5 left-5 z-40 max-w-[calc(100vw-2.5rem)] sm:max-w-sm pointer-events-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94, x: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.94, x: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white border-2 border-black rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl transition-colors duration-300"
          >
            <div className="flex items-start gap-3.5">
              {/* Product Thumbnail */}
              <Link
                href={`/shop/${currentWhiskey.slug}`}
                className="relative w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 bg-zinc-100 border border-black rounded-xl overflow-hidden group/thumb flex items-center justify-center p-1"
                aria-label={`View ${currentWhiskey.name}`}
              >
                <Image
                  src={currentWhiskey.image}
                  alt={currentWhiskey.name}
                  fill
                  sizes="80px"
                  className="object-contain p-1.5 transition-transform duration-300 group-hover/thumb:scale-110"
                  referrerPolicy="no-referrer"
                />
              </Link>

              {/* Sales Info */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-600 mb-0.5">
                  <span className="text-sm">{currentSale?.flag}</span>
                  <span className="truncate">
                    Someone in <strong className="text-black font-black">{currentSale?.buyerLocation}</strong>
                  </span>
                </div>

                <Link
                  href={`/shop/${currentWhiskey.slug}`}
                  className="block font-serif text-xs sm:text-sm font-bold text-black hover:underline line-clamp-1 transition-colors leading-snug"
                >
                  {currentWhiskey.name}
                </Link>

                <div className="flex items-center justify-between gap-2 mt-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-black">
                      €{currentWhiskey.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-semibold">• {currentSale?.timeAgo}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-white bg-black px-1.5 py-0.5 rounded-full border border-black">
                    <ShieldCheck className="w-3 h-3 text-white" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }}
                className="absolute top-2.5 right-2.5 p-1 text-black hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                title="Dismiss"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom mini link bar */}
            <div className="mt-2.5 pt-2 border-t border-zinc-200 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1 text-zinc-600 font-medium">
                <Sparkles className="w-3 h-3 text-black" />
                <span className="text-[10px]">Insured Bonded EU Dispatch</span>
              </div>
              <Link
                href={`/shop/${currentWhiskey.slug}`}
                className="inline-flex items-center gap-1 text-black font-black text-[11px] hover:underline uppercase tracking-wider"
              >
                <span>View allocation</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
