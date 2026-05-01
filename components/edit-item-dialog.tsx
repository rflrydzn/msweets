import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlattenedProduct, ProductOptions } from "@/lib/types/types";
import { Pencil, Plus, X } from "lucide-react";
import { useState, useRef } from "react";
import { useUpdateProduct } from "@/lib/hooks/useUpdateProduct";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

type EditItemProps = {
  product: FlattenedProduct;
};

export function EditItem({ product }: EditItemProps) {
  const [productInfo, setProductInfo] = useState<{
    name: string;
    description: string;
    options: ProductOptions;
    category: string;
    productGallery: string[];
  }>({
    name: product.name,
    description: product.description ?? "",
    category: product.category,
    options: product.options ?? { prices: [{ id: 1, label: "", price: 0 }] },
    productGallery: product.productGallery ?? [],
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<{ file?: File; preview: string }[]>(() =>
    (productInfo.productGallery ?? []).map((url) => ({ preview: url })),
  );
  const { mutate: updateProduct, isError, error } = useUpdateProduct();

  const addNewPriceField = () => {
    setProductInfo((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        prices: [
          ...prev.options.prices,
          { id: prev.options.prices.length + 1, label: "", price: 0 },
        ],
      },
    }));
  };

  const removePriceField = (index: number) => {
    setProductInfo((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        prices: prev.options.prices.filter((_, i) => i !== index),
      },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImages((prev) => [
        ...prev,
        { file: selectedFile, preview: URL.createObjectURL(selectedFile) },
      ]);
    }
  };

  const handleSave = async () => {
    updateProduct({
      id: product.id,
      name: productInfo.name,
      description: productInfo.description,
      options: productInfo.options,
      images: images,
    });

    if (isError) {
      toast.error(`Error updating product: ${error}`);
    } else {
      toast.success(`Successfully Updated Product ID: ${product.id}`);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] flex flex-col max-h-[90vh]">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Edit {productInfo.name}</DialogTitle>
            <DialogDescription>
              Make changes to your product info here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 overflow-y-auto flex-1 px-1">
            {/* Name */}
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={productInfo.name}
                onChange={(e) =>
                  setProductInfo((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            {/* Price fields */}
            <div className="grid gap-3">
              <Label>Price</Label>
              {productInfo.options?.prices?.map((entry, i) => (
                <div key={entry.id ?? i} className="flex items-center gap-3">
                  <div className="flex-col flex-1">
                    <Label>Label</Label>
                    <Input
                      value={productInfo.options.prices[i].label}
                      onChange={(e) =>
                        setProductInfo((prev) => ({
                          ...prev,
                          options: {
                            ...prev.options,
                            prices: prev.options.prices.map((p, idx) =>
                              idx === i ? { ...p, label: e.target.value } : p,
                            ),
                          },
                        }))
                      }
                    />
                  </div>
                  <span className="flex items-center justify-center text-xl mt-4">
                    :
                  </span>
                  <div className="flex-col flex-1">
                    <Label>Value</Label>
                    <Input
                      type="number"
                      value={productInfo.options.prices[i].price}
                      onChange={(e) =>
                        setProductInfo((prev) => ({
                          ...prev,
                          options: {
                            ...prev.options,
                            prices: prev.options.prices.map((p, idx) =>
                              idx === i
                                ? { ...p, price: Number(e.target.value) }
                                : p,
                            ),
                          },
                        }))
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePriceField(i)}
                    className="mt-4 w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                onClick={addNewPriceField}
                variant="outline"
              >
                Add New Field
              </Button>
            </div>

            {/* Description */}
            <div className="grid gap-3">
              <Label>Description</Label>
              <Textarea
                value={productInfo.description}
                onChange={(e) =>
                  setProductInfo((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            {/* Gallery */}
            <div className="grid gap-3">
              <Label>Product Gallery</Label>
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-2xl group"
                  >
                    <img
                      src={image.preview}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="absolute top-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <X className="w-4 h-4 text-brand-red" />
                    </button>
                  </div>
                ))}
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-shrink-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
