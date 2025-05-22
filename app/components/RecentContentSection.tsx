'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost, Whitepaper } from '@/app/types/blog';
import { formatDate } from '@/app/utils/blog-helpers';

interface RecentContentSectionProps {
  blogPosts: BlogPost[];
  whitepapers?: Whitepaper[]; // Updated to use the Whitepaper type
}

export default function RecentContentSection({ blogPosts, whitepapers = [] }: RecentContentSectionProps) {
  // Make sure we have valid arrays to work with
  const validBlogPosts = Array.isArray(blogPosts) ? blogPosts : [];
  const validWhitepapers = Array.isArray(whitepapers) ? whitepapers : [];
  
  return (
    <section className="py-20 bg-gradient-to-b from-[#3A3A40] via-[#2A2A30] to-[#1E1E24] text-[#f7f6f2]">
       
      <div className="container mx-auto px-4">
        
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-[#f7f6f2] mb-5">Latest Insights</h2>
            <p className="text-xl text-[#f7f6f2]/80 max-w-2xl mx-auto">
              Stay ahead with our latest thinking on executive talent acquisition, 
              leadership trends, and strategic hiring practices.
            </p>
          </div>
          
          {/* Blog Posts Section */}
          {validBlogPosts.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-bold text-[#f7f6f2]">Recent Articles</h3>
                <Link 
                  href="/blog" 
                  className="text-[#CA3B2A] text-lg font-medium hover:text-[#f7f6f2] flex items-center"
                >
                  View all
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {validBlogPosts.slice(0, 3).map((post, index) => (
                  <div 
                    key={post.id} 
                    className="bg-[#f7f6f2] rounded-xl border border-[#f7f6f2]/10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/30 transform hover:-translate-y-1"
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
                            className="object-cover"
                          />
                        ) : (
                          <Image
                            src={index % 2 === 0 ? "/search.jpg" : "/leadership.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-[#3A3A40]/60 mb-2">{formatDate(post.publishedAt)}</p>
                        <h4 className="text-xl md:text-2xl font-bold mb-3 text-[#3A3A40] line-clamp-2">{post.title}</h4>
                        <p className="text-[#3A3A40]/70 line-clamp-2 mb-4">{post.excerpt}</p>
                        <span className="text-[#CA3B2A] text-lg font-medium inline-flex items-center hover:text-[#3A3A40]">
                          Read more
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Whitepapers Section - conditionally rendered if whitepapers exist */}
          {validWhitepapers && validWhitepapers.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-bold text-[#f7f6f2]">Whitepapers & Research</h3>
                <Link 
                  href="/resources" 
                  className="text-[#CA3B2A] text-lg font-medium hover:text-[#f7f6f2] flex items-center"
                >
                  View all
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {validWhitepapers.slice(0, 2).map((whitepaper, index) => {
                  // Handle both flat structure (actual response) and nested structure (Strapi v5 standard)
                  const title = whitepaper.Title || whitepaper?.attributes?.Title || "Untitled Whitepaper";
                  const description = whitepaper.Description || whitepaper?.attributes?.Description || "No description available";
                  
                  // For CoverImage, check both flat and nested structures
                  const coverImageUrl = whitepaper.CoverImage?.url || 
                    whitepaper.CoverImage?.formats?.large?.url ||
                    whitepaper?.attributes?.CoverImage?.data?.attributes?.url;
                  
                  // For Document, check both flat and nested structures
                  const documentUrl = whitepaper.Document?.url ||
                    whitepaper?.attributes?.Document?.data?.attributes?.url || '#';
                  
                  return (
                    <div 
                      key={whitepaper.id || index} 
                      className="bg-[#f7f6f2] rounded-xl border border-[#f7f6f2]/10 p-6 flex flex-col md:flex-row gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/30"
                    >
                      <div className="md:w-1/3 relative h-[200px] md:h-full min-h-[200px]">
                        {coverImageUrl ? (
                          <Image
                            src={coverImageUrl}
                            alt={title}
                            fill
                            className="object-cover rounded-md"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority
                          />
                        ) : (
                          <Image
                            src={index % 2 === 0 ? "/search.jpg" : "/leadership.jpg"}
                            alt={title}
                            fill
                            className="object-cover rounded-md"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority
                          />
                        )}
                      </div>
                      <div className="md:w-2/3">
                        <h4 className="text-2xl font-bold mb-3 text-[#3A3A40]">{title}</h4>
                        <p className="text-[#3A3A40]/70 mb-5">{description}</p>
                        <Link 
                          href={documentUrl} 
                          className="inline-flex items-center px-5 py-2.5 bg-[#CA3B2A] text-[#f7f6f2] rounded-md hover:bg-[#B02F22] transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download PDF
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* CTA Section */}
          <div className="bg-[#f7f6f2] text-[#1E1E24] rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Executive Hiring?</h3>
                <p className="text-[#3A3A40] mb-6 text-lg">
                  Partner with Kersten Talent Capital to find exceptional leaders who will drive your company's growth and success.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/contact" 
                    className="inline-block px-6 py-3 bg-[#CA3B2A] text-[#f7f6f2] rounded-md hover:bg-[#B02F22] transition-colors font-medium"
                  >
                    Schedule a Consultation
                  </Link>
                  <Link 
                    href="/services" 
                    className="inline-block px-6 py-3 bg-transparent border border-[#3A3A40] text-[#3A3A40] rounded-md hover:bg-[#3A3A40] hover:text-[#f7f6f2] transition-colors font-medium"
                  >
                    Explore Our Services
                  </Link>
                </div>
              </div>
              <div className="w-1/3 flex justify-center">
                <Image 
                  src="/rocket.svg"
                  alt="Rocket icon"
                  width={80}
                  height={80}
                  className="text-[#CA3B2A] w-auto h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 