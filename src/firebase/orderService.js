// src/firebase/orderService.js
import { db } from './config';
import { collection, addDoc, getDocs, query, where, serverTimestamp, doc, updateDoc, setDoc, getDoc, limit } from 'firebase/firestore';

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

/**
 * Creates a new order and updates the user's saved shipping address if necessary.
 * @param {string} userId - The ID of the user placing the order.
 * @param {object} orderData - Contains total, shippingAddress, paymentMethod, shippingFee.
 * @param {array} cartItems - The list of items being ordered.
 */
export const createOrder = async (userId, orderData, cartItems) => {
  if (!userId) throw new Error("User ID is required to create an order.");
  
  const { shippingAddress, total, paymentMethod } = orderData;
  const shippingFee = 300; 
  
  // 1. Prepare data for user profile update (fullName + shippingAddress)
  const userRef = doc(db, 'users', userId);
  const userUpdateData = {
    fullName: shippingAddress.fullName,
    shippingAddress: {
      fullName: shippingAddress.fullName,
      streetAddress: shippingAddress.address,
      city: shippingAddress.city,
      county: shippingAddress.county,
    }
  };

  // Robust User Document Update (Upsert Logic)
  try {
    await updateDoc(userRef, userUpdateData);
  } catch (error) {
    if (error.code === 'not-found' || error.message.includes('No document to update')) {
        await setDoc(userRef, userUpdateData, { merge: true });
    } else {
        throw error;
    }
  }

  // 2. Prepare product list and IDs for the order (FIX for "undefined" error)
  const orderItems = cartItems.map(item => ({
    productId: item.productId || item.id, 
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.imageUrl,
  }));
  
  const productIds = orderItems.map(item => item.productId);

  // 3. Create the new order document
  const newOrderRef = await addDoc(collection(db, 'orders'), {
    userId,
    total,
    shippingFee,
    shippingAddress,
    paymentMethod,
    items: orderItems,
    productIds,
    createdAt: serverTimestamp(),
    status: 'Processing',
  });
  return newOrderRef.id;
};

/**
 * Retrieves a single order by ID.
 * @param {string} orderId - The ID of the order to retrieve.
 * @returns {Promise<object>} - The order object including its ID.
 */
export const getOrderById = async (orderId) => {
  if (!orderId) throw new Error("Order ID must be provided.");
  
  const orderRef = doc(db, 'orders', orderId);
  const orderSnap = await getDoc(orderRef);
  
  if (orderSnap.exists()) {
    const orderData = { 
        ...orderSnap.data(), 
        id: orderSnap.id 
    };
    
    // Ensure all necessary fields exist, especially if fetching old orders
    if (typeof orderData.shippingFee === 'undefined') {
        orderData.shippingFee = 300; 
    }
    
    // Ensure createdAt is structured for consumption
    if (orderData.createdAt && orderData.createdAt.seconds) {
        orderData.createdAt = new Date(orderData.createdAt.seconds * 1000);
    }
    
    return orderData;
  } else {
    // Return null or throw a specific error if not found
    throw new Error("Order document not found in database.");
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
