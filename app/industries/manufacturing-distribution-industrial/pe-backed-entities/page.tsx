'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaChartLine, FaUsers, FaRocket, FaCogs, FaHandshake, FaIndustry, FaArrowRight, FaTrophy, FaBullseye, FaGlobe } from 'react-icons/fa';

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
    title: "Revenue Growth Acceleration & GTM Excellence",
    description: "Sales leaders who understand PE value creation timelines and can rapidly scale revenue through market expansion, customer acquisition, and pricing optimization strategies while implementing sophisticated go-to-market frameworks that accelerate growth trajectories.",
    icon: <FaChartLine className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Market Expansion Leadership & GTM Strategy",
    description: "Commercial executives who drive geographic expansion, new market penetration, and customer base diversification to support portfolio company growth objectives through comprehensive go-to-market strategies and market development initiatives.",
    icon: <FaGlobe className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Operational Sales Excellence & GTM Optimization",
    description: "Sales operations leaders who implement scalable processes, CRM optimization, and performance management systems that support rapid growth and value creation while developing GTM approaches that optimize customer acquisition and revenue expansion.",
    icon: <FaCogs className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Strategic Account Development & Revenue Strategy",
    description: "Enterprise sales leaders who build and manage key customer relationships that drive sustainable revenue growth and enhance company valuation through strategic account management and comprehensive GTM planning.",
    icon: <FaHandshake className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Go-to-Market Strategy & Commercial Innovation",
    description: "GTM leaders who develop and execute comprehensive market strategies, product positioning, and channel optimization to maximize revenue potential while supporting PE value creation initiatives and exit strategies.",
    icon: <FaRocket className="w-8 h-8 text-[#187CC1]" />
  }
];

