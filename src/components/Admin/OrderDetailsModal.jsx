import React, { useState, useEffect } from 'react';
import { X, Printer } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateOrderStatus } from '../../firebase/orderService';

const OrderDetailsModal = ({ isOpen, onClose, order, onStatusUpdate }) => {
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (order) {
      setNewStatus(order.status);
    }
  }, [order]);

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen || !order) return null;

  const handleStatusChange = async () => {
    if (newStatus === order.status) return;
    setIsUpdating(true);
    const toastId = toast.loading('Updating order status...');
    try {
      await updateOrderStatus(order.id, newStatus);
      toast.success('Status updated successfully!', { id: toastId });
      onStatusUpdate();
      onClose();
    } catch (error) {
      toast.error('Failed to update status.', { id: toastId });
    }
    setIsUpdating(false);
  };

  const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];
  const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  return (
    <>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-area, .printable-area * {
              visibility: visible;
            }
            .printable-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .print-hide {
              display: none;
            }
          }
        `}
      </style>
      <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col relative">
          <div className="flex justify-between items-center p-4 border-b print-hide">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-neutral">Order Details</h2>
              <button onClick={handlePrint} className="flex items-center space-x-2 text-neutral/70 hover:text-primary">
                <Printer size={20} />
                <span>Print Invoice</span>
              </button>
            </div>
            <button onClick={onClose} className="text-neutral/60 hover:text-primary"><X size={24} /></button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6 printable-area">
            {/* Invoice Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary">Eld Clean</h1>
              <p className="text-lg font-semibold text-neutral">Invoice</p>
              <p className="text-neutral/70">Order ID: #{order.id.substring(0, 8)}</p>
            </div>

            {/* Order & Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-bold text-neutral mb-2">Billed To</h3>
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.streetAddress}, {order.shippingAddress.city}</p>
                <p>{order.shippingAddress.county}</p>
              </div>
              <div className="md:text-right">
                <h3 className="font-bold text-neutral mb-2">Order Information</h3>
                <p><span className="font-semibold">Date:</span> {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                <p><span className="font-semibold">Payment:</span> {order.paymentMethod}</p>
                <p><span className="font-semibold">Status:</span> {order.status}</p>
              </div>
            </div>

            {/* Items List */}
            <div>
              <h3 className="font-bold text-neutral mb-2">Items Ordered</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-base-100/50">
                    <tr>
                      <th className="p-3 text-left font-semibold">Product</th>
                      <th className="p-3 text-center font-semibold">Quantity</th>
                      <th className="p-3 text-right font-semibold">Price</th>
                      <th className="p-3 text-right font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map(item => (
                      <tr key={item.id} className="border-b last:border-b-0">
                        <td className="p-3 font-medium">{item.name}</td>
                        <td className="p-3 text-center">{item.quantity}</td>
                        <td className="p-3 text-right">Ksh {item.price.toLocaleString()}</td>
                        <td className="p-3 text-right font-semibold">Ksh {(item.price * item.quantity).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-neutral/80">Subtotal:</span> <span className="font-semibold">Ksh {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-neutral/80">Shipping:</span> <span className="font-semibold">Ksh {order.shippingFee.toLocaleString()}</span></div>
                <div className="flex justify-between pt-2 border-t text-base"><span className="font-bold">Total Due:</span> <span className="font-extrabold text-lg">Ksh {order.total.toLocaleString()}</span></div>
              </div>
            </div>
            
            <div className="text-center text-xs text-neutral/60 pt-6">
              <p>Thank you for your business!</p>
            </div>
          </div>
          
          {/* Status Update - Hidden on Print */}
          <div className="p-6 border-t print-hide">
            <h3 className="font-bold text-neutral mb-2">Update Status</h3>
            <div className="flex items-center space-x-4">
              <select 
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="flex-grow border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
              <button
                onClick={handleStatusChange}
                disabled={isUpdating || newStatus === order.status}
                className="bg-secondary text-white font-bold py-2 px-6 rounded-full hover:bg-secondary/90 transition-colors disabled:bg-secondary/50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsModal;

