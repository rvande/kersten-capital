import { NextRequest, NextResponse } from 'next/server';
import { fetchAPI } from '../api';
import qs from 'qs';

/**
 * GET handler for FAQ data
 * Fetches FAQs from Strapi with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '100', 10);
    
    // Build query parameters for Strapi v5
    const queryParams: any = {
      // Correct array format for sort in Strapi v5
      sort: ['Order:asc', 'id:asc'],
      pagination: {
        page,
        pageSize,
      },
    };
    
    // Add category filter if provided
    if (category) {
      queryParams.filters = {
        Category: {
          $eq: category, // Strapi v5 uses $eq for equals
        },
      };
    }
    
    console.log('Fetching FAQs with params:', JSON.stringify(queryParams));
    
    // Fetch FAQs from Strapi
    const faqs = await fetchAPI('/faqs', queryParams);
    
    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: `Failed to fetch FAQs: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
} 