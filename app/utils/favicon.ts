import { StrapiImage } from "../types/global";
import { getStrapiMedia } from "./media";
import { Icons } from "next/dist/lib/metadata/types/metadata-types";

/**
 * Generates metadata icon objects for various icon types
 * @param favicon The Strapi favicon image
 * @returns Objects structured for Next.js metadata icons
 */
export function generateIconMetadata(favicon: StrapiImage | null): Icons | undefined {
  if (!favicon) {
    console.log('No favicon data received from Strapi');
    return undefined;
  }
  
  const iconUrl = getStrapiMedia(favicon);
  if (!iconUrl) {
    console.log('Could not generate icon URL from favicon data');
    return undefined;
  }
  
  console.log('Generated favicon URL:', iconUrl);
  
  const formats = favicon.formats || {};
  
  // Get different sizes from image formats if available
  const smallIcon = formats.small ? getStrapiMedia({ ...favicon, url: formats.small.url }) : iconUrl;
  const mediumIcon = formats.medium ? getStrapiMedia({ ...favicon, url: formats.medium.url }) : iconUrl;
  const largeIcon = formats.large ? getStrapiMedia({ ...favicon, url: formats.large.url }) : iconUrl;
  
  // Ensure we don't have null URLs
  if (!smallIcon || !mediumIcon || !largeIcon) {
    console.log('One or more icon sizes could not be generated');
    return undefined;
  }
  
  console.log('Icon URLs generated:', { smallIcon, mediumIcon, largeIcon });
  
  return {
    icon: [
      { url: smallIcon, sizes: '32x32', type: 'image/png' },
      { url: mediumIcon, sizes: '96x96', type: 'image/png' },
      { url: largeIcon, sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: mediumIcon, sizes: '180x180', type: 'image/png' }
    ],
    shortcut: [
      { url: smallIcon }
    ],
  };
}

/**
 * Generates Open Graph image objects for metadata
 * @param image The main image to use
 * @param altText Alternative text for the image
 * @returns An array of OG image objects formatted for Next.js metadata
 */
export function generateOgImages(image: StrapiImage | null, altText: string) {
  // Try to use the provided image first
  if (image) {
    const imageUrl = getStrapiMedia(image);
    
    if (imageUrl) {
      return [{
        url: imageUrl,
        width: image.width || 1200,
        height: image.height || 630,
        alt: altText,
      }];
    }
  }
  
  // Fallback to default OG image
  const defaultOgImage = {
    url: 'https://kerstencapital.s3.us-east-1.amazonaws.com/OG_Image_ff4eaa3237.png',
    width: 1200,
    height: 630,
    alt: altText || 'Kersten Talent Capital - Strategic Talent Investment & Career Acceleration',
  };
  
  return [defaultOgImage];
} 