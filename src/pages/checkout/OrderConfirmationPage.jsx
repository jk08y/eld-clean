// src/pages/checkout/OrderConfirmationPage.jsx
import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, Truck, Home, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getOrderById } from '../../firebase/orderService';
import toast from 'react-hot-toast';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!orderId) throw new Error("Missing Order ID");
        
        const orderDoc = await getOrderById(orderId); 
        
        // Ensure createdAt is a Date object for display
        if (orderDoc.createdAt?.seconds) {
            orderDoc.createdAt = new Date(orderDoc.createdAt.seconds * 1000);
        } else {
            orderDoc.createdAt = new Date(); // Fallback date
        }

        setOrder(orderDoc);
        
      } catch (e) {
        console.error("Error fetching order:", e);
        // Display a general error message if fetching failed
        setError("Order not found or an error occurred. Please check your order history.");
        toast.error("Failed to fetch order details. " + e.message);
      }
      setLoading(false);
    };
    
    fetchOrder();
  }, [orderId]);

  const OrderStatusTimeline = ({ status }) => {
    const statuses = ['Processing', 'Shipped', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(status);
    
    const icons = {
      Processing: Package,
      Shipped: Truck,
      Delivered: Home,
    };
    
    const statusDescriptions = {
      Processing: "Order received and is being prepared.",
      Shipped: "Order has left our warehouse.",
      Delivered: "Order has been successfully delivered.",
    };

    return (
      <div className="w-full my-8">
        <div className="flex justify-between items-start relative before:content-[''] before:absolute before:top-6 before:left-0 before:right-0 before:h-1 before:bg-base-200">
          {statuses.map((s, index) => {
            const Icon = icons[s];
            const isActive = index <= currentStatusIndex;
            return (
              <div key={s} className="flex-1 text-center z-10">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ring-4 ring-white ${isActive ? 'bg-primary text-white' : 'bg-base-300 text-neutral/50'}`}>
                  <Icon size={20} />
                </div>
                <p className={`mt-3 text-sm font-semibold transition-colors duration-500 ${isActive ? 'text-primary' : 'text-neutral/70'}`}>{s}</p>
              </div>
            );
          })}
        </div>
        <p className={`mt-4 text-center text-sm font-medium text-neutral`}>
             <span className="font-bold">Current Status:</span> {statusDescriptions[status] || 'Processing'}
        </p>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-20 text-lg font-semibold text-neutral">Preparing your confirmation...</div>;
  }

  if (error || !order) {
    return <div className="text-center py-20 text-red-600 font-bold text-xl">{error || "Order not found. Please check your order history."}</div>;
  }

  // Calculate Subtotal for the summary card
  const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = order.shippingFee || 300;


  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl border border-base-200">
        
        {/* Main Confirmation Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-3" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral">Order Confirmed!</h1>
          <p className="text-lg text-neutral/70 mt-2">
            Your order <span className="font-bold text-primary">#{order.id.slice(0, 8).toUpperCase()}...</span> is now being processed.
          </p>
        </div>
        
        {/* Status Timeline */}
        <OrderStatusTimeline status={order.status} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          
          {/* Shipping/Payment Card (Left Column) */}
          <div className="lg:col-span-2 space-y-6">
             <h2 className="text-2xl font-bold text-neutral border-b pb-3 mb-4 flex items-center space-x-2">
                <ShoppingBag size={24} className="text-primary"/>
                <span>Order Items ({order.items.length})</span>
             </h2>
             
             {/* Items List */}
             <div className="space-y-4">
               {order.items.map(item => (
                 <div key={item.productId || item.name} className="flex items-center space-x-4 p-3 bg-base-100/70 rounded-lg">
                   <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/64x64/cccccc/ffffff?text=P'; }}
                   />
                   <div className="flex-grow">
                     <p className="font-semibold text-neutral">{item.name}</p>
                     <p className="text-sm text-neutral/60">Qty: {item.quantity} | Price: Ksh {item.price.toLocaleString()}</p>
                   </div>
                   <p className="font-bold text-lg text-primary flex-shrink-0">Ksh {(item.price * item.quantity).toLocaleString()}</p>
                 </div>
               ))}
             </div>

             {/* Shipping & Payment Details */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-base-200">
                <div className="bg-base-100 p-5 rounded-xl shadow-sm border border-base-200">
                    <h3 className="font-bold text-lg text-neutral mb-3 flex items-center space-x-2"><MapPin size={20}/> <span>Shipping Details</span></h3>
                    <p className="text-neutral/80 font-semibold">{order.shippingAddress.fullName}</p>
                    <p className="text-sm text-neutral/70">{order.shippingAddress.address || order.shippingAddress.streetAddress}</p>
                    <p className="text-sm text-neutral/70">{order.shippingAddress.city}, {order.shippingAddress.county}</p>
                </div>
                <div className="bg-base-100 p-5 rounded-xl shadow-sm border border-base-200">
                    <h3 className="font-bold text-lg text-neutral mb-3 flex items-center space-x-2"><CreditCard size={20}/> <span>Payment Info</span></h3>
                    <p className="text-neutral/80 font-semibold">{order.paymentMethod}</p>
                    <p className="text-sm text-neutral/70">Order Date: {order.createdAt.toLocaleDateString()}</p>
                    <p className="text-sm text-neutral/70">Order ID: #{order.id.slice(0, 8).toUpperCase()}</p>
                </div>
             </div>
          </div>
          
          {/* Order Summary (Right Column) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20 bg-base-100 p-6 rounded-xl shadow-xl border border-base-300">
              <h2 className="text-2xl font-bold text-neutral mb-4">Order Summary</h2>
              <div className="space-y-2 text-lg">
                <div className="flex justify-between text-neutral/80"><span>Subtotal:</span> <span>Ksh {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-neutral/80"><span>Shipping:</span> <span>Ksh {shipping.toLocaleString()}</span></div>
                <div className="flex justify-between pt-4 border-t border-base-300 text-xl font-extrabold text-primary">
                  <span>Total Paid:</span> <span>Ksh {order.total.toLocaleString()}</span>
                </div>
              </div>
              
              <Link to="/orders" className="w-full inline-block text-center mt-6 bg-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary/90 transition-colors duration-300 shadow-md">
                 Track My Order
              </Link>
              
              <Link to="/products" className="w-full inline-block text-center mt-3 border border-primary text-primary font-bold py-3 px-8 rounded-full hover:bg-primary/10 transition-colors duration-300">
                 Continue Shopping
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
