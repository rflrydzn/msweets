"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/hooks/useCart";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/quantity-selector";
import { useState } from "react";
import { CartItem } from "@/lib/types/types";

function CartClient() {
  const { cart, isHydrated } = useCart();
  const [isSelectAll, setIsSelectAll] = useState(true);
  const [selectedCart, setSelectedCart] = useState<CartItem[]>(cart);

  if (!isHydrated) return <div>Loading...</div>;

  const handleSelectAll = () => {
    setSelectedCart((prev) =>
      prev.map((item) => ({ ...item, selected: !!isSelectAll }))
    );
    setIsSelectAll(!isSelectAll);
  };

  return (
    <div className="flex items-start gap-3 mb-4">
      <section className="w-4/6 px-3">
        <div className="flex justify-end mb-3">
          <Button
            onClick={handleSelectAll}
            variant="ghost"
            size="sm"
            className="text-brand-gray"
          >
            Select All
          </Button>
        </div>
        {selectedCart?.map((product) => (
          <div key={product.id}>
            <div
              key={product.name}
              className="max-w-7xl flex flex-col justify-between md:flex-row "
            >
              <div className="flex gap-3">
                <img src={product.image_url} className="w-24 rounded-lg" />
                <div>
                  <h2 className="font-bold">{product.name}</h2>
                  <span className="text-brand-gray">
                    {product.option.label}
                  </span>
                  <QuantitySelector className="text-brand-gray" size="sm" />
                </div>
              </div>
              <div className="flex gap-3">
                <p className="font-bold text-xl">
                  ₱{product.option.price * product.quantity}{" "}
                </p>
                <span>
                  <Checkbox
                    checked={product.selected}
                    onCheckedChange={(checked) =>
                      setSelectedCart((prev) =>
                        prev.map((item) =>
                          item.id === product.id
                            ? { ...item, selected: !!checked }
                            : item
                        )
                      )
                    }
                  />
                </span>
              </div>
            </div>

            <Separator className="my-3" />
          </div>
        ))}
      </section>
      <section className="w-2/6 border-2 rounded-lg p-3 space-y-1">
        <h1 className="font-bold">Order Summary</h1>
        <div className="flex justify-between">
          <h2 className="text-muted-foreground font-medium">Subtotal</h2>
          <p className="text-xl">
            ₱
            {selectedCart.reduce(
              (acc, item) =>
                item.selected ? acc + item.option.price * item.quantity : acc,
              0
            )}
          </p>
        </div>

        <Separator />
        <div className="flex justify-between">
          <h2 className="text-muted-foreground font-medium">Total</h2>
          <p className="text-2xl font-medium">
            ₱
            {selectedCart.reduce(
              (acc, item) =>
                item.selected ? acc + item.option.price * item.quantity : acc,
              0
            )}
          </p>
        </div>
        <Button className="w-full bg-brand-red py-6 text-md">Order</Button>
      </section>
    </div>
  );
}

export default CartClient;
