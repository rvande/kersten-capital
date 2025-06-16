'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchResult } from '../api/search/route';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  showSuggestions?: boolean;
  onSearch?: (query: string) => void;
  onResultSelect?: () => void;
}

export default function SearchBar({ 
  className = '', 
  placeholder = 'Search our site...', 
  showSuggestions = true,
  onSearch,
  onResultSelect
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounced search for suggestions
  useEffect(() => {
    if (!query.trim() || !showSuggestions) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&pageSize=5`);
        
        // Check if response is ok and has content
        if (!response.ok) {
          console.error('Search API response not ok:', response.status, response.statusText);
          setSuggestions([]);
          setIsOpen(false);
          return;
        }

        // Get response text first to check if it's valid
        const responseText = await response.text();
        
        if (!responseText || responseText.trim() === '') {
          console.error('Search API returned empty response');
          setSuggestions([]);
          setIsOpen(false);
          return;
        }

        // Try to parse JSON
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse search response as JSON:', parseError);
          console.error('Response text:', responseText);
          setSuggestions([]);
          setIsOpen(false);
          return;
        }

        // Validate data structure
        if (data && Array.isArray(data.results)) {
          setSuggestions(data.results);
          setIsOpen(data.results.length > 0);
        } else {
          console.error('Invalid search response structure:', data);
          setSuggestions([]);
          setIsOpen(false);
        }
      } catch (error) {
        console.error('Search suggestions error:', error);
        setSuggestions([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, showSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          const selectedResult = suggestions[selectedIndex];
          router.push(selectedResult.url);
          setIsOpen(false);
          setQuery('');
          inputRef.current?.blur();
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
      setIsOpen(false);
      setQuery('');
      inputRef.current?.blur();
      
      // Call the callback to notify parent (e.g., to close mobile menu)
      if (onResultSelect) {
        onResultSelect();
      }
    }
  };

  const handleSuggestionClick = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
    
    // Call the callback to notify parent (e.g., to close mobile menu)
    if (onResultSelect) {
      onResultSelect();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'page':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'faq':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'blog': return 'Blog';
      case 'page': return 'Page';
      case 'faq': return 'FAQ';
      default: return 'Content';
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        {/* Hidden instructions for screen readers */}
        <div id="search-instructions" className="sr-only">
          Use arrow keys to navigate suggestions, Enter to select, Escape to close
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 border-2 border-[#187CC1] rounded-lg bg-white text-gray-900 placeholder-[#005A9C] focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] transition-all duration-200 text-base shadow-md"
          aria-label="Search our website"
          aria-describedby="search-instructions"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          role="combobox"
          aria-activedescendant={selectedIndex >= 0 ? `search-option-${selectedIndex}` : undefined}
        />
        
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0C6BAF] border-t-transparent" aria-hidden="true"></div>
          ) : (
            <svg 
              className="h-5 w-5 text-[#187CC1]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#187CC1] hover:text-[#0C6BAF] transition-colors duration-200"
          aria-label="Search"
          type="button"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-[500px] overflow-y-auto min-w-[400px] max-w-[600px]"
            role="listbox"
            aria-label="Search suggestions"
          >
            <div className="py-3">
              {suggestions.map((result, index) => (
                <button
                  key={result.id}
                  id={`search-option-${index}`}
                  onClick={() => handleSuggestionClick(result)}
                  className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                    index === selectedIndex ? 'bg-[#0C6BAF]/10' : ''
                  }`}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 mt-1.5 ${
                      result.type === 'blog' ? 'text-blue-500' :
                      result.type === 'page' ? 'text-green-500' :
                      'text-orange-500'
                    }`} aria-hidden="true">
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-base font-semibold text-gray-900 truncate font-montserrat">
                          {result.title}
                        </h4>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          result.type === 'blog' ? 'bg-blue-100 text-blue-700' :
                          result.type === 'page' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed font-open-sans mb-2">
                        {result.excerpt}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="font-medium truncate max-w-[200px]">{result.url}</span>
                        {result.publishedAt && (
                          <span className="flex-shrink-0">
                            {new Date(result.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        )}
                        {result.category && (
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs flex-shrink-0">
                            {result.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              
              {/* View All Results Link */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="text-sm text-[#0C6BAF] hover:text-[#187CC1] font-semibold flex items-center justify-center space-x-2 py-2 px-4 rounded-lg hover:bg-white transition-all duration-200 font-montserrat"
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                    
                    // Call the callback to notify parent (e.g., to close mobile menu)
                    if (onResultSelect) {
                      onResultSelect();
                    }
                  }}
                  aria-label={`View all search results for ${query}`}
                >
                  <span>View all results for "{query}"</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 