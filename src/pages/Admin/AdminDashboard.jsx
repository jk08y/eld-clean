import React, { useState, useEffect } from 'react';
import { ShoppingCart, DollarSign, Users, Activity } from 'lucide-react';
import { getAllOrders } from '../../firebase/orderService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const StatCard = ({ title, value, icon, color }) => {
  const Icon = icon;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-base-200 flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <p className="text-sm text-neutral/60 font-medium">{title}</p>
        <p className="text-2xl font-bold text-neutral">{value}</p>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all orders for revenue and order count
        const orders = await getAllOrders();
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        setStats(prev => ({ ...prev, totalRevenue, totalOrders: orders.length }));
        
        // Sort orders by date and get the 5 most recent
        const sortedOrders = orders.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
        setRecentOrders(sortedOrders.slice(0, 5));

        // Fetch all users for customer count
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const uniqueCustomers = new Set(orders.map(order => order.userId));
        setStats(prev => ({ ...prev, totalCustomers: uniqueCustomers.size }));
        
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value={`Ksh ${stats.totalRevenue.toLocaleString()}`} 
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        <StatCard 
          title="Total Customers" 
          value={stats.totalCustomers} 
          icon={Users}
          color="bg-purple-500"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-base-200">
        <h2 className="text-xl font-bold text-neutral mb-4 flex items-center space-x-2">
          <Activity size={22} />
          <span>Recent Orders</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 font-semibold">Order ID</th>
                <th className="py-2 px-4 font-semibold">Date</th>
                <th className="py-2 px-4 font-semibold">Total</th>
                <th className="py-2 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-primary font-medium">#{order.id.slice(0, 8)}...</td>
                  <td className="py-3 px-4 text-neutral/80">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-neutral/80">Ksh {order.total.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
