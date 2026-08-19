'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_ARTICLES } from '@/lib/whiskeys';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogSection() {
  // Ensure EXACTLY 4 cards as requested in custom instructions
  const articles = BLOG_ARTICLES.slice(0, 4);

  return (
    <section className="py-16 bg-[#0f0d0b] border-b border-[#241d17]" id="blog">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>JOURNAL & SOMMELIER MASTERCLASS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f8f3ed]">
              The Whiskey Europe Journal
            </h2>
          </div>
          <p className="text-sm text-[#a39382] max-w-md">
            Expert insights on rare malt investments, cask maturation science, tasting masterclasses, and European import regulations.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-[#14100c] border border-[#29221b] hover:border-amber-600/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 w-full bg-[#18130f] overflow-hidden">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-3 left-3 bg-[#0f0d0b]/80 backdrop-blur-sm text-amber-400 border border-amber-900/40 text-[10px] font-mono px-2 py-0.5 rounded">
                  {article.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center gap-3 text-[11px] text-[#8c7e70]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-base text-[#f8f3ed] group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-[#a8998a] font-light line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                </div>

                {/* Read More Link */}
                <div className="pt-3 border-t border-[#261f18]">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
