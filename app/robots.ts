import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const domain = 'https://www.whiskeyeurope.org';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/',
          '/_next/image/',
          '/favicon.ico',
          '/icon.png',
        ],
        disallow: [
          '/api/',
          '/checkout',
          '/admin',
          '/private/',
        ],
      },
      // Search Engine Crawlers
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-Mobile',
          'Bingbot',
          'Applebot',
          'DuckDuckBot',
          'YandexBot',
          'Baiduspider',
          'Slurp',
        ],
        allow: [
          '/',
          '/_next/static/',
          '/_next/image/',
          '/favicon.ico',
          '/icon.png',
        ],
        disallow: [
          '/api/',
          '/checkout',
          '/admin',
          '/private/',
        ],
      },
      // AI Crawlers & Search Assistants
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'Google-Extended',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Amazonbot',
          'CCBot',
          'FacebookBot',
          'cohere-ai',
        ],
        allow: [
          '/',
          '/_next/static/',
          '/_next/image/',
          '/favicon.ico',
          '/icon.png',
        ],
        disallow: [
          '/api/',
          '/checkout',
          '/admin',
          '/private/',
        ],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
