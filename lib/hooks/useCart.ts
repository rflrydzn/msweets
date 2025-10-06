import { useEffect, useState } from "react";

interface CartItem {
  id: number; // unique id (product + variant)
  name: string;
  image_url: string;
  price: number;
  option: { id: number; label: string; price: number };
  quantity: number;
  variant?: string;
  category?: string;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("myCart");
      return storedData ? JSON.parse(storedData) : [];
    }
    return [];
  });

  const addToCart = (CartItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === CartItem.id);
      if (existing) {
        return prev.map((p) =>
          p.id === CartItem.id
            ? { ...p, quantity: p.quantity + CartItem.quantity }
            : p
        );
      }
      return [...prev, CartItem];
    });
  };

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

  return { cart, addToCart };
}
