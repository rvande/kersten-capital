import { StrapiImage, StrapiResponse } from './global';

// Metadata component for pages
export interface PageMetadata {
  metaTitle: string;
  metaDescription: string;
  metaImage: StrapiImage | null;
  keywords?: string;
  shareImage?: StrapiImage | null;
  twitterCardType?: string;
  twitterUsername?: string;
}

// Base interface for all content sections
export interface BaseContentSection {
  __component: string;
  id: number;
}

// Hero section component
export interface HeroSection extends BaseContentSection {
  __component: 'sections.hero';
  title?: string;
  description?: string;
  picture?: StrapiImage;
  buttons?: Array<{
    id: number;
    url: string;
    newTab: boolean;
    text: string;
    type: string;
  }>;
}

// Bottom actions section component
export interface BottomActionsSection extends BaseContentSection {
  __component: 'sections.bottom-actions';
  title?: string;
  buttons?: Array<{
    id: number;
    url: string;
    newTab: boolean;
    text: string;
    type: string;
  }>;
}

// Feature columns group component
export interface FeatureColumnsGroupSection extends BaseContentSection {
  __component: 'sections.feature-columns-group';
  features?: Array<{
    id: number;
    title: string;
    description: string;
    icon?: StrapiImage;
  }>;
}

// Feature rows group component
export interface FeatureRowsGroupSection extends BaseContentSection {
  __component: 'sections.feature-rows-group';
  features?: Array<{
    id: number;
    title: string;
    description: string;
    link?: {
      id: number;
      url: string;
      newTab: boolean;
      text: string;
    };
    media?: StrapiImage;
  }>;
}

// Testimonials group component
export interface TestimonialsGroupSection extends BaseContentSection {
  __component: 'sections.testimonials-group';
  title?: string;
  description?: string;
  testimonials?: Array<{
    id: number;
    text: string;
    authorName: string;
    authorTitle?: string;
    picture?: StrapiImage;
  }>;
}

// Large video component
export interface LargeVideoSection extends BaseContentSection {
  __component: 'sections.large-video';
  title?: string;
  description?: string;
  video?: string;
  poster?: StrapiImage;
}

// Rich text component
export interface RichTextSection extends BaseContentSection {
  __component: 'sections.rich-text';
  content: any; // Rich text content (blocks format)
}

// Pricing component
export interface PricingSection extends BaseContentSection {
  __component: 'sections.pricing';
  title?: string;
  plans?: Array<{
    id: number;
    name: string;
    description?: string;
    price: string;
    pricePeriod?: string;
    product?: {
      id: number;
    };
    features?: Array<{
      id: number;
      name: string;
      included: boolean;
    }>;
  }>;
}

// Lead form component
export interface LeadFormSection extends BaseContentSection {
  __component: 'sections.lead-form';
  title?: string;
  emailPlaceholder?: string;
  submitButton?: {
    id: number;
    text: string;
    type: string;
  };
  location?: string;
}

// Union type for all possible content sections
export type ContentSection = 
  | HeroSection
  | BottomActionsSection
  | FeatureColumnsGroupSection
  | FeatureRowsGroupSection
  | TestimonialsGroupSection
  | LargeVideoSection
  | RichTextSection
  | PricingSection
  | LeadFormSection;

// Main Page interface
export interface Page {
  id: number;
  documentId?: string;
  shortName?: string;
  slug: string;
  metadata: PageMetadata;
  contentSections: ContentSection[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
  localizations?: Page[];
}

// Response types with Strapi's data structure
export type PagesResponse = StrapiResponse<Page[]>;
export type PageResponse = StrapiResponse<Page>;

// Parameters for fetching pages
export interface GetPagesParams {
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: string[];
  filters?: Record<string, any>;
  locale?: string;
  populate?: Record<string, any>;
}

// Industry-specific types
export interface FocusArea {
  id: number;
  title: string;
  description: string;
  icon?: string; // Icon name or class
}

export interface IndustryOverview {
  id: number;
  title?: string;
  content: string; // Rich text content
  highlights?: string[]; // Array of highlight points
}

export interface Industry {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription: string;
  isActive: boolean;
  displayOrder: number;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: StrapiImage;
  gradient: string; // CSS gradient class
  overviewSection?: IndustryOverview;
  focusAreas?: FocusArea[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
  localizations?: Industry[];
}

// Response types for industries
export type IndustriesResponse = StrapiResponse<Industry[]>;
export type IndustryResponse = StrapiResponse<Industry>;

// Parameters for fetching industries
export interface GetIndustriesParams {
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: string[];
  filters?: Record<string, any>;
  locale?: string;
  populate?: Record<string, any>;
} 