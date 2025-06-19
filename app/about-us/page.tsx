'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaChartLine, FaCheckCircle, FaHandshake, FaUsers } from 'react-icons/fa';

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

const pillars = [
  {
    title: "Deep Market Intelligence",
    description: "We maintain continuous engagement with industry leaders, gathering real-time intelligence that informs every decision.",
    icon: (
      <svg className="w-12 h-12 text-[#ffffff]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Immersive Client Engagement",
    description: "Our boutique approach ensures focused attention from dedicated senior partners who understand your business landscape.",
    icon: (
      <svg className="w-12 h-12 text-[#ffffff]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Innovative Talent Identification",
    description: "We leverage AI-driven solutions and proprietary methodologies to identify exceptional candidates with unprecedented precision.",
    icon: (
      <svg className="w-12 h-12 text-[#ffffff]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

// Updated What Makes Us Stand Out items with React Icons
const standOutItems = [
  {
    title: "Recruit & Retain Top-Notch Global Leaders",
    description: "We identify and secure exceptional leadership talent to drive your organization's growth and success.",
    icon: <FaChartLine className="w-16 h-16 text-[#0C6BAF]" />
  },
  {
    title: "Validate the Right Match the First Time",
    description: "Our rigorous validation process ensures candidates are the perfect fit for your culture and objectives.",
    icon: <FaCheckCircle className="w-16 h-16 text-[#0C6BAF]" />
  },
  {
    title: "Execute a Partner-Led Growth Approach",
    description: "We work alongside you as strategic partners, committed to your long-term success and organizational growth.",
    icon: <FaHandshake className="w-16 h-16 text-[#0C6BAF]" />
  },
  {
    title: "Stay Committed through Full Integration",
    description: "We remain engaged throughout the integration process, ensuring successful onboarding and long-term performance.",
    icon: <FaUsers className="w-16 h-16 text-[#0C6BAF]" />
  }
];

const differentiators = [
  {
    title: "Response Times Measured in Hours",
    description: "While industry norms accept days of waiting, we respond with strategic insights within hours of engagement.",
  },
  {
    title: "Partner-Led Every Step",
    description: "No revolving door of junior associates—dedicated senior partners handle every aspect of your search.",
  },
  {
    title: "AI-Enhanced Human Expertise",
    description: "Cutting-edge technology amplifies our human insights for unparalleled candidate identification and validation.",
  },
  {
    title: "Accelerated Delivery Without Compromise",
    description: "Exceptional candidates delivered in a fraction of traditional timelines while maintaining the highest quality standards.",
  }
];

export default function AboutUsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [elementTop, setElementTop] = useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsLoaded(true);
    if (ref.current) {
      setElementTop(ref.current.offsetTop);
    }
  }, []);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(
    scrollY, 
    [elementTop - 500, elementTop - 200], 
    [0, 1]
  );

  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/about-us.jpg"
            alt="About Kersten Talent Capital"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C6BAF]/80 via-[#0C6BAF]/60 to-[#0C6BAF]/80 z-10" />

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
                About Kersten
                <span className="text-[#002c5f] block">Talent Capital</span>
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
              <p className="max-w-4xl md:text-left text-center text-white font-open-sans font-normal text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                Revolutionizing executive talent acquisition through precision, partnership, and unparalleled expertise since 2017.
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

      {/* Our Story Section */}
      <section className="relative w-full bg-white py-16 md:py-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 mb-20">
              {/* Content - Left Side */}
              <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <span className="text-[#0C6BAF] font-montserrat font-semibold text-lg md:text-xl tracking-wide">
                    Revolutionizing Executive Talent Acquisition
                  </span>
                </motion.div>

                <motion.h2 
                  className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-6 leading-tight"
                  variants={itemVariants}
                >
                  Our Story
                </motion.h2>

                <motion.div 
                  className="flex justify-center lg:justify-start mb-6"
                  variants={itemVariants}
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
                  className="font-open-sans text-base md:text-lg lg:text-xl text-black leading-relaxed mb-6"
                  variants={itemVariants}
                  style={{ lineHeight: '1.7' }}
                >
                  Founded in 2017 by visionary talent strategist Michael Kersten, Kersten Talent Capital emerged as a deliberate counterpoint to an industry that had lost its way. After witnessing firsthand how traditional executive search firms prioritized process over people and volume over value, Michael set out to fundamentally revolutionize how organizations across industries access transformational leadership talent.
                </motion.p>
              </div>

              {/* Executive Image - Right Side */}
              <motion.div 
                className="lg:w-1/2"
                variants={itemVariants}
              >
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image 
                    src="/leadership.jpg" 
                    alt="Executive leadership and strategic planning" 
                    width={600} 
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section - Dark Background */}
      <section className="relative w-full bg-gradient-to-b from-[#002C5F] to-[#005A9C] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2 
              className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight"
              variants={itemVariants}
            >
              The Kersten Philosophy
            </motion.h2>
            
            <motion.div 
              className="flex justify-center mb-12"
              variants={itemVariants}
            >
              <svg 
                width="300" 
                height="12" 
                viewBox="0 0 627 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-64 h-6 md:w-72 md:h-6 lg:w-80 lg:h-7"
              >
                <path d="M5.1661 0H626.166L5.1661 16C-1.18851 9.74819 -2.23569 6.25249 5.1661 0Z" fill="#71C8F3"/>
              </svg>
            </motion.div>

            <motion.h3 
              className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-[#71C8F3] mb-8"
              variants={itemVariants}
            >
              Precision Over Process
            </motion.h3>

            <motion.p
              className="font-open-sans text-lg md:text-xl text-white leading-relaxed mb-12 max-w-5xl mx-auto"
              variants={itemVariants}
              style={{ lineHeight: '1.7' }}
            >
              At its core, Kersten Talent Capital rejects the antiquated methodologies that dominate the executive recruitment landscape. While conventional firms recycle limited talent pools and deploy one-size-fits-all approaches, we've architected a bespoke executive hiring model built on three foundational principles.
            </motion.p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex justify-center mb-6">
                    {pillar.icon}
                  </div>
                  <h4 className="font-montserrat text-xl font-bold text-white mb-4">
                    {pillar.title}
                  </h4>
                  <p className="font-open-sans text-white/90 leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* White-Glove Standard Section with Stylish Background */}
      <section className="relative w-full py-16 md:py-24 stylish-pattern-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
              {/* Service Image - Left Side */}
              <motion.div 
                className="lg:w-1/2 mb-10 lg:mb-0"
                variants={itemVariants}
              >
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image 
                    src="/search.jpg" 
                    alt="Premium executive search services" 
                    width={600} 
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>

              {/* Content - Right Side */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <span className="text-[#0C6BAF] font-montserrat font-semibold text-lg md:text-xl tracking-wide">
                    Beyond Service to Partnership
                  </span>
                </motion.div>

                <motion.h2 
                  className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-6 leading-tight"
                  variants={itemVariants}
                >
                  The White-Glove Standard
                </motion.h2>

                <motion.div 
                  className="flex justify-center lg:justify-start mb-6"
                  variants={itemVariants}
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
                  className="font-open-sans text-base md:text-lg lg:text-xl text-black leading-relaxed mb-8"
                  variants={itemVariants}
                  style={{ lineHeight: '1.7' }}
                >
                  The Kersten Talent Capital experience transcends traditional client service models. From the moment of engagement—with response times measured in hours, not days—clients enter a relationship characterized by unparalleled responsiveness, strategic talent alignment, and execution excellence.
                </motion.p>

                <motion.p
                  className="font-open-sans text-base md:text-lg lg:text-xl text-black leading-relaxed mb-8"
                  variants={itemVariants}
                  style={{ lineHeight: '1.7' }}
                >
                  Where others see hiring as a transaction, we recognize it as a strategic inflection point with profound implications for organizational trajectory. Our boutique approach ensures that every executive search receives the focused attention it deserves.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Stand Out Section - Matching Screenshot */}
      <section className="relative w-full bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            {/* Check mark icon and title */}
            <motion.div 
              className="flex items-center justify-center mb-4"
              variants={itemVariants}
            >
              <div className="w-8 h-8 bg-[#0C6BAF] rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[#0C6BAF] font-montserrat font-semibold text-lg md:text-xl tracking-wide">
                What Makes Us Stand Out
              </span>
            </motion.div>

            <motion.h2 
              className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight text-[#002C5F]"
              variants={itemVariants}
            >
              The Kersten Difference
            </motion.h2>

            <motion.div 
              className="flex justify-center mb-12"
              variants={itemVariants}
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
          </motion.div>

          {/* Four Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {standOutItems.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-left group hover:scale-[1.02]"
              >
                <div className="flex justify-start mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-20 h-20 bg-[#0C6BAF]/10 rounded-xl flex items-center justify-center">
                    {React.cloneElement(item.icon, { 
                      className: "w-10 h-10 text-[#0C6BAF]" 
                    })}
                  </div>
                </div>
                <h4 className="font-montserrat text-xl md:text-2xl font-bold text-[#002C5F] mb-4 leading-tight">
                  {item.title}
                </h4>
                <p className="font-open-sans text-gray-700 leading-relaxed text-base md:text-lg">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="relative w-full bg-gradient-to-b from-[#002C5F] to-[#005A9C] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
              {/* Content - Left Side */}
              <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
                <motion.div 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <span className="text-[#71C8F3] font-montserrat font-semibold text-lg md:text-xl tracking-wide">
                    Pioneering the Future
                  </span>
                </motion.div>

                <motion.h2 
                  className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
                  variants={itemVariants}
                >
                  AI-Driven Innovation
                </motion.h2>

                <motion.div 
                  className="flex justify-center lg:justify-start mb-6"
                  variants={itemVariants}
                >
                  <svg 
                    width="300" 
                    height="12" 
                    viewBox="0 0 627 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-64 h-6 md:w-72 md:h-6 lg:w-80 lg:h-7"
                  >
                    <path d="M5.1661 0H626.166L5.1661 16C-1.18851 9.74819 -2.23569 6.25249 5.1661 0Z" fill="#71C8F3"/>
                  </svg>
                </motion.div>

                <motion.p
                  className="font-open-sans text-lg md:text-xl text-white leading-relaxed mb-6"
                  variants={itemVariants}
                  style={{ lineHeight: '1.7' }}
                >
                  In an industry often resistant to innovation, Kersten Talent Capital embraces AI-driven talent acquisition and digital recruiting solutions as competitive advantages. Our proprietary hybrid model integrates human expertise with cutting-edge AI and digital tools.
                </motion.p>

                <motion.p
                  className="font-open-sans text-lg md:text-xl text-white leading-relaxed"
                  variants={itemVariants}
                  style={{ lineHeight: '1.7' }}
                >
                  This forward-thinking approach ensures that our clients benefit from both the traditional virtues of high-touch executive search service and the modern advantages of data-driven talent decision-making.
                </motion.p>
              </div>

              {/* Innovation Image - Right Side */}
              <motion.div 
                className="lg:w-1/2"
                variants={itemVariants}
              >
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image 
                    src="/ai.jpg" 
                    alt="AI-driven talent acquisition technology" 
                    width={600} 
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Kersten Difference - Final Impact Section */}
      <section className="relative w-full bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2 
              className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-8 leading-tight"
              variants={itemVariants}
            >
              Transformational Impact
            </motion.h2>
            
            <motion.div 
              className="flex justify-center mb-12"
              variants={itemVariants}
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
              className="font-open-sans text-lg md:text-xl text-black leading-relaxed mb-8 max-w-5xl mx-auto"
              variants={itemVariants}
              style={{ lineHeight: '1.7' }}
            >
              The stakes in executive hiring couldn't be higher. A misaligned placement represents more than just financial cost—it creates organizational drag, strategic disruption, and lost opportunity. Conversely, the right leader in the right role at the right time can catalyze growth, innovation, and competitive advantage.
            </motion.p>

            <motion.p
              className="font-open-sans text-lg md:text-xl text-black leading-relaxed mb-12 max-w-5xl mx-auto"
              variants={itemVariants}
              style={{ lineHeight: '1.7' }}
            >
              Kersten Talent Capital exists to ensure your organization experiences the latter. From initial strategy through seamless onboarding, our partner-led approach delivers talent solutions that generate immediate impact and enduring value.
            </motion.p>

            <motion.div 
              className="bg-gradient-to-r from-[#002C5F] to-[#0C6BAF] rounded-3xl p-12 text-white"
              variants={itemVariants}
            >
              <h4 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                The Kersten Promise
              </h4>
              <p className="font-open-sans text-lg md:text-xl leading-relaxed mb-8 max-w-4xl mx-auto">
                When you partner with Kersten Talent Capital, you're choosing not just to fill a position, but to elevate your organization's trajectory through exceptional leadership fundamentally. That's our foundational promise—and it's why forward-thinking organizations continue to trust us with their most consequential talent decisions.
              </p>
              
              <Link href="/contact-us">
                <div className="inline-block bg-gradient-to-r from-[#71C8F3] to-[#0C6BAF] hover:from-[#71C8F3] hover:to-[#187CC1] text-white font-semibold font-montserrat px-10 py-4 rounded-md text-lg md:text-xl shadow-lg transition-all duration-300">
                  Start Your Transformation
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animations and Styles */}
      <style jsx>{`
        @keyframes slideRight {
          0% { opacity: 0; transform: translateX(-60px); }
          40% { opacity: 1; transform: translateX(0); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        .gradient-text {
          display: inline-block;
          background: linear-gradient(180deg, #0C6BAF 0%, #71C8F3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #0C6BAF;
        }
        
        .gradient-text-white {
          display: inline-block;
          background: linear-gradient(180deg, #71C8F3 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #71C8F3;
        }
        
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
    </main>
  );
} 