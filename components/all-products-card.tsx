import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
const Desserts = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1599785209796-786432b228bc?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Cupcake",
  },

  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Cake",
  },

  {
    imageUrl:
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd25pZXN8ZW58MHx8MHx8fDA%3D",
    name: "Brownies",
  },
];

const Products = [
  {
    cookies: [
      { name: "cookie1", amount: 20 },
      { name: "cookie2", amount: 30 },
    ],
  },
  {
    cupcake: [
      { name: "cupcake", amount: 20 },
      { name: "cupcake", amount: 30 },
    ],
  },
];
function ProductCard({
  name,
  price,
  imageUrl,
}: {
  name: string;
  price: number;
  imageUrl?: string;
}) {
  return (
    <div className="w-[300px] rounded-2xl overflow-hidden  shadow-md">
      {/* Image */}
      <div className="h-64 w-full">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Text */}
      <div className="p-4 flex justify-between">
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-brand-gray">
            From <span className="text-brand-red">P{price}</span>
          </p>
        </div>

        <Button
          variant="ghost"
          className="bg-brand-red rounded-full w-10 h-10 cursor-pointer"
        >
          <ShoppingCart className="text-white" />
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
