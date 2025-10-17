// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// CRITICAL FIX: Parse VITE_ADMIN_EMAILS once and clean the values.
const ADMIN_EMAILS = import.meta.env.VITE_ADMIN_EMAILS
  .replace(/'/g, '') // Remove single quotes
  .split(',')
  .map(email => email.trim().toLowerCase()); // Trim whitespace and convert to lowercase

const isEmailInAdminList = (email) => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

// Helper function to remove undefined/null values for Firestore updates
const cleanData = (data) => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== null && v !== undefined)
  );
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const userData = {
      uid: user.uid,
      fullName,
      email,
      isProfileComplete: false, 
      // Use the robust check
      isAdmin: isEmailInAdminList(email),
    };

    await setDoc(doc(db, 'users', user.uid), userData);
    return userCredential;
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      const userData = {
        uid: user.uid,
        fullName: user.displayName || 'New User',
        email: user.email,
        isProfileComplete: false,
        // Use the robust check
        isAdmin: isEmailInAdminList(user.email),
      };
      await setDoc(userDocRef, userData);
    }
    return userCredential;
  };

  const logOut = () => {
    return signOut(auth);
  };

  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (uid, data) => {
    const userDocRef = doc(db, 'users', uid);
    const cleanedData = cleanData(data);
    
    if (Object.keys(cleanedData).length > 0) {
      await updateDoc(userDocRef, cleanedData);
      
      setCurrentUser(prevUser => ({ 
        ...prevUser, 
        ...cleanedData 
      }));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        let userData = {
            uid: user.uid,
            email: user.email,
            fullName: user.displayName || user.email,
        };

        if (userDoc.exists()) {
          userData = {
            ...userData,
            ...userDoc.data(),
          };
        } else {
          // If the user doc doesn't exist (shouldn't happen for email/password but possible for old Google sign-ins)
          // We set isAdmin based on the robust email check as a fallback.
          userData.isAdmin = isEmailInAdminList(user.email);
        }
        
        // Ensure critical flags are always present, defaulting if missing
        userData.isProfileComplete = userData.isProfileComplete ?? false;
        userData.isAdmin = userData.isAdmin ?? false;

        setCurrentUser(userData);

      } else {
        setCurrentUser(null);
      }
      setLoading(false); 
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    googleSignIn,
    logOut,
    passwordReset,
    updateUserProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
