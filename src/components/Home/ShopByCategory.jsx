import React from 'react';
import CategoryCard from './CategoryCard';

const ShopByCategory = ({ categories }) => {
  return (
    <div className="py-12 md:py-20 bg-base-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral sm:text-4xl">Shop by Category</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-neutral/70">
            Find the right products for every need.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
