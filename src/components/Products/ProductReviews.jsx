import React, { useState } from 'react';
import ReviewItem from './ReviewItem';
import { Star } from 'lucide-react';

const mockReviews = [
  { author: 'Jane D.', rating: 5, comment: 'This is the best all-purpose cleaner I have ever used! Smells great and works wonders.' },
  { author: 'John K.', rating: 4, comment: 'Very effective product. I wish it came in a larger bottle, but otherwise, it\'s fantastic.' },
];

const ProductReviews = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="mt-12 pt-8 border-t border-base-300">
      <h2 className="text-2xl font-bold text-neutral mb-6">Customer Reviews</h2>
      
      <div className="mb-8">
        {mockReviews.length > 0 ? (
          mockReviews.map((review, index) => <ReviewItem key={index} review={review} />)
        ) : (
          <p className="text-neutral/70">No reviews yet. Be the first to share your thoughts!</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-neutral mb-4">Write a Review</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral mb-2">Your Rating</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  className={`cursor-pointer transition-colors ${
                    (hoverRating || rating) >= star
                      ? 'text-accent'
                      : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-neutral mb-1">Comment</label>
            <textarea id="comment" rows="4" className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Share your experience..."></textarea>
          </div>
          <button type="submit" className="bg-secondary text-white font-bold py-2 px-6 rounded-full hover:bg-secondary/90 transition-colors duration-300 transform hover:scale-105">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductReviews;
