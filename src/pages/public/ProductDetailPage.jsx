import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductImageGallery from '../../components/Products/ProductImageGallery';
import ProductInfo from '../../components/Products/ProductInfo';
import ProductReviews from '../../components/Products/ProductReviews';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productDocRef = doc(db, 'products', id);
        const productDoc = await getDoc(productDocRef);
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() });
        } else {
          toast.error("Product not found.");
        }
      } catch (error) {
        toast.error("Failed to fetch product details.");
        console.error(error);
      }
      setLoading(false);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <div className="py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductImageGallery images={product.imageUrls} />
        <ProductInfo product={product} />
      </div>
      <ProductReviews />
    </div>
  );
};

export default ProductDetailPage;
