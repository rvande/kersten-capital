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

/**
 * Remove markdown formatting that shouldn't appear in navigation text
 * - Strips markdown links, emphasis, and inline code markers
 */
export function sanitizeHeadingText(rawText: string): string {
  if (!rawText) return '';
  let text = rawText;
  // Strip markdown links: [text](url) → text
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
  // Strip bold/italic markers
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');
  // Strip inline code markers
  text = text.replace(/`([^`]+)`/g, '$1');
  return text.trim();
}

export function extractHeadings(content: string): HeadingItem[] {
  // Updated regex to support all 6 heading levels and handle whitespace/trailing # characters
  const headingRegex = /^\s*(#{1,6})\s+(.+?)(?:\s*#*\s*)?$/gm;
  const items: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    const text = sanitizeHeadingText(rawText);
    const id = generateHeadingId(text);
    
    items.push({ id, text, level });
  }

  return items;
} 