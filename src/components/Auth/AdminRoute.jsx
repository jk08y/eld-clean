// src/components/Auth/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // CRITICAL FIX: The component MUST wait for loading to be false. 
  // This state ensures all user data, including isAdmin, has been fetched from Firestore.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <p className="text-xl text-neutral">Verifying admin access...</p>
      </div>
    );
  }

  // 1. Not logged in (loading is false, but user is null)
  if (!currentUser) {
    // We navigate to login, and include the 'from' state to return here later
    return <Navigate to="/login" state={{ from: { pathname: '/admin' } }} replace />;
  }

  // 2. Logged in but not an admin (loading is false, user is not null, isAdmin is false/undefined)
  // We use the nullish coalescing operator to default undefined to false for a safe check.
  if (!currentUser.isAdmin) {
    toast.error("You are not authorized to access the Admin Panel.");
    return <Navigate to="/" />;
  }

  // 3. Logged in and is admin, grant access
  return children;
};

export default AdminRoute;
