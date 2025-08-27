import { db } from './config';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

const ordersCollectionRef = collection(db, 'orders');

export const getAllOrders = async () => {
  const data = await getDocs(ordersCollectionRef);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getOrdersByUserId = async (userId) => {
  const q = query(ordersCollectionRef, where("userId", "==", userId));
  const data = await getDocs(q);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const orderDoc = doc(db, 'orders', orderId);
  return await updateDoc(orderDoc, { status: newStatus });
};
