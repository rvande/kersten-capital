import { NextResponse } from 'next/server';
import { fetchWhitepapers } from '@/app/utils/blog-helpers';
import { stringify } from 'qs';

export async function GET() {
  try {
    // Check environment variables
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';
    
    // Log debug info
    console.log(`Strapi API URL: ${apiUrl}`);
    
    // Create query params for direct testing
    const queryParams = {
      populate: ['Document', 'CoverImage', 'document', 'coverImage', '*'],
      sort: ['PublicationDate:desc', 'publicationDate:desc', 'createdAt:desc'],
    };
    
    const queryString = stringify(queryParams, { encodeValuesOnly: true });
    const fullUrl = `${apiUrl}/api/whitepapers?${queryString}`;
    
    console.log(`Full request URL: ${fullUrl}`);
    
    // Make direct fetch request for debugging
    let directData = null;
    let strapiError = null;
    
    try {
      // Try multiple endpoints to find the correct one
      const endpoints = ['/api/whitepapers', '/api/whitepaper'];
      let directRes = null;
      let successfulEndpoint = null;
      
      for (const endpoint of endpoints) {
        try {
          const endpointUrl = `${apiUrl}${endpoint}?${queryString}`;
          console.log(`Trying endpoint: ${endpointUrl}`);
          
          const res = await fetch(endpointUrl, { next: { revalidate: 0 } });
          if (res.ok) {
            directRes = res;
            successfulEndpoint = endpoint;
            break;
          } else {
            console.log(`Endpoint ${endpoint} returned ${res.status}: ${res.statusText}`);
          }
        } catch (e) {
          console.error(`Error with endpoint ${endpoint}:`, e);
        }
      }
      
      if (directRes) {
        directData = await directRes.json();
        console.log(`Successful endpoint: ${successfulEndpoint}`);
        console.log('Direct API response structure:', 
          directData.data && directData.data.length > 0 
            ? Object.keys(directData.data[0]) 
            : 'No data items found'
        );
      }
    } catch (directError) {
      console.error('Direct fetch error:', directError);
      strapiError = directError instanceof Error ? directError.message : String(directError);
    }
    
    // Use our utility function
    const whitepapers = await fetchWhitepapers(5);
    
    return NextResponse.json({
      success: true,
      data: whitepapers,
      debug: {
        apiUrl,
        fullUrl,
        directDataFound: directData ? true : false,
        directItemCount: directData?.data?.length || 0,
        strapiError,
        strapiUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL
      }
    });
  } catch (error) {
    console.error('Error in test-whitepapers API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        debug: {
          apiUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL
        }
      },
      { status: 500 }
    );
  }
} 