import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { updateOrderStatus } from '../../firebase/orderService';
import toast from 'react-hot-toast';

const OrderDetailsModal = ({ isOpen, onClose, order, refreshOrders }) => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  if (!isOpen || !order) return null;

  const handleStatusUpdate = async () => {
    setLoading(true);
    try {
      await updateOrderStatus(order.id, status);
      toast.success("Order status updated!");
      refreshOrders();
      onClose();
    } catch (error) {
      toast.error("Failed to update status.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-start sm:items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full sm:max-w-2xl h-full sm:h-auto sm:max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-base-300 flex-shrink-0">
          <h2 className="text-xl font-bold text-neutral">
            Order Details
          </h2>
          <button onClick={onClose} className="text-neutral/60 hover:text-primary">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-neutral">Order ID:</p>
              <p className="text-primary font-mono">#{order.id}</p>
            </div>
            <div>
              <p className="font-semibold text-neutral">Order Date:</p>
              <p className="text-neutral/80">{new Date(order.createdAt?.seconds * 1000).toLocaleString()}</p>
            </div>
          </div>

          {/* Customer & Shipping */}
          <div>
            <h3 className="text-lg font-semibold text-neutral mb-2 border-b pb-1">Customer & Shipping</h3>
            <p><span className="font-semibold">Name:</span> {order.shippingAddress?.fullName}</p>
            <p><span className="font-semibold">Address:</span> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.county}</p>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-lg font-semibold text-neutral mb-2 border-b pb-1">Items Ordered</h3>
            <div className="space-y-2">
              {order.items?.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <p className="text-neutral/80">{item.name} <span className="text-neutral/60">x {item.quantity}</span></p>
                  <p className="font-medium">Ksh {item.price * item.quantity}</p>
                </div>
              ))}
              <div className="flex justify-between items-center font-bold text-base pt-2 border-t">
                <p>Total</p>
                <p>Ksh {order.total}</p>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-neutral mb-1">Update Order Status</label>
            <select 
              id="status" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t border-base-300 bg-base-100/50 flex-shrink-0">
          <button onClick={onClose} className="bg-white text-neutral font-semibold py-2 px-4 rounded-full border border-base-300 mr-2 hover:bg-base-200 transition-colors">
            Close
          </button>
          <button onClick={handleStatusUpdate} disabled={loading} className="bg-primary text-white font-bold py-2 px-4 rounded-full hover:bg-primary/90 transition-colors disabled:bg-primary/50">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
