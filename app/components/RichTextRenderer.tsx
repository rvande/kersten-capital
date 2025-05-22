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
 */
const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return <p className="text-gray-500">No content available.</p>;
  }

  const renderNode = (node: any, index: number | string): ReactNode => {
    // Handle null or undefined nodes
    if (!node) return null;

    // Handle different block types based on the node.type property
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={`p-${index}`} className="mb-5 text-gray-800 leading-relaxed">
            {node.children && node.children.map((child: any, childIndex: number) => 
              renderTextNode(child, `p-${index}-${childIndex}`)
            )}
          </p>
        );
      
      case 'heading':
        // Use createElement instead of dynamic JSX tag
        const level = node.level || 2;
        
        // Define heading styles based on level
        const headingStyles = {
          1: "text-4xl font-bold mt-10 mb-6 text-[#3D3939]",
          2: "text-3xl font-bold mt-8 mb-5 text-[#3D3939]",
          3: "text-2xl font-bold mt-7 mb-4 text-[#3D3939]",
          4: "text-xl font-bold mt-6 mb-3 text-[#3D3939]",
          5: "text-lg font-bold mt-5 mb-3 text-[#3D3939]",
          6: "text-base font-bold mt-4 mb-2 text-[#3D3939]",
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
            <ol key={`ol-${index}`} className="list-decimal pl-8 mb-6 text-gray-800 space-y-2">
              {node.children && node.children.map((item: any, itemIndex: number) => 
                <li key={`li-${index}-${itemIndex}`} className="pl-2 pb-1">
                  {item.children && item.children.map((child: any, childIndex: number) => 
                    renderNode(child, `li-${index}-${itemIndex}-${childIndex}`)
                  )}
                </li>
              )}
            </ol>
          );
        } else {
          return (
            <ul key={`ul-${index}`} className="list-disc pl-8 mb-6 text-gray-800 space-y-2">
              {node.children && node.children.map((item: any, itemIndex: number) => 
                <li key={`li-${index}-${itemIndex}`} className="pl-2 pb-1">
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
          <li key={`li-${index}`} className="mb-2">
            {node.children && node.children.map((child: any, childIndex: number) => 
              renderNode(child, `li-child-${index}-${childIndex}`)
            )}
          </li>
        );
      
      case 'quote':
      case 'blockquote':
        return (
          <blockquote key={`quote-${index}`} className="border-l-4 border-[#CA3B2A] pl-6 italic my-8 py-3 bg-[#CA3B2A]/5 text-gray-700 rounded-r text-lg">
            {node.children && node.children.map((child: any, childIndex: number) => 
              renderNode(child, `quote-${index}-${childIndex}`)
            )}
          </blockquote>
        );
      
      case 'code':
        return (
          <pre key={`code-${index}`} className="bg-gray-100 p-5 rounded-lg my-6 overflow-x-auto border border-gray-200 shadow-sm">
            <code className="text-[#3D3939] text-sm">
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
          <figure key={`img-${index}`} className="my-8">
            <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-md">
              <Image 
                src={imageUrl} 
                alt={altText} 
                fill 
                className="object-contain"
              />
            </div>
            {caption && <figcaption className="text-center text-sm text-gray-600 mt-3 italic">{caption}</figcaption>}
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
        formattedText = <strong key={`bold-${key}`} className="font-bold text-[#3D3939]">{formattedText}</strong>;
      }
      
      if (node.italic) {
        formattedText = <em key={`italic-${key}`}>{formattedText}</em>;
      }
      
      if (node.underline) {
        formattedText = <u key={`underline-${key}`}>{formattedText}</u>;
      }
      
      if (node.code) {
        formattedText = <code key={`inline-code-${key}`} className="bg-gray-100 px-1.5 py-0.5 rounded text-[#CA3B2A] text-sm">{formattedText}</code>;
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
            className="text-[#CA3B2A] hover:underline font-medium bg-transparent"
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
            className="text-[#CA3B2A] hover:underline font-medium bg-transparent"
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