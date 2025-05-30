'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Whitepaper } from '@/app/types/blog';
import { formatDate } from '@/app/utils/blog-helpers';

interface GuidesPageContentProps {
  initialWhitepapers: Whitepaper[];
}

export default function GuidesPageContent({ initialWhitepapers }: GuidesPageContentProps) {
  const [whitepapers, setWhitepapers] = useState<Whitepaper[]>(initialWhitepapers);
  const [filteredWhitepapers, setFilteredWhitepapers] = useState<Whitepaper[]>(initialWhitepapers);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  
  // Apply filtering and sorting when dependencies change
  useEffect(() => {
    let results = [...whitepapers];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(wp => 
        (wp.Title?.toLowerCase().includes(query)) || 
        (wp.Description?.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'oldest':
        results.sort((a, b) => new Date(a.PublicationDate).getTime() - new Date(b.PublicationDate).getTime());
        break;
      case 'a-z':
        results.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case 'z-a':
        results.sort((a, b) => b.Title.localeCompare(a.Title));
        break;
      case 'newest':
      default:
        results.sort((a, b) => new Date(b.PublicationDate).getTime() - new Date(a.PublicationDate).getTime());
        break;
    }
    
    setFilteredWhitepapers(results);
  }, [whitepapers, searchQuery, sortOption]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-screen-xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-6 text-center md:text-left">
            Guides & Whitepapers
          </h1>
          
          <div className="mb-8">
            <p className="text-xl text-gray-200 border-l-4 border-[#CA3B2A] pl-4 py-2">
              Access our comprehensive guides, whitepapers, and research on executive talent acquisition, 
              leadership trends, and strategic hiring practices.
            </p>
          </div>
        </header>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="relative text-gray-900">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full p-3 pl-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#CA3B2A] focus:border-[#CA3B2A] outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="w-full md:w-auto ">
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-gray-900 whitespace-nowrap">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="p-2 rounded-md text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[#CA3B2A] focus:border-[#CA3B2A] outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="a-z">Title A-Z</option>
                <option value="z-a">Title Z-A</option>
              </select>
            </div>
          </div>
        </div>
        
        {filteredWhitepapers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-[#3D3939]">No guides found</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchQuery ? 
                `No guides or whitepapers match "${searchQuery}". Try a different search term.` :
                "Check back soon for new guides and whitepapers."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWhitepapers.map((whitepaper, index) => {
              const coverImageUrl = whitepaper.CoverImage?.url || 
                whitepaper.CoverImage?.formats?.large?.url ||
                whitepaper?.attributes?.CoverImage?.data?.attributes?.url ||
                "/images/guide-placeholder.jpg";
              
              const documentUrl = whitepaper.Document?.url ||
                whitepaper?.attributes?.Document?.data?.attributes?.url || '#';
              
              return (
                <div 
                  key={whitepaper.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64">
                    <Image
                      src={coverImageUrl}
                      alt={whitepaper.Title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 30vw"
                    />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <span>{formatDate(whitepaper.PublicationDate || whitepaper.publishedAt)}</span>
                      </div>
                      <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">{whitepaper.Title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{whitepaper.Description}</p>
                    </div>
                    
                    <Link
                      href={documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center px-4 py-2 bg-[#CA3B2A] text-white rounded-md hover:bg-[#B02F22] transition-colors self-start"
                    >
                      Download PDF
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Results summary */}
        {filteredWhitepapers.length > 0 && (
          <div className="mt-8 text-center text-gray-200">
            Showing {filteredWhitepapers.length} of {whitepapers.length} guides
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
        )}
      </div>
    </div>
  );
} 