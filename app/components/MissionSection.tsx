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
    icon: (
      <svg className="w-12 h-12 text-[#CA3B2A]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 22V8L12 2L21 8V22H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 22V11H6V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 13L12 7L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 17L12 14L15 17L12 20L9 17Z" fill="currentColor" />
      </svg>
    )
  },
  {
    title: "Validate the Right Match the First Time",
    description: "Our rigorous validation process ensures candidates are the perfect fit for your culture and objectives.",
    icon: (
      <svg className="w-12 h-12 text-[#CA3B2A]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 16.5L19.5 20M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 10.5L8.5 13L15 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Execute a Partner-Led Growth Approach",
    description: "We work alongside you as strategic partners, committed to your long-term success and organizational growth.",
    icon: (
      <svg className="w-12 h-12 text-[#CA3B2A]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H15M9 17L12 21M9 17L12 13M15 17L12 21M15 17L12 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 7H17M7 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Stay Committed through Full Integration",
    description: "We remain engaged throughout the integration process, ensuring successful onboarding and long-term performance.",
    icon: (
      <svg className="w-12 h-12 text-[#CA3B2A]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

export default function MissionSection() {
  const [elementTop, setElementTop] = useState(0);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
  
  const backgroundScale = useTransform(
    scrollY,
    [elementTop - 600, elementTop],
    [1.1, 1]
  );
  
  return (
    <section className="relative w-full bg-white py-6 md:py-6 lg:py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8" ref={ref}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Mission Section with Image and Content */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 mb-20 md:mb-32">
            {/* Chess Image - Left Side */}
            <motion.div 
              className="lg:w-1/2 mb-10 lg:mb-0"
              variants={itemVariants}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="/chess.jpg" 
                  alt="Strategic talent acquisition represented by chess pieces" 
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
                className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-6 leading-tight"
                variants={itemVariants}
              >
                Our Mission
              </motion.h2>

              {/* Accent shape underline */}
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
                <Link href="/about">
                  <div className="bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] hover:from-[#187CC1] hover:to-[#71C8F3] text-white font-semibold font-montserrat px-8 py-4 rounded-md text-lg shadow-md transition-all duration-300 text-center">
                    About Us
                  </div>
                </Link>
                <Link href="/contact">
                  <div className="bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] hover:from-[#187CC1] hover:to-[#71C8F3] text-white font-semibold font-montserrat px-8 py-4 rounded-md text-lg shadow-md transition-all duration-300 text-center">
                    Contact Us
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

       
        </motion.div>
      </div>
    </section>
  );
} 