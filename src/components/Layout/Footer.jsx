// src/components/Layout/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, X as XIcon, Send } from 'lucide-react'; // XIcon for the Twitter/X logo
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
      toast.success('Thank you for subscribing to Cleaning Products!');
      setEmail('');
    } catch (error) {
      // Error toast is handled in the service
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <footer className="bg-neutral text-white mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-extrabold text-primary mb-4">Cleaning Products</h3>
            <p className="text-gray-300 max-w-xs mb-6">
              Premium cleaning products for a brighter, spotless home.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full border border-gray-700 hover:border-white">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="X (Twitter)" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full border border-gray-700 hover:border-white">
                <XIcon size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full border border-gray-700 hover:border-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-primary transition-colors">Shop All</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Your Account</h3>
            <ul className="space-y-3">
              <li><Link to="/profile" className="text-gray-400 hover:text-primary transition-colors">My Profile</Link></li>
              <li><Link to="/orders" className="text-gray-400 hover:text-primary transition-colors">My Orders</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-primary transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-semibold text-white mb-4">Get Exclusive Deals</h3>
            <p className="text-gray-400 mb-4">Join our newsletter for 30% off your first order!</p>
            <form onSubmit={handleSubscribe}>
              <div className="flex rounded-full overflow-hidden shadow-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary/80 text-white font-bold px-5 py-3 transition-colors duration-300 disabled:bg-primary/50 flex items-center justify-center"
                >
                  {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : <Send size={20} />}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Cleaning Products. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
