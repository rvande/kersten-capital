'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaBolt, FaLeaf, FaMountain, FaCogs, FaShieldAlt, FaLaptopCode, FaIndustry, FaShoppingCart, FaArrowRight } from 'react-icons/fa';

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

const focusAreas = [
  {
    title: "Renewable Energy Leadership",
    description: "Executives who excel at scaling solar, wind, and alternative energy operations, combining veteran technical insight with commercial acumen to navigate renewable project development, financing, and operations.",
    icon: <FaLeaf className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Energy Transition & Traditional Energy Transformation",
    description: "Leaders who guide conventional energy companies through strategic transformation, balancing optimizing existing assets with investing in low-carbon initiatives.",
    icon: <FaBolt className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Mining Operations & Sustainability",
    description: "Mining executives who modernize extraction operations while emphasizing safety, efficiency, and environmental responsibility, leveraging technologies that enhance resource recovery.",
    icon: <FaMountain className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Energy Technology & Innovation",
    description: "Leaders who develop and implement next-generation energy solutions, from grid modernization and distributed energy resources to carbon capture and hydrogen technologies.",
    icon: <FaCogs className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "ESG Leadership & Sustainable Operations",
    description: "Executives who excel at implementing environmental, social, and governance initiatives that create sustainable competitive advantage and satisfy stakeholder expectations.",
    icon: <FaShieldAlt className="w-8 h-8 text-[#187CC1]" />
  }
];

export default function EnergyRenewablesMiningPage() {
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
            src="/energy.jpg"
            alt="Energy and Renewables"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        {/* Gradient Background */}
        <div className="absolute inset-0 z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #005A9C/90 0%, #002C5F/85 50%, #0C6BAF/90 100%)',
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col h-[80vh] sm:h-[70vh] md:h-[80vh] w-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col justify-center h-full md:items-start items-center md:text-left text-center max-w-5xl">
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
                Energy &
                <span className="text-white block">Renewables</span>
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
              <p className="max-w-4xl md:text-left text-center text-white font-open-sans text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                Leaders capable of navigating complex regulatory environments while driving innovation and sustainability initiatives across the evolving energy sector.
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
                Energy Transformation Leadership
              </h2>
              <div className="text-lg text-black/80 font-open-sans leading-relaxed space-y-6">
                <p>
                  The evolving energy, renewables, and mining sectors require leaders capable of <span className="font-bold text-[#187CC1]">navigating complex regulatory environments while driving innovation and sustainability initiatives.</span> <span className="font-bold text-[#002C5F]">Kersten Talent Capital identifies professionals</span> who combine profound industry knowledge with the strategic vision to guide organizations through industry transformation.
                </p>
                <p>
                  We serve <span className="font-bold text-[#002C5F]">traditional energy producers, renewable energy innovators, mining operations,</span> utility providers, and energy technology companies. Our candidates bring <span className="font-bold text-[#187CC1]">specialized expertise in operational excellence, regulatory compliance, technological advancement, and sustainability leadership</span> essential for success in today's dynamic energy landscape.
                </p>
                <p>
                  With established networks spanning <span className="font-bold text-[#002C5F]">traditional energy companies, emerging renewables ventures, and global mining operations,</span> Kersten Talent Capital delivers leaders who combine <span className="font-bold text-[#187CC1]">technical domain expertise with the vision to navigate the energy transition</span> while driving sustainable business performance.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Focus Areas Section */}
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
                Specialized expertise across the energy and resources spectrum where exceptional leadership drives sustainable transformation.
              </p>
            </motion.div>

            {/* Focus Areas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  custom={index}
                  variants={cardVariants}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="mb-6">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                    {area.title}
                  </h3>
                  <p className="text-black/70 font-open-sans leading-relaxed">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CSS Styles */}
      <style jsx>{`
        .stylish-pattern-bg {
          background-color: #f8f9fa;
          position: relative;
        }
        
        .stylish-pattern-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.10;
          background-color: #e5e5f7;
          background: linear-gradient(135deg, #0C6BAF55 25%, transparent 25%) -10px 0/ 20px 20px, 
                      linear-gradient(225deg, #0C6BAF 25%, transparent 25%) -10px 0/ 20px 20px, 
                      linear-gradient(315deg, #0C6BAF55 25%, transparent 25%) 0px 0/ 20px 20px, 
                      linear-gradient(45deg, #0C6BAF 25%, #e5e5f7 25%) 0px 0/ 20px 20px;
          z-index: 1;
        }
      `}</style>

      {/* Energy Innovation Section */}
      <section className="relative bg-gradient-to-br from-[#002C5F] to-[#187CC1] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 font-montserrat">
                Sustainable Energy Leadership
              </h2>
              <p className="text-lg sm:text-xl text-white/90 font-open-sans leading-relaxed max-w-4xl mx-auto">
                Leaders who navigate the dual challenges of energy reliability and decarbonization while driving sustainable value creation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div custom={0} variants={cardVariants}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <FaLeaf className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white mb-4 font-montserrat">
                    Renewable Innovation
                  </h3>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    Leaders who propel growth through technical innovation, regulatory navigation, and operational excellence in rapidly evolving renewable sectors.
                  </p>
                </div>
              </motion.div>

              <motion.div custom={1} variants={cardVariants}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <FaBolt className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white mb-4 font-montserrat">
                    Energy Transition
                  </h3>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    Executives who implement decarbonization strategies while maintaining operational excellence and financial performance during industry restructuring.
                  </p>
                </div>
              </motion.div>

              <motion.div custom={2} variants={cardVariants}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <FaShieldAlt className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white mb-4 font-montserrat">
                    ESG Excellence
                  </h3>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    Leaders who integrate ESG considerations into core business operations, enhancing both social license to operate and financial performance.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002C5F] mb-6 font-montserrat">
                Explore Our Other Industries
              </h2>
              <p className="text-lg sm:text-xl text-black/70 font-open-sans leading-relaxed">
                Discover how our sector expertise can meet your specific industry needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div custom={0} variants={cardVariants}>
                <Link href="/industries/technology-financial-services" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <FaLaptopCode className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h3 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      Technology & Financial Services
                    </h3>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Forward-thinking leaders who drive innovation and growth through digital transformation.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Learn More</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div custom={1} variants={cardVariants}>
                <Link href="/industries/manufacturing-distribution-industrial" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <FaIndustry className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h3 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      Manufacturing & Industrial
                    </h3>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Transformational leaders balancing operational excellence with visionary strategy.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Learn More</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div custom={2} variants={cardVariants}>
                <Link href="/industries/e-commerce-digital-retail" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <FaShoppingCart className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h3 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      E-Commerce & Digital Retail
                    </h3>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Leaders combining customer-centric vision with technical excellence.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Learn More</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-br from-[#187CC1] to-[#71C8F3] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 font-montserrat">
              Ready to Transform Your Energy Leadership?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 font-open-sans leading-relaxed">
              Let's discuss how our energy and renewables expertise can help you identify the sustainable leaders your organization needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-[#187CC1] rounded-full hover:bg-gray-100 transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl"
              >
                Start Your Search
              </Link>
              <Link 
                href="/industries"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-[#187CC1] transition-all duration-300 font-montserrat font-semibold"
              >
                All Industries
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 