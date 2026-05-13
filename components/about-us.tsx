"use client";
import React from "react";

export default function ArtisansSection() {
  return (
    <section id="about" className="py-24   mx-auto bg-[#fff8f8] font-sans">
      {/* Google Fonts */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Dancing+Script:wght@400;700&display=swap");

        .font-serif {
          font-family: "Dancing Script", cursive;
        }

        .font-sans {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="font-serif text-5xl text-[#b80049] mb-2">The Artisan</h2>
        <p className="font-sans text-[#605e59] max-w-lg mx-auto mt-4 text-base leading-relaxed">
          Meet the hand and heart that bring our sweet visions to life every
          single day.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-12">
        <div className="text-center group max-w-md mx-auto">
          {/* Image Wrapper */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            {/* Pink soft background circle */}
            <div className="absolute inset-0 bg-[#f4dce4] rounded-full scale-105 group-hover:rotate-12 transition-transform duration-300"></div>

            {/* Image */}
            <img
              src="https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/587321485_3411496105664048_4383689156689024096_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=fqxqEKkNwEsQ7kNvwG_xUPt&_nc_oc=Adpx7R2H8VPBEh0wfHCX-Z0LpTiQmJWElAvMqe30yWrAiVM5H_nRJbT7PBPPAfODBlc&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=Tww3kU30CH59HdF18MAn4w&_nc_ss=7b2a8&oh=00_Af4mpDdZwB-0p4R9cVO0qZCVPHtlJfSY8tZaSOcPR8k1JQ&oe=6A0ACA16"
              alt="Clara Beaumont"
              className="relative w-full h-full object-cover rounded-full border-4 border-[#fff8f8] shadow-md"
            />
          </div>

          {/* Name */}
          <h4 className="font-serif text-4xl text-[#25181e]">
            Marife Gonzales
          </h4>

          {/* Role */}
          <p className="font-sans text-sm text-[#b80049] uppercase tracking-widest mt-2 font-semibold">
            Founder & Master Pastry Chef
          </p>

          {/* Description */}
          <p className="font-sans text-[#5b3f43] mt-4 px-4 text-lg leading-relaxed">
            Passionate about sourdough biology and the physics of perfect crust.
            Marife&apos;s vision for artisanal perfection is at the heart of
            every recipe we create.
          </p>
        </div>
      </div>
    </section>
  );
}
