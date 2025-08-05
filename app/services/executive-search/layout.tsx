import { Metadata } from 'next';
import { generateHreflangTags } from '../../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Executive Search | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Executive Search | Kersten Talent Capital');
    
    return {
      title: 'Executive Search | Kersten Talent Capital',
      description: 'Premium, dedicated approach to identifying and securing top-tier leadership talent through our boutique partnership model.',
      alternates: {
        canonical: `${baseUrl}/services/executive-search`,
        languages: {
          'en-US': `${baseUrl}/services/executive-search`,
          'en-CA': `${baseUrl}/services/executive-search`,
          'en-GB': `${baseUrl}/services/executive-search`,
          'en-AU': `${baseUrl}/services/executive-search`,
          'x-default': `${baseUrl}/services/executive-search`,
        },
      },
      openGraph: {
        title: 'Executive Search | Kersten Talent Capital',
        description: 'Premium, dedicated approach to identifying and securing top-tier leadership talent through our boutique partnership model.',
        url: `${baseUrl}/services/executive-search`,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Executive Search | Kersten Talent Capital',
        description: 'Premium, dedicated approach to identifying and securing top-tier leadership talent through our boutique partnership model.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating executive-search metadata:', error);
    return {
      title: 'Executive Search | Kersten Talent Capital',
      description: 'Premium, dedicated approach to identifying and securing top-tier leadership talent through our boutique partnership model.',
      alternates: {
        canonical: `${baseUrl}/services/executive-search`,
      },
    };
  }
}

export default function ExecutiveSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 