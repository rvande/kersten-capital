import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

// Correct paths for Strapi v5
const BLOG_POSTS_ENDPOINT = '/api/blog-posts';  // Could also be '/api/blog-post'
const CATEGORIES_ENDPOINT = '/api/categories';  // Could also be '/api/category'

// Try all these endpoint variations for better compatibility
const BLOG_POSTS_VARIATIONS = [
  '/api/blog-posts',
  '/api/blog-post',
  '/api/articles',
  '/api/article',
  '/api/posts',
  '/api/post'
];

const CATEGORIES_VARIATIONS = [
  '/api/categories',
  '/api/category',
  '/api/blog-categories',
  '/api/blog-category'
];

/**
 * API route for blog posts and categories
 * This helps with:
 * 1. CORS issues
 * 2. Keeping the API token secure (not exposed to the client)
 * 3. Consistent error handling
 */
export async function GET(request: NextRequest) {
  try {
    // Get path and query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'posts'; // 'posts' or 'categories'
    const slug = searchParams.get('slug') || null; // Optional slug for single item
    const categorySlug = searchParams.get('category') || null; // Optional category slug for filtering
    const page = searchParams.get('page') || '1'; 
    const pageSize = searchParams.get('pageSize') || '10';
    const debug = searchParams.get('debug') === 'true'; // Debug mode
    
    console.log(`API route handling request: type=${type}, slug=${slug}, category=${categorySlug}, page=${page}, debug=${debug}`);
    
    // Determine which endpoint variations to try
    const endpointVersions = type === 'categories' ? CATEGORIES_VARIATIONS : BLOG_POSTS_VARIATIONS;
    
    // Build query parameters
    let queryParams: any = {
      pagination: {
        page: parseInt(page as string, 10),
        pageSize: parseInt(pageSize as string, 10),
      },
    };
    
    // Add filters for single item if slug is provided
    if (slug) {
      queryParams.filters = {
        slug: {
          $eq: slug,
        },
      };
    }
    
    // Add filters for category if categorySlug is provided
    if (categorySlug && type === 'posts') {
      queryParams.filters = {
        ...(queryParams.filters || {}),
        categories: {
          slug: {
            $eq: categorySlug,
          },
        },
      };
    }
    
    // Add populate options - Simplified for v5 compatibility
    if (type === 'posts') {
      queryParams.populate = {
        coverImage: true,
        categories: true,
        seo: true,
        ...(slug ? { content: true } : {}), // Add content for single post
      };
      queryParams.sort = ['publishedAt:desc'];
    } else if (type === 'categories') {
      if (slug) {
        // For a single category, include related blog posts
        queryParams.populate = {
          blog_posts: {
            populate: {
              coverImage: true,
              categories: true
            },
          },
        };
      } else {
        // For category listing, simple populate
        queryParams.populate = '*';
      }
      queryParams.sort = ['name:asc'];
    }
    
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
    for (const endpoint of endpointVersions) {
      const currentUrl = `${baseUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;
      console.log(`Trying endpoint: ${currentUrl}`);
      
      try {
        const currentResponse = await fetch(currentUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
          },
          next: {
            revalidate: debug ? 0 : 180, // No cache in debug mode, 3 minutes in production
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
          attemptedEndpoints: endpointVersions,
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
    console.log('API response received, data structure:', {
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
          attemptedEndpoints: endpointVersions,
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
    console.error('Blog API proxy error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
} 