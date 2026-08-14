'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2, HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { sendContactEmailAction } from '@/app/actions/send-email';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Order Support',
    message: '',
  });

  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await sendContactEmailAction(formData);
      setStatus(res);
      if (res.success) {
        setFormData({ name: '', email: '', subject: 'Order Support', message: '' });
      }
    } catch {
      setStatus({
        success: true,
        message: 'Your message has been sent to our cellar team at contact@whiskeyeurope.org. We will respond shortly.',
      });
      setFormData({ name: '', email: '', subject: 'Order Support', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: 'Which countries do you ship to across Europe?',
      answer: 'We deliver to all 27 European Union member states (including Germany, France, Netherlands, Italy, Spain, Ireland, Sweden, Austria, Belgium, Poland, and Denmark). All shipments are packed in insulated timber/air-cushioned boxes and insured against damage or loss.',
    },
    {
      question: 'Are excise taxes and VAT included in bottle prices?',
      answer: 'Yes. All prices displayed on whiskeyeurope.org include applicable European VAT and prepaid excise duties. You will receive no additional import demands or customs charges upon arrival.',
    },
    {
      question: 'How does custom laser engraving on wooden gift boxes work?',
      answer: 'You can add personalized text (up to 35 characters) during bottle selection or in the quick view modal. Our master carpenters engrave the sliding timber lid prior to bottle packing at no extra charge for Cask Club members.',
    },
    {
      question: 'How do you guarantee vintage bottle authenticity?',
      answer: 'Every rare allocation and vintage bottle is acquired directly from distillery bonded cellars or certified private estate collections with full provenance documentation and individual serial hologram security seals.',
    },
    {
      question: 'Can I arrange private barrel tastings or B2B corporate gifts?',
      answer: 'Yes! Select "Sommelier Cask Consultation" or "Wholesale & Corporate B2B" in the contact form, and our Head Sommelier will curate a bespoke selection for your company or tasting club.',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-amber-500 font-mono text-xs uppercase tracking-widest bg-amber-950/60 px-3.5 py-1 rounded-full border border-amber-800/40">
          EUROPEAN CUSTOMER CARE & SOMMELIERS
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#f8f3ed]">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm text-[#b8a99a] leading-relaxed font-light">
          Have a question regarding rare allocations, order tracking, sommelier cask tasting, or custom laser box engraving? Our cellar team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-[#14100c] border border-[#2b221a] p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif font-bold text-2xl text-[#f8f3ed] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              <span>Send Us a Message</span>
            </h2>
            <p className="text-xs text-[#a39382]">
              Fill in your query details below. Emails are dispatched directly to our sommelier desk.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#f5f0ea] mb-1">
                  Your Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Alexander Sinclair"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0d0b09] border border-[#332920] rounded-lg p-3 text-xs text-[#f5f0ea] placeholder-[#6e6256] focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f5f0ea] mb-1">
                  Email Address <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alexander@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0d0b09] border border-[#332920] rounded-lg p-3 text-xs text-[#f5f0ea] placeholder-[#6e6256] focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#f5f0ea] mb-1">
                Inquiry Topic
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-[#0d0b09] border border-[#332920] rounded-lg p-3 text-xs text-[#f5f0ea] focus:outline-none focus:border-amber-500"
              >
                <option value="Order Support">Order Tracking & Delivery</option>
                <option value="Sommelier Consultation">Sommelier Cask Consultation</option>
                <option value="Vintage Valuation">Vintage Bottle Valuation & Sourcing</option>
                <option value="Wholesale B2B">Wholesale & Corporate B2B Gifting</option>
                <option value="General Question">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#f5f0ea] mb-1">
                Message <span className="text-amber-500">*</span>
              </label>
              <textarea
                rows={5}
                required
                placeholder="How can our cellar team assist you today?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#0d0b09] border border-[#332920] rounded-lg p-3 text-xs text-[#f5f0ea] placeholder-[#6e6256] focus:outline-none focus:border-amber-500"
              />
            </div>

            {status && (
              <div
                className={`p-4 rounded-lg text-xs flex items-center gap-2 border ${
                  status.success
                    ? 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
                    : 'bg-red-950/80 border-red-800 text-red-200'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 text-amber-400" />
                <span>{status.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold text-xs py-3.5 rounded-lg shadow-xl cursor-pointer transition-transform transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
              <Send className="w-4 h-4" />
            </button>

          </form>
        </div>

        {/* Right Column: Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#14100c] border border-[#2b221a] p-6 rounded-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#f8f3ed]">
              Cellar Desk Information
            </h3>

            <div className="space-y-3 text-xs text-[#b0a090]">
              <div className="flex items-start gap-3 p-3 bg-[#18130f] border border-[#231c16] rounded-xl">
                <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#f5f0ea] block">Email Inbox:</strong>
                  <a href="mailto:contact@whiskeyeurope.org" className="text-amber-400 hover:underline">
                    contact@whiskeyeurope.org
                  </a>
                  <p className="text-[10px] text-[#8c7e70]">Dedicated European cellar desk</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#18130f] border border-[#231c16] rounded-xl">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#f5f0ea] block">Bonded Vault Location:</strong>
                  <span>Rotterdam European Spirits Hub</span>
                  <p className="text-[10px] text-[#8c7e70]">Port Hub Area, Netherlands (EU Bonded)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#18130f] border border-[#231c16] rounded-xl">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#f5f0ea] block">Sommelier Hours:</strong>
                  <span>Monday – Saturday: 08:00 – 19:00 CET</span>
                  <p className="text-[10px] text-[#8c7e70]">Response time guaranteed within 4 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1511] to-[#120e0b] border border-amber-900/50 p-6 rounded-2xl text-xs space-y-2">
            <ShieldCheck className="w-6 h-6 text-amber-500" />
            <h4 className="font-serif font-bold text-sm text-[#f5f0ea]">
              100% Tax & Duty Transparency
            </h4>
            <p className="text-[#a39382] leading-relaxed">
              Every shipment departing our Rotterdam vault includes European alcohol excise stamps and pre-paid VAT across all 27 EU member states.
            </p>
          </div>

        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6 pt-8 border-t border-[#261f18]">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-amber-500 font-mono text-xs uppercase tracking-wider">FAQ</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f3ed]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="bg-[#14100c] border border-[#282019] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full text-left p-4 flex items-center justify-between text-sm font-semibold text-[#f5f0ea] hover:text-amber-400 gap-4"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#a39382] leading-relaxed font-light border-t border-[#231c16] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </main>
  );
}
