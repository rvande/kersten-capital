import { StrapiImage } from "../types/global";
import { getStrapiURL } from "../api/api";

/**
 * Get the full URL for a Strapi media
 * Works for local and S3 hosted images
 */
export function getStrapiMedia(media?: StrapiImage | null) {
  if (!media) {
    return null;
  }

  const { url } = media;
  
  // If the URL starts with a slash, it's a local image from Strapi
  if (url.startsWith('/')) {
    return getStrapiURL(url);
  }

  // Otherwise, it's probably from the S3 bucket
  return url;
} 