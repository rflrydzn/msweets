import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./all-products-card";
import Products from "@/Products.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
              <Carousel>
                <CarouselContent>
                  {category.items.map((item) => (
                    <CarouselItem
                      key={item.name}
                      className="md:basis-1/2 lg:basis-1/4"
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
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default AllProducts;
