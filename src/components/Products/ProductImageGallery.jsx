import React, { useState } from 'react';

const ProductImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState((images && images.length > 0) ? images[0] : 'https://placehold.co/600x600/F1F5F9/374151?text=Eld+Clean');

  return (
    <div className="w-full lg:w-1/2">
      <div className="bg-white rounded-lg shadow-sm border border-base-300 p-4 mb-4">
        <img 
          src={mainImage} 
          alt="Product"
          className="w-full h-auto object-cover rounded-lg aspect-square"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/cccccc/ffffff?text=Image+Not+Found'; }}
        />
      </div>
      {images && images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, index) => (
            <button key={index} onClick={() => setMainImage(img)} className={`rounded-lg overflow-hidden border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'}`}>
              <img 
                src={img} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover aspect-square"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
