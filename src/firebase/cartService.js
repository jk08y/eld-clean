import { db } from './config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

// Note: Carts will be a subcollection under each user
const getCartCollectionRef = (userId) => {
  return collection(db, 'users', userId, 'cart');
};

export const getCartItems = async (userId) => {
  const cartCollectionRef = getCartCollectionRef(userId);
  const data = await getDocs(cartCollectionRef);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const addToCart = async (userId, product) => {
  const cartCollectionRef = getCartCollectionRef(userId);
  // Check if item already exists
  const q = query(cartCollectionRef, where("productId", "==", product.id));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Item exists, update quantity
    const existingDoc = querySnapshot.docs[0];
    const newQuantity = existingDoc.data().quantity + 1;
    const cartItemDoc = doc(db, 'users', userId, 'cart', existingDoc.id);
    return await updateDoc(cartItemDoc, { quantity: newQuantity });
  } else {
    // Item doesn't exist, add new
    return await addDoc(cartCollectionRef, {
      productId: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      imageUrl: (product.imageUrls && product.imageUrls[0]) || '',
      quantity: 1,
    });
  }
};

export const updateCartItemQuantity = async (userId, cartItemId, quantity) => {
  const cartItemDoc = doc(db, 'users', userId, 'cart', cartItemId);
  return await updateDoc(cartItemDoc, { quantity });
};

export const removeFromCart = async (userId, cartItemId) => {
  const cartItemDoc = doc(db, 'users', userId, 'cart', cartItemId);
  return await deleteDoc(cartItemDoc);
};

export const clearCart = async (userId) => {
    const cartCollectionRef = getCartCollectionRef(userId);
    const querySnapshot = await getDocs(cartCollectionRef);
    const deletePromises = querySnapshot.docs.map(document => 
        deleteDoc(doc(db, 'users', userId, 'cart', document.id))
    );
    return Promise.all(deletePromises);
};
