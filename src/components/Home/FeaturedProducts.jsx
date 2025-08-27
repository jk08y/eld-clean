import React from 'react';
import ProductCard from '../Products/ProductCard';

const mockProducts = [
  { id: '1', name: 'All-Purpose Cleaner', category: 'Household', price: 500, discountPrice: 450, imageUrl: 'https://placehold.co/400x400/0D9488/FFFFFF?text=Product+1' },
  { id: '2', name: 'Glass & Window Cleaner', category: 'Household', price: 350, imageUrl: 'https://placehold.co/400x400/3B82F6/FFFFFF?text=Product+2' },
  { id: '3', name: 'Heavy Duty Degreaser', category: 'Industrial', price: 800, imageUrl: 'https://placehold.co/400x400/FACC15/374151?text=Product+3' },
  { id: '4', name: 'Organic Laundry Detergent', category: 'Laundry', price: 1200, discountPrice: 1050, imageUrl: 'https://placehold.co/400x400/6D28D9/FFFFFF?text=Product+4' },
];

const FeaturedProducts = () => {
  return (
    <div className="py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral">Featured Products</h2>
        <p className="text-lg text-neutral/70 mt-2">Top picks for a sparkling clean home</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
