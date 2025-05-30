import qs from 'qs';


/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = '') {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app/';
  // Remove trailing slash if present
  const baseUrl = apiUrl.replace(/\/$/, '');
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  try {
    // Build request URL
    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true, // prettify URL
    });
    
    // Make sure path starts with /api
    const apiPath = path.startsWith('/api') ? path : `/api${path.startsWith('/') ? path : `/${path}`}`;
    const requestUrl = `${getStrapiURL(apiPath)}${queryString ? `?${queryString}` : ''}`;
    
    console.log('Fetching from URL:', requestUrl);
    
    // Make the request to Strapi with authentication token
    const response = await fetch(requestUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
      },
      ...options,
    });
    
    // Log full response details for debugging
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API response error:', response.status, response.statusText);
      console.error('Error details:', errorText);
      
      // Check for specific validation errors
      let errorJson = null;
      try {
        errorJson = JSON.parse(errorText);
      } catch (e) {
        // Not JSON, continue with other approaches
      }
      
      // Handle content field error specifically - this is a common issue with Strapi v5
      if (errorJson?.error?.details?.key === 'content' || errorText.includes('Invalid key content')) {
        console.log('Content field error detected - trying with wildcard populate');
        
        // Replace the params with a wildcard populate
        const simplifiedParams: Record<string, any> = { 
          ...urlParamsObject,
          populate: '*' 
        };
        
        const simpleQueryString = qs.stringify(simplifiedParams, {
          encodeValuesOnly: true,
        });
        
        const simpleUrl = `${getStrapiURL(apiPath)}${simpleQueryString ? `?${simpleQueryString}` : ''}`;
        console.log('Retrying with wildcard populate URL:', simpleUrl);
        
        const simpleResponse = await fetch(simpleUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
          },
          ...options,
        });
        
        if (simpleResponse.ok) {
          console.log('Wildcard populate request succeeded');
          const simpleData = await simpleResponse.json();
          return normalizeResponse(simpleData);
        }
        
        console.error('Wildcard populate request also failed');
      }
      // Handle invalid populate errors by trying simpler approach
      else if (response.status === 400 && errorText.includes('Invalid key')) {
        console.log('Trying with simplified populate parameter...');
        
        // Simplify the populate parameter if it's complex
        const simplifiedParams: Record<string, any> = { ...urlParamsObject };
        if (simplifiedParams.populate) {
          // Replace complex populate with simple wildcard
          simplifiedParams.populate = '*';
          
          const simpleQueryString = qs.stringify(simplifiedParams, {
            encodeValuesOnly: true,
          });
          
          const simpleUrl = `${getStrapiURL(apiPath)}${simpleQueryString ? `?${simpleQueryString}` : ''}`;
          console.log('Retrying with simplified URL:', simpleUrl);
          
          const simpleResponse = await fetch(simpleUrl, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
            },
            ...options,
          });
          
          if (simpleResponse.ok) {
            console.log('Simplified request succeeded');
            const simpleData = await simpleResponse.json();
            return normalizeResponse(simpleData);
          }
          
          console.error('Simplified request also failed');
        }
      }
      
      throw new Error(`API error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Log a brief summary of the response data for debugging
    console.log(`API response summary for ${path}:`, {
      dataType: Array.isArray(data.data) ? 'array' : typeof data.data === 'object' ? 'object' : 'other',
      itemCount: Array.isArray(data.data) ? data.data.length : data.data ? 1 : 0,
      metaInfo: data.meta ? 'present' : 'absent'
    });
    
    return normalizeResponse(data);
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

/**
 * Normalize Strapi response to handle different formats
 * @param {any} data The data from Strapi
 * @returns {Object} Normalized response
 */
function normalizeResponse(data: any) {
  // Handle edge cases where Strapi returns unexpected data structure
  if (!data.data && !data.meta) {
    console.warn('Unexpected API response format - normalizing:', typeof data);
    
    // Try to convert to expected format
    if (Array.isArray(data)) {
      return {
        data: data,
        meta: { pagination: { page: 1, pageSize: data.length, total: data.length } }
      };
    } else if (typeof data === 'object' && data !== null) {
      return {
        data: [data],
        meta: { pagination: { page: 1, pageSize: 1, total: 1 } }
      };
    }
    
    // Fallback for truly unexpected formats
    return {
      data: data,
      meta: {}
    };
  }
  
  return data;
}

/**
 * Get the S3 URL for images
 * @param {string} path Path of the image
 * @returns {string} Full S3 URL
 */
export function getS3URL(path = '') {
  const s3Url = process.env.S3_BUCKET_URL || 'https://kerstencapital.s3.us-east-1.amazonaws.com';
  // Remove trailing slash if present
  const baseUrl = s3Url.replace(/\/$/, '');
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Fetch global data from Strapi
 * Includes metadata, navigation, footer, etc.
 */
export async function getGlobalData() {
  // Deep populate to fetch all necessary navbar data
  const queryParams = {
    populate: {
      metadata: {
        populate: {
          shareImage: {
            populate: '*'
          }
        }
      },
      favicon: {
        populate: '*'
      },
      navbar: {
        populate: {
          logo: {
            populate: '*'
          },
          button: {
            populate: '*'
          },
          menu: {
            populate: {
              links: {
                populate: '*'
              }
            }
          }
        }
      },
      footer: {
        populate: {
          logo: {
            populate: '*'
          },
         columns: {
            populate: {
              links: {
                populate: '*'
              }
            }
          }
        }
      }
    }
  };
  
  try {
    const data = await fetchAPI('/global', queryParams);
    return data;
  } catch (error) {
    console.error('Failed to fetch global data:', error);
    // Return a fallback data structure matching Strapi v5's actual response format
    return {
      data: {
        id: 1,
        documentId: 'fallback-id',
        metaTitleSuffix: 'Kersten Talent Capital',
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
        locale: 'en',
        metadata: {
          id: 1,
          metaTitle: 'Kersten Talent Capital',
          metaDescription: 'In the fast-paced world of talent acquisition, we move even faster. Learn more now!',
          shareImage: null,
          twitterCardType: 'summary_large_image',
          twitterUsername: null
        },
        favicon: null,
        notificationBanner: null,
        navbar: null,
        footer: null,
        localizations: []
      },
      meta: {}
    };
  }
} 