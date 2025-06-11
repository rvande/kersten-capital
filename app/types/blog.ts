import { StrapiImage, StrapiResponse } from './global';

// SEO metadata component
export interface SeoMetadata {
  metaTitle: string;
  metaDescription: string;
  metaImage: StrapiImage | null;
  keywords?: string;
}

// Individual blog post
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Can be rich text blocks or markdown string
  markdownContent?: string; // Optional markdown content field
  coverImage: StrapiImage | null;
  seo: SeoMetadata;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Category
export interface Category {
  id: number;
  name: string;
  slug: string;
  blog_posts?: BlogPost[]; // Optional because we might not always populate this relation
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Response types with Strapi's data structure
export type BlogPostsResponse = StrapiResponse<BlogPost[]>;
export type BlogPostResponse = StrapiResponse<BlogPost>;
export type CategoriesResponse = StrapiResponse<Category[]>;
export type CategoryResponse = StrapiResponse<Category>;

// Interface to handle both uppercase (standard) and lowercase (sometimes returned by Strapi) field names
export interface WhitepaperAttributes {
  // Standard uppercase names from schema
  Title: string;
  Description: string;
  Document: {
    data: {
      id: number;
      attributes: {
        url: string;
        name: string;
        size: number;
        mime: string;
      }
    }
  };
  CoverImage: {
    data: {
      id: number;
      attributes: {
        url: string;
        width: number;
        height: number;
        formats: Record<string, any>;
      }
    }
  };
  PublicationDate: string;
  
  // Optional lowercase alternatives that Strapi might return
  title?: string;
  description?: string;
  document?: {
    data: {
      id: number;
      attributes: {
        url: string;
        name: string;
        size: number;
        mime: string;
      }
    }
  };
  coverImage?: {
    data: {
      id: number;
      attributes: {
        url: string;
        width: number;
        height: number;
        formats: Record<string, any>;
      }
    }
  };
  publicationDate?: string;
  
  // Standard metadata fields
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Updated Whitepaper interface for the flat structure Strapi is returning
export interface Whitepaper {
  id: number;
  documentId?: string;
  Title: string;
  Description: string;
  PublicationDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  
  // Document is directly on the root level, not in a data.attributes structure
  Document: {
    id: number;
    documentId?: string;
    name: string;
    url: string;
    mime: string;
    size: number;
    ext?: string;
    hash?: string;
    formats?: Record<string, any>;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
  
  // CoverImage is directly on the root level, not in a data.attributes structure
  CoverImage: {
    id: number;
    documentId?: string;
    name: string;
    url: string;
    mime: string;
    width: number;
    height: number;
    formats?: {
      large?: {
        url: string;
        width: number;
        height: number;
      };
      medium?: {
        url: string;
        width: number;
        height: number;
      };
      small?: {
        url: string;
        width: number;
        height: number;
      };
      thumbnail?: {
        url: string;
        width: number;
        height: number;
      };
    };
    hash?: string;
    ext?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
  
  // For backward compatibility with the nested structure
  attributes?: WhitepaperAttributes;
} 