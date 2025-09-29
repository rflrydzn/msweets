"use client";
import ProductCard from "@/components/all-products-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useFetchProducts } from "@/lib/hooks/useFetchGroupedProducts";
import { useFetchTableProducts } from "@/lib/hooks/useFetchTableProducts";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, X } from "lucide-react";

function AllProducts() {
  const { data: Products } = useFetchTableProducts();
  const [sortBy, setSortBy] = useState();

  const categories = [
    { id: 0, name: "All" },
    { id: 1, name: "Cake" },
    { id: 2, name: "Cupcake" },
    { id: 3, name: "Brownies" },
    { id: 4, name: "Cookies" },
    { id: 5, name: "Muffins" },
    { id: 6, name: "Banana Loaf" },
    { id: 7, name: "Krinkles" },
    { id: 8, name: "Dessert Bars" },
  ];
  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-brand-red">
              All Products
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between">
        <h2 className="lg:text-3xl">Filter</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-brand-gray">
              <ArrowUpDown /> Default
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Price:</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem value="ascending">
                Low to High
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem value="descending">
                High to Low
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-end md:col-span-1 self-start">
          <aside className="rounded-xl border-2 p-3 w-full">
            <div className="space-y-4 mb-3">
              <Label className="font-bold">Price</Label>
              <Slider min={0} max={1000} defaultValue={[0, 1000]} step={1} />
              <div className="flex items-center">
                <div className="relative">
                  <Input className="pr-6" />
                  <span className="absolute inset-y-0 right-2 flex items-center text-brand-gray">
                    ₱
                  </span>
                </div>
                <span className="mx-5">-</span>
                <div className="relative">
                  <Input className="pr-6" />
                  <span className="absolute inset-y-0 right-2 flex items-center text-brand-gray">
                    ₱
                  </span>
                </div>
              </div>
            </div>

            <Separator className="mt-4 mb-4 " />

            <div className="space-y-3">
              <Label className="font-bold">Variety</Label>
              {categories.map((variety) => (
                <div className="flex gap-3" key={variety.name}>
                  <Checkbox />
                  <Label className="text-brand-gray">{variety.name}</Label>
                </div>
              ))}
            </div>
          </aside>

          <Button variant="outline" className="text-brand-gray mt-2">
            <X className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        </div>
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Products?.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                price={product.price}
                imageUrl={product.image_url}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllProducts;
