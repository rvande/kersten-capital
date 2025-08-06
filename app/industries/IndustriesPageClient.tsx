'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaLaptopCode, 
  FaIndustry, 
  FaShoppingCart, 
  FaBolt, 
  FaArrowRight, 
  FaChartLine,
  FaCogs,
  FaBuilding,
  FaStore,
  FaSolarPanel,
  FaWater,
  FaHandshake,
  FaChartBar,
  FaRocket,
  FaTools,
  FaLeaf
} from 'react-icons/fa';
import { Industry } from '../types/pages';

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
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.04, 0.62, 0.23, 0.98] 
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.04, 0.62, 0.23, 0.98],
      delay: 0.3 + (i * 0.2)
    }
  })
};

// Enhanced icon mapping for different industries
const getIndustryIcon = (title: string) => {
  const titleLower = title.toLowerCase();
  
  // Technology & Financial Services
  if (titleLower.includes('technology') && titleLower.includes('financial')) {
    return <FaLaptopCode className="w-16 h-16 text-white" />;
  }
  // Pure Technology
  else if (titleLower.includes('technology') || titleLower.includes('tech') || titleLower.includes('software')) {
    return <FaRocket className="w-16 h-16 text-white" />;
  }
  // Financial Services
  else if (titleLower.includes('financial') || titleLower.includes('finance') || titleLower.includes('banking')) {
    return <FaChartBar className="w-16 h-16 text-white" />;
  }
  // Manufacturing & Industrial
  else if (titleLower.includes('manufacturing') || titleLower.includes('industrial')) {
    return <FaCogs className="w-16 h-16 text-white" />;
  }
  // Retail & E-Commerce
  else if (titleLower.includes('retail') || titleLower.includes('commerce') || titleLower.includes('ecommerce')) {
    return <FaStore className="w-16 h-16 text-white" />;
  }
  // Energy & Renewables
  else if (titleLower.includes('energy') || titleLower.includes('renewable') || titleLower.includes('solar') || titleLower.includes('power')) {
    return <FaSolarPanel className="w-16 h-16 text-white" />;
  }
  // Utilities
  else if (titleLower.includes('utilities') || titleLower.includes('utility') || titleLower.includes('water') || titleLower.includes('electric')) {
    return <FaWater className="w-16 h-16 text-white" />;
  }
  // Private Equity
  else if (titleLower.includes('private') && titleLower.includes('equity') || titleLower.includes('pe-backed')) {
    return <FaHandshake className="w-16 h-16 text-white" />;
  }
  // Healthcare
  else if (titleLower.includes('healthcare') || titleLower.includes('medical') || titleLower.includes('pharma')) {
    return <FaLeaf className="w-16 h-16 text-white" />;
  }
  // Professional Services
  else if (titleLower.includes('professional') || titleLower.includes('consulting') || titleLower.includes('services')) {
    return <FaBuilding className="w-16 h-16 text-white" />;
  }
  // Sales & Marketing
  else if (titleLower.includes('sales') || titleLower.includes('marketing')) {
    return <FaChartLine className="w-16 h-16 text-white" />;
  }
  
  // Default fallback
  return <FaIndustry className="w-16 h-16 text-white" />;
};

interface IndustriesPageClientProps {
  industries: Industry[];
  error: string | null;
}

