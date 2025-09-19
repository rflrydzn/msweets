"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Hero1 from "@/public/hero.png";
import { Button } from "./ui/button";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export function CarouselHero() {
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      arrows={false}
    >
      <div className=" h-screen flex flex-col justify-center    text-white  gap-6">
        <h2 className="font-dream lg:text-4xl">Special Donuts for</h2>
        <h1 className="font-dream lg:text-8xl">Couples</h1>
        <p className="">
          Donuts come in different shapes, including the classic ring shape,
          filled donuts, donut holes (or munchkins), twists, and more. The
          ring-shaped donut is the most iconic.
        </p>
        <Button size="lg" className="bg-[#C34600]">
          Order now
        </Button>
      </div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
    </Carousel>
  );
}
