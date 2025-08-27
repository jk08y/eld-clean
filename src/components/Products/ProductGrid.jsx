import React from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

const ProductGrid = ({ products, loading, sort, setSort }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-base-300">
        <p className="text-neutral/80 mb-4 sm:mb-0">
          {loading ? 'Loading...' : `Showing ${products.length} products`}
        </p>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-neutral">Sort by:</label>
          <select 
            id="sort" 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-base-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-neutral/80 mb-4">No products match your filters.</p>
          <p className="text-neutral/60">Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
