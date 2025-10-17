// src/firebase/categoryService.js
import { db, storage } from './config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export const getCategories = async () => {
    const categoriesCollectionRef = collection(db, 'categories');
    const data = await getDocs(categoriesCollectionRef);
    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

const uploadImage = async (imageFile) => {
    // Check if imageFile is null or a placeholder string
    if (!imageFile || typeof imageFile === 'string') return imageFile || null;
    
    try {
        const imageRef = ref(storage, `categories/${uuidv4()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        return await getDownloadURL(snapshot.ref);
    } catch (error) {
        console.error("Error uploading category image:", error);
        toast.error("Failed to upload image. Please try again.");
        throw new Error("Image upload failed.");
    }
};

export const addCategory = async (categoryData, imageFile) => {
    const imageUrl = await uploadImage(imageFile);
    const categoriesCollectionRef = collection(db, 'categories');
    // Ensure that imageUrl is only added if it exists (not null)
    const dataToSave = imageUrl ? { ...categoryData, imageUrl } : categoryData;
    
    return await addDoc(categoriesCollectionRef, dataToSave);
};

export const updateCategory = async (categoryId, categoryData, imageFile) => {
    // If imageFile is present, upload it. If it's null, we keep the existing URL from categoryData.
    const imageUrl = await uploadImage(imageFile);
    const categoryDoc = doc(db, 'categories', categoryId);
    
    // Merge new image URL (if uploaded) with existing data
    const dataToUpdate = imageUrl ? { ...categoryData, imageUrl } : categoryData;
    
    return await updateDoc(categoryDoc, dataToUpdate);
};

export const deleteCategory = async (categoryId, imageUrl) => {
    // Delete the image from Firebase Storage if it exists
    if (imageUrl) {
        try {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
        } catch (error) {
            console.warn("Could not delete old category image from storage:", error);
            // Non-fatal: continue to delete Firestore document
        }
    }

    // Delete the document from Firestore
    const categoryDoc = doc(db, 'categories', categoryId);
    return await deleteDoc(categoryDoc);
};
