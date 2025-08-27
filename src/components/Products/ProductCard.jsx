import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-base-300 rounded-lg shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative">
          <img 
            src={product.imageUrl || 'https://placehold.co/400x400/F1F5F9/374151?text=Eld+Clean'} 
            alt={product.name}
            className="w-full h-56 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found'; }}
          />
          {product.discountPrice && (
            <span className="absolute top-3 left-3 bg-accent text-neutral font-bold text-xs px-2 py-1 rounded-full">
              SALE
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-neutral truncate">{product.name}</h3>
          <p className="text-sm text-neutral/60 mb-2">{product.category}</p>
          <div className="flex items-baseline space-x-2">
            <p className={`font-bold text-xl ${product.discountPrice ? 'text-red-500' : 'text-primary'}`}>
              Ksh {product.discountPrice || product.price}
            </p>
            {product.discountPrice && (
              <p className="text-sm text-neutral/50 line-through">
                Ksh {product.price}
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-secondary/90 transition-colors duration-300 transform hover:scale-105">
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
