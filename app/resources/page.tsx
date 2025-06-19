'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaBlog, FaFileAlt } from 'react-icons/fa';
import { getBlogPosts } from '@/app/api/blog/api';
import { fetchWhitepapers } from '@/app/utils/blog-helpers';

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

export default function ResourcesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [elementTop, setElementTop] = useState(0);
  const [blogCount, setBlogCount] = useState('Loading...');
  const [whitepaperCount, setWhitepaperCount] = useState('Loading...');
  const ref = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsLoaded(true);
    if (ref.current) {
      setElementTop(ref.current.offsetTop);
    }

    // Fetch actual counts from Strapi
    const fetchCounts = async () => {
      try {
        // Fetch blog posts count
        const blogResponse = await getBlogPosts({
          pagination: {
            page: 1,
            pageSize: 1, // Only need count, not the actual data
          },
        });
        const totalBlogPosts = blogResponse.meta?.pagination?.total || 0;
        setBlogCount(`${totalBlogPosts} Articles`);

        // Fetch whitepapers count
        const whitepapers = await fetchWhitepapers(100); // Fetch all to get count
        setWhitepaperCount(`${whitepapers.length} Papers`);
      } catch (error) {
        console.error('Error fetching counts:', error);
        setBlogCount('Available');
        setWhitepaperCount('Available');
      }
    };

    fetchCounts();
  }, []);

  // Resource categories - only Blog and White Papers
  const resourceCategories = [
    {
      title: "Thought Leadership Blog",
      description: "Insights and analysis on executive talent acquisition trends, leadership strategies, and industry developments.",
      icon: <FaBlog className="w-12 h-12 text-[#0C6BAF]" />,
      count: blogCount,
      link: "/blog"
    },
    {
      title: "White Papers",
      description: "In-depth research and strategic frameworks for modern executive search and talent acquisition.",
      icon: <FaFileAlt className="w-12 h-12 text-[#0C6BAF]" />,
      count: whitepaperCount,
      link: "/guides"
    }
  ];

  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/resources.jpg"
            alt="Kersten Talent Capital Resources"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C6BAF]/10 via-[#0C6BAF]/40 to-[#0C6BAF]/60 z-10" />

        {/* Main Content */}
        <div className="relative z-20 flex flex-col h-[80vh] sm:h-[70vh] md:h-[80vh] w-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col justify-center h-full md:items-start items-center md:text-left text-center max-w-5xl">
            {/* Main headline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-6 md:mb-8 pt-40">
              <h1
                className="relative font-montserrat text-[4rem] md:text-[4.5rem] lg:text-[6rem] leading-tight font-black text-white drop-shadow-lg"
                style={{
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  animation: isLoaded ? 'slideRight 1.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
                }}
              >
                <span className="text-white block">Resources</span>
              </h1>
            </div>
            {/* Subheadline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-10">
              <p className="max-w-5xl md:text-left text-center text-white font-open-sans font-normal text-lg md:text-xl lg:text-2xl" style={{lineHeight: '1.7'}}>
                At Kersten Talent Capital, we pride ourselves on staying finger on the pulse of the industries we serve—their needs, achievements, and hiring goals. Explore our Thought Leadership Blog and White Papers to discover how your sector is making the most of transformational leadership in their search for the next great innovation frontier.
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

      {/* Resource Categories Section */}
      <section className="relative w-full bg-white py-16 md:py-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <span className="text-[#0C6BAF] font-montserrat font-semibold text-lg md:text-xl tracking-wide">
                Explore Our Knowledge Hub
              </span>
            </motion.div>

            <motion.h2 
              className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-[#002C5F] mb-8 leading-tight"
              variants={itemVariants}
            >
              Resource Categories
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
          </motion.div>

          {/* Resource Categories Grid - Now 2 columns for just Blog and White Papers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-left group hover:scale-[1.02] border border-gray-100"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-20 h-20 bg-[#0C6BAF]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <span className="text-sm font-montserrat font-semibold text-[#0C6BAF] bg-[#0C6BAF]/10 px-3 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
                <h4 className="font-montserrat text-xl md:text-2xl font-bold text-[#002C5F] mb-4 leading-tight">
                  {category.title}
                </h4>
                <p className="font-open-sans text-gray-700 leading-relaxed text-base md:text-lg mb-6">
                  {category.description}
                </p>
                <Link href={category.link}>
                  <div className="inline-flex items-center text-[#0C6BAF] font-montserrat font-semibold hover:text-[#187CC1] transition-colors duration-300">
                    Explore {category.title}
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Insights Section */}
      <section className="relative w-full bg-gradient-to-b from-[#002C5F] to-[#005A9C] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2 
              className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight"
              variants={itemVariants}
            >
              Stay Ahead of Industry Trends
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
                <path d="M5.1661 0H626.166L5.1661 16C-1.18851 9.74819 -2.23569 6.25249 5.1661 0Z" fill="#71C8F3"/>
              </svg>
            </motion.div>

            <motion.p
              className="font-open-sans text-lg md:text-xl text-white leading-relaxed mb-12 max-w-5xl mx-auto"
              variants={itemVariants}
              style={{ lineHeight: '1.7' }}
            >
              Our resources are continuously updated to reflect the latest trends in executive search, leadership development, and organizational transformation. From emerging market insights to proven methodologies, we provide the intelligence you need to make informed talent decisions.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link href="/blog">
                <div className="bg-gradient-to-r from-[#71C8F3] to-[#0C6BAF] hover:from-[#71C8F3] hover:to-[#187CC1] text-white font-semibold font-montserrat px-8 py-4 rounded-md text-lg shadow-lg transition-all duration-300">
                  Read Latest Articles
                </div>
              </Link>
              <Link href="/guides">
                <div className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#002C5F] font-semibold font-montserrat px-8 py-4 rounded-md text-lg transition-all duration-300">
                  Download White Papers
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.div 
              className="bg-gradient-to-r from-[#002C5F] to-[#0C6BAF] rounded-3xl p-12 text-white"
              variants={itemVariants}
            >
              <h4 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                Ready to Transform Your Leadership Team?
              </h4>
              <p className="font-open-sans text-lg md:text-xl leading-relaxed mb-8 max-w-4xl mx-auto">
                Leverage our expertise and insights to identify, attract, and retain the transformational leaders your organization needs to thrive in today's competitive landscape.
              </p>
              
              <Link href="/contact-us">
                <div className="inline-block bg-gradient-to-r from-[#71C8F3] to-[#0C6BAF] hover:from-[#71C8F3] hover:to-[#187CC1] text-white font-semibold font-montserrat px-10 py-4 rounded-md text-lg md:text-xl shadow-lg transition-all duration-300">
                  Start Your Search Today
                </div>
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
      `}</style>
    </main>
  );
} 