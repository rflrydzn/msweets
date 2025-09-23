"use client";
import { useState } from "react";
import { X, Phone } from "lucide-react";

export default function Banner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white px-6 py-1 shadow-md flex items-center justify-center">
      {/* Centered text */}
      <p className="text-sm sm:text-base font-medium text-brand-orange flex items-center gap-1">
        Order online or text/call 09xx xxx xxxx <Phone size={15} />
      </p>
      {/* Absolute-positioned X */}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 transition"
      >
        <X className="w-5 h-5 text-black" />
      </button>
    </div>
  );
}
