'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaBolt, FaIndustry, FaTruck, FaChartLine, FaUsers, FaHandshake, FaCogs, FaRocket, FaArrowRight, FaLeaf, FaWater, FaFire } from 'react-icons/fa';

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
    title: "Energy Market Navigation & GTM Strategy",
    description: "Leaders who understand wholesale energy markets, capacity auctions, renewable energy certificates, and the intricate dynamics of power trading and risk management through sophisticated go-to-market approaches.",
    icon: <FaBolt className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Infrastructure Development Leadership",
    description: "Development executives who lead large-scale infrastructure projects, from transmission line construction and substation upgrades to renewable energy installations and grid modernization initiatives.",
    icon: <FaIndustry className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Customer-Centric Commercial Strategy",
    description: "Commercial leaders who develop new service offerings, implement demand response programs, and create value-added services that enhance customer engagement while driving revenue growth.",
    icon: <FaUsers className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Regulatory Excellence & Compliance",
    description: "Leaders with experience in rate case proceedings, regulatory filing requirements, environmental compliance, and building productive relationships with regulatory bodies while advancing commercial objectives.",
    icon: <FaHandshake className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Smart Grid & Digital Transformation",
    description: "Technology leaders who understand smart grid implementation, advanced metering infrastructure, demand response technologies, and the integration of distributed energy resources into utility operations.",
    icon: <FaCogs className="w-8 h-8 text-[#187CC1]" />
  }
];

const roleCategories = [
  {
    category: "C-Suite Revenue & Commercial Leadership",
    roles: [
      {
        title: "Chief Commercial Officer (CCO)",
        description: "Senior executives who lead all commercial functions including sales, marketing, customer experience, and regulatory strategy across utility operations, combining deep industry knowledge with proven commercial acumen"
      },
      {
        title: "Chief Revenue Officer (CRO)",
        description: "Strategic revenue leaders who drive growth in complex utility environments, optimize revenue streams, and navigate regulatory frameworks while implementing innovative GTM strategies"
      },
      {
        title: "Chief Development Officer (CDO)",
        description: "Executive leaders who drive growth through infrastructure development, renewable energy projects, and strategic partnerships across energy markets"
      },
      {
        title: "Executive Vice President of Sales",
        description: "Senior sales executives who lead enterprise-wide commercial strategies, major account relationships, and market development initiatives in utility environments"
      }
    ]
  },
  {
    category: "Strategic Revenue Leadership",
    roles: [
      {
        title: "VP of Sales - Utilities & Energy",
        description: "Leaders with expertise in utility procurement processes, regulatory environments, and infrastructure modernization initiatives, driving revenue through sophisticated GTM approaches"
      },
      {
        title: "VP of Business Development - Energy",
        description: "Partnership leaders who build relationships with utilities, energy companies, and infrastructure providers while developing comprehensive go-to-market strategies"
      },
      {
        title: "VP of Global Accounts - Utilities",
        description: "Enterprise account leaders who manage complex, multi-site utility relationships and major infrastructure project sales"
      },
      {
        title: "VP of Utility Sales",
        description: "Sales executives with deep understanding of electric, gas, and water utility operations and investment cycles"
      }
    ]
  },
  {
    category: "Specialized Commercial Leadership",
    roles: [
      {
        title: "CCO - Energy Trading & Risk",
        description: "Commercial leaders who manage energy portfolio optimization, wholesale market strategies, and commodity risk management"
      },
      {
        title: "CRO - Utility Services",
        description: "Revenue executives who develop new service offerings, distributed energy programs, and customer-centric revenue models"
      },
      {
        title: "Head of Sales - Smart Grid/Utility Tech",
        description: "Executives who understand utility modernization, grid technologies, and energy management solutions"
      },
      {
        title: "Director of Utility Software Sales",
        description: "Sales leaders focused on utility management systems, SCADA, and operational technology"
      }
    ]
  },
  {
    category: "Marketing & Brand Leadership",
    roles: [
      {
        title: "Chief Marketing Officer (CMO)",
        description: "Marketing leaders who build trust and credibility in traditional utility markets while driving digital transformation and implementing comprehensive GTM frameworks"
      },
      {
        title: "VP of Marketing - Utilities",
        description: "Marketing executives who understand utility buyer journeys, regulatory environments, and complex procurement processes"
      },
      {
        title: "Head of Product Marketing - Utilities",
        description: "Strategic marketers who position solutions for utility engineering, operations, and regulatory teams"
      },
      {
        title: "Director of Market Development",
        description: "Growth leaders who identify new market opportunities in evolving utility and energy sectors through innovative GTM strategies"
      }
    ]
  },
  {
    category: "Go-to-Market Strategy & Operations",
    roles: [
      {
        title: "EVP of Strategic Accounts",
        description: "Senior sales leaders managing relationships with major utility customers, municipalities, and wholesale partners"
      },
      {
        title: "VP of Go-to-Market - Utility Tech",
        description: "Strategic leaders who launch technology solutions into conservative utility environments"
      },
      {
        title: "CDO - Infrastructure & Grid",
        description: "Development leaders who oversee transmission projects, grid modernization investments, and capital deployment strategies"
      },
      {
        title: "Director of Sales Engineering",
        description: "Technical sales leaders who bridge complex utility solutions with customer requirements"
      }
    ]
  },
  {
    category: "Digital Growth & Customer Success",
    roles: [
      {
        title: "CRO - Market Operations",
        description: "Revenue leaders who optimize participation in wholesale markets, capacity auctions, and ancillary service programs"
      },
      {
        title: "VP of Growth - Utility Tech",
        description: "Data-driven leaders who optimize lead generation for technical utility audiences"
      },
      {
        title: "Head of Customer Success - Utilities",
        description: "Leaders who drive adoption and expansion in large utility accounts"
      },
      {
        title: "Director of Channel Sales",
        description: "Leaders who build and manage distributor networks, system integrators, and technology partners in utility markets"
      }
    ]
  }
];

