'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const valuePoints = [
  {
    title: "Strategic Partnership",
    description: "For organizational leaders who understand that company growth and valuation hinge on securing top talent, we deliver results when others cannot.",
    icon: "📈"
  },
  {
    title: "Accelerated Process",
    description: "We accelerate your team-building process through our proven recruiting techniques, industry expertise, and cutting-edge data intelligence tools.",
    icon: "⚡"
  },
  {
    title: "Domain Expertise",
    description: "Unlike traditional consultants, we possess deep domain knowledge across back-office operations, sales, marketing, and enterprise systems.",
    icon: "🎯"
  },
  {
    title: "Bottom-Line Impact",
    description: "Kersten Talent Capital provides high-growth companies with a strategic talent acquisition advantage that directly impacts their bottom line.",
    icon: "💹"
  }
];

const valuePropositionContent = {
  headline: "For organizational leaders who understand that company growth and valuation hinge on securing top talent, we deliver results when others cannot.",
  mainText: "We accelerate your team-building process through our proven recruiting techniques, industry expertise, and cutting-edge data intelligence tools. Unlike traditional consultants, we possess deep domain knowledge across back-office operations, sales, marketing, and enterprise systems, eliminating the lengthy hiring timelines you've experienced before.",
  conclusion: "Kersten Talent Capital provides high-growth companies with a strategic talent acquisition advantage that directly impacts their bottom line. Partner with us to transform your hiring capabilities and unlock your organization's full potential."
};

const expertiseCards = [
  {
    title: "Proven Recruiting Techniques",
    description: "Methodologies refined through decades of successful placements across industries.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  },
  {
    title: "Industry Expertise",
    description: "Deep understanding of specific market segments and their unique talent requirements.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.6,3h6.8c0.7,0,1.2,0.8,0.9,1.4L18,9h-4l-2.3-4.6C11.4,3.8,11.9,3,12.6,3z"/>
        <path d="M14,9h4l2.8,14c0.1,0.7-0.1,1.3-0.5,1.8l-3.5,3.5c-0.4,0.4-1,0.4-1.4,0l-3.5-3.5c-0.5-0.5-0.7-1.2-0.5-1.8L14,9z"/>
        <line x1="16" y1="17" x2="19.6" y2="17"/>
      </svg>
    )
  },
  {
    title: "Data Intelligence",
    description: "Leveraging cutting-edge tools and analytics to identify optimal candidates.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    )
  },
  {
    title: "Domain Knowledge",
    description: "Specialized focus on back-office operations, sales, marketing, and enterprise systems.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    )
  },
  {
    title: "Accelerated Timeline",
    description: "Significantly reduced hiring cycles without compromising on quality.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  },
  {
    title: "Strategic Partnership",
    description: "Consultative approach focused on long-term organizational success.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16l-4-4 4-4" />
        <path d="M8 8l4 4-4 4" />
        <path d="M21 12h-5" />
        <path d="M8 12H3" />
      </svg>
    )
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.04, 0.62, 0.23, 0.98] 
    }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay: 0.8,
      duration: 0.8, 
      ease: [0.04, 0.62, 0.23, 0.98] 
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: 0.2 + (i * 0.1),
      duration: 0.5, 
      ease: [0.04, 0.62, 0.23, 0.98] 
    }
  })
};

// Counter component for animating numbers
interface CountUpProps {
  end: number;
  duration?: number;
}

function CountUp({ end, duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !inViewRef.current) {
          inViewRef.current = true;
          startCount();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  const startCount = () => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  };

  return <span ref={countRef}>{count}+</span>;
}

