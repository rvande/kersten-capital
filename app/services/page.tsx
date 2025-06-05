'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaHandshake, FaClock, FaArrowRight } from 'react-icons/fa';

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

const services = [
  {
    title: "Executive Search",
    subtitle: "Retain Executive Search",
    description: "Premium, dedicated approach to identifying and securing top-tier leadership talent through our boutique partnership model.",
    href: "/services/executive-search",
    icon: <FaSearch className="w-16 h-16 text-white" />,
    features: [
      "Dedicated Research Team",
      "Comprehensive Screening Process", 
      "Strategic Consultation",
      "Exclusive Partnership",
      "Guaranteed Results"
    ],
    idealFor: "C-Suite and VP-level positions, critical leadership roles with significant organizational impact",
    gradient: "from-[#0C6BAF] to-[#187CC1]"
  },
  {
    title: "Contingency Hiring",
    subtitle: "Contingency Search",
    description: "Results-driven approach to talent acquisition where we assume the financial risk until the right candidate is successfully placed.",
    href: "/services/contingency-hiring",
    icon: <FaHandshake className="w-16 h-16 text-white" />,
    features: [
      "Performance-Based Model",
      "Rapid Deployment",
      "Multiple Search Options",
      "Streamlined Process",
      "Flexible Engagement"
    ],
    idealFor: "Mid-level management positions, technical and specialized individual contributor roles",
    gradient: "from-[#187CC1] to-[#71C8F3]"
  },
  {
    title: "Fractional Hiring",
    subtitle: "Flexible Executive Solutions",
    description: "Innovative executive talent solutions for organizations seeking specialized expertise without the commitment of a full-time hire.",
    href: "/services/fractional-hiring",
    icon: <FaClock className="w-16 h-16 text-white" />,
    features: [
      "Flexible Engagement Models",
      "Executive-Level Expertise",
      "Project-Based Solutions",
      "Interim Leadership",
      "Scalable Commitment"
    ],
    idealFor: "Startups and growth-stage companies, established organizations requiring specialized skills",
    gradient: "from-[#71C8F3] to-[#005A9C]"
  }
];

export default function ServicesPage() {
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
            src="/ireland.jpg"
            alt="Services"
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
          <div className="flex flex-col justify-start md:justify-center h-full md:items-start items-center md:text-left text-center max-w-5xl pt-16 md:pt-0 md:-mt-5">
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
                Our
                <span className="text-white block">Services</span>
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex sm:mb-8 ">
              <p className="max-w-4xl md:text-left text-center text-white font-open-sans font-normal text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                Comprehensive talent acquisition solutions tailored to your organization's unique needs and strategic objectives.
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

      {/* Services Section */}
      <section className="relative bg-white section-padding-lg">
        <div className="container-content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-6 font-montserrat text-heading">
                Choose Your Solution
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-secondary container-text mx-auto font-open-sans text-body">
                From executive search to fractional hiring, we offer flexible talent acquisition solutions designed to meet your specific requirements.
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  custom={index}
                  variants={cardVariants}
                  className="group"
                >
                  <Link href={service.href} className="block h-full touch-target">
                    <div className="bg-white rounded-2xl card-shadow-lg interactive-card overflow-hidden h-full border border-gray-100 hover:border-[#0C6BAF]/20">
                      {/* Service Icon & Header */}
                      <div className={`bg-gradient-to-br ${service.gradient} p-8 relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                        <div className="relative z-10">
                          <div className="mb-6">
                            {service.icon}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-black text-white mb-2 font-montserrat text-heading">
                            {service.title}
                          </h3>
                          <p className="text-white/95 text-lg font-semibold font-open-sans">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Service Content */}
                      <div className="p-8 mobile-spacing-normal lg:p-8">
                        <p className="text-secondary mb-6 font-open-sans text-base text-body">
                          {service.description}
                        </p>

                        {/* Key Features */}
                        <div className="mb-6">
                          <h4 className="text-lg font-black text-[#002C5F] mb-3 font-montserrat text-heading">
                            Key Features:
                          </h4>
                          <ul className="space-y-3">
                            {service.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start group/item">
                                <div className="w-2 h-2 bg-[#0C6BAF] rounded-full mt-2 mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200" />
                                <span className="text-tertiary font-open-sans text-sm touch-target">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Ideal For */}
                        <div className="mb-6">
                          <h4 className="text-lg font-black text-[#002C5F] mb-3 font-montserrat text-heading">
                            Ideal For:
                          </h4>
                          <p className="text-tertiary font-open-sans text-sm text-body">
                            {service.idealFor}
                          </p>
                        </div>

                        {/* CTA */}
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center text-[#0C6BAF] font-semibold font-montserrat group-hover:text-[#187CC1] transition-colors interactive-button">
                            <span>Learn More</span>
                            <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-br from-[#002C5F] to-[#0C6BAF] section-padding-md">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container-text mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 font-montserrat text-heading">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-lg sm:text-xl text-white/95 mb-10 font-open-sans text-body">
              Let's discuss which service best fits your talent acquisition needs and organizational goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="interactive-button touch-target inline-block px-8 py-4 bg-white text-[#002C5F] rounded-full hover:bg-gray-100 transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </Link>
              <Link 
                href="/our-approach"
                className="interactive-button touch-target inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-[#002C5F] transition-all duration-300 font-montserrat font-semibold"
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