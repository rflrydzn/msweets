import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/categories";
import { useEffect, useState, useRef } from "react";
import { ProductOptions } from "@/lib/types/types";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { getPublicURL } from "@/lib/getPublicUrl";
import { useAddProduct } from "@/lib/hooks/useInsertProduct";

interface AddProduct {
  id?: number;
  name: string;
  category_id: number;
  options: ProductOptions;
  description: string;
  productGallery: string[];
}
export function AddProduct() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([""]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newProduct, setNewProduct] = useState<AddProduct>({
    name: "",
    category_id: 0,
    description: "",
    productGallery: [],
    options: { prices: [{ id: 1, label: "", price: 0 }] },
  });
  const insertProduct = useAddProduct();

  const addNewField = () => {
    setNewProduct((prev) => ({
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    const fileUrls = newFiles.map((file) => URL.createObjectURL(file));

    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...fileUrls]);
  };

  const handleUpload = async () => {
    const publicUrls = await Promise.all(
      files.map((file) => getPublicURL(file))
    );

    const filteredUrls = publicUrls.filter((url): url is string =>
      Boolean(url)
    );

    insertProduct.mutate({
      name: newProduct.name,
      category_id: newProduct.category_id,
      price: 0,
      description: newProduct.description,
      options: newProduct.options,
      productGallery: filteredUrls.length ? filteredUrls : [""],
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Product</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-auto">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input
              id="sheet-demo-name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Category</Label>
            <Select
              onValueChange={(value) =>
                setNewProduct((prev) => ({
                  ...prev,
                  category_id: Number(value),
                }))
              }
            >
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
          </div>

          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Description</Label>
            <Textarea
              placeholder="Enter your product description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Price</Label>

            {newProduct.options.prices.map((e, i) => (
              <div
                key={e.id}
                className="flex justify-center items-center gap-5"
              >
                <div className="flex-col">
                  <Label>Label</Label>

                  <Input
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        options: {
                          ...prev.options,
                          prices: prev.options.prices.map((p, idx) =>
                            idx === i ? { ...p, label: e.target.value } : p
                          ),
                        },
                      }))
                    }
                    value={newProduct.options.prices[i].label}
                    id="sheet-demo-username"
                  />
                </div>
                <span className="flex items-center justify-center text-xl">
                  :
                </span>
                <div className="flex-col">
                  <Label>Value</Label>
                  <Input
                    onChange={(e) =>
                      setNewProduct((prev) => ({
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
                    value={newProduct.options.prices[i].price}
                    id="sheet-demo-username"
                  />
                </div>
              </div>
            ))}
            <Button onClick={addNewField} variant="outline">
              Add New Field
            </Button>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Product Gallery</Label>
            <div className="grid grid-cols-4 justify-start">
              {previews.map((g, i) => (
                <div key={i}>{g && <img src={g} />}</div>
              ))}

              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e)}
              />

              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={handleUpload}>
            Save changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
