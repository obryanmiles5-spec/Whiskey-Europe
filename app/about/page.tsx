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
  description:
    'Learn about Whiskey Europe’s heritage, bonded climate-controlled cellars in Rotterdam, sommelier tasting panel, anti-counterfeit guarantee, and direct distillery allocations across Europe.',
  keywords: [
    'about whiskey europe',
    'bonded spirits cellar rotterdam',
    'rare whisky provenance',
    'sommelier verified spirits europe',
    'whiskey cellar master panel',
  ],
  alternates: {
    canonical: 'https://whiskeyeurope.org/about',
  },
  openGraph: {
    title: 'About Us | Whiskey Europe Bonded Cellars & Sommelier Team',
    description:
      'Learn about Whiskey Europe’s heritage, bonded climate-controlled cellars in Rotterdam, sommelier tasting panel, and direct distillery allocations.',
    url: 'https://whiskeyeurope.org/about',
    siteName: 'Whiskey Europe',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Whiskey Europe Bonded Cellars & Sommelier Team',
    description:
      'Learn about Whiskey Europe’s heritage, bonded climate-controlled cellars in Rotterdam, and sommelier tasting panel.',
  },
};

export default function AboutPage() {
  const aboutBreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://whiskeyeurope.org',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About Us',
        item: 'https://whiskeyeurope.org/about',
      },
    ],
  };

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Whiskey Europe',
    url: 'https://whiskeyeurope.org/about',
    description:
      'History, bonded vault facilities, sommelier tasting panel, and authentic direct distillery allocations across Europe.',
    mainEntity: {
      '@type': 'LiquorStore',
      name: 'Whiskey Europe',
      url: 'https://whiskeyeurope.org',
    },
  };
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
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

            {/* Spirits Knowledge & FAQ */}
            <div className="space-y-8 pt-6">
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-amber-500 font-mono text-xs uppercase tracking-wider">
                  KNOWLEDGE BASE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f3ed]">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-[#a39382]">
                  Explore answers to common questions about global spirits, from what is cognac to the difference between mezcal and tequila.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className="bg-[#14100c] border border-[#282019] p-5 rounded-xl">
                  <h3 className="font-serif font-bold text-[#f5f0ea] mb-2">What is the difference between mezcal and tequila?</h3>
                  <p className="text-xs text-[#a39382] leading-relaxed">
                    Wondering about <strong>tequila vs mezcal</strong>? Both are agave-based Mexican spirits, but they differ in production. <strong>What is tequila made of?</strong> It must be made from 100% Blue Weber Agave, mostly in Jalisco. <strong>What is mezcal?</strong> Mezcal can be made from over 30 agave types, and the piñas are traditionally roasted in underground pits, giving it a signature smoky flavor. Popular tequila brands include Don Julio 1942, while authentic mezcal liquor often comes from Oaxaca, Mexico.
                  </p>
                </div>
                
                <div className="bg-[#14100c] border border-[#282019] p-5 rounded-xl">
                  <h3 className="font-serif font-bold text-[#f5f0ea] mb-2">What is Cognac and how does it differ from Brandy?</h3>
                  <p className="text-xs text-[#a39382] leading-relaxed">
                    <strong>What is cognac?</strong> Cognac is a specific type of premium brandy produced exclusively in the Cognac region of France. It is double-distilled in copper pot stills and aged in French oak barrels. The top <strong>cognac brands list</strong> is dominated by names like Hennessy, Rémy Martin (creators of the legendary Remy Louis 13 cognac), and T Hine.
                  </p>
                </div>

                <div className="bg-[#14100c] border border-[#282019] p-5 rounded-xl">
                  <h3 className="font-serif font-bold text-[#f5f0ea] mb-2">What are the most popular scotch brands?</h3>
                  <p className="text-xs text-[#a39382] leading-relaxed">
                    When looking at a <strong>list of scotch brands</strong>, there are two main categories: single malts and blended scotch. <strong>Single malt scotch brands</strong> like Macallan (Macallan UK), Dalmore whiskey, Glenfiddich (often misspelled glindfich), and Lagavulin Single Malt 16 dominate the premium tier. Popular <strong>blended scotch whisky brands</strong> include Johnnie Walker, Ballantine&apos;s, and Chivas Regal.
                  </p>
                </div>

                <div className="bg-[#14100c] border border-[#282019] p-5 rounded-xl">
                  <h3 className="font-serif font-bold text-[#f5f0ea] mb-2">How do you pronounce Laphroaig?</h3>
                  <p className="text-xs text-[#a39382] leading-relaxed">
                    A common question among beginners is <strong>Laphroaig pronounce</strong>. The famous Islay single malt scotch is pronounced &quot;La-FROYg&quot; (rhymes with boy). It is one of the most heavily peated <strong>scotch whiskey from Islay</strong>, sitting alongside Ardbeg 10 and Caol Ila Islay as a staple of the island&apos;s smoky whiskey flavor.
                  </p>
                </div>
                
                <div className="bg-[#14100c] border border-[#282019] p-5 rounded-xl">
                  <h3 className="font-serif font-bold text-[#f5f0ea] mb-2">What is Soju vs Cachaca?</h3>
                  <p className="text-xs text-[#a39382] leading-relaxed">
                    <strong>What is soju?</strong> Soju is a clear, low-alcohol Korean distilled beverage traditionally made from rice or sweet potatoes. On the other hand, <strong>Cachaca</strong> (kashasha drink / cachaça) is the national spirit of Brazil, a spicy, fruity liquor made directly from fermented sugarcane juice, often compared to rum (but distinct from standard cuban rum).
                  </p>
                </div>
                
                <div className="bg-[#14100c] border border-[#282019] p-5 rounded-xl">
                  <h3 className="font-serif font-bold text-[#f5f0ea] mb-2">Whats a sherry cask finish?</h3>
                  <p className="text-xs text-[#a39382] leading-relaxed">
                    <strong>Whats a sherry?</strong> Sherry is a fortified wine from Spain. In the whisky world, a &quot;sherry cask finish&quot; means aging single speyside malt whisky in barrels that previously held Oloroso or Pedro Ximénez sherry. This imparts deep flavors of raisins, dark chocolate, and figs—a signature whiskey flavor found in Aberlour 12, Dalwhinnie, and Macallan.
                  </p>
                </div>
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
