import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white border border-base-200 rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="w-full h-56 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded mt-2"></div>
        <div className="h-6 w-1/3 bg-gray-200 rounded mt-3"></div>
      </div>
      <div className="px-4 pb-4">
        <div className="h-10 w-full bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
