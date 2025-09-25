"use client";
import Carousel from "react-multi-carousel";
import {
  ButtonGroupProps,
  ArrowProps,
  DotProps,
} from "react-multi-carousel/lib/types";

import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Hero1 from "@/public/hero.png";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronLeftCircle, ChevronRight } from "lucide-react";
import Donut from "@/public/donut.png";
import Cookie from "@/public/cookie.png";
import { motion } from "framer-motion";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

// const CustomRightArrow = ({ onClick, ...rest }: ArrowProps) => {
//   const {
//     onMove,
//     carouselState: { currentSlide, deviceType },
//   } = rest;
//   // onMove means if dragging or swiping in progress.
//   return <button onClick={() => onClick()} />;
// };

const CustomDot = ({ onClick, active }: DotProps) => {
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
  {
    title: "Taste the sweetness2",
    subtitle: "of Cookies",
    description:
      "Cookies come in all sorts of shapes! You've got the classic round shape, chocolate chip cookies, sandwich cookies, bars, and so much more.",
    image: Cookie,
  },
  {
    title: "Taste the sweetness3",
    subtitle: "of Cookies",
    description:
      "Cookies come in all sorts of shapes! You've got the classic round shape, chocolate chip cookies, sandwich cookies, bars, and so much more.",
    image: Cookie,
  },
  {
    title: "Taste the sweetness4",
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
          className="px-24 pt-12 min-h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:justify-start "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative flex flex-col gap-6 text-center lg:text-left 2xl:gap-10">
            <h1 className="text-xl font-dream whitespace-nowrap text-white md:text-4xl lg:text-4xl xl:text-6xl leading-loose">
              {slide.title}{" "}
              <span className="text-3xl block md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
                {slide.subtitle}
              </span>
            </h1>
            <p className="text-white text-md lg:max-w-xl xl:text-2xl 2xl:text-3xl 2xl:max-w-3xl">
              {slide.description}
            </p>
            <Button
              className="
    text-white bg-brand-red font-medium
    h-[56px] w-[180px] text-base
    sm:h-[64px] sm:w-[200px] sm:text-lg
    md:h-[71px] md:w-[245px] md:text-xl
    mx-auto lg:mx-0
  "
            >
              Order now
            </Button>
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-square min-w-[350px] w-8/12 md:min-w-[500px] lg:right-0 lg:-bottom-20 lg:w-6/12 lg:absolute"
          >
            <Image
              src={slide.image}
              alt={slide.subtitle}
              className=" object-cover "
            />
          </motion.div>
        </motion.div>
      ))}
    </Carousel>
  );
}
