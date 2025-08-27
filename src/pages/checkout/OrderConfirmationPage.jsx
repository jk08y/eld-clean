import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getOrderById } from '../../firebase/orderService';
import toast from 'react-hot-toast';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDoc = await getOrderById(orderId);
        if (orderDoc.exists()) {
          setOrder({ id: orderDoc.id, ...orderDoc.data() });
        } else {
          toast.error("Order not found.");
        }
      } catch (error) {
        toast.error("Failed to fetch order details.");
      }
      setLoading(false);
    };
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const OrderStatusTimeline = ({ status }) => {
    const statuses = ['Processing', 'Shipped', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(status);
    
    const icons = {
      Processing: <Package />,
      Shipped: <Truck />,
      Delivered: <Home />,
    };

    return (
      <div className="w-full my-8">
        <div className="flex justify-between">
          {statuses.map((s, index) => (
            <div key={s} className="flex-1 text-center">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${index <= currentStatusIndex ? 'bg-primary text-white' : 'bg-base-200 text-neutral/50'}`}>
                {icons[s]}
              </div>
              <p className={`mt-2 text-sm font-semibold transition-colors duration-500 ${index <= currentStatusIndex ? 'text-primary' : 'text-neutral/50'}`}>{s}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-20">Loading your order confirmation...</div>;
  }

  if (!order) {
    return <div className="text-center py-20">Order not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-base-200">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-neutral">Thank you for your order!</h1>
          <p className="text-neutral/70 mt-2">
            Your order <span className="font-semibold text-primary">#{order.id.slice(0, 8)}...</span> has been placed successfully.
          </p>
        </div>
        
        <OrderStatusTimeline status={order.status} />

        <div className="text-left mt-8 bg-base-100/50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-neutral mb-4 border-b pb-2">Order Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Shipping to:</h3>
              <div className="text-neutral/80">
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.county}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Order Details:</h3>
              <div className="text-neutral/80 space-y-1">
                <p><strong>Date:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Total:</strong> <span className="font-bold">Ksh {order.total}</span></p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Items Purchased:</h3>
            <div className="space-y-2">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <p className="text-neutral/80">{item.name} (x{item.quantity})</p>
                  <p className="font-medium">Ksh {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/products" className="bg-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary/90 transition-colors duration-300">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
