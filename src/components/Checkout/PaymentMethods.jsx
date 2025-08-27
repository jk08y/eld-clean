import React from 'react';

const PaymentMethods = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-base-300">
      <h2 className="text-xl font-bold text-neutral mb-4">Payment Method</h2>
      <div className="space-y-4">
        <label className="flex items-center p-4 border border-base-300 rounded-lg cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary">
          <input type="radio" name="paymentMethod" value="mpesa" className="h-4 w-4 text-primary focus:ring-primary" defaultChecked />
          <span className="ml-3 font-medium text-neutral">M-Pesa</span>
        </label>
        <label className="flex items-center p-4 border border-base-300 rounded-lg cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary">
          <input type="radio" name="paymentMethod" value="card" className="h-4 w-4 text-primary focus:ring-primary" />
          <span className="ml-3 font-medium text-neutral">Credit/Debit Card</span>
        </label>
        <label className="flex items-center p-4 border border-base-300 rounded-lg cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary">
          <input type="radio" name="paymentMethod" value="cod" className="h-4 w-4 text-primary focus:ring-primary" />
          <span className="ml-3 font-medium text-neutral">Cash on Delivery</span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethods;
