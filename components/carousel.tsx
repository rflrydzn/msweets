"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Hero1 from "@/public/hero.png";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronLeftCircle, ChevronRight } from "lucide-react";
import Donut from "@/public/donut.png";
import Cookie from "@/public/cookie.png";
import { motion } from "framer-motion";

const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

const CustomRightArrow = ({ onClick, ...rest }: any) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <button onClick={() => onClick()} />;
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

const slides = [
  {
    title: "Discover the sweetness",
    subtitle: "of Donuts",
    description:
      "Donuts come in different shapes, including the classic ring shape, filled donuts, donut holes (or munchkins), twists, and more. The ring-shaped donut is the most iconic.",
    image: Donut,
  },
  {
    title: "Taste the sweetness",
    subtitle: "of Cookies",
    description:
      "Cookies come in all sorts of shapes! You've got the classic round shape, chocolate chip cookies, sandwich cookies, bars, and so much more.",
    image: Cookie,
  },
];
export function CarouselHero() {
  return (
    <Carousel
      showDots
      arrows={true}
      responsive={responsive}
      transitionDuration={500} // controls slide movement speed
      customDot={<CustomDot />}
    >
      {slides.map((slide, idx) => (
        <motion.div
          key={idx}
          className="px-24 min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <h1 className="font-dream whitespace-nowrap text-white lg:text-4xl leading-loose">
              {slide.title}{" "}
              <span className="block lg:text-7xl">{slide.subtitle}</span>
            </h1>
            <p className="text-white text-xl max-w-3xl">{slide.description}</p>
            <button className="text-white rounded-[20px] bg-brand-red text-2xl font-medium h-[71px] w-[245px] mx-auto lg:mx-0">
              Order now
            </button>
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-screen"
          >
            <Image src={slide.image} alt={slide.subtitle} />
          </motion.div>
        </motion.div>
      ))}
    </Carousel>
  );
}
