'use client';

import React, { useState, useEffect } from 'react';
import { FAQ } from '../types/faq';
import { FAQGroup } from './FAQAccordion';
import FAQSearch from './FAQSearch';
import Script from 'next/script';
import { generateFAQSchema } from '../utils/seo';

interface FAQPageContentProps {
  faqs: FAQ[];
}

export default function FAQPageContent({ faqs }: FAQPageContentProps) {
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>(faqs);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('order');
  
  // Apply filtering and sorting when dependencies change
  useEffect(() => {
    let results = [...faqs];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(faq => 
        faq.Question?.toLowerCase().includes(query) || 
        faq.Answer?.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'a-z':
        results.sort((a, b) => a.Question.localeCompare(b.Question));
        break;
      case 'z-a':
        results.sort((a, b) => b.Question.localeCompare(a.Question));
        break;
      case 'order':
      default:
        results.sort((a, b) => (a.Order || 0) - (b.Order || 0));
        break;
    }
    
    setFilteredFaqs(results);
  }, [faqs, searchQuery, sortOption]);
  
  // Group FAQs by category or Schemaid
  const groupedFaqs = groupFaqsByCategory(filteredFaqs);
  
  // Generate schema markup for currently displayed FAQs
  const schemaMarkup = generateFAQSchema(filteredFaqs);
  
  return (
    <>
      {/* JSON-LD Schema Markup */}
      <Script 
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaMarkup }}
      />

      {/* Hero Section with Gradient Background */}
      <section className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
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
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto font-open-sans leading-relaxed">
              Find answers to common questions about our executive talent acquisition services, 
              process, and how we can help transform your leadership team.
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
            <g fill="#ffffff" >
              <path d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z" />
              <path d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z" fill="#002C5F" />
            </g>
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative bg-[#002C5F] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Search and Filter Controls */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl max-w-4xl mx-auto mb-16 border border-gray-100">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white h-5 w-5"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 rounded-full bg-[#002C5F] border border-[#002C5F] focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none font-open-sans text-white placeholder:text-white/70"
                  />
                </div>
                
                {/* Sort Selector */}
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-[#002C5F] border border-[#002C5F] rounded-full px-6 py-4 pr-12 md:pr-10 focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none font-montserrat font-semibold text-white cursor-pointer"
                  >
                    <option value="order">Default Order</option>
                    <option value="a-z">Question A-Z</option>
                    <option value="z-a">Question Z-A</option>
                  </select>
                  <svg className="absolute right-3 md:right-3 top-1/2 transform -translate-y-1/2 text-white h-6 w-6 md:h-5 md:w-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* FAQ Content */}
            {Object.keys(groupedFaqs).length > 0 ? (
              <div className="space-y-8 md:space-y-12">
                {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                  <div key={category} className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100">
                    <h2 className="text-2xl md:text-3xl font-black mb-8 text-[#002C5F] font-montserrat">
                      {category}
                    </h2>
                    <FAQGroup categoryName={category} faqs={categoryFaqs} />
                  </div>
                ))}
                
                {/* Results summary */}
                <div className="text-center text-[#002C5F]/70 font-open-sans">
                  Showing {filteredFaqs.length} of {faqs.length} questions
                  {searchQuery && <span> matching "{searchQuery}"</span>}
                </div>
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 shadow-2xl max-w-2xl mx-auto text-center border border-gray-100">
                <svg className="w-16 h-16 text-[#0C6BAF] mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-2xl md:text-3xl font-black mb-4 text-[#002C5F] font-montserrat">No FAQs Found</h2>
                <p className="text-black/70 mb-8 font-open-sans text-lg leading-relaxed">
                  {searchQuery ? 
                    `No FAQs match "${searchQuery}". Try a different search term.` :
                    "No FAQs available at the moment."
                  }
                </p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat font-semibold"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Background */}
      <section className="relative w-full overflow-hidden py-16 md:py-24">
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

        {/* CTA Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-10 md:p-12 shadow-2xl max-w-4xl mx-auto border border-white/20">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#002C5F] font-montserrat">
                Still Have Questions?
              </h2>
              <p className="text-black/70 mb-8 text-lg md:text-xl font-open-sans leading-relaxed max-w-3xl mx-auto">
                Our team is ready to assist you with any questions about our talent acquisition services. 
                Reach out to us for personalized guidance for your organization's unique needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact-us" 
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat font-semibold"
                >
                  Contact Our Team
                </a>
                <a 
                  href="/services" 
                  className="inline-block px-8 py-4 bg-transparent border-2 border-[#0C6BAF] text-[#0C6BAF] rounded-full hover:bg-[#0C6BAF] hover:text-white transition-all duration-300 font-montserrat font-semibold"
                >
                  Learn About Our Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Group FAQs by category or Schemaid, or "General" if none specified
function groupFaqsByCategory(faqs: FAQ[]) {
  const grouped: Record<string, FAQ[]> = {};
  
  faqs.forEach(faq => {
    // Use Category if available, fall back to Schemaid, or use "General" as default
    const categoryName = faq.Category || (faq.Schemaid ? `Section ${faq.Schemaid}` : 'General');
    
    if (!grouped[categoryName]) {
      grouped[categoryName] = [];
    }
    
    grouped[categoryName].push(faq);
  });
  
  return grouped;
}