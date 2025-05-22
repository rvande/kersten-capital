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
    console.log('With params:', JSON.stringify(urlParamsObject));
    
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
      try {
        // Try to parse the error as JSON for better error reporting
        const errorJson = JSON.parse(errorText);
        console.error('Parsed error:', JSON.stringify(errorJson, null, 2));
      } catch (parseError) {
        // If it's not JSON, just log the raw text
        console.error('Raw error text:', errorText);
      }
      throw new Error(`API error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
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