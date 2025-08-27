import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return toast.error('Please fill out all fields.');
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error("Error sending message:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="text-center pt-16 pb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">Get In Touch</h1>
        <p className="text-lg text-neutral/70 mt-4 max-w-3xl mx-auto">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-base-300">
            <h2 className="text-2xl font-bold text-neutral mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral">Message</label>
                <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} required className="mt-1 w-full border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
              </div>
              <div>
                <button type="submit" disabled={loading} className="w-full bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary/90 transition-colors duration-300 disabled:bg-primary/50">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-neutral">Email</h3>
                <p className="text-neutral/80">info@eldclean.co.ke</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-neutral">Phone</h3>
                <p className="text-neutral/80">+254 700 000 000</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-neutral">Address</h3>
                <p className="text-neutral/80">Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
