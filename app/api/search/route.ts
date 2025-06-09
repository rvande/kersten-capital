import { NextRequest, NextResponse } from 'next/server';
import { fetchAPI } from '../api';

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  type: 'blog' | 'page' | 'faq';
  publishedAt?: string;
  category?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  page: number;
  pageSize: number;
}

// Static pages configuration - will be removed when pages are moved to Strapi
const STATIC_PAGES = [
  {
    id: 'home',
    title: 'Kersten Talent Capital - Executive Search & Fractional Hiring',
    excerpt: 'Premier executive search and fractional hiring firm specializing in technology, financial services, and high-growth companies.',
    url: '/',
    category: 'Main'
  },
  {
    id: 'about-us',
    title: 'About Us - Kersten Talent Capital',
    excerpt: 'Learn about our founding philosophy, approach to executive search, and commitment to revolutionizing talent acquisition.',
    url: '/about-us',
    category: 'Company'
  },
  {
    id: 'our-approach',
    title: 'Our Approach - Executive Search Methodology',
    excerpt: 'Discover our unique approach to executive search, combining deep industry expertise with innovative recruitment strategies.',
    url: '/our-approach',
    category: 'Company'
  },
  {
    id: 'services',
    title: 'Services - Executive Search & Fractional Hiring',
    excerpt: 'Comprehensive talent solutions including executive search, fractional hiring, and contingency recruitment services.',
    url: '/services',
    category: 'Services'
  },
  {
    id: 'executive-search',
    title: 'Executive Search Services',
    excerpt: 'Premium executive search services for C-level and senior leadership positions across technology and financial services.',
    url: '/services/executive-search',
    category: 'Services'
  },
  {
    id: 'fractional-hiring',
    title: 'Fractional Hiring Services',
    excerpt: 'Flexible fractional hiring solutions for companies needing senior expertise without full-time commitment.',
    url: '/services/fractional-hiring',
    category: 'Services'
  },
  {
    id: 'contingency-hiring',
    title: 'Contingency Hiring Services',
    excerpt: 'Results-driven contingency hiring for mid to senior-level positions with success-based fee structure.',
    url: '/services/contingency-hiring',
    category: 'Services'
  },
  {
    id: 'industries',
    title: 'Industries We Serve',
    excerpt: 'Specialized recruitment across technology, financial services, e-commerce, energy, and manufacturing sectors.',
    url: '/industries',
    category: 'Industries'
  },
  {
    id: 'technology-financial-services',
    title: 'Technology & Financial Services Recruitment',
    excerpt: 'Expert recruitment for technology companies, fintech, and financial services organizations.',
    url: '/industries/technology-financial-services',
    category: 'Industries'
  },
  {
    id: 'e-commerce-digital-retail',
    title: 'E-commerce & Digital Retail Recruitment',
    excerpt: 'Specialized talent acquisition for e-commerce platforms, digital retail, and online marketplace companies.',
    url: '/industries/e-commerce-digital-retail',
    category: 'Industries'
  },
  {
    id: 'energy-renewables-mining',
    title: 'Energy, Renewables & Mining Recruitment',
    excerpt: 'Executive search for energy sector, renewable energy companies, and mining industry leadership roles.',
    url: '/industries/energy-renewables-mining',
    category: 'Industries'
  },
  {
    id: 'manufacturing-distribution-industrial',
    title: 'Manufacturing & Industrial Recruitment',
    excerpt: 'Leadership recruitment for manufacturing, distribution, and industrial companies across all sectors.',
    url: '/industries/manufacturing-distribution-industrial',
    category: 'Industries'
  },
  {
    id: 'utilities-industry-leadership',
    title: 'Utilities Industry Leadership Excellence',
    excerpt: 'Specialized commercial leadership for utilities companies across electric, gas, water, and renewable energy sectors with comprehensive GTM expertise.',
    url: '/industries/manufacturing-distribution-industrial/utilities',
    category: 'Industries'
  },
  {
    id: 'pe-backed-entities',
    title: 'PE-Backed Manufacturing Entities',
    excerpt: 'Specialized commercial leadership for private equity-backed manufacturing and industrial companies driving accelerated growth and value creation.',
    url: '/industries/manufacturing-distribution-industrial/pe-backed-entities',
    category: 'Industries'
  },
  {
    id: 'sales-marketing-gtm',
    title: 'Sales, Marketing & Go-to-Market Leadership',
    excerpt: 'Comprehensive revenue leadership roles across industrial and utilities sectors with specialized GTM expertise and commercial strategy development.',
    url: '/industries/sales-marketing-go-to-market',
    category: 'Industries'
  },
  {
    id: 'tech-stack',
    title: 'Tech Stack - Our Technology Platform',
    excerpt: 'Learn about the technology and tools we use to deliver exceptional recruitment results.',
    url: '/tech-stack',
    category: 'Company'
  },
  {
    id: 'resources',
    title: 'Resources - Hiring Guides & Insights',
    excerpt: 'Valuable resources, guides, and insights for hiring managers and executives.',
    url: '/resources',
    category: 'Resources'
  },
  {
    id: 'guides',
    title: 'Hiring Guides & Best Practices',
    excerpt: 'Comprehensive guides and best practices for executive hiring and talent acquisition.',
    url: '/guides',
    category: 'Resources'
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    excerpt: 'Common questions about our executive search process, fractional hiring, and services.',
    url: '/faq',
    category: 'Support'
  }
];

