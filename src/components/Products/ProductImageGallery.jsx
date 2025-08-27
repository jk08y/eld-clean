import React from 'react';

const ProductImageGallery = ({ images }) => {
  // For now, we'll just show the first image.
  // We can add thumbnail functionality later.
  const mainImage = images && images.length > 0 ? images[0] : 'https://placehold.co/600x600/F1F5F9/374151?text=Eld+Clean';

  return (
    <div className="w-full lg:w-1/2">
      <div className="bg-white rounded-lg shadow-sm border border-base-300 p-4">
        <img 
          src={mainImage} 
          alt="Product"
          className="w-full h-auto object-cover rounded-lg"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/cccccc/ffffff?text=Image+Not+Found'; }}
        />
      </div>
      {/* Thumbnails can be added here */}
    </div>
  );
};

export default ProductImageGallery;
