"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (quantity: number) => void;
}

export default function QuantitySelector({
  min = 1,
  max = 99,
  initial = 1,
  onChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initial);

  const handleChange = (newQty: number) => {
    if (newQty < min || newQty > max) return;
    setQuantity(newQty);
    onChange?.(newQty);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="border-gray-300 rounded-full "
        onClick={() => handleChange(quantity - 1)}
        disabled={quantity <= min}
      >
        <Minus className="w-4 h-4" />
      </Button>

      <span>{quantity}</span>

      <Button
        type="button"
        size="icon"
        variant="outline"
        className="border-gray-300 rounded-full"
        onClick={() => handleChange(quantity + 1)}
        disabled={quantity >= max}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
