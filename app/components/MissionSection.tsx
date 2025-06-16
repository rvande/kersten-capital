'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const mission = {
  mainText: "Kersten Talent Capital strives to revolutionize organizational performance through strategic talent intelligence and executive placement solutions that catalyze growth, innovation, and sustainable competitive advantages for forward-thinking enterprises across global markets.",
};

// Define the difference features with icons and descriptions
const differenceFeatures = [
  {
    title: "Recruit & Retain Top-Notch Global Leaders",
    description: "We identify and secure exceptional leadership talent to drive your organization's growth and success.",
    iconPath: "/tie.svg"
  },
  {
    title: "Validate the Right Match the First Time",
    description: "Our rigorous validation process ensures candidates are the perfect fit for your culture and objectives.",
    iconPath: "/rocket.svg"
  },
  {
    title: "Execute a Partner-Led Growth Approach",
    description: "We work alongside you as strategic partners, committed to your long-term success and organizational growth.",
    iconPath: "/mail.svg"
  },
  {
    title: "Stay Committed through Full Integration",
    description: "We remain engaged throughout the integration process, ensuring successful onboarding and long-term performance.",
    iconPath: "/phone.svg"
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
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.04, 0.62, 0.23, 0.98],
      delay: 0.3 + (i * 0.15),
      scale: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  })
};

const cardHoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -180
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.5
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function MissionSection() {
  const [elementTop, setElementTop] = useState(0);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      setElementTop(ref.current.offsetTop);
    }
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(
    scrollY, 
    [elementTop - 500, elementTop - 200], 
    [0, 1]
  );
  
  const backgroundScale = useTransform(
    scrollY,
    [elementTop - 600, elementTop],
    [1.1, 1]
  );

  // Handle keyboard navigation for feature cards
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActivePoint(activePoint === index ? null : index);
    }
    // Add arrow key navigation
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (index + 1) % differenceFeatures.length;
      const nextElement = document.querySelector(`[data-feature-index="${nextIndex}"]`) as HTMLElement;
      nextElement?.focus();
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = (index - 1 + differenceFeatures.length) % differenceFeatures.length;
      const prevElement = document.querySelector(`[data-feature-index="${prevIndex}"]`) as HTMLElement;
      prevElement?.focus();
    }
    if (event.key === 'Home') {
      event.preventDefault();
      const firstElement = document.querySelector('[data-feature-index="0"]') as HTMLElement;
      firstElement?.focus();
    }
    if (event.key === 'End') {
      event.preventDefault();
      const lastElement = document.querySelector(`[data-feature-index="${differenceFeatures.length - 1}"]`) as HTMLElement;
      lastElement?.focus();
    }
  };
  
  return (
    <section 
      className="relative w-full bg-white py-6 md:py-6 lg:py-6"
      aria-labelledby="mission-heading"
      role="region"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8" ref={ref}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Mission Section with Image and Content */}
          <article className="flex flex-col lg:flex-row lg:items-center lg:gap-16 mb-20 md:mb-32">
            {/* Chess Image - Left Side */}
            <motion.div 
              className="lg:w-1/2 mb-10 lg:mb-0"
              variants={itemVariants}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="/chess.jpg" 
                  alt="Strategic chess pieces on board representing strategic talent acquisition and business planning" 
                  width={600} 
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
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
                  Kersten Talent Capital
                </span>
              </motion.div>

              <motion.h2 
                id="mission-heading"
                className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-6 leading-tight"
                variants={itemVariants}
              >
                Our Mission
              </motion.h2>

              {/* Accent shape underline */}
              <motion.div 
                className="flex justify-center lg:justify-start mb-6"
                variants={itemVariants}
                aria-hidden="true"
              >
                <svg 
                  width="300" 
                  height="12" 
                  viewBox="0 0 627 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-64 h-6 md:w-72 md:h-6 lg:w-80 lg:h-7"
                  aria-hidden="true"
                >
                  <path d="M5.1661 0H626.166L5.1661 16C-1.18851 9.74819 -2.23569 6.25249 5.1661 0Z" fill="#0C6BAF"/>
                </svg>
              </motion.div>

              <motion.p
                className="font-open-sans text-base md:text-lg lg:text-xl text-black leading-relaxed mb-8 md:mb-10"
                variants={itemVariants}
                style={{ lineHeight: '1.7' }}
              >
                {mission.mainText}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <Link 
                  href="/about-us"
                  className="bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] hover:from-[#187CC1] hover:to-[#71C8F3] text-white font-semibold font-montserrat px-8 py-4 rounded-md text-lg shadow-md transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:ring-offset-2"
                  aria-label="Learn more about Kersten Talent Capital"
                >
                  About Us
                </Link>
                <Link 
                  href="/contact-us"
                  className="border-2 border-[#0C6BAF] text-[#0C6BAF] hover:bg-[#0C6BAF] hover:text-white font-semibold font-montserrat px-8 py-4 rounded-md text-lg transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:ring-offset-2"
                  aria-label="Contact us to discuss your talent needs"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </article>

          {/* What Makes Us Different Section */}
          <section aria-labelledby="difference-heading">
            <motion.div 
              className="text-center mb-16 md:mb-20"
              variants={itemVariants}
            >
              <h3 
                id="difference-heading"
                className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-6 leading-tight"
              >
                What Makes Us Different
              </h3>
              <p className="font-open-sans text-lg md:text-xl text-black/80 max-w-4xl mx-auto leading-relaxed">
                Our comprehensive approach combines deep industry expertise with innovative methodologies to deliver exceptional results.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
              role="list"
              aria-label="Key differentiating features"
            >
              {differenceFeatures.map((feature, index) => (
                <motion.article
                  key={index}
                  custom={index}
                  variants={prefersReducedMotion ? {} : cardVariants}
                  whileHover={prefersReducedMotion ? {} : "hover"}
                  whileTap={prefersReducedMotion ? {} : "tap"}
                  className="group relative"
                  role="listitem"
                >
                  <motion.div 
                    variants={prefersReducedMotion ? {} : cardHoverVariants}
                    className="bg-[#002C5F] rounded-2xl p-8 lg:p-10 shadow-lg hover:shadow-2xl border border-[#005A9C] hover:border-[#71C8F3] hover:border-2 transition-all duration-500 cursor-pointer focus-within:ring-4 focus-within:ring-[#71C8F3] focus-within:ring-offset-2 focus:outline-none"
                    tabIndex={0}
                    data-feature-index={index}
                    onClick={() => setActivePoint(activePoint === index ? null : index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    role="button"
                    aria-expanded={activePoint === index}
                    aria-describedby={`feature-description-${index}`}
                    aria-label={`Learn more about ${feature.title}. Use arrow keys to navigate between features.`}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        variants={prefersReducedMotion ? {} : iconVariants}
                        whileHover={prefersReducedMotion ? {} : "hover"}
                        className="w-20 h-20 bg-gradient-to-br from-[#0C6BAF] to-[#71C8F3] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 p-4"
                        aria-hidden="true"
                      >
                        <Image 
                          src={feature.iconPath} 
                          alt="" 
                          width={48} 
                          height={48}
                          className="w-12 h-12 object-contain filter brightness-0 invert"
                          role="presentation"
                        />
                      </motion.div>
                    </div>
                    
                    {/* Title */}
                    <motion.h4 
                      className="font-montserrat text-xl md:text-2xl font-black text-white mb-4 text-center leading-tight"
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? {} : { delay: 0.6 + (index * 0.1), duration: 0.5 }}
                    >
                      {feature.title}
                    </motion.h4>
                    
                    {/* Description */}
                    <motion.p 
                      id={`feature-description-${index}`}
                      className="font-open-sans text-base md:text-lg text-white/90 text-center leading-relaxed font-semibold"
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? {} : { delay: 0.7 + (index * 0.1), duration: 0.5 }}
                    >
                      {feature.description}
                    </motion.p>

                    {/* Hover indicator */}
                    <motion.div 
                      className={`mt-6 flex justify-center transition-opacity duration-300 ${
                        activePoint === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
                      }`}
                      aria-hidden="true"
                      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                      animate={prefersReducedMotion ? {} : { 
                        opacity: activePoint === index ? 1 : 0,
                        scale: activePoint === index ? 1 : 0.8
                      }}
                      whileHover={prefersReducedMotion ? {} : {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.3 }
                      }}
                      transition={prefersReducedMotion ? {} : { duration: 0.3 }}
                    >
                      <div className="w-12 h-1 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] rounded-full"></div>
                    </motion.div>

                    {/* Screen reader only expanded content indicator */}
                    <div className="sr-only" aria-live="polite">
                      {activePoint === index ? "Feature details expanded" : "Feature details collapsed"}
                    </div>
                  </motion.div>
                </motion.article>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </section>
  );
} 