import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/app/api/blog/api';
import { getS3URL } from '@/app/api/api';
import ArticleSchema from '@/app/components/ArticleSchema';
import { generateHreflangTags, generateOptimalMetaTitle, generateOptimalMetaDescription } from '@/app/utils/seo';
import qs from 'qs';
import BlogPostClient from './BlogPostClient';

// Next.js 15 compatible type definitions
type Params = Promise<{ slug: string }>;

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
        title: 'Post Not Found | Kersten Talent Capital',
        description: 'The requested blog post could not be found.',
      };
    }
    
    const { title, excerpt, seo, publishedAt, content, markdownContent, coverImage, categories } = post.data;
    
    // Base URL from environment or default
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';
    
    // Canonical URL for this blog post
    const canonicalUrl = `${baseUrl}/blog/${slug}`;
    
    // Generate hreflang tags for this page
    const hreflangTags = generateHreflangTags(`/blog/${slug}`, baseUrl);
    
    // Generate optimal meta title and description
    const metaTitle = generateOptimalMetaTitle(
      seo?.metaTitle || title || 'Blog Post'
    );
    const metaDescription = generateOptimalMetaDescription(
      seo?.metaDescription || excerpt || 'Insights on leadership and talent acquisition from Kersten Talent Capital'
    );
    
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
      title: metaTitle,
      description: metaDescription,
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
      openGraph: imageUrl ? {
        images: [{ url: imageUrl }],
        type: 'article',
        url: canonicalUrl,
        title: metaTitle,
        description: metaDescription,
      } : {
        type: 'article',
        url: canonicalUrl,
        title: metaTitle,
        description: metaDescription,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | Kersten Talent Capital',
      description: 'Insights on leadership and talent acquisition from Kersten Talent Capital',
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
 */
async function fetchPostDirectly(slug: string) {
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
          next: { revalidate: 300 }, // Cache for 5 minutes instead of no-store
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
        const proxyUrl = `/api/blog?type=posts&slug=${slug}`;
        console.log(`Trying proxy API: ${proxyUrl}`);
        
        const response = await fetch(proxyUrl, {
          next: { revalidate: 300 }, // Cache for 5 minutes instead of no-store
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
        notFound();
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
      markdownContent = null,
      coverImage = null, 
      categories = [],
      slug: postSlug = slug
    } = post.data || {};
    
    // Prepare the post data for the client component
    const postData = {
      title,
      publishedAt,
      excerpt,
      content,
      markdownContent,
      coverImage,
      categories,
      slug: postSlug
    };
    
    return (
      <>
        <ArticleSchema 
          post={{
            title,
            excerpt,
            content: content || markdownContent || '',
            coverImage: coverImage?.url ? { url: coverImage.url } : undefined,
            publishedAt,
            updatedAt: publishedAt,
            categories
          }}
        />
        <BlogPostClient post={postData} />
      </>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
} 