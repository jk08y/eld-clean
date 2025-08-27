import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products?category=${category.slug}`} className="block group">
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={category.imageUrl} 
          alt={category.name}
          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x550/cccccc/ffffff?text=Image+Not+Found'; }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h3 className="text-white text-2xl font-bold text-center">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
