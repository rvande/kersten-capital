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
    <div className="relative w-full overflow-hidden bg-white min-h-screen">
      {/* Hero Section with Image Background */}
      <section className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
        {/* Hero Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/insights.jpg)',
            }}
            role="img"
            aria-label="Professional insights and guides for executive talent acquisition"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-[#002C5F]/85"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-montserrat"
                style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)' }}>
              Guides & Whitepapers
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-4xl mx-auto font-open-sans leading-relaxed"
               style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}>
              Access our comprehensive guides, whitepapers, and research on executive talent acquisition, 
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
      <section className="relative bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl max-w-4xl mx-auto mb-16 border border-gray-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <label htmlFor="search-guides" className="sr-only">Search guides and whitepapers</label>
                  <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white h-5 w-5"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Search icon"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    id="search-guides"
                    type="text"
                    placeholder="Search guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 rounded-full bg-[#002C5F] border border-[#002C5F] focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none font-open-sans text-white placeholder:text-white/70"
                    aria-describedby="search-help"
                  />
                  <div id="search-help" className="sr-only">Search through our guides and whitepapers by title or description</div>
                </div>
                
                {/* Sort Selector */}
                <div className="relative">
                  <label htmlFor="sort-guides" className="sr-only">Sort guides by</label>
                  <select
                    id="sort-guides"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-[#002C5F] border border-[#002C5F] rounded-full px-6 py-4 pr-12 md:pr-10 focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none font-montserrat font-semibold text-white cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="a-z">Title A-Z</option>
                    <option value="z-a">Title Z-A</option>
                  </select>
                  <svg className="absolute right-3 md:right-3 top-1/2 transform -translate-y-1/2 text-white h-6 w-6 md:h-5 md:w-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Guides Grid */}
            {filteredWhitepapers.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 shadow-2xl max-w-2xl mx-auto text-center border border-gray-200">
                <svg 
                  className="w-16 h-16 text-[#0C6BAF] mx-auto mb-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="No guides found icon"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-2xl md:text-3xl font-black mb-4 text-[#002C5F] font-montserrat">No Guides Found</h2>
                <p className="text-gray-700 max-w-md mx-auto mb-8 font-open-sans text-lg leading-relaxed">
                  {searchQuery ? 
                    `No guides or whitepapers match "${searchQuery}". Try a different search term.` :
                    "Check back soon for new guides and whitepapers."
                  }
                </p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat font-semibold focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:ring-offset-2"
                  aria-label="Clear search and show all guides"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <>
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-16"
                  role="feed"
                  aria-label="Guides and whitepapers"
                >
                  {filteredWhitepapers.map((whitepaper, index) => {
                    const coverImageUrl = whitepaper.CoverImage?.url || 
                      whitepaper.CoverImage?.formats?.large?.url ||
                      whitepaper?.attributes?.CoverImage?.data?.attributes?.url;
                    
                    const documentUrl = whitepaper.Document?.url ||
                      whitepaper?.attributes?.Document?.data?.attributes?.url || '#';
                    
                    return (
                      <article 
                        key={whitepaper.id}
                        className="relative group cursor-pointer"
                      >
                        {/* Blue background - positioned behind card */}
                        <div className="absolute inset-0 bg-[#0C6BAF] rounded-xl transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
                        
                        {/* Main card */}
                        <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 flex flex-col">
                          <div className="relative h-48 md:h-56">
                            {coverImageUrl ? (
                              <Image
                                src={coverImageUrl}
                                alt={`Cover image for ${whitepaper.Title}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 30vw"
                              />
                            ) : (
                              <Image
                                src={index % 2 === 0 ? "/search.jpg" : "/leadership.jpg"}
                                alt={`Default cover image for ${whitepaper.Title}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 30vw"
                              />
                            )}
                          </div>
                          
                          <div className="p-6 flex flex-col flex-grow">
                            <time className="text-sm text-[#0C6BAF] mb-2 font-montserrat font-semibold">
                              {formatDate(whitepaper.PublicationDate || whitepaper.publishedAt)}
                            </time>
                            <h2 className="text-xl md:text-2xl font-black mb-3 text-[#002C5F] line-clamp-2 font-montserrat">
                              {whitepaper.Title}
                            </h2>
                            <p className="text-gray-700 mb-6 font-open-sans leading-relaxed line-clamp-3 flex-grow">
                              {whitepaper.Description}
                            </p>
                            <Link
                              href={documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat font-semibold self-start focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:ring-offset-2"
                              aria-label={`Download PDF guide: ${whitepaper.Title}`}
                            >
                              Download PDF
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="img" aria-label="Download icon">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
                
                {/* Results summary */}
                <div className="text-center text-gray-600 font-open-sans mb-16" role="status" aria-live="polite">
                  Showing {filteredWhitepapers.length} of {whitepapers.length} guides
                  {searchQuery && <span> matching "{searchQuery}"</span>}
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-2xl p-10 md:p-12 shadow-2xl max-w-4xl mx-auto border border-gray-200">
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
                        href="/contact" 
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
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 