import { db } from './config';
import { collection, addDoc, getDocs, serverTimestamp, query, where } from 'firebase/firestore';
import toast from 'react-hot-toast';

const subscribersCollectionRef = collection(db, 'newsletterSubscribers');

export const addSubscriber = async (email) => {
  // Check if email already exists
  const q = query(subscribersCollectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    toast.error("This email is already subscribed.");
    throw new Error("Email already exists.");
  }

  return await addDoc(subscribersCollectionRef, {
    email,
    subscribedAt: serverTimestamp(),
  });
};

export const getSubscribers = async () => {
    const data = await getDocs(subscribersCollectionRef);
    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};
