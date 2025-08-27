import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-base-200 rounded-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-20 md:py-28">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral mb-4 leading-tight">
              Spotless Homes, Brighter Lives
            </h1>
            <p className="text-lg text-neutral/80 mb-8">
              Discover our wide range of premium cleaning products. Effective, eco-friendly, and delivered right to your doorstep.
            </p>
            <Link
              to="/products"
              className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://placehold.co/500x500/0D9488/FFFFFF?text=Eld+Clean" 
              alt="Eld Clean Products" 
              className="rounded-full shadow-2xl w-3/4 md:w-full max-w-md"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/500x500/cccccc/ffffff?text=Image+Not+Found'; }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
