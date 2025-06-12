import LoadingSpinner from './components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-6" />
        <h2 className="text-2xl font-black text-[#002C5F] mb-2 font-montserrat">
          Loading...
        </h2>
        <p className="text-[#002C5F]/70 font-open-sans">
          Preparing your experience
        </p>
      </div>
    </div>
  );
} 