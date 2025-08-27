import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-base-300">
        <p className="text-neutral/80 mb-4 sm:mb-0">Showing {products.length} products</p>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-neutral">Sort by:</label>
          <select id="sort" className="border border-base-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Name: A-Z</option>
          </select>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center py-10 text-neutral/70">No products found.</p>
      )}
    </div>
  );
};

export default ProductGrid;
