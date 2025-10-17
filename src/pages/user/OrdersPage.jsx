// src/pages/user/OrdersPage.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// This page now simply redirects the user to the centralized profile/dashboard
// where the order history is integrated.
const OrdersPage = () => {
  return <Navigate to="/profile" replace />;
};

export default OrdersPage;
