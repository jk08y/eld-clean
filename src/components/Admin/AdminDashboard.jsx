import React from 'react';
import { DollarSign, ShoppingCart, Users } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: 'Ksh 125,660', icon: <DollarSign className="h-8 w-8 text-green-500" /> },
    { title: 'Total Orders', value: '350', icon: <ShoppingCart className="h-8 w-8 text-blue-500" /> },
    { title: 'Total Customers', value: '120', icon: <Users className="h-8 w-8 text-purple-500" /> },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map(stat => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-md border border-base-300 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral/70">{stat.title}</p>
              <p className="text-2xl font-bold text-neutral mt-1">{stat.value}</p>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>

      {/* Recent Orders Section (Placeholder) */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-base-300">
        <h2 className="text-xl font-bold text-neutral mb-4">Recent Orders</h2>
        <p className="text-neutral/70">Recent orders will be displayed here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
