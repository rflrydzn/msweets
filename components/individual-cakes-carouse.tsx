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
      "https://scontent-iad6-1.xx.fbcdn.net/v/t39.30808-6/668473643_3547269198753404_3444112545159610278_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=0UQqYOAsoK8Q7kNvwHayfTA&_nc_oc=Adpl7St1shfiGNhfDTVu7VnX1gj0u48pB8JKy4c5rKD0SApg2c8IIBW13kfxuvtkFy4&_nc_zt=23&_nc_ht=scontent-iad6-1.xx&_nc_gid=d1eblrrIp7xIO5ieQ3W1QA&_nc_ss=7b2a8&oh=00_Af2WCLlqB91rYYQWbyQvu02tT5dnRj__Hezqj7Uw5eA3iA&oe=69F8502D",
  },
  {
    name: "Baby Cakes",
    imageUrl:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/658017481_3538001029680221_4484241508058726518_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Ar_5V1Xd3UcQ7kNvwH137dB&_nc_oc=AdpOaeqnJ4GhGrf3l8vQw0wa-ieZ9Fa-xAjGlFviknEsN1p4IJhMi2gTbWbZpi688Qg&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=nkcbp_fOnuR_3ysJFj02yg&_nc_ss=7b2a8&oh=00_Af3k8SlZRbv6dLRIg1pI1tEK59ZVkEVuogSHbi1iOlqWcg&oe=69F82A9A",
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
