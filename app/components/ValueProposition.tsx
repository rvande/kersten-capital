'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

export default function ValueProposition() {
  return (
    <section className="relative w-full bg-white section-padding-md">
      <div className="container-content">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header Section */}
          <div className="text-center container-text mb-16 md:mb-24">
            <motion.h2 
              className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-8 text-heading"
              variants={itemVariants}
            >
              Our Value Proposition
            </motion.h2>
            
            <motion.p
              className="font-open-sans text-lg md:text-xl lg:text-2xl text-secondary text-body"
              variants={itemVariants}
            >
              For organizational leaders who understand that company growth and valuation hinge on securing top talent, we deliver results when others cannot.
            </motion.p>
          </div>

          {/* Accelerated Process Section */}
          <motion.div 
            className="flex flex-col lg:flex-row lg:items-center lg:gap-16 mb-16 md:mb-24"
            variants={itemVariants}
          >
            {/* Text Content - Left Side */}
            <div className="lg:w-1/2 mb-8 lg:mb-0 mobile-spacing-normal lg:px-0">
              <h3 className="font-montserrat text-3xl md:text-4xl font-black text-[#002c5f] mb-6 text-heading">
                Accelerated Process
              </h3>
              
              <div className="space-y-4">
                <p className="font-open-sans text-base md:text-lg text-secondary text-body">
                  We accelerate your team-building process through our proven recruiting techniques, industry expertise, and cutting-edge data intelligence tools.
                </p>
                
                <p className="font-open-sans text-base md:text-lg text-secondary text-body">
                  Unlike traditional consultants, we possess deep domain knowledge across back-office operations, sales, marketing, and enterprise systems, eliminating the lengthy hiring timelines you've experienced before.
                </p>
              </div>
            </div>

            {/* Conference Room Image - Right Side */}
            <div className="lg:w-1/2">
              <motion.div 
                className="rounded-2xl overflow-hidden card-shadow-md interactive-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Image 
                  src="/teambuilding.jpg" 
                  alt="Conference room meeting representing accelerated team-building process" 
                  width={600} 
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom-Line Impact Section */}
          <motion.div 
            className="flex flex-col lg:flex-row-reverse lg:items-center lg:gap-16"
            variants={itemVariants}
          >
            {/* Text Content - Right Side */}
            <div className="lg:w-1/2 mb-8 lg:mb-0 mobile-spacing-normal lg:px-0">
              <h3 className="font-montserrat text-3xl md:text-4xl font-black text-[#002c5f] mb-6 text-heading">
                Bottom-Line Impact
              </h3>
              
              <div className="space-y-4">
                <p className="font-open-sans text-base md:text-lg text-secondary text-body">
                  Kersten Talent Capital provides high-growth companies with a strategic talent acquisition advantage that directly impacts their bottom line.
                </p>
                
                <p className="font-open-sans text-base md:text-lg text-secondary text-body">
                  Partner with us to transform your hiring capabilities and unlock your organization's full potential.
                </p>
              </div>
            </div>

            {/* Financial Chart Image - Left Side */}
            <div className="lg:w-1/2">
              <motion.div 
                className="rounded-2xl overflow-hidden card-shadow-md interactive-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Image 
                  src="/stocks.jpg" 
                  alt="Financial chart showing bottom-line impact and growth" 
                  width={600} 
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 