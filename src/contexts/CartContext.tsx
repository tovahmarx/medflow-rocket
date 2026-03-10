import React, { createContext, useContext, useState, useCallback } from 'react';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  updateQty: (productId: string, delta: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  updateQty: () => {},
  clearCart: () => {},
  total: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: Omit<CartItem, 'qty'>, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(c => c.productId === item.productId);
      if (existing) {
        return prev.map(c => c.productId === item.productId ? { ...c, qty: c.qty + qty } : c);
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const updateQty = useCallback((productId: string, delta: number) => {
    setCart(prev => prev.map(c => c.productId === productId ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
