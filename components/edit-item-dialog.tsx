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
import { useState } from "react";
import { useRef } from "react";
import { useUpdateProduct } from "@/lib/hooks/useUpdateProduct";
import { Textarea } from "./ui/textarea";

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
    options: product.options ?? { prices: [] },
    productGallery: product.productGallery ?? [],
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string[]>(productInfo.productGallery);
  const { mutate: updateProduct } = useUpdateProduct();

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //     setPreview(URL.createObjectURL(selectedFile));
  //   }
  // };

  const handleSave = async () => {
    updateProduct({
      id: product.id,
      name: productInfo.name,
      // price: productInfo.price,
      file: file,
    });
    // const publicUrl = await getPublicURL(file);
    // const { error } = await supabase
    //   .from("products")
    //   .update({
    //     name: productInfo.name,
    //     price: Number(productInfo.price),
    //     image_url: publicUrl,
    //   })
    //   .eq("id", product.id);

    // if (error) {
    //   toast.error("Error updating product");
    // } else {
    //   toast.success(`Successfully Updated Product ID: ${product.id}`);
    // }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Edit {productInfo.name}</DialogTitle>
            <DialogDescription>
              Make changes to your product info here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 overflow-y-auto ">
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
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              {productInfo.options?.prices?.map((e, i) => (
                <div key={i} className="flex justify-center items-center gap-5">
                  <div className="flex-col">
                    <Label id="price-options-label">Label</Label>

                    <Input
                      onChange={(e) =>
                        setProductInfo((prev) => ({
                          ...prev,
                          options: {
                            ...prev.options,
                            prices: prev.options.prices.map((p, idx) =>
                              idx === i ? { ...p, label: e.target.value } : p
                            ),
                          },
                        }))
                      }
                      value={productInfo.options.prices[i].label}
                      id="price-options-label"
                    />
                  </div>
                  <span className="flex items-center justify-center text-xl">
                    :
                  </span>
                  <div className="flex-col">
                    <Label id="price-options-price">Value</Label>
                    <Input
                      onChange={(e) =>
                        setProductInfo((prev) => ({
                          ...prev,
                          options: {
                            ...prev.options,
                            prices: prev.options.prices.map((p, idx) =>
                              idx === i
                                ? { ...p, price: Number(e.target.value) }
                                : p
                            ),
                          },
                        }))
                      }
                      value={productInfo.options.prices[i].price}
                      id="price-options-price"
                    />
                  </div>
                </div>
              ))}
            </div>
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
            <div className="grid gap-3">
              <Label>Product Gallery</Label>
              <div className="grid grid-cols-4 gap-3">
                {preview.map((image, index) => (
                  <div
                    key={image}
                    className="relative aspect-square overflow-hidden rounded-2xl group"
                  >
                    <img src={image} className="object-cover w-full h-full" />
                    <button
                      onClick={() => {
                        setPreview((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute -top-0 -right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <X className="w-4 h-4 text-brand-red" />
                    </button>
                  </div>
                ))}
                <Button>
                  <Plus />
                </Button>
              </div>
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="price">Image</Label>
              <img src={preview} className="aspect-square max-w-[50px]" />
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                className="max-w-md"
                variant="outline"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                Change Image
                <ImageUp />
              </Button>
            </div> */}

            {/* <div className="grid gap-3">
              <Label htmlFor="price">Category</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
          </div>
          <DialogFooter>
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
