"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function ProductGallery({ onChange }: { onChange: (urls: string[]) => void }) {
  const [gallery, setGallery] = useState<string[]>([""]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileUrls = Array.from(files).map((p) => URL.createObjectURL(p));
    setGallery((prev) => [...prev, ...fileUrls]);
    onChange(fileUrls);
  };

  return (
    <div className="grid grid-cols-4 justify-start">
      {gallery.map((g, i) => (
        <div key={i}>{g && <img src={g} />}</div>
      ))}

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e)}
      />

      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
        <Plus />
      </Button>
    </div>
  );
}

export default ProductGallery;
