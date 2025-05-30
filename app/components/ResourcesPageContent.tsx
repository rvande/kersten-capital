'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Whitepaper } from '@/app/types/blog';
import { formatDate } from '@/app/utils/blog-helpers';

interface ResourcesPageContentProps {
  initialWhitepapers: Whitepaper[];
}

export default function ResourcesPageContent({ initialWhitepapers }: ResourcesPageContentProps) {
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
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#3A3A40] to-[#2A2A30] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources & Whitepapers</h1>
            <p className="text-xl text-gray-200">
              Explore our collection of whitepapers, research reports, and resources on executive talent acquisition, 
              leadership trends, and strategic hiring practices.
            </p>
          </div>
        </div>
      </div>
      
      {/* Filter & Search Section */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-1/2">
              <div className="relative">
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
            
            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-gray-700 whitespace-nowrap">Sort by:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#CA3B2A] focus:border-[#CA3B2A] outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="a-z">Title A-Z</option>
                  <option value="z-a">Title Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resources Listing */}
      <div className="container mx-auto px-4 py-12">
        {filteredWhitepapers.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-gray-600">
              {searchQuery ? 
                `No resources match "${searchQuery}". Try a different search term.` :
                "Check back soon for new resources."
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredWhitepapers.map((whitepaper, index) => {
              const coverImageUrl = whitepaper.CoverImage?.url || 
                whitepaper.CoverImage?.formats?.large?.url ||
                whitepaper?.attributes?.CoverImage?.data?.attributes?.url;
              
              const documentUrl = whitepaper.Document?.url ||
                whitepaper?.attributes?.Document?.data?.attributes?.url || '#';
              
              return (
                <div 
                  key={whitepaper.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="md:w-2/5 h-48 md:h-auto relative">
                    {coverImageUrl ? (
                      <Image
                        src={coverImageUrl}
                        alt={whitepaper.Title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    ) : (
                      <Image
                        src={index % 2 === 0 ? "/search.jpg" : "/leadership.jpg"}
                        alt={whitepaper.Title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    )}
                  </div>
                  
                  <div className="p-6 md:w-3/5 flex flex-col">
                    <div className="flex-grow">
                      <p className="text-sm text-gray-600 mb-2">
                        {formatDate(whitepaper.PublicationDate || whitepaper.publishedAt)}
                      </p>
                      <h2 className="text-xl font-bold mb-3 text-gray-800">{whitepaper.Title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{whitepaper.Description}</p>
                    </div>
                    
                    <Link
                      href={documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-[#CA3B2A] text-white rounded-md hover:bg-[#B02F22] transition-colors mt-auto self-start"
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
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredWhitepapers.length} of {whitepapers.length} resources
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
        )}
      </div>
    </>
  );
} 