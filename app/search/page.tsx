import { Metadata } from 'next';
import { Suspense } from 'react';
import SearchResults from '../components/SearchResults';
import { generateConsistentOgImages, generateConsistentTwitterImages } from '../utils/metadata';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogImages = await generateConsistentOgImages('Search Results | Kersten Talent Capital');
    const twitterImages = await generateConsistentTwitterImages('Search Results | Kersten Talent Capital');
    
    return {
      title: 'Search Results | Kersten Talent Capital',
      description: 'Search results for Kersten Talent Capital content including blog posts, pages, and FAQs.',
      alternates: {
        canonical: `${baseUrl}/search`,
        languages: {
          'en-US': `${baseUrl}/search`,
          'en-CA': `${baseUrl}/search`,
          'en-GB': `${baseUrl}/search`,
          'en-AU': `${baseUrl}/search`,
          'x-default': `${baseUrl}/search`,
        },
      },
      openGraph: {
        title: 'Search Results | Kersten Talent Capital',
        description: 'Search results for Kersten Talent Capital content including blog posts, pages, and FAQs.',
        url: `${baseUrl}/search`,
        type: 'website',
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Search Results | Kersten Talent Capital',
        description: 'Search results for Kersten Talent Capital content including blog posts, pages, and FAQs.',
        images: twitterImages,
      },
    };
  } catch (error) {
    console.error('Error generating search metadata:', error);
    return {
      title: 'Search Results | Kersten Talent Capital',
      description: 'Search results for Kersten Talent Capital content including blog posts, pages, and FAQs.',
      alternates: {
        canonical: `${baseUrl}/search`,
      },
    };
  }
}

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : '';
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  const type = typeof params.type === 'string' ? params.type : 'all';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#002C5F] to-[#0C6BAF] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 font-montserrat">
              Search Results
            </h1>
            {query && (
              <p className="text-lg md:text-xl text-white/90 font-open-sans">
                Results for: <span className="font-semibold">"{query}"</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults initialQuery={query} initialPage={page} initialType={type} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar Skeleton */}
      <div className="mb-8">
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Filters Skeleton */}
      <div className="mb-8 flex space-x-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>

      {/* Results Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                <div className="flex space-x-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 