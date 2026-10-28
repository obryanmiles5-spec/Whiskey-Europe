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
  const set = new Set<string>();
  BLOG_ARTICLES.forEach((article) => {
    if (article.slug) set.add(article.slug);
    if ((article as any).id) set.add((article as any).id);
  });
  return Array.from(set).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  const article = BLOG_ARTICLES.find(
    (a) => a.slug === slug || a.slug.toLowerCase() === decodedSlug || (a as any).id === slug
  );
  if (!article) return { title: 'Article Not Found | Whiskey Europe' };

  const canonicalUrl = `https://www.whiskeyeurope.org/blog/${article.slug}`;

  return {
    title: `${article.title} | Whiskey Europe Journal`,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} | Whiskey Europe Journal`,
      description: article.excerpt,
      url: canonicalUrl,
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
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  const article = BLOG_ARTICLES.find(
    (a) => a.slug === slug || a.slug.toLowerCase() === decodedSlug || (a as any).id === slug
  );

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
        url: 'https://www.whiskeyeurope.org/icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.whiskeyeurope.org/blog/${article.slug}`,
    },
  };

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white">
        <div>
          <Header />

          {/* Article Main Hero */}
          <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
            
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors bg-white px-3.5 py-2 rounded-lg border border-zinc-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journal</span>
            </Link>

            {/* Title & Metadata */}
            <div className="space-y-4">
              <span className="bg-amber-950/80 text-amber-400 border border-amber-800/50 text-xs font-mono px-3 py-1 rounded-full inline-block">
                {article.category}
              </span>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-black leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 border-y border-zinc-300 py-3">
                <span>By <strong className="text-black">{article.author}</strong></span>
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
            <div className="relative h-[360px] sm:h-[450px] w-full rounded-2xl overflow-hidden border border-zinc-300">
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
            <div className="prose prose-invert max-w-none text-base text-zinc-600 leading-relaxed space-y-6 font-light">
              <p className="text-lg text-black font-normal italic border-l-2 border-amber-500 pl-4 py-1">
                {article.excerpt}
              </p>

              {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Footer Author Card */}
            <div className="bg-white border border-zinc-300 p-6 rounded-xl flex items-center justify-between gap-4 mt-12">
              <div>
                <span className="text-[10px] text-amber-400 font-mono uppercase">PUBLISHED BY WHISKEY EUROPE</span>
                <h4 className="font-serif font-bold text-base text-black">{article.author}</h4>
                <p className="text-xs text-zinc-600">Sommelier &amp; Spirits Curator • domain: whiskeyeurope.org</p>
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
