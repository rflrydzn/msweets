import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/hooks/useCart";
import { Button } from "@/components/ui/button";
import RecommendedProducts from "./components/recommended-products";
import CartClient from "./components/cart-client";

async function MyCart() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="font-times font-medium lg:text-2xl my-5">Basket</h1>
      <CartClient />
      <RecommendedProducts />
    </div>
  );
}

export default MyCart;
