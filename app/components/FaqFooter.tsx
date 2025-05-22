'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FAQAccordionItem } from './FAQAccordion';
import { FAQ } from '../types/faq';

interface FaqFooterProps {
  faqs: FAQ[];
}

// Hardcoded fallback FAQs in case the API doesn't return any data
const fallbackFaqs = [
  {
    id: 1,
    documentId: '1',
    Question: "What services does Kersten Talent Capital provide?",
    Answer: "<p>We provide executive search, talent acquisition consulting, and leadership development services for businesses across various industries.</p>",
    Category: "General",
    Order: 1,
    Schemaid: null,
    createdAt: '',
    updatedAt: '',
    publishedAt: ''
  },
  {
    id: 2,
    documentId: '2',
    Question: "How long does the typical executive search process take?",
    Answer: "<p>The typical executive search process takes 8-12 weeks, depending on the position's seniority and specialization requirements.</p>",
    Category: "General",
    Order: 2,
    Schemaid: null,
    createdAt: '',
    updatedAt: '',
    publishedAt: ''
  }
];

export default function FaqFooter({ faqs = [] }: FaqFooterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Use fallback data if no FAQs are provided
  const faqsToDisplay = faqs.length > 0 ? faqs : fallbackFaqs;
  
  // Log the data for debugging
  useEffect(() => {
    console.log("FAQ footer received data:", faqs.length > 0 ? "Yes" : "No", "- Count:", faqs.length);
  }, [faqs]);
  
  // Take just a limited number of FAQs to display in the footer
  const displayFaqs = faqsToDisplay.slice(0, 4);
  
  return (
    <div className="bg-gradient-to-r from-[#B02F22] via-[#CA3B2A] to-[#B02F22] text-white shadow-lg">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header - Always visible */}
        <div 
          className="flex items-center justify-center p-5 cursor-pointer" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 mr-3 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
          </div>
          
          {isExpanded && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="text-white hover:text-gray-200 absolute right-6"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Content - Visible when expanded */}
        <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pb-8">
            {displayFaqs.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                  {displayFaqs.map((faq) => (
                    <div key={faq.id} className="bg-gradient-to-br from-[#3A3A40]/80 to-[#1E1E24]/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-white/10">
                      <FAQAccordionItem
                        question={faq.Question}
                        answer={faq.Answer}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Link 
                    href="/faq" 
                    className="inline-block px-6 py-3 bg-[#3A3A40] hover:bg-[#1E1E24] text-white font-medium rounded-md hover:shadow-lg transition-all"
                  >
                    View All FAQs
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <p>No FAQs available. <Link href="/faq" className="underline">Visit our FAQ page</Link> for more information.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 