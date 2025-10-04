"use client";

import * as React from "react";
import VariantSelectorBasic, {
  VariantItem,
} from "@/components/variant-selector";
import { useFetchProducts } from "@/lib/hooks/useFetchGroupedProducts";
import { fetchProductDetails } from "@/lib/fetchProductDetails";
import { ProductOptions } from "@/lib/types/types";

// Example size variants
// const sizeVariants: VariantItem[] = [
//   { id: "size-xs", label: "XS", value: "size-xs" },
//   { id: "size-s", label: "S", value: "size-s" },
//   { id: "size-m", label: "M", value: "size-m" },
//   { id: "size-l", label: "L", value: "size-l" },
//   { id: "size-xl", label: "XL", value: "size-xl" },
// ];

export default function VariantSelector_Basic_Ex_04({
  options,
}: {
  options: ProductOptions;
}) {
  const [selectedSize, setSelectedSize] = React.useState("size-m");
  React.useEffect(() => console.log("product", options));
  return (
    <div className="space-y-8">
      <div className=" bg-white  dark:border-gray-800 dark:bg-gray-900">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {Object.keys(options)}
          </label>
          {/* <VariantSelectorBasic
            value={selectedSize}
            onValueChange={setSelectedSize}
            variants={options?.pieces}
            className="gap-2"
            itemClassName="rounded-full min-w-[60px] bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
                         data-[state=checked]:border-brand-orange data-[state=checked]:text-brand-orange 
                        dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-white dark:data-[state=checked]:text-gray-900"
            labelClassName="font-medium data-[state=checked]:font-extrabold"
          /> */}
        </div>
      </div>
    </div>
  );
}
