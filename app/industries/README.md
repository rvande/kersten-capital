# Industries Pages

This directory contains both static and dynamic industry pages.

## Dynamic System (New)

The new dynamic system fetches industry data from Strapi v5 CMS using a catch-all route structure:

- **Main page**: `page.tsx` - Lists all active industries from CMS
- **Dynamic pages**: `[...slug]/page.tsx` - Handles both single and nested industry pages
- **API functions**: `../api/api.ts` - Contains `getIndustries()`, `getIndustryBySlug()`, and `getIndustrySlugs()`
- **Types**: `../types/pages.ts` - Industry-related TypeScript interfaces

### Route Structure

The catch-all route `[...slug]` supports both:
- **Single-level routes**: `/industries/technology-financial-services`
- **Nested routes**: `/industries/manufacturing-distribution-industrial/pe-backed-entities`

### CMS Structure

Industries in Strapi v5 have the following fields:
- `title` - Industry name
- `slug` - URL slug (unique, can include forward slashes for nested routes)
- `shortDescription` - Brief description for listing page
- `isActive` - Whether to show the industry
- `displayOrder` - Sort order
- `heroTitle` - Custom hero title (optional)
- `heroSubtitle` - Hero subtitle text
- `heroImage` - Hero background image
- `gradient` - CSS gradient class for styling
- `overviewSection` - Rich text overview content
- `focusAreas` - Array of focus areas with titles and descriptions

### Slug Examples

The system handles various slug formats:
- `technology-financial-services` → `/industries/technology-financial-services`
- `manufacturing-distribution-industrial/pe-backed-entities` → `/industries/manufacturing-distribution-industrial/pe-backed-entities`
- `manufacturing-distribution-industrial/utilities` → `/industries/manufacturing-distribution-industrial/utilities`

### Features

- **Static Generation**: Uses `generateStaticParams()` for optimal performance
- **SEO Optimized**: Dynamic metadata generation with Open Graph support
- **Responsive Design**: Mobile-first responsive layout
- **Error Handling**: Graceful fallbacks and loading states
- **Consistent Styling**: Matches existing brand guidelines
- **Nested Routes**: Supports unlimited nesting levels via catch-all route

## Static Pages (Legacy)

The following static directories are kept for backward compatibility:
- `technology-financial-services/`
- `manufacturing-distribution-industrial/`
- `e-commerce-digital-retail/`
- `energy-renewables-mining/`
- `sales-marketing-go-to-market/`

These will be gradually migrated to the CMS system.

## Usage

To add a new industry:
1. Create the industry in Strapi CMS
2. Set `isActive` to true
3. For nested routes, include forward slashes in the slug (e.g., `parent-industry/sub-specialization`)
4. The page will automatically be generated and included in sitemap
5. No code changes required

To modify an existing industry:
1. Update the content in Strapi CMS
2. Changes will be reflected after rebuild/revalidation

## Technical Implementation

The catch-all route `[...slug]` works by:
1. Splitting the slug array back into a string with `slug.join('/')`
2. Using the `$or` filter in the API to match both the exact slug and the slug with `industries/` prefix
3. Generating static params by splitting nested slugs on forward slashes
4. Supporting unlimited nesting levels through the array-based slug parameter 