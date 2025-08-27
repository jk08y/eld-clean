import React, { useState, useEffect } from 'react';
import Hero from '../../components/Home/Hero';
import FeaturedProducts from '../../components/Home/FeaturedProducts';
import ShopByCategory from '../../components/Home/ShopByCategory';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import { getProducts } from '../../firebase/productService';
import { getCategories } from '../../firebase/categoryService';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        // For now, feature the first 4 products
        setFeaturedProducts(productsData.slice(0, 4));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedProducts products={featuredProducts} loading={loading} />
      <ShopByCategory categories={categories} loading={loading} />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
