// src/components/Auth/OnboardingModal.jsx
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const initialFormData = {
  fullName: '',
  phone: '',
  streetAddress: '',
  city: '',
  county: '',
};

const OnboardingModal = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && isOpen) {
      // Pre-fill form with any existing data
      setFormData({
        fullName: currentUser.fullName || '',
        phone: currentUser.phone || '',
        streetAddress: currentUser.shippingAddress?.streetAddress || '',
        city: currentUser.shippingAddress?.city || '',
        county: currentUser.shippingAddress?.county || '',
      });
      // Always start at step 1 if opening for completion
      if (!currentUser.isProfileComplete) {
         setStep(1);
      }
    }
  }, [currentUser, isOpen]);

  if (!isOpen || !currentUser) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleStepOneSubmit = () => {
    if (!formData.fullName || !formData.phone || formData.phone.length < 10) {
      toast.error('Please enter your full name and a valid phone number.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.streetAddress || !formData.city || !formData.county) {
      toast.error('Please complete all shipping address fields.');
      return;
    }

    setLoading(true);
    try {
      const dataToSave = {
        fullName: formData.fullName,
        phone: formData.phone,
        shippingAddress: {
          streetAddress: formData.streetAddress,
          city: formData.city,
          county: formData.county,
        },
        isProfileComplete: true, // Crucial flag to mark completion
      };

      await updateUserProfile(currentUser.uid, dataToSave);
      
      // Update successful, proceed to confirmation
      toast.success('Profile setup complete! Welcome!');
      setStep(3); 
      setTimeout(onClose, 2000); 

    } catch (error) {
      console.error('Onboarding failed:', error);
      // If error occurs, inform user and keep them on the modal
      toast.error('Setup failed due to permissions or connection issues. Please retry.');
      setLoading(false);
    }
    // Note: setLoading(false) only runs on success or if caught error
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-neutral">Your Details</h3>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-neutral mb-1">Full Name</label>
              <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral mb-1">Phone Number</label>
              <PhoneInput defaultCountry="KE" international value={formData.phone} onChange={handlePhoneChange} className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <button type="button" onClick={handleStepOneSubmit} className="w-full bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
              <span>Next: Address</span> <ArrowRight size={20} />
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-neutral">Default Shipping Address</h3>
            <div>
              <label htmlFor="streetAddress" className="block text-sm font-medium text-neutral mb-1">Street Address</label>
              <input type="text" name="streetAddress" id="streetAddress" value={formData.streetAddress} onChange={handleInputChange} required className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-neutral mb-1">City</label>
                <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} required className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="county" className="block text-sm font-medium text-neutral mb-1">County</label>
                <input type="text" name="county" id="county" value={formData.county} onChange={handleInputChange} required className="w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="flex justify-between space-x-4 pt-2">
              <button type="button" onClick={() => setStep(1)} className="w-1/2 text-neutral font-semibold py-3 rounded-full border border-base-300 hover:bg-base-200 transition-colors">Back</button>
              <button onClick={handleSubmit} disabled={loading} className="w-1/2 bg-accent text-neutral font-bold py-3 px-6 rounded-full hover:bg-accent/90 transition-colors disabled:bg-accent/50">
                {loading ? 'Saving...' : 'Finish Setup'}
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center py-10 space-y-4">
             <CheckCircle size={64} className="text-green-500 mx-auto"/>
             <h3 className="text-2xl font-bold text-neutral">Setup Complete!</h3>
             <p className="text-neutral/70">You can now proceed with shopping and ordering.</p>
             <button onClick={onClose} className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary/90 transition-colors">
                Continue to Site
             </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col relative transform transition-all duration-300">
        
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-primary">Setup Your Profile</h2>
          {/* Allow closing only after setup is complete (Step 3) */}
          {step === 3 && <button onClick={onClose} className="text-neutral/60 hover:text-primary"><X size={24} /></button>}
        </div>

        <form onSubmit={(e) => e.preventDefault()} className={`flex-grow overflow-y-auto p-6 ${step === 3 ? 'hidden' : ''}`}>
            {renderStep()}
        </form>
        
        {step === 3 && renderStep()}
        
      </div>
    </div>
  );
};

export default OnboardingModal;
