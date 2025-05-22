'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar as NavbarType } from '../types/navigation';
import { getStrapiMedia } from '../utils/media';

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
      <div className="bg-[#F8F6F3] py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="font-header font-semibold text-3xl text-[#CA3B2A]">
            Kersten Talent Capital
          </Link>
        </div>
      </div>
    );
  }
  
  // Get logo URL
  const logoUrl = navbar.logo ? getStrapiMedia(navbar.logo) : null;
  
  return (
    <header className={`bg-[#F8F6F3] fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-md py-2' : 'shadow-sm py-3'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Kersten Talent Capital Home">
            {logoUrl ? (
              <Image 
                src={logoUrl}
                alt="Kersten Talent Capital"
                width={240}
                height={60}
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-12' : 'h-16'}`}
                priority
              />
            ) : (
              <span className="font-header text-3xl font-bold text-[#CA3B2A]">Kersten Talent Capital</span>
            )}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12" aria-label="Main Navigation">
            {navbar.menu?.map((menuItem) => (
              <div key={menuItem.id} className="relative group">
                <button
                  className="font-header text-[#3D3939] hover:text-[#CA3B2A] text-2xl font-bold transition-all duration-200 flex items-center py-2 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#CA3B2A] after:transition-all after:duration-300 hover:after:w-full"
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
                    className={`h-5 w-5 ml-1 transition-transform duration-200 ${activeMenu === menuItem.id ? 'transform rotate-180' : ''}`}
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
                  className={`absolute left-0 mt-4 w-84 rounded-md shadow-xl bg-[#F8F6F3] ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                    activeMenu === menuItem.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                  onMouseEnter={() => setActiveMenu(menuItem.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="py-3 divide-y divide-[#E8E3DD]">
                    {menuItem.links?.map((link, index) => (
                      <Link
                        key={link.id}
                        href={link.url || '#'}
                        target={link.newTab ? '_blank' : '_self'}
                        className="font-body block px-7 py-4 text-xl text-[#3D3939] hover:bg-[#F0EDE8] hover:text-[#CA3B2A] transition-all duration-200 hover:pl-9"
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
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-[#3D3939] p-2 focus:outline-none focus:ring-2 focus:ring-[#CA3B2A] rounded-md mobile-menu-toggle hover:bg-[#F0EDE8] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          id="mobile-menu"
          className={`md:hidden mobile-menu-container transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-2 py-4 border-t border-[#E8E3DD]">
            {navbar.menu?.map((menuItem) => (
              <div key={menuItem.id} className="py-3 px-3">
                <button 
                  className="font-header w-full font-medium text-xl text-[#3D3939] px-3 py-3 mb-2 flex justify-between items-center hover:text-[#CA3B2A] focus:outline-none focus:ring-2 focus:ring-[#CA3B2A] rounded-md transition-colors hover:bg-[#F0EDE8]"
                  onClick={() => setActiveMenu(activeMenu === menuItem.id ? null : menuItem.id)}
                  aria-expanded={activeMenu === menuItem.id}
                  aria-controls={`mobile-dropdown-${menuItem.id}`}
                >
                  <span>{menuItem.title}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-6 w-6 transition-transform duration-200 ${activeMenu === menuItem.id ? 'transform rotate-180 text-[#CA3B2A]' : ''}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div 
                  id={`mobile-dropdown-${menuItem.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out rounded-b-lg ${
                    activeMenu === menuItem.id ? 'max-h-screen opacity-100 bg-gradient-to-b from-[#373634] to-[#2D2D2D]' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="mt-2 pl-4 border-l-2 border-[#CA3B2A] ml-3">
                    {menuItem.links?.map((link) => (
                      <Link
                        key={link.id}
                        href={link.url || '#'}
                        target={link.newTab ? '_blank' : '_self'}
                        className="font-body block py-4 px-3 text-xl text-white hover:text-[#CA3B2A] transition-all duration-200 hover:pl-5"
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
          </nav>
        </div>
      </div>
    </header>
  );
} 