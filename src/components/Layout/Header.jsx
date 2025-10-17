// src/components/Layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Home, Package, Info, Mail } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const { currentUser } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Products', icon: Package },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  // Effect to handle scroll state for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-lg' : 'bg-white/80'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-primary">
                Cleaning Products
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `relative text-base font-medium text-neutral transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[3px] after:w-full after:bg-primary after:transition-transform after:duration-300 ${
                      isActive ? 'text-primary after:scale-x-100 font-semibold' : 'hover:text-primary after:scale-x-0 hover:after:scale-x-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Icons / Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search Icon links to Products Page */}
              <Link to="/products" className="hidden sm:block text-neutral hover:text-primary transition-colors duration-200" aria-label="Search">
                <Search size={22} />
              </Link>
              <Link to={currentUser ? "/profile" : "/login"} className="text-neutral hover:text-primary transition-colors duration-200" aria-label={currentUser ? "User Profile" : "Login/Register"}>
                <User size={22} />
              </Link>
              <Link to="/cart" className="relative text-neutral hover:text-primary transition-colors duration-200" aria-label="Shopping Cart">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-neutral text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              {/* Mobile Menu Toggle (remains) */}
              <button
                className="md:hidden text-neutral hover:text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'bg-black/60 opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      ></div>
      <div className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} shadow-xl`}>
        <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-bold text-neutral">More Links</h3>
            <button
                onClick={() => setIsMenuOpen(false)}
                className="text-neutral hover:text-primary p-2"
                aria-label="Close menu"
            >
                <X size={24} />
            </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-lg font-medium transition-colors ${
                  isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-neutral hover:bg-base-200'
                }`
              }
            >
              <link.icon size={22} /> {/* Use specific icon here */}
              <span>{link.label}</span>
            </NavLink>
          ))}
          <div className="pt-4 border-t border-base-200">
            <Link 
              to={currentUser ? "/profile" : "/login"}
              onClick={() => setIsMenuOpen(false)}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-full font-bold transition-colors shadow-md ${
                currentUser 
                  ? 'bg-secondary text-white hover:bg-secondary/90' 
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              <User size={20} />
              <span>{currentUser ? "My Account" : "Login / Register"}</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
