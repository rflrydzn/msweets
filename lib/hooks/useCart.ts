import { useEffect, useState } from "react";
import { CartItem } from "../types/types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("myCart");
      return storedData ? JSON.parse(storedData) : [];
    }
    return [];
  });
  const [isHydrated, setIsHydrated] = useState(false);

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
    const storedData = localStorage.getItem("myCart");
    if (storedData) {
      setCart(JSON.parse(storedData));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("myCart", JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  return { cart, addToCart, isHydrated };
}
