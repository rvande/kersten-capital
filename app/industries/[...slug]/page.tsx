import React from 'react';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, getStrapiURL, getIndustrySlugs } from '../../api/api';
import { Industry } from '../../types/pages';
import WebPageSchema from '../../components/WebPageSchema';
import IndustryPageClient from './IndustryPageClient';

interface IndustryPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Generate static params for all industry slugs (both single and nested)
export async function generateStaticParams() {
  try {
    const slugs = await getIndustrySlugs();
    return slugs.map((slug) => ({
      slug: slug.split('/'), // Split nested slugs into array segments
    }));
  } catch (error) {
    console.error('Error generating static params for industries:', error);
    return [];
  }
}

// Generate metadata for each industry page
export async function generateMetadata({ params }: IndustryPageProps) {
  try {
    const { slug } = await params;
    const fullSlug = slug.join('/'); // Join array back into slug string
    const response = await getIndustryBySlug(fullSlug);
    const industry = response?.data;

    if (!industry) {
      return {
        title: 'Industry Not Found | Kersten Talent Capital',
        description: 'The requested industry page could not be found.',
      };
    }

    // Get site URL from environment variable or default
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';
    const canonicalUrl = `${siteUrl}/industries/${fullSlug}`;

    return {
      title: `${industry.title} | Kersten Talent Capital`,
      description: industry.shortDescription || `Specialized recruitment expertise in ${industry.title.toLowerCase()}.`,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${industry.title} | Kersten Talent Capital`,
        description: industry.shortDescription || `Specialized recruitment expertise in ${industry.title.toLowerCase()}.`,
        url: canonicalUrl,
        images: industry.heroImage?.url ? [
          {
            url: industry.heroImage.url.startsWith('http') 
              ? industry.heroImage.url 
              : getStrapiURL(industry.heroImage.url),
            width: 1200,
            height: 630,
            alt: industry.heroTitle || industry.title,
          }
        ] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for industry:', error);
    return {
      title: 'Industry | Kersten Talent Capital',
      description: 'Specialized recruitment expertise across key industries.',
    };
  }
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  try {
    const { slug } = await params;
    const fullSlug = slug.join('/'); // Join array back into slug string
    const response = await getIndustryBySlug(fullSlug);
    const industry = response?.data;

    if (!industry) {
      notFound();
    }

    // Get site URL for schema
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com';
    const canonicalUrl = `${siteUrl}/industries/${fullSlug}`;

    return (
      <>
        <WebPageSchema 
          page={{
            title: industry.title,
            description: industry.shortDescription || `Specialized recruitment expertise in ${industry.title.toLowerCase()}.`,
            url: canonicalUrl,
            breadcrumb: ['Industries', industry.title]
          }}
        />
        <IndustryPageClient industry={industry} />
      </>
    );
  } catch (error) {
    console.error('Error fetching industry:', error);
    notFound();
  }
} 