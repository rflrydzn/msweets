"use client";
import { ProductInfo } from "@/lib/types/types";
import { useState } from "react";

function ProductGallery({ productInfo }: { productInfo: ProductInfo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <img
        className="rounded-2xl object-cover h-[500px] w-full"
        src={productInfo.productGallery[currentIndex]}
        alt={productInfo.name}
      />
      <div className="grid lg:grid-cols-4 gap-3">
        {productInfo.productGallery.map((img, index) => (
          <div
            key={index}
            className={`${
              currentIndex === index ? "border-brand-orange " : " "
            } border-2 aspect-square rounded-2xl overflow-hidden`}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={img} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductGallery;
