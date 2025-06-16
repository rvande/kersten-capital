'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaRobot, FaShieldAlt, FaLaptopCode, FaUniversity, FaCogs, FaIndustry, FaShoppingCart, FaBolt, FaArrowRight, FaChartLine } from 'react-icons/fa';
import { getStrapiURL } from '../../api/api';
import { Industry } from '../../types/pages';

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

// Icon mapping for focus areas
const getFocusAreaIcon = (title: string, iconName?: string) => {
  // If CMS provides an icon name, try to map it first
  if (iconName) {
    const iconLower = iconName.toLowerCase();
    if (iconLower.includes('robot') || iconLower === 'farobot') {
      return <FaRobot className="w-8 h-8 text-[#187CC1]" />;
    } else if (iconLower.includes('shield') || iconLower === 'fashieldalt') {
      return <FaShieldAlt className="w-8 h-8 text-[#187CC1]" />;
    } else if (iconLower.includes('laptop') || iconLower === 'falaptopcode') {
      return <FaLaptopCode className="w-8 h-8 text-[#187CC1]" />;
    } else if (iconLower.includes('university') || iconLower === 'fauniversity') {
      return <FaUniversity className="w-8 h-8 text-[#187CC1]" />;
    } else if (iconLower.includes('bolt') || iconLower === 'fabolt') {
      return <FaBolt className="w-8 h-8 text-[#187CC1]" />;
    } else if (iconLower.includes('shopping') || iconLower.includes('cart') || iconLower === 'fashoppingcart') {
      return <FaShoppingCart className="w-8 h-8 text-[#187CC1]" />;
    } else if (iconLower.includes('industry') || iconLower === 'faindustry') {
      return <FaIndustry className="w-8 h-8 text-[#187CC1]" />;
    } else if (iconLower.includes('chart') || iconLower === 'fachartline') {
      return <FaChartLine className="w-8 h-8 text-[#187CC1]" />;
    } else if (iconLower.includes('cog') || iconLower === 'facogs') {
      return <FaCogs className="w-8 h-8 text-[#187CC1]" />;
    }
  }

  // Fall back to title-based mapping with improved keywords
  const titleLower = title.toLowerCase();
  if (titleLower.includes('ai') || titleLower.includes('data') || titleLower.includes('robot') || titleLower.includes('analytics') || titleLower.includes('personalization')) {
    return <FaRobot className="w-8 h-8 text-[#187CC1]" />;
  } else if (titleLower.includes('security') || titleLower.includes('cyber')) {
    return <FaShieldAlt className="w-8 h-8 text-[#187CC1]" />;
  } else if (titleLower.includes('software') || titleLower.includes('technology') || titleLower.includes('tech') || titleLower.includes('digital')) {
    return <FaLaptopCode className="w-8 h-8 text-[#187CC1]" />;
  } else if (titleLower.includes('banking') || titleLower.includes('financial') || titleLower.includes('finance')) {
    return <FaUniversity className="w-8 h-8 text-[#187CC1]" />;
  } else if (titleLower.includes('energy') || titleLower.includes('power') || titleLower.includes('electric') || titleLower.includes('renewable') || titleLower.includes('solar') || titleLower.includes('utilities')) {
    return <FaBolt className="w-8 h-8 text-[#187CC1]" />;
  } else if (titleLower.includes('retail') || titleLower.includes('commerce') || titleLower.includes('ecommerce') || titleLower.includes('shopping') || titleLower.includes('merchandising') || titleLower.includes('omnichannel')) {
    return <FaShoppingCart className="w-8 h-8 text-[#187CC1]" />;
  } else if (titleLower.includes('manufacturing') || titleLower.includes('industrial') || titleLower.includes('factory')) {
    return <FaIndustry className="w-8 h-8 text-[#187CC1]" />;
  } else if (titleLower.includes('strategy') || titleLower.includes('innovation') || titleLower.includes('gtm') || titleLower.includes('growth') || titleLower.includes('performance')) {
    return <FaChartLine className="w-8 h-8 text-[#187CC1]" />;
  } else if (titleLower.includes('enterprise') || titleLower.includes('platform') || titleLower.includes('system') || titleLower.includes('integration') || titleLower.includes('experience')) {
    return <FaCogs className="w-8 h-8 text-[#187CC1]" />;
  }
  return <FaCogs className="w-8 h-8 text-[#187CC1]" />; // Default icon
};

