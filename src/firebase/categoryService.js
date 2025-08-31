import { db, storage } from './config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export const getCategories = async () => {
    const categoriesCollectionRef = collection(db, 'categories');
    const data = await getDocs(categoriesCollectionRef);
    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

const uploadImage = async (imageFile) => {
    if (!imageFile || typeof imageFile === 'string') return imageFile || null;
    const imageRef = ref(storage, `categories/${uuidv4()}_${imageFile.name}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    return await getDownloadURL(snapshot.ref);
};

export const addCategory = async (categoryData, imageFile) => {
    const imageUrl = await uploadImage(imageFile);
    const categoriesCollectionRef = collection(db, 'categories');
    return await addDoc(categoriesCollectionRef, { ...categoryData, imageUrl });
};

export const updateCategory = async (categoryId, categoryData, imageFile) => {
    const imageUrl = await uploadImage(imageFile);
    const categoryDoc = doc(db, 'categories', categoryId);
    return await updateDoc(categoryDoc, { ...categoryData, imageUrl });
};

export const deleteCategory = async (categoryId, imageUrl) => {
    // Delete the image from Firebase Storage if it exists
    if (imageUrl) {
        try {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
        } catch (error) {
            // Log the error but don't block deletion of the firestore doc
            console.error("Failed to delete category image from storage:", error);
        }
    }

    // Delete the document from Firestore
    const categoryDoc = doc(db, 'categories', categoryId);
    return await deleteDoc(categoryDoc);
};
