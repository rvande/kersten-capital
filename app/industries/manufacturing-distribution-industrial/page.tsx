'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaIndustry, FaCogs, FaTruck, FaChartLine, FaRobot, FaLaptopCode, FaShoppingCart, FaBolt, FaArrowRight, FaShieldAlt, FaUniversity, FaLeaf, FaRocket } from 'react-icons/fa';

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

const focusAreas = [
  {
    title: "Advanced Manufacturing Leadership & GTM Excellence",
    description: "Executives who harness Industry 4.0 technologies to drive manufacturing excellence, implementing smart factory technologies that enhance productivity, quality, and agility while developing sophisticated go-to-market strategies.",
    icon: <FaIndustry className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Global Supply Chain Optimization & Revenue Strategy",
    description: "Leaders who transform logistics and distribution networks into competitive advantages, designing resilient, transparent, and efficient supply chains while implementing GTM approaches that optimize customer reach.",
    icon: <FaTruck className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Industrial Automation Excellence & Commercial Innovation",
    description: "Automation leaders who accelerate industrial transformation through robotics, control systems, and industrial IoT implementations while developing GTM strategies for technology adoption.",
    icon: <FaRobot className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Operational Excellence & GTM Optimization",
    description: "Executives who create performance cultures centered on operational excellence, implementing methodologies that systematically eliminate waste and enhance productivity while optimizing go-to-market approaches.",
    icon: <FaChartLine className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Industrial Technology Implementation & Market Strategy",
    description: "Leaders who successfully deploy technologies that modernize industrial operations, from IoT sensor networks to predictive analytics and augmented reality systems, coupled with comprehensive GTM frameworks.",
    icon: <FaCogs className="w-8 h-8 text-[#187CC1]" />
  }
];

