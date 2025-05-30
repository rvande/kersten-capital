import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/app/api/blog/api';
import { getS3URL } from '@/app/api/api';
import { formatDate, getReadingTime } from '@/app/utils/blog-helpers';
import qs from 'qs';
import RichTextRenderer from '@/app/components/RichTextRenderer';

// Next.js 15 compatible type definitions
type Params = Promise<{ slug: string }>;

/**
 * @typedef {Object} BlogParams
 * @property {string} slug - The slug of the blog post
 */

/**
 * Generate metadata for the page
 */
export async function generateMetadata(
  props: { params: Params },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // Properly await the params object
    const { slug } = await props.params;
    const post = await getBlogPostBySlug(slug).catch(error => {
      console.error('Error generating metadata:', error);
      return { data: null };
    });
    
    if (!post || !post.data) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }
    
    const { title, excerpt, seo } = post.data;
    
    // Base URL from environment or default
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kersten-capital.com';
    
    // Canonical URL for this blog post
    const canonicalUrl = `${baseUrl}/blog/${slug}`;
    
    // Handle SEO image URL in a more flexible way
    let imageUrl = undefined;
    if (seo?.metaImage) {
      const metaImage = seo.metaImage as any;
      if (typeof metaImage === 'string') {
        imageUrl = metaImage.startsWith('http') ? metaImage : getS3URL(metaImage);
      } else if (metaImage.url) {
        imageUrl = metaImage.url.startsWith('http') ? metaImage.url : getS3URL(metaImage.url);
      } else if (metaImage.data?.attributes?.url) {
        // Handle nested data format
        imageUrl = metaImage.data.attributes.url.startsWith('http') 
          ? metaImage.data.attributes.url 
          : getS3URL(metaImage.data.attributes.url);
      }
    }
    
    return {
      title: seo?.metaTitle || title || 'Blog Post',
      description: seo?.metaDescription || excerpt || 'Kersten Talent Capital blog post',
      openGraph: imageUrl ? {
        images: [{ url: imageUrl }],
        type: 'article',
        url: canonicalUrl,
      } : {
        type: 'article',
        url: canonicalUrl,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post',
      description: 'Kersten Talent Capital blog post',
    };
  }
}

/**
 * Generate static params for all blog posts
 */
export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts({
      pagination: {
        limit: 100, // Limit to 100 posts for static generation
      },
    }).catch(error => {
      console.error('Error fetching posts for static params:', error);
      return { data: [] };
    });
    
    if (!posts || !posts.data || !Array.isArray(posts.data)) {
      console.warn('No posts data available for static params generation');
      return [];
    }
    
    return posts.data.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Direct API fetch to be used as fallback if needed
 * @param {string} slug - The blog post slug
 */
async function fetchPostDirectly(slug) {
  try {
    console.log(`Trying direct fetch for post with slug: ${slug}`);
    
    // Try both possible API endpoints and formats
    const endpoints = [
      'blog-posts',
      'blog-post',
      'articles', // Try other potential content types
      'article'
    ];
    
    let post = null;
    
    for (const endpoint of endpoints) {
      if (post) break;
      
      try {
        const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app/';
        const baseUrl = apiUrl.replace(/\/$/, '');
        
        // Try with qs library for more reliable parameter formatting
        const params = {
          filters: {
            slug: {
              $eq: slug,
            },
          },
          populate: {
            coverImage: true,
            categories: true,
            seo: true,
            content: true,
          },
        };
        
        // Import qs at the top of the file and use it here
        const queryString = qs.stringify(params, {
          encodeValuesOnly: true,
        });
        
        // Build the full URL
        const url = `${baseUrl}/api/${endpoint}?${queryString}`;
        console.log(`Trying direct fetch from: ${url}`);
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
          },
          cache: 'no-store',
          next: { revalidate: 0 }
        });
        
        if (!response.ok) {
          console.log(`Endpoint ${endpoint} returned ${response.status}`);
          continue;
        }
        
        const data = await response.json();
        console.log(`Direct fetch response structure:`, {
          hasData: !!data.data,
          dataType: data.data ? (Array.isArray(data.data) ? 'array' : 'object') : 'none',
        });
        
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          post = { 
            data: data.data[0], 
            meta: data.meta 
          };
          console.log(`Successfully found post with endpoint: ${endpoint}`);
          break;
        } else if (data.data) {
          post = { 
            data: data.data, 
            meta: data.meta 
          };
          console.log(`Successfully found post with endpoint: ${endpoint}`);
          break;
        }
      } catch (endpointError) {
        console.error(`Error fetching from endpoint ${endpoint}:`, endpointError);
      }
    }
    
    // If all API endpoints failed, try one more approach with the proxy API
    if (!post) {
      try {
        const proxyUrl = `/api/blog?type=posts&slug=${slug}&debug=true`;
        console.log(`Trying proxy API: ${proxyUrl}`);
        
        const response = await fetch(proxyUrl, {
          cache: 'no-store',
          next: { revalidate: 0 }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            post = { 
              data: data.data[0], 
              meta: data.meta 
            };
          } else if (data.data) {
            post = { 
              data: data.data, 
              meta: data.meta 
            };
          }
        }
      } catch (proxyError) {
        console.error('Error with proxy fetch:', proxyError);
      }
    }
    
    return post;
  } catch (error) {
    console.error('Error in direct fetch:', error);
    return null;
  }
}

