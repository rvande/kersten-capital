import { fetchAPI } from '../api';
import { PagesResponse, PageResponse, GetPagesParams } from '@/app/types/pages';

// Use the working endpoint for Strapi v5
const PAGES_ENDPOINT = 'pages';

/**
 * Get all pages with pagination and filtering
 * @param {GetPagesParams} params Optional parameters for pagination, filtering, etc.
 * @returns {Promise<PagesResponse>} Pages data
 */
export async function getPages(params: GetPagesParams = {}) {
  const defaultParams = {
    populate: '*',
    sort: ['createdAt:desc'],
  };

  const mergedParams = { ...defaultParams, ...params };
  console.log('Getting pages with params:', JSON.stringify(mergedParams, null, 2));
  
  try {
    const response = await fetchAPI(PAGES_ENDPOINT, mergedParams);
    return response as PagesResponse;
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }
}

/**
 * Get a single page by slug
 * @param {string} slug The slug of the page
 * @param {string} locale Optional locale for i18n
 * @returns {Promise<PageResponse>} Page data
 */
export async function getPageBySlug(slug: string, locale?: string) {
  console.log(`Fetching page with slug: ${slug}${locale ? ` (locale: ${locale})` : ''}`);
  
  // Try different slug variations to handle various formats stored in Strapi
  const slugVariations = [
    slug,                    // exact match: "about-us"
    `/${slug}`,             // with leading slash: "/about-us"
    `${slug}/`,             // with trailing slash: "about-us/"
    `/${slug}/`,            // with both slashes: "/about-us/"
  ];
  
  const params = {
    filters: {
      $or: slugVariations.map(variation => ({
        slug: {
          $eq: variation,
        },
      })),
    },
    populate: {
      metadata: {
        populate: '*'
      },
      contentSections: {
        populate: '*'
      }
    },
    ...(locale && { locale }),
  };

  console.log(`Searching for page with slug variations:`, slugVariations);
  
  try {
    const response = await fetchAPI(PAGES_ENDPOINT, params);
    
    if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
      console.log(`Found page with slug: "${response.data[0].slug}"`);
      console.log('Page content sections:', JSON.stringify(response.data[0].contentSections, null, 2));
      return {
        data: response.data[0],
        meta: response.meta,
      } as PageResponse;
    }
    
    // If no page found, return null
    console.log(`No page found with any slug variation for: ${slug}`);
    return { data: null, meta: { pagination: { page: 1, pageCount: 0, total: 0 } } } as unknown as PageResponse;
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error);
    return { data: null, meta: { pagination: { page: 1, pageCount: 0, total: 0 } } } as unknown as PageResponse;
  }
}

/**
 * Get all page slugs for static generation
 * @param {string} locale Optional locale for i18n
 * @returns {Promise<string[]>} Array of page slugs
 */
export async function getPageSlugs(locale?: string) {
  try {
    const params = {
      fields: ['slug'],
      ...(locale && { locale }),
    };
    
    const response = await getPages(params);
    
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }
    
    return response.data
      .map(page => page.slug)
      .filter(slug => slug && slug !== '/'); // Exclude empty slugs and home page
  } catch (error) {
    console.error('Error fetching page slugs:', error);
    return [];
  }
} 