const roleCategories = [
  {
    category: "C-Suite Revenue Leadership",
    roles: [
      {
        title: "Chief Revenue Officer (CRO)",
        description: "Senior revenue executives who drive comprehensive commercial strategy across sales, marketing, and customer success to accelerate portfolio company growth. These leaders understand PE value creation timelines, aggressive growth targets, and the commercial strategies required to achieve investment returns within PE horizons. They excel at revenue optimization, pricing strategy, and implementing scalable GTM frameworks that support rapid expansion while maintaining operational efficiency."
      },
      {
        title: "Chief Commercial Officer (CCO)",
        description: "Commercial leaders who optimize all revenue-generating functions while supporting PE value creation initiatives and exit strategies. CCO candidates combine deep commercial expertise with understanding of PE operational requirements, managing complex commercial organizations while driving the aggressive growth targets required for successful PE investments. They excel at commercial strategy development, market expansion, and GTM optimization across diverse market segments."
      },
      {
        title: "Chief Sales Officer (CSO)",
        description: "Sales executives who build and scale high-performance sales organizations capable of delivering aggressive growth targets required by PE investors. These leaders understand the unique pressures of PE-backed growth, implementing sales strategies that accelerate revenue while building scalable sales operations. They excel at sales team development, performance management, and the GTM strategies required for rapid market expansion."
      },
      {
        title: "Executive Vice President of Sales",
        description: "Senior sales leaders who manage enterprise sales strategies, major account relationships, and market development initiatives in PE-backed environments. EVP candidates understand the accelerated timelines and aggressive targets required for PE success, managing complex sales organizations while driving the revenue growth required for value creation and successful exits."
      }
    ]
  },
  {
    category: "Strategic Sales Leadership",
    roles: [
      {
        title: "VP of Sales - North America",
        description: "Regional sales leaders who drive market penetration and revenue growth across key geographic markets in PE-backed companies. These executives understand regional market dynamics, competitive landscapes, and the sales strategies required for rapid geographic expansion. They excel at building regional sales teams, developing market-specific GTM approaches, and driving the aggressive growth targets required for PE value creation."
      },
      {
        title: "VP of Global Sales",
        description: "International sales executives who expand market reach and drive revenue diversification across global markets for PE portfolio companies. These leaders understand international business development, cross-cultural sales management, and the complexities of global market expansion. They excel at building international sales organizations, developing global GTM strategies, and managing the operational challenges of international growth."
      },
      {
        title: "VP of Enterprise Sales",
        description: "Enterprise account leaders who manage complex B2B sales cycles and strategic customer relationships in PE-backed environments. These executives understand enterprise sales processes, complex procurement cycles, and the relationship management required for large account success. They excel at enterprise account development, strategic relationship building, and the long-term account strategies that drive sustainable revenue growth."
      },
      {
        title: "VP of Channel Sales",
        description: "Channel development leaders who build and optimize partner networks to accelerate market penetration for PE portfolio companies. These executives understand channel strategy development, partner relationship management, and the channel optimization required for rapid market expansion. They excel at building distributor networks, managing channel conflicts, and developing the partner strategies that accelerate growth."
      }
    ]
  },
  {
    category: "Market Development & Growth",
    roles: [
      {
        title: "VP of Business Development",
        description: "Growth leaders who identify and execute strategic partnerships, acquisitions, and market expansion opportunities that support PE value creation objectives. These executives understand business development strategy, partnership evaluation, and the strategic initiatives required for accelerated growth. They excel at identifying growth opportunities, negotiating strategic partnerships, and executing the business development initiatives that drive value creation."
      },
      {
        title: "Director of Market Development",
        description: "Market expansion specialists who drive entry into new verticals, geographies, and customer segments for PE-backed companies. These leaders understand market research, competitive analysis, and the market development strategies required for successful expansion. They excel at market opportunity assessment, competitive positioning, and the strategic planning required for successful market entry initiatives."
      },
      {
        title: "Head of Strategic Accounts",
        description: "Key account managers who develop and maintain relationships with the most valuable customers in PE portfolio companies. These executives understand strategic account management, customer relationship development, and the account strategies required for long-term revenue growth. They excel at customer retention, account expansion, and the relationship management that drives sustainable revenue growth."
      },
      {
        title: "Director of Sales Operations",
        description: "Sales operations leaders who implement scalable processes and systems to support rapid growth in PE-backed environments. These executives understand sales process optimization, CRM implementation, and the operational infrastructure required for scalable growth. They excel at sales analytics, process improvement, and the operational excellence required to support aggressive growth targets."
      }
    ]
  },
  {
    category: "Specialized Commercial Roles",
    roles: [
      {
        title: "VP of Inside Sales",
        description: "Inside sales leaders who build efficient, scalable sales teams capable of handling high-volume customer acquisition for PE portfolio companies. These executives understand inside sales management, lead qualification processes, and the scalable sales models required for rapid customer acquisition. They excel at building inside sales teams, optimizing sales processes, and developing the efficient sales operations that support aggressive growth targets."
      },
      {
        title: "Director of Customer Success",
        description: "Customer success leaders who drive retention, expansion, and lifetime value optimization in PE-backed companies. These executives understand customer success management, retention strategies, and the customer experience optimization required for sustainable growth. They excel at customer onboarding, expansion strategies, and the customer success programs that drive long-term value creation."
      },
      {
        title: "Head of Sales Engineering",
        description: "Technical sales leaders who support complex solution selling and customer technical requirements in PE portfolio companies. These executives combine technical expertise with sales acumen, supporting complex sales cycles and technical customer requirements. They excel at technical presentations, solution design, and the technical sales support required for complex B2B sales success."
      },
      {
        title: "Director of Pricing Strategy",
        description: "Pricing specialists who optimize revenue through strategic pricing models and value-based selling approaches in PE-backed environments. These executives understand pricing strategy development, value-based pricing, and the pricing optimization required for revenue maximization. They excel at pricing analysis, competitive pricing strategies, and the pricing models that optimize revenue while supporting growth objectives."
      }
    ]
  }
];

const peAdvantages = [
  {
    title: "Accelerated Growth Expertise",
    description: "Deep understanding of PE value creation timelines and the commercial strategies required to achieve aggressive growth targets within investment horizons.",
    icon: <FaTrophy className="w-12 h-12 text-[#ffffff]" />
  },
  {
    title: "Portfolio Company Networks",
    description: "Extensive relationships across PE portfolio companies, enabling cross-pollination of best practices and talent mobility within the PE ecosystem.",
    icon: <FaUsers className="w-12 h-12 text-[#ffffff]" />
  },
  {
    title: "Value Creation Focus",
    description: "Proven ability to identify and place commercial leaders who understand the unique pressures and opportunities of PE-backed growth initiatives.",
    icon: <FaBullseye className="w-12 h-12 text-[#ffffff]" />
  }
];

