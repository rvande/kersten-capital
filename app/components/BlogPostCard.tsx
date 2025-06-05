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

  const navigateToPost = () => {
    router.push(`/blog/${post.slug}`);
  };

  // Create a placeholder for the image
  const placeholderImage = (
    <div className="bg-gradient-to-br from-[#0C6BAF] to-[#005A9C] w-full h-full flex items-center justify-center">
      <svg 
        className="w-12 h-12 text-white/70" 
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
    <article className={`relative group cursor-pointer ${featured ? 'md:col-span-2' : ''}`}>
      {/* Blue background - positioned behind card */}
      <div className="absolute inset-0 bg-[#0C6BAF] rounded-xl transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
      
      {/* Main card */}
      <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 flex flex-col">
        {/* Main card content (clickable) */}
        <div 
          className="cursor-pointer flex flex-col flex-grow" 
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
          
          <div className="p-6 flex flex-col flex-grow">
            <p className="text-sm text-[#0C6BAF] mb-2 font-montserrat font-semibold">{formattedDate}</p>
            
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map(category => (
                  <Link 
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    className="text-xs font-semibold bg-[#0C6BAF]/10 text-[#0C6BAF] px-3 py-1 rounded-full hover:bg-[#0C6BAF]/20 transition-colors font-montserrat"
                    onClick={(e) => e.stopPropagation()} // Prevent triggering the parent onClick
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
            
            <h2 className="text-xl md:text-2xl font-black mb-3 text-[#002C5F] group-hover:text-[#0C6BAF] transition-colors line-clamp-2 font-montserrat">
              {post.title}
            </h2>
            
            <p className="text-black/70 line-clamp-3 mb-6 font-open-sans leading-relaxed flex-grow">
              {post.excerpt}
            </p>
            
            <div className="text-[#0C6BAF] font-semibold group-hover:text-[#002C5F] flex items-center transition-colors duration-300 font-montserrat self-start">
              <span>Read Article</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 