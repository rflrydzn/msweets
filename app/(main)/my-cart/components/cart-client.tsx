"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/hooks/useCart";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/quantity-selector";
import { useState } from "react";
import { BillingInfo, CartItem } from "@/lib/types/types";
import BillingInformation from "./billing-information";

function CartClient() {
  const { cart, isHydrated } = useCart();
  const [isSelectAll, setIsSelectAll] = useState(true);
  const [selectedCart, setSelectedCart] = useState<CartItem[]>(cart);

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

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isHydrated) return <div>Loading...</div>;

  const handleSelectAll = () => {
    setSelectedCart((prev) =>
      prev.map((item) => ({ ...item, selected: !!isSelectAll })),
    );
    setIsSelectAll(!isSelectAll);
  };

  const handleOrder = () => setStep(2);

  const handleBillingChange = (updatedInfo: Partial<BillingInfo>) => {
    setBillingInfo((prev) => ({ ...prev, ...updatedInfo }));
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const selectedItems = selectedCart.filter((item) => item.selected);

      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: selectedItems, billingInfo }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      setIsSuccess(true);
      setStep(3);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                  <div className="max-w-7xl flex flex-col justify-between md:flex-row">
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
                        ₱{product.option.price * product.quantity}
                      </p>
                      <span>
                        <Checkbox
                          checked={product.selected}
                          onCheckedChange={(checked) =>
                            setSelectedCart((prev) =>
                              prev.map((item) =>
                                item.id === product.id
                                  ? { ...item, selected: !!checked }
                                  : item,
                              ),
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
          ) : step === 2 ? (
            <BillingInformation
              billingInfo={billingInfo}
              onBillingChange={handleBillingChange}
            />
          ) : (
            // Step 3 — success screen
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <span className="material-symbols-outlined text-6xl text-green-500">
                check_circle
              </span>
              <h2 className="text-2xl font-bold">Order Placed!</h2>
              <p className="text-brand-gray">
                Your order has been sent to the baker. We'll be in touch soon at{" "}
                <strong>{billingInfo.email}</strong>.
              </p>
            </div>
          )}
        </section>

        {/* Order Summary sidebar — hide on step 3 */}
        {step !== 3 && (
          <section className="w-4/12">
            <div className="bg-[#fff7f2] border border-[#f0d6c8] rounded-2xl p-6 sticky top-28 custom-shadow">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between text-body-md text-on-surface-variant">
                <span>Subtotal</span>
                <span>
                  ₱
                  {selectedCart
                    .reduce(
                      (acc, item) =>
                        item.selected
                          ? acc + item.option.price * item.quantity
                          : acc,
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-body-md text-on-surface-variant mt-2">
                <span>Tax (12%)</span>
                <span>
                  ₱
                  {(
                    selectedCart.reduce(
                      (acc, item) =>
                        item.selected
                          ? acc + item.option.price * item.quantity
                          : acc,
                      0,
                    ) * 0.12
                  ).toFixed(2)}
                </span>
              </div>

              <div className="pt-4 mt-4 border-t border-[#f0d6c8] flex justify-between items-center">
                <span className="text-headline-md text-on-surface">Total</span>
                <span className="text-headline-md text-[var(--color-brand-orange)] font-bold">
                  ₱
                  {(
                    selectedCart.reduce(
                      (acc, item) =>
                        item.selected
                          ? acc + item.option.price * item.quantity
                          : acc,
                      0,
                    ) * 1.12
                  ).toFixed(2)}
                </span>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
              )}

              <button
                onClick={step === 1 ? handleOrder : handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full mt-8 bg-[var(--color-brand-red)] text-white py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {step === 1
                  ? "Proceed to Checkout"
                  : isSubmitting
                    ? "Placing Order..."
                    : "Place Order"}
                {!isSubmitting && (
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                )}
              </button>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[var(--color-brand-orange)] text-lg">
                    verified
                  </span>
                  Freshly baked on day of delivery
                </div>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[var(--color-brand-orange)] text-lg">
                    local_shipping
                  </span>
                  Eco-friendly insulated packaging
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default CartClient;
