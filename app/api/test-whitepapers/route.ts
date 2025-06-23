import { NextRequest, NextResponse } from 'next/server';

/**
 * Test endpoint for whitepaper functionality
 */
export async function GET(request: NextRequest) {
  try {
    console.log('Test whitepapers endpoint called');
    
    // Get Strapi base URL
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app/';
    const baseUrl = apiUrl.replace(/\/$/, '');
    
    // Make direct fetch request
    const url = `${baseUrl}/api/whitepapers?populate=*`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
      },
      next: {
        revalidate: 300, // Cache for 5 minutes
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strapi API error:', response.status, response.statusText);
      console.error('Error details:', errorText);
      
      return NextResponse.json({
        error: `Strapi API error: ${response.status} ${response.statusText}`,
        details: errorText,
        url: url,
      }, { status: response.status });
    }
    
    const data = await response.json();
    
    // Check if we got valid data
    if (!data || typeof data !== 'object') {
      return NextResponse.json({
        error: 'Invalid response format from Strapi',
        receivedData: data,
      }, { status: 500 });
    }
    
    // Return the data with some additional context
    return NextResponse.json({
      success: true,
      message: 'Successfully fetched whitepapers',
      data: data.data || data,
      meta: data.meta || null,
      requestUrl: url,
    });
  } catch (error) {
    console.error('Test whitepapers API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
} 