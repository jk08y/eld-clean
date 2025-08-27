import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Products/Sidebar';
import ProductGrid from '../../components/Products/ProductGrid';
import { getProducts } from '../../firebase/productService';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        toast.error("Could not fetch products.");
        console.error("Firebase fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">Our Products</h1>
        <p className="text-lg text-neutral/70 mt-2">Everything you need for a pristine clean</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar />
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductsPage;
