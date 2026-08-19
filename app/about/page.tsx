import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import CheckoutModal from '@/components/CheckoutModal';
import { CartProvider } from '@/lib/cart-context';
import { ShieldCheck, Wine, Award, MapPin, Truck, CheckCircle2, Compass, Globe, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Whiskey Europe Bonded Cellars & Sommelier Team',
  description: 'Learn about Whiskey Europe’s history, bonded climate-controlled cellars in Rotterdam, sommelier tasting panel, anti-counterfeit guarantee, and direct distillery allocations across Europe.',
};

export default function AboutPage() {
  const pillars = [
    {
      title: 'Direct Distillery Allocations',
      desc: 'We bypass intermediaries to partner directly with heritage distilleries in Islay, Speyside, Cork, Antrim, Brittany, and Gävleborg for guaranteed authentic single casks.',
      icon: Wine,
    },
    {
      title: 'EU Bonded Climate Control',
      desc: 'All vintage bottles rest in our temperature and humidity-stabilized bonded vault in Rotterdam before dispatch across 27 EU member states.',
      icon: MapPin,
    },
    {
      title: 'Sommelier Verified Tasting',
      desc: 'Our panel of EU Sommelier Masters evaluates every batch for nose complexity, mouthfeel balance, cask finish integrity, and sensory finish.',
      icon: Award,
    },
    {
      title: 'Pre-paid VAT & Custom Duties',
      desc: 'Zero surprise taxes or customs holds. All prices include national excise taxes and standard VAT across the European Union.',
      icon: ShieldCheck,
    },
  ];

  const teamMembers = [
    {
      name: 'Lord Alistair MacIntyre',
      role: 'Master Cellar Sommelier & Islay Curator',
      experience: '32 Years in Scotch Spirits Valuation',
      bio: 'Former distillery director with decades of experience selecting private single sherry puncheons and rare vintage releases.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Elena Vance-Svensson',
      role: 'Head of Nordic & European Craft Spirits',
      experience: 'European Spirits Guild Judge',
      bio: 'Specialist in Swedish oak maturation, French barley double-distillation, and rare craft barrel finishes across mainland Europe.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Seán O’Callaghan',
      role: 'Irish Pot Still & Heritage Vintage Lead',
      experience: 'Cork & Antrim Spirits Scholar',
      bio: 'Passionate about triple-distilled single pot still Irish whiskies, historic cask restorations, and custom laser box engraving.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0f0d0b] text-[#f5f0ea] flex flex-col justify-between selection:bg-amber-600 selection:text-black">
        <div>
          <Header />

          <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 py-12 space-y-16">
            
            {/* Hero Section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-amber-500 font-mono text-xs uppercase tracking-widest bg-amber-950/60 px-3.5 py-1 rounded-full border border-amber-800/40">
                ESTABLISHED FOR EUROPEAN CONNOISSEURS
              </span>
              <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#f8f3ed] leading-tight">
                Our Passion for Rare Spirits & European Heritage
              </h1>
              <p className="text-sm sm:text-base text-[#b8a99a] leading-relaxed font-light">
                Whiskey Europe (<strong className="text-[#f5f0ea]">whiskeyeurope.org</strong>) was founded to unite collectors and tasting enthusiasts across the continent with authentic, directly-sourced rare cask whiskies.
              </p>
            </div>

            {/* Story Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#14100c] border border-[#2b221a] p-6 sm:p-10 rounded-2xl shadow-2xl">
              <div className="relative h-80 sm:h-[420px] w-full rounded-xl overflow-hidden border border-[#231c16]">
                <Image
                  src="https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=1200&auto=format&fit=crop"
                  alt="Whiskey Europe Cellar Vault"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-6">
                <span className="text-amber-500 text-xs font-mono tracking-wider uppercase">
                  THE ROTTERDAM BONDED HUB
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f3ed]">
                  Preserving Cask Integrity from Distillery to Glass
                </h2>
                <p className="text-xs sm:text-sm text-[#b0a090] leading-relaxed font-light">
                  Fine whisky is a living spirit shaped by climate, oak char, and years of silent maturation. Our primary logistics vault in Rotterdam operates under strict humidity control (65%) and steady 14°C ambient cellar temperatures.
                </p>
                <p className="text-xs sm:text-sm text-[#b0a090] leading-relaxed font-light">
                  Every single bottle is inspected by hand, stamped with an individual serial hologram, and fitted with shock-absorbent thermal air-cushioned transit packaging before being dispatched across 27 EU states via insured express freight.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="p-3 bg-[#18130f] border border-[#2b221a] rounded-lg">
                    <span className="font-serif font-bold text-lg text-amber-400 block">100%</span>
                    <span className="text-[#a39382]">Anti-Counterfeit Authenticity</span>
                  </div>
                  <div className="p-3 bg-[#18130f] border border-[#2b221a] rounded-lg">
                    <span className="font-serif font-bold text-lg text-amber-400 block">27 EU</span>
                    <span className="text-[#a39382]">Seamless Customs Transit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="space-y-8">
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f3ed]">
                  The Whiskey Europe Guarantee
                </h2>
                <p className="text-xs text-[#a39382]">
                  Four unwavering commitments behind every single bottle sold on our platform.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pillars.map((p, i) => {
                  const IconComp = p.icon;
                  return (
                    <div
                      key={i}
                      className="bg-[#14100c] border border-[#282019] p-6 rounded-xl space-y-3 hover:border-amber-600/50 transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-800/40 flex items-center justify-center text-amber-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#f5f0ea]">
                        {p.title}
                      </h3>
                      <p className="text-xs text-[#a39382] leading-relaxed font-light">
                        {p.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sommelier & Cellar Masters */}
            <div className="space-y-8 pt-6">
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <span className="text-amber-500 font-mono text-xs uppercase tracking-wider">
                  SENSORY PANEL & CURATORS
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f3ed]">
                  Meet Our Cellar Masters
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teamMembers.map((m, i) => (
                  <div
                    key={i}
                    className="bg-[#14100c] border border-[#282019] rounded-xl overflow-hidden p-5 space-y-4 text-center hover:border-amber-600/50 transition-all"
                  >
                    <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-2 border-amber-600/50 shadow-xl">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#f8f3ed]">
                        {m.name}
                      </h3>
                      <span className="text-xs text-amber-400 font-medium block mt-0.5">
                        {m.role}
                      </span>
                      <span className="text-[10px] text-[#8c7e70] font-mono block">
                        {m.experience}
                      </span>
                    </div>
                    <p className="text-xs text-[#a39382] font-light leading-relaxed">
                      {m.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action Banner */}
            <div className="bg-gradient-to-r from-amber-950/80 via-[#1a140f] to-[#120e0b] border border-amber-900/60 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
              <h3 className="font-serif text-2xl font-bold text-[#f8f3ed]">
                Explore Our Current Cellar Allocations
              </h3>
              <p className="text-xs text-[#b8a99a] max-w-md mx-auto">
                Discover rare Islay malts, Speyside vintage sherry casks, and limited European craft whiskies ready for instant dispatch.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs px-6 py-3 rounded-lg inline-block shadow-lg transition-transform transform hover:-translate-y-0.5"
                >
                  Enter the Boutique Shop
                </Link>
              </div>
            </div>

          </main>
        </div>

        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <SearchOverlay />
        <AgeVerificationModal />
        <CheckoutModal />
      </div>
    </CartProvider>
  );
}
