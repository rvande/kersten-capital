'use client';

import Hero2 from "./Hero2";
import dynamic from "next/dynamic";

// Import other components dynamically to optimize loading
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