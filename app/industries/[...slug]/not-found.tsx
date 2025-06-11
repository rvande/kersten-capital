import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <div className="flex items-center justify-center flex-1 px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <FaExclamationTriangle className="w-24 h-24 text-[#0C6BAF] mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-black text-[#002C5F] mb-4 font-montserrat">
              Industry Not Found
            </h1>
            <p className="text-xl text-black/70 font-open-sans leading-relaxed mb-8">
              The industry page you're looking for doesn't exist or may have been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/industries"
              className="inline-block px-8 py-4 bg-[#0C6BAF] text-white rounded-full hover:bg-[#187CC1] transition-all duration-300 font-montserrat font-semibold shadow-lg hover:shadow-xl"
            >
              View All Industries
            </Link>
            <Link 
              href="/"
              className="inline-block px-8 py-4 bg-transparent border-2 border-[#0C6BAF] text-[#0C6BAF] rounded-full hover:bg-[#0C6BAF] hover:text-white transition-all duration-300 font-montserrat font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 