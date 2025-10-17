import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BarChart2, ShoppingCart, Package, Users, Mail, Menu, X, Tag } from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { to: "/admin", icon: BarChart2, text: "Dashboard" },
    { to: "/admin/products", icon: Package, text: "Products" },
    { to: "/admin/categories", icon: Tag, text: "Categories" },
    { to: "/admin/orders", icon: ShoppingCart, text: "Orders" },
    { to: "/admin/subscribers", icon: Mail, text: "Subscribers" },
  ];

  const commonLinkClasses = "flex items-center space-x-3 px-4 py-3 transition-colors duration-200 rounded-lg";
  // Updated colors to match the new primary/base scheme
  const activeLinkClasses = "bg-primary text-white font-bold";
  const inactiveLinkClasses = "text-neutral/80 hover:bg-base-200";

  return (
    <div className="flex h-screen bg-base-100">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 bg-white w-64 transform transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-base-200 flex flex-col`}>
        {/* Branding Update */}
        <div className="p-6 text-xl font-bold text-primary border-b">
          Cleaning Products Admin
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin"}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
            >
              <link.icon size={22} />
              <span>{link.text}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white shadow-sm lg:hidden">
          {/* Branding Update */}
          <h1 className="text-xl font-bold text-primary">Cleaning Products Admin</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-neutral">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>

        <footer className="bg-white p-4 text-center text-sm text-neutral/60 border-t">
            {/* Branding Update */}
            © {new Date().getFullYear()} Cleaning Products. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
