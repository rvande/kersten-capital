import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-screen-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Content Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The blog post or category you're looking for couldn't be found. It may have been removed or the URL might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/blog"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse All Posts
          </Link>
          <Link 
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
} 