import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShippingForm from '../../components/Checkout/ShippingForm';
import PaymentMethods from '../../components/Checkout/PaymentMethods';
import OrderSummary from '../../components/Cart/OrderSummary';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../firebase/orderService';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    fullName: '',
    address: '',
    city: '',
    county: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setShippingData(prev => ({
        ...prev,
        fullName: currentUser.fullName || '',
        // You can add address fields to the user profile later
      }));
    }
  }, [currentUser]);

  const handlePlaceOrder = async () => {
    if (!shippingData.fullName || !shippingData.address || !shippingData.city || !shippingData.county) {
      return toast.error("Please fill in all shipping details.");
    }
    setLoading(true);
    try {
      const orderData = {
        userId: currentUser.uid,
        items: cartItems,
        total: cartSubtotal + 300, // Assuming a fixed shipping cost
        shippingAddress: shippingData,
        paymentMethod,
      };
      const orderRef = await createOrder(orderData);
      await clearCart();
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${orderRef.id}`);
    } catch (error) {
      toast.error("Failed to place order.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">Checkout</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-8">
          <ShippingForm shippingData={shippingData} setShippingData={setShippingData} />
          <PaymentMethods selectedMethod={paymentMethod} setMethod={setPaymentMethod} />
        </div>
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-28">
            <OrderSummary subtotal={cartSubtotal} hideCheckoutButton={true} />
            <button 
              onClick={handlePlaceOrder}
              disabled={loading || cartItems.length === 0}
              className="w-full mt-4 bg-accent text-neutral font-bold py-3 px-6 rounded-full hover:bg-accent/90 transition-colors duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
