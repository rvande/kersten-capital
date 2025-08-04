/**
 * SEO Utilities
 * 
 * This file contains helper functions for SEO optimization including:
 * - Canonical URL generation
 * - Schema.org structured data markup
 */

// Base URL for the site
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';

/**
 * Generate canonical URL for a page
 * @param path - The path of the page (e.g., '/about-us')
 * @returns The full canonical URL
 */
export function getCanonicalUrl(path: string): string {
  // Remove trailing slashes and ensure path starts with a slash
  const normalizedPath = path === '/' ? '' : path.replace(/\/$/, '');
  return `${SITE_URL}${normalizedPath}`;
}

/**
 * Generate Organization schema markup
 * @returns Organization schema markup as a JSON string
 */
export function generateOrganizationSchema(): string {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kersten Talent Capital",
    "url": SITE_URL,
    "logo": `${SITE_URL}/kersten-logo.jpg`,
    "description": "Strategic talent investment firm specializing in executive search and leadership solutions.",
    "foundingDate": "2017",
    "numberOfEmployees": "10-50",
    "areaServed": ["United States", "Europe"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8310 South Valley Highway, Suite 300",
      "addressLocality": "Englewood",
      "addressRegion": "CO",
      "postalCode": "80112",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-303-414-2057",
      "contactType": "customer service",
      "email": "michael@kerstentalentcapital.com"
    },
    "sameAs": [
      "https://www.linkedin.com/company/kersten-talent-capital/",
      "https://twitter.com/kerstentalent"
    ],
    // Additional properties Google looks for
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Executive Search Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Executive Search",
            "url": `${SITE_URL}/services/executive-search`
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Fractional Hiring",
            "url": `${SITE_URL}/services/fractional-hiring`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Contingency Hiring",
            "url": `${SITE_URL}/services/contingency-hiring`
          }
        }
      ]
    }
  };

  return JSON.stringify(organizationSchema);
}

/**
 * Generate FAQ schema markup for structured data
 * @param faqs - Array of FAQ objects with Question and Answer properties
 * @returns FAQ schema markup as a JSON string
 */
export function generateFAQSchema(faqs: Array<{Question: string, Answer: string}>): string {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.Question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.Answer
      }
    }))
  };

  return JSON.stringify(faqSchema);
}

/**
 * Generate LocalBusiness schema markup
 * @returns LocalBusiness schema markup as a JSON string
 */
export function generateLocalBusinessSchema(): string {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Kersten Talent Capital",
    "image": `${SITE_URL}/kersten-logo.jpg`,
    "url": SITE_URL,
    "telephone": "+1-303-414-2057",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8310 South Valley Highway, Suite 300",
      "addressLocality": "Englewood",
      "addressRegion": "CO",
      "postalCode": "80112",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.5695,
      "longitude": -104.8698
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "priceRange": "$$$"
  };

  return JSON.stringify(localBusinessSchema);
} 

/**
 * Generate Article schema markup for blog posts
 * @param post - Blog post data
 * @returns Article schema markup as a JSON string
 */
