/**
 * Utility functions for client-side API calls
 * Uses the Next.js API proxy to communicate with Strapi
 */

/**
 * Fetch data from Strapi via Next.js API proxy
 * @param path The API path (e.g., '/global', '/pages')
 * @param queryParams Query parameters for the request
 * @returns The fetched data
 */
export async function fetchFromStrapi(path: string, queryParams = {}) {
  try {
    // Convert queryParams to JSON string
    const queryString = JSON.stringify(queryParams);
    
    // Use our Next.js API proxy to fetch data
    const response = await fetch(`/api/strapi?path=${encodeURIComponent(path)}&query=${encodeURIComponent(queryString)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching from Strapi via proxy:', error);
    throw error;
  }
}

/**
 * Fetch global data via proxy API
 * Example of a specific data fetching function
 */
export async function getGlobalDataClient() {
  try {
    const queryParams = {
      populate: {
        metadata: {
          fields: ['metaTitle', 'metaDescription', 'twitterCardType', 'twitterUsername'],
          populate: {
            shareImage: {
              populate: '*'
            }
          }
        },
        favicon: {
          populate: '*'
        },
        metaTitleSuffix: true
      }
    };
    
    return await fetchFromStrapi('/global', queryParams);
  } catch (error) {
    console.error('Failed to fetch global data via proxy:', error);
    // Return fallback data
    return {
      data: {
        id: 1,
        attributes: {
          metadata: {
            metaTitle: 'Kersten Talent Capital',
            metaDescription: 'Strategic talent investment',
          },
          metaTitleSuffix: 'Kersten Talent Capital',
          favicon: null,
          createdAt: '',
          updatedAt: '',
          publishedAt: ''
        }
      }
    };
  }
}

/**
 * Fetch FAQ data from the API
 * @param category Optional category filter
 * @param page Page number for pagination
 * @param pageSize Number of items per page
 * @returns FAQ data response
 */
export async function getFAQs(category?: string, page: number = 1, pageSize: number = 100) {
  try {
    // Build URL with query parameters
    let url = `/api/faq?page=${page}&pageSize=${pageSize}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    
    console.log('Client requesting FAQs from:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('FAQ API error response:', errorText);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Client received FAQ data:', data ? 'success' : 'empty');
    return data;
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    throw error;
  }
}

/**
 * Fetch FAQ categories from Strapi
 * @returns FAQ categories data
 */
export async function getFAQCategories() {
  try {
    const queryParams = {
      sort: ['id:asc'],
      pagination: {
        pageSize: 100
      }
    };
    
    return await fetchFromStrapi('/faq-categories', queryParams);
  } catch (error) {
    console.error('Failed to fetch FAQ categories:', error);
    throw error;
  }
} 