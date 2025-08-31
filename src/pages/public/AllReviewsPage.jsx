import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../firebase/productService';
import { getReviewsByProductId } from '../../firebase/reviewService';
import ReviewItem from '../../components/Products/ReviewItem';
import { ArrowLeft } from 'lucide-react';

const AllReviewsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        const reviewsData = await getReviewsByProductId(id);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Failed to fetch product and reviews:", error);
      }
      setLoading(false);
    };
    fetchAllData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-10"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-8"></div>
          <div className="space-y-6">
            <div className="h-24 bg-gray-200 rounded-lg"></div>
            <div className="h-24 bg-gray-200 rounded-lg"></div>
            <div className="h-24 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <Link to={`/products/${id}`} className="inline-flex items-center text-primary hover:underline mb-6 font-semibold">
        <ArrowLeft size={20} className="mr-2" />
        Back to Product
      </Link>
      <h1 className="text-2xl md:text-3xl font-bold text-neutral mb-2">All Reviews for</h1>
      <h2 className="text-xl md:text-2xl font-semibold text-neutral/80 mb-8">{product?.name}</h2>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-base-100 rounded-lg">
          <p className="text-neutral/70">There are no reviews for this product yet.</p>
        </div>
      )}
    </div>
  );
};

export default AllReviewsPage;

