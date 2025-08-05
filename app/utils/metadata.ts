import { Metadata } from 'next';
import { getGlobalData } from '../api/api';
import { generateOgImages } from './favicon';

/**
 * Generates consistent Open Graph images from Strapi global data
 * This ensures all pages use the same OG image logic
 * @param altText Alternative text for the image
 * @returns An array of OG image objects formatted for Next.js metadata
 */
export async function generateConsistentOgImages(altText: string) {
  try {
    const globalData = await getGlobalData();
    const global = globalData.data;
    
    const { shareImage } = global.metadata;
    
    // Generate OG images from shareImage or fallback to favicon
    const ogImages = shareImage 
      ? generateOgImages(shareImage, altText)
      : generateOgImages(global.favicon, altText);
    
    // Ensure we always have at least one OG image
    const finalOgImages = ogImages.length > 0 ? ogImages : [{
      url: 'https://kerstencapital.s3.us-east-1.amazonaws.com/OG_Image_ff4eaa3237.png',
      width: 1200,
      height: 630,
      alt: altText || 'Kersten Talent Capital',
    }];
    
    return finalOgImages;
  } catch (error) {
    console.error('Error generating consistent OG images:', error);
    
    // Fallback to default OG image
    return [{
      url: 'https://kerstencapital.s3.us-east-1.amazonaws.com/OG_Image_ff4eaa3237.png',
      width: 1200,
      height: 630,
      alt: altText || 'Kersten Talent Capital',
    }];
  }
}

/**
 * Generates consistent Twitter card images from Strapi global data
 * @param altText Alternative text for the image
 * @returns An array of image URLs for Twitter cards
 */
export async function generateConsistentTwitterImages(altText: string) {
  const ogImages = await generateConsistentOgImages(altText);
  return ogImages.map(img => img.url);
} 