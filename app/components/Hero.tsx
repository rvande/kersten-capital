'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ServiceFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  useEffect(() => {
    // Start animation sequence after component mounts
    setIsLoaded(true);
  }, []);

  const services: ServiceFeature[] = [
    {
      title: "Executive Search",
      description: "Finding the perfect leadership fit for your organization's needs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#FFFFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      delay: 0.3
    },
    {
      title: "Talent Strategy",
      description: "Building comprehensive plans to develop and retain top talent",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#FFFFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      delay: 0.6
    },
    {
      title: "Leadership Development",
      description: "Nurturing the next generation of visionary leaders",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#FFFFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      delay: 0.9
    }
  ];

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="relative flex flex-col">
      {/* Video Section - Fixed height on mobile, percentage height on desktop */}
      <div className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden">
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute w-full h-full object-cover"
          onLoadedData={handleVideoLoad}
        >
          <source src="/Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 via-transparent to-[#000000]/70"></div>
        
        {/* Headline Content - Top section on both mobile and desktop */}
        <div className="relative h-full flex flex-col items-center">
          <div className="container mx-auto px-4 pt-32 md:pt-40 text-center max-w-8xl z-10">
            <div
              className="opacity-0"
              style={{ 
                animation: isLoaded ? 'fadeIn 1s ease-out forwards' : 'none',
              }}
            >
              <h1 className="text-5xl md:text-8xl font-bold text-[#FFFFFF] text-shadow-lg leading-tight md:leading-normal"
                
              >
                <span className="text-[#CA3B2A] block mb-3 md:inline md:mb-0">Elevating</span>
                <span className="hidden md:inline"> </span>
                <span className="block md:inline font-inter">Talent.</span>
              </h1>
              <h1 
                className="font-cormorant text-5xl md:text-7xl font-bold text-[#FFFFFF] text-shadow-lg mt-2 md:mb-5 md:mt-0 leading-tight md:leading-normal"
                style={{ 
                  textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}
              >
                <span className="text-[#CA3B2A] block mb-3 md:inline md:mb-0">Empowering</span>
                <span className="hidden md:inline"> </span>
                <span className="block md:inline font-inter">Success.</span>
              </h1>
            </div>
          </div>
          
          {/* Desktop Services and CTA - Bottom section */}
          <div className="hidden md:block w-full mt-auto pb-16">
            <div className="container mx-auto px-6">
              {/* Services Grid - Desktop Only */}
              <div className="grid grid-cols-3 gap-6 lg:gap-10 max-w-6xl mx-auto mb-14">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-br from-[#CA3B2A]/90 via-[#B02F22]/95 to-[#81241e]/90 rounded-xl p-8 text-[#FFFFFF] transform opacity-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1 backdrop-blur-sm border border-white/10"
                    style={{ 
                      animation: isLoaded ? `slideInFromLeft 0.8s ease-out ${service.delay}s forwards` : 'none',
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-white/15 rounded-full p-4 mb-5 group-hover:bg-white/25 transition-all duration-300">
                        {service.icon}
                      </div>
                      <h2 className="font-cormorant text-2xl font-semibold mb-3">{service.title}</h2>
                      <p className="font-inter text-lg text-white/95">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA Button - Desktop Only */}
              <div className="text-center">
                <Link 
                  href="/contact" 
                  className="inline-block px-10 py-5 bg-[#FFFFFF] text-[#CA3B2A] font-cormorant text-xl font-semibold rounded-lg shadow-lg hover:bg-[#F5F5F5] hover:text-[#81241e] transition-all duration-300 transform opacity-0 hover:shadow-xl hover:-translate-y-1"
                  style={{ 
                    animation: isLoaded ? 'fadeIn 1s ease-out 1.2s forwards' : 'none',
                  }}
                >
                  Your Next Great Hire Starts Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Services and CTA Section - Full width, flows below video on mobile */}
      <div className="w-full bg-[#3D3939] md:hidden py-10 px-4">
        <div className="container mx-auto">
          {/* Mobile Services Grid */}
          <div className="grid grid-cols-1 gap-6 max-w-md mx-auto mb-10">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-[#CA3B2A]/90 via-[#B02F22]/95 to-[#81241e]/90 rounded-xl p-6 text-[#FFFFFF] transform opacity-0 shadow-xl group border border-white/10"
                style={{ 
                  animation: isLoaded ? `fadeInUp 0.8s ease-out ${service.delay}s forwards` : 'none',
                }}
              >
                <div className="flex items-center">
                  <div className="bg-white/15 rounded-full p-3 mr-4 group-hover:bg-white/25 transition-all duration-300 shrink-0">
                    {service.icon}
                  </div>
                  <div className="text-left">
                    <h2 className="font-cormorant text-xl font-semibold mb-1">{service.title}</h2>
                    <p className="font-inter text-sm text-white/95">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile CTA Button */}
          <div className="text-center">
            <Link 
              href="/contact" 
              className="inline-block w-full max-w-md px-6 py-4 bg-[#FFFFFF] text-[#CA3B2A] font-cormorant text-2xl font-semibold rounded-lg shadow-lg hover:bg-[#F5F5F5] hover:text-[#81241e] transition-all duration-300 transform opacity-0"
              style={{ 
                animation: isLoaded ? 'fadeIn 1s ease-out 1.2s forwards' : 'none',
              }}
            >
              Your Next Great Hire Starts <span className="font-bold text-2xl font-inter">Here</span>
            </Link>
          </div>
        </div>
      </div>
      
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
        
        @keyframes slideInFromLeft {
          from { 
            opacity: 0;
            transform: translateX(-30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        .text-shadow-lg {
          text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
} 