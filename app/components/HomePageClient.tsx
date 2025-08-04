'use client';

import React from 'react';
import dynamic from "next/dynamic";

// Import Hero2 with SSR enabled for better LCP
const Hero2 = dynamic(() => import("./Hero2"), { 
  ssr: true, // Enable SSR for critical above-the-fold content
  loading: () => (
    <section 
      className="relative w-full overflow-hidden" 
      style={{ minHeight: '100vh' }}
    >
      {/* Immediate poster image for LCP */}
      <img
        src="/hero-poster.avif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        style={{
          minHeight: '100vh',
          minWidth: '100%',
          objectFit: 'cover'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-20" aria-hidden="true" />
      
      {/* Critical text content for immediate display */}
      <div className="relative z-30 flex flex-col h-screen w-full px-4 md:px-8 lg:px-16">
        <div className="flex flex-col justify-center h-full md:items-start items-center md:text-left text-center max-w-4xl">
          <h1
            className="text-[3.4rem] md:text-[5rem] lg:text-[7rem] font-black text-white mb-2 md:mb-4 tracking-tight"
            style={{ letterSpacing: '-0.04em', lineHeight: '1.1' }}
          >
            TRANSFORM
          </h1>
          
          <h2 
            className="text-[1.6rem] md:text-[4rem] lg:text-[5.5rem] font-black text-transparent bg-gradient-to-b from-[#0C6BAF] to-[#71C8F3] bg-clip-text mb-6 md:mb-8"
            style={{ lineHeight: '1.1' }}
          >
            Your Leadership Strategy
          </h2>
          
          <p 
            className="max-w-3xl md:text-left text-center text-white text-lg md:text-xl font-semibold mb-8 md:mb-10"
          >
            Kersten Talent Capital revolutionizes organizational performance through strategic talent intelligence and executive placement solutions.
          </p>
        </div>
      </div>
    </section>
  )
});

// Import non-critical components dynamically to optimize loading
const MissionSection = dynamic(() => import("./MissionSection"), { 
  ssr: false,
  loading: () => <div className="w-full h-48 bg-gray-100 animate-pulse" />
});

const ValueProposition = dynamic(() => import("./ValueProposition"), { 
  ssr: false,
  loading: () => <div className="w-full h-48 bg-gray-100 animate-pulse" />
});

const AnimatedBackground = dynamic(() => import("./AnimatedBackground"), { 
  ssr: false,
  loading: () => <div className="w-full h-48 bg-gray-100 animate-pulse" />
});

const ImpactCarousel = dynamic(() => import("./ImpactCarousel"), { 
  ssr: false,
  loading: () => <div className="w-full h-48 bg-gray-100 animate-pulse" />
});

const RecentContentSection = dynamic(() => import("./RecentContentSection"), { 
  ssr: false,
  loading: () => <div className="w-full h-48 bg-gray-100 animate-pulse" />
});

interface HomePageClientProps {
  blogPosts: any[];
  whitepapers: any[];
}

export default function HomePageClient({ blogPosts, whitepapers }: HomePageClientProps) {
  return (
    <main className="flex flex-col w-full" role="main" aria-label="Main content">
      <Hero2 />
      <MissionSection />
      <ValueProposition />
      <AnimatedBackground />
      {/* <ImpactCarousel /> */}
      <RecentContentSection 
        blogPosts={blogPosts} 
        whitepapers={whitepapers}
      />
    </main>
  );
} 