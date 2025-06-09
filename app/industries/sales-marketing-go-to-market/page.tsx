'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaChartLine, FaUsers, FaRocket, FaCogs, FaHandshake, FaIndustry, FaShoppingCart, FaBolt, FaLaptopCode, FaArrowRight } from 'react-icons/fa';

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
    title: "Revenue Leadership - Industrial & Utilities",
    description: "Strategic revenue leaders who drive growth in complex B2B environments with long sales cycles and technical decision-makers, navigating utility procurement processes and infrastructure modernization while optimizing GTM strategies.",
    icon: <FaChartLine className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Strategic Account Management & GTM Excellence",
    description: "Enterprise account leaders who manage complex, multi-site manufacturing relationships and capital project sales, building distributor networks and technology partnerships through sophisticated go-to-market approaches.",
    icon: <FaHandshake className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Specialized Sales Leadership",
    description: "Sales leaders who communicate ROI of Industry 4.0 technologies, smart grid solutions, and supply chain optimization to operations and engineering teams through targeted GTM strategies.",
    icon: <FaCogs className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Marketing & Brand Leadership",
    description: "Marketing leaders who build trust and credibility in traditional industrial markets while driving digital transformation and understanding technical buyer journeys through comprehensive GTM frameworks.",
    icon: <FaUsers className="w-8 h-8 text-[#187CC1]" />
  },
  {
    title: "Go-to-Market Strategy & Operations",
    description: "Strategic leaders who launch technology solutions into conservative manufacturing environments and build relationships with utilities, energy companies, and infrastructure providers through innovative GTM models.",
    icon: <FaRocket className="w-8 h-8 text-[#187CC1]" />
  }
];

