'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaArrowLeft, FaShare, FaLinkedin, FaXTwitter, FaFacebook } from 'react-icons/fa6';
import { getS3URL } from '../../api/api';
import { formatDate, getReadingTime } from '../../utils/blog-helpers';
import RichTextRenderer from '../../components/RichTextRenderer';
import MarkdownRenderer from '@/app/components/MarkdownRenderer';
import TableOfContents from '@/app/components/TableOfContents';

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

interface BlogPostClientProps {
  post: {
    title: string;
    publishedAt: string;
    excerpt?: string;
    content: any;
    coverImage?: any;
    categories?: any[];
    slug: string;
    markdownContent?: string;
  };
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    // Debug logging to see what content we're receiving
    console.log('BlogPostClient received post:', {
      title: post.title,
      hasContent: !!post.content,
      contentType: typeof post.content,
      contentIsArray: Array.isArray(post.content),
      contentLength: Array.isArray(post.content) ? post.content.length : 'n/a',
      hasMarkdownContent: !!post.markdownContent,
      markdownContentType: typeof post.markdownContent,
      markdownContentLength: post.markdownContent ? post.markdownContent.length : 'n/a',
      contentPreview: post.content ? JSON.stringify(post.content).substring(0, 200) : 'none',
      markdownPreview: post.markdownContent ? post.markdownContent.substring(0, 200) : 'none'
    });
  }, [post]);

  // Get cover image URL
  const getCoverImageUrl = () => {
    if (!post.coverImage) {
      return null; // Return null instead of placeholder to use gradient
    }
    
    const image = post.coverImage as any;
    
    if (typeof image === 'string') {
      return image.startsWith('http') ? image : getS3URL(image);
    }
    
    if (image.url) {
      return image.url.startsWith('http') ? image.url : getS3URL(image.url);
    }
    
    // Try to handle formats[large] for Strapi v5
    if (image.formats && image.formats.large && image.formats.large.url) {
      return image.formats.large.url.startsWith('http') 
        ? image.formats.large.url 
        : getS3URL(image.formats.large.url);
    }
    
    // Check for nested data
    if (image.data && image.data.attributes) {
      const attrs = image.data.attributes;
      if (attrs.url) {
        return attrs.url.startsWith('http') ? attrs.url : getS3URL(attrs.url);
      }
      if (attrs.formats && attrs.formats.large && attrs.formats.large.url) {
        return attrs.formats.large.url.startsWith('http') 
          ? attrs.formats.large.url 
          : getS3URL(attrs.formats.large.url);
      }
    }
    
    return null; // Return null instead of placeholder to use gradient
  };

  const coverImageUrl = getCoverImageUrl();
  const formattedDate = formatDate(post.publishedAt);
  const readingTime = post.content ? getReadingTime(JSON.stringify(post.content)) : 0;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareOnSocial = (platform: string) => {
    const text = `Check out this article: ${post.title}`;
    const url = currentUrl;
    
    let shareUrl = '';
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'x':
        shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <main className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="hero-section relative w-full overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          {coverImageUrl ? (
            <>
              <Image
                src={coverImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
                fetchPriority="high"
                sizes="100vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              {/* Blue gradient overlay for brand consistency */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0C6BAF]/70 via-[#187CC1]/60 to-[#71C8F3]/70"></div>
            </>
          ) : (
            /* Soft blue gradient background when no image */
            <div className="absolute inset-0 bg-gradient-to-br from-[#0C6BAF] to-[#71C8F3]"></div>
          )}
        </div>
        
        {/* Additional gradient overlay for enhanced brand effect */}
        <div className="absolute inset-0 z-10">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#002C5F]/30 via-transparent to-[#005A9C]/20"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col h-[90vh] sm:h-[80vh] md:h-[70vh] lg:h-[75vh] xl:h-[70vh] w-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col mb-20 justify-start md:justify-center h-full md:items-start items-center md:text-left text-center max-w-5xl pt-20 md:pt-12 lg:pt-16 xl:pt-12 md:-mt-5">
            
            {/* Categories */}
            {post.categories && Array.isArray(post.categories) && post.categories.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-2 mb-6 md:mb-6 lg:mb-8 lg:mt-10"
              >
                {post.categories.map(category => (
                  <Link 
                    key={category?.id || `cat-${Math.random()}`}
                    href={`/blog/category/${category?.slug || 'uncategorized'}`}
                    className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 font-open-sans font-semibold text-sm"
                  >
                    {category?.name || 'Uncategorized'}
                  </Link>
                ))}
              </motion.div>
            )}

            {/* Main headline */}
            <div className="w-full md:flex md:justify-start flex justify-center mb-6 md:mb-6 lg:mb-8">
              <h1
                className="relative font-montserrat text-[2rem] sm:text-[2rem] md:text-[2rem] lg:text-[2rem] xl:text-[2rem] leading-tight font-black text-white drop-shadow-lg"
                style={{
                  letterSpacing: '-0.04em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  animation: isLoaded ? 'slideRight 1.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
                }}
              >
                {post.title}
              </h1>
            </div>

            {/* Meta information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center text-white/90 mb-6 md:mb-6 lg:mb-8 font-open-sans"
            >
              <span className="mr-4 text-base md:text-lg">{formattedDate}</span>
              <span className="mr-4">•</span>
              <FaClock className="w-4 h-4 mr-2" />
              <span className="text-base md:text-lg">{readingTime} min read</span>
            </motion.div>

            {/* Excerpt */}
            {post.excerpt && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="w-full md:flex md:justify-start flex justify-center mb-8 md:mb-8 lg:mb-10"
              >
                <p className="max-w-4xl md:text-left text-center text-white font-open-sans text-xl sm:text-xl md:text-lg lg:text-xl xl:text-xl" style={{lineHeight: '1.6'}}>
                  {post.excerpt}
                </p>
              </motion.div>
            )}
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

      {/* Content Section */}
      <section className="relative bg-white py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Share buttons */}
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200">
              <Link 
                href="/blog"
                className="inline-flex items-center text-[#0C6BAF] hover:text-[#187CC1] font-montserrat font-semibold transition-colors group"
              >
                <FaArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-open-sans font-semibold mr-2">Share:</span>
                <button
                  onClick={() => shareOnSocial('linkedin')}
                  className="p-2 text-[#0077B5] hover:bg-[#0077B5] hover:text-white rounded-full transition-all duration-300"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => shareOnSocial('x')}
                  className="p-2 text-black hover:bg-black hover:text-white rounded-full transition-all duration-300"
                  aria-label="Share on X"
                >
                  <FaXTwitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => shareOnSocial('facebook')}
                  className="p-2 text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-full transition-all duration-300"
                  aria-label="Share on Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div variants={itemVariants} className="prose prose-lg max-w-none">
              {/* Table of Contents - Mobile version appears here */}
              {(post.markdownContent || (post.content && typeof post.content === 'string')) && (
                <TableOfContents 
                  content={post.markdownContent || (typeof post.content === 'string' ? post.content : '')} 
                />
              )}
              
              <div className="text-lg text-black/80 font-open-sans leading-relaxed space-y-6">
                {(() => {
                  // Check for markdown content first
                  if (post.markdownContent && typeof post.markdownContent === 'string' && post.markdownContent.trim()) {
                    console.log('Rendering markdown content');
                    return <MarkdownRenderer content={post.markdownContent} />;
                  }
                  
                  // Check for rich text blocks
                  if (post.content && Array.isArray(post.content) && post.content.length > 0) {
                    console.log('Rendering rich text blocks');
                    return <RichTextRenderer content={post.content} />;
                  }
                  
                  // Check if content is a string (might be HTML or markdown)
                  if (post.content && typeof post.content === 'string' && post.content.trim()) {
                    console.log('Rendering string content as markdown');
                    return <MarkdownRenderer content={post.content} />;
                  }
                  
                  // Check if content is an object with a specific structure
                  if (post.content && typeof post.content === 'object' && !Array.isArray(post.content)) {
                    console.log('Content is object, checking for text fields');
                    // Try to extract text from various possible fields
                    const textContent = post.content.text || post.content.content || post.content.body || post.content.description;
                    if (textContent && typeof textContent === 'string') {
                      console.log('Found text content in object, rendering as markdown');
                      return <MarkdownRenderer content={textContent} />;
                    }
                  }
                  
                  console.log('No renderable content found, showing fallback');
                  return (
                    <div className="text-gray-600 italic space-y-4">
                      <p>Content is not available in a renderable format.</p>
                      <details className="text-sm">
                        <summary className="cursor-pointer">Debug Info (click to expand)</summary>
                        <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                          {JSON.stringify({
                            hasContent: !!post.content,
                            contentType: typeof post.content,
                            contentIsArray: Array.isArray(post.content),
                            hasMarkdownContent: !!post.markdownContent,
                            markdownContentType: typeof post.markdownContent,
                            contentKeys: post.content && typeof post.content === 'object' ? Object.keys(post.content) : 'n/a'
                          }, null, 2)}
                        </pre>
                      </details>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
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
              Ready to Transform Your Leadership Team?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 font-open-sans leading-relaxed">
              Let's discuss how our specialized expertise can help you identify the transformational leaders your organization needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact-us"
                className="inline-block px-8 py-4 bg-white text-[#002C5F] rounded-full hover:bg-gray-100 transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl"
              >
                Start Your Search
              </Link>
              <Link 
                href="/blog"
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-[#002C5F] transition-all duration-300 font-montserrat font-semibold"
              >
                More Insights
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-black text-[#002C5F] mb-4 font-montserrat">
              Continue Reading
            </h3>
            <p className="text-gray-600 font-open-sans">
              Explore more insights on leadership and talent acquisition
            </p>
          </div>
          <div className="text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center text-[#0C6BAF] hover:text-[#187CC1] font-montserrat font-semibold transition-colors"
            >
              View All Articles
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 