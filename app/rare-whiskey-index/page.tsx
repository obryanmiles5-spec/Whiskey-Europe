import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import CheckoutModal from '@/components/CheckoutModal';
import RareWhiskeyIndexClient from './RareWhiskeyIndexClient';
import { CartProvider } from '@/lib/cart-context';
import { ALL_SEARCH_KEYWORDS } from '@/lib/keyword-registry';
import { WHISKEY_COLLECTION } from '@/lib/whiskeys';
import { 
  Award, 
  Wine, 
  Search, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  BookOpen,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rare Whisky, Bourbon & Spirits Index | Official Keyword & Collector Registry',
  description:
    'Complete European search registry for Jameson, Jack Daniel\'s, Johnnie Walker, Blanton\'s, Pappy Van Winkle, Buffalo Trace, Yamazaki 18, Hakushu, Hibiki, Karuizawa, Macallan Sherry Oak, Weller, Glencairn glassware, and rare spirits allocations.',
  keywords: [
    'Jameson Irish Whiskey', 'Jack Daniel\'s Tennessee Whiskey', 'Johnnie Walker Blue Label',
    'Skrewball Peanut Butter Whiskey', 'Fireball Cinnamon Whiskey', 'Basil Hayden\'s Bourbon',
    'Buffalo Trace Bourbon Cream', 'Hibiki Japanese Harmony', 'Pendleton Whiskey',
    'Angel\'s Envy Bourbon', 'Blanton\'s Single Barrel Bourbon', 'Macallan Single Malt Scotch',
    'Uncle Nearest Whiskey', 'Jim Beam Bourbon', 'Booker\'s Bourbon', 'Monkey Shoulder Scotch',
    'Traveller Whiskey', 'Crown Royal Canadian Whisky', 'Mactasker Whiskey', 'Redbreast Single Pot Still',
    'Woodford Reserve Double Oaked', 'Bird Dog Flavored Whiskey', 'Bulleit Bourbon Rye',
    'Evan Williams Kentucky Bourbon', 'Green Spot Irish Whiskey', 'High West Whiskey',
    'WhistlePig Rye', 'Yamazaki 18 Single Malt', 'Black Velvet Canadian Whisky',
    'George T. Stagg Bourbon', 'Maker\'s Mark 46', 'Nikka From The Barrel', 'Suntory Toki',
    'TX Blended Whiskey', 'Weller Special Reserve 12 Year', 'Wild Turkey 101 Bourbon',
    'Blackened American Whiskey', 'Buchanan\'s Scotch', 'Cutty Sark', 'Indri Indian Single Malt',
    'Proper No. Twelve', 'Sazerac Straight Rye', 'SirDavis American Whisky', 'Still Austin Bourbon',
    'Stranahan\'s Colorado Whiskey', 'Tin Cup American Whiskey', 'Bushmills Irish Whiskey',
    'Chattanooga Bourbon', 'The Dalmore Single Malt', 'Eagle Rare 10 Year 12 Year 25 Year',
    '1792 Small Batch Bourbon', 'Knob Creek 9 12 21', 'Pappy Van Winkle Old Rip Van Winkle',
    'Penelope Bourbon', 'Stagg Jr.', 'Willett Bourbon', 'Four Roses Small Batch',
    'Bardstown Bourbon', 'Horse Soldier', 'Michter\'s 10 25 Celebration Sour Mash',
    'Elijah Craig 18 Year Barrel Strength', 'Brother\'s Bond', 'Doc Holliday', 'King of Kentucky',
    'Larceny Small Batch', 'Old Forester Birthday Bourbon', 'Green River Wheated',
    'Heaven Hill Bourbon', 'Benchmark', 'Blade and Bow', 'Chicken Cock', 'Elmer T. Lee',
    'Frank August', 'New Riff', 'Old Grand-Dad', 'Rabbit Hole', 'Blood Oath Pact',
    'Calumet Farm Single Rack Black', 'Castle & Key', 'Colonel E.H. Taylor Small Batch',
    'Dettling 1867', 'Frey Ranch', 'Madagascar Bourbon Vanilla', 'Old Crow', 'Pinhook',
    'Redwood Empire', 'Russell\'s Reserve', 'Smoke Wagon', 'Widow Jane 10 Year',
    'Woodinville', 'Wolcott', 'Ancient Age', 'Blue Run', 'Peerless', 'Rock Hill Farms',
    'Yellowstone Select', 'A. Smith Bowman Cask Strength', 'Bib & Tucker',
    'Goose Island Bourbon County Stout', 'Garrison Brothers Texas Bourbon',
    'Old Fitzgerald Bottled in Bond', 'Redemption Bourbon', 'Suntory The Chita',
    'Hakushu 12 18 25', 'Kaigan Japanese Whisky', 'D\'Annam Japanese Whiskey Parfum',
    'Kaiyo Mizunara Oak', 'Nobushi Japanese Blended', 'Akashi White Oak', 'Kikori Rice Whiskey',
    'Maen Japanese Whisky', 'Fuji Single Malt', 'Ryujin', 'Iwai Mars Shinshu',
    'Fuyu Small Batch', 'Kurayoshi Pure Malt', 'Hatozaki', 'Kanekou Okinawa',
    'Kyoto Japanese Whisky', 'Meikakuna', 'Sadashi', 'Yamato Armor Takeda Edition',
    'Glencairn Whiskey Glass', 'Whiskey Advent Calendars 2025 2026', 'Whiskey Smoker Kits',
    'Whiskey Stones', 'Whiskey Barrel Planters Aging Barrels'
  ],
  alternates: {
    canonical: 'https://whiskeyeurope.org/rare-whiskey-index',
  },
  openGraph: {
    title: 'Rare Whisky, Bourbon & Spirits Index | Whiskey Europe',
    description:
      'Search and browse the complete index of 126+ famous whiskey brands, rare allocations, Japanese Mizunara, and collector gear stored in bonded cellars in Rotterdam.',
    url: 'https://whiskeyeurope.org/rare-whiskey-index',
    siteName: 'Whiskey Europe',
    type: 'website',
  },
};

