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
      title="Forgot your password?"
      subtitle="No problem. Enter your email and we'll send you a reset link."
      linkTo="/login"
      linkText="Back to sign in"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:bg-primary/50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
