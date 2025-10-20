"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { showSuccess, showError } from "@/utils/toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity: number) => void;
  updateQuantity: (productId: string, size: string, color: string, newQuantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, size: string, color: string, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        if (newQuantity > product.stock) {
          showError(`Stok ${product.name} hanya tersedia ${product.stock}.`);
          return prevItems;
        }
        updatedItems[existingItemIndex].quantity = newQuantity;
        showSuccess(`Jumlah ${product.name} di keranjang diperbarui.`);
        return updatedItems;
      } else {
        if (quantity > product.stock) {
          showError(`Stok ${product.name} hanya tersedia ${product.stock}.`);
          return prevItems;
        }
        showSuccess(`${quantity}x ${product.name} ditambahkan ke keranjang.`);
        return [...prevItems, { product, size, color, quantity }];
      }
    });
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, color: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.product.id === productId && item.size === size && item.color === color) {
          if (newQuantity <= 0) {
            showError("Jumlah tidak boleh kurang dari 1.");
            return item; // Don't update if quantity is 0 or less
          }
          if (newQuantity > item.product.stock) {
            showError(`Stok ${item.product.name} hanya tersedia ${item.product.stock}.`);
            return item; // Don't update if quantity exceeds stock
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove items if quantity becomes 0 (though we prevent it from going <=0)
      return updatedItems;
    });
  }, []);

  const removeFromCart = useCallback((productId: string, size: string, color: string) => {
    setCartItems((prevItems) => {
      showSuccess("Produk dihapus dari keranjang.");
      return prevItems.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    showSuccess("Keranjang belanja dikosongkan.");
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};