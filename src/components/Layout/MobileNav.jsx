// src/components/Layout/MobileNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const MobileNav = () => {
  const { cartCount } = useCart();
  const { currentUser } = useAuth();
  
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    // This is the Search link, which correctly navigates to the products page
    { to: "/products", icon: Search, label: "Search" }, 
    { to: "/cart", icon: ShoppingCart, label: "Cart", count: cartCount },
    { to: "/profile", icon: User, label: "Account" },
  ];

  const commonClasses = "flex flex-col items-center justify-center p-1 transition-colors duration-200";
  const activeClasses = "text-primary font-semibold";
  const inactiveClasses = "text-neutral/70 hover:text-primary";

  return (
    // This navigation bar only appears on screens smaller than large (lg)
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-base-200 shadow-xl z-50">
      <nav className="flex justify-around h-16">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
          >
            <div className="relative">
              <item.icon size={24} />
              {item.count > 0 && item.label === "Cart" && (
                <span className="absolute -top-1 -right-3 bg-accent text-neutral text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                  {item.count}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
