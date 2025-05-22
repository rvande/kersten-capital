'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console
    console.error('Blog error:', error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-screen-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Something went wrong</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <p className="text-lg text-gray-800 mb-4">
            There was an error loading the blog content.
          </p>
          <div className="bg-white p-4 rounded text-left mb-4 overflow-auto max-h-48">
            <p className="font-mono text-sm text-red-600">{error.message}</p>
            {error.stack && (
              <pre className="font-mono text-xs text-gray-600 mt-2 whitespace-pre-wrap">
                {error.stack}
              </pre>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Try again
            </button>
            <Link 
              href="/blog"
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              Return to Blog Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 