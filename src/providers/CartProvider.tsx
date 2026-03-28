"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FoodItem } from '@/src/types';

export interface CartItem extends FoodItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: FoodItem, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  selectedItemsIds: Set<string>;
  toggleSelectItem: (id: string) => void;
  toggleSelectAllItems: () => void;
  buyNow: (item: FoodItem, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItemsIds, setSelectedItemsIds] = useState<Set<string>>(new Set());

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('saveabite_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
        // Default select all on load
        setSelectedItemsIds(new Set(parsed.map((item: any) => item.id)));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('saveabite_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: FoodItem, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      const newItems = [...prevItems, { ...item, quantity }];
      // Automatically select newly added item
      setSelectedItemsIds(prev => new Set([...Array.from(prev), item.id]));
      return newItems;
    });
  };

  const buyNow = (item: FoodItem, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      let nextItems;
      if (existingItem) {
        nextItems = prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: quantity } : i
        );
      } else {
        nextItems = [...prevItems, { ...item, quantity }];
      }
      // Select ONLY this item for immediate checkout
      setSelectedItemsIds(new Set([item.id]));
      return nextItems;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSelectedItemsIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedItemsIds(new Set());
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItemsIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAllItems = () => {
    setSelectedItemsIds((prev) => {
      if (prev.size === cartItems.length) {
        return new Set();
      } else {
        return new Set(cartItems.map((item) => item.id));
      }
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        selectedItemsIds,
        toggleSelectItem,
        toggleSelectAllItems,
        buyNow,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
