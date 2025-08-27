import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// Mock data for now
const mockOrderDetails = {
  id: 'ORD-123XYZ',
  date: '2024-08-26',
  total: 1950,
  shippingAddress: {
    fullName: 'Jane Doe',
    address: '123 Main St',
    city: 'Nairobi',
    county: 'Nairobi County',
  },
  items: [
    { id: '1', name: 'All-Purpose Cleaner', price: 450, quantity: 2 },
    { id: '4', name: 'Organic Laundry Detergent', price: 1050, quantity: 1 },
  ],
  paymentMethod: 'M-Pesa',
};

const OrderConfirmationPage = () => {
  const { orderId } = useParams();

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-base-300 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-neutral">Thank you for your order!</h1>
        <p className="text-neutral/70 mt-2">
          Your order <span className="font-semibold text-primary">#{orderId}</span> has been placed successfully.
        </p>
        <p className="text-neutral/70">A confirmation email has been sent to your address.</p>

        <div className="text-left mt-8">
          <h2 className="text-xl font-bold text-neutral mb-4 border-b pb-2">Order Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Shipping Details */}
            <div>
              <h3 className="font-semibold mb-2">Shipping to:</h3>
              <div className="text-neutral/80">
                <p>{mockOrderDetails.shippingAddress.fullName}</p>
                <p>{mockOrderDetails.shippingAddress.address}</p>
                <p>{mockOrderDetails.shippingAddress.city}, {mockOrderDetails.shippingAddress.county}</p>
              </div>
            </div>
            {/* Order Details */}
            <div>
              <h3 className="font-semibold mb-2">Order Details:</h3>
              <div className="text-neutral/80 space-y-1">
                <p><strong>Date:</strong> {mockOrderDetails.date}</p>
                <p><strong>Payment:</strong> {mockOrderDetails.paymentMethod}</p>
                <p><strong>Total:</strong> <span className="font-bold">Ksh {mockOrderDetails.total}</span></p>
              </div>
            </div>
          </div>
          
          {/* Items Purchased */}
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Items Purchased:</h3>
            <div className="space-y-2">
              {mockOrderDetails.items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <p className="text-neutral/80">{item.name} (x{item.quantity})</p>
                  <p className="font-medium">Ksh {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Link to="/products" className="bg-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary/90 transition-colors duration-300">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
