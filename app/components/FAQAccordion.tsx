'use client';

import React, { useState } from 'react';
import { FAQ } from '../types/faq';

interface FAQAccordionProps {
  question: string;
  answer: string;
}

export function FAQAccordionItem({ question, answer }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 last:border-b-0">
      <button
        className={`flex justify-between items-center w-full py-5 px-4 text-left font-semibold hover:bg-white/5 transition-colors ${isOpen ? 'text-red-400' : 'text-white'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="pr-8">{question}</span>
        <svg 
          className={`flex-shrink-0 w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-red-400' : 'text-gray-400'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen pb-6 px-4' : 'max-h-0'}`}
      >
        <div className="prose prose-invert prose-red max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  );
}

interface FAQGroupProps {
  categoryName: string;
  faqs: FAQ[];
}

export function FAQGroup({ categoryName, faqs }: FAQGroupProps) {
  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold mb-6 text-white border-l-4 border-red-600 pl-3">{categoryName}</h2>
      <div className="bg-gradient-to-br from-[#3A3A40]/80 to-[#1E1E24]/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden divide-y divide-gray-700 border border-white/10">
        {faqs.map((faq) => (
          <FAQAccordionItem 
            key={faq.id} 
            question={faq.Question} 
            answer={faq.Answer} 
          />
        ))}
      </div>
    </div>
  );
} 