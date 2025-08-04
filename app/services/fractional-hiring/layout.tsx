import { Metadata } from 'next';
import { generateHreflangTags } from '../../utils/seo';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export const metadata: Metadata = {
  title: 'Fractional Hiring | Kersten Talent Capital',
  description: 'Innovative executive talent solutions for organizations seeking specialized expertise without the commitment of a full-time hire.',
  alternates: {
    canonical: `${baseUrl}/services/fractional-hiring`,
    languages: {
      'en-US': `${baseUrl}/services/fractional-hiring`,
      'en-CA': `${baseUrl}/services/fractional-hiring`,
      'en-GB': `${baseUrl}/services/fractional-hiring`,
      'en-AU': `${baseUrl}/services/fractional-hiring`,
      'x-default': `${baseUrl}/services/fractional-hiring`,
    },
  },
  openGraph: {
    title: 'Fractional Hiring | Kersten Talent Capital',
    description: 'Innovative executive talent solutions for organizations seeking specialized expertise without the commitment of a full-time hire.',
    url: `${baseUrl}/services/fractional-hiring`,
    type: 'website',
  },
};

export default function FractionalHiringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 