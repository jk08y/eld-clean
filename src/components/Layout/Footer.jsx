import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { addSubscriber } from '../../firebase/newsletterService';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await addSubscriber(email);
      toast.success("Thank you for subscribing!");
      setEmail('');
    } catch (error) {
      // Error toast is handled in the service
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <footer className="bg-neutral text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold text-white mb-4">Eld Clean</h3>
            <p className="text-gray-400 max-w-xs">
              Premium cleaning products for a brighter, spotless home.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram /></a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Shop</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
            <ul className="space-y-2">
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">My Profile</Link></li>
              <li><Link to="/orders" className="text-gray-400 hover:text-white transition-colors">My Orders</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-lg font-semibold text-white mb-4">Join Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get exclusive deals and updates delivered to your inbox.</p>
            <form onSubmit={handleSubscribe}>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-l-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2 rounded-r-full transition-colors disabled:bg-primary/50"
                >
                  {loading ? '...' : 'Go'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Eld Clean. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
