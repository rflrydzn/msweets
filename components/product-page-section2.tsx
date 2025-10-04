"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/(main)/all-products/[productID]/tabs";
import productTabs from "../app/(main)/all-products/[productID]/productTabs.json"; // adjust path

export default function ProductTabs() {
  return (
    <Tabs defaultValue="description" className="w-full ">
      <TabsList className="grid w-full grid-cols-3 max-w-sm">
        <TabsTrigger value="description">
          {productTabs.description.title}
        </TabsTrigger>
        <TabsTrigger value="delivery">{productTabs.delivery.title}</TabsTrigger>
        <TabsTrigger value="care">{productTabs.care.title}</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="p-4">
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {productTabs.description.content.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="delivery" className="p-4">
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {productTabs.delivery.content.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="care" className="p-4">
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {productTabs.care.content.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
