import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Kersten Talent Capital',
  description: 'Terms and conditions for using Kersten Talent Capital services. Please read these terms carefully before using our website and services.',
  alternates: {
    canonical: `${baseUrl}/terms-conditions`,
    languages: {
      'en-US': `${baseUrl}/terms-conditions`,
      'en-CA': `${baseUrl}/terms-conditions`,
      'en-GB': `${baseUrl}/terms-conditions`,
      'en-AU': `${baseUrl}/terms-conditions`,
      'x-default': `${baseUrl}/terms-conditions`,
    },
  },
  openGraph: {
    title: 'Terms & Conditions | Kersten Talent Capital',
    description: 'Terms and conditions for using Kersten Talent Capital services. Please read these terms carefully before using our website and services.',
    url: `${baseUrl}/terms-conditions`,
    type: 'website',
  },
};

export default function TermsConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 