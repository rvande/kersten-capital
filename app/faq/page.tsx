import React from 'react';
import { fetchAPI } from '../api/api';
import { StrapiResponse } from '../types/global';
import { FAQ } from '../types/faq';
import FAQHeader from '../components/FAQHeader';
import FAQPageContent from '../components/FAQPageContent';
import { Metadata } from 'next';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

// Generate metadata for this page
export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Frequently Asked Questions | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Frequently Asked Questions | Kersten Talent Capital');
    
    return {
      title: 'Frequently Asked Questions | Kersten Talent Capital',
      description: 'Find answers to common questions about our executive talent acquisition services, process, and how we can help transform your leadership team.',
      alternates: {
        canonical: `${baseUrl}/faq`,
        languages: {
          'en-US': `${baseUrl}/faq`,
          'en-CA': `${baseUrl}/faq`,
          'en-GB': `${baseUrl}/faq`,
          'en-AU': `${baseUrl}/faq`,
          'x-default': `${baseUrl}/faq`,
        },
      },
      openGraph: {
        title: 'Frequently Asked Questions | Kersten Talent Capital',
        description: 'Find answers to common questions about our executive talent acquisition services, process, and how we can help transform your leadership team.',
        url: `${baseUrl}/faq`,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Frequently Asked Questions | Kersten Talent Capital',
        description: 'Find answers to common questions about our executive talent acquisition services, process, and how we can help transform your leadership team.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating FAQ metadata:', error);
    return {
      title: 'Frequently Asked Questions | Kersten Talent Capital',
      description: 'Find answers to common questions about our executive talent acquisition services, process, and how we can help transform your leadership team.',
      alternates: {
        canonical: `${baseUrl}/faq`,
      },
    };
  }
}

// This is a server component that fetches FAQ data
export default async function FAQPage() {
  const faqData = await getFAQs();
  
  return (
    <main className="relative w-full overflow-hidden">
      <FAQPageContent faqs={faqData.data || []} />
    </main>
  );
}

// Function to fetch FAQs from the API
async function getFAQs() {
  // Build query parameters for Strapi v5
  const queryParams = {
    // Using proper array format for sort in Strapi v5
    sort: ['Order:asc', 'id:asc'],
    pagination: {
      page: 1,
      pageSize: 100,
    },
  };
  
  try {
    console.log('Server requesting FAQs with params:', JSON.stringify(queryParams));
    const data = await fetchAPI('/faqs', queryParams);
    console.log('Server received FAQ response:', JSON.stringify(data).substring(0, 200) + '...');
    return data as StrapiResponse<FAQ[]>;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    // Return empty data as fallback
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 100,
          pageCount: 0,
          total: 0,
        },
      },
    } as StrapiResponse<FAQ[]>;
  }
} 