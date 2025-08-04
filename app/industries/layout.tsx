import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export const metadata: Metadata = {
  title: 'Industries | Kersten Talent Capital',
  description: 'Specialized recruitment expertise across key industries including technology, manufacturing, retail, and more. Find industry-specific talent solutions.',
  alternates: {
    canonical: `${baseUrl}/industries`,
    languages: {
      'en-US': `${baseUrl}/industries`,
      'en-CA': `${baseUrl}/industries`,
      'en-GB': `${baseUrl}/industries`,
      'en-AU': `${baseUrl}/industries`,
      'x-default': `${baseUrl}/industries`,
    },
  },
  openGraph: {
    title: 'Industries | Kersten Talent Capital',
    description: 'Specialized recruitment expertise across key industries including technology, manufacturing, retail, and more. Find industry-specific talent solutions.',
    url: `${baseUrl}/industries`,
    type: 'website',
  },
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 