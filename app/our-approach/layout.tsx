import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Our Placement Approach | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Our Placement Approach | Kersten Talent Capital');
    
    return {
      title: 'Our Placement Approach | Kersten Talent Capital',
      description: 'Discover our strategic approach to executive talent acquisition. Learn how we identify, validate, and place exceptional leaders who drive organizational success.',
      alternates: {
        canonical: `${baseUrl}/our-approach`,
        languages: {
          'en-US': `${baseUrl}/our-approach`,
          'en-CA': `${baseUrl}/our-approach`,
          'en-GB': `${baseUrl}/our-approach`,
          'en-AU': `${baseUrl}/our-approach`,
          'x-default': `${baseUrl}/our-approach`,
        },
      },
      openGraph: {
        title: 'Our Placement Approach | Kersten Talent Capital',
        description: 'Discover our strategic approach to executive talent acquisition. Learn how we identify, validate, and place exceptional leaders who drive organizational success.',
        url: `${baseUrl}/our-approach`,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Our Placement Approach | Kersten Talent Capital',
        description: 'Discover our strategic approach to executive talent acquisition. Learn how we identify, validate, and place exceptional leaders who drive organizational success.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating our-approach metadata:', error);
    return {
      title: 'Our Placement Approach | Kersten Talent Capital',
      description: 'Discover our strategic approach to executive talent acquisition. Learn how we identify, validate, and place exceptional leaders who drive organizational success.',
      alternates: {
        canonical: `${baseUrl}/our-approach`,
      },
    };
  }
}

export default function OurApproachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 