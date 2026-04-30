"use client";
import Link from "next/link";
import React from "react";

const flowerPotCakes = [
  {
    id: 1,
    name: "Sunflower",
    image:
      "https://scontent-iad6-1.xx.fbcdn.net/v/t39.30808-6/684257620_26633794482929723_3701150143731878163_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=yN05c_iuqYIQ7kNvwHxoiev&_nc_oc=AdqDDPbVvEhtR_mh_zr0bsMNaTOEMQMWWGarv3yGttaVAPZswUgDXkjW9Hd6nTyDM_k&_nc_zt=23&_nc_ht=scontent-iad6-1.xx&_nc_gid=iNgDktVDEuVCtnTN_nM_SQ&_nc_ss=7b2a8&oh=00_Af3Peu4v9mt5RJUS4YggKSqQGvUdU-pLYhyUOaSxdgLrtg&oe=69F86803",
  },
  {
    id: 2,
    name: "Mini Lily",
    image:
      "https://scontent-iad6-1.xx.fbcdn.net/v/t39.30808-6/684257620_26633794482929723_3701150143731878163_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=yN05c_iuqYIQ7kNvwHxoiev&_nc_oc=AdqDDPbVvEhtR_mh_zr0bsMNaTOEMQMWWGarv3yGttaVAPZswUgDXkjW9Hd6nTyDM_k&_nc_zt=23&_nc_ht=scontent-iad6-1.xx&_nc_gid=iNgDktVDEuVCtnTN_nM_SQ&_nc_ss=7b2a8&oh=00_Af3Peu4v9mt5RJUS4YggKSqQGvUdU-pLYhyUOaSxdgLrtg&oe=69F86803",
  },
  {
    id: 3,
    name: "Tulips",
    image:
      "https://scontent-iad6-1.xx.fbcdn.net/v/t39.30808-6/684257620_26633794482929723_3701150143731878163_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=yN05c_iuqYIQ7kNvwHxoiev&_nc_oc=AdqDDPbVvEhtR_mh_zr0bsMNaTOEMQMWWGarv3yGttaVAPZswUgDXkjW9Hd6nTyDM_k&_nc_zt=23&_nc_ht=scontent-iad6-1.xx&_nc_gid=iNgDktVDEuVCtnTN_nM_SQ&_nc_ss=7b2a8&oh=00_Af3Peu4v9mt5RJUS4YggKSqQGvUdU-pLYhyUOaSxdgLrtg&oe=69F86803",
  },
  {
    id: 4,
    name: "Rose",
    image:
      "https://scontent-iad6-1.xx.fbcdn.net/v/t39.30808-6/684257620_26633794482929723_3701150143731878163_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=yN05c_iuqYIQ7kNvwHxoiev&_nc_oc=AdqDDPbVvEhtR_mh_zr0bsMNaTOEMQMWWGarv3yGttaVAPZswUgDXkjW9Hd6nTyDM_k&_nc_zt=23&_nc_ht=scontent-iad6-1.xx&_nc_gid=iNgDktVDEuVCtnTN_nM_SQ&_nc_ss=7b2a8&oh=00_Af3Peu4v9mt5RJUS4YggKSqQGvUdU-pLYhyUOaSxdgLrtg&oe=69F86803",
  },
];

const MotherDayFlowersSection = () => {
  return (
    <>
      {/* Scoped styles */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");

        .font-script {
          font-family: "Great Vibes", cursive;
        }

        .font-serif {
          font-family: "Playfair Display", serif;
        }

        .stamp-border {
          mask-image: radial-gradient(
            circle at 10px 10px,
            transparent 10px,
            black 11px
          );
          mask-size: 20px 20px;
          border: 8px solid #f4dce4;
        }

        .wavy-divider {
          aspect-ratio: 960/100;
          width: 100%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        }
      `}</style>

      <section className="py-20 px-8 bg-[#fff0f4] relative overflow-hidden font-body-md">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <span className="material-symbols-outlined text-[120px] text-[#b80049]">
            local_florist
          </span>
        </div>

        <div className="absolute bottom-0 left-0 p-8 opacity-20 pointer-events-none">
          <span className="material-symbols-outlined text-[120px] text-[#b80049]">
            filter_vintage
          </span>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative">
            <span className="text-[#b80049] uppercase tracking-widest bg-[#ffd9de] px-4 py-1 rounded-full mb-4 inline-block text-sm font-semibold">
              Limited Seasonal Offer
            </span>

            <h2 className="text-5xl md:text-6xl text-[#b80049] mb-4 font-script">
              Mother's Day Special
            </h2>

            <p className="text-[#5b3f43] max-w-2xl mx-auto text-lg">
              Pre-orders are now open for our exclusive Flower Pot Cakes. A
              beautiful, edible gift for the most special woman in your life.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 w-full md:grid-cols-4 max-w-7xl mx-auto">
            {flowerPotCakes?.map((category) => (
              <Link
                key={category.name}
                href={{
                  pathname: "/all-products",
                  query: { category: category.name },
                }}
              >
                <div className="flex flex-col items-center justify-center gap-3 hover:scale-105 transition duration-300 cursor-pointer">
                  <div className="rounded-full border aspect-square p-2 border-brand-red overflow-hidden">
                    <img
                      className="rounded-full w-full h-full object-cover"
                      src={category.image}
                    />
                  </div>
                  <h2 className="font-medium">{category.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MotherDayFlowersSection;
