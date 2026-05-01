"use client";
import ProductCard from "@/components/all-products-card";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useFetchTableProducts } from "@/lib/hooks/useFetchTableProducts";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { categories, LOGO_URL } from "@/lib/constants";
import { getLowestPrice } from "@/lib/getLowestPrice";

type Filters = {
  categories: string[];
  minPrice: number;
  maxPrice: number;
};

const PRODUCTS_PER_PAGE = 9;

function AllProductsClientInner() {
  const searchParams = useSearchParams().get("category");
  const { data: Products } = useFetchTableProducts();
  const [filters, setFilters] = useState<Filters>({
    categories: searchParams ? [searchParams] : [],
    minPrice: 0,
    maxPrice: 0,
  });
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSelectCategory = (checked: boolean, category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter((c) => c !== category),
    }));
    setCurrentPage(1); // reset to page 1 on filter change
  };

  const clearFilters = () => {
    setFilters((prev) => ({ ...prev, categories: [] }));
    setSelectedMinPrice(filters.minPrice);
    setSelectedMaxPrice(filters.maxPrice);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (Products?.length) {
      const allPrices = Products.map((item) => {
        const prices = item.options?.prices?.map((p) => p.price) ?? [];
        return prices.length > 0 ? Math.min(...prices) : null;
      }).filter((p): p is number => p !== null);

      if (allPrices.length > 0) {
        const min = Math.min(...allPrices);
        const max = Math.max(...allPrices);
        setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
        setSelectedMinPrice(min);
        setSelectedMaxPrice(max);
      }
    }
  }, [Products]);

  // Reset to page 1 when price or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMinPrice, selectedMaxPrice, sortOrder]);

  const filteredProducts = Products?.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);
    const matchesPrice =
      getLowestPrice(product.options?.prices) >= selectedMinPrice &&
      getLowestPrice(product.options?.prices) <= selectedMaxPrice;
    return matchesCategory && matchesPrice;
  });

  const sortedProducts = [...(filteredProducts ?? [])].sort((a, b) => {
    if (sortOrder === "ascending")
      return (
        getLowestPrice(a.options?.prices) - getLowestPrice(b.options?.prices)
      );
    if (sortOrder === "descending")
      return (
        getLowestPrice(b.options?.prices) - getLowestPrice(a.options?.prices)
      );
    return 0;
  });

  // Pagination calculations
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page number buttons (show max 5 at a time)
  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 my-12">
      <h1 className="text-center font-dream text-3xl text-brand-orange">
        All Products
      </h1>

      <div className="flex justify-between">
        <h2 className="font-times lg:text-3xl">Filter</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-brand-gray bg-[#f8f7ea]">
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
        {/* Sidebar */}
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
            <Separator className="mt-4 mb-4" />
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
            className="text-brand-gray mt-2 bg-[#f8f7ea]"
            onClick={clearFilters}
          >
            <X className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        </div>

        {/* Products grid */}
        <main className="md:col-span-3">
          {/* Results count */}
          <p className="text-sm text-brand-gray mb-3">
            Showing {startIndex + 1}–
            {Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts)} of{" "}
            {totalProducts} products
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paginatedProducts.map((product) => (
              <Link key={product.id} href={`/all-products/${product.id}`}>
                <ProductCard
                  name={product.name}
                  price={getLowestPrice(product.options?.prices)}
                  imageUrl={product.productGallery?.[0] ?? LOGO_URL}
                />
              </Link>
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-brand-gray bg-[#f8f7ea]"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* First page + ellipsis */}
              {getPageNumbers()[0] > 1 && (
                <>
                  <Button
                    variant={currentPage === 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    className={
                      currentPage !== 1 ? "text-brand-gray bg-[#f8f7ea]" : ""
                    }
                  >
                    1
                  </Button>
                  {getPageNumbers()[0] > 2 && (
                    <span className="text-brand-gray px-1">...</span>
                  )}
                </>
              )}

              {/* Page number buttons */}
              {getPageNumbers().map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={
                    currentPage !== page ? "text-brand-gray bg-[#f8f7ea]" : ""
                  }
                >
                  {page}
                </Button>
              ))}

              {/* Last page + ellipsis */}
              {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                <>
                  {getPageNumbers()[getPageNumbers().length - 1] <
                    totalPages - 1 && (
                    <span className="text-brand-gray px-1">...</span>
                  )}
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    className={
                      currentPage !== totalPages
                        ? "text-brand-gray bg-[#f8f7ea]"
                        : ""
                    }
                  >
                    {totalPages}
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-brand-gray bg-[#f8f7ea]"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function AllProductsClient() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <AllProductsClientInner />
    </Suspense>
  );
}
