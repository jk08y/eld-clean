// src/components/Products/ProductImageGallery.jsx
import React, { useState } from 'react';
import ImageModal from './ImageModal'; // Import the new modal component

const ProductImageGallery = ({ images }) => {
  // Use a default image if no images are provided
  const defaultImage = 'https://placehold.co/600x600/06B6D4/FFFFFF?text=Cleaning+Products';
  const validImages = images && images.length > 0 ? images : [defaultImage];

  const [mainImage, setMainImage] = useState(validImages[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);

  const openModal = (index) => {
    setCurrentModalIndex(index);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleNavigate = (direction) => {
    const newIndex = currentModalIndex + direction;
    if (newIndex >= 0 && newIndex < validImages.length) {
      setCurrentModalIndex(newIndex);
    }
  };

  return (
    <div className="w-full lg:w-1/2">
      {/* Main Image Container - Enforces 1:1 Aspect Ratio (aspect-square) */}
      <div 
        className="bg-white rounded-xl shadow-lg border border-base-300 p-4 mb-4 cursor-pointer overflow-hidden aspect-square"
        onClick={() => openModal(validImages.indexOf(mainImage) > -1 ? validImages.indexOf(mainImage) : 0)}
      >
        <img 
          src={mainImage} 
          alt="Product Main View"
          className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-[1.01]"
          onError={(e) => { e.target.onerror = null; e.target.src=defaultImage; }}
        />
      </div>
      
      {/* Thumbnails Grid - Enforces 1:1 Aspect Ratio (aspect-square) */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {validImages.map((img, index) => (
            <button 
              key={index} 
              onClick={() => setMainImage(img)} 
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${mainImage === img ? 'border-primary shadow-md' : 'border-base-300 hover:border-primary/50'}`}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover aspect-square"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/E5E7EB/1F2937?text=T'; }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <ImageModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        images={validImages}
        currentImageIndex={currentModalIndex}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default ProductImageGallery;
