import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

/**
 * API route that proxies requests to Strapi
 * This helps with:
 * 1. CORS issues
 * 2. Keeping the API token secure (not exposed to the client)
 * 3. Consistent error handling
 */
export async function GET(request: NextRequest) {
  try {
    // Get path and query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path') || '/api/global';
    let queryParams: any = {};
    
    // Parse query parameters if provided
    const queryString = searchParams.get('query');
    if (queryString) {
      try {
        queryParams = JSON.parse(queryString);
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid query parameter format. Must be valid JSON.' },
          { status: 400 }
        );
      }
    }
    
    // Build the Strapi URL
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app/';
    const baseUrl = apiUrl.replace(/\/$/, '');
    const formattedPath = path.startsWith('/') ? path : `/${path}`;
    
    // Convert query parameters to string using qs
    const queryString2 = qs.stringify(queryParams, {
      encodeValuesOnly: true,
    });
    
    const url = `${baseUrl}${formattedPath}${queryString2 ? `?${queryString2}` : ''}`;
    
    // Make the request to Strapi with authentication
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
      },
      next: {
        revalidate: 300, // Cache for 5 minutes instead of 60 seconds
      },
    });
    
    if (!response.ok) {
      // Forward Strapi error code and message
      return NextResponse.json(
        { 
          error: `Strapi API error: ${response.status} ${response.statusText}`,
          details: await response.text()
        },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
} 