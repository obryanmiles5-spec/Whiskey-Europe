import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'DuckDuckBot',
          'YandexBot',
          'Baiduspider',
          'Slurp',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
      // AI Crawlers & LLM Search Engines
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
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://whiskeyeurope.org/sitemap.xml',
    host: 'https://whiskeyeurope.org',
  };
}
