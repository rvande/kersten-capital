# Blog Schema Generation & Author Display

**Date:** 2026-03-09
**Status:** Approved

## Problem

1. The `ArticleSchema` component exists on every blog post page but has two issues:
   - `author` is always hardcoded to "Kersten Talent Capital" (Organization), even though the prop is accepted
   - `mainEntityOfPage @id` points to the site homepage, not the individual post URL
   - `updatedAt` is passed as `publishedAt` in `page.tsx`, so both dates are the same
2. Author data from Strapi is not fetched or displayed. The blog post hero shows date + reading time but no author name.

## Strapi Author Schema

Collection type `authors` with fields:
- `name` (string, required)
- `bio` (string)
- `avatar` (media, single image)
- `blog_posts` (oneToMany relation to blog-post)

## Approach

**Option A — Add `author` to populate in existing API calls** (chosen)

Targeted populate change, minimal diff, no extra network calls.

## Design

### 1. Type Updates (`app/types/blog.ts`)
Add `Author` interface with `id`, `name`, `bio?`, `avatar?`. Add `author?: Author` field to `BlogPost`.

### 2. API Updates (`app/api/blog/api.ts`)
Add `author: { populate: ['avatar'] }` to the populate object in `getBlogPostBySlug`. Also add to `getBlogPosts` for consistency (listing pages may use it in future).

### 3. Schema Fixes (`app/utils/seo.ts` + `app/components/ArticleSchema.tsx`)
- `generateArticleSchema`: change `author` param from `string` to `{ name: string } | undefined`
- When author present: emit `{ "@type": "Person", "name": author.name }`
- When absent: fall back to `{ "@type": "Organization", "name": "Kersten Talent Capital" }`
- Accept `slug` param and build `mainEntityOfPage @id` as `${SITE_URL}/blog/${slug}`
- `ArticleSchema` component: update prop type to pass `author` object and `slug`

### 4. Page Updates (`app/blog/[slug]/page.tsx`)
- Destructure `author` and `updatedAt` from `post.data`
- Pass `author` and `slug` to `ArticleSchema`
- Pass `author` down to `BlogPostClient`

### 5. Author Display (`app/blog/[slug]/BlogPostClient.tsx`)
- Add `author?: { name: string }` to `BlogPostClientProps`
- In the meta row (date + reading time), prepend author name if present:
  `Author Name • Jan 1, 2026 • 5 min read`

## Files Changed
- `app/types/blog.ts`
- `app/api/blog/api.ts`
- `app/utils/seo.ts`
- `app/components/ArticleSchema.tsx`
- `app/blog/[slug]/page.tsx`
- `app/blog/[slug]/BlogPostClient.tsx`
