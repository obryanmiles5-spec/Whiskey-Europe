'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, Truck, CreditCard, Award } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { sendOrderConfirmationAction } from '@/app/actions/send-email';

export default function CheckoutModal() {
  const {
    cart,
    subtotal,
    selectedCountry,
    shippingMethod,
    couponDiscount,
    appliedCoupon,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    earnPoints
  } = useCart();

  const [step, setStep] = useState<'info' | 'payment' | 'confirmed'>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: 'buyer@example.com',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    ageConfirmed: true,
  });

  const [orderNum, setOrderNum] = useState('');

  if (!isCheckoutOpen) return null;

  const discountAmount = subtotal * couponDiscount;
  const isFreeShipping = subtotal >= selectedCountry.freeShippingThreshold;
  const shippingCost = isFreeShipping
    ? 0
    : shippingMethod === 'express'
    ? selectedCountry.expressCost
    : selectedCountry.standardCost;

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'info') {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
        alert('Please complete all required fields.');
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      handleSubmitOrder();
    }
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    const generatedOrderNum = `EU-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNum(generatedOrderNum);

    // Call server action to send order confirmation email
    try {
      await sendOrderConfirmationAction({
        orderId: generatedOrderNum,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        items: cart.map(i => ({ name: i.whiskey.name, quantity: i.quantity, price: i.whiskey.price })),
        total: grandTotal,
        country: selectedCountry.name,
      });
    } catch {
      // ignore
    }

    // Earn Cask Club points (10 pts per €1)
    const earned = Math.round(grandTotal * 10);
    earnPoints(earned);

    setIsSubmitting(false);
    setStep('confirmed');
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#14100c] border border-[#2e261f] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-[#f5f0ea] my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 text-[#8c7e70] hover:text-amber-400 p-2 rounded-full hover:bg-[#1f1914]"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#261f18] pb-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-amber-600/20 border border-amber-600/40 flex items-center justify-center text-amber-500">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#f8f3ed]">
              {step === 'confirmed' ? 'Order Confirmed!' : 'Secure EU Checkout'}
            </h2>
            <p className="text-xs text-[#a39382]">
              Whiskey Europe • Climate Controlled Bonded Shipping to {selectedCountry.flag} {selectedCountry.name}
            </p>
          </div>
        </div>

        {/* Step: Order Confirmed */}
        {step === 'confirmed' ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 bg-emerald-950 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400">Order Number #{orderNum}</span>
              <h3 className="font-serif text-2xl font-bold text-[#f5f0ea]">
                Thank you for your order, {formData.firstName}!
              </h3>
              <p className="text-sm text-[#b8a99a] max-w-md mx-auto leading-relaxed">
                A confirmation email with tracking details has been sent to <strong className="text-amber-400">{formData.email}</strong> via Zoho Mail. Your insulated timber crate is being sealed.
              </p>
            </div>

            <div className="bg-[#18130f] border border-amber-900/40 p-4 rounded-xl text-xs text-[#c4b6a7] max-w-sm mx-auto space-y-2">
              <div className="flex items-center justify-between">
                <span>Earned Cask Club Points</span>
                <span className="text-amber-400 font-bold">+{Math.round(grandTotal * 10)} PTS</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated EU Delivery</span>
                <span className="text-white font-bold">{selectedCountry.estimatedDays}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="bg-amber-600 hover:bg-amber-500 text-black font-bold text-sm px-8 py-3 rounded-md shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleNextStep} className="space-y-6">
            
            {/* Steps Indicator */}
            <div className="flex items-center justify-between text-xs border-b border-[#241d17] pb-3">
              <span className={`font-semibold ${step === 'info' ? 'text-amber-400' : 'text-[#8c7e70]'}`}>
                1. Delivery & Age Verification
              </span>
              <span className={`font-semibold ${step === 'payment' ? 'text-amber-400' : 'text-[#8c7e70]'}`}>
                2. EU Payment & Review
              </span>
            </div>

            {step === 'info' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#a39382] mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Alexander"
                      className="w-full bg-[#100d0a] border border-[#332920] rounded p-2.5 text-xs text-[#f5f0ea] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#a39382] mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Müller"
                      className="w-full bg-[#100d0a] border border-[#332920] rounded p-2.5 text-xs text-[#f5f0ea] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#a39382] mb-1">Email Address * (For Order Confirmation)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@whiskeyeurope.org"
                    className="w-full bg-[#100d0a] border border-[#332920] rounded p-2.5 text-xs text-[#f5f0ea] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#a39382] mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Maximilianstraße 42"
                    className="w-full bg-[#100d0a] border border-[#332920] rounded p-2.5 text-xs text-[#f5f0ea] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#a39382] mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Munich"
                      className="w-full bg-[#100d0a] border border-[#332920] rounded p-2.5 text-xs text-[#f5f0ea] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#a39382] mb-1">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="80331"
                      className="w-full bg-[#100d0a] border border-[#332920] rounded p-2.5 text-xs text-[#f5f0ea] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Mandatory EU Age Verification Check */}
                <div className="bg-[#18130f] p-3 rounded-lg border border-amber-900/40 flex items-start gap-2 text-xs text-[#c2b2a3]">
                  <input
                    type="checkbox"
                    id="checkout-age-check"
                    required
                    checked={formData.ageConfirmed}
                    onChange={(e) => setFormData({ ...formData, ageConfirmed: e.target.checked })}
                    className="mt-0.5 rounded border-[#3a2f26] text-amber-600 focus:ring-amber-500 accent-amber-600"
                  />
                  <label htmlFor="checkout-age-check" className="cursor-pointer">
                    <strong className="text-amber-400">EU Mandatory Compliance:</strong> I declare that I am 18 years of age or older and legally eligible to purchase alcoholic beverages in {selectedCountry.name}.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold text-sm py-3 rounded-md shadow-lg cursor-pointer"
                >
                  Continue to Payment (€{grandTotal.toFixed(2)})
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-4">
                
                {/* Order Summary Recap */}
                <div className="bg-[#100d0a] p-4 rounded-xl border border-[#2b221a] text-xs space-y-2">
                  <h4 className="font-bold text-[#f5f0ea]">Order Summary</h4>
                  <div className="flex justify-between text-[#a39382]">
                    <span>Items ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({appliedCoupon})</span>
                      <span>-€{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#a39382]">
                    <span>Insured Express Shipping ({selectedCountry.name})</span>
                    <span>{isFreeShipping ? 'FREE' : `€${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-amber-400 pt-2 border-t border-[#241d17]">
                    <span>Grand Total (Incl. VAT)</span>
                    <span>€{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="block text-xs text-[#a39382]">Select EU Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['card', 'sepa', 'klarna'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                        className={`p-3 rounded-lg border text-xs font-bold capitalize transition-all cursor-pointer ${
                          formData.paymentMethod === method
                            ? 'bg-amber-600/20 border-amber-500 text-amber-400'
                            : 'bg-[#100d0a] border-[#332920] text-[#a39382] hover:border-amber-900'
                        }`}
                      >
                        {method === 'card' ? 'Credit Card' : method === 'sepa' ? 'SEPA Direct' : 'Klarna Pay'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('info')}
                    className="w-1/3 bg-[#1e1914] hover:bg-[#29221b] text-[#c2b2a3] font-semibold text-xs py-3 rounded-md"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold text-sm py-3 rounded-md shadow-lg cursor-pointer"
                  >
                    {isSubmitting ? 'Processing Insured Order...' : `Confirm Order (€${grandTotal.toFixed(2)})`}
                  </button>
                </div>

              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
}
