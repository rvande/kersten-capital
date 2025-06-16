'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export default function ImageWithPlaceholder({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  placeholder = 'empty',
  blurDataURL
}: ImageWithPlaceholderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] flex items-center justify-center">
          <LoadingSpinner size="md" />
        </div>
      )}
      
      {/* Error placeholder */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#0C6BAF]/20 rounded-full flex items-center justify-center mb-2 mx-auto">
              <svg className="w-6 h-6 text-[#0C6BAF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-[#002C5F]/70 font-open-sans">Image unavailable</p>
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
} 