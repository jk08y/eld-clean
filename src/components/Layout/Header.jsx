import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              Eld Clean
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-neutral hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Icons and Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-neutral hover:text-primary transition-colors duration-200">
              <Search size={22} />
            </button>
            <Link to="/profile" className="text-neutral hover:text-primary transition-colors duration-200">
              <User size={22} />
            </Link>
            <Link to="/cart" className="relative text-neutral hover:text-primary transition-colors duration-200">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              className="md:hidden text-neutral hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 shadow-lg">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-neutral hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
