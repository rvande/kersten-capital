'use client';

import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

// Create a client-side only wrapper to prevent any SSR issues
function ClientOnlyWrapper({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 relative mb-6 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-[#0C6BAF]/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0C6BAF] animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#0C6BAF] to-[#71C8F3] opacity-60"></div>
          </div>
          <h2 className="text-2xl font-black text-[#002C5F] mb-2 font-montserrat">
            Loading...
          </h2>
          <p className="text-[#002C5F]/70 font-open-sans">
            Preparing your experience
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Import all components dynamically with no SSR
const Hero2 = dynamic(() => import("./Hero2"), { ssr: false });
const MissionSection = dynamic(() => import("./MissionSection"), { ssr: false });
const ValueProposition = dynamic(() => import("./ValueProposition"), { ssr: false });
const AnimatedBackground = dynamic(() => import("./AnimatedBackground"), { ssr: false });
const ImpactCarousel = dynamic(() => import("./ImpactCarousel"), { ssr: false });
const RecentContentSection = dynamic(() => import("./RecentContentSection"), { ssr: false });

interface HomePageClientProps {
  blogPosts: any[];
  whitepapers: any[];
}

export default function HomePageClient({ blogPosts, whitepapers }: HomePageClientProps) {
  return (
    <ClientOnlyWrapper>
      <main className="flex flex-col w-full">
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
    </ClientOnlyWrapper>
  );
} 