/**
 * Site-wide search API endpoint
 * Searches across blog posts, pages, and FAQs
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const type = searchParams.get('type') || 'all'; // 'all', 'blog', 'page', 'faq'

    console.log(`Search API called: query="${query}", type="${type}", page=${page}`);

    // Always return a valid response structure, even for empty queries
    if (!query.trim()) {
      return NextResponse.json({
        results: [],
        total: 0,
        query: '',
        page,
        pageSize,
      } as SearchResponse);
    }

    const results: SearchResult[] = [];

    // Search blog posts
    if (type === 'all' || type === 'blog') {
      try {
        const blogResults = await searchBlogPosts(query);
        results.push(...blogResults);
        console.log(`Found ${blogResults.length} blog results`);
      } catch (error) {
        console.error('Error searching blog posts:', error);
        // Continue with other searches even if blog search fails
      }
    }

    // Search static pages (current Next.js pages)
    if (type === 'all' || type === 'page') {
      try {
        const staticPageResults = searchStaticPages(query);
        results.push(...staticPageResults);
        console.log(`Found ${staticPageResults.length} static page results`);
      } catch (error) {
        console.error('Error searching static pages:', error);
      }

      // Also search Strapi pages (for future when they're added)
      try {
        const strapiPageResults = await searchStrapiPages(query);
        results.push(...strapiPageResults);
        console.log(`Found ${strapiPageResults.length} Strapi page results`);
      } catch (error) {
        console.error('Error searching Strapi pages:', error);
        // Continue with other searches even if Strapi page search fails
      }
    }

    // Search FAQs
    if (type === 'all' || type === 'faq') {
      try {
        const faqResults = await searchFAQs(query);
        results.push(...faqResults);
        console.log(`Found ${faqResults.length} FAQ results`);
      } catch (error) {
        console.error('Error searching FAQs:', error);
        // Continue with other searches even if FAQ search fails
      }
    }

    // Sort results by relevance (title matches first, then content matches)
    const sortedResults = results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(query.toLowerCase());
      const bTitle = b.title.toLowerCase().includes(query.toLowerCase());
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      
      // If both or neither have title matches, sort by date (newest first)
      if (a.publishedAt && b.publishedAt) {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      
      return 0;
    });

    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedResults = sortedResults.slice(startIndex, startIndex + pageSize);

    console.log(`Returning ${paginatedResults.length} results out of ${sortedResults.length} total`);

    // Always return a valid SearchResponse structure
    const response: SearchResponse = {
      results: paginatedResults,
      total: sortedResults.length,
      query,
      page,
      pageSize,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Search API error:', error);
    
    // Always return a valid JSON response, even on error
    const errorResponse: SearchResponse = {
      results: [],
      total: 0,
      query: '',
      page: 1,
      pageSize: 10,
    };

    return NextResponse.json(errorResponse, { status: 200 }); // Return 200 to avoid fetch errors
  }
}

/**
 * Search static Next.js pages
 */
function searchStaticPages(query: string): SearchResult[] {
  const queryLower = query.toLowerCase();
  
  return STATIC_PAGES
    .filter(page => 
      page.title.toLowerCase().includes(queryLower) ||
      page.excerpt.toLowerCase().includes(queryLower) ||
      page.category.toLowerCase().includes(queryLower) ||
      page.url.toLowerCase().includes(queryLower)
    )
    .map(page => ({
      id: `static-${page.id}`,
      title: page.title,
      excerpt: page.excerpt,
      url: page.url,
      type: 'page' as const,
      category: page.category,
    }));
}

/**
 * Search blog posts
 */
async function searchBlogPosts(query: string): Promise<SearchResult[]> {
  try {
    const searchParams = {
      filters: {
        $or: [
          {
            title: {
              $containsi: query,
            },
          },
          {
            excerpt: {
              $containsi: query,
            },
          },
          {
            content: {
              $containsi: query,
            },
          },
        ],
      },
      populate: {
        categories: true,
        coverImage: true,
      },
      sort: ['publishedAt:desc'],
      pagination: {
        pageSize: 50, // Get more results for better sorting
      },
    };

    const response = await fetchAPI('blog-posts', searchParams);
    
    if (!response || !response.data || !Array.isArray(response.data)) {
      console.log('No blog posts found or invalid response structure');
      return [];
    }

    return response.data.map((post: any) => ({
      id: `blog-${post.id}`,
      title: post.title || 'Untitled Post',
      excerpt: post.excerpt || extractExcerpt(post.content) || 'No description available',
      url: `/blog/${post.slug}`,
      type: 'blog' as const,
      publishedAt: post.publishedAt,
      category: post.categories?.[0]?.name || undefined,
    }));
  } catch (error) {
    console.error('Error searching blog posts:', error);
    return [];
  }
}

