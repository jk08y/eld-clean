// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/public/HomePage';
import ProductsPage from './pages/public/ProductsPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import AllReviewsPage from './pages/public/AllReviewsPage';
import CartPage from './pages/public/CartPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ProfilePage from './pages/user/ProfilePage';
import OrdersPage from './pages/user/OrdersPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderConfirmationPage from './pages/checkout/OrderConfirmationPage';
import AdminRoute from './components/Auth/AdminRoute';
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminSubscribers from './pages/Admin/AdminSubscribers';
import AdminCategories from './pages/Admin/AdminCategories';
import ScrollToTop from './components/Layout/ScrollToTop';
import OnboardingModal from './components/Auth/OnboardingModal'; // Import the new modal
import { useAuth } from './context/AuthContext'; // Import useAuth to get state

function App() {
  const { currentUser } = useAuth();

  // Determine if the modal should be open: logged in, but profile is not complete
  // The modal cannot be closed until setup is complete, so we don't pass an onClose handler
  const isModalOpen = currentUser && !currentUser.isProfileComplete;

  return (
    <>
      <Layout>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/products/:id/reviews" element={<AllReviewsPage />} />
          <Route path="/products/category/:categoryName" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* User Routes */}
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
          
          {/* Checkout */}
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/order-confirmation/:orderId" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
          </Route>
        </Routes>
      </Layout>
      
      {/* Global Onboarding Modal - Renders over all content if profile is incomplete */}
      <OnboardingModal 
        isOpen={isModalOpen}
        // Passing an empty function because the modal is modal and cannot be manually dismissed 
        // until setup is complete (the modal itself handles dismissal via setTimeout after step 3).
        onClose={() => {}}
      />
    </>
  );
}

export default App;
