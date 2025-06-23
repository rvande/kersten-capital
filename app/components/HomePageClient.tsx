'use client';

import React from 'react';
import dynamic from "next/dynamic";

// Import Hero2 dynamically to prevent SSR issues with video/state management
const Hero2 = dynamic(() => import("./Hero2"), { 
  ssr: false,
  loading: () => (
    <section 
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#002C5F] to-[#0C6BAF]" 
      style={{ minHeight: '100vh' }}
    >
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
            className="text-[1.6rem] md:text-[4rem] lg:text-[5.5rem] font-black text-transparent bg-gradient-to-b from-[#71C8F3] to-white bg-clip-text mb-6 md:mb-8"
            style={{ lineHeight: '1.1' }}
          >
            Your Leadership Team
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