interface IndustryPageClientProps {
  industry: Industry;
}

export default function IndustryPageClient({ industry }: IndustryPageClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Get hero image URL
  const heroImageUrl = industry.heroImage?.url 
    ? (industry.heroImage.url.startsWith('http') 
        ? industry.heroImage.url 
        : getStrapiURL(industry.heroImage.url))
    : '/fintech.jpg'; // Fallback image

  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={heroImageUrl}
            alt={industry.heroTitle || industry.title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        {/* Gradient Background */}
        <div className="absolute inset-0 z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${industry.gradient?.replace('from-', '').replace('to-', '').replace('[', '').replace(']', '').split(' ')[0] || '#0C6BAF'}/90 0%, ${industry.gradient?.replace('from-', '').replace('to-', '').replace('[', '').replace(']', '').split(' ')[1] || '#187CC1'}/85 50%, #71C8F3/90 100%)`,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col h-[80vh] sm:h-[70vh] md:h-[80vh] w-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col justify-start md:justify-center h-full md:items-start items-center md:text-left text-center max-w-5xl pt-16 md:pt-0 md:-mt-5">
            {/* Main headline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-6 md:mb-8">
              <h1
                className="relative font-montserrat text-[2.5rem] md:text-[4.5rem] lg:text-[6rem] leading-tight font-black text-white drop-shadow-lg"
                style={{
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  animation: isLoaded ? 'slideRight 1.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
                }}
              >
                {industry.heroTitle || industry.title}
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
              <p className="max-w-4xl md:text-left text-center text-white font-open-sans text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                {industry.heroSubtitle || industry.shortDescription}
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

      {/* Overview Section */}
      {industry.overviewSection && (
        <section className="relative bg-white py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-7xl mx-auto"
            >
              <motion.div variants={itemVariants} className="max-w-5xl mx-auto mb-16 md:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002C5F] mb-8 font-montserrat text-center">
                  {industry.overviewSection.title || 'Innovation at the Intersection'}
                </h2>
                <div className="text-lg text-black/80 font-open-sans leading-relaxed space-y-6 [&_strong]:font-black [&_strong]:text-[#002C5F]">
                  <div dangerouslySetInnerHTML={{ __html: industry.overviewSection.content }} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Focus Areas Section */}
      {industry.focusAreas && industry.focusAreas.length > 0 && (
        <section className="relative stylish-pattern-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-7xl mx-auto relative z-10"
            >
              {/* Section Header */}
              <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002C5F] mb-6 font-montserrat">
                  Our Focus Areas
                </h2>
                <p className="text-lg sm:text-xl text-black/70 max-w-4xl mx-auto font-open-sans leading-relaxed">
                  Specialized expertise across key areas that drive success in {industry.title.toLowerCase()}.
                </p>
              </motion.div>

              {/* Focus Areas Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {industry.focusAreas.map((area, index) => (
                  <motion.div
                    key={area.id}
                    custom={index}
                    variants={cardVariants}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border border-gray-100 hover:border-[#0C6BAF]/20 p-8">
                      {/* Icon */}
                      <div className="mb-6">
                        {getFocusAreaIcon(area.title, area.icon)}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-black text-[#002C5F] mb-4 font-montserrat">
                        {area.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-black/70 font-open-sans text-base leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
              Ready to Find Your Next {industry.title} Leader?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 font-open-sans leading-relaxed">
              Let's discuss how our specialized expertise in {industry.title.toLowerCase()} can help you identify the transformational leaders your organization needs.
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

      {/* Back to Industries */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <Link 
              href="/industries"
              className="inline-flex items-center text-[#0C6BAF] hover:text-[#187CC1] font-montserrat font-semibold transition-colors"
            >
              <svg className="w-5 h-5 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Back to All Industries
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 