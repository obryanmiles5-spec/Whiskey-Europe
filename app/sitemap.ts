import type { MetadataRoute } from 'next';
import { WHISKEY_COLLECTION, BLOG_ARTICLES } from '@/lib/whiskeys';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://whiskeyeurope.org';
  const lastModified = new Date();

  // Core Canonical Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/rare-whiskey-index`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/how-to-crypto`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/returns`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Editorial Journal Guides
  const blogRoutes: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => {
    const articleDate = new Date(article.date);
    const validDate = !isNaN(articleDate.getTime()) ? articleDate : lastModified;
    return {
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: validDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  // Every Individual Bottle Product URL (All 165+ rare whiskies)
  const productRoutes: MetadataRoute.Sitemap = WHISKEY_COLLECTION.map((whiskey) => ({
    url: `${baseUrl}/shop/${whiskey.id}`,
    lastModified,
    changeFrequency: 'daily',
    priority: whiskey.isRare || whiskey.isFeatured ? 0.95 : 0.85,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...productRoutes,
  ];
}

