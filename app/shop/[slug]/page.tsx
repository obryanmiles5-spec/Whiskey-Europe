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
  const set = new Set<string>();
  WHISKEY_COLLECTION.forEach((whiskey) => {
    if (whiskey.slug) set.add(whiskey.slug);
    if (whiskey.id) set.add(whiskey.id);
  });
  return Array.from(set).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  const whiskey = WHISKEY_COLLECTION.find(
    (w) =>
      w.slug?.toLowerCase() === decodedSlug ||
      w.id?.toLowerCase() === decodedSlug ||
      w.slug === slug ||
      w.id === slug
  );

  if (!whiskey) {
    return {
      title: 'Whisky Allocation Not Found | Whiskey Europe',
      description: 'The requested rare bottle allocation could not be found in our bonded cellar.',
    };
  }

  const title = `${whiskey.name} - ${whiskey.age > 0 ? `${whiskey.age} Year Old` : 'Rare Vintage'} ${whiskey.volumeMl}ml | Whiskey Europe`;
  const description = `Buy authentic ${whiskey.name} (${whiskey.abv}% ABV, ${whiskey.volumeMl}ml) matured in ${whiskey.caskType} casks at ${whiskey.distillery}. Tasting notes: Nose: ${whiskey.tastingNotes.nose} | Palate: ${whiskey.tastingNotes.palate}. Climate-controlled bonded shipping across Europe.`;

  const canonicalUrl = `https://www.whiskeyeurope.org/shop/${whiskey.slug || whiskey.id}`;

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
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  const whiskey = WHISKEY_COLLECTION.find(
    (w) =>
      w.slug?.toLowerCase() === decodedSlug ||
      w.id?.toLowerCase() === decodedSlug ||
      w.slug === slug ||
      w.id === slug
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
      url: `https://www.whiskeyeurope.org/shop/${whiskey.slug || whiskey.id}`,
      priceCurrency: 'EUR',
      price: whiskey.price.toFixed(2),
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'LiquorStore',
        name: 'Whiskey Europe',
        url: 'https://www.whiskeyeurope.org',
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
        item: 'https://www.whiskeyeurope.org',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Boutique Shop',
        item: 'https://www.whiskeyeurope.org/shop',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: whiskey.category,
        item: `https://www.whiskeyeurope.org/shop?category=${encodeURIComponent(whiskey.category)}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: whiskey.name,
        item: `https://www.whiskeyeurope.org/shop/${whiskey.slug || whiskey.id}`,
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

      <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white">
        <div>
          <Header />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-zinc-600 overflow-x-auto no-scrollbar pb-1">
              <Link href="/" className="hover:text-black font-semibold transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <Link href="/shop" className="hover:text-black font-semibold transition-colors">
                Shop
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <Link
                href={`/shop?category=${encodeURIComponent(whiskey.category)}`}
                className="hover:text-black font-semibold transition-colors"
              >
                {whiskey.category}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-black font-bold truncate max-w-[200px] sm:max-w-none">
                {whiskey.name}
              </span>
            </nav>

            {/* Interactive Product Details & Purchase Engine */}
            <ProductClientDetails whiskey={whiskey} />

            {/* Comprehensive Technical & Provenance Specifications */}
            <section className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-2 border-zinc-200 pb-4">
                <h2 className="font-serif text-2xl font-black text-black flex items-center gap-2.5">
                  <Award className="w-6 h-6 text-black" />
                  <span>Curator Provenance &amp; Technical Specifications</span>
                </h2>
                <p className="text-xs text-zinc-600 mt-1 font-medium">
                  Verified by the Whiskey Europe Sommelier Panel &amp; Bonded Cellar Vault in Rotterdam.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-zinc-50 p-4 rounded-xl border-2 border-black space-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Distillery</span>
                  <p className="font-serif font-black text-black text-base">{whiskey.distillery}</p>
                  <p className="text-xs text-zinc-600 font-medium">{whiskey.region}, {whiskey.country}</p>
                </div>

                <div className="bg-zinc-50 p-4 rounded-xl border-2 border-black space-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Maturation / Cask</span>
                  <p className="font-serif font-black text-black text-base">{whiskey.caskType}</p>
                  <p className="text-xs text-zinc-600 font-medium">{whiskey.type}</p>
                </div>

                <div className="bg-zinc-50 p-4 rounded-xl border-2 border-black space-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Age &amp; Strength</span>
                  <p className="font-serif font-black text-black text-base">
                    {whiskey.age > 0 ? `${whiskey.age} Years Old` : 'Prestige Release'} • {whiskey.abv}% ABV
                  </p>
                  <p className="text-xs text-zinc-600 font-medium">{whiskey.volumeMl}ml Bottling</p>
                </div>

                <div className="bg-zinc-50 p-4 rounded-xl border-2 border-black space-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Cellar Verification</span>
                  <p className="font-serif font-black text-black text-base flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>100% Authenticated</span>
                  </p>
                  <p className="text-xs text-zinc-600 font-medium">Tamper-Proof NFC Hologram</p>
                </div>
              </div>

              {/* Flavor Profile Radar Matrix */}
              <div className="pt-4 border-t-2 border-zinc-200 space-y-4">
                <h3 className="font-serif font-black text-base text-black">
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
                    <div key={fl.label} className="bg-zinc-50 p-3 rounded-lg border-2 border-black space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-700 font-bold">{fl.label}</span>
                        <span className="font-mono font-black text-black">{fl.val}/10</span>
                      </div>
                      <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden border border-zinc-400">
                        <div
                          className="bg-black h-full rounded-full"
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
                    <h2 className="font-serif text-2xl sm:text-3xl font-black text-black">
                      Related Cellar Allocations
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 font-medium">
                      Similar vintage bottlings from {whiskey.distillery} &amp; {whiskey.category}
                    </p>
                  </div>
                  <Link
                    href={`/shop?category=${encodeURIComponent(whiskey.category)}`}
                    className="text-xs font-black text-black hover:underline flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span>View All {whiskey.category}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedWhiskeys.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/shop/${rel.slug || rel.id}`}
                      className="bg-white border-2 border-black hover:border-black rounded-2xl overflow-hidden shadow-md hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col group p-4 space-y-3 cursor-pointer"
                    >
                      <div className="relative h-48 w-full bg-zinc-50 rounded-xl overflow-hidden border border-zinc-300">
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
                          <div className="w-full h-full flex items-center justify-center text-black">
                            <Wine className="w-8 h-8" />
                          </div>
                        )}
                        {rel.badge && (
                          <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                            {rel.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-zinc-500 font-bold">{rel.distillery}</span>
                        <h4 className="font-serif font-black text-sm text-black group-hover:underline transition-all line-clamp-1">
                          {rel.name}
                        </h4>
                        <p className="text-xs text-black font-mono font-bold mt-1">€{rel.price.toFixed(2)}</p>
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
