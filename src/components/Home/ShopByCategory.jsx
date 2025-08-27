import React from 'react';
import CategoryCard from './CategoryCard';

const mockCategories = [
  { name: 'Household Cleaners', slug: 'household', imageUrl: 'https://placehold.co/400x550/0D9488/FFFFFF?text=Household' },
  { name: 'Laundry Care', slug: 'laundry', imageUrl: 'https://placehold.co/400x550/3B82F6/FFFFFF?text=Laundry' },
  { name: 'Industrial Solutions', slug: 'industrial', imageUrl: 'https://placehold.co/400x550/FACC15/374151?text=Industrial' },
];

const ShopByCategory = () => {
  return (
    <div className="bg-base-100 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral">Shop by Category</h2>
        <p className="text-lg text-neutral/70 mt-2">Find the right products for every need</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockCategories.map(category => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
