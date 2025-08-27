import React, { useState, useEffect, useCallback } from 'react';
import { Eye } from 'lucide-react';
import { getAllOrders } from '../../firebase/orderService';
import toast from 'react-hot-toast';
import OrderDetailsModal from '../../components/Admin/OrderDetailsModal';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const ordersData = await getAllOrders();
      setOrders(ordersData);
    } catch (error) {
      toast.error("Failed to fetch orders.");
      console.error(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral mb-6">Order Management</h1>

      <div className="bg-white rounded-lg shadow-md border border-base-300">
        {orders.length === 0 ? (
           <p className="p-8 text-center text-neutral/70">No orders found.</p>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden">
              {orders.map(order => (
                <div key={order.id} className="p-4 border-b border-base-200 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-primary">#{order.id.slice(0, 8)}...</p>
                      <p className="text-sm text-neutral/80">{order.shippingAddress?.fullName || 'N/A'}</p>
                      <p className="text-xs text-neutral/60">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold">Ksh {order.total}</p>
                    <button onClick={() => handleViewOrder(order)} className="text-secondary hover:text-secondary/80 flex items-center space-x-1 text-sm">
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
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-base-200 hover:bg-base-100/50">
                      <td className="p-4 font-medium text-primary">#{order.id.slice(0, 8)}...</td>
                      <td className="p-4 text-neutral/80">{order.shippingAddress?.fullName || 'N/A'}</td>
                      <td className="p-4 text-neutral/80">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</td>
                      <td className="p-4 text-neutral/80">Ksh {order.total}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => handleViewOrder(order)} className="text-secondary hover:text-secondary/80 p-2">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      
      <OrderDetailsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
        refreshOrders={fetchOrders}
      />
    </div>
  );
};

export default AdminOrders;
