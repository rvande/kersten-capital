import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Base URL from environment or default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kersten-capital.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 