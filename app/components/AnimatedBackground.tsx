'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Chart data for performance comparison
const chartData = [
  { label: 'Time to Placement (Days)', ourValue: 75, industryValue: 120, color: '#0C6BAF' },
  { label: 'Success Rate (%)', ourValue: 95, industryValue: 75, color: '#187CC1' },
  { label: 'Client Retention (%)', ourValue: 85, industryValue: 60, color: '#005A9C' },
  { label: 'C-Suite Placements (%)', ourValue: 60, industryValue: 35, color: '#71C8F3' },
  { label: 'Response Time (Hours)', ourValue: 5, industryValue: 25, color: '#0C6BAF' },
];

// Custom hook for counting animation
function useCountUp(end: number, duration: number = 800, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (end - startValue) * easeOutQuart;
      
      setCount(Math.floor(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);

  return count;
}

// Animated metric card component
function AnimatedMetricCard({ icon, title, value, suffix, description, delay }: {
  icon: React.ReactNode;
  title: string;
  value: number;
  suffix: string;
  description: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const animatedValue = useCountUp(value, 2000, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="bg-[#002C5F] backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 text-center shadow-2xl border border-[#0C6BAF]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="mb-3 sm:mb-4 md:mb-6"
      >
        <div className="flex justify-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
            {icon}
          </div>
        </div>
      </motion.div>
      <h3 className="font-montserrat font-black text-white text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4 leading-tight">{title}</h3>
      <motion.div
        className="font-montserrat font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#71C8F3] mb-2 sm:mb-3 md:mb-4"
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : { scale: 0.5 }}
        transition={{ duration: 0.8, delay: delay + 0.4 }}
      >
        {animatedValue}{suffix}
      </motion.div>
      <p className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function PerformanceChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#0C6BAF]"></div>
            <span className="font-montserrat font-semibold text-gray-700 text-xs sm:text-sm md:text-base">Our Performance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-400"></div>
            <span className="font-montserrat font-semibold text-gray-700 text-xs sm:text-sm md:text-base">Industry Average</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {chartData.map((item, index) => {
          const maxValue = Math.max(item.ourValue, item.industryValue);
          const ourPercentage = (item.ourValue / maxValue) * 100;
          const industryPercentage = (item.industryValue / maxValue) * 100;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="space-y-2 sm:space-y-3"
            >
              <h4 className="font-montserrat font-semibold text-xs sm:text-sm md:text-base text-gray-700 mb-1 sm:mb-2">
                {item.label}
              </h4>
              
              <div className="space-y-1 sm:space-y-2">
                {/* Our Performance Bar */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-12 sm:w-16 md:w-20 text-right flex-shrink-0">
                    <span className="font-montserrat font-bold text-[#0C6BAF] text-xs sm:text-sm">
                      {item.ourValue}{item.label.includes('(%)') ? '%' : item.label.includes('Days') || item.label.includes('Hours') ? '' : '%'}
                    </span>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 sm:h-5 md:h-6 relative overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`
                      }}
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: `${ourPercentage}%` } : { width: "0%" }}
                      transition={{ duration: 1.5, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {/* Industry Average Bar */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-12 sm:w-16 md:w-20 text-right flex-shrink-0">
                    <span className="font-montserrat font-bold text-gray-500 text-xs sm:text-sm">
                      {item.industryValue}{item.label.includes('(%)') ? '%' : item.label.includes('Days') || item.label.includes('Hours') ? '' : '%'}
                    </span>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 sm:h-5 md:h-6 relative overflow-hidden">
                    <motion.div 
                      className="h-full bg-gray-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: `${industryPercentage}%` } : { width: "0%" }}
                      transition={{ duration: 1.5, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function AnimatedBackground() {
  const headingRef = useRef(null);
  const benchmarksRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });
  const isBenchmarksInView = useInView(benchmarksRef, { once: true, margin: "-50px" });

  return (
    <section className="relative w-full overflow-hidden lg:mt-10">
      {/* Diagonal SVG Overlay - Top */}
      <div className="absolute left-0 right-0 h-full w-full pointer-events-none select-none z-20">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="100%" 
          height="135px" 
          viewBox="0 0 1280 140" 
          preserveAspectRatio="none"
          className="w-full h-[79px] md:h-[130px] rotate-180"
        >
          <g fill="#002c5f">
            <path d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z" />
            <path d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* Clean Animated Gradient Background */}
      <div className="relative">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #002C5F 0%, #0C6BAF 25%, #187CC1 50%, #005A9C 75%, #002C5F 100%)',
            backgroundSize: '300% 300%',
            animation: 'gentleGradient 8s ease-in-out infinite',
            minHeight: '100vh'
          }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center py-24 sm:py-28 md:py-32 lg:py-36 xl:py-40">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
            {/* Heading */}
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 50 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
            >
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 px-4"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                }}
                initial={{ scale: 0.9 }}
                animate={isHeadingInView ? { scale: 1 } : { scale: 0.9 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                Executive Search Excellence
              </motion.h2>
            </motion.div>
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
              <AnimatedMetricCard
                icon={<svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>}
                title="Time to Placement"
                value={75}
                suffix=""
                description="Average days vs industry standard of 120+ days"
                delay={0.1}
              />

              <AnimatedMetricCard
                icon={<svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>}
                title="Success Rate"
                value={95}
                suffix="%"
                description="Successful placements with 2+ year retention"
                delay={0.2}
              />

              <AnimatedMetricCard
                icon={<svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>}
                title="Global Network"
                value={25}
                suffix="+"
                description="Countries covered through strategic partnerships"
                delay={0.3}
              />

              <AnimatedMetricCard
                icon={<svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>}
                title="C-Suite Focus"
                value={60}
                suffix="%"
                description="Of placements are C-level, COO, CFO-level roles"
                delay={0.4}
              />

              <AnimatedMetricCard
                icon={<svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>}
                title="Client Retention"
                value={85}
                suffix="%"
                description="Repeat client engagement rate"
                delay={0.5}
              />

              <AnimatedMetricCard
                icon={<svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>}
                title="Candidate Pipeline"
                value={500}
                suffix="K+"
                description="Senior executives in proprietary database"
                delay={0.6}
              />
            </div>

            {/* Performance vs Industry Benchmarks */}
            <motion.div
              ref={benchmarksRef}
              initial={{ opacity: 0, y: 60 }}
              animate={isBenchmarksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white/98 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 shadow-2xl max-w-6xl mx-auto border border-white/20"
            >
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                animate={isBenchmarksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-montserrat font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#002C5F] text-center mb-4 sm:mb-6 md:mb-8"
              >
                Performance vs Industry Benchmarks
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isBenchmarksInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-8 sm:mb-10 md:mb-12"
              >
                <p className="font-open-sans text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed max-w-4xl mx-auto px-2" role="heading" aria-level={3}>
                  Our proven methodology consistently outperforms industry standards across all key metrics, 
                  delivering exceptional results for our clients in executive placement and retention.
                </p>
              </motion.div>
              
              {/* Performance Chart */}
              <PerformanceChart />
            </motion.div>
          </div>
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
            className="w-full h-[75px] md:h-[130px]"
          >
            <g fill="#002c5f">
              {/* First layer with transparency */}
              <path 
                d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z" 
                
              />
              {/* Second layer solid */}
              <path 
                d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z" 
                fill="#ffffff"
              />
            </g>
          </svg>
        </div>

      {/* Simple CSS animation */}
      <style jsx>{`
        @keyframes gentleGradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}

