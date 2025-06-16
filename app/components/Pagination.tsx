'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const navigateToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    
    const queryString = params.toString();
    router.push(`${pathname}?${queryString}`);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, page: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigateToPage(page);
    }
  };
  
  // Create array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      // If 5 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push(null); // null indicates ellipsis
      }
      
      // Add current page and adjacent pages
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push(null); // null indicates ellipsis
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <nav 
      className="flex justify-center font-montserrat" 
      aria-label="Pagination Navigation"
      role="navigation"
    >
      <div 
        className="flex items-center space-x-2"
        role="list"
        aria-label={`Page ${currentPage} of ${totalPages}`}
      >
        <div role="listitem">
          <button
            onClick={() => navigateToPage(currentPage - 1)}
            onKeyDown={(e) => handleKeyDown(e, currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:ring-offset-2 ${
              currentPage === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 hover:text-[#0C6BAF]'
            }`}
            aria-label={`Go to previous page, page ${currentPage - 1}`}
            aria-disabled={currentPage === 1}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">Previous page</span>
          </button>
        </div>
        
        {getPageNumbers().map((page, index) => (
          <div key={index} role="listitem">
            {page === null ? (
              <span 
                className="flex items-center justify-center w-10 h-10 text-gray-500"
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <button
                onClick={() => navigateToPage(page as number)}
                onKeyDown={(e) => handleKeyDown(e, page as number)}
                className={`flex items-center justify-center w-10 h-10 rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:ring-offset-2 ${
                  currentPage === page
                    ? 'bg-[#0C6BAF] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#0C6BAF]'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={
                  currentPage === page 
                    ? `Current page, page ${page}` 
                    : `Go to page ${page}`
                }
              >
                {page}
              </button>
            )}
          </div>
        ))}
        
        <div role="listitem">
          <button
            onClick={() => navigateToPage(currentPage + 1)}
            onKeyDown={(e) => handleKeyDown(e, currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0C6BAF] focus:ring-offset-2 ${
              currentPage === totalPages
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 hover:text-[#0C6BAF]'
            }`}
            aria-label={`Go to next page, page ${currentPage + 1}`}
            aria-disabled={currentPage === totalPages}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="sr-only">Next page</span>
          </button>
        </div>
      </div>
    </nav>
  );
} 