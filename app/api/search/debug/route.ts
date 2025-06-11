import { NextRequest, NextResponse } from 'next/server';
import { fetchAPI } from '../../api';

/**
 * Debug endpoint for search API troubleshooting
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || 'test';

    // Test actual API connectivity
    let strapiTest = null;
    let pagesTest = null;
    let blogsTest = null;
    let faqsTest = null;

    try {
      // Test pages endpoint
      const pagesResponse = await fetchAPI('pages', {
        pagination: { pageSize: 5 },
        populate: { metadata: true }
      });
      pagesTest = {
        success: true,
        count: pagesResponse?.data?.length || 0,
        sample: pagesResponse?.data?.slice(0, 2)?.map((page: any) => ({
          id: page.id,
          slug: page.slug,
          shortName: page.shortName,
          metaTitle: page.metadata?.metaTitle,
        })) || []
      };
    } catch (error) {
      pagesTest = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    try {
      // Test blog posts endpoint
      const blogsResponse = await fetchAPI('blog-posts', {
        pagination: { pageSize: 3 },
        populate: { categories: true }
      });
      blogsTest = {
        success: true,
        count: blogsResponse?.data?.length || 0,
        sample: blogsResponse?.data?.slice(0, 2)?.map((post: any) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
        })) || []
      };
    } catch (error) {
      blogsTest = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    try {
      // Test FAQs endpoint
      const faqsResponse = await fetchAPI('faqs', {
        pagination: { pageSize: 3 }
      });
      faqsTest = {
        success: true,
        count: faqsResponse?.data?.length || 0,
        sample: faqsResponse?.data?.slice(0, 2)?.map((faq: any) => ({
          id: faq.id,
          question: faq.Question,
        })) || []
      };
    } catch (error) {
      faqsTest = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    // Test search functionality
    let searchTest = null;
    try {
      const searchResponse = await fetch(`${request.nextUrl.origin}/api/search?q=${encodeURIComponent(query)}`);
      const searchData = await searchResponse.json();
      searchTest = {
        success: searchResponse.ok,
        status: searchResponse.status,
        resultCount: searchData.results?.length || 0,
        total: searchData.total || 0
      };
    } catch (error) {
      searchTest = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    const testResponse = {
      timestamp: new Date().toISOString(),
      query,
      userAgent: request.headers.get('user-agent'),
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        strapiUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL,
        hasToken: !!process.env.STRAPI_API_TOKEN,
      },
      apiTests: {
        pages: pagesTest,
        blogs: blogsTest,
        faqs: faqsTest,
        search: searchTest,
      },
      testData: {
        results: [
          {
            id: 'test-1',
            title: 'Test Result 1',
            excerpt: 'This is a test result to verify the API is working',
            url: '/test-1',
            type: 'blog',
            publishedAt: new Date().toISOString(),
          },
          {
            id: 'test-2',
            title: 'Test Result 2',
            excerpt: 'Another test result',
            url: '/test-2',
            type: 'page',
            publishedAt: new Date().toISOString(),
          },
        ],
        total: 2,
        query,
        page: 1,
        pageSize: 10,
      },
    };

    return NextResponse.json(testResponse);
  } catch (error) {
    return NextResponse.json({
      error: 'Debug endpoint failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
} 