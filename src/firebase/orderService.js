import { db } from './config';
import { collection, addDoc, getDocs, query, where, serverTimestamp, doc, updateDoc, getDoc, limit } from 'firebase/firestore';

export const getAllOrders = async () => {
  const ordersCollectionRef = collection(db, 'orders');
  const data = await getDocs(ordersCollectionRef);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getOrdersByUserId = async (userId) => {
  const ordersCollectionRef = collection(db, 'orders');
  const q = query(ordersCollectionRef, where("userId", "==", userId));
  const data = await getDocs(q);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const createOrder = async (userId, orderData, cartItems) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists() && !userSnap.data().shippingAddress) {
    await updateDoc(userRef, {
      shippingAddress: {
        fullName: orderData.shippingAddress.fullName,
        streetAddress: orderData.shippingAddress.streetAddress,
        city: orderData.shippingAddress.city,
        county: orderData.shippingAddress.county,
      }
    });
  }

  const productIds = cartItems.map(item => item.productId || item.id);

  const newOrderRef = await addDoc(collection(db, 'orders'), {
    userId,
    ...orderData,
    items: cartItems,
    productIds,
    createdAt: serverTimestamp(),
    status: 'Processing',
  });
  return newOrderRef.id;
};

export const getOrderById = async (orderId) => {
  const orderRef = doc(db, 'orders', orderId);
  const orderSnap = await getDoc(orderRef);
  if (orderSnap.exists()) {
    return { ...orderSnap.data(), id: orderSnap.id };
  } else {
    throw new Error("Order not found");
  }
};

export const checkIfUserPurchasedProduct = async (userId, productId) => {
  const ordersRef = collection(db, 'orders');
  const q = query(
    ordersRef,
    where('userId', '==', userId),
    where('productIds', 'array-contains', productId),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const updateOrderStatus = async (orderId, status) => {
  const orderRef = doc(db, 'orders', orderId);
  return await updateDoc(orderRef, { status });
};

