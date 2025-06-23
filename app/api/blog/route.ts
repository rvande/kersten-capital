import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

/**
 * Blog API route that proxies requests to Strapi
 * Handles blog posts, categories, and related content
 */

// Define the different endpoint variations that Strapi might use
const BLOG_ENDPOINTS = {
  POSTS: ['/api/blog-posts', '/api/blog-post', '/api/articles', '/api/article'],
  CATEGORIES: ['/api/categories', '/api/category'],
  SINGLE_POST: ['/api/blog-posts', '/api/blog-post'],
  SINGLE_CATEGORY: ['/api/categories', '/api/category']
};

/**
 * GET handler for blog API requests
 */
export async function GET(request: NextRequest) {
  try {
    // Get parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'posts'; // posts, categories, single
    const slug = searchParams.get('slug'); // For single post/category lookup
    const categorySlug = searchParams.get('category'); // For filtering posts by category
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const sortBy = searchParams.get('sort') || 'publishedAt:desc';

    console.log(`API route handling request: type=${type}, slug=${slug}, category=${categorySlug}, page=${page}`);

    // Build query parameters based on request type
    let queryParams: any = {};
    let endpointVersions: string[] = [];

    if (type === 'posts') {
      // Blog posts request
      endpointVersions = BLOG_ENDPOINTS.POSTS;
      queryParams = {
        populate: {
          coverImage: true,
          categories: true,
          seo: true,
        },
        pagination: {
          page,
          pageSize,
        },
        sort: [sortBy],
      };

      // Add category filter if specified
      if (categorySlug) {
        queryParams.filters = {
          categories: {
            slug: {
              $eq: categorySlug,
            },
          },
        };
      }

      // Add slug filter for single post
      if (slug) {
        queryParams.filters = {
          ...queryParams.filters,
          slug: {
            $eq: slug,
          },
        };
        endpointVersions = BLOG_ENDPOINTS.SINGLE_POST;
      }
    } else if (type === 'categories') {
      // Categories request
      endpointVersions = BLOG_ENDPOINTS.CATEGORIES;
      queryParams = {
        populate: {
          blog_posts: {
            populate: {
              coverImage: true,
              categories: true,
            },
          },
        },
        sort: ['name:asc'],
      };

      // Add slug filter for single category
      if (slug) {
        queryParams.filters = {
          slug: {
            $eq: slug,
          },
        };
        endpointVersions = BLOG_ENDPOINTS.SINGLE_CATEGORY;
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid type parameter. Must be "posts" or "categories".' },
        { status: 400 }
      );
    }

    // Build the Strapi URL
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app/';
    const baseUrl = apiUrl.replace(/\/$/, '');

    // Convert query parameters to string using qs
    const queryString = qs.stringify(queryParams, {
      encodeValuesOnly: true,
    });

    // Try each endpoint until we get a successful response
    let response: Response | null = null;
    let responseData: any = null;
    const errorDetails: any[] = [];
    
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
            revalidate: 180, // 3 minutes cache
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
        attemptedEndpoints: endpointVersions,
        errors: errorDetails,
      }, { status: 500 });
    }

    // Return the successful response data
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Blog API proxy error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
} 