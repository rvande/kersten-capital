'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SortSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentSort = searchParams.get('sort') || 'newest';
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className="flex items-center mt-6 md:mt-0">
      <label htmlFor="sort-select" className="text-sm font-semibold text-white mr-3 font-montserrat">
        Sort by:
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={currentSort}
          onChange={handleSortChange}
          className="appearance-none bg-[#002C5F] border border-[#002C5F] rounded-full px-6 py-4 pr-12 md:pr-10 focus:ring-2 focus:ring-[#0C6BAF] focus:border-[#0C6BAF] outline-none font-montserrat font-semibold text-white cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="a-z">Title A-Z</option>
          <option value="z-a">Title Z-A</option>
        </select>
        <svg className="absolute right-3 md:right-3 top-1/2 transform -translate-y-1/2 text-white h-6 w-6 md:h-5 md:w-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
} 