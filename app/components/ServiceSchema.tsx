import Script from 'next/script';
import { generateServiceSchema } from '../utils/seo';

interface ServiceSchemaProps {
  service: {
    name: string;
    description: string;
    url: string;
    category?: string;
  };
}

export default function ServiceSchema({ service }: ServiceSchemaProps) {
  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateServiceSchema(service) }}
    />
  );
} 