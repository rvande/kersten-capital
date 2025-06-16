'use client'

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  className = '', 
  label = 'Loading content, please wait'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-[#0C6BAF]/20" aria-hidden="true"></div>
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0C6BAF] animate-spin" aria-hidden="true"></div>
        {/* Inner dot */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#0C6BAF] to-[#71C8F3] opacity-60" aria-hidden="true"></div>
      </div>
      {/* Screen reader text */}
      <span className="sr-only">{label}</span>
    </div>
  );
} 