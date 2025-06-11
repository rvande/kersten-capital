'use client'

import React from 'react';
import { generateHeadingId } from '@/app/utils/markdown-utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Simple markdown renderer that converts basic markdown to HTML
 * Handles headings, paragraphs, lists, bold, italic, links, and preserves spacing
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const convertMarkdownToHTML = (markdown: string): string => {
    let html = markdown;

    // Convert headings first and add IDs for navigation
    html = html.replace(/^### (.*$)/gim, (match, title) => {
      const id = generateHeadingId(title);
      return `<h3 id="${id}" class="text-2xl md:text-3xl font-black mt-8 mb-5 text-[#002C5F] font-montserrat leading-tight">${title}</h3>`;
    });
    
    html = html.replace(/^## (.*$)/gim, (match, title) => {
      const id = generateHeadingId(title);
      return `<h2 id="${id}" class="text-3xl md:text-4xl font-black mt-10 mb-6 text-[#002C5F] font-montserrat leading-tight">${title}</h2>`;
    });
    
    html = html.replace(/^# (.*$)/gim, (match, title) => {
      const id = generateHeadingId(title);
      return `<h1 id="${id}" class="text-4xl md:text-5xl font-black mt-12 mb-8 text-[#002C5F] font-montserrat leading-tight">${title}</h1>`;
    });

    // Convert links before other formatting
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#0C6BAF] hover:text-[#187CC1] font-semibold underline decoration-2 underline-offset-2 hover:decoration-[#187CC1] transition-all duration-300">$1</a>');

    // Convert unordered lists
    html = html.replace(/^\* (.+)$/gm, '<li class="pl-3 leading-relaxed">$1</li>');
    // Wrap consecutive list items in ul tags
    html = html.replace(/(<li[^>]*>.*?<\/li>(\s*<li[^>]*>.*?<\/li>)*)/g, '<ul class="list-disc pl-8 mb-8 text-black/80 space-y-3 font-open-sans text-lg">$1</ul>');

    // Convert ordered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="pl-3 leading-relaxed">$1</li>');
    
    // Handle paragraphs with better spacing preservation
    // First, split by double newlines for paragraph breaks
    const sections = html.split(/\n\s*\n/);
    
    html = sections.map(section => {
      const trimmedSection = section.trim();
      
      // Skip if it's already wrapped in HTML tags
      if (trimmedSection.startsWith('<')) {
        return trimmedSection;
      }
      
      // Skip empty sections
      if (!trimmedSection) {
        return '';
      }
      
      // Handle single line breaks within paragraphs by converting them to <br> tags
      // But preserve the structure for lists and headings
      if (!trimmedSection.includes('<li>') && !trimmedSection.includes('<h')) {
        const linesWithBreaks = trimmedSection.replace(/\n/g, '<br>');
        return `<p class="mb-6 text-black/80 leading-relaxed font-open-sans text-lg">${linesWithBreaks}</p>`;
      }
      
      return trimmedSection;
    }).filter(section => section !== '').join('\n\n');

    // Convert bold and italic text AFTER handling paragraphs and line breaks
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-[#002C5F]">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Clean up any double-wrapped elements
    html = html.replace(/<p[^>]*>(<h[1-6][^>]*>.*?<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p[^>]*>(<ul[^>]*>[\s\S]*?<\/ul>)<\/p>/g, '$1');
    html = html.replace(/<p[^>]*>(<ol[^>]*>[\s\S]*?<\/ol>)<\/p>/g, '$1');
    
    // Clean up any <br> tags that might be inside headings or list items
    html = html.replace(/(<h[1-6][^>]*>[^<]*)<br>([^<]*<\/h[1-6]>)/g, '$1 $2');
    html = html.replace(/(<li[^>]*>[^<]*)<br>([^<]*<\/li>)/g, '$1 $2');

    return html;
  };

  const htmlContent = convertMarkdownToHTML(content);

  return (
    <div 
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer; 