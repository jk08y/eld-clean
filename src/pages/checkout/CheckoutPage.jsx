// src/pages/checkout/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShippingForm from '../../components/Checkout/ShippingForm';
import PaymentMethods from '../../components/Checkout/PaymentMethods';
import OrderSummary from '../../components/Cart/OrderSummary';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../firebase/orderService';
import toast from 'react-hot-toast';

const SHIPPING_FEE = 300;

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
      // Pre-fill with saved shipping address and full name if it exists
      const savedAddress = currentUser.shippingAddress;
      setShippingData({
        fullName: currentUser.fullName || '',
        // Ensure field names are consistent with the saved structure
        address: savedAddress?.streetAddress || '', 
        city: savedAddress?.city || '',
        county: savedAddress?.county || '',
      });
    }
  }, [currentUser]);

  const validateForm = () => {
    for (const key in shippingData) {
      if (!shippingData[key]) {
        // Humanize the key for better error message
        const fieldName = key.replace(/([A-Z])/g, ' $1').toLowerCase();
        toast.error(`Please fill in the ${fieldName} field.`);
        return false;
      }
    }
    if (cartItems.length === 0) {
        toast.error("Your cart is empty. Please add items before checking out.");
        return false;
    }
    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // A crucial check that must be present: ensure the user is authenticated before proceeding
    if (!currentUser || !currentUser.uid) {
        toast.error("You must be logged in to place an order.");
        navigate('/login');
        return;
    }

    setLoading(true);
    const toastId = toast.loading("Placing order...");
    
    try {
      // Collect data, ensuring address field name consistency for the service
      const orderData = {
        total: cartSubtotal + SHIPPING_FEE,
        shippingAddress: {
            ...shippingData,
            streetAddress: shippingData.address, // map local 'address' to database 'streetAddress'
        },
        paymentMethod,
        shippingFee: SHIPPING_FEE,
      };

      // Pass currentUser.uid explicitly
      const orderId = await createOrder(currentUser.uid, orderData, cartItems);
      
      await clearCart();
      toast.success("Order placed successfully!", { id: toastId });
      navigate(`/order-confirmation/${orderId}`);
      
    } catch (error) {
      console.error("Order Placement Error:", error);
      // Display a general but helpful error if the specific one isn't user-friendly
      toast.error(error.message || "We encountered an issue while processing your order. Please check your details and try again.", { id: toastId });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handlePlaceOrder} className="min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">Checkout</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-8">
          <ShippingForm shippingData={shippingData} setShippingData={setShippingData} />
          {/* Ensure setMethod is passed to update the state */}
          <PaymentMethods selectedMethod={paymentMethod} setMethod={setPaymentMethod} /> 
        </div>
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-28">
            {/* Ensure OrderSummary uses the correct shipping prop name */}
            <OrderSummary subtotal={cartSubtotal} shipping={SHIPPING_FEE} hideCheckoutButton={true} />
            <button 
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="w-full mt-4 bg-secondary text-white font-bold py-3 px-6 rounded-full hover:bg-secondary/90 transition-colors duration-300 transform hover:scale-[1.01] disabled:bg-secondary/50 disabled:cursor-not-allowed shadow-xl"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;
