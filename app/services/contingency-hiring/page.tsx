'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaHandshake, FaUsers, FaRocket, FaChartLine, FaExchangeAlt, FaUserTie, FaCogs, FaBuilding, FaSearch } from 'react-icons/fa';

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

const keyFeatures = [
  {
    title: "Performance-Based Model",
    description: "You only pay when we successfully place a candidate you hire",
    icon: <FaChartLine className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Rapid Deployment",
    description: "Our established talent pipelines allow for quick candidate identification and presentation",
    icon: <FaRocket className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Multiple Search Options",
    description: "We engage multiple recruitment partners simultaneously to maximize candidate reach",
    icon: <FaUsers className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Streamlined Process",
    description: "Our efficient screening and presentation of pre-qualified candidates is tailored to your specifications",
    icon: <FaCogs className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Flexible Engagement",
    description: "You can scale up or down based on your hiring volume needs",
    icon: <FaExchangeAlt className="w-8 h-8 text-[#187CC1]" />
  }
];

const idealForItems = [
  {
    title: "Mid-level management positions",
    icon: <FaUserTie className="w-6 h-6 text-[#71C8F3]" />
  },
  {
    title: "Technical and specialized individual contributor roles",
    icon: <FaCogs className="w-6 h-6 text-[#71C8F3]" />
  },
  {
    title: "High-volume hiring initiatives",
    icon: <FaBuilding className="w-6 h-6 text-[#71C8F3]" />
  },
  {
    title: "Organizations with established internal recruitment capabilities seeking supplemental support",
    icon: <FaUsers className="w-6 h-6 text-[#71C8F3]" />
  }
];

export default function ContingencyHiringPage() {
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
            src="/metrics.jpg"
            alt="Contingency Hiring Services"
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
              background: 'linear-gradient(135deg, #187CC1/90 0%, #71C8F3/85 50%, #005A9C/90 100%)',
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col h-[80vh] sm:h-[70vh] md:h-[80vh] w-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col justify-center h-full md:items-start items-center md:text-left text-center max-w-5xl">
            {/* Main headline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-6 md:mb-8">
              <h1
                className="relative font-montserrat text-3xl sm:text-4xl md:text-[4.5rem] lg:text-[6rem] leading-tight font-black text-white drop-shadow-lg"
                style={{
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  animation: isLoaded ? 'slideRight 1.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
                }}
              >
                Contingency
                <span className="text-[#002c5f] block">Search</span>
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
              <p className="max-w-4xl md:text-left text-center text-white font-open-sans text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                Results-driven approach to talent acquisition, where we assume the financial risk until the right candidate is successfully placed.
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
                Performance-Based Talent Acquisition
              </h2>
              <div className="text-lg text-black/80 font-open-sans leading-relaxed space-y-6">
                <p>
                  Our Contingency Search service offers a results-driven approach to talent acquisition, where we assume the financial risk until the right candidate is successfully placed. This flexible model offers access to our extensive candidate network and deep recruitment expertise without upfront commitment.
                </p>
                <p>
                  Our Contingency Search service combines speed and precision to deliver qualified candidates efficiently, helping you fill critical positions quickly and without financial risk.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="relative bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] py-16 md:py-24">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002C5F] mb-6 font-montserrat">
                Key Features
              </h2>
              <p className="text-lg sm:text-xl text-black/70 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Our flexible approach maximizes efficiency while minimizing your risk and investment.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  custom={index}
                  variants={cardVariants}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                    {feature.title}
                  </h3>
                  <p className="text-black/70 font-open-sans leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002C5F] mb-8 font-montserrat">
                  Ideal For
                </h2>
                <div className="space-y-6">
                  {idealForItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      custom={index}
                      variants={cardVariants}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {item.icon}
                      </div>
                      <p className="text-lg text-black/80 font-open-sans leading-relaxed">
                        {item.title}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Visual Element */}
              <motion.div variants={itemVariants} className="relative">
                <div className="bg-gradient-to-br from-[#187CC1] to-[#71C8F3] rounded-2xl p-12 text-white">
                  <div className="text-center">
                    <FaHandshake className="w-20 h-20 text-white mx-auto mb-8" />
                    <h3 className="text-2xl font-black font-montserrat mb-4">
                      Risk-Free Excellence
                    </h3>
                    <p className="text-lg font-open-sans leading-relaxed opacity-90">
                      We invest in finding the right fit, so you only pay when we deliver results that meet your standards.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Performance Benefits Section */}
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
                Why Choose Contingency Search?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 font-open-sans leading-relaxed max-w-4xl mx-auto">
                Experience the perfect balance of speed, quality, and financial flexibility.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div custom={0} variants={cardVariants}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <FaRocket className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white mb-4 font-montserrat">
                    Fast Results
                  </h3>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    Leverage our established networks for rapid candidate identification and quick turnaround times.
                  </p>
                </div>
              </motion.div>

              <motion.div custom={1} variants={cardVariants}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <FaChartLine className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white mb-4 font-montserrat">
                    Zero Risk
                  </h3>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    Pay only for successful placements. No upfront costs or financial commitments required.
                  </p>
                </div>
              </motion.div>

              <motion.div custom={2} variants={cardVariants}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <FaExchangeAlt className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white mb-4 font-montserrat">
                    Scalable Solutions
                  </h3>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    Easily adjust your hiring efforts up or down based on changing business needs and priorities.
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
                Explore Our Other Services
              </h2>
              <p className="text-lg sm:text-xl text-black/70 font-open-sans leading-relaxed">
                Discover how our comprehensive talent acquisition solutions can meet your specific needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div custom={0} variants={cardVariants}>
                <Link href="/services/executive-search" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <FaSearch className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h3 className="text-2xl font-black text-[#002C5F] mb-4 font-montserrat">
                      Executive Search
                    </h3>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Premium, dedicated approach for top-tier leadership positions with guaranteed results.
                    </p>
                    <div className="flex items-center text-white group-hover:text-[#71C8F3] transition-colors font-montserrat font-semibold">
                      <span>Learn More</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="presentation">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div custom={1} variants={cardVariants}>
                <Link href="/services/fractional-hiring" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <FaUsers className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h3 className="text-2xl font-black text-[#002C5F] mb-4 font-montserrat">
                      Fractional Hiring
                    </h3>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Flexible executive solutions for specialized expertise without full-time commitment.
                    </p>
                    <div className="flex items-center text-white group-hover:text-[#71C8F3] transition-colors font-montserrat font-semibold">
                      <span>Learn More</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="presentation">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
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
              Ready to Start Hiring Risk-Free?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 font-open-sans leading-relaxed">
              Let's discuss how our Contingency Search service can help you find the right talent without upfront investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-[#187CC1] rounded-full hover:bg-gray-100 transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </Link>
              <Link 
                href="/services"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-[#187CC1] transition-all duration-300 font-montserrat font-semibold"
              >
                All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 