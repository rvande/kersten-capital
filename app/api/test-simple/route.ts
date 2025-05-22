import { NextResponse } from 'next/server';
import { fetchAPI, getStrapiURL } from '../api';

export async function GET() {
  try {
    // Just fetch a simple endpoint without complex parameters
    console.log('Testing API connection to Strapi...');
    
    // Try to fetch directly without parameters
    const apiUrl = getStrapiURL('/api/faqs');
    console.log('Direct URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Direct API error:', response.status, response.statusText);
      console.error('Error details:', errorText);
      return NextResponse.json({
        success: false,
        error: `Direct API error: ${response.status} ${response.statusText}`,
        details: errorText
      }, { status: response.status });
    }
    
    const result = await response.json();
    
    // Return success response
    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Test API failed:', error);
    
    // Return detailed error information
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
} 