'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
  },
  {
    id: 3,
    documentId: '3',
    Question: "What industries do you specialize in?",
    Answer: "<p>We specialize in technology, healthcare, finance, manufacturing, and professional services sectors, with particular expertise in C-suite and senior leadership placements.</p>",
    Category: "General",
    Order: 3,
    Schemaid: null,
    createdAt: '',
    updatedAt: '',
    publishedAt: ''
  },
  {
    id: 4,
    documentId: '4',
    Question: "How do you ensure candidate quality?",
    Answer: "<p>Our rigorous vetting process includes comprehensive background checks, skills assessments, cultural fit evaluations, and reference verification to ensure the highest quality candidates.</p>",
    Category: "General",
    Order: 4,
    Schemaid: null,
    createdAt: '',
    updatedAt: '',
    publishedAt: ''
  }
];

export default function FaqFooter({ faqs = [] }: FaqFooterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Use fallback data if no FAQs are provided
  const faqsToDisplay = faqs.length > 0 ? faqs : fallbackFaqs;
  
  useEffect(() => {
    setIsLoaded(true);
    console.log("FAQ footer received data:", faqs.length > 0 ? "Yes" : "No", "- Count:", faqs.length);
  }, [faqs]);
  
  // Take just a limited number of FAQs to display in the footer
  const displayFaqs = faqsToDisplay.slice(0, 4);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-2xl border-t border-gray-100 relative z-10"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header - Always visible */}
        <motion.div 
          className="flex items-center justify-center p-6 cursor-pointer group" 
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center">
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-7 w-7 mr-4 text-[#0C6BAF] group-hover:text-[#002C5F] transition-colors duration-300"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
            <h3 className="text-2xl md:text-3xl font-black text-[#002C5F] font-montserrat group-hover:text-[#0C6BAF] transition-colors duration-300">
              Frequently Asked Questions
            </h3>
          </div>
          
          {isExpanded && (
            <motion.button 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="absolute right-6 text-[#0C6BAF] hover:text-[#002C5F] p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
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
            </motion.button>
          )}
        </motion.div>
        
        {/* Content - Visible when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pb-10 px-4">
                {displayFaqs.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                      {displayFaqs.map((faq, index) => (
                        <motion.div 
                          key={faq.id} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="relative group cursor-default"
                        >
                          {/* Blue background - positioned behind card with proper spacing */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0C6BAF] to-[#005A9C] rounded-xl transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
                          
                          {/* Main card with enhanced styling */}
                          <div className="relative bg-white rounded-xl shadow-xl border-2 border-gray-100 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-2xl overflow-hidden backdrop-blur-sm">
                            <FAQAccordionItem
                              question={faq.Question}
                              answer={faq.Answer}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="mt-10 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <Link 
                        href="/faq" 
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat group"
                      >
                        View All FAQs
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  </>
                ) : (
                  <motion.div 
                    className="text-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="bg-gray-50 rounded-xl p-8">
                      <svg className="w-16 h-16 text-[#0C6BAF] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-black/70 text-lg font-open-sans">
                        No FAQs available. 
                        <Link href="/faq" className="text-[#0C6BAF] hover:text-[#002C5F] font-semibold underline ml-1">
                          Visit our FAQ page
                        </Link> 
                        for more information.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 