import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

/**
 * Debug route to test direct Strapi connectivity
 * This allows testing different endpoint variations to troubleshoot API issues
 */
export async function GET(request: NextRequest) {
  try {
    // Get parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug') || 'executive-hiring-is-broken';
    const endpointType = searchParams.get('type') || 'blog-posts'; // blog-posts, blog-post, etc.
    
    // Build query parameters for filtering by slug
    const queryParams = {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      // Use simplified populate for Strapi v5 compatibility
      populate: {
        coverImage: true,
        categories: true,
        seo: true,
        content: true
      },
    };
    
    // Build the Strapi URL
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app/';
    const baseUrl = apiUrl.replace(/\/$/, '');
    const path = `/api/${endpointType}`;
    
    // Convert query parameters to string using qs
    const queryString = qs.stringify(queryParams, {
      encodeValuesOnly: true,
    });
    
    const url = `${baseUrl}${path}${queryString ? `?${queryString}` : ''}`;
    console.log(`Debug: Fetching from URL: ${url}`);
    
    // Make the request to Strapi with authentication
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
      },
      cache: 'no-store', // Disable caching for debugging
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Debug API error: ${response.status} ${response.statusText}`);
      console.error(`Error details: ${errorText}`);
      
      // Try alternate populate format
      if (response.status === 400 && errorText.includes('Invalid key content')) {
        console.log('Trying alternate populate format...');
        
        // Build alternate query parameters format
        const altQueryParams = {
          filters: {
            slug: {
              $eq: slug,
            },
          },
          populate: '*', // Use wildcard populate instead
        };
        
        const altQueryString = qs.stringify(altQueryParams, {
          encodeValuesOnly: true,
        });
        
        const altUrl = `${baseUrl}${path}${altQueryString ? `?${altQueryString}` : ''}`;
        console.log(`Debug: Trying alternate URL: ${altUrl}`);
        
        const altResponse = await fetch(altUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
          },
          cache: 'no-store',
        });
        
        if (altResponse.ok) {
          const altData = await altResponse.json();
          return NextResponse.json({
            success: true,
            note: 'Used alternate populate format',
            requestInfo: {
              url: altUrl,
              endpointType,
              slug,
            },
            responseStatus: altResponse.status,
            dataStructure: {
              hasData: !!altData.data,
              dataType: altData.data ? (Array.isArray(altData.data) ? 'array' : 'object') : 'none',
              dataLength: altData.data && Array.isArray(altData.data) ? altData.data.length : 'n/a',
              firstItem: altData.data && Array.isArray(altData.data) && altData.data.length > 0 ? {
                id: altData.data[0].id,
                title: altData.data[0].attributes?.title || altData.data[0].title || 'unknown',
                slug: altData.data[0].attributes?.slug || altData.data[0].slug || 'unknown',
              } : 'no items',
            },
            fullResponse: altData,
          });
        }
      }
      
      return NextResponse.json({
        error: `API error: ${response.status} ${response.statusText}`,
        details: errorText,
        requestUrl: url,
        endpointType,
        slug,
      }, { status: response.status });
    }
    
    const data = await response.json();
    
    // Transform data if it doesn't match expected format
    let transformedData = data;
    if (!data.data && !data.meta) {
      console.log('Transforming non-standard API response format');
      
      // For backwards compatibility, try to convert to expected format
      if (Array.isArray(data)) {
        transformedData = {
          data: data,
          meta: { pagination: { page: 1, pageSize: data.length, total: data.length } }
        };
      } else if (typeof data === 'object') {
        transformedData = {
          data: [data],
          meta: { pagination: { page: 1, pageSize: 1, total: 1 } }
        };
      }
    }
    
    // Return detailed debug info
    return NextResponse.json({
      success: true,
      requestInfo: {
        url,
        endpointType,
        slug,
      },
      responseStatus: response.status,
      dataStructure: {
        hasData: !!transformedData.data,
        dataType: transformedData.data ? (Array.isArray(transformedData.data) ? 'array' : 'object') : 'none',
        dataLength: transformedData.data && Array.isArray(transformedData.data) ? transformedData.data.length : 'n/a',
        firstItem: transformedData.data && Array.isArray(transformedData.data) && transformedData.data.length > 0 ? {
          id: transformedData.data[0].id,
          title: transformedData.data[0].attributes?.title || transformedData.data[0].title || 'unknown',
          slug: transformedData.data[0].attributes?.slug || transformedData.data[0].slug || 'unknown',
        } : 'no items',
        hasContent: transformedData.data && Array.isArray(transformedData.data) && transformedData.data.length > 0 
          ? !!(transformedData.data[0].content || transformedData.data[0].attributes?.content)
          : false,
      },
      fullResponse: transformedData,
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      error: `Internal server error: ${error instanceof Error ? error.message : String(error)}`,
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
} 