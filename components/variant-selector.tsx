"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

export interface VariantItem {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
}

interface VariantSelectorBasicProps {
  value: string;
  onValueChange: (value: string) => void;
  variants: VariantItem[];
  className?: string;
  itemClassName?: string;
  labelClassName?: string;
  // selectedClassName is being removed as redundant
}

const VariantSelectorBasic = ({
  className,
  itemClassName,
  labelClassName,
  onValueChange,
  value,
  variants,
}: VariantSelectorBasicProps) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex flex-wrap gap-3", className)}
      value={value}
      onValueChange={onValueChange}
    >
      {variants?.map((variant, index) => (
        <div key={index} className="flex items-center">
          <RadioGroupPrimitive.Item
            id={variant.id}
            value={variant.value}
            disabled={variant.disabled}
            className={cn(
              "peer  relative aspect-square rounded-full border border-gray-300  text-center text-sm transition-all",
              "dark:border-gray-600 dark:text-gray-100",
              " dark:data-[state=checked]:border-white",
              "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ",
              itemClassName
            )}
          >
            <span className={cn("transition-colors", labelClassName)}>
              {variant.label}
            </span>
          </RadioGroupPrimitive.Item>
        </div>
      ))}
    </RadioGroupPrimitive.Root>
  );
};

export default VariantSelectorBasic;
