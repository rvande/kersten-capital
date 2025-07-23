'use client'

import React from 'react';
import { generateHeadingId } from '@/app/utils/markdown-utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Enhanced renderer for Strapi's rich text editor output
 * Handles mixed HTML/markdown content and ensures proper semantic structure
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const convertToSemanticHTML = (input: string): string => {
    let html = input.trim();

    // Step 1: Convert markdown headings to HTML
    html = html.replace(/^\s*#{6}\s+(.+?)(?:\s*#*\s*)?$/gim, (match, title) => {
      const id = generateHeadingId(title);
      return `<h6 id="${id}" class="text-lg md:text-xl font-black mt-6 mb-3 text-[#002C5F] font-montserrat leading-tight">${title}</h6>`;
    });
    
    html = html.replace(/^\s*#{5}\s+(.+?)(?:\s*#*\s*)?$/gim, (match, title) => {
      const id = generateHeadingId(title);
      return `<h5 id="${id}" class="text-xl md:text-2xl font-black mt-7 mb-4 text-[#002C5F] font-montserrat leading-tight">${title}</h5>`;
    });
    
    html = html.replace(/^\s*#{4}\s+(.+?)(?:\s*#*\s*)?$/gim, (match, title) => {
      const id = generateHeadingId(title);
      return `<h4 id="${id}" class="text-xl md:text-2xl font-black mt-7 mb-4 text-[#002C5F] font-montserrat leading-tight">${title}</h4>`;
    });
    
    html = html.replace(/^\s*#{3}\s+(.+?)(?:\s*#*\s*)?$/gim, (match, title) => {
      const id = generateHeadingId(title);
      return `<h3 id="${id}" class="text-2xl md:text-3xl font-black mt-8 mb-5 text-[#002C5F] font-montserrat leading-tight">${title}</h3>`;
    });
    
    html = html.replace(/^\s*#{2}\s+(.+?)(?:\s*#*\s*)?$/gim, (match, title) => {
      const id = generateHeadingId(title);
      return `<h2 id="${id}" class="text-3xl md:text-4xl font-black mt-10 mb-6 text-[#002C5F] font-montserrat leading-tight">${title}</h2>`;
    });
    
    html = html.replace(/^\s*#{1}\s+(.+?)(?:\s*#*\s*)?$/gim, (match, title) => {
      const id = generateHeadingId(title);
      return `<h1 id="${id}" class="text-4xl md:text-5xl font-black mt-12 mb-8 text-[#002C5F] font-montserrat leading-tight">${title}</h1>`;
    });

    // Step 2: Convert markdown links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#0C6BAF] hover:text-[#187CC1] font-semibold underline decoration-2 underline-offset-2 hover:decoration-[#187CC1] transition-all duration-300">$1</a>');

    // Step 3: Convert markdown lists
    html = html.replace(/^\* (.+)$/gm, '<li class="pl-3 leading-relaxed">$1</li>');
    html = html.replace(/(<li[^>]*>.*?<\/li>(\s*<li[^>]*>.*?<\/li>)*)/g, '<ul class="list-disc pl-8 mb-8 text-black/80 space-y-3 font-open-sans text-lg">$1</ul>');
    
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="pl-3 leading-relaxed">$1</li>');

    // Step 4: Convert markdown formatting
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-[#002C5F]">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/(^|[\s>])_([^_\-<]+)_([\s<]|$)/g, '$1<em class="italic">$2</em>$3');

    // Step 5: Now handle the critical part - wrapping loose text in paragraphs
    // Split by HTML block elements to identify text segments that need wrapping
    const segments = html.split(/(<\/?(?:h[1-6]|ul|ol|li|blockquote|pre|div|figure|table|p)[^>]*>)/i);
    
    let result = '';
    let inBlockElement = false;
    let blockElementStack = [];
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      
      // Check if this segment is an HTML tag
      const tagMatch = segment.match(/^<(\/?)(h[1-6]|ul|ol|li|blockquote|pre|div|figure|table|p)([^>]*)>$/i);
      
      if (tagMatch) {
        // This is an HTML tag
        result += segment;
        
        const isClosing = tagMatch[1] === '/';
        const tagName = tagMatch[2].toLowerCase();
        
        if (isClosing) {
          // Closing tag
          if (blockElementStack.length > 0 && blockElementStack[blockElementStack.length - 1] === tagName) {
            blockElementStack.pop();
          }
          inBlockElement = blockElementStack.length > 0;
        } else {
          // Opening tag (not self-closing)
          if (!['li'].includes(tagName)) { // li tags don't count as full block containers for our purposes
            blockElementStack.push(tagName);
            inBlockElement = true;
          }
        }
      } else {
        // This is text content
        const trimmedSegment = segment.trim();
        
        if (trimmedSegment) {
          if (!inBlockElement) {
            // Text outside of block elements needs to be wrapped in paragraphs
            // Handle line breaks by creating separate paragraphs or br tags
            const lines = segment.split('\n').map(line => line.trim()).filter(line => line);
            
            if (lines.length === 1) {
              // Single line of text
              result += `<p class="mb-6 text-black/80 leading-relaxed font-open-sans text-lg">${lines[0]}</p>`;
            } else if (lines.length > 1) {
              // Multiple lines - create separate paragraphs for each line
              lines.forEach(line => {
                if (line) {
                  result += `<p class="mb-6 text-black/80 leading-relaxed font-open-sans text-lg">${line}</p>`;
                }
              });
            }
          } else {
            // Text inside block elements, preserve line breaks as br tags
            const processedText = segment.replace(/\n/g, '<br>');
            result += processedText;
          }
        } else if (segment) {
          // Preserve whitespace
          result += segment;
        }
      }
    }

    // Step 6: Clean up any issues
    // Remove empty paragraphs
    result = result.replace(/<p[^>]*>\s*<\/p>/g, '');
    
    // Remove paragraphs that only contain whitespace, breaks, or are completely empty
    result = result.replace(/<p[^>]*>(\s|&nbsp;|<br\s*\/?>)*<\/p>/g, '');
    
    // Clean up any double-wrapped elements
    result = result.replace(/<p[^>]*>(<h[1-6][^>]*>.*?<\/h[1-6]>)<\/p>/g, '$1');
    result = result.replace(/<p[^>]*>(<ul[^>]*>[\s\S]*?<\/ul>)<\/p>/g, '$1');
    result = result.replace(/<p[^>]*>(<ol[^>]*>[\s\S]*?<\/ol>)<\/p>/g, '$1');
    
    // Remove consecutive empty lines
    result = result.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    return result.trim();
  };

  const htmlContent = convertToSemanticHTML(content);

  return (
    <div 
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer; 