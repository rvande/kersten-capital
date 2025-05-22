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
      <label htmlFor="sort-select" className="text-sm font-medium text-[#3D3939] mr-3">
        Sort by:
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={currentSort}
          onChange={handleSortChange}
          className="block w-44 py-2.5 px-4 text-gray-700 border border-gray-200 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CA3B2A]/20 focus:border-[#CA3B2A] text-sm transition-all appearance-none cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="a-z">Title A-Z</option>
          <option value="z-a">Title Z-A</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
} 