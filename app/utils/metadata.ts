import { Metadata } from 'next';
import { getCanonicalUrl } from './seo';

/**
 * Generate metadata for a specific page
 * @param path - The current page path
 * @param title - The page title
 * @param description - The page description
 * @returns Metadata object with canonical URL
 */
export function generatePageMetadata(path: string, title: string, description: string): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
    },
  };
} 