export default function IndustriesPageClient({ industries, error }: IndustriesPageClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/industries.jpg"
            alt="Industries"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        {/* Gradient Background */}
        <div className="absolute inset-0 z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #002C5F/90 0%, #0C6BAF/85 50%, #187CC1/90 100%)',
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col h-[80vh] sm:h-[70vh] md:h-[80vh] w-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col justify-center h-full md:items-start items-center md:text-left text-center max-w-5xl">
            {/* Main headline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-6 md:mb-8">
              <h1
                className="relative font-montserrat text-[4rem] md:text-[4.5rem] lg:text-[6rem] leading-tight font-black text-white drop-shadow-lg"
                style={{
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  animation: isLoaded ? 'slideRight 1.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
                }}
              >
                Our Industries
                <span className="text-white block">Served</span>
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
              <p className="max-w-4xl md:text-left text-center text-white font-open-sans font-normal text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                Deep sector expertise across technology, manufacturing, retail, and energy to identify transformational leaders who drive innovation and growth.
              </p>
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
              <g fill="#002c5f">
                <path 
                  d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z" 
                />
                <path 
                  d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z" 
                  fill="#ffffff"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <section className="relative bg-white py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-6 font-montserrat">
                Sector Expertise
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-black/70 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Specialized recruitment across high-growth industries where exceptional leadership drives transformational results.
              </p>
            </motion.div>

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Failed to load industries from CMS</p>
                <p className="text-gray-600">Showing fallback content</p>
              </div>
            )}

            {/* Industries Grid */}
            {industries.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
                  {industries.slice(0, 3).map((industry, index) => (
                    <motion.div
                      key={industry.documentId || industry.id}
                      custom={index}
                      variants={cardVariants}
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="group"
                    >
                      <Link href={`/industries/${industry.slug}`} className="block h-full">
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border border-gray-100 hover:border-[#0C6BAF]/20">
                          {/* Industry Icon & Header */}
                          <div className={`bg-gradient-to-br ${industry.gradient || 'from-[#0C6BAF] to-[#187CC1]'} p-8 relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                            <div className="relative z-10">
                              <div className="mb-6">
                                {getIndustryIcon(industry.title)}
                              </div>
                              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 font-montserrat">
                                {industry.title}
                              </h3>
                            </div>
                          </div>

                          {/* Industry Content */}
                          <div className="p-8">
                            <p className="text-black/80 mb-6 font-open-sans text-base leading-relaxed">
                              {industry.shortDescription}
                            </p>

                            {/* Focus Areas */}
                            {industry.focusAreas && industry.focusAreas.length > 0 && (
                              <div className="mb-6">
                                <h4 className="text-lg font-black text-[#002C5F] mb-3 font-montserrat">
                                  Focus Areas:
                                </h4>
                                <ul className="space-y-2">
                                  {industry.focusAreas.slice(0, 5).map((area, areaIndex) => (
                                    <li key={area.id || areaIndex} className="flex items-start">
                                      <div className="w-2 h-2 bg-[#0C6BAF] rounded-full mt-2 mr-3 flex-shrink-0" />
                                      <span className="text-black/70 font-open-sans text-sm">
                                        {area.title}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* CTA */}
                            <div className="pt-4 border-t border-gray-100">
                              <div className="flex items-center text-[#0C6BAF] font-semibold font-montserrat group-hover:text-[#187CC1] transition-colors">
                                <span>Explore Sector</span>
                                <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Second Row for remaining industries */}
                {industries.length > 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8 lg:mt-12 max-w-4xl mx-auto">
                    {industries.slice(3).map((industry, index) => (
                      <motion.div
                        key={industry.documentId || industry.id}
                        custom={index + 3}
                        variants={cardVariants}
                        whileHover={{ 
                          y: -10,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        className="group"
                      >
                        <Link href={`/industries/${industry.slug}`} className="block h-full">
                          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border border-gray-100 hover:border-[#0C6BAF]/20">
                            {/* Industry Icon & Header */}
                            <div className={`bg-gradient-to-br ${industry.gradient || 'from-[#0C6BAF] to-[#187CC1]'} p-8 relative overflow-hidden`}>
                              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                              <div className="relative z-10">
                                <div className="mb-6">
                                  {getIndustryIcon(industry.title)}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 font-montserrat">
                                  {industry.title}
                                </h3>
                              </div>
                            </div>

                            {/* Industry Content */}
                            <div className="p-8">
                              <p className="text-black/80 mb-6 font-open-sans text-base leading-relaxed">
                                {industry.shortDescription}
                              </p>

                              {/* Focus Areas */}
                              {industry.focusAreas && industry.focusAreas.length > 0 && (
                                <div className="mb-6">
                                  <h4 className="text-lg font-black text-[#002C5F] mb-3 font-montserrat">
                                    Focus Areas:
                                  </h4>
                                  <ul className="space-y-2">
                                    {industry.focusAreas.slice(0, 5).map((area, areaIndex) => (
                                      <li key={area.id || areaIndex} className="flex items-start">
                                        <div className="w-2 h-2 bg-[#0C6BAF] rounded-full mt-2 mr-3 flex-shrink-0" />
                                        <span className="text-black/70 font-open-sans text-sm">
                                          {area.title}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* CTA */}
                              <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center text-[#0C6BAF] font-semibold font-montserrat group-hover:text-[#187CC1] transition-colors">
                                  <span>Explore Sector</span>
                                  <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-br from-[#002C5F] to-[#0C6BAF] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 font-montserrat">
              Ready to Transform Your Industry Leadership?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 font-open-sans leading-relaxed">
              Let's discuss how our deep sector expertise can help you identify the transformational leaders your organization needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact-us"
                className="inline-block px-8 py-4 bg-white text-[#002C5F] rounded-full hover:bg-gray-100 transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl"
              >
                Start Your Search
              </Link>
              <Link 
                href="/our-approach"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-[#002C5F] transition-all duration-300 font-montserrat font-semibold"
              >
                Our Approach
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 