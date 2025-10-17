import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav'; // Import the new mobile nav

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Header />
      {/* The main content area.
        The pb-20 class adds necessary padding for mobile screens 
        to ensure the content scrolls above the fixed 
        bottom navigation bar (which is approx. h-16).
      */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 pb-20 md:pb-10">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Layout;
