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
      "https://www.weddingchicks.com/wp-content/uploads/2019/07/edible-flower-cakes-are-our-new-wedding-cake-flavo-1.jpg",
  },
  {
    name: "B-Day Cakes",
    imageUrl:
      "https://scontent-iad6-1.xx.fbcdn.net/v/t39.30808-6/694821296_3578301045650219_819567503257763070_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ZFYSOCkOu9oQ7kNvwHtquu9&_nc_oc=Adq8iakcxhaQV7jzJ73KeqO_1Q3erV3H9attAhzEVLEMBLfdJu0OOBATN2skVg1BFMw&_nc_zt=23&_nc_ht=scontent-iad6-1.xx&_nc_gid=q9Ljy1C1CWivlW72nNrdJQ&_nc_ss=7b2a8&oh=00_Af404s8znC9IByxuq06Z5ItYBCAvLGgoey_cZcL0o0TRZw&oe=6A0AA615",
  },
  {
    name: "Baby Cakes",
    imageUrl:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/658017481_3538001029680221_4484241508058726518_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=rUAIbYXq29EQ7kNvwE6J5FW&_nc_oc=AdrQ8UP92EINQJbEgFH_DQmKUEAPbfplBNUhNL5teG87hVFvrgFRp0KWBN1jSgDa2-M&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=jlQ9DQr4g7xWlLfVJM0v8g&_nc_ss=7b2a8&oh=00_Af4fML6QaTFwkFtf9XRR2nd-UPkXl1uUOuPZ8BPrsP_nPg&oe=6A0AD7DA",
  },
  {
    name: "Dedication Cakes",
    imageUrl: "https://i.ibb.co/pBshdsCp/image.png",
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
