import { MetadataRoute } from 'next';
import { getBlogPosts, getCategories } from './api/blog/api';

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
  return [...staticRoutes, ...blogRoutes, ...categoryRoutes];
} 