'use client';

import React, { useEffect, useState } from 'react';
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
  const [expandedService, setExpandedService] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
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
    <div className="relative w-full">
      {/* Hero Image - Full Screen */}
      <div className="relative h-[90vh] sm:h-[80vh] md:h-screen w-full">
        <Image
          src="/hero.jpg"
          alt="Professional Leadership"
          fill
          style={{ objectFit: 'cover' }}
          priority
          className="brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>

        {/* Single h1 element for both mobile and desktop */}
        <div className="absolute inset-0">
          <div className="container mx-auto h-full px-6 py-20">
            <div className="h-full flex flex-col">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mt-12 mb-8 md:mb-28 font-cormorant opacity-0 leading-tight text-center mx-auto md:max-w-none max-w-[300px]"
                style={{ 
                  animation: isLoaded ? 'fadeIn 1s ease-out forwards' : 'none',
                }}>
                <span className="md:inline hidden">Elevate Your </span>
                <span className="md:hidden inline">Elevate Your<br /></span>
                <span className="bg-gradient-to-r from-[#8A2C24] to-[#CA3B2A] bg-clip-text text-transparent relative shine-text">
                  Leadership
                </span>
                <span> Team</span>
              </h1>
              
              <div className="flex flex-col md:flex-row gap-4 mb-4 mt-28 justify-center items-stretch max-w-5xl mx-auto">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-black/40 backdrop-blur-sm rounded-lg p-6 transform opacity-0 border-l-4 border-[#CA3B2A] hover:bg-black/50 transition-all duration-500 cursor-pointer group flex-1"
                    style={{
                      animation: isLoaded ? `slideInFromBottom 0.8s ease-out ${service.delay}s forwards` : 'none',
                    }}
                    onClick={() => setExpandedService(expandedService === index ? null : index)}
                  >
                    <div className="flex flex-col h-full">
                      <h3 className="font-cormorant text-2xl font-bold mb-2 text-white">
                        {service.title}
                      </h3>
                      <p className="font-inter text-white/80 text-base flex-grow">
                        {service.shortDescription}
                      </p>
                      <div className="text-[#CA3B2A] group-hover:text-white transition-colors duration-300 mt-2 text-right">
                        <span className="text-lg">Learn more ›</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="absolute bottom-24 left-0 right-0 flex justify-center">
              <Link href="/contact">
                <div 
                  className="relative overflow-hidden bg-transparent text-white border border-white/50 hover:border-white px-10 py-5 rounded-md opacity-0 group hover:shadow-[0_0_15px_rgba(202,59,42,0.5)]"
                  style={{ animation: isLoaded ? 'fadeInUp 0.8s ease-out 1.8s forwards' : 'none' }}
                >
                  <span className="relative z-10 font-bold text-xl">Your Next Great Hire Starts Here</span>
                  <div className="absolute inset-0 w-[200%] h-full transform -translate-x-full bg-gradient-to-r from-[#8A2C24]/0 via-[#CA3B2A]/50 to-[#8A2C24]/0 animate-sheen group-hover:via-[#CA3B2A]/60"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Overlay Content - Remove h1 from here */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          <div className="container mx-auto h-full px-6 py-20 pointer-events-auto">
            <div className="h-full flex flex-col">
              {/* CTA Button */}
              <div className="absolute bottom-24 left-0 right-0 flex justify-center">
                <Link href="/contact">
                  <div 
                    className="relative overflow-hidden bg-transparent text-white border border-white/50 hover:border-white px-10 py-5 rounded-md opacity-0 group hover:shadow-[0_0_15px_rgba(202,59,42,0.5)]"
                    style={{ animation: isLoaded ? 'fadeInUp 0.8s ease-out 1.8s forwards' : 'none' }}
                  >
                    <span className="relative z-10 font-bold text-xl">Your Next Great Hire Starts Here</span>
                    <div className="absolute inset-0 w-[200%] h-full transform -translate-x-full bg-gradient-to-r from-[#8A2C24]/0 via-[#CA3B2A]/50 to-[#8A2C24]/0 animate-sheen group-hover:via-[#CA3B2A]/60"></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Overlay Content - Remove h1 from here */}
        <div className="md:hidden absolute inset-0 pointer-events-none">
          <div className="h-full flex flex-col px-4 pointer-events-auto">
            <div className="mt-auto">
              <div className="grid grid-cols-1 gap-2">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-black/40 backdrop-blur-sm rounded-lg p-3 transform opacity-0 border-l-4 border-[#CA3B2A] active:bg-black/50 transition-all duration-300"
                    style={{
                      animation: isLoaded ? `slideInFromBottom 0.8s ease-out ${service.delay}s forwards` : 'none',
                    }}
                    onClick={() => setExpandedService(expandedService === index ? null : index)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="font-cormorant text-xl font-bold text-white">
                          {service.title}
                        </h3>
                        <p className="font-inter text-white/80 text-sm line-clamp-1">
                          {service.shortDescription}
                        </p>
                      </div>
                      <div className="text-[#CA3B2A] ml-2">
                        <span className="text-lg">›</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile CTA Button */}
              <div className="mt-8 mb-8">
                <Link href="/contact">
                  <div 
                    className="relative overflow-hidden bg-gradient-to-r from-[#8A2C24] to-[#CA3B2A] text-white px-6 py-4 rounded-md opacity-0 w-full text-center hover:shadow-[0_0_15px_rgba(202,59,42,0.5)]"
                    style={{ animation: isLoaded ? 'fadeInUp 0.8s ease-out 1.8s forwards' : 'none' }}
                  >
                    <span className="relative z-10 font-bold text-lg">Your Next Great Hire Starts Here</span>
                    <div className="absolute inset-0 w-[200%] h-full transform -translate-x-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-sheen"></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {expandedService !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/90" onClick={() => setExpandedService(null)}>
          <div className="bg-[#1A1A1A] rounded-xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto text-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-cormorant text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#8A2C24] to-[#CA3B2A] bg-clip-text text-transparent">
                {services[expandedService].title}
              </h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedService(null);
                }}
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="font-inter text-white/90 mb-6 text-sm md:text-base">
              {services[expandedService].fullDescription}
            </p>
            
            <div className="mb-6">
              <h4 className="font-cormorant text-lg md:text-xl font-bold text-[#CA3B2A] mb-3">
                Key Features:
              </h4>
              <ul className="list-disc list-inside space-y-2">
                {services[expandedService].keyFeatures.map((feature, i) => (
                  <li key={i} className="font-inter text-white/80 text-sm md:text-base">{feature}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-cormorant text-lg md:text-xl font-bold text-[#CA3B2A] mb-3">
                Ideal For:
              </h4>
              <ul className="list-disc list-inside space-y-2">
                {services[expandedService].idealFor.map((item, i) => (
                  <li key={i} className="font-inter text-white/80 text-sm md:text-base">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInFromBottom {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glare {
          0% {
            transform: translateX(-100%) skewX(45deg);
          }
          100% {
            transform: translateX(200%) skewX(45deg);
          }
        }

        @keyframes sheen {
          0% {
            transform: translateX(-100%) skewX(30deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(200%) skewX(30deg);
            opacity: 0;
          }
        }
        
        @keyframes textShimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }

        :global(.animate-glare) {
          animation: glare 1.5s infinite ease-in-out;
        }

        :global(.animate-sheen) {
          animation: sheen 3.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        :global(.shine-text) {
          position: relative;
        }
        
        :global(.shine-text)::after {
          content: 'Leadership';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%,
            transparent 20%,
            rgba(255, 255, 255, 0.8) 45%,
            rgba(255, 255, 255, 0.8) 55%,
            transparent 80%,
            transparent 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: textShimmer 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 