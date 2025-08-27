import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ item }) => {
  return (
    <div className="py-5 border-b border-base-300 last:border-b-0">
      <div className="flex items-start justify-between">
        {/* Left side: Image and Info */}
        <div className="flex items-start">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/96x96/cccccc/ffffff?text=...'; }}
          />
          <div className="ml-4">
            <h3 className="font-semibold text-neutral text-base sm:text-lg">{item.name}</h3>
            <p className="text-sm text-neutral/70 mt-1">Unit Price: Ksh {item.price}</p>
          </div>
        </div>
        {/* Right side: Delete Button */}
        <button className="text-red-500 hover:text-red-700 ml-4 flex-shrink-0">
          <Trash2 size={20} />
        </button>
      </div>
      {/* Bottom section for controls */}
      <div className="flex items-center justify-between mt-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-base-300 rounded-full">
          <button className="p-2 text-neutral hover:text-primary transition-colors"><Minus size={16}/></button>
          <span className="px-4 font-bold text-sm">{item.quantity}</span>
          <button className="p-2 text-neutral hover:text-primary transition-colors"><Plus size={16}/></button>
        </div>
        {/* Total Price */}
        <p className="font-bold text-base sm:text-lg text-right">Ksh {item.price * item.quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;
