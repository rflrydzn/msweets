import RecommendedProducts from "./components/recommended-products";
import CartClient from "./components/cart-client";

async function MyCart() {
  return (
    <div className="max-w-7xl mx-auto">
      <CartClient />
      <RecommendedProducts />
    </div>
  );
}

export default MyCart;
