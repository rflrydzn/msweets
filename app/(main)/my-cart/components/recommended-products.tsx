import { fetchBestSellers } from "@/lib/fetchByCategory";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/all-products-card";
import { getLowestPrice } from "@/lib/getLowestPrice";
import { LOGO_URL } from "@/lib/constants";

async function RecommendedProducts() {
  const recommended = await fetchBestSellers();
  return (
    <section className="my-16">
      <h1 className="font-times font-medium lg:text-xl">You May Also Like</h1>
      <Carousel className="my-6">
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
    </section>
  );
}

export default RecommendedProducts;
