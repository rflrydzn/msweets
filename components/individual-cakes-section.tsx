import "react-multi-carousel/lib/styles.css";
import CakeCard from "./individual-cakes-card";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Carousel from "react-multi-carousel";
import CakeCarousel from "./individual-cakes-carouse";

function IndividualCakes() {
  return (
    <section className="flex flex-col items-center py-16 gap-6 w-full">
      <h1 className="text-brand-orange font-dream md:text-3xl lg:text-3xl lg:py-7">
        Individual Cakes
      </h1>
      <CakeCarousel />
    </section>
  );
}

export default IndividualCakes;
