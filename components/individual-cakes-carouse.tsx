"use client";
import "react-multi-carousel/lib/styles.css";
import CakeCard from "./individual-cakes-card";
import * as React from "react";
import Carousel from "react-multi-carousel";
import {
  ButtonGroupProps,
  ArrowProps,
  DotProps,
} from "react-multi-carousel/lib/types";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2, // Two fully visible
    partialVisibilityGutter: 80, // Half slides on sides
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 60,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
  },
};

const cakes = [
  {
    name: "Wedding Cakes",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1675720060105-ba50ca9e21a7?q=80&w=1742&auto=format&fit=crop",
  },
  {
    name: "B-Day Cakes",
    imageUrl:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=1452&auto=format&fit=crop",
  },
  {
    name: "Baby Cakes",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1711750554750-748ed4faafee?q=80&w=774&auto=format&fit=crop",
  },
  {
    name: "Ewan Cakes",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?q=80&w=764&auto=format&fit=crop",
  },
];

const CustomDot = ({ onClick, active }: DotProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 
        ${active ? "bg-[#df889c]" : "bg-gray-400 hover:bg-brand-pink"}`}
    />
  );
};

function CakeCarousel() {
  return (
    <div className="w-screen overflow-hidden pb-8 relative">
      {" "}
      {/* Full width, no padding */}
      <Carousel
        responsive={responsive}
        infinite
        draggable
        arrows={false}
        showDots={true}
        centerMode
        containerClass="w-full"
        itemClass="px-2" // small gutter between cards
        customDot={<CustomDot />}
        renderDotsOutside={true}
      >
        {cakes.map((cake) => (
          <CakeCard key={cake.name} name={cake.name} imageUrl={cake.imageUrl} />
        ))}
      </Carousel>
    </div>
  );
}

export default CakeCarousel;