const marketSectors = [
  {
    title: "Electric Utilities",
    description: "Generation, transmission, and distribution leadership with wholesale market operations expertise",
    icon: <FaBolt className="w-12 h-12 text-[#ffffff]" />
  },
  {
    title: "Natural Gas Utilities",
    description: "Gas trading, supply management, pipeline operations, and distribution expertise",
    icon: <FaFire className="w-12 h-12 text-[#ffffff]" />
  },
  {
    title: "Water & Wastewater",
    description: "Infrastructure management, environmental compliance, and treatment technologies",
    icon: <FaWater className="w-12 h-12 text-[#ffffff]" />
  },
  {
    title: "Renewable Energy",
    description: "Wind, solar, and emerging renewable technologies with independent power expertise",
    icon: <FaLeaf className="w-12 h-12 text-[#ffffff]" />
  }
];

export default function UtilitiesPage() {
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
            src="/power.jpg"
            alt="Utilities Industry Leadership"
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
              background: 'linear-gradient(135deg, #0C6BAF/90 0%, #71C8F3/85 50%, #005A9C/90 100%)',
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
                <span className="block md:inline">Powering</span>
                <span className="text-white block">the Future</span>
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
              <p className="max-w-4xl md:text-left text-center text-white font-open-sans text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                Utilities Industry Leadership Excellence - Navigating Complex Energy Markets with Proven Commercial Expertise
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

      {/* Introduction Section */}
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
                Utilities Industry Leadership Excellence
              </h2>
              <div className="text-lg text-black/80 font-open-sans leading-relaxed space-y-6">
                <p>
                  In an era of unprecedented transformation, the utilities industry faces a convergence of challenges that demand exceptional commercial leadership. From <span className="font-bold text-[#187CC1]">grid modernization and renewable energy integration</span> to regulatory compliance and customer-centric service delivery, utilities organizations require leaders who can <span className="font-bold text-[#002C5F]">navigate complex stakeholder environments</span> while driving sustainable growth and operational excellence.
                </p>
                <p>
                  <span className="font-bold text-[#187CC1]">Kersten Talent Capital has established itself as the premier partner</span> for utilities companies seeking transformational commercial leadership. Our deep understanding of the utilities landscape—spanning <span className="font-bold text-[#002C5F]">electric, gas, water, and renewable energy sectors</span>—enables us to identify and place executive leaders who combine industry expertise with proven commercial acumen and sophisticated <span className="font-bold text-[#187CC1]">go-to-market strategies</span> to drive organizational success in this rapidly evolving market.
                </p>
                <p>
                  The modern utilities executive operates in an environment characterized by <span className="font-bold text-[#002C5F]">regulatory complexity, technological disruption, and evolving customer expectations.</span> Today's commercial leaders must balance traditional utility operations with emerging market dynamics, including distributed energy resources, smart grid technologies, energy storage solutions, and evolving regulatory frameworks through innovative <span className="font-bold text-[#187CC1]">GTM approaches</span> that optimize revenue while maintaining reliability and safety standards.
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
                Our Utilities Expertise
              </h2>
              <p className="text-lg sm:text-xl text-black/70 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Specialized commercial leadership across all utility sectors where exceptional GTM strategy drives transformation.
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

      {/* Market Sectors Section */}
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
                Market Sector Expertise
              </h2>
              <p className="text-lg sm:text-xl text-white/90 font-open-sans leading-relaxed max-w-4xl mx-auto">
                Comprehensive coverage across all utility market segments with deep GTM expertise.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {marketSectors.map((sector, index) => (
                <motion.div key={sector.title} custom={index} variants={cardVariants}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="mb-6 flex justify-center">
                      {sector.icon}
                    </div>
                    <h3 className="text-xl font-black text-white mb-4 font-montserrat">
                      {sector.title}
                    </h3>
                    <p className="text-white/90 font-open-sans leading-relaxed text-sm">
                      {sector.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Roles Section */}
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
                Utilities Leadership Roles We Place
              </h2>
              <p className="text-lg sm:text-xl text-black/70 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Comprehensive coverage of commercial leadership positions across all utility sectors with GTM expertise.
              </p>
            </motion.div>

            {/* Role Categories */}
            <div className="space-y-12">
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

      {/* Why Kersten Section */}
      <section className="relative bg-gradient-to-br from-[#0C6BAF] to-[#71C8F3] py-16 md:py-24">
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
                Why Kersten Talent Capital for Utilities Leadership?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 font-open-sans leading-relaxed max-w-4xl mx-auto">
                Proven expertise in utilities commercial leadership with deep GTM strategy understanding.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-black mb-4 font-montserrat text-white">
                  Deep Industry Networks
                </h4>
                <p className="text-white/90 font-open-sans leading-relaxed mb-6">
                  Extensive networks across investor-owned utilities, municipal utilities, cooperative systems, and independent power producers with understanding of career paths and compensation structures.
                </p>
                <h4 className="text-xl font-black mb-4 font-montserrat text-white">
                  Regulatory and Technical Understanding
                </h4>
                <p className="text-white/90 font-open-sans leading-relaxed">
                  Deep understanding of utilities regulation, technology trends, and market dynamics enabling effective candidate evaluation and client matching with GTM expertise.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-black mb-4 font-montserrat text-white">
                  Proven Track Record
                </h4>
                <p className="text-white/90 font-open-sans leading-relaxed mb-6">
                  Successfully placed utilities commercial leaders across all market segments, from Fortune 500 investor-owned utilities to emerging renewable energy companies.
                </p>
                <h4 className="text-xl font-black mb-4 font-montserrat text-white">
                  Long-Term Partnership Approach
                </h4>
                <p className="text-white/90 font-open-sans leading-relaxed">
                  Emphasis on sustainable placements that create lasting value for both clients and candidates, supporting long-term success of utilities organizations.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Specialties Section */}
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
                Related Specialties
              </h2>
              <p className="text-lg sm:text-xl text-black/70 font-open-sans leading-relaxed">
                Explore our other specialized focus areas within industrial and manufacturing sectors.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div custom={0} variants={cardVariants}>
                <Link href="/industries/manufacturing-distribution-industrial/pe-backed-entities" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-[#0C6BAF]/20">
                    <FaChartLine className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h4 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      PE-Backed Manufacturing Entities
                    </h4>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Specialized commercial leadership for private equity-backed manufacturing and industrial companies driving accelerated growth and value creation.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Explore Specialty</span>
                      <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
              
              <motion.div custom={1} variants={cardVariants}>
                <Link href="/industries/sales-marketing-go-to-market" className="block group">
                  <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-[#0C6BAF]/20">
                    <FaRocket className="w-12 h-12 text-[#0C6BAF] mb-6" />
                    <h4 className="text-xl font-black text-[#002C5F] mb-4 font-montserrat">
                      Sales, Marketing & GTM Leadership
                    </h4>
                    <p className="text-black/70 font-open-sans leading-relaxed mb-4">
                      Comprehensive revenue leadership roles across industrial and utilities sectors with specialized GTM expertise.
                    </p>
                    <div className="flex items-center text-[#0C6BAF] group-hover:text-[#187CC1] transition-colors font-montserrat font-semibold">
                      <span>Explore Roles</span>
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
      <section className="relative bg-gradient-to-br from-[#002C5F] to-[#0C6BAF] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 font-montserrat">
              Ready to Transform Your Utilities Operations?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 font-open-sans leading-relaxed">
              Let's discuss how our utilities industry expertise and GTM strategy knowledge can help you identify the commercial leaders your organization needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-[#002C5F] rounded-full hover:bg-gray-100 transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl"
              >
                Start Your Search
              </Link>
              <Link 
                href="/industries/manufacturing-distribution-industrial"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-[#002C5F] transition-all duration-300 font-montserrat font-semibold"
              >
                Manufacturing & Industrial
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 