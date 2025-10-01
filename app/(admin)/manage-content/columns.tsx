"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { FlattenedProduct, Product } from "@/lib/types/types";
import { EditItem } from "@/components/edit-item-dialog";

function ActionCell({ product }: { product: FlattenedProduct }) {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      console.error("Error deleting:", error.message);
    } else {
      console.log("Deleted:", product.id);
      queryClient.invalidateQueries({ queryKey: ["table-products"] });
    }
  };

  return (
    <div className="flex gap-2">
      {/* <Button
        variant="outline"
        size="sm"
        onClick={() => console.log("Edit", product.id)}
      >
        <Pencil className="h-4 w-4" />
      </Button> */}
      <EditItem product={product} />
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export const columns: ColumnDef<FlattenedProduct>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "price",
    header: "price",
  },
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const url = row.getValue("image_url") as string;
      return (
        <img
          src={url}
          alt={row.original.name}
          width={50}
          height={50}
          className="rounded-md object-cover"
        />
      );
    },
  },
  {
    accessorKey: "category",
    header: "category",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionCell product={row.original} />,
  },
];
