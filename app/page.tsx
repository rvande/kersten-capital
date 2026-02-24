import { getGlobalData } from "./api/api";
import { getBlogPosts } from "./api/blog/api";
import Link from "next/link";
import HomePageClient from "./components/HomePageClient";
import { fetchWhitepapers } from "./utils/blog-helpers";
import { Metadata } from "next";

// Generate metadata for the homepage
export async function generateMetadata(): Promise<Metadata> {
  try {
    const globalData = await getGlobalData();
    const global = globalData.data;
    
    const { metaTitle, metaDescription, shareImage, twitterCardType, twitterUsername } = global.metadata;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';
    
    // Generate OG images from shareImage or fallback to favicon
    const { generateOgImages } = await import('./utils/favicon');
    const ogImages = shareImage 
      ? generateOgImages(shareImage, metaTitle)
      : generateOgImages(global.favicon, metaTitle);
    
    // Ensure we always have at least one OG image
    const finalOgImages = ogImages.length > 0 ? ogImages : [{
      url: 'https://kerstencapital.s3.us-east-1.amazonaws.com/OG_Image_ff4eaa3237.png',
      width: 1200,
      height: 630,
      alt: metaTitle || 'Kersten Talent Capital',
    }];
    
    return {
      title: 'Kersten Talent Capital | Strategic Talent Recruitment & Career Acceleration',
      description: 'Strategic talent investment and career acceleration for exceptional leaders. Specialized executive search, contingency hiring, and fractional solutions.',
      alternates: {
        canonical: siteUrl,
      },
      openGraph: {
        title: 'Kersten Talent Capital | Strategic Talent Recruitment & Career Acceleration',
        description: 'Strategic talent investment and career acceleration for exceptional leaders. Specialized executive search, contingency hiring, and fractional solutions.',
        url: siteUrl,
        type: 'website',
        images: finalOgImages.map(img => ({
          url: img.url,
          width: img.width,
          height: img.height,
          alt: img.alt,
        })),
      },
      twitter: {
        card: twitterCardType || "summary_large_image",
        creator: twitterUsername || "",
        title: 'Kersten Talent Capital | Strategic Talent Investment & Career Acceleration',
        description: 'Strategic talent investment and career acceleration for exceptional leaders. Specialized executive search, contingency hiring, and fractional solutions across key industries.',
        images: finalOgImages.map(img => img.url),
      },
    };
  } catch (error) {
    console.error('Error generating homepage metadata:', error);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';
    
    // Fallback metadata
    return {
      title: 'Kersten Talent Capital | Strategic Talent Investment & Career Acceleration',
      description: 'Strategic talent investment and career acceleration for exceptional leaders. Specialized executive search, contingency hiring, and fractional solutions across key industries.',
      alternates: {
        canonical: siteUrl,
      },
      openGraph: {
        title: 'Kersten Talent Capital | Strategic Talent Investment & Career Acceleration',
        description: 'Strategic talent investment and career acceleration for exceptional leaders. Specialized executive search, contingency hiring, and fractional solutions across key industries.',
        url: siteUrl,
        type: 'website',
        images: [{
          url: 'https://kerstencapital.s3.us-east-1.amazonaws.com/OG_Image_ff4eaa3237.png',
          width: 1200,
          height: 630,
          alt: 'Kersten Talent Capital',
        }],
      },
    };
  }
}

export default async function Home() {
  try {
    // Get global data to test that it works
    const globalData = await getGlobalData();
    
    // Fetch recent blog posts for the content section
    const recentPosts = await getBlogPosts({
      pagination: {
        page: 1,
        pageSize: 3,
      },
      sort: ['publishedAt:desc'],
    });
    
    // Fetch real whitepapers from Strapi
    let whitepapers = [];
    try {
      whitepapers = await fetchWhitepapers(2);
      console.log(`Fetched ${whitepapers.length} whitepapers for homepage`);
    } catch (whitepaperError) {
      console.error('Error fetching whitepapers:', whitepaperError);
    }
    
    return (
      <HomePageClient 
        blogPosts={recentPosts.data} 
        whitepapers={whitepapers}
      />
    );
  } catch (error) {
    console.error('Error on Homepage:', error);
    
    // Fixed-date mock data so fallback output is deterministic (avoids extra ISR writes)
    const FALLBACK_DATE = '2026-01-01T00:00:00.000Z';
    const mockBlogPosts = [
      {
        id: 1,
        title: "Executive Hiring is Broken",
        slug: "executive-hiring-is-broken",
        excerpt: "In today's high-stakes, hyper-competitive market, hiring the right executive leader isn't just hard—it's mission-critical.",
        publishedAt: FALLBACK_DATE,
        coverImage: null,
        categories: [],
        content: null,
        createdAt: FALLBACK_DATE,
        updatedAt: FALLBACK_DATE
      },
      {
        id: 2,
        title: "Building High-Performance Leadership Teams",
        slug: "high-performance-leadership-teams",
        excerpt: "Discover how top companies are assembling leadership teams that drive innovation and growth.",
        publishedAt: FALLBACK_DATE,
        coverImage: null,
        categories: [],
        content: null,
        createdAt: FALLBACK_DATE,
        updatedAt: FALLBACK_DATE
      },
      {
        id: 3,
        title: "The Future of Talent Acquisition",
        slug: "future-of-talent-acquisition",
        excerpt: "AI, data analytics, and human expertise are combining to transform how companies find and secure top leadership talent.",
        publishedAt: FALLBACK_DATE,
        coverImage: null,
        categories: [],
        content: null,
        createdAt: FALLBACK_DATE,
        updatedAt: FALLBACK_DATE
      }
    ] as any[];

    const mockWhitepapers = [
      {
        id: 1,
        attributes: {
          Title: "Redefining Executive Search for the Modern Era",
          Description: "An in-depth look at how Kersten Talent Capital is changing the paradigm of executive recruitment.",
          Document: { data: { id: 1, attributes: { url: "#", name: "redefining-executive-search.pdf", size: 1024, mime: "application/pdf" } } },
          CoverImage: { data: { id: 1, attributes: { url: "/search.jpg", width: 800, height: 600, formats: {} } } },
          PublicationDate: FALLBACK_DATE,
          createdAt: FALLBACK_DATE,
          updatedAt: FALLBACK_DATE,
          publishedAt: FALLBACK_DATE
        }
      },
      {
        id: 2,
        attributes: {
          Title: "The Future of Leadership: Building Resilient Teams",
          Description: "Discover key strategies for identifying and nurturing leadership qualities that build sustainable organizations.",
          Document: { data: { id: 2, attributes: { url: "#", name: "future-of-leadership.pdf", size: 1024, mime: "application/pdf" } } },
          CoverImage: { data: { id: 2, attributes: { url: "/leadership.jpg", width: 800, height: 600, formats: {} } } },
          PublicationDate: FALLBACK_DATE,
          createdAt: FALLBACK_DATE,
          updatedAt: FALLBACK_DATE,
          publishedAt: FALLBACK_DATE
        }
      }
    ] as any;
    
    // Fallback content if global data fails to load
    return (
      <>
        <HomePageClient 
          blogPosts={mockBlogPosts} 
          whitepapers={mockWhitepapers}
        />
        <div className="container mx-auto px-4 py-12">
          <div className="mt-12 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
            <p>API connection issue. Please visit our API test page to diagnose.</p>
            <Link href="/api-test" className="text-[#CA3B2A] hover:text-[#8A2C24] font-medium underline">
              View API Test Page
            </Link>
          </div>
        </div>
      </>
    );
  }
}