export default function ManufacturingDistributionIndustrialPage() {
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
            src="/manufacturing.jpg"
            alt="Manufacturing and Industrial"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        {/* Gradient Background */}
        <div className="absolute inset-0 z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #187CC1/90 0%, #71C8F3/85 50%, #005A9C/90 100%)',
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col h-[80vh] sm:h-[70vh] md:h-[80vh] w-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col justify-start md:justify-center h-full md:items-start items-center md:text-left text-center max-w-5xl pt-16 md:pt-0 md:-mt-5">
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
                
                <span className="text-white block">Manufacturing &</span>
                <span className="block md:inline">Industrial</span>
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
              <p className="max-w-4xl md:text-left text-center text-white font-open-sans text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                Identifying transformational leaders who balance operational excellence with visionary strategy in today's evolving industrial landscape.
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

      {/* Overview Section */}
      <section className="relative bg-white py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="max-w-5xl mx-auto mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002C5F] mb-8 font-montserrat text-center">
                Industrial Excellence Through Leadership
              </h2>
              <div className="text-lg text-black/80 font-open-sans leading-relaxed space-y-6">
                <p>
                  In today's evolving industrial landscape, <span className="font-bold text-[#187CC1]">Kersten Talent Capital identifies transformational leaders</span> who strike a balance between <span className="font-bold text-[#002C5F]">operational excellence and visionary strategy.</span> Our specialized recruitment teams possess deep domain knowledge of manufacturing and distribution environments, understanding the unique talent requirements across all leadership tiers, including <span className="font-bold text-[#187CC1]">sophisticated go-to-market (GTM) strategies</span> that drive revenue growth and market expansion.
                </p>
                <p>
                  We serve diverse industrial sectors, including <span className="font-bold text-[#002C5F]">advanced manufacturing, logistics and distribution networks,</span> industrial technology providers, and specialized production environments. Our candidates bring the <span className="font-bold text-[#187CC1]">technical knowledge, leadership skills, and change management expertise</span> required to drive efficiency while positioning industrial operations for future growth through innovative <span className="font-bold text-[#002C5F]">GTM approaches and commercial excellence.</span>
                </p>
                <p>
                  With established networks spanning <span className="font-bold text-[#002C5F]">family-owned manufacturing businesses to global industrial conglomerates,</span> Kersten Talent Capital delivers leaders who combine <span className="font-bold text-[#187CC1]">technical manufacturing expertise with business acumen and GTM strategy development</span> to drive sustainable growth in complex industrial environments.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="relative stylish-pattern-bg py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto relative z-10"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002C5F] mb-6 font-montserrat">
                Our Focus Areas
              </h2>
              <p className="text-lg sm:text-xl text-black/70 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Specialized expertise across manufacturing and industrial operations where exceptional leadership drives operational transformation.
              </p>
            </motion.div>

            {/* Focus Areas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  custom={index}
                  variants={cardVariants}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="mb-6">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                    {area.title}
                  </h3>
                  <p className="text-black/70 font-open-sans leading-relaxed">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CSS Styles */}
      <style jsx>{`
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

      {/* Industrial Innovation Section */}
      <section className="relative bg-gradient-to-br from-[#002C5F] to-[#187CC1] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 font-montserrat">
                Industry 4.0 Leadership
              </h2>
              <p className="text-lg sm:text-xl text-white/90 font-open-sans leading-relaxed max-w-4xl mx-auto">
                Leaders who understand the nuanced requirements across diverse production environments and drive sustainable competitive advantage.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div custom={0} variants={cardVariants}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <FaIndustry className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white mb-4 font-montserrat">
                    Smart Manufacturing & GTM Innovation
                  </h3>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    Leaders who implement smart factory technologies that enhance productivity, quality, and agility across diverse production environments while developing comprehensive go-to-market strategies.
                  </p>
                </div>
              </motion.div>

              <motion.div custom={1} variants={cardVariants}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <FaTruck className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white mb-4 font-montserrat">
                    Supply Chain Excellence & Revenue Optimization
                  </h3>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    Executives who create resilient, transparent supply chains that balance customer responsiveness with operational efficiency while implementing GTM strategies that optimize market reach.
                  </p>
                </div>
              </motion.div>

              <motion.div custom={2} variants={cardVariants}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <FaRobot className="w-16 h-16 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-white mb-4 font-montserrat">
                    Automation Leadership & Commercial Strategy
                  </h3>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    Leaders who successfully bridge operational and information technology to create integrated production environments while developing GTM approaches for technology adoption.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Utilities Industry Specialty Section */}
      <section className="relative bg-white py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002C5F] mb-6 font-montserrat">
                Powering the Future: Utilities Industry Leadership Excellence
              </h2>
              <p className="text-lg sm:text-xl text-black/70 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Navigating Complex Energy Markets with Proven Commercial Expertise
              </p>
            </motion.div>

            {/* Utilities Overview */}
            <motion.div variants={itemVariants} className="max-w-6xl mx-auto mb-16">
              <div className="text-lg text-black/80 font-open-sans leading-relaxed space-y-6">
                <p>
                  In an era of unprecedented transformation, the utilities industry faces a convergence of challenges that demand exceptional commercial leadership. From <span className="font-bold text-[#187CC1]">grid modernization and renewable energy integration</span> to regulatory compliance and customer-centric service delivery, utilities organizations require leaders who can <span className="font-bold text-[#002C5F]">navigate complex stakeholder environments</span> while driving sustainable growth and operational excellence.
                </p>
                <p>
                  <span className="font-bold text-[#187CC1]">Kersten Talent Capital has established itself as the premier partner</span> for utilities companies seeking transformational commercial leadership. Our deep understanding of the utilities landscape—spanning <span className="font-bold text-[#002C5F]">electric, gas, water, and renewable energy sectors</span>—enables us to identify and place executive leaders who combine industry expertise with proven commercial acumen to drive organizational success in this rapidly evolving market.
                </p>
              </div>
            </motion.div>

            {/* Utilities Leadership Challenge */}
            <motion.div variants={itemVariants} className="bg-gray-50 rounded-2xl p-8 md:p-10 mb-16">
              <h3 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-6 font-montserrat">
                The Utilities Commercial Leadership Challenge
              </h3>
              <div className="text-lg text-black/80 font-open-sans leading-relaxed space-y-4">
                <p>
                  The modern utilities executive operates in an environment characterized by <span className="font-bold text-[#187CC1]">regulatory complexity, technological disruption, and evolving customer expectations.</span> Today's commercial leaders must balance traditional utility operations with emerging market dynamics, including distributed energy resources, smart grid technologies, energy storage solutions, and evolving regulatory frameworks.
                </p>
                <p>
                  Our specialized recruitment approach recognizes that utilities commercial leadership requires a unique blend of <span className="font-bold text-[#002C5F]">technical understanding, regulatory awareness, stakeholder management skills, and strategic vision.</span> Whether leading revenue optimization initiatives, developing new service offerings, or managing complex infrastructure investments, utilities executives must demonstrate the ability to create value while maintaining the reliability and safety standards that define the industry.
                </p>
              </div>
            </motion.div>

            {/* Utilities Expertise Areas */}
            <motion.div variants={itemVariants} className="mb-16">
              <h3 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-10 font-montserrat text-center">
                Our Utilities Industry Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h4 className="text-xl font-black text-[#187CC1] mb-4 font-montserrat">
                    Energy Market Navigation
                  </h4>
                  <p className="text-black/70 font-open-sans leading-relaxed">
                    Leaders who understand wholesale energy markets, capacity auctions, renewable energy certificates, and the intricate dynamics of power trading and risk management. Our candidates bring experience in market operations, regulatory compliance, and strategic financial management.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h4 className="text-xl font-black text-[#187CC1] mb-4 font-montserrat">
                    Infrastructure Development Leadership
                  </h4>
                  <p className="text-black/70 font-open-sans leading-relaxed">
                    Development executives who lead large-scale infrastructure projects, from transmission line construction and substation upgrades to renewable energy installations and grid modernization initiatives. These leaders understand project financing and regulatory approval processes.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h4 className="text-xl font-black text-[#187CC1] mb-4 font-montserrat">
                    Customer-Centric Commercial Strategy
                  </h4>
                  <p className="text-black/70 font-open-sans leading-relaxed">
                    Commercial leaders who develop new service offerings, implement demand response programs, and create value-added services that enhance customer engagement while driving revenue growth and regulatory compliance.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h4 className="text-xl font-black text-[#187CC1] mb-4 font-montserrat">
                    Regulatory Excellence and Compliance
                  </h4>
                  <p className="text-black/70 font-open-sans leading-relaxed">
                    Leaders with experience in rate case proceedings, regulatory filing requirements, environmental compliance, and building productive relationships with regulatory bodies while advancing commercial objectives.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Commercial Leadership Specializations */}
            <motion.div variants={itemVariants} className="mb-16">
              <h3 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-10 font-montserrat text-center">
                Commercial Leadership Specializations
              </h3>
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-8">
                  <h4 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                    Chief Commercial Officer Excellence
                  </h4>
                  <p className="text-black/70 font-open-sans leading-relaxed">
                    CCO candidates who represent the highest level of utilities commercial leadership, combining deep industry knowledge with proven ability to lead complex commercial organizations. These executives understand rate structure optimization, customer program development, and integration of new technologies into traditional utility business models.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-8">
                  <h4 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                    Chief Revenue Officer Impact
                  </h4>
                  <p className="text-black/70 font-open-sans leading-relaxed">
                    CRO leaders who optimize revenue across traditional utility services while developing new revenue streams through emerging technologies. Our candidates understand wholesale market operations, retail customer management, and demand response programs.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-8">
                  <h4 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                    Chief Development Officer Vision
                  </h4>
                  <p className="text-black/70 font-open-sans leading-relaxed">
                    Development leadership encompassing renewable energy project development, grid modernization initiatives, and strategic market expansion. Our CDO candidates bring experience in project finance, regulatory approval processes, and environmental compliance.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Market Sector Expertise */}
            <motion.div variants={itemVariants} className="mb-16">
              <h3 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-10 font-montserrat text-center">
                Market Sector Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                  <FaBolt className="w-12 h-12 text-[#0C6BAF] mx-auto mb-4" />
                  <h4 className="text-lg font-black text-[#002C5F] mb-3 font-montserrat">
                    Electric Utilities
                  </h4>
                  <p className="text-black/70 font-open-sans text-sm leading-relaxed">
                    Generation, transmission, and distribution leadership with wholesale market operations expertise.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                  <FaIndustry className="w-12 h-12 text-[#0C6BAF] mx-auto mb-4" />
                  <h4 className="text-lg font-black text-[#002C5F] mb-3 font-montserrat">
                    Natural Gas Utilities
                  </h4>
                  <p className="text-black/70 font-open-sans text-sm leading-relaxed">
                    Gas trading, supply management, pipeline operations, and distribution expertise.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                  <FaTruck className="w-12 h-12 text-[#0C6BAF] mx-auto mb-4" />
                  <h4 className="text-lg font-black text-[#002C5F] mb-3 font-montserrat">
                    Water & Wastewater
                  </h4>
                  <p className="text-black/70 font-open-sans text-sm leading-relaxed">
                    Infrastructure management, environmental compliance, and treatment technologies.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                  <FaLeaf className="w-12 h-12 text-[#0C6BAF] mx-auto mb-4" />
                  <h4 className="text-lg font-black text-[#002C5F] mb-3 font-montserrat">
                    Renewable Energy
                  </h4>
                  <p className="text-black/70 font-open-sans text-sm leading-relaxed">
                    Project development, power marketing, and renewable resource integration.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Why Kersten for Utilities */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#002C5F] to-[#187CC1] rounded-2xl p-8 md:p-10 text-white mb-16">
              <h3 className="text-2xl md:text-3xl font-black mb-6 font-montserrat text-center">
                Why Kersten Talent Capital for Utilities Leadership?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-black mb-4 font-montserrat">
                    Deep Industry Networks
                  </h4>
                  <p className="text-white/90 font-open-sans leading-relaxed mb-6">
                    Extensive networks across investor-owned utilities, municipal utilities, cooperative systems, and independent power producers with understanding of career paths and compensation structures.
                  </p>
                  <h4 className="text-xl font-black mb-4 font-montserrat">
                    Regulatory and Technical Understanding
                  </h4>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    Deep understanding of utilities regulation, technology trends, and market dynamics enabling effective candidate evaluation and client matching.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-black mb-4 font-montserrat">
                    Proven Track Record
                  </h4>
                  <p className="text-white/90 font-open-sans leading-relaxed mb-6">
                    Successfully placed utilities commercial leaders across all market segments, from Fortune 500 investor-owned utilities to emerging renewable energy companies.
                  </p>
                  <h4 className="text-xl font-black mb-4 font-montserrat">
                    Long-Term Partnership Approach
                  </h4>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    Emphasis on sustainable placements that create lasting value for both clients and candidates, supporting long-term success of utilities organizations.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Specialty Focus Areas */}
            <motion.div variants={itemVariants} className="mb-16">
              <h3 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-10 font-montserrat text-center">
                Specialized Focus Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Link href="/industries/manufacturing-distribution-industrial/utilities" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-[#0C6BAF]/20">
                    <FaBolt className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h4 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      Utilities Industry Leadership
                    </h4>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Specialized commercial leadership for utilities companies across electric, gas, water, and renewable energy sectors with comprehensive GTM expertise.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Explore Utilities</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
                
                <Link href="/industries/manufacturing-distribution-industrial/pe-backed-entities" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-[#0C6BAF]/20">
                    <FaChartLine className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h4 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      PE-Backed Manufacturing Entities
                    </h4>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Specialized commercial leadership for private equity-backed manufacturing and industrial companies driving accelerated growth and value creation through sophisticated GTM strategies.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Explore PE Specialty</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
                
                <Link href="/industries/sales-marketing-go-to-market" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-[#0C6BAF]/20">
                    <FaRocket className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h4 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      Sales, Marketing & GTM Leadership
                    </h4>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Comprehensive revenue leadership roles across industrial and manufacturing sectors with specialized go-to-market expertise and commercial strategy development.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Explore GTM Roles</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002C5F] mb-6 font-montserrat">
                Explore Our Other Industries
              </h2>
              <p className="text-lg sm:text-xl text-black/70 font-open-sans leading-relaxed">
                Discover how our sector expertise can meet your specific industry needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div custom={0} variants={cardVariants}>
                <Link href="/industries/technology-financial-services" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <FaLaptopCode className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h3 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      Technology & Financial Services
                    </h3>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Forward-thinking leaders driving innovation and growth through digital transformation.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Learn More</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div custom={1} variants={cardVariants}>
                <Link href="/industries/e-commerce-digital-retail" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <FaShoppingCart className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h3 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      E-Commerce & Digital Retail
                    </h3>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Leaders combining customer-centric vision with technical excellence.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Learn More</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div custom={2} variants={cardVariants}>
                <Link href="/industries/energy-renewables-mining" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <FaBolt className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h3 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      Energy & Renewables
                    </h3>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Leaders navigating complex regulatory environments while driving innovation.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Learn More</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div custom={3} variants={cardVariants}>
                <Link href="/industries/sales-marketing-go-to-market" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <FaChartLine className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h3 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      Sales, Marketing & Go-to-Market
                    </h3>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Revenue leaders driving growth in complex B2B industrial and utilities environments.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Learn More</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-br from-[#187CC1] to-[#71C8F3] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 font-montserrat">
              Ready to Transform Your Industrial Operations?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 font-open-sans leading-relaxed">
              Let's discuss how our manufacturing and industrial expertise can help you identify the operational leaders your organization needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-[#187CC1] rounded-full hover:bg-gray-100 transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl"
              >
                Start Your Search
              </Link>
              <Link 
                href="/industries"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-[#187CC1] transition-all duration-300 font-montserrat font-semibold"
              >
                All Industries
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 