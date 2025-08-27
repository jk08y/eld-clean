import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getOrdersByUserId } from '../../firebase/orderService';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import toast from 'react-hot-toast';
import { User, ShoppingBag, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser, logOut, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || '');
      setPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  const fetchUserOrders = useCallback(async () => {
    if (!currentUser) return;
    setOrdersLoading(true);
    try {
      const userOrders = await getOrdersByUserId(currentUser.uid);
      setOrders(userOrders);
    } catch (error) {
      toast.error("Failed to fetch your orders.");
    }
    setOrdersLoading(false);
  }, [currentUser]);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchUserOrders();
    }
  }, [activeTab, fetchUserOrders]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);
    try {
      await updateUserProfile(currentUser.uid, { fullName, phone });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
    setLoading(false);
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const Sidebar = () => (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="bg-white p-4 rounded-lg shadow-md border border-base-200 h-full">
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-2">
            <User className="w-12 h-12 text-primary" />
          </div>
          <h2 className="font-bold text-xl text-neutral">{currentUser?.fullName}</h2>
          <p className="text-sm text-neutral/60">{currentUser?.email}</p>
        </div>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab('details')} className={`w-full flex items-center space-x-3 p-3 rounded-md text-left transition-colors ${activeTab === 'details' ? 'bg-primary/10 text-primary font-semibold' : 'text-neutral/80 hover:bg-gray-100'}`}>
            <User size={20} />
            <span>Account Details</span>
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center space-x-3 p-3 rounded-md text-left transition-colors ${activeTab === 'orders' ? 'bg-primary/10 text-primary font-semibold' : 'text-neutral/80 hover:bg-gray-100'}`}>
            <ShoppingBag size={20} />
            <span>My Orders</span>
          </button>
          <button onClick={logOut} className="w-full flex items-center space-x-3 p-3 rounded-md text-left text-neutral/80 hover:bg-gray-100 transition-colors">
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </nav>
      </div>
    </aside>
  );

  const ProfileDetails = () => (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-base-200">
      <h2 className="text-2xl font-bold text-neutral mb-6">Account Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral">Email Address</label>
          <input id="email" type="email" value={currentUser?.email || ''} disabled className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 bg-base-200 text-neutral/70 cursor-not-allowed" />
        </div>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral">Full Name</label>
          <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral">Phone Number</label>
          <PhoneInput id="phone" international defaultCountry="KE" value={phone} onChange={setPhone} className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="pt-2">
          <button type="submit" disabled={loading} className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary/90 transition-colors duration-300 disabled:bg-primary/50">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );

  const MyOrders = () => (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-base-200">
      <h2 className="text-2xl font-bold text-neutral mb-6">My Orders</h2>
      {ordersLoading ? <p>Loading orders...</p> : 
        orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border border-base-200 rounded-md p-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <p className="font-semibold text-primary">#{order.id.slice(0, 8)}...</p>
                    <p className="text-sm text-neutral/60 mt-1">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                  </div>
                  <span className={`mt-2 sm:mt-0 px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-base-200">
                  <p className="text-neutral/70 font-semibold">Total: Ksh {order.total}</p>
                  <Link to={`/order-confirmation/${order.id}`} className="text-secondary font-semibold text-sm hover:underline">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-neutral/70">You have no orders yet.</p>
      }
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar />
        <main className="flex-1">
          {activeTab === 'details' && <ProfileDetails />}
          {activeTab === 'orders' && <MyOrders />}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
