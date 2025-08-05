import { Metadata } from 'next';
import { generateHreflangTags } from '../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Contact Us | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Contact Us | Kersten Talent Capital');
    
    return {
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
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Contact Us | Kersten Talent Capital',
        description: 'Ready to accelerate your leadership journey? Contact Kersten Talent Capital to discuss how we can help you achieve your career goals.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating contact-us metadata:', error);
    return {
      title: 'Contact Us | Kersten Talent Capital',
      description: 'Ready to accelerate your leadership journey? Contact Kersten Talent Capital to discuss how we can help you achieve your career goals.',
      alternates: {
        canonical: `${baseUrl}/contact-us`,
      },
    };
  }
}

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 