export default function ValueProposition() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="relative w-full bg-[#F8F6F3] py-16 md:py-24 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8A2C24] to-[#CA3B2A]"></div>
      
      {/* Remove Background Pattern */}
      
      {/* Remove Decorative Elements */}
      
      {/* Remove Section Divider - Top */}
      
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <motion.div 
          className="md:max-w-5xl lg:max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="text-center mb-10">
            <motion.h2 
              className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-bold text-[#8A2C24] mb-3 md:mb-4"
              variants={itemVariants}
            >
              Our Value Proposition
            </motion.h2>
            <motion.div 
              className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-[#8A2C24] via-[#CA3B2A] to-[#8A2C24] mx-auto mb-8 md:mb-10"
              variants={itemVariants}
            />
            <motion.p 
              className="font-body text-xl md:text-2xl text-[#3D3939] leading-relaxed max-w-3xl mx-auto"
              variants={itemVariants}
            >
              {valuePropositionContent.headline}
            </motion.p>
          </div>

          {/* Image-Text Sections */}
          <div className="space-y-24 mb-16">
            {/* Left Image - Right Text */}
            <motion.div 
              className="flex flex-col md:flex-row items-stretch gap-0 bg-gradient-to-br from-[#3A3A40] to-[#1E1E24] rounded-xl overflow-hidden shadow-xl"
              variants={itemVariants}
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 50, opacity: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full md:w-5/12 relative">
                <div className="relative h-72 md:h-full w-full overflow-hidden">
                  <Image 
                    src="/teambuilding.jpg" 
                    alt="Team Building Process" 
                    fill 
                    style={{ objectFit: 'cover' }}
                    className="hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-8">
                    <h3 className="text-white text-2xl md:text-3xl font-bold font-cormorant">Accelerated Process</h3>
                    <div className="h-1 w-16 bg-[#CA3B2A] mt-2"></div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-7/12 flex items-center">
                <div className="p-6 md:p-10 h-full flex flex-col justify-center">
                  <p className="font-body text-lg md:text-xl text-gray-200 leading-relaxed">
                    {valuePropositionContent.mainText}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-100/10">
                    <div className="flex items-center text-[#CA3B2A]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-gray-200">Proven Methodology</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Image - Left Text */}
            <motion.div 
              className="flex flex-col-reverse md:flex-row items-stretch gap-0 bg-gradient-to-br from-[#3A3A40] to-[#1E1E24] rounded-xl overflow-hidden shadow-xl"
              variants={itemVariants}
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 50, opacity: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full md:w-7/12 flex items-center">
                <div className="p-6 md:p-10 h-full flex flex-col justify-center">
                  <p className="font-body text-lg md:text-xl text-gray-200 leading-relaxed">
                    {valuePropositionContent.conclusion}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-100/10">
                    <div className="flex items-center text-[#CA3B2A]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-gray-200">Strategic Impact</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-5/12 relative">
                <div className="relative h-72 md:h-full w-full overflow-hidden">
                  <Image 
                    src="/stocks.jpg" 
                    alt="Strategic Talent Acquisition" 
                    fill 
                    style={{ objectFit: 'cover' }}
                    className="hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 p-6 md:p-8 text-right">
                    <h3 className="text-white text-2xl md:text-3xl font-bold font-cormorant">Bottom-Line Impact</h3>
                    <div className="h-1 w-16 bg-[#CA3B2A] mt-2 ml-auto"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Creative Divider */}
          <div className="relative py-16">
            <div className="absolute left-0 right-0 h-12 flex items-center justify-center">
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#CA3B2A] to-transparent w-full max-w-4xl mx-auto"></div>
            </div>
                         <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
               <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8A2C24] to-[#CA3B2A] shadow-lg flex items-center justify-center p-4">
                 <Image 
                   src="/logo-white.png" 
                   alt="Kersten Capital Logo" 
                   width={60} 
                   height={60}
                   className="object-contain"
                 />
               </div>
               <div className="mt-1 w-0.5 h-8 bg-gradient-to-b from-[#CA3B2A] to-transparent"></div>
              </div>
          </div>
          
          {/* Expertise Cards with Accordion */}
          <motion.h3
            className="text-5xl md:text-5xl font-cormorant font-bold text-[#8A2C24] text-center mb-8"
            variants={itemVariants}
          >
            Our Expertise
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mb-16">
            {expertiseCards.map((card, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                className={`bg-gradient-to-br from-[#3A3A40] to-[#1E1E24] rounded-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer`}
                onClick={() => toggleCard(index)}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.15)"
                }}
              >
                <div className="bg-gradient-to-r from-[#8A2C24] to-[#CA3B2A] text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-white mr-3">
                        {card.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold">{card.title}</h3>
                    </div>
                    <div className="transform transition-transform duration-300" style={{ transform: expandedCard === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedCard === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 border-t border-gray-400/10">
                        <p className="text-base text-gray-200">{card.description}</p>
                        <div className="mt-4 pt-4 border-t border-gray-400/10">
                          <h4 className="text-sm font-semibold text-[#CA3B2A] mb-2">How We Deliver:</h4>
                          <ul className="text-sm text-gray-300 space-y-2">
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-[#CA3B2A] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Personalized, client-focused approach</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-[#CA3B2A] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Proprietary methodology and tools</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-[#CA3B2A] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Continuous improvement and adaptation</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {expandedCard !== index && (
                  <div className="p-4 border-t border-gray-400/10">
                    <p className="text-sm md:text-base text-gray-200">{card.description}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Additional CTA */}
          <motion.div
            className="flex justify-center mb-12"
            variants={itemVariants}
          >
            <Link href="/contact">
              <div className="bg-[#E04032] text-white px-8 py-4 rounded-md shadow-lg hover:bg-[#B02F22] transition-colors border border-white/10 flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300">
                <span className="font-bold">Schedule a Consultation</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          </motion.div>
          
          {/* Statistics Badge */}
          <motion.div 
            className="flex justify-center"
            variants={badgeVariants}
          >
            <div className="bg-gradient-to-r from-[#8A2C24] to-[#CA3B2A] text-white px-8 py-6 md:px-12 md:py-8 rounded-lg shadow-xl">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-center">
                <CountUp end={300} duration={2000} />
              </div>
              <p className="text-base md:text-lg font-medium text-center">
                Executive leaders to highly specialized mid-management contributors placed annually
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Remove Section Divider - Bottom */}
    </section>
  );
} 