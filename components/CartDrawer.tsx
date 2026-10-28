'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, ShieldCheck, Truck, ArrowRight, Tag, AlertTriangle, Wine } from 'lucide-react';
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
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-black border-l-2 border-black shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b-2 border-black flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="font-serif font-black text-lg text-black">Your European Cellar Cart</h2>
              <span className="bg-black text-white text-xs px-2 py-0.5 rounded font-mono font-bold">
                {cart.length} Bottles
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-black hover:bg-zinc-200 rounded-lg cursor-pointer"
              aria-label="Close Cart Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Items Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 border-2 border-black flex items-center justify-center mx-auto text-black">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-black text-lg text-black">Your Cart is Empty</h3>
                <p className="text-xs text-zinc-600 max-w-xs mx-auto font-medium">
                  Explore our collection of rare single malts, Islay peated drams, and cask strength allocations.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 bg-black hover:bg-zinc-800 text-white font-black text-xs px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer uppercase tracking-wider border border-black"
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Shop Cellar Bottles</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.whiskey.id}
                    className="p-3 bg-zinc-50 border-2 border-black rounded-xl flex gap-3 relative shadow-xs"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0 border border-zinc-300">
                      {item.whiskey.image ? (
                        <Image
                          src={item.whiskey.image}
                          alt={item.whiskey.name}
                          fill
                          unoptimized
                          sizes="80px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-black p-1">
                          <Wine className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-black text-sm text-black line-clamp-1">
                            {item.whiskey.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.whiskey.id)}
                            className="text-zinc-500 hover:text-red-600 p-1 cursor-pointer"
                            title="Remove"
                            aria-label={`Remove ${item.whiskey.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-zinc-600 font-mono font-bold">
                          {item.whiskey.region} • {item.whiskey.age} Yrs
                        </span>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border-2 border-black rounded bg-white">
                          <button
                            onClick={() => updateQuantity(item.whiskey.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-black font-bold hover:bg-zinc-100 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-black">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.whiskey.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-black font-bold hover:bg-zinc-100 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif font-black text-base text-black">
                          €{(item.whiskey.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* EU Destination Country Selector */}
                <div className="p-3.5 bg-zinc-50 border-2 border-black rounded-xl space-y-2">
                  <label className="text-xs text-black font-black flex items-center justify-between">
                    <span className="flex items-center gap-1 text-black">
                      <Truck className="w-3.5 h-3.5" /> EU Destination Country
                    </span>
                    <span className="text-zinc-600 font-mono font-normal">Est. {selectedCountry.estimatedDays}</span>
                  </label>
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const found = EU_COUNTRIES.find(c => c.code === e.target.value);
                      if (found) setSelectedCountry(found);
                    }}
                    className="w-full bg-white border-2 border-black rounded p-2 text-xs text-black font-semibold focus:outline-none"
                  >
                    {EU_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name} (VAT {(c.vatRate * 100).toFixed(0)}%)
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center justify-between text-[11px] text-zinc-600 font-medium pt-1">
                    <span>Free shipping over €{selectedCountry.freeShippingThreshold}</span>
                    {isFreeShipping ? (
                      <span className="text-black font-black">QUALIFIED FREE</span>
                    ) : (
                      <span className="text-black font-bold">Add €{(selectedCountry.freeShippingThreshold - subtotal).toFixed(2)} more</span>
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
                      className="w-full bg-white border-2 border-black rounded px-3 py-2 text-xs text-black placeholder-zinc-400 focus:outline-none"
                    />
                    <Tag className="w-3.5 h-3.5 text-black absolute right-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="bg-black hover:bg-zinc-800 text-white px-3 py-2 rounded text-xs font-black uppercase tracking-wider cursor-pointer border border-black"
                  >
                    Apply
                  </button>
                </form>
                {couponMsg && (
                  <p className="text-xs text-black font-bold font-mono text-center bg-zinc-100 p-1.5 border border-black rounded">{couponMsg}</p>
                )}

              </div>
            )}
          </div>

          {/* Drawer Summary & Checkout CTA Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t-2 border-black bg-zinc-50 space-y-3">
              
              <div className="space-y-1.5 text-xs text-zinc-700 font-semibold">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-black font-bold">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-€{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured EU Delivery ({selectedCountry.name})</span>
                  <span>{isFreeShipping ? 'FREE' : `€${shippingCost.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-lg font-serif font-black text-black pt-2 border-t-2 border-black">
                  <span>Grand Total</span>
                  <span>€{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Minimum Order Warning Banner */}
              {!isMinimumOrderMet && (
                <div className="p-3 bg-zinc-100 border-2 border-black rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-black font-black">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-black" />
                    <span>Minimum Order Required: €{minimumOrderAmount}</span>
                  </div>
                  <p className="text-[11px] text-zinc-700 leading-relaxed font-medium">
                    European Bonded Vault Dispatch requires a minimum order of €{minimumOrderAmount}. Please add <strong className="text-black font-bold font-mono">€{minimumOrderDeficit.toFixed(2)}</strong> more in fine whiskies to enable checkout.
                  </p>
                </div>
              )}

              {/* Age Verification Declaration */}
              <div className="flex items-center gap-2 text-xs text-black bg-white p-2.5 rounded border-2 border-black">
                <input
                  type="checkbox"
                  id="cart-age-check"
                  checked={isAgeVerified}
                  onChange={(e) => {
                    if (e.target.checked) verifyAge();
                  }}
                  className="rounded border-black text-black focus:ring-black accent-black"
                />
                <label htmlFor="cart-age-check" className="cursor-pointer select-none text-[11px] font-bold">
                  I confirm I am at least 18 years of age (EU Age Requirement).
                </label>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                disabled={!isMinimumOrderMet}
                className={`w-full inline-flex items-center justify-center gap-2 font-black text-xs sm:text-sm py-3.5 rounded-full shadow-lg transition-all uppercase tracking-wider border-2 border-black ${
                  isMinimumOrderMet
                    ? 'bg-black hover:bg-zinc-800 text-white cursor-pointer'
                    : 'bg-zinc-200 text-zinc-500 border-zinc-400 cursor-not-allowed'
                }`}
              >
                {isMinimumOrderMet ? (
                  <>
                    <span>Proceed to Secure EU Checkout</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                ) : (
                  <>
                    <span>Add €{minimumOrderDeficit.toFixed(2)} to Reach €{minimumOrderAmount} Min Order</span>
                  </>
                )}
              </button>

              <div className="space-y-1.5 text-center">
                <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-black" />
                  <span>SSL Encrypted • Pre-cleared EU Excise &amp; Duty</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-[9px] text-black font-mono font-bold pt-1">
                  <span className="px-1.5 py-0.5 bg-white border border-black rounded">Credit Card</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black rounded">Bank Transfer</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black rounded">Crypto</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black rounded">PayPal</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black rounded">Pay ID</span>
                  <span className="px-1.5 py-0.5 bg-white border border-black rounded">Wire Transfer</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
