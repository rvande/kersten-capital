import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Privacy Policy | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Privacy Policy | Kersten Talent Capital');
    
    return {
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
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy | Kersten Talent Capital',
        description: 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating privacy-policy metadata:', error);
    return {
      title: 'Privacy Policy | Kersten Talent Capital',
      description: 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.',
      alternates: {
        canonical: `${baseUrl}/privacy-policy`,
      },
    };
  }
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 