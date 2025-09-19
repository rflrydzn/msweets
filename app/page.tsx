import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar01 } from "@/components/nav-bar";
import { CarouselHero } from "@/components/carousel";
import { PopularDesserts } from "@/components/popular-desserts";
import DessertCard from "@/components/popular-dessert-card";
import AllProducts from "@/components/all-products-section";
import ProductCard from "@/components/all-products-card";
export default function Home() {
  return (
    <main>
      <Navbar01 />
      <section
        className="h-screen w-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <CarouselHero />
      </section>

      <PopularDesserts />
      <AllProducts />
    </main>
  );
}
