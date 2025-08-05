import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Industries | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Industries | Kersten Talent Capital');
    
    return {
      title: 'Industries | Kersten Talent Capital',
      description: 'Specialized recruitment expertise across key industries including technology, manufacturing, retail, and more. Find industry-specific talent solutions.',
      alternates: {
        canonical: `${baseUrl}/industries`,
        languages: {
          'en-US': `${baseUrl}/industries`,
          'en-CA': `${baseUrl}/industries`,
          'en-GB': `${baseUrl}/industries`,
          'en-AU': `${baseUrl}/industries`,
          'x-default': `${baseUrl}/industries`,
        },
      },
      openGraph: {
        title: 'Industries | Kersten Talent Capital',
        description: 'Specialized recruitment expertise across key industries including technology, manufacturing, retail, and more. Find industry-specific talent solutions.',
        url: `${baseUrl}/industries`,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Industries | Kersten Talent Capital',
        description: 'Specialized recruitment expertise across key industries including technology, manufacturing, retail, and more. Find industry-specific talent solutions.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating industries metadata:', error);
    return {
      title: 'Industries | Kersten Talent Capital',
      description: 'Specialized recruitment expertise across key industries including technology, manufacturing, retail, and more. Find industry-specific talent solutions.',
      alternates: {
        canonical: `${baseUrl}/industries`,
      },
    };
  }
}

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 