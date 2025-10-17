// src/components/Auth/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, linkTo, linkText, brandText = "Cleaning Products" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-base-100 p-4 sm:p-6 pt-12 sm:pt-16 pb-12">
      <div className="max-w-md w-full space-y-8">
        
        {/* Brand/Logo Area */}
        <div className="text-center">
          <Link to="/" className="text-3xl font-bold text-primary">
            {brandText}
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl border border-base-200">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral">{title}</h2>
            <p className="mt-2 text-sm text-neutral/70">
              {subtitle}{' '}
              {linkTo && linkText && (
                <Link to={linkTo} className="font-semibold text-primary hover:text-primary/80 transition-colors">
                  {linkText}
                </Link>
              )}
            </p>
          </div>
          
          {children}

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
