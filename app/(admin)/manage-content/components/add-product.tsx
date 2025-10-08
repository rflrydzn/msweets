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
import { useEffect, useState } from "react";
import { ProductOptions } from "@/lib/types/types";
import { X } from "lucide-react";
import ProductGallery from "./product-gallery";

interface AddProduct {
  id?: number;
  name: string;
  category_id: number;
  options: ProductOptions;
  description: string;
  productGallery: string[];
}
export function AddProduct() {
  const [newProduct, setNewProduct] = useState<AddProduct>({
    name: "",
    category_id: 0,
    description: "",
    productGallery: [],
    options: { prices: [{ id: 1, label: "", price: 0 }] },
  });

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
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
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
            <ProductGallery />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
