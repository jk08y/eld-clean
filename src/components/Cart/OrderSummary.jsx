import React from 'react';
import { Link } from 'react-router-dom';

const OrderSummary = ({ subtotal }) => {
  const shipping = subtotal > 0 ? 300 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-base-300 lg:sticky lg:top-28">
      <h2 className="text-2xl font-bold text-neutral mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-neutral/80">Subtotal</p>
          <p className="font-semibold">Ksh {subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-neutral/80">Shipping</p>
          <p className="font-semibold">Ksh {shipping}</p>
        </div>
        <hr className="my-2 border-base-300" />
        <div className="flex justify-between text-lg font-bold">
          <p>Total</p>
          <p>Ksh {total}</p>
        </div>
      </div>
      <Link to="/checkout">
        <button 
          disabled={subtotal === 0}
          className="w-full mt-6 bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary/90 transition-colors duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default OrderSummary;
