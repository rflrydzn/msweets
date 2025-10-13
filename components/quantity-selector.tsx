"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (quantity: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function QuantitySelector({
  min = 1,
  max = 99,
  initial = 1,
  onChange,
  className = "",
  size = "md",
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initial);

  const handleChange = (newQty: number) => {
    if (newQty < min || newQty > max) return;
    setQuantity(newQty);
    onChange?.(newQty);
  };

  const sizeStyles = {
    sm: {
      button: "w-7 h-7",
      icon: "w-3 h-3",
      text: "text-sm",
    },
    md: {
      button: "w-9 h-9",
      icon: "w-4 h-4",
      text: "text-base",
    },
    lg: {
      button: "w-11 h-11",
      icon: "w-5 h-5",
      text: "text-lg",
    },
  }[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        type="button"
        size="icon"
        variant="outline"
        className={`border-gray-300 rounded-full ${sizeStyles.button}`}
        onClick={() => handleChange(quantity - 1)}
        disabled={quantity <= min}
      >
        <Minus className={sizeStyles.icon} />
      </Button>

      <span className={`${sizeStyles.text}`}>{quantity}</span>

      <Button
        type="button"
        size="icon"
        variant="outline"
        className={`border-gray-300 rounded-full ${sizeStyles.button}`}
        onClick={() => handleChange(quantity + 1)}
        disabled={quantity >= max}
      >
        <Plus className={sizeStyles.icon} />
      </Button>
    </div>
  );
}
