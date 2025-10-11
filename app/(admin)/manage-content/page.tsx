"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarousel } from "@/components/ui/carousel";
import { useFetchTableProducts } from "@/lib/hooks/useFetchTableProducts";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { AddProduct } from "./components/add-product";
function CustomControls() {
  const { scrollNext, canScrollNext, scrollPrev, canScrollPrev } =
    useCarousel();

  return (
    <div className="flex items-center gap-4 mt-4 justify-center">
      <Button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="p-1 text-white rounded-full border-brand-pink border bg-white"
      >
        <ChevronLeft className="text-brand-orange" />
      </Button>
      <Button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="p-1 text-white rounded-full border-brand-pink border bg-white"
      >
        <ChevronRight className="text-brand-orange " />
      </Button>
    </div>
  );
}

function ManageContent() {
  const { data: Products = [] } = useFetchTableProducts();
  return (
    <>
      <div className="container mx-auto py-10">
        <AddProduct />
        <DataTable columns={columns} data={Products} />
      </div>
    </>
  );
}

export default ManageContent;
