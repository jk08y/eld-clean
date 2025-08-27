import React from 'react';
import CategoryCard from './CategoryCard';

const ShopByCategory = ({ categories, loading }) => {
  return (
    <div className="bg-base-100 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral">Shop by Category</h2>
        <p className="text-lg text-neutral/70 mt-2">Find the right products for every need</p>
      </div>
       {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopByCategory;
