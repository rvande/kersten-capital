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
    <nav className="flex justify-center font-montserrat" aria-label="Pagination">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300 ${
              currentPage === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 hover:text-[#0C6BAF]'
            }`}
            aria-label="Previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </li>
        
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === null ? (
              <span className="flex items-center justify-center w-10 h-10 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => navigateToPage(page as number)}
                className={`flex items-center justify-center w-10 h-10 rounded-md font-medium transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-[#0C6BAF] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#0C6BAF]'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        
        <li>
          <button
            onClick={() => navigateToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300 ${
              currentPage === totalPages
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 hover:text-[#0C6BAF]'
            }`}
            aria-label="Next page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
} 