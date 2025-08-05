import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getBlogPostsByCategory, getCategories } from '@/app/api/blog/api';
import { generateHreflangTags } from '@/app/utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '@/app/utils/metadata';
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
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';
    
    // Canonical URL for this category
    const canonicalUrl = `${baseUrl}/blog/category/${slug}`;
    
    // Generate hreflang tags for this page
    const hreflangTags = generateHreflangTags(`/blog/category/${slug}`, baseUrl);
    
    const ogImages = await generateConsistentOgImages(`${name} | Blog Categories | Kersten Talent Capital`);
    const twitterImages = await generateConsistentTwitterImages(`${name} | Blog Categories | Kersten Talent Capital`);
    
    return {
      title: `${name} | Blog Categories | Kersten Talent Capital`,
      description: `Browse all blog posts in the ${name} category at Kersten Talent Capital.`,
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'en-US': canonicalUrl,
          'en-CA': canonicalUrl,
          'en-GB': canonicalUrl,
          'en-AU': canonicalUrl,
          'x-default': canonicalUrl,
        },
      },
      openGraph: {
        title: `${name} | Blog Categories | Kersten Talent Capital`,
        description: `Browse all blog posts in the ${name} category at Kersten Talent Capital.`,
        url: canonicalUrl,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${name} | Blog Categories | Kersten Talent Capital`,
        description: `Browse all blog posts in the ${name} category at Kersten Talent Capital.`,
        images: twitterImages,
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
          next: { revalidate: 300 },
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
      <main className="relative w-full overflow-hidden">
        {/* Hero Section with Gradient Background */}
        <section className="relative w-full overflow-hidden py-20 md:py-24 lg:py-32">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 animate-gradient-x"
              style={{
                background: 'linear-gradient(-45deg, #002C5F, #0C6BAF, #005A9C, #187CC1, #71C8F3, #0C6BAF, #002C5F)',
                backgroundSize: '400% 400%',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-montserrat"
                  style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)' }}>
                {category.data.name}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Browse all blog posts in the {category.data.name} category.
              </p>
            </div>
          </div>

          {/* Bottom SVG Overlay */}
          <div className="absolute left-0 right-0 bottom-0 w-full pointer-events-none select-none z-20">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="100%" 
              height="130px" 
              viewBox="0 0 1280 140" 
              preserveAspectRatio="none"
              className="w-full h-[75px] md:h-[130px]"
            >
              <g fill="#002c5f">
                <path d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z" />
                <path d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z" fill="#ffffff" />
              </g>
            </svg>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              
              {/* Search and Filter Controls */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl max-w-4xl mx-auto mb-16 border border-gray-100">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                  <CategoryFilter categories={categories} activeCategorySlug={slug} />
                  <SortSelector />
                </div>
              </div>
              
              {/* Blog Posts Grid */}
              {posts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-16">
                    {posts.map((post, index) => (
                      <BlogPostCard 
                        key={post.id} 
                        post={post} 
                        featured={index === 0 && page === 1} 
                      />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                      <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 shadow-2xl max-w-2xl mx-auto text-center border border-gray-100">
                  <svg className="w-16 h-16 text-[#0C6BAF] mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-2xl md:text-3xl font-black mb-4 text-[#002C5F] font-montserrat">No Posts Found</h2>
                  <p className="text-black/70 max-w-md mx-auto mb-8 font-open-sans text-lg leading-relaxed">
                    We couldn't find any blog posts in this category. Try browsing other categories or view all posts.
                  </p>
                  <a 
                    href="/blog" 
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat font-semibold"
                  >
                    View All Posts
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error('Error fetching category page:', error);
    notFound();
  }
} 