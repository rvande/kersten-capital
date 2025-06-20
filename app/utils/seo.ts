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
    "logo": `${SITE_URL}/logo.png`,
    "description": "Strategic talent investment firm specializing in executive search and leadership solutions.",
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
    ]
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
    "image": `${SITE_URL}/logo.png`,
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