export default function RareWhiskeyIndexPage() {
  const masterItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Rare Whisky, Bourbon and Spirits Master Index',
    description: 'Master European search directory and allocation registry for 126+ top whiskey brands, rare single malts, and collector allocations.',
    numberOfItems: ALL_SEARCH_KEYWORDS.length,
    itemListElement: ALL_SEARCH_KEYWORDS.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `https://whiskeyeurope.org/rare-whiskey-index#${item.id}`,
      description: item.tastingNotes,
    })),
  };

  const comprehensiveFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I buy rare allocated bourbons like Blanton\'s, Pappy Van Winkle, Weller, and Eagle Rare in Europe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Whiskey Europe maintains direct bonded cellar allocations in Rotterdam with verified bottles of Blanton\'s Gold/SFTB, Pappy Van Winkle 15/20/23, W.L. Weller 12/Full Proof, Colonel E.H. Taylor, and Eagle Rare 10/12/25, with all EU duties paid and fully insured freight.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are authentic Japanese single malts like Yamazaki 18, Hakushu 12, Hibiki Harmony, and Karuizawa available in the EU?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Whiskey Europe offers certified authentic Japanese whiskies including Yamazaki 18/25/50 Mizunara, Hakushu 12/18/25, Hibiki Harmony/21/30/40, and silent ghost distillery Karuizawa single casks sourced through verified Tokyo auctions and private collections.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I purchase authentic Glencairn whiskey glasses, smoker kits, and advent calendars on Whiskey Europe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we supply official lead-free crystal Glencairn degustation glasses, cocktail oak smoker kits, natural soapstone chilling rocks, and 2025/2026 curated 24-dram premium whiskey advent calendars shipped across Europe.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you guarantee authenticity and bonded delivery for rare bottles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every bottle undergoes high-resolution microscopic closure inspection, fill-level checks against historical archives, UV tag verification, and is shipped in custom temperature-stabilized wooden vaults with full transit insurance across all 27 EU member states.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I find specialty items like Skrewball Peanut Butter, Fireball, Goose Island Bourbon County, and D\'Annam fragrance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Whiskey Europe indexes and stocks artisanal spirit infusions, bourbon-barrel aged imperial stouts (Goose Island BCBS), Japanese whiskey eau de parfum (d\'Annam), and pure Madagascar Bourbon vanilla extracts in our curated lifestyle inventory.',
        },
      },
    ],
  };

  const breadcrumbsSchema = {
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
        name: 'Rare Whiskey & Spirits Index',
        item: 'https://whiskeyeurope.org/rare-whiskey-index',
      },
    ],
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(masterItemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comprehensiveFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <div className="min-h-screen bg-[#0f0d0b] text-[#f5f0ea] flex flex-col justify-between selection:bg-amber-600 selection:text-black">
        <div>
          <Header />

          {/* Hero Header */}
          <section className="bg-gradient-to-b from-[#1b140f] to-[#0f0d0b] border-b border-[#281f18] py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201812] border border-amber-900/60 text-amber-400 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GLOBAL SPIRITS DIRECTORY &amp; ALLOCATION INDEX</span>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#f8f3ed]">
                Whiskey, Bourbon &amp; Spirits Master Index
              </h1>
              
              <p className="text-sm sm:text-base text-[#b0a090] max-w-3xl mx-auto font-light leading-relaxed">
                Comprehensive search directory indexing 126+ world-renowned whiskey brands, rare allocated bourbons, Japanese Mizunara single malts, Scottish ghost distilleries, sommelier glassware, and specialty cellar provisions.
              </p>
              
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
                <Link
                  href="/shop"
                  className="bg-amber-600 hover:bg-amber-500 text-black font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-amber-950/40"
                >
                  <Wine className="w-4 h-4" />
                  <span>Browse Bonded Cellar Shop</span>
                </Link>
                <Link
                  href="/#distillery-map"
                  className="bg-[#1e1712] hover:bg-[#281f18] text-[#e0d3c5] border border-[#33281e] font-medium px-5 py-2.5 rounded-full transition-all"
                >
                  Interactive Distillery Map
                </Link>
                <Link
                  href="/blog"
                  className="bg-[#1e1712] hover:bg-[#281f18] text-[#e0d3c5] border border-[#33281e] font-medium px-5 py-2.5 rounded-full transition-all"
                >
                  Sommelier Tasting Journal
                </Link>
              </div>
            </div>
          </section>

          {/* Master Searchable Client Component */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            
            <RareWhiskeyIndexClient />

            {/* Comprehensive AI & Google Search Knowledge FAQ */}
            <section className="bg-[#140f0c] border border-[#2c2219] rounded-2xl p-6 sm:p-10 space-y-8 shadow-xl">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Curated Knowledge &amp; Allocation FAQ</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f3ed]">
                  Search &amp; Collector Sourcing FAQ
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1a140f] p-5 rounded-xl border border-[#2e2319] space-y-2">
                  <h3 className="font-serif font-bold text-base text-amber-200">
                    How are allocated Bourbons (Blanton&apos;s, Pappy, Weller) sourced in Europe?
                  </h3>
                  <p className="text-xs text-[#c4b5a6] leading-relaxed">
                    Our procurement team works directly with bonded distributors and certified private collections in Europe and Kentucky, guaranteeing 100% genuine provenance with tax-paid customs clearance across the 27 EU member states.
                  </p>
                </div>

                <div className="bg-[#1a140f] p-5 rounded-xl border border-[#2e2319] space-y-2">
                  <h3 className="font-serif font-bold text-base text-amber-200">
                    What makes Japanese Mizunara oak whiskies (Yamazaki 18, Chichibu, Hakushu) so rare?
                  </h3>
                  <p className="text-xs text-[#c4b5a6] leading-relaxed">
                    Indigenous Japanese Mizunara oak trees require at least 200 years to reach maturity before coopering. The wood imparts distinct aromas of sandalwood, temple incense (kara), and oriental spice that cannot be replicated in American or European oak.
                  </p>
                </div>

                <div className="bg-[#1a140f] p-5 rounded-xl border border-[#2e2319] space-y-2">
                  <h3 className="font-serif font-bold text-base text-amber-200">
                    Why use official Glencairn crystal glassware for fine whisky?
                  </h3>
                  <p className="text-xs text-[#c4b5a6] leading-relaxed">
                    Glencairn glasses feature a tapered mouth designed to concentrate complex volatile esters and aromas to the olfactory bulb while dispersing heavy ethanol vapours, maximizing sensory appreciation of vintage single malts.
                  </p>
                </div>

                <div className="bg-[#1a140f] p-5 rounded-xl border border-[#2e2319] space-y-2">
                  <h3 className="font-serif font-bold text-base text-amber-200">
                    How do Cask Club points and allocation reservations work?
                  </h3>
                  <p className="text-xs text-[#c4b5a6] leading-relaxed">
                    Registered members earn 1 Cask Club point per €1 spent, unlocking early 48-hour vault allocation access for hyper-rare releases like Balvenie DCS, Karuizawa, and Macallan Red Collection before general public listing.
                  </p>
                </div>
              </div>
            </section>
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