const roleCategories = [
  {
    category: "C-Suite Revenue & Commercial Leadership",
    roles: [
      {
        title: "Chief Commercial Officer (CCO)",
        description: "Senior executives who lead all commercial functions including sales, marketing, customer experience, and regulatory strategy across industrial, manufacturing, and utility operations. These leaders combine deep industry knowledge with proven commercial acumen, managing multi-billion dollar revenue portfolios while navigating complex regulatory environments. They excel at building commercial strategies that balance stakeholder interests, drive sustainable growth, and optimize GTM approaches across diverse market segments."
      },
      {
        title: "Chief Revenue Officer (CRO)",
        description: "Strategic revenue leaders who drive growth in complex B2B environments, optimize revenue streams, and navigate regulatory frameworks in utilities and industrial sectors. CRO candidates understand wholesale market operations, retail customer management, demand response programs, and complex revenue recognition requirements. They have proven track records in revenue optimization, pricing strategy development, and implementing new commercial models that enhance financial performance while maintaining regulatory compliance."
      },
      {
        title: "Chief Development Officer (CDO)",
        description: "Executive leaders who drive growth through infrastructure development, market expansion, and strategic partnerships across industrial and energy markets. Development leadership encompasses renewable energy project development, grid modernization initiatives, and strategic market expansion. CDO candidates bring experience in project finance, regulatory approval processes, environmental compliance, and complex stakeholder management required for successful utilities and industrial development."
      },
      {
        title: "Executive Vice President of Sales",
        description: "Senior sales executives who lead enterprise-wide commercial strategies, major account relationships, and market development initiatives. EVP of Sales roles require leaders who can manage complex stakeholder relationships, from industrial customers and municipal accounts to wholesale market participants and regulatory bodies. These executives understand unique sales cycles, long-term contract negotiations, regulatory approval processes, and the technical expertise required for industrial and utilities sales success."
      }
    ]
  },
  {
    category: "Strategic Revenue Leadership",
    roles: [
      {
        title: "VP of Sales - Industrial Solutions",
        description: "Sales executives who understand manufacturing processes, capital equipment sales, and multi-stakeholder buying committees. These leaders excel at communicating ROI of complex industrial solutions to operations and engineering teams, managing long sales cycles with technical decision-makers, and building relationships with plant managers, operations executives, and procurement teams. They understand manufacturing environments, capital project sales, and the unique challenges of selling into industrial markets."
      },
      {
        title: "VP of Sales - Utilities & Energy",
        description: "Leaders with expertise in utility procurement processes, regulatory environments, and infrastructure modernization initiatives. These executives understand utility company hierarchies, infrastructure investment cycles, and the complex regulatory frameworks governing utility operations. They excel at selling grid modernization technologies, energy management solutions, and infrastructure projects while navigating utility procurement processes and regulatory requirements."
      },
      {
        title: "VP of Global Accounts - Industrial",
        description: "Enterprise account leaders who manage complex, multi-site manufacturing relationships and capital project sales. These leaders build and maintain strategic relationships with major industrial customers, managing multi-million dollar accounts across global operations. They understand complex procurement processes, capital equipment sales cycles, and the relationship management required for long-term industrial partnerships."
      },
      {
        title: "VP of Business Development - Energy",
        description: "Partnership leaders who build relationships with utilities, energy companies, and infrastructure providers while developing comprehensive go-to-market strategies. These executives identify and execute strategic partnerships, acquisitions, and market expansion opportunities in energy markets. They understand energy market dynamics, regulatory environments, and the complex stakeholder management required for successful energy business development."
      }
    ]
  },
  {
    category: "Specialized Commercial Leadership",
    roles: [
      {
        title: "CCO - Energy Trading & Risk",
        description: "Commercial leaders who manage energy portfolio optimization, wholesale market strategies, and commodity risk management. These executives understand energy trading, power markets, capacity auctions, and the financial instruments used in energy risk management. They excel at developing commercial strategies that optimize energy portfolios while managing commodity price risk and regulatory compliance requirements."
      },
      {
        title: "CRO - Utility Services",
        description: "Revenue executives who develop new service offerings, distributed energy programs, and customer-centric revenue models. These leaders understand the transition toward customer-centricity in utilities, developing new service offerings that enhance customer engagement while driving revenue growth. They excel at implementing demand response programs, distributed energy resources, and value-added services that balance regulatory requirements with customer satisfaction."
      },
      {
        title: "VP of Sales - Automation & IoT",
        description: "Sales leaders who communicate ROI of Industry 4.0 technologies to operations and engineering teams. These executives understand industrial automation, IoT implementations, and the technical sales process required for complex technology solutions. They excel at bridging operational and information technology, demonstrating value propositions for smart factory technologies, and managing technical sales cycles with engineering decision-makers."
      },
      {
        title: "Head of Sales - Smart Grid/Utility Tech",
        description: "Executives who understand utility modernization, grid technologies, and energy management solutions. These leaders excel at selling smart grid technologies, advanced metering infrastructure, and utility automation systems. They understand utility operations, grid modernization requirements, and the technical expertise required for utility technology sales while navigating regulatory approval processes."
      }
    ]
  },
  {
    category: "Marketing & Brand Leadership",
    roles: [
      {
        title: "Chief Marketing Officer (CMO)",
        description: "Marketing leaders who build trust and credibility in traditional industrial markets while driving digital transformation and implementing comprehensive GTM frameworks. CMO candidates understand the unique challenges of marketing in regulated industries, building brand authority while driving demand generation. They excel at technical product positioning, enterprise buyer journeys, and marketing strategies that enhance customer acquisition in complex B2B environments."
      },
      {
        title: "VP of Marketing - B2B Industrial",
        description: "Marketing executives who understand technical buyer journeys and complex procurement processes in industrial markets. These leaders excel at marketing to technical audiences, understanding manufacturing processes, and developing marketing strategies that resonate with operations and engineering teams. They understand long sales cycles, multi-stakeholder decision-making, and the content marketing required for technical B2B sales."
      },
      {
        title: "Head of Product Marketing - Utilities",
        description: "Strategic marketers who position solutions for utility engineering, operations, and regulatory teams. These leaders understand utility operations, regulatory requirements, and the unique challenges of marketing to utility decision-makers. They excel at technical product positioning, regulatory compliance messaging, and developing marketing strategies that address utility modernization requirements."
      },
      {
        title: "Director of Market Development",
        description: "Growth leaders who identify new market opportunities in evolving industrial and utility sectors through innovative GTM strategies. These executives excel at market research, competitive analysis, and identifying emerging opportunities in industrial and energy markets. They understand market dynamics, regulatory trends, and the strategic planning required for successful market expansion initiatives."
      }
    ]
  },
  {
    category: "Go-to-Market Strategy & Operations",
    roles: [
      {
        title: "EVP of Strategic Accounts",
        description: "Senior sales leaders managing relationships with major industrial customers, municipalities, and wholesale partners. These executives manage the most valuable customer relationships, developing strategic account plans that drive long-term revenue growth. They understand complex stakeholder management, municipal procurement processes, and the relationship building required for major account success in industrial and utility markets."
      },
      {
        title: "VP of Go-to-Market - Industrial IoT",
        description: "Strategic leaders who launch technology solutions into conservative manufacturing environments through innovative GTM models. These executives understand the unique challenges of selling technology into traditional industrial markets, developing GTM strategies that address conservative buying behaviors and long adoption cycles. They excel at technology positioning, change management, and the strategic planning required for successful technology launches."
      },
      {
        title: "CDO - Infrastructure & Grid",
        description: "Development leaders who oversee transmission projects, grid modernization investments, and capital deployment strategies. These executives manage large-scale infrastructure development, understanding project finance, regulatory approval processes, and the complex stakeholder management required for infrastructure projects. They excel at capital project management, regulatory compliance, and the strategic planning required for successful infrastructure development."
      },
      {
        title: "Director of Sales Engineering",
        description: "Technical sales leaders who bridge complex solutions with customer requirements in industrial and utility environments. These leaders combine technical expertise with sales acumen, supporting complex solution selling and customer technical requirements. They excel at technical presentations, solution design, and the technical sales support required for complex industrial and utility technology sales."
      }
    ]
  },
  {
    category: "Digital Growth & Customer Success",
    roles: [
      {
        title: "CRO - Market Operations",
        description: "Revenue leaders who optimize participation in wholesale markets, capacity auctions, and ancillary service programs. These executives understand wholesale energy markets, capacity planning, and the complex market operations that drive utility revenue. They excel at market strategy development, revenue optimization, and the analytical skills required for successful wholesale market participation."
      },
      {
        title: "VP of Growth - Industrial Tech",
        description: "Data-driven leaders who optimize lead generation for technical B2B audiences in industrial and manufacturing markets. These executives understand digital marketing, lead generation, and the customer acquisition strategies required for technical B2B markets. They excel at marketing automation, sales funnel optimization, and the data analytics required for successful growth marketing in industrial environments."
      },
      {
        title: "Head of Customer Success - Enterprise",
        description: "Leaders who drive adoption and expansion in large manufacturing and utility accounts. These executives manage customer success programs that drive retention, expansion, and lifetime value optimization in complex enterprise accounts. They understand customer onboarding, adoption metrics, and the relationship management required for successful customer success in industrial and utility markets."
      },
      {
        title: "Director of Channel Sales",
        description: "Leaders who build and manage distributor networks, system integrators, and technology partners in utility and industrial markets. These executives develop channel strategies that accelerate market penetration through partner networks. They excel at partner relationship management, channel enablement, and the strategic planning required for successful channel development in complex B2B markets."
      }
    ]
  }
];

