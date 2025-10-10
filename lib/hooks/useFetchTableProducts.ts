import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Product, GroupedProducts, FlattenedProduct } from "../types/types";

const fetchProducts = async (): Promise<FlattenedProduct[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, image_url, categories(name), options")
    .returns<Product[]>();

  if (error) {
    console.error("Error", error);
    return [];
  }

  return data.map((item) => {
    const lowestPrice =
      item.options?.prices?.length > 0
        ? Math.min(...item.options.prices.map((p) => p.price))
        : 0;
    return {
      id: item.id,
      name: item.name,
      price: lowestPrice,
      image_url: item.image_url,
      category: item.categories?.name ?? "Uncategorized",
    };
  });
};

export function useFetchTableProducts() {
  return useQuery({
    queryKey: ["table-products"],
    queryFn: fetchProducts,
  });
}
