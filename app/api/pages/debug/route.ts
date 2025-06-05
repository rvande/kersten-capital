import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

/**
 * Debug route to test direct Strapi pages connectivity
 * This allows testing different populate configurations to troubleshoot API issues
 */
export async function GET(request: NextRequest) {
  try {
    // Get parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug') || 'about-us';
    const testType = searchParams.get('test') || 'simple'; // simple, basic, full
    
    // Build different test configurations
    let queryParams: any = {};
    
    switch (testType) {
      case 'simple':
        // Just get basic fields without any populate
        queryParams = {
          filters: {
            slug: {
              $eq: slug,
            },
          },
        };
        break;
        
      case 'basic':
        // Test basic populate
        queryParams = {
          filters: {
            slug: {
              $eq: slug,
            },
          },
          populate: '*',
        };
        break;
        
      case 'metadata':
        // Test metadata populate specifically
        queryParams = {
          filters: {
            slug: {
              $eq: slug,
            },
          },
          populate: {
            metadata: true,
          },
        };
        break;
        
      case 'content':
        // Test content sections populate
        queryParams = {
          filters: {
            slug: {
              $eq: slug,
            },
          },
          populate: {
            contentSections: true,
          },
        };
        break;
        
      case 'full':
      default:
        // Test the full populate we're trying to use
        queryParams = {
          filters: {
            slug: {
              $eq: slug,
            },
          },
          populate: {
            metadata: {
              populate: {
                shareImage: true,
              },
            },
            contentSections: {
              populate: '*',
            },
          },
        };
        break;
    }
    
    // Build the Strapi URL
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app/';
    const baseUrl = apiUrl.replace(/\/$/, '');
    
    // Try different endpoint variations
    const endpoints = ['/api/pages', '/api/page'];
    
    // Convert query parameters to string using qs
    const queryString = qs.stringify(queryParams, {
      encodeValuesOnly: true,
    });
    
    let successResponse = null;
    let errorDetails = [];
    
    for (const endpoint of endpoints) {
      const url = `${baseUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;
      console.log(`Debug: Testing endpoint: ${url}`);
      
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
          },
          cache: 'no-store', // Disable caching for debugging
        });
        
        const responseText = await response.text();
        
        if (response.ok) {
          try {
            const data = JSON.parse(responseText);
            successResponse = {
              endpoint,
              url,
              status: response.status,
              data,
              testType,
              slug,
            };
            break;
          } catch (parseError) {
            errorDetails.push({
              endpoint,
              url,
              status: response.status,
              error: 'JSON parse error',
              responseText: responseText.substring(0, 500),
            });
          }
        } else {
          errorDetails.push({
            endpoint,
            url,
            status: response.status,
            statusText: response.statusText,
            error: responseText,
          });
        }
      } catch (fetchError) {
        errorDetails.push({
          endpoint,
          url,
          error: fetchError instanceof Error ? fetchError.message : String(fetchError),
        });
      }
    }
    
    if (successResponse) {
      return NextResponse.json({
        success: true,
        message: `Successfully fetched page data for slug: ${slug} using test type: ${testType}`,
        ...successResponse,
        dataStructure: {
          hasData: !!successResponse.data.data,
          dataType: successResponse.data.data ? (Array.isArray(successResponse.data.data) ? 'array' : 'object') : 'none',
          dataLength: successResponse.data.data && Array.isArray(successResponse.data.data) ? successResponse.data.data.length : 'n/a',
          firstItemKeys: successResponse.data.data && Array.isArray(successResponse.data.data) && successResponse.data.data.length > 0 
            ? Object.keys(successResponse.data.data[0]) 
            : successResponse.data.data && typeof successResponse.data.data === 'object'
              ? Object.keys(successResponse.data.data)
              : [],
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Failed to fetch page data for slug: ${slug} using test type: ${testType}`,
        testType,
        slug,
        attemptedEndpoints: endpoints,
        errors: errorDetails,
        suggestion: 'Try different test types: ?test=simple, ?test=basic, ?test=metadata, ?test=content, or ?test=full',
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      success: false,
      error: `Internal server error: ${error instanceof Error ? error.message : String(error)}`,
    }, { status: 500 });
  }
} 