const otherIndustries = [
  {
    title: "Technology & Financial Services",
    href: "/industries/technology-financial-services",
    icon: <FaLaptopCode className="w-6 h-6 text-white" />,
    gradient: "from-[#0C6BAF] to-[#187CC1]"
  },
  {
    title: "Manufacturing, Distribution & Industrial",
    href: "/industries/manufacturing-distribution-industrial",
    icon: <FaIndustry className="w-6 h-6 text-white" />,
    gradient: "from-[#187CC1] to-[#71C8F3]"
  },
  {
    title: "E-Commerce & Digital Retail",
    href: "/industries/e-commerce-digital-retail",
    icon: <FaShoppingCart className="w-6 h-6 text-white" />,
    gradient: "from-[#71C8F3] to-[#005A9C]"
  },
  {
    title: "Energy, Renewables & Mining",
    href: "/industries/energy-renewables-mining",
    icon: <FaBolt className="w-6 h-6 text-white" />,
    gradient: "from-[#005A9C] to-[#002C5F]"
  }
];

export default function SalesMarketingGoToMarketPage() {
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
            src="/marketing.jpg"
            alt="Sales, Marketing & Go-to-Market Leadership"
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
                <span className="block">Sales, Marketing &</span>
                <span className="text-white block">Go-to-Market</span>
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
              <p className="max-w-4xl md:text-left text-center text-white font-open-sans text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                Identifying revenue leaders who drive growth in complex B2B environments, specializing in industrial and utilities sectors with deep understanding of technical sales cycles and strategic account management.
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
                Revenue Leadership Excellence
              </h2>
              <div className="text-lg text-black/80 font-open-sans leading-relaxed space-y-6">
                <p>
                  <span className="font-bold text-[#187CC1]">Kersten Talent Capital specializes in identifying revenue leaders</span> who excel in complex B2B environments, particularly within <span className="font-bold text-[#002C5F]">industrial and utilities sectors.</span> Our deep understanding of these markets' unique challenges—from long sales cycles to technical decision-makers—enables us to connect you with <span className="font-bold text-[#187CC1]">exceptional sales, marketing, and go-to-market professionals</span> who drive sustainable revenue growth through sophisticated GTM strategies.
                </p>
                <p>
                  Our expertise spans <span className="font-bold text-[#002C5F]">manufacturing processes, capital equipment sales, utility procurement, and infrastructure modernization.</span> We excel at finding leaders who can navigate multi-stakeholder buying committees, regulatory environments, and <span className="font-bold text-[#187CC1]">complex technical sales cycles</span> while implementing innovative go-to-market approaches that optimize customer acquisition and revenue expansion across industrial and utility markets.
                </p>
                <p>
                  With a <span className="font-bold text-[#002C5F]">proven methodology that evaluates both technical acumen and GTM leadership capability,</span> Kersten Talent Capital consistently delivers revenue leadership talent that <span className="font-bold text-[#187CC1]">transforms industrial and utility organizations</span> through strategic growth initiatives, market development excellence, and comprehensive go-to-market execution.
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
                Specialized expertise across revenue leadership disciplines that drive growth in industrial and utilities markets.
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
                Leadership Roles We Place
              </h2>
              <p className="text-lg sm:text-xl text-black/70 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Comprehensive coverage of revenue leadership positions across industrial and utilities sectors.
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

      {/* Other Industries Section */}
      <section className="relative bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002C5F] mb-6 font-montserrat">
                Explore Other Industries
              </h2>
              <p className="text-lg sm:text-xl text-black/70 max-w-3xl mx-auto font-open-sans leading-relaxed">
                Discover our specialized expertise across additional high-growth sectors.
              </p>
            </motion.div>

            {/* Industries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherIndustries.map((industry, index) => (
                <motion.div
                  key={industry.title}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="group"
                >
                  <Link href={industry.href} className="block h-full">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full border border-gray-100 hover:border-[#0C6BAF]/20">
                      {/* Industry Icon & Header */}
                      <div className={`bg-gradient-to-br ${industry.gradient} p-6 relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                        <div className="relative z-10">
                          <div className="mb-4">
                            {industry.icon}
                          </div>
                          <h3 className="text-lg font-black text-white font-montserrat leading-tight">
                            {industry.title}
                          </h3>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="p-6">
                        <div className="flex items-center text-[#0C6BAF] font-semibold font-montserrat group-hover:text-[#187CC1] transition-colors">
                          <span>Explore Sector</span>
                          <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
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
              Ready to Transform Your Revenue Leadership?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 font-open-sans leading-relaxed">
              Let's discuss how our specialized expertise in industrial and utilities markets can help you identify the revenue leaders your organization needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-[#002C5F] rounded-full hover:bg-gray-100 transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl"
              >
                Start Your Search
              </Link>
              <Link 
                href="/our-approach"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-[#002C5F] transition-all duration-300 font-montserrat font-semibold"
              >
                Our Approach
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 