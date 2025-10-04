import { fetchRecommendedProducts } from "@/lib/fetchByCategory";
import { useFetchProducts } from "@/lib/hooks/useFetchGroupedProducts";
import { useEffect } from "react";
import ProductCard from "./all-products-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

async function YouMayAlsoLike({
  categoryId,
  currentProductID,
}: {
  categoryId: number;
  currentProductID: number;
}) {
  const recommended = await fetchRecommendedProducts(
    categoryId,
    currentProductID
  );
  return (
    <div className="space-y-4">
      <h1 className="font-times font-bold lg:text-2xl">You May Also Like</h1>
      <Carousel>
        <CarouselContent>
          {recommended.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/4">
              <ProductCard
                name={item.name}
                imageUrl={item.image_url}
                price={item.price}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default YouMayAlsoLike;
