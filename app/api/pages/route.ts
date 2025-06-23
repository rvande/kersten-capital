import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

/**
 * Pages API route that proxies requests to Strapi
 * Handles static pages and dynamic content
 */

// Define the different endpoint variations that Strapi might use for pages
const PAGES_VARIATIONS = [
  '/api/pages',
  '/api/page',
  '/api/static-pages',
  '/api/static-page'
];

/**
 * GET handler for pages API requests
 */
export async function GET(request: NextRequest) {
  try {
    // Get parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    const locale = searchParams.get('locale') || 'en';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    console.log(`Pages API route handling request: slug=${slug}, locale=${locale}, page=${page}`);

    // Build query parameters
    let queryParams: any = {
      pagination: {
        page,
        pageSize,
      },
      locale,
    };

    // Add filters for single page if slug is provided
    if (slug) {
      queryParams.filters = {
        slug: {
          $eq: slug,
        },
      };
    }

    // Add populate options for pages
    queryParams.populate = {
      seo: true,
      content: true,
      featuredImage: true,
    };

    queryParams.sort = ['updatedAt:desc'];

    // Build the Strapi URL
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app/';
    const baseUrl = apiUrl.replace(/\/$/, '');

    // Convert query parameters to string using qs
    const queryString = qs.stringify(queryParams, {
      encodeValuesOnly: true,
    });

    let response: Response | null = null;
    let responseData: any = null;
    const errorDetails: any[] = [];
    
    // Try each endpoint until we get a successful response
    for (const endpoint of PAGES_VARIATIONS) {
      const currentUrl = `${baseUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;
      console.log(`Trying endpoint: ${currentUrl}`);
      
      try {
        const currentResponse = await fetch(currentUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
          },
          next: {
            revalidate: 600, // 10 minutes cache for pages
          },
        });
        
        if (!currentResponse.ok) {
          const errorText = await currentResponse.text();
          errorDetails.push({
            endpoint,
            status: currentResponse.status,
            statusText: currentResponse.statusText,
            error: errorText
          });
          console.error(`Error with endpoint ${endpoint}:`, currentResponse.status, currentResponse.statusText);
          continue;
        }
        
        // If we get here, we have a successful response
        response = currentResponse;
        responseData = await response.json();
        console.log(`Success with endpoint ${endpoint}`);
        break;
      } catch (endpointError) {
        console.error(`Exception with endpoint ${endpoint}:`, endpointError);
        errorDetails.push({
          endpoint,
          error: endpointError instanceof Error ? endpointError.message : String(endpointError)
        });
      }
    }
    
    // If we didn't get a successful response from any endpoint
    if (!response || !responseData) {
      console.error('All endpoints failed');
      
      return NextResponse.json({
        error: 'All API endpoints failed',
        attemptedEndpoints: PAGES_VARIATIONS,
        errors: errorDetails,
      }, { status: 500 });
    }

    // Return the successful response data
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Pages API proxy error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
} 