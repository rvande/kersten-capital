import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure site URL for production and development
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app',
    S3_BUCKET_URL: process.env.S3_BUCKET_URL || 'https://kerstencapital.s3.us-east-1.amazonaws.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://kerstentalentcapital.com',
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
    // Optimize images for better LCP - more aggressive for mobile
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // More aggressive optimization for mobile
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
