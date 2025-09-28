import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Product, GroupedProducts, FlattenedProduct } from "../types/types";

const fetchProducts = async (): Promise<FlattenedProduct[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, image_url, categories(name)")
    .returns<Product[]>(); // fetch raw Product shape

  if (error) {
    console.error("Error", error);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image_url: item.image_url,
    category: item.categories?.name ?? "Uncategorized", // flatten
  }));
};

export function useFetchTableProducts() {
  return useQuery({
    queryKey: ["table-products"],
    queryFn: fetchProducts,
  });
}