export default function PEBackedEntitiesPage() {
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
            src="/private.jpg"
            alt="PE-Backed Manufacturing Entities"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        {/* Gradient Background */}
        <div className="absolute inset-0 z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #002C5F/90 0%, #0C6BAF/85 50%, #187CC1/90 100%)',
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
                <span className="block">PE-Backed</span>
                <span className="text-white block">Manufacturing</span>
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
              <p className="max-w-4xl md:text-left text-center text-white font-open-sans text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                Specialized commercial leadership for private equity-backed manufacturing and industrial companies driving accelerated growth and value creation.
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
                Accelerating PE Portfolio Company Growth
              </h2>
              <div className="text-lg text-black/80 font-open-sans leading-relaxed space-y-6">
                <p>
                  Private equity-backed manufacturing and industrial companies operate under unique pressures and opportunities that demand <span className="font-bold text-[#187CC1]">specialized commercial leadership expertise.</span> <span className="font-bold text-[#002C5F]">Kersten Talent Capital understands the distinct requirements</span> of PE portfolio companies, from aggressive growth targets to compressed value creation timelines.
                </p>
                <p>
                  Our specialized practice serves <span className="font-bold text-[#002C5F]">private equity firms, portfolio companies, and growth-stage manufacturing businesses</span> seeking commercial leaders who can navigate the complexities of PE ownership while driving sustainable revenue growth. We identify professionals who combine <span className="font-bold text-[#187CC1]">deep industry expertise with proven ability to execute in high-pressure, results-driven environments.</span>
                </p>
                <p>
                  With extensive networks across <span className="font-bold text-[#002C5F]">leading private equity firms and their portfolio companies,</span> Kersten Talent Capital delivers commercial leaders who understand PE value creation methodologies and can <span className="font-bold text-[#187CC1]">drive the accelerated growth required for successful exits.</span>
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
                PE Commercial Leadership Focus Areas
              </h2>
              <p className="text-lg sm:text-xl text-black/70 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Specialized expertise in commercial roles that drive value creation and accelerated growth in PE-backed manufacturing environments.
              </p>
            </motion.div>

            {/* Focus Areas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-[#0C6BAF]/20"
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

      {/* Role Categories Section */}
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
                Commercial Leadership Roles
              </h2>
              <p className="text-lg sm:text-xl text-black/70 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Comprehensive coverage of sales and commercial leadership positions that drive PE portfolio company success.
              </p>
            </motion.div>

            {/* Role Categories */}
            <div className="space-y-12 md:space-y-16">
              {roleCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  variants={itemVariants}
                  className="bg-gray-50 rounded-2xl p-8 md:p-10"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-8 font-montserrat">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.roles.map((role, roleIndex) => (
                      <div
                        key={role.title}
                        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#0C6BAF]/20"
                      >
                        <h4 className="text-lg font-black text-[#187CC1] mb-3 font-montserrat">
                          {role.title}
                        </h4>
                        <p className="text-black/70 font-open-sans text-sm leading-relaxed">
                          {role.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PE Advantages Section */}
      <section className="relative bg-gradient-to-br from-[#002C5F] to-[#187CC1] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 font-montserrat">
                The Kersten PE Advantage
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Specialized expertise in private equity commercial leadership requirements and value creation strategies.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {peAdvantages.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  custom={index}
                  variants={cardVariants}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20"
                >
                  <div className="mb-6 flex justify-center">
                    {advantage.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 font-montserrat">
                    {advantage.title}
                  </h3>
                  <p className="text-white/90 font-open-sans leading-relaxed">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
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
              Ready to Accelerate Your Portfolio Company Growth?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 font-open-sans leading-relaxed">
              Let's discuss how our PE-focused commercial leadership expertise can help drive value creation in your portfolio companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-[#187CC1] rounded-full hover:bg-gray-100 transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl"
              >
                Start Your Search
              </Link>
              <Link 
                href="/industries/manufacturing-distribution-industrial"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-[#187CC1] transition-all duration-300 font-montserrat font-semibold"
              >
                Manufacturing Overview
              </Link>
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
    </main>
  );
} 