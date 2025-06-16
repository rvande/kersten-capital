'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import { SearchResult, SearchResponse } from '../api/search/route';

interface SearchResultsProps {
  initialQuery: string;
  initialPage: number;
  initialType: string;
}

export default function SearchResults({ initialQuery, initialPage, initialType }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedType, setSelectedType] = useState(initialType);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pageSize = 10;

  // Perform search
  const performSearch = async (searchQuery: string, page: number = 1, type: string = 'all') => {
    if (!searchQuery.trim()) {
      setResults([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&page=${page}&pageSize=${pageSize}&type=${type}`
      );

      if (!response.ok) {
        console.error('Search API response not ok:', response.status, response.statusText);
        throw new Error(`Search failed with status ${response.status}`);
      }

      // Get response text first to check if it's valid
      const responseText = await response.text();
      
      if (!responseText || responseText.trim() === '') {
        console.error('Search API returned empty response');
        throw new Error('Empty response from search API');
      }

      // Try to parse JSON
      let data: SearchResponse;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse search response as JSON:', parseError);
        console.error('Response text:', responseText);
        throw new Error('Invalid JSON response from search API');
      }

      // Validate data structure
      if (data && Array.isArray(data.results)) {
        setResults(data.results);
        setTotalResults(data.total);
      } else {
        console.error('Invalid search response structure:', data);
        throw new Error('Invalid response structure from search API');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Search failed. Please try again.');
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Update URL when search parameters change
  const updateURL = (newQuery: string, newPage: number, newType: string) => {
    const params = new URLSearchParams();
    if (newQuery) params.set('q', newQuery);
    if (newPage > 1) params.set('page', newPage.toString());
    if (newType !== 'all') params.set('type', newType);

    const newURL = `/search${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newURL, { scroll: false });
  };

  // Handle search from search bar
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
    updateURL(newQuery, 1, selectedType);
    performSearch(newQuery, 1, selectedType);
  };

  // Handle type filter change
  const handleTypeChange = (newType: string) => {
    setSelectedType(newType);
    setCurrentPage(1);
    updateURL(query, 1, newType);
    performSearch(query, 1, newType);
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateURL(query, newPage, selectedType);
    performSearch(query, newPage, selectedType);
  };

  // Initial search on component mount
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, initialPage, initialType);
    }
  }, [initialQuery, initialPage, initialType]);

  const totalPages = Math.ceil(totalResults / pageSize);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'page':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'faq':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'blog': return 'Blog Post';
      case 'page': return 'Page';
      case 'faq': return 'FAQ';
      default: return 'Content';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar
          className="w-full"
          placeholder="Search our site..."
          showSuggestions={false}
          onSearch={handleSearch}
        />
      </div>

      {/* Type Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All Results' },
            { value: 'blog', label: 'Blog Posts' },
            { value: 'page', label: 'Pages' },
            { value: 'faq', label: 'FAQs' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleTypeChange(filter.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedType === filter.value
                  ? 'bg-[#0C6BAF] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      {query && (
        <div className="mb-6">
          <p className="text-gray-600 font-open-sans">
            {loading ? (
              'Searching...'
            ) : (
              <>
                {totalResults > 0 ? (
                  <>
                    Found <span className="font-semibold text-[#002C5F]">{totalResults}</span> result
                    {totalResults !== 1 ? 's' : ''} for{' '}
                    <span className="font-semibold text-[#002C5F]">"{query}"</span>
                    {selectedType !== 'all' && (
                      <> in <span className="font-semibold">{getTypeLabel(selectedType)}s</span></>
                    )}
                  </>
                ) : (
                  <>
                    No results found for{' '}
                    <span className="font-semibold text-[#002C5F]">"{query}"</span>
                    {selectedType !== 'all' && (
                      <> in <span className="font-semibold">{getTypeLabel(selectedType)}s</span></>
                    )}
                  </>
                )}
              </>
            )}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => {
              setError(null);
              if (query) {
                performSearch(query, currentPage, selectedType);
              }
            }}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search Results */}
      {!loading && results.length > 0 && (
        <div className="space-y-6">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <Link href={result.url} className="block group">
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 mt-1 ${
                    result.type === 'blog' ? 'text-blue-500' :
                    result.type === 'page' ? 'text-green-500' :
                    'text-orange-500'
                  }`}>
                    {getTypeIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#002C5F] group-hover:text-[#0C6BAF] transition-colors duration-200 font-montserrat">
                        {result.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        result.type === 'blog' ? 'bg-blue-100 text-blue-700' :
                        result.type === 'page' ? 'bg-green-100 text-green-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {getTypeLabel(result.type)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 font-open-sans leading-relaxed">
                      {result.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="font-medium">{result.url}</span>
                      {result.publishedAt && (
                        <span>{formatDate(result.publishedAt)}</span>
                      )}
                      {result.category && (
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {result.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && query && results.length === 0 && !error && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-montserrat">No results found</h3>
          <p className="text-gray-600 mb-6 font-open-sans">
            Try adjusting your search terms or browse our content:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className="bg-[#0C6BAF] text-white px-4 py-2 rounded-lg hover:bg-[#187CC1] transition-colors duration-200"
            >
              Browse Blog
            </Link>
            <Link
              href="/faq"
              className="bg-white text-[#0C6BAF] border border-[#0C6BAF] px-4 py-2 rounded-lg hover:bg-[#0C6BAF] hover:text-white transition-colors duration-200"
            >
              View FAQs
            </Link>
            <Link
              href="/about-us"
              className="bg-white text-[#0C6BAF] border border-[#0C6BAF] px-4 py-2 rounded-lg hover:bg-[#0C6BAF] hover:text-white transition-colors duration-200"
            >
              About Us
            </Link>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                    pageNum === currentPage
                      ? 'bg-[#0C6BAF] text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 