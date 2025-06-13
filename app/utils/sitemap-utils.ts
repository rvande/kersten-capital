import { fetchAPI } from '../api/api';
import { getBlogPosts as fetchBlogPosts } from '../api/blog/api';
import { getIndustrySlugs } from '../api/api';

// Base URL of the site
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

// Interface for sitemap URL entries
export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Get all static page URLs for the sitemap
 */
export function getStaticPages(): SitemapEntry[] {
  const date = new Date().toISOString();
  
  // Define static pages with their properties
  const staticPages = [
    { path: '/', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/about-us', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/our-approach', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/services', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/services/executive-search', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/services/fractional-hiring', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/services/contingency-hiring', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/contact-us', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/careers', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: '/faq', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/privacy-policy', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/terms-conditions', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/search', changeFrequency: 'weekly' as const, priority: 0.6 },
  ];
  
  // Convert to SitemapEntry format
  return staticPages.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: date,
    changeFrequency,
    priority,
  }));
}

/**
 * Fetch blog posts for the sitemap using the proper blog API
 */
export async function getBlogPosts(): Promise<SitemapEntry[]> {
  const date = new Date().toISOString();
  const entries: SitemapEntry[] = [];
  
  try {
    console.log('Fetching blog posts for sitemap...');
    const blogPostsResponse = await fetchBlogPosts({
      pagination: { pageSize: 100 },
      sort: ['publishedAt:desc'],
    });
    
    if (blogPostsResponse?.data && Array.isArray(blogPostsResponse.data)) {
      console.log(`Found ${blogPostsResponse.data.length} blog posts for sitemap`);
      blogPostsResponse.data.forEach((post: any) => {
        if (post.slug) {
          entries.push({
            url: `${SITE_URL}/blog/${post.slug}`,
            lastModified: post.updatedAt || post.publishedAt || date,
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        }
      });
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }
  
  return entries;
}

/**
 * Fetch blog categories for the sitemap
 */
export async function getBlogCategories(): Promise<SitemapEntry[]> {
  const date = new Date().toISOString();
  const entries: SitemapEntry[] = [];
  
  try {
    const categories = await fetchAPI('categories', {
      pagination: { pageSize: 100 },
      populate: '*',
    });
    
    if (categories?.data) {
      categories.data.forEach((category: any) => {
        if (category.attributes?.slug) {
          entries.push({
            url: `${SITE_URL}/blog/category/${category.attributes.slug}`,
            lastModified: category.attributes.updatedAt || date,
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      });
    }
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
    // Try alternative endpoint format
    try {
      const categories = await fetchAPI('api::category.category', {
        pagination: { pageSize: 100 },
        populate: '*',
      });
      
      if (categories?.data) {
        categories.data.forEach((category: any) => {
          if (category.attributes?.slug) {
            entries.push({
              url: `${SITE_URL}/blog/category/${category.attributes.slug}`,
              lastModified: category.attributes.updatedAt || date,
              changeFrequency: 'monthly',
              priority: 0.6,
            });
          }
        });
      }
    } catch (fallbackError) {
      console.error('Error with fallback categories endpoint:', fallbackError);
    }
  }
  
  return entries;
}

/**
 * Fetch industry pages for the sitemap using the proper industry API
 * This handles both simple and nested industry slugs
 */
export async function getIndustryPages(): Promise<SitemapEntry[]> {
  const date = new Date().toISOString();
  const entries: SitemapEntry[] = [];
  
  try {
    console.log('Fetching industry slugs for sitemap...');
    const industrySlugs = await getIndustrySlugs();
    
    if (industrySlugs && Array.isArray(industrySlugs)) {
      console.log(`Found ${industrySlugs.length} industry slugs for sitemap`);
      industrySlugs.forEach((slug: string) => {
        if (slug) {
          entries.push({
            url: `${SITE_URL}/industries/${slug}`,
            lastModified: date,
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        }
      });
    }
  } catch (error) {
    console.error('Error fetching industry slugs for sitemap:', error);
    
    // Fallback: try to fetch industries directly
    try {
      console.log('Trying fallback method for industries...');
      const industries = await fetchAPI('industries', {
        pagination: { pageSize: 100 },
        fields: ['slug'],
        filters: {
          isActive: {
            $eq: true
          }
        },
      });
      
      if (industries?.data) {
        industries.data.forEach((industry: any) => {
          const slug = industry.attributes?.slug || industry.slug;
          if (slug) {
            // Remove "industries/" prefix if present to match URL structure
            const cleanSlug = slug.startsWith('industries/') ? slug.replace('industries/', '') : slug;
            entries.push({
              url: `${SITE_URL}/industries/${cleanSlug}`,
              lastModified: industry.attributes?.updatedAt || date,
              changeFrequency: 'monthly',
              priority: 0.7,
            });
          }
        });
      }
    } catch (fallbackError) {
      console.error('Error with fallback industries endpoint:', fallbackError);
    }
  }
  
  return entries;
} 