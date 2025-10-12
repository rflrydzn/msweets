"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/lib/hooks/useCart";

function MyCart() {
  const { cart, isHydrated } = useCart();

  if (!isHydrated) return <div>Loading...</div>;

  return (
    <div>
      <h2>Basket</h2>
      {cart?.map((product) => (
        <div
          key={product.name}
          className="max-w-7xl flex flex-col justify-between md:flex-row "
        >
          <div className="flex">
            <img src={product.image_url} className="aspect-square w-15" />
            <div>
              <h2>{product.name}</h2>
              <span className="text-brand-gray">{product.option.label}</span>
            </div>
          </div>
          <div>
            P {product.option.price * product.quantity} <Checkbox />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyCart;
