import React from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products?category=${encodeURIComponent(category.name)}`} className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative pt-[100%]"> {/* 1:1 Aspect Ratio sq*/}
        {category.imageUrl ? (
          <img
            src={category.imageUrl}
            alt={category.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
            <ImageIcon size={48} className="text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white text-lg font-bold">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;


