'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/app/types/blog';
import { getS3URL } from '@/app/api/api';
import { getReadingTime } from '@/app/utils/blog-helpers';
import { FaClock, FaArrowRight } from 'react-icons/fa6';

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const router = useRouter();
  
  // Determine image URL based on data from Strapi v5
  const getImageUrl = () => {
    if (!post.coverImage) {
      return null;
    }
    
    // Cast to any to handle different potential structures
    const coverImage = post.coverImage as any;
    
    // If it's a string URL
    if (typeof coverImage === 'string') {
      return coverImage.startsWith('http') 
        ? coverImage 
        : getS3URL(coverImage);
    }
    
    // If it has a URL property
    if (coverImage.url) {
      // If it's already a full URL including http/https, use it directly
      if (coverImage.url.startsWith('http')) {
        return coverImage.url;
      }
      
      // Otherwise use our S3 URL helper
      return getS3URL(coverImage.url);
    }
    
    // Fallback to placeholder
    return null;
  };
    
  const imageUrl = getImageUrl();
    
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate reading time using the same logic as individual blog posts
  const readingTime = (() => {
    // Try to get content for reading time calculation
    let contentForReading = '';
    
    if (post.markdownContent && typeof post.markdownContent === 'string') {
      contentForReading = post.markdownContent;
    } else if (post.content) {
      if (typeof post.content === 'string') {
        contentForReading = post.content;
      } else if (Array.isArray(post.content)) {
        // Convert rich text blocks to string for reading time calculation
        contentForReading = JSON.stringify(post.content);
      }
    }
    
    // Fallback to excerpt if no content available
    if (!contentForReading && post.excerpt) {
      contentForReading = post.excerpt;
    }
    
    return getReadingTime(contentForReading);
  })();

  const navigateToPost = () => {
    router.push(`/blog/${post.slug}`);
  };

  // Create a sophisticated placeholder for the image
  const placeholderImage = (
    <div className="bg-gradient-to-br from-[#0C6BAF] via-[#187CC1] to-[#71C8F3] w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <svg 
        className="w-16 h-16 text-white/80 relative z-10" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
        />
      </svg>
    </div>
  );

  return (
    <article className={`group cursor-pointer ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}>
      {/* Main card */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#0C6BAF]/20 transition-all duration-500 group-hover:-translate-y-2 flex flex-col h-full">
        {/* Main card content (clickable) */}
        <div 
          className="cursor-pointer flex flex-col flex-grow" 
          onClick={navigateToPost}
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0C6BAF] to-[#71C8F3] flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm font-montserrat font-semibold">Featured Article</p>
                </div>
              </div>
            )}
            
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Featured badge */}
            {featured && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold">
                Featured
              </div>
            )}
          </div>
          
          {/* Content Container */}
          <div className="p-6 lg:p-8 flex flex-col flex-grow">
            {/* Meta Information */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-[#0C6BAF] text-sm font-montserrat font-semibold">
                <FaClock className="w-3 h-3 mr-2" />
                <span>{readingTime} min read</span>
              </div>
              <span className="text-sm text-gray-500 font-open-sans">{formattedDate}</span>
            </div>
            
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.slice(0, 2).map(category => (
                  <Link 
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    className="text-xs font-semibold bg-gradient-to-r from-[#0C6BAF]/10 to-[#187CC1]/10 text-[#0C6BAF] px-3 py-1.5 rounded-full hover:from-[#0C6BAF]/20 hover:to-[#187CC1]/20 transition-all duration-300 font-montserrat border border-[#0C6BAF]/20"
                    onClick={(e) => e.stopPropagation()} // Prevent triggering the parent onClick
                  >
                    {category.name}
                  </Link>
                ))}
                {post.categories.length > 2 && (
                  <span className="text-xs font-semibold text-gray-400 px-3 py-1.5 font-montserrat">
                    +{post.categories.length - 2} more
                  </span>
                )}
              </div>
            )}
            
            {/* Title */}
            <h2 className={`${featured ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'} font-black mb-4 text-[#002C5F] group-hover:text-[#0C6BAF] transition-colors duration-300 line-clamp-2 font-montserrat leading-tight`}>
              {post.title}
            </h2>
            
            {/* Excerpt */}
            <p className="text-black/70 line-clamp-3 mb-6 font-open-sans leading-relaxed flex-grow text-base">
              {post.excerpt}
            </p>
            
            {/* Read More Link */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-[#0C6BAF] font-semibold group-hover:text-[#187CC1] flex items-center transition-all duration-300 font-montserrat">
                <span>Read Article</span>
                <FaArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              
              {/* Author or additional meta could go here */}
              <div className="w-8 h-8 bg-gradient-to-br from-[#0C6BAF] to-[#187CC1] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 