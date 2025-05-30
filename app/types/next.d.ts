// Type definitions for Next.js App Router

declare namespace NextApp {
  // Define common types used across Next.js pages

  type PageParams = {
    params: Record<string, string>;
    searchParams?: { [key: string]: string | string[] | undefined };
  };

  type SlugPageParams = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  };
} 