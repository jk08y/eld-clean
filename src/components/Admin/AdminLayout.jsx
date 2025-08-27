import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ListOrdered, Mail, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { to: '/admin', text: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { to: '/admin/products', text: 'Products', icon: <ShoppingBag size={20} /> },
    { to: '/admin/orders', text: 'Orders', icon: <ListOrdered size={20} /> },
    { to: '/admin/subscribers', text: 'Subscribers', icon: <Mail size={20} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
      </div>
      <nav className="mt-6 flex-1">
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin'}
            onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            {link.icon}
            <span className="ml-4">{link.text}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="relative min-h-screen md:flex">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <aside className={`bg-neutral text-white w-64 fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
        <SidebarContent />
      </aside>
      <div className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        <header className="bg-white text-gray-800 flex justify-between items-center md:hidden sticky top-0 z-30 shadow-md h-16">
          <NavLink to="/admin" className="block px-4 text-primary font-bold">Eld Clean Admin</NavLink>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-4 focus:outline-none focus:bg-gray-200">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
        <main className="flex-grow p-6 sm:p-10 bg-base-100">
          <Outlet />
        </main>
        <footer className="bg-white p-4 text-center text-neutral/60 text-sm border-t border-base-300">
          &copy; {new Date().getFullYear()} Eld Clean. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
