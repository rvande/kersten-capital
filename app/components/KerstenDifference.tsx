'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define the features with icons and descriptions
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

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.04, 0.62, 0.23, 0.98],
      delay: 0.2 + (i * 0.15)
    }
  })
};

export default function KerstenDifference() {
  return (
    <section className="relative w-full bg-[#F8F6F3] py-20 md:py-28 overflow-hidden">
      {/* Background design elements */}
      <div className="absolute right-0 top-0 w-full h-full max-w-7xl opacity-5">
        <div 
          className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-[#CA3B2A]"
          style={{ filter: 'blur(120px)' }}
        ></div>
        <div 
          className="absolute left-1/4 bottom-1/4 w-64 h-64 rounded-full bg-[#CA3B2A]"
          style={{ filter: 'blur(100px)' }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div className="flex items-center justify-center mb-3" variants={itemVariants}>
              <svg className="w-6 h-6 text-[#CA3B2A] mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <motion.h3 
                className="font-body text-lg md:text-xl font-medium text-[#3D3939]"
                variants={itemVariants}
              >
                What Makes Us Stand Out
              </motion.h3>
            </motion.div>
            
            <motion.h2 
              className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D3939] mb-6"
              variants={itemVariants}
            >
              The Kersten <span className="text-[#CA3B2A]">Difference</span>
            </motion.h2>
            
            <motion.div 
              className="h-1 w-24 bg-[#CA3B2A] mx-auto mb-12"
              variants={itemVariants}
            />
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {differenceFeatures.map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-5">
                  {feature.icon}
                </div>
                <h3 className="font-cormorant text-xl md:text-2xl font-bold text-[#3D3939] mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-[#3D3939]/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 