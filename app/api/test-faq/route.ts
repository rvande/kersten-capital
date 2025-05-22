import { NextResponse } from 'next/server';
import { getStrapiURL } from '../api';
import qs from 'qs';

export async function GET() {
  try {
    // Simple query to test the API connection using Strapi v5 format
    const queryParams = {
      sort: ['id:asc'],
      pagination: {
        page: 1,
        pageSize: 10,
      },
      // Optional: Include related fields
      populate: {
        // For example, if FAQs have related categories or media
      }
    };
    
    // Convert to query string using qs
    const queryString = qs.stringify(queryParams, {
      encodeValuesOnly: true,
    });
    
    // Build the direct URL to Strapi
    const apiUrl = `${getStrapiURL('/api/faqs')}${queryString ? `?${queryString}` : ''}`;
    console.log('Test API: Querying Strapi with URL:', apiUrl);
    
    // Make a direct call to Strapi
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', response.status, response.statusText);
      console.error('Error details:', errorText);
      return NextResponse.json({
        success: false,
        error: `API error: ${response.status} ${response.statusText}`,
        details: errorText
      }, { status: response.status });
    }
    
    const result = await response.json();
    
    // Return the raw response for inspection
    return NextResponse.json({
      success: true,
      params: queryParams,
      result,
    });
  } catch (error) {
    console.error('Test API: Strapi query failed:', error);
    
    // Return detailed error information
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
} 