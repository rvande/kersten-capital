import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

// Correct paths for Strapi v5
const PAGES_ENDPOINT = '/api/pages';

// Try all these endpoint variations for better compatibility
const PAGES_VARIATIONS = [
  '/api/pages',
  '/api/page'
];

/**
 * API route for dynamic pages
 * This helps with:
 * 1. CORS issues
 * 2. Keeping the API token secure (not exposed to the client)
 * 3. Consistent error handling
 */
export async function GET(request: NextRequest) {
  try {
    // Get path and query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug') || null; // Optional slug for single page
    const locale = searchParams.get('locale') || null; // Optional locale for i18n
    const page = searchParams.get('page') || '1'; 
    const pageSize = searchParams.get('pageSize') || '10';
    const debug = searchParams.get('debug') === 'true'; // Debug mode
    
    console.log(`Pages API route handling request: slug=${slug}, locale=${locale}, page=${page}, debug=${debug}`);
    
    // Build query parameters
    let queryParams: any = {
      pagination: {
        page: parseInt(page as string, 10),
        pageSize: parseInt(pageSize as string, 10),
      },
    };
    
    // Add filters for single page if slug is provided
    if (slug) {
      // Try different slug variations to handle various formats stored in Strapi
      const slugVariations = [
        slug,                    // exact match: "about-us"
        `/${slug}`,             // with leading slash: "/about-us"
        `${slug}/`,             // with trailing slash: "about-us/"
        `/${slug}/`,            // with both slashes: "/about-us/"
      ];
      
      queryParams.filters = {
        $or: slugVariations.map(variation => ({
          slug: {
            $eq: variation,
          },
        })),
      };
    }
    
    // Add locale filter if provided
    if (locale) {
      queryParams.locale = locale;
    }
    
    // Add comprehensive populate options for all content sections
    queryParams.populate = '*';
    
    queryParams.sort = ['createdAt:desc'];
    
    // Parse additional query parameters if provided
    const additionalParams = searchParams.get('params');
    if (additionalParams) {
      try {
        const parsedParams = JSON.parse(additionalParams);
        queryParams = { ...queryParams, ...parsedParams };
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid params parameter format. Must be valid JSON.' },
          { status: 400 }
        );
      }
    }
    
    // Build the Strapi URL
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app/';
    const baseUrl = apiUrl.replace(/\/$/, '');
    
    // Convert query parameters to string using qs
    const queryString = qs.stringify(queryParams, {
      encodeValuesOnly: true,
    });
    
    let response = null;
    let responseData = null;
    let errorDetails = [];
    
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
            revalidate: debug ? 0 : 60, // No cache in debug mode
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
        debug: debug ? {
          attemptedEndpoints: PAGES_VARIATIONS,
          errors: errorDetails,
          queryParams
        } : undefined
      }, { status: 500 });
    }
    
    // Try to transform response data if needed (fallback mechanism)
    if (!responseData.data && !responseData.meta) {
      console.log('Transforming non-standard API response format');
      
      // For backwards compatibility, try to convert to expected format
      if (Array.isArray(responseData)) {
        responseData = {
          data: responseData,
          meta: { pagination: { page: 1, pageSize: responseData.length, total: responseData.length } }
        };
      } else if (typeof responseData === 'object') {
        responseData = {
          data: [responseData],
          meta: { pagination: { page: 1, pageSize: 1, total: 1 } }
        };
      }
    }
    
    // Log response details
    console.log('Pages API response received, data structure:', {
      hasData: !!responseData.data,
      dataType: responseData.data ? (Array.isArray(responseData.data) ? 'array' : 'object') : 'none',
      itemCount: responseData.data && Array.isArray(responseData.data) ? responseData.data.length : 0,
      hasMeta: !!responseData.meta
    });
    
    // Add debug info if requested
    if (debug) {
      return NextResponse.json({
        ...responseData,
        _debug: {
          apiUrl: baseUrl,
          attemptedEndpoints: PAGES_VARIATIONS,
          finalEndpoint: response.url,
          queryParams,
          errors: errorDetails,
          responseStructure: {
            hasData: !!responseData.data,
            dataType: responseData.data ? (Array.isArray(responseData.data) ? 'array' : 'object') : 'none',
            itemCount: responseData.data && Array.isArray(responseData.data) ? responseData.data.length : 0,
            hasMeta: !!responseData.meta
          }
        }
      });
    }
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Pages API proxy error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
} 