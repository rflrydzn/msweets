"use client";
import Link from "next/link";
import React from "react";

const flowerPotCakes = [
  {
    id: 1,
    name: "Rose Cake",
    image:
      "https://scontent-iad6-1.xx.fbcdn.net/v/t39.30808-6/681048123_122276604674087050_6445827788869008420_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=e7HuAmVVKL0Q7kNvwHIabEF&_nc_oc=AdpR1oAb_u8rEC0OUDJN4wcbk8L8n92fS_88ZVFy08TYyZIxsckwQxv_wYp84mSyviA&_nc_zt=23&_nc_ht=scontent-iad6-1.xx&_nc_gid=lQj_lF7pIWEJyeqzlyGFIw&_nc_ss=7b2a8&oh=00_Af0szwLoL8whr6ScpIH_rkJXUiD2ilb0tTyf0uvEjEIKFw&oe=69F994C4",
  },
  {
    id: 2,
    name: "Lily Cake",
    image:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/679378073_122276604710087050_4204387888399316373_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Ps4eXdba-KkQ7kNvwG0zRX2&_nc_oc=AdpLFnzBKDDaw8kli0C3j7tpZ1Q13WXua28NoBKtRJHKPUJ5tYJ4_Be3x-0Nu8n29bw&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=cRnz_ATje6Kh4kG0lscAlw&_nc_ss=7b2a8&oh=00_Af7AVRasdZ4rtUMTENwO1IP1oXSKROmol1QNs3mWb6iuEw&oe=6A0AB33A",
  },
  {
    id: 3,
    name: "Tulip Cake",
    image:
      "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/684833488_122276604686087050_5868835869904312614_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=naecSgs_iAcQ7kNvwGd3Aol&_nc_oc=AdpWNH4wOu6ICWFyFuytW_5bXLXXfKuciRPwVw7qiI84GWz9iHtTTEEiLM4OkzBg2GE&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=ZxOFm2bZC8lrOtUvkVElPQ&_nc_ss=7b2a8&oh=00_Af2BcfxyMdTzPHAeC3QRJE69I13_BhQJ0tYyu6RL20J2ww&oe=69F99C44",
  },
  {
    id: 4,
    name: "Sunflower Cake",
    image:
      "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/681418485_122276604734087050_8675254563426672987_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=DvwuIXUJ7x8Q7kNvwHMZP-K&_nc_oc=Adr-YYgFZS4oxzN7KDV552o4hB8mtT0Be_tCGKcDkMtfLReI7pUPnkeVLiOYoxJVmnU&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=khjFiPVcAS4vN1RQtzpV4g&_nc_ss=7b2a8&oh=00_Af5Gehw4MgBw9O2W9CTHJTR0XgYbWgsqJ4Gfj59vSFzGqw&oe=6A0ACB88",
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
              Mother&apos;s Day Special
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
