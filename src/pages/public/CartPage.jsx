import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../components/Cart/CartItem';
import OrderSummary from '../../components/Cart/OrderSummary';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cartItems, cartSubtotal, loading } = useCart();

  if (loading) {
    return <div className="text-center py-20">Loading your cart...</div>;
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">Shopping Cart</h1>
      </div>
      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-sm border border-base-300">
            {cartItems.map(item => <CartItem key={item.id} item={item} />)}
          </div>
          <div className="lg:w-1/3">
            <OrderSummary subtotal={cartSubtotal} />
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-neutral/80 mb-4">Your cart is empty.</p>
          <Link to="/products" className="bg-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary/90 transition-colors duration-300 transform hover:scale-105">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
