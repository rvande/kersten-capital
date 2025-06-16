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
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showFallbackImage, setShowFallbackImage] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const phrases = [
    'Your Leadership Team',
    'Your Leadership Strategy',
    'Your Executive Hiring',
  ];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile device
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      
      // On mobile, show fallback image immediately to improve LCP
      if (isMobileDevice) {
        setShowFallbackImage(true);
        // Allow content to show immediately on mobile
        setTimeout(() => {
          setVideoLoaded(true);
        }, 100);
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Memoized video event handlers
  const handleVideoLoad = useCallback(() => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
    // On mobile, wait a bit longer before switching from image to video
    if (isMobile) {
      setTimeout(() => {
        setShowFallbackImage(false);
      }, 1500); // Give user time to see the content before switching to video
    } else {
      setShowFallbackImage(false);
    }
    setVideoError(false);
  }, [isMobile]);

  const handleVideoError = useCallback((e: Event) => {
    console.error('Video loading error:', e);
    setVideoError(true);
    setShowFallbackImage(true);
    setVideoLoaded(true); // Show content even if video fails
  }, []);

  const handleVideoCanPlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(e => {
        console.log('Autoplay prevented, user interaction required:', e);
        if (!isMobile) {
          setShowFallbackImage(true);
        }
      });
    }
  }, [isMobile]);

  // Initialize component
  useEffect(() => {
    setIsLoaded(true);
    
    // Start headline rotation
    intervalRef.current = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % phrases.length);
    }, 3200);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [phrases.length]);

  // Video setup and loading - now includes mobile with delayed loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Add event listeners
    video.addEventListener('loadeddata', handleVideoLoad);
    video.addEventListener('error', handleVideoError);
    video.addEventListener('canplay', handleVideoCanPlay);

    // On mobile, delay video loading to prioritize image display
    const loadVideo = () => {
      video.preload = 'metadata';
      video.load();
    };

    if (isMobile) {
      // Delay video loading on mobile by 2 seconds to let image load first
      setTimeout(loadVideo, 2000);
    } else {
      // Load video immediately on desktop
      loadVideo();
    }

    // Cleanup
    return () => {
      video.removeEventListener('loadeddata', handleVideoLoad);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('canplay', handleVideoCanPlay);
    };
  }, [handleVideoLoad, handleVideoError, handleVideoCanPlay, isMobile]);

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
      {/* Critical Content - Render immediately without dependencies */}
      <div className="relative z-30 flex flex-col h-screen w-full mobile-spacing-normal md:px-8 lg:px-16">
        <div className="flex flex-col justify-start md:justify-center h-full md:items-start items-center md:text-left text-center max-w-4xl pt-24 md:pt-0">
          
          {/* TRANSFORM headline - Critical LCP element */}
          <div className="w-full md:flex md:justify-start flex justify-center mb-2 md:mb-4">
            <h1
              id="hero-heading"
              className="text-[3.4rem] md:text-[5rem] lg:text-[7rem] font-black text-white tracking-tight"
              style={{
                fontFamily: 'var(--font-montserrat), system-ui, -apple-system, sans-serif',
                letterSpacing: '-0.04em',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}
            >
              TRANSFORM
            </h1>
          </div>
          
          {/* Animated Headline */}
          <div className="w-full md:flex md:justify-start flex justify-center mb-6 md:mb-8">
            <h2 
              className="relative font-black text-[1.6rem] md:text-[4rem] lg:text-[5.5rem]"
              style={{
                fontFamily: 'var(--font-montserrat), system-ui, -apple-system, sans-serif',
                lineHeight: '1.1'
              }}
            >
              <span
                className="inline-block whitespace-nowrap bg-gradient-to-b from-[#0C6BAF] to-[#71C8F3] bg-clip-text text-transparent"
                style={{
                  transform: `translateX(${isLoaded ? '0' : '-40px'})`,
                  transition: 'transform 1.5s ease-in-out',
                  willChange: 'transform',
                }}
                key={headlineIndex}
                aria-live="polite"
                aria-atomic="true"
              >
                {phrases[headlineIndex]}
              </span>
            </h2>
          </div>
          
          {/* Description - Critical LCP element optimized */}
          <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
            <p 
              id="hero-description" 
              className="max-w-3xl md:text-left text-center text-white"
              style={{
                fontFamily: 'var(--font-open-sans), system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                lineHeight: '1.6',
                fontWeight: '600',
                margin: '0',
                textRendering: 'optimizeSpeed'
              }}
            >
              Kersten Talent Capital strives to revolutionize organizational performance through strategic talent intelligence and executive placement solutions that catalyze growth, innovation, and sustainable competitive advantages for forward-thinking enterprises across global markets. Serving companies in Europe and North America.
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="md:flex md:justify-start flex justify-center pb-8">
            <Link 
              href="/contact-us"
              className="relative bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] hover:from-[#187CC1] hover:to-[#71C8F3] text-white font-semibold px-8 py-4 rounded-md text-lg md:text-xl transition-all duration-300 inline-block"
              style={{
                fontFamily: 'var(--font-open-sans), system-ui, -apple-system, sans-serif',
                boxShadow: '0 4px 24px 0 rgba(12,107,175,0.20)',
                fontWeight: '600',
                letterSpacing: '0.01em',
                textDecoration: 'none'
              }}
              aria-label="Contact us to start your next great hire"
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
            viewBox="0 0 1280 140" 
            preserveAspectRatio="none"
            className="w-full h-full"
            aria-hidden="true"
            style={{ 
              transform: 'translateY(-1px)'
            }}
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
                d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v142h1280z" 
                fill="#ffffff"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Loading Animation - Only shows on desktop while video loads */}
      <div 
        className={`absolute left-0 right-0 bottom-0 z-50 transition-opacity duration-1000 ${
          (videoLoaded && !videoError) || isMobile ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] flex items-center justify-center`}
        style={{ top: '45px' }}
        role="status"
        aria-live="polite"
        aria-label="Loading page content"
      >
        <div className="text-center">
          {/* LoadingSpinner component design */}
          <div className="flex items-center justify-center mb-6" aria-hidden="true">
            <div className="w-16 h-16 relative">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-[#0C6BAF]/20"></div>
              {/* Spinning ring */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0C6BAF] animate-spin"></div>
              {/* Inner dot */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#0C6BAF] to-[#71C8F3] opacity-60"></div>
            </div>
          </div>
          
          {/* Loading text */}
          <h2 className="text-2xl font-black text-[#002C5F] mb-2" style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}>
            Loading...
          </h2>
          <p className="text-[#002C5F]/70" style={{ fontFamily: 'var(--font-open-sans), system-ui, sans-serif' }}>
            Preparing your experience
          </p>
        </div>
      </div>
      
      {/* Mobile Fallback Image - High priority for fast LCP */}
      {(isMobile || showFallbackImage) && (
        <div className="absolute inset-0 w-full h-full z-10">
          <Image
            src="/leadership.jpg"
            alt="Leadership team in professional setting"
            fill
            className="object-cover"
            priority={true}
            quality={85}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          {/* Dark overlay for better text readability - Stronger on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90" aria-hidden="true" />
        </div>
      )}
      
      {/* Video Background - Now loads on both desktop and mobile */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ${
          videoLoaded && !videoError && !showFallbackImage ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
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
      
      {/* Dark overlay for better text readability - For video */}
      {!showFallbackImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-20" aria-hidden="true" />
      )}
    </section>
  );
} 