import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Resources | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Resources | Kersten Talent Capital');
    
    return {
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
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Resources | Kersten Talent Capital',
        description: 'Access our comprehensive resources including thought leadership blog, whitepapers, and insights on executive talent acquisition and leadership.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating resources metadata:', error);
    return {
      title: 'Resources | Kersten Talent Capital',
      description: 'Access our comprehensive resources including thought leadership blog, whitepapers, and insights on executive talent acquisition and leadership.',
      alternates: {
        canonical: `${baseUrl}/resources`,
      },
    };
  }
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 