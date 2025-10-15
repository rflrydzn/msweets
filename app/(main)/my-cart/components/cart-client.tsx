"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/hooks/useCart";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/quantity-selector";
import { useState, useEffect } from "react";
import { BillingInfo, CartItem } from "@/lib/types/types";
import BillingInformation from "./billing-information";
function CartClient() {
  const { cart, isHydrated } = useCart();
  const [isSelectAll, setIsSelectAll] = useState(true);
  const [selectedCart, setSelectedCart] = useState<CartItem[]>(cart);
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    name: "",
    email: "",
    surname: "",
    phoneNumber: 0,
    province: "",
    city: "",
    address: "",
    paymentMethod: "Cash",
    comment: "",
  });

  const [step, setStep] = useState(2);

  console.log("info", billingInfo);

  if (!isHydrated) return <div>Loading...</div>;

  const handleSelectAll = () => {
    setSelectedCart((prev) =>
      prev.map((item) => ({ ...item, selected: !!isSelectAll }))
    );
    setIsSelectAll(!isSelectAll);
  };

  const handleOrder = () => {
    setStep(2);
  };

  const handleBillingChange = (updatedInfo: Partial<BillingInfo>) => {
    setBillingInfo((prev) => ({ ...prev, ...updatedInfo }));
  };

  return (
    <>
      {step === 1 && (
        <h1 className="font-times font-medium lg:text-2xl my-5">Basket</h1>
      )}

      <div className="flex items-start gap-3 mb-4">
        <section className="w-9/12 px-3">
          {step === 1 ? (
            <>
              <div className="flex justify-end mb-3">
                <Button
                  onClick={handleSelectAll}
                  variant="ghost"
                  size="sm"
                  className="text-brand-gray"
                >
                  Select All
                </Button>
              </div>
              {selectedCart?.map((product) => (
                <div key={product.id}>
                  <div
                    key={product.name}
                    className="max-w-7xl flex flex-col justify-between md:flex-row "
                  >
                    <div className="flex gap-3">
                      <img
                        src={product.image_url}
                        className="w-24 rounded-lg"
                      />
                      <div>
                        <h2 className="font-bold">{product.name}</h2>
                        <span className="text-brand-gray">
                          {product.option.label}
                        </span>
                        <QuantitySelector
                          className="text-brand-gray"
                          size="sm"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <p className="font-bold text-xl">
                        ₱{product.option.price * product.quantity}{" "}
                      </p>
                      <span>
                        <Checkbox
                          checked={product.selected}
                          onCheckedChange={(checked) =>
                            setSelectedCart((prev) =>
                              prev.map((item) =>
                                item.id === product.id
                                  ? { ...item, selected: !!checked }
                                  : item
                              )
                            )
                          }
                        />
                      </span>
                    </div>
                  </div>

                  <Separator className="my-3" />
                </div>
              ))}
            </>
          ) : (
            <BillingInformation
              billingInfo={billingInfo}
              onBillingChange={handleBillingChange}
            />
          )}
        </section>

        <section className="w-4/12  space-y-1">
          {/* <div className="flex gap-3 justify-center">
            <Button
              variant={orderType === "pickup" ? "default" : "outline"}
              onClick={() => setOrderType("pickup")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 w-36 justify-center ${
                orderType === "pickup"
                  ? "bg-pink-500 text-white shadow-md"
                  : "bg-white text-gray-700 border"
              }`}
            >
              <Store
                size={20}
                className={
                  orderType === "pickup" ? "text-white" : "text-gray-600"
                }
              />
              Pickup
            </Button>

            <Button
              variant={orderType === "delivery" ? "default" : "outline"}
              onClick={() => setOrderType("delivery")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 w-36 justify-center ${
                orderType === "delivery"
                  ? "bg-pink-500 text-white shadow-md"
                  : "bg-white text-gray-700 border"
              }`}
            >
              <Truck
                size={20}
                className={
                  orderType === "delivery" ? "text-white" : "text-gray-600"
                }
              />
              Delivery
            </Button>
          </div> */}
          <div className="border-2 rounded-lg p-3">
            <h1 className="font-bold">Order Summary</h1>
            <div className="flex justify-between">
              <h2 className="text-muted-foreground font-medium">Subtotal</h2>
              <p className="text-xl">
                ₱
                {selectedCart.reduce(
                  (acc, item) =>
                    item.selected
                      ? acc + item.option.price * item.quantity
                      : acc,
                  0
                )}
              </p>
            </div>

            <Separator />
            <div className="flex justify-between">
              <h2 className="text-muted-foreground font-medium">Total</h2>
              <p className="text-2xl font-medium">
                ₱
                {selectedCart.reduce(
                  (acc, item) =>
                    item.selected
                      ? acc + item.option.price * item.quantity
                      : acc,
                  0
                )}
              </p>
            </div>
            <Button className="w-full bg-brand-red py-6 text-md">Order</Button>
          </div>
        </section>
      </div>
    </>
  );
}

export default CartClient;
