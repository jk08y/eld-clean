import { db, storage } from './config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const categoriesCollectionRef = collection(db, 'categories');

export const getCategories = async () => {
  const data = await getDocs(categoriesCollectionRef);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const addCategory = async (categoryData, imageFile) => {
  let imageUrl = '';
  if (imageFile) {
    const imageRef = ref(storage, `categories/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    imageUrl = await getDownloadURL(snapshot.ref);
  }
  return await addDoc(categoriesCollectionRef, { ...categoryData, imageUrl });
};

// Update and Delete functions can be added here later as needed
