import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import DessertCard from "./popular-dessert-card";

const Desserts = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1599785209796-786432b228bc?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Cupcake",
  },

  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Cake",
  },

  {
    imageUrl:
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd25pZXN8ZW58MHx8MHx8fDA%3D",
    name: "Brownies",
  },

  {
    imageUrl:
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd25pZXN8ZW58MHx8MHx8fDA%3D",
    name: "Brownies2",
  },
];

export function PopularDesserts() {
  return (
    <section className="flex flex-col items-center font-dream p-16 gap-6">
      <h1 className="text-brand-orange lg:text-3xl ">Popular Desserts</h1>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-6xl"
      >
        <CarouselContent>
          {Desserts.map((e) => (
            <CarouselItem key={e.name} className="md:basis-1/2 lg:basis-1/3">
              <DessertCard imageUrl={e.imageUrl} name={e.name} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
