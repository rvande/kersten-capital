'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  quote: string;
  color: string; // Instead of avatar path, use a color for the placeholder
}

// Placeholder testimonials - replace with actual testimonials when available
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Chief Operating Officer",
    company: "FutureTech Solutions",
    quote: "Kersten Talent Capital transformed our executive search process. Within weeks, they identified and secured a CFO candidate who exceeded our expectations and has been instrumental in our company's growth trajectory.",
    color: "#8A2C24"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "CEO",
    company: "Innovate Partners",
    quote: "The fractional CTO that Kersten helped us find was exactly what our startup needed. Their expertise in our industry and ability to work within our budget constraints made all the difference during our critical scaling phase.",
    color: "#B9453A"
  },
  {
    id: 3,
    name: "Rebecca Martinez",
    title: "VP of HR",
    company: "Global Logistics Inc.",
    quote: "We had struggled for months to fill specialized technical roles until we partnered with Kersten. Their contingency search model delivered outstanding candidates and saved us countless hours of vetting time.",
    color: "#8A2C24"
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Founder",
    company: "NextGen Health",
    quote: "The strategic talent acquisition partnership with Kersten has been transformative for our organization. They truly understand our company culture and consistently deliver candidates who align with our vision and values.",
    color: "#B9453A"
  }
];

// Placeholder avatar component
const AvatarPlaceholder = ({ name, color }: { name: string, color: string }) => {
  // Get the initials from the name
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
    
  return (
    <div 
      className="w-full h-full flex items-center justify-center" 
      style={{ backgroundColor: color }}
    >
      <span className="text-white text-2xl font-semibold">{initials}</span>
    </div>
  );
};

export default function ImpactCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Handle swipe gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeLeft = distance > 50;
    const isSwipeRight = distance < -50;

    if (isSwipeLeft) {
      handleNext();
    }
    if (isSwipeRight) {
      handlePrev();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="relative w-full bg-[#F8F6F3] py-16 md:py-24 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8A2C24] via-[#B9453A] to-[#CA3B2A]"></div>
      
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <div className="text-center mb-12">
          <motion.h2 
            className="font-cormorant text-5xl md:text-5xl lg:text-6xl font-bold text-[#8A2C24] mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            Our Impact
          </motion.h2>
          <motion.div 
            className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-[#8A2C24] via-[#B9453A] to-[#8A2C24] mx-auto mb-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isLoaded ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98], delay: 0.3 }}
          />
          <motion.p 
            className="text-lg text-[#3D3939] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            What our clients say about their experience working with Kersten Talent Capital
          </motion.p>
        </div>

        <div 
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#3A3A40] to-[#1E1E24] rounded-lg p-6 md:p-8 shadow-md border-t-4 border-[#CA3B2A] max-w-4xl mx-auto"
            >
              <div className="md:flex items-start">
                <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0 flex justify-center">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#B9453A]/20">
                    <AvatarPlaceholder 
                      name={testimonials[currentIndex].name} 
                      color={testimonials[currentIndex].color}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative mb-4">
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
                      "{testimonials[currentIndex].quote}"
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-[#CA3B2A]">{testimonials[currentIndex].name}</p>
                    <p className="text-gray-400">{testimonials[currentIndex].title}, {testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={handlePrev}
              className="p-2 mb-1 rounded-full bg-[#F8F6F3] shadow-md hover:shadow-lg border border-[#E8E3DD] transition-all duration-300 text-[#8A2C24] hover:text-[#CA3B2A] focus:outline-none focus:ring-2 focus:ring-[#CA3B2A]"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-[#B9453A] w-6' 
                      : 'bg-[#B9453A]/20 hover:bg-[#B9453A]/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="p-2 mb-1 rounded-full bg-[#F8F6F3] shadow-md hover:shadow-lg border border-[#E8E3DD] transition-all duration-300 text-[#8A2C24] hover:text-[#CA3B2A] focus:outline-none focus:ring-2 focus:ring-[#CA3B2A]"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 