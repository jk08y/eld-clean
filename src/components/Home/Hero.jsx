// src/components/Home/Hero.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Define the slides for the carousel (Using the user's latest structure)
const slides = [
  {
    heading: 'The Future of Clean is Here',
    subheading: 'Experience industrial strength performance for your home. Up to 30% Off this week!',
    imageUrl: '/hero1.jpg', 
    link: '/products?category=Industrial',
    linkText: 'Shop Industrial',
    // Used for slides where imageUrl fails or for color placeholder
    fallbackBg: 'bg-primary/90', 
  },
  {
    heading: 'New & Sustainable Cleaning',
    subheading: 'Safe for your family, gentle on the planet. Explore our new eco-friendly line.',
    imageUrl: '/hero2.jpg', 
    link: '/products?category=Eco',
    linkText: 'Explore Now',
    fallbackBg: 'bg-green-700', 
  },
  {
    heading: 'Get Free Delivery Today',
    subheading: 'Place any order over Ksh 5000 and get free, fast delivery to your doorstep.',
    imageUrl: '/hero3.jpg', 
    link: '/cart',
    linkText: 'View Cart',
    fallbackBg: 'bg-amber-700', 
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = slides.length; 

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000); // Auto-slide every 8 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="relative overflow-hidden rounded-xl shadow-2xl mx-auto container">
      {/* Container ensures proper height and aspect ratio */}
      <div className="relative w-full h-[45vh] md:h-[55vh] lg:h-[70vh]">
        
        {/* Carousel Content */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image/Color Layer */}
            <div className={`w-full h-full absolute inset-0 ${slide.fallbackBg}`}>
              <img
                src={slide.imageUrl}
                alt={slide.heading}
                className="w-full h-full object-cover absolute top-0 left-0"
                onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.style.display = 'none'; // Hide broken image
                }}
              />
               {/* Deep Dark Overlay for Maximum Text Contrast (Fixed to 70%) */}
              <div className="absolute inset-0 bg-neutral/70"></div>
            </div>
            
            {/* Text and CTA Content */}
            {/* Flex column centering for perfect alignment on all screens */}
            <div className="absolute inset-0 flex items-center justify-center text-center p-6 sm:p-10">
              <div className="max-w-4xl text-white z-20">
                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-4 leading-tight drop-shadow-lg">
                  {slide.heading}
                </h1>
                <p className="text-base sm:text-xl font-medium mb-10 drop-shadow-md max-w-2xl mx-auto">
                  {slide.subheading}
                </p>
                <Link to={slide.link}>
                  <button className="bg-accent text-neutral font-extrabold py-3.5 px-12 rounded-full hover:bg-accent/90 transition duration-300 text-lg sm:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105">
                    {slide.linkText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
                index === currentSlide ? 'bg-primary w-6' : 'bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
