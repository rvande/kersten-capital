import Script from 'next/script';
import { generateOrganizationSchema } from '../utils/seo';

export default function HeadSchema() {
  const organizationSchema = generateOrganizationSchema();
  
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: organizationSchema }}
    />
  );
} 