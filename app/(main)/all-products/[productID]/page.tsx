import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { fetchProductDetails } from "@/lib/fetchProductDetails";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import VariantSelector_Basic_Ex_04 from "@/components/variant-selector-basic";
import ProductTabs from "@/components/product-page-section2";
import YouMayAlsoLike from "@/components/you-may-also-like";
export default async function ProductPage({
  params,
}: {
  params: { productID: number };
}) {
  const productInfo = await fetchProductDetails(params.productID);

  if (!productInfo) {
    return <p>Product not found</p>;
  }

  return (
    <main className="max-w-7xl mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{productInfo.category_id}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-brand-red">
              {productInfo.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex gap-10 items-start">
        <div className="w-1/2">
          <img
            className="rounded-3xl object-cover h-[500px] w-full"
            src={productInfo.image_url}
            alt={productInfo.name}
          />
        </div>

        <div className="w-1/2 flex flex-col  ">
          <h1 className="font-times font-bold md:text-3xl">
            {productInfo.name}
          </h1>
          <span className="text-gray-400 text-xs">
            Product ID: {productInfo.id}
          </span>
          <Separator />
          <p className="text-brand-gray">{productInfo.description}</p>
          <VariantSelector_Basic_Ex_04 options={productInfo.options ?? {}} />

          <div className="flex justify-between items-center mt-6">
            <h2 className="font-medium lg:text-3xl">₱{productInfo.price}</h2>
            <div className="flex justify-center gap-2">
              <Button className="bg-brand-red px-8 py-5">Order Now!</Button>
              <Button
                variant="outline"
                className="border-brand-red text-brand-red px-8 py-5"
              >
                <ShoppingCart />
              </Button>
            </div>
          </div>
          <Separator />
        </div>
      </section>
      <section className="mt-5">
        <ProductTabs />
      </section>
      <section className="my-10 ">
        <YouMayAlsoLike
          categoryId={productInfo.category_id}
          currentProductID={productInfo.id}
        />
      </section>
    </main>
  );
}
