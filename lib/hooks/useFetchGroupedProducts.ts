import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Product, GroupedProducts } from "../types/types";

const fetchProducts = async (): Promise<GroupedProducts[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, image_url, categories(name)")
    .returns<Product[]>(); // 👈 cast result type

  if (error) {
    console.error("Error", error);
    return [];
  }
  console.log("data", data);
  // group products by category
  const grouped: Record<string, GroupedProducts["items"]> = {};

  data?.forEach((p) => {
    console.log("categories field:", p.categories);
    const category = p.categories?.name ?? "Uncategorized";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push({
      id: p.id,
      name: p.name,
      amount: p.price,
      imageUrl: p.image_url,
    });
  });

  return Object.entries(grouped).map(([category, items]) => ({
    category,
    items,
  }));
};

export function useFetchProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
