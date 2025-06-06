'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar as NavbarType } from '../types/navigation';
import { getStrapiMedia } from '../utils/media';
import SearchBar from './SearchBar';

interface NavbarProps {
  navbar: NavbarType | null;
}

export default function Navbar({ navbar }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [scrolled, setScrolled] = useState(false);
  
  // Handle ref for dropdown menus
  const setDropdownRef = (el: HTMLDivElement | null, id: number) => {
    if (el) {
      dropdownRefs.current.set(id, el);
    }
  };
  
  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !event.target) return;
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-toggle')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Reset active menu when mobile menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setActiveMenu(null);
    }
  }, [mobileMenuOpen]);

  // Add keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent, menuId: number) => {
    if (e.key === 'Escape') {
      setActiveMenu(null);
    } else if (e.key === 'Enter' || e.key === ' ') {
      setActiveMenu(activeMenu === menuId ? null : menuId);
    }
  };
  
  // If navbar data is missing, show a simplified version
  if (!navbar) {
    return (
      <div className="bg-white py-4 fixed top-8 left-0 right-0 z-50 shadow-md">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="font-montserrat font-black text-2xl md:text-3xl lg:text-4xl text-[#002C5F]">
            Kersten Talent Capital
          </Link>
          <div className="hidden lg:block w-80">
            <SearchBar placeholder="Search..." />
          </div>
        </div>
      </div>
    );
  }
  
  // Get logo URL
  const logoUrl = navbar.logo ? getStrapiMedia(navbar.logo) : null;
  
  return (
    <header className={`bg-white fixed top-7 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-lg py-3' : 'shadow-md py-2'
    }`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Kersten Talent Capital Home">
            {logoUrl ? (
              <Image 
                src={logoUrl}
                alt="Kersten Talent Capital"
                width={320}
                height={80}
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20 lg:h-24'}`}
                priority
              />
            ) : (
              <span className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-black text-[#002C5F]">
                Kersten Talent Capital
              </span>
            )}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex items-center space-x-8 xl:space-x-10" aria-label="Main Navigation">
               {/* Our Approach Link */}
               <Link 
                href="/our-approach" 
                className="font-montserrat text-[#002C5F] hover:text-[#0C6BAF] text-lg font-semibold transition-all duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#0C6BAF] after:transition-all after:duration-300 hover:after:w-full flex items-center"
              >
                <svg 
                  className="w-5 h-5 mr-2 text-current" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
                Our Approach
              </Link>
              {navbar.menu?.map((menuItem) => (
                <div key={menuItem.id} className="relative group">
                  <button
                    className="font-montserrat text-[#002C5F] hover:text-[#0C6BAF] text-lg font-semibold transition-all duration-200 flex items-center py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#0C6BAF] after:transition-all after:duration-300 hover:after:w-full"
                    onMouseEnter={() => setActiveMenu(menuItem.id)}
                    onMouseLeave={() => setActiveMenu(null)}
                    onClick={() => setActiveMenu(activeMenu === menuItem.id ? null : menuItem.id)}
                    onKeyDown={(e) => handleKeyDown(e, menuItem.id)}
                    aria-expanded={activeMenu === menuItem.id}
                    aria-haspopup="true"
                    aria-controls={`dropdown-menu-${menuItem.id}`}
                  >
                    {menuItem.title}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 ml-1 transition-transform duration-200 ${activeMenu === menuItem.id ? 'transform rotate-180' : ''}`}
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Dropdown for desktop */}
                  <div 
                    id={`dropdown-menu-${menuItem.id}`}
                    ref={(el) => setDropdownRef(el, menuItem.id)}
                    className={`absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 ${
                      activeMenu === menuItem.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={() => setActiveMenu(menuItem.id)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <div className="py-2">
                      {menuItem.links?.map((link, index) => (
                        <Link
                          key={link.id}
                          href={link.url || '#'}
                          target={link.newTab ? '_blank' : '_self'}
                          className="font-open-sans block px-4 py-3 text-base text-[#002C5F] hover:bg-[#F8F9FA] hover:text-[#0C6BAF] transition-all duration-200 hover:pl-6"
                          onClick={() => setActiveMenu(null)}
                          tabIndex={activeMenu === menuItem.id ? 0 : -1}
                          rel={link.newTab ? "noopener noreferrer" : undefined}
                        >
                          {link.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>
            
            {/* Desktop Search Bar */}
            <div className="w-80">
              <SearchBar placeholder="Search..." />
            </div>
            
         
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-[#002C5F] p-2 focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] rounded-md mobile-menu-toggle hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          id="mobile-menu"
          className={`lg:hidden mobile-menu-container transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-1 py-4 border-t border-gray-200 mt-4">
            {/* Mobile Search Bar */}
            <div className="px-2 py-4">
              <SearchBar placeholder="Search..." />
            </div>
            
            {navbar.menu?.map((menuItem) => (
              <div key={menuItem.id} className="py-2">
                <button 
                  className="font-montserrat w-full font-semibold text-lg text-[#002C5F] px-2 py-3 mb-2 flex justify-between items-center hover:text-[#0C6BAF] focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] rounded-md transition-colors hover:bg-gray-50"
                  onClick={() => setActiveMenu(activeMenu === menuItem.id ? null : menuItem.id)}
                  aria-expanded={activeMenu === menuItem.id}
                  aria-controls={`mobile-dropdown-${menuItem.id}`}
                >
                  <span>{menuItem.title}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform duration-200 ${activeMenu === menuItem.id ? 'transform rotate-180 text-[#0C6BAF]' : ''}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div 
                  id={`mobile-dropdown-${menuItem.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeMenu === menuItem.id ? 'max-h-screen opacity-100 bg-gray-50' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 border-l-3 border-[#0C6BAF] pl-4">
                    {menuItem.links?.map((link) => (
                      <Link
                        key={link.id}
                        href={link.url || '#'}
                        target={link.newTab ? '_blank' : '_self'}
                        className="font-open-sans block py-3 px-3 text-base text-[#002C5F] hover:text-[#0C6BAF] transition-all duration-200 hover:pl-5"
                        onClick={() => {
                          setActiveMenu(null);
                          setMobileMenuOpen(false);
                        }}
                        rel={link.newTab ? "noopener noreferrer" : undefined}
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Our Approach Link - Mobile */}
            <div className="py-2">
              <Link 
                href="/our-approach" 
                className="font-montserrat w-full font-semibold text-lg text-[#002C5F] px-4 py-3 flex items-center hover:text-[#0C6BAF] focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] rounded-md transition-colors hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg 
                  className="w-5 h-5 mr-3 text-current" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
                Our Approach
              </Link>
            </div>
            
            {/* Mobile Contact CTA */}
            <div className="mt-6 px-4 pb-4">
              <Link 
                href="/contact" 
                className="bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] hover:from-[#187CC1] hover:to-[#71C8F3] text-white text-lg font-semibold font-open-sans py-3 px-6 rounded-md shadow-md transition-all duration-200 flex items-center justify-center w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Contact Us</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 