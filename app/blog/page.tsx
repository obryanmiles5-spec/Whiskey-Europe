import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_ARTICLES } from '@/lib/whiskeys';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchOverlay from '@/components/SearchOverlay';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { CartProvider } from '@/lib/cart-context';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Filter } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Whiskey Europe Journal | Spirits Sommelier & Market Insights',
  description: 'Read the latest editorial guides, collector insights, masterclasses, and European spirits shipping regulations.',
};

export default function BlogPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0f0d0b] text-[#f5f0ea] flex flex-col justify-between">
        <div>
          <Header />

          {/* Hero Section */}
          <section className="relative py-16 sm:py-20 border-b border-[#241d17] bg-gradient-to-b from-[#14100c] to-[#0f0d0b]">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 text-center max-w-4xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1612] border border-amber-900/50 text-amber-400 text-xs font-mono uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" />
                <span>WHISKEY EUROPE JOURNAL & DISPATCHES</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#f8f3ed] tracking-tight">
                Curated Malt Insights & Collector Chronicles
              </h1>
              <p className="text-sm sm:text-base text-[#b0a090] font-light max-w-2xl mx-auto leading-relaxed">
                Expert analyses on rare Scotch single malts, Japanese Mizunara cask aging, European bonded cellar trade, and sommelier tasting masterclasses.
              </p>
            </div>
          </section>

          {/* Articles Grid Section */}
          <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_ARTICLES.map((article) => (
                <article
                  key={article.slug}
                  className="bg-[#14100c] border border-[#29221b] hover:border-amber-600/60 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Thumbnail */}
                  <div className="relative h-56 w-full bg-[#18130f] overflow-hidden">
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#0f0d0b]/85 backdrop-blur-sm text-amber-400 border border-amber-900/50 text-[11px] font-mono px-2.5 py-1 rounded">
                      {article.category}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-[#8c7e70]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          {article.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-serif font-bold text-xl text-[#f8f3ed] group-hover:text-amber-400 transition-colors leading-snug">
                        <Link href={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-[#a8998a] font-light leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Author & CTA */}
                    <div className="pt-4 border-t border-[#261f18] flex items-center justify-between">
                      <div className="text-[11px] text-[#8c7e70]">
                        By <span className="text-[#f5f0ea] font-medium">{article.author}</span>
                      </div>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-all group-hover:translate-x-1"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
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
