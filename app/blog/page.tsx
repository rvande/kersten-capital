import { Metadata } from 'next';
import { getBlogPosts } from '../api/blog/api';
import { getCategories } from '../api/blog/api';
import { generateHreflangTags } from '../utils/seo';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../utils/metadata';
import BlogPostCard from '../components/BlogPostCard';
import CategoryFilter from '../components/CategoryFilter';
import SortSelector from '../components/SortSelector';
import Pagination from '../components/Pagination';
import { sortBlogPosts } from '../utils/blog-helpers';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Kersten Talent Capital Blog');
    const twitterImages = await generateConsistentTwitterImages('Kersten Talent Capital Blog');
    
    return {
      title: 'Kersten Talent Capital Blog',
      description: 'Read the latest insights, trends, and news from Kersten Talent Capital.',
      alternates: {
        canonical: `${baseUrl}/blog`,
        languages: {
          'en-US': `${baseUrl}/blog`,
          'en-CA': `${baseUrl}/blog`,
          'en-GB': `${baseUrl}/blog`,
          'en-AU': `${baseUrl}/blog`,
          'x-default': `${baseUrl}/blog`,
        },
      },
      openGraph: {
        title: 'Kersten Talent Capital Blog',
        description: 'Read the latest insights, trends, and news from Kersten Talent Capital.',
        url: `${baseUrl}/blog`,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Kersten Talent Capital Blog',
        description: 'Read the latest insights, trends, and news from Kersten Talent Capital.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating blog metadata:', error);
    return {
      title: 'Kersten Talent Capital Blog',
      description: 'Read the latest insights, trends, and news from Kersten Talent Capital.',
      alternates: {
        canonical: `${baseUrl}/blog`,
      },
    };
  }
}

// Next.js 15 compatible types
type SearchParams = Promise<{
  page?: string;
  sort?: string;
}>;

export default async function BlogPage(props: { searchParams?: SearchParams }) {
  // Get page number and sort option from query params
  const searchParamsResolved = props.searchParams ? await props.searchParams : {};
  const page = searchParamsResolved.page ? parseInt(searchParamsResolved.page, 10) : 1;
  const sortOption = searchParamsResolved.sort || 'newest';
  const pageSize = 9; // Posts per page
  
  // Set sort parameter for API based on the sortOption
  const sortParam = sortOption === 'newest' 
    ? ['publishedAt:desc'] 
    : sortOption === 'oldest' 
      ? ['publishedAt:asc'] 
      : sortOption === 'a-z' 
        ? ['title:asc'] 
        : ['title:desc'];
  
  // Fetch blog posts from API
  const postsData = await getBlogPosts({
    pagination: {
      page,
      pageSize,
    },
    sort: sortParam,
  });
  
  // Fetch categories for filter
  const categoriesData = await getCategories();
  
  const posts = postsData.data;
  const categories = categoriesData.data;
  
  // Extract pagination info
  const pagination = postsData.meta.pagination || { page: 1, pageCount: 1 };
  const currentPage = pagination.page;
  const totalPages = pagination.pageCount;
  
  return (
    <main className="relative w-full overflow-hidden bg-[#002C5F] min-h-screen">
      {/* Hero Section with Image Background */}
      <section className="relative w-full overflow-hidden py-20 md:py-24 lg:py-32">
        {/* Image Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/insights.jpg)',
            }}
            role="img"
            aria-label="Executive meeting room with professionals discussing business insights"
          />
          {/* Overlay for darkening image and better contrast */}
          <div className="absolute inset-0 bg-[#002C5F]/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-montserrat"
                style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)' }}>
              Kersten Talent Capital Blog
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-4xl mx-auto font-open-sans leading-relaxed">
              Stay informed with our latest thinking on executive talent acquisition, 
              leadership trends, and strategic hiring practices.
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
            role="presentation"
            aria-hidden="true"
          >
            <g fill="#002c5f">
              <path d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z" />
              <path d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z" fill="#ffffff" />
            </g>
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl max-w-6xl mx-auto mb-16 border border-gray-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                <CategoryFilter categories={categories} />
                <SortSelector />
              </div>
            </div>
            
            {/* Blog Posts Grid */}
            {posts.length > 0 ? (
              <>
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 mb-16"
                  role="feed"
                  aria-label="Blog posts"
                >
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
                  <nav aria-label="Blog pagination" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                    <Pagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                    />
                  </nav>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-2xl max-w-2xl mx-auto text-center border border-gray-200">
                <svg 
                  className="w-16 h-16 text-[#0C6BAF] mx-auto mb-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="No posts found icon"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-2xl md:text-3xl font-black mb-4 text-[#002C5F] font-montserrat">No Posts Found</h2>
                <p className="text-gray-700 max-w-md mx-auto mb-8 font-open-sans text-lg leading-relaxed">
                  We couldn't find any blog posts that match your criteria. Try adjusting your search or view all posts.
                </p>
                <a 
                  href="/blog" 
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat font-semibold focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:ring-offset-2"
                  aria-label="Return to view all blog posts"
                >
                  View All Posts
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section with Image Background */}
      <section className="relative w-full overflow-hidden py-16 md:py-24">
        {/* Image Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/insights.jpg)',
            }}
            role="img"
            aria-label="Professional business environment for executive consultations"
          />
          {/* Overlay for darkening image and better contrast */}
          <div className="absolute inset-0 bg-[#002C5F]/85" />
        </div>

        {/* CTA Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 pt-10">
          <div className="bg-white/98 backdrop-blur-sm rounded-2xl p-10 md:p-12 shadow-2xl max-w-4xl mx-auto border border-white/30">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#002C5F] font-montserrat">
                Ready to Transform Your Executive Hiring?
              </h2>
              <p className="text-gray-700 mb-8 text-lg md:text-xl font-open-sans leading-relaxed max-w-3xl mx-auto">
                Partner with Kersten Talent Capital to find exceptional leaders who will drive your company's growth and success. 
                Let's discuss your talent acquisition needs today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact-us" 
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat font-semibold focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:ring-offset-2"
                  aria-label="Schedule a consultation with Kersten Talent Capital"
                >
                  Schedule a Consultation
                </a>
                <a 
                  href="/services" 
                  className="inline-block px-8 py-4 bg-transparent border-2 border-[#0C6BAF] text-[#0C6BAF] rounded-full hover:bg-[#0C6BAF] hover:text-white transition-all duration-300 font-montserrat font-semibold focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:ring-offset-2"
                  aria-label="Learn more about our executive search services"
                >
                  Explore Our Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 