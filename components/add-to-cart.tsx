import { useCart } from "@/lib/hooks/useCart";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "@/lib/types/types";

function AddToCart({ CartItem }: { CartItem: CartItem }) {
  const { addToCart } = useCart();

  //   const handleClick = ({ CartItem }: { CartItem: CartItem }) => {
  //     addToCart({
  //       id: CartItem.id,
  //       name: CartItem.name,
  //       image_url: CartItem.image_url,
  //       price: CartItem.price,
  //       quantity: CartItem.quantity,
  //       option: CartItem.option,
  //     });
  //   };

  return (
    <Button
      onClick={() => addToCart(CartItem)}
      variant="outline"
      className="border-brand-red text-brand-red px-8 py-5"
    >
      <ShoppingCart />
    </Button>
  );
}

export default AddToCart;
