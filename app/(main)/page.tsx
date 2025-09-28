import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CarouselHero } from "@/components/carousel";
import { PopularDesserts } from "@/components/popular-desserts";
import DessertCard from "@/components/popular-dessert-card";
import AllProducts from "@/components/all-products-section";
import ProductCard from "@/components/all-products-card";
import IndividualCakes from "@/components/individual-cakes-section";
import WhyTrustUs from "@/components/why-trust-us";
import Footer from "@/components/footer-section";
import Banner from "@/components/banner";

export default function Home() {
  return (
    <main>
      <Banner />
      {/* <Navbar01 /> */}
      <section
        className="h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <CarouselHero />
      </section>

      <PopularDesserts />
      <AllProducts />
      <IndividualCakes />
      <WhyTrustUs />
      <Footer />
    </main>
  );
}
