import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

/**
 * API route specifically for blog categories
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug') || null;
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '100'; // Default to a higher number for categories
    
    // Build query parameters
    let queryParams: any = {
      pagination: {
        page: parseInt(page as string, 10),
        pageSize: parseInt(pageSize as string, 10),
      },
      sort: ['name:asc'],
    };
    
    // Add filters for single category if slug is provided
    if (slug) {
      queryParams.filters = {
        slug: {
          $eq: slug,
        },
      };
      
      // For a single category, include related blog posts
      queryParams.populate = {
        blog_posts: {
          populate: {
            coverImage: {
              populate: '*',
            },
            categories: {
              populate: '*',
            },
          },
        },
      };
    } else {
      // For category listing, simple populate
      queryParams.populate = '*';
    }
    
    // Build the Strapi URL
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app/';
    const baseUrl = apiUrl.replace(/\/$/, '');
    const path = '/api/categories';
    
    // Convert query parameters to string using qs
    const queryString = qs.stringify(queryParams, {
      encodeValuesOnly: true,
    });
    
    const url = `${baseUrl}${path}${queryString ? `?${queryString}` : ''}`;
    
    // Make the request to Strapi with authentication
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
      },
      next: {
        revalidate: 300, // Cache for 5 minutes - categories change infrequently
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
    console.error('Categories API proxy error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
} 