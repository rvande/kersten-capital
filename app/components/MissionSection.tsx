'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

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
      staggerChildren: 0.3,
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
    <section className="relative w-full bg-gradient-to-b from-[#323230] via-[#262624] to-[#1a1a18] py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      {/* Colored Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8A2C24] via-[#B9453A] to-[#CA3B2A]"></div>
      
      <motion.div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#323230]/20 via-[#262624]/15 to-[#1a1a18]/25"
        style={{ scale: backgroundScale }}
      />
      
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10" ref={ref}>
        <motion.div 
          className="md:max-w-4xl lg:max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4"
              variants={itemVariants}
              style={{ opacity }}
            >
              Our Mission
            </motion.h2>
            <motion.div 
              className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-[#8A2C24] via-[#B9453A] to-[#CA3B2A] mx-auto mb-10"
              variants={itemVariants}
            />
            <motion.p
              className="font-body text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-12"
              variants={itemVariants}
            >
              {mission.mainText}
            </motion.p>
          </div>

          {/* The Kersten Difference */}
          <motion.div className="text-center mb-14" variants={itemVariants}>
            <h3 className="font-cormorant text-4xl md:text-4xl font-bold text-white mb-4">
              The Kersten <span className="text-[#CA3B2A]">Difference</span>
            </h3>
            <div className="h-0.5 w-20 bg-gradient-to-r from-[#8A2C24] via-[#B9453A] to-[#CA3B2A] mx-auto mb-2"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-3">
            {differenceFeatures.map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`bg-gradient-to-br from-[#F8F6F3] to-[#EFEAE3] rounded-lg p-5 transform transition-all duration-300 shadow-md hover:shadow-xl ${activePoint === i ? 'scale-105' : ''}`}
                onMouseEnter={() => setActivePoint(i)}
                onMouseLeave={() => setActivePoint(null)}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-[#3A3532] mb-3 text-center">{feature.title}</h3>
                <p className="font-body text-[#3D3939] leading-relaxed text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 