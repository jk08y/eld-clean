import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, linkTo, linkText }) => {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral">{title}</h2>
          <p className="mt-2 text-sm text-neutral/70">
            {subtitle}{' '}
            <Link to={linkTo} className="font-medium text-primary hover:text-primary/80">
              {linkText}
            </Link>
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md border border-base-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
