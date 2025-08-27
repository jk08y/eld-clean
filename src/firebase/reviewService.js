import { db } from './config';
import { collection, addDoc, query, getDocs, serverTimestamp, orderBy, limit } from 'firebase/firestore';

const getReviewsCollectionRef = (productId) => {
  return collection(db, 'products', productId, 'reviews');
};

export const getReviewsByProductId = async (productId, reviewLimit) => {
  const reviewsCollectionRef = getReviewsCollectionRef(productId);
  const constraints = [orderBy('createdAt', 'desc')];
  if (reviewLimit) {
    constraints.push(limit(reviewLimit));
  }
  const q = query(reviewsCollectionRef, ...constraints);
  const data = await getDocs(q);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const addReview = async (productId, reviewData) => {
  const reviewsCollectionRef = getReviewsCollectionRef(productId);
  return await addDoc(reviewsCollectionRef, {
    ...reviewData,
    createdAt: serverTimestamp(),
  });
};
