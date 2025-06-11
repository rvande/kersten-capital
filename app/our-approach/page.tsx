'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaSearch, 
  FaAward, 
  FaHandshake, 
  FaUsers, 
  FaCrosshairs, 
  FaListUl, 
  FaRocket,
  FaChartLine,
  FaBullseye,
  FaCogs,
  FaLightbulb
} from 'react-icons/fa';

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

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.04, 0.62, 0.23, 0.98] 
    }
  }
};

const searchMethodCardVariants = {
  hidden: { opacity: 0, x: -100, scale: 0.8 },
  visible: (index: number) => ({ 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 1.0,
      delay: index * 2.0,
      ease: [0.04, 0.62, 0.23, 0.98] 
    }
  })
};

export default function OurApproachPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/approach.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#002C5F]/50 via-[#0C6BAF]/40 to-[#187CC1]/50 z-10" />

        {/* Main Content */}
        <div className="relative z-20 flex flex-col h-[80vh] sm:h-[70vh] md:h-[80vh] w-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col justify-start md:justify-center h-full md:items-start items-center md:text-left text-center max-w-5xl pt-16 md:pt-0 md:-mt-5">
            {/* Main headline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-6 md:mb-8">
              <h1
                className="relative font-montserrat text-[2.5rem] md:text-[4.5rem] lg:text-[6rem] leading-tight font-black text-white drop-shadow-lg flex items-center"
                style={{
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  animation: isLoaded ? 'slideRight 1.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
                }}
              >
                <svg 
                  className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 mr-4 md:mr-6 text-white drop-shadow-lg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
                Our Approach
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
              <p className="max-w-4xl md:text-left text-center text-white font-open-sans font-normal text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                Precision-driven executive search that aligns leadership excellence with your strategic vision
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



      {/* Our Fit-for-Purpose Assessment Section */}
      <section className="relative w-full bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-8 leading-tight"
              variants={itemVariants}
            >
              Our Fit-for-Purpose Assessment
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
              className="font-open-sans text-lg md:text-xl text-gray-700 leading-relaxed mb-16 max-w-5xl mx-auto"
              variants={itemVariants}
              style={{ lineHeight: '1.7' }}
            >
              A truly great executive is not defined by background alone. With this in mind, we work at the intersection of various areas of fit and expertise to align our executive search with your organization's aspirations. Analyzing how a candidate's skill set aligns with their leadership style and your brand's values, we ensure that their technical mastery and strategic vision both fulfill your future business goals. This balanced assessment ensures that each hire meets a client where they are and will remain relevant for where they are looking to go.
            </motion.p>
          </motion.div>

          {/* Venn Diagram Assessment */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="relative"
          >
            {/* Cards Above Image on Mobile */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Top Left - Company Values */}
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-[#0C6BAF] to-[#187CC1] text-white p-5 rounded-xl shadow-lg border border-[#005A9C]/20"
              >
                <h4 className="font-montserrat font-bold text-white text-sm mb-3 uppercase tracking-wide">
                  Aligning With Your Company Values
                </h4>
                <ul className="text-sm space-y-2 text-white/90">
                  <li>• Vision</li>
                  <li>• Mission, Goals & Roadmap</li>
                  <li>• Strategy & approach to delivery</li>
                  <li>• Company structure & key business processes</li>
                  <li>• Strategic challenges</li>
                </ul>
              </motion.div>

              {/* Top Right - Tech Stack */}
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-bl from-[#187CC1] to-[#005A9C] text-white p-5 rounded-xl shadow-lg border border-[#0C6BAF]/20"
              >
                <h4 className="font-montserrat font-bold text-white text-sm mb-3 uppercase tracking-wide">
                  Aligning With Your Tech Stack
                </h4>
                <ul className="text-sm space-y-2 text-white/90">
                  <li>• Technical knowledge</li>
                  <li>• Expertise in technical areas</li>
                  <li>• Problem solving & analytical experience</li>
                  <li>• Breadth of business experience</li>
                  <li>• Grasp of current "best practices" approach</li>
                </ul>
              </motion.div>
            </div>

            {/* Main Venn Diagram Container */}
            <div className="relative max-w-3xl mx-auto">
              {/* Kersten Difference Image */}
              <div className="relative w-full">
                <Image
                  src="/kersten-dif.jpg"
                  alt="Kersten Talent Capital Fit-for-Purpose Assessment Framework"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Desktop Corner Information Boxes */}
              <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none">
                {/* Top Left - Company Values */}
                <motion.div 
                  variants={itemVariants}
                  className="absolute -top-8 -left-25 bg-gradient-to-br from-[#0C6BAF] to-[#187CC1] text-white p-5 rounded-xl shadow-lg max-w-sm pointer-events-auto border border-[#005A9C]/20"
                >
                  <h4 className="font-montserrat font-bold text-white text-sm mb-3 uppercase tracking-wide">
                    Aligning With Your Company Values
                  </h4>
                  <ul className="text-sm space-y-2 text-white/90">
                    <li>• Vision</li>
                    <li>• Mission, Goals & Roadmap</li>
                    <li>• Strategy & approach to delivery</li>
                    <li>• Company structure & key business processes</li>
                    <li>• Strategic challenges</li>
                  </ul>
                </motion.div>

                {/* Top Right - Tech Stack */}
                <motion.div 
                  variants={itemVariants}
                  className="absolute -top-8 -right-2 bg-gradient-to-bl from-[#187CC1] to-[#005A9C] text-white p-5 rounded-xl shadow-lg max-w-sm pointer-events-auto border border-[#0C6BAF]/20"
                >
                  <h4 className="font-montserrat font-bold text-white text-sm mb-3 uppercase tracking-wide">
                    Aligning With Your Tech Stack
                  </h4>
                  <ul className="text-sm space-y-2 text-white/90">
                    <li>• Technical knowledge</li>
                    <li>• Expertise in technical areas</li>
                    <li>• Problem solving & analytical experience</li>
                    <li>• Breadth of business experience</li>
                    <li>• Grasp of current "best practices" approach</li>
                  </ul>
                </motion.div>

                {/* Bottom Left - Company Culture */}
                <motion.div 
                  variants={itemVariants}
                  className="absolute -bottom-8 -left-35 bg-gradient-to-tr from-[#005A9C] to-[#0C6BAF] text-white p-5 rounded-xl shadow-lg max-w-sm pointer-events-auto border border-[#187CC1]/20"
                >
                  <h4 className="font-montserrat font-bold text-white text-sm mb-3 uppercase tracking-wide">
                    Aligning With Your Company Culture
                  </h4>
                  <ul className="text-sm space-y-2 text-white/90">
                    <li>• What is the organizational culture of the executive team?</li>
                    <li>• What is the level of continuity?</li>
                    <li>• How does the candidate fit into the existing team culture?</li>
                    <li>• What traits to be accommodated or harnessed given the cultural fit expectations</li>
                    <li>• Are you hiring for change or continuity?</li>
                  </ul>
                </motion.div>

                {/* Bottom Right - Leadership Goals */}
                <motion.div 
                  variants={itemVariants}
                  className="absolute -bottom-8 -right-25 bg-gradient-to-tl from-[#71C8F3] to-[#0C6BAF] text-white p-5 rounded-xl shadow-lg max-w-sm pointer-events-auto border border-[#187CC1]/20"
                >
                  <h4 className="font-montserrat font-bold text-white text-sm mb-3 uppercase tracking-wide">
                    Aligning With Your Leadership Goals
                  </h4>
                  <ul className="text-sm space-y-2 text-white/90">
                    <li>• Ability to drive business competencies to lead to performance</li>
                    <li>• Organizational agility</li>
                    <li>• Competitive-bar business acumen</li>
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Cards Below Image on Mobile */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {/* Bottom Left - Company Culture */}
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-tr from-[#005A9C] to-[#0C6BAF] text-white p-5 rounded-xl shadow-lg border border-[#187CC1]/20"
              >
                <h4 className="font-montserrat font-bold text-white text-sm mb-3 uppercase tracking-wide">
                  Aligning With Your Company Culture
                </h4>
                <ul className="text-sm space-y-2 text-white/90">
                  <li>• What is the organizational culture of the executive team?</li>
                  <li>• What is the level of continuity?</li>
                  <li>• How does the candidate fit into the existing team culture?</li>
                  <li>• What traits to be accommodated or harnessed given the cultural fit expectations</li>
                  <li>• Are you hiring for change or continuity?</li>
                </ul>
              </motion.div>

              {/* Bottom Right - Leadership Goals */}
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-tl from-[#71C8F3] to-[#0C6BAF] text-white p-5 rounded-xl shadow-lg border border-[#187CC1]/20"
              >
                <h4 className="font-montserrat font-bold text-white text-sm mb-3 uppercase tracking-wide">
                  Aligning With Your Leadership Goals
                </h4>
                <ul className="text-sm space-y-2 text-white/90">
                  <li>• Ability to drive business competencies to lead to performance</li>
                  <li>• Organizational agility</li>
                  <li>• Competitive-bar business acumen</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Our Search Method Section */}
      <section className="relative w-full stylish-pattern-bg py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-8 leading-tight"
              variants={itemVariants}
            >
              Our Search Method
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
              className="font-open-sans text-lg md:text-xl text-gray-700 leading-relaxed mb-16 max-w-5xl mx-auto"
              variants={itemVariants}
              style={{ lineHeight: '1.7' }}
            >
              From Identification to Selection, our tailored search methodology is designed to find and evaluate candidates based on both their experience and your business goals. Whether you're looking for a short-term or long-term leadership placement, we combine a deep understanding of your business and industry with a holistic, multi-stage assessment that is simultaneously more comprehensive and more efficient than our competitors.
            </motion.p>
          </motion.div>

          {/* Search Method Process Diagram */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="relative"
          >
            {/* Process Timeline */}
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              {/* Phase 1: Identification Process */}
              <motion.div 
                variants={searchMethodCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={0}
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Connection Arrow - Desktop Only */}
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex items-center"
                  >
                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#0C6BAF] to-[#187CC1]"></div>
                    <div className="w-0 h-0 border-l-8 border-l-[#187CC1] border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </motion.div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0C6BAF]/5 to-[#71C8F3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Header */}
                  <div className="relative text-center mb-8">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-[#0C6BAF] to-[#187CC1] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      initial={{ rotate: 0 }}
                      whileInView={{ rotate: 360 }}
                      whileHover={{ rotate: 720 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        whileInView: { duration: 1.5, delay: 1.0, ease: "easeInOut" },
                        whileHover: { duration: 0.6, ease: "easeInOut" }
                      }}
                    >
                      <FaSearch className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="font-montserrat text-2xl font-bold text-[#002C5F] mb-2 group-hover:text-[#0C6BAF] transition-colors duration-300">
                      Identification Process
                    </h3>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-8 h-1 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] rounded-full"></div>
                      <p className="text-[#0C6BAF] font-montserrat font-bold text-lg">Weeks 1-5</p>
                      <div className="w-8 h-1 bg-gradient-to-r from-[#71C8F3] to-[#0C6BAF] rounded-full"></div>
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div className="relative space-y-6">
                    {/* Market Research */}
                    <motion.div 
                      className="bg-gradient-to-r from-[#0C6BAF] to-[#187CC1] text-white p-5 rounded-xl relative overflow-hidden group shadow-lg"
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="relative flex items-center space-x-4">
                        <motion.div 
                          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.4 }}
                        >
                          <FaCrosshairs className="w-6 h-6" />
                        </motion.div>
                        <span className="font-montserrat font-bold text-lg">Market Research</span>
                      </div>
                    </motion.div>

                    {/* Target Screening */}
                    <motion.div 
                      className="bg-gradient-to-r from-[#187CC1] to-[#005A9C] text-white p-5 rounded-xl relative overflow-hidden group shadow-lg ml-8"
                      whileHover={{ scale: 1.05, rotateY: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="relative flex items-center space-x-4">
                        <motion.div 
                          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: -180 }}
                          transition={{ duration: 0.4 }}
                        >
                          <FaBullseye className="w-6 h-6" />
                        </motion.div>
                        <span className="font-montserrat font-bold text-lg">Target Screening</span>
                      </div>
                    </motion.div>

                    {/* Outcome Boxes */}
                    <div className="grid grid-cols-1 gap-4">
                      <motion.div 
                        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-l-4 border-[#0C6BAF] hover:shadow-md transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <h4 className="font-montserrat font-bold text-[#002C5F] text-lg">Profile Definition</h4>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-l-4 border-[#187CC1] hover:shadow-md transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <h4 className="font-montserrat font-bold text-[#002C5F] text-lg">Target List</h4>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phase 2: Evaluation Process */}
              <motion.div 
                variants={searchMethodCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={1}
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Connection Arrow - Desktop Only */}
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 3.0 }}
                    className="flex items-center"
                  >
                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#187CC1] to-[#005A9C]"></div>
                    <div className="w-0 h-0 border-l-8 border-l-[#005A9C] border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </motion.div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#187CC1]/5 to-[#005A9C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Header */}
                  <div className="relative text-center mb-8">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-[#187CC1] to-[#005A9C] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      initial={{ rotate: 0 }}
                      whileInView={{ rotate: 360 }}
                      whileHover={{ rotate: 720 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        whileInView: { duration: 1.5, delay: 3.0, ease: "easeInOut" },
                        whileHover: { duration: 0.6, ease: "easeInOut" }
                      }}
                    >
                      <FaAward className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="font-montserrat text-2xl font-bold text-[#002C5F] mb-2 group-hover:text-[#187CC1] transition-colors duration-300">
                      Evaluation Process
                    </h3>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-8 h-1 bg-gradient-to-r from-[#187CC1] to-[#005A9C] rounded-full"></div>
                      <p className="text-[#187CC1] font-montserrat font-bold text-lg">Weeks 4-8</p>
                      <div className="w-8 h-1 bg-gradient-to-r from-[#005A9C] to-[#187CC1] rounded-full"></div>
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div className="relative space-y-6">
                    {/* Interviews & Assessment */}
                    <motion.div 
                      className="bg-gradient-to-r from-[#187CC1] to-[#71C8F3] text-white p-5 rounded-xl relative overflow-hidden group shadow-lg"
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="relative flex items-center space-x-4">
                        <motion.div 
                          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.4 }}
                        >
                          <FaUsers className="w-6 h-6" />
                        </motion.div>
                        <span className="font-montserrat font-bold text-lg">Interviews & Assessment</span>
                      </div>
                    </motion.div>

                    {/* Candidates Screening */}
                    <motion.div 
                      className="bg-gradient-to-r from-[#005A9C] to-[#002C5F] text-white p-5 rounded-xl relative overflow-hidden group shadow-lg ml-8"
                      whileHover={{ scale: 1.05, rotateY: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="relative flex items-center space-x-4">
                        <motion.div 
                          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: -180 }}
                          transition={{ duration: 0.4 }}
                        >
                          <FaChartLine className="w-6 h-6" />
                        </motion.div>
                        <span className="font-montserrat font-bold text-lg">Candidates Screening</span>
                      </div>
                    </motion.div>

                    {/* Outcome Boxes */}
                    <div className="grid grid-cols-1 gap-4">
                      <motion.div 
                        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-l-4 border-[#187CC1] hover:shadow-md transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <h4 className="font-montserrat font-bold text-[#002C5F] text-lg">Fit-for-Purpose Assessment</h4>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-l-4 border-[#005A9C] hover:shadow-md transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <h4 className="font-montserrat font-bold text-[#002C5F] text-lg">Short List</h4>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phase 3: Selection Process */}
              <motion.div 
                variants={searchMethodCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={2}
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#71C8F3]/5 to-[#0C6BAF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Header */}
                  <div className="relative text-center mb-8">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-[#71C8F3] to-[#0C6BAF] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      initial={{ rotate: 0 }}
                      whileInView={{ rotate: 360 }}
                      whileHover={{ rotate: 720 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        whileInView: { duration: 1.5, delay: 5.0, ease: "easeInOut" },
                        whileHover: { duration: 0.6, ease: "easeInOut" }
                      }}
                    >
                      <FaHandshake className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="font-montserrat text-2xl font-bold text-[#002C5F] mb-2 group-hover:text-[#71C8F3] transition-colors duration-300">
                      Selection Process
                    </h3>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-8 h-1 bg-gradient-to-r from-[#71C8F3] to-[#0C6BAF] rounded-full"></div>
                      <p className="text-[#71C8F3] font-montserrat font-bold text-lg">Weeks 8-12</p>
                      <div className="w-8 h-1 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] rounded-full"></div>
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div className="relative space-y-6">
                    {/* Decision Making */}
                    <motion.div 
                      className="bg-gradient-to-r from-[#71C8F3] to-[#0C6BAF] text-white p-5 rounded-xl relative overflow-hidden group shadow-lg"
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="relative flex items-center space-x-4">
                        <motion.div 
                          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.4 }}
                        >
                          <FaLightbulb className="w-6 h-6" />
                        </motion.div>
                        <span className="font-montserrat font-bold text-lg">Decision Making</span>
                      </div>
                    </motion.div>

                    {/* Employment Offer */}
                    <motion.div 
                      className="bg-gradient-to-r from-[#0C6BAF] to-[#187CC1] text-white p-5 rounded-xl relative overflow-hidden group shadow-lg ml-8"
                      whileHover={{ scale: 1.05, rotateY: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="relative flex items-center space-x-4">
                        <motion.div 
                          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: -180 }}
                          transition={{ duration: 0.4 }}
                        >
                          <FaRocket className="w-6 h-6" />
                        </motion.div>
                        <span className="font-montserrat font-bold text-lg">Employment Offer</span>
                      </div>
                    </motion.div>

                    {/* Final Outcome */}
                    <motion.div 
                      className="bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] p-6 rounded-xl text-white shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center">
                        <motion.div
                          className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </motion.div>
                        <h4 className="font-montserrat font-bold text-lg">Marketing + Onboarding</h4>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

       
      </section>
      {/* Who We Serve Section */}
      <section className="relative w-full bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-8 leading-tight"
              variants={itemVariants}
            >
              Who We Serve
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

            <motion.div
              className="mb-12"
              variants={itemVariants}
            >
              <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-[#002C5F] mb-6">
                Types of Leadership Roles We Place
              </h3>
              <p className="font-open-sans text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                At Kersten Talent Capital, we specialize in placing high-impact professionals across key organizational functions:
              </p>
            </motion.div>
          </motion.div>

          {/* Roles Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* C-Suite Leadership */}
            <motion.div 
              variants={slideInVariants}
              className="bg-gradient-to-br from-[#002C5F] to-[#0C6BAF] text-white p-6 rounded-2xl shadow-lg"
            >
              <h4 className="font-montserrat text-xl font-bold mb-4">C-Suite Leadership</h4>
              <ul className="space-y-2 font-open-sans">
                <li>• CEO</li>
                <li>• General Manager</li>
                <li>• Country Manager</li>
                <li>• Business Unit Director</li>
              </ul>
            </motion.div>

            {/* Finance & Controlling */}
            <motion.div 
              variants={slideInVariants}
              className="bg-gradient-to-br from-[#0C6BAF] to-[#71C8F3] text-white p-6 rounded-2xl shadow-lg"
            >
              <h4 className="font-montserrat text-xl font-bold mb-4">Finance & Controlling</h4>
              <ul className="space-y-2 font-open-sans">
                <li>• CFO</li>
                <li>• VP Finance</li>
                <li>• Director of Strategic Planning</li>
                <li>• Head of Accounting Operations</li>
              </ul>
            </motion.div>

            {/* Sales, Marketing & Revenue Operations */}
            <motion.div 
              variants={slideInVariants}
              className="bg-gradient-to-br from-[#187CC1] to-[#0C6BAF] text-white p-6 rounded-2xl shadow-lg"
            >
              <h4 className="font-montserrat text-xl font-bold mb-4">Sales, Marketing & GTM Operations</h4>
              <ul className="space-y-2 font-open-sans">
                <li>• CCO, CRO, CMO</li>
                <li>• VP Sales, VP Marketing</li>
                <li>• Key Account Director</li>
                <li>• Director of Marketing Strategy</li>
                <li>• VP of Go-to-Market Strategy</li>
              </ul>
            </motion.div>

            {/* IT & Legal */}
            <motion.div 
              variants={slideInVariants}
              className="bg-gradient-to-br from-[#005A9C] to-[#187CC1] text-white p-6 rounded-2xl shadow-lg"
            >
              <h4 className="font-montserrat text-xl font-bold mb-4">IT & Legal</h4>
              <ul className="space-y-2 font-open-sans">
                <li>• CISO, Chief Information Security Officer</li>
                <li>• Global Compliance Officer</li>
                <li>• Legal Counsel</li>
                <li>• Director of IT Infrastructure</li>
                <li>• Director of Data & Analytics</li>
              </ul>
            </motion.div>

            {/* R&D Engineering */}
            <motion.div 
              variants={slideInVariants}
              className="bg-gradient-to-br from-[#71C8F3] to-[#005A9C] text-white p-6 rounded-2xl shadow-lg"
            >
              <h4 className="font-montserrat text-xl font-bold mb-4">R&D Engineering</h4>
              <ul className="space-y-2 font-open-sans">
                <li>• Global Head of R&D</li>
                <li>• VP Engineering</li>
                <li>• Director of Product Engineering</li>
              </ul>
            </motion.div>

            {/* Operations, SC & Procurement */}
            <motion.div 
              variants={slideInVariants}
              className="bg-gradient-to-br from-[#002C5F] to-[#71C8F3] text-white p-6 rounded-2xl shadow-lg"
            >
              <h4 className="font-montserrat text-xl font-bold mb-4">Operations, SC & Procurement</h4>
              <ul className="space-y-2 font-open-sans">
                <li>• VP Global Supply Chain</li>
                <li>• Senior Director Supply Chain, Distribution & Logistics - Americas</li>
                <li>• Director, Operations & SC - EMEA</li>
                <li>• Director of Global Purchasing</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full bg-gradient-to-br from-[#002C5F] to-[#0C6BAF] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 
              className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              Ready to Get Started?
            </motion.h2>
            
            <motion.div 
              className="flex justify-center mb-8"
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
              className="font-open-sans text-lg md:text-xl text-white leading-relaxed mb-12 max-w-4xl mx-auto"
              variants={itemVariants}
              style={{ lineHeight: '1.7' }}
            >
              Experience the Kersten difference in executive search. Let our proven methodology and fit-for-purpose assessment help you find the transformational leaders your organization needs.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {/* Contact CTA */}
            <motion.div 
              variants={slideInVariants}
              className="group"
            >
              <Link href="/contact">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-[#71C8F3] to-[#0C6BAF] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaHandshake className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-montserrat text-2xl font-bold text-white mb-4 group-hover:text-[#71C8F3] transition-colors duration-300">
                    Start Your Search
                  </h3>
                  <p className="font-open-sans text-white/90 leading-relaxed mb-6">
                    Ready to find your next transformational leader? Connect with our team to discuss your executive search needs and learn how our approach can deliver results.
                  </p>
                  <div className="inline-flex items-center text-[#71C8F3] font-montserrat font-semibold text-lg group-hover:text-white transition-colors duration-300">
                    Get in Touch
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Resources CTA */}
            <motion.div 
              variants={slideInVariants}
              className="group"
            >
              <Link href="/resources">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-[#187CC1] to-[#005A9C] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaLightbulb className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-montserrat text-2xl font-bold text-white mb-4 group-hover:text-[#71C8F3] transition-colors duration-300">
                    Explore Resources
                  </h3>
                  <p className="font-open-sans text-white/90 leading-relaxed mb-6">
                    Dive deeper into our thought leadership content, industry insights, and white papers to stay ahead of executive search trends and best practices.
                  </p>
                  <div className="inline-flex items-center text-[#71C8F3] font-montserrat font-semibold text-lg group-hover:text-white transition-colors duration-300">
                    View Resources
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideRight {
          0% { opacity: 0; transform: translateX(-60px); }
          40% { opacity: 1; transform: translateX(0); }
          100% { opacity: 1; transform: translateX(0); }
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