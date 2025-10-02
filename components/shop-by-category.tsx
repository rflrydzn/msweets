"use client";
import { useFetchCategories } from "@/lib/hooks/useFetchCategories";
import Cake from "@/public/cake.png";
import Link from "next/link";
import { useEffect } from "react";
// const categories = [
//   "Cakes",
//   "Cupcakes",
//   "Cookies",
//   "Brownies",
//   "Muffins",
//   "Crinkles",
//   "Macaroons",
//   "Banana Loaf",
//   "Dessert Bars",
//   "Pinoy Favorites",
// ];
function ShopByCategory() {
  const { data: categories } = useFetchCategories();
  useEffect(() => console.log("cat", categories), [categories]);
  return (
    <section className="flex flex-col items-center p-16 gap-6">
      <h1 className="text-brand-orange font-dream md:text-3xl lg:text-3xl">
        Shop by Category
      </h1>
      <div className="grid grid-cols-2 gap-10 w-full md:grid-cols-5 max-w-7xl mx-auto">
        {categories?.map((category) => (
          <Link
            key={category.name}
            href={{
              pathname: "/all-products",
              query: { category: category.name },
            }}
          >
            <div className="flex flex-col items-center justify-center gap-3 hover:scale-105 transition duration-300 cursor-pointer">
              <div className="rounded-full border aspect-square p-2 border-brand-red overflow-hidden">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={category.image_url}
                />
              </div>
              <h2 className="font-medium">{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ShopByCategory;
