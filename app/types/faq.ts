import { StrapiResponse } from './global';

export interface FAQ {
  id: number;
  documentId: string;
  Question: string;
  Answer: string;
  Category: string | null;
  Order: number;
  Schemaid: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FAQResponse {
  faqs: StrapiResponse<FAQ[]>;
}

export interface FAQCategory {
  id: number;
  attributes: {
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface FAQCategoryResponse {
  categories: StrapiResponse<FAQCategory[]>;
} 