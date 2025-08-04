import Script from 'next/script';
import { generateWebPageSchema } from '../utils/seo';

interface WebPageSchemaProps {
  page: {
    title: string;
    description: string;
    url: string;
    breadcrumb?: string[];
  };
}

export default function WebPageSchema({ page }: WebPageSchemaProps) {
  return (
    <Script
      id="webpage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateWebPageSchema(page) }}
    />
  );
} 