'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceItem {
  title: string;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  idealFor: string[];
  delay: number;
}

export default function Hero2() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Memoized video event handlers
  const handleVideoLoad = useCallback(() => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
    setVideoError(false);
  }, []);

  const handleVideoError = useCallback((e: Event) => {
    console.error('Video loading error:', e);
    setVideoError(true);
    setVideoLoaded(true); // Show content even if video fails
  }, []);

  const handleVideoCanPlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(e => {
        console.log('Autoplay prevented, user interaction required:', e);
      });
    }
  }, []);

  // Video setup and loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Add event listeners
    video.addEventListener('loadeddata', handleVideoLoad);
    video.addEventListener('error', handleVideoError);
    video.addEventListener('canplay', handleVideoCanPlay);

    // Load video
    video.preload = 'auto';
    video.load();

    // Cleanup
    return () => {
      video.removeEventListener('loadeddata', handleVideoLoad);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('canplay', handleVideoCanPlay);
    };
  }, [handleVideoLoad, handleVideoError, handleVideoCanPlay]);

  const services: ServiceItem[] = [
    {
      title: "Retain Executive Search",
      shortDescription: "Premium, dedicated approach to identifying and securing top-tier leadership talent.",
      fullDescription: "Our Retain Executive Search service offers a premium, dedicated approach to identifying and securing top-tier leadership talent for your organization. Through this boutique partnership model, we become an extension of your team, gaining deep insight into your company culture, long-term strategic objectives, and specific leadership requirements.",
      keyFeatures: [
        "Dedicated Research Team",
        "Comprehensive Screening Process",
        "Strategic Consultation",
        "Exclusive Partnership",
        "Guaranteed Results"
      ],
      idealFor: [
        "C-Suite and VP-level positions",
        "Critical leadership roles with significant organizational impact",
        "Confidential searches requiring discretion",
        "Challenging searches in highly competitive talent markets"
      ],
      delay: 0.3
    },
    {
      title: "Contingency Search",
      shortDescription: "Results-driven approach to talent acquisition with performance-based pricing.",
      fullDescription: "Our Contingency Search service offers a results-driven approach to talent acquisition, where we assume the financial risk until the right candidate is successfully placed. This flexible model offers access to our extensive candidate network and deep recruitment expertise without upfront commitment.",
      keyFeatures: [
        "Performance-Based Model",
        "Rapid Deployment",
        "Multiple Search Options",
        "Streamlined Process",
        "Flexible Engagement"
      ],
      idealFor: [
        "Mid-level management positions",
        "Technical and specialized individual contributor roles",
        "High-volume hiring initiatives",
        "Organizations with established internal recruitment capabilities"
      ],
      delay: 0.6
    },
    {
      title: "Fractional Hiring",
      shortDescription: "Flexible executive talent solutions for specialized expertise needs.",
      fullDescription: "Our Fractional Hiring service provides innovative executive talent solutions for organizations seeking specialized expertise without the commitment of a full-time hire. This flexible approach allows you to access high-caliber professionals on a part-time, project-based, or interim basis.",
      keyFeatures: [
        "Flexible Engagement Models",
        "Executive-Level Expertise",
        "Project-Based Solutions",
        "Interim Leadership",
        "Scalable Commitment"
      ],
      idealFor: [
        "Startups and growth-stage companies",
        "Established organizations requiring specialized skills",
        "Companies navigating transitions",
        "Businesses seeking mentorship"
      ],
      delay: 0.9
    }
  ];

  return (
    <section 
      className="relative w-full overflow-hidden" 
      style={{ minHeight: '100vh' }}
      role="region"
      aria-labelledby="hero-heading"
      aria-describedby="hero-description"
    >
      {/* Critical Content - Static for fastest LCP */}
      <div className="relative z-30 flex flex-col h-screen w-full px-4 md:px-8 lg:px-16">
        <div className="flex flex-col justify-center h-full md:items-start items-center md:text-left text-center max-w-4xl">
          
          {/* TRANSFORM headline - Simplified for LCP */}
          <h1
            id="hero-heading"
            className="text-[3.4rem] md:text-[5rem] lg:text-[7rem] font-black text-white mb-2 md:mb-4 tracking-tight"
            style={{ letterSpacing: '-0.04em', lineHeight: '1.1' }}
          >
            TRANSFORM
          </h1>
          
          {/* Static Headline - No animations */}
          <h2 
            className="text-[1.6rem] md:text-[4rem] lg:text-[5.5rem] font-black text-transparent bg-gradient-to-b from-[#0C6BAF] to-[#71C8F3] bg-clip-text mb-6 md:mb-8"
            style={{ lineHeight: '1.1' }}
          >
            Your Leadership Team
          </h2>
          
          {/* Description - Ultra-simplified for mobile LCP */}
          <p 
            id="hero-description" 
            className="max-w-3xl md:text-left text-center text-white text-lg md:text-xl font-semibold mb-8 md:mb-10"
          >
            Kersten Talent Capital revolutionizes organizational performance through strategic talent intelligence and executive placement solutions.
          </p>
          
          {/* CTA Button - Simplified */}
          <div className="md:flex md:justify-start flex justify-center">
            <Link 
              href="/contact-us"
              className="bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] hover:from-[#187CC1] hover:to-[#71C8F3] text-white font-semibold px-8 py-4 rounded-md text-lg md:text-xl transition-all duration-300"
            >
              Your Next Great Hire Starts Here
            </Link>
          </div>
        </div>
        
        {/* Bottom decorative shape */}
        <div className="absolute left-0 right-0 w-full pointer-events-none select-none overflow-hidden" style={{ zIndex: 40, bottom: '-2px', height: '132px' }} aria-hidden="true">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="100%" 
            height="132px" 
            viewBox="0 0 1280 142" 
            preserveAspectRatio="none"
            className="w-full h-full"
            aria-hidden="true"
           
          >
            <defs>
              <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0C6BAF" stopOpacity="0.6"/>
                <stop offset="85%" stopColor="#0C6BAF" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="rgba(255,255,255,0.9)"/>
              </linearGradient>
              <linearGradient id="shapeGradientWhite" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff"/>
                <stop offset="85%" stopColor="#ffffff"/>
                <stop offset="100%" stopColor="rgba(255,255,255,0.95)"/>
              </linearGradient>
            </defs>
            <g>
              <path 
                d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v142h1280z" 
                fill="url(#shapeGradient)"
              />
              <path 
                d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v400h1280z" 
                fill="url(#shapeGradientWhite)"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Loading Animation - Shows when video isn't ready */}
      <div 
        className={`absolute inset-0 z-20 transition-opacity duration-1000 ${
          (videoLoaded && !videoError) ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        role="status"
        aria-live="polite"
        aria-label="Loading page content"
      >
        {/* Hero poster background - mobile only */}
        <div 
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: 'url(/hero-poster.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#002C5F]/80 to-[#0C6BAF]/80"></div>
        
        {!videoLoaded && (
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              {/* LoadingSpinner component design */}
              <div className="flex items-center justify-center mb-6" aria-hidden="true">
                <div className="w-16 h-16 relative">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                  {/* Spinning ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
                  {/* Inner dot */}
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white to-[#71C8F3] opacity-60"></div>
                </div>
              </div>
              
              {/* Loading text */}
              <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}>
                Loading...
              </h2>
              <p className="text-white/80" style={{ fontFamily: 'var(--font-open-sans), system-ui, sans-serif' }}>
                Preparing your experience
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Video Background - Primary content */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ${
          (videoLoaded && !videoError) ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.avif"
        style={{ 
          minHeight: '100vh', 
          minWidth: '100%',
          objectFit: 'cover'
        }}
        aria-label="Background video showing leadership and business scenes"
      >
        <source src="/hero.mp4" type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-20" aria-hidden="true" />
    </section>
  );
} 