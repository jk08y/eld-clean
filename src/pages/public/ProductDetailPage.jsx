import React from 'react';
import ProductImageGallery from '../../components/Products/ProductImageGallery';
import ProductInfo from '../../components/Products/ProductInfo';
import ProductReviews from '../../components/Products/ProductReviews';

// We'll use a mock product for now.
// Later, this data will come from Firebase based on the URL.
const mockProduct = { 
  id: '1', 
  name: 'All-Purpose Cleaner', 
  category: 'Household', 
  price: 500, 
  discountPrice: 450, 
  images: ['https://placehold.co/600x600/0D9488/FFFFFF?text=Main+Image'],
  description: 'A powerful and versatile all-purpose cleaner for every surface in your home. Cuts through grease and grime, leaving a fresh, clean scent. Safe for use on countertops, floors, and appliances.'
};

const ProductDetailPage = () => {
  return (
    <div className="py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductImageGallery images={mockProduct.images} />
        <ProductInfo product={mockProduct} />
      </div>
      <ProductReviews />
    </div>
  );
};

export default ProductDetailPage;
