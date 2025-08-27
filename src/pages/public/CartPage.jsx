import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../components/Cart/CartItem';
import OrderSummary from '../../components/Cart/OrderSummary';

const mockCartItems = [
  { id: '1', name: 'All-Purpose Cleaner', price: 450, quantity: 2, imageUrl: 'https://placehold.co/80x80/0D9488/FFFFFF?text=Item' },
  { id: '4', name: 'Organic Laundry Detergent', price: 1050, quantity: 1, imageUrl: 'https://placehold.co/80x80/6D28D9/FFFFFF?text=Item' },
];

const CartPage = () => {
  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">Shopping Cart</h1>
      </div>
      {mockCartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-sm border border-base-300">
            {mockCartItems.map(item => <CartItem key={item.id} item={item} />)}
          </div>
          <div className="lg:w-1/3">
            <OrderSummary subtotal={subtotal} />
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
