# Blog Schema & Author Display Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Populate and display author name from Strapi on blog post pages, and fix Article schema to use real author, correct post URL, and correct updatedAt.

**Architecture:** Add `author` to Strapi populate calls, extend the `BlogPost` type, thread author data through page → ArticleSchema + BlogPostClient. Fix `generateArticleSchema` to accept an author object and post slug instead of hardcoded values.

**Tech Stack:** Next.js 15 App Router, TypeScript, Strapi v5 (Railway), Tailwind CSS. No test framework — verify via `tsc --noEmit` and dev server visual check.

---

### Task 1: Add Author type to blog types

**Files:**
- Modify: `app/types/blog.ts`

**Step 1: Add the Author interface and update BlogPost**

In `app/types/blog.ts`, add the following interface before `BlogPost` and add the `author` field to `BlogPost`:

```typescript
// Add before BlogPost interface
export interface Author {
  id: number;
  name: string;
  bio?: string;
  avatar?: StrapiImage | null;
}

// Inside BlogPost interface, add after `publishedAt: string;`:
author?: Author;
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No new errors.

**Step 3: Commit**

```bash
git add app/types/blog.ts
git commit -m "feat: add Author type to blog types"
```

---

### Task 2: Populate author in Strapi API calls

**Files:**
- Modify: `app/api/blog/api.ts`

**Step 1: Add author populate to `getBlogPostBySlug`**

In `getBlogPostBySlug`, find the `params` object's `populate` block (around line 63) and add `author`:

```typescript
populate: {
  coverImage: { populate: '*' },
  categories: { populate: '*' },
  seo: { populate: '*' },
  author: { populate: ['avatar'] },
},
```

**Step 2: Add author populate to `getBlogPosts`**

In `getBlogPosts`, find the `defaultParams.populate` block (around line 14) and add `author`:

```typescript
populate: {
  coverImage: { populate: '*' },
  categories: { populate: '*' },
  seo: { populate: '*' },
  author: { populate: ['avatar'] },
},
```

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 4: Commit**

```bash
git add app/api/blog/api.ts
git commit -m "feat: populate author relation in blog API calls"
```

---

### Task 3: Fix generateArticleSchema in seo.ts

**Files:**
- Modify: `app/utils/seo.ts`

**Step 1: Update the function signature**

Find `generateArticleSchema` (around line 170). Change the parameter type from:

```typescript
export function generateArticleSchema(post: {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: { url: string };
  publishedAt: string;
  updatedAt: string;
  author?: string;
  categories?: Array<{ name: string }>;
}): string {
```

To:

```typescript
export function generateArticleSchema(post: {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: { url: string };
  publishedAt: string;
  updatedAt: string;
  slug?: string;
  author?: { name: string };
  categories?: Array<{ name: string }>;
}): string {
```

**Step 2: Fix the author field in the schema object**

Find the `"author"` entry in `articleSchema` (around line 189) and replace:

```typescript
"author": {
  "@type": "Organization",
  "name": "Kersten Talent Capital"
},
```

With:

```typescript
"author": post.author
  ? { "@type": "Person", "name": post.author.name }
  : { "@type": "Organization", "name": "Kersten Talent Capital" },
```

**Step 3: Fix mainEntityOfPage @id**

Find the `"mainEntityOfPage"` entry and replace:

```typescript
"mainEntityOfPage": {
  "@type": "WebPage",
  "@id": SITE_URL
},
```

With:

```typescript
"mainEntityOfPage": {
  "@type": "WebPage",
  "@id": post.slug ? `${SITE_URL}/blog/${post.slug}` : SITE_URL
},
```

**Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors (callers may show errors — fix those in later tasks).

**Step 5: Commit**

```bash
git add app/utils/seo.ts
git commit -m "fix: use real author and post URL in article schema"
```

---

### Task 4: Update ArticleSchema component

**Files:**
- Modify: `app/components/ArticleSchema.tsx`

**Step 1: Update the prop interface**

Replace the entire file content with:

```typescript
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
    slug?: string;
    author?: { name: string };
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
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors (page.tsx caller may still error — fix in next task).

**Step 3: Commit**

```bash
git add app/components/ArticleSchema.tsx
git commit -m "feat: update ArticleSchema props to support author object and slug"
```

---

### Task 5: Pass author and updatedAt through page.tsx

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

**Step 1: Update the destructure of post.data**

Find the destructure around line 297 and add `author` and `updatedAt`:

```typescript
const {
  title = 'Untitled Post',
  publishedAt = (post.data as any)?.createdAt ?? FALLBACK_DATE,
  updatedAt = publishedAt,
  excerpt = '',
  content = null,
  markdownContent = null,
  coverImage = null,
  categories = [],
  slug: postSlug = slug,
  author = undefined,
} = post.data || {};
```

**Step 2: Update postData passed to BlogPostClient**

Find the `postData` object (around line 309) and add `author`:

```typescript
const postData = {
  title,
  publishedAt,
  excerpt,
  content,
  markdownContent,
  coverImage,
  categories,
  slug: postSlug,
  author,
};
```

**Step 3: Update ArticleSchema usage**

Find the `<ArticleSchema>` JSX (around line 322) and update to pass `author`, `slug`, and correct `updatedAt`:

```tsx
<ArticleSchema
  post={{
    title,
    excerpt,
    content: content || markdownContent || '',
    coverImage: coverImage?.url ? { url: coverImage.url } : undefined,
    publishedAt,
    updatedAt,
    slug: postSlug,
    author: author ? { name: author.name } : undefined,
    categories,
  }}
/>
```

**Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 5: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: thread author and updatedAt into schema and client"
```

---

### Task 6: Display author name in BlogPostClient

**Files:**
- Modify: `app/blog/[slug]/BlogPostClient.tsx`

**Step 1: Add author to the props interface**

Find `BlogPostClientProps` (around line 38) and add `author`:

```typescript
interface BlogPostClientProps {
  post: {
    title: string;
    publishedAt: string;
    excerpt?: string;
    content: any;
    coverImage?: any;
    categories?: any[];
    slug: string;
    markdownContent?: string;
    author?: { name: string };
  };
}
```

**Step 2: Display author name in the meta row**

Find the meta information `<motion.div>` (around line 211). The current content is:

```tsx
<span className="mr-4 text-base md:text-lg">{formattedDate}</span>
<span className="mr-4">•</span>
<FaClock className="w-4 h-4 mr-2" />
<span className="text-base md:text-lg">{readingTime} min read</span>
```

Replace with:

```tsx
{post.author?.name && (
  <>
    <span className="mr-4 text-base md:text-lg">{post.author.name}</span>
    <span className="mr-4">•</span>
  </>
)}
<span className="mr-4 text-base md:text-lg">{formattedDate}</span>
<span className="mr-4">•</span>
<FaClock className="w-4 h-4 mr-2" />
<span className="text-base md:text-lg">{readingTime} min read</span>
```

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 4: Commit**

```bash
git add app/blog/[slug]/BlogPostClient.tsx
git commit -m "feat: display author name in blog post hero meta row"
```

---

### Task 7: Visual verification

**Step 1: Start the dev server**

```bash
npm run dev
```

**Step 2: Open a blog post that has an author assigned in Strapi**

Navigate to `http://localhost:3000/blog/<any-slug>`.

**Expected:**
- Author name appears before the date in the hero meta row: e.g. `Jane Smith • March 9, 2026 • 5 min read`
- If no author is assigned, the meta row shows just date + reading time (graceful fallback)

**Step 3: Check schema in browser DevTools**

Open DevTools → Elements → search for `application/ld+json`. Verify:
- `"author"` is `{"@type":"Person","name":"Jane Smith"}` (or Organization fallback)
- `"mainEntityOfPage"` `@id` is `https://kerstentalentcapital.com/blog/<slug>`
- `"dateModified"` differs from `"datePublished"` when the post has been updated

**Step 4: Final commit if any tweaks needed**

```bash
git add -p
git commit -m "fix: post-verification tweaks to blog author display"
```
