// src/pages/Auth/RegisterPage.jsx
import React, { useState } from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(formData.email, formData.password, formData.fullName);
      toast.success('Account created successfully! Welcome!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Failed to create an account.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Already a customer?"
      linkTo="/login"
      linkText="Sign in"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-neutral mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            onChange={handleChange}
            className="w-full border border-base-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          />
        </div>
        
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
            onChange={handleChange}
            className="w-full border border-base-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-neutral mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full border border-base-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral/60 hover:text-primary transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-full shadow-lg text-lg font-bold text-white bg-primary hover:bg-primary/90 transition-colors disabled:bg-primary/50 mt-4"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
