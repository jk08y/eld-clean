// src/components/Checkout/ShippingForm.jsx
import React from 'react';

const ShippingForm = ({ shippingData, setShippingData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-base-300">
      <h2 className="text-xl font-bold text-neutral mb-4">Shipping Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral">Full Name</label>
          <input type="text" name="fullName" id="fullName" value={shippingData.fullName} onChange={handleChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-neutral">Street Address</label>
          {/* Note: 'address' maps to 'streetAddress' in the service/DB */}
          <input type="text" name="address" id="address" value={shippingData.address} onChange={handleChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-neutral">City</label>
          <input type="text" name="city" id="city" value={shippingData.city} onChange={handleChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="county" className="block text-sm font-medium text-neutral">County</label>
          <input type="text" name="county" id="county" value={shippingData.county} onChange={handleChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
