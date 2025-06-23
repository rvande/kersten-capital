'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { extractHeadings, HeadingItem } from '@/app/utils/markdown-utils';

interface TableOfContentsProps {
  content: string;
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content, className = '' }) => {
  const [tocItems, setTocItems] = useState<HeadingItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Extract headings from content
  useEffect(() => {
    if (content) {
      const items = extractHeadings(content);
      setTocItems(items);
    }
  }, [content]);

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      // Don't update active section while programmatically scrolling
      if (isScrolling) return;

      const headings = tocItems.map(item => {
        const element = document.getElementById(item.id);
        return element ? { element, id: item.id, text: item.text } : null;
      }).filter(Boolean);
      
      const scrollPosition = window.scrollY + 150; // Reduced offset for better accuracy
      
      let currentSection = '';
      
      // Find the heading that's currently in view
      // We want the heading that's closest to the top of the viewport
      let closestHeading = null;
      let closestDistance = Infinity;
      
      for (const heading of headings) {
        const distance = Math.abs(heading.element.offsetTop - scrollPosition);
        if (heading.element.offsetTop <= scrollPosition + 50 && distance < closestDistance) {
          closestDistance = distance;
          closestHeading = heading;
        }
      }
      
      if (closestHeading) {
        currentSection = closestHeading.id;
      } else if (headings.length > 0) {
        // If no heading is close, find the last one that's above the scroll position
        for (let i = headings.length - 1; i >= 0; i--) {
          const heading = headings[i];
          if (heading.element.offsetTop <= scrollPosition) {
            currentSection = heading.id;
            break;
          }
        }
        
        // If still no section found, use the first one
        if (!currentSection) {
          currentSection = headings[0].id;
        }
      }

      setActiveSection(currentSection);

      // Show/hide TOC based on scroll position
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsVisible(heroBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems, isScrolling]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsScrolling(true);
      setActiveSection(id); // Immediately set the active section
      
      const offset = -630; // Minimal offset to position header near top of viewport
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Re-enable scroll detection after scrolling is complete
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Give enough time for smooth scroll to complete
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile TOC - Shows at top of article */}
      <div className="xl:hidden mb-8 bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h3 className="text-sm font-black text-[#002C5F] mb-4 font-montserrat uppercase tracking-wide">
          In This Article
        </h3>
        <nav className="space-y-2">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left text-sm transition-all duration-200 hover:text-[#0C6BAF] font-open-sans ${
                activeSection === item.id
                  ? 'text-[#0C6BAF] font-semibold border-l-2 border-[#0C6BAF] pl-3'
                  : 'text-gray-600 hover:pl-2'
              } ${
                item.level === 1 ? 'font-semibold' : 
                item.level === 2 ? 'ml-3' : 'ml-6 text-xs'
              }`}
              style={{
                paddingLeft: item.level === 1 ? '0' : `${(item.level - 1) * 12}px`
              }}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </div>

      {/* Desktop TOC - Fixed sidebar */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block ${className}`}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 max-w-xs">
              <h3 className="text-sm font-black text-[#002C5F] mb-4 font-montserrat uppercase tracking-wide">
                In This Article
              </h3>
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left text-sm transition-all duration-200 hover:text-[#0C6BAF] font-open-sans ${
                      activeSection === item.id
                        ? 'text-[#0C6BAF] font-semibold border-l-2 border-[#0C6BAF] pl-3'
                        : 'text-gray-600 hover:pl-2'
                    } ${
                      item.level === 1 ? 'font-semibold' : 
                      item.level === 2 ? 'ml-3' : 'ml-6 text-xs'
                    }`}
                    style={{
                      paddingLeft: item.level === 1 ? '0' : `${(item.level - 1) * 12}px`
                    }}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TableOfContents; 