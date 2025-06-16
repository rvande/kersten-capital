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
  const [logoError, setLogoError] = React.useState(false);

  return (
    <section 
      className="relative w-full bg-white pb-16 md:pb-24"
      aria-labelledby="value-proposition-heading"
      role="region"
    >
      <div className="container-content">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header Section */}
          <header className="text-center container-text mb-8 md:mb-16 lg:mb-24">
            {/* Kersten Logo */}
            <motion.div 
              className="flex justify-center mb-8 md:mb-12"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
               
                  <Image 
                    src="/kersten-logo.jpg" 
                    alt="Kersten Talent Capital Logo" 
                    width={300} 
                    height={120}
                    className="w-auto h-20 md:h-24 lg:h-28 max-w-full object-contain"
                    priority
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                    onError={(e) => {
                      console.error('Failed to load Kersten logo:', e);
                      setLogoError(true);
                    }}
                  />
              </div>
            </motion.div>

            <motion.h2 
              id="value-proposition-heading"
              className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-black mb-8 text-heading"
              variants={itemVariants}
            >
              Our Value Proposition
            </motion.h2>
            
            <motion.p
              className="font-open-sans text-lg md:text-xl lg:text-2xl text-secondary text-body"
              variants={itemVariants}
              role="heading"
              aria-level={3}
            >
              For organizational leaders who understand that company growth and valuation hinge on securing top talent, we deliver results when others cannot.
            </motion.p>
          </header>

          {/* Accelerated Process Section */}
          <motion.article 
            className="flex flex-col lg:flex-row lg:items-center lg:gap-16 mb-4 md:mb-8 lg:mb-16"
            variants={itemVariants}
            aria-labelledby="accelerated-process-heading"
          >
            {/* Conference Room Image - Show first on mobile, right side on desktop */}
            <div className="lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
              <motion.div 
                className="rounded-2xl overflow-hidden card-shadow-md interactive-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                role="img"
                aria-label="Conference room meeting representing accelerated team-building process"
              >
                <Image 
                  src="/teambuilding.jpg" 
                  alt="Professional team meeting in modern conference room discussing strategic planning" 
                  width={600} 
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>

            {/* Text Content - Show second on mobile, left side on desktop */}
            <div className="lg:w-1/2 order-2 lg:order-1 mobile-spacing-normal lg:px-0">
              <h3 
                id="accelerated-process-heading"
                className="font-montserrat text-3xl md:text-4xl font-black text-[#002c5f] mb-6 text-heading"
              >
                Accelerated Process
              </h3>
              
              <div className="space-y-4" role="region" aria-labelledby="accelerated-process-heading">
                <p className="font-open-sans text-base md:text-lg text-secondary text-body">
                  We accelerate your team-building process through our proven recruiting techniques, industry expertise, and cutting-edge data intelligence tools.
                </p>
                
                <p className="font-open-sans text-base md:text-lg text-secondary text-body">
                  Unlike traditional consultants, we possess deep domain knowledge across back-office operations, sales, marketing, and enterprise systems, eliminating the lengthy hiring timelines you've experienced before.
                </p>
              </div>
            </div>
          </motion.article>

          {/* Bottom-Line Impact Section */}
          <motion.article 
            className="flex flex-col lg:flex-row-reverse lg:items-center lg:gap-16"
            variants={itemVariants}
            aria-labelledby="bottom-line-impact-heading"
          >
            {/* Financial Chart Image - Show first on mobile, left side on desktop */}
            <div className="lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
              <motion.div 
                className="rounded-2xl overflow-hidden card-shadow-md interactive-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                role="img"
                aria-label="Financial chart showing bottom-line impact and growth"
              >
                <Image 
                  src="/stocks.jpg" 
                  alt="Financial growth chart displaying upward trending business metrics and performance indicators" 
                  width={600} 
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>

            {/* Text Content - Show second on mobile, right side on desktop */}
            <div className="lg:w-1/2 order-2 lg:order-1 mobile-spacing-normal lg:px-0">
              <h3 
                id="bottom-line-impact-heading"
                className="font-montserrat text-3xl md:text-4xl font-black text-[#002c5f] mb-6 text-heading"
              >
                Bottom-Line Impact
              </h3>
              
              <div className="space-y-4" role="region" aria-labelledby="bottom-line-impact-heading">
                <p className="font-open-sans text-base md:text-lg text-secondary text-body">
                  Kersten Talent Capital provides high-growth companies with a strategic talent acquisition advantage that directly impacts their bottom line.
                </p>
                
                <p className="font-open-sans text-base md:text-lg text-secondary text-body">
                  Partner with us to transform your hiring capabilities and unlock your organization's full potential.
                </p>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
} 