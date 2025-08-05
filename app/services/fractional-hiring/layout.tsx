import { Metadata } from 'next';
import { generateHreflangTags } from '../../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Fractional Hiring | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Fractional Hiring | Kersten Talent Capital');
    
    return {
      title: 'Fractional Hiring | Kersten Talent Capital',
      description: 'Innovative executive talent solutions for organizations seeking specialized expertise without the commitment of a full-time hire.',
      alternates: {
        canonical: `${baseUrl}/services/fractional-hiring`,
        languages: {
          'en-US': `${baseUrl}/services/fractional-hiring`,
          'en-CA': `${baseUrl}/services/fractional-hiring`,
          'en-GB': `${baseUrl}/services/fractional-hiring`,
          'en-AU': `${baseUrl}/services/fractional-hiring`,
          'x-default': `${baseUrl}/services/fractional-hiring`,
        },
      },
      openGraph: {
        title: 'Fractional Hiring | Kersten Talent Capital',
        description: 'Innovative executive talent solutions for organizations seeking specialized expertise without the commitment of a full-time hire.',
        url: `${baseUrl}/services/fractional-hiring`,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Fractional Hiring | Kersten Talent Capital',
        description: 'Innovative executive talent solutions for organizations seeking specialized expertise without the commitment of a full-time hire.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating fractional-hiring metadata:', error);
    return {
      title: 'Fractional Hiring | Kersten Talent Capital',
      description: 'Innovative executive talent solutions for organizations seeking specialized expertise without the commitment of a full-time hire.',
      alternates: {
        canonical: `${baseUrl}/services/fractional-hiring`,
      },
    };
  }
}

export default function FractionalHiringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 