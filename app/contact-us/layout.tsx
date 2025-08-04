import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export const metadata: Metadata = {
  title: 'Contact Us | Kersten Talent Capital',
  description: 'Ready to accelerate your leadership journey? Contact Kersten Talent Capital to discuss how we can help you achieve your career goals.',
  alternates: {
    canonical: `${baseUrl}/contact-us`,
    languages: {
      'en-US': `${baseUrl}/contact-us`,
      'en-CA': `${baseUrl}/contact-us`,
      'en-GB': `${baseUrl}/contact-us`,
      'en-AU': `${baseUrl}/contact-us`,
      'x-default': `${baseUrl}/contact-us`,
    },
  },
  openGraph: {
    title: 'Contact Us | Kersten Talent Capital',
    description: 'Ready to accelerate your leadership journey? Contact Kersten Talent Capital to discuss how we can help you achieve your career goals.',
    url: `${baseUrl}/contact-us`,
    type: 'website',
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 