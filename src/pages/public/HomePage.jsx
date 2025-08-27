import React from 'react';
import Hero from '../../components/Home/Hero';
import FeaturedProducts from '../../components/Home/FeaturedProducts';
import ShopByCategory from '../../components/Home/ShopByCategory';
import WhyChooseUs from '../../components/Home/WhyChooseUs';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <ShopByCategory />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
