/**
 * Generate a URL-friendly ID from a heading text
 * This ensures consistent ID generation across components
 */
export function generateHeadingId(text: string): string {
  return text.toLowerCase()
    // Remove quotes, colons, and other punctuation but keep meaningful characters
    .replace(/["'`]/g, '') // Remove quotes
    .replace(/[^\w\s-]/g, ' ') // Replace non-word characters with spaces (except hyphens)
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .trim();
}

/**
 * Extract headings from markdown content
 */
export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): HeadingItem[] {
  // Updated regex to support all 6 heading levels and handle whitespace/trailing # characters
  const headingRegex = /^\s*(#{1,6})\s+(.+?)(?:\s*#*\s*)?$/gm;
  const items: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateHeadingId(text);
    
    items.push({ id, text, level });
  }

  return items;
} 