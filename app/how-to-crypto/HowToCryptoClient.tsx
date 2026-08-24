'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Coins,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Award,
  ExternalLink,
  ChevronDown,
  CreditCard
} from 'lucide-react';
import { PAYMENT_CONFIG } from '@/lib/payment-config';

export default function HowToCryptoClient() {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [calculatorEur, setCalculatorEur] = useState<number>(350);

  const btcRateEur = 85000; // Estimated BTC benchmark for live preview calculations
  const calculatedBtc = (calculatorEur / btcRateEur).toFixed(6);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(PAYMENT_CONFIG.crypto.walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@whiskeyeurope.org');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const faqs = [
    {
      q: 'Can I buy crypto directly into your shop wallet with Changelly or a credit card?',
      a: 'Yes! You do not even need a personal cryptocurrency wallet. Simply go to Changelly (or MoonPay), enter your order EUR amount to buy Bitcoin (BTC), and paste our official shop address as the recipient address. Pay with your Visa, Mastercard, Apple Pay, or Google Pay, and Changelly will deliver the Bitcoin directly to our cellar.',
    },
    {
      q: 'Which cryptocurrencies are supported?',
      a: 'Our primary automated gateway accepts Bitcoin (BTC) on the native Bitcoin Mainnet (Native SegWit / bech32). For Ethereum (ETH), USDT (ERC20 / TRC20), or Solana (SOL), please select Crypto during checkout and contact our sommelier desk at contact@whiskeyeurope.org for custom network addresses.',
    },
    {
      q: 'How long does crypto payment verification take?',
      a: 'Bitcoin transactions typically receive 1 confirmation within 10 to 30 minutes. Once detected on the blockchain, our bonded cellar logistics team in Rotterdam immediately allocates and prepares your bottle with temperature-controlled insulated packaging.',
    },
    {
      q: 'Do I get extra loyalty points for paying with crypto?',
      a: 'Yes! All orders paid with cryptocurrency receive an automatic +50 Bonus Cask Club reward points, which can be redeemed for cellar discounts and access to private allocation drops.',
    },
    {
      q: 'What if the price of Bitcoin fluctuates while I am completing my order?',
      a: 'The EUR total of your order is locked at the moment of checkout. If you send payment within 60 minutes of placing the order, the exact conversion rate is honored with zero slippage.',
    },
    {
      q: 'How do I provide proof of payment?',
      a: 'Simply copy your Transaction Hash (TXID) from your wallet app or take a screenshot of the completed transfer and email it to contact@whiskeyeurope.org referencing your order number (e.g., WE-2026-XXXX).',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Header */}
      <section className="relative text-center space-y-6 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-amber-950/60 border border-amber-800/50 text-amber-400 text-xs font-semibold px-4 py-1.5 rounded-full shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>OFFICIAL CRYPTOCURRENCY PAYMENT GUIDE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#f5f0ea] leading-tight">
          How to Pay with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Cryptocurrency</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Enjoy secure, discrete, and borderless checkout for your vintage spirits and rare single malt allocations with zero international bank wire delays.
        </p>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto text-left">
          <div className="bg-[#18130f] border border-[#2d221a] rounded-xl p-3.5 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Instant Settlement</div>
              <div className="text-[11px] text-slate-400">No bank hold periods</div>
            </div>
          </div>
          <div className="bg-[#18130f] border border-[#2d221a] rounded-xl p-3.5 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Confidential & Private</div>
              <div className="text-[11px] text-slate-400">Direct peer-to-peer</div>
            </div>
          </div>
          <div className="bg-[#18130f] border border-[#2d221a] rounded-xl p-3.5 flex items-start gap-2.5">
            <Award className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">+50 Cask Points</div>
              <div className="text-[11px] text-slate-400">Bonus on all crypto orders</div>
            </div>
          </div>
          <div className="bg-[#18130f] border border-[#2d221a] rounded-xl p-3.5 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Bonded Dispatch</div>
              <div className="text-[11px] text-slate-400">Insured 27 EU States</div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Verified Wallet Box */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="relative bg-gradient-to-b from-[#1c1611] to-[#14100c] border-2 border-amber-600/50 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#30241b]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-700/50">
                  {PAYMENT_CONFIG.crypto.acceptedCoins}
                </span>
                <span className="text-xs text-slate-400">
                  Network: <strong className="text-slate-200">{PAYMENT_CONFIG.crypto.network}</strong>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Official Receiving Address
              </h2>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/70 border border-emerald-800/40 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Bonded Vault Wallet</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Bitcoin SegWit Wallet Address
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 bg-[#0d0a08] border border-[#3d2f24] rounded-xl px-4 py-3 font-mono text-xs sm:text-sm text-amber-300 break-all select-all flex items-center justify-between">
                  <span>{PAYMENT_CONFIG.crypto.walletAddress}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all cursor-pointer active:scale-95 flex-shrink-0"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-[#120e0b] border border-[#2b2018] rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Payment Proof Confirmation:</strong> After completing your transfer, send your TX hash or screenshot to{' '}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-amber-400 hover:underline font-mono inline-flex items-center gap-1 font-semibold"
                >
                  contact@whiskeyeurope.org
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>{' '}
                along with your Order ID for immediate release.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Changelly Direct Card-to-Wallet Guide */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#1d1610] via-[#221a13] to-[#1d1610] border border-amber-500/40 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#35281e]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                  Buy via Changelly (Direct to Our Shop Wallet)
                </h2>
                <p className="text-xs text-amber-400 font-medium">
                  No personal crypto wallet needed • Pay with Visa, Mastercard, Apple Pay, or Google Pay
                </p>
              </div>
            </div>
            <a
              href="https://changelly.com/buy-crypto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow cursor-pointer flex-shrink-0"
            >
              <span>Go to Changelly</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You can purchase Bitcoin directly with your credit or debit card on <strong>Changelly</strong> and have it delivered straight into our shop’s receiving wallet in 3 easy steps:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-[#120e0b] border border-[#2b2018] rounded-xl p-3.5 space-y-1">
              <div className="text-[11px] font-mono font-bold text-amber-400">Step 1</div>
              <div className="text-xs font-bold text-white">Enter Order Amount</div>
              <p className="text-[11px] text-slate-400 leading-snug">
                On Changelly, select <strong>EUR</strong> (or your local currency), enter your order total, and select <strong>BTC (Bitcoin)</strong>.
              </p>
            </div>

            <div className="bg-[#120e0b] border border-[#2b2018] rounded-xl p-3.5 space-y-1">
              <div className="text-[11px] font-mono font-bold text-amber-400">Step 2</div>
              <div className="text-xs font-bold text-white">Paste Our Shop Address</div>
              <p className="text-[11px] text-slate-400 leading-snug">
                When asked for the <em>Recipient Address</em>, paste our verified shop wallet:
                <span className="block font-mono text-[10px] text-amber-300 mt-1 truncate">
                  {PAYMENT_CONFIG.crypto.walletAddress}
                </span>
              </p>
            </div>

            <div className="bg-[#120e0b] border border-[#2b2018] rounded-xl p-3.5 space-y-1">
              <div className="text-[11px] font-mono font-bold text-amber-400">Step 3</div>
              <div className="text-xs font-bold text-white">Pay by Card & Confirm</div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Complete payment with Visa, Mastercard, or Apple Pay. Changelly sends the BTC directly to our cellar. Email your receipt to <span className="text-slate-200 font-mono">contact@whiskeyeurope.org</span> for instant order dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Rate Demonstrator */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-[#17120e] border border-[#33261d] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#2d2118]">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-serif font-bold text-white">
                Interactive EUR to BTC Calculator
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Live Estimate</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Order Value in EUR (€)
              </label>
              <input
                type="number"
                min="50"
                max="50000"
                step="25"
                value={calculatorEur}
                onChange={(e) => setCalculatorEur(Number(e.target.value) || 0)}
                className="w-full bg-[#0e0b08] border border-[#3d2e22] focus:border-amber-500 rounded-xl px-4 py-2.5 text-white font-mono text-base outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Estimated Bitcoin (BTC) Amount
              </label>
              <div className="bg-[#0e0b08] border border-[#3d2e22] rounded-xl px-4 py-2.5 text-amber-400 font-mono text-base font-bold flex items-center justify-between">
                <span>≈ {calculatedBtc} BTC</span>
                <span className="text-xs text-slate-500 font-sans">@ benchmark rate</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            * Note: Exact conversion amount is computed transparently at the checkout page based on the real-time spot price at order creation.
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about purchasing spirits with crypto at Whiskey Europe.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={faq.q}
                className="bg-[#16110d] border border-[#2b2018] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-serif font-bold text-white hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-500 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#241a13]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-amber-950/80 via-[#241a13] to-amber-950/80 border border-amber-700/40 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Ready to Secure Your Rare Bottle?
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Browse our 165+ authenticated collector allocations and enjoy instant, discrete crypto checkout today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              <span>Explore Boutique Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#17120e] hover:bg-[#201914] text-slate-200 hover:text-white border border-[#3d2e22] text-sm font-semibold px-6 py-3 rounded-xl transition-all"
            >
              <span>Contact Sommelier Desk</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
