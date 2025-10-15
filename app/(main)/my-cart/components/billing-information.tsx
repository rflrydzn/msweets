import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { City, fetchProvinces } from "@/lib/fetchProvinces";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { BillingInfo } from "@/lib/types/types";

type Province = {
  code: string;
  name: string;
  region: string;
};

export default function BillingInformation({
  onBillingChange,
  billingInfo,
}: {
  onBillingChange: (updated: Partial<BillingInfo>) => void;
  billingInfo: BillingInfo;
}) {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState<Province[]>();
  const [cities, setCities] = useState<City[]>();

  useEffect(() => {
    async function loadProvinces() {
      try {
        const data = await fetchProvinces(true);
        setProvinces(data);
      } catch (error) {
        console.error("Failed to load provinces:", error);
      }
    }
    loadProvinces();
  }, []);

  useEffect(() => {
    async function loadCities() {
      if (!selectedProvince) return;
      try {
        const res = await fetch(
          `https://psgc.cloud/api/v2/provinces/${selectedProvince}/cities-municipalities`
        );
        const data = await res.json();
        setCities(data.data);
      } catch (error) {
        console.error("Error fetching cities", error);
      }
    }

    loadCities();
  }, [selectedProvince]);

  return (
    <>
      <h2 className="text-xl font-bold mb-6 text-gray-800 ">
        Billing Information
      </h2>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            type="text"
            value={billingInfo.name}
            onChange={(e) => onBillingChange({ name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>E-Mail</Label>
          <Input
            type="email"
            value={billingInfo.email}
            onChange={(e) => onBillingChange({ email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Surname</Label>
          <Input
            type="text"
            value={billingInfo.surname}
            onChange={(e) => onBillingChange({ surname: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input
            type="tel"
            value={billingInfo.phoneNumber}
            onChange={(e) =>
              onBillingChange({ phoneNumber: Number(e.target.value) })
            }
          />
        </div>
      </section>
      <section className="flex flex-col  gap-3 my-5">
        <h2 className="text-xl font-bold mb-6 text-gray-800 ">
          Delivery Address
        </h2>
        <div className="space-y-2">
          <Label>Province</Label>
          <Select
            onValueChange={(value) => {
              setSelectedProvince(value);
              onBillingChange({ province: value });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a province" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Province</SelectLabel>
                {provinces?.map((province) => (
                  <SelectItem key={province.name} value={province.name}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>City</Label>
          <Select
            disabled={!cities || cities.length === 0}
            onValueChange={(value) => onBillingChange({ city: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a province" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>City</SelectLabel>
                {cities?.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Address</Label>
          <Input
            type="text"
            value={billingInfo.address}
            onChange={(e) => onBillingChange({ address: e.target.value })}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-800 ">
          Payment Methods
        </h2>
      </section>
    </>
  );
}
