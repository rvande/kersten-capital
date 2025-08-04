import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export const metadata: Metadata = {
  title: 'Resources | Kersten Talent Capital',
  description: 'Access our comprehensive resources including thought leadership blog, whitepapers, and insights on executive talent acquisition and leadership.',
  alternates: {
    canonical: `${baseUrl}/resources`,
    languages: {
      'en-US': `${baseUrl}/resources`,
      'en-CA': `${baseUrl}/resources`,
      'en-GB': `${baseUrl}/resources`,
      'en-AU': `${baseUrl}/resources`,
      'x-default': `${baseUrl}/resources`,
    },
  },
  openGraph: {
    title: 'Resources | Kersten Talent Capital',
    description: 'Access our comprehensive resources including thought leadership blog, whitepapers, and insights on executive talent acquisition and leadership.',
    url: `${baseUrl}/resources`,
    type: 'website',
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 