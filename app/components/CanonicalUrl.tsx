'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { getCanonicalUrl } from '../utils/seo';

/**
 * Component that adds a canonical URL link tag to the page head
 * This helps search engines identify the preferred URL for content that may be accessible from multiple URLs
 */
export default function CanonicalUrl() {
  const pathname = usePathname();
  const canonicalUrl = getCanonicalUrl(pathname);
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
} 