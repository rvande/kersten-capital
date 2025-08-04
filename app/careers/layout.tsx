import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export const metadata: Metadata = {
  title: 'Careers | Kersten Talent Capital',
  description: 'Join our team of executive talent professionals. Explore career opportunities at Kersten Talent Capital and help us empower exceptional leaders.',
  alternates: {
    canonical: `${baseUrl}/careers`,
    languages: {
      'en-US': `${baseUrl}/careers`,
      'en-CA': `${baseUrl}/careers`,
      'en-GB': `${baseUrl}/careers`,
      'en-AU': `${baseUrl}/careers`,
      'x-default': `${baseUrl}/careers`,
    },
  },
  openGraph: {
    title: 'Careers | Kersten Talent Capital',
    description: 'Join our team of executive talent professionals. Explore career opportunities at Kersten Talent Capital and help us empower exceptional leaders.',
    url: `${baseUrl}/careers`,
    type: 'website',
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 