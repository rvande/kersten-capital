import { BlogPost } from '../types/blog';
import { parseISO, format } from 'date-fns';
import { stringify } from 'qs';

/**
 * Sort blog posts based on the specified sort option
 * @param posts Array of blog posts to sort
 * @param sortOption Sort option string ('newest', 'oldest', 'a-z', 'z-a')
 * @returns Sorted array of blog posts
 */
export const sortBlogPosts = (posts: BlogPost[], sortOption: string = 'newest'): BlogPost[] => {
  const sortedPosts = [...posts]; // Create a copy to avoid mutating the original
  
  switch (sortOption) {
    case 'oldest':
      return sortedPosts.sort((a, b) => 
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
      
    case 'a-z':
      return sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
      
    case 'z-a':
      return sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
      
    case 'newest':
    default:
      return sortedPosts.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  }
};

/**
 * Format a date for display
 * @param dateString ISO date string
 * @param options Date formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string => {
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Get the reading time for a piece of content
 * @param content Text content
 * @returns Reading time in minutes
 */
export const getReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime === 0 ? 1 : readingTime;
};

export async function fetchWhitepapers(limit = 10) {
  try {
    // Create query parameters object
    const queryParams = {
      populate: '*',  // Use * to get all related media
      sort: ['PublicationDate:desc', 'createdAt:desc'],
      pagination: {
        limit: limit,
      },
    };

    // Fix URL to ensure no double slashes
    let apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';
    // Remove trailing slash if it exists
    if (apiUrl.endsWith('/')) {
      apiUrl = apiUrl.slice(0, -1);
    }
    
    const queryString = stringify(queryParams, { encodeValuesOnly: true });
    
    // Try plural endpoint first (standard Strapi convention)
    console.log(`Attempting to fetch from ${apiUrl}/api/whitepapers`);
    let res = await fetch(
      `${apiUrl}/api/whitepapers?${queryString}`,
      { next: { revalidate: 60 } }
    );
    
    // If that fails, try the singular endpoint
    if (!res.ok && res.status === 404) {
      console.log('Plural endpoint not found, trying singular endpoint...');
      res = await fetch(
        `${apiUrl}/api/whitepaper?${queryString}`,
        { next: { revalidate: 60 } }
      );
    }

    if (!res.ok) {
      // Get response details for better error context
      const statusCode = res.status;
      let errorMessage;
      
      try {
        // Try to parse error response if it's JSON
        const errorData = await res.json();
        errorMessage = errorData.error?.message || JSON.stringify(errorData);
      } catch (e) {
        // If response isn't JSON, use text or status text
        errorMessage = await res.text().catch(() => res.statusText);
      }

      throw new Error(`Failed to fetch whitepapers: ${statusCode} - ${errorMessage}`);
    }

    const data = await res.json();
    
    // Log the full structure of the first item for debugging
    if (data.data && data.data.length > 0) {
      console.log('First whitepaper data structure:', JSON.stringify(data.data[0], null, 2));
      
      // Check for field names to help with debugging
      const firstItem = data.data[0];
      if (firstItem.attributes) {
        console.log('Available fields:', Object.keys(firstItem.attributes));
      } else if (firstItem) {
        console.log('Available fields (flat structure):', Object.keys(firstItem));
      }
    }
    
    // Handle both standard Strapi v5 response (with data.attributes) and flat format
    let whitepapers = [];
    
    if (Array.isArray(data)) {
      // Already an array
      whitepapers = data;
    } else if (data.data && Array.isArray(data.data)) {
      // Standard Strapi response with data array
      whitepapers = data.data;
    }
    
    return whitepapers;
  } catch (error) {
    console.error('Error fetching whitepapers:', error);
    return [];
  }
} 