'use client'

import React, { createElement, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RichTextRendererProps {
  content: any[];
}

/**
 * RichTextRenderer component to render Strapi content blocks
 * Supports paragraphs, headings, lists, quotes, images and formatting
 * Updated to match site's brand styling
 */
const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return <p className="text-gray-500 font-open-sans">No content available.</p>;
  }

  const renderNode = (node: any, index: number | string): ReactNode => {
    // Handle null or undefined nodes
    if (!node) return null;

    // Handle different block types based on the node.type property
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={`p-${index}`} className="mb-6 text-black/80 leading-relaxed font-open-sans text-lg">
            {node.children && node.children.map((child: any, childIndex: number) => 
              renderTextNode(child, `p-${index}-${childIndex}`)
            )}
          </p>
        );
      
      case 'heading':
        // Use createElement instead of dynamic JSX tag
        const level = node.level || 2;
        
        // Define heading styles based on level - using site's brand colors
        const headingStyles = {
          1: "text-4xl md:text-5xl font-black mt-12 mb-8 text-[#002C5F] font-montserrat leading-tight",
          2: "text-3xl md:text-4xl font-black mt-10 mb-6 text-[#002C5F] font-montserrat leading-tight",
          3: "text-2xl md:text-3xl font-black mt-8 mb-5 text-[#002C5F] font-montserrat leading-tight",
          4: "text-xl md:text-2xl font-black mt-7 mb-4 text-[#002C5F] font-montserrat leading-tight",
          5: "text-lg md:text-xl font-black mt-6 mb-3 text-[#002C5F] font-montserrat leading-tight",
          6: "text-base md:text-lg font-black mt-5 mb-3 text-[#002C5F] font-montserrat leading-tight",
        };
        
        return createElement(
          `h${level}`,
          { 
            key: `h-${index}`,
            className: headingStyles[level as keyof typeof headingStyles]
          },
          node.children && node.children.map((child: any, childIndex: number) => 
            renderTextNode(child, `h-${index}-${childIndex}`)
          )
        );
      
      case 'list':
        if (node.format === 'ordered') {
          return (
            <ol key={`ol-${index}`} className="list-decimal pl-8 mb-8 text-black/80 space-y-3 font-open-sans text-lg">
              {node.children && node.children.map((item: any, itemIndex: number) => 
                <li key={`li-${index}-${itemIndex}`} className="pl-3 leading-relaxed">
                  {item.children && item.children.map((child: any, childIndex: number) => 
                    renderNode(child, `li-${index}-${itemIndex}-${childIndex}`)
                  )}
                </li>
              )}
            </ol>
          );
        } else {
          return (
            <ul key={`ul-${index}`} className="list-disc pl-8 mb-8 text-black/80 space-y-3 font-open-sans text-lg">
              {node.children && node.children.map((item: any, itemIndex: number) => 
                <li key={`li-${index}-${itemIndex}`} className="pl-3 leading-relaxed">
                  {item.children && item.children.map((child: any, childIndex: number) => 
                    renderNode(child, `li-${index}-${itemIndex}-${childIndex}`)
                  )}
                </li>
              )}
            </ul>
          );
        }
      
      case 'list-item':
        return (
          <li key={`li-${index}`} className="mb-3 leading-relaxed">
            {node.children && node.children.map((child: any, childIndex: number) => 
              renderNode(child, `li-child-${index}-${childIndex}`)
            )}
          </li>
        );
      
      case 'quote':
      case 'blockquote':
        return (
          <blockquote key={`quote-${index}`} className="border-l-4 border-[#0C6BAF] pl-8 italic my-10 py-6 bg-gradient-to-r from-[#0C6BAF]/5 to-transparent text-black/80 rounded-r-lg text-xl font-open-sans leading-relaxed">
            {node.children && node.children.map((child: any, childIndex: number) => 
              renderNode(child, `quote-${index}-${childIndex}`)
            )}
          </blockquote>
        );
      
      case 'code':
        return (
          <pre key={`code-${index}`} className="bg-gray-50 border border-gray-200 p-6 rounded-xl my-8 overflow-x-auto shadow-sm">
            <code className="text-[#002C5F] text-sm font-mono leading-relaxed">
              {node.children && node.children.map((child: any, childIndex: number) => 
                renderTextNode(child, `code-${index}-${childIndex}`, false)
              )}
            </code>
          </pre>
        );
      
      case 'image':
        const imageUrl = node.url || (node.image?.url || '');
        const altText = node.alternativeText || node.alt || 'Blog image';
        const caption = node.caption || '';
        
        return (
          <figure key={`img-${index}`} className="my-10">
            <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <Image 
                src={imageUrl} 
                alt={altText} 
                fill 
                className="object-cover"
              />
            </div>
            {caption && (
              <figcaption className="text-center text-sm text-black/60 mt-4 italic font-open-sans">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      
      // Default case for unknown block types
      default:
        if (node.text !== undefined) {
          return renderTextNode(node, `text-${index}`);
        }
        
        if (node.children && Array.isArray(node.children)) {
          return (
            <div key={`unknown-${index}`}>
              {node.children.map((child: any, childIndex: number) => 
                renderNode(child, `unknown-${index}-${childIndex}`)
              )}
            </div>
          );
        }
        
        return null;
    }
  };
  
  const renderTextNode = (node: any, key: string, handleFormatting: boolean = true): ReactNode => {
    if (!node) return null;
    
    // Handle plain text
    if (typeof node === 'string' || node.text !== undefined) {
      const text = typeof node === 'string' ? node : node.text;
      
      // If no formatting needed or no formatting attributes present
      if (!handleFormatting || (!node.bold && !node.italic && !node.underline && !node.code && !node.type)) {
        return <span key={key}>{text}</span>;
      }
      
      // Apply text formatting
      let formattedText = <span key={key}>{text}</span>;
      
      if (node.bold) {
        formattedText = <strong key={`bold-${key}`} className="font-black text-[#002C5F]">{formattedText}</strong>;
      }
      
      if (node.italic) {
        formattedText = <em key={`italic-${key}`} className="italic">{formattedText}</em>;
      }
      
      if (node.underline) {
        formattedText = <u key={`underline-${key}`} className="underline decoration-[#0C6BAF]">{formattedText}</u>;
      }
      
      if (node.code) {
        formattedText = <code key={`inline-code-${key}`} className="bg-gray-100 px-2 py-1 rounded text-[#0C6BAF] text-sm font-mono border border-gray-200">{formattedText}</code>;
      }
      
      return formattedText;
    }
    
    // Handle links
    if (node.type === 'link') {
      const url = node.url || '#';
      const isExternal = url.startsWith('http') || url.startsWith('//');
      
      if (isExternal) {
        return (
          <a 
            key={key}
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#0C6BAF] hover:text-[#187CC1] font-semibold underline decoration-2 underline-offset-2 hover:decoration-[#187CC1] transition-all duration-300"
          >
            {node.children && node.children.map((child: any, index: number) => 
              renderTextNode(child, `link-${key}-${index}`)
            )}
          </a>
        );
      } else {
        return (
          <Link 
            key={key}
            href={url}
            className="text-[#0C6BAF] hover:text-[#187CC1] font-semibold underline decoration-2 underline-offset-2 hover:decoration-[#187CC1] transition-all duration-300"
          >
            {node.children && node.children.map((child: any, index: number) => 
              renderTextNode(child, `link-${key}-${index}`)
            )}
          </Link>
        );
      }
    }
    
    // Handle other cases
    if (node.children && Array.isArray(node.children)) {
      return node.children.map((child: any, index: number) => 
        renderTextNode(child, `${key}-${index}`)
      );
    }
    
    return null;
  };

  return (
    <div className="rich-text">
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
};

export default RichTextRenderer; 