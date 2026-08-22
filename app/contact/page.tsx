import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import CheckoutModal from '@/components/CheckoutModal';
import ContactClient from './ContactClient';
import { CartProvider } from '@/lib/cart-context';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Whiskey Europe Bonded Cellars & Support',
  description:
    'Get in touch with our European sommelier team for order assistance, vintage bottle valuation, cask club consultations, or wholesale inquiries. Email: contact@whiskeyeurope.org',
  keywords: [
    'contact whiskey europe',
    'whiskey sommelier consultation',
    'rare spirits customer service',
    'contact@whiskeyeurope.org',
  ],
  alternates: {
    canonical: 'https://whiskeyeurope.org/contact',
  },
  openGraph: {
    title: 'Contact Us | Whiskey Europe Bonded Cellars & Support',
    description:
      'Get in touch with our European sommelier team for order assistance, vintage bottle valuation, cask club consultations, or wholesale inquiries.',
    url: 'https://whiskeyeurope.org/contact',
    siteName: 'Whiskey Europe',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Whiskey Europe Bonded Cellars & Support',
    description:
      'Get in touch with our European sommelier team for order assistance, vintage bottle valuation, or cask club consultations.',
  },
};

export default function ContactPage() {
  const contactBreadcrumbSchema = {
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
        name: 'Contact Us',
        item: 'https://whiskeyeurope.org/contact',
      },
    ],
  };

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Whiskey Europe',
    url: 'https://whiskeyeurope.org/contact',
    description:
      'Contact Whiskey Europe customer care and master sommelier panel for order tracking, bottle valuation, and private allocations.',
    mainEntity: {
      '@type': 'LiquorStore',
      name: 'Whiskey Europe',
      email: 'contact@whiskeyeurope.org',
      telephone: '+31-10-890-4422',
      url: 'https://whiskeyeurope.org',
    },
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <div className="min-h-screen bg-[#0f0d0b] text-[#f5f0ea] flex flex-col justify-between selection:bg-amber-600 selection:text-black">
        <div>
          <Header />
          <ContactClient />
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
