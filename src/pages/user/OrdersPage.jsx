import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for now; this will come from Firebase later.
const mockOrders = [
  { id: 'ORD-123XYZ', date: '2024-08-26', total: 1950, status: 'Shipped' },
  { id: 'ORD-456ABC', date: '2024-08-20', total: 850, status: 'Delivered' },
  { id: 'ORD-789DEF', date: '2024-08-15', total: 3200, status: 'Delivered' },
  { id: 'ORD-999GHI', date: '2024-08-12', total: 500, status: 'Processing' },
];

const OrdersPage = () => {

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">My Orders</h1>
        <p className="text-lg text-neutral/70 mt-2">View your order history</p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {mockOrders.length > 0 ? (
          <div className="space-y-6">
            {mockOrders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border border-base-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-lg font-bold text-primary">Order #{order.id}</h3>
                    <p className="text-sm text-neutral/60 mt-1">Placed on: {order.date}</p>
                  </div>
                  <span className={`mt-4 sm:mt-0 px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <hr className="my-4 border-base-200" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p className="text-neutral/80">Total Amount</p>
                    <p className="text-xl font-bold text-neutral">Ksh {order.total}</p>
                  </div>
                  <Link to={`/order-confirmation/${order.id}`} className="mt-4 sm:mt-0 bg-secondary text-white font-bold py-2 px-6 rounded-full hover:bg-secondary/90 transition-colors duration-300">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md border border-base-300">
            <p className="text-xl text-neutral/80 mb-4">You haven't placed any orders yet.</p>
            <Link to="/products" className="bg-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary/90 transition-colors duration-300 transform hover:scale-105">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