/**
 * Search Strapi pages - improved with multiple search strategies
 */
async function searchStrapiPages(query: string): Promise<SearchResult[]> {
  try {
    // Try multiple search strategies for pages
    const searchStrategies = [
      // Strategy 1: Search in metadata and shortName
      {
        filters: {
          $or: [
            {
              'metadata.metaTitle': {
                $containsi: query,
              },
            },
            {
              'metadata.metaDescription': {
                $containsi: query,
              },
            },
            {
              shortName: {
                $containsi: query,
              },
            },
          ],
        },
        populate: {
          metadata: true,
        },
        pagination: {
          pageSize: 50,
        },
      },
      // Strategy 2: Simple search in slug
      {
        filters: {
          slug: {
            $containsi: query,
          },
        },
        populate: {
          metadata: true,
        },
        pagination: {
          pageSize: 50,
        },
      },
    ];

    let allPages: any[] = [];

    for (const searchParams of searchStrategies) {
      try {
        const response = await fetchAPI('pages', searchParams);
        
        if (response && response.data && Array.isArray(response.data)) {
          console.log(`Found ${response.data.length} Strapi pages with this strategy`);
          allPages.push(...response.data);
        }
      } catch (strategyError) {
        // Silently ignore 400 errors (Bad Request) as they're expected when no pages exist
        if (strategyError instanceof Error && strategyError.message.includes('400')) {
          // Pages don't exist in Strapi yet, this is expected
          continue;
        }
        console.error('Strapi pages search strategy failed:', strategyError);
        continue;
      }
    }

    // Remove duplicates based on ID
    const uniquePages = allPages.filter((page, index, self) => 
      index === self.findIndex(p => p.id === page.id)
    );

    if (uniquePages.length === 0) {
      // Don't log this as it's expected when no pages exist in Strapi
      return [];
    }

    console.log(`Total unique Strapi pages found: ${uniquePages.length}`);

    return uniquePages.map((page: any) => ({
      id: `strapi-page-${page.id}`,
      title: page.metadata?.metaTitle || page.shortName || page.slug || 'Untitled Page',
      excerpt: page.metadata?.metaDescription || `Page: ${page.slug}` || 'No description available',
      url: page.slug.startsWith('/') ? page.slug : `/${page.slug}`,
      type: 'page' as const,
      publishedAt: page.publishedAt,
    }));
  } catch (error) {
    // Silently ignore 400 errors for Strapi pages as they're expected when no pages exist
    if (error instanceof Error && error.message.includes('400')) {
      return [];
    }
    console.error('Error searching Strapi pages:', error);
    return [];
  }
}

/**
 * Search FAQs
 */
async function searchFAQs(query: string): Promise<SearchResult[]> {
  try {
    const searchParams = {
      filters: {
        $or: [
          {
            Question: {
              $containsi: query,
            },
          },
          {
            Answer: {
              $containsi: query,
            },
          },
        ],
      },
      sort: ['Order:asc'],
      pagination: {
        pageSize: 50,
      },
    };

    const response = await fetchAPI('faqs', searchParams);
    
    if (!response || !response.data || !Array.isArray(response.data)) {
      console.log('No FAQs found or invalid response structure');
      return [];
    }

    return response.data.map((faq: any) => ({
      id: `faq-${faq.id}`,
      title: faq.Question || 'Untitled FAQ',
      excerpt: truncateText(stripHtml(faq.Answer || ''), 150),
      url: `/faq#faq-${faq.id}`,
      type: 'faq' as const,
      publishedAt: faq.publishedAt,
      category: faq.Category || undefined,
    }));
  } catch (error) {
    console.error('Error searching FAQs:', error);
    return [];
  }
}

/**
 * Extract excerpt from content blocks
 */
function extractExcerpt(content: any): string {
  if (!content) return '';
  
  if (typeof content === 'string') {
    return truncateText(stripHtml(content), 150);
  }
  
  if (Array.isArray(content)) {
    for (const block of content) {
      if (block.type === 'paragraph' && block.children) {
        const text = block.children
          .filter((child: any) => child.type === 'text')
          .map((child: any) => child.text)
          .join(' ');
        if (text.trim()) {
          return truncateText(text, 150);
        }
      }
    }
  }
  
  return '';
}

/**
 * Strip HTML tags from text
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ');
}

/**
 * Truncate text to specified length
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
} 