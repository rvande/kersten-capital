import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://perpetual-motivation-production.up.railway.app',
    S3_BUCKET_URL: process.env.S3_BUCKET_URL || 'https://kerstencapital.s3.us-east-1.amazonaws.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://kersten-capital.com',
  },
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
  },
};

export default nextConfig;
