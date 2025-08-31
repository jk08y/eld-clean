import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import { Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getReviewsByProductId, addReview } from '../../firebase/reviewService';
import { checkIfUserPurchasedProduct } from '../../firebase/orderService';
import toast from 'react-hot-toast';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canReview, setCanReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { currentUser } = useAuth();
  const reviewLimit = 4;

  const fetchReviewsAndCheckPurchase = useCallback(async () => {
    setLoading(true);
    try {
      const reviewsData = await getReviewsByProductId(productId, reviewLimit);
      setReviews(reviewsData);

      if (currentUser) {
        const hasPurchased = await checkIfUserPurchasedProduct(currentUser.uid, productId);
        setCanReview(hasPurchased);
      }
    } catch (error) {
      console.error("Failed to fetch reviews or check purchase status:", error);
      toast.error("Could not load review data.");
    }
    setLoading(false);
  }, [productId, currentUser]);

  useEffect(() => {
    fetchReviewsAndCheckPurchase();
  }, [fetchReviewsAndCheckPurchase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a star rating.");
    if (!comment.trim()) return toast.error("Please write a comment.");

    setIsSubmitting(true);
    try {
      const reviewData = {
        author: currentUser.fullName,
        userId: currentUser.uid,
        rating,
        comment,
      };
      await addReview(productId, reviewData);
      toast.success("Thank you for your review!");
      setRating(0);
      setComment('');
      fetchReviewsAndCheckPurchase();
    } catch (error) {
      toast.error("Failed to submit review.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mt-12 pt-8 border-t border-base-300">
      <h2 className="text-2xl font-bold text-neutral mb-6">Customer Reviews</h2>
      
      <div className="mb-8">
        {loading && <p>Loading reviews...</p>}
        {!loading && reviews.length > 0 && (
          reviews.map((review) => <ReviewItem key={review.id} review={review} />)
        )}
        {!loading && reviews.length === 0 && (
          <p className="text-neutral/70">No reviews yet. Be the first to share your thoughts!</p>
        )}
      </div>

      {reviews.length >= reviewLimit && (
        <div className="text-center mb-8">
            <Link to={`/products/${productId}/reviews`} className="font-semibold text-primary hover:underline">
                View All Reviews
            </Link>
        </div>
      )}

      {currentUser && canReview && (
        <div>
          <h3 className="text-xl font-bold text-neutral mb-4">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4 bg-base-100/50 p-6 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-neutral mb-2">Your Rating</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer transition-colors ${(hoverRating || rating) >= star ? 'text-accent' : 'text-gray-300'}`}
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
              <textarea id="comment" rows="4" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Share your experience..."></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="bg-secondary text-white font-bold py-2 px-6 rounded-full hover:bg-secondary/90 transition-colors duration-300 transform hover:scale-105 disabled:bg-secondary/50">
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}
      
      {currentUser && !canReview && (
         <div className="text-center bg-base-200 p-6 rounded-lg">
          <p className="font-semibold text-neutral">You can only review products you've purchased.</p>
        </div>
      )}

      {!currentUser && (
        <div className="text-center bg-base-200 p-6 rounded-lg">
          <p className="font-semibold text-neutral">Want to share your thoughts?</p>
          <p className="text-neutral/80 mt-1">Please <Link to="/login" className="text-primary font-bold hover:underline">sign in</Link> to write a review.</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
