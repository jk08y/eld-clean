import React from 'react';
import { Eye } from 'lucide-react';

// Mock data for now
const mockOrders = [
  { id: 'ORD-123XYZ', customer: 'Jane Doe', date: '2024-08-26', total: 1950, status: 'Shipped' },
  { id: 'ORD-456ABC', customer: 'John K.', date: '2024-08-20', total: 850, status: 'Delivered' },
  { id: 'ORD-999GHI', customer: 'Peter P.', date: '2024-08-12', total: 500, status: 'Processing' },
  { id: 'ORD-789DEF', customer: 'Mary M.', date: '2024-08-15', total: 3200, status: 'Delivered' },
];

const AdminOrders = () => {

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral mb-6">Order Management</h1>

      <div className="bg-white rounded-lg shadow-md border border-base-300">
        {/* Mobile Card View */}
        <div className="md:hidden">
          {mockOrders.map(order => (
            <div key={order.id} className="p-4 border-b border-base-200 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-primary">#{order.id}</p>
                  <p className="text-sm text-neutral/80">{order.customer}</p>
                  <p className="text-xs text-neutral/60">{order.date}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="font-bold">Ksh {order.total}</p>
                <button className="text-secondary hover:text-secondary/80 flex items-center space-x-1 text-sm">
                  <Eye size={16} />
                  <span>View</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-base-300 bg-base-100/50">
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id} className="border-b border-base-200 hover:bg-base-100/50">
                  <td className="p-4 font-medium text-primary">#{order.id}</td>
                  <td className="p-4 text-neutral/80">{order.customer}</td>
                  <td className="p-4 text-neutral/80">{order.date}</td>
                  <td className="p-4 text-neutral/80">Ksh {order.total}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-secondary hover:text-secondary/80 p-2">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
