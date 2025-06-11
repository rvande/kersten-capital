/**
 * Utility functions for formatting text content
 */

/**
 * Converts simple text patterns to HTML with bullet points
 * Supports multiple formats:
 * - Lines starting with "- " become bullet points
 * - Lines starting with "* " become bullet points  
 * - Lines starting with "• " become bullet points
 * - Lines starting with numbers like "1. " become numbered lists
 * - Single line with multiple bullet points separated by " -" or " *"
 */
export function formatTextWithBullets(text: string): string {
  if (!text) return text;

  // Check if text already contains HTML tags
  if (text.includes('<') && text.includes('>')) {
    return text;
  }

  // Handle single line with multiple bullet points (like from CMS)
  // Look for patterns like "text -item1 -item2 -item3" or just "-item1 -item2 -item3"
  if (text.includes(' -') && !text.includes('\n')) {
    // Split by " -" to get bullet items
    const parts = text.split(' -');
    let result = '';
    
    // First part might be intro text or first bullet (if it starts with -)
    const firstPart = parts[0].trim();
    if (firstPart.startsWith('-')) {
      // First part is also a bullet, remove the leading -
      const firstBulletContent = firstPart.substring(1).trim();
      result += '<ul>\n';
      if (firstBulletContent) {
        result += `  <li>${firstBulletContent}</li>\n`;
      }
    } else if (firstPart) {
      // First part is intro text
      result += `<p>${firstPart}</p>\n<ul>\n`;
    } else {
      // No intro text, just start the list
      result += '<ul>\n';
    }
    
    // Process remaining parts as bullet items
    for (let i = 1; i < parts.length; i++) {
      const item = parts[i].trim();
      if (item) {
        result += `  <li>${item}</li>\n`;
      }
    }
    
    result += '</ul>';
    return result;
  }

  // Handle single line with multiple bullet points using "*"
  if (text.includes(' *') && !text.includes('\n')) {
    const parts = text.split(' *');
    let result = '';
    
    const firstPart = parts[0].trim();
    if (firstPart.startsWith('*')) {
      const firstBulletContent = firstPart.substring(1).trim();
      result += '<ul>\n';
      if (firstBulletContent) {
        result += `  <li>${firstBulletContent}</li>\n`;
      }
    } else if (firstPart) {
      result += `<p>${firstPart}</p>\n<ul>\n`;
    } else {
      result += '<ul>\n';
    }
    
    for (let i = 1; i < parts.length; i++) {
      const item = parts[i].trim();
      if (item) {
        result += `  <li>${item}</li>\n`;
      }
    }
    
    result += '</ul>';
    return result;
  }

  // Original multi-line processing
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  let result = '';
  let inUnorderedList = false;
  let inOrderedList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = i < lines.length - 1 ? lines[i + 1] : '';
    
    // Check if this line is a bullet point
    const isBullet = /^[-*•]\s/.test(line);
    const isNumbered = /^\d+\.\s/.test(line);
    
    // Check if next line is also a bullet/numbered item
    const nextIsBullet = /^[-*•]\s/.test(nextLine);
    const nextIsNumbered = /^\d+\.\s/.test(nextLine);
    
    if (isBullet) {
      // Start unordered list if not already in one
      if (!inUnorderedList) {
        if (inOrderedList) {
          result += '</ol>\n';
          inOrderedList = false;
        }
        result += '<ul>\n';
        inUnorderedList = true;
      }
      
      // Add list item (remove the bullet marker)
      const content = line.replace(/^[-*•]\s/, '');
      result += `  <li>${content}</li>\n`;
      
      // Close list if next line is not a bullet
      if (!nextIsBullet && !nextIsNumbered) {
        result += '</ul>\n';
        inUnorderedList = false;
      }
    } else if (isNumbered) {
      // Start ordered list if not already in one
      if (!inOrderedList) {
        if (inUnorderedList) {
          result += '</ul>\n';
          inUnorderedList = false;
        }
        result += '<ol>\n';
        inOrderedList = true;
      }
      
      // Add list item (remove the number)
      const content = line.replace(/^\d+\.\s/, '');
      result += `  <li>${content}</li>\n`;
      
      // Close list if next line is not numbered
      if (!nextIsNumbered && !nextIsBullet) {
        result += '</ol>\n';
        inOrderedList = false;
      }
    } else {
      // Close any open lists
      if (inUnorderedList) {
        result += '</ul>\n';
        inUnorderedList = false;
      }
      if (inOrderedList) {
        result += '</ol>\n';
        inOrderedList = false;
      }
      
      // Add regular paragraph
      result += `<p>${line}</p>\n`;
    }
  }
  
  // Close any remaining open lists
  if (inUnorderedList) {
    result += '</ul>\n';
  }
  if (inOrderedList) {
    result += '</ol>\n';
  }
  
  return result.trim();
}

/**
 * Alternative simpler function that just converts lines starting with - or * to bullets
 */
export function convertSimpleBullets(text: string): string {
  if (!text) return text;
  
  // If text already contains HTML, return as-is
  if (text.includes('<') && text.includes('>')) {
    return text;
  }
  
  const lines = text.split('\n');
  let result = '';
  let inList = false;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      if (!inList) {
        result += '<ul>\n';
        inList = true;
      }
      const content = trimmedLine.substring(2);
      result += `<li>${content}</li>\n`;
    } else if (trimmedLine.length > 0) {
      if (inList) {
        result += '</ul>\n';
        inList = false;
      }
      result += `<p>${trimmedLine}</p>\n`;
    }
  }
  
  if (inList) {
    result += '</ul>\n';
  }
  
  return result.trim();
} 