// src/components/Cart/OrderSummary.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OrderSummary = ({ subtotal, shipping = 300, hideCheckoutButton = false }) => {
  // Use a shipping fee of 0 if subtotal is 0 to be logically consistent
  const finalShipping = subtotal > 0 ? shipping : 0; 
  const total = subtotal + finalShipping;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-base-300">
      <h2 className="text-2xl font-bold text-neutral mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-neutral/80">Subtotal</p>
          <p className="font-semibold">Ksh {subtotal.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-neutral/80">Shipping</p>
          <p className="font-semibold">Ksh {finalShipping.toLocaleString()}</p>
        </div>
        <hr className="my-2 border-base-300" />
        <div className="flex justify-between text-lg font-bold">
          <p>Total</p>
          <p className="text-primary">Ksh {total.toLocaleString()}</p>
        </div>
      </div>
      {!hideCheckoutButton && (
        <Link to="/checkout">
          <button 
            disabled={subtotal === 0}
            className="w-full mt-6 bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary/90 transition-colors duration-300 transform hover:scale-[1.01] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            Proceed to Checkout
          </button>
        </Link>
      )}
    </div>
  );
};

export default OrderSummary;
