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
  const [isLoaded, setIsLoaded] = useState(false);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const phrases = [
    'Your Leadership Team',
    'Your Leadership Strategy',
    'Your Executive Hiring',
  ];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    intervalRef.current = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % phrases.length);
    }, 3200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
    <div className="relative w-full overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/leadership.jpg"
        style={{ minHeight: '100%', minWidth: '100%' }}
      />
      {/* Overlay for darkening video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col h-[100vh] sm:h-[80vh] md:h-screen w-full mobile-spacing-normal md:px-8 lg:px-16">
        <div className="flex flex-col justify-center h-full md:items-start items-center md:text-left text-center max-w-4xl">
          {/* TRANSFORM headline */}
          <div className="w-full md:flex md:justify-start flex justify-center mb-2 md:mb-4">
            <span
              className="text-[3.5rem] md:text-[5rem] lg:text-[7rem] font-black font-montserrat text-white drop-shadow-lg tracking-tight text-heading"
              style={{
                letterSpacing: '-0.04em',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              TRANSFORM
            </span>
          </div>
          {/* Animated Headline */}
          <div className="w-full md:flex md:justify-start flex justify-center mb-6 md:mb-8">
            <h1
              className="relative font-montserrat text-[1.6rem] md:text-[4rem] lg:text-[5.5rem] font-black text-heading"
            >
              <span
                className="inline-block whitespace-nowrap transition-transform duration-1500 ease-in-out bg-gradient-to-b from-[#0C6BAF] to-[#71C8F3] bg-clip-text text-transparent"
                style={{
                  transform: `translateX(${isLoaded ? '0' : '-40px'})`,
                  animation: isLoaded ? 'slideRight 2.2s cubic-bezier(0.4,0,0.2,1)' : 'none',
                  willChange: 'transform',
                }}
                key={headlineIndex}
              >
                {phrases[headlineIndex]}
              </span>
            </h1>
          </div>
          {/* Subheadline/Description */}
          <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
            <p className="max-w-3xl md:text-left text-center text-white font-open-sans font-normal text-base md:text-lg lg:text-xl text-body">
              Kersten Talent Capital strives to revolutionize organizational performance through strategic talent intelligence and executive placement solutions that catalyze growth, innovation, and sustainable competitive advantages for forward-thinking enterprises across global markets.
            </p>
          </div>
          {/* CTA Button */}
          <div className="md:flex md:justify-start flex justify-center">
            <Link href="/contact">
              <div
                className="relative bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] hover:from-[#187CC1] hover:to-[#71C8F3] text-white font-semibold font-open-sans px-8 py-4 rounded-md text-md md:text-xl sm:text-lg interactive-button touch-target"
                style={{
                  boxShadow: '0 4px 24px 0 rgba(12,107,175,0.20)',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                }}
              >
                Your Next Great Hire Starts Here
              </div>
            </Link>
          </div>
        </div>
        {/* Bottom blue/white shape */}
        <div className="absolute left-0 right-0 bottom-0 w-full pointer-events-none select-none" style={{ zIndex: 30 }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="100%" 
            height="130px" 
            viewBox="0 0 1280 140" 
            preserveAspectRatio="none"
            className="w-full h-[50px] md:h-[130px]"
          >
            <g fill="#0C6BAF">
              {/* First layer with transparency */}
              <path 
                d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z" 
                fillOpacity="0.6"
              />
              {/* Second layer solid */}
              <path 
                d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z" 
                fill="#ffffff"
              />
            </g>
          </svg>
        </div>
      </div>
      {/* Animations */}
      <style jsx>{`
        @keyframes slideRight {
          0% { opacity: 0; transform: translateX(-60px); }
          40% { opacity: 1; transform: translateX(0); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
} 