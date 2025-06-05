'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/app/types/blog';
import { useState, useEffect } from 'react';

interface CategoryFilterProps {
  categories: Category[];
  activeCategorySlug?: string | null;
}

export default function CategoryFilter({ categories, activeCategorySlug }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(activeCategorySlug || null);
  
  // Get current sort parameter
  const currentSort = searchParams.get('sort') || 'newest';

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    
    if (categorySlug) {
      // Navigate to category page
      router.push(`/blog/category/${categorySlug}${currentSort !== 'newest' ? `?sort=${currentSort}` : ''}`);
    } else {
      // Navigate to main blog page
      router.push(`/blog${currentSort !== 'newest' ? `?sort=${currentSort}` : ''}`);
    }
  };

  return (
    <div className="mb-8 md:mb-0 bg-[#002C5F] rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-white font-montserrat">Categories</h3>
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === null 
              ? 'bg-white text-[#002C5F] shadow-lg font-montserrat' 
              : 'bg-white/20 text-white hover:bg-white/30 hover:text-white font-montserrat'
          }`}
        >
          All Posts
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.slug 
                ? 'bg-white text-[#002C5F] shadow-lg font-montserrat' 
                : 'bg-white/20 text-white hover:bg-white/30 hover:text-white font-montserrat'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
} 