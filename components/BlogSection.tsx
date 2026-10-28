'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_ARTICLES } from '@/lib/whiskeys';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogSection() {
  const articles = BLOG_ARTICLES.slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-black/10" id="blog">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-black font-mono text-xs uppercase tracking-widest mb-1 flex items-center gap-1.5 font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>JOURNAL &amp; SOMMELIER MASTERCLASS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-black">
              The Whiskey Europe Journal
            </h2>
          </div>
          <p className="text-sm text-zinc-600 font-medium max-w-md">
            Expert insights on rare malt investments, cask maturation science, tasting masterclasses, and European import regulations.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-white border-2 border-black hover:border-black rounded-xl overflow-hidden shadow-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 w-full bg-zinc-100 overflow-hidden border-b-2 border-black">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-3 left-3 bg-white text-black font-bold border border-black text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                  {article.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-bold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-black" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-black" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-black text-base text-black group-hover:underline transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-zinc-600 font-medium line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                </div>

                {/* Read More Link */}
                <div className="pt-3 border-t border-zinc-200">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-black hover:underline uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
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
