import React from 'react';
import ProductCard from './ProductCard';

// Using the same mock products from the homepage for now
const mockProducts = [
  { id: '1', name: 'All-Purpose Cleaner', category: 'Household', price: 500, discountPrice: 450, imageUrl: 'https://placehold.co/400x400/0D9488/FFFFFF?text=Product+1' },
  { id: '2', name: 'Glass & Window Cleaner', category: 'Household', price: 350, imageUrl: 'https://placehold.co/400x400/3B82F6/FFFFFF?text=Product+2' },
  { id: '3', name: 'Heavy Duty Degreaser', category: 'Industrial', price: 800, imageUrl: 'https://placehold.co/400x400/FACC15/374151?text=Product+3' },
  { id: '4', name: 'Organic Laundry Detergent', category: 'Laundry', price: 1200, discountPrice: 1050, imageUrl: 'https://placehold.co/400x400/6D28D9/FFFFFF?text=Product+4' },
  { id: '5', name: 'Antibacterial Hand Soap', category: 'Personal Care', price: 250, imageUrl: 'https://placehold.co/400x400/EC4899/FFFFFF?text=Product+5' },
  { id: '6', name: 'Floor Cleaner & Polish', category: 'Household', price: 700, imageUrl: 'https://placehold.co/400x400/10B981/FFFFFF?text=Product+6' },
  { id: '7', name: 'Fabric Softener', category: 'Laundry', price: 600, discountPrice: 550, imageUrl: 'https://placehold.co/400x400/8B5CF6/FFFFFF?text=Product+7' },
  { id: '8', name: 'Industrial Solvent', category: 'Industrial', price: 2500, imageUrl: 'https://placehold.co/400x400/F59E0B/374151?text=Product+8' },
];

const ProductGrid = () => {
  return (
    <div className="w-full">
      {/* Sorting and Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-base-300">
        <p className="text-neutral/80 mb-4 sm:mb-0">Showing {mockProducts.length} products</p>
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

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
