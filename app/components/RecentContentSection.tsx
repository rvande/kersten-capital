'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost, Whitepaper } from '@/app/types/blog';
import { formatDate } from '@/app/utils/blog-helpers';

interface RecentContentSectionProps {
  blogPosts: BlogPost[];
  whitepapers?: Whitepaper[];
}

// Blog post card component with hover effects
function BlogPostCard({ post, index, delay }: { post: BlogPost; index: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="relative group"
    >
      {/* Blue background - positioned behind card */}
      <div className="absolute inset-0 bg-[#0C6BAF] rounded-xl transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
      
      {/* Main card */}
      <motion.div 
        className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative aspect-[16/9] w-full">
            {post.coverImage ? (
              <Image
                src={typeof post.coverImage === 'string' 
                  ? post.coverImage 
                  : post.coverImage.url || '/blog-placeholder.jpg'}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <Image
                src={index % 2 === 0 ? "/search.jpg" : "/leadership.jpg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>
          <div className="p-6">
            <p className="text-sm text-[#0C6BAF] mb-2 font-montserrat font-semibold">{formatDate(post.publishedAt)}</p>
            <h4 className="text-xl md:text-2xl font-black mb-3 text-[#002C5F] line-clamp-2 font-montserrat">{post.title}</h4>
            <p className="text-black/70 line-clamp-2 mb-4 font-open-sans leading-relaxed">{post.excerpt}</p>
            <span className="text-[#0C6BAF] text-lg font-semibold inline-flex items-center hover:text-[#002C5F] font-montserrat">
              Read more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="presentation">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// Whitepaper card component with hover effects
function WhitepaperCard({ whitepaper, index, delay }: { whitepaper: Whitepaper; index: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Handle both flat structure and nested structure
  const title = whitepaper.Title || whitepaper?.attributes?.Title || "Untitled Whitepaper";
  const description = whitepaper.Description || whitepaper?.attributes?.Description || "No description available";
  
  const coverImageUrl = whitepaper.CoverImage?.url || 
    whitepaper.CoverImage?.formats?.large?.url ||
    whitepaper?.attributes?.CoverImage?.data?.attributes?.url;
  
  const documentUrl = whitepaper.Document?.url ||
    whitepaper?.attributes?.Document?.data?.attributes?.url || '#';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="relative group"
    >
      {/* Blue background - positioned behind card */}
      <div className="absolute inset-0 bg-[#0C6BAF] rounded-xl transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
      
      {/* Main card */}
      <motion.div 
        className="relative bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 flex flex-col md:flex-row gap-6"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="md:w-1/3 relative h-[200px] md:h-full min-h-[200px]">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          ) : (
            <Image
              src={index % 2 === 0 ? "/search.jpg" : "/leadership.jpg"}
              alt={title}
              fill
              className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          )}
        </div>
        <div className="md:w-2/3">
          <h4 className="text-2xl font-black mb-3 text-[#002C5F] font-montserrat">{title}</h4>
          <p className="text-black/70 mb-5 font-open-sans leading-relaxed">{description}</p>
          <Link 
            href={documentUrl} 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat font-semibold"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${title} PDF (opens in new tab)`}
          >
            Download PDF
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="presentation">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RecentContentSection({ blogPosts, whitepapers = [] }: RecentContentSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Refs for scroll animations
  const headingRef = useRef(null);
  const searchRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true });
  const isSearchInView = useInView(searchRef, { once: true, margin: "-50px" });

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Make sure we have valid arrays to work with
  const validBlogPosts = Array.isArray(blogPosts) ? blogPosts : [];
  const validWhitepapers = Array.isArray(whitepapers) ? whitepapers : [];

  // Filter content based on search and category
  const filteredBlogPosts = validBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || selectedCategory === 'blog';
    return matchesSearch && matchesCategory;
  });

  const filteredWhitepapers = validWhitepapers.filter(whitepaper => {
    const title = whitepaper.Title || whitepaper?.attributes?.Title || "";
    const description = whitepaper.Description || whitepaper?.attributes?.Description || "";
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || selectedCategory === 'whitepaper';
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative w-full overflow-hidden">
      {/* Solid Dark Blue Background for entire page */}
      <div className="absolute inset-0 bg-[#002C5F]"></div>

      {/* Hero Section with Image Background */}
      <section className="relative w-full overflow-hidden pt-15 md:py-32 lg:pb-10">
        {/* Hero Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-top bg-no-repeat"
            style={{
              backgroundImage: 'url(/mountain.jpg)',
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Additional gradient overlay */}
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              background: 'linear-gradient(-45deg, #002C5F, #0C6BAF, #005A9C, #187CC1, #71C8F3, #0C6BAF, #002C5F)',
              backgroundSize: '400% 400%',
            }}
          />
        </div>

        {/* Diagonal SVG Overlay - Top */}
        <div className="absolute left-0 right-0 top-0 w-full pointer-events-none select-none z-20">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="100%" 
            height="130px" 
            viewBox="0 0 1280 140" 
            preserveAspectRatio="none"
            className="w-full h-[75px] md:h-[130px] rotate-180"
          >
            <g fill="#002c5f">
              <path d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z" />
              <path d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z" fill="#ffffff" />
            </g>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-7xl mt-8 mx-auto">
            
            {/* Header Section */}
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 50 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-montserrat"
                style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)' }}
                initial={{ scale: 0.9 }}
                animate={isHeadingInView ? { scale: 1 } : { scale: 0.9 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                Latest Insights
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto font-open-sans leading-relaxed"
                style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}
                initial={{ opacity: 0 }}
                animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Stay ahead with our latest thinking on executive talent acquisition, 
                leadership trends, and strategic hiring practices.
              </motion.p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, y: 40 }}
              animate={isSearchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-2xl max-w-4xl mx-auto mb-8 border border-white/20"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white h-5 w-5"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    role="presentation"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search articles and whitepapers"
                    className="w-full pl-12 pr-6 py-4 rounded-full bg-[#002C5F] border border-[#002C5F] focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none font-open-sans text-white placeholder:text-white/70"
                  />
                </div>
                
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Filter content by category"
                    className="appearance-none bg-[#002C5F] border border-[#002C5F] rounded-full px-6 py-4 pr-12 md:pr-10 focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none font-montserrat font-semibold text-white cursor-pointer"
                  >
                    <option value="all">All Content</option>
                    <option value="blog">Articles</option>
                    <option value="whitepaper">Whitepapers</option>
                  </select>
                  <svg className="absolute right-3 md:right-3 top-1/2 transform -translate-y-1/2 text-white h-6 w-6 md:h-5 md:w-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="relative z-10 container mx-auto px-4 pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Blog Posts Section */}
          {(selectedCategory === 'all' || selectedCategory === 'blog') && filteredBlogPosts.length > 0 && (
            <div className="mb-20">
              <motion.div 
                className="flex items-center justify-between mb-12"
                initial={{ opacity: 0, x: -30 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-3xl md:text-4xl font-black text-white font-montserrat">Recent Articles</h3>
                <Link 
                  href="/blog" 
                  className="text-white text-lg font-semibold hover:text-[#71C8F3] flex items-center transition-colors duration-300 font-montserrat"
                >
                  View all
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="presentation">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                {filteredBlogPosts.slice(0, 3).map((post, index) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    index={index}
                    delay={index * 0.2}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Whitepapers Section */}
          {(selectedCategory === 'all' || selectedCategory === 'whitepaper') && filteredWhitepapers.length > 0 && (
            <div className="mb-20">
              <motion.div 
                className="flex items-center justify-between mb-12"
                initial={{ opacity: 0, x: -30 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-3xl md:text-4xl font-black text-white font-montserrat">Whitepapers & Research</h3>
                <Link 
                  href="/resources" 
                  className="text-white text-lg font-semibold hover:text-[#71C8F3] flex items-center transition-colors duration-300 font-montserrat"
                >
                  View all
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="presentation">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                {filteredWhitepapers.slice(0, 2).map((whitepaper, index) => (
                  <WhitepaperCard
                    key={whitepaper.id || index}
                    whitepaper={whitepaper}
                    index={index}
                    delay={index * 0.2}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Results Message */}
          {searchTerm && filteredBlogPosts.length === 0 && filteredWhitepapers.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 max-w-2xl mx-auto">
                <svg className="w-16 h-16 text-[#0C6BAF] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-2xl font-black text-[#002C5F] mb-4 font-montserrat">No results found</h3>
                <p className="text-black/70 font-open-sans">Try adjusting your search terms or browse all content.</p>
              </div>
            </motion.div>
          )}
          
          {/* CTA Section */}
          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-10 md:p-12 shadow-2xl border border-white/20"
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                <h3 className="text-3xl md:text-4xl font-black mb-4 text-[#002C5F] font-montserrat">Ready to Transform Your Executive Hiring?</h3>
                <p className="text-black/70 mb-6 text-lg md:text-xl font-open-sans leading-relaxed">
                  Partner with Kersten Talent Capital to find exceptional leaders who will drive your company's growth and success.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/contact" 
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat font-semibold"
                  >
                    Schedule a Consultation
                  </Link>
                  <Link 
                    href="/services" 
                    className="inline-block px-8 py-4 bg-transparent border-2 border-[#0C6BAF] text-[#0C6BAF] rounded-full hover:bg-[#0C6BAF] hover:text-white transition-all duration-300 font-montserrat font-semibold"
                  >
                    Explore Our Services
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isLoaded ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Image 
                    src="/rocket.svg"
                    alt="Rocket icon"
                    width={100}
                    height={100}
                    className="text-[#0C6BAF] w-auto h-auto"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 