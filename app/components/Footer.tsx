'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Footer as FooterType } from '../types/navigation';
import { getStrapiMedia } from '../utils/media';

interface FooterProps {
  footer: FooterType | null;
}

export default function Footer({ footer }: FooterProps) {
  const [expandedColumns, setExpandedColumns] = useState<number[]>([]);
  const [expandedSubMenus, setExpandedSubMenus] = useState<number[]>([]);
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
  
  const toggleSubMenu = (linkId: number) => {
    setExpandedSubMenus(prev => 
      prev.includes(linkId) 
        ? prev.filter(id => id !== linkId) 
        : [...prev, linkId]
    );
  };

  // Handle keyboard navigation for expandable sections
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };
  
  // If footer data is missing, show a simplified version
  if (!footer) {
    return (
      <footer 
        className="bg-[#002C5F] py-12 shadow-[0_-20px_60px_rgba(0,0,0,0.3)]"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="font-montserrat text-2xl font-black text-white">Kersten Talent Capital</h2>
            <p className="mt-4 text-white/80 font-open-sans">© {new Date().getFullYear()} Kersten Talent Capital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  
  // Get logo URL
  const logoUrl = footer.logo ? getStrapiMedia(footer.logo) : null;
  
  return (
    <footer 
      className="bg-[#002C5F] py-20 shadow-[0_-20px_60px_rgba(0,0,0,0.3)] relative"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Top shadow gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" aria-hidden="true" />
      
      <div className="container mx-auto px-6">
        {/* Logo - centered and larger */}
        <motion.header 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {logoUrl ? (
            <Link 
              href="/" 
              aria-label="Kersten Talent Capital Home" 
              className="inline-block group focus:outline-none focus:underline focus:decoration-[#71C8F3] focus:decoration-2 focus:underline-offset-4 rounded-lg"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image 
                  src={logoUrl}
                  alt="Kersten Talent Capital"
                  width={350}
                  height={85}
                  className="w-auto h-24 md:h-28 group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </Link>
          ) : (
            <Link 
              href="/" 
              className="inline-block font-montserrat text-4xl font-black text-white hover:text-[#71C8F3] transition-colors duration-300 focus:outline-none focus:underline focus:decoration-[#71C8F3] focus:decoration-2 focus:underline-offset-4 rounded-lg"
              aria-label="Kersten Talent Capital Home"
            >
              Kersten Talent Capital
            </Link>
          )}
          <p className="mt-6 text-white/80 text-xl max-w-3xl mx-auto font-open-sans leading-relaxed" role="heading" aria-level={3}>
            Strategic talent investment and career acceleration for exceptional leaders.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Footer columns */}
          {footer.columns?.map((column, index) => (
            <motion.section 
              key={column.id} 
              className="md:col-span-2 py-2 md:py-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              aria-labelledby={`footer-column-heading-${column.id}`}
            >
              {/* Column header - clickable on mobile */}
              {isMobile ? (
                <button
                  id={`footer-column-heading-${column.id}`}
                  className="w-full flex justify-between items-center text-left font-montserrat text-xl font-black text-white px-3 mb-1 md:px-0 md:py-0 md:mb-6 hover:bg-white/10 hover:text-[#71C8F3] rounded-md transition-all duration-300 cursor-pointer focus:outline-none focus:underline focus:decoration-[#71C8F3] focus:decoration-2 focus:underline-offset-4"
                  onClick={() => toggleColumn(column.id)}
                  onKeyDown={(e) => handleKeyDown(e, () => toggleColumn(column.id))}
                  aria-expanded={expandedColumns.includes(column.id)}
                  aria-controls={`footer-column-content-${column.id}`}
                >
                  <span>{column.title}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-6 w-6 transition-transform duration-300 text-white ${
                      expandedColumns.includes(column.id) ? 'transform rotate-180 text-[#71C8F3]' : ''
                    }`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              ) : (
                <h3
                  id={`footer-column-heading-${column.id}`}
                  className="w-full flex justify-between items-center text-left font-montserrat text-xl font-black text-white px-3 mb-1 md:px-0 md:py-0 md:mb-6"
                >
                  <span>{column.title}</span>
                </h3>
              )}
              
              {/* Column links */}
              <div 
                id={`footer-column-content-${column.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedColumns.includes(column.id) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 md:max-h-screen md:opacity-100'
                }`}
                aria-labelledby={`footer-column-heading-${column.id}`}
              >
                <nav 
                  className={`space-y-0 md:space-y-3 ${expandedColumns.includes(column.id) ? 'mt-2 pl-4 border-l-2 border-[#71C8F3] ml-3 md:mt-0 md:pl-0 md:border-l-0 md:ml-0' : ''}`}
                  aria-label={`${column.title} navigation links`}
                >
                  {column.links?.map((link) => (
                    <div key={link.id}>
                      {/* Check if this link has subMenuItems */}
                      {link.subMenuItems && link.subMenuItems.length > 0 ? (
                        // Parent item with expandable sub-menu
                        <div>
                          <div className="flex items-center justify-between py-3 px-3 md:px-0 md:py-2 text-white/80 hover:text-[#71C8F3] transition-all duration-300">
                            {/* Clickable link for the parent item */}
                            <Link
                              href={link.url || '#'}
                              target={link.newTab ? '_blank' : '_self'}
                              className="flex-1 font-open-sans text-lg hover:pl-5 md:hover:pl-2 hover:font-semibold transition-all duration-300 focus:outline-none focus:underline focus:decoration-[#71C8F3] focus:decoration-2 focus:underline-offset-4"
                              rel={link.newTab ? "noopener noreferrer" : undefined}
                              aria-describedby={link.subMenuItems.length > 0 ? `submenu-${link.id}` : undefined}
                            >
                              {link.text}
                            </Link>
                            {/* Expand button for submenu */}
                            <button
                              id={`submenu-button-${link.id}`}
                              className="p-2 hover:text-[#71C8F3] transition-all duration-300 ml-2 focus:outline-none focus:underline focus:decoration-[#71C8F3] focus:decoration-2 focus:underline-offset-4"
                              onClick={() => toggleSubMenu(link.id)}
                              onKeyDown={(e) => handleKeyDown(e, () => toggleSubMenu(link.id))}
                              aria-expanded={expandedSubMenus.includes(link.id)}
                              aria-controls={`submenu-${link.id}`}
                              aria-label={`Toggle ${link.text} submenu`}
                            >
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-6 w-6 transition-transform duration-200 ${
                                  expandedSubMenus.includes(link.id) ? 'transform rotate-90' : ''
                                }`}
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          {/* Expandable sub-menu */}
                          <div
                            id={`submenu-${link.id}`}
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              expandedSubMenus.includes(link.id) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                            }`}
                            aria-labelledby={`submenu-button-${link.id}`}
                          >
                            <div className="ml-4 md:ml-2 border-l-2 border-[#71C8F3]/30 pl-2 mt-2 space-y-1 space-x-2">
                              {link.subMenuItems.map((subItem) => (
                                <div key={subItem.id}>
                                  <Link
                                    href={subItem.url || '#'}
                                    target={subItem.newTab ? '_blank' : '_self'}
                                    className="block py-2 px-3 md:px-0 md:py-1 text-white/70 hover:text-[#71C8F3] transition-all duration-300 font-open-sans text-base hover:pl-5 md:hover:pl-2 hover:font-semibold focus:outline-none focus:underline focus:decoration-[#71C8F3] focus:decoration-2 focus:underline-offset-4"
                                    rel={subItem.newTab ? "noopener noreferrer" : undefined}
                                  >
                                    {subItem.text}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Regular link without submenu
                        <Link
                          href={link.url || '#'}
                          target={link.newTab ? '_blank' : '_self'}
                          className="block py-3 px-3 md:px-0 md:py-2 text-white/80 hover:text-[#71C8F3] transition-all duration-300 font-open-sans text-lg hover:pl-5 md:hover:pl-2 hover:font-semibold focus:outline-none focus:underline focus:decoration-[#71C8F3] focus:decoration-2 focus:underline-offset-4"
                          rel={link.newTab ? "noopener noreferrer" : undefined}
                        >
                          {link.text}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </motion.section>
          ))}
          
          {/* Contact information section */}
          <motion.div 
            className="md:col-span-4 md:ml-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-montserrat text-3xl font-black text-white mb-8">
              Get In Touch
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#71C8F3] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="presentation">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:michael@kerstentalentcapital.com" className="text-white/80 hover:text-[#71C8F3] transition-colors duration-300 font-open-sans text-lg">
                  michael@kerstentalentcapital.com
                </a>
              </li>
              <li className="flex items-start space-x-4 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#71C8F3] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="presentation">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+13034142057" className="text-white/80 hover:text-[#71C8F3] transition-colors duration-300 font-open-sans text-lg">
                  (303) 414-2057
                </a>
              </li>
              <li className="flex items-start space-x-4 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#71C8F3] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="presentation">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <address className="text-white/80 not-italic font-open-sans text-lg">
                  8310 South Valley Highway, Suite 300<br />
                  Englewood, CO 80112
                </address>
              </li>
              <li className="flex items-start space-x-4 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#71C8F3] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" role="presentation">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <a 
                  href="https://www.linkedin.com/company/kersten-talent-capital/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-[#71C8F3] transition-colors duration-300 font-open-sans text-lg"
                  aria-label="Visit our LinkedIn page (opens in new tab)"
                >
                  /kerstentalentcapital
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Bottom section */}
        <motion.div 
          className="mt-20 pt-10 border-t border-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center">
            <p className="text-white/80 mb-6 font-open-sans text-lg">
              © {new Date().getFullYear()} Kersten Talent Capital. All rights reserved.
            </p>
            <div className="flex justify-center space-x-8 mb-6">
              <a href="/our-approach" className="text-white/80 hover:text-[#71C8F3] transition-colors duration-300 font-open-sans text-lg hover:font-semibold">
                Our Approach
              </a>
              <a href="/privacy-policy" className="text-white/80 hover:text-[#71C8F3] transition-colors duration-300 font-open-sans text-lg hover:font-semibold">
                Privacy Policy
              </a>
              <a href="/terms-conditions" className="text-white/80 hover:text-[#71C8F3] transition-colors duration-300 font-open-sans text-lg hover:font-semibold">
                Terms of Service
              </a>
            </div>
            <div className="text-center">
              <a 
                href="https://www.vande-digital.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#71C8F3] transition-colors duration-300 font-open-sans text-sm hover:underline focus:outline-none focus:underline focus:decoration-[#71C8F3] focus:decoration-2 focus:underline-offset-4"
                aria-label="Website by Ryan Vandehey (opens in new tab)"
              >
                Website by Ryan Vandehey
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 