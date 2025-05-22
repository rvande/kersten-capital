'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Footer as FooterType } from '../types/navigation';
import { getStrapiMedia } from '../utils/media';

interface FooterProps {
  footer: FooterType | null;
}

export default function Footer({ footer }: FooterProps) {
  const [expandedColumns, setExpandedColumns] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const toggleColumn = (columnId: number) => {
    setExpandedColumns(prev => 
      prev.includes(columnId) 
        ? prev.filter(id => id !== columnId) 
        : [...prev, columnId]
    );
  };
  
  // If footer data is missing, show a simplified version
  if (!footer) {
    return (
      <footer className="bg-gradient-to-b from-gray-100 to-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="font-header text-xl font-bold text-[#CA3B2A]">Kersten Talent Capital</p>
            <p className="mt-4 text-gray-700">© {new Date().getFullYear()} Kersten Talent Capital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  
  // Get logo URL
  const logoUrl = footer.logo ? getStrapiMedia(footer.logo) : null;
  
  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 py-16">
      <div className="container mx-auto px-6">
        {/* Logo - centered and larger */}
        <div className="mb-12 text-center">
          {logoUrl ? (
            <Link href="/" aria-label="Kersten Talent Capital Home" className="inline-block">
              <Image 
                src={logoUrl}
                alt="Kersten Talent Capital"
                width={250}
                height={60}
                className="w-auto h-20"
              />
            </Link>
          ) : (
            <Link href="/" className="inline-block font-header text-3xl font-bold text-[#CA3B2A]">
              Kersten Talent Capital
            </Link>
          )}
          <p className="mt-4 text-gray-700 text-lg max-w-xl mx-auto">
            Strategic talent investment and career acceleration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          
          {/* Footer columns - styled to match mobile navbar */}
          {footer.columns?.map((column) => (
            <div key={column.id} className="md:col-span-2 py-2 md:py-0 ">
              {/* Column header - clickable on mobile */}
              <h4
                className="w-full flex justify-between items-center text-left font-header text-3xl font-bold text-gray-800 px-3 mb-1 md:px-0 md:py-0 md:mb-4 hover:bg-gray-100 hover:text-[#CA3B2A] rounded-md transition-colors md:hover:bg-transparent"
                onClick={() => toggleColumn(column.id)}
                aria-expanded={expandedColumns.includes(column.id)}
                aria-controls={`footer-column-${column.id}`}
              >
                <span>{column.title}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transition-transform duration-200 md:hidden ${
                    expandedColumns.includes(column.id) ? 'transform rotate-180 text-[#CA3B2A]' : ''
                  }`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </h4>
              
              {/* Column links - always visible on desktop, toggleable on mobile */}
              <div 
                id={`footer-column-${column.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedColumns.includes(column.id) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 md:max-h-screen md:opacity-100'
                }`}
              >
                <ul className={`space-y-0 md:space-y-2 ${expandedColumns.includes(column.id) ? 'mt-2 pl-4 border-l-2 border-[#CA3B2A] ml-3 md:mt-0 md:pl-0 md:border-l-0 md:ml-0' : ''}`}>
                  {column.links?.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.url || '#'}
                        target={link.newTab ? '_blank' : '_self'}
                        className="block py-3 px-3 md:px-0 md:py-2 text-gray-700 md:text-gray-700 hover:text-[#CA3B2A] transition-colors duration-200 font-body text-lg hover:pl-5 md:hover:pl-0"
                        rel={link.newTab ? "noopener noreferrer" : undefined}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {/* Contact information section */}
          <div className="md:col-span-4 md:ml-8">
            <h3 className="font-header text-4xl font-bold text-gray-800 mb-6">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#CA3B2A] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:michael@kerstentalentcapital.com" className="text-gray-700 hover:text-[#CA3B2A] transition-colors duration-200 font-body">
                  michael@kerstentalentcapital.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#CA3B2A] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+13035241199" className="text-gray-700 hover:text-[#CA3B2A] transition-colors duration-200 font-body">
                  +1 (303) 524-1199
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#CA3B2A] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <address className="text-gray-700 not-italic font-body">
                  8310 South Valley Highway, Suite 300<br />
                  Englewood, CO 80112
                </address>
              </li>
              <li className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#CA3B2A] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <a href="https://linkedin.com/in/kerstentalentcapital" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[#CA3B2A] transition-colors duration-200 font-body">
                  /kerstentalentcapital
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-300">
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              © {new Date().getFullYear()} Kersten Talent Capital. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-[#CA3B2A] transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-700 hover:text-[#CA3B2A] transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/tech-stack" className="text-gray-700 hover:text-[#CA3B2A] transition-colors duration-200">
                Tech Stack
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 