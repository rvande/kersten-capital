import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export const metadata: Metadata = {
  title: 'Privacy Policy | Kersten Talent Capital',
  description: 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.',
  alternates: {
    canonical: `${baseUrl}/privacy-policy`,
    languages: {
      'en-US': `${baseUrl}/privacy-policy`,
      'en-CA': `${baseUrl}/privacy-policy`,
      'en-GB': `${baseUrl}/privacy-policy`,
      'en-AU': `${baseUrl}/privacy-policy`,
      'x-default': `${baseUrl}/privacy-policy`,
    },
  },
  openGraph: {
    title: 'Privacy Policy | Kersten Talent Capital',
    description: 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.',
    url: `${baseUrl}/privacy-policy`,
    type: 'website',
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 