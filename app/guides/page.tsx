import React from 'react';
import { fetchWhitepapers } from '@/app/utils/blog-helpers';
import GuidesPageContent from '../components/GuidesPageContent';
import { Metadata } from 'next';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

export const metadata: Metadata = {
  title: 'Guides & Whitepapers | Kersten Talent Capital',
  description: 'Access our latest guides, whitepapers, and research on executive talent acquisition, leadership trends, and strategic hiring practices.',
  openGraph: {
    title: 'Guides & Whitepapers | Kersten Talent Capital',
    description: 'Access our latest guides, whitepapers, and research on executive talent acquisition, leadership trends, and strategic hiring practices.',
    url: `${baseUrl}/guides`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/guides`,
  },
};

export default async function GuidesPage() {
  try {
    // Fetch all whitepapers
    const whitepapers = await fetchWhitepapers(50); // Fetch up to 50 whitepapers
    
    return (
      <main className="relative w-full overflow-hidden">
        <GuidesPageContent initialWhitepapers={whitepapers} />
      </main>
    );
  } catch (error) {
    console.error('Error on Guides page:', error);
    
    // Fallback content if data fails to load
    return (
      <main className="relative w-full overflow-hidden">
        {/* Hero Section with Gradient Background */}
        <section className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 animate-gradient-x"
              style={{
                background: 'linear-gradient(-45deg, #002C5F, #0C6BAF, #005A9C, #187CC1, #71C8F3, #0C6BAF, #002C5F)',
                backgroundSize: '400% 400%',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-montserrat"
                  style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)' }}>
                Guides & Whitepapers
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto font-open-sans leading-relaxed">
                Access our comprehensive guides, whitepapers, and research on executive talent acquisition, 
                leadership trends, and strategic hiring practices.
              </p>
            </div>
          </div>

          {/* Bottom SVG Overlay */}
          <div className="absolute left-0 right-0 bottom-0 w-full pointer-events-none select-none z-20">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="100%" 
              height="130px" 
              viewBox="0 0 1280 140" 
              preserveAspectRatio="none"
              className="w-full h-[75px] md:h-[130px]"
            >
              <g fill="#002c5f">
                <path d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z" />
                <path d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z" fill="#ffffff" />
              </g>
            </svg>
          </div>
        </section>

        {/* Error Content Section */}
        <section className="relative bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-gray-100 text-center">
                <svg className="w-16 h-16 text-[#0C6BAF] mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="presentation">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl md:text-3xl font-black mb-4 text-[#002C5F] font-montserrat">Content Temporarily Unavailable</h2>
                <p className="text-black/70 mb-8 font-open-sans text-lg leading-relaxed">
                  We're unable to load our guides and whitepapers right now. Please try again later or contact us for assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/contact" 
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] text-white rounded-full hover:shadow-lg hover:shadow-[#0C6BAF]/30 transition-all duration-300 font-montserrat font-semibold"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="/" 
                    className="inline-block px-8 py-4 bg-transparent border-2 border-[#0C6BAF] text-[#0C6BAF] rounded-full hover:bg-[#0C6BAF] hover:text-white transition-all duration-300 font-montserrat font-semibold"
                  >
                    Return Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
} 