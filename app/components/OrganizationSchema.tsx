import Script from 'next/script';
import { generateOrganizationSchema } from '../utils/seo';

export default function OrganizationSchema() {
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateOrganizationSchema() }}
    />
  );
} 