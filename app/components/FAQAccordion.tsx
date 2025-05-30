'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQ } from '../types/faq';

interface FAQAccordionProps {
  question: string;
  answer: string;
}

export function FAQAccordionItem({ question, answer }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <motion.button
        className="flex justify-between items-center w-full py-6 px-6 text-left font-semibold hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 transition-all duration-300 group relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Subtle accent line on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0C6BAF] to-[#71C8F3] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-r-full" />
        
        <span className={`pr-8 text-lg font-montserrat font-black transition-colors duration-300 ${
          isOpen ? 'text-[#0C6BAF]' : 'text-[#002C5F] group-hover:text-[#0C6BAF]'
        }`}>
          {question}
        </span>
        <motion.svg 
          className={`flex-shrink-0 w-6 h-6 transition-colors duration-300 ${
            isOpen ? 'text-[#0C6BAF]' : 'text-gray-500 group-hover:text-[#0C6BAF]'
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
      
      <motion.div 
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 bg-gray-50/30">
          <div className="prose max-w-none text-black/80 font-open-sans leading-relaxed text-base" 
               dangerouslySetInnerHTML={{ __html: answer }} />
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
    <motion.div 
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="text-4xl md:text-5xl font-black mb-8 text-[#002C5F] border-l-4 border-[#0C6BAF] pl-6 font-montserrat"
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {categoryName}
      </motion.h2>
      <div className="relative group">
        {/* Blue background - positioned behind card */}
        <div className="absolute inset-0 bg-[#0C6BAF] rounded-xl transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
        
        {/* Main card */}
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden divide-y divide-gray-100 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <FAQAccordionItem 
                question={faq.Question} 
                answer={faq.Answer} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 