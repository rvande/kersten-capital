import { Navbar } from './navigation';
import { Footer } from './navigation';

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
  sizeInBytes?: number;
}

export interface Metadata {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage?: StrapiImage | null;
  twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterUsername?: string | null;
}

export interface Global {
  id: number;
  documentId: string;
  metaTitleSuffix: string;
  metadata: Metadata;
  favicon: StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  notificationBanner: any | null;
  navbar: Navbar | null;
  footer: Footer | null;
  localizations: any[];
}

export interface GlobalData {
  global: StrapiResponse<Global>;
} 