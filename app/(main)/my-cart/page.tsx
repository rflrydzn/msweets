"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useFetchTableProducts } from "@/lib/hooks/useFetchTableProducts";

function myCart() {
  const { data: Products } = useFetchTableProducts();
  return (
    <div>
      <h2>Basket</h2>
      {Products?.map((product) => (
        <div
          key={product.name}
          className="max-w-7xl flex flex-col justify-between md:flex-row "
        >
          <div className="flex">
            <img src={product.image_url} className="aspect-square w-15" />
            <div>
              <h2>{product.name}</h2>
              <span className="text-brand-gray">some variants</span>
            </div>
          </div>
          <div>
            P {product.price} <Checkbox />
          </div>
        </div>
      ))}
    </div>
  );
}

export default myCart;
