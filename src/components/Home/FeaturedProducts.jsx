import React from 'react';
import ProductCard from '../Products/ProductCard';
import ProductCardSkeleton from '../Products/ProductCardSkeleton';

const FeaturedProducts = ({ products, loading }) => {
  return (
    <div className="py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral">Featured Products</h2>
        <p className="text-lg text-neutral/70 mt-2">Top picks for a sparkling clean home</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
        ) : (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
