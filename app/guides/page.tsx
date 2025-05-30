import React from 'react';
import { fetchWhitepapers } from '@/app/utils/blog-helpers';
import GuidesPageContent from '../components/GuidesPageContent';
import { Metadata } from 'next';

// Base URL from environment or default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kersten-capital.com';

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
      <main className="min-h-screen bg-gradient-to-b from-[#3A3A40] via-[#2A2A30] to-[#1E1E24]">
        <GuidesPageContent initialWhitepapers={whitepapers} />
      </main>
    );
  } catch (error) {
    console.error('Error on Guides page:', error);
    
    // Fallback content if data fails to load
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#3A3A40] via-[#2A2A30] to-[#1E1E24]">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-white">Guides & Whitepapers</h1>
          <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg">
            <p>Unable to load guides. Please try again later.</p>
          </div>
        </div>
      </main>
    );
  }
} 