import { fetchRecommendedProducts } from "@/lib/fetchByCategory";
import ProductCard from "./all-products-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getLowestPrice } from "@/lib/getLowestPrice";
import { LOGO_URL } from "@/lib/constants";

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
                imageUrl={item.productGallery?.[0] ?? LOGO_URL}
                price={getLowestPrice(item.options?.prices)}
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
