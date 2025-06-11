import { MetadataRoute } from 'next';
import { getBlogPosts, getCategories } from './api/blog/api';
import { getIndustrySlugs } from './api/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment or default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kersten-capital.com';
  
  // Static routes - core pages
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tech-stack`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];
  
  // Fetch industry pages for dynamic routes
  let industryRoutes: MetadataRoute.Sitemap = [];
  try {
    const industrySlugs = await getIndustrySlugs();
    
    if (industrySlugs && Array.isArray(industrySlugs)) {
      industryRoutes = industrySlugs.map(slug => {
        // Handle both single-level and nested slugs
        const urlPath = slug.includes('/') 
          ? `/industries/${slug}` // For nested routes like manufacturing-distribution-industrial/pe-backed-entities
          : `/industries/${slug}`; // For single-level routes like technology-financial-services
        
        return {
          url: `${baseUrl}${urlPath}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        };
      });
    }
  } catch (error) {
    console.error('Error fetching industry slugs for sitemap:', error);
  }
  
  // Fetch blog posts for dynamic routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const postsData = await getBlogPosts({
      pagination: { pageSize: 100 }, // Adjust page size as needed
      sort: ['publishedAt:desc'],
    });
    
    if (postsData?.data && Array.isArray(postsData.data)) {
      blogRoutes = postsData.data.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }
  
  // Fetch categories for dynamic routes
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categoriesData = await getCategories();
    
    if (categoriesData?.data && Array.isArray(categoriesData.data)) {
      categoryRoutes = categoriesData.data.map(category => ({
        url: `${baseUrl}/blog/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }
  
  // Combine all routes
  return [...staticRoutes, ...industryRoutes, ...blogRoutes, ...categoryRoutes];
} 