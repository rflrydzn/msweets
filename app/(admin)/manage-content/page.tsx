"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/all-products-card";
// import Products from "@/Products.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarousel } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useFetchCategories } from "@/lib/hooks/useFetchCategories";
import { useFetchTableProducts } from "@/lib/hooks/useFetchTableProducts";
import { useFetchProducts } from "@/lib/hooks/useFetchGroupedProducts";
// import { useFetchProducts } from "@/lib/hooks/useFetchProducts";
import { GroupedProducts, Product } from "@/lib/types/types";

import { columns } from "./columns";
import { DataTable } from "./data-table";
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
  const { data: groupedProducts = [], isLoading } = useFetchProducts();
  const [file, setFile] = useState<File | null>();
  const [fileUploading, setFileUploading] = useState(false);
  const [addProduct, setAddProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: 1,
  });

  const categories = [
    { id: 1, name: "Cake & Cup Treats" },
    { id: 2, name: "Bars & Bites" },
    { id: 3, name: "Pinoy Favorites" },
  ];

  const uploadImageToBucketAndGetUrl = async () => {
    if (!file) return null;

    setFileUploading(true);

    try {
      // Ensure filename ends with .jpg
      const originalName = file.name;
      const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
      const jpgFileName = `${nameWithoutExt}.jpg`;

      // Create filepath that matches your RLS policy: public/filename.jpg
      const filepath = `public/${Date.now()}-${jpgFileName}`;

      // Create a new File object with .jpg extension if needed
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

      // Get the public URL
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

  const addNewProductRow = async (publicUrl: string) => {
    const { error } = await supabase.from("products").insert({
      name: addProduct.name,
      price: Number(addProduct.price),
      image_url: publicUrl,
      category_id: addProduct.category,
    });
    if (error) {
      console.log("Error: ", error);
    }
    console.log("new product added successfully");
  };

  const handleSubmit = async () => {
    const publicUrl = await uploadImageToBucketAndGetUrl();
    if (!publicUrl) return;
    await addNewProductRow(publicUrl);
  };

  return (
    <>
      <section className="flex flex-col items-center p-16 gap-6">
        <h1 className="text-brand-orange font-dream md:text-3xl lg:text-3xl">
          All Products
        </h1>

        <div className="flex w-full flex-col ">
          <Tabs defaultValue="Cake & Cup Treats">
            {/* ✅ All triggers go in a single TabsList */}
            <TabsList>
              {groupedProducts.map((grouped: GroupedProducts) => (
                <TabsTrigger key={grouped.category} value={grouped.category}>
                  {grouped.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ✅ Render one TabsContent per category */}
            {groupedProducts.map((grouped: GroupedProducts) => (
              <TabsContent key={grouped.category} value={grouped.category}>
                <Carousel>
                  <CarouselContent>
                    {grouped.items.map((item) => (
                      <CarouselItem
                        key={item.name}
                        className="md:basis-1/2 lg:basis-1/4 my-2"
                      >
                        <ProductCard
                          key={item.name}
                          name={item.name}
                          price={item.amount}
                          imageUrl={item.imageUrl}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CustomControls />
                </Carousel>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={Products} />
      </div>
    </>
  );
}

export default ManageContent;
