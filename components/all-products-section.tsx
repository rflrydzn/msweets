import { AppWindowIcon, CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./all-products-card";
import Products from "@/Products.json";

const variety = [
  "Cake",
  "Cupcakes",
  "Brownies",
  "Cookies",
  "Muffins",
  "Banana Loaf",
  "Krinkles",
  "Dessert Bars",
];

// const Products = [
//   {
//     category: "cookies",
//     items: [
//       { name: "cookie1", amount: 20 },
//       { name: "cookie2", amount: 30 },
//       { name: "cookie3", amount: 30 },
//       { name: "cookie4", amount: 30 },
//     ],
//   },
//   {
//     category: "cupcake",
//     items: [
//       { name: "cupcake1", amount: 20 },
//       { name: "cupcake2", amount: 30 },
//     ],
//   },
// ];
function AllProducts() {
  return (
    <section className="flex flex-col items-center p-16 gap-6">
      <h1 className="text-brand-orange font-dream lg:text-3xl">All Products</h1>

      <div className="flex w-full flex-col gap-6">
        <Tabs defaultValue="Cake">
          {/* ✅ All triggers go in a single TabsList */}
          <TabsList>
            {Products.map((category) => (
              <TabsTrigger key={category.category} value={category.category}>
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ✅ Render one TabsContent per category */}
          {Products.map((category) => (
            <TabsContent key={category.category} value={category.category}>
              <div className="grid grid-cols-4 gap-4">
                {category.items.map((item) => (
                  <ProductCard
                    key={item.name}
                    name={item.name}
                    price={item.amount}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default AllProducts;
