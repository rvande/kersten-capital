import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Terms & Conditions | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Terms & Conditions | Kersten Talent Capital');
    
    return {
      title: 'Terms & Conditions | Kersten Talent Capital',
      description: 'Terms and conditions for using Kersten Talent Capital services. Please read these terms carefully before using our website and services.',
      alternates: {
        canonical: `${baseUrl}/terms-conditions`,
        languages: {
          'en-US': `${baseUrl}/terms-conditions`,
          'en-CA': `${baseUrl}/terms-conditions`,
          'en-GB': `${baseUrl}/terms-conditions`,
          'en-AU': `${baseUrl}/terms-conditions`,
          'x-default': `${baseUrl}/terms-conditions`,
        },
      },
      openGraph: {
        title: 'Terms & Conditions | Kersten Talent Capital',
        description: 'Terms and conditions for using Kersten Talent Capital services. Please read these terms carefully before using our website and services.',
        url: `${baseUrl}/terms-conditions`,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Terms & Conditions | Kersten Talent Capital',
        description: 'Terms and conditions for using Kersten Talent Capital services. Please read these terms carefully before using our website and services.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating terms-conditions metadata:', error);
    return {
      title: 'Terms & Conditions | Kersten Talent Capital',
      description: 'Terms and conditions for using Kersten Talent Capital services. Please read these terms carefully before using our website and services.',
      alternates: {
        canonical: `${baseUrl}/terms-conditions`,
      },
    };
  }
}

export default function TermsConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 