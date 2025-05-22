import { NextResponse } from 'next/server';
import { stringify } from 'qs';

interface EndpointResult {
  status?: number;
  success: boolean;
  statusText?: string;
  error?: string;
  dataCount?: number;
  data?: any;
}

interface TestResults {
  [key: string]: EndpointResult;
}

export async function GET() {
  try {
    let apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';
    if (apiUrl.endsWith('/')) {
      apiUrl = apiUrl.slice(0, -1);
    }
    
    // Try both collection types and API paths
    const endpoints = [
      '/api/whitepapers',
      '/api/whitepaper',
      '/api/whitepapers-and-resources',
      '/api/resource-library'
    ];
    
    const results: TestResults = {};
    
    // Test multiple endpoints to see which one works
    for (const endpoint of endpoints) {
      try {
        const queryParams = {
          populate: '*',
        };
        const queryString = stringify(queryParams, { encodeValuesOnly: true });
        const fullUrl = `${apiUrl}${endpoint}?${queryString}`;
        
        console.log(`Testing endpoint: ${fullUrl}`);
        
        const res = await fetch(fullUrl, { 
          next: { revalidate: 0 } // Don't cache for this test
        });
        
        if (res.ok) {
          const data = await res.json();
          results[endpoint] = {
            status: res.status,
            success: true,
            dataCount: data.data?.length || 0,
            data: data
          };
        } else {
          results[endpoint] = {
            status: res.status,
            success: false,
            statusText: res.statusText
          };
        }
      } catch (error) {
        results[endpoint] = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }
    
    // Also test the content-type endpoint to see available collections
    try {
      const contentTypesRes = await fetch(`${apiUrl}/api/content-type-builder/content-types`, {
        next: { revalidate: 0 }
      });
      
      if (contentTypesRes.ok) {
        const contentTypesData = await contentTypesRes.json();
        results['content-types'] = {
          success: true,
          data: contentTypesData
        };
      }
    } catch (error) {
      results['content-types'] = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
    
    return NextResponse.json({
      success: true,
      apiUrl,
      results
    });
  } catch (error) {
    console.error('Error in raw test-whitepapers API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 