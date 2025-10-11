import { supabase } from "./supabase";
import { FlattenedProduct, Product } from "./types/types";

export const fetchRecommendedProducts = async (
  categoryID: number,
  currentProductID: number
): Promise<FlattenedProduct[]> => {
  let products: Product[] = [];
  const { data, error } = await supabase
    .from("products")
    .select("id, name, categories(name), options, productGallery")
    .eq("category_id", categoryID)
    .neq("id", currentProductID)
    .limit(4)
    .returns<Product[]>();

  if (error) {
    console.error("Error", error);
  } else {
    products = data || [];
  }

  if (products.length < 4) {
    const remaining = 4 - products.length;

    const { data: bestSellersFallback, error } = await supabase
      .from("products")
      .select("id, name, categories(name), options, productGallery")
      .eq("category_id", 1)
      .limit(remaining)
      .returns<Product[]>();

    if (error) {
      console.error("Error fetching recommended", error);
    } else {
      products = [...products, ...bestSellersFallback];
    }
  }
  return products.map((item) => ({
    id: item.id,
    name: item.name,
    // price: item.price,
    // image_url: item.image_url,
    options: item.options,
    productGallery: item.productGallery,
    category: item.categories?.name ?? "Uncategorized", // flatten
  }));
};
