// src/components/Products/ProductCard.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const imageUrl = (product.imageUrls && product.imageUrls[0]) || 'https://placehold.co/400x400/F1F5F9/374151?text=Cleaning+Products';

  const handleAddToCart = () => {
    if (!currentUser) {
      // Redirect to login, but save the location they were trying to access
      navigate('/login', { state: { from: location } });
    } else {
      addItemToCart(product);
    }
  };

  return (
    <div className="bg-white border border-base-200 rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square">
          <img 
            src={imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found'; }}
          />
          {product.discountPrice && (
            <span className="absolute top-3 right-3 bg-accent text-neutral font-bold text-xs px-3 py-1 rounded-full shadow-md">
              SALE
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-neutral truncate mb-1">{product.name}</h3>
          <p className="text-sm text-neutral/60 mb-3">{product.category}</p>
          <div className="flex items-baseline space-x-2">
            <p className={`font-extrabold text-2xl ${product.discountPrice ? 'text-secondary' : 'text-primary'}`}>
              Ksh {(product.discountPrice || product.price).toLocaleString()}
            </p>
            {product.discountPrice && (
              <p className="text-base text-neutral/50 line-through">
                Ksh {product.price.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-accent text-neutral font-bold py-3 px-4 rounded-full flex items-center justify-center space-x-2 hover:bg-accent/90 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          <ShoppingCart size={20} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
