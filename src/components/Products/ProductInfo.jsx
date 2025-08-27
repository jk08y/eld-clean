import React, { useState } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: location } });
      return;
    }
    // This logic can be improved to add a specific quantity at once
    for (let i = 0; i < quantity; i++) {
      addItemToCart(product);
    }
  };

  return (
    <div className="w-full lg:w-1/2 lg:pl-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral mb-2">{product.name}</h1>
      <p className="text-md text-neutral/60 mb-4">{product.category}</p>
      
      <div className="flex items-baseline space-x-2 mb-4">
        <p className={`font-bold text-3xl ${product.discountPrice ? 'text-red-500' : 'text-primary'}`}>
          Ksh {product.discountPrice || product.price}
        </p>
        {product.discountPrice && (
          <p className="text-lg text-neutral/50 line-through">
            Ksh {product.price}
          </p>
        )}
      </div>

      <p className="text-neutral/80 mb-6">{product.description}</p>

      <div className="flex items-center space-x-4 mb-6">
        <p className="font-semibold text-neutral">Quantity:</p>
        <div className="flex items-center border border-base-300 rounded-full">
          <button onClick={() => handleQuantityChange(-1)} className="p-2 text-neutral hover:text-primary"><Minus size={18}/></button>
          <span className="px-4 font-bold">{quantity}</span>
          <button onClick={() => handleQuantityChange(1)} className="p-2 text-neutral hover:text-primary"><Plus size={18}/></button>
        </div>
      </div>
      
      <button 
        onClick={handleAddToCart}
        className="w-full sm:w-auto bg-primary text-white font-bold py-3 px-8 rounded-full flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors duration-300 transform hover:scale-105 shadow-lg"
      >
        <ShoppingCart size={20} />
        <span>Add to Cart</span>
      </button>

      <div className="mt-6">
        <span className="text-green-600 font-semibold">In Stock</span>
      </div>
    </div>
  );
};

export default ProductInfo;
