'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Trash2, ShoppingBag, ShieldCheck, Truck, ArrowRight, Tag, AlertTriangle, CheckCircle, Wine } from 'lucide-react';
import { useCart, EU_COUNTRIES } from '@/lib/cart-context';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    minimumOrderAmount,
    isMinimumOrderMet,
    minimumOrderDeficit,
    selectedCountry,
    setSelectedCountry,
    shippingMethod,
    setShippingMethod,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    isAgeVerified,
    verifyAge,
    setIsCheckoutOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  if (!isCartOpen) return null;

  // Shipping calculation
  const isFreeShipping = subtotal >= selectedCountry.freeShippingThreshold;
  const shippingCost = isFreeShipping
    ? 0
    : shippingMethod === 'express'
    ? selectedCountry.expressCost
    : selectedCountry.standardCost;

  const discountAmount = subtotal * couponDiscount;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponMsg('Coupon applied successfully!');
      setCouponInput('');
    } else {
      setCouponMsg('Invalid coupon code. Try EUWHISKEY10');
    }
    setTimeout(() => setCouponMsg(''), 3000);
  };

  const handleProceedCheckout = () => {
    if (!isMinimumOrderMet) {
      alert(`The minimum order threshold for European Bonded Vault Dispatch is €${minimumOrderAmount}. Please add €${minimumOrderDeficit.toFixed(2)} more to your cart.`);
      return;
    }
    if (!isAgeVerified) {
      verifyAge();
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#120e0b] text-[#f5f0ea] border-l border-[#2e261f] shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#241d17] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="font-serif font-bold text-lg">Your European Cellar Cart</h2>
              <span className="bg-[#211a14] text-amber-400 text-xs px-2 py-0.5 rounded font-mono">
                {cart.length} Bottles
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#a39382] hover:text-amber-400 rounded-lg hover:bg-[#1f1914]"
              aria-label="Close Cart Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Items Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1c1713] border border-[#2e261f] flex items-center justify-center mx-auto text-amber-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-lg">Your Cart is Empty</h3>
                <p className="text-xs text-[#a39382] max-w-xs mx-auto">
                  Explore our collection of rare single malts, Islay peated drams, and cask strength allocations.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs px-5 py-2.5 rounded-md shadow-md"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.whiskey.id}
                    className="p-3 bg-[#18130f] border border-[#2b221a] rounded-xl flex gap-3 relative"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#100d0a] shrink-0 border border-[#2b221a]">
                      {item.whiskey.image ? (
                        <Image
                          src={item.whiskey.image}
                          alt={item.whiskey.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#1e1813] to-[#0a0806] text-amber-500 p-1">
                          <Wine className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-bold text-sm text-[#f8f3ed] line-clamp-1">
                            {item.whiskey.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.whiskey.id)}
                            className="text-[#786c60] hover:text-red-400 p-1"
                            title="Remove"
                            aria-label={`Remove ${item.whiskey.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-amber-400 font-mono">
                          {item.whiskey.region} • {item.whiskey.age} Yrs
                        </span>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#302720] rounded bg-[#100d0a]">
                          <button
                            onClick={() => updateQuantity(item.whiskey.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#a39382] hover:text-amber-400"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.whiskey.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#a39382] hover:text-amber-400"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif font-bold text-sm text-amber-400">
                          €{(item.whiskey.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* EU Destination Country Selector */}
                <div className="p-3.5 bg-[#171310] border border-[#2b221a] rounded-xl space-y-2">
                  <label className="text-xs text-[#a39382] font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Truck className="w-3.5 h-3.5" /> EU Destination Country
                    </span>
                    <span>Est. {selectedCountry.estimatedDays}</span>
                  </label>
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const found = EU_COUNTRIES.find(c => c.code === e.target.value);
                      if (found) setSelectedCountry(found);
                    }}
                    className="w-full bg-[#100d0a] border border-[#332920] rounded p-2 text-xs text-[#f5f0ea] focus:outline-none focus:border-amber-500"
                  >
                    {EU_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name} (VAT {(c.vatRate * 100).toFixed(0)}%)
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center justify-between text-[11px] text-[#8c7e70] pt-1">
                    <span>Free shipping on orders over €{selectedCountry.freeShippingThreshold}</span>
                    {isFreeShipping ? (
                      <span className="text-emerald-400 font-bold">QUALIFIED FREE</span>
                    ) : (
                      <span className="text-amber-400">Add €{(selectedCountry.freeShippingThreshold - subtotal).toFixed(2)} more</span>
                    )}
                  </div>
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. EUWHISKEY10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-[#100d0a] border border-[#332920] rounded px-3 py-1.5 text-xs text-[#f5f0ea] placeholder-[#6e6256] focus:outline-none focus:border-amber-500"
                    />
                    <Tag className="w-3.5 h-3.5 text-[#6e6256] absolute right-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#241d16] hover:bg-[#332920] text-amber-400 border border-amber-900/50 px-3 py-1.5 rounded text-xs font-semibold cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {couponMsg && (
                  <p className="text-xs text-amber-300 font-mono text-center">{couponMsg}</p>
                )}

              </div>
            )}
          </div>

          {/* Drawer Summary & Checkout CTA Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#241d17] bg-[#100d0a] space-y-3">
              
              <div className="space-y-1.5 text-xs text-[#b0a090]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-€{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured EU Delivery ({selectedCountry.name})</span>
                  <span>{isFreeShipping ? 'FREE' : `€${shippingCost.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-amber-400 pt-2 border-t border-[#241d17]">
                  <span>Grand Total</span>
                  <span>€{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Minimum Order Warning Banner */}
              {!isMinimumOrderMet && (
                <div className="p-3 bg-amber-950/60 border border-amber-600/50 rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                    <span>Minimum Order Required: €{minimumOrderAmount}</span>
                  </div>
                  <p className="text-[11px] text-[#d6c5b3] leading-relaxed">
                    European Bonded Vault Dispatch requires a minimum order of €{minimumOrderAmount}. Please add <strong className="text-amber-400 font-mono">€{minimumOrderDeficit.toFixed(2)}</strong> more in fine whiskies to enable checkout.
                  </p>
                </div>
              )}

              {/* Age Verification Declaration */}
              <div className="flex items-center gap-2 text-xs text-[#a39382] bg-[#18130f] p-2.5 rounded border border-[#2b221a]">
                <input
                  type="checkbox"
                  id="cart-age-check"
                  checked={isAgeVerified}
                  onChange={(e) => {
                    if (e.target.checked) verifyAge();
                  }}
                  className="rounded border-[#3a2f26] text-amber-600 focus:ring-amber-500 accent-amber-600"
                />
                <label htmlFor="cart-age-check" className="cursor-pointer select-none text-[11px]">
                  I confirm I am at least 18 years of age (EU Age Requirement).
                </label>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                disabled={!isMinimumOrderMet}
                className={`w-full inline-flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-md shadow-xl transition-all ${
                  isMinimumOrderMet
                    ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black cursor-pointer'
                    : 'bg-[#292018] text-[#8a7b6c] border border-[#3d3126] cursor-not-allowed opacity-90'
                }`}
              >
                {isMinimumOrderMet ? (
                  <>
                    <span>Proceed to Secure EU Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Add €{minimumOrderDeficit.toFixed(2)} to Reach €{minimumOrderAmount} Min Order</span>
                  </>
                )}
              </button>

              <div className="space-y-1.5 text-center">
                <div className="flex items-center justify-center gap-2 text-[10px] text-[#786c60]">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>SSL Encrypted • Pre-cleared EU Excise & Duty</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-[9px] text-[#a39382] font-mono pt-1">
                  <span className="px-1.5 py-0.5 bg-[#18130f] border border-[#2b221a] rounded">Credit Card</span>
                  <span className="px-1.5 py-0.5 bg-[#18130f] border border-[#2b221a] rounded">Bank Transfer</span>
                  <span className="px-1.5 py-0.5 bg-[#18130f] border border-[#2b221a] rounded">Crypto</span>
                  <span className="px-1.5 py-0.5 bg-[#18130f] border border-[#2b221a] rounded">PayPal</span>
                  <span className="px-1.5 py-0.5 bg-[#18130f] border border-[#2b221a] rounded">Pay ID</span>
                  <span className="px-1.5 py-0.5 bg-[#18130f] border border-[#2b221a] rounded">Wire Transfer</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
