import { Metadata } from 'next';
import { generateHreflangTags } from '../../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Contingency Hiring | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Contingency Hiring | Kersten Talent Capital');
    
    return {
      title: 'Contingency Hiring | Kersten Talent Capital',
      description: 'Results-driven approach to talent acquisition where we assume the financial risk until the right candidate is successfully placed.',
      alternates: {
        canonical: `${baseUrl}/services/contingency-hiring`,
        languages: {
          'en-US': `${baseUrl}/services/contingency-hiring`,
          'en-CA': `${baseUrl}/services/contingency-hiring`,
          'en-GB': `${baseUrl}/services/contingency-hiring`,
          'en-AU': `${baseUrl}/services/contingency-hiring`,
          'x-default': `${baseUrl}/services/contingency-hiring`,
        },
      },
      openGraph: {
        title: 'Contingency Hiring | Kersten Talent Capital',
        description: 'Results-driven approach to talent acquisition where we assume the financial risk until the right candidate is successfully placed.',
        url: `${baseUrl}/services/contingency-hiring`,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Contingency Hiring | Kersten Talent Capital',
        description: 'Results-driven approach to talent acquisition where we assume the financial risk until the right candidate is successfully placed.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating contingency-hiring metadata:', error);
    return {
      title: 'Contingency Hiring | Kersten Talent Capital',
      description: 'Results-driven approach to talent acquisition where we assume the financial risk until the right candidate is successfully placed.',
      alternates: {
        canonical: `${baseUrl}/services/contingency-hiring`,
      },
    };
  }
}

export default function ContingencyHiringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 