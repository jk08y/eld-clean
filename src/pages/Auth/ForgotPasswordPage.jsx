// src/pages/Auth/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { passwordReset } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await passwordReset(email);
      toast.success('Password reset link sent! Please check your email.');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset link.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email and we'll send you a reset link."
      linkTo="/login"
      linkText="Back to sign in"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-neutral mb-1">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-base-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-full shadow-lg text-lg font-bold text-white bg-primary hover:bg-primary/90 transition-colors disabled:bg-primary/50 mt-4"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
