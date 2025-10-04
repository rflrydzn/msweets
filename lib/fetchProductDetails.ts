import { supabase } from "./supabase";
import { ProductInfo } from "./types/types";

export const fetchProductDetails = async (id: number): Promise<ProductInfo> => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, image_url, description, category_id, options")
    .eq("id", id)
    .single();
  if (error) throw new Error("Failed fetching product details");
  console.log("data", data);
  return data;
};
