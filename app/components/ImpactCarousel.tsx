'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Testimonial {
  id: number;
  quote: string;
}

// Updated testimonials - only keeping quotes
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Kersten Talent Capital transformed our executive search process. Within weeks, they identified and secured a CFO candidate who exceeded our expectations and has been instrumental in our company's growth trajectory."
  },
  {
    id: 2,
    quote: "The fractional CTO that Kersten helped us find was exactly what our startup needed. Their expertise in our industry and ability to work within our budget constraints made all the difference during our critical scaling phase."
  },
  {
    id: 3,
    quote: "We had struggled for months to fill specialized technical roles until we partnered with Kersten. Their contingency search model delivered outstanding candidates and saved us countless hours of vetting time."
  },
  {
    id: 4,
    quote: "The strategic talent acquisition partnership with Kersten has been transformative for our organization. They truly understand our company culture and consistently deliver candidates who align with our vision and values."
  }
];

// Component for individual testimonial card with hover effects
function TestimonialCard({ testimonial, delay }: { testimonial: Testimonial; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="relative group cursor-default"
    >
      {/* Light blue background - positioned behind card */}
      <div className="absolute inset-0 bg-[#71C8F3] rounded-xl transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
      
      {/* Main card with dark blue background */}
      <motion.div 
        className="relative bg-[#002C5F] rounded-xl p-8 md:p-10 shadow-lg border border-[#0C6BAF] transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-center">
          {/* Quote Icon - now white */}
          <motion.div 
            className="mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            <svg className="w-12 h-12 text-white mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </motion.div>
          
          <blockquote className="font-open-sans text-lg md:text-xl text-white leading-relaxed">
            "{testimonial.quote}"
          </blockquote>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Mobile carousel component
function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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
    <div 
      className="relative overflow-hidden lg:hidden px-2 sm:px-4"
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
          className="relative group cursor-default"
        >
          {/* Light blue background - positioned behind card with smaller offset on mobile */}
          <div className="absolute inset-0 bg-[#71C8F3] rounded-xl transform translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2" />
          
          {/* Main card with dark blue background */}
          <div className="relative bg-[#002C5F] rounded-xl p-6 sm:p-8 md:p-10 shadow-lg border border-[#0C6BAF]">
            <div className="text-center">
              {/* Quote Icon - now white */}
              <div className="mb-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              <blockquote className="font-open-sans text-base sm:text-lg md:text-xl text-white leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </blockquote>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-8 sm:mt-12 px-2 py-2">
        <button 
          onClick={handlePrev}
          className="p-2 sm:p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-[#0C6BAF] hover:text-[#002C5F] focus:outline-none focus:ring-2 focus:ring-[#0C6BAF]"
          aria-label="Previous testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="presentation">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex space-x-2 sm:space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#0C6BAF] w-6 sm:w-8' 
                  : 'bg-gray-300 w-2 sm:w-3 hover:bg-[#0C6BAF]/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className="p-2 sm:p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-[#0C6BAF] hover:text-[#002C5F] focus:outline-none focus:ring-2 focus:ring-[#0C6BAF]"
          aria-label="Next testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="presentation">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ImpactCarousel() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full bg-white py-10 md:py-10 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            Our Impact
          </motion.h2>
          
          {/* Accent shape underline */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isLoaded ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98], delay: 0.3 }}
          >
            <svg 
              width="300" 
              height="12" 
              viewBox="0 0 627 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-64 h-6 md:w-72 md:h-6 lg:w-80 lg:h-7"
            >
              <path d="M5.1661 0H626.166L5.1661 16C-1.18851 9.74819 -2.23569 6.25249 5.1661 0Z" fill="#0C6BAF"/>
            </svg>
          </motion.div>
          
          <motion.p 
            className="font-open-sans text-lg md:text-xl lg:text-2xl text-black leading-relaxed max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ lineHeight: '1.7' }}
          >
            What our clients say about their experience working with Kersten Talent Capital
          </motion.p>
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel />

        {/* Desktop Grid - 3 Cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 