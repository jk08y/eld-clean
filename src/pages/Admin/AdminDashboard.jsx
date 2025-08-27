import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, Users, Eye } from 'lucide-react';
import { getAllOrders } from '../../firebase/orderService';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';

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
        const [ordersData, usersSnapshot] = await Promise.all([
          getAllOrders(),
          getDocs(collection(db, 'users'))
        ]);

        const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = ordersData.length;
        const totalCustomers = usersSnapshot.size;

        setStats({ totalRevenue, totalOrders, totalCustomers });
        
        // Sort orders by date and get the 5 most recent
        const sortedOrders = ordersData.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
        setRecentOrders(sortedOrders.slice(0, 5));

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const statCards = [
    { title: 'Total Revenue', value: `Ksh ${stats.totalRevenue.toLocaleString()}`, icon: <DollarSign className="h-8 w-8 text-green-500" /> },
    { title: 'Total Orders', value: stats.totalOrders, icon: <ShoppingCart className="h-8 w-8 text-blue-500" /> },
    { title: 'Total Customers', value: stats.totalCustomers, icon: <Users className="h-8 w-8 text-purple-500" /> },
  ];
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral mb-6">Dashboard</h1>
      
      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map(stat => (
              <div key={stat.title} className="bg-white p-6 rounded-lg shadow-md border border-base-300 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral/70">{stat.title}</p>
                  <p className="text-2xl font-bold text-neutral mt-1">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-base-300">
            <h2 className="text-xl font-bold text-neutral mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-base-300 bg-base-100/50">
                    <th className="p-4 font-semibold">Order ID</th>
                    <th className="p-4 font-semibold hidden sm:table-cell">Customer</th>
                    <th className="p-4 font-semibold hidden md:table-cell">Total</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b border-base-200 last:border-b-0 hover:bg-base-100/50">
                      <td className="p-4 font-medium text-primary">#{order.id.slice(0, 8)}...</td>
                      <td className="p-4 text-neutral/80 hidden sm:table-cell">{order.shippingAddress?.fullName || 'N/A'}</td>
                      <td className="p-4 text-neutral/80 hidden md:table-cell">Ksh {order.total}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link to={`/admin/orders`} className="text-secondary hover:text-secondary/80 p-2">
                          <Eye size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
