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

type Filters = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
};

function AllProducts() {
  const { data: Products } = useFetchTableProducts();

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    minPrice: 0,
    maxPrice: 0,
  });

  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);

  const [sortOrder, setSortOrder] = useState("default");

  const categories = [
    { id: 1, name: "Cakes" },
    { id: 2, name: "Cupcakes" },
    { id: 3, name: "Cookies" },
    { id: 4, name: "Brownies" },
    { id: 5, name: "Muffins" },
    { id: 6, name: "Crinkles" },
    { id: 7, name: "Macaroons" },
    { id: 8, name: "Banana Loaf" },
    { id: 9, name: "Dessert Bars" },
    { id: 10, name: "Pinoy Favorites" },
  ];

  const toggleSelectCategory = (checked: boolean, category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter((c) => c !== category),
    }));
  };

  const clearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      categories: [],
    }));
    setSelectedMinPrice(filters.minPrice);
    setSelectedMaxPrice(filters.maxPrice);
  };

  useEffect(() => {
    if (Products && Products.length > 0) {
      const prices = Products.map((p) => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setFilters((prev) => ({
        ...prev,
        minPrice: min,
        maxPrice: max,
      }));
      setSelectedMinPrice(min);
      setSelectedMaxPrice(max);
    }
  }, [Products]);

  const filteredProducts = Products?.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);
    const matchesPrice =
      product.price >= selectedMinPrice && product.price <= selectedMaxPrice;
    return matchesCategory && matchesPrice;
  });

  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (sortOrder === "ascending") {
      return a.price - b.price;
    } else if (sortOrder === "descending") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-5 my-12">
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
              <ArrowUpDown />{" "}
              {sortOrder === "ascending"
                ? "Low to High"
                : sortOrder === "descending"
                ? "High to Low"
                : "Default"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Price:</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={sortOrder}
              onValueChange={setSortOrder}
            >
              <DropdownMenuRadioItem value="default">
                Default
              </DropdownMenuRadioItem>
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
              <Slider
                min={filters.minPrice}
                max={filters.maxPrice}
                step={10}
                value={[selectedMinPrice, selectedMaxPrice]}
                onValueChange={([min, max]) => {
                  setSelectedMinPrice(min);
                  setSelectedMaxPrice(max);
                }}
              />
              <div className="flex items-center">
                <div className="relative">
                  <Input
                    className="pr-6"
                    type="number"
                    value={selectedMinPrice}
                    onChange={(e) =>
                      setSelectedMinPrice(Number(e.target.value))
                    }
                    min={filters.minPrice}
                    max={filters.maxPrice}
                  />
                  <span className="absolute inset-y-0 right-2 flex items-center text-brand-gray">
                    ₱
                  </span>
                </div>
                <span className="mx-5">-</span>
                <div className="relative">
                  <Input
                    className="pr-6"
                    type="number"
                    value={selectedMaxPrice}
                    onChange={(e) =>
                      setSelectedMaxPrice(Number(e.target.value))
                    }
                    min={filters.minPrice}
                    max={filters.maxPrice}
                  />
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
                  <Checkbox
                    checked={filters.categories.includes(variety.name)}
                    onCheckedChange={(checked) =>
                      toggleSelectCategory(!!checked, variety.name)
                    }
                  />
                  <Label className="text-brand-gray">{variety.name}</Label>
                </div>
              ))}
            </div>
          </aside>

          <Button
            variant="outline"
            className="text-brand-gray mt-2"
            onClick={clearFilters}
          >
            <X className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        </div>
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sortedProducts?.map((product) => (
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
