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
import { categories } from "@/lib/categories";
import { Heart, Share, Share2, ShoppingCart } from "lucide-react";
import VariantSelector_Basic_Ex_04 from "@/components/variant-selector-basic";
import ProductTabs from "@/components/product-page-section2";
import YouMayAlsoLike from "@/components/you-may-also-like";
import ProductGallery from "@/components/image-gallery";
export default async function ProductPage({
  params,
}: {
  params: { productID: number };
}) {
  const productInfo = await fetchProductDetails(params.productID);
  const category = categories.find((cat) => cat.id === productInfo.category_id);

  if (!productInfo) {
    return <p>Product not found</p>;
  }

  return (
    <main className="max-w-7xl mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/all-products">All Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/all-products?category=${category?.name}`}>
              {category?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-brand-red">
              {productInfo.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex gap-10 my-8 items-start">
        <div className="w-1/2 space-y-4">
          <ProductGallery productInfo={productInfo} />
        </div>
        <div className="w-1/2 flex flex-col  ">
          <div className="flex justify-between">
            <h1 className="font-times font-bold md:text-3xl">
              {productInfo.name}
            </h1>
            <div className="flex gap-3">
              <Share2 />
              <Heart />
            </div>
          </div>

          <span className="text-gray-400 text-xs">
            Product ID: {productInfo.id}
          </span>
          <Separator className="my-2" />
          <div className="space-y-5">
            <span className="text-green-700 underline block">Is available</span>
            <p className="text-brand-gray">{productInfo.description}</p>
            <VariantSelector_Basic_Ex_04
              options={productInfo.options ?? { prices: [] }}
            />
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between">
            <p>
              <span className="text-brand-red font-bold">Free shipping</span> on
              orders from P1000
            </p>
            <p>
              <span className="text-brand-orange font-bold">Save 10%</span>
              on your first online order
            </p>
          </div>
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
