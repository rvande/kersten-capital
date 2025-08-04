import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export const metadata: Metadata = {
  title: 'Our Approach | Kersten Talent Capital',
  description: 'Discover our strategic approach to executive talent acquisition. Learn how we identify, validate, and place exceptional leaders who drive organizational success.',
  alternates: {
    canonical: `${baseUrl}/our-approach`,
    languages: {
      'en-US': `${baseUrl}/our-approach`,
      'en-CA': `${baseUrl}/our-approach`,
      'en-GB': `${baseUrl}/our-approach`,
      'en-AU': `${baseUrl}/our-approach`,
      'x-default': `${baseUrl}/our-approach`,
    },
  },
  openGraph: {
    title: 'Our Approach | Kersten Talent Capital',
    description: 'Discover our strategic approach to executive talent acquisition. Learn how we identify, validate, and place exceptional leaders who drive organizational success.',
    url: `${baseUrl}/our-approach`,
    type: 'website',
  },
};

export default function OurApproachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 