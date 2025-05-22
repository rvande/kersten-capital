import { fetchAPI } from '../api/api';
import { StrapiResponse } from '../types/global';
import { FAQ } from '../types/faq';
import FaqFooter from './FaqFooter';

// Function to fetch FAQs from the API - modified from faq/page.tsx
async function getFooterFAQs() {
  // Build query parameters for Strapi v5
  const queryParams = {
    // Using proper array format for sort in Strapi v5
    sort: ['Order:asc', 'id:asc'],
    pagination: {
      page: 1,
      pageSize: 4, // Limit to 4 FAQs for the footer
    },
    populate: '*', // Make sure to populate all fields
  };
  
  try {
    console.log('Footer requesting FAQs with params:', JSON.stringify(queryParams));
    const data = await fetchAPI('/faqs', queryParams);
    console.log('Footer received FAQ response:', JSON.stringify(data).substring(0, 200) + '...');
    return data as StrapiResponse<FAQ[]>;
  } catch (error) {
    console.error('Error fetching FAQs for footer:', error);
    // Return empty data as fallback
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 4,
          pageCount: 0,
          total: 0,
        },
      },
    } as StrapiResponse<FAQ[]>;
  }
}

// Transform Strapi data to the expected format
function formatFaqData(data: StrapiResponse<FAQ[]>): FAQ[] {
  if (!data || !data.data || !Array.isArray(data.data)) {
    console.warn('Invalid FAQ data format received');
    return [];
  }
  
  if (data.data.length === 0) {
    console.warn('No FAQ data received, using fallback data');
    return [];
  }
  
  console.log('Formatting FAQ data, count:', data.data.length);
  console.log('First FAQ data sample:', JSON.stringify(data.data[0]).substring(0, 300));
  
  return data.data.map((item: any) => {
    // Get attributes, handling both Strapi v3 and v4/v5 formats
    const attributes = item.attributes || item;
    
    // Log what we're extracting to help debug
    console.log(`FAQ item ${item.id}:`, {
      hasQuestion: !!attributes.Question,
      hasAnswer: !!attributes.Answer,
      questionLength: attributes.Question?.length,
      answerPreview: attributes.Answer?.substring(0, 30)
    });
    
    return {
      id: item.id,
      documentId: item.id.toString(),
      Question: attributes.Question || 'Missing question',
      Answer: attributes.Answer || '<p>Information not available</p>',
      Category: attributes.Category || null,
      Order: attributes.Order || 0,
      Schemaid: attributes.Schemaid || null,
      createdAt: attributes.createdAt || '',
      updatedAt: attributes.updatedAt || '',
      publishedAt: attributes.publishedAt || '',
    };
  });
}

export default async function FaqFooterWrapper() {
  const faqsData = await getFooterFAQs();
  const formattedFaqs = formatFaqData(faqsData);
  
  return (
    <FaqFooter faqs={formattedFaqs} />
  );
} 