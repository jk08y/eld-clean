import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (!currentUser.isAdmin) {
    // Logged in but not an admin, redirect to home
    toast.error("You are not authorized to access this page.");
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
