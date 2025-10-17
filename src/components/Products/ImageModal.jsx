// src/components/Products/ImageModal.jsx
import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageModal = ({ isOpen, onClose, images, currentImageIndex, onNavigate }) => {
  if (!isOpen) return null;

  const currentImage = images[currentImageIndex];
  const isMultipleImages = images.length > 1;

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Close Button */}
      <button 
        className="absolute top-4 right-4 text-white hover:text-primary transition-colors p-2 rounded-full bg-black/50"
        onClick={onClose}
      >
        <X size={32} />
      </button>

      {/* Main Content Area - Stop click propagation */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Left */}
        {isMultipleImages && (
          <button 
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-3 text-white transition-colors z-10 ${currentImageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-primary'}`}
            onClick={() => onNavigate(-1)}
            disabled={currentImageIndex === 0}
          >
            <ChevronLeft size={48} />
          </button>
        )}

        {/* Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
          <img 
            src={currentImage} 
            alt={`Product view ${currentImageIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain block" 
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x800/E5E7EB/1F2937?text=Image+Error'; }}
          />
        </div>
        
        {/* Navigation Right */}
        {isMultipleImages && (
          <button 
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-3 text-white transition-colors z-10 ${currentImageIndex === images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-primary'}`}
            onClick={() => onNavigate(1)}
            disabled={currentImageIndex === images.length - 1}
          >
            <ChevronRight size={48} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
