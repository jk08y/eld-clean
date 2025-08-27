import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { currentUser, logOut, updateUserProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || '');
      setPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    try {
      await updateUserProfile(currentUser.uid, { fullName, phone });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">My Profile</h1>
        <p className="text-lg text-neutral/70 mt-2">Update your personal information</p>
      </div>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border border-base-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral">Email Address</label>
            <input
              id="email"
              type="email"
              value={currentUser?.email || ''}
              disabled
              className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 bg-base-200 text-neutral/70 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-neutral">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral">Phone Number</label>
            <PhoneInput
              id="phone"
              international
              defaultCountry="KE"
              value={phone}
              onChange={setPhone}
              className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 gap-4">
             <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary/90 transition-colors duration-300 disabled:bg-primary/50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
             <button
                type="button"
                onClick={logOut}
                className="w-full sm:w-auto bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600 transition-colors duration-300"
              >
                Log Out
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
