'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Whiskey, WHISKEY_COLLECTION } from './whiskeys';

export interface CartItem {
  whiskey: Whiskey;
  quantity: number;
  engravingText?: string;
  insuranceAdded?: boolean;
}

export interface EUCountryShipping {
  code: string;
  name: string;
  flag: string;
  standardCost: number;
  expressCost: number;
  freeShippingThreshold: number;
  vatRate: number; // e.g. 0.19 for 19%
  estimatedDays: string;
}

export const EU_COUNTRIES: EUCountryShipping[] = [
  { code: 'DE', name: 'Germany', flag: '🇩🇪', standardCost: 9.90, expressCost: 19.90, freeShippingThreshold: 150, vatRate: 0.19, estimatedDays: '1-2 Days' },
  { code: 'FR', name: 'France', flag: '🇫🇷', standardCost: 12.90, expressCost: 22.90, freeShippingThreshold: 150, vatRate: 0.20, estimatedDays: '2-3 Days' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', standardCost: 9.90, expressCost: 18.90, freeShippingThreshold: 150, vatRate: 0.21, estimatedDays: '1-2 Days' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', standardCost: 14.90, expressCost: 24.90, freeShippingThreshold: 180, vatRate: 0.23, estimatedDays: '2-3 Days' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', standardCost: 14.90, expressCost: 24.90, freeShippingThreshold: 180, vatRate: 0.22, estimatedDays: '2-4 Days' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', standardCost: 14.90, expressCost: 24.90, freeShippingThreshold: 180, vatRate: 0.21, estimatedDays: '2-4 Days' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', standardCost: 16.90, expressCost: 26.90, freeShippingThreshold: 200, vatRate: 0.25, estimatedDays: '3-4 Days' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', standardCost: 9.90, expressCost: 18.90, freeShippingThreshold: 150, vatRate: 0.21, estimatedDays: '1-2 Days' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', standardCost: 10.90, expressCost: 19.90, freeShippingThreshold: 150, vatRate: 0.20, estimatedDays: '2-3 Days' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', standardCost: 14.90, expressCost: 24.90, freeShippingThreshold: 180, vatRate: 0.25, estimatedDays: '2-3 Days' }
];

export const MINIMUM_ORDER_AMOUNT = 300;

interface CartContextType {
  cart: CartItem[];
  addToCart: (whiskey: Whiskey, quantity?: number, engravingText?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  
  // Minimum Order Threshold
  minimumOrderAmount: number;
  isMinimumOrderMet: boolean;
  minimumOrderDeficit: number;

  // Cart Drawer
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Search & Filter Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Quick View
  quickViewWhiskey: Whiskey | null;
  setQuickViewWhiskey: (whiskey: Whiskey | null) => void;

  // Age Verification
  isAgeVerified: boolean;
  verifyAge: () => void;

  // EU Shipping & Checkout State
  selectedCountry: EUCountryShipping;
  setSelectedCountry: (country: EUCountryShipping) => void;
  shippingMethod: 'standard' | 'express';
  setShippingMethod: (method: 'standard' | 'express') => void;
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;

  // Cask Club Points
  caskPoints: number;
  earnPoints: (amount: number) => void;
  redeemPoints: (points: number) => void;

  // Checkout modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewWhiskey, setQuickViewWhiskey] = useState<Whiskey | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<EUCountryShipping>(EU_COUNTRIES[0]);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const [caskPoints, setCaskPoints] = useState(1250);

  // Restore client state from localStorage after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedAge = localStorage.getItem('whiskey_europe_age_verified');
        if (savedAge === 'true') {
          setIsAgeVerified(true);
        }
        const savedCart = localStorage.getItem('whiskey_europe_cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        const savedPoints = localStorage.getItem('whiskey_europe_cask_points');
        if (savedPoints) {
          setCaskPoints(parseInt(savedPoints, 10));
        }
      } catch {
        // ignore
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem('whiskey_europe_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const verifyAge = () => {
    setIsAgeVerified(true);
    try {
      localStorage.setItem('whiskey_europe_age_verified', 'true');
    } catch {
      // ignore
    }
  };

  const addToCart = (whiskey: Whiskey, quantity = 1, engravingText = '') => {
    setCart(prev => {
      const existing = prev.find(item => item.whiskey.id === whiskey.id);
      if (existing) {
        return prev.map(item =>
          item.whiskey.id === whiskey.id
            ? { ...item, quantity: item.quantity + quantity, engravingText: engravingText || item.engravingText }
            : item
        );
      }
      return [...prev, { whiskey, quantity, engravingText }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.whiskey.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.whiskey.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => total + item.whiskey.price * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'EUWHISKEY10' || cleanCode === 'RARE10') {
      setAppliedCoupon(cleanCode);
      setCouponDiscount(0.10); // 10% discount
      return true;
    } else if (cleanCode === 'CASKVIP20') {
      setAppliedCoupon(cleanCode);
      setCouponDiscount(0.20); // 20% discount
      return true;
    }
    return false;
  };

  const earnPoints = (amount: number) => {
    setCaskPoints(prev => {
      const next = prev + amount;
      try {
        localStorage.setItem('whiskey_europe_cask_points', next.toString());
      } catch {}
      return next;
    });
  };

  const redeemPoints = (pointsToRedeem: number) => {
    if (caskPoints >= pointsToRedeem) {
      setCaskPoints(prev => prev - pointsToRedeem);
      // Give voucher discount
      setAppliedCoupon(`REWARD-${pointsToRedeem}PTS`);
      setCouponDiscount(0.15); // 15% reward voucher
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        minimumOrderAmount: MINIMUM_ORDER_AMOUNT,
        isMinimumOrderMet: subtotal >= MINIMUM_ORDER_AMOUNT,
        minimumOrderDeficit: Math.max(0, MINIMUM_ORDER_AMOUNT - subtotal),
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        quickViewWhiskey,
        setQuickViewWhiskey,
        isAgeVerified,
        verifyAge,
        selectedCountry,
        setSelectedCountry,
        shippingMethod,
        setShippingMethod,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        caskPoints,
        earnPoints,
        redeemPoints,
        isCheckoutOpen,
        setIsCheckoutOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
