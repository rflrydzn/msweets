"use client";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useCarousel } from "@/components/ui/carousel";

type ButtonGroupProps = {
  next?: () => void;
  previous?: () => void;
  carouselState?: { currentSlide: number };
};

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

function AllProducts() {
  const ButtonGroup: React.FC<ButtonGroupProps> = ({
    next,
    previous,
    carouselState,
  }) => {
    const currentSlide = carouselState?.currentSlide ?? 0;

    return (
      <div className="carousel-button-group absolute">
        <Button
          className={
            currentSlide === 0
              ? "disable"
              : "rounded-full w-8 h-8 bg-white border border-brand-orange"
          }
          onClick={previous}
        >
          <ChevronLeft className="text-brand-red" />
        </Button>
        <Button
          onClick={next}
          className="rounded-full w-8 h-8 bg-white border border-brand-orange"
        >
          <ChevronRight className="text-brand-red" />
        </Button>
      </div>
    );
  };

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
                <CustomControls />
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default AllProducts;
