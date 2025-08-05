import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Our Recruitment Services | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Our Recruitment Services | Kersten Talent Capital');
    
    return {
      title: 'Our Recruitment Services | Kersten Talent Capital',
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
        title: 'Our Recruitment Services | Kersten Talent Capital',
        description: 'Strategic talent investment services including executive search, contingency hiring, and fractional solutions.',
        url: `${baseUrl}/services`,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Our Recruitment Services | Kersten Talent Capital',
        description: 'Strategic talent investment services including executive search, contingency hiring, and fractional solutions.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating services metadata:', error);
    return {
      title: 'Our Recruitment Services | Kersten Talent Capital',
      description: 'Strategic talent investment services including executive search, contingency hiring, and fractional solutions.',
      alternates: {
        canonical: `${baseUrl}/services`,
      },
    };
  }
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 