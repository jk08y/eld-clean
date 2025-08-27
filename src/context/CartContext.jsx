import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import * as cartService from '../firebase/cartService';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchCart = useCallback(async () => {
    if (currentUser) {
      setLoading(true);
      try {
        const items = await cartService.getCartItems(currentUser.uid);
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
      setLoading(false);
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItemToCart = async (product) => {
    // The check for currentUser is now handled in the component before calling this
    const toastId = toast.loading("Adding to cart...");
    try {
      await cartService.addToCart(currentUser.uid, product);
      await fetchCart();
      toast.success("Item added to cart!", { id: toastId });
    } catch (error) {
      toast.error("Failed to add item.", { id: toastId });
      console.error(error);
    }
  };

  const updateItemQuantity = async (cartItemId, quantity) => {
    if (!currentUser || quantity < 1) return;
    try {
      await cartService.updateCartItemQuantity(currentUser.uid, cartItemId, quantity);
      await fetchCart();
    } catch (error) {
      toast.error("Failed to update quantity.");
      console.error(error);
    }
  };

  const removeItemFromCart = async (cartItemId) => {
    if (!currentUser) return;
    try {
      await cartService.removeFromCart(currentUser.uid, cartItemId);
      await fetchCart();
      toast.success("Item removed from cart.");
    } catch (error) {
      toast.error("Failed to remove item.");
      console.error(error);
    }
  };
  
  const clearCart = async () => {
    if (!currentUser) return;
    try {
      await cartService.clearCart(currentUser.uid);
      await fetchCart();
    } catch (error) {
        console.error("Failed to clear cart:", error);
    }
  };

  const value = {
    cartItems,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    loading,
    cartSubtotal: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
