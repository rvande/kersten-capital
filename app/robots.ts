import { MetadataRoute } from 'next';

/**
 * Generate robots.txt for Next.js
 * This uses the Next.js built-in robots.txt generation feature
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
} 