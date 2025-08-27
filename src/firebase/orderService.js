import { db } from './config';
import { collection, getDocs, doc, updateDoc, query, where, addDoc, serverTimestamp, getDoc, limit } from 'firebase/firestore';

const ordersCollectionRef = collection(db, 'orders');

export const createOrder = async (orderData) => {
  // Create an array of just the product IDs for easier querying later
  const productIds = orderData.items.map(item => item.productId);
  
  return await addDoc(ordersCollectionRef, {
    ...orderData,
    productIds, // Add the new field
    status: 'Processing',
    createdAt: serverTimestamp(),
  });
};

export const checkIfUserPurchasedProduct = async (userId, productId) => {
  if (!userId || !productId) return false;
  const q = query(
    ordersCollectionRef, 
    where("userId", "==", userId), 
    where("productIds", "array-contains", productId),
    limit(1) // We only need to know if at least one exists
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const getOrderById = async (orderId) => {
  const orderDoc = doc(db, 'orders', orderId);
  return await getDoc(orderDoc);
};

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
