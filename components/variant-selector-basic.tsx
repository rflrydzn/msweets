"use client";

import * as React from "react";
import VariantSelectorBasic, {
  VariantItem,
} from "@/components/variant-selector";

import { ProductOptions } from "@/lib/types/types";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export default function VariantSelector_Basic_Ex_04({
  options,
}: {
  options: ProductOptions;
}) {
  const [selectedSize, setSelectedSize] = React.useState(
    options.prices?.[0]?.price.toString() || ""
  );
  return (
    <div className="space-y-8">
      <div className=" bg-white  dark:border-gray-800 dark:bg-gray-900">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {Object.keys(options)}
          </label>
          <VariantSelectorBasic
            value={selectedSize}
            onValueChange={setSelectedSize}
            variants={options.prices}
            className="gap-2"
            itemClassName="rounded-full min-w-[60px] bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
                         data-[state=checked]:border-brand-orange data-[state=checked]:text-brand-orange 
                        dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-white dark:data-[state=checked]:text-gray-900"
            labelClassName="font-medium data-[state=checked]:font-extrabold"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <h2 className="font-medium lg:text-3xl">₱{selectedSize}</h2>
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
