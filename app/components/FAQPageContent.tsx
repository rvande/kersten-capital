'use client';

import React, { useState } from 'react';
import { FAQ } from '../types/faq';
import { FAQGroup } from './FAQAccordion';
import FAQSearch from './FAQSearch';
import Script from 'next/script';

interface FAQPageContentProps {
  faqs: FAQ[];
}

// Generate schema.org FAQPage JSON-LD markup
function generateFAQSchema(faqs: FAQ[]) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Frequently Asked Questions",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.Question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.Answer
      }
    }))
  };

  return JSON.stringify(schemaData);
}

export default function FAQPageContent({ faqs }: FAQPageContentProps) {
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>(faqs);
  
  // Group FAQs by category or Schemaid
  const groupedFaqs = groupFaqsByCategory(filteredFaqs);
  
  // Generate schema markup for currently displayed FAQs
  const schemaMarkup = generateFAQSchema(filteredFaqs);
  
  return (
    <div className="container mx-auto px-5 md:px-8 pb-0 pt-10 relative z-10 flex-1 flex flex-col">
      {/* JSON-LD Schema Markup */}
      <Script 
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaMarkup }}
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      <FAQSearch faqs={faqs} onSearch={setFilteredFaqs} />
      
      <div className="flex-1 flex flex-col">
        {Object.keys(groupedFaqs).length > 0 ? (
          <div className="mb-16 text-md flex-1">
            {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
              <FAQGroup key={category} categoryName={category} faqs={categoryFaqs} />
            ))}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center mb-16 shadow-md border border-white/10 flex-1">
            <p className="text-white mb-4">No matching FAQs found.</p>
            <button 
              className="text-red-400 hover:text-red-300 font-medium"
              onClick={() => setFilteredFaqs(faqs)}
            >
              Clear search and show all
            </button>
          </div>
        )}
        
        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#F8F6F3]/10 to-[#EFEAE3]/10 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-white/10 mb-10">
          <div className="px-6 py-12 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Still have questions?
              </h2>
              <p className="text-white/80 max-w-lg">
                Our team is ready to assist you with any questions about our talent acquisition services.
                Reach out to us for personalized guidance for your organization's unique needs.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a 
                href="/contact" 
                className="inline-block px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-medium rounded-md transition-colors text-center whitespace-nowrap"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
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