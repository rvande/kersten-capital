'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const rotatingTexts = [
    "Leadership Strategy",
    "Leadership Team", 
    "Executive Hiring"
  ];

  // Video setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      video.play().catch(e => {
        console.log('Autoplay prevented:', e);
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    video.preload = 'auto';
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Text rotation effect - REMOVED since we want static text
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTextIndex((prevIndex) => 
  //       (prevIndex + 1) % rotatingTexts.length
  //     );
  //   }, 3000); // Change text every 3 seconds

  //   return () => clearInterval(interval);
  // }, [rotatingTexts.length]);

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
      {/* Hero Poster Background - MOBILE ONLY */}
      <img
        src="/hero-poster.avif"
        alt="leadership team loading image"
        className="block md:hidden absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        style={{
          minHeight: '100vh',
          minWidth: '100%',
          objectFit: 'cover'
        }}
      />
      
      {/* Video Background - Shows when loaded */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ 
          minHeight: '100vh', 
          minWidth: '100%',
          objectFit: 'cover'
        }}
        aria-label="Background video showing leadership and business scenes"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      
      {/* Loading Spinner - Desktop only, white with blue circle */}
      {!videoLoaded && (
        <div className="hidden md:flex absolute inset-0 bg-white items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#0C6BAF] rounded-full animate-spin mb-4"></div>
            <p className="text-[#002C5F] text-lg font-semibold">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-20" aria-hidden="true" />

      {/* Critical Content - Always visible immediately */}
      <div className="relative z-30 flex flex-col h-screen w-full px-4 md:px-8 lg:px-16">
        <div className="flex flex-col justify-center h-full md:items-start items-center md:text-left text-center max-w-4xl">
          
          {/* TRANSFORM headline */}
          <h1
            id="hero-heading"
            className="text-[3.4rem] md:text-[5rem] lg:text-[7rem] font-black text-white mb-2 md:mb-4 tracking-tight"
            style={{ letterSpacing: '-0.04em', lineHeight: '1.1' }}
          >
            TRANSFORM{' '}
            <span className="text-[1.6rem] md:text-[4rem] lg:text-[5.5rem] font-black text-transparent bg-gradient-to-b from-[#0C6BAF] to-[#71C8F3] bg-clip-text transition-all duration-500 ease-in-out md:whitespace-nowrap">
              Your Leadership Strategy
            </span>
          </h1>
          
          {/* Description */}
          <p 
            id="hero-description" 
            className="max-w-3xl md:text-left text-center text-white text-lg md:text-xl font-semibold mb-8 md:mb-10"
          >
            Kersten Talent Capital strives to revolutionize organizational performance through strategic talent intelligence and executive placement solutions that catalyze growth, innovation, and sustainable competitive advantages for forward-thinking enterprises across global markets. Serving companies in Europe and North America.
          </p>
          
          {/* CTA Button */}
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
    </section>
  );
} 