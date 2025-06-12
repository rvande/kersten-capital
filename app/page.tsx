import { getGlobalData } from "./api/api";
import { getBlogPosts } from "./api/blog/api";
import Link from "next/link";
import HomePageClient from "./components/HomePageClient";
import { fetchWhitepapers } from "./utils/blog-helpers";

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
    
    // Use type casting for mock data to avoid type errors
    const mockBlogPosts = [
      {
        id: 1,
        title: "Executive Hiring is Broken",
        slug: "executive-hiring-is-broken",
        excerpt: "In today's high-stakes, hyper-competitive market, hiring the right executive leader isn't just hard—it's mission-critical.",
        publishedAt: new Date().toISOString(),
        coverImage: null,
        categories: [],
        content: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "Building High-Performance Leadership Teams",
        slug: "high-performance-leadership-teams",
        excerpt: "Discover how top companies are assembling leadership teams that drive innovation and growth.",
        publishedAt: new Date().toISOString(),
        coverImage: null,
        categories: [],
        content: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        title: "The Future of Talent Acquisition",
        slug: "future-of-talent-acquisition",
        excerpt: "AI, data analytics, and human expertise are combining to transform how companies find and secure top leadership talent.",
        publishedAt: new Date().toISOString(),
        coverImage: null,
        categories: [],
        content: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ] as any[]; // Use type casting to avoid type errors
    
    // Example whitepaper data for fallback with proper Strapi structure
    const mockWhitepapers = [
      {
        id: 1,
        attributes: {
          Title: "Redefining Executive Search for the Modern Era",
          Description: "An in-depth look at how Kersten Talent Capital is changing the paradigm of executive recruitment.",
          Document: {
            data: {
              id: 1,
              attributes: {
                url: "#",
                name: "redefining-executive-search.pdf",
                size: 1024,
                mime: "application/pdf"
              }
            }
          },
          CoverImage: {
            data: {
              id: 1,
              attributes: {
                url: "/search.jpg",
                width: 800,
                height: 600,
                formats: {}
              }
            }
          },
          PublicationDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString()
        }
      },
      {
        id: 2,
        attributes: {
          Title: "The Future of Leadership: Building Resilient Teams",
          Description: "Discover key strategies for identifying and nurturing leadership qualities that build sustainable organizations.",
          Document: {
            data: {
              id: 2,
              attributes: {
                url: "#",
                name: "future-of-leadership.pdf",
                size: 1024,
                mime: "application/pdf"
              }
            }
          },
          CoverImage: {
            data: {
              id: 2,
              attributes: {
                url: "/leadership.jpg",
                width: 800,
                height: 600,
                formats: {}
              }
            }
          },
          PublicationDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString()
        }
      }
    ] as any; // Use type casting to avoid type errors
    
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
