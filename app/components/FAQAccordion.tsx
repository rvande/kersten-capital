'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQ } from '../types/faq';
import { formatTextWithBullets } from '../utils/textFormatting';

interface FAQAccordionProps {
  question: string;
  answer: string;
  faqId?: number;
}

export function FAQAccordionItem({ question, answer, faqId }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Format the answer to convert simple text patterns to HTML bullets
  const formattedAnswer = formatTextWithBullets(answer);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const accordionId = faqId ? `faq-${faqId}` : `faq-${Math.random().toString(36).substr(2, 9)}`;
  const contentId = `${accordionId}-content`;
  const buttonId = `${accordionId}-button`;

  return (
    <div 
      id={accordionId}
      className="border-b border-gray-200 last:border-b-0 scroll-mt-32"
    >
      <h3>
        <button
          id={buttonId}
          className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:ring-inset transition-colors duration-200 hover:bg-gray-50/50"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-controls={contentId}
          aria-describedby={contentId}
        >
          <div className="flex justify-between items-start">
            <span className="text-lg md:text-xl font-semibold text-[#002C5F] pr-8 font-montserrat leading-tight">
              {question}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-shrink-0 ml-4"
              aria-hidden="true"
            >
              <svg 
                className="w-6 h-6 text-[#0C6BAF]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </button>
      </h3>
      
      <motion.div 
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <div className="px-6 pb-6 bg-gray-50/30">
          <div 
            className="prose max-w-none text-black/80 font-open-sans leading-relaxed text-base" 
            dangerouslySetInnerHTML={{ __html: formattedAnswer }}
            role="region"
            aria-live="polite"
          />
        </div>
      </motion.div>
    </div>
  );
}

interface FAQGroupProps {
  categoryName: string;
  faqs: FAQ[];
}

export function FAQGroup({ categoryName, faqs }: FAQGroupProps) {
  return (
    <section 
      className="mb-16"
      aria-labelledby={`faq-category-${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          id={`faq-category-${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-4xl md:text-5xl font-black mb-8 text-[#002C5F] border-l-4 border-[#0C6BAF] pl-6 font-montserrat"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categoryName}
        </motion.h2>
        <div 
          className="space-y-4"
          role="list"
          aria-label={`Frequently asked questions about ${categoryName}`}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group"
              role="listitem"
            >
              {/* Blue background - positioned behind individual card */}
              <div 
                className="absolute inset-0 bg-[#0C6BAF] rounded-xl transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" 
                aria-hidden="true"
              />
              
              {/* Individual FAQ card */}
              <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                <FAQAccordionItem 
                  question={faq.Question} 
                  answer={faq.Answer}
                  faqId={faq.id}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 