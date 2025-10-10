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
import { FlattenedProduct } from "@/lib/types/types";
import { Pencil, ImageUp } from "lucide-react";
import { useState } from "react";
import { useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { getPublicURL } from "@/lib/getPublicUrl";
import { useUpdateProduct } from "@/lib/hooks/useUpdateProduct";

type EditItemProps = {
  product: FlattenedProduct;
};

export function EditItem({ product }: EditItemProps) {
  const [productInfo, setProductInfo] = useState<{
    name: string;

    category: string;
    image_url: string;
  }>({
    name: product.name,

    category: product.category,
    image_url: product.image_url,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(productInfo.image_url);
  const { mutate: updateProduct } = useUpdateProduct(); // ✅ call hook at top of component

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {productInfo.name}</DialogTitle>
            <DialogDescription>
              Make changes to your product info here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
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
              <Input
                id="price"
                name="price"
                // defaultValue={productInfo.price}
                onChange={(e) =>
                  setProductInfo((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-3">
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
            </div>
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
