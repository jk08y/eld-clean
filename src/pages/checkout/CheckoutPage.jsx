import React from 'react';
import ShippingForm from '../../components/Checkout/ShippingForm';
import PaymentMethods from '../../components/Checkout/PaymentMethods';
import OrderSummary from '../../components/Cart/OrderSummary'; // Reusing the OrderSummary component

const CheckoutPage = () => {
  // Mock subtotal for now
  const subtotal = 1500; 

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">Checkout</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Forms */}
        <div className="lg:w-2/3 space-y-8">
          <ShippingForm />
          <PaymentMethods />
        </div>
        {/* Right Side: Order Summary */}
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-28">
            <OrderSummary subtotal={subtotal} />
            {/* The button text should be updated */}
            <button className="w-full mt-4 bg-accent text-neutral font-bold py-3 px-6 rounded-full hover:bg-accent/90 transition-colors duration-300 transform hover:scale-105">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