export function generateArticleSchema(post: {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: { url: string };
  publishedAt: string;
  updatedAt: string;
  author?: string;
  categories?: Array<{ name: string }>;
}): string {
  try {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title || "Blog Post",
      "description": post.excerpt || "Insights on leadership and talent acquisition",
      "image": post.coverImage?.url ? post.coverImage.url : `${SITE_URL}/kersten-logo.jpg`,
      "datePublished": post.publishedAt || new Date().toISOString(),
      "dateModified": post.updatedAt || new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "Kersten Talent Capital"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Kersten Talent Capital",
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/kersten-logo.jpg`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": SITE_URL
      },
      "articleSection": post.categories?.[0]?.name || "Executive Search",
      "keywords": post.categories?.map(cat => cat.name).join(", ") || "executive search, talent acquisition, leadership"
    };

    return JSON.stringify(articleSchema);
  } catch (error) {
    console.error('Error generating article schema:', error);
    // Return a minimal valid schema if generation fails
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Blog Post",
      "description": "Insights on leadership and talent acquisition",
      "author": {
        "@type": "Organization",
        "name": "Kersten Talent Capital"
      }
    });
  }
}

/**
 * Generate Service schema markup
 * @param service - Service data
 * @returns Service schema markup as a JSON string
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  category?: string;
}): string {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": `${SITE_URL}${service.url}`,
    "provider": {
      "@type": "Organization",
      "name": "Kersten Talent Capital",
      "url": SITE_URL
    },
    "serviceType": service.category || "Executive Search",
    "areaServed": ["United States", "Europe"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Executive Talent Services"
    }
  };

  return JSON.stringify(serviceSchema);
}

/**
 * Generate WebPage schema for industry pages
 * @param page - Page data
 * @returns WebPage schema markup as a JSON string
 */
export function generateWebPageSchema(page: {
  title: string;
  description: string;
  url: string;
  breadcrumb?: string[];
}): string {
  try {
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": page.title || "Industry Page",
      "description": page.description || "Specialized recruitment expertise",
      "url": `${SITE_URL}${page.url}`,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": page.breadcrumb?.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item,
          "item": `${SITE_URL}${page.url}`
        })) || []
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "Kersten Talent Capital"
      }
    };

    return JSON.stringify(webPageSchema);
  } catch (error) {
    console.error('Error generating webpage schema:', error);
    // Return a minimal valid schema if generation fails
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Industry Page",
      "description": "Specialized recruitment expertise",
      "mainEntity": {
        "@type": "Organization",
        "name": "Kersten Talent Capital"
      }
    });
  }
} 

/**
 * Generates hreflang tags for international SEO
 * @param currentUrl The current page URL
 * @param siteUrl The base site URL
 * @returns Array of hreflang objects for Next.js metadata
 */
export function generateHreflangTags(currentUrl: string, siteUrl: string = 'https://kerstentalentcapital.com') {
  // Remove trailing slash for consistency
  const cleanCurrentUrl = currentUrl.replace(/\/$/, '');
  const cleanSiteUrl = siteUrl.replace(/\/$/, '');
  
  // Define the languages/regions you want to target
  const hreflangConfig = [
    { lang: 'en', region: 'US', url: `${cleanSiteUrl}${cleanCurrentUrl}` },
    { lang: 'en', region: 'CA', url: `${cleanSiteUrl}${cleanCurrentUrl}` },
    { lang: 'en', region: 'GB', url: `${cleanSiteUrl}${cleanCurrentUrl}` },
    { lang: 'en', region: 'AU', url: `${cleanSiteUrl}${cleanCurrentUrl}` },
    { lang: 'x-default', url: `${cleanSiteUrl}${cleanCurrentUrl}` },
  ];

  return hreflangConfig.map(({ lang, region, url }) => ({
    hreflang: region ? `${lang}-${region}` : lang,
    href: url,
  }));
} 

/**
 * Truncates meta title to optimal SEO length (50-60 characters)
 * @param title The title to truncate
 * @param maxLength Maximum length (default 60)
 * @returns Truncated title
 */
export function truncateMetaTitle(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) return title;
  
  // Try to truncate at a word boundary
  const truncated = title.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) { // If we can find a good break point
    return truncated.substring(0, lastSpace).trim();
  }
  
  return truncated.trim();
}

/**
 * Truncates meta description to optimal SEO length (150-160 characters)
 * @param description The description to truncate
 * @param maxLength Maximum length (default 160)
 * @returns Truncated description
 */
export function truncateMetaDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  
  // Try to truncate at a word boundary
  const truncated = description.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) { // If we can find a good break point
    return truncated.substring(0, lastSpace).trim() + '...';
  }
  
  return truncated.trim() + '...';
}

/**
 * Generates optimal meta title for pages
 * @param pageTitle The main page title
 * @param brandName The brand name (default: "Kersten Talent Capital")
 * @returns Optimized meta title
 */
export function generateOptimalMetaTitle(pageTitle: string, brandName: string = "Kersten Talent Capital"): string {
  const baseTitle = `${pageTitle} | ${brandName}`;
  return truncateMetaTitle(baseTitle, 60);
}

/**
 * Generates optimal meta description
 * @param description The description text
 * @returns Optimized meta description
 */
export function generateOptimalMetaDescription(description: string): string {
  return truncateMetaDescription(description, 160);
} 