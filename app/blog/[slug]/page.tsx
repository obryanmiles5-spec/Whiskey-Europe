import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_ARTICLES } from '@/lib/whiskeys';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { CartProvider } from '@/lib/cart-context';
import { ArrowLeft, Calendar, Clock, BookOpen, Share2 } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found | Whiskey Europe' };

  return {
    title: `${article.title} | Whiskey Europe Journal`,
    description: article.excerpt,
    alternates: {
      canonical: `https://whiskeyeurope.org/blog/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | Whiskey Europe Journal`,
      description: article.excerpt,
      url: `https://whiskeyeurope.org/blog/${article.slug}`,
      siteName: 'Whiskey Europe',
      images: [
        {
          url: article.thumbnail,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.thumbnail],
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: [article.thumbnail],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Whiskey Europe',
      logo: {
        '@type': 'ImageObject',
        url: 'https://whiskeyeurope.org/icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://whiskeyeurope.org/blog/${article.slug}`,
    },
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-screen bg-[#0f0d0b] text-[#f5f0ea] flex flex-col justify-between selection:bg-amber-600 selection:text-black">
        <div>
          <Header />

          {/* Article Main Hero */}
          <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
            
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors bg-[#18130f] px-3.5 py-2 rounded-lg border border-[#2b221a]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journal</span>
            </Link>

            {/* Title & Metadata */}
            <div className="space-y-4">
              <span className="bg-amber-950/80 text-amber-400 border border-amber-800/50 text-xs font-mono px-3 py-1 rounded-full inline-block">
                {article.category}
              </span>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#f8f3ed] leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#a39382] border-y border-[#261f18] py-3">
                <span>By <strong className="text-[#f5f0ea]">{article.author}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" /> {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> {article.readTime}
                </span>
              </div>
            </div>

            {/* Article Thumbnail */}
            <div className="relative h-[360px] sm:h-[450px] w-full rounded-2xl overflow-hidden border border-[#2e261f]">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Content Paragraphs */}
            <div className="prose prose-invert max-w-none text-base text-[#c4b6a7] leading-relaxed space-y-6 font-light">
              <p className="text-lg text-[#f5f0ea] font-normal italic border-l-2 border-amber-500 pl-4 py-1">
                {article.excerpt}
              </p>

              {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Footer Author Card */}
            <div className="bg-[#171310] border border-[#2b221a] p-6 rounded-xl flex items-center justify-between gap-4 mt-12">
              <div>
                <span className="text-[10px] text-amber-400 font-mono uppercase">PUBLISHED BY WHISKEY EUROPE</span>
                <h4 className="font-serif font-bold text-base text-[#f5f0ea]">{article.author}</h4>
                <p className="text-xs text-[#8c7e70]">Sommelier &amp; Spirits Curator • domain: whiskeyeurope.org</p>
              </div>

              <Link
                href="/shop"
                className="bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs px-4 py-2.5 rounded-md"
              >
                Browse Cellar
              </Link>
            </div>

          </main>
        </div>

        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <SearchOverlay />
        <AgeVerificationModal />
      </div>
    </CartProvider>
  );
}
