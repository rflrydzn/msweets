"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Hero1 from "@/public/hero.png";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronLeftCircle, ChevronRight } from "lucide-react";
import Donut from "@/public/donut.png";
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

const CustomDot = ({ onClick, active }: any) => {
  return (
    <button
      onClick={onClick}
      className={`w-3 h-3 mx-1 my-5 rounded-full transition-all duration-300 
        ${active ? "bg-[#df889c]" : "bg-[#d3d3d3] hover:bg-brand-pink"}`}
    />
  );
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
      customDot={<CustomDot />}
    >
      <div className="px-24 min-h-screen min-w-screen items-center justify-center flex lg:flex-row w-full border-2 ">
        <div className="flex gap-12 lg:flex-col">
          <h1 className="font-dream text-white lg:text-4xl leading-loose whitespace-nowrap">
            Discover the sweetness{" "}
            <span className="block font-dream text-white lg:text-7xl">
              of Donuts
            </span>
          </h1>
          <p className="text-white text-xl max-w-3xl">
            Donuts come in different shapes, including the classic ring shape,
            filled donuts, donut holes (or munchkins), twists, and more. The
            ring-shaped donut is the most iconic.
          </p>
          <button className="text-white rounded-[20px] bg-brand-red text-2xl font-medium h-[71px] w-[245px]">
            Order now
          </button>
        </div>
        <div>
          <Image src={Donut} alt="Donut" />
        </div>
      </div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
    </Carousel>
  );
}
