import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 
            className="text-[8rem] md:text-[12rem] font-black bg-gradient-to-b from-[#0C6BAF] to-[#71C8F3] bg-clip-text text-transparent leading-none"
            style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}
          >
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 
            className="text-3xl md:text-4xl font-black text-[#002C5F] mb-4"
            style={{ fontFamily: 'var(--font-montserrat), system-ui, sans-serif' }}
          >
            Page Not Found
          </h2>
          <p 
            className="text-lg md:text-xl text-[#002C5F]/70 mb-6"
            style={{ fontFamily: 'var(--font-open-sans), system-ui, sans-serif', fontWeight: '600' }}
          >
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-[#0C6BAF] to-[#71C8F3] hover:from-[#187CC1] hover:to-[#71C8F3] text-white font-semibold px-8 py-4 rounded-md text-lg transition-all duration-300"
            style={{
              fontFamily: 'var(--font-open-sans), system-ui, sans-serif',
              boxShadow: '0 4px 24px 0 rgba(12,107,175,0.20)',
              fontWeight: '600',
            }}
          >
            Go Home
          </Link>
          
          <Link 
            href="/contact-us"
            className="inline-block border-2 border-[#0C6BAF] text-[#0C6BAF] hover:bg-[#0C6BAF] hover:text-white font-semibold px-8 py-4 rounded-md text-lg transition-all duration-300"
            style={{
              fontFamily: 'var(--font-open-sans), system-ui, sans-serif',
              fontWeight: '600',
            }}
          >
            Contact Us
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <p 
            className="text-[#002C5F]/60 mb-4"
            style={{ fontFamily: 'var(--font-open-sans), system-ui, sans-serif' }}
          >
            Or explore these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              href="/about-us" 
              className="text-[#0C6BAF] hover:text-[#187CC1] underline transition-colors duration-200"
              style={{ fontFamily: 'var(--font-open-sans), system-ui, sans-serif', fontWeight: '600' }}
            >
              About Us
            </Link>
            <Link 
              href="/services/executive-search" 
              className="text-[#0C6BAF] hover:text-[#187CC1] underline transition-colors duration-200"
              style={{ fontFamily: 'var(--font-open-sans), system-ui, sans-serif', fontWeight: '600' }}
            >
              Executive Search
            </Link>
            <Link 
              href="/blog" 
              className="text-[#0C6BAF] hover:text-[#187CC1] underline transition-colors duration-200"
              style={{ fontFamily: 'var(--font-open-sans), system-ui, sans-serif', fontWeight: '600' }}
            >
              Blog
            </Link>
            <Link 
              href="/careers" 
              className="text-[#0C6BAF] hover:text-[#187CC1] underline transition-colors duration-200"
              style={{ fontFamily: 'var(--font-open-sans), system-ui, sans-serif', fontWeight: '600' }}
            >
              Careers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 