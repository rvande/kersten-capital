import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure site URL for production and development
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app',
    S3_BUCKET_URL: process.env.S3_BUCKET_URL || 'https://kerstencapital.s3.us-east-1.amazonaws.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com',
  },
  
  // Configure headers for better caching and performance
  async headers() {
    return [
      {
        // Next.js static chunks (JS/CSS with hashes) - Cache for 1 year
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Font files - Cache for 1 year
        source: '/_next/static/media/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Image files - Cache for 1 month
        source: '/:path*.(jpg|jpeg|png|gif|webp|avif|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Video files - Cache for 1 week
        source: '/:path*.(mp4|webm|avi|mov)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Static assets in public folder - Cache for 1 month
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable',
          },
        ],
      },
      {
        // API routes - Cache for 1 minute
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=300',
          },
        ],
      },
      {
        // HTML pages - Cache for 5 minutes with stale-while-revalidate
        source: '/((?!api|_next|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  
  // Configure redirects for old URLs
  async redirects() {
    return [
      {
        source: '/hear-from-others',
        destination: '/',
        permanent: true,
      },
      {
        source: '/our-capabilities',
        destination: '/',
        permanent: true,
      },
      {
      source: '/guides',
      destination: '/blog',
      permanent: true,
      },
    ];
  },
  
  // Configure image domains and optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'perpetual-motivation-production.up.railway.app',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'kerstencapital.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        // Allow any Railway subdomain
        protocol: 'https',
        hostname: '**.up.railway.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Enhanced image optimization for better LCP
    formats: ['image/avif', 'image/webp'], // Prioritize AVIF for best compression
    minimumCacheTTL: 31536000, // 1 year cache for better performance
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
    loader: 'default',
    path: '/_next/image',
    unoptimized: false,
  },
  
  // Ensure sitemap and robots.txt are generated during build
  poweredByHeader: false,
  
  // Optimize for SEO and performance
  reactStrictMode: true,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
