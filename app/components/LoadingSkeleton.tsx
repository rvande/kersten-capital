'use client';

import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'hero' | 'button';
  lines?: number;
  className?: string;
}

export default function LoadingSkeleton({ 
  variant = 'text', 
  lines = 3, 
  className = '' 
}: LoadingSkeletonProps) {
  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-2xl card-shadow-sm overflow-hidden ${className}`}>
        <div className="skeleton h-48 w-full" />
        <div className="p-6 space-y-4">
          <div className="skeleton h-6 w-3/4" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-5/6" />
          <div className="skeleton h-10 w-32 mt-6" />
        </div>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="skeleton h-16 w-3/4" />
        <div className="skeleton h-12 w-2/3" />
        <div className="space-y-3">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-5/6" />
          <div className="skeleton h-4 w-4/5" />
        </div>
        <div className="skeleton h-12 w-48 mt-8" />
      </div>
    );
  }

  if (variant === 'button') {
    return <div className={`skeleton h-12 w-32 rounded-lg ${className}`} />;
  }

  // Default text variant
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`skeleton h-4 ${
            index === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

// Grid of loading cards for service pages
export function LoadingGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingSkeleton key={index} variant="card" />
      ))}
    </div>
  );
}

// Loading state for blog posts
export function LoadingBlogGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4">
          <div className="skeleton h-48 w-full rounded-xl" />
          <div className="skeleton h-6 w-3/4" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-5/6" />
          <div className="skeleton h-3 w-24 mt-4" />
        </div>
      ))}
    </div>
  );
} 