/**
 * Blog post page component
 */
export default async function BlogPostPage({ params }: { params: Params }) {
  try {
    const { slug } = await params;
    console.log(`Rendering blog post page for slug: ${slug}`);
    
    // Try getting the post through the normal API
    let post = await getBlogPostBySlug(slug).catch(error => {
      console.error('Error in getBlogPostBySlug:', error);
      return null;
    });
    
    // If not found, try direct fetch as fallback
    if (!post || !post.data) {
      console.log(`Post not found through normal API, trying direct fetch for: ${slug}`);
      const directPost = await fetchPostDirectly(slug);
      
      if (!directPost || !directPost.data) {
        console.error(`Post not found with slug: ${slug} after all attempts`);
        
        // Instead of immediate 404, create fallback content for debugging
        return (
          <main className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-red-600 mb-4">Post Loading Error</h1>
              <p className="mb-4">We're having trouble loading the post: <strong>{slug}</strong></p>
              <p className="mb-8">This could be due to a temporary API issue or the post may no longer exist.</p>
              <div className="flex justify-center">
                <a href="/blog" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  Return to Blog
                </a>
                <button 
                  onClick={() => window.location.reload()} 
                  className="ml-4 bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          </main>
        );
      }
      
      post = directPost;
    }
    
    // Ensure post data exists before destructuring
    if (!post.data) {
      console.error(`Post data is null or undefined for slug: ${slug}`);
      notFound();
    }
    
    // Extract post data with safe fallbacks
    const { 
      title = 'Untitled Post', 
      publishedAt = new Date().toISOString(), 
      excerpt = '', 
      content = null, 
      coverImage = null, 
      categories = [] 
    } = post.data || {};
    
    // Get image URL with better handling of different formats
    const getImageUrl = () => {
      if (!coverImage) {
        return '/images/blog-placeholder.jpg';
      }
      
      // Cast to any to handle different potential structures
      const image = coverImage as any;
      
      if (typeof image === 'string') {
        return image.startsWith('http') ? image : getS3URL(image);
      }
      
      if (image.url) {
        return image.url.startsWith('http') ? image.url : getS3URL(image.url);
      }
      
      // Try to handle formats[large] for Strapi v5
      if (image.formats && image.formats.large && image.formats.large.url) {
        return image.formats.large.url.startsWith('http') 
          ? image.formats.large.url 
          : getS3URL(image.formats.large.url);
      }
      
      // Check for nested data
      if (image.data && image.data.attributes) {
        const attrs = image.data.attributes;
        if (attrs.url) {
          return attrs.url.startsWith('http') ? attrs.url : getS3URL(attrs.url);
        }
        if (attrs.formats && attrs.formats.large && attrs.formats.large.url) {
          return attrs.formats.large.url.startsWith('http') 
            ? attrs.formats.large.url 
            : getS3URL(attrs.formats.large.url);
        }
      }
      
      return '/images/blog-placeholder.jpg';
    };
    
    const imageUrl = getImageUrl();
    const formattedDate = formatDate(publishedAt);
    const readingTime = content ? getReadingTime(JSON.stringify(content)) : 0;
    
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#3A3A40] via-[#2A2A30] to-[#1E1E24] px-4 py-12">
        <div className="container mx-auto">
          <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Featured Image */}
            {imageUrl && (
              <div className="relative aspect-[16/9] w-full">
                <Image 
                  src={imageUrl} 
                  alt={typeof coverImage === 'object' && coverImage?.alternativeText || title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 70vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            <div className="p-6 md:p-10">
              <header className="mb-8">
                {/* Categories - with null check */}
                {categories && Array.isArray(categories) && categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map(category => (
                      <Link 
                        key={category?.id || `cat-${Math.random()}`}
                        href={`/blog/category/${category?.slug || 'uncategorized'}`}
                        className="text-xl font-semibold bg-[#CA3B2A]/10 text-[#CA3B2A] px-3 py-1 rounded-full hover:bg-[#CA3B2A]/20 transition-colors"
                      >
                        {category?.name || 'Uncategorized'}
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3D3939]">{title}</h1>
                
                {/* Meta */}
                <div className="flex items-center text-gray-600 mb-6">
                  <span className="mr-4">{formattedDate}</span>
                  <span>•</span>
                  <span className="ml-4">{readingTime} min read</span>
                </div>
                
                {/* Excerpt */}
                {excerpt && (
                  <div className="text-xl text-gray-700 font-medium mb-8 border-l-4 border-[#CA3B2A] pl-4 py-2 bg-[#CA3B2A]/5">
                    {excerpt}
                  </div>
                )}
              </header>
              
              {/* Content */}
              <div className="prose-lg max-w-none">
                {content && Array.isArray(content) && content.length > 0 ? (
                  <RichTextRenderer content={content} />
                ) : (
                  <p className="text-gray-600 italic">
                    Content is not available in a renderable format.
                  </p>
                )}
              </div>
              
              {/* Back to blog link */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <Link 
                  href="/blog"
                  className="inline-flex items-center text-[#CA3B2A] font-medium hover:underline group"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all posts
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
} 