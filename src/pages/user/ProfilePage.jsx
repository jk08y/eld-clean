// src/pages/user/ProfilePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getOrdersByUserId } from '../../firebase/orderService';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import toast from 'react-hot-toast';
import { User, ShoppingBag, LogOut, MapPin, ChevronRight, Loader2 } from 'lucide-react';
import ConfirmationModal from '../../components/Layout/ConfirmationModal';

// --- Subcomponents for Dashboard Sections ---

const AccountDetails = ({ currentUser, logOut, updateUserProfile, setIsLogoutModalOpen }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ streetAddress: '', city: '', county: '' });

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || '');
      setPhone(currentUser.phone || '');
      setAddress({
        streetAddress: currentUser.shippingAddress?.streetAddress || '',
        city: currentUser.shippingAddress?.city || '',
        county: currentUser.shippingAddress?.county || '',
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);
    try {
      await updateUserProfile(currentUser.uid, { 
        fullName, 
        phone, 
        shippingAddress: address // Save updated address
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
    setLoading(false);
  };
  
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-base-200">
      <h2 className="text-2xl font-bold text-neutral mb-6">Account Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Info */}
        <h3 className="text-lg font-semibold text-neutral/90 border-b pb-2">Contact Information</h3>
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

        {/* Shipping Address */}
        <h3 className="text-lg font-semibold text-neutral/90 border-b pb-2 pt-4">Default Shipping Address</h3>
        <div>
          <label htmlFor="streetAddress" className="block text-sm font-medium text-neutral">Street Address</label>
          <input id="streetAddress" type="text" value={address.streetAddress} onChange={(e) => setAddress(prev => ({...prev, streetAddress: e.target.value}))} className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-neutral">City</label>
            <input id="city" type="text" value={address.city} onChange={(e) => setAddress(prev => ({...prev, city: e.target.value}))} className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="county" className="block text-sm font-medium text-neutral">County</label>
            <input id="county" type="text" value={address.county} onChange={(e) => setAddress(prev => ({...prev, county: e.target.value}))} className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>


        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t mt-6">
          <button type="submit" disabled={loading} className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors duration-300 disabled:bg-primary/50 mb-4 sm:mb-0 w-full sm:w-auto flex items-center justify-center space-x-2 shadow-md">
            {loading ? <Loader2 size={20} className="animate-spin mr-2" /> : 'Save Changes'}
          </button>
          <button type="button" onClick={() => setIsLogoutModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center space-x-2 text-red-600 font-semibold py-2 px-4 rounded-full hover:bg-red-50 transition-colors">
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const MyOrders = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserOrders = useCallback(async () => {
    if (!currentUser) return;
    setOrdersLoading(true);
    try {
      const userOrders = await getOrdersByUserId(currentUser.uid);
      // Sort by latest first
      const sortedOrders = userOrders.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setOrders(sortedOrders);
    } catch (error) {
      toast.error("Failed to fetch your orders.");
    }
    setOrdersLoading(false);
  }, [currentUser]);

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-base-200">
      <h2 className="text-2xl font-bold text-neutral mb-6">Order History</h2>
      {ordersLoading ? (
        <div className="space-y-4">
          <div className="h-20 bg-base-200 rounded-lg animate-pulse"></div>
          <div className="h-20 bg-base-200 rounded-lg animate-pulse"></div>
          <div className="h-20 bg-base-200 rounded-lg animate-pulse"></div>
        </div>
      ) : 
        orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border border-base-200 rounded-lg p-4 transition-shadow hover:shadow-md cursor-pointer" onClick={() => navigate(`/order-confirmation/${order.id}`)}>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-lg text-primary">Order #{order.id.slice(0, 8)}...</p>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-neutral/80">
                  <p>Placed: {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                  <p className="font-bold text-neutral">Total: Ksh {order.total.toLocaleString()}</p>
                </div>
                <div className="text-right text-sm text-secondary font-semibold flex items-center justify-end mt-2">
                    View Details <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-neutral/70 p-4 text-center">You have no orders yet. Time to shop!</p>
      }
    </div>
  );
};


// --- Main Profile Page Component ---
const ProfilePage = () => {
  const { currentUser, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!currentUser) return <div className="text-center py-20">Please log in to view your profile.</div>;
  
  const handleLogout = async () => {
    await logOut();
    setIsLogoutModalOpen(false);
    navigate('/');
    toast.success("Successfully logged out.");
  };

  const Sidebar = () => (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-base-200 h-full sticky lg:top-8">
        <div className="text-center mb-6 border-b pb-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-2">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-bold text-xl text-neutral truncate">{currentUser?.fullName}</h2>
          <p className="text-sm text-neutral/60 truncate">{currentUser?.email}</p>
        </div>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary font-semibold' : 'text-neutral/80 hover:bg-base-200'}`}>
            <User size={20} />
            <span>Account Details</span>
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${activeTab === 'orders' ? 'bg-primary/10 text-primary font-semibold' : 'text-neutral/80 hover:bg-base-200'}`}>
            <ShoppingBag size={20} />
            <span>My Orders</span>
          </button>
          {/* Admin link for quick access */}
          {currentUser.isAdmin && (
            <Link to="/admin" className="w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors text-blue-600 font-semibold hover:bg-blue-50">
              <MapPin size={20} />
              <span>Admin Dashboard</span>
            </Link>
          )}
        </nav>
        <div className="pt-4 mt-4 border-t border-base-200">
            <button type="button" onClick={() => setIsLogoutModalOpen(true)} className="w-full flex items-center justify-center space-x-2 text-red-600 font-semibold py-3 px-4 rounded-full border border-red-200 hover:bg-red-50 transition-colors">
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral mb-8 text-center">My Account Dashboard</h1>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          <Sidebar />
          <main className="flex-1">
            {activeTab === 'dashboard' && <AccountDetails currentUser={currentUser} logOut={handleLogout} updateUserProfile={useAuth().updateUserProfile} setIsLogoutModalOpen={setIsLogoutModalOpen} />}
            {activeTab === 'orders' && <MyOrders currentUser={currentUser} />}
          </main>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirm Log Out"
        message="Are you sure you want to log out of your account? You will need to sign in again to access your details."
      />
    </>
  );
};

export default ProfilePage;
