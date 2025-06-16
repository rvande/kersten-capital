'use client';

import React from 'react';
import { Global } from '../types/global';
import Navbar from './Navbar';

interface HeaderProps {
  global: Global;
}

export default function Header({ global }: HeaderProps) {
  // Safety check for undefined data
  if (!global) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-[#F8F6F3] shadow-sm z-50">
        {/* Top Blue Bar */}
        <div className="w-full bg-[#002C5F] text-white text-sm font-open-sans flex justify-end items-center py-1 border-b-2 border-[#0C6BAF] gap-6">
          <a href="tel:+13035241199" className="flex items-center gap-1 hover:text-[#71C8F3] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm12-12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            (303) 524-1199
          </a>
          <a href="/portal" className="flex items-center gap-1 hover:text-[#71C8F3] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            Portal
          </a>
        </div>
      </header>
    );
  }
  
  return (
    <>
      {/* Top Blue Bar */}
      <div className="w-full bg-[#002C5F] text-white text-sm font-bold md:text-base font-montserrat flex flex-wrap justify-center items-center px-3 sm:px-4 md:px-4 py-1 sm:py-1 border-b-2 border-[#0C6BAF] gap-4 sm:gap-3 md:gap-6 fixed top-0 left-0 right-0 z-[60]">
        <a href="/contact-us" className="flex items-center gap-2 sm:gap-1 hover:text-[#71C8F3] transition-colors md:pr-6 lg:pr-10 whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Contact
        </a>
        <a href="tel:+13035241199" className="flex items-center gap-2 sm:gap-1 hover:text-[#71C8F3] transition-colors md:pr-6 lg:pr-10 whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          (303) 524-1199
        </a>
      </div>
      <header className="sticky-header" aria-label="Main site navigation">
        <Navbar navbar={global.navbar} />
      </header>
    </>
  );
} 