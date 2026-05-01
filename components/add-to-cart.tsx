"use client";
import { useCart } from "@/lib/hooks/useCart";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "@/lib/types/types";
import { toast } from "sonner";
function AddToCart({ CartItem }: { CartItem: CartItem }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(CartItem);

    toast.success(`Added to cart: ${CartItem.name}`, {
      position: "top-center",
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="border-brand-red text-brand-red px-8 py-5"
    >
      <ShoppingCart />
    </Button>
  );
}

export default AddToCart;
