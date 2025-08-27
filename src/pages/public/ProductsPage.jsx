import React from 'react';
import Sidebar from '../../components/Products/Sidebar';
import ProductGrid from '../../components/Products/ProductGrid';

const ProductsPage = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">Our Products</h1>
        <p className="text-lg text-neutral/70 mt-2">Everything you need for a pristine clean</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar />
        <ProductGrid />
      </div>
    </div>
  );
};

export default ProductsPage;
