# Sitemap Implementation

This project uses a custom sitemap implementation:

## Custom XML Sitemap (`app/sitemap.xml/route.ts`)

This file provides a custom implementation with full control over the XML format and caching headers.

- **File**: `app/sitemap.xml/route.ts`
- **Format**: Custom XML generation
- **URL**: Accessible at `/sitemap.xml`
- **Benefits**: 
  - Complete control over XML format
  - Custom HTTP headers and caching
  - Direct access to data sources

## Data Source

The sitemap uses data sources from `app/utils/sitemap.ts`, which includes:

- Static pages
- Blog posts
- Blog categories
- Industry pages

## Implementation Details

The custom sitemap implementation:

1. Collects URLs from various sources (pages, blog posts, categories, etc.)
2. Generates a standard XML sitemap format
3. Sets appropriate content type and caching headers
4. Returns the sitemap as a response when `/sitemap.xml` is requested

## Making Changes

If you need to modify the sitemap:

1. Edit `app/sitemap.xml/route.ts` to change the XML generation or response handling
2. Edit `app/utils/sitemap.ts` to modify the data sources or URL collection logic 