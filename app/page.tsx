import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar01 } from "@/components/nav-bar";
import { CarouselHero } from "@/components/carousel";
import { PopularDesserts } from "@/components/popular-desserts";
import DessertCard from "@/components/popular-dessert-card";
import AllProducts from "@/components/all-products-section";
import ProductCard from "@/components/all-products-card";
import IndividualCakes from "@/components/individual-cakes-section";
import Pay from "@/public/pay.jpg";
export default function Home() {
  return (
    <main>
      <Navbar01 />
      <section
        className="h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <CarouselHero />
      </section>

      <PopularDesserts />
      <AllProducts />
      <IndividualCakes />
      <Image src={Pay} alt="pay" className="text-red" width={150} />
    </main>
  );
}
