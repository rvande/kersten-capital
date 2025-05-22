import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getBlogPostsByCategory, getCategories } from '@/app/api/blog/api';
import BlogPostCard from '@/app/components/BlogPostCard';
import CategoryFilter from '@/app/components/CategoryFilter';
import SortSelector from '@/app/components/SortSelector';
import Pagination from '@/app/components/Pagination';
import { sortBlogPosts } from '@/app/utils/blog-helpers';

// Next.js 15 compatible type definitions
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ 
  page?: string;
  sort?: string; 
}>;

// Mark this page as dynamically rendered
export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

/**
 * Generate metadata for the page
 */
export async function generateMetadata(
  props: { params: Params },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { slug } = await props.params;
    const category = await getCategoryBySlug(slug);
    
    if (!category.data) {
      return {
        title: 'Category Not Found',
        description: 'The requested category could not be found.',
      };
    }
    
    const { name } = category.data;
    
    // Base URL from environment or default
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kersten-capital.com';
    
    // Canonical URL for this category
    const canonicalUrl = `${baseUrl}/blog/category/${slug}`;
    
    return {
      title: `${name} | Blog Categories | Kersten Talent Capital`,
      description: `Browse all blog posts in the ${name} category at Kersten Talent Capital.`,
      openGraph: {
        title: `${name} | Blog Categories | Kersten Talent Capital`,
        description: `Browse all blog posts in the ${name} category at Kersten Talent Capital.`,
        url: canonicalUrl,
        type: 'website',
      },
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Category',
      description: 'Kersten Talent Capital blog category',
    };
  }
}

/**
 * Generate static params for all categories
 */
export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    
    return categories.data.map((category) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Direct API fetch for category as fallback
 * @param {string} slug - The category slug
 */
async function fetchCategoryDirectly(slug) {
  try {
    console.log(`Trying direct fetch for category with slug: ${slug}`);
    
    // Try both possible API endpoints
    const endpoints = ['categories', 'category'];
    let category = null;
    
    for (const endpoint of endpoints) {
      if (category) break;
      
      try {
        const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app/';
        const baseUrl = apiUrl.replace(/\/$/, '');
        
        // Convert to query string
        const queryString = new URLSearchParams();
        queryString.append('filters[slug][$eq]', slug);
        queryString.append('populate[blog_posts][populate][coverImage][populate]', '*');
        queryString.append('populate[blog_posts][populate][categories][populate]', '*');
        
        // Build the full URL
        const url = `${baseUrl}/api/${endpoint}?${queryString.toString()}`;
        console.log(`Trying direct fetch from: ${url}`);
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
          },
          cache: 'no-store',
        });
        
        if (!response.ok) {
          console.log(`Endpoint ${endpoint} returned ${response.status}`);
          continue;
        }
        
        const data = await response.json();
        console.log(`Direct fetch response structure:`, {
          hasData: !!data.data,
          isArray: Array.isArray(data.data),
          length: Array.isArray(data.data) ? data.data.length : 'n/a'
        });
        
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          category = { 
            data: data.data[0], 
            meta: data.meta 
          };
          console.log(`Successfully found category with endpoint: ${endpoint}`);
          break;
        } else if (data.data) {
          category = { 
            data: data.data, 
            meta: data.meta 
          };
          console.log(`Successfully found category with endpoint: ${endpoint}`);
          break;
        }
      } catch (endpointError) {
        console.error(`Error fetching from endpoint ${endpoint}:`, endpointError);
      }
    }
    
    return category as any;
  } catch (error) {
    console.error('Error in direct fetch for category:', error);
    return null;
  }
}

/**
 * Category page component
 */
export default async function CategoryPage(props: { params: Params, searchParams?: SearchParams }) {
  try {
    const { slug } = await props.params;
    console.log(`Rendering category page for slug: ${slug}`);
    
    // Extract page and sort parameters safely with defaults
    const searchParamsResolved = props.searchParams ? await props.searchParams : {};
    const pageParam = searchParamsResolved.page;
    const sortParam = searchParamsResolved.sort;
    
    // Parse the values with proper fallbacks
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const sortOption = sortParam || 'newest';
    const pageSize = 9; // Posts per page
    
    // Fetch the category to get its name
    let category = await getCategoryBySlug(slug);
    
    // Try direct fetch if category not found
    if (!category || !category.data) {
      console.log(`Category not found through normal API, trying direct fetch for: ${slug}`);
      const directCategory = await fetchCategoryDirectly(slug);
      
      if (!directCategory) {
        console.error(`Category not found with slug: ${slug} after all attempts`);
        notFound();
      }
      
      category = directCategory;
    }
    
    // Fetch blog posts by category from API
    const postsData = await getBlogPostsByCategory(slug, {
      pagination: {
        page,
        pageSize,
      },
      sort: sortOption === 'newest' 
        ? ['publishedAt:desc'] 
        : sortOption === 'oldest' 
          ? ['publishedAt:asc'] 
          : sortOption === 'a-z' 
            ? ['title:asc'] 
            : ['title:desc'],
    });
    
    // Fetch all categories for the filter
    const categoriesData = await getCategories();
    
    const posts = postsData.data;
    const categories = categoriesData.data;
    
    // Extract pagination info
    const pagination = postsData.meta.pagination || { page: 1, pageCount: 1 };
    const currentPage = pagination.page;
    const totalPages = pagination.pageCount;
    
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#3A3A40] via-[#2A2A30] to-[#1E1E24]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-screen-xl mx-auto">
            <header className="mb-12">
              <h1 className="text-5xl font-bold text-white mb-6 text-center md:text-left">
                {category.data.name}
              </h1>
              
              <div className="mb-8">
                <p className="text-xl text-gray-200 border-l-4 border-[#CA3B2A] pl-4 py-2">
                  Browse all blog posts in the {category.data.name} category.
                </p>
              </div>
            </header>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <CategoryFilter categories={categories} activeCategorySlug={slug} />
              <SortSelector />
            </div>
            
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post, index) => (
                    <BlogPostCard 
                      key={post.id} 
                      post={post} 
                      featured={index === 0 && page === 1} 
                    />
                  ))}
                </div>
                
                <div className="mt-16">
                  <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-semibold mb-4 text-[#3D3939]">No posts found</h2>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  We couldn't find any blog posts in this category.
                </p>
                <a href="/blog" className="inline-block px-6 py-3 bg-[#CA3B2A] text-white rounded-md hover:bg-[#B02F22] transition-colors">
                  View all posts
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching category page:', error);
    notFound();
  }
} 