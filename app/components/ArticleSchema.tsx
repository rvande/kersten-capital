import Script from 'next/script';
import { generateArticleSchema } from '../utils/seo';

interface ArticleSchemaProps {
  post: {
    title: string;
    excerpt: string;
    content: string;
    coverImage?: { url: string };
    publishedAt: string;
    updatedAt: string;
    author?: { name: string };
    slug?: string;
    categories?: Array<{ name: string }>;
  };
}

export default function ArticleSchema({ post }: ArticleSchemaProps) {
  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateArticleSchema(post) }}
    />
  );
} 