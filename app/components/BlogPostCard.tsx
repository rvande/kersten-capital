'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/app/types/blog';
import { getS3URL } from '@/app/api/api';

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const router = useRouter();
  
  // Determine image URL based on data from Strapi v5
  const getImageUrl = () => {
    if (!post.coverImage) {
      return '/images/blog-placeholder.jpg';
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
    return '/images/blog-placeholder.jpg';
  };
    
  const imageUrl = getImageUrl();
    
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const navigateToPost = () => {
    router.push(`/blog/${post.slug}`);
  };

  // Create a placeholder for the image
  const placeholderImage = (
    <div className="bg-gray-100 w-full h-full flex items-center justify-center">
      <svg 
        className="w-12 h-12 text-gray-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1} 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
    </div>
  );

  return (
    <article className={`bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${featured ? 'md:col-span-2' : ''}`}>
      {/* Main card content (clickable) */}
      <div 
        className="cursor-pointer group" 
        onClick={navigateToPost}
      >
        <div className="relative aspect-video overflow-hidden">
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={typeof post.coverImage === 'object' && post.coverImage?.alternativeText || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          ) : placeholderImage}
        </div>
        
        <div className="p-5">
          {/* Categories - outside the clickable area */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map(category => (
                <Link 
                  key={category.id}
                  href={`/blog/category/${category.slug}`}
                  className="text-xs font-semibold bg-[#CA3B2A]/10 text-[#CA3B2A] px-3 py-1 rounded-full hover:bg-[#CA3B2A]/20 transition-colors"
                  onClick={(e) => e.stopPropagation()} // Prevent triggering the parent onClick
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
          
          <h2 className="text-2xl font-bold mb-3 text-[#3D3939] group-hover:text-[#CA3B2A] transition-colors line-clamp-2">
            {post.title}
          </h2>
          
          <p className="text-gray-500 text-sm mb-4">{formattedDate}</p>
          
          <p className="text-gray-600 line-clamp-3 mb-5">
            {post.excerpt}
          </p>
          
          <div className="text-[#CA3B2A] font-medium group-hover:underline flex items-center">
            <span>Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
} 