import {
  TruckElectric,
  Heart,
  HandHeart,
  Gift,
  ShieldCheck,
  Cake,
} from "lucide-react";
import { Logo } from "./nav-bar";

const Reasons = [
  { logo: TruckElectric, text: "Fast Delivery" },
  { logo: Heart, text: "Made with Love" },
  { logo: Gift, text: "Gifts" },
  { logo: ShieldCheck, text: "Safe Payment" },
  { logo: Cake, text: "Fresh and Yummy" },
];
function WhyTrustUs() {
  return (
    <section className="text-center">
      <h1 className="text-brand-orange font-dream md:text-3xl lg:text-3xl lg:py-7">
        Why Trust Us
      </h1>
      <div className="flex flex-col md:flex-row md:gap-10 md:mx-10 lg:gap-20 items-center justify-center pt-12 pb-32">
        {Reasons.map((e) => {
          const Icon = e.logo;
          return (
            <div
              key={e.text}
              className="flex flex-col items-center justify-center text-brand-red"
            >
              <Icon className="" size={100} strokeWidth={0.7} />
              <p className="font-bold">{e.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WhyTrustUs;
