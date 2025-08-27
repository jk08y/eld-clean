import React, { useState } from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password to protect your account."
      linkTo="/login"
      linkText="Back to sign in"
    >
      <form className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral">
            New Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral/60 hover:text-primary"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-neutral">
            Confirm New Password
          </label>
          <div className="mt-1 relative">
            <input
              id="confirm-password"
              name="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral/60 hover:text-primary"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Reset Password
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
