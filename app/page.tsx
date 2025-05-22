import { getGlobalData } from "./api/api";
import Link from "next/link";
import ValueProposition from "./components/ValueProposition";
import Hero2 from "./components/Hero2";
import MissionSection from "./components/MissionSection";
import ImpactCarousel from "./components/ImpactCarousel";

export default async function Home() {
  try {
    // Get global data to test that it works
    const globalData = await getGlobalData();
    
    return (
      <main className="flex flex-col w-full">
        {/* Client Review Section */}
        <div className="relative">
          </div>

        <Hero2 />
        <MissionSection />
        <ValueProposition />
        <ImpactCarousel />
        
      </main>
    );
  } catch (error) {
    console.error('Error on Homepage:', error);
    
    // Fallback content if global data fails to load
    return (
      <main className="flex flex-col w-full">
        <Hero2 />
        <MissionSection />
        <ValueProposition />
        <ImpactCarousel />
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-header">
            Welcome to Kersten Talent Capital
          </h2>
          
          <p className="text-xl text-gray-700 mb-8 font-body">
            Strategic talent investment firm focused on empowering exceptional individuals.
          </p>
          
          <div className="mt-12 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
            <p>API connection issue. Please visit our API test page to diagnose.</p>
            <Link href="/api-test" className="text-[#CA3B2A] hover:text-[#8A2C24] font-medium underline">
              View API Test Page
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
