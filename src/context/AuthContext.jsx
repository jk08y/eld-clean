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

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      fullName,
      email,
      isAdmin: import.meta.env.VITE_ADMIN_EMAILS.split(',').includes(email),
    });
    return userCredential;
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (uid, data) => {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, data);
    // Update the local state to reflect changes immediately
    setCurrentUser(prevUser => ({ ...prevUser, ...data }));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setCurrentUser({ ...user, ...userDoc.data() });
        } else {
          setCurrentUser(user);
        }
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
    updateUserProfile, // Expose the new function
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
