import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('About Us | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('About Us | Kersten Talent Capital');
    
    return {
      title: 'About Us | Kersten Talent Capital',
      description: 'Learn about Kersten Talent Capital, a strategic talent investment firm empowering exceptional leaders and accelerating careers.',
      alternates: {
        canonical: `${baseUrl}/about-us`,
        languages: {
          'en-US': `${baseUrl}/about-us`,
          'en-CA': `${baseUrl}/about-us`,
          'en-GB': `${baseUrl}/about-us`,
          'en-AU': `${baseUrl}/about-us`,
          'x-default': `${baseUrl}/about-us`,
        },
      },
      openGraph: {
        title: 'About Us | Kersten Talent Capital',
        description: 'Learn about Kersten Talent Capital, a strategic talent investment firm empowering exceptional leaders and accelerating careers.',
        url: `${baseUrl}/about-us`,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'About Us | Kersten Talent Capital',
        description: 'Learn about Kersten Talent Capital, a strategic talent investment firm empowering exceptional leaders and accelerating careers.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating about-us metadata:', error);
    return {
      title: 'About Us | Kersten Talent Capital',
      description: 'Learn about Kersten Talent Capital, a strategic talent investment firm empowering exceptional leaders and accelerating careers.',
      alternates: {
        canonical: `${baseUrl}/about-us`,
      },
    };
  }
}

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 