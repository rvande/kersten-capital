import { Metadata } from 'next';
import { getBlogPosts } from '../api/blog/api';
import { getCategories } from '../api/blog/api';
import BlogPostCard from '../components/BlogPostCard';
import CategoryFilter from '../components/CategoryFilter';
import SortSelector from '../components/SortSelector';
import Pagination from '../components/Pagination';
import { sortBlogPosts } from '../utils/blog-helpers';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kersten-capital.com';

export const metadata: Metadata = {
  title: 'Blog | Kersten Talent Capital',
  description: 'Read the latest insights, trends, and news from Kersten Talent Capital.',
  openGraph: {
    title: 'Blog | Kersten Talent Capital',
    description: 'Read the latest insights, trends, and news from Kersten Talent Capital.',
    url: `${baseUrl}/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

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
    <main className="min-h-screen bg-gradient-to-b from-[#3A3A40] via-[#2A2A30] to-[#1E1E24]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-screen-xl mx-auto">
          <header className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-6 text-center md:text-left">Blog</h1>
            
            <div className="mb-8">
              <p className="text-xl text-gray-200 border-l-4 border-[#CA3B2A] pl-4 py-2">
                Read the latest insights, trends, and news from Kersten Talent Capital.
              </p>
            </div>
          </header>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <CategoryFilter categories={categories} />
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
                We couldn't find any blog posts that match your criteria.
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
} 