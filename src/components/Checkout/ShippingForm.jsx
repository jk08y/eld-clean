import React from 'react';

const ShippingForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-base-300">
      <h2 className="text-xl font-bold text-neutral mb-4">Shipping Information</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral">Full Name</label>
          <input type="text" name="fullName" id="fullName" className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-neutral">Street Address</label>
          <input type="text" name="address" id="address" className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-neutral">City</label>
          <input type="text" name="city" id="city" className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="county" className="block text-sm font-medium text-neutral">County</label>
          <input type="text" name="county" id="county" className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
