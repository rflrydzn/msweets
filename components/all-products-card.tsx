import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

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
    <div className="rounded-3xl border overflow-hidden  shadow-md">
      {/* Image */}
      <div className="h-64 w-full">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Text */}
      <div className="p-4 flex justify-between">
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-brand-gray">
            From <span className="text-brand-red">₱{price}</span>
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
