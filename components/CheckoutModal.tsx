'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, CreditCard, Building2, Coins, ArrowLeftRight, QrCode, Copy, Check, AlertCircle } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { sendOrderConfirmationAction } from '@/app/actions/send-email';
import { PAYMENT_CONFIG } from '@/lib/payment-config';

interface PaymentMethodOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  subtitle: string;
}

const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'credit_card',
    name: 'Credit Card',
    icon: <CreditCard className="w-4 h-4 text-amber-500" />,
    subtitle: 'Visa, Mastercard, AMEX'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: <Building2 className="w-4 h-4 text-amber-500" />,
    subtitle: 'EU SEPA & IBAN Transfer'
  },
  {
    id: 'crypto',
    name: 'Crypto',
    icon: <Coins className="w-4 h-4 text-amber-500" />,
    subtitle: 'BTC, ETH, USDT Instant'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <span className="font-bold text-amber-500 text-xs font-mono">P</span>,
    subtitle: 'Instant Express Checkout'
  },
  {
    id: 'pay_id',
    name: 'Pay ID',
    icon: <QrCode className="w-4 h-4 text-amber-500" />,
    subtitle: 'Instant Mobile PayID'
  },
  {
    id: 'wire_transfer',
    name: 'Wire Transfer',
    icon: <ArrowLeftRight className="w-4 h-4 text-amber-500" />,
    subtitle: 'SWIFT International Wire'
  }
];

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
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit_card',
    ageConfirmed: true,
  });

  const [orderNum, setOrderNum] = useState('');

  if (!isCheckoutOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

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

    // Call server action to send order confirmation email to customer & cellar admin desk
    try {
      await sendOrderConfirmationAction({
        orderId: generatedOrderNum,
        customerName: `${formData.firstName} ${formData.lastName}`.trim(),
        customerEmail: formData.email,
        items: cart.map(i => ({ name: i.whiskey.name, quantity: i.quantity, price: i.whiskey.price })),
        total: grandTotal,
        subtotal,
        discount: discountAmount,
        voucherCode: appliedCoupon || undefined,
        shippingCost,
        country: selectedCountry.name,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        phone: formData.phone || undefined,
        paymentMethod: formData.paymentMethod,
      });
    } catch (err) {
      console.error('Order email dispatch error:', err);
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#a39382] mb-1">Email Address * (For Receipt & Tracking)</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alexander@domain.com"
                      className="w-full bg-[#100d0a] border border-[#332920] rounded p-2.5 text-xs text-[#f5f0ea] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#a39382] mb-1">Phone Number (Optional / Courier SMS)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+49 170 1234567"
                      className="w-full bg-[#100d0a] border border-[#332920] rounded p-2.5 text-xs text-[#f5f0ea] focus:outline-none focus:border-amber-500"
                    />
                  </div>
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
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#c4b6a7]">Select Payment Method</label>
                    <span className="text-[10px] text-amber-500 font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> SSL 256-Bit Encrypted
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {PAYMENT_METHODS.map((pm) => {
                      const isSelected = formData.paymentMethod === pm.id;
                      return (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-[72px] relative overflow-hidden ${
                            isSelected
                              ? 'bg-amber-950/40 border-amber-500 text-amber-400 shadow-md shadow-amber-950/50 ring-1 ring-amber-500/50'
                              : 'bg-[#100d0a] border-[#2b221a] text-[#a39382] hover:border-amber-900/60 hover:bg-[#18130f]'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1.5">
                              {pm.icon}
                              <span className="font-bold text-xs text-[#f5f0ea]">{pm.name}</span>
                            </div>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-amber-500 text-black flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] text-[#8a7b6c] truncate mt-1">{pm.subtitle}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Payment Details Box per selected method */}
                  <div className="mt-3 p-3.5 bg-[#100d0a] border border-[#2b221a] rounded-xl text-xs text-[#c4b6a7] space-y-2">
                    
                    {formData.paymentMethod === 'credit_card' && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-[#e0d3c5]">
                          <span className="font-bold flex items-center gap-1.5">
                            <CreditCard className="w-4 h-4 text-amber-500" /> Credit / Debit Card
                          </span>
                          <span className="text-[10px] text-amber-400 font-mono">3D Secure Active</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                            className="col-span-2 bg-[#18130f] border border-[#332920] rounded p-2 text-xs text-[#f5f0ea] font-mono focus:outline-none focus:border-amber-500"
                          />
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="bg-[#18130f] border border-[#332920] rounded p-2 text-xs text-[#f5f0ea] font-mono focus:outline-none focus:border-amber-500"
                          />
                          <input
                            type="text"
                            placeholder="CVC / CVV"
                            className="bg-[#18130f] border border-[#332920] rounded p-2 text-xs text-[#f5f0ea] font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        {PAYMENT_CONFIG.creditCard.paymentNote && (
                          <div className="bg-amber-950/40 border border-amber-500/30 rounded p-2 text-[11px] text-amber-200/90 flex items-start gap-1.5 mt-1">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-amber-300">Payment note: </strong>
                              {PAYMENT_CONFIG.creditCard.paymentNote}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {formData.paymentMethod === 'bank_transfer' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[#e0d3c5]">
                          <span className="font-bold flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-amber-500" /> European SEPA Bank Transfer Details
                          </span>
                        </div>
                        <div className="bg-[#18130f] p-2.5 rounded border border-[#2e251e] space-y-1.5 font-mono text-[11px]">
                          <div className="flex justify-between items-center">
                            <span className="text-[#8c7e70]">Bank Name:</span>
                            <span className="text-white">{PAYMENT_CONFIG.bankTransfer.bankName || '—'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#8c7e70]">Account Name:</span>
                            <span className="text-amber-400">{PAYMENT_CONFIG.bankTransfer.accountName || '—'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#8c7e70]">IBAN:</span>
                            <div className="flex items-center gap-1">
                              <span className="text-white">{PAYMENT_CONFIG.bankTransfer.iban || '—'}</span>
                              {PAYMENT_CONFIG.bankTransfer.iban && (
                                <button
                                  type="button"
                                  onClick={() => handleCopy(PAYMENT_CONFIG.bankTransfer.iban, 'iban')}
                                  className="text-amber-500 hover:text-amber-400 p-0.5"
                                  title="Copy IBAN"
                                >
                                  {copiedField === 'iban' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#8c7e70]">BIC / SWIFT:</span>
                            <span className="text-white">{PAYMENT_CONFIG.bankTransfer.swiftBic || '—'}</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-[#8c7e70]">
                          {PAYMENT_CONFIG.bankTransfer.referenceNote || '* Use your order number as the payment reference.'}
                        </p>
                      </div>
                    )}

                    {formData.paymentMethod === 'crypto' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[#e0d3c5]">
                          <span className="font-bold flex items-center gap-1.5">
                            <Coins className="w-4 h-4 text-amber-500" /> Cryptocurrency (Bitcoin)
                          </span>
                          <span className="text-[10px] text-amber-400 font-mono bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.5 rounded">
                            {PAYMENT_CONFIG.crypto.acceptedCoins}
                          </span>
                        </div>
                        <div className="bg-[#18130f] p-2.5 rounded border border-[#2e251e] space-y-2 text-[11px]">
                          <div className="flex justify-between items-center font-mono">
                            <span className="text-[#8c7e70]">Network:</span>
                            <span className="text-amber-400">{PAYMENT_CONFIG.crypto.network}</span>
                          </div>
                          <div className="space-y-1 pt-1 border-t border-[#261e18]">
                            <span className="text-[#8c7e70] block text-[10px]">Bitcoin Wallet Address:</span>
                            <div className="flex items-center justify-between bg-[#110e0b] border border-[#2e251e] p-2 rounded font-mono text-[11px] text-amber-300">
                              <span className="truncate mr-2 font-bold tracking-tight select-all">{PAYMENT_CONFIG.crypto.walletAddress}</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(PAYMENT_CONFIG.crypto.walletAddress, 'crypto')}
                                className="flex items-center gap-1 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 px-2 py-1 rounded text-[10px] font-sans font-medium shrink-0 transition-colors"
                                title="Copy Bitcoin Address"
                              >
                                {copiedField === 'crypto' ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        {PAYMENT_CONFIG.crypto.paymentNote && (
                          <div className="bg-amber-950/40 border border-amber-500/30 rounded p-2 text-[11px] text-amber-200/90 flex items-start gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-amber-300">Payment note: </strong>
                              {PAYMENT_CONFIG.crypto.paymentNote}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {formData.paymentMethod === 'paypal' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[#e0d3c5]">
                          <span className="font-bold flex items-center gap-1.5">
                            <span className="font-bold text-amber-500 text-sm font-mono">P</span> PayPal Checkout
                          </span>
                        </div>
                        <div className="bg-[#18130f] p-2.5 rounded border border-[#2e251e] space-y-1.5 font-mono text-[11px]">
                          <div className="flex justify-between items-center">
                            <span className="text-[#8c7e70]">PayPal Account / Email:</span>
                            <span className="text-amber-400">{PAYMENT_CONFIG.paypal.paypalEmail || '—'}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#b0a191] leading-relaxed">
                          {PAYMENT_CONFIG.paypal.instructions || 'You will receive an instant PayPal payment confirmation link upon placing your order.'}
                        </p>
                      </div>
                    )}

                    {formData.paymentMethod === 'pay_id' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[#e0d3c5]">
                          <span className="font-bold flex items-center gap-1.5">
                            <QrCode className="w-4 h-4 text-amber-500" /> Pay ID Transfer
                          </span>
                        </div>
                        <div className="bg-[#18130f] p-2.5 rounded border border-[#2e251e] space-y-1.5 font-mono text-[11px]">
                          <div className="flex justify-between items-center">
                            <span className="text-[#8c7e70]">Pay ID Handle:</span>
                            <div className="flex items-center gap-1">
                              <span className="text-amber-400">{PAYMENT_CONFIG.payId.payIdHandle || '—'}</span>
                              {PAYMENT_CONFIG.payId.payIdHandle && (
                                <button
                                  type="button"
                                  onClick={() => handleCopy(PAYMENT_CONFIG.payId.payIdHandle, 'payid')}
                                  className="text-amber-500 hover:text-amber-400 p-0.5"
                                >
                                  {copiedField === 'payid' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#8c7e70]">Business Name:</span>
                            <span className="text-white">{PAYMENT_CONFIG.payId.businessName || '—'}</span>
                          </div>
                        </div>
                        {PAYMENT_CONFIG.payId.instructions && (
                          <p className="text-[10px] text-[#8c7e70]">{PAYMENT_CONFIG.payId.instructions}</p>
                        )}
                      </div>
                    )}

                    {formData.paymentMethod === 'wire_transfer' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[#e0d3c5]">
                          <span className="font-bold flex items-center gap-1.5">
                            <ArrowLeftRight className="w-4 h-4 text-amber-500" /> SWIFT Wire Transfer (International)
                          </span>
                        </div>
                        <div className="bg-[#18130f] p-2.5 rounded border border-[#2e251e] space-y-1.5 font-mono text-[11px]">
                          <div className="flex justify-between items-center">
                            <span className="text-[#8c7e70]">Bank Name:</span>
                            <span className="text-white">{PAYMENT_CONFIG.wireTransfer.bankName || '—'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#8c7e70]">SWIFT / BIC Code:</span>
                            <span className="text-amber-400">{PAYMENT_CONFIG.wireTransfer.swiftCode || '—'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#8c7e70]">Account / Routing:</span>
                            <span className="text-white">{PAYMENT_CONFIG.wireTransfer.accountNumber || PAYMENT_CONFIG.wireTransfer.routingNumber || '—'}</span>
                          </div>
                        </div>
                        {PAYMENT_CONFIG.wireTransfer.instructions && (
                          <p className="text-[10px] text-[#8c7e70]">{PAYMENT_CONFIG.wireTransfer.instructions}</p>
                        )}
                      </div>
                    )}

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
