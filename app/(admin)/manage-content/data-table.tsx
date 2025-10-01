"use client";
import { supabase } from "@/lib/supabase";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImageUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAddProduct } from "@/lib/hooks/useInsertProduct";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const insertProduct = useAddProduct();
  const [file, setFile] = useState<File | null>();
  const [fileUploading, setFileUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image_url: "",
    category_id: 1,
  });

  const uploadImageToBucketAndGetUrl = async () => {
    if (!file) return null;

    setFileUploading(true);

    try {
      const originalName = file.name;
      const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
      const jpgFileName = `${nameWithoutExt}.jpg`;

      const filepath = `public/${Date.now()}-${jpgFileName}`;

      let uploadFile = file;
      if (!originalName.toLowerCase().endsWith(".jpg")) {
        uploadFile = new File([file], jpgFileName, { type: "image/jpeg" });
      }

      const { data, error } = await supabase.storage
        .from("images")
        .upload(filepath, uploadFile);

      if (error) {
        console.error("Upload Error:", error);
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filepath);

      console.log("Uploaded successfully", data);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    } finally {
      setFileUploading(false);
    }
  };

  const handleAdd = async () => {
    const publicUrl = await uploadImageToBucketAndGetUrl();
    insertProduct.mutate(
      {
        ...newProduct,
        image_url: publicUrl,
        price: Number(newProduct.price) || 0,
      },
      {
        onSuccess: () => {
          setNewProduct({ name: "", price: "", image_url: "", category_id: 1 });
        },
      }
    );
  };

  const categories = [
    { id: 1, name: "Cakes & Cup Treats" },
    { id: 2, name: "Bars & Bites" },
    { id: 3, name: "Pinoy Favorites" },
  ];

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}

          <TableRow>
            <TableCell colSpan={columns.length}>
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-xs"
                />

                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  ref={fileInputRef}
                />
                <Label className="w-xl">Upload Image</Label>
                <Button
                  variant="secondary"
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                >
                  <ImageUp />
                </Button>

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
                <Button onClick={handleAdd} disabled={insertProduct.isPending}>
                  Add
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
