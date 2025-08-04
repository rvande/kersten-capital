import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export const metadata: Metadata = {
  title: 'Services | Kersten Talent Capital',
  description: 'Strategic talent investment services including executive search, contingency hiring, and fractional solutions.',
  alternates: {
    canonical: `${baseUrl}/services`,
    languages: {
      'en-US': `${baseUrl}/services`,
      'en-CA': `${baseUrl}/services`,
      'en-GB': `${baseUrl}/services`,
      'en-AU': `${baseUrl}/services`,
      'x-default': `${baseUrl}/services`,
    },
  },
  openGraph: {
    title: 'Services | Kersten Talent Capital',
    description: 'Strategic talent investment services including executive search, contingency hiring, and fractional solutions.',
    url: `${baseUrl}/services`,
    type: 'website',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 