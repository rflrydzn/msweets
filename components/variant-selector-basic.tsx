"use client";

import * as React from "react";
import VariantSelectorBasic, {
  VariantItem,
} from "@/components/variant-selector";

import { ProductOptions } from "@/lib/types/types";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import QuantitySelector from "./quantity-selector";
import { useState, useMemo } from "react";
import { Label } from "./ui/label";
export default function VariantSelector_Basic_Ex_04({
  options,
}: {
  options: ProductOptions;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    (options.prices?.[0]?.price * quantity).toString() || ""
  );

  const totalPrice = Number(selectedSize) * quantity;

  // const totalPrice = useMemo(() => {
  //   const base = Number(selectedSize);
  //   return base * quantity;
  // }, [quantity, selectedSize]);
  return (
    <div className="space-y-8">
      <div className=" bg-white  dark:border-gray-800 dark:bg-gray-900">
        <div className="space-y-2">
          <Label className="text-sm  font-bold text-gray-700 dark:text-gray-300">
            Size
          </Label>
          <VariantSelectorBasic
            value={selectedSize}
            onValueChange={setSelectedSize}
            variants={options.prices}
            className="gap-2 my-3"
            itemClassName="rounded-full min-w-[60px] bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
                         data-[state=checked]:border-brand-orange data-[state=checked]:text-brand-orange 
                        dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-white dark:data-[state=checked]:text-gray-900"
            labelClassName="font-medium data-[state=checked]:font-extrabold"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm  font-bold text-gray-700 dark:text-gray-300">
            Quantity
          </Label>
          <QuantitySelector onChange={(quantity) => setQuantity(quantity)} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <h2 className="font-medium lg:text-3xl">₱{totalPrice}</h2>

        <div className="flex justify-center gap-2">
          <Button className="bg-brand-red px-8 py-5">Order Now!</Button>
          <Button
            variant="outline"
            className="border-brand-red text-brand-red px-8 py-5"
          >
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
}
