import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Eld Clean</h3>
            <p className="text-gray-400">
              Your one-stop shop for the best cleaning products in Kenya. Quality and affordability guaranteed.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Nairobi, Kenya</li>
              <li>info@eldclean.co.ke</li>
              <li>+254 700 000 000</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get the latest deals and updates.</p>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-l-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2 rounded-r-full transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Eld Clean. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
