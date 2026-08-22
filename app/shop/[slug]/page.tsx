import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import CheckoutModal from '@/components/CheckoutModal';
import { CartProvider } from '@/lib/cart-context';
import { WHISKEY_COLLECTION, Whiskey } from '@/lib/whiskeys';
import ProductClientDetails from './ProductClientDetails';
import { 
  ShieldCheck, 
  Award, 
  Wine, 
  MapPin, 
  Sparkles, 
  ArrowLeft, 
  ChevronRight, 
  Share2, 
  Lock, 
  Truck, 
  Clock, 
  Flame, 
  Star 
} from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return WHISKEY_COLLECTION.map((whiskey) => ({
    slug: whiskey.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const whiskey = WHISKEY_COLLECTION.find(
    (w) => w.id === slug || w.id.toLowerCase() === slug.toLowerCase()
  );

  if (!whiskey) {
    return {
      title: 'Whisky Allocation Not Found | Whiskey Europe',
      description: 'The requested rare bottle allocation could not be found in our bonded cellar.',
    };
  }

  const title = `${whiskey.name} - ${whiskey.age > 0 ? `${whiskey.age} Year Old` : 'Rare Vintage'} ${whiskey.volumeMl}ml | Whiskey Europe`;
  const description = `Buy authentic ${whiskey.name} (${whiskey.abv}% ABV, ${whiskey.volumeMl}ml) matured in ${whiskey.caskType} casks at ${whiskey.distillery}. Tasting notes: Nose: ${whiskey.tastingNotes.nose} | Palate: ${whiskey.tastingNotes.palate}. Climate-controlled bonded shipping across Europe.`;

  const keywords = [
    whiskey.name,
    `${whiskey.distillery} ${whiskey.age > 0 ? `${whiskey.age} year old` : ''}`,
    `${whiskey.name} buy online`,
    `${whiskey.name} price`,
    `${whiskey.distillery} whisky europe`,
    whiskey.caskType,
    whiskey.region,
    whiskey.country,
    'rare whisky allocation europe',
    'authentic vintage single malt',
    'bonded cellar delivery europe',
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://whiskeyeurope.org/shop/${whiskey.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://whiskeyeurope.org/shop/${whiskey.id}`,
      siteName: 'Whiskey Europe',
      images: [
        {
          url: whiskey.image || 'https://lh3.googleusercontent.com/d/12Xn18KSHqyNIDRTEwZmH3-eIaT5LESZ6',
          width: 800,
          height: 1000,
          alt: whiskey.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [whiskey.image || 'https://lh3.googleusercontent.com/d/12Xn18KSHqyNIDRTEwZmH3-eIaT5LESZ6'],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const whiskey = WHISKEY_COLLECTION.find(
    (w) => w.id === slug || w.id.toLowerCase() === slug.toLowerCase()
  );

  if (!whiskey) {
    notFound();
  }

  // Related products from same category or distillery
  const relatedWhiskeys = WHISKEY_COLLECTION.filter(
    (w) => w.id !== whiskey.id && (w.category === whiskey.category || w.distillery === whiskey.distillery)
  ).slice(0, 4);

  // Schema.org Product JSON-LD structured data
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: whiskey.name,
    image: [whiskey.image || 'https://lh3.googleusercontent.com/d/12Xn18KSHqyNIDRTEwZmH3-eIaT5LESZ6'],
    description: `Authentic ${whiskey.name} produced by ${whiskey.distillery} in ${whiskey.region}, ${whiskey.country}. ${whiskey.age > 0 ? `${whiskey.age} Years Old.` : ''} Cask: ${whiskey.caskType}. ABV: ${whiskey.abv}%. Nose: ${whiskey.tastingNotes.nose}. Palate: ${whiskey.tastingNotes.palate}. Finish: ${whiskey.tastingNotes.finish}.`,
    sku: whiskey.id,
    mpn: whiskey.id,
    brand: {
      '@type': 'Brand',
      name: whiskey.distillery,
    },
    category: `Food, Beverages & Tobacco > Beverages > Alcoholic Beverages > Spirits > ${whiskey.category}`,
    offers: {
      '@type': 'Offer',
      url: `https://whiskeyeurope.org/shop/${whiskey.id}`,
      priceCurrency: 'EUR',
      price: whiskey.price.toFixed(2),
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'LiquorStore',
        name: 'Whiskey Europe',
        url: 'https://whiskeyeurope.org',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'EU',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: 'EUR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: ['AT', 'BE', 'DE', 'FR', 'IT', 'NL', 'ES', 'SE', 'DK', 'PL', 'IE', 'GB'],
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: whiskey.rating.toString(),
      reviewCount: whiskey.reviewsCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
  };

  const breadcrumbSchema = {
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
        name: 'Boutique Shop',
        item: 'https://whiskeyeurope.org/shop',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: whiskey.category,
        item: `https://whiskeyeurope.org/shop?category=${encodeURIComponent(whiskey.category)}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: whiskey.name,
        item: `https://whiskeyeurope.org/shop/${whiskey.id}`,
      },
    ],
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#0f0d0b] text-[#f5f0ea] flex flex-col justify-between selection:bg-amber-600 selection:text-black">
        <div>
          <Header />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-[#a39382] overflow-x-auto no-scrollbar pb-1">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#54473d]" />
              <Link href="/shop" className="hover:text-amber-400 transition-colors">
                Shop
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#54473d]" />
              <Link
                href={`/shop?category=${encodeURIComponent(whiskey.category)}`}
                className="hover:text-amber-400 transition-colors"
              >
                {whiskey.category}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#54473d]" />
              <span className="text-[#f8f3ed] font-medium truncate max-w-[200px] sm:max-w-none">
                {whiskey.name}
              </span>
            </nav>

            {/* Interactive Product Details & Purchase Engine */}
            <ProductClientDetails whiskey={whiskey} />

            {/* Comprehensive Technical & Provenance Specifications */}
            <section className="bg-[#140f0c] border border-[#2e241b] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-[#2b221a] pb-4">
                <h2 className="font-serif text-2xl font-bold text-[#f8f3ed] flex items-center gap-2.5">
                  <Award className="w-6 h-6 text-amber-500" />
                  <span>Curator Provenance &amp; Technical Specifications</span>
                </h2>
                <p className="text-xs text-[#a39382] mt-1">
                  Verified by the Whiskey Europe Sommelier Panel &amp; Bonded Cellar Vault in Rotterdam.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#1b1511] p-4 rounded-xl border border-[#33281e] space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#918170]">Distillery</span>
                  <p className="font-serif font-bold text-amber-200 text-base">{whiskey.distillery}</p>
                  <p className="text-xs text-[#a8998a]">{whiskey.region}, {whiskey.country}</p>
                </div>

                <div className="bg-[#1b1511] p-4 rounded-xl border border-[#33281e] space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#918170]">Maturation / Cask</span>
                  <p className="font-serif font-bold text-amber-200 text-base">{whiskey.caskType}</p>
                  <p className="text-xs text-[#a8998a]">{whiskey.type}</p>
                </div>

                <div className="bg-[#1b1511] p-4 rounded-xl border border-[#33281e] space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#918170]">Age &amp; Strength</span>
                  <p className="font-serif font-bold text-amber-200 text-base">
                    {whiskey.age > 0 ? `${whiskey.age} Years Old` : 'Prestige Release'} • {whiskey.abv}% ABV
                  </p>
                  <p className="text-xs text-[#a8998a]">{whiskey.volumeMl}ml Bottling</p>
                </div>

                <div className="bg-[#1b1511] p-4 rounded-xl border border-[#33281e] space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#918170]">Cellar Verification</span>
                  <p className="font-serif font-bold text-emerald-400 text-base flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100% Authenticated</span>
                  </p>
                  <p className="text-xs text-[#a8998a]">Tamper-Proof NFC Hologram</p>
                </div>
              </div>

              {/* Flavor Profile Radar Matrix */}
              <div className="pt-4 border-t border-[#281f18] space-y-4">
                <h3 className="font-serif font-bold text-base text-[#f8f3ed]">
                  Sensory Flavor Matrix (1-10 Scale)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: 'Peated & Smoky', val: whiskey.flavorProfile.peatedSmoky },
                    { label: 'Sherry Sweetness', val: whiskey.flavorProfile.sherrySweet },
                    { label: 'Fruity & Floral', val: whiskey.flavorProfile.fruityFloral },
                    { label: 'Oak & Spice', val: whiskey.flavorProfile.oakSpicy },
                    { label: 'Vanilla & Caramel', val: whiskey.flavorProfile.vanillaCaramel },
                  ].map((fl) => (
                    <div key={fl.label} className="bg-[#18130f] p-3 rounded-lg border border-[#2b221a] space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#a39382]">{fl.label}</span>
                        <span className="font-mono font-bold text-amber-400">{fl.val}/10</span>
                      </div>
                      <div className="w-full bg-[#241d17] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full"
                          style={{ width: `${(fl.val / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Related Cellar Allocations */}
            {relatedWhiskeys.length > 0 && (
              <section className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f8f3ed]">
                      Related Cellar Allocations
                    </h2>
                    <p className="text-xs sm:text-sm text-[#a39382]">
                      Similar vintage bottlings from {whiskey.distillery} &amp; {whiskey.category}
                    </p>
                  </div>
                  <Link
                    href={`/shop?category=${encodeURIComponent(whiskey.category)}`}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>View All {whiskey.category}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedWhiskeys.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/shop/${rel.id}`}
                      className="bg-gradient-to-b from-[#1c1611] to-[#140f0c] border border-[#31271e] hover:border-amber-500/70 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group p-4 space-y-3"
                    >
                      <div className="relative h-48 w-full bg-[#100d0a] rounded-xl overflow-hidden border border-[#281f18]">
                        {rel.image ? (
                          <Image
                            src={rel.image}
                            alt={rel.name}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 100vw, 25vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-amber-500">
                            <Wine className="w-8 h-8" />
                          </div>
                        )}
                        {rel.badge && (
                          <span className="absolute top-2 left-2 bg-amber-600 text-black text-[9px] font-extrabold px-2 py-0.5 rounded">
                            {rel.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-amber-500">{rel.distillery}</span>
                        <h4 className="font-serif font-bold text-sm text-[#f8f3ed] group-hover:text-amber-400 transition-colors line-clamp-1">
                          {rel.name}
                        </h4>
                        <p className="text-xs text-[#a39382] font-mono mt-1">€{rel.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
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
