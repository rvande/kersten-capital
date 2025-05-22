'use client';

import React, { useState } from 'react';
import { FAQ } from '../types/faq';

interface FAQSearchProps {
  faqs: FAQ[];
  onSearch: (filteredFaqs: FAQ[]) => void;
}

export default function FAQSearch({ faqs, onSearch }: FAQSearchProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      // If search is empty, return all FAQs
      onSearch(faqs);
      return;
    }
    
    // Filter FAQs based on search query
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = faqs.filter(faq => 
      faq.Question.toLowerCase().includes(lowerCaseQuery) ||
      faq.Answer.toLowerCase().includes(lowerCaseQuery)
    );
    
    onSearch(filtered);
  };

  return (
    <div className="mb-10">
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg 
            className="w-5 h-5 text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500"
          placeholder="Search for questions or keywords..."
          value={query}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
} 