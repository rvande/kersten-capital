import React from 'react';
import { fetchAPI } from '../api/api';
import { StrapiResponse } from '../types/global';
import { FAQ } from '../types/faq';
import FAQHeader from '../components/FAQHeader';
import FAQPageContent from '../components/FAQPageContent';

// This is a server component that fetches FAQ data
export default async function FAQPage() {
  const faqData = await getFAQs();
  
  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-[#323230] via-[#262624] to-[#1a1a18]">
      <FAQHeader />
      <FAQPageContent faqs={faqData.data || []} />
    </div>
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