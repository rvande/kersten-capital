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
    return undefined;
  }
  
  const iconUrl = getStrapiMedia(favicon);
  if (!iconUrl) return undefined;
  
  const formats = favicon.formats || {};
  
  // Get different sizes from image formats if available
  const smallIcon = formats.small ? getStrapiMedia({ ...favicon, url: formats.small.url }) : iconUrl;
  const mediumIcon = formats.medium ? getStrapiMedia({ ...favicon, url: formats.medium.url }) : iconUrl;
  const largeIcon = formats.large ? getStrapiMedia({ ...favicon, url: formats.large.url }) : iconUrl;
  
  // Ensure we don't have null URLs
  if (!smallIcon || !mediumIcon || !largeIcon) return undefined;
  
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
  if (!image) return [];
  
  const imageUrl = getStrapiMedia(image);
  if (!imageUrl) return [];
  
  return [
    {
      url: imageUrl,
      width: image.width || 1200,
      height: image.height || 630,
      alt: altText,
    }
  ];
} 