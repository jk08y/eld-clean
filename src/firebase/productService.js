import { db, storage } from './config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const productsCollectionRef = collection(db, 'products');

export const getProducts = async () => {
  const data = await getDocs(productsCollectionRef);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

const uploadImages = async (imageFiles) => {
  const uploadPromises = imageFiles.map(file => {
    const imageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    return uploadBytes(imageRef, file).then(snapshot => getDownloadURL(snapshot.ref));
  });
  return await Promise.all(uploadPromises);
};

export const addProduct = async (productData, imageFiles) => {
  let newImageUrls = [];
  if (imageFiles && imageFiles.length > 0) {
    newImageUrls = await uploadImages(imageFiles);
  }
  return await addDoc(productsCollectionRef, { ...productData, imageUrls: newImageUrls });
};

export const updateProduct = async (id, productData, newImageFiles) => {
  const productDoc = doc(db, 'products', id);
  let updatedImageUrls = productData.imageUrls || [];

  if (newImageFiles && newImageFiles.length > 0) {
    const newUrls = await uploadImages(newImageFiles);
    updatedImageUrls = [...updatedImageUrls, ...newUrls];
  }
  
  // Here you could add logic to delete images that were removed in the modal
  
  return await updateDoc(productDoc, { ...productData, imageUrls: updatedImageUrls });
};

export const deleteProduct = async (id, imageUrls) => {
  if (imageUrls && imageUrls.length > 0) {
    const deletePromises = imageUrls.map(url => {
      try {
        const imageRef = ref(storage, url);
        return deleteObject(imageRef);
      } catch (error) {
        console.error("Image not found, continuing to delete document:", error.message);
        return Promise.resolve();
      }
    });
    await Promise.all(deletePromises);
  }
  const productDoc = doc(db, 'products', id);
  return await deleteDoc(productDoc);
};
