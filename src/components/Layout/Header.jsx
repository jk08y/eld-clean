import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const { currentUser } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
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
                Eld Clean
              </Link>
            </div>

            <nav className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `relative text-base font-medium text-neutral transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300 ${
                      isActive ? 'text-primary after:scale-x-100' : 'hover:text-primary after:scale-x-0 hover:after:scale-x-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="hidden sm:block text-neutral hover:text-primary transition-colors duration-200">
                <Search size={22} />
              </button>
              <Link to={currentUser ? "/profile" : "/login"} className="text-neutral hover:text-primary transition-colors duration-200">
                <User size={22} />
              </Link>
              <Link to="/cart" className="relative text-neutral hover:text-primary transition-colors duration-200">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {!currentUser && (
                 <Link to="/login" className="hidden lg:block bg-primary text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-primary/90 transition-colors">
                    Login
                 </Link>
              )}
              <button
                className="md:hidden text-neutral hover:text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'bg-black/60 opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-4">
            <button
                onClick={() => setIsMenuOpen(false)}
                className="text-neutral hover:text-primary"
            >
                <X size={28} />
            </button>
        </div>
        <nav className="flex flex-col items-center space-y-8 mt-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-2xl font-semibold transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-neutral hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
