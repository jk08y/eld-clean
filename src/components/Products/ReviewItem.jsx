import React from 'react';
import { Star } from 'lucide-react';

const ReviewItem = ({ review }) => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? 'text-accent fill-current' : 'text-gray-300'} 
      />
    ));
  };

  return (
    <div className="border-b border-base-300 py-4">
      <div className="flex items-center mb-2">
        <div className="flex">
          {renderStars(review.rating)}
        </div>
        <p className="ml-4 text-sm font-bold text-neutral">{review.author}</p>
      </div>
      <p className="text-neutral/80">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;
