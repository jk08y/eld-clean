import React, { useState, useEffect } from 'react';
import { getSubscribers } from '../../firebase/newsletterService';
import toast from 'react-hot-toast';

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const data = await getSubscribers();
        setSubscribers(data);
      } catch (error) {
        toast.error("Failed to fetch subscribers.");
      }
      setLoading(false);
    };
    fetchSubscribers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral mb-6">Newsletter Subscribers</h1>
      <div className="bg-white rounded-lg shadow-md border border-base-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-base-300 bg-base-100/50">
                <th className="p-4 font-semibold">Email Address</th>
                <th className="p-4 font-semibold">Subscription Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="2" className="p-4 text-center">Loading...</td></tr>
              ) : subscribers.length > 0 ? (
                subscribers.map(sub => (
                  <tr key={sub.id} className="border-b border-base-200 hover:bg-base-100/50">
                    <td className="p-4 font-medium text-neutral">{sub.email}</td>
                    <td className="p-4 text-neutral/80">
                      {new Date(sub.subscribedAt?.seconds * 1000).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="2" className="p-4 text-center">No subscribers yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscribers;
