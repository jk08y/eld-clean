import { db, storage } from './config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export const getProducts = async () => {
    const productsCollectionRef = collection(db, 'products');
    const data = await getDocs(productsCollectionRef);
    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getProductById = async (productId) => {
    const productDocRef = doc(db, 'products', productId);
    const docSnap = await getDoc(productDocRef);
    if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id };
    } else {
        console.error("No such product!");
        return null;
    }
};

const uploadImages = async (imageFiles) => {
    const imageUrls = [];
    for (const imageFile of imageFiles) {
        if (typeof imageFile === 'string') {
            imageUrls.push(imageFile); // It's an existing URL, keep it
        } else {
            const imageRef = ref(storage, `products/${uuidv4()}_${imageFile.name}`);
            const snapshot = await uploadBytes(imageRef, imageFile);
            const url = await getDownloadURL(snapshot.ref);
            imageUrls.push(url);
        }
    }
    return imageUrls;
};


export const addProduct = async (productData, imageFiles) => {
    const imageUrls = await uploadImages(imageFiles);
    const productsCollectionRef = collection(db, 'products');
    return await addDoc(productsCollectionRef, { ...productData, imageUrls });
};

export const updateProduct = async (productId, productData, imageFiles) => {
    const imageUrls = await uploadImages(imageFiles);
    const productDoc = doc(db, 'products', productId);
    return await updateDoc(productDoc, { ...productData, imageUrls });
};

export const deleteProduct = async (productId) => {
    const productDoc = doc(db, 'products', productId);
    // TODO: Delete images from storage as well
    return await deleteDoc(productDoc);
};

